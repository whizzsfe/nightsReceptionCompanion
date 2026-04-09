# Build Plan: hotelcompanion_suite.html

**Approach:** Write the file directly to disk in 11 sequential PowerShell append-write operations.
- Chunk 1 uses Set-Content (creates/overwrites the file)
- Chunks 2–11 use Add-Content (appends to the file)
- No source file reading during build. No HTML output in chat.
- Each chunk is bounded and focused. Build is sequential.

---

## CHUNK 1 — HTML head + full CSS  [Set-Content — CREATES FILE]
- DOCTYPE, meta, Google Fonts (Bebas Neue, DM Sans, DM Mono)
- All CSS custom properties (--gold, --gold-light, --gold-dim, --black, --dark, --card, --card2, --border, --text, --muted, --red, --green, --blue)
- CSS reset + base styles
- Layout: .app (flex), .sidebar (240px fixed left), .main (margin-left:240px), .topbar (sticky), .content
- Section routing: .section {display:none}, .section.active {display:block}, @keyframes fadeIn
- Sidebar component styles: logo area, staff card (avatar, name, role, shift badge), nav items, tools divider, save-toggle pill
- Card styles, button styles (.btn, .btn-gold, .btn-ghost)
- Form input styles
- Modal overlay + modal box styles
- Dashboard: stat cards grid (4-col), quick-action cards grid (2×2), lone-worker card, handover banner
- Checklist: .check-item, .check-box, .check-badge (critical/standard/new), tab buttons, progress bar
- Night Audit: step item styles, progress bar
- AI chat: .ai-chat-container, .msg.ai, .msg.user, .typing-dots, suggestion chips
- Night Log: issue card, floor-walk grid, severity badges
- Board: 7-day stats grid, VIP table, staff assignments grid, Principle of Day widget
- body::before noise overlay (SVG fractalNoise, fixed, z-index:9999, pointer-events:none, opacity:0.6)
- @keyframes: pulse, bounce, fadeIn
- Print stylesheet (@media print — hide .sidebar, .topbar, .floating-btn, .modal; show only active section content)
- Responsive (@media max-width:768px — sidebar collapses or bottom nav)

---

## CHUNK 2 — Body shell + sidebar + all modals  [Add-Content]
- <body> open
- Floating Quick Log button: fixed bottom-right, ⚡, id="quickLogBtn"
- .sidebar:
  - .sidebar-logo (logo-tag "NIGHT COMPANION" mono, logo-title hotel name)
  - .staff-card (avatar div with initials, staff-name, staff-role, shift-badge + pulse dot)
  - .nav: 13 nav items (dashboard, checklist, nightaudit, notes, motivation, ai, history)
  - TOOLS divider (DM Mono label, var(--muted))
  - .nav: 5 tool items (nightlog, reports, checkin, signs, board)
  - Customise nav item (modal trigger, 🎨)
  - .save-toggle: "Persist Data" label + toggle pill button
- Profile Setup Modal (id="profileModal"):
  - Your Name input, Role dropdown (8 options), Shift Type dropdown (4 options)
  - Save button
- Brand Customise Modal (id="brandModal"):
  - Hotel Name input, logo file input + preview + remove btn
  - 14 colour swatches + custom colour picker + hex input
  - Live preview dot + hotel name text
  - Apply & Save btn, Cancel btn
- Quick Log Modal (id="quickLogModal"):
  - Guest/Room text input, Type dropdown (7 options), Description textarea, Status dropdown (4 options)
  - Submit btn, Cancel btn
  - Validation message div
- End Shift Confirmation Modal (id="endShiftModal"):
  - Confirmation text + Yes/Cancel btns
- .app > .main > .topbar (section title h2, action buttons area) + .content open

---

## CHUNK 3 — Dashboard + Checklist + Night Audit HTML  [Add-Content]
- #section-dashboard:
  - Incoming handover banner (id="handoverBanner", hidden by default, gold/blue accent, dismiss btn)
  - 4 stat cards grid: Checklist Progress (id="statChecklist"), Time Elapsed (id="statTime"), Incidents Logged (id="statIncidents"), Shift Streak (id="statStreak")
  - Lone Worker Safety card (blue border): last-checkin display (id="lastCheckIn"), "I'm OK — Check In" btn
  - 2×2 Quick Actions grid: Checklist, Night Audit, Card Payment Scripts (→ AI), Log Shift Notes (→ Notes)
  - Tip card at bottom
