window.NURSE_DATA = window.NURSE_DATA || [];
window.NURSE_DATA.push({
  moduleId: "m21",
  moduleNumber: 21,
  moduleTitle: "Tissue Integrity",
  topics: [],
  flashcards: [],
  questions: [
    // ===================== NGN UNFOLDING CASE STUDY: LOWER-LEG CELLULITIS =====================
    {
      id: "m21c-001",
      caseId: "m21c-case-cellulitis",
      caseOrder: 1,
      type: "highlight",
      topic: "skin-assessment-lesions",
      ref: "Module 21 · Tissue Integrity · NGN Case Study: Lower-Leg Cellulitis",
      difficulty: 2,
      clientNeed: "Physiological Integrity: Reduction of Risk Potential",
      cjmm: "Recognize Cues",
      focus: "Assessment Findings",
      exhibit: {
        tabs: [
          { title: "Vital Signs", table: { headers: ["Time", "T", "HR", "RR", "BP", "SpO₂"], rows: [["1400", "38.6 °C (101.5 °F)", "108", "20", "132/80", "97% RA"]] } },
          { title: "Laboratory Results", table: { headers: ["Test", "Result", "Reference range"], rows: [["WBC", "15,800/mm³", "5,000–10,000/mm³"], ["Glucose (random)", "286 mg/dL", "74–106 mg/dL"], ["Hemoglobin A1C", "9.2%", "< 5.7%"], ["Lactate", "1.4 mmol/L", "0.5–2.0 mmol/L"], ["Creatinine", "1.0 mg/dL", "0.6–1.2 mg/dL"]] } }
        ]
      },
      stem: "The nurse is caring for a 58-year-old client in the emergency department. Refer to the Vital Signs and Laboratory Results, then read the triage note. Click to highlight the findings that require follow-up.",
      passage: "1400: Client with type 2 diabetes mellitus and obesity reports {{3 days of increasing pain and swelling in the left lower leg}}. States, “I've had athlete's foot for months.” Client {{takes metformin 1,000 mg twice daily}}. On inspection, the {{skin between the 4th and 5th toes of the left foot is white, macerated, and fissured}}. From ankle to mid-calf, an {{area of skin is warm, tense, tender, and a deeper violet-brown than the surrounding dark brown skin}}. Borders are poorly defined. {{Pedal pulses 2+ bilaterally}}; {{capillary refill less than 3 seconds}}. Client also reports {{a tender “lump” in the left groin}}. Client is {{alert and oriented ×4}}.",
      answer: [0, 2, 3, 6],
      optionRationales: [
        "Requires follow-up. Progressive, one-sided leg pain and swelling signals an active process (infection or DVT) that must be evaluated.",
        "Does not require follow-up. Metformin is a routine home medication for type 2 diabetes and does not explain the leg findings.",
        "Requires follow-up. Macerated, fissured interdigital skin from tinea pedis breaks the skin barrier. It is a classic portal of entry for the streptococci and staphylococci that cause lower-leg cellulitis.",
        "Requires follow-up. In darker skin, erythema may look violaceous, deep brown, or gray instead of red. Warmth, tension, tenderness, and poorly defined borders are cardinal signs of cellulitis.",
        "Does not require follow-up. Palpable, equal pedal pulses show adequate arterial perfusion to the foot.",
        "Does not require follow-up. Brisk capillary refill is an expected finding.",
        "Requires follow-up. A tender inguinal node on the same side suggests lymphatic spread of the infection (regional lymphadenitis).",
        "Does not require follow-up. Full orientation is the client's baseline mental status. The nurse will trend it because new confusion can signal sepsis."
      ],
      rationale: "The findings that need follow-up are the local and regional signs of infection and its source: progressive unilateral pain and swelling, a warm, tense, discolored area with poorly defined borders, interdigital fissures from tinea pedis, and a tender ipsilateral groin node. Together with fever, leukocytosis, and hyperglycemia in the exhibit, these cues point to lower-leg cellulitis. Normal pulses, capillary refill, and orientation are reassuring baseline data.",
      takeaway: "In dark skin, “redness” may look violet, brown, or gray, so feel for warmth, tension, and tenderness and look for the portal of entry.",
      hintContent: "Cellulitis is a bacterial infection of the dermis and subcutaneous tissue. It usually starts at a break in the skin. Think about how inflammation looks in deeply pigmented skin.",
      hintStrategy: "Go through each segment and ask: is this abnormal or unsafe for this client, or is it expected or baseline? Highlight only the abnormal findings."
    },
    {
      id: "m21c-002",
      caseId: "m21c-case-cellulitis",
      caseOrder: 2,
      type: "matrix",
      topic: "infectious-skin-disorders",
      ref: "Module 21 · Tissue Integrity · NGN Case Study: Lower-Leg Cellulitis",
      difficulty: 3,
      clientNeed: "Physiological Integrity: Physiological Adaptation",
      cjmm: "Analyze Cues",
      focus: "Pathophysiology",
      exhibit: {
        tabs: [
          { title: "Nurses' Notes", html: "<p><strong>1400:</strong> 58-year-old client with type 2 diabetes mellitus and obesity. 3 days of increasing left lower-leg pain and swelling. Long-standing tinea pedis; skin between left 4th and 5th toes macerated and fissured. Left ankle to mid-calf warm, tense, tender, deeper violet-brown than surrounding dark brown skin, borders poorly defined. Tender left inguinal node. Pedal pulses 2+, alert and oriented ×4.</p>" },
          { title: "Vital Signs", table: { headers: ["Time", "T", "HR", "RR", "BP", "SpO₂"], rows: [["1400", "38.6 °C (101.5 °F)", "108", "20", "132/80", "97% RA"]] } },
          { title: "Laboratory Results", table: { headers: ["Test", "Result", "Reference range"], rows: [["WBC", "15,800/mm³", "5,000–10,000/mm³"], ["Glucose (random)", "286 mg/dL", "74–106 mg/dL"], ["Hemoglobin A1C", "9.2%", "< 5.7%"], ["Lactate", "1.4 mmol/L", "0.5–2.0 mmol/L"]] } }
        ]
      },
      stem: "Refer to the Nurses' Notes, Vital Signs, and Laboratory Results. The provider diagnoses cellulitis of the left lower leg. For each finding, indicate whether it is a contributing risk factor, a local inflammatory sign, or a systemic sign of infection.",
      rows: [
        "Hemoglobin A1C 9.2%",
        "Macerated, fissured skin between the 4th and 5th toes",
        "Warm, tense, violet-brown skin from ankle to mid-calf",
        "Temperature 38.6 °C (101.5 °F) and heart rate 108/min",
        "WBC 15,800/mm³"
      ],
      columns: ["Contributing risk factor", "Local inflammatory sign", "Systemic sign of infection"],
      answer: [0, 0, 2, 2, 2],
      optionRationales: [
        "Risk factor. Chronic hyperglycemia weakens neutrophil function and microcirculation, which increases the risk of infection and slows healing.",
        "Risk factor. The broken interdigital skin from tinea pedis is the portal of entry that let bacteria into the dermis.",
        "Local sign. Warmth, swelling, tension, and discoloration (erythema that looks violaceous in dark skin) are cardinal signs of inflammation at the site.",
        "Systemic sign. Fever with tachycardia means the inflammatory response is no longer only local. These are SIRS criteria, and the nurse must watch closely for sepsis.",
        "Systemic sign. Leukocytosis shows that the bone marrow is responding to a spreading bacterial infection."
      ],
      rationale: "Grouping the cues guides the plan. Risk factors (poorly controlled diabetes, a skin break from tinea pedis) explain why the infection happened and need long-term management. Local signs show the extent of tissue involvement. Systemic signs (fever, tachycardia, leukocytosis) show the infection is affecting the whole body. That raises the priority and supports blood cultures and IV antibiotics.",
      takeaway: "Sort cellulitis cues into cause (risk factors), local signs (the leg), and systemic signs (the body). Systemic signs raise the priority.",
      hintContent: "A risk factor exists before or apart from the infection. A local sign is found at the site. A systemic sign reflects the body's overall response.",
      hintStrategy: "For each row, ask where the finding comes from: the client's history, the leg itself, or the whole body."
    },
    {
      id: "m21c-003",
      caseId: "m21c-case-cellulitis",
      caseOrder: 3,
      type: "dropdown",
      topic: "infectious-skin-disorders",
      ref: "Module 21 · Tissue Integrity · NGN Case Study: Lower-Leg Cellulitis",
      difficulty: 3,
      clientNeed: "Physiological Integrity: Physiological Adaptation",
      cjmm: "Prioritize Hypotheses",
      focus: "Prioritization",
      exhibit: {
        tabs: [
          { title: "Nurses' Notes", html: "<p><strong>1400:</strong> 58-year-old client with type 2 diabetes mellitus. Left lower-leg cellulitis with tinea pedis as the portal of entry. Tender left inguinal node. Pedal pulses 2+. Alert and oriented ×4. Pain 6/10.</p>" },
          { title: "Vital Signs", table: { headers: ["Time", "T", "HR", "RR", "BP", "SpO₂"], rows: [["1400", "38.6 °C (101.5 °F)", "108", "20", "132/80", "97% RA"]] } },
          { title: "Laboratory Results", table: { headers: ["Test", "Result", "Reference range"], rows: [["WBC", "15,800/mm³", "5,000–10,000/mm³"], ["Glucose (random)", "286 mg/dL", "74–106 mg/dL"], ["Lactate", "1.4 mmol/L", "0.5–2.0 mmol/L"], ["Creatinine", "1.0 mg/dL", "0.6–1.2 mg/dL"]] } }
        ]
      },
      stem: "Refer to the Nurses' Notes, Vital Signs, and Laboratory Results. Complete the following sentence by choosing from the lists of options.",
      template: "The client is at highest risk for developing {0} as evidenced by the client's {1} and {2}.",
      blanks: [
        { options: ["sepsis", "deep vein thrombosis", "diabetic ketoacidosis", "a pressure injury"], answer: 0 },
        { options: ["pedal pulses of 2+", "temperature and heart rate", "oxygen saturation", "pain rating of 6/10"], answer: 1 },
        { options: ["lactate level", "creatinine level", "WBC count", "blood pressure"], answer: 2 }
      ],
      rationale: "A bacterial skin infection in a client with poorly controlled diabetes, fever of 38.6 °C (101.5 °F), HR 108/min, and WBC 15,800/mm³ meets SIRS criteria. The immediate threat is progression to sepsis. Lactate, creatinine, and BP are still normal, so organ dysfunction is not present yet, but these are the values to trend. DVT is on the differential for a swollen leg, but it does not explain fever and leukocytosis. DKA would need ketones and acidosis, and a pressure injury is not the acute threat.",
      takeaway: "Skin infection + fever + tachycardia + leukocytosis = think sepsis before it declares itself with hypotension or a rising lactate.",
      hintContent: "SIRS criteria include temperature > 38 °C (100.4 °F), HR > 90/min, RR > 20/min, and WBC > 12,000/mm³ or < 4,000/mm³.",
      hintStrategy: "Pick the most life-threatening complication first, then choose the data that actually support it. A normal value cannot be evidence of a problem."
    },
    {
      id: "m21c-004",
      caseId: "m21c-case-cellulitis",
      caseOrder: 4,
      type: "sata",
      topic: "infectious-skin-disorders",
      ref: "Module 21 · Tissue Integrity · NGN Case Study: Lower-Leg Cellulitis",
      difficulty: 2,
      clientNeed: "Physiological Integrity: Reduction of Risk Potential",
      cjmm: "Generate Solutions",
      focus: "Nursing Interventions",
      exhibit: {
        tabs: [
          { title: "Nurses' Notes", html: "<p><strong>1630:</strong> Client admitted to the medical unit with left lower-leg cellulitis. T 38.4 °C (101.1 °F), HR 104, BP 130/78. No drainage from the leg. Allergies: none known.</p>" },
          { title: "Orders", html: "<ul><li>Cefazolin 2 g IV every 8 hours</li><li>Blood cultures ×2 before the first antibiotic dose</li><li>Elevate left lower extremity</li><li>Mark the border of the affected area</li><li>Capillary blood glucose before meals and at bedtime; insulin lispro per sliding scale</li><li>Venous duplex ultrasound, left lower extremity</li><li>Acetaminophen 650 mg PO every 6 hours PRN pain or temperature > 38.3 °C (101 °F)</li></ul>" }
        ]
      },
      stem: "Refer to the Nurses' Notes and Orders. The nurse is planning care for the client. Which actions should the nurse include in the plan of care? Select all that apply.",
      options: [
        "Draw both sets of blood cultures before hanging the first dose of cefazolin",
        "Place the client on contact precautions in a private room",
        "Outline the edge of the discolored area with a skin marker and note the date and time",
        "Keep the left leg dependent to improve arterial blood flow to the infection",
        "Raise the left leg on pillows so that it is above the level of the heart",
        "Check capillary blood glucose before meals and at bedtime"
      ],
      answer: [0, 2, 4, 5],
      optionRationales: [
        "Correct. Cultures drawn after antibiotics can be falsely negative, so blood cultures must be collected before the first dose.",
        "Incorrect. CDC recommends standard precautions for cellulitis. Contact precautions are added for draining wounds or infections such as MRSA abscesses with drainage that cannot be contained.",
        "Correct. Marking the border with date and time gives an objective baseline for judging whether the infection is spreading or receding.",
        "Incorrect. A dependent position increases venous congestion and edema. The client's arterial flow is already adequate (2+ pulses).",
        "Correct. Elevation above heart level promotes venous and lymphatic drainage and reduces swelling and pain.",
        "Correct. Infection raises blood glucose, and hyperglycemia impairs healing and immunity. Glucose monitoring with sliding-scale insulin is part of the plan."
      ],
      rationale: "Care for cellulitis combines collaborative orders (cultures before antibiotics, IV antibiotics, glucose control) with independent nursing actions (elevation, marking and trending the border, comfort measures). Standard precautions are enough when there is no drainage. Dependent positioning makes edema worse.",
      takeaway: "Cellulitis plan: cultures before antibiotics, elevate, mark the border, control glucose, standard precautions unless it drains.",
      hintContent: "Recall CDC's precaution level for nondraining cellulitis and why elevating a swollen extremity helps.",
      hintStrategy: "Treat each option as true or false for this client. Check each one against the Orders tab and the finding that the leg is not draining."
    },
    {
      id: "m21c-005",
      caseId: "m21c-case-cellulitis",
      caseOrder: 5,
      type: "mcq",
      topic: "infectious-skin-disorders",
      ref: "Module 21 · Tissue Integrity · NGN Case Study: Lower-Leg Cellulitis",
      difficulty: 3,
      clientNeed: "Physiological Integrity: Physiological Adaptation",
      cjmm: "Take Action",
      focus: "Prioritization",
      exhibit: {
        tabs: [
          { title: "Nurses' Notes", html: "<p><strong>Day 2, 0600:</strong> Client received cefazolin at 1700, 0100. Now reports shaking chills. Oriented to person and place only (was oriented ×4). Discoloration and warmth now extend 3 cm above the line marked at 1700. No crepitus or bullae. Urine output 90 mL over the last 4 hours.</p>" },
          { title: "Vital Signs", table: { headers: ["Time", "T", "HR", "RR", "BP", "SpO₂"], rows: [["Day 1 2000", "38.2 °C (100.8 °F)", "100", "18", "128/76", "97% RA"], ["Day 2 0600", "39.3 °C (102.7 °F)", "124", "26", "88/50", "94% RA"]] } }
        ]
      },
      stem: "Refer to the Nurses' Notes and Vital Signs. Which action should the nurse take first?",
      options: [
        "Re-outline the new border and reassess the leg in 1 hour",
        "Call the rapid response team to report suspected sepsis",
        "Give the PRN acetaminophen and recheck temperature in 30 minutes",
        "Raise the leg higher and apply a cool compress to the area"
      ],
      answer: 1,
      optionRationales: [
        "Documenting the spread is appropriate, but waiting an hour delays care for a client who is now hypotensive and confused.",
        "Correct. New confusion, hypotension (BP 88/50, MAP about 63 mm Hg), tachycardia, tachypnea, fever, low urine output, and a spreading infection suggest sepsis with hypoperfusion. The nurse escalates now so that fluids, lactate, and broader antibiotics can start quickly.",
        "Treating the fever is a comfort measure. It does not address hypotension and altered mental status, which are signs of organ hypoperfusion.",
        "Elevation and comfort measures are ongoing care. They do not treat the systemic deterioration."
      ],
      rationale: "The client's condition has changed from local infection with SIRS to probable sepsis: altered mentation, SBP < 100 mm Hg, RR ≥ 22/min, and oliguria (about 22 mL/hr). Unstable before stable: this change needs immediate escalation (rapid response team or provider via SBAR) so that sepsis bundle care can begin. Local wound measures and antipyretics do not reverse hypoperfusion.",
      takeaway: "Spreading cellulitis + new confusion + hypotension = sepsis. Escalate immediately.",
      hintContent: "Compare Day 2 with Day 1. New confusion, SBP < 100 mm Hg, and RR ≥ 22/min are qSOFA warning signs.",
      hintStrategy: "The stem asks what to do FIRST. Decide whether the client is stable or unstable. If unstable, choose the action that gets the client definitive treatment fastest."
    },
    {
      id: "m21c-006",
      caseId: "m21c-case-cellulitis",
      caseOrder: 6,
      type: "matrix",
      topic: "infectious-skin-disorders",
      ref: "Module 21 · Tissue Integrity · NGN Case Study: Lower-Leg Cellulitis",
      difficulty: 2,
      clientNeed: "Physiological Integrity: Physiological Adaptation",
      cjmm: "Evaluate Outcomes",
      focus: "Assessment Findings",
      exhibit: {
        tabs: [
          { title: "Nurses' Notes", html: "<p><strong>Day 5, 0800:</strong> Client received fluid resuscitation and was changed to broad-spectrum IV antibiotics on day 2. Alert and oriented ×4. Warmth and violet-brown discoloration now 2 cm inside the most recent marked line; leg less tense. Pain 2/10. Skin between left 4th and 5th toes remains white, moist, and fissured. Blood cultures: group A <em>Streptococcus</em>, susceptible to the current antibiotic.</p>" },
          { title: "Vital Signs", table: { headers: ["Time", "T", "HR", "RR", "BP", "SpO₂"], rows: [["Day 5 0800", "37.2 °C (99.0 °F)", "82", "16", "126/74", "98% RA"]] } },
          { title: "Laboratory Results", table: { headers: ["Test", "Day 1", "Day 5", "Reference range"], rows: [["WBC", "15,800/mm³", "9,200/mm³", "5,000–10,000/mm³"], ["Fasting glucose", "—", "251 mg/dL", "70–99 mg/dL"]] } }
        ]
      },
      stem: "Refer to the Nurses' Notes, Vital Signs, and Laboratory Results. For each finding, indicate whether it shows that the client's condition is improving (the interventions are effective) or not improving (it needs further intervention).",
      rows: [
        "Temperature, heart rate, and mental status",
        "Size of the discolored, warm area",
        "WBC count",
        "Fasting blood glucose",
        "Skin between the 4th and 5th toes"
      ],
      columns: ["Improving", "Not improving"],
      answer: [0, 0, 0, 1, 1],
      optionRationales: [
        "Improving. The client is afebrile with a normal HR and back to baseline orientation, so the systemic response has resolved.",
        "Improving. The inflamed area is receding inside the marked line, which shows the antibiotic is working.",
        "Improving. The WBC count has returned to the normal range.",
        "Not improving. A fasting glucose of 251 mg/dL is still well above target. Hyperglycemia impairs immunity and healing, so the provider and diabetes educator need to adjust the plan.",
        "Not improving. The tinea pedis portal of entry is untreated. Unless it is treated with a topical antifungal and the feet are kept dry, the cellulitis is likely to recur."
      ],
      rationale: "The antibiotic and supportive therapy are working: vital signs, mental status, the size of the area, and the WBC count have all improved. Evaluation also includes the contributing factors. Persistent hyperglycemia and the untreated interdigital tinea are unresolved risks for recurrent cellulitis and should be addressed before discharge.",
      takeaway: "Evaluate the infection AND its causes. Untreated tinea pedis and high glucose set up the next cellulitis.",
      hintContent: "Recall the expected responses to effective treatment of cellulitis, and which factors let the infection start in the first place.",
      hintStrategy: "Compare each finding with its earlier value in the case, or with the normal range. Improving means it has moved toward normal."
    },

    // ===================== STAND-ALONE BOWTIE =====================
    {
      id: "m21c-007",
      type: "bowtie",
      topic: "infectious-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Infectious Skin Disorders",
      difficulty: 3,
      clientNeed: "Physiological Integrity: Physiological Adaptation",
      cjmm: "Prioritize Hypotheses",
      focus: "Nursing Interventions",
      exhibit: {
        tabs: [
          { title: "Nurses' Notes", html: "<p><strong>Clinic, 1015:</strong> 71-year-old client reports 3 days of burning, stabbing pain on the right side of the chest and back. Rash appeared yesterday. Assessment: clusters of fluid-filled vesicles on red bases in a band from the right mid-back to the right side of the sternum; lesions do not cross the midline. No lesions on the face or near the eyes. Client had chickenpox as a child and has not received a zoster vaccine. No immunosuppressive conditions or medications. Lives with spouse; a granddaughter who is 20 weeks pregnant visits daily and does not know whether she has had chickenpox.</p>" },
          { title: "Vital Signs", table: { headers: ["Time", "T", "HR", "RR", "BP", "Pain"], rows: [["1015", "37.4 °C (99.3 °F)", "88", "18", "142/84", "8/10"]] } },
          { title: "Orders", html: "<ul><li>Valacyclovir 1 g PO three times daily × 7 days</li><li>Gabapentin 300 mg PO at bedtime</li><li>Follow up in 1 week</li></ul>" }
        ]
      },
      stem: "Refer to the Nurses' Notes, Vital Signs, and Orders. Complete the diagram by selecting the condition the client is most likely experiencing, 2 actions the nurse should take to address that condition, and 2 parameters the nurse should monitor to assess the client's progress.",
      condition: {
        options: ["Allergic contact dermatitis", "Herpes zoster (shingles)", "Herpes simplex virus infection", "Cellulitis of the chest wall"],
        answer: 1
      },
      actions: {
        options: [
          "Teach the client to keep the rash covered and avoid contact with the pregnant granddaughter until all lesions crust",
          "Arrange direct admission to a negative-pressure airborne isolation room",
          "Instruct the client to begin valacyclovir today and complete the full 7-day course",
          "Apply a topical corticosteroid cream to the vesicles three times daily",
          "Teach the client to open the vesicles so the fluid can drain and dry faster"
        ],
        answer: [0, 2]
      },
      parameters: {
        options: [
          "Pain intensity along the affected dermatome",
          "Serum potassium level",
          "Appearance of lesions, including crusting and any spread beyond the dermatome",
          "Peak expiratory flow rate",
          "Capillary refill in the fingers"
        ],
        answer: [0, 2]
      },
      optionRationales: {
        condition: [
          "Contact dermatitis is itchy, not neuralgic. It follows the pattern of the exposure, not a unilateral dermatome.",
          "Correct. Prodromal burning pain followed by grouped vesicles on a red base in a unilateral dermatomal band that does not cross the midline is classic herpes zoster: reactivation of latent varicella-zoster virus.",
          "HSV usually causes grouped vesicles on the lips or genitals, not a painful thoracic dermatomal band in an older adult.",
          "Cellulitis is a spreading, warm, poorly demarcated area of redness without clustered vesicles in a dermatomal pattern."
        ],
        actions: [
          "Correct. Localized zoster in an immunocompetent client needs standard precautions with lesions covered. Anyone not immune to varicella, especially pregnant people, should avoid contact until all lesions are crusted, because exposure can cause primary varicella.",
          "Incorrect. Airborne plus contact precautions are needed for disseminated zoster or zoster in an immunocompromised host, not localized zoster in a healthy client.",
          "Correct. Antivirals work best when started within 72 hours of rash onset. They shorten the illness and may reduce the risk of postherpetic neuralgia.",
          "Incorrect. Topical corticosteroids are not used on zoster vesicles and may impair local immune defense.",
          "Incorrect. Opening vesicles increases the risk of bacterial superinfection and of spreading the virus."
        ],
        parameters: [
          "Correct. Pain control is a major goal. Pain that persists after the rash heals suggests postherpetic neuralgia.",
          "Incorrect. Nothing in this client's condition or medications affects potassium.",
          "Correct. Lesions should crust within about 7–10 days. New lesions outside the dermatome suggest dissemination and need prompt reporting.",
          "Incorrect. The client has no respiratory disease.",
          "Incorrect. Peripheral perfusion is not affected by zoster."
        ]
      },
      rationale: "The dermatomal vesicular rash after a painful prodrome is herpes zoster. Priority care is early antiviral therapy (within 72 hours) plus preventing spread to susceptible people, such as the pregnant granddaughter, by covering the lesions until they crust. Standard precautions are enough for localized disease in an immunocompetent host. Progress is measured by pain relief and by lesions crusting without spreading. After recovery, the client should receive recombinant zoster vaccine (2 doses) as recommended for adults 50 and older.",
      takeaway: "Shingles: dermatomal, unilateral, painful. Start the antiviral within 72 hours, cover the lesions, and keep the client away from nonimmune pregnant people and infants.",
      hintContent: "Recall the distribution of zoster lesions, why antiviral timing matters, and how zoster spreads to people who have never had chickenpox.",
      hintStrategy: "Start in the middle of the bowtie: name the condition from the rash pattern. Then choose only the actions and parameters that match that condition in an immunocompetent client."
    },

    // ===================== STAND-ALONE HIGHLIGHT ITEMS =====================
    {
      id: "m21c-008",
      type: "highlight",
      topic: "lifespan-skin",
      ref: "Module 21 · Tissue Integrity · Lifespan Considerations – Older Adults",
      difficulty: 3,
      clientNeed: "Health Promotion and Maintenance",
      cjmm: "Recognize Cues",
      focus: "Lifespan & Diversity",
      exhibit: {
        tabs: [
          { title: "History", html: "<p>84-year-old client with hypertension and osteoarthritis. Lives with an adult son who is the primary caregiver. Medications: amlodipine, acetaminophen PRN. Home health nurse's first visit.</p>" }
        ]
      },
      stem: "The home health nurse is performing a skin assessment. Refer to the History, then read the skin assessment note. Click to highlight the findings that require follow-up.",
      passage: "Skin on the backs of both hands is {{thin and translucent with visible veins}}. {{Flat, dark purple patches on the backs of both forearms}}; client says they appear “with the smallest bump.” {{Several oval bruises in different shades of purple, green, and yellow on both inner upper arms}}. {{Dry, flaky skin on both lower legs}}. {{Multiple waxy, brown, “stuck-on” raised lesions on the back}}. {{Small, bright red papules scattered on the trunk}}. A {{9-mm dark mole on the left calf with a notched, irregular border}} that the client says “seems bigger.” {{A pearly sore on the right ear rim that has bled on and off for 2 months}}.",
      answer: [2, 6, 7],
      optionRationales: [
        "Expected. Loss of dermal collagen and subcutaneous fat makes older adult skin thin and translucent.",
        "Expected. Senile (actinic) purpura on the dorsal forearms comes from fragile dermal vessels in sun-damaged skin.",
        "Requires follow-up. Bruises in different stages of healing on the protected inner upper arms fit a pattern of being grabbed. The nurse should assess further for elder abuse and report as required.",
        "Expected. Fewer, less active sebaceous and sweat glands cause xerosis in older adults.",
        "Expected. Seborrheic keratoses are benign, waxy, stuck-on lesions that are very common with aging.",
        "Expected. Cherry angiomas are benign vascular papules that increase with age.",
        "Requires follow-up. A mole that is asymmetric, has an irregular border, is > 6 mm, and is evolving meets several ABCDE criteria for melanoma.",
        "Requires follow-up. A pearly lesion that bleeds and does not heal on a sun-exposed area suggests basal cell carcinoma and needs referral."
      ],
      rationale: "Many skin changes are normal with aging: thinning, xerosis, senile purpura, seborrheic keratoses, and cherry angiomas. The nurse must tell these apart from findings that suggest harm or cancer. Patterned bruises of different ages on protected areas raise concern for abuse. An evolving, irregular mole and a nonhealing, bleeding lesion on the ear need prompt referral for evaluation for skin cancer.",
      takeaway: "Know normal aging skin so that you can recognize what is not normal: patterned bruises, evolving moles, and sores that do not heal.",
      hintContent: "Recall normal older adult skin findings (thinning, xerosis, senile purpura, benign growths), the ABCDE rule, and the typical location of accidental versus inflicted bruises.",
      hintStrategy: "For each segment, ask whether it is an expected age-related change or a sign of harm or disease. Also note where each bruise is located."
    },
    {
      id: "m21c-009",
      type: "highlight",
      topic: "inflammatory-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Inflammatory Skin Disorders",
      difficulty: 3,
      clientNeed: "Physiological Integrity: Pharmacological and Parenteral Therapies",
      cjmm: "Recognize Cues",
      focus: "Pharmacology",
      exhibit: {
        tabs: [
          { title: "Medication Administration Record", html: "<ul><li>Lamotrigine 25 mg PO daily (started 12 days ago)</li><li>Sertraline 50 mg PO daily (8 months)</li><li>Adapalene 0.1% gel to face at bedtime (1 year)</li></ul>" },
          { title: "Vital Signs", table: { headers: ["Time", "T", "HR", "RR", "BP", "SpO₂"], rows: [["0930", "38.9 °C (102.0 °F)", "112", "20", "118/72", "97% RA"]] } }
        ]
      },
      stem: "A 26-year-old client with bipolar disorder calls the clinic and is seen the same day. Refer to the Medication Administration Record and Vital Signs, then read the nurse's assessment note. Click to highlight the findings that require immediate follow-up.",
      passage: "Client reports 2 days of fever, sore throat, and body aches, followed by a rash that started this morning. Client says the skin {{burns and hurts to touch}}. {{Flat, dusky red spots with darker purple centers}} on the chest and back. {{Painful sores and crusts on the lips and inside the mouth}}. When the nurse presses gently beside a lesion, {{the top layer of skin wrinkles and slides off}}. {{A few small closed comedones on the forehead}}. {{Dry, cracked skin on both heels}}. Client {{has been sleeping about 7 hours a night}}.",
      answer: [0, 1, 2, 3],
      optionRationales: [
        "Requires immediate follow-up. Skin pain that is out of proportion to the rash is an early warning sign of Stevens-Johnson syndrome/toxic epidermal necrolysis (SJS/TEN).",
        "Requires immediate follow-up. Dusky, atypical target-like macules on the trunk after a flu-like prodrome suggest SJS.",
        "Requires immediate follow-up. Mucosal erosions of the lips and mouth are a hallmark of SJS. Mucosal involvement separates it from a simple drug rash.",
        "Requires immediate follow-up. Epidermis that separates with gentle lateral pressure (positive Nikolsky sign) shows epidermal detachment.",
        "Does not require immediate follow-up. Mild comedonal acne is expected and is being treated with adapalene.",
        "Does not require immediate follow-up. Xerosis of the heels is a minor, chronic problem.",
        "Does not require immediate follow-up. Stable sleep suggests the bipolar disorder is controlled. It is not related to the acute rash."
      ],
      rationale: "Lamotrigine carries a boxed warning for serious rashes, including SJS/TEN, most often within the first 2–8 weeks or with rapid dose increases. A febrile prodrome, painful skin, dusky target-like lesions, mucosal erosions, and a positive Nikolsky sign form a severe cutaneous drug reaction. The drug must be stopped and the client transferred emergently for care like that for a burn. Minor acne, dry heels, and normal sleep are not urgent.",
      takeaway: "New drug + fever + painful skin + mucosal sores = SJS/TEN until proven otherwise. Stop the drug and escalate.",
      hintContent: "Some drug reactions start like the flu and then affect the skin and mucous membranes. Recall which anticonvulsant carries a boxed warning for serious rash.",
      hintStrategy: "Link the timing of the new medication to the symptoms. Highlight only the findings that point to a dangerous reaction, not chronic, stable problems."
    },

    // ===================== SKIN STRUCTURE & FUNCTION =====================
    {
      id: "m21c-010",
      type: "mcq",
      topic: "skin-structure-function",
      ref: "Module 21 · Tissue Integrity · Functions of the Skin",
      difficulty: 1,
      clientNeed: "Health Promotion and Maintenance",
      cjmm: "Analyze Cues",
      focus: "Lifespan & Diversity",
      stem: "The clinic nurse is reviewing four clients' histories during intake. Which client should the nurse identify as having the greatest risk for vitamin D deficiency related to reduced skin synthesis?",
      options: [
        "A 24-year-old outdoor lifeguard with light skin who uses SPF 30 sunscreen",
        "A 45-year-old landscaper with medium skin who works outside year-round",
        "An 86-year-old homebound client with dark skin who rarely goes outdoors",
        "A 16-year-old soccer player with dark skin who practices outdoors daily"
      ],
      answer: 2,
      optionRationales: [
        "Regular sun exposure lets the skin synthesize vitamin D, even with sunscreen in real-world use.",
        "Year-round outdoor work gives frequent UV exposure for vitamin D synthesis.",
        "Correct. The skin makes vitamin D when exposed to UVB. Several factors add up here: aging skin makes less vitamin D precursor, melanin reduces UVB absorption, and being homebound means little sun exposure.",
        "Darker skin needs more UV exposure, but daily outdoor practice gives this adolescent enough sun."
      ],
      rationale: "Vitamin D synthesis is a key skin function. It depends on UVB reaching the epidermis. Older age (less 7-dehydrocholesterol in the skin), more melanin, and limited sun exposure each lower production, and this client has all three.",
      takeaway: "Older age + dark skin + homebound = triple risk for low vitamin D.",
      hintContent: "Think about what the skin needs in order to make vitamin D and what reduces that process.",
      hintStrategy: "Count the risk factors for each client. The best answer usually has several that add up."
    },
    {
      id: "m21c-011",
      type: "mcq",
      topic: "skin-structure-function",
      ref: "Module 21 · Tissue Integrity · Functions of the Skin",
      difficulty: 2,
      clientNeed: "Health Promotion and Maintenance",
      cjmm: "Evaluate Outcomes",
      focus: "Client Teaching",
      stem: "The nurse has taught a client with diabetic peripheral neuropathy how to protect the skin of the feet. Monofilament testing shows absent sensation on both soles. Which statement by the client indicates a need for further teaching?",
      options: [
        "“I will look at the bottoms of my feet with a mirror every night.”",
        "“I will wear shoes or slippers even when I'm inside the house.”",
        "“I will shake out my shoes and feel inside them before I put them on.”",
        "“I will test my bath water by dipping my foot in before I get in.”"
      ],
      answer: 3,
      optionRationales: [
        "Correct practice. Daily visual inspection makes up for the lost protective sensation.",
        "Correct practice. Footwear protects insensate feet from unnoticed trauma.",
        "Correct practice. The client may not feel a pebble or rough seam, so the client checks shoes by hand or by looking.",
        "Needs further teaching. A foot without sensation cannot detect dangerous heat. The client should test water with a thermometer or an elbow to avoid burns."
      ],
      rationale: "Sensation is a protective function of the skin. When neuropathy removes it, the client must replace feeling with looking and with testing by another body part or a device. Using the numb foot to test water temperature risks a serious burn.",
      takeaway: "No feeling in the feet? Use eyes, hands, and a thermometer, not the feet.",
      hintContent: "Recall which skin function the dermal nerve endings serve and what happens when neuropathy destroys them.",
      hintStrategy: "This is a negatively worded item. Look for the unsafe statement."
    },
    {
      id: "m21c-012",
      type: "matrix",
      topic: "skin-structure-function",
      ref: "Module 21 · Tissue Integrity · Functions of the Skin",
      difficulty: 2,
      clientNeed: "Physiological Integrity: Physiological Adaptation",
      cjmm: "Analyze Cues",
      focus: "Pathophysiology",
      stem: "The nurse is reviewing several clients' problems related to impaired skin function. For each client finding, indicate which skin function is primarily impaired.",
      rows: [
        "A client with extensive open abrasions from a motorcycle crash develops a wound infection",
        "An 88-year-old client with little subcutaneous fat shivers in a room that feels comfortable to staff",
        "A client with a spinal cord injury does not notice a hot beverage spilled on the lap",
        "A client with widespread blistering skin loss becomes hypothermic after a dressing change",
        "A client with leprosy (Hansen disease) has painless cuts on the hands"
      ],
      columns: ["Protection (barrier)", "Temperature regulation", "Sensation"],
      answer: [0, 1, 2, 1, 2],
      optionRationales: [
        "Protection. Intact epidermis is the barrier against microorganisms, and the abrasions breached it.",
        "Temperature regulation. Loss of subcutaneous fat (insulation) with aging impairs heat conservation.",
        "Sensation. Loss of sensory input from the skin below the injury removes the warning signal for pain and heat.",
        "Temperature regulation. Without intact skin, heat is lost through evaporation and exposed surfaces, especially during wound exposure.",
        "Sensation. Hansen disease damages peripheral nerves, so injuries go unnoticed."
      ],
      rationale: "The skin protects against pathogens and trauma, regulates temperature through blood vessels, sweat glands, and subcutaneous insulation, and gives sensation through dermal receptors. Naming which function has failed guides the nursing action: infection prevention, warming, or protection from injury the client cannot feel.",
      takeaway: "Match the failure to the function: infection = barrier, cold or heat = regulation, unnoticed injury = sensation.",
      hintContent: "Review the main skin functions and the layer that performs each.",
      hintStrategy: "For each row, ask what went wrong for the client (infection, temperature, or feeling) rather than what caused it."
    },
    {
      id: "m21c-013",
      type: "mcq",
      topic: "skin-structure-function",
      ref: "Module 21 · Tissue Integrity · Functions of the Skin",
      difficulty: 3,
      clientNeed: "Physiological Integrity: Physiological Adaptation",
      cjmm: "Take Action",
      focus: "Prioritization",
      exhibit: {
        tabs: [
          { title: "Home Visit Note", html: "<p><strong>1500:</strong> Heat advisory day 3. Apartment thermostat reads 34 °C (93 °F); air conditioner broken. 86-year-old client found sitting in a chair, confused, and unable to state the date. Skin hot, flushed, and dry. T 40.3 °C (104.5 °F), HR 124, RR 24, BP 98/58. Client takes furosemide daily.</p>" }
        ]
      },
      stem: "The home health nurse is visiting an older adult client. Refer to the Home Visit Note. Which action should the nurse take first?",
      options: [
        "Call 911 and begin cooling the client with wet cloths and a fan",
        "Encourage the client to drink 1 L of cool water over the next hour",
        "Hold the furosemide and call the provider to report the client's findings",
        "Give acetaminophen to reduce the temperature and recheck it in 1 hour"
      ],
      answer: 0,
      optionRationales: [
        "Correct. A core temperature > 40 °C (104 °F) with altered mental status and hot, dry skin suggests heat stroke, which is life-threatening. Rapid cooling and emergency transport are the priorities.",
        "A confused client has an aspiration risk, and oral fluids alone will not cool the body fast enough.",
        "Addressing the diuretic is appropriate later but does not treat the immediate emergency.",
        "Heat stroke is not a hypothalamic fever. Antipyretics do not work and delay effective cooling."
      ],
      rationale: "Older adults have fewer sweat glands, reduced dermal blood flow, and diminished thirst, so they lose skin-mediated heat regulation. Diuretics add dehydration. Hot, dry skin with confusion and a temperature above 40 °C is heat stroke. Immediate external cooling and EMS activation come before any other action.",
      takeaway: "Older adult + heat + confusion + hot, dry skin = heat stroke. Cool now and call 911.",
      hintContent: "Recall how aging changes sweat gland function and why heat stroke is different from a fever.",
      hintStrategy: "Look for signs of neurologic compromise. Choose the action that reverses the life threat fastest."
    },
    {
      id: "m21c-014",
      type: "dropdown",
      topic: "skin-structure-function",
      ref: "Module 21 · Tissue Integrity · Layers of the Skin",
      difficulty: 2,
      clientNeed: "Physiological Integrity: Pharmacological and Parenteral Therapies",
      cjmm: "Analyze Cues",
      focus: "Pharmacology",
      stem: "A 67-year-old client with COPD has taken prednisone 20 mg PO daily for 2 years. The nurse notes thin, shiny skin on the forearms with several purple bruises and a healing skin tear. Complete the following sentence by choosing from the lists of options.",
      template: "These skin changes are most likely caused by {0}, which reduces {1} in the dermis. The client is at highest risk for {2}.",
      blanks: [
        { options: ["long-term corticosteroid therapy", "chronic hypoxemia", "vitamin C toxicity", "hypothyroidism"], answer: 0 },
        { options: ["collagen formation", "melanin production", "keratin production", "sebum secretion"], answer: 0 },
        { options: ["new skin tears", "keloid formation", "melasma", "psoriatic plaques"], answer: 0 }
      ],
      rationale: "Systemic corticosteroids inhibit fibroblasts and collagen synthesis. This causes dermal atrophy, fragile capillaries (steroid purpura), and poor wound healing. Thin skin with weak dermal support tears easily with shearing or friction, so the nurse uses gentle handling, lift sheets, padding, and no adhesive tape.",
      takeaway: "Long-term steroids thin the dermis, so handle the skin like tissue paper.",
      hintContent: "The dermis gets its strength from a structural protein made by fibroblasts. Recall which medication class suppresses them.",
      hintStrategy: "Complete the blanks in order. The first answer (the cause) should explain the second (the mechanism) and the third (the risk)."
    },

    // ===================== SKIN ASSESSMENT & LESIONS =====================
    {
      id: "m21c-015",
      type: "mcq",
      topic: "skin-assessment-lesions",
      ref: "Module 21 · Tissue Integrity · Cultural Considerations in Skin Assessment",
      difficulty: 1,
      clientNeed: "Health Promotion and Maintenance",
      cjmm: "Recognize Cues",
      focus: "Lifespan & Diversity",
      stem: "A client with deeply pigmented skin is admitted with suspected hepatitis. Total bilirubin is 4.8 mg/dL. The nurse notes a slight yellowish tint at the outer edges of the sclera. Which assessment should the nurse perform next to confirm jaundice?",
      options: [
        "Press on the nail beds and time the capillary refill",
        "Inspect the hard palate and the palms of the hands",
        "Inspect the lower eyelid conjunctiva for pallor",
        "Compare the skin color on the chest with the forearms"
      ],
      answer: 1,
      optionRationales: [
        "Capillary refill assesses peripheral perfusion, not jaundice.",
        "Correct. In dark skin, the sclera can normally look yellowish at the edges from subconjunctival fat, and carotene can tint the skin. Yellow on the hard palate, palms, and soles confirms jaundice more reliably.",
        "The conjunctiva is assessed for pallor (anemia), not jaundice.",
        "Jaundice is hard to see in deeply pigmented skin, so general skin color is not a reliable indicator."
      ],
      rationale: "In deeply pigmented skin, assess color changes where melanin is minimal. For jaundice, the best sites are the hard palate, palms, and soles, along with the center of the sclera. Pallor is best seen in the conjunctiva and mucosa, and cyanosis in the lips, nail beds, and buccal mucosa.",
      takeaway: "Jaundice in dark skin: check the hard palate, palms, and soles, not just the sclera.",
      hintContent: "Recall where melanin is thinnest and why peripheral sclera can be misleading in darker skin.",
      hintStrategy: "Eliminate the options that assess a different color change (perfusion, pallor) than the one in the stem."
    },
    {
      id: "m21c-016",
      type: "mcq",
      topic: "skin-assessment-lesions",
      ref: "Module 21 · Tissue Integrity · Skin Lesions",
      difficulty: 3,
      clientNeed: "Safe and Effective Care Environment: Management of Care",
      cjmm: "Prioritize Hypotheses",
      focus: "Prioritization",
      stem: "The nurse receives hand-off report on four clients with skin findings. Which client should the nurse assess first?",
      options: [
        "A client with psoriasis who has silvery, scaly plaques on both elbows",
        "An older adult with several waxy, stuck-on brown papules on the upper back",
        "An adolescent with scattered pustules on the forehead and chin",
        "A client with new raised wheals on the trunk who reports a hoarse voice"
      ],
      answer: 3,
      optionRationales: [
        "Chronic, stable psoriatic plaques are not an immediate threat.",
        "Seborrheic keratoses are benign age-related lesions.",
        "Acne vulgaris is common in adolescents and is not urgent.",
        "Correct. Wheals (urticaria) with a new hoarse voice suggest a systemic allergic reaction with possible laryngeal edema. This is an airway threat that needs immediate assessment."
      ],
      rationale: "Most skin lesions are chronic or benign. When a skin finding comes with airway symptoms, the client moves to the top of the list. Hoarseness with wheals suggests angioedema of the larynx or early anaphylaxis. Airway comes first.",
      takeaway: "Wheals + a voice change = airway emergency, not a skin problem.",
      hintContent: "Recall what primary lesion a wheal is and what systemic process it can signal.",
      hintStrategy: "Apply the ABCs. Look for any option that includes a cue beyond the skin that threatens the airway, breathing, or circulation."
    },
    {
      id: "m21c-017",
      type: "sata",
      topic: "skin-assessment-lesions",
      ref: "Module 21 · Tissue Integrity · Skin Lesions",
      difficulty: 2,
      clientNeed: "Physiological Integrity: Reduction of Risk Potential",
      cjmm: "Recognize Cues",
      focus: "Assessment Findings",
      stem: "A client comes to the clinic with a rash on the torso that began 4 days ago. Which data should the nurse collect during the focused skin assessment? Select all that apply.",
      options: [
        "Size of representative lesions measured in millimeters or centimeters",
        "Distribution and arrangement of the lesions (for example, linear, clustered, dermatomal)",
        "Any new medications, soaps, foods, or exposures before the rash appeared",
        "The content of a pustule obtained by squeezing it onto gauze",
        "Associated symptoms such as itching, pain, or fever",
        "The likely diagnosis based on the appearance of the rash"
      ],
      answer: [0, 1, 2, 4],
      optionRationales: [
        "Correct. Measured, objective dimensions let the team trend changes over time.",
        "Correct. The pattern and distribution (for example, dermatomal in zoster or linear in poison ivy) are major clues to the cause.",
        "Correct. A history of new drugs, products, and exposures helps identify allergic, irritant, and drug reactions.",
        "Incorrect. Squeezing a lesion injures tissue and can spread infection. A culture, if needed, is collected by swab per protocol.",
        "Correct. Subjective symptoms (pruritus, pain, systemic signs) guide the differential and the priority.",
        "Incorrect. The nurse describes and documents findings. Making the medical diagnosis is outside RN scope."
      ],
      rationale: "A complete focused skin assessment includes objective lesion data (type, size, color, shape, arrangement, distribution, exudate), subjective data (onset, symptoms), and history (medications, exposures, contacts). The nurse documents precisely and avoids harmful techniques and medical diagnosis.",
      takeaway: "Describe, measure, map, and ask what changed. Don't squeeze, and don't diagnose.",
      hintContent: "Recall the elements of a lesion description and the history questions that point to the cause of a rash.",
      hintStrategy: "Judge each option on its own: is it within RN scope, safe, and useful for describing the rash?"
    },
    {
      id: "m21c-018",
      type: "mcq",
      topic: "skin-assessment-lesions",
      ref: "Module 21 · Tissue Integrity · Diagnostic Tests",
      difficulty: 2,
      clientNeed: "Physiological Integrity: Reduction of Risk Potential",
      cjmm: "Take Action",
      focus: "Client Teaching",
      stem: "A client with recurrent hand dermatitis has allergy patches applied to the upper back for patch testing. The client asks what to do until the next appointment in 48 hours. Which instruction should the nurse give?",
      options: [
        "“Shower as usual, but pat the patches dry afterward.”",
        "“Remove any patch that itches and note which one it was.”",
        "“Keep your back dry and avoid heavy sweating or exercise.”",
        "“Apply hydrocortisone cream around the patches if they itch.”"
      ],
      answer: 2,
      optionRationales: [
        "Wetting the patches can loosen them and dilute the allergens, which invalidates the test.",
        "Some itching is expected with a positive reaction. Removing a patch early loses the result.",
        "Correct. Patches must stay dry and in place for about 48 hours so that the allergens stay in contact with the skin. Water or sweat can dislodge them.",
        "Topical steroids near the test sites suppress the reaction and can cause false-negative results."
      ],
      rationale: "Patch testing identifies the allergen in allergic contact dermatitis (a delayed type IV reaction). Allergens stay on the back for about 48 hours and are read at removal and again a few days later. The client keeps the area dry, limits activity that causes sweating, and avoids topical steroids on the test area.",
      takeaway: "Patch test: keep the patches dry, in place, and steroid-free until the reading.",
      hintContent: "Patch testing looks for a delayed hypersensitivity reaction. Think about what would stop the allergen from contacting the skin or would suppress the reaction.",
      hintStrategy: "Ask which option protects the accuracy of the test. Anything that removes, wets, or suppresses the reaction ruins it."
    },
    {
      id: "m21c-019",
      type: "dropdown",
      topic: "skin-assessment-lesions",
      ref: "Module 21 · Tissue Integrity · Skin as a Reflection of Systemic Disease",
      difficulty: 2,
      clientNeed: "Physiological Integrity: Reduction of Risk Potential",
      cjmm: "Analyze Cues",
      focus: "Assessment Findings",
      exhibit: {
        tabs: [
          { title: "Laboratory Results", table: { headers: ["Test", "Result", "Reference range"], rows: [["Platelets", "18,000/mm³", "150,000–400,000/mm³"], ["Hemoglobin", "10.9 g/dL", "12–16 g/dL"], ["WBC", "3,100/mm³", "5,000–10,000/mm³"]] } }
        ]
      },
      stem: "A client receiving chemotherapy has many pinpoint, flat, reddish-purple spots on both lower legs and oozing from the gums. Refer to the Laboratory Results. Complete the following sentence by choosing from the lists of options.",
      template: "The lesions are most consistent with {0}. The nurse confirms this by noting that the lesions {1}. The priority nursing action is to {2}.",
      blanks: [
        { options: ["petechiae", "cherry angiomas", "spider angiomas", "milia"], answer: 0 },
        { options: ["do not blanch with pressure", "blanch with pressure", "are raised and fluid-filled"], answer: 0 },
        { options: ["implement bleeding precautions", "apply warm compresses to the legs", "teach daily sunscreen use"], answer: 0 }
      ],
      rationale: "Petechiae are pinpoint, flat, nonblanching hemorrhages into the skin. With a platelet count of 18,000/mm³ and gum bleeding, they show that thrombocytopenia is putting the client at risk for serious bleeding. Nonblanching (bleeding into tissue) separates them from vascular lesions such as angiomas, which blanch. Bleeding precautions include a soft toothbrush, an electric razor, no IM injections, fall prevention, and reporting new bleeding.",
      takeaway: "Pinpoint + flat + nonblanching = petechiae, which means low platelets. Start bleeding precautions.",
      hintContent: "Skin lesions can reflect systemic disease. Recall which lesions come from blood leaking out of vessels and how blanching tells them apart.",
      hintStrategy: "Use the platelet count in the exhibit to anchor your first choice, then choose the test and action that follow from it."
    },

    // ===================== INFECTIOUS SKIN DISORDERS =====================
    {
      id: "m21c-020",
      type: "mcq",
      topic: "infectious-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Infectious Skin Disorders",
      difficulty: 1,
      clientNeed: "Safe and Effective Care Environment: Safety and Infection Control",
      cjmm: "Take Action",
      focus: "Delegation & Safety",
      stem: "A 6-year-old admitted for asthma is found to have honey-crusted lesions on the chin that are diagnosed as impetigo. Topical mupirocin is started today. Which infection control measure should the nurse implement?",
      options: [
        "Contact precautions until 24 hours after effective therapy begins",
        "Droplet precautions until all of the crusted lesions have fully healed",
        "Airborne precautions in a negative-pressure room for 48 hours",
        "Standard precautions only, with the lesions left open to air"
      ],
      answer: 0,
      optionRationales: [
        "Correct. CDC recommends contact precautions for impetigo until 24 hours after effective therapy is started.",
        "Impetigo spreads by direct contact, not droplets.",
        "Impetigo is not airborne.",
        "Standard precautions alone do not prevent spread of this highly contagious bacterial skin infection in a hospital."
      ],
      rationale: "Impetigo (Staphylococcus aureus or group A Streptococcus) spreads by direct contact with lesions or contaminated items. Contact precautions (gown and gloves) continue until 24 hours after effective treatment begins. The same rule applies to children returning to school or daycare.",
      takeaway: "Impetigo = contact precautions until 24 hours of effective therapy.",
      hintContent: "Recall how impetigo is spread and CDC's rule for when the child is no longer contagious.",
      hintStrategy: "Match the route of transmission to the type of precaution. Then check that the duration also fits."
    },
    {
      id: "m21c-021",
      type: "sata",
      topic: "infectious-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Infectious Skin Disorders",
      difficulty: 3,
      clientNeed: "Safe and Effective Care Environment: Safety and Infection Control",
      cjmm: "Take Action",
      focus: "Delegation & Safety",
      stem: "In a long-term care facility, a resident is diagnosed with scabies, and two staff members who provided care report new itching. The charge nurse is coordinating the facility's response. Which actions should the nurse take? Select all that apply.",
      options: [
        "Place the resident on contact precautions with gown and gloves for all direct care",
        "Arrange for the resident, exposed residents, and exposed staff to be treated at the same time",
        "Machine-wash the resident's bedding and clothing used in the past 3 days in hot water and dry on high heat",
        "Remove precautions as soon as the resident reports that the itching has stopped",
        "Seal items that cannot be washed in a plastic bag for at least 72 hours",
        "Apply permethrin cream only to the areas where burrows are visible"
      ],
      answer: [0, 1, 2, 4],
      optionRationales: [
        "Correct. Scabies spreads by prolonged skin-to-skin contact and contaminated linens. CDC recommends contact precautions until 24 hours after effective treatment.",
        "Correct. Treating all close contacts at the same time prevents reinfestation between people.",
        "Correct. Hot washing and high-heat drying of items used within the previous 3 days kills mites and eggs.",
        "Incorrect. Itching can last 2–4 weeks after successful treatment because of hypersensitivity to dead mites. Stopping precautions depends on time after treatment, not on symptoms.",
        "Correct. Mites cannot survive more than 2–3 days away from human skin, so bagging nonwashable items for at least 72 hours kills them.",
        "Incorrect. Permethrin 5% is applied to all skin from the neck down (including the scalp and face in older adults, per protocol) because mites are present beyond the visible burrows."
      ],
      rationale: "Controlling a scabies outbreak needs contact precautions, treatment of the index case and all contacts at the same time, laundering or bagging of personal items, and whole-body application of the scabicide. Staff often become symptomatic, and older adults may have atypical or crusted scabies, which is highly contagious.",
      takeaway: "Scabies: treat everyone at once, head to toe. Hot-wash or bag for 72 hours. Itching can last weeks.",
      hintContent: "Recall how long the scabies mite survives off the body and why itching continues after the mites are dead.",
      hintStrategy: "Each option is a separate true/false statement. Check each for timing (how long) and extent (how much skin)."
    },
    {
      id: "m21c-022",
      type: "mcq",
      topic: "infectious-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Infectious Skin Disorders",
      difficulty: 3,
      clientNeed: "Physiological Integrity: Physiological Adaptation",
      cjmm: "Prioritize Hypotheses",
      focus: "Prioritization",
      stem: "The nurse on a medical unit is reviewing four clients with skin infections. Which client's findings require the nurse's immediate attention?",
      options: [
        "A client with localized shingles whose lesions are now dry and crusted",
        "A client with tinea pedis who reports itching and scaling between the toes",
        "A client with thigh cellulitis whose pain is severe and who has crepitus",
        "A client with impetigo who has honey-colored crusts around the nostrils"
      ],
      answer: 2,
      optionRationales: [
        "Crusted zoster lesions show the disease is resolving.",
        "Tinea pedis is a superficial fungal infection that is not urgent.",
        "Correct. Pain out of proportion to the appearance of the skin and crepitus (gas in the tissue) are red flags for necrotizing soft-tissue infection, a surgical emergency with a high death rate.",
        "Impetigo is superficial and is expected to respond to topical or oral antibiotics."
      ],
      rationale: "Most skin infections are superficial and stable. Necrotizing fasciitis may look like cellulitis at first, but pain out of proportion to the findings, crepitus, rapid spread, dusky or bullous skin, and systemic toxicity point to a fast-moving deep infection. It needs immediate notification of the provider for surgical debridement.",
      takeaway: "Cellulitis with pain out of proportion or crepitus: think necrotizing fasciitis and call immediately.",
      hintContent: "Recall which findings separate a routine soft-tissue infection from a deep, rapidly spreading one.",
      hintStrategy: "Three of these are stable or improving. Look for the one cue that signals rapid tissue destruction."
    },
    {
      id: "m21c-023",
      type: "sata",
      topic: "infectious-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Infectious Skin Disorders",
      difficulty: 1,
      clientNeed: "Health Promotion and Maintenance",
      cjmm: "Generate Solutions",
      focus: "Client Teaching",
      stem: "A 35-year-old client who runs daily is diagnosed with tinea pedis and prescribed a topical antifungal cream. Which instructions should the nurse include in the teaching plan? Select all that apply.",
      options: [
        "Dry thoroughly between the toes after bathing",
        "Wear cotton or moisture-wicking socks and change them when damp",
        "Stop the cream as soon as the itching goes away",
        "Wear sandals or shower shoes in locker rooms and public showers",
        "Rotate athletic shoes so each pair can dry out between uses",
        "Share towels only with members of the same household"
      ],
      answer: [0, 1, 3, 4],
      optionRationales: [
        "Correct. Dermatophytes thrive in warm, moist spaces, so drying between the toes removes that environment.",
        "Correct. Keeping the feet dry reduces fungal growth.",
        "Incorrect. Stopping early leads to relapse. The client continues the full prescribed course, often 1–2 weeks after symptoms clear.",
        "Correct. Footwear in communal wet areas reduces exposure and spread.",
        "Correct. Shoes need to dry out to reduce the fungal load.",
        "Incorrect. Tinea spreads through shared towels and is common within households, so towels should not be shared."
      ],
      rationale: "Tinea pedis is a dermatophyte infection that is promoted by warmth, moisture, and occlusion. Teaching focuses on keeping the feet dry, protective footwear, not sharing personal items, and completing the full antifungal course.",
      takeaway: "Fungus loves warm, wet, and dark. Keep feet dry, don't share, and finish the course.",
      hintContent: "Recall the environment dermatophytes need to grow and how they spread between people.",
      hintStrategy: "For each option, ask whether it makes the foot drier or reduces spread. Watch for options that stop treatment early."
    },
    {
      id: "m21c-024",
      type: "order",
      topic: "infectious-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Infectious Skin Disorders",
      difficulty: 2,
      clientNeed: "Safe and Effective Care Environment: Safety and Infection Control",
      cjmm: "Take Action",
      focus: "Nursing Interventions",
      stem: "A client has a draining MRSA abscess on the thigh after incision and drainage and is on contact precautions. The nurse is changing the dressing. Place the steps in the order the nurse should perform them.",
      options: [
        "Perform hand hygiene, then put on a gown and clean gloves before entering",
        "Remove the soiled dressing and discard it with the gloves in a leak-proof bag",
        "Perform hand hygiene and put on a new pair of gloves",
        "Cleanse the wound with normal saline, moving from the center outward",
        "Apply the new dressing and label it with the date, time, and initials"
      ],
      rationale: "PPE goes on before contact (hand hygiene, then gown, then gloves). The contaminated dressing is removed and discarded with the dirty gloves. Hand hygiene is repeated with fresh gloves before touching the wound. The wound is cleansed from the least contaminated area (center) outward, and then a clean dressing is applied and labeled. CDC recommends contact precautions for major draining abscesses because drainage cannot be reliably contained.",
      takeaway: "Clean gloves after the dirty dressing. Clean from the center outward. Contact precautions while it drains.",
      hintContent: "Separate the dirty part of the procedure (removing the old dressing) from the clean part (wound care), and think about what must happen between them.",
      hintStrategy: "Order the steps to protect yourself first, then to never move from dirty to clean without a glove change and hand hygiene."
    },
    {
      id: "m21c-025",
      type: "mcq",
      topic: "infectious-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Infectious Skin Disorders",
      difficulty: 2,
      clientNeed: "Physiological Integrity: Pharmacological and Parenteral Therapies",
      cjmm: "Generate Solutions",
      focus: "Pharmacology",
      stem: "A 7-year-old with scaly patches of hair loss on the scalp is diagnosed with tinea capitis and prescribed oral griseofulvin for 8 weeks. Which instruction should the nurse include when teaching the parent?",
      options: [
        "“Give the medicine on an empty stomach, 1 hour before breakfast.”",
        "“Stop the medicine once the patches look clear, usually in 2 weeks.”",
        "“Apply an antifungal shampoo instead if your child refuses the pills.”",
        "“Give each dose with a high-fat food such as whole milk.”"
      ],
      answer: 3,
      optionRationales: [
        "Griseofulvin absorption is poor on an empty stomach.",
        "Tinea capitis needs 6–8 weeks or longer of treatment. Stopping early leads to relapse.",
        "Antifungal shampoo is only an add-on to reduce spread. It cannot reach the fungus inside the hair shaft and does not replace oral therapy.",
        "Correct. Griseofulvin is fat-soluble, and a high-fat meal greatly increases absorption."
      ],
      rationale: "Tinea capitis involves the hair follicles, so topical agents cannot cure it and oral antifungal therapy is needed. Griseofulvin should be taken with fatty food for 6–8 weeks or longer. Teaching also covers photosensitivity (sun protection), not sharing combs or hats, and follow-up visits.",
      takeaway: "Griseofulvin: fatty food, long course, sun protection, no sharing hats or combs.",
      hintContent: "Recall why scalp ringworm needs oral therapy and what improves this drug's absorption.",
      hintStrategy: "Eliminate the options that shorten or replace therapy. Then compare the two options about food."
    },
    {
      id: "m21c-026",
      type: "matrix",
      topic: "infectious-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Infectious Skin Disorders",
      difficulty: 3,
      clientNeed: "Safe and Effective Care Environment: Safety and Infection Control",
      cjmm: "Generate Solutions",
      focus: "Delegation & Safety",
      stem: "The charge nurse is assigning rooms to clients admitted to the pediatric unit. For each client, indicate the transmission-based precautions the nurse should implement in addition to standard precautions.",
      rows: [
        "A 4-year-old with active varicella (chickenpox) with new vesicles",
        "A 10-year-old with head lice who has not yet been treated",
        "A 16-year-old with localized shingles who has a healthy immune system",
        "A 12-year-old with lower-leg cellulitis and no drainage",
        "A 3-year-old with impetigo who has not started antibiotics"
      ],
      columns: ["Standard only", "Contact", "Airborne + Contact"],
      answer: [2, 1, 0, 0, 1],
      optionRationales: [
        "Airborne + contact. Varicella spreads by the airborne route and by contact with lesions until all lesions are dry and crusted.",
        "Contact. Pediculosis spreads by direct head-to-head contact and shared items until 24 hours after effective treatment.",
        "Standard only. Localized zoster in an immunocompetent client needs standard precautions with the lesions completely covered until crusted.",
        "Standard only. Nondraining cellulitis does not need transmission-based precautions.",
        "Contact. Impetigo needs contact precautions until 24 hours after effective therapy."
      ],
      rationale: "The choice of precautions follows the route of transmission (CDC Appendix A). Varicella (and disseminated or immunocompromised zoster) = airborne + contact. Impetigo, lice, and scabies = contact until 24 hours of effective therapy. Localized zoster in a healthy host and nondraining cellulitis = standard precautions.",
      takeaway: "Chickenpox flies (airborne + contact). Impetigo, lice, and scabies touch (contact). Localized zoster and dry cellulitis = standard.",
      hintContent: "Recall how each organism spreads: through the air, by touch, or only through contact with blood or body fluids.",
      hintStrategy: "Work row by row. Check the details in each row (immune status, drainage, treatment status) because they change the answer."
    },

    // ===================== INFLAMMATORY SKIN DISORDERS =====================
    {
      id: "m21c-027",
      type: "mcq",
      topic: "inflammatory-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Contact Dermatitis",
      difficulty: 2,
      clientNeed: "Health Promotion and Maintenance",
      cjmm: "Evaluate Outcomes",
      focus: "Client Teaching",
      stem: "A client has linear streaks of itchy vesicles on both forearms 2 days after clearing brush and poison ivy from a yard. After teaching, which statement by the client indicates a need for further teaching?",
      options: [
        "“If I scratch open these blisters, the fluid will spread the rash.”",
        "“I should wash the gloves and clothes I wore in the yard.”",
        "“Cool compresses and calamine can help calm the itching.”",
        "“Next time I'll wash my skin with soap and water as soon as I finish yard work.”"
      ],
      answer: 0,
      optionRationales: [
        "Needs further teaching. Blister fluid does not contain urushiol and does not spread the rash. New areas appear from delayed reactions or from oil still on the skin, clothing, tools, or pets. Scratching should still be avoided because it can cause infection.",
        "Correct statement. Urushiol stays on clothing, gloves, and tools and can cause new exposures until they are washed.",
        "Correct statement. Cool compresses, calamine, and oatmeal baths relieve itching.",
        "Correct statement. Washing within minutes to a few hours can remove the oil before it binds to the skin."
      ],
      rationale: "Poison ivy causes allergic contact dermatitis, a delayed type IV reaction to urushiol. The rash often forms linear streaks where the plant brushed the skin. It is not contagious, and vesicle fluid does not spread it. Teaching focuses on removing the oil from skin and objects, relieving symptoms, and avoiding the plant.",
      takeaway: "Poison ivy spreads through the oil, not the blister fluid. Wash skin, clothes, and tools.",
      hintContent: "Recall what substance in the plant causes the reaction and where it can remain after exposure.",
      hintStrategy: "Negatively worded item: look for the one statement that is factually incorrect."
    },
    {
      id: "m21c-028",
      type: "sata",
      topic: "inflammatory-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Inflammatory Skin Disorders",
      difficulty: 2,
      clientNeed: "Health Promotion and Maintenance",
      cjmm: "Generate Solutions",
      focus: "Client Teaching",
      stem: "A 42-year-old client with plaque psoriasis asks how to reduce flares. Which factors should the nurse teach the client to avoid or minimize? Select all that apply.",
      options: [
        "Scratching, picking, or injuring the skin",
        "Smoking and heavy alcohol use",
        "Brief, regular sun exposure while avoiding sunburn",
        "Unmanaged emotional stress",
        "Daily application of a thick, fragrance-free moisturizer",
        "Untreated infections such as strep throat"
      ],
      answer: [0, 1, 3, 5],
      optionRationales: [
        "Correct. Skin trauma can trigger new plaques at the injury site (Koebner phenomenon).",
        "Correct. Smoking and alcohol are linked to more frequent and more severe flares.",
        "Incorrect. Controlled UV exposure often improves psoriasis. Only sunburn, which is skin trauma, should be avoided.",
        "Correct. Stress is a well-known trigger, so stress management is part of care.",
        "Incorrect. Moisturizing reduces scaling and itching and is recommended, not avoided.",
        "Correct. Streptococcal infections can trigger psoriasis flares (especially guttate psoriasis), so infections should be treated promptly."
      ],
      rationale: "Psoriasis is a chronic immune-mediated disorder with rapid keratinocyte turnover. It cannot be cured, but remission is the goal. Known triggers include skin trauma (Koebner phenomenon), stress, infections, smoking, alcohol, cold dry weather, and certain medications. Moisturizers and controlled sun exposure are helpful.",
      takeaway: "Psoriasis triggers: trauma, stress, strep, smoking, and alcohol. Moisturizers and a little sun help.",
      hintContent: "Recall the Koebner phenomenon and the main environmental and lifestyle triggers of psoriasis.",
      hintStrategy: "The stem asks what to AVOID. Do not select options that are actually helpful."
    },
    {
      id: "m21c-029",
      type: "sata",
      topic: "inflammatory-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Pharmacologic Therapy",
      difficulty: 3,
      clientNeed: "Physiological Integrity: Pharmacological and Parenteral Therapies",
      cjmm: "Recognize Cues",
      focus: "Pharmacology",
      stem: "A client has applied an over-the-counter hydrocortisone cream and then a friend's high-potency clobetasol cream to the face twice daily for 4 months to treat “redness.” Which findings should the nurse recognize as possible adverse effects of prolonged topical corticosteroid use? Select all that apply.",
      options: [
        "Thin, shiny skin with visible fine blood vessels",
        "Small red papules and pustules around the mouth",
        "Thickened, leathery plaques with exaggerated skin lines",
        "Easy bruising of the treated skin",
        "Lighter patches of skin in the treated areas",
        "Hard, raised scar tissue extending past the original lesions"
      ],
      answer: [0, 1, 3, 4],
      optionRationales: [
        "Correct. Atrophy and telangiectasia result from suppressed collagen synthesis in the dermis.",
        "Correct. Perioral dermatitis and steroid-induced acne/rosacea are common with facial steroid use.",
        "Incorrect. Lichenification comes from chronic scratching and rubbing, not from steroid use. Steroids thin the skin rather than thicken it.",
        "Correct. Thinner skin and fragile vessels lead to purpura.",
        "Correct. Hypopigmentation can occur and is more noticeable in darker skin.",
        "Incorrect. Keloids are overgrown scars after skin injury, not a steroid effect. Steroid injection is actually used to treat keloids."
      ],
      rationale: "High-potency topical corticosteroids should not be used on the face or skin folds except for short courses under supervision. Long-term use causes atrophy, telangiectasia, striae, purpura, hypopigmentation, perioral dermatitis, and steroid acne. Stopping suddenly after long use can cause a rebound flare, so the nurse refers the client to the provider for a supervised taper.",
      takeaway: "Steroids on the face for months: expect thin skin, visible vessels, perioral papules, bruising, and light patches.",
      hintContent: "Corticosteroids suppress inflammation and fibroblast activity. Think about what that does to the dermis over time.",
      hintStrategy: "Judge each option separately. Exclude findings caused by a different process (chronic rubbing, abnormal scarring)."
    },
    {
      id: "m21c-030",
      type: "mcq",
      topic: "inflammatory-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Pharmacologic Therapy",
      difficulty: 2,
      clientNeed: "Physiological Integrity: Pharmacological and Parenteral Therapies",
      cjmm: "Evaluate Outcomes",
      focus: "Pharmacology",
      stem: "The nurse teaches a 17-year-old about starting benzoyl peroxide 5% gel for mild inflammatory acne. Which statement by the client indicates the teaching was effective?",
      options: [
        "“I'll scrub my face hard twice a day so the gel can soak in better.”",
        "“I'll apply extra gel to a pimple that shows up before a big event.”",
        "“If my skin gets dry and flaky, the medicine isn't working for me.”",
        "“The gel can bleach fabric, so I'll use white towels.”"
      ],
      answer: 3,
      optionRationales: [
        "Harsh scrubbing irritates the skin and worsens inflammatory acne. A gentle cleanser is used.",
        "Using more does not work faster. It increases irritation and dryness.",
        "Mild dryness and peeling are expected early effects, not signs of treatment failure. The client can reduce frequency and use a noncomedogenic moisturizer.",
        "Correct. Benzoyl peroxide is an oxidizing agent that bleaches hair, towels, and clothing."
      ],
      rationale: "Benzoyl peroxide is a first-line OTC acne treatment. It kills Cutibacterium acnes and helps unplug follicles. Teaching includes gentle cleansing, a thin layer once daily at first and then increased as tolerated, expected dryness, bleaching of fabrics and hair, sun protection, and that improvement takes 6–8 weeks.",
      takeaway: "Benzoyl peroxide: gentle cleansing, a thin layer, expected dryness, and it bleaches fabric.",
      hintContent: "Recall how benzoyl peroxide works, its common expected side effects, and its effect on fabrics.",
      hintStrategy: "Look for the statement that is true AND safe. Eliminate options with more is better thinking."
    },
    {
      id: "m21c-031",
      type: "order",
      topic: "inflammatory-skin-disorders",
      ref: "Module 21 · Tissue Integrity · Inflammatory Skin Disorders",
      difficulty: 2,
      clientNeed: "Physiological Integrity: Basic Care and Comfort",
      cjmm: "Take Action",
      focus: "Nursing Interventions",
      stem: "An adult client with a flare of atopic dermatitis has a prescription for triamcinolone 0.1% ointment twice daily and a bland emollient. The nurse is helping the client with the evening “soak and seal” routine. Place the steps in the order the nurse should perform them.",
      options: [
        "Have the client soak in a lukewarm bath for 10–15 minutes using a fragrance-free cleanser",
        "Gently pat the skin until it is damp, not completely dry",
        "Apply a thin layer of the prescribed ointment to the inflamed patches only",
        "Apply the emollient to all remaining skin within 3 minutes of leaving the bath",
        "Help the client dress in loose, soft cotton clothing"
      ],
      rationale: "Soak and seal hydrates the stratum corneum and then traps the moisture. A lukewarm (not hot) bath with a gentle cleanser comes first, and the skin is patted, not rubbed, until damp. The medicated ointment goes on the affected areas first, and the emollient seals the rest of the skin within about 3 minutes, before water evaporates. Loose cotton clothing reduces irritation and itching.",
      takeaway: "Soak, pat, medicate, then seal within 3 minutes and dress in cotton.",
      hintContent: "The goal is to trap water in the skin. Think about what happens if the skin dries fully before it is sealed.",
      hintStrategy: "Build the sequence around the time limit: which steps must happen before the moisture evaporates?"
    },

    // ===================== LIFESPAN =====================
    {
      id: "m21c-032",
      type: "mcq",
      topic: "lifespan-skin",
      ref: "Module 21 · Tissue Integrity · Lifespan Considerations – Infants and Children",
      difficulty: 3,
      clientNeed: "Safe and Effective Care Environment: Safety and Infection Control",
      cjmm: "Take Action",
      focus: "Lifespan & Diversity",
      stem: "A school nurse assesses an afebrile 7-year-old with bright red cheeks and a lacy, pink rash on the arms. The provider diagnoses erythema infectiosum (fifth disease). The child's teacher is 14 weeks pregnant. Which action should the nurse take?",
      options: [
        "Exclude the child from school until the facial and arm rash has faded",
        "Advise the teacher to call her obstetric provider about the exposure",
        "Tell the teacher that the child's current rash is highly contagious",
        "Place the child in a separate room for the rest of the school day"
      ],
      answer: 1,
      optionRationales: [
        "Children with fifth disease are no longer contagious once the rash appears, so exclusion is not needed.",
        "Correct. Parvovirus B19 infection during pregnancy can cause fetal anemia and hydrops fetalis. The teacher should contact her provider for possible antibody testing and monitoring.",
        "Transmission occurs mainly during the nonspecific prodrome, before the rash. Once the rash appears, contagiousness is low.",
        "Isolation after the rash appears does not reduce transmission, because the viral shedding period is over."
      ],
      rationale: "Fifth disease (parvovirus B19) spreads by respiratory droplets mostly before the slapped-cheek rash appears. By the time it is diagnosed, the child is usually not contagious and can stay in school. The priority is the high-risk contact. Pregnant people, clients with sickle cell disease or other hemolytic anemias, and immunocompromised clients can have serious complications and need to be referred for evaluation.",
      takeaway: "Fifth disease: contagious before the rash, not after. Protect pregnant contacts and those with sickle cell disease.",
      hintContent: "Recall when parvovirus B19 is contagious in relation to the rash, and which groups face serious complications.",
      hintStrategy: "Consider who in the scenario is at the highest risk of harm, not only the child with the rash."
    },
    {
      id: "m21c-033",
      type: "dropdown",
      topic: "lifespan-skin",
      ref: "Module 21 · Tissue Integrity · Lifespan Considerations – Infants and Children",
      difficulty: 2,
      clientNeed: "Physiological Integrity: Basic Care and Comfort",
      cjmm: "Analyze Cues",
      focus: "Assessment Findings",
      stem: "A 7-month-old recently finished a 10-day course of amoxicillin for otitis media. The nurse notes a beefy red rash in the inguinal folds, with separate small red papules and pustules scattered outside the main border. Complete the following sentence by choosing from the lists of options.",
      template: "The infant's rash is most consistent with {0}, as evidenced by {1}. The nurse anticipates a prescription for {2}.",
      blanks: [
        { options: ["candidal diaper dermatitis", "irritant diaper dermatitis", "impetigo", "atopic dermatitis"], answer: 0 },
        { options: ["satellite lesions and skin fold involvement", "sparing of the skin folds", "honey-colored crusts", "dry patches on the cheeks"], answer: 0 },
        { options: ["topical nystatin", "topical mupirocin", "oral cephalexin", "topical hydrocortisone alone"], answer: 0 }
      ],
      rationale: "Candida overgrowth is common after antibiotics. It causes a beefy red rash that involves the skin folds, with satellite papules and pustules. Irritant diaper dermatitis usually spares the folds because they are protected from urine and stool. Treatment is a topical antifungal such as nystatin, plus frequent diaper changes and keeping the area dry.",
      takeaway: "Diaper rash in the folds + satellite lesions after antibiotics = Candida. Treat with an antifungal.",
      hintContent: "Recall how antibiotics change normal flora and which diaper rash involves, rather than spares, the creases.",
      hintStrategy: "Use the recent medication history as a clue. Then choose the evidence and treatment that match your first answer."
    },
    {
      id: "m21c-034",
      type: "mcq",
      topic: "lifespan-skin",
      ref: "Module 21 · Tissue Integrity · Lifespan Considerations – Adolescents",
      difficulty: 3,
      clientNeed: "Psychosocial Integrity",
      cjmm: "Take Action",
      focus: "Lifespan & Diversity",
      stem: "A 16-year-old with dark brown skin has healing acne and dark spots where the pimples were. The teen says, “I hate how I look. I bought a skin-lightening cream online from overseas, and I use it twice a day.” The label lists mercury as an ingredient. Which response by the nurse is best?",
      options: [
        "“Those dark spots are permanent, so the cream is the only thing that may help.”",
        "“Apply the cream only at night so it is less likely to irritate your skin.”",
        "“That cream may contain mercury. Let's stop it and ask your provider about safer options.”",
        "“Try covering the spots with makeup instead, since acne is a normal part of being a teenager.”"
      ],
      answer: 2,
      optionRationales: [
        "Post-inflammatory hyperpigmentation usually fades over months with sun protection and acne control. This response is inaccurate and discourages the teen.",
        "Changing the timing does not remove the risk of mercury toxicity.",
        "Correct. Unregulated lightening creams may contain mercury or high-dose steroids that can cause toxicity, irritation, and worse pigmentation. The nurse protects the teen's safety, acknowledges the distress, and refers for evidence-based treatment.",
        "This dismisses the teen's concern about body image and does not address the unsafe product."
      ],
      rationale: "Darker skin is prone to post-inflammatory hyperpigmentation after acne. Skin changes deeply affect adolescent self-image, and some bleaching products can irritate the skin or contain toxic ingredients such as mercury. The nurse addresses safety first, acknowledges the teen's feelings, and supports safe options: controlling the acne, daily sunscreen, and provider-prescribed agents.",
      takeaway: "Dark marks after acne are common in darker skin. Stop unsafe bleaching creams and offer safe, respectful options.",
      hintContent: "Recall skin concerns specific to darker skin tones and the risks of unregulated skin-lightening products.",
      hintStrategy: "The best response addresses the safety issue AND the teen's feelings without false information or dismissal."
    },
    {
      id: "m21c-035",
      type: "sata",
      topic: "lifespan-skin",
      ref: "Module 21 · Tissue Integrity · Lifespan Considerations – Older Adults",
      difficulty: 2,
      clientNeed: "Physiological Integrity: Basic Care and Comfort",
      cjmm: "Generate Solutions",
      focus: "Nursing Interventions",
      stem: "An 81-year-old client in assisted living has dry, flaky, itchy skin on the legs and back with scratch marks. No rash or lesions are present. Which interventions should the nurse include in the plan of care? Select all that apply.",
      options: [
        "Schedule full baths every other day with partial sponge baths in between",
        "Use a mild, fragrance-free liquid cleanser instead of deodorant soap",
        "Apply an emollient to damp skin immediately after bathing",
        "Add a scented bath oil to hot bath water to relieve the itching",
        "Keep the client's fingernails short and smooth",
        "Keep the room humidity low to prevent mold growth"
      ],
      answer: [0, 1, 2, 4],
      optionRationales: [
        "Correct. Older adults have fewer and less active sebaceous glands, so daily full bathing strips oils. Bathing every other day is recommended.",
        "Correct. Harsh or deodorant soaps are alkaline and drying. Mild liquid cleansers protect the skin barrier.",
        "Correct. Moisturizing damp skin right after bathing traps water in the stratum corneum.",
        "Incorrect. Hot water and fragrances dry and irritate the skin, and bath oil makes the tub slippery, which increases fall risk.",
        "Correct. Short, smooth nails reduce skin damage and infection risk from scratching.",
        "Incorrect. Low humidity makes xerosis worse. A humidifier is recommended, especially in winter."
      ],
      rationale: "Xerosis and pruritus are common in older adults because of reduced sebaceous and sweat gland activity and a thinner epidermis. Care focuses on less frequent bathing with lukewarm water and mild cleansers, emollients on damp skin, adequate humidity and fluids, and protecting fragile skin from scratching, while keeping safety in mind (falls).",
      takeaway: "Older adult dry skin: bathe less often, use lukewarm water and mild cleansers, moisturize damp skin, avoid scents, keep nails short.",
      hintContent: "Recall the age-related changes in sebaceous glands and the epidermis that cause xerosis.",
      hintStrategy: "Evaluate each option for whether it adds moisture and protects the skin without creating a safety hazard."
    }
  ]
});
