# Copilot Build Instructions — Night Receptionist Companion Suite

> **Purpose of this file:** Pre-build instructions for a GitHub Copilot coding agent.
> Read this file in full before writing any code. All design and architecture decisions
> that are marked **[AGENT DECISION]** must be made by the agent based on the criteria
> described, and the chosen option must be recorded at the top of whatever file(s) the
> agent creates.

---

## 0. Confirmed Build Decisions

> These decisions were confirmed through agent–user discussion on 8 April 2026.
> They supersede any **[AGENT DECISION]** placeholders in the sections below.

| Decision | Choice | Rationale |
|---|---|---|
| **Delivery Version** | **Version A** — Single self-contained HTML file | Tool runs from OneDrive sync folder via `file://` on company PCs; no server or hosting required |
| **Deployment** | OneDrive shared folder, opened locally (`file://` protocol) | Multiple company systems on a network; OneDrive keeps the file in sync centrally |
| **AI Coach mode** | **Smart Defaults only** — no external API calls | `file://` blocks CORS for external APIs; offline-first requirement; scripted responses are more reliable and accurate for hospitality scenarios than a small LLM |
| **Knowledge source** | PDF night operations manual → build-time extraction via `hotelcompanion_editor.html` | Manual is a digital Word-exported PDF (text-selectable, has TOC, embedded screenshots) — pdf.js can extract all procedural text cleanly |
| **AI scripts file** | External `hotelcompanion_scripts.js` (gitignored) loaded from the same OneDrive folder | Allows non-technical managers to update AI Coach scripts without touching app code |
| **Editor scope** | `hotelcompanion_editor.html` expanded to **4 tabs**: Pre-Audit, Post-Audit, Night Audit Steps, AI Scripts | Keeps all content editing in one file; AI Scripts tab includes PDF import via pdf.js |
| **Authentication** | Anonymous — Windows/system login acts as gatekeeper | No per-user accounts needed at this stage |
| **localStorage** | Per-device only (no cross-device sync) | Each company PC manages its own session; shared terminal model |
| **Hardware target** | Dell / Intel Core i5-14500 (14 cores / 16 GB RAM) | Modern hotel terminals; JavaScript-heavy features are viable |
| **Browser target** | **Island Enterprise Browser** (Chromium-based) | All modern web APIs supported; confirm `file://` protocol is not blocked by IT policy — inline `<script>` and `localStorage` on `file://` origins must be permitted |

---

## 1. Project Overview

The **Night Receptionist Companion Suite** is a set of browser-based tools for hotel
front-office night staff. The existing codebase is a flat collection of standalone HTML
files. The goal of this build is to unify them into a single, polished, fully functional
product — using a consistent design language based on `hotelcompanion_enhanced.html` —
and to ship a production-ready result in one of the two delivery formats described in
§ 4.

### Existing files to incorporate

| File | Current purpose |
|------|-----------------|
| `hotelcompanion_enhanced.html` | **Main shell.** Dashboard, Shift Checklist (Pre/During/Post), Night Audit Tracker, Notes & Shift Handover, Incident Log, AI Coach chat (keyword-driven), Motivation/Tips, Shift History. This is the design and UX reference. |
| `NightLog.html` | Detailed incident/issue logger with floor-walk tracking, photo attachment (file picker), category/severity tagging, JSON export. |
| `NightLogMonthlyReport.html` | **Nice-to-have.** Monthly analytics — loads multiple JSON shift exports, renders bar charts, shift summary table, filterable entry list. Only relevant if JSON exports from Night Log are available; treat as optional/lower-priority. |
| `groupcheckinlist.html` | Print-ready group check-in list — logo upload, bulk name import, portrait/landscape toggle. |
| `signGenerator.html` | ISO sign generator — A4/A3, portrait/landscape, background image/colour, logo, body/sub-body text, print. |
| `nightsTicklist.htm` | Bootstrap-based front-office nights checklist with validation, handover sheet, auto-save to `localStorage`. |
| `board.html` | Print-ready Daily Information Board — 7-day rolling occupancy stats grid (rooms sold, guests in house, occupancy %, room revenue, total revenue, ADR, RevPAR, arrivals, departures, F&B covers), VIP guests list, special notes panel, auto-saves to `localStorage` (`dailyBoardData`), landscape A3-style layout, print button. |

---

## 2. Design System (do not deviate)

All output must use the design language already established in
`hotelcompanion_enhanced.html`. Do not introduce new design systems, component
libraries, or CSS frameworks unless specifically permitted below.

### Colours (CSS custom properties)
```css
--gold: #D4A843;
--gold-light: #F0C96A;
--gold-dim: #8A6B20;
--black: #0A0A0A;
--dark: #111111;
--card: #181818;
--card2: #1E1E1E;
--border: #2A2A2A;
--text: #F0EDE8;
--muted: #888880;
--red: #E05555;
--green: #4CAF82;
--blue: #4A90D9;
```

### Typography
- **Display / headings:** `Bebas Neue` (Google Fonts)
- **Body / UI:** `DM Sans` (Google Fonts)
- **Monospace / labels / badges:** `DM Mono` (Google Fonts)

### Layout
- Fixed left sidebar (240 px) with gold accent bar, staff card, nav items, and save-toggle widget.
- `main` area offset by `margin-left: 240 px`.
- Sticky `topbar` inside `main` (section title + action buttons).
- Sections revealed by toggling `.active` class; only one visible at a time.
- Cards use `background: var(--card)`, `border: 1px solid var(--border)`, `border-radius: 8–12 px`.
- Noise SVG overlay (`body::before`) with `opacity: 0.6`, `pointer-events: none`, `z-index: 9999`.
- `@keyframes pulse` for live indicator dots (sidebar shift badge, online status).
- All interactive elements follow the existing `.btn`, `.btn-gold`, `.btn-ghost` style.

### Responsive behaviour
- Below 768 px: sidebar collapses to a bottom navigation bar or hamburger drawer.
- The print stylesheet (`@media print`) must hide the sidebar, topbar, and all UI chrome,
  and render only the relevant section content.

