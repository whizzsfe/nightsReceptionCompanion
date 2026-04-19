#!/usr/bin/env node
// scripts/prebuild.js
// Copies source files into app/ before electron-builder packages them.
// Cross-platform — works on Windows (cmd.exe / PowerShell) and GitHub Actions (ubuntu/windows runners).

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const APP  = path.join(ROOT, 'app');

const FILES = [
  'hotelcompanion_suite.html',
  'hotelcompanion_editor.html',
  'hotelLogo.jpg',
  'hotelLogo.ico',
];

fs.mkdirSync(APP, { recursive: true });

for (const file of FILES) {
  const src  = path.join(ROOT, file);
  const dest = path.join(APP, file);
  if (!fs.existsSync(src)) {
    console.error(`[prebuild] ERROR: source file not found: ${src}`);
    process.exit(1);
  }
  fs.copyFileSync(src, dest);
  console.log(`[prebuild] copied ${file} → app/${file}`);
}

console.log('[prebuild] done.');