- #section-checklist:
  - Tab buttons: Pre-Audit | Post-Audit
  - Progress bar (id="checklistProgress")
  - Items container (id="checklistItems") — populated by JS
  - Run Night Audit CTA card (shown at bottom of Pre-Audit tab, navigates to nightaudit section)
- #section-nightaudit:
  - Progress bar (id="auditProgress")
  - Steps container (id="auditSteps") — populated by JS
  - Notes textarea (id="auditNotes")
  - Reset button

---

## CHUNK 4 — Notes + Motivation + AI Coach + History HTML  [Add-Content]
- #section-notes:
  - Incoming handover read-only panel (id="incomingHandover")
  - Shift notes textarea (id="shiftNotes", autosave)
  - Handover notes textarea (id="handoverNotes", autosave)
  - Print Handover Sheet btn
  - Hidden print-only div (.handover-page): hotel name, staff name, date, notes content
- #section-motivation:
  - Quote carousel card: quote text (id="quoteText"), author (id="quoteAuthor"), Next Quote btn
  - Excellence Tips grid: 6 cards with icon + heading + body text
- #section-ai:
  - Chat header: 🤖 avatar, "Aria — AI Hospitality Coach" h3, status badge (id="aiStatusBadge"), Clear Chat btn
  - Messages container (id="chatMessages")
  - Suggestion chips row (id="suggestionChips") — 10 chips
  - Input area: textarea (id="chatInput", Enter submits, Shift+Enter newline), Send btn
- #section-history:
  - Aggregate stats row: 4 mini-stat cards (total shifts, avg checklist %, total incidents, most common type)
  - Entries list (id="historyList")
  - Empty state (id="historyEmpty")
  - Clear History btn (bottom)

---

## CHUNK 5 — Night Log + Monthly Report HTML  [Add-Content]
- #section-nightlog:
  - Shift start screen (id="nightlogStart"): leader name input, Start Shift / Resume Shift btns
  - Main log UI (id="nightlogMain", hidden until started):
    - Shift info bar (leader name, shift start time)
    - Floor-walk grid: 5 floors (Ground, First, Second, Third, Roof) × all-clear toggle btn + timestamp
    - Issue entry form:
      - Timestamp (auto-set, editable), Floor dropdown, Category dropdown (8 options), Severity dropdown (low/medium/high)
      - Title input, Description textarea, Reporter input
      - Photo attachment: <input type="file" accept="image/*">, preview thumbnail, remove btn
      - Add Entry btn
    - Entries list (id="nightLogEntries"): cards with edit/delete, severity colour coding
    - JSON Export btn

- #section-reports:
  - Instructions text + file input (multiple, accept=".json")
  - Loaded files count display
  - Stat grid: 4 cards (total shifts, total entries, issues vs floor-walks, all-clears %)
  - 4 canvas bar charts: by category, by floor, by severity, all-clear coverage by shift
  - Shift summary table (shift date, leader, issues, floor-walks, all-clears)
  - Filterable all-entries table (type, timestamp, floor, category, severity, title)
  - Clear / Reset btn

---

## CHUNK 6 — Group Check-in + Sign Generator + Daily Info Board HTML  [Add-Content]
- #section-checkin:
  - Logo upload input + preview
  - Date field + Group Name input
  - Orientation toggle (Portrait / Landscape)
  - Guest list table: Name / Room / Checked-In columns, add/remove row btns
  - Bulk Import modal trigger btn
  - Print btn
  - Bulk Import Modal: paste names textarea + import btn

- #section-signs:
  - Size selector: A4 / A3 btns
  - Orientation: Portrait / Landscape
  - Background: 8 colour swatches, custom colour input, image upload, overlay opacity slider
  - Logo upload + preview
  - Body text input + colour picker
  - Sub-body text input + colour picker
  - Live preview div (id="signPreview")
  - Print btn

- #section-board:
  - Date selector (id="boardDate", auto-fills today, drives 7-day column headers)
  - 7-day stats grid: rows = (Rooms Sold, Guests in House, Occupancy %, Room Revenue, Total Revenue, ADR, RevPAR, Arrivals, Departures, F&B Covers) × 7 day columns — all cells contenteditable
  - VIP Guests table: 10 rows × (Name, Code, Room) — contenteditable cells
  - Staff Assignments grid: rows = (Pool Responsible, Pool Tester, First Aider) × cols = (AM, PM, Night) — contenteditable cells
  - Principle of the Day widget (id="principleWidget") — auto text by weekday
  - Special Notes / Info textarea
  - Reset btn + Print btn