---

## 3. Shared Technical Requirements

### Data persistence

Saving shift data to `localStorage` is **opt-in and off by default**.

#### Always-saved (regardless of toggle)
The following are written to `localStorage` unconditionally because they are needed
across sessions and page reloads:
- Staff profile — name, role, shift type (`shiftCompanion_staffName`, `…staffRole`, `…staffShift`)
- Persist-toggle state itself (`shiftCompanion_persist`)
- Shift history log (`shiftCompanion_history`) — needed for the History section
- Incoming handover text (`shiftCompanion_pendingHandover`) — passed between shifts
- Brand customisation — hotel name, logo (base64), accent colour (`shiftCompanion_brandColour`, etc.)

#### Session data (only saved when toggle is ON)
The following are only written when `persistData === true`:
- Shift notes (`shiftCompanion_shiftNotes`)
- Handover notes (`shiftCompanion_handoverNotes`)
- Lone-worker safety check-in timestamp (`shiftCompanion_lastCheckIn`)
- Night Log entries for the current shift (`shiftCompanion_nightLogEntries`)
- Checklist tick state (`shiftCompanion_checklistState`) — stored as a map of
  `{ [itemId]: boolean }` keyed by the stable `id` field from `HOTELCOMPANION_ITEMS`,
  **not** by array index. This ensures saved ticks remain correctly mapped if items
  are reordered, inserted, or deleted via the GUI editor.
- Night Audit step state (`shiftCompanion_auditState`) — stored as a map of
  `{ [itemId]: boolean }` keyed by the stable `id` field, for the same reason.
- Daily Info Board data (`shiftCompanion_boardData`)

All tool data uses the unified `shiftCompanion_` namespace. No tool may use its own
independent localStorage key (e.g. the standalone `dailyBoardData` key from `board.html`
must not be used in the unified app).

#### Sidebar "Persist Data" toggle
- Rendered in the sidebar below the nav as a pill toggle (`.save-toggle` / `.toggle`).
- Default state: **OFF** (`persistData = false`). When OFF, session data is ephemeral
  (lost on reload) which is appropriate when sharing a terminal.
- When turned ON: immediately flushes current session data to `localStorage`.
- When turned OFF: does not delete existing saved data (user may be mid-shift on a
  shared terminal and simply wants to stop auto-saving new changes).

#### End Shift / Clear
- A **End Shift** button triggers a confirmation modal before:
  1. Saving the shift summary to history (always).
  2. Clearing all session-data keys from `localStorage`.
  3. Resetting all in-memory state (notes, checklist ticks, audit state, Night Log entries, board data).
- Shift history and profile data are NOT cleared.

### Accessibility
- All interactive elements must have `aria-label` or visible text.
- Colour contrast must meet WCAG AA for text on `var(--card)` and `var(--dark)`.
- Focus styles must be visible (use `outline: 2px solid var(--gold)`).

### Fonts & external assets
- Load Google Fonts via `<link rel="preconnect">` + `<link rel="stylesheet">`.
- Hotel logo: use `hotelLogo.jpg` / `hotelLogo.ico` (already in repo root). Provide
  a fallback `onerror` handler that hides the `<img>` gracefully.
- No other external CDN dependencies except Google Fonts. No external API calls are made from the main app (`hotelcompanion_suite.html`). The editor (`hotelcompanion_editor.html`) may reference pdf.js via CDN for the PDF import feature — this is acceptable as the editor is a manager tool, not a shift-time tool.

### Printing
- Each tool that has print functionality (`groupcheckinlist`, `signGenerator`,
  `nightsTicklist`) must retain its print behaviour inside the unified app.
- The print stylesheet must page-break appropriately and suppress all navigation chrome.

---

## 4. Delivery Versions

**CONFIRMED DECISION: Version A.** See § 0 for rationale.

Record this in a comment block at the top of every file you create:

```html
<!--
  DELIVERY VERSION: A
  RATIONALE: Single file distributed via OneDrive sync folder, opened via file:// on company PCs. Offline-first, no server required.
-->
```

Version B documentation is retained below for reference only. **Do not build Version B.**

---

### Version A — Single Self-Contained HTML File ✅ CONFIRMED

**Build rules:**
1. Produce **one file**: `hotelcompanion_suite.html`.
2. Inline all CSS (no `<link>` to local stylesheets). Google Fonts `<link>` is allowed.
3. Inline all JavaScript (no `<script src="…">`).
4. The sidebar nav must contain all core sections plus a "TOOLS" divider group with
   the five tool sections: Night Log, Monthly Report *(nice-to-have — include only if
   Night Log JSON export is implemented; omit otherwise)*, Group Check-in, Sign
   Generator, and Daily Info Board (see § 5).
5. All inter-section navigation must use the existing `showSection(id, btn)` pattern.
6. `localStorage` is the persistence mechanism, but saving session data is **opt-in**
   via the sidebar "Persist Data" toggle (see § 3).
7. Export/import must use the File System Access API (`showSaveFilePicker`) with a
   fallback `<a download>` for browsers that do not support it.

---

### Version B — Hosted Multi-Page Application (Netlify + Supabase)

**When to choose Version B:**
- The tool will be accessed by multiple staff members on multiple devices.
- Shift data should persist beyond a single browser/device.
- A simple always-available URL is desirable (shared at shift briefing, on notice board, etc.).
- A free-tier backend is acceptable.

**Stack:**
- **Frontend:** Plain HTML + CSS + vanilla JS (no build step, no bundler). One HTML file
  per page/tool (matching the current file-per-tool structure).
- **Hosting:** Netlify (free tier). Deploy from the repo root; `netlify.toml` must be
  created with `publish = "."` and the correct redirect rules.
