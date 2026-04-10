# Phase 2 Implementation Plan
## Auto-Save, Cross-Device Resume, Night Log Promotion, History & Reports Merge

> Build in **stream order**. Each stream ends with a checkpoint — verify the app loads
> without console errors before beginning the next stream.
> If a session ends mid-stream, the **Insertion anchor** and **exact strings** below
> allow any stream to be resumed from the last completed step.

---

## Stream 1 — Config Constant + CSS + Sidebar Widget
*Purely additive. No existing code modified. Zero regression risk.*

### Step 1.1 — Site config constant
**Where:** Top of `<script>` block, immediately after the opening `<script>` tag.  
**Find this line:**
```js
const sectionTitles = {
```
**Insert before it:**
```js
// =============================================================
// SITE CONFIGURATION — edit this line to rename the OneDrive folder
// =============================================================
const SHIFT_BASE_FOLDER = 'shiftLogs';
// =============================================================
```

---

### Step 1.2 — Auto-save widget CSS
**Where:** Inside `<style>`, after this line (≈ line 248):
```css
    .save-toggle-desc { font-size: 11px; color: var(--muted); }
```
**Insert after it:**
```css
    /* Auto-save sidebar widget */
    .autosave-wrap { padding: 10px 20px 14px; border-top: 1px solid var(--border); }
    .autosave-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; color: var(--muted); text-transform: uppercase; margin-bottom: 6px; }
    .autosave-row { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
    .autosave-desc { font-size: 11px; color: var(--muted); }
    .autosave-desc.active { color: var(--green); }
    .btn-autosave { font-size: 10px; padding: 3px 8px; background: transparent; border: 1px solid var(--border); color: var(--muted); border-radius: 4px; cursor: pointer; white-space: nowrap; transition: color .15s, border-color .15s; }
    .btn-autosave:hover { border-color: var(--gold); color: var(--gold); }
    .btn-autosave:focus { outline: 2px solid var(--gold); }
```

---

### Step 1.3 — Auto-save sidebar widget HTML
**Where:** In the `<aside>` sidebar, replace the closing `</aside>` tag.  
**Find:**
```html
      <button class="toggle-pill" id="persistToggle" onclick="togglePersist()" aria-label="Toggle data persistence" aria-pressed="false"></button>
    </div>
  </div>
</aside>
```
**Replace with:**
```html
      <button class="toggle-pill" id="persistToggle" onclick="togglePersist()" aria-label="Toggle data persistence" aria-pressed="false"></button>
    </div>
  </div>

  <!-- Auto-save to OneDrive folder -->
  <div class="autosave-wrap">
    <div class="autosave-label">Shift Auto-save</div>
    <div class="autosave-row">
      <span class="autosave-desc" id="autoSaveDesc">Not configured</span>
      <button class="btn-autosave" id="autoSaveSetupBtn" onclick="setupAutoSaveFolder()" aria-label="Configure auto-save folder">Set folder</button>
    </div>
  </div>
</aside>
```

**✅ Checkpoint 1:** Open app in browser. Sidebar shows "Shift Auto-save / Not configured" widget below Persist Data toggle. No console errors.

---

## Stream 2 — Dashboard Card + History Button
*Purely additive HTML changes.*

### Step 2.1 — "Resume Shift from File" quick-action card
**Where:** `section-dashboard` quick-actions grid.  
**Find:**
```html
    <div class="quick-action-card" onclick="showSection('notes', document.querySelector('[data-section=notes]'))" role="button" tabindex="0" aria-label="Log shift notes">
      <div class="quick-action-icon">📝</div>
      <div>
        <div class="quick-action-title">Log Shift Notes</div>
        <div class="quick-action-desc">Notes &amp; handover for next shift</div>
      </div>
    </div>
  </div>
```
**Replace with:**
```html
    <div class="quick-action-card" onclick="showSection('notes', document.querySelector('[data-section=notes]'))" role="button" tabindex="0" aria-label="Log shift notes">
      <div class="quick-action-icon">📝</div>
      <div>
        <div class="quick-action-title">Log Shift Notes</div>
        <div class="quick-action-desc">Notes &amp; handover for next shift</div>
      </div>
    </div>
    <div class="quick-action-card" onclick="resumeShiftFromFile()" role="button" tabindex="0" aria-label="Resume a saved shift session from another device">
      <div class="quick-action-icon">📂</div>
      <div>
        <div class="quick-action-title">Resume Shift from File</div>
        <div class="quick-action-desc">Load a session saved on another device</div>
      </div>
    </div>
  </div>
```

---

### Step 2.2 — History section: "Load from Folder" button
**Where:** `section-history` header.  
**Find:**
```html
    <button class="btn btn-danger btn-sm" onclick="clearHistory()" aria-label="Clear all shift history">🗑 Clear History</button>
```
**Replace with:**
```html
    <div style="display:flex;gap:8px;">
      <button class="btn btn-ghost btn-sm" onclick="loadHistoryFromFolder()" aria-label="Manually refresh history from OneDrive folder">📁 Sync from Folder</button>
      <button class="btn btn-danger btn-sm" onclick="clearHistory()" aria-label="Clear all shift history">🗑 Clear History</button>
    </div>
```