- Close .content, .main, .app
- <script> open tag (JS starts here)

---

## CHUNK 7 — State + Bootstrap + Navigation + Persist  [Add-Content]
- 'use strict';
- Delivery version comment block
- External script tags: hotelcompanion_items.js, hotelcompanion_scripts.js (both with fallback note)
- All state variable declarations
- sectionTitles map (13 entries: dashboard, checklist, nightaudit, notes, motivation, ai, history, nightlog, reports, checkin, signs, board — and reports)
- showSection(id) — hide all sections, show target, update nav active state, update topbar title
- sectionTitles map for topbar
- Live clock: setInterval updating topbar date/time display every second
- Shift timer: update statTime card every minute
- loadState() — read all shiftCompanion_ keys from localStorage
- saveState() — write session-data keys only if saveEnabled
- Persist toggle onclick: toggle saveEnabled, save to localStorage, immediately flush current state if turning ON
- updateDashboardStats() — calculate checklist %, incident count, streak from history length
- updateSidebarStaffCard() — set avatar initials, name, role, shift badge
- Lone worker safetyCheckIn() — record timestamp, update display, flash btn green for 2.5s
- Profile modal: show on init if no saved name, save handler (always writes to localStorage unconditionally)
- Handover banner: show on load if shiftCompanion_pendingHandover exists, dismiss btn handler

---

