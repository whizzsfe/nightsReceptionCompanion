# Editor Build Plan — `hotelcompanion_editor.html`

Standalone single-file GUI for non-technical managers to edit checklist items and AI scripts,
then export `hotelcompanion_items.js` / `hotelcompanion_scripts.js` to drop into the OneDrive folder.

---

## Output files this editor produces

| File | What it controls |
|---|---|
| `hotelcompanion_items.js` | Pre-Audit and Post-Audit checklist items shown in the suite |
| `hotelcompanion_scripts.js` | AI Coach keyword scripts (property-specific responses) |

Both files are gitignored. The example files (`hotelcompanion_items.example.js`,
`hotelcompanion_scripts.example.js`) are the source of truth for the built-in defaults
and must be mirrored exactly in the editor's Reset to Defaults logic.

---

## Tabs

Three tabs only — Night Audit Tracker section is deprecated.

| Tab | Controls |
|---|---|
| Pre-Audit | `preAudit[]` array in `hotelcompanion_items.js` |
| Post-Audit | `postAudit[]` array in `hotelcompanion_items.js` |
| AI Scripts | `scripts[]` array in `hotelcompanion_scripts.js` |

---

## Schema reference

### Checklist item (preAudit / postAudit)
```js
{
  id:             string,   // stable, unique e.g. "pre_001" — never changed after creation
  label:          string,   // task title (non-empty)
  notes:          string,   // bullet-point guidance; "" if none; \n for line breaks
  required:       boolean,  // true = highlighted as required in suite
  dayRestriction: string    // "every"|"mon"|"tue"|"wed"|"thu"|"fri"|"sat"|"sun"|"last_night_of_month"
}
```

### AI Script
```js
{
  id:       string,    // stable, unique e.g. "script_001"
  keywords: string[],  // lowercase; any substring match triggers this script
  title:    string,    // display name
  category: string,    // grouping label
  response: string     // full response; **bold** and \n supported
}
```

---

## Build phases

### Phase 1 — Shell and design system

1. Create `hotelcompanion_editor.html`.
2. Copy CSS custom properties and Google Fonts `<link>` tags verbatim from `hotelcompanion_suite.html`
   (same dark-gold design: `--gold`, `--dark`, `--card`, `--border`, `--text`, `--muted`, etc.;
   fonts: Bebas Neue / DM Sans / DM Mono).
3. Layout: centered column (no sidebar — admin tool only).
   - Fixed top bar: hotel logo (with `onerror` hide fallback), title "CONTENT EDITOR",
     three tab buttons (Pre-Audit | Post-Audit | AI Scripts) with live item-count badges.
   - Instruction banner below tabs (plain-English, non-technical).
   - Scrollable item list area.
   - Sticky bottom action bar: Import, Reset to Defaults, Export & Save.

---

### Phase 2 — Pre-Audit and Post-Audit tabs

4. Each checklist item renders as an editable row containing:
   - Drag handle (`↕`) — HTML5 `draggable` attribute for reordering.
   - `<input type="text">` for `label` (non-empty validation on export).
   - Collapsible `<textarea>` for `notes` (click to expand; closed by default if empty).
   - "Required" pill toggle (styled checkbox — toggles `required` boolean).
   - `<select>` for `dayRestriction`:
     Every Day / Mon only / Tue only / Wed only / Thu only / Fri only /
     Sat only / Sun only / Last night of month.
   - Delete (🗑) button with confirmation tooltip.

5. On load: populate both tabs from inlined copies of `DEFAULT_PRE_AUDIT` (17 items)
   and `DEFAULT_POST_AUDIT` (38 items) — identical data to `hotelcompanion_items.example.js`.
   No runtime file dependency.

6. "+ Add Item" button at bottom of each tab:
   - Appends a blank row.
   - Generates a stable ID: tab prefix (`pre_` or `post_`) + zero-padded sequential index
     based on current highest existing numeric suffix + 1.
   - Scrolls new row into view and focuses the label input.

7. Drag-and-drop reorder:
   - `dragstart` / `dragover` / `drop` events on each row.
   - Visual drop indicator (gold top border on target row).
   - IDs are never regenerated on reorder — order in the array changes, IDs stay fixed.

---

### Phase 3 — AI Scripts tab

8. Each script renders as a card with:
   - `<input>` for `title`.
   - `<input>` for `category` with `<datalist>` suggestions:
     Payments, Complaints, Security, Arrivals & Departures, VIP & Service, Operations.
   - `<textarea>` for `keywords` — comma-separated display; serialised as `string[]` on export.
   - `<textarea>` for `response` — multi-line; hint text shows `**bold**` and `\n` syntax.
   - Delete (🗑) button.