**✅ Checkpoint 2:** Dashboard shows 5 quick-action cards. History section header shows "Sync from Folder" + "Clear History" buttons side by side. Clicking the new buttons shows a browser error (functions not yet defined) — that is expected at this stage.

---

## Stream 3 — Night Log Promoted to Core Nav
*Two small HTML changes. No JS changes.*

### Step 3.1 — Move Night Log nav item into Core group
**Find the entire Night Log nav item in the Tools group:**
```html
    <div class="nav-item" data-section="nightlog" onclick="showSection('nightlog',this)" role="button" tabindex="0" aria-label="Night Log">
      <span class="nav-icon">📋</span> Night Log
    </div>
```
**Delete it from there**, then find:
```html
    <div class="nav-item" data-section="notes" onclick="showSection('notes',this)" role="button" tabindex="0" aria-label="Notes and Handover">
```
**Insert the Night Log item immediately before it:**
```html
    <div class="nav-item" data-section="nightlog" onclick="showSection('nightlog',this)" role="button" tabindex="0" aria-label="Night Log">
      <span class="nav-icon">📋</span> Night Log
    </div>
```
*(Order becomes: Dashboard → Checklist → Night Audit → **Night Log** → Notes → Motivation → AI Coach → History)*

---

### Step 3.2 — Remove Monthly Report from Tools nav
**Find and delete:**
```html
    <div class="nav-item" data-section="reports" onclick="showSection('reports',this)" role="button" tabindex="0" aria-label="Monthly Report">
      <span class="nav-icon">📊</span> Monthly Report
    </div>
```

**✅ Checkpoint 3:** Night Log appears in Core nav between Night Audit and Notes. Monthly Report is gone from nav. Night Log section navigates correctly. No console errors.

---

## Stream 4 — Auto-Save JS Block
*Large new JS block inserted before `function init()`. Does not modify any existing function.*

### Step 4.1 — Insert complete auto-save JS block
**Find:**
```js
// -- INIT --
function init() {
```
**Insert the entire block below immediately before it:**

```js
// =============================================================
// STREAM 4: SHIFT AUTO-SAVE & CROSS-DEVICE RESUME
// File System Access API + IndexedDB for folder handle persistence
// =============================================================

// -- IndexedDB helpers (store FileSystemDirectoryHandle across page loads) --
function openShiftDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('shiftCompanionDB', 1);
    req.onupgradeneeded = e => e.target.result.createObjectStore('handles');
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(e.target.error);
  });
}
async function getStoredFolderHandle() {
  try {
    const db = await openShiftDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('handles', 'readonly');
      tx.objectStore('handles').get('shiftFolder').onsuccess = e => res(e.target.result || null);
      tx.onerror = e => rej(e.target.error);
    });
  } catch { return null; }
}
async function storeFolderHandle(handle) {
  try {
    const db = await openShiftDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('handles', 'readwrite');
      tx.objectStore('handles').put(handle, 'shiftFolder');
      tx.oncomplete = () => res();
      tx.onerror = e => rej(e.target.error);
    });
  } catch {}
}

// -- Folder structure: <root>/shiftLogs/YYYY/YYYY-MM MMM/ --
async function getShiftMonthFolder(rootHandle) {
  const now    = new Date();
  const year   = now.getFullYear().toString();
  const mm     = String(now.getMonth() + 1).padStart(2, '0');
  const mon    = now.toLocaleDateString('en-GB', { month: 'short' }); // "Apr"
  const monthFolder = `${year}-${mm} ${mon}`;                         // "2026-04 Apr"

  const base = await rootHandle.getDirectoryHandle(SHIFT_BASE_FOLDER, { create: true });
  const yr   = await base.getDirectoryHandle(year, { create: true });
  const mo   = await yr.getDirectoryHandle(monthFolder, { create: true });
  return mo;
}

// -- Write JSON to a named file in a directory handle --
async function writeToFolder(dirHandle, filename, obj) {
  const fileHandle = await dirHandle.getFileHandle(filename, { create: true });
  const writable   = await fileHandle.createWritable();
  await writable.write(JSON.stringify(obj, null, 2));
  await writable.close();
}

// -- Build a full in-progress session snapshot --
function buildSessionSnapshot() {
  const id = 'shift_' + (shiftStart || Date.now());
  return {
    schemaVersion:  1,
    type:           'shift_session',
    shiftId:        id,
    savedAt:        new Date().toISOString(),
    staffName,
    staffRole,
    staffShift,
    shiftStart:     shiftStart || Date.now(),
    shiftNotes:     document.getElementById('shiftNotes')?.value    || '',
    handoverNotes:  document.getElementById('handoverNotes')?.value || '',
    breakfastBags:  document.getElementById('breakfastBags')?.value || '',
    handoverTaxis:  document.getElementById('handoverTaxis')?.value || '',
    wakeUpCalls:    document.getElementById('wakeUpCalls')?.value   || '',
    checklistState: { ...checkState },
    auditState:     { ...auditState },
    logEntries:     JSON.parse(JSON.stringify(logEntries)),
    floorWalkState: { ...floorWalkState },
    nightlogActive,
    nightlogLeader: shiftLeader    || '',
    nightlogStart:  shiftStartTime || null,
    boardData:      collectBoardData(),
    lastCheckInTime: lastCheckInTime || null,
  };
}

// -- Stable filenames --
function _dateStamp(d) {
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}
function _timeStamp(d) {
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d.getHours())}${pad(d.getMinutes())}`;
}
function sessionFilename() {
  const d = new Date(shiftStart || Date.now());
  return `shift_session_${_dateStamp(d)}T${_timeStamp(d)}.json`;
}
function completedShiftFilename() {
  const d = new Date();
  return `shift_${_dateStamp(d)}T${_timeStamp(d)}.json`;
}

