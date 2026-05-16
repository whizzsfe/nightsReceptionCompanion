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

window.HOTELCOMPANION_WIKI = {
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
      content: `# The Eight Non-Negotiables

These rules exist to protect the hotel, the guests, and you. They are not suggestions.

---

**Rule 1 — Never run audit with unresolved PM balances**
PM balances that are not zero will block the audit. The business day cannot close with outstanding internal charges — revenue remains unreconciled for that date.

**Rule 2 — Never check in arrivals just to clear the screen**
Checking in a guest without securing payment means the hotel carries the debt. Once a guest is in their room, recovering that payment becomes significantly harder.

**Rule 3 — Always verify backup before city ledger checkout**
City ledger companies are billed based on the folio you submit. Checking out without matching backup means billing without proof — which leads to payment disputes.

**Rule 4 — RevPar MUST be completed before midnight**
Marriott systems use the business date to calculate RevPar metrics. After midnight the date rolls forward and the previous day's data cannot be corrected.

**Rule 5 — If unsure about a ledger, leave as Open Folio**
An Open Folio is always safer than a wrong checkout. The day team can investigate and action it properly.

**Rule 6 — Always communicate issues to the day team**
Night shifts operate in isolation. Anything unresolved must be handed over. What you know and don't pass on becomes someone else's problem at 7 AM.

**Rule 7 — Guest safety always comes before admin work**
No report, no audit, no checklist item is more important than the safety of a guest or staff member. If an emergency arises, the paperwork waits.

**Rule 8 — D156 must always be run before Hotel Flash and Early Bird**
D156 contains the source data for both subsequent reports. Running them out of order means incorrect figures — which misrepresents the hotel's daily financial performance.`
    },

    {
      id: 'wiki_ref_002',
      title: 'Glossary',
      category: 'Reference',
      categoryOrder: 0,
      pageOrder: 1,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Glossary of Terms

Key terms used in the night operations manual and on-screen in Opera.

---

**A/R Ledger**
Accounts Receivable ledger — a record of money owed to the hotel by companies or clients.

**ARR**
Average Room Rate — the average price of rooms sold on a given night.

**Backup**
Supporting documentation (e.g. from Expedia or Golfbreaks) that must match the folio before a city ledger checkout can be processed.

**B130**
Opera report used for generating PM account data for the Open PMs spreadsheet.

**BRS Golf**
Internal PM account (Room 9030) used for Golf Breaks revenue routing.

**Business Date**
The current date in Opera's system. Night Audit advances the business date to the next day. Tasks like RevPar must be done before this rolls over at midnight.

**City Ledger**
A company or organisation with a direct billing contract with the hotel. Charges go to the company's account, not the guest.

**D100**
Financial report showing all payment transactions for the shift. Matched against FreedomPay to verify card terminal totals.

**D130**
Checked-out reservation report. Used to find reservations with outstanding balances blocking the audit.

**D140**
Report showing negative postings — used to identify refunds or adjustments made during the shift.

**D156**
Financial reconciliation export. Must be run before Hotel Flash and Early Bird. Feeds financial data into both downstream reports.

**D999**
Breakfast report printed for the morning F&B team.

**Downtime Report**
A printout of all in-house reservations used if Opera goes offline. Must be printed at start of shift and reprinted after audit.

**Due Out**
A guest who is departing today (checking out on the current business date).

**E106**
End-of-day Opera report containing daily room statistics used to complete the Hotel Flash.

**End of Day**
The Opera process that runs the Night Audit, closes the business date, and generates end-of-day financial reports.

**F100**
One Yield report attached to the daily email sent to Michelle Boden.

**F116**
Opera financial report containing room revenue figures used in the Early Bird and STR reports.

**Folio**
A guest's billing account in Opera. Shows all charges, payments, and the current balance.

**FreedomPay**
The PDQ/card terminal payment portal. Used to get the batch total matched against the D100 before audit.

**Hotel Flash**
Daily summary spreadsheet showing rooms sold, occupancy, and revenue. Completed post-audit and filed on the P Drive.

**IE Mode**
Internet Explorer Compatibility Mode in Microsoft Edge. Required for Opera to function. Most common cause of Opera issues when it won't load.

**Island**
The Marriott platform used to access MINT/MRDW data for RevPar.

**MBV-16**
Marriott data file downloaded from Island and used to update the RevPar spreadsheet.

**MINT / MRDW**
Marriott's internal data warehouse used for RevPar tracking and revenue benchmarking.

**No Show**
A guest with a reservation who never arrives. Handled during Night Audit as a special process.

**One Yield**
Marriott's revenue reporting tool. Night team completes the daily Actual Upload with room and revenue data. Results emailed to Michelle Boden.

**Open Folio**
A guest account not fully settled at checkout. Tracked daily and emailed to the relevant teams.

**Opera**
The hotel's Property Management System (PMS). Used for reservations, billing, reports, and audit. Must be run in IE Mode in Microsoft Edge.

**PDQ**
The card payment terminal used at the front desk.

**PM Account**
A pseudo-room account used for internal hotel postings (e.g. BRS Golf, rebates). Must be at 0.00 or extended before audit.

**Posting**
Adding a charge or payment to a guest or PM account in Opera.

**Pre-Auth**
Pre-authorisation — placing a hold on a guest's card to verify funds without charging immediately.

**R118**
Breakfast report printed for the morning team showing guests with breakfast included.

**Rebate**
A credit applied to a guest's or PM account to reduce or zero the balance. Common for routing charges correctly overnight.

**Registration Card**
The physical document a guest signs at check-in confirming their details and payment method. Legal record.

**Reinstate**
Reversing a checkout in Opera to bring a reservation back to checked-in status. Used when a checkout needs to be corrected.

**RevPar**
Revenue Per Available Room — a key hotel performance metric. Must be updated before midnight each night from Marriott data.

**Routing**
Directing charges from a guest's room folio to another account (e.g. to a city ledger or PM account).

**Stayover**
A guest who is remaining at the hotel for at least one more night (not checking out today).

**STR**
Smith Travel Research — a global hotel benchmarking platform. Night team submits daily room and revenue data at str.com.

**Transaction Code**
A code in Opera identifying the type of charge or payment (e.g. 90701 = Visa, 90000 = Cash, BUP15 = breakfast package).`
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
      content: `# Fire Alarm 🔥

**CRITICAL — Call 999 if unsure. Do not assume false alarm.**

---

## Immediate Actions

- Follow fire evacuation. Assist guests to nearest exit.
- **Do not use lifts.** Use stairwells only.
- Assembly point: hotel car park / designated assembly point.
- Do not re-enter the building until all-clear from fire service.

## Escalation Order

- Evacuate → Call 999 → Contact Duty Manager → Contact GM if required.

---

**Note:** Even if you believe it is a false alarm, always treat the alarm as real until the fire service confirms otherwise. Your safety and the safety of guests is the absolute priority.`
    },

    {
      id: 'wiki_em_002',
      title: 'Medical Emergency',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 1,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Guest Medical Emergency 🏥

**CRITICAL — Call 999 immediately.**

---

## Immediate Actions

- Call **999** — give hotel address, nature of emergency, your name.
- Check whiteboard for the on-duty First Aider.
- Defibrillator (AED) — check staff area for location.
- Stay with the guest until paramedics arrive if it is safe to do so.

## Escalation Order

- Call 999 → First Aider → Duty Manager → Document incident in Night Log.

---

**After the incident:** Log a full entry in the Night Log and include in your handover notes. The day team and management will need this information.`
    },

    {
      id: 'wiki_em_003',
      title: 'Noise Complaint',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 2,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Noise Complaint 🔊

**Priority:** Resolve calmly and quickly — log everything.

---

## Steps

- **Step 1** — Call the room causing noise. Politely ask them to keep it down.
- **Step 2** — If the phone call does not resolve it, visit the room in person. Stay professional and calm.
- **Step 3** — If noise continues, inform them clearly that a second complaint may result in a police call.
- **Step 4** — For large parties, be prepared to call 999 if required.

## Escalation Order

- Phone call → In-person visit → Duty Manager → Police if needed.

---

**Always log noise complaints in the Night Log,** including the time, room number, nature of the complaint, and action taken. If the issue escalates, the log is evidence.`
    },

    {
      id: 'wiki_em_004',
      title: 'Intoxicated / Aggressive Guest',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 3,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Intoxicated or Aggressive Guest 🚫

**Your safety comes first — do not confront alone.**

---

## Steps

- **Stay calm.** Do not argue, raise your voice, or challenge the guest.
- **Offer water** and calmly suggest they return to their room.
- **Keep a physical barrier** between you and the guest if they are aggressive.
- If the guest makes threats or becomes violent — **call 999 immediately.**
- Contact Duty Manager once the situation is contained or if you need backup.

## Escalation Order

- Stay calm → Offer to de-escalate → Duty Manager → Police if threatening.

---

**Log the incident** in the Night Log: time, room number (if known), nature of behaviour, staff involved, and outcome. This protects you and the hotel.`
    },

    {
      id: 'wiki_em_005',
      title: 'Guest Lockout',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 4,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Guest Lockout 🔑

**ALWAYS verify identity before issuing a replacement key.**

---

## Steps

- **Step 1** — Ask the guest to confirm their name and room number.
- **Step 2** — Check Opera to confirm they are registered to that room for tonight.
- **Step 3** — Ask for ID if there is any doubt (passport, driving licence, or booking confirmation).
- **Step 4** — Encode a new key at the front desk.
- **Step 5** — Note the time and room number in the Night Log.

---

**Never give a room key without verifying identity.** If a guest cannot confirm their details and has no ID, call the Duty Manager before proceeding. The safety of other guests in the room takes priority.`
    },

    {
      id: 'wiki_em_006',
      title: 'Power Outage',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 5,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Power Outage ⚡

**CRITICAL — Switch to manual procedures immediately.**

---

## Immediate Actions

- Emergency lighting will activate automatically. Check whether it is a partial or full outage.
- Use torch from the front desk drawer.
- Patrol corridors to check on guests — reassure them.
- Switch to manual Downtime Report procedures for check-in / guest queries until power is restored.

## Contacts

- Contact Facilities/Engineering first.
- Contact Duty Manager immediately.
- If widespread or prolonged, notify GM.

## Escalation Order

- Emergency lighting → Duty Manager → Facilities/Engineering → Manual procedures → GM if prolonged.

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
      content: `# Police Attendance 🚓

**Be cooperative and professional. Do not obstruct.**

---

## Steps

- **Be calm and cooperative** — police are there to do their job.
- **Do not disclose guest information** (room numbers, identity, payment details) without a warrant or explicit management direction.
- **Note the visit:** time of arrival, officers' badge numbers if provided, nature of their visit.
- **Contact the Duty Manager** as soon as it is safe to do so.
- **Log the incident** in the Night Log before your shift ends.

---

**Rule:** Guest data is protected. You are not obligated to share it without a formal warrant or management instruction. If in doubt, say "I need to check with my manager before I can share that" and call the Duty Manager immediately.`
    },

    {
      id: 'wiki_em_008',
      title: 'Opera System Crash',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 7,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Opera System Crash 💻

**First action: use the Downtime Report — this is why it is printed at shift start.**

---

## Steps

- **Step 1** — Check that IE Mode is enabled in Microsoft Edge. This resolves the majority of Opera issues.
- **Step 2** — If IE Mode is on and Opera still will not load, try a full browser restart.
- **Step 3** — For check-ins during downtime: use blank registration cards and record room numbers manually.
- **Step 4** — Contact IT support if Opera remains fully unresponsive.
- **Step 5** — Notify Duty Manager and log the outage time in the Night Log.

## Escalation Order

- Check IE Mode → Browser restart → Use Downtime Report → Duty Manager → IT Support.

---

**See also:** Troubleshooting → IE Mode Fix for step-by-step IE Mode instructions.`
    },

    {
      id: 'wiki_em_009',
      title: 'Key Contacts',
      category: 'Emergency & Safety',
      categoryOrder: 1,
      pageOrder: 8,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Key Contacts

Essential numbers for the night shift. Update this page when contact details change.

---

## Emergency

- **Emergency services:** 999 (police, fire, ambulance)
- **Police non-urgent:** 101

## Hotel

- **Hotel main reception:** +44 (0) 1342 830930

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
      title: 'Opera: IE Mode Fix',
      category: 'Troubleshooting',
      categoryOrder: 2,
      pageOrder: 0,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Opera Won't Load — IE Mode Fix 🌐

**Most common issue on shift.** Opera requires Internet Explorer (IE) Compatibility Mode in Microsoft Edge.

---

## Steps

- **Step 1** — Open Opera in **Microsoft Edge** (not Chrome or Firefox).
- **Step 2** — Click the three-dot menu (⋯) in the top-right corner → *Settings* → *Default Browser* → *Internet Explorer compatibility.*
- **Step 3** — Or: press **F12** in Edge to open Developer Tools → *Emulation* tab → *Document Mode* → select IE11.
- **Step 4** — Alternatively, find the IE Mode toggle in the Edge address bar (page icon with an 'e' badge).
- **Step 5** — Reload Opera — it should now function normally.

---

**If IE Mode is already enabled and Opera still won't load:** try a full computer restart before the audit. Close all other programs first to free up memory.

**See also:** Troubleshooting → System Performance.`
    },

    {
      id: 'wiki_ts_002',
      title: 'System Running Slowly',
      category: 'Troubleshooting',
      categoryOrder: 2,
      pageOrder: 1,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Computer Running Slowly 💾

**A slow system before audit is a common issue.** Act early — do not wait until audit time.

---

## Steps

- **Step 1** — Close every program and browser tab you are not actively using.
- **Step 2** — Common culprits: multiple Excel files, email client, and Opera all open at once.
- **Step 3** — If the computer is still sluggish, restart it **before** the audit needs to run.
- **Step 4** — After restarting, open Opera first and re-enable IE Mode before opening anything else.

---

**Restart timing:** If you need to restart, do it with at least 20–30 minutes before the audit is scheduled — allow time for Opera to fully load and IE Mode to be confirmed.`
    },

    {
      id: 'wiki_ts_003',
      title: 'Audit Won\'t Run — Outstanding Balance',
      category: 'Troubleshooting',
      categoryOrder: 2,
      pageOrder: 2,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Audit Won't Run — Outstanding PM Balance ⚙

**The Night Audit will block if any PM account has a non-zero balance.**

---

## Steps

- **Step 1** — Run the **D130 report** filtered to *Checked Out* reservations only.
- **Step 2** — Find the reservation with an outstanding balance that is **not** listed as an Open Folio.
- **Step 3** — Reinstate the reservation in Opera.
- **Step 4** — Check it out correctly as an **Open Folio**.
- **Step 5** — Retry the Night Audit.

---

**If you cannot identify which PM is causing the block:** go back through the PM list (Cashiering → Billing → untick Stay Overs → Room: 9 → Search) and verify every account shows 0.00.

**See also:** Pre-Audit Procedures → Rebates and → Extend PM Accounts.`
    },

    {
      id: 'wiki_ts_004',
      title: 'Flight Cancellation Bookings',
      category: 'Troubleshooting',
      categoryOrder: 2,
      pageOrder: 3,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Sudden Flight Cancellation Bookings ✈

**A flight cancellation can bring a large wave of bookings at short notice.**

---

## Steps

- **Step 1** — Check available rooms **first.** Only sell a maximum of 50% of available inventory to retain flexibility.
- **Step 2** — Create a PM account using Add-On from the last flight cancellation booking.
- **Step 3** — Apply correct rates:
  - Weekdays: **£118 room + £15 breakfast**
  - Weekends: **£125 room + £15 breakfast**
- **Step 4** — Notify management so they can arrange additional Housekeeping and F&B staffing.
- **Step 5** — For **EasyJet cancellations:** add transaction code **BUP10** to the R118 Detailed breakfast report.

---

**For Titan Airways cancellations:** email hotac@titan-airways.co.uk if you need card details for guests. Guests are often pre-booked through Titan — check the booking notes before processing payment manually.`
    },

    {
      id: 'wiki_ts_005',
      title: 'Guest Not Checked In After 12:30 AM',
      category: 'Troubleshooting',
      categoryOrder: 2,
      pageOrder: 4,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Guest Not Checked In After 12:30 AM 🚪

**Do not check in a guest without securing payment — even late at night.**

---

## Options

- **Option 1** — Pre-authorise the guest's card and check them in. Keep the registration card and keys at the desk.
- **Option 2** — Take a deposit by phone if the guest can be reached and is willing.
- **Option 3** — If both options fail: run the reservation as a **No Show** during the audit. Notify management. If it is a Titan Airways booking, email hotac@titan-airways.co.uk for card details.

---

**Important:** Checking in a guest without securing payment just to clear the arrivals screen is a Golden Rule violation. The hotel carries the risk once the guest is in the room.`
    },

    // ─────────────────────────────────────────────
    // CATEGORY 3 — Pre-Audit Procedures
    // ─────────────────────────────────────────────

    {
      id: 'wiki_pre_001',
      title: 'Handover from Evening Team',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 0,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Shift Handover from Evening Team ↬

**A thorough handover sets up your entire shift. Missing information here becomes a problem at 3 AM.**

---

## The Seven Handover Points

- **1. Remaining Arrivals** — How many guests are still expected tonight? Any late arrivals already contacted?
- **2. Any Problems** — Complaints, incidents, or issues that need follow-up.
- **3. Special Expectations** — VIP guests, group bookings, or anything unusual in house.
- **4. Ongoing Functions** — Any events, parties, or functions still in progress or winding down.
- **5. Wake-Up Calls** — Check Opera for any requested wake-up calls that night.
- **6. Breakfast Bags** — Any early departures needing a breakfast bag prepared?
- **7. Off/On-Site Parties** — Racecourse events or hotel functions that may still be active.

---

**After handover:** Update your Handover Notes in the Notes & Handover section so the day team receives a full written summary at your shift end.`
    },

    {
      id: 'wiki_pre_002',
      title: 'Floor Walks',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 1,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Floor Walks — Three per Shift ⟳

**Floor walks are the primary security measure while the hotel is asleep.**

---

## Walk Schedule

- **11:30 PM** — First walk. All floors, all public areas.
- **1:30 AM** — Second walk. Floor check — all clear, nothing left in corridors.
- **3:30 AM** — Third walk. Full floor checks, all door checks, Spa area check.
- **4:00 AM** — Turn off pizza oven. Open hotel yard gates (keys in box by door, around numbers 67–70).

---

## What to Check on Each Walk

- Collect rubbish, plates, and trays from all corridor floors.
- Check all exterior doors, balcony doors, and conference rooms are **secured.**
- Turn off lights in non-public areas and meeting rooms.
- Check the Golf Bar is closed and clear.

---

## Day-Specific Notes

- **Tuesday mornings:** Put out Puddleduck pool signs at 9:15 AM.
- **Wednesday mornings:** Put out Puddleduck pool signs at 11:30 AM.
- Fire alarm signs must be placed in lifts **AND** on the glass door to the pool area.

---

**You need a key card to access all floors.** Unsecured doors, lockouts, corridor hazards, and early incidents are all caught during floor walks — not at the desk.`
    },

    {
      id: 'wiki_pre_003',
      title: 'Rebates',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 2,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Processing Rebates $

**Rebates adjust PM account balances to zero before audit. If PM balances are not zero, the audit cannot run.**

---

## Navigation

Cashiering → Billing → untick **Stay Overs** → Room: **9** → Search

---

## BRS Golf (Room 9030)

- Double-click the account.
- Drag all lines from **window 1** to **window 2.**
- Note the PDQ figure in the balancing spreadsheet.
- Perform **Check-Out.**

## 9067 — Elite BF Vouchers

- Double-click the account.
- Make sure amount is in window 2 and CL is on top.
- Perform **Checkout.**

## All Other PMs with Dockets

- Double-click the PM account.
- Go to window 2 → **Postings → Rebate.**
- Select the correct transaction code.
- Post the amount from the docket.
- Verify the balance shows **zero.**
- Perform **Checkout.**

---

**Important:** If a PM does *not* start with * — do **NOT** checkout. These accounts need to be **Extended** instead. See Pre-Audit Procedures → Extend PM Accounts.`
    },

    {
      id: 'wiki_pre_004',
      title: 'Extend PM Accounts',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 3,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Extend PM Accounts ⟳

**PM accounts not extended before audit will auto-checkout. If they have balances, this causes audit failures.**

---

## Navigation

Cashiering → Billing → untick **Stay Overs** → Room: **9** → Search

---

## Steps

- **Step 1** — From the PM list, find any accounts that do **NOT** start with *.
  *(Accounts starting with * should be checked out via Rebates, not extended.)*
- **Step 2** — Double-click the PM account to open it.
- **Step 3** — Options → **Reservation** → extend the number of nights or change the departure date.
- **Step 4** — Click **OK** → click **OK** on the fixed charge warning.
- **Step 5** — The account should disappear from the list — this confirms it has been extended correctly.

---

**Extending ensures the PM account carries forward correctly to the next business date,** so it can be dealt with by the day team without causing an audit failure.`
    },

    {
      id: 'wiki_pre_005',
      title: 'Registration Cards',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 4,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Sorting Registration Cards 📋

**Registration cards are legal documents — the record of a guest's stay and payment agreement. Mis-filing causes billing disputes.**

---

## Steps

- **Step 1** — Collect reg cards from drawers. There are 3 drawers on each side of the desk — one per floor.
- **Step 2** — Match room-charge dockets to their corresponding reg cards and staple them together.
- **Step 3** — Sort into two piles:
  - **Pile 1** — Single night guests / due-outs (checking out today).
  - **Pile 2** — Stayovers (remaining at least one more night).
- **Step 4** — File Pile 2 stayovers back into the correct floor drawer.
- **Step 5** — File Pile 1 into the back section. Move old contents to the daily folder. Remainder into the Night Folder.`
    },

    {
      id: 'wiki_pre_006',
      title: 'RevPar — BEFORE MIDNIGHT',
      category: 'Pre-Audit Procedures',
      categoryOrder: 3,
      pageOrder: 5,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# RevPar Update ◈ — MUST Be Done Before Midnight

**RevPar must be completed before midnight. Marriott systems calculate daily revenue based on the business date. Missing the cutoff cannot be corrected.**

---

## Navigation

P Drive → Nights → 11. RevPar

---

## Steps

- **Step 1** — Open the current RevPar spreadsheet from the P Drive.
- **Step 2** — Sign in to **Island** (the Marriott data platform).
- **Step 3** — Locate **MINT/MRDW** in Island and download the **MBV-16** report.
- **Step 4** — Paste the downloaded MBV-16 data into the RevPar spreadsheet as directed.
- **Step 5** — Update the Opera in-house guest count using **Market code BMR.**

---

**Do this as early in the shift as possible** — before you get pulled into other tasks. Missing the midnight cutoff affects revenue reporting and member billing for that date.`
    },

    // ─────────────────────────────────────────────
    // CATEGORY 4 — Audit Procedures
    // ─────────────────────────────────────────────

    {
      id: 'wiki_aud_001',
      title: 'Arrivals Not Checked In',
      category: 'Audit Procedures',
      categoryOrder: 4,
      pageOrder: 0,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Handling Arrivals Not Checked In 🚶

**Golden Rule: do NOT check in arrivals just to clear the screen.**

---

## Steps

- **Step 1** — Open the Arrivals screen in Opera.
- **Step 2** — **Marriott app mobile check-ins** can proceed as normal — these are pre-authorised.
- **Step 3** — For all other unchecked arrivals: move the room number to the **comment field** to prevent automatic pickup during the audit.
- **Step 4** — Attempt to contact the guest or pre-authorise their card if possible.
- **Step 5** — If unreachable and no guarantee is in place, see Troubleshooting → Guest Not Checked In After 12:30 AM.

---

**Checking in a guest without securing payment just to clear the screen is a Golden Rule violation.** Once a guest is in their room, recovering the debt becomes significantly harder.`
    },

    {
      id: 'wiki_aud_002',
      title: 'Close Cashier',
      category: 'Audit Procedures',
      categoryOrder: 4,
      pageOrder: 1,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Close Cashier — All Staff 🔒

**The Night Audit cannot run with any open cashier sessions.**

---

## Navigation

Cashiering → Cashier Shift Functions → **Cashier Shift Close**

---

## Order of Operations

- **All staff** (except the person running the audit) must close their cashier **first.**
- Only enter a cash amount if you physically took cash during your shift.
- The person running the audit closes their own cashier as the **very last step** before running End of Day.

---

**Why this order matters:** The audit checks that all cashier sessions are balanced before it will run. If any session is still open, the audit will block. The audit runner closes last so their session captures the final cashier balance for the shift.`
    },

    {
      id: 'wiki_aud_003',
      title: 'Check Out PM Accounts',
      category: 'Audit Procedures',
      categoryOrder: 4,
      pageOrder: 2,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Check Out PM Accounts ✓

**Every PM must show exactly 0.00 before the audit — no exceptions.**

---

## Steps

- **Step 1** — Go through each PM account. All must show **0.00** due.
- **Step 2** — If any PM is not at zero: rebate the outstanding amount or extend the PM first.
- **Step 3** — Do not proceed with the audit until all PMs show 0.00.

---

## Note on 9000 Series Rooms

9000 series ** rooms will **self-recreate** after checkout. This is normal and expected — do not be alarmed when they reappear in the list after you check them out.

---

**PM accounts represent internal charges.** A balance at audit time means unreconciled revenue — which blocks the audit and leaves money unaccounted for in the day's records.

**See also:** Pre-Audit Procedures → Rebates and → Extend PM Accounts.`
    },

    {
      id: 'wiki_aud_004',
      title: 'D100 Report',
      category: 'Audit Procedures',
      categoryOrder: 4,
      pageOrder: 3,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# D100 Report ◻

**The D100 shows all payment transactions for the shift. It must match the FreedomPay batch total.**

---

## Transaction Codes to Include

Select **all** of the following:
- Cash: **90000**
- Visa: **90701**
- Mastercard: **90702**
- Amex: **90703**
- Diners: **90704**
- Maestro: **90706**
- All **FD-PDQ** codes
- Ecomm Visa: **94701**
- Ecomm Mastercard: **94702**
- Ecomm Amex: **94703**

---

## Steps

- **Step 1** — Run D100 with all the transaction codes above selected.
- **Step 2** — Open **FreedomPay Portal** → Batch → Batching → select the audit date → note the batch total.
- **Step 3** — Staple the FreedomPay printout to the D100.
- **Step 4** — **Sign the D100.**

---

The D100 is matched against FreedomPay to verify that Opera's records match what was physically taken at the PDQ machines.`
    },

    {
      id: 'wiki_aud_005',
      title: 'Night Audit / End of Day',
      category: 'Audit Procedures',
      categoryOrder: 4,
      pageOrder: 4,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Night Audit — End of Day ⚙

**Night Audit closes the business date in Opera. Once it runs, the previous day's revenue is locked.**

---

## Pre-Audit Confirmation Checklist

Before running End of Day, confirm all of the following:
- ✓ All cashiers closed (except yours)
- ✓ All PMs at 0.00
- ✓ D100 printed and signed
- ✓ FreedomPay total stapled to D100
- ✓ All arrivals handled / moved to comment field

---

## Steps

- **Step 1** — Close your own cashier: Cashiering → Cashier Shift Functions → **Cashier Shift Close** → follow prompts.
- **Step 2** — Run End of Day: Opera → **End of Day → Night Audit** → follow prompts.
- **Step 3** — If an **Adobe Acrobat error** occurs: use *End of Day Reports* to reprint any missing reports. Do not panic — the audit has still run.
- **Step 4** — Immediately reprint the **Downtime Report** once the audit is complete. This fresh post-audit version is what the day team needs.

---

Night Audit posts room charges to all in-house guests, advances the system to the next business date, and generates end-of-day financial reports.`
    },

    // ─────────────────────────────────────────────
    // CATEGORY 5 — Post-Audit Procedures
    // ─────────────────────────────────────────────

    {
      id: 'wiki_post_001',
      title: 'D156 Report — FIRST Post-Audit Task',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 0,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# D156 Report ▣ — Always First

**D156 must be run FIRST — before Hotel Flash and Early Bird. The D156 feeds financial data into both downstream reports.**

---

## Navigation

Misc → Reports → **D156** → Delimited Data → File → Open the file.

P Drive: Ops → 14. Hotel → Financial Reporting → **Recs**

---

## Steps

- **Step 1** — Run the D156 report: Misc → Reports → D156 → Delimited Data → File → Open.
- **Step 2** — Copy the data from **line 2** to the end of the PACKAGE line.
- **Step 3** — Paste into the Recs spreadsheet on the P Drive.
- **Step 4** — Fill column A using **Ctrl+D.**

---

**Why D156 comes first:** It contains the financial reconciliation data that feeds into Hotel Flash and Early Bird. Running those reports before D156 means entering incorrect figures. Always: D156 → Hotel Flash → Early Bird.`
    },

    {
      id: 'wiki_post_002',
      title: 'Hotel Flash',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 1,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Hotel Flash ⚡

**Complete after D156. Uses the E106 report generated during End of Day.**

---

## Navigation

P Drive → 3. Operations Team Folder → 14. Hotel → Financial Reporting → THIS YEAR → Weekly Hotel Forecast → THIS MONTH

---

## Steps

- **Step 1** — Open the Hotel Golf Leisure Flash file.
- **Step 2** — Click **Update** → click **Continue.**
- **Step 3** — Locate the **E106 report** (created during End of Day). Use the **DAY column.**
- **Step 4** — Fill in the fields:

## Fields to Complete (from E106 — DAY column)

- **Rooms Sold** → Rooms Occupied *minus* Comp and House Use
- **Comp / House** → Complimentary Room + House Use Rooms
- **Sleepers** → Total In-House Persons
- **OOO Rooms** → Out Of Order Rooms

---

**Must be completed after D156.** See also: Post-Audit Procedures → Early Bird (next step in sequence).`
    },

    {
      id: 'wiki_post_003',
      title: 'Early Bird',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 2,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Early Bird ☀

**Complete after D156 and Hotel Flash. Two parts: tomorrow's file (expected) and today's file (actuals).**

---

## Navigation

P Drive → 3. Operations Team Folder → 4. FRONT OFFICE → 11. EARLY BIRD → CURRENT YEAR → CURRENT MONTH

---

## Part 1 — Create Tomorrow's File

- Copy the newest Early Bird file.
- Rename the copy for **tomorrow's date.**
- Open the new file → update the date and expected revenue (use **Shift+F3** in Opera for tomorrow's data).
- Save and close.

## Part 2 — Fill Today's Actuals

- Open **today's** Early Bird file.
- Click **Update.**
- Fill **actual revenue** from the 2nd page of the **F116 report** under "ROOM REVENUE."
- Fill **F&B covers** from the tally sheet.

## Part 3 — Tomorrow's Expected Data

- Rooms, persons, and ARR: from **Shift+F3** in Opera (for next day).
- F116: Room Sold **minus** House Use and Comp.

---

**Must be completed after D156.** The F116 report is generated during End of Day.`
    },

    {
      id: 'wiki_post_004',
      title: 'One Yield',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 3,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# One Yield ↑

**Email results to Michelle Boden, CC Front Desk Manager and AM.**

---

## Navigation

P Drive → 3. Operations Team Folder → 4. FRONT OFFICE → 4. ONE YIELD → THIS YEAR

---

## Key Rule

Total Hotel Rooms **ALWAYS** minus Complimentary Rooms.

---

## Steps

- **Step 1** — Open the One Yield Actual Upload Tool.
- **Step 2** — Generate **F100** for the date shown.
- **Step 3** — Fill the market group columns:
  - **Cols 2/3** → Group (Rooms and Revenue)
  - **Cols 4/5** → Contract Totals
  - **Cols 6/7** → Transient ± INT *(INT positive = ADD to Transient; INT negative = MINUS from Transient)*
  - **Cols 8/9** → Overall minus Comp
- **Step 4** — Save the One Yield file.
- **Step 5** — Send email to **Michelle Boden**, CC Front Desk Manager and AM. Attach both the F100 and the saved One Yield file.`
    },

    {
      id: 'wiki_post_005',
      title: 'STR Report',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 4,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# STR Report ⊞

**Submitted at www.str.com. Accuracy affects management pricing decisions.**

---

## Access

- **Website:** www.str.com
- **Username:** marriott.nights
- **Password:** Nteam0825**

---

## Steps

- **Step 1** — Log in to str.com.
- **Step 2** — Click on the **date** you are filling out.
- **Step 3** — Fill **Room and Revenue data** — same figures as One Yield:
  - Total / Transient / Group / Contract
- **Step 4** — Add **F&B and total revenue** from the F116 report.

---

STR is a global benchmarking platform used by Marriott to compare the hotel's performance against competitors. Accurate data here is important for management decisions.`
    },

    {
      id: 'wiki_post_006',
      title: 'Processing Deposits',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 5,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Processing Deposits 💳

**Find bookings made today that require a prepaid deposit and process them.**

---

## Finding Today's Bookings

- Reservations → Update Reservation
- Clear **Arrival From** field
- Advanced → enter **today's date** in the *Created On* field
- Search → sort by Rate Code or market code **ADP**
- Look for rate codes starting with **35****  or **38**** — these MUST be prepaid.

---

## Processing the Deposit

- **Step 1** — Note the total stay amount for the booking.
- **Step 2** — Options → **Deposit → Payment → OK**
- **Step 3** — Log in to cashier → type **DEP** → Tab → OK for *Deposit Revenue* → input total stay amount → **Post → Close.**

## If Successful

- Set Res. Type to **7**
- Drag card window 1 to window 6 → set to *5* and *0.00*
- Window 1 to **CA** → update comment to **pp**

## If the Deposit Fails

- Close the error.
- Note the booking for the morning team to action.`
    },

    {
      id: 'wiki_post_007',
      title: 'Open Folios & Open PMs',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 6,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Open Folios & Open PMs 📁

**An Open Folio means a guest checked out without full payment. The daily email alerts finance and management so they can chase payment.**

---

## Navigation

P Drive → 3. OPERATIONS TEAM FOLDER → 4. FRONT OFFICE → 8. OPEN FOLIOS → Open PMS — Master List New.xlsm

---

## Open PMs — Prep the File

- **Step 1** — Delete all table rows in *DATA_FROM_b130* and *DATA FROM A126* — leave headers.
- **Step 2** — Run **b130** report (delimited, stay date, PSEU). Copy PSEU lines → paste into DATA_FROM_b130.
- **Step 3** — Run **a126** report (delimited) → paste below ** PMs into DATA FROM A126.
- **Step 4** — Go to OUTPUT sheet → **Refresh** → Save and Close.

## Open Folios — Update & Email

- **Step 5** — Cashiering → Billing → Advanced → tick **Open Folio only.**
- **Step 6** — Update the master file. Reapply filter. Save.
- **Step 7** — Send email: Subject — *"Open Folio and Open PM update"*. Use *Open Folios Contacts* from nights inbox.`
    },

    {
      id: 'wiki_post_008',
      title: 'Breakfast Reports',
      category: 'Post-Audit Procedures',
      categoryOrder: 5,
      pageOrder: 7,
      lastModified: '2026-05-16T00:00:00.000Z',
      content: `# Breakfast Reports ☕

**Print the following reports from Opera for the morning F&B and front desk teams.**

---

## Reports to Print

- **R118** — 2 copies (standard breakfast report for front desk and restaurant)
- **R118 Detailed** — include transaction codes: **BUP15, BUP7.5, ASSOC, BUP10** (audit date only)
  *Add BUP10 if there was an EasyJet cancellation flight booking.*
- **D999** — breakfast report for the F&B team
- **A891** — Platinum and Platinum Premier guests only
- **A150** — tick *Groups* box
- **B202** — last 4 days
- **Daily Times** — 1 copy

---

**Leave the printed reports in the designated location** for the morning team to collect at shift start. Include the Daily Times with the handover pack.`
    }

  ]
};