9. On load: populate from inlined copy of the 26 default scripts from
   `hotelcompanion_scripts.example.js`. No runtime file dependency.

10. "+ Add Script" button:
    - Appends a blank card.
    - Generates ID: `"script_"` + zero-padded sequential index.

11. No drag-and-drop for scripts — match order is irrelevant (all keywords checked on every query).

---

### Phase 4 — Import / Export

12. **Export & Save — Items** (Pre-Audit / Post-Audit tabs):
    - Serialise current `preAudit[]` and `postAudit[]` arrays into:
      ```js
      window.HOTELCOMPANION_ITEMS = { version: 1, preAudit: [...], postAudit: [...] };
      ```
    - Trigger download as `hotelcompanion_items.js`.
    - Use `window.showSaveFilePicker` with `<a download>` fallback.
    - Show "Last exported: HH:MM" timestamp after save.

13. **Export & Save — Scripts** (AI Scripts tab):
    - Serialise current `scripts[]` array into:
      ```js
      window.HOTELCOMPANION_SCRIPTS = { version: 1, scripts: [...] };
      ```
    - Trigger download as `hotelcompanion_scripts.js`.
    - Same picker + fallback pattern.

14. **Import / Load existing** (available on all tabs — loads both files):
    - File picker (`<input type="file" accept=".js">`).
    - Read as **plain text only** — absolutely no `eval`, `new Function`, dynamic `import()`,
      or `<script>` injection.
    - Parse strategy:
      ```js
      const match = text.match(/window\.HOTELCOMPANION_ITEMS\s*=\s*(\{[\s\S]*?\})\s*;/);
      const data = JSON.parse(match[1]); // after stripping JS trailing commas
      ```
    - Validate before accepting:
      - Root object has `version === 1`.
      - `preAudit` and `postAudit` are arrays.
      - Every item has `id` (string), `label` (non-empty string), `notes` (string),
        `required` (boolean), `dayRestriction` (one of the 9 valid values).
      - Reject and show a descriptive error if any validation fails.
    - On success: replace editor contents with imported data.

15. **Reset to Defaults**:
    - Confirmation prompt: "This will discard all your changes and reload the built-in defaults."
    - On confirm: reload both tabs from the inlined default arrays.

---

### Phase 5 — PDF import (AI Scripts tab only)

16. "Import from PDF" button in the AI Scripts tab action bar.

17. On click: lazily load pdf.js via CDN (ES module, dynamic import — only fetched when needed):
    ```
    https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs
    ```
    Configure worker: `pdfjsLib.GlobalWorkerOptions.workerSrc = '...'` (same CDN, worker build).

18. File picker for PDF (`<input type="file" accept=".pdf">`).

19. Text extraction: iterate all pages via `page.getTextContent()`, join text items into a
    single string preserving line breaks.

20. Error: if extracted text is empty or whitespace-only, show:
    > *"No text could be extracted. Your PDF may be a scanned image.
    > Please share the PDF with your developer to process it manually."*

21. Heading detection heuristic:
    - Lines shorter than 80 characters that appear after a blank line OR match title-case /
      all-caps pattern.
    - TOC lines (short line + page number at end, e.g. `"Section Name ....... 12"`) excluded
      from body content but used to confirm heading names.

22. Segmentation: split full text at each detected heading → one draft script card per segment.

23. Draft review panel (shown in a modal overlay):
    - Each draft card is editable before adding: title, category, keywords (CSV), response body.
    - Manager can delete individual drafts.
    - "Add to Scripts" button appends all remaining draft cards to the live scripts list.
    - Warning shown: *"Table content may have scrambled order — review table sections carefully."*

24. Error: if no headings detected, show:
    > *"No section headings were found. The PDF may be a flat document without a clear structure.
    > Try adding scripts manually or ask your developer to review the PDF format."*

---

### Phase 6 — Polish

25. `beforeunload` warning when there are unsaved changes (track dirty state; cleared on export).

26. Live item-count badge on each tab button updates as items are added/deleted
    (e.g. "Pre-Audit · 17").

27. Keyboard accessibility: all interactive row elements reachable by Tab; Enter/Space
    activate toggles; Escape closes any open overlays.

28. Empty state: if a tab has zero items, show a centred prompt:
    *"No items yet. Click + Add Item to get started."*

---

## Notes and constraints

- Import parsing must never execute file contents — text-parse + JSON.parse only.
- IDs are generated once and never changed on reorder, ensuring saved tick state in the suite
  remains correctly mapped after a re-export.
- The editor has no dependency on the suite at runtime — it is a completely standalone file.
- pdf.js is only loaded in the editor (never the suite) — CDN dependency is acceptable here
  because the editor is a manager tool, not a shift-time tool.
- Design must match the suite exactly: same CSS variables, same fonts, same button styles.
