# Copilot Build Instructions — Night Receptionist Companion Suite

> **Purpose of this file:** Pre-build instructions for a GitHub Copilot coding agent.
> Read this file in full before writing any code. All design and architecture decisions
> that are marked **[AGENT DECISION]** must be made by the agent based on the criteria
> described, and the chosen option must be recorded at the top of whatever file(s) the
> agent creates.

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
| `NightLog.html` | Detailed incident/issue logger with floor-walk tracking, image capture, category/severity tagging, JSON export. |
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
- Anthropic API key (`shiftCompanion_apiKey`)
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
- Checklist tick state (`shiftCompanion_checklistState`)
- Night Audit step state (`shiftCompanion_auditState`)
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
- No other external CDN dependencies except Google Fonts and (for the hosted version
  only) the chosen backend SDK.

### Printing
- Each tool that has print functionality (`groupcheckinlist`, `signGenerator`,
  `nightsTicklist`) must retain its print behaviour inside the unified app.
- The print stylesheet must page-break appropriately and suppress all navigation chrome.

---

## 4. Delivery Versions — [AGENT DECISION]

**Before writing any code, choose one of the two versions below.** Record your decision
and brief rationale in a comment block at the top of every file you create, e.g.:

```html
<!--
  DELIVERY VERSION: [A or B]
  RATIONALE: <one sentence>
-->
```

---

### Version A — Single Self-Contained HTML File

**When to choose Version A:**
- Simplicity is the priority.
- The tool will be used offline or on a restricted network.
- No backend or hosting budget is available.
- The operator wants a zero-dependency, email-or-USB-distributable file.

**Build rules:**
1. Produce **one file**: `hotelcompanion_suite.html`.
2. Inline all CSS (no `<link>` to local stylesheets). Google Fonts `<link>` is allowed.
3. Inline all JavaScript (no `<script src="…">`).
4. The sidebar nav must contain all core sections plus a "TOOLS" divider group with
   the four tool sections (see § 5).
5. All inter-section navigation must use the existing `showSection(id, btn)` pattern.
6. `localStorage` is the persistence mechanism, but saving session data is **opt-in**
   via the sidebar "Persist Data" toggle (see § 3).
7. Export/import must use the File System Access API (`showSaveFilePicker`) with a
   fallback `<a download>` for browsers that do not support it.
8. Target file size: under 600 KB (HTML + inlined assets, excluding embedded user images).

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
| `checklist` | Shift Checklist | `§ section-checklist` + `nightsTicklist.htm` | Pre/During/Post tabs; Pre-Shift items from `nightsTicklist.htm` `preAuditTasks`; Post-Shift items from `nightsTicklist.htm` `rawTasks`; items from `§ section-checklist` merged and deduplicated; progress bar; `required-before-continue` highlights; day-of-week / last-night-of-month badges; handover-sheet print view. See § 7 for full merge guide. |
| `nightaudit` | Night Audit | `§ section-nightaudit` | Step-by-step audit tracker (procedure steps only — not checklist items); checkbox per step; progress bar; notes per step; reset button. Source: `hotelcompanion_enhanced.html § section-nightaudit`. |
| `notes` | Notes & Handover | `§ section-notes` | Shift notes textarea, handover notes textarea, incoming handover read-only panel. **Do not add a separate incident log here.** All incident logging — including quick in-shift entries — is handled exclusively by the Night Log tool (see Tools section below). The incident mini-log that exists in `hotelcompanion_enhanced.html § section-notes` is a duplicate of Night Log and must not be carried forward. |
| `motivation` | Motivation | `§ section-motivation` | Quote carousel (8 quotes, "Next Quote" button), excellence tips grid |
| `ai` | AI Coach | `§ section-ai` | Dual-mode AI chat (see § 8), suggestion chips, API key prompt/connect flow, clear chat button |
| `history` | Shift History | `§ section-history` | Expandable shift entries, aggregate stats (shifts completed, avg checklist %, total incidents, most common incident type), clear history, load handover from history |

### Tools section (new — from standalone HTML files)

These tools do not fit naturally within the core sections above. Group them under a
**"Tools"** heading in the sidebar navigation (visually separated from the core nav
items by a divider and a `TOOLS` label in `var(--muted)` / `DM Mono`).

