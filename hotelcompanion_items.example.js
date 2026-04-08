/**
 * hotelcompanion_items.example.js
 *
 * EDITABLE CONFIGURATION FILE — Night Receptionist Companion Suite (Version A)
 *
 * This file contains the default arrays for:
 *   - PRE_SHIFT_ITEMS   — Shift Checklist: Pre-Shift / During-Shift tab
 *   - POST_SHIFT_ITEMS  — Shift Checklist: Post-Shift tab
 *   - NIGHT_AUDIT_STEPS — Night Audit Tracker procedure steps
 *
 * HOW TO USE
 * ----------
 * 1. Copy this file to hotelcompanion_items.js (which is gitignored).
 * 2. Edit hotelcompanion_items.js to match your property's procedures.
 * 3. The main app (hotelcompanion_suite.html) loads hotelcompanion_items.js at
 *    runtime via <script src="hotelcompanion_items.js">. Your edits take effect
 *    immediately on the next page load — no changes to the main HTML required.
 *
 * ITEM SCHEMA
 * -----------
 * Each checklist item is a plain object:
 * {
 *   text:             string   — main label (required)
 *   subtitle:         string   — secondary detail shown below the label (optional)
 *   required:         boolean  — true = highlighted as "required before continue" (default false)
 *   days:             number[] — restrict to specific day(s) of the week using JS day index
 *                                (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat).
 *                                Empty array [] means every night. (default [])
 *   lastNightOfMonth: boolean  — true = only show on the last night of the month (default false)
 * }
 *
 * Each Night Audit step is a plain object:
 * {
 *   phase:    string — phase label, e.g. "PHASE 1 — PREPARE" (required)
 *   text:     string — step label (required)
 *   subtitle: string — guidance note shown below the label (optional)
 * }
 *
 * NOTE: The "Run Night Audit" entry at the end of PRE_SHIFT_ITEMS is intentionally
 * kept as the final pre-shift item. The app renders it as a highlighted call-to-action
 * card that navigates to the Night Audit Tracker section rather than a plain checkbox.
 * Do not remove it — but you can change the text if your property runs the audit at a
 * different time.
 */

// ---------------------------------------------------------------------------
// PRE-SHIFT ITEMS
// Sourced from: nightsTicklist.htm → preAuditTasks (17 items)
// These tasks are performed on arrival up to (but not including) the audit run.
// ---------------------------------------------------------------------------
const PRE_SHIFT_ITEMS = [
  {
    text: 'Turn off Jacuzzi Pump and Steam room lights',
    required: true
  },
  {
    text: 'Receive Handover from Day Team',
    subtitle: '• Familiarise yourself with house status and groups/functions for this evening — including Conferences and Parties\n• Ask if there are any Wake-up Calls, Breakfast Bags or booked Taxis',
    required: true
  },
  {
    text: 'Start Pool Robot',
    subtitle: '• Get out pool cleaning robot and place in pool\n• Start it\n• Ensure cable will not tangle or snag on anything'
  },
  {
    text: 'Floor walk 2230',
    subtitle: '• Check for room service trays outside guests\' rooms and recover as necessary\n• Ensure that fire exit routes are clear, the link bridge is secured and that the golf lounge internal & external door is secured\n• Turn off any un-needed lights as you go around',
    required: true
  },
  {
    text: 'RevPar',
    subtitle: '• Work out the RevPar figure for the day\n• Update any IN HOUSE or ARRIVAL reservations with the market code BMR'
  },
  {
    text: 'Collect all dockets from the bar and restaurant',
    subtitle: '• Be sure to check the office desk for dockets that have been left by earlier shifts\n• For all dockets cashed off with card or cash — ensure these are filed later with the night audit',
    required: true
  },
  {
    text: 'Rebate',
    subtitle: '• Rebate charges on the management accounts\n• If there are charges without a signed docket, extend the account and ensure these are communicated to restaurant, Marty, Dody, Didier, Debbie H, Aymen, Yaas and Ella for follow up'
  },
  {
    text: 'PMs',
    subtitle: '• Check out all PMs after bar has closed\n• Extend PM accounts that are due out with balances'
  },
  {
    text: 'Fill out the management bills report',
    subtitle: '• 9000\n• 9001\n• 9066'
  },
  {
    text: 'D140',
    subtitle: '• Look at the D140 (negative postings only) for all cashiers\n• File in Nights Folder on P Drive'
  },
  {
    text: 'NAR1',
    subtitle: '• Look at night audit reports (NAR1) on email'
  },
  {
    text: 'A142',
    subtitle: '• Look at the A142 Report and check rates and source codes\n• File in Nights Folder on P Drive'
  },
  {
    text: 'No Shows',
    subtitle: '• DO NOT check in any remaining arrivals unless they are members\n• Remove room numbers and put them in a comment',
    required: true
  },
  {
    text: 'Balance Banking',
    subtitle: '• Check banking and fill out Balance Sheet\n• If it does NOT balance, email to Aymen, Yaas, Mary and Harriet',
    required: true
  },
  {
    text: 'D100',
    subtitle: '• All night staff — print a D100 and match to Freedompay total\n• INVESTIGATE IF NOT BALANCED',
    required: true
  },
  {
    text: 'DM Report',
    subtitle: '• Fill in DM Report with Daily figures (PM Actual)'
  },
  {
    // ⚠️  KEEP AS LAST PRE-SHIFT ITEM — rendered as a navigation CTA to the Night Audit Tracker
    text: 'Run Night Audit',
    subtitle: '• Run the Night Audit AT 0301',
    required: true
  }
];