// -- Auto-save state --
let autoSaveInterval     = null;
let autoSaveFolderHandle = null;

// -- Update sidebar widget text --
function updateAutoSaveStatus(active, lastSaved) {
  const desc = document.getElementById('autoSaveDesc');
  if (!desc) return;
  if (!active) {
    desc.textContent = 'Not configured';
    desc.classList.remove('active');
  } else {
    desc.textContent = lastSaved ? `Saved ${lastSaved}` : 'Active';
    desc.classList.add('active');
  }
}

// -- Single auto-save write --
async function autoSaveTick() {
  if (!autoSaveFolderHandle) return;
  try {
    const perm = await autoSaveFolderHandle.queryPermission({ mode: 'readwrite' });
    if (perm !== 'granted') {
      const req = await autoSaveFolderHandle.requestPermission({ mode: 'readwrite' });
      if (req !== 'granted') { updateAutoSaveStatus(false); return; }
    }
    const dir = await getShiftMonthFolder(autoSaveFolderHandle);
    await writeToFolder(dir, sessionFilename(), buildSessionSnapshot());
    const now = new Date();
    const t   = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    updateAutoSaveStatus(true, t);
  } catch(e) {
    console.warn('Auto-save tick failed:', e);
  }
}

function startAutoSaveInterval() {
  if (autoSaveInterval) clearInterval(autoSaveInterval);
  autoSaveInterval = setInterval(autoSaveTick, 5 * 60 * 1000);
  autoSaveTick(); // immediate first save
}
function stopAutoSaveInterval() {
  if (autoSaveInterval) { clearInterval(autoSaveInterval); autoSaveInterval = null; }
}

// -- Silently load + merge history from folder on startup --
async function silentlyLoadHistory(rootHandle) {
  try {
    const files = [];
    await scanDirForShiftFiles(rootHandle, files);
    if (files.length === 0) return;

    const existingIds = new Set(shiftHistory.map(s => s._shiftId).filter(Boolean));
    let added = 0;
    for (const text of files) {
      try {
        const data = JSON.parse(text);
        if (data.schemaVersion !== 1 || data.type !== 'shift' || !data.shift) continue;
        if (existingIds.has(data.shiftId)) continue;
        existingIds.add(data.shiftId);
        shiftHistory.push({ ...data.shift, _shiftId: data.shiftId });
        added++;
      } catch {}
    }
    if (added > 0) {
      shiftHistory.sort((a, b) => new Date(b.date||0) - new Date(a.date||0));
      try { localStorage.setItem('shiftCompanion_history', JSON.stringify(shiftHistory)); } catch {}
      renderHistory();
    }
  } catch {}  // fully silent on startup
}

// -- Init: restore handle from IDB, start interval, load history --
async function initAutoSave() {
  if (!window.showDirectoryPicker) return; // API unavailable
  const handle = await getStoredFolderHandle();
  if (!handle) return;
  autoSaveFolderHandle = handle;
  try {
    const perm = await handle.queryPermission({ mode: 'readwrite' });
    if (perm === 'granted') {
      startAutoSaveInterval();
      updateAutoSaveStatus(true, null);
      silentlyLoadHistory(handle);  // fire-and-forget
    } else {
      const desc = document.getElementById('autoSaveDesc');
      if (desc) { desc.textContent = 'Re-authorise required'; }
    }
  } catch {}
}

// -- "Set folder" button handler --
async function setupAutoSaveFolder() {
  if (!window.showDirectoryPicker) {
    alert('Your browser does not support the File System Access API.\nAuto-save is unavailable.'); return;
  }
  try {
    const handle = await showDirectoryPicker({ mode: 'readwrite', id: 'shiftAutoSave' });
    autoSaveFolderHandle = handle;
    await storeFolderHandle(handle);
    startAutoSaveInterval();
    updateAutoSaveStatus(true, null);
    alert(`Auto-save folder set: ${handle.name}\nShift files will be written to ${handle.name}/${SHIFT_BASE_FOLDER}/YYYY/YYYY-MM MMM/`);
  } catch(e) {
    if (e.name !== 'AbortError') console.warn('Folder setup failed:', e);
  }
}

