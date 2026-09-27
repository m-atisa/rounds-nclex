window.NURSE_DATA = window.NURSE_DATA || [];
(function () {
  var REF_CASE = "Module 21 · Exemplar 21.C Wound Healing · NGN Case Study: Postoperative Surgical Site Infection";
  var CASE_ID = "m21f-case-ssi";

  var caseNotes = "<p><strong>Client:</strong> 66-year-old, postoperative day (POD) 4 after open sigmoid colectomy with end colostomy (Hartmann procedure) for perforated diverticulitis. History: type 2 diabetes (HbA1c 8.9%), BMI 37, smokes 1 pack/day. Midline incision closed with staples; Jackson-Pratt (JP) drain in the left lower quadrant.</p>" +
    "<p><strong>POD 4, 0800:</strong> Client reports incision pain has increased from 3/10 yesterday to 7/10 today despite scheduled analgesia. Lower 5 cm of the midline incision is red, warm, and indurated, with erythema extending 3 cm beyond the incision edges. Thick, cream-colored drainage with a foul odor is seeping from between two staples. Upper incision edges are approximated with a palpable healing ridge. Staples intact. JP drain output 40 mL of serous fluid over 8 hours. Stoma red and moist, passing flatus. Lungs clear. Eating about 25% of meals.</p>";

  var caseVitals = { title: "Vital Signs", table: { headers: ["Time", "T", "HR", "RR", "BP", "SpO₂"], rows: [
    ["POD 2 0800", "37.2 °C (99.0 °F)", "86", "16", "132/78", "97% RA"],
    ["POD 3 2000", "37.9 °C (100.2 °F)", "96", "18", "128/76", "96% RA"],
    ["POD 4 0800", "38.6 °C (101.5 °F)", "108", "20", "124/72", "96% RA"]
  ] } };

  var caseLabs = { title: "Laboratory Results", table: { headers: ["Test", "POD 2", "POD 4", "Reference range"], rows: [
    ["WBC", "11,200/mm³", "15,800/mm³", "5,000–10,000/mm³"],
    ["Glucose (capillary)", "188 mg/dL", "246 mg/dL", "70–110 mg/dL"],
    ["Albumin", "—", "2.8 g/dL", "3.5–5.0 g/dL"],
    ["Prealbumin", "—", "12 mg/dL", "15–36 mg/dL"],
    ["Hemoglobin", "12.1 g/dL", "11.8 g/dL", "12–16 g/dL"],
    ["Lactate", "—", "1.6 mmol/L", "0.5–2.0 mmol/L"]
  ] } };

  var caseExhibit1 = { tabs: [ { title: "Nurses' Notes", html: caseNotes }, caseVitals, caseLabs ] };

  var caseExhibit5 = { tabs: [
    { title: "Nurses' Notes", html: caseNotes + "<p><strong>POD 5, 1000:</strong> Surgeon removed the lower 5 staples at the bedside and drained a purulent pocket; specimen sent for culture. Wound left open to heal by secondary intention. Wound measures 5 × 2 × 3 cm with 1.5 cm of undermining from 3 to 5 o'clock (head = 12 o'clock). Base is 70% red tissue and 30% adherent yellow slough.</p>" },
    { title: "Orders", html: "<ul><li>Cefazolin 2 g IV every 8 hr plus metronidazole 500 mg IV every 8 hr</li><li>Irrigate wound with normal saline, then pack loosely with saline-moistened gauze twice daily and PRN when saturated; cover with dry gauze</li><li>Correction-scale insulin lispro before meals and at bedtime; notify for glucose above 300 mg/dL</li><li>High-protein oral supplement three times daily; dietitian consult</li><li>Plan negative-pressure wound therapy (NPWT) when wound bed is free of slough</li></ul>" },
    caseVitals, caseLabs
  ] };

  var caseExhibit6 = { tabs: [
    { title: "Nurses' Notes", html: "<p><strong>POD 9, 0900:</strong> Open lower abdominal wound now measures 4.5 × 1.8 × 2.2 cm. Base 90% beefy red, moist, granular tissue; 10% yellow slough. Periwound erythema has receded to 0.5 cm. Drainage is a small amount of serous fluid without odor. Undermining now measures 2.5 cm from 3 to 6 o'clock. Client eating 50% of meals and drinking 2 supplements daily. Pain 3/10 between dressing changes.</p>" },
    { title: "Vital Signs", table: { headers: ["Time", "T", "HR", "RR", "BP", "SpO₂"], rows: [
      ["POD 7 0800", "37.8 °C (100.0 °F)", "96", "18", "126/74", "97% RA"],
      ["POD 9 0800", "37.1 °C (98.8 °F)", "82", "16", "130/78", "97% RA"]
    ] } },
    { title: "Glucose Log (POD 8–9)", table: { headers: ["Time", "Capillary glucose"], rows: [
      ["POD 8 1130", "262 mg/dL"], ["POD 8 1630", "248 mg/dL"], ["POD 8 2100", "255 mg/dL"], ["POD 9 0730", "238 mg/dL"]
    ] } }
  ] };

  var questions = [
  // ================= NGN CASE STUDY (6 items) =================
  {
    id: "m21f-001", type: "highlight", topic: "wound-healing-complications", ref: REF_CASE,
    caseId: CASE_ID, caseOrder: 1, exhibit: caseExhibit1,
    difficulty: 2, clientNeed: "Physiological Integrity: Reduction of Risk Potential",
    cjmm: "Recognize Cues", focus: "Assessment Findings",
    stem: "Refer to the Nurses' Notes, Vital Signs, and Laboratory Results. The nurse reviews the POD 4 incision assessment below. Click to highlight the incision findings that are consistent with a surgical site infection.",
    passage: "Client reports {{incision pain has increased from 3/10 yesterday to 7/10 today}}. The lower 5 cm of the incision is {{red, warm, and indurated}}, with {{erythema extending 3 cm beyond the incision edges}}. There is {{thick, cream-colored drainage with a foul odor}} seeping between two staples. The {{upper incision edges are approximated with a palpable healing ridge}}. {{Staples are intact}}. The {{JP drain has drained 40 mL of serous fluid over 8 hours}}. The {{stoma is red and moist}}.",
    answer: [0, 1, 2, 3],
    optionRationales: [
      "Highlight. Incisional pain should steadily decrease after the first 48–72 hours; pain that increases on POD 4 is a classic early cue of infection.",
      "Highlight. Localized heat, redness, and induration persisting beyond the early inflammatory phase suggest cellulitis of the incision.",
      "Highlight. Normal inflammatory redness is confined to the incision edges (roughly 1 cm or less); spreading erythema 3 cm beyond the edges suggests infection.",
      "Highlight. Thick, opaque, malodorous drainage is purulent exudate (WBCs + debris) and indicates infection.",
      "Do not highlight. Approximated edges with a palpable healing ridge (expected about POD 5–9) indicate normal primary-intention healing in that segment.",
      "Do not highlight. Intact staples mean the closure is holding; this does not indicate infection.",
      "Do not highlight. Small-volume serous JP output on POD 4 is the expected progression from sanguineous → serosanguineous → serous.",
      "Do not highlight. A red, moist stoma indicates adequate stoma perfusion and is expected."
    ],
    rationale: "A surgical site infection (SSI) typically appears 3–7 days after surgery with increasing (rather than decreasing) pain, spreading erythema, warmth, induration, and purulent drainage, often with fever and leukocytosis. Findings such as a healing ridge, intact staples, serous drain output, and a pink-red stoma are expected and help the nurse localize the problem to the lower incision.",
    takeaway: "Pain that gets worse after day 3 plus spreading redness and purulent drainage = think SSI.",
    hintContent: "Recall the normal course of the inflammatory phase: redness, swelling, and pain peak early and then subside. Which findings are moving in the wrong direction?",
    hintStrategy: "Evaluate each segment on its own. Ask: would this finding be present in an uncomplicated POD 4 incision? Highlight only what points to infection, not everything abnormal in the chart."
  },
  {
    id: "m21f-002", type: "matrix", topic: "wound-healing-factors-exudate", ref: REF_CASE,
    caseId: CASE_ID, caseOrder: 2, exhibit: caseExhibit1,
    difficulty: 3, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Analyze Cues", focus: "Pathophysiology",
    stem: "Refer to the Nurses' Notes, Vital Signs, and Laboratory Results. For each client finding, indicate whether it is most consistent with a surgical site infection, a factor contributing to impaired healing, or an expected postoperative finding.",
    rows: [
      "Temperature 38.6 °C (101.5 °F) on POD 4",
      "WBC increased from 11,200/mm³ to 15,800/mm³",
      "Albumin 2.8 g/dL and prealbumin 12 mg/dL",
      "Smoking 1 pack of cigarettes per day",
      "Palpable healing ridge along the upper incision"
    ],
    columns: ["Consistent with surgical site infection", "Contributes to impaired healing", "Expected postoperative finding"],
    answer: [0, 0, 1, 1, 2],
    optionRationales: [
      "SSI. Low-grade temperature elevation in the first 24–48 hours is usually inflammatory; a fever that rises to 38.6 °C on POD 4 suggests infection.",
      "SSI. A rising WBC on POD 4 (instead of trending down after surgery) reflects a response to infection.",
      "Contributes. Low albumin and prealbumin indicate protein-calorie deficit and inflammation; inadequate protein limits collagen synthesis and immune function.",
      "Contributes. Nicotine causes vasoconstriction and carbon monoxide reduces oxygen delivery to the wound, impairing healing and increasing SSI risk.",
      "Expected. A healing ridge (collagen deposited under a primary-intention incision) is a positive sign of normal healing."
    ],
    rationale: "Analyzing cues means sorting them into what the problem IS (fever and rising WBC with local signs = infection), what made the client vulnerable (malnutrition, smoking, hyperglycemia, obesity, contaminated bowel surgery), and what is normal. Separating these directs the plan: treat the infection AND correct modifiable risk factors.",
    takeaway: "Sort cues into 'the problem', 'why it happened', and 'normal' to build a focused plan.",
    hintContent: "Think about which findings reflect the body's response to invading organisms and which describe conditions that reduce oxygen or protein delivery to healing tissue.",
    hintStrategy: "Each row fits only one column. For each, ask: is this a SIGN of the complication, a RISK FACTOR for it, or a sign that healing is on track?"
  },
  {
    id: "m21f-003", type: "dropdown", topic: "wound-healing-complications", ref: REF_CASE,
    caseId: CASE_ID, caseOrder: 3, exhibit: caseExhibit1,
    difficulty: 3, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Prioritize Hypotheses", focus: "Prioritization",
    stem: "Refer to the Nurses' Notes, Vital Signs, and Laboratory Results. Complete the following sentences by choosing from the lists of options.",
    template: "The client is most likely experiencing {0}. The findings that best support this are {1}. The client's most significant risk factor for this complication is {2}.",
    blanks: [
      { options: ["wound dehiscence", "an incisional surgical site infection", "postoperative hemorrhage", "a normal inflammatory response"], answer: 1 },
      { options: ["serous JP output and a passing of flatus", "a red, moist stoma and clear lungs", "localized erythema, purulent drainage, and fever", "a palpable ridge along the upper incision"], answer: 2 },
      { options: ["early ambulation on POD 1", "contaminated colon surgery with hyperglycemia", "use of a closed-suction wound drain", "closure of the incision with staples"], answer: 1 }
    ],
    rationale: "The combination of local signs (spreading erythema, induration, purulent foul drainage, increasing pain) and systemic signs (fever 38.6 °C, HR 108, WBC 15,800) on POD 4 points to an incisional SSI. Dehiscence would present with separation of edges and a gush of serosanguineous fluid, and hemorrhage with sanguineous drainage and falling BP/Hgb. Surgery for perforated bowel is a contaminated/dirty procedure, and hyperglycemia impairs neutrophil function, making these the strongest risks.",
    takeaway: "Perforated bowel surgery + poorly controlled glucose = high SSI risk; watch days 3–7.",
    hintContent: "Recall which exudate type signals infection and which surgical wound classes carry the highest infection rates.",
    hintStrategy: "Complete the first blank first; the second and third blanks must logically support the condition you chose. Eliminate options that describe normal findings."
  },
  {
    id: "m21f-004", type: "sata", topic: "wound-healing-complications", ref: REF_CASE,
    caseId: CASE_ID, caseOrder: 4, exhibit: caseExhibit1,
    difficulty: 2, clientNeed: "Safe and Effective Care Environment: Management of Care",
    cjmm: "Generate Solutions", focus: "Nursing Interventions",
    stem: "Refer to the Nurses' Notes, Vital Signs, and Laboratory Results. The nurse is planning care for the client. Which actions should the nurse include in the plan? Select all that apply.",
    options: [
      "Notify the surgeon of the incision findings using SBAR",
      "Remove the staples along the reddened segment to allow drainage",
      "Obtain a culture of the wound drainage as prescribed",
      "Apply antibiotic ointment and an occlusive dressing to seal the incision",
      "Implement correction-scale insulin per protocol to lower glucose",
      "Restrict oral fluids to reduce the volume of wound drainage",
      "Request a dietitian consult for protein and calorie supplementation"
    ],
    answer: [0, 2, 4, 6],
    optionRationales: [
      "Correct. New local and systemic signs of infection require prompt collaboration; the surgeon decides whether to open and drain the incision and which antibiotics to start.",
      "Incorrect. Opening an incision is a provider decision; the nurse does not independently remove staples from an infected incision.",
      "Correct. A culture identifies the organism and sensitivities so therapy can be targeted; obtain it before antibiotics are started when possible.",
      "Incorrect. Sealing an infected, draining wound traps exudate and bacteria and promotes abscess formation.",
      "Correct. Perioperative glucose should be kept below 200 mg/dL (CDC); hyperglycemia impairs neutrophil chemotaxis and phagocytosis.",
      "Incorrect. Adequate hydration supports perfusion and healing; fluids should not be restricted, especially with fever.",
      "Correct. Low albumin/prealbumin and 25% meal intake indicate a protein-calorie deficit that will slow collagen synthesis."
    ],
    rationale: "The plan should address the infection itself (collaborate with the surgeon, obtain cultures) and the modifiable factors that impair healing (hyperglycemia, malnutrition). Independent opening of the wound, occlusive sealing, and fluid restriction are unsafe.",
    takeaway: "Treat the infection AND fix the host: glucose control and protein intake are wound care too.",
    hintContent: "Recall which nursing actions are independent versus collaborative, and which host factors (glucose, protein) the nurse can influence.",
    hintStrategy: "Judge each option as true or false on its own. Eliminate options outside nursing scope or that would trap infection."
  },
  {
    id: "m21f-005", type: "mcq", topic: "wound-healing-intention-phases", ref: REF_CASE,
    caseId: CASE_ID, caseOrder: 5, exhibit: caseExhibit5,
    difficulty: 3, clientNeed: "Physiological Integrity: Basic Care and Comfort",
    cjmm: "Take Action", focus: "Nursing Interventions",
    stem: "Refer to the updated Nurses' Notes and Orders. The nurse prepares to perform the prescribed wound care. Which action should the nurse take when packing the wound?",
    options: [
      "Pack the gauze firmly to the level of the skin so it absorbs the most drainage",
      "Cut several small gauze squares so each one can be tucked into a separate area",
      "Loosely fill the base and undermined area with one moist, wrung-out gauze strip",
      "Saturate the gauze and extend it onto the periwound skin to keep the edges moist"
    ],
    answer: 2,
    optionRationales: [
      "Incorrect. Tight packing compresses capillaries in the wound bed, impairs perfusion to new granulation, and causes pain.",
      "Incorrect. Multiple small pieces are easily retained in the wound, becoming a foreign body and a source of infection; a single continuous strip is preferred and counted.",
      "Correct. Dead space, including the undermined area, is filled loosely with moistened (not dripping) gauze so the wound heals from the base up without trapping exudate or causing abscess formation.",
      "Incorrect. Wet gauze on intact periwound skin causes maceration; packing should stay within the wound margins."
    ],
    rationale: "A wound healing by secondary intention must fill in with granulation tissue from the bottom up. Packing loosely eliminates dead space (including undermining and tunnels) so the surface does not close over a pocket, keeps the bed moist, and wicks exudate. Packing must not be tight, must not overlap periwound skin, and should be a single strip so none is retained.",
    takeaway: "Pack loosely, fill all dead space, keep it in the wound, use one piece.",
    hintContent: "Recall why open wounds heal by secondary intention from the base upward and what happens when the surface closes over an unfilled pocket.",
    hintStrategy: "Look for the option that protects both the fragile granulation tissue in the wound and the intact skin around it."
  },
  {
    id: "m21f-006", type: "matrix", topic: "wound-healing-intention-phases", ref: REF_CASE,
    caseId: CASE_ID, caseOrder: 6, exhibit: caseExhibit6,
    difficulty: 3, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Evaluate Outcomes", focus: "Assessment Findings",
    stem: "Refer to the POD 9 Nurses' Notes, Vital Signs, and Glucose Log. For each finding, indicate whether it shows that the client's condition has improved or has not improved.",
    rows: [
      "Wound base is 90% beefy red, moist, granular tissue",
      "Periwound erythema has receded to 0.5 cm",
      "Temperature is 37.1 °C (98.8 °F) and HR is 82/min",
      "Capillary glucose readings range from 238 to 262 mg/dL",
      "Undermining measures 2.5 cm from 3 to 6 o'clock"
    ],
    columns: ["Improved", "Not improved"],
    answer: [0, 0, 0, 1, 1],
    optionRationales: [
      "Improved. Healthy granulation tissue replacing slough shows the proliferative phase is progressing.",
      "Improved. Receding erythema indicates the local infection is responding to drainage and antibiotics.",
      "Improved. Resolution of fever and tachycardia indicates the systemic inflammatory response is subsiding.",
      "Not improved. Glucose remains above the target of less than 200 mg/dL; persistent hyperglycemia will continue to impair healing, so the nurse should report it for regimen adjustment.",
      "Not improved. Undermining increased from 1.5 cm at 3–5 o'clock to 2.5 cm at 3–6 o'clock; a larger pocket indicates tissue breakdown and must be reported and packed."
    ],
    rationale: "Evaluating outcomes compares current data with baseline. Granulation, receding erythema, and normal vital signs show the infection is resolving. Persistent hyperglycemia and increasing undermining show two problems still need attention, so the plan must be revised rather than simply continued.",
    takeaway: "Evaluate each measurable finding against baseline; a wound can improve in one area and worsen in another.",
    hintContent: "Compare each POD 9 value with the POD 4–5 data and with the target values the team is aiming for (glucose, wound size).",
    hintStrategy: "Look back at the earlier exhibit for baseline measurements; 'improved' requires movement toward the goal, not just a normal-sounding description."
  },

  // ================= BOWTIES =================
  {
    id: "m21f-007", type: "bowtie", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Complications: Hemorrhage",
    difficulty: 3, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Take Action", focus: "Prioritization",
    exhibit: { tabs: [
      { title: "Nurses' Notes", html: "<p><strong>1400:</strong> 54-year-old client, 4 hours after open total abdominal hysterectomy. Abdominal dressing reinforced at 1300 for bright red drainage; now saturated again with bright red blood. Abdomen increasingly firm and distended. Client is restless and asks, “Is something wrong?” Skin pale, cool, and clammy. Urine output 20 mL/hr for the past 2 hours. Pain 5/10.</p>" },
      { title: "Vital Signs", table: { headers: ["Time", "T", "HR", "RR", "BP", "SpO₂"], rows: [
        ["1200", "36.6 °C (97.9 °F)", "84", "16", "128/76", "98% 2 L NC"],
        ["1300", "36.5 °C (97.7 °F)", "102", "20", "112/68", "97% 2 L NC"],
        ["1400", "36.4 °C (97.5 °F)", "124", "26", "88/54", "95% 2 L NC"]
      ] } },
      { title: "Laboratory Results", table: { headers: ["Test", "Preoperative", "1345", "Reference range"], rows: [
        ["Hemoglobin", "12.6 g/dL", "9.1 g/dL", "12–16 g/dL"],
        ["Hematocrit", "38%", "27%", "37–47%"],
        ["Platelets", "240,000/mm³", "210,000/mm³", "150,000–400,000/mm³"]
      ] } }
    ] },
    stem: "Refer to the Nurses' Notes, Vital Signs, and Laboratory Results. Complete the diagram by selecting the condition the client is most likely experiencing, 2 actions the nurse should take to address that condition, and 2 parameters the nurse should monitor to assess the client's progress.",
    condition: { options: ["Septic shock from surgical site infection", "Hypovolemic shock from postoperative hemorrhage", "Wound dehiscence", "Pulmonary embolism"], answer: 1 },
    actions: { options: [
      "Remove the saturated dressing to inspect the incision",
      "Notify the surgeon immediately of suspected hemorrhage",
      "Place the client in high Fowler's position",
      "Increase IV fluids per protocol and prepare to give blood products",
      "Administer the prescribed PRN morphine for restlessness"
    ], answer: [1, 3] },
    parameters: { options: [
      "Temperature every 4 hours",
      "Heart rate and blood pressure trends",
      "Bowel sounds in all four quadrants",
      "Serial hemoglobin and hematocrit",
      "Wound culture results"
    ], answer: [1, 3] },
    optionRationales: {
      condition: [
        "Incorrect. Sepsis would not develop 4 hours after surgery and would typically include fever; this client is afebrile with active sanguineous drainage.",
        "Correct. Bright red saturated dressing, distention, tachycardia, hypotension, oliguria, cool clammy skin, and a 3.5 g/dL Hgb drop within the first 48 hours indicate hemorrhage with hypovolemic shock.",
        "Incorrect. Dehiscence usually occurs POD 5–8 with a gush of serosanguineous fluid, not active bleeding on the day of surgery.",
        "Incorrect. PE causes sudden dyspnea, chest pain, and hypoxemia; SpO₂ is maintained and bleeding explains the findings."
      ],
      actions: [
        "Incorrect. Removing the dressing can dislodge clots and increase bleeding; the nurse reinforces and applies pressure over external bleeding instead.",
        "Correct. Postoperative hemorrhage with shock often requires return to surgery; the surgeon must be notified immediately.",
        "Incorrect. High Fowler's worsens venous return and hypotension; the client should be flat with legs elevated per protocol if tolerated.",
        "Correct. Restoring circulating volume with IV fluid and blood products treats hypovolemic shock.",
        "Incorrect. Restlessness is a sign of cerebral hypoperfusion; opioids can worsen hypotension and mask deterioration."
      ],
      parameters: [
        "Incorrect. Temperature does not reflect volume status or ongoing blood loss.",
        "Correct. Falling HR and rising BP indicate successful volume resuscitation; continuing tachycardia/hypotension indicates ongoing bleeding.",
        "Incorrect. Bowel sounds do not measure perfusion or blood loss.",
        "Correct. Serial Hgb/Hct show whether bleeding has stopped and whether transfusion is adequate.",
        "Incorrect. A culture evaluates infection, which is not the current problem."
      ]
    },
    rationale: "The greatest risk for postoperative hemorrhage is the first 48 hours. This client has external (saturated dressings) and likely internal (distention) bleeding with signs of hypovolemic shock. The nurse notifies the surgeon immediately and supports volume while monitoring hemodynamics and serial Hgb/Hct.",
    takeaway: "Day-of-surgery bright red drainage + rising HR + falling BP = hemorrhage; call the surgeon and restore volume.",
    hintContent: "Recall the timing of each postoperative wound complication and the compensatory signs of volume loss (tachycardia, restlessness, oliguria, cool skin).",
    hintStrategy: "Choose the condition first; the actions must treat THAT condition and the parameters must show whether it is resolving."
  },
  {
    id: "m21f-008", type: "bowtie", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Complications: Dehiscence",
    difficulty: 3, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Generate Solutions", focus: "Nursing Interventions",
    exhibit: { tabs: [
      { title: "Nurses' Notes", html: "<p><strong>POD 6, 1030:</strong> 47-year-old client after exploratory laparotomy with small-bowel resection for Crohn disease. Takes prednisone 10 mg daily. While straining on the bedpan, client felt a “pulling, giving-way” sensation at the incision. Abdominal dressing saturated with a large amount of pink, watery drainage. On inspection, a 6-cm segment of the midline incision is separated with subcutaneous tissue and fascia visible; no bowel is visible. Client is anxious. Pain 6/10.</p>" },
      { title: "Vital Signs", table: { headers: ["Time", "T", "HR", "RR", "BP", "SpO₂"], rows: [
        ["0800", "37.3 °C (99.1 °F)", "88", "18", "118/72", "97% RA"],
        ["1030", "37.4 °C (99.3 °F)", "104", "22", "122/76", "97% RA"]
      ] } },
      { title: "Laboratory Results", table: { headers: ["Test", "Result", "Reference range"], rows: [
        ["Albumin", "2.6 g/dL", "3.5–5.0 g/dL"],
        ["WBC", "9,400/mm³", "5,000–10,000/mm³"],
        ["Hemoglobin", "11.9 g/dL", "12–16 g/dL"]
      ] } }
    ] },
    stem: "Refer to the Nurses' Notes, Vital Signs, and Laboratory Results. Complete the diagram by selecting the condition the client is most likely experiencing, 2 actions the nurse should take to address that condition, and 2 parameters the nurse should monitor to assess the client's progress.",
    condition: { options: ["Evisceration", "Surgical site infection", "Wound dehiscence", "Postoperative hemorrhage"], answer: 2 },
    actions: { options: [
      "Apply adhesive closure strips to pull the edges together",
      "Position the client in low Fowler's with the knees flexed",
      "Ask the client to cough so the separation can be assessed",
      "Cover the incision with a sterile, saline-moistened dressing",
      "Apply a warm compress to relax the abdominal muscles"
    ], answer: [1, 3] },
    parameters: { options: [
      "Wound for protrusion of abdominal contents",
      "Deep tendon reflexes",
      "Heart rate and blood pressure",
      "Pupil size and reactivity",
      "Serum potassium level"
    ], answer: [0, 2] },
    optionRationales: {
      condition: [
        "Incorrect. Evisceration requires protrusion of abdominal organs through the wound; no bowel is visible.",
        "Incorrect. There is no purulent drainage, fever, or leukocytosis; the key finding is separation of the wound layers.",
        "Correct. A 'giving-way' sensation after straining, a gush of serosanguineous fluid on POD 5–8, and separated layers without organ protrusion define dehiscence. Corticosteroids and hypoalbuminemia are major risk factors.",
        "Incorrect. The drainage is pink and watery, not bright red, and hemoglobin is stable."
      ],
      actions: [
        "Incorrect. The nurse does not attempt to reapproximate a dehisced fascial wound; the surgeon determines closure.",
        "Correct. Low Fowler's with the knees flexed relaxes the abdominal muscles and reduces tension on the incision.",
        "Incorrect. Coughing raises intra-abdominal pressure and can convert dehiscence to evisceration.",
        "Correct. A sterile, normal-saline-moistened dressing protects exposed tissue from drying and contamination until the surgeon evaluates it.",
        "Incorrect. Heat is not indicated and a non-sterile compress contaminates an open wound."
      ],
      parameters: [
        "Correct. The nurse monitors for progression to evisceration, which is a surgical emergency.",
        "Incorrect. Reflexes are unrelated to wound disruption.",
        "Correct. Tachycardia and hypotension can signal shock or worsening condition, especially if evisceration occurs.",
        "Incorrect. Pupil assessment evaluates neurologic status, not abdominal wound integrity.",
        "Incorrect. Potassium is not a direct indicator of dehiscence progression."
      ]
    },
    rationale: "Dehiscence is partial or total separation of wound layers, most common on POD 5–8 in abdominal wounds, and is promoted by obesity, malnutrition (low albumin), corticosteroids, infection, and increased intra-abdominal pressure (straining, coughing). The nurse stays with the client, positions in low Fowler's with knees flexed, covers the wound with sterile saline-moistened dressings, keeps the client NPO, notifies the surgeon, and monitors for evisceration and shock.",
    takeaway: "Dehiscence: knees up, sterile moist cover, stay, call the surgeon; watch for evisceration.",
    hintContent: "Recall the difference between dehiscence and evisceration and which positions reduce tension on an abdominal incision.",
    hintStrategy: "Select the condition that matches exactly what is visible in the wound. Then eliminate actions that raise intra-abdominal pressure or are outside nursing scope."
  },

  // ================= HIGHLIGHTS =================
  {
    id: "m21f-009", type: "highlight", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Factors Affecting Healing",
    difficulty: 2, clientNeed: "Physiological Integrity: Reduction of Risk Potential",
    cjmm: "Recognize Cues", focus: "Assessment Findings",
    stem: "The nurse is completing a preoperative history for a 74-year-old client scheduled for an elective total hip arthroplasty. Click to highlight the findings that increase the client's risk for delayed wound healing.",
    passage: "The client {{takes prednisone 7.5 mg daily}} for polymyalgia rheumatica and {{receives methotrexate once weekly}}. The client {{walks 2 miles most mornings}} and {{smokes 10 cigarettes a day}}. Since the death of a spouse 3 months ago, the client {{eats mostly toast and tea}}. BMI is {{22 kg/m²}}, and HbA1c is {{5.4%}}. The client {{takes a vitamin D supplement daily}}.",
    answer: [0, 1, 3, 4],
    optionRationales: [
      "Highlight. Corticosteroids suppress the inflammatory phase, fibroblast activity, and collagen synthesis, and increase infection risk.",
      "Highlight. Methotrexate is an antimetabolite/immunosuppressant that impairs cell proliferation and immune response.",
      "Do not highlight. Regular exercise improves circulation and oxygen delivery, which supports healing.",
      "Highlight. Nicotine vasoconstricts and carbon monoxide binds hemoglobin, reducing tissue oxygenation.",
      "Highlight. A diet of toast and tea is deficient in protein, vitamin C, zinc, and calories needed for collagen formation.",
      "Do not highlight. A BMI of 22 is within the healthy range.",
      "Do not highlight. An HbA1c of 5.4% is normal and does not suggest hyperglycemia.",
      "Do not highlight. Vitamin D supplementation does not impair healing."
    ],
    rationale: "Delayed healing is promoted by medications that suppress inflammation or cell division (steroids, chemotherapy/immunosuppressants), smoking, and malnutrition. Grief-related poor intake in an older adult is an easily missed risk. Healthy weight, normal glycemic control, and exercise are protective.",
    takeaway: "Steroids, immunosuppressants, smoking, and poor nutrition each slow healing; screen for all before surgery.",
    hintContent: "Recall how corticosteroids, chemotherapy agents, nicotine, and protein/vitamin deficits affect each phase of healing.",
    hintStrategy: "Consider each segment separately; some findings are normal values included to test whether you recognize them as protective."
  },
  {
    id: "m21f-010", type: "highlight", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Drains & Exudate",
    difficulty: 2, clientNeed: "Health Promotion and Maintenance",
    cjmm: "Evaluate Outcomes", focus: "Client Teaching",
    stem: "The nurse has taught a client being discharged after a mastectomy how to care for a Jackson-Pratt (JP) drain at home. Click to highlight the client statements that indicate a need for further teaching.",
    passage: "“{{I will empty the bulb when it is about half full}}. {{I will squeeze the bulb flat before I put the plug back in}}. {{When I shower, I will let the bulb hang loose from the tubing}}. {{I will write down the amount and color each time I empty it}}. {{If the bulb stays puffed up, that means it is working well}}. {{I will call the surgeon if the drainage gets cloudy or smells bad}}. {{I can soak in the bathtub while the drain is in}}. {{I will wash my hands before and after I touch the drain}}.”",
    answer: [2, 4, 6],
    optionRationales: [
      "Correct statement. Emptying at about half full maintains suction and prevents the weight of the bulb from pulling on the tubing.",
      "Correct statement. Compressing the bulb before closing the port re-establishes negative pressure.",
      "Needs teaching. The bulb should be secured (pinned to clothing or a lanyard) so its weight does not pull on the drain and dislodge it.",
      "Correct statement. Recording the amount and character of drainage tells the surgeon when the drain can be removed.",
      "Needs teaching. A fully expanded bulb has lost suction; the client should empty and re-compress it and call if it will not stay compressed.",
      "Correct statement. Cloudy or foul-smelling drainage suggests infection and should be reported.",
      "Needs teaching. Soaking in a tub is generally avoided while a drain is in place because it increases infection risk; follow the surgeon's showering instructions.",
      "Correct statement. Hand hygiene reduces the risk of introducing bacteria into the drain site."
    ],
    rationale: "A JP drain is a closed-suction device. Suction is maintained only when the bulb is compressed, so an expanded bulb means it is not working. The bulb must be secured to prevent dislodgement, and immersion in water is avoided until the surgeon allows it. Recording output and reporting signs of infection are key self-care skills.",
    takeaway: "JP drain: compressed bulb = suction; secure it, measure it, and do not soak it.",
    hintContent: "Recall how a closed-suction drain creates negative pressure and what can pull a drain out of the wound.",
    hintStrategy: "This is a 'needs further teaching' item: highlight the INCORRECT statements, not the correct ones."
  },
  {
    id: "m21f-011", type: "highlight", topic: "wound-healing-intention-phases",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Wound Assessment",
    difficulty: 3, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Recognize Cues", focus: "Assessment Findings",
    stem: "A client has an open abdominal wound that has been healing by secondary intention for 3 weeks after dehiscence. The nurse reviews today's weekly wound assessment. Click to highlight the findings that require follow-up with the provider.",
    passage: "Wound measures {{4.2 × 3.1 × 1.8 cm, up from 3.5 × 2.6 × 1.2 cm last week}}. Base is {{80% red, moist, granular tissue}} with {{new yellow slough covering 20% of the base}}. {{Wound edges are attached and flush with the base}}. {{Periwound skin is intact without erythema}}. There is a {{moderate amount of greenish drainage with a sweet, grape-like odor}}. Client {{rates pain at dressing changes as 2/10, unchanged}}. Temperature {{37.0 °C (98.6 °F)}}.",
    answer: [0, 2, 5],
    optionRationales: [
      "Highlight. A wound healing by secondary intention should shrink each week; an increase in all dimensions indicates deterioration.",
      "Do not highlight. Red, moist, granular tissue is healthy granulation and expected in the proliferative phase.",
      "Highlight. New slough (devitalized tissue) indicates a setback and may harbor bacteria; it requires debridement planning.",
      "Do not highlight. Attached edges without rolling (epibole) or undermining support healing.",
      "Do not highlight. Intact periwound skin without erythema is expected.",
      "Highlight. Green drainage with a sweet or grape-like odor is characteristic of Pseudomonas aeruginosa infection and needs culture and treatment.",
      "Do not highlight. Stable, low pain is reassuring.",
      "Do not highlight. A normal temperature does not rule out local infection, but it is not an abnormal finding itself."
    ],
    rationale: "Chronic or secondary-intention wounds are evaluated by trends: size should decrease, granulation should increase, and exudate should decrease and remain non-purulent. Enlarging size, new slough, and green, sweet-smelling drainage signal a stalled wound with probable Pseudomonas infection, even when the client is afebrile.",
    takeaway: "Measure weekly; a wound that is getting bigger or develops new slough or green drainage is not healing.",
    hintContent: "Recall which tissue colors (red, yellow, black) mean protect, cleanse, or debride, and which organism is associated with green, sweet-smelling exudate.",
    hintStrategy: "Compare each finding with last week's and with what healthy secondary-intention healing looks like. Older clients and immunosuppressed clients may not mount a fever."
  },

  // ================= STAND-ALONE: INTENTION & PHASES =================
  {
    id: "m21f-012", type: "mcq", topic: "wound-healing-intention-phases",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Types of Healing",
    difficulty: 1, clientNeed: "Health Promotion and Maintenance",
    cjmm: "Take Action", focus: "Client Teaching",
    stem: "A 24-year-old client had a pilonidal cyst excised, and the surgeon left the wound open with packing. The client asks, “Why didn't they just stitch it closed? Now it will take forever to heal.” Which response by the nurse is best?",
    options: [
      "“Leaving it open lets it fill in from the bottom so infection is not trapped under the skin.”",
      "“The surgeon ran out of time and will close the wound at your next appointment.”",
      "“Open wounds heal faster than stitched wounds because air dries the tissue.”",
      "“Stitches would leave a larger scar, so the wound is being left open mainly for cosmetic reasons.”"
    ],
    answer: 0,
    optionRationales: [
      "Correct. Wounds with tissue loss or contamination heal by secondary intention: granulation tissue fills from the base up, preventing abscess formation beneath a closed surface.",
      "Incorrect. This is inaccurate and misleading; the open wound is intentional. (Delayed closure, tertiary intention, is a different, planned approach.)",
      "Incorrect. Secondary intention takes longer, and moist—not dry—wound beds heal best.",
      "Incorrect. Secondary intention produces MORE scarring than primary closure."
    ],
    rationale: "Primary intention closes clean wounds with approximated edges and minimal scarring. Contaminated wounds or those with tissue loss are left open to heal by secondary intention—slower, with more granulation and scarring, but with less risk of trapping infection beneath the skin.",
    takeaway: "Secondary intention = open, fills from the bottom, slower, more scarring, less trapped infection.",
    hintContent: "Recall why contaminated or cavity wounds are not closed primarily and how secondary-intention wounds fill in.",
    hintStrategy: "Choose the answer that is both accurate and addresses the client's concern; eliminate statements that are factually wrong about healing speed or scarring."
  },
  {
    id: "m21f-013", type: "sata", topic: "wound-healing-intention-phases",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Phases of Healing",
    difficulty: 2, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Evaluate Outcomes", focus: "Assessment Findings",
    stem: "A client has a full-thickness leg wound that is healing by secondary intention. On day 14, which findings indicate the wound is progressing through the proliferative phase as expected? Select all that apply.",
    options: [
      "Beefy red, moist, bumpy tissue in the wound bed",
      "Pale pink, smooth, dry tissue in the wound bed",
      "Scant bleeding when the tissue is gently touched",
      "Thin pink rim of new tissue at the wound margins",
      "Increasing amount of thick, yellow exudate",
      "Wound depth decreased from 2 cm to 1.2 cm"
    ],
    answer: [0, 2, 3, 5],
    optionRationales: [
      "Correct. Healthy granulation tissue is beefy red, moist, and granular because of new capillary loops.",
      "Incorrect. Pale, smooth, or dry tissue suggests poor perfusion or a stalled wound.",
      "Correct. Granulation tissue is fragile and bleeds easily; minimal bleeding with gentle contact is expected.",
      "Correct. Epithelial cells migrate inward from the margins, appearing as a thin pink rim.",
      "Incorrect. Increasing thick, yellow exudate suggests infection, not normal proliferation.",
      "Correct. Contraction and granulation fill the defect, so depth decreases over time."
    ],
    rationale: "During the proliferative phase (about days 3–21), fibroblasts lay down collagen, capillaries form granulation tissue that is red and bleeds easily, the wound contracts, and epithelial cells migrate from the edges. Pale tissue and increasing purulent exudate indicate impaired healing.",
    takeaway: "Healthy granulation is red, moist, bumpy, and a little bloody; pale or purulent is a problem.",
    hintContent: "Recall what fibroblasts, new capillaries, and epithelial cells produce during proliferation and how each looks at the bedside.",
    hintStrategy: "Treat each option as true/false: is this what normal granulation and epithelialization look like?"
  },
  {
    id: "m21f-014", type: "mcq", topic: "wound-healing-intention-phases",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Phases of Healing",
    difficulty: 3, clientNeed: "Physiological Integrity: Reduction of Risk Potential",
    cjmm: "Analyze Cues", focus: "Pathophysiology",
    stem: "A client with a BMI of 41 is on postoperative day 9 after an open ventral hernia repair. The incision is closed with staples, the edges are approximated, and there is no drainage. The nurse palpates along the incision and cannot feel a firm ridge beneath it. What is the most accurate interpretation?",
    options: [
      "The incision is healing normally because the edges remain approximated.",
      "Collagen deposition is inadequate, placing the client at risk for dehiscence.",
      "The absence of a ridge indicates that the client has a deep incisional infection.",
      "The incision has entered the maturation phase and remodeling is complete."
    ],
    answer: 1,
    optionRationales: [
      "Incorrect. Approximated skin edges do not guarantee strength in the deeper layers; the healing ridge reflects underlying collagen.",
      "Correct. A palpable healing ridge (induration from new collagen) is expected by about POD 5–9. Its absence suggests poor collagen synthesis and increased risk of wound separation.",
      "Incorrect. Infection presents with erythema, warmth, pain, and drainage, none of which are described.",
      "Incorrect. Maturation begins about day 21 and continues for 1–2 years; remodeling is far from complete on POD 9."
    ],
    rationale: "In primary-intention healing, collagen laid down during the proliferative phase forms a palpable healing ridge between about days 5 and 9. A missing ridge in a client with obesity (poorly vascularized adipose tissue, increased tension) signals weak healing and possible dehiscence; the nurse reports it and reinforces splinting and avoiding strain.",
    takeaway: "No healing ridge by POD 9 = weak collagen = dehiscence risk.",
    hintContent: "Recall what the healing ridge represents and when during the proliferative phase it should appear.",
    hintStrategy: "Look past the reassuring skin appearance. Ask what the missing finding tells you about the deeper layers."
  },
  {
    id: "m21f-015", type: "dropdown", topic: "wound-healing-intention-phases",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Phases of Healing",
    difficulty: 2, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Analyze Cues", focus: "Pathophysiology",
    stem: "A client has an open hand wound from a dog bite that was irrigated and left open. On day 8, the wound bed is filling with red, moist tissue, and the edges are beginning to contract. Complete the following sentences by choosing from the lists of options.",
    template: "The wound is in the {0} phase of healing. The red tissue is produced mainly by {1} and new capillaries. To protect this tissue, the nurse should {2}.",
    blanks: [
      { options: ["inflammatory", "proliferative", "maturation", "hemostasis"], answer: 1 },
      { options: ["neutrophils", "platelets", "fibroblasts", "mast cells"], answer: 2 },
      { options: ["apply a moist, nonadherent dressing", "allow the wound bed to air-dry", "scrub the bed with povidone-iodine", "apply a wet-to-dry gauze dressing"], answer: 0 }
    ],
    rationale: "Days 3–21 are the proliferative phase: fibroblasts synthesize collagen and, with new capillaries (angiogenesis), form granulation tissue while the wound contracts. Granulation tissue is fragile, so it is protected with a moist, nonadherent dressing. Drying, cytotoxic antiseptics, and wet-to-dry dressings (nonselective debridement) damage healthy granulation.",
    takeaway: "Red granulation = proliferative phase = protect it with moist, nonadherent coverage.",
    hintContent: "Recall the timeline and key cell of each phase, and the 'red = protect' principle of the RYB wound color guide.",
    hintStrategy: "Answer the phase first using the day number; the cell type and nursing action must fit that phase."
  },
  {
    id: "m21f-016", type: "mcq", topic: "wound-healing-intention-phases",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Lifespan & Diversity",
    difficulty: 2, clientNeed: "Health Promotion and Maintenance",
    cjmm: "Generate Solutions", focus: "Lifespan & Diversity",
    stem: "A 19-year-old client of African descent had a thick, raised, shiny scar form on the earlobe after a piercing; the scar now extends well beyond the original piercing site. The client is scheduled for a laparoscopic cholecystectomy and asks about scarring. Which response by the nurse is most appropriate?",
    options: [
      "“Your scar is a normal hypertrophic scar and will flatten on its own within a few months.”",
      "“Scar tissue only forms like that on earlobes, so your abdominal incisions will not be affected.”",
      "“Tell your surgeon about this scar; you may be prone to keloids, and prevention can be planned.”",
      "“That scar formed because the piercing was infected, so it will not happen with a sterile incision.”"
    ],
    answer: 2,
    optionRationales: [
      "Incorrect. A scar that grows beyond the original wound margins is a keloid, not a hypertrophic scar; keloids do not regress on their own.",
      "Incorrect. Keloids can form on any site, commonly the earlobes, chest, shoulders, and upper back.",
      "Correct. Keloid formation reflects excessive collagen deposition during maturation, occurs more often in people with darker skin, and tends to recur; the surgeon can plan preventive measures such as tension reduction, silicone, or steroid therapy.",
      "Incorrect. Keloids are related to genetic predisposition and abnormal collagen deposition, not only to infection."
    ],
    rationale: "During maturation (day 21 to 1–2 years), collagen remodels. Overproduction produces hypertrophic scars (confined to the wound) or keloids (extending beyond the original margins). Keloids are more common in clients of African, Asian, and Hispanic descent and in younger adults, so a history of keloids is important preoperative information.",
    takeaway: "A scar that grows beyond the wound = keloid; report the history before any surgery.",
    hintContent: "Recall how hypertrophic scars and keloids differ and which populations are at higher risk for keloids.",
    hintStrategy: "The best answer both identifies the finding correctly and leads to an action that helps the client, rather than offering false reassurance."
  },
  {
    id: "m21f-017", type: "matrix", topic: "wound-healing-intention-phases",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Lifespan Considerations",
    difficulty: 2, clientNeed: "Health Promotion and Maintenance",
    cjmm: "Analyze Cues", focus: "Lifespan & Diversity",
    stem: "An 86-year-old client is on postoperative day 5 after an open reduction and internal fixation of the ankle. For each finding, indicate whether it is an expected age-related change in wound healing or requires follow-up.",
    rows: [
      "Epithelialization of the incision is slower than in younger clients",
      "Incision edges are slightly less indurated than expected for POD 5",
      "New-onset confusion and a temperature of 37.6 °C (99.7 °F)",
      "Skin tear on the forearm after being moved with a draw sheet",
      "Thin, fragile skin around the incision that bruises easily"
    ],
    columns: ["Expected age-related change", "Requires follow-up"],
    answer: [0, 0, 1, 1, 0],
    optionRationales: [
      "Expected. Older adults have slower epidermal turnover and delayed epithelial migration.",
      "Expected. A diminished inflammatory response is common with aging, so redness and induration may be less pronounced.",
      "Follow-up. Older adults often have blunted fever responses; new confusion with even a low-grade temperature can be the first sign of infection.",
      "Follow-up. A skin tear is an injury that needs assessment, treatment, and review of handling technique.",
      "Expected. Dermal thinning and capillary fragility are normal aging changes, though they require gentle handling."
    ],
    rationale: "Aging slows every phase of healing: inflammation is blunted, collagen synthesis and epithelialization are slower, and the skin is thinner. Because the classic signs of infection may be muted, subtle changes such as new confusion or a low-grade fever require follow-up, as does any new injury.",
    takeaway: "In older adults, expect slower, quieter healing, and treat new confusion as a possible infection cue.",
    hintContent: "Recall how aging affects the inflammatory response, epidermal turnover, and the presentation of infection.",
    hintStrategy: "Ask whether each finding is simply 'slower or thinner' (aging) or a new problem or injury (follow-up)."
  },
  {
    id: "m21f-018", type: "order", topic: "wound-healing-intention-phases",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Wound Care",
    difficulty: 2, clientNeed: "Physiological Integrity: Basic Care and Comfort",
    cjmm: "Take Action", focus: "Nursing Interventions",
    stem: "The nurse is prescribed to irrigate a client's open, granulating abdominal wound with normal saline and apply a moist dressing. Place the steps in the order the nurse should perform them.",
    options: [
      "Perform hand hygiene and put on gloves, a gown, and a face shield",
      "Remove the old dressing and assess the wound and drainage",
      "Change gloves and irrigate with a 35-mL syringe and 19-gauge catheter from the cleaner to the dirtier area",
      "Pat the periwound skin dry with sterile gauze",
      "Apply the prescribed moist dressing and a secondary cover"
    ],
    rationale: "The nurse protects against splash with PPE before exposure, removes and assesses the old dressing (drainage amount, color, odor), then changes gloves and irrigates. A 35-mL syringe with a 19-gauge catheter delivers about 8 psi, within the safe range of 4–15 psi that removes debris without damaging granulation. Irrigating from clean to dirty prevents moving contaminants into the cleaner areas. Drying intact periwound skin prevents maceration before the new dressing is applied.",
    takeaway: "PPE → remove/assess → irrigate clean to dirty at 4–15 psi → dry periwound → dress.",
    hintContent: "Recall the safe irrigation pressure range and the principle of cleansing from least to most contaminated.",
    hintStrategy: "Sequence by exposure risk and asepsis: protect yourself first, assess before treating, and finish with the step that must occur last."
  },
  {
    id: "m21f-019", type: "mcq", topic: "wound-healing-intention-phases",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Primary Intention",
    difficulty: 2, clientNeed: "Physiological Integrity: Reduction of Risk Potential",
    cjmm: "Take Action", focus: "Nursing Interventions",
    stem: "The nurse is removing skin staples from a client's abdominal incision on postoperative day 10 as prescribed. After removing every other staple, the nurse notes that the lower 2 cm of the incision edges are beginning to gap. Which action should the nurse take?",
    options: [
      "Remove the remaining staples and apply a pressure dressing",
      "Squeeze the separated edges together and cover them with a transparent film",
      "Continue removing staples and document the finding afterward",
      "Stop removing staples, leave the rest in place, and notify the provider"
    ],
    answer: 3,
    optionRationales: [
      "Incorrect. Removing more staples would allow further separation.",
      "Incorrect. Manual approximation and a transparent film do not provide tensile support and are not the appropriate response.",
      "Incorrect. Continuing ignores a sign that the wound lacks adequate strength.",
      "Correct. Gapping indicates insufficient tensile strength; the nurse stops, leaves the remaining staples, and notifies the provider, who may order adhesive closure strips or delay removal."
    ],
    rationale: "Staples are removed alternately so the nurse can check wound integrity before removing the rest. If edges separate, the wound is not strong enough; stopping and reporting prevents dehiscence.",
    takeaway: "Remove every other staple first; if edges gap, stop and notify.",
    hintContent: "Recall why alternate staples are removed first and what separation indicates about tensile strength.",
    hintStrategy: "Choose the option that prevents further harm and involves the provider; eliminate options that continue the procedure."
  },

  // ================= STAND-ALONE: FACTORS & EXUDATE =================
  {
    id: "m21f-020", type: "mcq", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Factors Affecting Healing",
    difficulty: 3, clientNeed: "Physiological Integrity: Reduction of Risk Potential",
    cjmm: "Prioritize Hypotheses", focus: "Prioritization",
    stem: "The nurse is reviewing four clients who each had abdominal surgery 2 days ago. Which client is at greatest risk for delayed wound healing?",
    options: [
      "A 45-year-old with hypertension controlled with lisinopril who walks the halls 4 times daily",
      "A 58-year-old with type 2 diabetes, glucose 284 mg/dL, who smokes and eats 30% of meals",
      "A 70-year-old with osteoarthritis who takes acetaminophen and eats 75% of meals",
      "A 34-year-old with a BMI of 29 who reports social alcohol use on weekends"
    ],
    answer: 1,
    optionRationales: [
      "Incorrect. Controlled hypertension and early ambulation pose little risk; activity improves circulation.",
      "Correct. Hyperglycemia impairs neutrophil function and microcirculation, smoking reduces tissue oxygenation, and poor intake limits protein for collagen—three compounding risk factors.",
      "Incorrect. Age is a risk factor, but acetaminophen does not impair healing and intake is adequate.",
      "Incorrect. Mild overweight and occasional alcohol use carry lower risk than multiple uncontrolled factors."
    ],
    rationale: "Risk for delayed healing is cumulative. Uncontrolled hyperglycemia, smoking, and malnutrition each reduce oxygen delivery, immune function, or collagen synthesis, so a client with all three is at greatest risk.",
    takeaway: "Stacked risk factors (glucose + smoking + poor intake) outweigh a single mild one.",
    hintContent: "Recall how glucose, nicotine, and protein intake each affect the inflammatory and proliferative phases.",
    hintStrategy: "Count and weigh the risk factors in each option; the key is the client whose factors are both multiple and uncontrolled."
  },
  {
    id: "m21f-021", type: "mcq", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Medications & Healing",
    difficulty: 3, clientNeed: "Physiological Integrity: Pharmacological and Parenteral Therapies",
    cjmm: "Generate Solutions", focus: "Pharmacology",
    stem: "A client with severe asthma who has taken prednisone 20 mg daily for 6 months has a leg laceration that shows almost no inflammation or granulation after 2 weeks. The provider cannot safely stop the steroid. Which prescription should the nurse anticipate to help counteract the effect of the steroid on healing?",
    options: [
      "Oral vitamin A supplementation for a limited course",
      "Daily aspirin to improve blood flow to the wound",
      "Doubling the prednisone dose to reduce swelling",
      "Topical povidone-iodine applied to the wound bed daily"
    ],
    answer: 0,
    optionRationales: [
      "Correct. Vitamin A stimulates the inflammatory phase, epithelialization, and collagen synthesis and has been shown to counteract steroid-induced impairment of healing.",
      "Incorrect. Aspirin and NSAIDs can impair platelet function and the inflammatory response, further delaying healing.",
      "Incorrect. Higher steroid doses would further suppress inflammation and collagen formation.",
      "Incorrect. Povidone-iodine is cytotoxic to fibroblasts and granulation tissue when used on a clean wound."
    ],
    rationale: "Corticosteroids suppress the inflammatory phase, macrophage activity, fibroblast proliferation, and collagen synthesis. When steroids cannot be stopped, short-term vitamin A supplementation is commonly used to restore the inflammatory response. Aspirin, chemotherapy, and long-term steroids all impair healing.",
    takeaway: "Steroids blunt healing; vitamin A helps counteract them.",
    hintContent: "Recall which vitamin supports the inflammatory phase and epithelialization and which medications impair healing.",
    hintStrategy: "Eliminate options that would further suppress inflammation or damage healthy tissue."
  },
  {
    id: "m21f-022", type: "sata", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Nutrition",
    difficulty: 2, clientNeed: "Physiological Integrity: Basic Care and Comfort",
    cjmm: "Generate Solutions", focus: "Client Teaching",
    stem: "A 70-kg client with an open surgical wound healing by secondary intention has a prealbumin of 13 mg/dL. The client has no renal disease. Which recommendations should the nurse include in nutrition teaching? Select all that apply.",
    options: [
      "Eat about 90–105 g of protein daily from foods such as eggs, fish, and beans",
      "Include citrus fruits, strawberries, and peppers for vitamin C",
      "Limit fluids to 1,000 mL/day to reduce wound drainage",
      "Choose zinc-rich foods such as meat, shellfish, and whole grains",
      "Reduce total calories so the body uses fat stores for healing",
      "Drink high-protein supplements between meals if appetite is poor"
    ],
    answer: [0, 1, 3, 5],
    optionRationales: [
      "Correct. Clients with wounds need about 1.25–1.5 g/kg/day of protein (≈ 88–105 g for 70 kg) for collagen synthesis and immune function.",
      "Correct. Vitamin C is a cofactor for collagen cross-linking; deficiency weakens wounds.",
      "Incorrect. Adequate hydration (about 30 mL/kg/day unless contraindicated) is needed for perfusion and a moist wound bed.",
      "Correct. Zinc supports cell proliferation and epithelialization.",
      "Incorrect. Inadequate calories cause the body to break down protein for energy, depriving the wound.",
      "Correct. Supplements between meals increase protein and calorie intake without replacing meals."
    ],
    rationale: "Healing requires increased protein, calories, and fluid, plus vitamins A and C, zinc, iron, and copper. Low prealbumin suggests inadequate protein status. Restricting fluids or calories works against healing.",
    takeaway: "Wounds need protein (1.25–1.5 g/kg), calories, fluid, vitamin C, and zinc.",
    hintContent: "Recall the nutrients the slide lists for wound healing and the approximate protein requirement per kilogram.",
    hintStrategy: "Evaluate each option independently; eliminate recommendations that would reduce the building blocks or fluid the wound needs."
  },
  {
    id: "m21f-023", type: "mcq", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Health Promotion",
    difficulty: 2, clientNeed: "Health Promotion and Maintenance",
    cjmm: "Evaluate Outcomes", focus: "Client Teaching",
    stem: "The nurse has taught a client who smokes about the effects of smoking on healing of a foot wound. Which statement by the client indicates a need for further teaching?",
    options: [
      "“Smoking narrows my blood vessels, so less oxygen and nutrients reach my wound.”",
      "“The carbon monoxide in smoke takes the place of oxygen on my red blood cells.”",
      "“I can ask my provider about nicotine replacement and a quit-smoking program.”",
      "“Switching to vaping will protect my wound because there is no smoke involved.”"
    ],
    answer: 3,
    optionRationales: [
      "Incorrect (accurate statement). Nicotine causes vasoconstriction and reduces perfusion.",
      "Incorrect (accurate statement). Carbon monoxide binds hemoglobin and lowers oxygen delivery to tissues.",
      "Incorrect (accurate statement). Referral to cessation resources is appropriate; the provider can weigh the risks of nicotine replacement.",
      "Correct (needs teaching). E-cigarettes still deliver nicotine, which causes vasoconstriction and impairs healing."
    ],
    rationale: "Smoking impairs healing through nicotine-induced vasoconstriction, carbon monoxide binding to hemoglobin, and impaired immune function. Nicotine from any source, including vaping, causes vasoconstriction, so a vaping switch does not remove the risk.",
    takeaway: "It is the nicotine, not just the smoke: vaping still constricts vessels.",
    hintContent: "Recall the two main mechanisms by which smoking reduces oxygen delivery to a wound.",
    hintStrategy: "This is a 'needs further teaching' item: look for the INCORRECT client belief."
  },
  {
    id: "m21f-024", type: "dropdown", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Exudate",
    difficulty: 2, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Analyze Cues", focus: "Assessment Findings",
    stem: "The nurse changes the dressing of a client whose below-knee amputation incision was opened for drainage 2 days ago. The gauze contains thick, cream-colored drainage streaked with blood, and the client has a temperature of 38.3 °C (100.9 °F). Complete the following sentences by choosing from the lists of options.",
    template: "The nurse documents the drainage as {0}. This type of exudate most likely indicates {1}, and the nurse should {2}.",
    blanks: [
      { options: ["serosanguineous", "purosanguineous", "sanguineous", "serous"], answer: 1 },
      { options: ["an infected wound", "normal inflammation", "capillary damage only", "a healing ridge"], answer: 0 },
      { options: ["report the finding to the provider", "switch to a dry occlusive dressing", "apply ice to the stump", "reduce the dressing changes"], answer: 0 }
    ],
    rationale: "Purosanguineous exudate is a mixture of pus (thick, opaque WBCs and debris) and blood and is characteristic of infected wounds. Combined with fever, it warrants reporting so the provider can order cultures and treatment. Serosanguineous drainage is thin and pink, sanguineous is red, and serous is clear straw-colored.",
    takeaway: "Pus + blood = purosanguineous = infection until proven otherwise.",
    hintContent: "Recall the four basic exudate types and what each mixed type contains.",
    hintStrategy: "Break the description into its components (thick/opaque plus blood) and match each to an exudate term."
  },
  {
    id: "m21f-025", type: "matrix", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Exudate",
    difficulty: 1, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Recognize Cues", focus: "Assessment Findings",
    stem: "The nurse is assessing drainage in several clients. For each finding, indicate the type of exudate the nurse should document.",
    rows: [
      "Clear, straw-colored fluid from an intact friction blister on the heel",
      "Bright red fluid filling a Hemovac drain 1 hour after knee arthroplasty",
      "Thick, green, opaque fluid from an abscess incision",
      "Watery, pale yellow fluid weeping from edematous lower legs",
      "Dark red fluid oozing around a newly placed chest tube"
    ],
    columns: ["Serous", "Sanguineous", "Purulent"],
    answer: [0, 1, 2, 0, 1],
    optionRationales: [
      "Serous. Blister fluid is clear, watery plasma typical of mild inflammation.",
      "Sanguineous. Bright red fluid indicates fresh bleeding from capillary or vessel damage, expected in small amounts right after surgery.",
      "Purulent. Thick, opaque, colored drainage contains WBCs, bacteria, and debris.",
      "Serous. Fluid weeping from edematous tissue is clear to pale yellow plasma.",
      "Sanguineous. Bright or dark red drainage is blood; dark red suggests older bleeding."
    ],
    rationale: "Serous exudate is clear and watery; sanguineous is bright or dark red blood; purulent is thick and opaque (yellow, green, tan, or blue). Accurate terminology allows trends (for example, sanguineous → serosanguineous → serous after surgery) to be recognized.",
    takeaway: "Clear = serous, red = sanguineous, thick and opaque = purulent.",
    hintContent: "Recall the color and consistency of each basic exudate type.",
    hintStrategy: "Focus on the descriptive words (clear, red, thick, opaque) rather than the procedure named in each row."
  },
  {
    id: "m21f-026", type: "mcq", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Wound Documentation",
    difficulty: 2, clientNeed: "Safe and Effective Care Environment: Management of Care",
    cjmm: "Recognize Cues", focus: "Assessment Findings",
    stem: "The nurse measures a client's open abdominal wound. With the client's head as 12 o'clock, a cotton-tipped applicator slides 2 cm under the wound edge from the 3 o'clock position through the 6 o'clock position. The wound is 6 cm long (head to toe), 3 cm wide, and 2 cm deep. Which documentation is most accurate?",
    options: [
      "“Wound 6 × 3 cm with a deep tunnel on the right side; moderate size.”",
      "“Wound 6 × 3 × 2 cm; undermining 2 cm from 3 to 6 o'clock.”",
      "“Wound 3 × 6 × 2 cm; tunneling 2 cm at 3 o'clock and 6 o'clock.”",
      "“Wound large and deep with pockets beneath the lower edges.”"
    ],
    answer: 1,
    optionRationales: [
      "Incorrect. It omits depth, mislabels undermining as tunneling, and uses a subjective size term.",
      "Correct. Length (head to toe) × width × depth is recorded in centimeters, and undermining is described by depth and clock positions it spans.",
      "Incorrect. Length is listed second, and tissue loss spanning a continuous arc is undermining, not two separate tunnels.",
      "Incorrect. Subjective terms such as 'large' and 'deep' cannot be trended."
    ],
    rationale: "Accurate wound documentation uses length × width × depth in centimeters with the head at 12 o'clock. Undermining is tissue destruction under the wound edge spanning an area (for example, 3 to 6 o'clock), whereas tunneling is a narrow channel at a single clock position. Objective measurements allow comparison over time.",
    takeaway: "L × W × D in cm, head = 12 o'clock; undermining spans, tunneling points.",
    hintContent: "Recall the standard order of wound measurements and the difference between undermining and tunneling.",
    hintStrategy: "Choose the option a colleague could use to reproduce your measurement next week; reject vague terms."
  },
  {
    id: "m21f-027", type: "mcq", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Cultural Considerations",
    difficulty: 2, clientNeed: "Psychosocial Integrity",
    cjmm: "Generate Solutions", focus: "Lifespan & Diversity",
    stem: "A Muslim client with a slowly healing diabetic foot wound tells the nurse, “Ramadan starts next week, and I want to fast from dawn to sunset like my family.” Which response by the nurse is most appropriate?",
    options: [
      "“You cannot fast while you have an open wound, so I will tell your provider that you refused the diet.”",
      "“Fasting will not affect your wound, so there is no need to change your meal plan.”",
      "“Tell me how you plan to fast so we can work with your provider and dietitian to adjust meals and medicines.”",
      "“You should first ask your religious leader for permission to skip fasting and then let me know what was decided.”"
    ],
    answer: 2,
    optionRationales: [
      "Incorrect. This is coercive and disrespectful and labels the client as nonadherent.",
      "Incorrect. Prolonged fasting affects glucose control, hydration, and protein intake, all of which affect healing.",
      "Correct. The nurse respects the client's values, explores plans, and collaborates so nutrient-dense, high-protein meals at the pre-dawn and sunset meals and medication (especially insulin) timing can be adjusted safely; illness exemptions can also be discussed with the client.",
      "Incorrect. This shifts responsibility away from the care team; the nurse should engage directly while supporting the client's right to consult religious leaders."
    ],
    rationale: "Culturally competent care supports client autonomy while addressing risks. Fasting can cause dehydration and hypoglycemia/hyperglycemia in clients with diabetes and may reduce protein intake. Collaborative planning of meal content, timing, and medications allows the client to honor beliefs while protecting healing.",
    takeaway: "Respect the practice, explore the plan, and collaborate to adjust nutrition and medications.",
    hintContent: "Recall how glucose control, hydration, and protein intake influence healing, and the principles of culturally competent care.",
    hintStrategy: "Eliminate responses that are dismissive, coercive, or inaccurate; choose the one that is client-centered and collaborative."
  },
  {
    id: "m21f-028", type: "dropdown", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Diabetes & Healing",
    difficulty: 2, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Analyze Cues", focus: "Pathophysiology",
    stem: "A client with type 2 diabetes is on postoperative day 2 after a laparoscopic colectomy. Capillary glucose readings have ranged from 240 to 290 mg/dL. Complete the following sentences by choosing from the lists of options.",
    template: "Persistent hyperglycemia increases the client's risk of surgical site infection because it impairs {0}. Long-standing diabetes also causes microvascular disease, which reduces {1} to the incision. The nurse should anticipate a goal of keeping perioperative glucose {2}.",
    blanks: [
      { options: ["neutrophil and macrophage function", "platelet production", "renal excretion of bacteria", "thyroid hormone release"], answer: 0 },
      { options: ["oxygen and nutrient delivery", "lymphatic drainage of fluid", "sensation of pain", "production of sweat"], answer: 0 },
      { options: ["between 70 and 90 mg/dL", "below 200 mg/dL", "between 250 and 300 mg/dL", "above 180 mg/dL"], answer: 1 }
    ],
    rationale: "Hyperglycemia impairs white-cell chemotaxis and phagocytosis and promotes bacterial growth, while diabetic microangiopathy thickens capillary basement membranes and reduces oxygen and nutrient delivery. The CDC 2017 SSI guideline recommends keeping perioperative glucose below 200 mg/dL in all surgical clients; tight targets near 70–90 mg/dL increase hypoglycemia risk.",
    takeaway: "High glucose disables WBCs and starves the wound of oxygen; keep perioperative glucose < 200 mg/dL.",
    hintContent: "Recall which immune cells are affected by hyperglycemia and the CDC perioperative glucose target.",
    hintStrategy: "Each blank tests a different link in the chain: immune effect, vascular effect, then the target. Eliminate targets that are unsafe in either direction."
  },
  {
    id: "m21f-029", type: "order", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Drains",
    difficulty: 1, clientNeed: "Physiological Integrity: Basic Care and Comfort",
    cjmm: "Take Action", focus: "Nursing Interventions",
    stem: "The nurse is emptying a client's Jackson-Pratt (JP) drain, which is half full. Place the steps in the order the nurse should perform them.",
    options: [
      "Perform hand hygiene, apply clean gloves, and place a graduated container below the bulb",
      "Open the drainage port and pour the contents into the container without touching the port",
      "Squeeze the bulb flat and replace the plug while it is compressed",
      "Secure the bulb to the gown below the insertion site",
      "Measure and record the amount and character of the drainage"
    ],
    rationale: "The nurse prepares and protects, empties the drainage while maintaining asepsis of the port, then re-establishes suction by compressing the bulb before closing it. The bulb is secured to prevent tension on the tubing, and finally the output is measured and documented (color, consistency, odor, volume) to trend toward drain removal.",
    takeaway: "Empty → compress → close → secure → measure and document.",
    hintContent: "Recall how suction is restored in a bulb drain and why the bulb must be secured.",
    hintStrategy: "Suction must be re-established while the port is open; measuring is done after the client and device are safe."
  },
  {
    id: "m21f-030", type: "mcq", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Drains",
    difficulty: 3, clientNeed: "Physiological Integrity: Reduction of Risk Potential",
    cjmm: "Analyze Cues", focus: "Assessment Findings",
    stem: "A client who had a modified radical mastectomy has had 40–60 mL of serosanguineous JP drain output every 8 hours. On the second postoperative day, the nurse notes there has been no output for 6 hours, the bulb is fully expanded, and the chest wall under the incision feels boggy and swollen. Which interpretation is most accurate?",
    options: [
      "The drainage has stopped because the wound has finished healing internally.",
      "The drain has lost suction, and fluid is accumulating in the wound.",
      "The client is dehydrated and producing less wound fluid.",
      "The swelling is normal inflammation and no action is required."
    ],
    answer: 1,
    optionRationales: [
      "Incorrect. Output tapers gradually; an abrupt stop with new swelling suggests an obstruction, not healing.",
      "Correct. An expanded bulb means no negative pressure; with a sudden stop in output and a boggy chest wall, fluid (seroma or hematoma) is collecting. The nurse checks for kinks or clots, re-compresses the bulb, and reports if suction cannot be restored.",
      "Incorrect. Dehydration would not explain local swelling beneath the incision.",
      "Incorrect. New fluctuant swelling with loss of drain function needs action."
    ],
    rationale: "Closed-suction drains remove serum and blood that would otherwise collect in dead space. Loss of suction (expanded bulb), obstruction by clots, or kinks cause fluid to pool as a seroma or hematoma, delaying healing and increasing infection risk.",
    takeaway: "Sudden zero output + expanded bulb + swelling = drain not working, not wound healed.",
    hintContent: "Recall what the bulb should look like when a JP drain is working and where drainage goes if it cannot exit.",
    hintStrategy: "Look for the option that explains ALL three cues together (no output, expanded bulb, local swelling)."
  },
  {
    id: "m21f-031", type: "sata", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Negative-Pressure Wound Therapy",
    difficulty: 2, clientNeed: "Physiological Integrity: Reduction of Risk Potential",
    cjmm: "Take Action", focus: "Nursing Interventions",
    stem: "A client has negative-pressure wound therapy (NPWT) set at −125 mm Hg continuous on an open abdominal wound. The pump alarms “leak,” and the foam dressing is no longer collapsed. Which actions should the nurse take? Select all that apply.",
    options: [
      "Check the tubing connections and clamps for disconnection",
      "Run a gloved finger around the drape to locate the leak",
      "Patch the leak with additional transparent drape",
      "Turn off the pump until the next scheduled dressing change",
      "Increase the pressure setting to overcome the leak",
      "Notify the provider or wound nurse if the seal cannot be restored"
    ],
    answer: [0, 1, 2, 5],
    optionRationales: [
      "Correct. Loose connections or open clamps are a common, easily fixed cause of loss of seal.",
      "Correct. Smoothing around the drape helps find the leak, often near skin folds or the tubing pad.",
      "Correct. Covering the leak with additional drape restores the seal and negative pressure.",
      "Incorrect. Therapy should run at least 22 hours a day; a foam dressing left in place without suction for about 2 hours traps exudate and must be removed and replaced per protocol.",
      "Incorrect. The prescribed pressure should not be changed without an order and will not fix a leak.",
      "Correct. If the seal cannot be restored promptly, the dressing needs to be changed per protocol and the provider or wound specialist notified."
    ],
    rationale: "NPWT works only when a seal maintains negative pressure, which removes exudate, reduces edema, and promotes granulation. When a leak alarm sounds, the nurse troubleshoots connections and the drape, patches leaks, and escalates if therapy cannot be restored, because an unsealed foam dressing left in place becomes a reservoir for bacteria.",
    takeaway: "NPWT needs a seal: check connections, find and patch the leak, and do not leave it off.",
    hintContent: "Recall how NPWT promotes healing and the time limit for leaving a nonfunctioning foam dressing in place.",
    hintStrategy: "Evaluate each option: does it restore the seal safely within nursing scope, or does it change the prescription or interrupt therapy?"
  },
  {
    id: "m21f-032", type: "sata", topic: "wound-healing-factors-exudate",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Negative-Pressure Wound Therapy",
    difficulty: 3, clientNeed: "Physiological Integrity: Reduction of Risk Potential",
    cjmm: "Analyze Cues", focus: "Delegation & Safety",
    stem: "The wound care nurse receives prescriptions to start negative-pressure wound therapy (NPWT) for several clients. For which clients should the nurse clarify the prescription with the provider before applying NPWT? Select all that apply.",
    options: [
      "A client with a sacral wound covered by thick, dry black eschar",
      "A client with a clean, granulating dehisced abdominal incision",
      "A client with a foot wound and untreated osteomyelitis",
      "A client with a fungating wound caused by breast cancer",
      "A client with a diabetic foot ulcer after surgical debridement",
      "A client with a clean split-thickness skin graft site"
    ],
    answer: [0, 2, 3],
    optionRationales: [
      "Clarify. NPWT is contraindicated over necrotic tissue with eschar; the wound must be debrided first.",
      "Do not clarify. A clean, granulating dehisced wound is a common indication for NPWT.",
      "Clarify. Untreated osteomyelitis is a contraindication; the infection must be treated first.",
      "Clarify. Malignancy in the wound is a contraindication because NPWT can stimulate tissue growth.",
      "Do not clarify. Debrided diabetic foot ulcers are an appropriate indication.",
      "Do not clarify. NPWT is often used to secure and promote take of skin grafts."
    ],
    rationale: "NPWT is contraindicated for wounds with necrotic tissue and eschar, untreated osteomyelitis, malignancy in the wound, unexplored or non-enteric fistulas, and exposed blood vessels or organs. It is indicated for clean acute and chronic wounds, dehisced incisions, debrided ulcers, and graft sites.",
    takeaway: "No NPWT on eschar, untreated osteomyelitis, cancer, or exposed vessels/organs.",
    hintContent: "Recall how NPWT stimulates granulation and what conditions would be made worse by increasing tissue growth or suction.",
    hintStrategy: "You are selecting the unsafe prescriptions. Consider each wound independently and ask whether suction over it could cause harm."
  },

  // ================= STAND-ALONE: COMPLICATIONS =================
  {
    id: "m21f-033", type: "mcq", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Complications: Hemorrhage",
    difficulty: 3, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Prioritize Hypotheses", focus: "Pathophysiology",
    exhibit: { tabs: [
      { title: "Nurses' Notes", html: "<p><strong>0600:</strong> 71-year-old client, 18 hours after right total hip arthroplasty. Reports severe, increasing right thigh pain (8/10, was 4/10 at 2200) not relieved by PCA. Right thigh tense, swollen, and shiny; thigh circumference 4 cm larger than at 2200. Dressing dry and intact. Hemovac has drained 60 mL total since surgery. Right foot warm, pedal pulse 2+, capillary refill less than 3 seconds.</p>" },
      { title: "Vital Signs", table: { headers: ["Time", "T", "HR", "RR", "BP", "SpO₂"], rows: [
        ["2200", "36.9 °C (98.4 °F)", "84", "16", "136/80", "97% RA"],
        ["0600", "37.0 °C (98.6 °F)", "112", "20", "108/64", "96% RA"]
      ] } },
      { title: "Laboratory Results", table: { headers: ["Test", "Postop (1400)", "0530", "Reference range"], rows: [
        ["Hemoglobin", "11.8 g/dL", "8.9 g/dL", "12–16 g/dL"],
        ["Platelets", "228,000/mm³", "219,000/mm³", "150,000–400,000/mm³"]
      ] } }
    ] },
    stem: "Refer to the Nurses' Notes, Vital Signs, and Laboratory Results for a client after hip arthroplasty. Which complication is the most likely cause of the client's findings?",
    options: [
      "Surgical site infection of the incision",
      "Deep vein thrombosis in the right calf",
      "Hematoma at the surgical site",
      "Dehiscence of the hip incision"
    ],
    answer: 2,
    optionRationales: [
      "Incorrect. Infection does not cause an acute hemoglobin drop within 18 hours and would include fever and drainage.",
      "Incorrect. DVT can cause swelling and pain, but it does not cause a 2.9 g/dL hemoglobin drop and tachycardia.",
      "Correct. A dry dressing does not rule out bleeding. Tense swelling, increasing pain, tachycardia, and falling hemoglobin indicate internal bleeding collecting as a hematoma.",
      "Incorrect. Dehiscence is separation of the incision, which is not described, and typically occurs days later."
    ],
    rationale: "The greatest risk of hemorrhage is within the first 48 hours after surgery. Bleeding may be concealed, accumulating in tissues as a hematoma, producing swelling, distention, pain, tachycardia, and falling hemoglobin. The nurse reports these findings promptly because pressure from a hematoma can also compromise circulation to the tissue.",
    takeaway: "A dry dressing does not mean no bleeding: swelling + tachycardia + ↓ Hgb = internal bleed.",
    hintContent: "Recall how internal hemorrhage presents when drainage cannot escape through the dressing or drain.",
    hintStrategy: "Look for the one hypothesis that explains the local finding AND the lab and vital-sign changes."
  },
  {
    id: "m21f-034", type: "mcq", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Complications",
    difficulty: 3, clientNeed: "Safe and Effective Care Environment: Management of Care",
    cjmm: "Prioritize Hypotheses", focus: "Prioritization",
    stem: "The nurse receives hand-off report on four postoperative clients. Which client should the nurse assess first?",
    options: [
      "POD 1 after mastectomy; JP drain has 80 mL of serosanguineous output over 8 hours",
      "POD 5 after colectomy; thick yellow incisional drainage, temperature 38.2 °C (100.8 °F)",
      "POD 9 after appendectomy; reports itching along the healing incision",
      "4 hours after thyroidectomy; dressing damp with bright red blood, HR 118/min"
    ],
    answer: 3,
    optionRationales: [
      "Incorrect. Moderate serosanguineous drainage on POD 1 is expected.",
      "Incorrect. Probable SSI needs follow-up soon, but the client is not acutely unstable.",
      "Incorrect. Itching is common during the proliferative and early maturation phases.",
      "Correct. Active bleeding with tachycardia in the first 48 hours signals hemorrhage; after thyroidectomy, a hematoma can also compress the airway."
    ],
    rationale: "Priority goes to the client with an acute, potentially life-threatening problem: fresh postoperative hemorrhage with tachycardia (circulation) and, in neck surgery, possible airway compromise. SSI is serious but less immediate; the other findings are expected.",
    takeaway: "Unstable over stable: fresh bleeding + tachycardia beats infection or expected findings.",
    hintContent: "Recall the peak timeframe for postoperative hemorrhage and why a neck incision adds airway risk.",
    hintStrategy: "Apply ABCs and 'unstable before stable.' Rule out clients whose findings are expected for their postoperative day."
  },
  {
    id: "m21f-035", type: "sata", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Complications: Dehiscence",
    difficulty: 2, clientNeed: "Health Promotion and Maintenance",
    cjmm: "Generate Solutions", focus: "Client Teaching",
    stem: "A client with obesity and chronic cough is being discharged on POD 5 after an open abdominal hysterectomy. Which instructions should the nurse include to reduce the risk of wound dehiscence? Select all that apply.",
    options: [
      "Hold a pillow firmly against the incision when coughing or sneezing",
      "Avoid lifting anything heavier than 10 lb (4.5 kg) until cleared",
      "Take the prescribed stool softener and increase fluids to avoid straining",
      "Remove the adhesive strips at home if the edges look closed",
      "Wear the abdominal binder as prescribed when out of bed",
      "Do sit-up exercises to strengthen the abdominal muscles"
    ],
    answer: [0, 1, 2, 4],
    optionRationales: [
      "Correct. Splinting supports the incision against the sudden pressure of coughing.",
      "Correct. Heavy lifting increases intra-abdominal pressure and tension on the fascia.",
      "Correct. Straining at stool is a common trigger for dehiscence.",
      "Incorrect. Adhesive strips are left until they fall off or the provider removes them; they support the incision.",
      "Correct. A properly fitted binder, when prescribed, supports large abdominal incisions.",
      "Incorrect. Sit-ups strain the abdominal wall and are avoided until the surgeon clears the client."
    ],
    rationale: "Dehiscence is most common POD 5–8 and is promoted by obesity, coughing, vomiting, straining, and lifting. Teaching focuses on reducing sudden increases in intra-abdominal pressure and supporting the incision while collagen strength builds.",
    takeaway: "Splint, don't strain, don't lift, and support the incision until it is strong.",
    hintContent: "Recall what increases intra-abdominal pressure and when dehiscence is most likely to occur.",
    hintStrategy: "For each option, ask: does this reduce or increase tension on the incision?"
  },
  {
    id: "m21f-036", type: "sata", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Complications: Hemorrhage",
    difficulty: 2, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Recognize Cues", focus: "Assessment Findings",
    stem: "A client is 6 hours after an open nephrectomy. The flank dressing is dry. Which findings should the nurse recognize as possible signs of concealed hemorrhage? Select all that apply.",
    options: [
      "Restlessness and anxiety",
      "Heart rate increasing from 80 to 116/min",
      "Warm, flushed skin",
      "Urine output of 15 mL/hr for 2 hours",
      "Increasing swelling and firmness of the flank",
      "Blood pressure rising from 124/78 to 142/88 mm Hg"
    ],
    answer: [0, 1, 3, 4],
    optionRationales: [
      "Correct. Restlessness is an early sign of decreased cerebral perfusion.",
      "Correct. Tachycardia is a compensatory response to volume loss.",
      "Incorrect. Hypovolemia causes vasoconstriction, producing cool, pale, clammy skin.",
      "Correct. Output below 30 mL/hr (0.5 mL/kg/hr) reflects decreased renal perfusion.",
      "Correct. Blood accumulating in tissues causes local swelling and firmness.",
      "Incorrect. Hemorrhage produces falling, not rising, blood pressure (BP may stay normal early due to compensation)."
    ],
    rationale: "Internal bleeding may not show on the dressing. The nurse recognizes compensatory signs of hypovolemia—restlessness, tachycardia, oliguria, cool clammy skin—and local swelling, and reports them promptly. Hypotension is a later sign.",
    takeaway: "Look beyond the dressing: restlessness, tachycardia, oliguria, and swelling signal hidden bleeding.",
    hintContent: "Recall the body's compensatory responses to volume loss and where blood can collect internally.",
    hintStrategy: "Evaluate each option: is it consistent with hypovolemia and local blood collection, or the opposite?"
  },
  {
    id: "m21f-037", type: "matrix", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Infection Control",
    difficulty: 2, clientNeed: "Safe and Effective Care Environment: Safety and Infection Control",
    cjmm: "Take Action", focus: "Delegation & Safety",
    stem: "A client has a surgical site infection with methicillin-resistant Staphylococcus aureus (MRSA) and is on contact precautions. The nurse is performing a dressing change. For each action, indicate whether it is indicated or contraindicated.",
    rows: [
      "Put on a gown and gloves before entering the room",
      "Use a dedicated stethoscope that remains in the room",
      "Cleanse the granulating wound bed with hydrogen peroxide",
      "Remove soiled gloves and perform hand hygiene before applying the new dressing",
      "Carry the soiled dressing to the utility room in the gloved hand"
    ],
    columns: ["Indicated", "Contraindicated"],
    answer: [0, 0, 1, 0, 1],
    optionRationales: [
      "Indicated. Contact precautions require a gown and gloves on entry for all interactions with the client or environment.",
      "Indicated. Dedicated equipment prevents transmission to other clients.",
      "Contraindicated. Hydrogen peroxide is cytotoxic to fibroblasts and granulation tissue; normal saline is used.",
      "Indicated. Gloves used to remove a contaminated dressing are removed and hands cleaned before touching new supplies.",
      "Contraindicated. Soiled dressings are placed in a bag or biohazard receptacle in the room, not carried through the unit."
    ],
    rationale: "Care of an MRSA-infected wound combines contact precautions (gown, gloves, dedicated equipment, in-room disposal) with wound-friendly practice (non-cytotoxic cleansers, glove change between dirty and clean steps).",
    takeaway: "MRSA wound: gown + gloves on entry, dedicated equipment, saline not peroxide, dispose in the room.",
    hintContent: "Recall the components of contact precautions and which cleansers damage granulation tissue.",
    hintStrategy: "Judge each row on two principles: does it prevent spread, and does it protect the healing wound?"
  },
  {
    id: "m21f-038", type: "dropdown", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Complications: Communication",
    difficulty: 3, clientNeed: "Safe and Effective Care Environment: Management of Care",
    cjmm: "Take Action", focus: "Prioritization",
    stem: "A client is on POD 4 after a below-knee amputation for peripheral arterial disease. The stump incision has new purulent drainage, erythema 4 cm beyond the edges, temperature 38.9 °C (102 °F), HR 118/min, BP 96/58 mm Hg (baseline 134/80), and new confusion. The nurse calls the surgeon using SBAR. Complete the following sentences by choosing from the lists of options.",
    template: "Assessment: “I am concerned the client has {0}.” Recommendation: “I request that you {1}.” While waiting, the nurse should {2}.",
    blanks: [
      { options: ["an infected incision with possible sepsis", "phantom limb pain", "normal inflammation after amputation", "a stump hematoma"], answer: 0 },
      { options: ["come to evaluate the client now and prescribe cultures, lactate, and IV antibiotics", "increase the dose of oral analgesic", "reassess the incision at the next scheduled visit", "order physical therapy for stump shaping"], answer: 0 },
      { options: ["elevate the stump on two pillows for 24 hours", "wrap the stump tightly with an elastic bandage", "reassess vital signs and mental status frequently", "apply a heating pad to the incision"], answer: 2 }
    ],
    rationale: "Local signs of infection plus fever, tachycardia, relative hypotension, and new confusion suggest sepsis from an SSI—a time-critical emergency. The SBAR recommendation should request immediate evaluation and sepsis interventions (cultures before antibiotics, lactate, IV fluids and antibiotics). While waiting, the nurse monitors closely for deterioration. Prolonged stump elevation beyond the first 24 hours postoperatively risks hip flexion contracture and is not a sepsis intervention.",
    takeaway: "Local infection + systemic signs (fever, ↑HR, ↓BP, confusion) = possible sepsis; escalate now.",
    hintContent: "Recall the systemic signs that indicate a localized wound infection is progressing to sepsis.",
    hintStrategy: "The recommendation must match the urgency of the assessment you choose. Eliminate options that delay care."
  },
  {
    id: "m21f-039", type: "mcq", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · SSI Prevention",
    difficulty: 1, clientNeed: "Physiological Integrity: Pharmacological and Parenteral Therapies",
    cjmm: "Take Action", focus: "Pharmacology",
    stem: "A client scheduled for an open colectomy at 1000 has a prescription for cefazolin 2 g IV as surgical prophylaxis. The client is not allergic to penicillin or cephalosporins. When should the nurse plan to administer the dose?",
    options: [
      "The evening before surgery so tissue levels are established overnight",
      "Within 60 minutes before the surgical incision is made",
      "Immediately after the surgeon closes the incision",
      "When the client arrives in the postanesthesia care unit"
    ],
    answer: 1,
    optionRationales: [
      "Incorrect. A dose given the night before will have declined by the time of incision.",
      "Correct. Prophylactic antibiotics are timed so bactericidal tissue and serum levels are present at incision—generally within 60 minutes before incision for cefazolin.",
      "Incorrect. Contamination occurs during the procedure; a dose after closure is too late for prophylaxis.",
      "Incorrect. A postoperative first dose does not protect tissue during the operation."
    ],
    rationale: "Surgical antimicrobial prophylaxis prevents SSI only if adequate drug levels are present when the incision is made and throughout the procedure. Most agents are given within 60 minutes before incision (vancomycin and fluoroquinolones within 120 minutes because of longer infusion times).",
    takeaway: "Prophylactic antibiotic: within 60 minutes before incision.",
    hintContent: "Recall when bacterial contamination of the surgical wound occurs and when drug levels must peak.",
    hintStrategy: "Think about the purpose of 'prophylaxis'—the drug must be present before the exposure happens."
  },
  {
    id: "m21f-040", type: "mcq", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · SSI Prevention",
    difficulty: 1, clientNeed: "Safe and Effective Care Environment: Safety and Infection Control",
    cjmm: "Take Action", focus: "Delegation & Safety",
    stem: "The nurse observes an unlicensed assistive personnel (UAP) preparing to shave a client's abdomen with a disposable razor the evening before a scheduled laparotomy. Which action should the nurse take?",
    options: [
      "Allow the UAP to continue because shaving the night before surgery is standard",
      "Instruct the UAP to use a razor with shaving cream to prevent nicks",
      "Tell the UAP to wait and shave the area in the morning just before transport",
      "Stop the UAP and explain that hair is not removed with razors before surgery"
    ],
    answer: 3,
    optionRationales: [
      "Incorrect. Preoperative shaving is no longer recommended.",
      "Incorrect. Shaving cream does not prevent the microabrasions that harbor bacteria.",
      "Incorrect. Razors should not be used at any time before surgery.",
      "Correct. Razors create microscopic cuts that become colonized and increase SSI risk. Hair is left in place or, if it must be removed, clipped immediately before surgery."
    ],
    rationale: "Evidence-based SSI prevention avoids razor shaving because microabrasions allow bacterial colonization. If hair removal is necessary, electric clippers are used close to the time of surgery. The RN is responsible for correcting unsafe delegated practice.",
    takeaway: "No razors before surgery; clip only if needed, right before the procedure.",
    hintContent: "Recall how skin microtrauma relates to bacterial colonization at the surgical site.",
    hintStrategy: "Identify whether the task itself is safe before deciding how to guide the UAP."
  },
  {
    id: "m21f-041", type: "mcq", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Surgical Site Infection",
    difficulty: 2, clientNeed: "Physiological Integrity: Reduction of Risk Potential",
    cjmm: "Analyze Cues", focus: "Nursing Interventions",
    stem: "A client calls the surgical clinic 3 weeks after a laparoscopic inguinal hernia repair with mesh. The client reports that one incision has become red and swollen over the past 2 days and is draining cloudy fluid. The client has a temperature of 37.9 °C (100.2 °F). Which response by the nurse is most appropriate?",
    options: [
      "“That is normal as the mesh settles; apply a warm compress and call if it worsens.”",
      "“Infections only develop in the first week, so this is probably an allergic reaction.”",
      "“Cover it with a bandage and we will look at it at your 6-week follow-up.”",
      "“You need to be seen today because this may be a surgical site infection.”"
    ],
    answer: 3,
    optionRationales: [
      "Incorrect. Redness, swelling, cloudy drainage, and fever are not normal at 3 weeks.",
      "Incorrect. SSIs can develop up to 30 days after surgery, or up to 90 days when an implant such as mesh is placed.",
      "Incorrect. Delay allows the infection to progress and possibly involve the mesh.",
      "Correct. These findings meet criteria for a possible SSI, which requires prompt evaluation and culture; implant-associated infections can be difficult to treat."
    ],
    rationale: "CDC surveillance defines SSIs as occurring within 30 days of surgery, or up to 90 days for certain procedures involving implants. New erythema, swelling, purulent or cloudy drainage, and fever require same-day evaluation.",
    takeaway: "SSIs can appear weeks later, especially with implants; new redness + drainage = be seen now.",
    hintContent: "Recall the CDC time window for surgical site infections, including procedures with implanted material.",
    hintStrategy: "In telephone triage, choose the response that matches the urgency of the findings; eliminate false reassurance."
  },
  {
    id: "m21f-042", type: "mcq", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Surgical Site Infection",
    difficulty: 2, clientNeed: "Physiological Integrity: Pharmacological and Parenteral Therapies",
    cjmm: "Evaluate Outcomes", focus: "Assessment Findings",
    stem: "A client with a superficial incisional SSI after a cesarean birth has received IV vancomycin for 72 hours. On admission, the margin of erythema was outlined with a skin marker. Which finding best indicates that treatment is effective?",
    options: [
      "Erythema has receded inside the marked outline, and drainage is now serous",
      "The client reports that the incision now itches more than it did on admission",
      "Vancomycin trough level is within the prescribed therapeutic range",
      "Erythema now extends 1 cm beyond the marked outline without drainage"
    ],
    answer: 0,
    optionRationales: [
      "Correct. Shrinking erythema and a change from purulent to serous drainage show local infection is resolving.",
      "Incorrect. Itching is nonspecific and does not measure infection control.",
      "Incorrect. A therapeutic trough shows appropriate dosing, not clinical response.",
      "Incorrect. Spreading erythema indicates the infection is worsening."
    ],
    rationale: "Treatment effectiveness is evaluated by clinical outcomes: receding erythema (compared with a marked baseline), decreasing pain and induration, drainage changing from purulent to serous, and normalizing temperature and WBC. Drug levels show safe dosing but not whether the infection is responding.",
    takeaway: "Mark the margin; shrinking redness + serous drainage = the antibiotic is working.",
    hintContent: "Recall the local signs of infection and how each would change as infection resolves.",
    hintStrategy: "An 'evaluate outcomes' question asks for evidence the client's condition changed, not that the medication was given correctly."
  },
  {
    id: "m21f-043", type: "sata", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Lifespan Considerations",
    difficulty: 3, clientNeed: "Physiological Integrity: Physiological Adaptation",
    cjmm: "Recognize Cues", focus: "Lifespan & Diversity",
    stem: "An 88-year-old client is on POD 5 after hemiarthroplasty for a hip fracture. The nurse knows that older adults may have atypical presentations of wound infection. Which findings should the nurse recognize as possible early cues of a surgical site infection in this client? Select all that apply.",
    options: [
      "New-onset confusion and agitation at night",
      "Temperature of 37.6 °C (99.7 °F) when baseline is 36.4 °C (97.5 °F)",
      "Sudden decline in appetite and refusal to participate in therapy",
      "A thin line of serosanguineous drainage on the dressing on POD 1",
      "New warmth and firmness around the incision",
      "Thin, dry skin with senile purpura on the forearms"
    ],
    answer: [0, 1, 2, 4],
    optionRationales: [
      "Correct. Delirium is often the first sign of infection in older adults.",
      "Correct. A rise of about 1.1 °C (2 °F) above baseline is significant in older adults, whose fever response is blunted.",
      "Correct. Functional decline and anorexia are common atypical presentations of infection.",
      "Incorrect. Scant serosanguineous drainage on POD 1 is expected.",
      "Correct. Local warmth and induration may be subtle but still indicate infection.",
      "Incorrect. These are normal age-related skin changes."
    ],
    rationale: "Aging blunts the inflammatory and febrile responses, so infection in older adults often presents as delirium, functional decline, reduced appetite, or a small rise from a low baseline temperature, along with subtle local changes.",
    takeaway: "In older adults, confusion, functional decline, and 'low' fevers can be the first signs of infection.",
    hintContent: "Recall how aging changes the febrile and inflammatory responses.",
    hintStrategy: "Evaluate each option separately; compare with the client's own baseline rather than standard adult norms."
  },
  {
    id: "m21f-044", type: "mcq", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Delegation",
    difficulty: 2, clientNeed: "Safe and Effective Care Environment: Management of Care",
    cjmm: "Generate Solutions", focus: "Delegation & Safety",
    stem: "The RN is caring for a client on postoperative day 2 after an open appendectomy with the help of an unlicensed assistive personnel (UAP). The client's vital signs are stable, and the incision is dry with approximated edges. Which task is appropriate for the RN to delegate to the UAP?",
    options: [
      "Help the client walk in the hall and remind the client to splint the incision when coughing",
      "Inspect the incision each shift for redness, warmth, drainage, and separation of the edges",
      "Remove every other staple from the incision as prescribed before the client's discharge",
      "Explain the signs of wound infection that the client should report after going home"
    ],
    answer: 0,
    optionRationales: [
      "Correct. Ambulating a stable postoperative client is routine and within UAP scope, and reminding the client to use a technique the RN already taught (splinting) reinforces that teaching.",
      "Incorrect. Inspecting an incision for signs of infection or dehiscence is assessment and requires nursing judgment.",
      "Incorrect. Staple removal is a sterile procedure that requires evaluating wound integrity as it is performed; it is not within UAP scope.",
      "Incorrect. Discharge teaching about complications is an RN responsibility."
    ],
    rationale: "The RN retains assessment, teaching, evaluation, and procedures that require judgment. UAP can perform routine, predictable care for stable clients, such as ambulation, hygiene, and reminding clients of techniques the nurse has already taught, and must report changes such as new drainage or pain to the RN.",
    takeaway: "UAP: routine care and reinforcement for stable clients. RN: assessment, teaching, and procedures that need judgment.",
    hintContent: "Recall which activities are routine and unchanging and which require assessment, sterile technique, or teaching.",
    hintStrategy: "For each task, ask whether the outcome is predictable for a stable client or whether performing it requires the nurse to interpret findings or teach new content."
  },
  {
    id: "m21f-045", type: "order", topic: "wound-healing-complications",
    ref: "Module 21 · Exemplar 21.C Wound Healing · Wound Care with Drains",
    difficulty: 3, clientNeed: "Safe and Effective Care Environment: Safety and Infection Control",
    cjmm: "Take Action", focus: "Nursing Interventions",
    stem: "The nurse is changing the dressing on a client's vertical abdominal incision that has a Penrose drain exiting through a separate stab wound beside it. Place the steps in the order the nurse should perform them.",
    options: [
      "Perform hand hygiene, apply clean gloves, and remove the old dressing",
      "Assess the incision and drain site, then remove gloves and perform hand hygiene",
      "Set up the sterile field and apply sterile gloves",
      "Cleanse the incision from top to bottom, using a new swab for each stroke",
      "Cleanse the drain site in circles from the drain outward, then apply a split gauze"
    ],
    rationale: "The old dressing is removed with clean gloves and the wound assessed, then gloves are changed for the sterile portion. The incision (less contaminated) is cleansed first, from top to bottom, one stroke per swab. The drain site is considered more contaminated because of drainage, so it is cleansed after the incision, in circles from the insertion site outward, and a precut split gauze is placed around the drain.",
    takeaway: "Clean before dirty: incision first (top to bottom), then drain site (inside out).",
    hintContent: "Recall the principle of cleansing from least contaminated to most contaminated and the direction of strokes for a linear incision versus a drain site.",
    hintStrategy: "Divide the procedure into clean-glove steps and sterile steps, then order the sterile steps from cleanest to dirtiest area."
  }
  ];

  window.NURSE_DATA.push({
    moduleId: "m21",
    moduleNumber: 21,
    moduleTitle: "Tissue Integrity",
    topics: [],
    flashcards: [],
    questions: questions
  });
})();
