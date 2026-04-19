'use strict';
// preload.js — runs in the renderer context with Node access
// Exposes a safe, narrow electronAPI to the HTML pages via contextBridge.
// The HTML checks for window.electronAPI before using it; if absent it falls
// back to the existing File System Access API path (file:// / OneDrive mode).

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // ── File I/O ──────────────────────────────────────────────────────────────
  // relPath is always relative to the exe directory (or project root in dev).

  /** Write text content to a file. Creates parent directories as needed. */
  writeFile: (relPath, text) =>
    ipcRenderer.invoke('fs:write', relPath, text),

  /** Read a file as a UTF-8 string. Returns null if not found. */
  readFile: (relPath) =>
    ipcRenderer.invoke('fs:read', relPath),

  /** List files recursively under a relative directory path.
   *  Returns an array of relative paths. */
  scanDir: (relPath) =>
    ipcRenderer.invoke('fs:scan', relPath),

  /** Check whether a file exists. Returns true / false. */
  fileExists: (relPath) =>
    ipcRenderer.invoke('fs:exists', relPath),

  /** Delete a file relative to EXE_DIR. Silently succeeds if not found. */
  deleteFile: (relPath) =>
    ipcRenderer.invoke('fs:delete', relPath),

  // ── Native dialogs ────────────────────────────────────────────────────────

  /** Open a native "Save As" dialog. Returns the chosen file path or null. */
  saveDialog: (opts) =>
    ipcRenderer.invoke('dialog:save', opts),

  /** Open a native "Open File" dialog. Returns the chosen file path or null. */
  openDialog: (opts) =>
    ipcRenderer.invoke('dialog:open', opts),

  // ── App info ──────────────────────────────────────────────────────────────

  /** Returns the current app version string (from package.json). */
  getVersion: () =>
    ipcRenderer.invoke('app:version'),

  /** Returns the absolute path to the exe directory (override files live here). */
  getExeDir: () =>
    ipcRenderer.invoke('app:exeDir'),

  /** Close the current window (triggers app quit if it's the last window). */
  closeWindow: () =>
    ipcRenderer.send('window:close'),

  /** Trigger the native print dialog for the current window.
   *  window.print() is overridden in the renderer to call this so it works
   *  reliably in Electron 41 / Chromium 146. */
  printPage: () =>
    ipcRenderer.invoke('window:print'),
});