- **Database / Auth:** [Supabase](https://supabase.com) free tier.
  - Use the Supabase JS client v2 loaded via CDN ESM:
    `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js`
  - Schema (see § 6).
  - Row-Level Security must be enabled on all tables.
  - Staff authenticate with **Magic Link** (email OTP) — no passwords.
  - Supabase project URL and anon key are stored in a `config.js` file that is
    `.gitignore`d, and a `config.example.js` is committed instead.

**Build rules:**
1. The existing HTML files are the page files. Revamp each one to match the design
   system (§ 2) and add Supabase persistence where relevant.
2. A shared `nav.js` module renders the sidebar and highlights the current page.
3. A shared `auth.js` module handles Supabase magic-link login, session checking,
   and redirects unauthenticated users to `login.html`.
4. Create `login.html` — a minimal centered form (email input + "Send Magic Link"
   button) in the project design system.
5. Create `index.html` — the dashboard/home page, equivalent to
   `section-dashboard` in `hotelcompanion_enhanced.html`.
6. `netlify.toml` must redirect all 404s to `index.html` for SPA-style navigation.
7. `_redirects` file must NOT conflict with `netlify.toml`.

---

## 5. Section / Page Map

The following sections/pages must exist in the final product, regardless of version.
The *Source file* column identifies the existing file whose logic and content to
migrate into each section.

### Core sections (from `hotelcompanion_enhanced.html`)

| Section slug | Display title | Source section | Key features to preserve |
|---|---|---|---|
| `dashboard` | Night Dashboard | `§ section-dashboard` | Live date/time clock (topbar), stat cards (checklist %, incidents, streak), quick-action cards, lone-worker safety check-in button, incoming handover banner |
| `checklist` | Shift Checklist | `§ section-checklist` + `nightsTicklist.htm` | **Pre-Audit** and **Post-Audit** tabs (two tabs only — no "During Shift" tab); Pre-Audit items from `nightsTicklist.htm` `preAuditTasks`; Post-Audit items from `nightsTicklist.htm` `rawTasks`; items from `§ section-checklist` merged and deduplicated; progress bar; `required-before-continue` highlights; day-of-week / last-night-of-month badges; handover-sheet print view. See § 7 for full merge guide. |
| `nightaudit` | Night Audit | `§ section-nightaudit` | Step-by-step audit tracker (procedure steps only — not checklist items); checkbox per step; progress bar; notes per step; reset button. Source: `hotelcompanion_enhanced.html § section-nightaudit`. |
| `notes` | Notes & Handover | `§ section-notes` | Shift notes textarea, handover notes textarea, incoming handover read-only panel. **Do not add a separate incident log here.** All incident logging — including quick in-shift entries — is handled exclusively by the Night Log tool (see Tools section below). The incident mini-log that exists in `hotelcompanion_enhanced.html § section-notes` is a duplicate of Night Log and must not be carried forward. |
| `motivation` | Motivation | `§ section-motivation` | Quote carousel (8 quotes, "Next Quote" button), excellence tips grid |
| `ai` | AI Coach | `§ section-ai` | Smart Defaults keyword chat (see § 8), suggestion chips, status badge (Property Scripts / Smart Defaults), clear chat button |
| `history` | Shift History | `§ section-history` | Expandable shift entries, aggregate stats (shifts completed, avg checklist %, total incidents, most common incident type), clear history, load handover from history |

### Tools section (new — from standalone HTML files)

These tools do not fit naturally within the core sections above. Group them under a
**"Tools"** heading in the sidebar navigation (visually separated from the core nav
items by a divider and a `TOOLS` label in `var(--muted)` / `DM Mono`).

| Section slug | Display title | Source file | Key features to preserve |
|---|---|---|---|
| `nightlog` | Night Log | `NightLog.html` | Shift start/resume screen (leader name), floor-walk all-clear grid, issue entry form (timestamp, floor, category, severity, title, description, reporter, photo attachment via file picker), entry list with edit/delete, JSON export. **This is the sole incident logger for the entire app.** Its entries are session data cleared by the main End Shift flow (no separate end-shift button inside this section). *(JSON import and WhatsApp/email sharing are intentionally excluded from the unified version.)* |
| `reports` | Monthly Report | `NightLogMonthlyReport.html` | Multi-file JSON drop/import, stat grid, bar charts (by category/floor/severity/all-clear coverage), shift summary table, filterable all-entries table. **Nice-to-have — only implement if Night Log JSON exports are available in the chosen delivery version; mark as optional in the build.** |
| `checkin` | Group Check-in | `groupcheckinlist.html` | Logo upload, date field, group name, guest list with add/remove rows, bulk name import modal, portrait/landscape toggle, print |
| `signs` | Sign Generator | `signGenerator.html` | A4/A3 size selector, portrait/landscape toggle, background colour palette + custom image + overlay slider, logo upload, body text + colour, sub-body text + colour, live preview, print |
| `board` | Daily Info Board | `board.html` | Date selector (auto-populates 7-day rolling column headers), 7-day stats grid (rooms sold, guests in house, occupancy %, room revenue, total revenue, ADR, RevPAR, arrivals, departures, F&B covers), VIP guests list (10 rows: Name, Code, Room), staff assignments grid (Pool Responsible / Pool Tester / First Aider — AM / PM / Night), Principle of the Day widget (rotates by day of week: Be Caring, Be A Storyteller, Be Extraordinary, Be Open-Minded), special notes/info panel, reset button, print (landscape A3-style, hides UI chrome). The entire layout — including all columns, rows, and widget positions — must mirror the physical board exactly as it appears in `board.html`. Board data is saved under `shiftCompanion_boardData` via the unified persist toggle — the standalone `dailyBoardData` key must not be used. |

### Persistent UI (not sections)

These are always-visible elements that are not sections in the sidebar:

| Element | Source | Description |
|---|---|---|
| **Floating Quick Log button** | `hotelcompanion_enhanced.html` | Fixed `⚡` button, bottom-right corner. Opens a modal to log an incident quickly from anywhere in the app. Submits directly to the Night Log (`nightlog` section) entry list. |
| **Brand Customisation modal** | `hotelcompanion_enhanced.html` | Opened from the last sidebar nav item (🎨 Customise). Hotel name, logo upload (base64), 14 preset accent colours + custom colour picker. Changes update CSS variables and print headers live. |
| **Setup Profile modal** | `hotelcompanion_enhanced.html` | Shown on first visit (no saved name). Staff name, role (dropdown), shift type (dropdown). Always stored in `localStorage`. |

---

## 6. Supabase Schema (Version B only)

Create and apply the following SQL in the Supabase SQL editor. Commit the migration
file to `supabase/migrations/001_initial.sql`.

```sql
-- Staff profiles (linked to auth.users)
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role        text default 'Night Receptionist',
  hotel_name  text,
  created_at  timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can manage own profile"
  on public.profiles for all using (auth.uid() = id);

-- Shifts
create table public.shifts (
  id          uuid primary key default gen_random_uuid(),
  staff_id    uuid references public.profiles(id) on delete cascade,
  hotel_name  text,
  shift_date  date not null,
  started_at  timestamptz default now(),
  ended_at    timestamptz,
  handover_notes text,
  shift_notes    text,
  checklist_json jsonb,  -- snapshot of completed checklist items
  audit_json     jsonb   -- snapshot of completed audit steps
);
alter table public.shifts enable row level security;
create policy "Staff see own shifts"
  on public.shifts for all using (auth.uid() = staff_id);

-- Night log entries (issues / floor walks)
create table public.log_entries (
  id          uuid primary key default gen_random_uuid(),
  shift_id    uuid references public.shifts(id) on delete cascade,
  staff_id    uuid references public.profiles(id) on delete cascade,
  entry_type  text not null check (entry_type in ('issue','floor_walk','check_in')),
  floor       text,
  category    text,
  severity    text,
  title       text,
  description text,
  reporter    text,
  image_url   text,       -- Supabase Storage object path (Version B only)
  rectified   boolean default false,
  created_at  timestamptz default now()
);
alter table public.log_entries enable row level security;
create policy "Staff see own entries"
  on public.log_entries for all using (auth.uid() = staff_id);
```

**Storage bucket:** Create a public bucket named `nightlog-images`. Apply the policy:
```sql
create policy "Authenticated users can upload images"
  on storage.objects for insert
  with check (bucket_id = 'nightlog-images' and auth.role() = 'authenticated');
```

---

## 7. Checklist Content (merge guide)

`nightsTicklist.htm` and `hotelcompanion_enhanced.html § section-checklist` overlap.
When merging:

### Understanding `nightsTicklist.htm` structure

`nightsTicklist.htm` contains **two distinct JavaScript arrays** that map to different
sections of the unified app:

| Array in `nightsTicklist.htm` | Count | Maps to |
|---|---|---|
| `preAuditTasks` | 17 items | **Pre-Audit Checklist** — tasks performed on arrival and up to (but not including) running the night audit. The final task ("Run Night Audit at 0301") is the handoff point to the Night Audit Tracker. |
| `rawTasks` | 38 items | **Post-Audit Checklist** — tasks performed after the audit has run (reports, banking, handover, etc.). |

The **Night Audit Tracker** section (`§ section-nightaudit` in `hotelcompanion_enhanced.html`)
is the step-by-step audit *procedure* (post room charges, reconcile payments, print
reports, etc.). These are **not** from `nightsTicklist.htm` — they come from the
existing `§ section-nightaudit` step list. Do not mix audit procedure steps into the
checklist, and do not mix checklist items into the audit tracker.

The "Run Night Audit" item at the end of `preAuditTasks` should appear in the
Pre-Audit checklist as a highlight card or call-to-action that navigates the user to
the Night Audit Tracker section — not as a plain checkbox.

### Merge rules

1. **Deduplicate** items that are semantically identical across both source files.
2. **Categorise** all items into the two tabs: Pre-Audit / Post-Audit,
   following the mapping above.
3. Keep the `required-before-continue` (yellow highlight) behaviour for critical items
   from `nightsTicklist.htm`.
4. Keep the handover-sheet print view from `nightsTicklist.htm` (the
   `.handover-page` layout) — this maps to the handover section of
   `hotelcompanion_enhanced.html` (`§ section-notes` handover panel). Merge them
   so the printed handover sheet and the on-screen handover notes textarea are one
   unified feature.
5. Apply the design system (§ 2) — replace Bootstrap classes with custom CSS that
   matches the dark-gold theme.
6. Day-of-week filtering (Mon-only, Sat-only, etc.) and "last night of month" flags
   from `nightsTicklist.htm` must be preserved. Items that don't apply today should
   be visually greyed out (not hidden), with the day restriction shown as a badge.

---

## 7.5. Night Log JSON Export Schema

The Night Log section exports shift data as a JSON file. The Monthly Report tool
imports these files. Both must use this exact schema to ensure compatibility.

```json
{
  "schemaVersion": 1,
  "shiftId": "2026-04-08T22:00:00.000Z",
  "shiftLeader": "Staff Name",
  "exportedAt": "2026-04-09T06:15:00.000Z",
  "entries": [
    {
      "id": "entry_1712620800000_a3f2",
      "type": "issue",
      "timestamp": "2026-04-08T23:14:00.000Z",
      "floor": "Second",
      "category": "Noise Complaint",
      "severity": "medium",
      "title": "Loud music from room 214",
      "description": "Guest called to complain about music from the room above.",
      "reporter": "Jane Smith",
      "imageBase64": null,
      "rectified": true
    },
    {
      "id": "entry_1712624400000_b7c1",
      "type": "floor_walk",
      "timestamp": "2026-04-09T00:20:00.000Z",
      "floor": "Ground",
      "allClear": true,
      "notes": ""
    }
  ]
}
```

**Field definitions:**

| Field | Type | Notes |
|---|---|---|
| `schemaVersion` | number | Always `1` — used for forward-compat checks |
| `shiftId` | string (ISO 8601) | ISO timestamp of shift start — acts as unique shift identifier |
| `shiftLeader` | string | Name entered at shift start |
| `exportedAt` | string (ISO 8601) | Timestamp of export action |
| `entries[]` | array | Mixed `issue` and `floor_walk` entries in chronological order |
| `id` | string | `"entry_" + Date.now() + "_" + 4-char random hex` — unique, stable |
| `type` | `"issue"` \| `"floor_walk"` | Determines which fields are present |
| `timestamp` | string (ISO 8601) | When the entry was logged |
| `floor` | string | Floor name (e.g. "Ground", "First", "Second", "Third", "Roof") |
| `category` | string | Issue type (issue entries only) |
| `severity` | `"low"` \| `"medium"` \| `"high"` | Issue entries only |
| `title` | string | Short summary (issue entries only) |
| `description` | string | Full detail (issue entries only) |
| `reporter` | string | Name of reporting staff (issue entries only) |
| `imageBase64` | string \| null | Base64-encoded JPEG, or `null` if no image (issue entries only) |
| `rectified` | boolean | Whether the issue has been resolved (issue entries only) |
| `allClear` | boolean | Whether floor was clear (floor_walk entries only) |
| `notes` | string | Optional notes for floor walk (floor_walk entries only) |

**Implementation notes:**
- `id` must be generated at entry creation time and never changed — used for deduplication on import.
- Photo attachment uses a file picker (`<input type="file" accept="image/*">`). The selected image is resized to max 800 px and compressed to JPEG (quality 0.7) via Canvas API before base64 encoding. Images over 500 KB after encoding should show a warning.
- `file://` protocol blocks `getUserMedia()` — no live camera capture. File picker only.
- The Monthly Report deduplicates entries across multiple imported files using `entry.id`.

---

## 8. AI Coach — Smart Defaults + PDF Knowledge Base

The AI Coach (`§ section-ai`) operates in **Smart Defaults mode only**. There is no
live external API. All responses are served from a built-in keyword map or from the
property-specific `hotelcompanion_scripts.js` file if present.

**This decision is final for Version A.** External API calls are blocked by CORS on
`file://` protocol and are incompatible with the offline-first deployment model.

### Knowledge sources (priority order)

1. **`hotelcompanion_scripts.js`** (property-specific, optional) — loaded alongside the
   main app from the same OneDrive folder. Populated via the AI Scripts tab in
   `hotelcompanion_editor.html` using PDF import. If absent or invalid, falls back
   gracefully to built-in defaults without error.
2. **Built-in `SMART_REPLIES`** — generic hospitality keyword map (see below). Always
   available; used when no property scripts file is loaded or when a query matches
   no property script.

### `hotelcompanion_scripts.js` schema

The file is loaded via `<script src="hotelcompanion_scripts.js">` (explicit exception
to Version A single-file rule — same pattern as `hotelcompanion_items.js`). It must
define:

```js
window.HOTELCOMPANION_SCRIPTS = {
  version: 1,
  scripts: [
    {
      id: "script_001",
      keywords: ["keyword phrase", "alternative phrase"],
      title: "Display Title",
      category: "Category Name",
      response: "### Heading\n\n**Script:**\nFull response text..."
    }
  ]
};
```

- `id`: stable unique string, generated at creation, never changed.
- `keywords`: array of lowercase strings — any substring match triggers this script.
- `title`: shown as the script card heading in the editor and in chat.
- `category`: used for grouping in the editor (e.g. "Payments", "Security").
- `response`: full response text; supports `**bold**` and `\n` newlines.

If the file is absent, unreadable, or fails schema validation, the app silently falls
back to the built-in `SMART_REPLIES` map without error.

### Built-in `SMART_REPLIES` (always available)

A built-in keyword map provides instant, high-quality responses to common hospitality
scenarios. The lookup is case-insensitive substring match on the user's message.
Property scripts (above) are checked first; built-in scripts are the fallback.

**All existing entries from `hotelcompanion_enhanced.html` carried over verbatim:**
- `guest wants to pay cash` — card-only policy + firm-but-warm scripts
- `card declined at check-in` — step-by-step decline handling
- `noise complaint script` — escalation scripts (call → in-person → duty manager)
- `intoxicated guest at desk` — de-escalation + safety protocol
- `late arrival — no booking found` — 5-step no-reservation process
- `guest locked out at 3am` — ID verification + key issue process
- `night audit error — what to do` — common PMS errors + golden rules
- `suspicious person in lobby` — observe → approach → escalate protocol
- `pre-auth / billing query script` — explaining pre-auth holds to guests
- `handle a guest complaint` — LEARN model script
- `check-in script for vip` — polished VIP arrival script
- `dealing with an angry guest` — calm-down techniques
- `how to give local recommendations` — structure for confident recommendations
- `phone greeting script` — standard greeting + transfer + message scripts

**Extended keywords (minimum 12 additional):**
- `fire alarm` — evacuation procedure, assembly point, do-not-use-lift reminders
- `maintenance fault` — logging, severity, who to call out-of-hours
- `early check-in request` — room availability check, holding area, luggage storage
- `late check-out request` — house rules, housekeeping coordination, upsell script
- `lost property` — secure storage, found-item log, returning to guest
- `do not disturb sign ignored` — welfare check protocol
- `medical emergency` — call 999 first, stay on line, send someone to entrance
- `unaccompanied minor` — safeguarding process, duty manager escalation
- `group arrival` — coordinate with housekeeping, pre-assign keys, welcome pack
- `room move request` — PMS procedure, key swap, housekeeping notification
- `guest refuses to leave` — trespass process, police call threshold
- `power cut` — emergency lighting, generator check, inform guests

### AI Coach UI requirements

- On load: show chat container directly — no API key prompt.
- Chat header: avatar 🤖, name "Aria — AI Hospitality Coach",
  status badge — "Property Scripts Loaded" (green, when `hotelcompanion_scripts.js`
  is present and valid) or "Smart Defaults Active" (gold, fallback), Clear Chat button.
- Suggestion chips (always shown below messages, above input):
  "Guest wants to pay cash", "Card declined at check-in", "Noise complaint script",
  "Intoxicated guest at desk", "Late arrival — no booking found",
  "Guest locked out at 3am", "Handle a guest complaint",
  "Night audit error — what to do", "Suspicious person in lobby",
  "Pre-auth / billing query script"
- **900 ms simulated delay** before rendering any reply (makes it feel considered).
- Markdown inline renderer: `**text**` → `<strong>text</strong>`, `\n` → `<br>`.
  No external markdown library.
- `Enter` submits, `Shift+Enter` adds a newline. Textarea auto-resizes.
- When no keyword matches (neither property scripts nor built-in): return a helpful
  fallback message — *"I don't have a specific script for that. Consider: (1) Contact
  your Duty Manager. (2) Check the night manual. (3) Log the incident in the Night Log."*

### PDF Knowledge Base — Editor integration

The AI Scripts tab in `hotelcompanion_editor.html` includes an **"Import from PDF"**
button that:

1. Opens a file picker for the property's night operations PDF (Word-exported, text-based).
2. Uses **pdf.js** (loaded via CDN in the editor only) to extract all text.
3. Uses the PDF's Table of Contents (TOC) to segment text by section heading.
4. Presents each section as a draft script card with:
   - `title` pre-filled from the TOC heading.
   - `keywords` auto-suggested from heading text (lowercased, trimmed).
   - `category` auto-detected from heading hierarchy.
   - `response` pre-filled with the extracted section body text.
5. Manager reviews, edits, merges, and deletes draft cards before saving.
6. "Export & Save" downloads `hotelcompanion_scripts.js`.

**pdf.js details:**
- CDN: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs`
- The editor is a **separate file** — bundling pdf.js there does not affect main app size.
- Scanned/image PDFs produce no extractable text — show a clear error:
  *"No text could be extracted. Your PDF may be a scanned image. Please share the PDF
  with your developer to process it manually."*
- Table content may have scrambled cell order — warn the manager to review table sections
  carefully after import.

---

## 9. Quality Gates

Before considering the build complete, verify all of the following:

- [ ] All seven source files' features are represented in the output.
- [ ] All tool data uses the `shiftCompanion_` localStorage namespace — no tool has its own independent key (e.g. no `dailyBoardData`).
- [ ] No tool has its own standalone "end shift" or "clear data" flow — all session data is cleared by the single main End Shift action.
- [ ] `localStorage` persist toggle defaults to **OFF**; session data is not saved unless toggled on.
- [ ] Toggling persistence ON immediately saves current session data.
- [ ] Profile (name/role/shift) is always saved regardless of toggle state. No API key is stored.
- [ ] Shift history persists across sessions and is not cleared by End Shift.
- [ ] The print stylesheet hides all navigation and renders cleanly.
- [ ] The sidebar staff card shows the name entered at shift start.
- [ ] End Shift saves to history, shows confirmation modal, then clears session data.
- [ ] AI Coach shows "Property Scripts Loaded" (green) when `hotelcompanion_scripts.js` is present and valid.
- [ ] AI Coach shows "Smart Defaults Active" (gold) when `hotelcompanion_scripts.js` is absent or invalid.
- [ ] AI Coach Smart Defaults keyword match works with 900 ms simulated delay.
- [ ] When no keyword matches, AI Coach returns the helpful three-point fallback message.
- [ ] Night Log is the sole incident logger; no separate incident list exists in the Notes section.
- [ ] Night Log JSON export produces a valid file. *(If Monthly Report is implemented, verify it can re-import the same JSON schema; otherwise skip.)*
- [ ] *(Version A only)* `hotelcompanion_editor.html` opens without errors, all four tabs (Pre-Audit, Post-Audit, Night Audit Steps, AI Scripts) are functional.
- [ ] *(Version A only)* Checklist/audit items can be added/deleted/reordered, Export & Save downloads valid `hotelcompanion_items.js`. Placing it alongside `hotelcompanion_suite.html` and reloading replaces default content. Import and Reset to Defaults both work correctly.
- [ ] *(Version A only)* AI Scripts tab shows existing scripts, allows add/edit/delete/reorder, Export & Save downloads valid `hotelcompanion_scripts.js`.
- [ ] *(Version A only)* PDF import in editor extracts text from a text-based PDF, creates draft script entries segmented by TOC headings, and shows a clear error for image-only PDFs.
- [ ] The Sign Generator prints correctly at A4 and A3.
- [ ] The Group Check-in list prints correctly in portrait and landscape.
- [ ] Tools section in sidebar is visually separated from core nav items.
- [ ] Floating Quick Log button is visible on all sections and posts to the Night Log entry list.
- [ ] Brand Customisation modal updates accent colour and hotel name across the whole app.
- [ ] No console errors on page load.
- [ ] *(Version B only)* Unauthenticated users are redirected to `login.html`.
- [ ] *(Version B only)* Magic link login works end-to-end in Supabase.
- [ ] *(Version B only)* All DB writes succeed and RLS prevents cross-user data access.

---

## 10. File Output Checklist

### Version A
- [ ] `hotelcompanion_suite.html` — single self-contained file with all core sections
      plus Tools group (Night Log, Monthly Report *(nice-to-have)*, Group Check-in, Sign Generator, Daily Info Board)
- [ ] `hotelcompanion_editor.html` — **standalone GUI content editor** (no coding required).
      Opens in any browser as a separate file alongside `hotelcompanion_suite.html`.
      Allows non-technical staff / managers to customise checklist, audit content, and
      AI scripts through a point-and-click interface — no code editing, no developer knowledge needed.

      **Editor must include:**
      - Four tabs / accordion sections: **Pre-Audit Items**, **Post-Audit Items**,
        **Night Audit Steps**, **AI Scripts**.
      - Each item displayed as an editable row with:
        - A drag handle (↕) for reordering.
        - A text input for the item label.
        - (Checklist tabs only) A "Required before continue?" toggle (checkbox/pill).
        - (Checklist tabs only) A "Day restriction" dropdown (Every day, Mon only,
          Tue only, Wed only, Thu only, Fri only, Sat only, Sun only,
          Last night of month).
        - A delete (🗑) button.
      - An **"+ Add Item"** button at the bottom of each tab.
      - An **"Export & Save"** button that serialises the current arrays to a
        `hotelcompanion_items.js` file and triggers a browser download. The
        downloaded file must be placed in the same folder as
        `hotelcompanion_suite.html` to take effect.
        The exported file must use this exact schema — a single global assignment
        that the main app can detect and parse safely:
        ```js
        window.HOTELCOMPANION_ITEMS = {
          version: 1,
          preAudit: [
            { id: "pre_001", label: "Item label", required: false, dayRestriction: "every" },
            // ...
          ],
          postAudit: [
            { id: "post_001", label: "Item label", required: false, dayRestriction: "every" },
            // ...
          ],
          auditSteps: [
            { id: "audit_001", label: "Step label" },
            // ...
          ]
        };
        ```
        - `id`: stable, unique string (e.g. `"pre_001"`). Generated once per item at
          creation time and **never changed** — this is the key used to persist and
          retrieve checklist tick state, so it must survive reordering/insertion.
        - `label`: non-empty string.
        - `required` *(checklist items only)*: boolean — maps to "Required before continue?".
        - `dayRestriction` *(checklist items only)*: one of `"every"`, `"mon"`, `"tue"`,
          `"wed"`, `"thu"`, `"fri"`, `"sat"`, `"sun"`, `"last_night_of_month"`.
        - `auditSteps` items have only `id` and `label` — no `required` or `dayRestriction`.
      - The exported `hotelcompanion_items.js` must be a **data-only** file in a
        deterministic format so it can be safely reloaded by the editor without
        executing the file's contents.
      - An **"Import / Load existing"** button that reads a previously saved
        `hotelcompanion_items.js` (or `hotelcompanion_items.example.js`) **as plain
        text only** and parses the serialised data back into the editor so the user
        can continue editing.
      - **Do not** load the selected file by injecting `<script>`, using `eval`,
        `new Function`, dynamic `import()`, or any other mechanism that executes the
        file. The import flow must use text parsing plus strict validation of the
        expected schema only.
      - Validate the imported structure before accepting it: the file must decode to
        an object containing only the expected checklist/audit arrays, and every item
        must have the expected field names, types, and allowed values. Reject any
        file that does not match the schema and show a helpful error message.
      - A **"Reset to Defaults"** button that reloads the built-in default arrays.
      - Clear on-screen instructions (no assumed technical knowledge):
        *"Edit your checklist and audit items below, then click Export & Save.
        Place the downloaded file in the same folder as hotelcompanion_suite.html
        and reload the app."*
      - Design must match the project design system (§ 2) — same dark-gold theme,
        fonts (Bebas Neue / DM Sans), and colour variables.

      **Runtime loading in `hotelcompanion_suite.html`:**
      The main app loads customised content via `<script src="hotelcompanion_items.js">`.
      This is the **single explicit exception** to Version A build rule #3
      ("Inline all JavaScript"), because `hotelcompanion_items.js` is not part of
      the shipped app logic — it is an optional, property-specific override file
      generated by `hotelcompanion_editor.html` so non-technical staff can update
      checklist and audit content without editing code.
      If the file is absent (first install or file not yet exported), unreadable,
      or does not define valid content arrays, the app must fall back to built-in
      default arrays without error.

      **`hotelcompanion_items.example.js`** (committed to the repo) provides the
      default arrays as a reference / starter file. The working
      `hotelcompanion_items.js` is added to `.gitignore` so property-specific
      content is never committed.

      **`hotelcompanion_scripts.js`** runtime loading works identically — loaded via
      `<script src="hotelcompanion_scripts.js">`. Falls back to built-in `SMART_REPLIES`
      silently if absent or invalid.

      **`hotelcompanion_scripts.example.js`** (committed to the repo) provides the
      default generic hospitality scripts as a reference / starter file. The working
      `hotelcompanion_scripts.js` is added to `.gitignore` so property-specific
      scripts are never committed.

- [ ] `hotelcompanion_items.example.js` — default checklist and audit content (committed)
- [ ] `hotelcompanion_scripts.example.js` — default generic hospitality scripts (committed)
- [ ] `.gitignore` — must include `hotelcompanion_items.js` and `hotelcompanion_scripts.js`

### Version A — Recommended build order

Build in this sequence to avoid circular dependencies and allow incremental testing:

1. **`hotelcompanion_items.example.js`** — define default `preAudit`, `postAudit`, and `auditSteps` arrays first; all other files depend on this schema.
2. **`hotelcompanion_scripts.example.js`** — define default `SMART_REPLIES` keyword map; AI Coach depends on this.
3. **`.gitignore`** — exclude `hotelcompanion_items.js` and `hotelcompanion_scripts.js` before any live files are generated.
4. **`hotelcompanion_suite.html`** — main app. Build sections in this order:
   - Shell: sidebar, topbar, section routing, modals (Profile, Brand, Quick Log), persist toggle
   - Core sections: Dashboard → Checklist → Night Audit → Notes → Motivation → AI Coach → History
   - Tools sections: Night Log → Monthly Report → Group Check-in → Sign Generator → Daily Info Board
   - Print stylesheet last (requires all sections to exist)
5. **`hotelcompanion_editor.html`** — content editor. Build tabs in order: Pre-Audit → Post-Audit → Night Audit Steps → AI Scripts (PDF import last, depends on pdf.js CDN).

### Version B
- [ ] `index.html` — dashboard / home
- [ ] `checklist.html` — shift checklist + nightsTicklist merge
- [ ] `nightaudit.html` — night audit tracker
- [ ] `notes.html` — notes & handover
- [ ] `motivation.html` — shift motivation (quotes + tips)
- [ ] `ai.html` — AI Coach / Aria (separate from motivation)
- [ ] `history.html` — shift history
- [ ] `nightlog.html` — night log (NightLog.html revamp) — Tools group
- [ ] `reports.html` — monthly report (NightLogMonthlyReport.html revamp) — Tools group *(nice-to-have; only include if Night Log exports JSON)*
- [ ] `checkin.html` — group check-in (groupcheckinlist.html revamp) — Tools group
- [ ] `signs.html` — sign generator (signGenerator.html revamp) — Tools group
- [ ] `board.html` — daily information board (board.html revamp) — Tools group
- [ ] `login.html` — magic-link auth page
- [ ] `config.example.js` — Supabase config template
- [ ] `js/nav.js` — shared sidebar renderer (core nav + tools divider)
- [ ] `js/auth.js` — shared Supabase auth module
- [ ] `js/db.js` — shared Supabase CRUD helpers
- [ ] `supabase/migrations/001_initial.sql` — DB schema
- [ ] `netlify.toml` — Netlify config with redirects
- [ ] `.gitignore` — must include `config.js`

---

---

## 11. Tone & Content Notes

- All user-facing text must be professional, calm, and supportive — this tool is used
  by lone workers on a night shift.
- Avoid overly technical jargon in the UI.
- Motivational tips (§ `motivation`) must be realistic and grounded in hotel front-office
  practice — not generic corporate motivational quotes.
- Error states should be helpful: explain what went wrong and what to do next.
- Empty states must have a helpful prompt, not just a blank area.

---

## 12. Additional Features to Implement (from `hotelcompanion_enhanced.html`)

These features are not section content but are part of the overall shell and must be
built faithfully.

### 12.1 Floating Quick Log Button

- Fixed `⚡` circular button, bottom-right corner (`position: fixed; bottom: 28px; right: 28px; z-index: 500`).
- Opens a **Quick Log Modal** (max-width 480 px) from anywhere in the app.
- Modal fields: Guest / Room (text), Type (dropdown — Guest Complaint, Maintenance Issue,
  Safety/Security, Billing Dispute, VIP Special Request, Lost & Found, Other),
  Description (textarea), Status (dropdown — Resolved, Pending Follow-up, Escalated to
  Manager, Monitoring).
- On submit: appends an entry to the Night Log's in-memory `logEntries` array, calls `renderNightLogEntries()`,
  saves to localStorage if persist is ON, flashes the button green briefly.
- If any of Guest/Room, Type, or Description is empty: show a validation message.

### 12.2 Brand Customisation Modal

- Opened from the last sidebar nav item (🎨 **Customise**).
- Fields:
  - **Hotel / Property Name** — text input, updates `currentHotelName` and all places
    the hotel name appears (sidebar logo area, print headers, AI system prompt).
  - **Hotel Logo** — file input (image/*). Logo is read as base64 and stored in
    `localStorage`. Displayed as a live preview. "Remove Logo" button.
  - **Brand Accent Colour** — 14 preset colour swatches (gold, deep red, navy, forest
    green, royal purple, burnt orange, sky blue, crimson, teal, brown, charcoal, dark
    gold, rose, cyan) + a colour picker input + hex text input. Selected colour replaces
    `--gold`, `--gold-light`, `--gold-dim` via `document.documentElement.style.setProperty`.
- **Live Preview** shows a dot in the selected colour, the hotel name, and a description
  line.
- "Apply & Save" persists to localStorage. "Cancel" reverts unsaved changes.

### 12.3 Setup Profile Modal

- Shown automatically on first page load when no staff name is saved (`shiftCompanion_staffName` is empty).
- Can also be opened by clicking the staff card in the sidebar.
- Fields: Your Name (text), Your Role (dropdown — Front Desk Agent, Concierge, Bell Staff,
  Housekeeping Supervisor, Food & Beverage, Night Auditor, Duty Manager, New Hire/Trainee),
  Shift Type (dropdown — Morning (6am–2pm), Afternoon (2pm–10pm), Night (10pm–6am), Split Shift).
- On save: updates the sidebar staff card (initials avatar, name, role, shift badge)
  and stores to localStorage unconditionally.

### 12.4 Lone Worker Safety Check-in

On the Dashboard section, include a **Lone Worker Safety** card with:
- A "✓ I'm OK — Check In" button.
- A display of the last check-in time ("Last: HH:MM" or "Not yet checked in").
- Clicking the button records the current time, updates the display, and briefly
  changes the button to "✅ Checked In!" for 2.5 seconds.
- If persist is ON, save the timestamp to `shiftCompanion_lastCheckIn`.
- No automated timer or alert is required — the check-in is purely manual.

### 12.5 Incoming Handover Banner

- When `shiftCompanion_pendingHandover` exists in localStorage on page load:
  - Show a gold-accent banner on the Dashboard below the stat cards with the handover
    text and a dismiss button.
  - Show the same text in the Notes section's incoming-handover read-only panel.
- When the user clicks **End Shift** and fills in handover notes, write those notes to
  `shiftCompanion_pendingHandover` so the next user loading the app sees them.
- The Shift History section must have a "📋 Load Handover" button per entry that writes
  that entry's `handoverNotes` to `shiftCompanion_pendingHandover` and navigates to
  the Dashboard to show it.

### 12.6 Shift Streak Counter

On the Dashboard, the stat card labelled "Shifts" shows the count of entries in
`shiftCompanion_history`. Label text: "First shift logged!" for count = 1,
"Shifts recorded" for count > 1.

### 12.7 `sectionTitles` Map

Every section slug must have an entry in the `sectionTitles` object so the topbar
title updates correctly when navigating. Include all core sections AND the tools
sections:

```js
const sectionTitles = {
  dashboard:   'NIGHT DASHBOARD',
  checklist:   'SHIFT CHECKLIST',
  nightaudit:  'NIGHT AUDIT TRACKER',
  notes:       'NOTES & SHIFT HANDOVER',
  motivation:  'SHIFT MOTIVATION',
  ai:          'AI COACH — ARIA',
  history:     'SHIFT HISTORY',
  nightlog:    'NIGHT LOG',
  reports:     'MONTHLY REPORT',
  checkin:     'GROUP CHECK-IN',
  signs:       'SIGN GENERATOR',
  board:       'DAILY INFO BOARD',
};
```