## CHUNK 8 — Checklist + Night Audit + Notes Logic  [Add-Content]
- renderChecklist(tab):
  - Read items from window.HOTELCOMPANION_ITEMS (preAudit or postAudit array)
  - Apply dayRestriction filter (grey-out items that don't apply today, show day badge)
  - Build .check-item divs from items array (id keyed, notes expansion toggle)
  - Handle 'Run Night Audit' CTA: a highlighted card at the bottom of Pre-Audit tab pointing to nightaudit section
- toggleCheck(id):
  - Flip checkState[id], update .check-item.done class, update checkbox visual
  - Update progress bar
  - saveState() if enabled
- switchChecklistTab(tab):
  - Update tab button active states
  - Set checklistTab var
  - Call renderChecklist(tab)
- Checklist progress bar: count done / total visible items
- renderAuditSteps():
  - Read auditSteps from window.HOTELCOMPANION_ITEMS
  - Build step divs (checkbox, label, notes textarea per step)
- toggleAuditStep(id): flip auditState[id], update UI, update progress bar, saveState()
- Audit progress bar updater
- Night Audit reset btn handler: clear auditState, re-render
- Notes section:
  - shiftNotes textarea oninput → saveState() if enabled
  - handoverNotes textarea oninput → saveState() if enabled
  - Load saved values on init
  - Populate incoming handover read-only panel from shiftCompanion_pendingHandover
- printHandover():
  - Populate hidden .handover-page div with hotel name, staff name/role, date, shift notes, handover notes
  - window.print()

---

## CHUNK 9 — AI Coach Logic  [Add-Content]
- Load check: if window.HOTELCOMPANION_SCRIPTS is valid object with scripts array → scriptsSource = 'property'; else scriptsSource = 'builtin'
- Set status badge: green "Property Scripts Loaded" or gold "Smart Defaults Active"
- Built-in SMART_REPLIES array (26 entries — all keywords and responses from hotelcompanion_scripts.example.js content):
  - 3 Payments scripts, 3 Complaints, 7 Security, 6 Arrivals & Departures, 3 VIP & Service, 4 Operations
- getActiveScripts() → returns HOTELCOMPANION_SCRIPTS.scripts if valid, else SMART_REPLIES
- aiQuery(text):
  - Get lower = text.toLowerCase()
  - Search getActiveScripts() for first script where any keyword is substring of lower
  - Show typing indicator (showTypingDots())
  - setTimeout 900ms:
    - hideTypingDots()
    - If match: renderMessage('ai', markdownToHtml(match.response))
    - Else: renderMessage('ai', fallback 3-point message)
- renderMessage(role, html): append .msg div to chatMessages, scroll to bottom
- showTypingDots() / hideTypingDots(): append/remove .typing-msg div with 3 animated dots
- markdownToHtml(text): replace **text** → <strong>text</strong>, \n → <br> (no external library)
- Suggestion chips: 10 buttons, onclick → set chatInput value + call aiQuery()
- chatInput event listeners:
  - keydown: Enter without Shift → prevent default, submit
  - input: auto-resize textarea (reset height, set to scrollHeight)
- Send btn onclick: aiQuery(chatInput.value), clear input, reset height
- Clear Chat btn: clear chatMessages innerHTML, add initial greeting message
- On AI section init: add greeting message from Aria

---

## CHUNK 10 — Night Log + Quick Log + All Tools Logic  [Add-Content]
- Night Log:
  - nightlogStart screen: Start btn → set shiftLeader, shiftStartTime, hide start screen, show main log UI
  - Resume btn → load from localStorage if saveEnabled, show main log UI
  - Floor walk grid: toggleFloorClear(floor) → update floorWalkState[floor], update UI, add floor_walk entry to logEntries
  - Issue form submission (addLogEntry()):
    - Validate required fields (floor, category, severity, title, description)
    - Generate id: 'entry_' + Date.now() + '_' + Math.random().toString(16).slice(2,6)
    - If photo selected: read via FileReader, resize via Canvas (max 800px, JPEG 0.7), set imageBase64
    - Append entry object to logEntries array
    - Save to localStorage if enabled
    - renderNightLogEntries()
    - Reset form
  - renderNightLogEntries(): rebuild entries list with edit (toggle rectified) + delete btns, severity colour coding
  - JSON export: build export object (schemaVersion:1, shiftId, shiftLeader, exportedAt, entries), Blob → <a download> trigger
  - Edit entry: inline edit flow (rectified toggle at minimum)
  - Delete entry: splice from logEntries, re-render, saveState()

- Quick Log Modal:
  - quickLogBtn click → show quickLogModal
  - Submit: validate Guest/Room + Type + Description (all required), build entry, call addLogEntry-equivalent, flash quickLogBtn green 1.5s, close modal

- Monthly Report:
  - File input (multiple) change → read each JSON file as text, parse, validate schemaVersion:1
  - Deduplicate entries across files using entry.id (Map by id)
  - Render stat cards (total shifts, total entries, issue count vs floor-walk count, all-clear %)
  - renderBarChart(canvasId, labels, data, colour): simple canvas bar chart (no library)
  - 4 charts: by category, by floor, by severity, by shift (all-clear coverage)
  - Render shift summary table
  - Render filterable all-entries table (filter input → live filter on title/category/floor)
  - Clear btn: reset all imported data, clear canvases, clear tables

- Group Check-in:
  - Add row btn: append <tr> to guest table
  - Remove row: delete <tr>
  - Bulk import modal: paste textarea → split by newlines → add a row per name
  - Orientation toggle: set #section-checkin data-orientation, adjust print layout via CSS class
  - Print btn: window.print() (print stylesheet shows only #section-checkin)

- Sign Generator:
  - updateSignPreview(): read all form values, apply to #signPreview div (background, overlay, logo, text, colours)
  - All inputs (size, orientation, bg colour, bg image, overlay, logo, body text, sub text, colours) → addEventListener input/change → call updateSignPreview()
  - Background image upload: FileReader → dataURL → set as signPreview background-image
  - Logo upload: FileReader → dataURL → set img src in preview
  - Print btn: window.print() (print stylesheet shows only #section-signs)

- Daily Info Board:
  - initBoard(): set date input to today, call updateBoardHeaders(), call updatePrincipleOfDay(), load saved data from shiftCompanion_boardData
  - updateBoardHeaders(): compute 7-day rolling dates from selected date, set column headers
  - updatePrincipleOfDay(): principles = [Be Caring, Be A Storyteller, Be Extraordinary, Be Open-Minded, Be Caring, Be A Storyteller, Be Extraordinary] indexed by getDay() (0=Sun→4th, 1=Mon→0, etc.)
  - All contenteditable cells: oninput → collectBoardData() → saveState() if enabled
  - collectBoardData(): read all grid cells, VIP rows, staff assignments, notes → return object
  - loadBoardData(data): populate all cells from saved object
  - Reset btn: clear all cells, clear shiftCompanion_boardData
  - Print btn: window.print()

---

## CHUNK 11 — End Shift + History + Brand Customise + Init  [Add-Content]
- End Shift flow:
  - endShift btn in topbar → show endShiftModal
  - Confirm btn in modal:
    1. Build history entry: { id, date, staffName, staffRole, shiftStart, shiftEnd: now, checklistPct, checklistTab, auditPct, incidentCount, shiftNotes, handoverNotes }
    2. Push to shiftHistory array
    3. Write shiftCompanion_pendingHandover = handoverNotes (always)
    4. Write shiftCompanion_history (always)
    5. Clear all session localStorage keys (checklistState, auditState, shiftNotes, handoverNotes, nightLogEntries, lastCheckIn, boardData)
    6. Reset all in-memory state to defaults
    7. Close modal, navigate to dashboard, call updateDashboardStats(), renderHistory()

- renderHistory():
  - If shiftHistory.length === 0: show #historyEmpty, hide entries
  - Build expandable entry cards: date, staff, checklist %, incidents, expand/collapse for notes/handover
  - Per card: "📋 Load Handover" btn → write entry.handoverNotes to shiftCompanion_pendingHandover → showSection('dashboard') → show handover banner
  - Render aggregate stats: total shifts, avg checklist %, total incidents, most common incident type (count by type, find max)
  - Clear History btn: confirm → clear shiftHistory → re-render

- Brand Customise Modal:
  - Logo file input: FileReader → base64 → store in brandLogo var + localStorage (always) → update sidebar logo img
  - Remove Logo btn: clear brandLogo, hide sidebar logo img
  - Colour swatch click: set selectedColour var, highlight swatch
  - Colour picker / hex input: sync with each other, update selectedColour
  - Apply & Save btn: applyBrandColour(selectedColour), save brandColour + brandHotelName + brandLogo to localStorage (always), close modal
  - Cancel btn: revert in-memory vars to last saved, close modal
  - applyBrandColour(hex): compute --gold-light as hex lightened 20%, --gold-dim as hex darkened 30%, setProperty all three on :root
  - applyBrandName(name): update sidebar hotel name text, store currentHotelName

- applyBrandOnLoad(): read brandColour, brandLogo, brandHotelName from localStorage, apply if exists

- init() function:
  - loadState()
  - applyBrandOnLoad()
  - updateSidebarStaffCard()
  - renderChecklist('preAudit')
  - renderAuditSteps()
  - renderHistory()
  - updateDashboardStats()
  - showSection('dashboard')
  - If no staffName saved: show profileModal
  - Add AI greeting message
  - initBoard()
  - Start clock interval
  - Start shift timer interval
  - Set up all event listeners (nav clicks, modal close handlers, etc.)

- init() called: document.addEventListener('DOMContentLoaded', init);

- Close </script>, </body>, </html>

---

## VALIDATION (after all chunks written)
1. File exists at C:\Users\netmi\github\nightsReceptionCompanion\hotelcompanion_suite.html
2. File size > 150KB (expected ~300-500KB)
3. Count of <section occurrences = 13
4. Count of </section> = 13
5. Count of <script occurrences = at least 3 (items.js, scripts.js, inline)
6. No unmatched <div without </div> (approximate check)
7. Open in browser, check console for errors

---

## STATUS LOG
- [ ] Chunk 1: CSS + head — NOT STARTED
- [ ] Chunk 2: Body shell + sidebar + modals — NOT STARTED
- [ ] Chunk 3: Dashboard + Checklist + Night Audit HTML — NOT STARTED
- [ ] Chunk 4: Notes + Motivation + AI + History HTML — NOT STARTED
- [ ] Chunk 5: Night Log + Monthly Report HTML — NOT STARTED
- [ ] Chunk 6: Group Check-in + Sign Generator + Board HTML — NOT STARTED
- [ ] Chunk 7: JS State + Nav + Persist — NOT STARTED
- [ ] Chunk 8: JS Checklist + Audit + Notes — NOT STARTED
- [ ] Chunk 9: JS AI Coach — NOT STARTED
- [ ] Chunk 10: JS Night Log + Quick Log + Tools — NOT STARTED
- [ ] Chunk 11: JS End Shift + History + Brand + Init — NOT STARTED
- [ ] Validation — NOT STARTED
