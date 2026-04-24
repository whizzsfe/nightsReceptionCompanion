'use strict';
// main.js — Electron main process
// Night Receptionist Companion Suite v1.0.0
// © 2026 Whizzsfe Web Services — whizzsfe.com

const { app, BrowserWindow, ipcMain, dialog, shell, session, Menu, powerMonitor } = require('electron');
const path = require('path');
const fs   = require('fs');
const { pathToFileURL }  = require('url');

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
      webSecurity: true,
      // Prevent Windows power management from heavily throttling the renderer
      // when the window is not focused — avoids black/blank screens on idle.
      backgroundThrottling: false,
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
    console.log('[main] did-finish-load fired for:', htmlFile);
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

    // Override window.print() to route through IPC → webContents.print().
    win.webContents.executeJavaScript(`
      (function() {
        console.log('[print-setup] electronAPI present:', typeof window.electronAPI);
        if (window.electronAPI) {
          window.print = function () {
            console.log('[print] window.print called — routing to IPC');
            window.electronAPI.printPage();
          };
          console.log('[print-setup] window.print override installed');
        } else {
          console.warn('[print-setup] window.electronAPI not found — print override skipped');
        }
      })();
    `).catch(err => console.error('[print-setup] executeJavaScript error:', err));
  });

  // Auto-reload if the renderer process crashes or is killed.
  // This covers GPU context loss and Chromium renderer crashes that produce
  // a blank/black page.
  win.webContents.on('render-process-gone', (_event, details) => {
    console.warn('[renderer] render-process-gone:', details.reason, '— reloading');
    // Small delay so any crash dialog has time to close before reload.
    setTimeout(() => {
      if (!win.isDestroyed()) win.reload();
    }, 500);
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
  // Pre-compute a normalised file:// prefix for EXE_DIR so we can detect
  // requests that are already pointing at the correct location and avoid
  // re-intercepting them (which would cause an infinite redirect loop).
  // pathToFileURL handles spaces and other special chars correctly — a manual
  // replace(/\\/g, '/') would leave literal spaces while Chromium percent-encodes
  // them (%20), breaking the startsWith guard and causing ERR_TOO_MANY_REDIRECTS
  // on any install path that contains spaces (e.g. 'Night Receptionist Companion').
  const EXE_DIR_URL_PREFIX = pathToFileURL(EXE_DIR).href.replace(/\/?$/, '/');

  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    const url = details.url;

    // If the request is already coming from EXE_DIR, leave it alone.
    // Without this guard the handler would redirect the already-redirected
    // request back to itself, causing ERR_TOO_MANY_REDIRECTS.
    if (url.startsWith(EXE_DIR_URL_PREFIX)) {
      callback({});
      return;
    }

    // Extract the bare filename from the URL (ignore query strings/fragments).
    const urlBasename = url.split('/').pop().split('?')[0].split('#')[0];

    // Redirect logo files to the client's EXE_DIR version (so the hotel can
    // replace logos without rebuilding).
    if (urlBasename === 'hotelLogo.ico' || urlBasename === 'hotelLogo.jpg') {
      const clientFile = path.join(EXE_DIR, urlBasename);
      if (fs.existsSync(clientFile)) {
        callback({ redirectURL: pathToFileURL(clientFile).href });
        return;
      }
    }

    // Redirect override JS files to EXE_DIR.
    // In packaged builds these are extraFiles placed next to the exe, not
    // bundled in the asar. Without this, the <script src> tags 404.
    if (OVERRIDE_FILES.includes(urlBasename)) {
      const clientFile = path.join(EXE_DIR, urlBasename);
      if (fs.existsSync(clientFile)) {
        callback({ redirectURL: pathToFileURL(clientFile).href });
        return;
      }
      // File absent — let the request proceed; onerror in HTML handles it.
    }

    callback({});
  });

  // ---------------------------------------------------------------------------
  // Power events — reload all windows when the system wakes from sleep or the
  // screen is unlocked. On Windows hotel PCs the GPU context is often lost
  // during sleep, which causes the Electron window to stay black.
  // ---------------------------------------------------------------------------
  function reloadAllWindows() {
    for (const w of BrowserWindow.getAllWindows()) {
      if (!w.isDestroyed()) {
        console.log('[power] reloading window after system resume/unlock');
        w.reload();
      }
    }
  }
  powerMonitor.on('resume', reloadAllWindows);
  powerMonitor.on('unlock-screen', reloadAllWindows);

  createWindow('hotelcompanion_suite.html');

  // ---------------------------------------------------------------------------
  // App menu — adds "Open Content Editor" under a Manager menu
  // ---------------------------------------------------------------------------
  const menuTemplate = [
    {
      label: 'Manager',
      submenu: [
        {
          label: 'Open Content Editor',
          click() {
            const existing = BrowserWindow.getAllWindows().find(w =>
              w.webContents.getURL().includes('hotelcompanion_editor')
            );
            if (existing) {
              existing.focus();
            } else {
              const editor = createWindow('hotelcompanion_editor.html');
              editor.setTitle('Night Companion — Content Editor');
            }
          },
        },
        { type: 'separator' },
        {
          // Ctrl+P in Electron does NOT call window.print() — it must be
          // explicitly wired here. This is the guaranteed print path.
          label: 'Print Current Page',
          accelerator: 'CmdOrCtrl+P',
          click(_item, focusedWindow) {
            if (!focusedWindow) return;
            console.log('[print] Ctrl+P menu shortcut — calling webContents.print()');
            focusedWindow.webContents.print(
              { silent: false, printBackground: true },
              (success, reason) => {
                if (!success) console.warn('[print] failed:', reason);
              }
            );
          },
        },
        { type: 'separator' },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'F12',
          click(_item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.openDevTools({ mode: 'detach' });
          },
        },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
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

/** Trigger the native print dialog. Routes window.print() calls from the
 *  renderer through the main process to avoid Electron 41 / Chromium 146
 *  user-gesture restrictions on window.print(). */
ipcMain.handle('window:print', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) { console.warn('[print] No window found for sender'); return; }
  console.log('[print] IPC received — opening print dialog via webContents.print()');
  win.webContents.print(
    { silent: false, printBackground: true },
    (success, failureReason) => {
      if (success) {
        console.log('[print] Print job sent successfully');
      } else {
        console.warn('[print] webContents.print failed:', failureReason);
      }
    }
  );
});