// ---------------------------------------------------------------------------
// POST-SHIFT ITEMS
// Sourced from: nightsTicklist.htm → rawTasks (38 items)
// These tasks are performed after the night audit has completed.
// ---------------------------------------------------------------------------
const POST_SHIFT_ITEMS = [
  {
    text: 'Send EMEA reports to Marriott',
    subtitle: '• D114\n• F116'
  },
  {
    text: 'Deposits',
    subtitle: '• Collect deposits for all prepaid reservations \'created on\' the audit date, as well as yesterday\'s date\n• DO NOT DO THIS BEFORE 04:00',
    required: true
  },
  {
    text: 'Sort reg cards',
    subtitle: '• Sort them into daily folder or into black box\n• Making sure to staple dockets to them'
  },
  {
    text: 'Save D156 / Recs',
    subtitle: '• Open the D156 as delimited data\n• Copy and paste the figures into the spreadsheet (P Drive → Operations Team Folder → Hotel → Financial Reporting → 2026 → RECS → select correct month)'
  },
  {
    text: 'Fill out Hotel Flash',
    subtitle: '• Open and complete Weekly Hotel Flash (P Drive → 3. Operations Team Folder → 14. Hotel → Financial Reporting → 2026 → Weekly Hotel Forecast → select correct month)'
  },
  {
    text: 'Complete the Early Bird Report'
  },
  {
    text: 'City Ledgers',
    subtitle: '• Go through ALL CHECK OUTS and follow the City Ledger process for that ledger, check all routing while you are at it\n• If you have any discrepancies with the CLs, ensure this is on the handover',
    required: true
  },
  {
    text: 'Update One Yield'
  },
  {
    text: 'Complete the Daily Times'
  },
  {
    text: 'Fill out the STR'
  },
  {
    text: 'Open and monitor the cases on GXP'
  },
  {
    text: 'Board',
    subtitle: '• Update the back-office whiteboard with relevant information for the day\n• Make sure it is correct before leaving at the end of shift'
  },
  {
    text: 'Check Comments',
    subtitle: '• Check comments for all rooms in house to ensure breakfast reports look correct'
  },
  {
    text: 'Print Breakfast Reports',
    subtitle: '• Single sided ONLY\n• D999 (New), R118, R118 detailed, A891 (VIP 10 + 11), B202, A150\n• Print Opentable Reservations for the kitchen'
  },
  {
    text: 'Send One Yield and F100',
    subtitle: '• To Michelle Boden, Yaas, Ella, Aymen'
  },
  {
    text: 'Review Departures',
    subtitle: '• Check out and reinstate all routed rooms\n• Making sure to check backups for city ledgers'
  },
  {
    text: 'Traces',
    subtitle: '• Go through arrivals and assign rooms to all members and any arrivals with traces'
  },
  {
    text: 'Housekeeping Reports',
    subtitle: '• Send A136, A192, T116 reports by email to housekeeping, Aymen, Ella, Yaas and Mays\n• Include information about pickup rooms in the email'
  },
  {
    text: 'Yard Gate',
    subtitle: '• Open Service yard gate\n• Padlock code 1991\n• 4AM',
    days: [] // every night
  },
  {
    text: 'Post room service cheques to Opera',
    subtitle: '• 4AM'
  },
  {
    text: 'Kitchen Tidy',
    subtitle: '• Turn off pizza oven and clean area\n• 4AM'
  },
  {
    text: 'Print final numbers from FreedomPay for Mary',
    subtitle: '• 4AM'
  },
  {
    text: 'Open Folios',
    subtitle: '• Update and send the \'Open Folio and Open PM\' list',
    days: [6] // Saturday only
  },
  {
    text: 'Tidy Bar',
    subtitle: '• Check and tidy the bar from last remaining guests'
  },
  {
    text: 'Tidy Front Desk'
  },
  {
    text: 'Clean and hoover back office'
  },
  {
    text: 'Restart all computers'
  },
  {
    text: 'Signs — Puddle Duck',
    subtitle: '• Put out puddle duck signs',
    days: [0] // Sunday
  },
  {
    text: 'Signs — Puddle Duck',
    subtitle: '• Put out puddle duck signs',
    days: [1] // Monday
  },
  {
    text: 'Signs — Fire Alarm Test',
    subtitle: '• Put out fire alarm test signs',
    days: [2] // Tuesday
  },
  {
    text: 'Function Signs',
    subtitle: '• Put out function signs outside appropriate meeting rooms'
  },
  {
    text: 'Send management bill spreadsheet to Didier',
    lastNightOfMonth: true
  },
  {
    text: 'Scan Sheets',
    subtitle: '• Send scan of Safety checklist and spa signin to Didier'
  },
  {
    text: 'Retrieve Pool Robot',
    subtitle: '• Pull Robot out and make sure it is off\n• Put Robot away and ensure cabling is tidy\n• Clean filter'
  },
  {
    text: 'Pool Test',
    subtitle: '• Pool test to be done and turn Jacuzzi back on if it is working (trained staff only)'
  },
  {
    text: 'Night Reports',
    subtitle: '• Send out to the management team in one email: Daily Times / DM Report / Early Bird'
  },
  {
    text: 'Handover',
    subtitle: '• Perform a handover with early shift team',
    required: true
  },
  {
    text: 'Banking',
    subtitle: '• Do a D100 end of shift and sign it (match to Freedompay)',
    required: true
  }
];

