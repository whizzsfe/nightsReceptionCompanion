// hotelcompanion_items.example.js
// Default checklist and audit content for the Night Receptionist Companion Suite.
// Copy this file and rename to hotelcompanion_items.example.js to use as a starter,
// or use hotelcompanion_editor.html to customise and export hotelcompanion_items.js.
//
// DELIVERY VERSION: A
// RATIONALE: Single file distributed via OneDrive sync folder, opened via file:// on company PCs. Offline-first, no server required.

window.HOTELCOMPANION_ITEMS = {
  version: 1,

  // Pre-Audit checklist — tasks performed on arrival up to (but not including) running the night audit.
  // The final item (Run Night Audit) is rendered as a call-to-action that navigates to the Night Audit Tracker.
  preAudit: [
    { id: "pre_001", label: "Receive Handover from Day Team",                       required: true,  dayRestriction: "every" },
    { id: "pre_002", label: "Turn off Jacuzzi Pump and Steam room lights",           required: true,  dayRestriction: "every" },
    { id: "pre_003", label: "Start Pool Robot",                                      required: true,  dayRestriction: "every" },
    { id: "pre_004", label: "Floor walk 2230",                                       required: true,  dayRestriction: "every" },
    { id: "pre_005", label: "RevPar",                                                required: true,  dayRestriction: "every" },
    { id: "pre_006", label: "Collect all dockets from the bar and restaurant",       required: true,  dayRestriction: "every" },
    { id: "pre_007", label: "Rebate",                                                required: true,  dayRestriction: "every" },
    { id: "pre_008", label: "PMs",                                                   required: true,  dayRestriction: "every" },
    { id: "pre_009", label: "Fill out the management bills report",                  required: true,  dayRestriction: "every" },
    { id: "pre_010", label: "D140",                                                  required: true,  dayRestriction: "every" },
    { id: "pre_011", label: "NAR1",                                                  required: true,  dayRestriction: "every" },
    { id: "pre_012", label: "A142",                                                  required: true,  dayRestriction: "every" },
    { id: "pre_013", label: "No Shows",                                              required: true,  dayRestriction: "every" },
    { id: "pre_014", label: "Balance Banking",                                       required: true,  dayRestriction: "every" },
    { id: "pre_015", label: "D100",                                                  required: true,  dayRestriction: "every" },
    { id: "pre_016", label: "DM Report",                                             required: true,  dayRestriction: "every" },
    { id: "pre_017", label: "Run Night Audit at 0301",                               required: true,  dayRestriction: "every" }
  ],

  // Post-Audit checklist — tasks performed after the audit has run.
  postAudit: [
    { id: "post_001", label: "Send EMEA reports to Marriott",                        required: true,  dayRestriction: "every" },
    { id: "post_002", label: "Deposits",                                             required: true,  dayRestriction: "every" },
    { id: "post_003", label: "Sort reg cards",                                       required: true,  dayRestriction: "every" },
    { id: "post_004", label: "Save D156 / Recs",                                     required: true,  dayRestriction: "every" },
    { id: "post_005", label: "Fill out Hotel Flash",                                 required: true,  dayRestriction: "every" },
    { id: "post_006", label: "Complete the Early Bird Report",                       required: true,  dayRestriction: "every" },
    { id: "post_007", label: "City Ledgers",                                         required: true,  dayRestriction: "every" },
    { id: "post_008", label: "Update One Yield",                                     required: true,  dayRestriction: "every" },
    { id: "post_009", label: "Complete the Daily Times",                             required: true,  dayRestriction: "every" },
    { id: "post_010", label: "Fill out the STR",                                     required: true,  dayRestriction: "every" },
    { id: "post_011", label: "Open and monitor the cases on GXP",                   required: true,  dayRestriction: "every" },
    { id: "post_012", label: "Board",                                                required: true,  dayRestriction: "every" },
    { id: "post_013", label: "Check Comments",                                       required: true,  dayRestriction: "every" },
    { id: "post_014", label: "Print Breakfast Reports",                              required: true,  dayRestriction: "every" },
    { id: "post_015", label: "Send One Yield and F100",                              required: true,  dayRestriction: "every" },
    { id: "post_016", label: "Review Departures",                                    required: true,  dayRestriction: "every" },
    { id: "post_017", label: "Traces",                                               required: true,  dayRestriction: "every" },
    { id: "post_018", label: "Housekeeping Reports",                                 required: true,  dayRestriction: "every" },
    { id: "post_019", label: "Yard Gate",                                            required: true,  dayRestriction: "every" },
    { id: "post_020", label: "Post room service cheques to opera",                   required: true,  dayRestriction: "every" },
    { id: "post_021", label: "Kitchen Tidy",                                         required: true,  dayRestriction: "every" },
    { id: "post_022", label: "Print final numbers from FreedomPay for Mary",         required: true,  dayRestriction: "every" },
    { id: "post_023", label: "Open Folios",                                          required: true,  dayRestriction: "sat" },
    { id: "post_024", label: "Tidy Bar",                                             required: false, dayRestriction: "every" },
    { id: "post_025", label: "Tidy Front Desk",                                      required: false, dayRestriction: "every" },
    { id: "post_026", label: "Clean and hoover back office",                         required: false, dayRestriction: "every" },
    { id: "post_027", label: "Restart all computers",                                required: true,  dayRestriction: "every" },
    { id: "post_028", label: "Put out puddle duck signs",                            required: true,  dayRestriction: "sun" },
    { id: "post_029", label: "Put out puddle duck signs",                            required: true,  dayRestriction: "mon" },
    { id: "post_030", label: "Put out fire alarm test signs",                        required: true,  dayRestriction: "tue" },
    { id: "post_031", label: "Function Signs",                                       required: true,  dayRestriction: "every" },
    { id: "post_032", label: "Send management bill spreadsheet to Didier",           required: true,  dayRestriction: "last_night_of_month" },
    { id: "post_033", label: "Scan Sheets",                                          required: true,  dayRestriction: "every" },
    { id: "post_034", label: "Retrieve Pool Robot",                                  required: true,  dayRestriction: "every" },
    { id: "post_035", label: "Pool Test",                                            required: true,  dayRestriction: "every" },
    { id: "post_036", label: "Night Reports",                                        required: true,  dayRestriction: "every" },
    { id: "post_037", label: "Handover",                                             required: true,  dayRestriction: "every" },
    { id: "post_038", label: "Banking",                                              required: true,  dayRestriction: "every" }
  ],

  // Night Audit Tracker steps — the step-by-step audit procedure (not checklist items).
  auditSteps: [
    { id: "audit_001", label: "Close out all pending check-ins" },
    { id: "audit_002", label: "Post all outstanding room charges" },
    { id: "audit_003", label: "Process no-shows" },
    { id: "audit_004", label: "Run Night Audit in PMS" },
    { id: "audit_005", label: "Verify new date is showing correctly in PMS" },
    { id: "audit_006", label: "Card terminal batch close run" },
    { id: "audit_007", label: "Review discrepancy report" },
    { id: "audit_008", label: "Check for any credit limit breaches" },
    { id: "audit_009", label: "Post any city ledger or direct bill charges" },
    { id: "audit_010", label: "Print / save manager's report" },
    { id: "audit_011", label: "Print arrivals list for next day" },
    { id: "audit_012", label: "Note any audit exceptions in handover" }
  ]
};
