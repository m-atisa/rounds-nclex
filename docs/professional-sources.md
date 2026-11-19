# Professional Nursing Concepts — source map

Added November 19, 2026 from ten instructor study guides placed in the sibling `Nursing/source/` folder (PDFs are not published with the site). Each module became a question pack (`content/mNN-pro.js`) and a lesson pack (`content/guides-mNN-pro.js`).

| Source PDF | Module | Topics (site ids) |
| --- | --- | --- |
| Module_37_Collaboration_Comprehensive_Study_Guide.pdf | m37 Collaboration | nurse-collaborator · ipec-teamstepps · conflict-management |
| Module_39_Managing_Care_Study_Guide.pdf | m39 Managing Care | managing-care · case-management (39.A) · cost-effective-care (39.B) |
| Module_42_Accountability_and_Competence_Study_Guide.pdf | m42 Accountability | accountability-foundations · accountability-practice · competence (42.A) |
| Module_43_Advocacy_Study_Guide.pdf | m43 Advocacy | advocate-role · advocacy-interventions · reporting-unprofessional |
| Module_44_Ethics_Comprehensive_Study_Guide.pdf | m44 Ethics | values-codes · ethical-principles · morality (44.A) |
| Module_45_Evidence_Based_Practice_Study_Guide.pdf | m45 Evidence-Based Practice | ebp-foundations · research-methods · ebp-steps |
| Module_46_Healthcare_Systems_Study_Guide.pdf | m46 Healthcare Systems | prevention-settings · care-models-access · delivery-models-resources |
| Module_47_Health_Policy_Exam_Study_Guide.pdf | m47 Health Policy | policy-process · agencies-accreditation · healthcare-financing |
| Module_49_Legal_Issues_Study_Guide-v2.pdf | m49 Legal Issues | law-torts-privacy · malpractice-standard-care · consent-laws-lifespan |
| Module_50_Quality_Improvement_Study_Guide.pdf | m50 Quality Improvement | qi-foundations · qi-process-programs · patient-safety-culture |

## Lesson structure

Every topic lesson (roughly 4,000–6,000 words) has objectives, a plain-language big picture, every key term from the source, 10–12 teaching sections with comparison tables, analogies, bedside examples and section self-checks, plus four required sections:

- **Common traps & look-alikes** — confusable concepts and the clue that separates them.
- **How the NCLEX tests this** — typical question patterns and a sample item reasoned step by step (stem → what is asked → cues → eliminate each distractor → choose), with a reusable strategy. This targets students who know the content but miss application questions.
- **Worked case** — an original scenario with reasoning shown step by step.
- **Course source & clinical clarification** — page ranges and any corrections to the source.

Most lessons also include a **North Carolina practice note** (NCBON scope and delegation, Nurse Aide I/II, Nurse Licensure Compact, universal child-maltreatment reporting to county DSS under G.S. 7B-301, disabled-adult reporting under G.S. 108A-102, minor consent under G.S. 90-21.5, Good Samaritan G.S. 90-21.14, 3-year malpractice limitation with 4-year repose, contributory negligence, HCPOA/living will/MOST). The NCLEX itself is national; NC facts are tested only where the answer is also correct by national standards.

## Questions

449 original items (12+ per topic; 42–52 per module): priority MCQ, single-best-answer MCQ and SATA, every option with its own rationale, plus content and strategy hints, a takeaway, CJMM step, nursing-skill focus, difficulty and NCLEX client-need category. Items emphasize application: best response, first action, delegation/assignment, "needs further teaching", and distinguishing look-alike concepts. Correct-answer positions are balanced and answer-length cues were removed.

## Notable clarifications to the sources

- National League for **Nursing** (not "for Nurses"); ANA collaboration standard is Standard 11 in the 2021 Scope & Standards.
- Staffing ratios: California, plus Oregon (2023 law) and Massachusetts ICU ratios.
- The ACA bans lifetime dollar limits on essential health benefits; the individual-mandate penalty was reduced to $0, not repealed.
- Medicare Part B's 20% is coinsurance; Part A covers only short-term skilled-nursing care; HRAs are employer-funded.
- Joint Commission sentinel events: death, permanent harm, or severe temporary harm; reporting to TJC is voluntary but analysis is required.
- CSA enforced by the Drug Enforcement **Administration**; the Whistleblower Protection Act of 1989 covers federal employees.
- Malpractice limitation periods are state-specific (NC: 3 years, 4-year repose); failing to report child abuse is a crime in NC.
- An LPN working within LPN scope receives an *assignment*, not a delegation; floating nurses raise competence concerns before accepting report.
- COPD: titrate oxygen to SpO₂ 88–92% — never withhold oxygen from a hypoxemic client.
- Benner's *From Novice to Expert* was first published in 1984; Cochrane's book in 1972.

## Review process

Each module was written by one agent and then independently reviewed by a second, which checked every key, distractor, rationale, lesson table and self-check, rewrote recall items as scenarios and items that could be argued two ways, and logged changes. `npm test` enforces structure (≥12 questions and ≥8 flashcards per topic, ≥2,200-word lessons, required sections, all three formats and all six CJMM steps per module).
