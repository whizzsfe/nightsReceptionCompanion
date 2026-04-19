'use strict';
// main.js — Electron main process
// Night Receptionist Companion Suite v1.0.0
// © 2026 Whizzsfe Web Services — whizzsfe.com

const { app, BrowserWindow, ipcMain, dialog, shell, session } = require('electron');
const path = require('path');
const fs   = require('fs');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

// Root folder: next to the exe when packaged, project root in dev.
const EXE_DIR = app.isPackaged
  ? path.dirname(process.execPath)
  : path.join(__dirname);

const APP_DIR = app.isPackaged
  ? path.join(__dirname, 'app')  // packaged: bundled app/ folder inside asar
  : __dirname;                    // dev: serve root files directly

// Override files that live next to the exe (property-specific, not bundled).
const OVERRIDE_FILES = [
  'hotelcompanion_config.js',
  'hotelcompanion_items.js',
  'hotelcompanion_scripts.js',
];

// ---------------------------------------------------------------------------
// Security helper — keep file access inside EXE_DIR
// ---------------------------------------------------------------------------
function safeResolvePath(relPath) {
  // Normalise and strip any leading slash so path.join works correctly.
  const clean = path.normalize(relPath).replace(/^[/\\]+/, '');
  const resolved = path.resolve(EXE_DIR, clean);
  // Reject any path that escapes the exe directory.
  if (!resolved.startsWith(path.resolve(EXE_DIR))) {
    throw new Error(`Path traversal attempt blocked: ${relPath}`);
  }
  return resolved;
}

// ---------------------------------------------------------------------------
// Runtime icon resolution — loaded from EXE_DIR so the client can replace it
// ---------------------------------------------------------------------------
function resolveWindowIcon() {
  // Production: check next to exe first; fall back gracefully (no icon = Electron default)
  if (app.isPackaged) {
    const clientIcon = path.join(EXE_DIR, 'hotelLogo.ico');
    return fs.existsSync(clientIcon) ? clientIcon : undefined;
  }
  // Dev: use the file in app/ if present
  const devIcon = path.join(APP_DIR, 'hotelLogo.ico');
  return fs.existsSync(devIcon) ? devIcon : undefined;
}

// ---------------------------------------------------------------------------
// Window factory
// ---------------------------------------------------------------------------
function createWindow(htmlFile) {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      // Allow local file:// resources (images, etc.) relative to app/
      webSecurity: true,
    },
    icon: resolveWindowIcon(),
    title: 'Night Receptionist Companion',
    backgroundColor: '#0A0A0A', // matches --black from design system
    show: false, // show after ready-to-show to avoid white flash
  });

  win.loadFile(path.join(APP_DIR, htmlFile));

  // Show once rendered to avoid white flash on startup.
  win.once('ready-to-show', () => win.show());

  // Inject override files after the page has fully loaded.
  // This replicates the <script src="…"> behaviour from the HTML-only version.
  win.webContents.on('did-finish-load', () => {
    for (const filename of OVERRIDE_FILES) {
      const filepath = path.join(EXE_DIR, filename);
      if (fs.existsSync(filepath)) {
        try {
          const code = fs.readFileSync(filepath, 'utf8');
          // executeJavaScript is safe here — we control the source files.
          win.webContents.executeJavaScript(code).catch(err => {
            console.warn(`[override] Failed to execute ${filename}:`, err.message);
          });
        } catch (err) {
          console.warn(`[override] Could not read ${filename}:`, err.message);
        }
      }
    }
  });

  // Open external links in the system browser, not a new Electron window.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  return win;
}

// ---------------------------------------------------------------------------
// App lifecycle
// ---------------------------------------------------------------------------
app.whenReady().then(() => {
  // Intercept file:// requests for logo files and serve the client's version
  // from EXE_DIR when present — so the client can replace logos without
  // rebuilding. Works for both the sidebar img and the sign generator preview.
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    if (details.url.includes('hotelLogo.')) {
      const basename = details.url.includes('hotelLogo.ico') ? 'hotelLogo.ico' : 'hotelLogo.jpg';
      const clientFile = path.join(EXE_DIR, basename);
      if (fs.existsSync(clientFile)) {
        callback({ redirectURL: 'file:///' + clientFile.replace(/\\/g, '/') });
        return;
      }
    }
    callback({});
  });

  createWindow('hotelcompanion_suite.html');
});

app.on('window-all-closed', () => {
  // On macOS it is conventional to keep the app running until Cmd+Q.
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow('hotelcompanion_suite.html');
  }
});

// ---------------------------------------------------------------------------
// IPC handlers — fs:*
// ---------------------------------------------------------------------------

/** Write text to a file relative to EXE_DIR. Creates parent dirs as needed. */
ipcMain.handle('fs:write', (_event, relPath, text) => {
  const full = safeResolvePath(relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, text, 'utf8');
  return true;
});

/** Read a file relative to EXE_DIR, or at an absolute path (dialog result).
 *  Returns null if not found. */
ipcMain.handle('fs:read', (_event, relPath) => {
  try {
    // Absolute paths come from native dialogs — safe to use directly.
    const full = path.isAbsolute(relPath) ? relPath : safeResolvePath(relPath);
    return fs.readFileSync(full, 'utf8');
  } catch {
    return null;
  }
});

/** Recursively list all files under a relative directory.
 *  Returns an array of paths relative to EXE_DIR (forward-slash separated). */
ipcMain.handle('fs:scan', (_event, relPath) => {
  const results = [];
  function walk(dir) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
    catch { return; }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else {
        // Return path relative to EXE_DIR, using forward slashes.
        results.push(path.relative(EXE_DIR, full).replace(/\\/g, '/'));
      }
    }
  }
  try {
    const base = safeResolvePath(relPath);
    walk(base);
  } catch { /* non-existent dir — return empty */ }
  return results;
});

/** Check whether a file exists relative to EXE_DIR. */
ipcMain.handle('fs:exists', (_event, relPath) => {
  try {
    return fs.existsSync(safeResolvePath(relPath));
  } catch {
    return false;
  }
});

/** Delete a file relative to EXE_DIR. Silently ignores missing files. */
ipcMain.handle('fs:delete', (_event, relPath) => {
  try {
    fs.rmSync(safeResolvePath(relPath), { force: true });
    return true;
  } catch {
    return false;
  }
});

// ---------------------------------------------------------------------------
// IPC handlers — dialog:*
// ---------------------------------------------------------------------------

/** Native "Save As" dialog. Returns chosen path string or null. */
ipcMain.handle('dialog:save', async (_event, opts) => {
  const win = BrowserWindow.getFocusedWindow();
  const result = await dialog.showSaveDialog(win, opts);
  return result.canceled ? null : result.filePath;
});

/** Native "Open File" dialog. Returns chosen path string or null. */
ipcMain.handle('dialog:open', async (_event, opts) => {
  const win = BrowserWindow.getFocusedWindow();
  const result = await dialog.showOpenDialog(win, opts);
  return result.canceled || !result.filePaths.length ? null : result.filePaths[0];
});

// ---------------------------------------------------------------------------
// IPC handlers — app:*
// ---------------------------------------------------------------------------

ipcMain.handle('app:version', () => app.getVersion());

ipcMain.handle('app:exeDir', () => EXE_DIR);

// Close the window that sent the message (ipcMain.on, not handle — fire-and-forget)
ipcMain.on('window:close', (event) => {
  BrowserWindow.fromWebContents(event.sender)?.close();
});
