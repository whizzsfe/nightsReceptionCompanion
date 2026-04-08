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
| `NightLog.html` | Detailed incident/issue logger with floor-walk tracking, image capture, category/severity tagging, JSON export/import, WhatsApp & email share. |
| `NightLogMonthlyReport.html` | Monthly analytics — loads multiple JSON shift exports, renders bar charts, shift summary table, filterable entry list. |
| `groupcheckinlist.html` | Print-ready group check-in list — logo upload, bulk name import, portrait/landscape toggle. |
| `signGenerator.html` | ISO sign generator — A4/A3, portrait/landscape, background image/colour, logo, body/sub-body text, print. |
| `nightsTicklist.htm` | Bootstrap-based front-office nights checklist with validation, handover sheet, auto-save to `localStorage`. |

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
- All transient data (shift notes, checklist state, incidents, audit steps, staff name,
  theme preferences) must be saved to `localStorage` using namespaced keys, e.g.
  `nrc_checklist_pre`, `nrc_handover_notes`, `nrc_incidents`, `nrc_shift_meta`, etc.
- Data must auto-save on `input`/`change` events and be restored on page load.
- Provide a **Clear / End Shift** action with a confirmation modal before wiping
  `localStorage`.

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
4. The sidebar nav must contain all six tool sections listed in § 2 plus any additional
   sections from the merged tools (see § 5 for the section map).
5. All inter-section navigation must use the existing `showSection(id, btn)` pattern.
6. `localStorage` is the only persistence mechanism.
7. Export/import must use the File System Access API (`showSaveFilePicker`) with a
   fallback `<a download>` for browsers that do not support it.
8. Target file size: under 500 KB (HTML + inlined assets, excluding embedded user images).

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

| Section / Page slug | Display title | Source file(s) | Key features to preserve |
|---|---|---|---|
| `dashboard` | Night Dashboard | `hotelcompanion_enhanced.html § section-dashboard` | Live clock, stat cards, quick-action cards, incoming handover read panel |
| `checklist` | Shift Checklist | `hotelcompanion_enhanced.html § section-checklist` + `nightsTicklist.htm` | Pre/During/Post tabs, all checklist items (merge both files, deduplicate), progress bar, handover sheet print view |
| `nightaudit` | Night Audit | `hotelcompanion_enhanced.html § section-nightaudit` | Step-by-step audit tracker with progress bar and notes per step |
| `nightlog` | Night Log | `NightLog.html` | Floor walk, issue entry (category, severity, reporter, image), entry list, JSON export/import, share via WhatsApp/email |
| `reports` | Monthly Report | `NightLogMonthlyReport.html` | Multi-file JSON import, stat grid, bar charts, shift summary table, filterable all-entries table |
| `notes` | Notes & Handover | `hotelcompanion_enhanced.html § section-notes` | Shift notes, handover notes, incoming handover (read-only), incident mini-log |
| `checkin` | Group Check-in | `groupcheckinlist.html` | Logo upload, date, group name, guest list, bulk import, print |
| `signs` | Sign Generator | `signGenerator.html` | A4/A3, portrait/landscape, background, logo, body text, print |
| `motivation` | Shift Coach | `hotelcompanion_enhanced.html § section-motivation` + `§ section-ai` | Motivational tips carousel, AI Coach keyword chat |
| `history` | Shift History | `hotelcompanion_enhanced.html § section-history` | Aggregate stats across saved shifts, common incident type, avg checklist %, total incidents |

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

-- Incidents (lightweight, from notes section)
create table public.incidents (
  id          uuid primary key default gen_random_uuid(),
  shift_id    uuid references public.shifts(id) on delete cascade,
  staff_id    uuid references public.profiles(id) on delete cascade,
  category    text,
  description text,
  created_at  timestamptz default now()
);
alter table public.incidents enable row level security;
create policy "Staff see own incidents"
  on public.incidents for all using (auth.uid() = staff_id);
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

1. **Deduplicate** items that are semantically identical.
2. **Categorise** all items into the three tabs: Pre-Shift / During Shift / Post-Shift.
3. Keep the `required-before-continue` (yellow highlight) behaviour for critical items
   from `nightsTicklist.htm`.
4. Keep the handover-sheet print view from `nightsTicklist.htm` (the
   `.handover-page` layout).
5. Apply the design system (§ 2) — replace Bootstrap classes with custom CSS that
   matches the dark-gold theme.

---

## 8. AI Coach Behaviour

The AI Coach section (`motivation` / `ai`) uses a **keyword-match response map** — no
external AI API is called. Preserve this approach.

- The existing keyword map in `hotelcompanion_enhanced.html` (search for
  `const responses = {` and `const sectionTitles`) must be kept intact.
- Extend the map with at least 10 additional hospitality scenario keywords drawn from
  the checklist and nightlog categories already present in the project.
- The chat UI must render markdown (`**bold**`, `\n` line breaks) using a small inline
  renderer — no external markdown library.

---

## 9. Quality Gates

Before considering the build complete, verify all of the following:

- [ ] All six source files' features are represented in the output.
- [ ] `localStorage` saves and restores correctly after a full page reload.
- [ ] The print stylesheet hides all navigation and renders cleanly.
- [ ] The sidebar staff card shows the name entered at shift start.
- [ ] Shift end clears `localStorage` after confirmation.
- [ ] The Night Log JSON export produces a valid file that can be re-imported by the
      Monthly Report tool (same JSON schema as `NightLog.html`).
- [ ] The Sign Generator prints correctly at A4 and A3.
- [ ] The Group Check-in list prints correctly in portrait and landscape.
- [ ] No console errors on page load.
- [ ] *(Version B only)* Unauthenticated users are redirected to `login.html`.
- [ ] *(Version B only)* Magic link login works end-to-end in Supabase.
- [ ] *(Version B only)* All DB writes succeed and RLS prevents cross-user data access.

---

## 10. File Output Checklist

### Version A
- [ ] `hotelcompanion_suite.html` — single self-contained file

### Version B
- [ ] `index.html` — dashboard / home
- [ ] `checklist.html` — shift checklist + nightsTicklist merge
- [ ] `nightaudit.html` — night audit tracker
- [ ] `nightlog.html` — night log (NightLog.html revamp)
- [ ] `reports.html` — monthly report (NightLogMonthlyReport.html revamp)
- [ ] `notes.html` — notes & handover
- [ ] `checkin.html` — group check-in (groupcheckinlist.html revamp)
- [ ] `signs.html` — sign generator (signGenerator.html revamp)
- [ ] `motivation.html` — shift coach / AI coach
- [ ] `history.html` — shift history
- [ ] `login.html` — magic-link auth page
- [ ] `config.example.js` — Supabase config template
- [ ] `js/nav.js` — shared sidebar renderer
- [ ] `js/auth.js` — shared Supabase auth module
- [ ] `js/db.js` — shared Supabase CRUD helpers
- [ ] `supabase/migrations/001_initial.sql` — DB schema
- [ ] `netlify.toml` — Netlify config with redirects
- [ ] `.gitignore` — must include `config.js`

---

## 11. Tone & Content Notes

- All user-facing text must be professional, calm, and supportive — this tool is used
  by lone workers on a night shift.
- Avoid overly technical jargon in the UI.
- Motivational tips (§ `motivation`) must be realistic and grounded in hotel front-office
  practice — not generic corporate motivational quotes.
- Error states should be helpful: explain what went wrong and what to do next.
- Empty states must have a helpful prompt, not just a blank area.