// ---------------------------------------------------------------------------
// NIGHT AUDIT STEPS
// Sourced from: hotelcompanion_enhanced.html § section-nightaudit
// These are the procedural steps performed during the audit run itself.
// They are displayed in the Night Audit Tracker section — NOT in the Shift Checklist.
// ---------------------------------------------------------------------------
const NIGHT_AUDIT_STEPS = [
  // PHASE 1 — PREPARE
  {
    phase: 'PHASE 1 — PREPARE',
    text: 'Close out all pending check-ins',
    subtitle: 'Walk-ins and late arrivals must be checked in and charged before running audit'
  },
  {
    phase: 'PHASE 1 — PREPARE',
    text: 'Post all outstanding room charges',
    subtitle: 'Room rate, taxes, restaurant charges, minibar — anything not yet posted to folio'
  },
  {
    phase: 'PHASE 1 — PREPARE',
    text: 'Process no-shows',
    subtitle: 'Check your no-show policy — some require charging the first night, others need manager approval'
  },

  // PHASE 2 — RUN THE AUDIT
  {
    phase: 'PHASE 2 — RUN THE AUDIT',
    text: 'Run Night Audit in PMS',
    subtitle: 'This rolls the business date — do not run twice. If it errors, call duty manager immediately'
  },
  {
    phase: 'PHASE 2 — RUN THE AUDIT',
    text: 'Verify new date is showing correctly in PMS',
    subtitle: 'The system should now show tomorrow\'s date as "today"'
  },
  {
    phase: 'PHASE 2 — RUN THE AUDIT',
    text: 'Card terminal batch close run',
    subtitle: '💳 Print or save the settlement report — totals must match PMS card totals'
  },

  // PHASE 3 — RECONCILE
  {
    phase: 'PHASE 3 — RECONCILE',
    text: 'Review discrepancy report',
    subtitle: 'Any rooms showing different status in PMS vs housekeeping — investigate and correct'
  },
  {
    phase: 'PHASE 3 — RECONCILE',
    text: 'Check for any credit limit breaches',
    subtitle: 'Folios approaching or over credit limit must be flagged — call guest or flag for morning manager'
  },
  {
    phase: 'PHASE 3 — RECONCILE',
    text: 'Post any city ledger or direct bill charges',
    subtitle: 'Corporate accounts with billing agreements — post correctly, don\'t lump to cash'
  },

  // PHASE 4 — REPORTS & CLOSE
  {
    phase: 'PHASE 4 — REPORTS & CLOSE',
    text: 'Print / save manager\'s report',
    subtitle: 'Revenue summary, occupancy, ADR — leave on manager\'s desk or email as per your SOP'
  },
  {
    phase: 'PHASE 4 — REPORTS & CLOSE',
    text: 'Print arrivals list for next day',
    subtitle: 'Morning team will need this — group arrivals, VIPs, special requests highlighted'
  },
  {
    phase: 'PHASE 4 — REPORTS & CLOSE',
    text: 'Note any audit exceptions in handover',
    subtitle: 'Anything unusual, errors corrected, charges queried — the morning team needs the full picture'
  }
];
