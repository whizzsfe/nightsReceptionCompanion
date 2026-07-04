/*
  DELIVERY VERSION: A
  RATIONALE: Single file distributed via OneDrive sync folder, opened via file:// on company PCs. Offline-first, no server required.

  hotelcompanion_wiki.example.js
  -----------------------------------------------------------------------
  Default Operations Manual wiki content for the Night Receptionist
  Companion Suite. This file is the COMMITTED EXAMPLE — the working
  hotelcompanion_wiki.js is gitignored so property edits are not committed.

  To customise: open hotelcompanion_editor.html → Operations Manual tab
  → edit pages → Export & Save → place hotelcompanion_wiki.js alongside
  hotelcompanion_suite.html in the same OneDrive folder.

  Schema:
    window.HOTELCOMPANION_WIKI = {
      version: 1,
      pages: [
        {
          id:            string  — stable unique ID, generated once, never changed
          title:         string  — page display title
          category:      string  — category group name
          categoryOrder: number  — sort order for the category in the nav
          pageOrder:     number  — sort order within the category
          content:       string  — plain text with optional markup:
                                    **text** → bold
                                    *text*   → italic
                                    # text   → heading (h3)
                                    ## text  → subheading (h4)
                                    - text   → bullet list item
                                    ---      → horizontal divider
          lastModified:  string  — ISO 8601 timestamp
        }
      ]
    };
*/

