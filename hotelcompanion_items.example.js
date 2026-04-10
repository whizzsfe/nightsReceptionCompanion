// hotelcompanion_items.example.js
// Default checklist and audit content for the Night Receptionist Companion Suite.
// Copy this file and rename to hotelcompanion_items.js to use as a starter,
// or use hotelcompanion_editor.html to customise and export hotelcompanion_items.js.
//
// Schema fields:
//   id             — stable unique string, never changed after creation
//   label          — task title shown as the checklist item heading
//   notes          — optional bullet-point guidance shown below the label (empty string = none)
//   required       — boolean, highlights as required-before-continue when true
//   dayRestriction — "every" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" | "last_night_of_month"
//
// DELIVERY VERSION: A
// RATIONALE: Single file distributed via OneDrive sync folder, opened via file:// on company PCs. Offline-first, no server required.

window.HOTELCOMPANION_ITEMS = {
  version: 1,

  // Pre-Audit checklist — tasks performed on arrival up to (but not including) running the night audit.
  // Tick each item as you go. The final item (Run Night Audit at 0301) is a plain required tick — PMS runs the audit automatically.
  preAudit: [
    {
      id: "pre_001", label: "Receive Handover from Day Team", required: true, dayRestriction: "every",
      notes: "• Familiarise yourself with house status and groups/functions for this evening, including Conferences and Parties.\n• Ask if there are any Wake-up Calls, Breakfast Bags or booked Taxis."
    },
    {
      id: "pre_002", label: "Turn off Jacuzzi Pump and Steam room lights", required: true, dayRestriction: "every",
      notes: ""
    },
    {
      id: "pre_003", label: "Start Pool Robot", required: true, dayRestriction: "every",
      notes: "• Get out pool cleaning robot and place in pool.\n• Start it.\n• Ensure cable will not tangle or snag on anything."
    },
    {
      id: "pre_004", label: "Floor walk 2230", required: true, dayRestriction: "every",
      notes: "• Check for room service trays outside guest rooms and recover as necessary.\n• Ensure fire exit routes are clear, the link bridge is secured and the golf lounge internal & external door is secured.\n• Turn off any un-needed lights as you go around."
    },
    {
      id: "pre_005", label: "RevPar", required: true, dayRestriction: "every",
      notes: "• Work out the RevPar figure for the day.\n• Update any IN HOUSE or ARRIVAL reservations with the market code BMR."
    },
    {
      id: "pre_006", label: "Collect all dockets from the bar and restaurant", required: true, dayRestriction: "every",
      notes: "• Be sure to check the office desk for dockets left by earlier shifts.\n• For all dockets cashed off with card or cash — ensure these are filed later with the night audit."
    },
    {
      id: "pre_007", label: "Rebate", required: true, dayRestriction: "every",
      notes: "• Rebate charges on the management accounts.\n• If there are charges without a signed docket, extend the account and communicate to restaurant, Marty, Dody, Didier, Debbie H, Aymen, Yaas and Ella for follow up."
    },
    {
      id: "pre_008", label: "PMs", required: true, dayRestriction: "every",
      notes: "• Check out all PMs after bar has closed.\n• Extend PM accounts that are due out with balances."
    },
    {
      id: "pre_009", label: "Fill out the management bills report", required: true, dayRestriction: "every",
      notes: "• 9000\n• 9001\n• 9066"
    },
    {
      id: "pre_010", label: "D140", required: true, dayRestriction: "every",
      notes: "• Look at the D140 (negative postings only) for all cashiers.\n• File in Nights Folder on P Drive."
    },
    {
      id: "pre_011", label: "NAR1", required: true, dayRestriction: "every",
      notes: "• Look at night audit reports (NAR1) on email."
    },
    {
      id: "pre_012", label: "A142", required: true, dayRestriction: "every",
      notes: "• Look at the A142 Report and check rates and source codes.\n• File in Nights Folder on P Drive."
    },
    {
      id: "pre_013", label: "No Shows", required: true, dayRestriction: "every",
      notes: "• DO NOT check in any remaining arrivals unless they are members.\n• Remove room numbers and put them in a comment."
    },
    {
      id: "pre_014", label: "Balance Banking", required: true, dayRestriction: "every",
      notes: "• Check banking and fill out Balance Sheet.\n• If it does NOT balance, email Aymen, Yaas, Mary and Harriet."
    },
    {
      id: "pre_015", label: "D100", required: true, dayRestriction: "every",
      notes: "• All night staff — print a D100 and match to FreedomPay total.\n• INVESTIGATE IF NOT BALANCED."
    },
    {
      id: "pre_016", label: "DM Report", required: true, dayRestriction: "every",
      notes: "• Fill in DM Report with Daily figures (PM Actual)."
    },
    {
      id: "pre_017", label: "Run Night Audit at 0301", required: true, dayRestriction: "every",
      notes: "• Run the Night Audit AT 0301."
    }
  ],

  // Post-Audit checklist — tasks performed after the audit has run.
  postAudit: [
    {
      id: "post_001", label: "Send EMEA reports to Marriott", required: true, dayRestriction: "every",
      notes: "• D114\n• F116"
    },
    {
      id: "post_002", label: "Deposits", required: true, dayRestriction: "every",
      notes: "• Collect deposits for all prepaid reservations created on the audit date, as well as yesterday's date.\n• DO NOT DO THIS BEFORE 04:00."
    },
    {
      id: "post_003", label: "Sort reg cards", required: true, dayRestriction: "every",
      notes: "• Sort them into daily folder or into black box.\n• Make sure to staple dockets to them."
    },
    {
      id: "post_004", label: "Save D156 / Recs", required: true, dayRestriction: "every",
      notes: "• Open the D156 as delimited data.\n• Copy and paste the figures into the spreadsheet: P Drive → Operations Team Folder → Hotel → Financial Reporting → 2026 → RECS → select correct month."
    },
    {
      id: "post_005", label: "Fill out Hotel Flash", required: true, dayRestriction: "every",
      notes: "• Open and complete Weekly Hotel Flash.\n• P Drive → 3. Operations Team Folder → 14. Hotel → Financial Reporting → 2026 → Weekly Hotel Forecast → select correct month."
    },
    {
      id: "post_006", label: "Complete the Early Bird Report", required: true, dayRestriction: "every",
      notes: ""
    },
    {
      id: "post_007", label: "City Ledgers", required: true, dayRestriction: "every",
      notes: "• Go through ALL CHECK OUTS and follow the City Ledger process for that ledger.\n• Check all routing while you are at it.\n• If you have any discrepancies with the CLs ensure this is on the handover."
    },
    {
      id: "post_008", label: "Update One Yield", required: true, dayRestriction: "every",
      notes: ""
    },
    {
      id: "post_009", label: "Complete the Daily Times", required: true, dayRestriction: "every",
      notes: ""
    },
    {
      id: "post_010", label: "Fill out the STR", required: true, dayRestriction: "every",
      notes: ""
    },
    {
      id: "post_011", label: "Open and monitor the cases on GXP", required: true, dayRestriction: "every",
      notes: ""
    },
    {
      id: "post_012", label: "Board", required: true, dayRestriction: "every",
      notes: "• Update the back-office whiteboard with relevant information for the day.\n• Make sure it is correct before leaving at the end of shift."
    },
    {
      id: "post_013", label: "Check Comments", required: true, dayRestriction: "every",
      notes: "• Check comments for all rooms in house to ensure breakfast reports look correct."
    },
    {
      id: "post_014", label: "Print Breakfast Reports", required: true, dayRestriction: "every",
      notes: "• Single sided ONLY.\n• D999 (New), R118, R118 detailed, A891 (VIP 10 + 11), B202, A150.\n• Print Opentable Reservations for the kitchen."
    },
    {
      id: "post_015", label: "Send One Yield and F100", required: true, dayRestriction: "every",
      notes: "• Send to Michelle Boden, Yaas, Ella, Aymen."
    },
    {
      id: "post_016", label: "Review Departures", required: true, dayRestriction: "every",
      notes: "• Check out and reinstate all routed rooms.\n• Make sure to check backups for city ledgers."
    },
    {
      id: "post_017", label: "Traces", required: true, dayRestriction: "every",
      notes: "• Go through arrivals and assign rooms to all members and any arrivals with traces."
    },
    {
      id: "post_018", label: "Housekeeping Reports", required: true, dayRestriction: "every",
      notes: "• Send A136, A192, T116 reports by email to housekeeping, Aymen, Ella, Yaas and Mays.\n• Include information about pickup rooms in the email."
    },
    {
      id: "post_019", label: "Yard Gate", required: true, dayRestriction: "every",
      notes: "• Open service yard gate.\n• Padlock code: 1991\n• 4AM"
    },
    {
      id: "post_020", label: "Post room service cheques to opera", required: true, dayRestriction: "every",
      notes: "• 4AM"
    },
    {
      id: "post_021", label: "Kitchen Tidy", required: true, dayRestriction: "every",
      notes: "• Turn off pizza oven and clean area.\n• 4AM"
    },
    {
      id: "post_022", label: "Print final numbers from FreedomPay for Mary", required: true, dayRestriction: "every",
      notes: "• 4AM"
    },
    {
      id: "post_023", label: "Open Folios", required: true, dayRestriction: "sat",
      notes: "• Update and send the 'Open Folio and Open PM' list."
    },
    {
      id: "post_024", label: "Tidy Bar", required: false, dayRestriction: "every",
      notes: "• Check and tidy the bar from last remaining guests."
    },
    {
      id: "post_025", label: "Tidy Front Desk", required: false, dayRestriction: "every",
      notes: ""
    },
    {
      id: "post_026", label: "Clean and hoover back office", required: false, dayRestriction: "every",
      notes: ""
    },
    {
      id: "post_027", label: "Restart all computers", required: true, dayRestriction: "every",
      notes: ""
    },
    {
      id: "post_028", label: "Put out puddle duck signs", required: true, dayRestriction: "sun",
      notes: ""
    },
    {
      id: "post_029", label: "Put out puddle duck signs", required: true, dayRestriction: "mon",
      notes: ""
    },
    {
      id: "post_030", label: "Put out fire alarm test signs", required: true, dayRestriction: "tue",
      notes: ""
    },
    {
      id: "post_031", label: "Function Signs", required: true, dayRestriction: "every",
      notes: "• Put out function signs outside appropriate meeting rooms."
    },
    {
      id: "post_032", label: "Send management bill spreadsheet to Didier", required: true, dayRestriction: "last_night_of_month",
      notes: ""
    },
    {
      id: "post_033", label: "Scan Sheets", required: true, dayRestriction: "every",
      notes: "• Send scan of Safety checklist and spa sign-in to Didier."
    },
    {
      id: "post_034", label: "Retrieve Pool Robot", required: true, dayRestriction: "every",
      notes: "• Pull robot out and make sure it is off.\n• Put robot away and ensure cabling is tidy.\n• Clean filter."
    },
    {
      id: "post_035", label: "Pool Test", required: true, dayRestriction: "every",
      notes: "• Pool test to be done and turn Jacuzzi back on if it is working.\n• Trained staff only."
    },
    {
      id: "post_036", label: "Night Reports", required: true, dayRestriction: "every",
      notes: "• Send out to the management team in one email: Daily Times / DM Report / Early Bird."
    },
    {
      id: "post_037", label: "Handover", required: true, dayRestriction: "every",
      notes: "• Perform a handover with early shift team."
    },
    {
      id: "post_038", label: "Banking", required: true, dayRestriction: "every",
      notes: "• Do a D100 end of shift and sign it.\n• Match to FreedomPay."
    }
  ]
};