| Section slug | Display title | Source file | Key features to preserve |
|---|---|---|---|
| `nightlog` | Night Log | `NightLog.html` | Shift start/resume screen (leader name), floor-walk all-clear grid, issue entry form (timestamp, floor, category, severity, title, description, reporter, image capture), entry list with edit/delete, JSON export. **This is the sole incident logger for the entire app.** Its entries are session data cleared by the main End Shift flow (no separate end-shift button inside this section). *(JSON import and WhatsApp/email sharing are intentionally excluded from the unified version.)* |
| `reports` | Monthly Report | `NightLogMonthlyReport.html` | Multi-file JSON drop/import, stat grid, bar charts (by category/floor/severity/all-clear coverage), shift summary table, filterable all-entries table. **Nice-to-have — only implement if Night Log JSON exports are available in the chosen delivery version; mark as optional in the build.** |
| `checkin` | Group Check-in | `groupcheckinlist.html` | Logo upload, date field, group name, guest list with add/remove rows, bulk name import modal, portrait/landscape toggle, print |
| `signs` | Sign Generator | `signGenerator.html` | A4/A3 size selector, portrait/landscape toggle, background colour palette + custom image + overlay slider, logo upload, body text + colour, sub-body text + colour, live preview, print |
| `board` | Daily Info Board | `board.html` | Date selector (auto-populates 7-day rolling column headers), 7-day stats grid (rooms sold, guests in house, occupancy %, room revenue, total revenue, ADR, RevPAR, arrivals, departures, F&B covers), VIP guests list, special notes/info panel, reset button, print (landscape A3-style, hides UI chrome). Board data is saved under `shiftCompanion_boardData` via the unified persist toggle — the standalone `dailyBoardData` key must not be used. |

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
| `preAuditTasks` | 17 items | **Pre-Shift / During-Shift Checklist** — tasks performed on arrival and up to (but not including) running the night audit. The final task ("Run Night Audit at 0301") is the handoff point to the Night Audit Tracker. |
| `rawTasks` | 38 items | **Post-Shift Checklist** — tasks performed after the audit has run (reports, banking, handover, etc.). |

The **Night Audit Tracker** section (`§ section-nightaudit` in `hotelcompanion_enhanced.html`)
is the step-by-step audit *procedure* (post room charges, reconcile payments, print
reports, etc.). These are **not** from `nightsTicklist.htm` — they come from the
existing `§ section-nightaudit` step list. Do not mix audit procedure steps into the
checklist, and do not mix checklist items into the audit tracker.

The "Run Night Audit" item at the end of `preAuditTasks` should appear in the
Pre-Shift checklist as a highlight card or call-to-action that navigates the user to
the Night Audit Tracker section — not as a plain checkbox.

### Merge rules

1. **Deduplicate** items that are semantically identical across both source files.
2. **Categorise** all items into the three tabs: Pre-Shift / During Shift / Post-Shift,
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

## 8. AI Coach — Dual-Mode (Smart Defaults + Live Anthropic API)

The AI Coach is the `§ section-ai` section. It has two operating modes which are
selected automatically based on whether an API key has been provided:

### Mode 1 — Smart Defaults (always available, no API key required)

A built-in `SMART_REPLIES` keyword map provides instant, high-quality responses to
common hospitality scenarios. The lookup is case-insensitive substring match on the
user's message.

**Required keywords to implement** (carry over all existing entries from
`hotelcompanion_enhanced.html` verbatim):
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

**Extend with at least 10 additional keywords** drawn from the checklist items and
NightLog categories in the project. Suggested additions:
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

### Mode 2 — Live AI via Anthropic Claude API (optional, key stored locally)

When an Anthropic API key is present (`apiKey !== ''`), messages are sent to the
Anthropic Messages API instead of using the keyword map.

**API details:**
- Endpoint: `https://api.anthropic.com/v1/messages`
- Model: `claude-sonnet-4-20250514`
- `max_tokens`: 1000
- Method: `POST` with `Content-Type: application/json`
- Auth header: `x-api-key: <apiKey>`, `anthropic-version: 2023-06-01`
- **Important:** calls are made client-side (browser `fetch`). The API key is stored
  in `localStorage` only. Never proxy or log the key.

