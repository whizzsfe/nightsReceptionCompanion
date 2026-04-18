// hotelcompanion_scripts.example.js
// Default AI Coach keyword scripts for the Night Receptionist Companion Suite.
// Copy and rename to hotelcompanion_scripts.js, or use hotelcompanion_editor.html
// to customise (including PDF import) and export hotelcompanion_scripts.js.
//
// DELIVERY VERSION: A
// RATIONALE: Single file distributed via OneDrive sync folder, opened via file:// on company PCs. Offline-first, no server required.
//
// COPYRIGHT: © 2026 Night Receptionist Companion Suite
// Base design: YSEKventures — ysekventures.gumroad.com
// Implemented & enhanced: Whizzsfe Web Services — whizzsfe.com

window.HOTELCOMPANION_SCRIPTS = {
  version: 1,
  scripts: [

    // ── PAYMENTS ────────────────────────────────────────────────────────────────

    {
      id: "script_001",
      keywords: ["guest wants to pay cash", "cash payment", "paying cash", "pay in cash"],
      title: "Guest Wants to Pay Cash",
      category: "Payments",
      response: "**Card-Only Policy**\n\nPolitely but firmly explain to the guest that the property operates a card-only policy for all payments.\n\n**Script:**\n\"I completely understand, and I'm sorry for any inconvenience. Our property operates on a card-only basis for all payments — we're unable to accept cash for room charges or incidentals. This policy applies to all guests and helps us ensure accurate billing.\"\n\n**If the guest insists:**\n\"I'd be happy to speak with the Duty Manager on your behalf. However I should let you know this is a property-wide policy and I'm not in a position to override it.\"\n\n**Action:** Log the interaction in the Night Log if the guest becomes frustrated or a manager is involved."
    },

    {
      id: "script_002",
      keywords: ["card declined", "card decline", "payment declined", "card not working", "card failed"],
      title: "Card Declined at Check-In",
      category: "Payments",
      response: "**Card Declined — Step by Step**\n\n1. Stay calm and keep your voice low — never announce a decline loudly.\n2. Say: \"I'm sorry, it seems there's been a small issue with that card. Could you try a different card or I can retry this one?\"\n3. Try a second tap or chip insert.\n4. If declined again, ask if they have an alternative card.\n5. If no alternative: hold the room key and contact the Duty Manager before releasing the room.\n6. Do not allow access to the room without a successful payment or explicit DM approval.\n\n**Log:** Record the guest name, room, and outcome in the Night Log."
    },

    {
      id: "script_003",
      keywords: ["pre-auth", "pre auth", "billing query", "authorisation hold", "authorization hold", "deposit hold"],
      title: "Pre-Auth / Billing Query Script",
      category: "Payments",
      response: "**Explaining Pre-Authorisation to Guests**\n\n**Script:**\n\"When you checked in, a temporary hold was placed on your card — this is called a pre-authorisation. It's not a charge; it's simply a security hold to cover any incidental expenses during your stay. The hold will be released within 3–5 business days of checkout, depending on your bank.\"\n\n**If asked why the amount is higher than the room rate:**\n\"The pre-auth covers both the room rate and a standard incidental allowance. Only the amount you actually owe will be charged at checkout.\"\n\n**If they're unhappy:** Offer to print a billing summary and note the query in the Night Log."
    },

    // ── COMPLAINTS ───────────────────────────────────────────────────────────────

    {
      id: "script_004",
      keywords: ["noise complaint", "noisy room", "noisy guests", "loud music", "loud neighbours", "noise from room"],
      title: "Noise Complaint Script",
      category: "Complaints",
      response: "**Noise Complaint — Escalation Script**\n\n**Step 1 — Phone call to room:**\n\"Good evening, I'm calling from reception. We've received a noise concern about [room/area]. Could you please keep the noise levels down so other guests can rest? Thank you for your understanding.\"\n\n**Step 2 — If no improvement (20 mins later):**\nAttend in person. Knock firmly. \"I'm very sorry to disturb you. We've had a second noise complaint. I need to ask you to keep noise levels down or I'll have to involve the Duty Manager.\"\n\n**Step 3 — Escalate to Duty Manager** if still no resolution.\n\n**Always:** Log every contact attempt in the Night Log with times."
    },

    {
      id: "script_005",
      keywords: ["handle a guest complaint", "guest complaint", "guest unhappy", "guest upset", "angry guest", "dealing with complaint"],
      title: "Handle a Guest Complaint — LEARN Model",
      category: "Complaints",
      response: "**The LEARN Model for Guest Complaints**\n\n**L — Listen** actively. Don't interrupt. Let them finish.\n**E — Empathise.** \"I completely understand why you feel that way, and I'm truly sorry.\"\n**A — Apologise** sincerely, even if it wasn't your fault.\n**R — Resolve** — offer a solution or escalate to someone who can.\n**N — Notify** — document the complaint and resolution in the Night Log.\n\n**Script opener:**\n\"Thank you for bringing this to my attention. I want to make sure we put this right for you. Could you tell me exactly what happened?\"\n\n**Never:** argue, blame colleagues, or make promises you can't keep."
    },

    {
      id: "script_006",
      keywords: ["dealing with an angry guest", "angry guest", "irate guest", "aggressive guest"],
      title: "Dealing With an Angry Guest",
      category: "Complaints",
      response: "**Calm-Down Techniques for Angry Guests**\n\n1. **Lower your own voice** — this naturally prompts them to lower theirs.\n2. **Don't take it personally** — they're upset at the situation, not you.\n3. **Use their name** once you know it — it builds calm rapport.\n4. **Avoid defensive language** — never say \"that's not our policy\" or \"you should have\".\n5. **Offer choice** — giving options returns a sense of control to the guest.\n6. **Know your threshold** — if they become physically threatening, step back, press the panic button, and call security or police.\n\n**Script:** \"I hear you, and I want to help. Let me see what I can do right now.\""
    },

    // ── SECURITY ─────────────────────────────────────────────────────────────────

    {
      id: "script_007",
      keywords: ["intoxicated guest", "drunk guest", "intoxicated person", "drunk person", "inebriated"],
      title: "Intoxicated Guest at Desk",
      category: "Security",
      response: "**Intoxicated Guest — De-Escalation & Safety**\n\n**De-escalation:**\n- Stay calm, speak slowly and clearly.\n- Do not argue or raise your voice.\n- Use open, non-threatening body language.\n\n**Script:** \"I can see you've had a bit of a night — let me help you get to your room safely.\"\n\n**If they're being disruptive:**\n\"I need to ask you to lower your voice as other guests are sleeping. If you're not able to do that I'll need to call the Duty Manager.\"\n\n**If they're a risk to themselves or others:**\n1. Do not serve alcohol.\n2. Call the Duty Manager.\n3. If a safety risk — call emergency services.\n\n**Log** all interactions in the Night Log."
    },

    {
      id: "script_008",
      keywords: ["suspicious person", "suspicious individual", "unknown person in lobby", "stranger in lobby", "security concern"],
      title: "Suspicious Person in Lobby",
      category: "Security",
      response: "**Suspicious Person — Observe, Approach, Escalate**\n\n**Step 1 — Observe:**\nNote description, time, location, and behaviour. Do not confront alone if you feel unsafe.\n\n**Step 2 — Approach (if safe):**\n\"Good evening, can I help you? Are you a guest with us tonight?\"\n\nIf they cannot confirm a booking or reason for being on site:\n\"I'm afraid this is a guest-only area at this time of night. I'll have to ask you to leave.\"\n\n**Step 3 — Escalate:**\n- Call Duty Manager if they refuse to leave.\n- Call police (999) if there is any threat to safety.\n\n**Always:** Log in the Night Log with description and time."
    },

    {
      id: "script_009",
      keywords: ["fire alarm", "fire evacuation", "evacuation", "fire drill", "building evacuation"],
      title: "Fire Alarm — Evacuation Procedure",
      category: "Security",
      response: "**Fire Alarm Response**\n\n1. **Treat every alarm as real** until confirmed otherwise.\n2. Call out calmly over the phone to rooms if time permits: \"Attention, please evacuate the building calmly via the nearest fire exit.\"\n3. **Do not use lifts** — direct guests to stairs.\n4. Proceed to the designated assembly point.\n5. Carry the in-house guest list and account for all guests.\n6. Do not re-enter the building until the fire service confirms it is safe.\n7. Call 999 if fire is confirmed or if anyone is unaccounted for.\n\n**Log:** Record time alarm activated, time resolved, number of guests evacuated."
    },

    {
      id: "script_010",
      keywords: ["guest refuses to leave", "trespass", "won't leave", "refused to leave", "won't go"],
      title: "Guest Refuses to Leave",
      category: "Security",
      response: "**Guest Refusing to Leave — Trespass Process**\n\n1. Remain calm. Clearly state they must leave: \"I'm asking you to leave the premises now.\"\n2. If they refuse: \"If you do not leave I will contact the police.\"\n3. Call the Duty Manager immediately.\n4. If they still refuse: call 999 — trespass is a civil matter but police will attend if there is a breach of the peace.\n5. Do not physically remove the guest.\n\n**Log** every exchange in the Night Log with exact times and what was said."
    },

    {
      id: "script_011",
      keywords: ["medical emergency", "medical", "ambulance", "collapsed", "chest pain", "unresponsive", "not breathing"],
      title: "Medical Emergency",
      category: "Security",
      response: "**Medical Emergency Protocol**\n\n1. **Call 999 first.** Stay on the line.\n2. Send someone to the main entrance to meet the ambulance and guide paramedics.\n3. Do not move the guest unless they are in immediate danger.\n4. Apply first aid only if you are trained to do so.\n5. Notify the Duty Manager immediately.\n6. Do not leave the guest alone until help arrives.\n7. Keep other guests away from the area.\n\n**Log:** Record time of discovery, time 999 called, time paramedics arrived, guest details."
    },

    {
      id: "script_012",
      keywords: ["do not disturb", "dnd", "welfare check", "dnd sign ignored", "welfare"],
      title: "Do Not Disturb — Welfare Check",
      category: "Security",
      response: "**DND Welfare Check Protocol**\n\n A DND sign should be respected, but welfare takes priority if:\n- The sign has been on for an unusual length of time (12+ hours).\n- A guest has not been seen and a concern has been raised.\n\n**Procedure:**\n1. Knock firmly: \"Housekeeping / Reception — just checking everything is okay.\"\n2. If no response: knock again and announce loudly.\n3. If still no response: contact the Duty Manager before entering.\n4. Two staff members should be present when entering.\n\n**Log** the time of check and outcome."
    },

    {
      id: "script_013",
      keywords: ["unaccompanied minor", "child alone", "minor alone", "child without adult"],
      title: "Unaccompanied Minor",
      category: "Security",
      response: "**Unaccompanied Minor — Safeguarding**\n\n1. Approach calmly: \"Hi there — are you okay? Is your mum or dad nearby?\"\n2. Do not leave the child unattended.\n3. Bring them to reception and attempt to contact their parent/guardian.\n4. Call the Duty Manager immediately.\n5. If no parent/guardian can be located within a short time: call 999 and request police welfare attendance.\n6. Do not allow any third party to take the child unless they can confirm parentage.\n\n**Log** all details including time, description, and actions taken."
    },

    {
      id: "script_014",
      keywords: ["power cut", "power outage", "blackout", "electricity out", "no power", "lights out"],
      title: "Power Cut",
      category: "Security",
      response: "**Power Cut Response**\n\n1. Emergency lighting should activate automatically — check it has.\n2. Do not panic — stay at reception to manage guest queries.\n3. Check whether the outage is building-wide or local (fuse/breaker).\n4. Contact the Duty Manager immediately.\n5. If generator-equipped: confirm generator has activated.\n6. Inform guests calmly: \"We're aware of a power interruption and our team is working to resolve it. Emergency lighting is active and you are safe.\"\n7. Log the time and extent of the outage.\n8. Contact the electricity provider if it appears to be a wider area outage."
    },

    // ── ARRIVALS & DEPARTURES ────────────────────────────────────────────────────

    {
      id: "script_015",
      keywords: ["late arrival", "no booking found", "no reservation", "no record of booking", "booking not found"],
      title: "Late Arrival — No Booking Found",
      category: "Arrivals & Departures",
      response: "**No Reservation Found — 5-Step Process**\n\n1. Ask the guest for their booking confirmation number or the email address used.\n2. Search by name, company, and confirmation number.\n3. Check for misspelling of the name.\n4. Check if the booking may be under a travel agent or third-party OTA reference.\n5. If still not found: do not turn the guest away — contact the Duty Manager before making any decision to walk the guest.\n\n**Script:** \"I want to make absolutely sure we've checked everything before I come to any conclusion. Let me try a couple of other searches.\""
    },

    {
      id: "script_016",
      keywords: ["guest locked out", "locked out", "lost key card", "key not working", "key card not working"],
      title: "Guest Locked Out at 3am",
      category: "Arrivals & Departures",
      response: "**Guest Locked Out — Key Issue Process**\n\n1. **Verify identity** before issuing any key — never skip this step.\n2. Ask for: full name, room number, and check-out date.\n3. Confirm these details against the booking in the PMS.\n4. If details match: re-encode/issue the key card.\n5. If details do not match or the guest cannot provide them: do not issue a key — ask the Duty Manager.\n6. **Never** issue a key based on appearance or room knowledge alone.\n\n**Script:** \"Of course — I just need to confirm a couple of details to make sure I get the right room for you.\""
    },

    {
      id: "script_017",
      keywords: ["early check-in", "early arrival", "arrive early", "room ready early"],
      title: "Early Check-In Request",
      category: "Arrivals & Departures",
      response: "**Early Check-In Request**\n\n1. Check room availability in the PMS for the requested room type.\n2. Check with housekeeping if the room has been cleaned/inspected.\n3. If room is ready: check in and note in the shift log.\n4. If not ready: offer the luggage room and invite the guest to use hotel facilities.\n\n**Script:** \"Let me check what we have available for you. Our standard check-in time is [time], but if a room is ready earlier I'll be happy to get you in straight away.\"\n\n**Upsell:** If a higher-category room is available and ready, this is an opportunity to offer an upgrade."
    },

    {
      id: "script_018",
      keywords: ["late check-out", "late checkout", "extend stay", "stay later", "checkout later"],
      title: "Late Check-Out Request",
      category: "Arrivals & Departures",
      response: "**Late Check-Out Request**\n\n1. Check occupancy — if the room is not sold for tonight, a late check-out may be possible.\n2. Check housekeeping schedule before committing.\n3. Standard late check-out is typically until 12 noon / 1pm — confirm your property's policy.\n\n**Script:** \"I'll check availability for you. Our standard check-out is [time] but I'd love to help if we can.\"\n\n**If available:** \"We can offer you until [time] — would that work for you?\"\n\n**Charge:** Confirm whether late check-out is complimentary or chargeable per your property policy.\n\n**Notify:** Inform housekeeping of any agreed late check-outs."
    },

    {
      id: "script_019",
      keywords: ["group arrival", "group check-in", "large group", "coach group", "tour group"],
      title: "Group Arrival",
      category: "Arrivals & Departures",
      response: "**Group Arrival — Coordination Process**\n\n**Before arrival:**\n1. Pre-assign rooms in the PMS to avoid delays at desk.\n2. Pre-encode key cards and label in envelopes if possible.\n3. Prepare a group rooming list.\n4. Coordinate with housekeeping to confirm all rooms are inspected.\n\n**On arrival:**\n1. Greet the group leader first and work from the rooming list.\n2. Distribute keys efficiently — batch by floor or travel party where possible.\n3. Brief the group on breakfast times, WiFi, and any relevant information.\n\n**Log:** Note arrival time and any issues in the Night Log."
    },

    {
      id: "script_020",
      keywords: ["room move", "room change", "change room", "move room", "different room"],
      title: "Room Move Request",
      category: "Arrivals & Departures",
      response: "**Room Move — PMS Procedure**\n\n1. Identify an available, inspected room matching the guest's request.\n2. Process the room move in the PMS.\n3. Re-encode the key card for the new room.\n4. Notify housekeeping of the move (both vacated and new room).\n5. Ensure any luggage stored is moved (offer assistance).\n6. Update any in-room dining or service orders to the new room number.\n\n**Script:** \"Let me sort that for you now. I'll get you a new key card for [room] and make a note for housekeeping.\""
    },

    // ── VIP & SERVICE ────────────────────────────────────────────────────────────

    {
      id: "script_021",
      keywords: ["vip check-in", "vip arrival", "vip guest", "check-in script for vip"],
      title: "VIP Check-In Script",
      category: "VIP & Service",
      response: "**VIP Arrival — Polished Check-In Script**\n\n\"Good evening [Name] — welcome back / welcome to [Hotel Name]. It's a pleasure to have you with us.\"\n\n1. Have the registration card pre-completed where possible.\n2. Confirm room assignment — ensure it is inspected and amenities are in place.\n3. Escort or arrange escort to the room if applicable.\n4. Mention any personalised touches: \"We've arranged [item] in your room as requested.\"\n5. Provide direct contact number for any overnight requests.\n\n**Never:** make a VIP guest wait at the desk unnecessarily. Prioritise their arrival.\n\n**Log:** Note VIP arrival in the Night Log and in the handover."
    },

    {
      id: "script_022",
      keywords: ["recommendation", "local recommendation", "what to do", "where to eat", "restaurant recommendation", "things to do"],
      title: "Giving Local Recommendations",
      category: "VIP & Service",
      response: "**Confident Local Recommendations — Structure**\n\n1. **Ask first:** \"Are you looking for something casual or more of a dining experience?\"\n2. **Offer two or three options** — not a list of ten.\n3. **Give a reason:** \"I'd suggest [name] — the [dish/atmosphere] is really excellent.\"\n4. **Practical detail:** opening hours, walking distance, whether booking is needed.\n5. **Offer to help:** \"Would you like me to call ahead for you?\"\n\n**Keep a go-to list** of 3–4 local recommendations for: casual dining, fine dining, late-night food, and things to do — so you're never caught unprepared."
    },

    {
      id: "script_023",
      keywords: ["phone greeting", "telephone greeting", "answer the phone", "how to answer", "phone script"],
      title: "Phone Greeting Script",
      category: "VIP & Service",
      response: "**Standard Phone Scripts**\n\n**Incoming external call:**\n\"Good [morning/afternoon/evening], [Hotel Name] reception, [Your Name] speaking — how may I help you?\"\n\n**Transferring a call:**\n\"Of course, I'll transfer you now. Please hold one moment.\"\n*(If transfer fails, return to the caller and take a message.)*\n\n**Taking a message:**\n\"I'm sorry, [Name] isn't available right now. May I take a message? Could I have your name and the best number to reach you?\"\n\n**Wake-up call confirmation:**\n\"I've noted a wake-up call for [time] — is there anything else I can help you with?\""
    },

    // ── OPERATIONS ───────────────────────────────────────────────────────────────

    {
      id: "script_024",
      keywords: ["night audit error", "audit error", "pms error", "audit problem", "audit failed", "audit issue"],
      title: "Night Audit Error — What to Do",
      category: "Operations",
      response: "**Night Audit Error — Common Issues & Golden Rules**\n\n**Common PMS errors:**\n- Date not rolling: check open folios or pending check-ins blocking the audit.\n- Discrepancy report exceptions: review each one before proceeding.\n- Card batch error: re-run batch close on the terminal; if it fails, log and notify the Duty Manager.\n\n**Golden Rules:**\n1. Never force-close an audit without understanding why it failed.\n2. Document every error and action taken in the Night Log.\n3. If in doubt — stop and call the Duty Manager. It's better to delay the audit than to corrupt the data.\n4. Always take a screenshot or note the exact error message.\n\n**Contact:** Your PMS support line is available 24/7 for audit errors."
    },

    {
      id: "script_025",
      keywords: ["maintenance fault", "maintenance issue", "broken", "fault reported", "out of order", "not working"],
      title: "Maintenance Fault Reporting",
      category: "Operations",
      response: "**Maintenance Fault — Logging & Escalation**\n\n**Severity guide:**\n- **High** (log + call out-of-hours): flooding, power to occupied room, lift failure, fire safety equipment.\n- **Medium** (log + note for morning): heating/cooling, TV, hot water fault.\n- **Low** (log only): light bulb, cosmetic damage, minor fixture.\n\n**Process:**\n1. Log in the Night Log: location, description, severity, time discovered.\n2. If a guest is affected, offer a room move for high-severity faults.\n3. For out-of-hours callouts: use the emergency maintenance contact list — only call for H&S or guest safety issues.\n4. Include in the morning handover."
    },

    {
      id: "script_026",
      keywords: ["lost property", "lost and found", "found item", "guest left item", "lost item", "found property"],
      title: "Lost Property",
      category: "Operations",
      response: "**Lost Property Procedure**\n\n**Item found:**\n1. Record in the Lost Property log: item description, date/time found, location, found by.\n2. Store securely — valuables in the safe, other items in the lost property box.\n3. If a guest is still in house, attempt to return straight away.\n\n**Guest enquiry:**\n1. Check the lost property log.\n2. Ask for a description before confirming you have the item.\n3. For high-value items, verify identity before releasing.\n4. For posted returns: manager authorisation required.\n\n**Retention period:** Follow property policy (typically 3 months for valuables, 1 month for other items)."
    }

  ]
};