window.HOTELCOMPANION_WIKI = window.HOTELCOMPANION_WIKI || {
  version: 1,
  pages: [

    // ─────────────────────────────────────────────
    // CATEGORY 0 — Reference
    // ─────────────────────────────────────────────

    {
      id: 'wiki_ref_001',
      title: 'Golden Rules',
      category: 'Reference',
      categoryOrder: 0,
      pageOrder: 0,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# The Night Team Golden Rules

These rules exist to protect the hotel, the guests, and you.

---

**Rule 1 — Never run audit with unresolved PM balances**
PM balances that are not zero will block the audit. The business day cannot close with outstanding internal charges.

**Rule 2 — Never check in arrivals just to clear the screen**
Checking in a guest without securing payment means the hotel carries the debt. Once in the room, recovery becomes much harder.

**Rule 3 — Always verify backup before city ledger checkout**
City ledger companies are billed based on the folio you submit. Checking out without matching backup causes payment disputes.

**Rule 4 — RevPar MUST be completed before midnight**
Marriott systems use the business date. After midnight the date rolls and the previous day's data cannot be corrected. This affects daily revenue figures.

**Rule 5 — If unsure about a ledger, check it out as Open Folio**
An Open Folio is always safer than a wrong checkout. The day team can resolve it properly.

**Rule 6 — Always communicate issues to the day team in writing**
Night shifts operate in isolation. Anything unresolved must appear in the handover notes. What you know and do not pass on becomes someone else's problem at 7 AM.

**Rule 7 — Guest safety always comes before admin work**
No report, no audit, no checklist item is more important than the safety of a guest or staff member.

**Rule 8 — D156 must always be run before Hotel Flash and Early Bird**
D156 contains the source data for both subsequent reports. Running them out of order produces incorrect figures.`
    },

    {
      id: 'wiki_ref_002',
      title: 'Night Folder Contents',
      category: 'Reference',
      categoryOrder: 0,
      pageOrder: 1,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Night Folder Contents

File the following items **front to back** in the night folder at the end of each shift.

---

- FreedomPay Final Report
- Audit Reports
- FreedomPay & D100 Reports *(from the day team — printed at end of each shift)*
- F&B End of Day Bankings
- Golf Receipts Envelope
- Dockets *(2nd to last slot)*
- Registration Cards *(Back slot)*

---

**Dockets reminder:** Sort dockets into three groups before filing.
- **a.** Dockets with a card payment slip — file directly in the night folder.
- **b.** Dockets charged to a room — sort by room number *(except 9000, 9001, 9066).*
- **c.** Everything else — sort by room number.

Groups **b** and **c** are needed for rebates before they can be filed.`
    },

    {
      id: 'wiki_ref_003',
      title: 'Glossary',
      category: 'Reference',
      categoryOrder: 0,
      pageOrder: 2,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Glossary of Terms

Key terms used in the night operations manual and on-screen in Opera.

---

**A/R Ledger**
Accounts Receivable ledger — money owed to the hotel by companies or clients.

**ARR**
Average Room Rate — the average price of rooms sold on a given night.

**Backup**
Supporting documentation (e.g. from Expedia or Golfbreaks) that must match the folio before a city ledger checkout can be processed.

**BMR**
Marriott Bonvoy market code. Reservations with BMR are Bonvoy points bookings — rates must be updated in Opera as part of RevPar.

**BRS Golf**
Internal PM account (Room 9030) used for Golf revenue routing. Checked out via rebate each night.

**Business Date**
The current date in Opera. Night Audit advances it to the next day. Tasks like RevPar must be done before this rolls over at midnight.

**City Ledger**
A company with a direct billing contract. Charges go to the company account, not the guest.

**D100**
Financial report showing all payment transactions for the shift. Matched against FreedomPay total before cashier close.

**D130**
Checked-out reservation report. Used to find reservations with outstanding balances blocking the audit.

**D140**
Report showing negative postings — used to identify refunds or adjustments during the shift.

**D156**
Financial reconciliation export. Must be run before Hotel Flash and Early Bird.

**D999**
Breakfast report printed for the morning F&B team.

**E106**
End-of-day Opera report containing daily room statistics used to complete the Hotel Flash.

**F100**
One Yield source report. Contains group, contract, transient, and total rooms/revenue figures.

**F116**
Opera financial report containing room revenue figures used in Early Bird and STR reports.

**FreedomPay**
The PDQ/card terminal payment portal. Used to get the batch total matched against D100.

**Hotel Flash**
Daily summary spreadsheet showing rooms sold, occupancy, and revenue. Completed post-audit and filed on the P Drive.

**IE Mode**
Internet Explorer Compatibility Mode in Microsoft Edge. Required for Opera to function.

**Island**
Marriott's browser platform used to access MINT/MRDW data for RevPar.

**MBV-16**
Marriott Bonvoy data file downloaded from Island and copied into the RevPar spreadsheet.

**MINT / MRDW**
Marriott's internal data warehouse used for RevPar tracking.

**One Yield**
Marriott's revenue reporting tool. Night team submits daily actual data using the One Yield Actual Upload Tool.

**Open Folio**
A guest account not fully settled at checkout. Tracked daily and emailed to the relevant teams.

**Opera**
The hotel's Property Management System (PMS). Must be run in IE Mode in Microsoft Edge.

**PDQ**
The card payment terminal used at the front desk.

**PM Account**
A pseudo-room account used for internal hotel postings (e.g. BRS Golf, rebates). Must be zero or extended before audit.

**R118**
Breakfast report printed for the morning team showing guests with breakfast included.

**Rebate**
A credit applied to a guest's or PM account to reduce or zero the balance.

**Registration Card**
The physical document a guest signs at check-in. Legal record of their stay and payment agreement.

**RevPar**
Revenue Per Available Room — a key Marriott performance metric. Must be updated from Island data before midnight each night.

**STR**
Smith Travel Research — a global hotel benchmarking platform. Night team submits daily room and revenue data.

**Transaction Code**
An Opera code identifying the type of charge or payment (e.g. 90701 = Visa, 90000 = Cash, BUP15 = breakfast package).`
    },

    // ─────────────────────────────────────────────
    // CATEGORY 1 — Emergency & Safety
    // ─────────────────────────────────────────────

    {
      id: 'wiki_em_001',
      title: 'Fire Alarm',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 0,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Fire Alarm

**CRITICAL — Call 999 if unsure. Do not assume false alarm.**

---

## Immediate Actions

- Follow fire evacuation. Assist guests to nearest exit.
- **Do not use lifts.** Use stairwells only.
- Assembly point: hotel car park / designated assembly point.
- Do not re-enter the building until all-clear from fire service.

## Escalation

- Evacuate → Call 999 → Contact Duty Manager → Contact GM if required.

---

**Even if you believe it is a false alarm — always treat it as real until the fire service confirms otherwise.**`
    },

    {
      id: 'wiki_em_002',
      title: 'Medical Emergency',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 1,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Guest Medical Emergency

**CRITICAL — Call 999 immediately.**

---

## Immediate Actions

- Call **999** — give hotel address, nature of emergency, your name.
- Check the whiteboard for the on-duty First Aider.
- Defibrillator (AED) — check with management for exact location.
- Stay with the guest until paramedics arrive if it is safe to do so.

## After the Incident

- Log a full entry in the Night Log.
- Include in your handover notes.

---

## Escalation

- Call 999 → First Aider → Duty Manager → Night Log entry.`
    },

    {
      id: 'wiki_em_003',
      title: 'Noise Complaint',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 2,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Noise Complaint

**Priority: resolve calmly and quickly — log everything.**

---

## Steps

- **Step 1** — Call the room causing noise. Politely ask them to keep it down.
- **Step 2** — If the call does not resolve it, visit the room in person. Stay calm and professional.
- **Step 3** — If noise continues, inform them clearly that a second complaint may result in a police call.
- **Step 4** — For persistent large parties, be prepared to call 999 if required.

## Escalation

- Phone call → In-person visit → Duty Manager → Police if needed.

---

**Always log noise complaints in the Night Log** — time, room number, nature of complaint, action taken.`
    },

    {
      id: 'wiki_em_004',
      title: 'Intoxicated / Aggressive Guest',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 3,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Intoxicated or Aggressive Guest

**Your safety comes first — do not confront alone.**

---

## Steps

- **Stay calm.** Do not argue, raise your voice, or challenge the guest.
- **Offer water** and calmly suggest they return to their room.
- **Keep a physical barrier** between you and the guest if they are aggressive.
- If the guest makes threats or becomes violent — **call 999 immediately.**
- Contact Duty Manager once the situation is contained.

## Escalation

- Stay calm → Offer to de-escalate → Duty Manager → Police if threatening.

---

**Log the incident** in the Night Log: time, room number, nature of behaviour, staff involved, outcome.`
    },

    {
      id: 'wiki_em_005',
      title: 'Guest Lockout',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 4,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Guest Lockout

**ALWAYS verify identity before issuing a replacement key.**

---

## Steps

- **Step 1** — Ask the guest to confirm their name and room number.
- **Step 2** — Check Opera to confirm they are registered to that room for tonight.
- **Step 3** — Ask for ID if there is any doubt (passport, driving licence, or booking confirmation).
- **Step 4** — Encode a new key at the front desk.
- **Step 5** — Note the time and room number in the Night Log.

---

**Never give a room key without verifying identity.** If a guest cannot confirm their details and has no ID, call the Duty Manager before proceeding.`
    },

    {
      id: 'wiki_em_006',
      title: 'Power Outage',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 5,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Power Outage

**Switch to manual procedures immediately.**

---

## Immediate Actions

- Emergency lighting will activate automatically. Check whether it is partial or full outage.
- Use torch from the front desk drawer.
- Patrol corridors to check on guests — reassure them.
- Switch to Downtime Report procedures for check-in and guest queries.

## Contacts

- Facilities/Engineering first.
- Duty Manager immediately.
- GM if widespread or prolonged.

---

**This is why the Downtime Report is printed at the start of every shift.** Without Opera access, that printout is your only record of in-house guests.`
    },

    {
      id: 'wiki_em_007',
      title: 'Police Attendance',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 6,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Police Attendance

**Be cooperative and professional. Do not obstruct.**

---

## Steps

- Be calm and cooperative.
- **Do not disclose guest information** (room numbers, identity, payment details) without a warrant or explicit management direction.
- Note the visit: time of arrival, officers' badge numbers, nature of visit.
- Contact the Duty Manager as soon as it is safe to do so.
- Log the incident in the Night Log before your shift ends.

---

**Guest data is protected.** If in doubt, say: *"I need to check with my manager before I can share that"* — then call the Duty Manager immediately.`
    },

    {
      id: 'wiki_em_008',
      title: 'Key Contacts',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 7,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Key Contacts

Essential numbers for the night shift. Update this page when contact details change.

---

## Emergency

- **Emergency services:** 999 (police, fire, ambulance)
- **Police non-urgent:** 101

## Hotel

- **Hotel main reception:** +44 (0) 1342 830930
- **Hotel address:** Racecourse Road, Lingfield, RH7 6PQ

## External Partners

- **Titan Airways (Hotac):** hotac@titan-airways.co.uk

## On-Call Management

- **Duty Manager / GM:** Check on-call rota by the front desk whiteboard.

---

*Update this page via the Content Editor if contact details change.*`
    },

    // ─────────────────────────────────────────────
    // CATEGORY 2 — Troubleshooting
    // ─────────────────────────────────────────────

    {
      id: 'wiki_ts_001',
      title: "Opera Won't Load — IE Mode Fix",
      category: 'Troubleshooting',
      categoryOrder: 2,
      pageOrder: 0,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Opera Won't Load — IE Mode Fix

**Most common issue on shift.** Opera requires Internet Explorer Compatibility Mode in Microsoft Edge.

---

## Steps

- **Step 1** — Open Opera in **Microsoft Edge** (not Chrome or Firefox).
- **Step 2** — Look for the IE Mode button in the Edge address bar (page icon with an 'e' badge). Click it.
- **Step 3** — If the button is not visible: Edge menu (⋯) → Settings → Default Browser → Internet Explorer compatibility → add the Opera URL.
- **Step 4** — Reload Opera — it should now function normally.

---

**Common symptom:** "Please log back into OPERA" message on a blue screen. This almost always means IE Mode was not active.

**If IE Mode is already on and Opera still won't load:** close all programs and restart the computer before audit time.`
    },

    {
      id: 'wiki_ts_002',
      title: 'Computer Running Slowly',
      category: 'Troubleshooting',
      categoryOrder: 2,
      pageOrder: 1,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Computer Running Slowly

**The computers do not have enough memory to cope with too many programs at once.**

---

## Steps

- **Step 1** — Close every program and browser tab you are not actively using.
- **Step 2** — Common culprits: multiple Excel files, email, and Opera all open simultaneously.
- **Step 3** — If still sluggish, restart the computer **before** the audit needs to run.
- **Step 4** — After restarting, open Opera first, enable IE Mode, then open anything else.

---

**Restart timing:** Do it with at least 20–30 minutes to spare before audit — allow time for Opera to fully load and IE Mode to be confirmed.`
    },

    {
      id: 'wiki_ts_003',
      title: "Audit Won't Run — Outstanding Balance",
      category: 'Troubleshooting',
      categoryOrder: 2,
      pageOrder: 2,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Audit Won't Run — Outstanding PM Balance

The Night Audit will block if any PM account has a non-zero balance.

---

## Steps

- **Step 1** — Run the **D130 report** filtered to *Checked Out* reservations only.
- **Step 2** — Look for a reservation with an outstanding balance that is **not** an Open Folio.
- **Step 3** — Reinstate the reservation in Opera.
- **Step 4** — Check it out correctly as an **Open Folio.**
- **Step 5** — Retry the Night Audit.

---

**If you cannot identify which PM is blocking:** go to Cashiering → Billing → untick Stay Overs → Room: 9 → Search, and verify every account shows 0.00.

**See also:** Pre-Audit → Rebates and Pre-Audit → Extend PM Accounts.`
    },

    {
      id: 'wiki_ts_004',
      title: 'Adobe Acrobat Error During Audit',
      category: 'Troubleshooting',
      categoryOrder: 2,
      pageOrder: 3,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Adobe Acrobat Error During Audit

**If an error occurs with Adobe Acrobat during the Night Audit process:**

---

## Steps

- **Step 1** — Do **not** re-run the full audit.
- **Step 2** — Go to **End of Day → End of Day Reports.**
- **Step 3** — Reprint any missing reports individually.
- **Step 4** — The audit itself will have completed — only the report printing was affected.

---

**Some reports will be missing if this occurs — you must reprint them.** Skipping them will mean incomplete audit paperwork for the night folder.`
    },

    {
      id: 'wiki_ts_005',
      title: 'Flight Cancellation Bookings',
      category: 'Troubleshooting',
      categoryOrder: 2,
      pageOrder: 4,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Sudden Flight Cancellation Bookings

**A flight cancellation can bring a large wave of bookings at short notice.**

---

## Steps

- **Step 1** — Check available rooms first. Only sell a maximum of 50% of available inventory.
- **Step 2** — Create a PM account using the Add-On method from the last flight cancellation booking.
- **Step 3** — Apply correct rates:
  - Weekdays: **£118 room + £15 breakfast**
  - Weekends: **£125 room + £15 breakfast**
- **Step 4** — Notify management so they can arrange additional Housekeeping and F&B staffing.
- **Step 5** — For **EasyJet cancellations:** add transaction code **BUP10** to the R118 Detailed breakfast report.

---

**For Titan Airways cancellations:** email hotac@titan-airways.co.uk if you need card details for guests.`
    },

    // ─────────────────────────────────────────────
    // CATEGORY 3 — Pre-Audit Procedures
    // ─────────────────────────────────────────────

    {
      id: 'wiki_pre_001',
      title: 'Handover',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 0,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Handover from the Evening Team

When you arrive, the team on site should brief you on the status of the hotel.

---

## The Seven Handover Points

- **Remaining arrivals** — How many guests are still expected? Have any been contacted?
- **Any problems** — Complaints, incidents, or issues needing follow-up overnight.
- **Anything special to expect** — VIP guests, group bookings, or unusual situations in house.
- **Any ongoing functions** — Events, parties, or conferences still in progress or winding down.
- **Wake-up calls** — Check Opera for any wake-up calls requested for tonight.
- **Breakfast bags** — Any early departures needing a breakfast bag prepared?
- **Off or on-site parties** — Racecourse events or hotel functions that may still be active.

---

**After handover:** update your Handover Notes in the Notes & Handover section so the day team receives a full written summary at your shift end.`
    },

    {
      id: 'wiki_pre_002',
      title: 'Floor Walk',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 1,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Floor Walk

**You will need your key card.**

Walk through all public areas on all floors.

---

## Steps

- Collect all rubbish, plates, and trays — take everything to the kitchen.
- Check all **exterior doors** and **balconies** are secured in corridors, Golf Bar, and meeting rooms.
- Turn off any lights in non-public areas and meeting rooms as you go around.

---

## Walk Schedule

- **11:30 PM** — First walk. All floors and public areas.
- **1:30 AM** — Second walk. Floor checks, corridors clear.
- **3:30 AM** — Third walk. Full floor and door checks, Spa area check.
- **4:00 AM** — Turn off pizza oven. Open hotel yard gates *(keys in the box by the door, around numbers 67–70).*

## Day-Specific Notes

- **Tuesday mornings:** Put out Puddleduck pool signs at 9:15 AM.
- **Wednesday mornings:** Put out Puddleduck pool signs at 11:30 AM.
- Fire alarm signs must be placed in lifts **and** on the glass door to the pool area.`
    },

    {
      id: 'wiki_pre_003',
      title: 'NAR 1 Report',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 2,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# NAR 1 Report

**You will need access to Email.**

---

## Steps

- **Step 1** — Open the NAR 1 email from the nights inbox. Check the attachments for errors or issues. If any are found — **correct them.**
- **Step 2 — Filing.** Save the report onto the **P Drive → Nights Folder → 6. NAR1.** Open the correct Year/Month folder and save.

---

**The NAR 1 is one of the first tasks after handover.** Errors in the NAR 1 report need to be resolved before the audit runs.`
    },

    {
      id: 'wiki_pre_004',
      title: 'Dockets',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 3,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Dockets

Dockets are what we call receipts. Once the bar is closed, check behind the bar for any loose dockets. Also check the last drawer next to the restaurant Podium.

---

## Sorting

Sort all dockets into three categories:

- **a.** Dockets with a card payment slip
- **b.** Dockets charged to a room — sort by room number *(except rooms 9000, 9001, 9066)*
- **c.** Everything else — sort by room number

---

## Filing

- File **a** directly into the nights folder.
- Keep **b** and **c** — you will need them to process the PM accounts during rebates.

---

**Also check:** the office desk for any dockets left by earlier shifts.`
    },

    {
      id: 'wiki_pre_005',
      title: 'Rebates',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 4,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Rebates

**You will need access to Opera.**

Rebates adjust PM account balances to zero before audit. PM balances that are not zero will block the Night Audit.

---

## Navigation

Cashiering → Billing → untick **Stay Overs** → Room: **9** → Search or press Enter.

You should see a list of 8 PMs. If any PM does **not** start with a * it needs to be **extended** (not checked out). See Pre-Audit → Extend PM Accounts.

---

## BRS Golf

- Double-click the account.
- Drag all lines from **window 1** to **window 2.**
- Note the PDQ figure in the balancing spreadsheet.
- Perform **Check-Out.**

## 9067 — Elite BF Vouchers

- Double-click the account.
- Perform **Checkout.**

## All Other PMs (where you have the docket)

Repeat for each PM:

- Double-click the account → click **Post.**
- Move the top window aside.
- Type **REB** into the Code column → press Tab.
- Select the matching manual account → click OK.
- Type in the correct amount → press Tab.
- Set the **Qty** column to **1** → press Tab 4 times.
- Set the **Supplement** column to the reason for the rebate.
- Press Tab.
- Set the column to the signer of the docket *(unless 9066).*
- Click **Post.**
- Repeat for all charge lines until balance becomes **0.00.**`
    },

    {
      id: 'wiki_pre_006',
      title: 'RevPar',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 5,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# RevPar

**You will need access to Opera and Marriott (via Island).**

**THIS MUST BE COMPLETED BEFORE MIDNIGHT OR AT THE VERY LEAST BEFORE THE AUDIT.** This adjusts how much we charge Marriott for members paying by points. **This affects our daily revenue.**

If you do not have access to MINT or MRDW, ask Yaas or Simon to send the Nights team the sheet (and request access on your behalf).

---

## Steps

- **Step 1** — Open the RevPar Spreadsheet: **P Drive → Night Team → 11. RevPar**
- **Step 2** — Open and sign in to **Island.**
- **Step 3** — In Island, find **MINT** (marriottintelligence.com).
- **Step 4** — Download the latest **Bonvoy spreadsheet (MBV-16).**
- **Step 5** — Open the downloaded spreadsheet and copy the data into the **MBV-16 tab** in the RevPar spreadsheet.
- **Step 6** — On the 2nd tab, change the date.
- **Step 7** — Note down the **Local Currency figure** under *Daily.*
- **Step 8** — Within Opera go to **In-House Guests.**
- **Step 9** — Click **Advanced.**
- **Step 10** — Search for market code **BMR.**
- **Step 11** — Update today's **Daily Details** for the rates of each BMR reservation. **Only today's!**`
    },

    {
      id: 'wiki_pre_007',
      title: 'D140 Report',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 6,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# D140 Report

**You will need access to Opera.**

---

## Steps

- **Step 1** — Miscellaneous → **Reports**
- **Step 2** — Type **D140** in the box → Search or press Enter.
- **Step 3** — Click **OK.**
- **Step 4** — Click the down arrow next to **Transaction Code.**
- **Step 5** — Click **All.**
- **Step 6** — Deselect any lines labelled **Deposit** or **VAT** → click OK.
- **Step 7** — Tick **Negative Postings Only.**
- **Step 8** — Click **Preview.**
- **Step 9 — Filing.** Save into the **D140 folder** within the Nights folder.`
    },

    {
      id: 'wiki_pre_008',
      title: 'A142 Report',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 7,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# A142 Report

**You will need access to Opera.**

This report catches any in-house room rates that do not match what they should be — including accidental rates of £999.

---

## Steps

- **Step 1** — Miscellaneous → **Reports**
- **Step 2** — Type **A142** in the box → Search or press Enter.
- **Step 3** — Click **OK.**
- **Step 4** — Tick **With a Variance Only.**
- **Step 5** — Click the down arrow next to **Reservation Status.**
- **Step 6** — Select **CHECKED IN** → click OK.
- **Step 7** — Click **Preview.**
- **Step 8** — If any rooms appear, review their room rate — it does **not** match what it should be.

---

**This report catches accidental rate errors,** particularly the £999 fallback rate. Any rooms appearing here must be investigated and corrected before audit.`
    },

    {
      id: 'wiki_pre_009',
      title: 'Extend PM Accounts',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 8,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Extend PM Accounts

**You will need access to Opera.**

Any PM account that does not start with * must be extended so it carries forward to the next business date correctly.

---

## Navigation

Cashiering → Billing → untick **Stay Overs** → Room: **9** → Search or press Enter.

---

## Steps

For each PM that does **not** start with *:

- **Step 1** — Double-click on the account.
- **Step 2** — Click **Options → Reservation.**
- **Step 3** — Either increase the number of nights, or change the departure date into the future.
- **Step 4** — Click **OK.**
- **Step 5** — Click **OK** on the fixed charge warning — then check there are no repeating fixed charges.
- **Step 6** — Close the Options and Billing screen. The account should have disappeared from the list.
- **Step 7** — Repeat as needed.`
    },

    {
      id: 'wiki_pre_010',
      title: 'Check Out PMs',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 9,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Check Out PMs

**You will need access to Opera.**

---

## Navigation

Cashiering → Billing → untick **Stay Overs**

---

## Steps

- **Step 1** — All PMs should now show **0.00** due. If any are not zero, go back and rebate or extend as appropriate.
- **Step 2** — Check out all PMs.

---

**Note on the 9000 series rooms:** PM accounts with ** in the name will all self-recreate so there is always one checked in. Do not be alarmed if the checkout takes a little longer for these accounts.`
    },

    {
      id: 'wiki_pre_011',
      title: 'Closing Your Cashier (D100)',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 10,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Closing Your Cashier / D100

**You will need access to Opera.**

---

## Step 1 — Print D100

Print a **D100 report** selecting **only** the following Transaction Codes:

- Cash (90000)
- Visa Card (90701)
- Master Card / Euro Card (90702)
- American Express (90703)
- Diners Club (90704)
- Maestro (90706)
- All the FD-PDQ codes
- Ecomm - Visa Card (94701)
- Ecomm - Master Card / Euro Card (94702)
- Ecomm - American Express (94703)

## Step 2 — FreedomPay Total

Get the **FreedomPay Total** from the card terminal portal.

## Step 3 — Sign and File

Staple the FreedomPay report to the D100 and **sign the D100.**

## Step 4 — Close Cashier

Cashiering → Cashier Shift Functions → **Cashier Shift Close** → follow the prompts.`
    },

    {
      id: 'wiki_pre_012',
      title: 'All Cashiers — Closing Your Shift',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 11,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# All Cashiers — Closing Your Shift

**This is important so that no-one else can use your cashier and so that the end-of-day runs correctly.**

The exception is the person running the audit — you will close your cashier during the end-of-day process.

---

## Steps

- **Step 1** — Click **Cashiering.**
- **Step 2** — Click **Cashier Shift Functions.**
- **Step 3** — Click **Cashier Shift Close.**
- **Step 4** — Follow the prompts. Only enter an amount if you actually took cash.
- **Step 5** — Only print the cashier reports if you took cash.
- **Step 6** — Cashier is now closed.

---

**If you need to reopen your cashier later** — you can, just remember to close it again before the audit.

If any cashiers have to be automatically closed by Opera, **report the cashier numbers to the FD Manager.**`
    },

    {
      id: 'wiki_pre_013',
      title: 'Arrivals Not Checked In',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 12,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Arrivals Not Checked In

**You will need access to Opera.**

As you are about to run the audit, check the arrivals screen for any remaining reservations.

---

## Rules

- **Unless they are mobile check-ins — DO NOT check them in** without payment.
- **Get payment if you can.** Pre-auth the card if the guest has not arrived yet.
- **If they are Booking.com and payment cannot be taken:** cancel the reservation.

---

## Important Step — Prevent Room Going to Pickup

- Open each unchecked reservation.
- **Move the room number into the comment field.**
- This prevents the room going to pickup (being unassigned) when the audit runs.

---

**Why this matters:** Checking in a guest just to clear the arrivals screen without securing payment is one of the most costly mistakes on nights. Once the guest is in the room, recovering that payment is significantly harder.`
    },

    // ─────────────────────────────────────────────
    // CATEGORY 4 — Audit Procedures
    // ─────────────────────────────────────────────

    {
      id: 'wiki_audit_001',
      title: 'Night Audit',
      category: 'Audit Procedures',
      categoryOrder: 4,
      pageOrder: 0,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Running the Night Audit

**You will need access to Opera.**

---

## Before You Start

Make sure **all night staff apart from the person running the audit** have closed their cashier. If any cashiers have to be automatically closed, report the cashier numbers to the FD Manager.

---

## Steps

- **Step 1** — Log in to Opera.
- **Step 2** — Click **End of Day.**
- **Step 3** — Click **Night Audit.**
- **Step 4** — Follow the prompts.

---

## If an Error Occurs with Adobe Acrobat

Do **not** re-run the audit. Instead:
- Go to **End of Day → End of Day Reports.**
- Reprint any missing reports individually.
- The audit itself will have completed — only the report printing was affected.

---

**See also:** Troubleshooting → Adobe Acrobat Error During Audit
**See also:** Troubleshooting → Audit Won't Run — Outstanding Balance`
    },

    // ─────────────────────────────────────────────
    // CATEGORY 5 — Post-Audit Procedures
    // ─────────────────────────────────────────────

    {
      id: 'wiki_post_001',
      title: 'Registration Cards',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 0,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Registration Cards

On the desk there are 3 drawers on each side. Each tray represents a floor.

---

## Steps

- **Step 1** — Collect all registration cards from the trays and sort by floor.
- **Step 2** — Staple the dockets for each room charge to that room's registration card.
- **Step 3** — For each floor, sort the registration cards into two piles:
  - **Pile 1:** Single-night rooms (checking out today).
  - **Pile 2:** Stayover rooms (remaining in house).
- **Step 4** — Open the box under the desk. Remove any registration cards for rooms that checked out in the morning — add to Pile 1.
- **Step 5** — File the stayover rooms from Pile 2 into the appropriate section of the box.
- **Step 6** — File Pile 1 into the back section of the box, replacing the contents — those go into the daily folder.
- **Step 7** — File all remaining piles into the Night Folder.`
    },

    {
      id: 'wiki_post_002',
      title: 'Breakfast Reports',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 1,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Breakfast Reports

Print the following from Opera:

---

- **R118** — 2 copies *(1 to podium, 1 to kitchen)*
- **R118 Detailed** with Transaction Codes: BUP15, BUP7.5, ASSOC, BUP10 *(change date to audit date only)*
- **D999**
- **A891** — Limit to Platinum and Platinum Premier
- **A150** — Tick groups as well
- **B202** — For last 4 days
- A copy of the **Daily Times**
- The **dinner reservation printout** from OpenTable *(to kitchen)*`
    },

    {
      id: 'wiki_post_003',
      title: 'D156 Report',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 2,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# D156 Report

**You will need access to Opera. This must be completed before the Hotel Flash and Early Bird.**

---

## Steps — Generating the Report

- **Step 1** — Miscellaneous → **Reports**
- **Step 2** — Type **d156** in the box → Search or press Enter.
- **Step 3** — Select **DELIMITED DATA** as the file format.
- **Step 4** — Click **OK.**
- **Step 5** — Click **File** in the window that appears.
- **Step 6** — Click **Open** in the save dialog.

---

## Steps — Copying the Data

- **Step 7** — Select from the start of **Line 2** to the end of the **PACKAGE** line. Copy what you have selected.
- **Step 8** — Navigate to: **P Drive → 3. Operations Team Folder → 14. Hotel → Financial Reporting → THIS YEAR → Recs.** Open this month's file.
- **Step 9** — Click in **column B** after the last used row. Paste what you copied.
- **Step 10** — Click in **column A** in the last cell with red writing. Scroll down to the bottom of what you pasted **WITHOUT** clicking into a cell or using the arrow keys.
- **Step 11** — Hold **Shift** and click on the Package row in column A. Press **Ctrl + D** on the keyboard. This fills column A with the red writing.
- **Step 12** — Save and close the spreadsheet.`
    },

    {
      id: 'wiki_post_004',
      title: 'Updating the Hotel Flash',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 3,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Updating the Hotel Flash

**File:** P Drive → 3. Operations Team Folder → 14. Hotel → Financial Reporting → THIS YEAR → Weekly Hotel Forecast → THIS MONTH

---

## Steps

- **Step 1** — Open the **Hotel Golf Leisure Flash…** file.
- **Step 2** — Click **Update** when prompted about external links.
- **Step 3** — Click **Continue** on the second dialog.
- **Step 4** — Fill out the fields using Report **E106:**
  - End of Day → End of Day Reports → Search → click **E106** → Preview.

---

## E106 Reference Table

| Hotel Flash Field | E106 Row |
| Rooms Sold | Rooms Occupied minus Comp and House Use |
| Comp / House | Complimentary Room + House Use Rooms |
| Sleepers | Total In-House Persons |
| OOO Rooms | Out Of Order Rooms |`
    },

    {
      id: 'wiki_post_005',
      title: 'Early Bird',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 4,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Early Bird

**You will need access to Opera. Make sure D156 and Hotel Flash have been completed first.**

---

## Steps — Tomorrow's File

- **Step 1** — Make a copy of the newest Early Bird file and rename it for tomorrow.
- **Step 2** — Open tomorrow's file. Update the **date** and the **expected revenue** to the current expected value found on **Shift + F3** in Opera.
- **Step 3** — Save and close.

---

## Steps — Today's File

- **Step 4** — Open today's file. Make sure to click **Update** when prompted.
- **Step 5** — Fill out today's **actual revenue** from the Audit Paperwork *(found on page 2 of the F116 report under "ROOM REVENUE"(previous night)).*
- **Step 6** — Fill out the **covers information** from the F&B covers sheet.
- **Step 7** — Fill out the **expected rooms, persons, and ARR** from Shift + F3 in Opera.

---

## Data Sources

| Early Bird Field | Source |
| Actual Revenue | F116 Report (page 2, Room Revenue previous night) |
| Room Sold / Comp / OOO | F116 Report rooms section |
| Expected rooms / persons / ARR | Opera: Shift + F3 |
| F&B covers | F&B Tally sheet |`
    },

    {
      id: 'wiki_post_006',
      title: 'Updating the One Yield',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 5,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Updating the One Yield

**You will need access to Opera.**

**File:** P Drive → 3. Operations Team Folder → 4. Front Office → 4. One Yield → THIS YEAR → One Yield Actual Upload Tool…

---

## Steps

- **Step 1** — Open the file.
- **Step 2** — Generate an **F100 report** in Opera for the date shown in the One Yield file.
- **Step 3** — Fill the columns with the information from F100:

---

## Column Reference

| One Yield Columns | F100 Source |
| 2 / 3 | Group totals (rooms & revenue) |
| 4 / 5 | Contract totals |
| 6 / 7 | Transient totals +/- INT |
| 8 / 9 | Overall totals minus Complimentary |

---

## Important Notes

- **Columns 8/9** are taken from the full totals at the bottom of F100, with the complementary market group totals subtracted.
- **Transient totals** must have the INT market group applied:
  - If INT is **positive** — add to Transient.
  - If INT is **negative** — subtract from Transient.`
    },

    {
      id: 'wiki_post_007',
      title: 'STR Report',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 6,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# STR Report

**You will need access to Opera and to the Internet.**

**Website:** https://central.str.com

*Login credentials are available from your manager — do not store passwords in this manual.*

---

## Steps

- **Step 1** — Go to https://central.str.com and log in with the credentials from your manager.
- **Step 2** — Navigate to **Manage → Compet Data.**
- **Step 3** — Click on the date you are filling out.
- **Step 4** — Fill out **total / transient / group / contract** the same way as the One Yield.
- **Step 5** — Get **F&B revenue** and **total revenue** from the **F116 report** in Opera.`
    },

    {
      id: 'wiki_post_008',
      title: 'Deposits',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 7,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Deposits

**You will need access to Opera.**

These steps show how to find bookings made today that require a deposit.

---

## Finding Deposit Reservations

- **Step 1** — Reservations → **Update Reservation.**
- **Step 2** — Clear the *Arrival From* box.
- **Step 3** — Click **Advanced.**
- **Step 4** — Fill in today's date into the **Created On** box → press Search.
- **Step 5** — Click **Rate Code** to sort, or search by market code **ADP.**
- **Step 6** — Check for rate codes starting **35**** and **38**** — these are prepaid and require a deposit.

---

## Processing a Deposit

- **a.** Check the rate is prepaid. Note down the total stay amount.
- **b.** Go to Options → **Deposit → Payment → OK.**
- **c.** Log into your cashier. Type **DEP** into the Code column → press Tab.
- **d.** Press OK to select *Deposit Revenue.*
- **e.** Input the total stay amount → click **Post → Close.**
- **f.** Untick *Print Folio* → click **OK.**

## If Successful

- Click Close twice.
- In the reservation: change **Res. Type** to 7.
- Drag the card from window 1 to window 6. Set window 1 and 6 to **5** and **0.00.**
- Change window 1 to **CA.**
- Update the comment to indicate 'pp' instead of 'own acc.'

## If the Deposit Fails

Close out the error box and all windows — back to the reservations list. Do not retry without investigating the card.`
    },

    {
      id: 'wiki_post_009',
      title: 'City Ledgers',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 8,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# City Ledgers

**You will need access to Opera and the MAYS inbox.**

**If you have not been trained to complete these — do not attempt.** This must be completed carefully and precisely. If in doubt about a departing room, check it out as Open Folio.

---

## What Are City Ledgers?

City Ledgers are accounts/businesses with a contract for regular rooms or to resell our rooms (e.g. Expedia, GolfBreaks). 90% of these rooms are charged to the company rather than to the guest.

Each night: check departures → find city ledger checkouts → check their backup → check them out if it matches → save folio and/or backup as appropriate.

---

## Due-Out Ledgers

Go through all Due-Out rooms in billing. Catch all city ledgers before the day team arrives. Check each out and re-instate — **but only if their backup matches where applicable.**

If backup is **not** available when it should be: send an email and ask the day team to check it out as Open Folio.

---

## A/R Ledgers

Review the list. Check all appropriate folios and backups have been saved and filed.

---

## Ledger Reference Table

| Ledger | Save Folio | Match Backup | Save Backup | Combine | Notes |
| Agiito | Yes | | | | Save voucher number into reservation |
| Agra Freeze | Yes | | | | |
| Ann Summers | Yes | | | | |
| Aqualisa | Yes | | | | |
| ARC | Yes | | | | |
| BRS Golf | | | | | Do nothing |
| Corporate Door Company | Yes | | | | |
| Crown Plaza | Yes | | | | |
| Expedia | Yes | | | | |
| Golf Holidays Direct | Yes | Yes | Yes | Yes | |
| Golfbreaks | Yes | Yes | Yes | Yes | |
| Inntel | Yes | Yes | Yes | | |
| Marc Roberts Motion Control | Yes | | | | |
| Marco Ltd | Yes | | | | Email Dinesh for payment |
| Marriott Reward Redemption | | | | | Do nothing |
| Merlin | Yes | Yes | Yes | Yes | |
| Rhopoint | Yes | Yes | | | |
| Venue | Yes | Yes | Yes | Yes | |
| Your Golf | Yes | Yes | Yes | Yes | |`
    },

    {
      id: 'wiki_post_010',
      title: 'Open Folios & Open PMs',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 9,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Open Folios & Open PMs

---

# Open PMs

**File:** P:\\3. OPERATIONS TEAM FOLDER\\4. FRONT OFFICE\\8. OPEN FOLIOS\\Open PMS - Master List New.xlsm

## Prep

Delete all table rows in **DATA_FROM_b130** and **DATA FROM A126** except for headers and the row below.

## Opera Steps

- Run report **b130** (delimited data). Tick *Stay Date*, untick *Booking Date*. Set *Room Class* to PSEU. Copy all lines starting PSEU from the exported file. Paste into the *DATA_FROM_b130* sheet overwriting the 2nd row.
- Run report **a126** (delimited data). Copy the lines below the ** PMs, excluding the LOGO line. Paste into the *DATA FROM A126* sheet overwriting the 2nd row.
- Go to the **OUTPUT** sheet → click **Refresh.**
- Save and close file.

---

# Open Folios

**File:** P:\\3. OPERATIONS TEAM FOLDER\\4. FRONT OFFICE\\8. OPEN FOLIOS\\Open Folios - Master List.xlsm

This is manually updated from Opera. **The Closed column must be 0 for current folios and 1 for closed folios.**

To get information from Opera: Cashiering → Billing → Advanced → tick **Open Folio only** → Search.

- Add rows as needed.
- Under the Data tab in Excel's ribbon, press **Reapply** to hide completed folios.
- Save and close file.

---

# Final File

- Find the latest file in: *P:\\3. OPERATIONS TEAM FOLDER\\4. FRONT OFFICE\\8. OPEN FOLIOS*
- Create a copy and rename it.
- Open the file and on the *Open Folios - NOT_BT* sheet, click the **Refresh** button.
- Save and close.

---

# Email

Within the nights inbox there is a contact list called **Open Folios Contacts.** Send the final file to that list. There should be a template for the email content. Subject: **Open Folio and Open PM update.**`
    },

    // ─────────────────────────────────────────────
    // CATEGORY 0 — Reference (additional pages)
    // ─────────────────────────────────────────────

    {
      id: 'wiki_ref_004',
      title: 'Common Mistakes to Avoid',
      category: 'Reference',
      categoryOrder: 0,
      pageOrder: 3,
      lastModified: '2026-07-05T00:00:00.000Z',
      content: `# Common Mistakes to Avoid

These are the most common errors made on nights. Knowing them is the fastest way to avoid them.

---

**1 — Forgetting to reprint the Downtime Report after audit**
The Downtime Report must be reprinted after audit completes. The pre-audit version is out of date. Always reprint it as your first post-audit task.

**2 — Running audit with open cashiers**
Any open cashier session blocks the audit. Confirm ALL staff cashiers are closed before you close yours and run End of Day.

**3 — Missing RevPar before midnight**
Once midnight passes, RevPar data for the previous day cannot be entered correctly. Set a reminder alarm for 11:30 PM if needed.

**4 — Filing registration cards incorrectly**
Reg cards are legal records. Mis-filing them means billing evidence is lost. Follow the Pile 1 / Pile 2 sorting process every night.

**5 — Forgetting to send the Open Folio email**
Finance and management rely on this email. Add it to your mental checklist as part of the post-audit email sequence.

**6 — Not checking PM balances are zero before audit**
Non-zero PMs will fail the audit. Always check all PMs show 0.00 before closing your own cashier.

**7 — Running Hotel Flash or Early Bird before D156**
D156 feeds data into both reports. Always follow the sequence: D156 → Hotel Flash → Early Bird.

**8 — Checking in arrivals without securing payment**
Once a guest is in their room, payment becomes very difficult to collect. Pre-auth or take a deposit before checking in. If neither is possible, use the No Show protocol.`
    },

    {
      id: 'wiki_ref_005',
      title: 'Marriott Bonvoy Elite Tiers',
      category: 'Reference',
      categoryOrder: 0,
      pageOrder: 4,
      lastModified: '2026-07-05T00:00:00.000Z',
      content: `# Marriott Bonvoy Elite Tiers

Always verify benefits per brand and property. Some are subject to availability. When in doubt, consult the morning manager.

---

## Member
No threshold. Earn points, mobile check-in, member rates.

## Silver Elite — 10 Nights/Year
- +10% bonus points
- Priority late checkout *(subject to availability — not guaranteed)*

## Gold Elite — 25 Nights/Year
- +25% bonus points
- 2 PM late checkout *(subject to availability)*
- Enhanced room upgrade *(excludes suites)*

## Platinum Elite — 50 Nights/Year
- +50% bonus points
- 4 PM late checkout (**guaranteed**, except at resort properties)
- Lounge access *(where available)*
- Suite upgrade *(subject to availability)*
- **Welcome Choice:** 1,000 bonus points or complimentary breakfast

## Titanium Elite — 75 Nights/Year
- All Platinum benefits at higher priority
- +75% bonus points
- 48-hour room type guarantee *(advance bookings)*
- Treat as top tier in all operational decisions

## Ambassador Elite — 100 Nights + $20K Spend/Year
- All Titanium benefits
- +100% bonus points
- Dedicated Ambassador personal travel manager
- **Your24™** — personalised 24-hour check-in/checkout window
- **Any service issue must be escalated to the Duty Manager immediately — do not improvise**

---

## Quick Reference

- **Member / Silver** — no guaranteed late checkout, no upgrade, no welcome choice
- **Gold** — 2 PM checkout (availability), enhanced upgrade (no suites)
- **Platinum** — 4 PM guaranteed, suites, lounge, welcome choice
- **Titanium** — all Platinum at higher priority, 48-hour type guarantee
- **Ambassador** — all Titanium + Your24™ + personal Ambassador`
    },

    // ─────────────────────────────────────────────
    // CATEGORY 6 — Operations
    // ─────────────────────────────────────────────

    {
      id: 'wiki_ops_001',
      title: 'Check-In Procedure',
      category: 'Operations',
      categoryOrder: 6,
      pageOrder: 0,
      lastModified: '2026-07-05T00:00:00.000Z',
      content: `# Check-In Procedure

Standard Opera PMS check-in flow for the night team.

---

## Step-by-Step Opera Check-In

- **Step 1 — Search the reservation.** Use Last Name or Confirmation Number. Always confirm the full name matches the guest's ID.
- **Step 2 — Verify reservation details.** Before clicking Check In, confirm: room type, rate code, payment method, routing instructions, and membership status.
- **Step 3 — Click Check In.** Proceed once all details are verified. Opera will prompt for room assignment if not pre-assigned.
- **Step 4 — Assign the room.** Respect elite upgrade entitlements — Gold and above may be entitled to an enhanced room. Titanium and Ambassador have highest priority for suite upgrades.
- **Step 5 — Create key cards.** Issue the correct number. Confirm room number with the guest before handing over.
- **Step 6 — Verify breakfast.** Check whether breakfast is included in the rate or selected as a Bonvoy welcome choice.
- **Step 7 — Car registration.** Ask and log if the property records vehicle registrations.
- **Step 8 — Thank the guest by name.** Close with a personalised greeting. Acknowledge their elite tier where applicable.

---

## Questions to Ask at Check-In

- "May I confirm your email address?"
- "Will you require breakfast during your stay?"
- "Do you have a vehicle with us tonight?"
- "Is this your first visit to Lingfield Park?"
- "Would you prefer points or breakfast this evening?" *(eligible Bonvoy elites only)*

---

## Elite Recognition

- **Acknowledge status** — thank Platinum, Titanium, and Ambassador members for their loyalty.
- **Deliver welcome choice** — Platinum and above are entitled to a welcome choice. Offer it; do not wait for them to ask.
- **Late checkout** — Gold and above may request late checkout. At night, advise they can confirm with the morning team. Log the request in Opera traces.
- **Ambassador guests** — escalate any issue immediately to the Duty Manager — do not improvise.

---

**Opera path:** Front Desk → Arrivals → Search → Verify → Check In → Room Assignment → Key Creation. Always save after each step and confirm the folio is clean before the guest leaves the desk.`
    },

    {
      id: 'wiki_ops_002',
      title: 'No Shows & Night Audit',
      category: 'Operations',
      categoryOrder: 6,
      pageOrder: 1,
      lastModified: '2026-07-05T00:00:00.000Z',
      content: `# No Shows & Night Audit

How to identify, confirm, and process no-show charges correctly — before and after Night Audit runs.

---

## Before Running Night Audit

- **Step 1** — Review all reservations due to arrive today. Identify any not checked in with no late arrival note.
- **Step 2** — Confirm the reservation holds a valid credit card. Do not charge an expired, unactivated, or virtual card without checking.
- **Step 3** — Check Opera notes and traces for any late arrival communication. If expected before 6 AM — do not mark as no-show yet.
- **Step 4** — Check Bonvoy status. Ambassador Elite guests require extra care — contact the on-call manager if uncertain.

---

## If Confirmed No Show — in Opera

- **Step 1** — Open the reservation.
- **Step 2** — Change the reservation status to **No Show.** Opera will prompt to confirm.
- **Step 3** — Review the rate code to confirm the booking is subject to a no-show charge under the applicable policy.
- **Step 4** — Save. Do not exit without saving.
- **Step 5** — Run Night Audit. The system will attempt to post the no-show charge automatically.

---

## After Night Audit

- **Step 1** — If not auto-posted, manually post the no-show transaction code. Verify the amount matches the policy.
- **Step 2** — Confirm the charge reflects the correct rate.
- **Step 3** — Confirm routing — guest card, OTA virtual card, or company account as appropriate.
- **Step 4** — Add a trace note: *"Guest did not arrive. No contact received. Charged as per policy."* Include your name and time.

---

## When NOT to Charge No Show

- **Booking.com** — virtual cards have an activation date. Verify before posting. If not yet active, flag for the revenue team.
- **Expedia Collect** — Expedia charges the guest directly. Do not charge independently.
- **Corporate/Company** — refer to the revenue or reservations team. The company account must be invoiced correctly.
- **Golfbreaks / YourGolf** — prepaid third-party packages. Do not charge; leave a trace and escalate.
- **House Use / Management** — never charge for no-shows on internal reservations.

---

**Financial risk:** Incorrect no-show posting creates disputes and chargebacks. When in doubt, do not charge — leave a trace and escalate to the morning manager.`
    },

    {
      id: 'wiki_ops_003',
      title: 'Routing & Billing Guide',
      category: 'Operations',
      categoryOrder: 6,
      pageOrder: 2,
      lastModified: '2026-07-05T00:00:00.000Z',
      content: `# Routing & Billing Guide

How to verify and manage billing routing for OTA bookings, corporate accounts, golf packages, and Merlin reservations.

---

## Booking.com

- Room and tax charges route to the **virtual card only.**
- Always verify the **virtual card activation date** before charging. An unactivated card will decline.
- Extras (restaurant, spa, incidentals) route to the **guest's own card** unless the booking specifies otherwise.
- **Never charge extras to the Booking.com virtual card** — it will be declined or create a dispute.

---

## Expedia

- **Expedia Collect** — Expedia charges the guest and pays the hotel. Do not charge room on arrival.
- **Hotel Collect** — Hotel charges the guest directly. Room and tax go to the guest's card.
- Check routing instructions in the Opera reservation. Do not assume — read them.
- Extras always route to the guest unless specifically noted.

---

## Corporate / Company Accounts

- Verify the company holds an active City Ledger account. If on hold, route to a guest card and flag for the morning team.
- Confirm the company account code matches the reservation routing — do not manually enter without confirming.
- Standard split: **Room & Tax → Company Account** | **Extras → Guest Card**
- If routing is incorrect, Night Audit balance will fail. Resolve or escalate before running audit.

---

## Golfbreaks & YourGolf

- Typically **fully prepaid** — do not charge the guest's card for room and tax unless Opera routing explicitly directs you to.
- Verify package inclusions: dinner, breakfast, golf, and whether extras go to the guest.
- Read every reservation note before making any charge.
- Some charges go to a master account held by the tour operator — confirm whether a master folio exists.

---

## Merlin Bookings

- Verify the internal Merlin reservation code is correctly recorded in Opera.
- Determine whether the reservation routes to a house account or has a separate billing instruction.
- **If billing instructions are missing or unclear — do not apply standard routing.** Leave a trace note and escalate to the morning team or duty manager.`
    },

  ]
};