**System prompt** — inject current shift context dynamically:
```
You are Aria, an expert AI Night Shift Hospitality Coach embedded in a Night
Receptionist shift companion app. You are coaching {staffName}, who works as a
{staffRole} at {hotelName} on the {shiftLabel}.

CRITICAL PROPERTY POLICY — CARD PAYMENTS ONLY:
This property accepts card payments only. No cash is accepted under any
circumstances. Always reflect this in payment advice.

Current shift context:
- Checklist completion: {checklistPct}
- Incidents this shift: {incidentSummary}  ← sourced from Night Log entries
[- Shift notes: {shiftNotes} — only include if non-empty]

You specialise in night shift hospitality: late check-ins, lone worker safety,
noise complaints, intoxicated guests, unauthorised visitors, night audit processes,
card payment scripts, security protocols. Keep responses practical, warm, and
actionable. Use bold headers and specific scripts where relevant. Always factor in
the lone-worker reality — escalating to a duty manager is always valid.
```

**Chat history:** send the last 10 messages from `chatHistory` (alternating
`user`/`assistant` roles) as the `messages` array.

### AI Coach UI requirements
- On first load: show the API key prompt section (`#apiKeySection`) unless a key is
  already saved — then skip straight to the chat container.
- Buttons: **Connect AI Coach** (saves key) and **Use Smart Defaults Only** (hides
  the prompt, shows fallback message in chat).
- Chat header shows: avatar 🤖, name "Aria — AI Hospitality Coach",
  status indicator ("Online & Ready" / "Aria is thinking..."), Clear Chat button,
  🔑 API Key button.
- Suggestion chips (always shown below messages, above input):
  "Guest wants to pay cash", "Card declined at check-in", "Noise complaint script",
  "Intoxicated guest at desk", "Late arrival — no booking found",
  "Guest locked out at 3am", "Handle a guest complaint",
  "Night audit error — what to do", "Suspicious person in lobby",
  "Pre-auth / billing query script"
- Typing indicator (three animated dots) shown while awaiting API response.
- Markdown inline renderer: `**text**` → `<strong>text</strong>`, `\n` → `<br>`.
  No external markdown library.
- `Enter` submits, `Shift+Enter` adds a newline. Textarea auto-resizes.
- Smart Defaults mode: 900 ms simulated delay before rendering reply (makes it feel
  considered, not instant).
- API error: display the error message inline in a chat bubble.

---

## 9. Quality Gates

Before considering the build complete, verify all of the following:

- [ ] All seven source files' features are represented in the output.
- [ ] All tool data uses the `shiftCompanion_` localStorage namespace — no tool has its own independent key (e.g. no `dailyBoardData`).
- [ ] No tool has its own standalone "end shift" or "clear data" flow — all session data is cleared by the single main End Shift action.
- [ ] `localStorage` persist toggle defaults to **OFF**; session data is not saved unless toggled on.
- [ ] Toggling persistence ON immediately saves current session data.
- [ ] Profile (name/role/shift) and API key are always saved regardless of toggle state.
- [ ] Shift history persists across sessions and is not cleared by End Shift.
- [ ] The print stylesheet hides all navigation and renders cleanly.
- [ ] The sidebar staff card shows the name entered at shift start.
- [ ] End Shift saves to history, shows confirmation modal, then clears session data.
- [ ] AI Coach Smart Defaults mode works with no API key (keyword match, 900 ms delay).
- [ ] AI Coach Live mode works when a valid Anthropic API key is entered.
- [ ] AI system prompt includes live shift context (staff name, incidents, checklist %).
- [ ] Night Log is the sole incident logger; no separate incident list exists in the Notes section.
- [ ] Night Log JSON export produces a valid file. *(If Monthly Report is implemented, verify it can re-import the same JSON schema; otherwise skip.)*
- [ ] *(Version A only)* `hotelcompanion_editor.html` opens without errors, all three tabs (Pre-Shift, Post-Shift, Night Audit Steps) are editable, items can be added/deleted/reordered, and Export & Save downloads a valid `hotelcompanion_items.js`. Placing that file alongside `hotelcompanion_suite.html` and reloading the app replaces the default content with the exported content. Import and Reset to Defaults both work correctly.
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
      Allows non-technical staff / managers to customise checklist and audit content
      through a point-and-click interface — no code editing, no developer knowledge needed.

      **Editor must include:**
      - Three tabs / accordion sections: **Pre-Shift Items**, **Post-Shift Items**,
        **Night Audit Steps**.
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
      If the file is absent (first install or file not yet exported), the app must
      fall back to built-in default arrays without error.

      **`hotelcompanion_items.example.js`** (committed to the repo) provides the
      default arrays as a reference / starter file. The working
      `hotelcompanion_items.js` is added to `.gitignore` so property-specific
      content is never committed.

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
