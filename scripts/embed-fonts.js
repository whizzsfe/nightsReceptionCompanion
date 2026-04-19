#!/usr/bin/env node
// scripts/embed-fonts.js
// Downloads Google Fonts WOFF2 files and injects base64 @font-face blocks
// into hotelcompanion_suite.html, replacing the Google Fonts <link> tags.
// Run once whenever you need to refresh bundled fonts.
//
// Usage: node scripts/embed-fonts.js

'use strict';

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const ROOT      = path.join(__dirname, '..');
const HTML_FILE = path.join(ROOT, 'hotelcompanion_suite.html');

// The exact Google Fonts URL from the HTML
const FONTS_CSS_URL =
  'https://fonts.googleapis.com/css2?' +
  'family=Bebas+Neue' +
  '&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400' +
  '&family=DM+Mono:wght@400;500' +
  '&display=swap';

// Use a modern Chrome UA so Google returns WOFF2 (not TTF/EOT)
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

function fetchText(url, ua) {
  return new Promise((resolve, reject) => {
    const opts = Object.assign(new URL(url), { headers: { 'User-Agent': ua || '' } });
    https.get(opts, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchText(res.headers.location, ua).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function fetchBinary(url) {
  return new Promise((resolve, reject) => {
    const opts = Object.assign(new URL(url), { headers: { 'User-Agent': UA } });
    https.get(opts, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBinary(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

// Parse @font-face blocks from the CSS text
function parseFontFaces(css) {
  const blocks = [];
  const re = /@font-face\s*\{([^}]+)\}/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    const block = m[1];
    const get = (prop) => {
      const r = new RegExp(prop + '\\s*:\\s*([^;]+)');
      const x = r.exec(block);
      return x ? x[1].trim() : '';
    };
    const srcMatch = /url\(([^)]+)\)\s*format\(['"]woff2['"]\)/.exec(block);
    if (!srcMatch) continue;
    const url = srcMatch[1].replace(/['"]/g, '');
    const unicodeRange = get('unicode-range');
    blocks.push({
      family:       get('font-family').replace(/['"]/g, ''),
      style:        get('font-style') || 'normal',
      weight:       get('font-weight') || '400',
      display:      get('font-display') || 'swap',
      unicodeRange,
      url,
    });
  }
  return blocks;
}

async function main() {
  console.log('[embed-fonts] Fetching font CSS from Google Fonts...');
  const css = await fetchText(FONTS_CSS_URL, UA);

  const faces = parseFontFaces(css);
  console.log(`[embed-fonts] Found ${faces.length} @font-face blocks to embed.`);

  const fontFaceBlocks = [];

  for (let i = 0; i < faces.length; i++) {
    const f = faces[i];
    process.stdout.write(`[embed-fonts] [${i + 1}/${faces.length}] ${f.family} ${f.weight} ${f.style}...`);
    const buf = await fetchBinary(f.url);
    const b64 = buf.toString('base64');
    const kb  = Math.round(b64.length * 0.75 / 1024);
    process.stdout.write(` ${kb} KB\n`);

    let block = `@font-face {\n`;
    block += `  font-family: '${f.family}';\n`;
    block += `  font-style: ${f.style};\n`;
    block += `  font-weight: ${f.weight};\n`;
    block += `  font-display: swap;\n`;
    block += `  src: url('data:font/woff2;base64,${b64}') format('woff2');\n`;
    if (f.unicodeRange) block += `  unicode-range: ${f.unicodeRange};\n`;
    block += `}`;
    fontFaceBlocks.push(block);
  }

  const inlineFontCss = fontFaceBlocks.join('\n');

  // Read the HTML
  let html = fs.readFileSync(HTML_FILE, 'utf8');

  // Remove the Google Fonts preconnect + stylesheet links
  html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*/g, '');
  html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*/g, '');
  html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]*" rel="stylesheet">\s*/g, '');

  // Inject @font-face blocks inside the first <style> tag
  html = html.replace('<style>', `<style>\n/* ===== Bundled Google Fonts (offline) ===== */\n${inlineFontCss}\n/* ========================================== */\n`);

  fs.writeFileSync(HTML_FILE, html, 'utf8');

  const totalKb = Math.round(fontFaceBlocks.join('').length * 0.75 / 1024);
  console.log(`[embed-fonts] Done. ~${totalKb} KB of font data embedded into hotelcompanion_suite.html`);
}

main().catch(err => {
  console.error('[embed-fonts] ERROR:', err.message);
  process.exit(1);
});