// -- Export completed shift JSON at End Shift --
async function exportCompletedShift(entry) {
  if (!autoSaveFolderHandle) return;
  try {
    const perm = await autoSaveFolderHandle.queryPermission({ mode: 'readwrite' });
    if (perm !== 'granted') {
      const req = await autoSaveFolderHandle.requestPermission({ mode: 'readwrite' });
      if (req !== 'granted') return;
    }
    const dir = await getShiftMonthFolder(autoSaveFolderHandle);
    const payload = {
      schemaVersion: 1,
      type:          'shift',
      shiftId:       'shift_' + (shiftStart || Date.now()),
      exportedAt:    new Date().toISOString(),
      shift:         entry,
    };
    await writeToFolder(dir, completedShiftFilename(), payload);
    // Delete in-progress session file now that shift is complete
    try { await dir.removeEntry(sessionFilename()); } catch {}
  } catch(e) {
    console.warn('Completed shift export failed:', e);
  }
}

// -- Resume Shift from File (Dashboard button) --
async function resumeShiftFromFile() {
  if (!window.showOpenFilePicker) {
    alert('Your browser does not support the File System Access API.'); return;
  }
  try {
    const [fileHandle] = await showOpenFilePicker({
      types: [{ description: 'Shift Session JSON', accept: { 'application/json': ['.json'] } }],
      multiple: false,
    });
    const file = await fileHandle.getFile();
    const text = await file.text();
    let data;
    try { data = JSON.parse(text); } catch { alert('File is not valid JSON.'); return; }
    if (data.schemaVersion !== 1 || data.type !== 'shift_session') {
      alert('This does not appear to be a shift session file.\nOnly files named shift_session_….json can be resumed here.'); return;
    }
    const savedAt = new Date(data.savedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    if (!confirm(`Resume shift for ${data.staffName || 'Unknown'}, last saved at ${savedAt}?\n\nThis will replace your current in-progress session.`)) return;
    restoreSessionSnapshot(data);
  } catch(e) {
    if (e.name !== 'AbortError') alert('Could not open file: ' + e.message);
  }
}

// -- Restore in-memory state from a session snapshot --
function restoreSessionSnapshot(data) {
  shiftStart      = data.shiftStart     || Date.now();
  checkState      = data.checklistState || {};
  auditState      = data.auditState     || {};
  logEntries      = data.logEntries     || [];
  floorWalkState  = data.floorWalkState || {};
  nightlogActive  = data.nightlogActive || false;
  shiftLeader     = data.nightlogLeader || data.staffName || '';
  shiftStartTime  = data.nightlogStart  || null;
  lastCheckInTime = data.lastCheckInTime || null;

  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  setVal('shiftNotes',    data.shiftNotes);
  setVal('handoverNotes', data.handoverNotes);
  setVal('breakfastBags', data.breakfastBags);
  setVal('handoverTaxis', data.handoverTaxis);
  setVal('wakeUpCalls',   data.wakeUpCalls);

  if (data.boardData) { try { loadBoardData(data.boardData); } catch {} }

  if (nightlogActive) {
    document.getElementById('nightlogStart')?.classList.add('hidden');
    document.getElementById('nightlogMain')?.classList.remove('hidden');
    const nlName = document.getElementById('nightlogLeaderName');
    if (nlName) nlName.value = shiftLeader;
  }

  renderChecklist('preAudit');
  renderAuditSteps();
  renderNightLogEntries();
  updateDashboardStats();
  updateCheckInDisplay();
  if (persistData) saveState();

  alert('Shift session restored.');
  showSection('dashboard', document.querySelector('[data-section=dashboard]'));
}

// -- Manual "Sync from Folder" button (History section) --
async function loadHistoryFromFolder() {
  if (!window.showDirectoryPicker) {
    alert('Your browser does not support the File System Access API.'); return;
  }
  // Reuse stored handle if available; prompt only if not
  let rootHandle = autoSaveFolderHandle;
  if (!rootHandle) {
    try {
      rootHandle = await showDirectoryPicker({ mode: 'readwrite', id: 'shiftAutoSave' });
      autoSaveFolderHandle = rootHandle;
      await storeFolderHandle(rootHandle);
      startAutoSaveInterval();
      updateAutoSaveStatus(true, null);
    } catch(e) {
      if (e.name !== 'AbortError') alert('Could not open folder: ' + e.message);
      return;
    }
  } else {
    // Re-request permission if needed (requires user gesture — button click qualifies)
    try {
      const perm = await rootHandle.queryPermission({ mode: 'readwrite' });
      if (perm !== 'granted') {
        const req = await rootHandle.requestPermission({ mode: 'readwrite' });
        if (req !== 'granted') { alert('Permission to access the folder was denied.'); return; }
      }
    } catch {}
  }

  const files = [];
  await scanDirForShiftFiles(rootHandle, files);
  if (files.length === 0) {
    alert('No completed shift files found in this folder or its subfolders.'); return;
  }

  const existingIds = new Set(shiftHistory.map(s => s._shiftId).filter(Boolean));
  let added = 0;
  for (const text of files) {
    try {
      const data = JSON.parse(text);
      if (data.schemaVersion !== 1 || data.type !== 'shift' || !data.shift) continue;
      if (existingIds.has(data.shiftId)) continue;
      existingIds.add(data.shiftId);
      shiftHistory.push({ ...data.shift, _shiftId: data.shiftId });
      added++;
    } catch {}
  }
  shiftHistory.sort((a, b) => new Date(b.date||0) - new Date(a.date||0));
  try { localStorage.setItem('shiftCompanion_history', JSON.stringify(shiftHistory)); } catch {}
  renderHistory();
  alert(`Sync complete. ${added} new shift${added !== 1 ? 's' : ''} added. (${files.length - added} already present.)`);
}

// -- Recursively scan directory for completed shift JSON files --
async function scanDirForShiftFiles(dirHandle, results) {
  for await (const [name, handle] of dirHandle.entries()) {
    if (handle.kind === 'directory') {
      await scanDirForShiftFiles(handle, results);
    } else if (
      handle.kind === 'file' &&
      name.endsWith('.json') &&
      name.startsWith('shift_') &&
      !name.startsWith('shift_session_')
    ) {
      try { results.push(await (await handle.getFile()).text()); } catch {}
    }
  }
}
```

**✅ Checkpoint 4:** All auto-save functions defined. "Set folder" button prompts for a directory and shows "Active" in sidebar. "Sync from Folder" in History section works (or shows "No files found" if folder is empty). Console has no errors. Auto-save does not fire yet (init not wired). "Resume Shift from File" opens a file picker.

---

## Stream 5 — Wire confirmEndShift() and init()

### Step 5.1 — confirmEndShift(): export completed shift file
**Find:**
```js
  // Save to history (always)
  shiftHistory.push(entry);
  try { localStorage.setItem('shiftCompanion_history', JSON.stringify(shiftHistory)); } catch {}
```
**Replace with:**
```js
  // Save to history (always)
  shiftHistory.push(entry);
  try { localStorage.setItem('shiftCompanion_history', JSON.stringify(shiftHistory)); } catch {}
  exportCompletedShift(entry);  // write to OneDrive folder + delete session file (no-op if not configured)
```

---

### Step 5.2 — init(): start auto-save on page load
**Find:**
```js
  // Show first section
  showSection('dashboard', document.querySelector('[data-section=dashboard]'));
```
**Insert immediately before it:**
```js
  // Start auto-save and silently load history from OneDrive folder
  initAutoSave();
```

**✅ Checkpoint 5:** On page load the auto-save interval starts silently if a folder was previously configured. End Shift writes a completed `shift_YYYY-MM-DDTHHmm.json` to the correct `shiftLogs/YYYY/YYYY-MM MMM/` path and deletes the session file. No console errors.

---

## Stream 6 — History Section: Charts + Filter + Entries Table
*Replace History section HTML. Migrate canvas IDs from Monthly Report.*

### Step 6.1 — Replace section-history HTML
**Find the entire `<section class="section" id="section-history" ...>` block** (ends just before the Monthly Report section comment at `<!-- SECTION: NIGHT LOG -->`).

**Replace entirely with:**

```html
<section class="section" id="section-history" aria-label="Shift History and Reports">
  <div class="flex-between mb-16">
    <div>
      <div class="section-heading">Shift History &amp; Reports</div>
      <div class="section-sub">Shift records from this device and OneDrive folder.</div>
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-ghost btn-sm no-print" onclick="loadHistoryFromFolder()" aria-label="Sync history from OneDrive folder">📁 Sync from Folder</button>
      <button class="btn btn-ghost btn-sm no-print" onclick="window.print()" aria-label="Print shift history report">🖨️ Print Report</button>
      <button class="btn btn-danger btn-sm no-print" onclick="clearHistory()" id="clearHistoryBtn" aria-label="Clear all shift history">🗑 Clear</button>
    </div>
  </div>

  <!-- Filter bar -->
  <div class="card mb-16 no-print" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;">
    <div class="form-group" style="margin-bottom:0;flex:1;min-width:140px;">
      <label for="histFilterMonth">Month</label>
      <select id="histFilterMonth" onchange="renderHistory()" aria-label="Filter by month">
        <option value="">All months</option>
      </select>
    </div>
    <div class="form-group" style="margin-bottom:0;flex:1;min-width:140px;">
      <label for="histFilterStaff">Staff</label>
      <input type="text" id="histFilterStaff" placeholder="Name…" maxlength="60" oninput="renderHistory()" aria-label="Filter by staff name">
    </div>
    <button class="btn btn-ghost btn-sm" onclick="clearHistoryFilters()" aria-label="Clear filters">✕ Clear filters</button>
  </div>

  <!-- Aggregate Stats -->
  <div class="history-stats" id="historyStats">
    <div class="history-stat-card">
      <div class="history-stat-value" id="hStatShifts">0</div>
      <div class="history-stat-label">Total Shifts</div>
    </div>
    <div class="history-stat-card">
      <div class="history-stat-value" id="hStatAvgChecklist">—</div>
      <div class="history-stat-label">Avg Checklist %</div>
    </div>
    <div class="history-stat-card">
      <div class="history-stat-value" id="hStatIncidents">0</div>
      <div class="history-stat-label">Total Incidents</div>
    </div>
    <div class="history-stat-card">
      <div class="history-stat-value" id="hStatTopType" style="font-size:14px;padding-top:6px;">—</div>
      <div class="history-stat-label">Most Common Type</div>
    </div>
  </div>

  <!-- Charts (populated from night log entries across all shifts) -->
  <div class="chart-grid" id="historyCharts">
    <div class="chart-wrap">
      <div class="chart-title">Issues by Category</div>
      <canvas id="chartCategory" height="200"></canvas>
    </div>
    <div class="chart-wrap">
      <div class="chart-title">Issues by Floor</div>
      <canvas id="chartFloor" height="200"></canvas>
    </div>
    <div class="chart-wrap">
      <div class="chart-title">Issues by Severity</div>
      <canvas id="chartSeverity" height="200"></canvas>
    </div>
    <div class="chart-wrap">
      <div class="chart-title">Floor Walk Results</div>
      <canvas id="chartAllClear" height="200"></canvas>
    </div>
  </div>

  <!-- Shift list -->
  <div id="historyList"></div>
  <div class="empty-state hidden" id="historyEmpty">
    <div class="empty-state-icon">📂</div>
    <div class="empty-state-text">No shifts recorded yet.<br>Complete a shift using the End Shift button, or sync from your OneDrive folder.</div>
  </div>

  <!-- All incidents table -->
  <div class="card mt-16" id="histEntriesCard" style="overflow-x:auto;">
    <div class="card-header">
      <div class="card-title">All Incidents</div>
      <input type="text" id="histEntriesFilter" placeholder="Filter by title, category, floor…"
             style="max-width:260px;" oninput="filterHistoryEntries()" aria-label="Filter incident entries">
    </div>
    <table class="report-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Staff</th>
          <th>Floor</th>
          <th>Category</th>
          <th>Severity</th>
          <th>Title</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody id="histEntriesBody"></tbody>
    </table>
    <div class="empty-state hidden" id="histEntriesEmpty">
      <div class="empty-state-icon">📋</div>
      <div class="empty-state-text">No incident entries found. Incidents logged during a shift appear here after End Shift.</div>
    </div>
  </div>
</section>
```

---

### Step 6.2 — Update sectionTitles map
**Find:**
```js
  history:    'SHIFT HISTORY',
```
**Replace with:**
```js
  history:    'SHIFT HISTORY & REPORTS',
```

Also **find and delete:**
```js
  reports:    'MONTHLY REPORT',
```

---

### Step 6.3 — Extend renderHistory() and add new JS helpers
The existing `renderHistory()` only renders the shift list. Extend it to also update filters, charts, and the entries table.

**Find the entire `function renderHistory()` function** (starts at `function renderHistory() {`, ends before `function toggleHistoryDetail`).

**Replace entirely with:**

```js
function renderHistory() {
  const list  = document.getElementById('historyList');
  const empty = document.getElementById('historyEmpty');
  if (!list) return;

  // Populate month filter dropdown
  const monthSel = document.getElementById('histFilterMonth');
  if (monthSel) {
    const months = [...new Set(shiftHistory.map(s => {
      // Extract YYYY-MM from s.date (format: "Mon, 10 Apr 2026")
      try { const d = new Date(s.date); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; } catch { return null; }
    }).filter(Boolean))].sort().reverse();
    const current = monthSel.value;
    monthSel.innerHTML = '<option value="">All months</option>' +
      months.map(m => {
        const [y, mo] = m.split('-');
        const label = new Date(y, parseInt(mo)-1, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
        return `<option value="${m}" ${m === current ? 'selected' : ''}>${label}</option>`;
      }).join('');
  }

  // Apply filters
  const filterMonth = document.getElementById('histFilterMonth')?.value || '';
  const filterStaff = (document.getElementById('histFilterStaff')?.value || '').toLowerCase();
  const filtered = shiftHistory.filter(s => {
    if (filterStaff && !(s.staffName || '').toLowerCase().includes(filterStaff)) return false;
    if (filterMonth) {
      try {
        const d = new Date(s.date);
        const sm = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
        if (sm !== filterMonth) return false;
      } catch { return false; }
    }
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
  } else {
    if (empty) empty.classList.add('hidden');
    list.innerHTML = [...filtered].reverse().map((s, revIdx) => {
      const idx = shiftHistory.indexOf(s);
      const date    = s.date       || '—';
      const staff   = s.staffName  || '—';
      const role    = s.staffRole  || '—';
      const hn      = s.handoverNotes  || '';
      const sn      = s.shiftNotes     || '';
      const bb      = s.breakfastBags  || '';
      const tx      = s.handoverTaxis  || '';
      const wu      = s.wakeUpCalls    || '';
      const issues  = s.incidentCount ?? 0;
      const clPct   = s.checklistPct ?? 0;
      const auditPct= s.auditPct     ?? 0;
      return `
        <div class="history-entry">
          <div class="history-entry-header">
            <div>
              <span class="history-staff">${escapeHtml(staff)}</span>
              <span class="history-role">${escapeHtml(role)}</span>
            </div>
            <div class="history-meta">
              <span>${escapeHtml(date)}</span>
              <button class="btn btn-ghost btn-sm" onclick="loadHandoverFromHistory(${idx})" aria-label="Load handover from this shift">📋 Load Handover</button>
              <button class="btn btn-ghost btn-sm" onclick="toggleHistoryDetail(this)" aria-label="Expand shift details">▼ Details</button>
            </div>
          </div>
          <div class="history-stats">
            <span>Checklist: <strong>${clPct}%</strong></span>
            <span>Audit: <strong>${auditPct}%</strong></span>
            <span>Incidents: <strong>${issues}</strong></span>
          </div>
          <div class="history-detail hidden">
            ${sn ? `<div class="history-section-label">Shift Notes</div><div class="history-section-body">${escapeHtml(sn)}</div>` : ''}
            ${hn ? `<div class="history-section-label">Handover Notes</div><div class="history-section-body">${escapeHtml(hn)}</div>` : ''}
            ${(bb || tx || wu) ? `<div class="history-section-label">Breakfast Bags / Taxis / Wake-up Calls</div><div class="history-section-body" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
              <div><em style="color:var(--muted);font-size:11px">Breakfast Bags</em><br>${escapeHtml(bb) || '<span style="color:var(--muted)">—</span>'}</div>
              <div><em style="color:var(--muted);font-size:11px">Taxis</em><br>${escapeHtml(tx) || '<span style="color:var(--muted)">—</span>'}</div>
              <div><em style="color:var(--muted);font-size:11px">Wake-up Calls</em><br>${escapeHtml(wu) || '<span style="color:var(--muted)">—</span>'}</div>
            </div>` : ''}
            ${!sn && !hn && !bb && !tx && !wu ? '<p style="color:var(--muted)">No notes recorded.</p>' : ''}
          </div>
        </div>`;
    }).join('');
  }

  updateHistoryStats(filtered);
  renderHistoryCharts(filtered);
  renderHistoryEntries();
}

function clearHistoryFilters() {
  const ms = document.getElementById('histFilterMonth'); if (ms) ms.value = '';
  const sf = document.getElementById('histFilterStaff'); if (sf) sf.value = '';
  renderHistory();
}

function renderHistoryCharts(filteredShifts) {
  // Collect all night log entries from filtered shifts
  const allIssues = [];
  const allWalks  = [];
  (filteredShifts || shiftHistory).forEach(s => {
    (s.incidents || []).forEach(e => { if (e.type === 'issue' || !e.type) allIssues.push({ ...e, _shiftDate: s.date }); });
  });
  renderBarChart('chartCategory', countBy(allIssues, 'category'),  'Issues by Category');
  renderBarChart('chartFloor',    countBy(allIssues, 'floor'),     'Issues by Floor');
  renderBarChart('chartSeverity', countBy(allIssues, 'severity'),  'Issues by Severity');
  // All-clear: use incidents length as proxy (0 incidents = all clear)
  const acData = {
    'No Incidents': (filteredShifts || shiftHistory).filter(s => (s.incidentCount||0) === 0).length,
    'Had Incidents': (filteredShifts || shiftHistory).filter(s => (s.incidentCount||0) > 0).length,
  };
  renderBarChart('chartAllClear', acData, 'Shifts: Incidents vs Clear');
}

function renderHistoryEntries() {
  const tbody = document.getElementById('histEntriesBody');
  const empty = document.getElementById('histEntriesEmpty');
  if (!tbody) return;
  const filter = (document.getElementById('histEntriesFilter')?.value || '').toLowerCase();

  const rows = [];
  shiftHistory.forEach(s => {
    (s.incidents || []).forEach(e => rows.push({ ...e, _shiftDate: s.date, _staffName: s.staffName }));
  });

  const filtered = rows.filter(e => {
    if (!filter) return true;
    return [e.category, e.floor, e.severity, e.title, e.description, e._staffName, e._shiftDate]
      .some(v => (v||'').toLowerCase().includes(filter));
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');
  tbody.innerHTML = filtered.map(e => `
    <tr>
      <td style="white-space:nowrap">${escapeHtml(e._shiftDate||'—')}</td>
      <td>${escapeHtml(e._staffName||'—')}</td>
      <td>${escapeHtml(e.floor||'—')}</td>
      <td>${escapeHtml(e.category||'—')}</td>
      <td><span class="badge badge-${e.severity==='high'?'red':e.severity==='medium'?'gold':'muted'}">${e.severity||'—'}</span></td>
      <td>${escapeHtml(e.title||'—')}</td>
      <td><span class="badge ${e.rectified?'badge-green':'badge-muted'}">${e.rectified?'Resolved':'Pending'}</span></td>
    </tr>`).join('');
}

function filterHistoryEntries() {
  renderHistoryEntries();
}
```

---

### Step 6.4 — Patch updateHistoryStats() to accept filtered set
**Find:**
```js
function updateHistoryStats() {
  const total = shiftHistory.length;
```
**Replace with:**
```js
function updateHistoryStats(filtered) {
  const set   = filtered || shiftHistory;
  const total = set.length;
```
And change all remaining references to `shiftHistory` **within this function only** to `set`:
- `shiftHistory.reduce` → `set.reduce`
- `shiftHistory.forEach` → `set.forEach`

Also update the stat card IDs used by this function — they now target the History section stat cards (`hStatShifts`, `hStatAvgChecklist`, `hStatIncidents`, `hStatTopType`). Double-check these match the IDs in the new HTML above.

**Find and replace within `updateHistoryStats`:**
```js
  document.getElementById('histTotalShifts')
  document.getElementById('histAvgChecklist')
  document.getElementById('histTotalIncidents')
  document.getElementById('histCommonType')
```
**Replace with:**
```js
  document.getElementById('hStatShifts')
  document.getElementById('hStatAvgChecklist')
  document.getElementById('hStatIncidents')
  document.getElementById('hStatTopType')
```

**✅ Checkpoint 6:** History section renders charts, filter bar, shift list, and incidents table. Filters by month and staff name work. Sync from Folder populates new shifts. Charts update. Print shows clean layout. No console errors.

---

## Stream 7 — Monthly Report Section Removal

### Step 7.1 — Remove section-reports HTML
Delete the entire `<section class="section" id="section-reports" ...>` block from the HTML (from the opening `<section` tag to its matching `</section>`).

### Step 7.2 — Remove Monthly Report JS
The following functions become redundant. Delete them:
- `function handleReportFileChange(e)`
- `function importReportFiles(files)` (if separate)
- `function renderReports()`
- `function renderReportEntries(filter)`
- `function filterReportEntries()` — *but check the init() wiring first and remove the `addEventListener` for `rptFilter` too*
- `function clearReportData()`

Keep: `renderBarChart()`, `countBy()`, `formatDate()` — still used by History section.

### Step 7.3 — Remove Monthly Report variable declarations
**Find and delete:**
```js
let reportShifts  = [];
let reportEntries = [];
```
Also find and delete any `let allReportEntries = [];` declaration.

### Step 7.4 — Remove Monthly Report wiring from init()
**Find and delete these lines in `init()`:**
```js
  const rptFilter = document.getElementById('rptFilter');
  if (rptFilter) rptFilter.addEventListener('input', filterReportEntries);
  document.getElementById('clearReportBtn')?.addEventListener('click', clearReportData);
```

**✅ Final Checkpoint:** App loads with no console errors. Monthly Report no longer appears in nav or as a section. Night Log is in Core nav. History section shows charts, filter, shift list, and incidents table populated from all completed shifts. Auto-save writes to correct OneDrive folder structure. End Shift exports completed file and deletes session file.

---

## Summary of all files changed

| File | Streams |
|------|---------|
| `hotelcompanion_suite.html` | All — this is the only file |

## Key element IDs added (for reference)

| ID | Purpose |
|----|---------|
| `autoSaveDesc` | Sidebar auto-save status label |
| `autoSaveSetupBtn` | Sidebar "Set folder" button |
| `histFilterMonth` | History month filter dropdown |
| `histFilterStaff` | History staff name filter |
| `histEntriesBody` | History incidents table body |
| `histEntriesFilter` | History incidents filter input |
| `histEntriesEmpty` | History incidents empty state |
| `chartCategory/Floor/Severity/AllClear` | **Migrated** from Monthly Report — same IDs, new location |

## IDs removed (Monthly Report section)

`reportFileInput`, `reportFilesStatus`, `rStatShifts`, `rStatEntries`, `rStatIssues`, `rStatAllClear`, `rShiftTableBody`, `rEntriesTableBody`, `reportFilter`, `rEntriesEmpty` — all safe to remove as they are only referenced by the Monthly Report JS being deleted.
