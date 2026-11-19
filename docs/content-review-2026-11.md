# Content review log — November 19, 2026

Every module was reviewed item by item by an independent reviewer for answer-key accuracy, single-best-answer defensibility, option-rationale agreement, current clinical/legal facts, and teaching quality. New Professional Nursing modules (qa-new-*) were also checked against their source PDFs. Below are the reviewers’ change logs.

---

## qa-m10-guides

### QA log: Module 10 (Inflammation) study guides

Files: guides-m10a.js (5 lessons), guides-m10b.js (5 lessons). I read all 10 lessons in full: every section, table, example, check, pearl, red flag, recap, and end-of-lesson check. Both files parse after the edits (`ok m10`).

## guides-m10a.js

1. **inflammation-overview / S0 (What inflammation is)**: The lesson called inflammation an "adaptive, nonspecific immune response" and never said this was not the adaptive (acquired) immune system. Inflammation belongs to innate immunity, so a student could pick the wrong answer on an innate-vs-adaptive question. I added a sentence that separates the two and keeps the slide wording. *(Clarification / misleading terminology)*
2. **inflammation-overview / S1 example (rusty nail)**: A puncture from a rusty nail is a tetanus-prone wound, and checking tetanus immunization status is the expected NCLEX action. The example left this out. I added it to the nurse's actions. *(Omission in nursing action)*
3. **inflammation-overview / S5 body (systemic cutoffs)**: The lesson listed only WBC >12,000 as a systemic sign. Standard SIRS criteria also count WBC <4,000. I added this to the existing parenthetical about other references. *(Lab criteria)*
4. **inflammation-overview / S5 check (pancreatitis)**: The answer named "loss of appetite" and "pain after eating", but neither appears in the question, which gives epigastric tenderness, T 38.9, WBC 15,200, fatigue, and guarding. I rewrote the answer to match the question: fever, high WBC, and fatigue are systemic; tenderness and guarding are local. *(Wrong / mismatched self-check answer)*
5. **classic-signs / S3 example (sprained ankle with pale, cool toes and capillary refill of 5 s)**: The nurse was told to loosen the wrap and **elevate**. When arterial flow is already impaired (possible compartment syndrome), raising the limb above the heart lowers perfusion further. Standard teaching is to loosen the wrap and keep the limb at heart level. I changed the example to say that. *(Safety / priority action)*
6. **classic-signs / redFlags (first item)**: Same error: "loosen the wrap, elevate, reassess". Changed to "keep the limb at heart level (not elevated above it while circulation is impaired)". *(Safety / priority action)*
7. **mediators / pearls**: "Mediators are released by mast cells and macrophages—not by RBCs or platelets" was factually wrong, because platelets release mediators such as serotonin and thromboxane. I reworded it: the slides name mast cells and macrophages as the main sources, so choose those on exams; platelets and other WBCs contribute; RBCs do not. *(Factual error)*
8. **mediators / checks (influenza → prostaglandins)**: The answer recommended salicylates for flu aches and gave no Reye syndrome warning. A student could choose aspirin for a child with flu. I added that children and teens with influenza should get ibuprofen or acetaminophen, never aspirin. *(Drug safety)*

## guides-m10b.js

9. **anaphylaxis / S1 table (Triggers)**: The Latex row had 3 cells under a 2-column header, with a stray quote as the third cell. I merged the example into the Examples cell, and the row now has 2 cells (verified). *(Table structure error)*
10. **anaphylaxis / S4 (After the first dose)**: "Clients are observed after treatment" gave no time frame and no reason. I added the usual observation period (often at least 4–6 hours, longer after a severe reaction) and explained biphasic reactions. *(Clarification)*
11. **assessment-diagnostics / S2 table (Systemic signs, WBC row)**: Added that standard criteria also count WBC <4,000/mm³. *(Lab criteria)*
12. **pharmacology / S1 (Acetaminophen)**: "About 4 g/day" is now "no more than 4 g/day for healthy adults, and many OTC labels now advise 3 g/day". Without this, 4 g reads like a target dose rather than an absolute ceiling. *(Drug safety)*
13. **pharmacology / S2 NSAID adverse-effects table (Heart and fluids row)**: The row left out the FDA boxed warning for MI and stroke risk. I added it. *(Drug safety omission)*
14. **pharmacology / S6 example (post-cholecystectomy morphine)**: The answer said to give the PRN IV opioid with no safety check. I added "after confirming the respiratory rate and sedation level are safe". *(Drug safety)*
15. **nursing-interventions / S3 bullets (Anti-inflammatory diet)**: The lesson listed "omega-3 and omega-6 fats" as anti-inflammatory. Omega-6 fats are already excessive in Western diets and tend to promote inflammation, so the goal is more omega-3s relative to omega-6s. I reworded it and kept a note that the slides mention omega-6. *(Factual error)*
16. **lifespan / S1 bullets (Children: cardiac response)**: The lesson taught, from the slides, that "tachycardia is a late sign of hypovolemia" in children. This is the reverse of standard pediatric teaching and NCLEX: tachycardia is an early sign and hypotension is the late sign. The old hedge did not tell students which answer to choose. I added the standard rule explicitly and told students to use it on exams. *(Factual error that leads to wrong NCLEX answer)*
17. **lifespan / recap**: Same correction added to the recap line. *(Factual error)*

## Reviewed with no change needed
- stages (vascular/cellular sequence, exudate types, regeneration table from the slides, scar sequence, nutrition), acute-chronic, and assessment-diagnostics: the labs (WBC 5,000–10,000, neutrophils 55–70%, bands 0–5%, ESR M 0–15 / F 0–20, CRP <1.0 mg/dL) are correct. The ESR/CRP trend teaching and the SLE electrophoresis content are also correct.
- anaphylaxis: epinephrine 0.3–0.5 mg IM of 1 mg/mL in the mid-anterolateral thigh, repeated every 5–15 minutes, is correct. The 0.15 mg auto-injector for a 24 kg child, the positioning, and the order of adjunct drugs are correct.
- Steroid adverse effects, taper teaching, the K+ range of 3.5–5.0, the Reye and salicylate toxicity content, and the reasons to question an NSAID are correct.
- Older adult rule of more than 1.1 °C above baseline, and preeclampsia severe features, are correct.

---

## qa-m10-questions

### QA log: Module 10 Inflammation (m10.js, m10c.js, m10d.js)

Scope: 109 questions (m10.js 45, m10c.js 34, m10d.js 30) and 47 flashcards (m10.js) read in full.

Automated checks (all passed, nothing to change):
- Every answer index is valid. MCQ answers are numbers and SATA answers are arrays.
- Every optionRationales array has the same length as its options.
- Every keyed option's rationale starts with "Correct" and no unkeyed option's rationale does.
- No duplicate ids.

Clinical review: keys, rationales, lab values (ESR male 0-15 and female 0-20 mm/hr, CRP <1.0 mg/dL, bands 0-5%, K 3.5-5.0), drug facts (epinephrine 0.5 mg IM adult and 0.15 mg auto-injector at 24 kg, repeat every 5-15 min; NSAID, steroid and salicylate effects; Reye syndrome), priority and delegation logic, and anaphylaxis sequencing. All were correct and gave one defensible answer.

Note (not changed): the systemic temperature cutoff of >38.5 C / <36 C is used across many items. It comes from the course slides (Module 10 pptx) and the items label it "course cutoffs", so it was kept as is. The standard adult SIRS cutoff is >38 C.

## Changes

1. m10c-010 (m10c.js), optionRationales[2] (the keyed option)
   - Problem: it said capillary refill "over about 3 seconds" is abnormal in an 18-month-old. In infants and young children, refill is delayed when it is longer than 2 seconds.
   - Fix: "Capillary refill over about 3 seconds" became "Capillary refill longer than 2 seconds (here 4 seconds)".
   - Effect: the key is unchanged. This only corrects the pediatric threshold.

Flashcards: none needed changes.

Parse check: node vm load of m10c.js printed "ok m10".

---

## qa-m15-guides

### QA log: m15 Oxygenation study guides (guides-m15a.js, guides-m15b.js)

Reviewed 11 lessons in full (keyTerms, sections, tables, examples, checks, pearls, redFlags, recap, end checks):
- guides-m15a.js: oxygenation-physiology, respiratory-assessment, breathing-patterns, diagnostics-abg, oxygen-therapy, lifespan-considerations
- guides-m15b.js: airway-clearance, respiratory-medications, pneumothorax-chest-tubes, asthma-copd-pneumonia, health-promotion-smoking

No outright factual errors, wrong self-check answers, or wrong table cells found. Verified: ABG normals and interpretation examples, ROME table, peak flow zones, O2 device flow/FiO2 table, CO2-retainer targets, adventitious/normal breath sounds, early vs late hypoxia, Kussmaul/Cheyne-Stokes/Biot, suctioning steps, PVD order, theophylline toxicity, ICS/systemic steroid teaching, MDI/DPI technique, chest tube chambers/emergencies/removal, tension pneumothorax signs and actions, infant choking (back blows/chest thrusts), pregnancy ABG, NRT teaching.
Slide-sourced values that differ from some textbooks (bradypnea <10, theophylline 10-20, RR-by-age table, barrel chest after age 6, older-adult vesicular note) are already flagged in the text as slide-specific; left unchanged.

## Changes

1. guides-m15a.js / lifespan-considerations / "Pregnancy: two people, one set of lungs" (bullet "Respiratory rate increases")
   - Problem: Thin/misleading. Saying RR "increases" with no limit could lead a student to call tachypnea a normal pregnancy change. Standard OB references say RR is unchanged or only slightly higher; the extra ventilation comes from higher tidal volume.
   - Change: Added: the increase is only slight (about 1-2 breaths/min, still in the normal adult range), most of the extra air comes from deeper breaths, and a rate well above 20 is not a normal pregnancy change. This matches the lesson's own table, where RR 28 needs follow-up.

2. guides-m15a.js / diagnostics-abg / "Pulse oximetry: fast, easy, and sometimes wrong" (bullet list of inaccuracies)
   - Problem: Incomplete on a high-yield NCLEX point. Carbon monoxide poisoning gives a falsely normal or high SpO2 and was missing from the list of times SpO2 is wrong.
   - Change: Added a bullet: in CO poisoning a standard pulse oximeter can't tell CO from O2 on hemoglobin, so SpO2 may read normal or high while the client is severely hypoxic; an ABG with co-oximetry (carboxyhemoglobin) is needed.

3. guides-m15b.js / respiratory-medications / keyTerms "LABA"
   - Problem: Missing safety fact. The definition left out that a LABA must never be used alone in asthma (boxed-warning rule; it must be paired with an ICS). This is a common NCLEX distractor.
   - Change: Added: "In asthma, a LABA is never used alone — it is always paired with an inhaled corticosteroid (as in Advair), because LABA monotherapy raises the risk of severe asthma attacks."

Both files re-parsed OK after editing (node vm check: "ok m15").

---

## qa-m15-questions

### QA log — Module 15 Oxygenation (m15.js, m15c.js, m15d.js)

Reviewed: 110 questions (m15.js 41, m15c.js 36, m15d.js 33; 70 MCQ, 40 SATA) and 48 flashcards (m15.js). Automated check after edits: all answer indices valid, every optionRationale's "Correct." prefix matches the key, all three files parse.

## Changes

### m15c-025 (m15c.js), SATA, sputum culture plus first antibiotic. Key changed
- **Problem:** Option 0 ("Collect the specimen first thing in the morning") was keyed correct, but the stem says the first IV antibiotic is due now, and option 5 (also keyed correct) says to give the antibiotic without delay. The two keyed answers contradict each other: waiting for a morning specimen either delays the antibiotic or means the culture is drawn after it. Sister item m15c-047 already treats "collect tomorrow morning" as wrong in the same situation.
- **Fix:** Rewrote option 0 as "We'll wait until tomorrow morning to collect the specimen, when secretions have pooled overnight" and made it incorrect. Answer changed from [0,1,3,5] to [1,3,5]. Rewrote option 0's rationale and updated the rationale and takeaway to match.

### m15-021 (m15.js), SATA, home oxygen teaching. Distractor revised
- **Problem:** The distractor "Store spare cylinders lying flat on the closet floor so they cannot tip over" could be argued correct. Many home-oxygen suppliers and safety guides allow storing cylinders lying flat when no stand is available.
- **Fix:** Changed it to "Keep spare cylinders standing loose in a corner of the closet, leaning against the wall," which is clearly unsafe. Updated its rationale: cylinders must be secured, upright in a stand or cart (or laid flat per the supplier). The key is unchanged.

### m15d-009 (m15d.js), SATA, post-op atelectasis. Stem wording
- **Problem:** The stem asked which findings "indicate ineffective airway clearance with developing atelectasis," yet "Oral mucosa dry; drank 240 mL since 0000" is keyed correct. Dry mucosa is a contributing factor (it thickens secretions), not a sign of atelectasis, so the item could be argued either way.
- **Fix:** The stem now reads "Which findings support a problem of ineffective airway clearance with developing atelectasis, including factors contributing to it?" The key is unchanged.

### m15-032 (m15.js), SATA, albuterol teaching. Rationale
- **Problem:** Option 2's rationale cited "M.L.'s four-times-daily use," a case the stem never mentions (it is a stand-alone item).
- **Fix:** Removed the reference.

### Flashcard "Rhonchi vs crackles" (m15.js flashcards[8]) and the respiratory-assessment topic table row "Fine crackles (rales)"
- **Problem:** Both said crackles "do not clear with cough." That contradicts items m15-003 and m15c-045, which correctly teach that basilar crackles in older adults often clear with coughing.
- **Fix:** Flashcard now reads "usually do not clear with cough (basilar crackles in older adults may)." The table cell now reads "usually do not clear with cough."

## Reviewed with no change needed (selected notes)
- ABG items (m15-002, 009, 010, 011, 019; m15c-003, 027; m15d-003, 008): interpretations checked with ROME and compensation rules; all correct.
- Oxygen devices and flows (NC 1–6 L at 24–44%, simple mask at least 5 L, NRB 10–15 L, Venturi), the COPD target of 88–92%, and CO₂ narcosis items: correct.
- Chest tube items (tube out of the chest: three-sided occlusive dressing; tube out of the unit: submerge 2–3 cm; clamped tube causing tension pneumothorax; continuous water-seal bubbling; removal steps): correct.
- Peak flow zones (80/50–79/<50%) and the arithmetic in m15d-025 and m15d-040: correct.
- Infant choking (back blows and chest thrusts, no abdominal thrusts) is consistent with current AHA guidance. Theophylline 10–20 mcg/mL and toxicity, beta-agonist plus steroid hypokalemia, and anaphylaxis treated first with IM epinephrine: correct.
- Pediatric, pregnancy, and older-adult norms are internally consistent.

---

## qa-m16-guides

### QA log: m16 Perfusion guides (guides-m16a.js, guides-m16b.js)

Reviewed in full: 11 lessons (m16a: cardiac-anatomy, heart-sounds, cardiac-output, conduction-system, hemostasis, diagnostics; m16b: blood-pressure, peripheral-assessment, perfusion-emergencies, promotion-interventions, lifespan). That covers every section, table, example, self-check, pearl, red flag, recap, and end check. Both files still parse after the edits ("ok m16").

## guides-m16a.js

1. heart-sounds / section "Extra heart sounds: S3 and S4" (body), S3-vs-S4 table row "May be normal in" (S4 column), recap[5]
   - Wrong: the lesson listed children as a group in whom an S4 can be normal. Standard references (Bates, Jarvis) treat an S4 in infants and children as abnormal. A student could have marked a pediatric S4 as "expected."
   - Fix: removed children from the S4 lists in all three places and added one sentence saying that, unlike an S3, an S4 in a child needs follow-up. Table cell now reads "Well-conditioned athletes, healthy older adults (not children)."

2. conduction-system / section "Refractory periods" bullet, and recap[5]
   - Wrong: said dysrhythmias start "during the refractory and supernormal periods." That contradicts the lesson's own table, which says no depolarization can occur in the absolute refractory period.
   - Fix: changed it to "relative refractory and supernormal periods" and added a note that no stimulus can fire the cell during the absolute refractory period.

3. diagnostics / section "Blood tests: lipids" example (Mr. N), and checks[4]
   - Wrong: total cholesterol 186 with LDL 168, HDL 34, and TG 142 is impossible. LDL + HDL + TG/5 = 230, which is more than the total.
   - Fix: changed the numbers to TC 196, LDL 134, HDL 34, TG 142, which fit the Friedewald formula. The teaching point is unchanged: a normal total hides an LDL above goal (borderline high) and a low HDL. Updated the check question and answer to match.

## guides-m16b.js

4. perfusion-emergencies / bigPicture statistics
   - Outdated: "29% of adults have HTN" (the old 140/90 definition), "130,000 stroke deaths," and stroke as "the top cause" of long-term disability.
   - Fix: now says about 48% (nearly half) under the current 130/80 definition, with the old 29% figure noted. Stroke deaths are about 160,000 a year (still about 1 in 20 deaths), and stroke is "a leading cause of serious long-term disability." Added that HF appears on about 1 in 8 U.S. death certificates and labeled the 55,000 figure as older.

5. perfusion-emergencies / B.E. Part 1 "What the cues mean"
   - Thin and risky: BP 182/98 in acute ischemic stroke was flagged only as "needs follow-up." A student could pick "lower the BP right away."
   - Fix: added permissive hypertension (BP is usually not lowered quickly) and the AHA/ASA alteplase limits: below 185/110 before the drug and at or below 180/105 after. The provider sets the targets.

6. promotion-interventions / CPR steps[0], steps[1], steps[2]
   - Wrong order: the steps checked breathing and pulse before calling for help. Current AHA BLS order is: check responsiveness, shout for help and activate the emergency response system (get the AED), then check breathing and pulse together for no more than 10 seconds, then start CPR. A student could get an ordering question wrong.
   - Fix: rewrote the first two steps in the AHA order. Added the upper depth limit, "no more than 2.4 inches (6 cm)," to the compression step.

7. promotion-interventions / keyTerm "Chelation therapy"
   - Misleading: it was presented only as an alternative heart therapy, with no caveat.
   - Fix: added that it is not a proven treatment for heart disease and carries risks (low calcium, kidney injury).

8. lifespan / section "Supine hypotensive syndrome" body
   - Wrong and confusing: it said the syndrome is "also called postural hypotension in pregnancy." Postural hypotension is the synonym the blood-pressure lesson uses for orthostatic hypotension.
   - Fix: changed to "also called vena cava syndrome or aortocaval compression," with a note that it is not the same as orthostatic (postural) hypotension.

9. blood-pressure / section "Methods and the Korotkoff sounds" example, and lifespan / section "Assessing pulse and BP in children" body
   - Guideline gap: both said pediatric diastolic is Korotkoff phase IV. Current AAP (2017) and AHA guidance uses phase V in children too, and uses phase IV only when sounds continue to near zero.
   - Fix: kept the course's phase IV teaching and added a short note on current AAP/AHA guidance, telling students to follow their course and facility convention. The table and mnemonics are unchanged.

## Reviewed, no change needed (spot notes)
- Lab and threshold values checked as correct: CO 4–8 L/min, SV 60–100 mL, EF 50–70%, PR 0.12–0.20 s, QRS under 0.12 s, pacemaker rates 60–100/40–60/20–40, lipid goals, orthostatic criteria (≥20 systolic or ≥10 diastolic within 3 minutes), hypertensive emergency (over 180/120 plus organ damage), pulse grading 0–4+, cuff-error directions, auscultation landmarks, cath care (HOB 30° or less, pressure above the puncture site), TEE gag reflex, caffeine 12–24 h before a chemical stress test, pregnancy changes (blood volume +40–50%, BP lowest in the 2nd trimester, factors VII/VIII/IX/X up), pediatric bradycardia from hypoxemia, and aging changes.
- All arithmetic in the self-checks and examples was verified, including CO 5.6 L/min, the pulse pressures, the pulse deficit of 18, and the orthostatic drops.

---

## qa-m16-questions

### QA log — Module 16 Perfusion (m16.js, m16c.js, m16d.js)

Reviewed: 109 questions (m16: 46, m16c: 34, m16d: 29; 71 MCQ, 38 SATA) and 46 flashcards (m16.js). All files re-parse OK.

## Key errors
- **m16d-039** (m16d.js, SATA, HF discharge reporting): answer was [0,1,2]. Option 2 (0.5-kg gain in a week) was keyed correct while its rationale said Incorrect, and option 4 (tight shoes and lasting sock marks = new edema) was unkeyed while its rationale said Correct. Changed answer to [0,1,4]. The rationales and overall rationale already supported this key.

## Factual/rationale errors
- **m16d-001** opt 3 rationale: the claim that fluid overload would cause bounding 4+ pulses doesn't fit HFrEF (low-output HF gives normal or weak pulses). Reworded: pulses reflect arterial flow, not venous backup.
- **m16-045** opt 3 rationale: "BP above prepregnancy levels needs evaluation" was vague. Now states that ≥140/90 after 20 weeks suggests gestational hypertension or preeclampsia.
- **Flashcard "Is a split S2 normal?"** and the matching heart-sounds topic bullet (m16.js): said split S2 comes from an *increase* in intrathoracic pressure on inspiration. Inspiration *lowers* intrathoracic pressure, which raises venous return to the right heart and delays pulmonic closure. Corrected both.
- **Flashcard "Stethoscope piece for S3, S4, and murmurs"**: said all murmurs are heard with the bell. Corrected: bell for low-pitched sounds and murmurs, diaphragm for high-pitched murmurs, S3/S4 best at the apex.
- **Flashcard "Lipid targets"**: HDL >40/>50 changed to ≥40/≥50 to match the question items and the standard targets.

## Ambiguity fixes
- **m16-049** (hypertensive emergency, ventilated stroke client): option 1 (minimal responsiveness during the sedation vacation) could be argued as neurologic organ damage, which competes with the pulmonary edema key. Stem and option now say it is unchanged from yesterday (baseline). Updated that option's rationale and the overall rationale.

## Reviewed, left as is
- m16-011 / Korotkoff flashcard: phase IV (muffling) as the pediatric diastolic follows the course and textbook. Note: the 2017 AAP guideline prefers K5 unless K5 reaches 0.
- All other items: keys, indices, and rationales checked; no errors found.

---

## qa-m21-guides

### QA log: m21 Tissue Integrity study guides (guides-m21a–d.js)

Reviewed: 17 lessons (a: 5, b: 4, c: 5, d: 3). All sections, tables, examples, pearls, red flags, recaps, and self-checks were read in full.
guides-m21b.js needed no changes.

## guides-m21a.js
1. inflammatory-skin-disorders, "Contact dermatitis: two very different causes" (body + Allergic vs. irritant table, "Look" row)
   - Wrong: allergic contact dermatitis was said to form "vesicles or wheals". ACD is a delayed (type IV) reaction that gives red papules/vesicles. Wheals/hives are an immediate (type I) reaction, e.g., latex contact urticaria. This could lead a student to treat a minutes-onset hive reaction as a harmless delayed rash.
   - Changed: "vesicles or wheals" became "red papules or vesicles" in the body and the table. Added one sentence saying hives within minutes of contact (e.g., latex) are an immediate allergy that can progress to anaphylaxis.
2. infectious-skin-disorders, "Viral: herpes and warts (HPV)"
   - Thin/possibly misleading: the only shingles precaution was "keep lesions covered". It did not say when airborne precautions are needed.
   - Added: localized zoster in a healthy client = standard precautions with lesions covered. Disseminated zoster, or zoster in an immunocompromised client = airborne + contact until all lesions are crusted. Assign only varicella-immune staff (CDC).
3. lifespan-skin, "Children" bullet on diaper dermatitis
   - Clarification: the lesson correctly says irritant diaper rash spares the folds, but never gave the contrasting finding.
   - Added: beefy red rash in the folds with satellite spots suggests Candida; report it, because it needs an antifungal.

## guides-m21c.js
4. pressure-injuries-wound-care-debridement, "Black — DEBRIDE"
   - Wrong/incomplete: "Eschar must be removed for healing to occur" with no exception. Current NPIAP/WOCN guidance says stable (dry, adherent, intact, no erythema/fluctuance/drainage) heel eschar should NOT be softened or debrided. This is a common NCLEX trap.
   - Added: the stable heel eschar exception, plus when to report (soft, wet, draining, or red edges).
5. pressure-injuries-staging, "Staging strategy for exam questions" bullets
   - Incomplete: only the four slide stages were taught. A student could try to give a numbered stage to an eschar- or slough-covered base, or call a maroon/purple intact area or a blood-filled blister Stage I/II.
   - Added one bullet: base obscured by slough/eschar = unstageable. Persistent deep red/maroon/purple intact area or blood-filled blister = deep tissue pressure injury (NPIAP 2016).
6. pressure-injuries-nursing-process, "Implementation: protecting skin integrity" first bullet
   - Internal inconsistency: this lesson said "Daily skin inspection", while the prevention lesson said twice daily in the hospital.
   - Changed to "Skin inspection at least daily ... (the prevention lesson's hospital standard is twice daily)".

## guides-m21d.js
7. wound-healing-intention-phases, section heading "Phase 1: The inflammatory phase (about days 3 to 6)" and the "Phases at a glance" table timing cell "About days 3–6 (starts at injury)"
   - Misleading: written as a date range, it suggested inflammation starts on day 3. That overlapped the proliferative phase ("day 3 to 21") and conflicted with the body text ("starts the moment tissue is injured and lasts roughly 3 to 6 days").
   - Changed the heading to "(from injury to about day 3–6)" and the table cell to "Starts at injury; lasts about 3–6 days".

## Fix counts by category
- Factual/clinical accuracy: 2 (#1 ACD vs. wheals, #4 stable heel eschar)
- Incomplete guidance that could lead to a wrong NCLEX answer / clarifying additions: 3 (#2 zoster precautions, #3 Candida vs. irritant diaper rash, #5 unstageable/DTPI)
- Internal contradiction/misleading timing: 2 (#6 inspection frequency, #7 inflammatory-phase timing)
- Wrong self-check answers: 0. Two of the fixes above (#1, #7) touch table cells.

## Verified correct (no change)
Lab ranges (albumin 3.5–5.0, WBC 5,000–10,000, Hgb), Braden range/cutoffs/subscale scoring, capillary pressure 32 mm Hg, repositioning times, NPIAP Stage I–IV definitions, contamination classes I–IV, impetigo/varicella/scabies/lice precautions and teaching, Reye syndrome, ABCDE, sunscreen teaching, exudate types, proliferative/maturation timing, scar strength 70–80%, dehiscence/evisceration actions, culture-before-antibiotic, delegation.

All four files re-parsed OK after editing (node vm check prints "ok m21").

---

## qa-m21-questions-a

### QA log: m21 (Tissue Integrity), files m21a.js, m21b.js, m21c.js

Scope: 108 questions (m21a 35, m21b 41, m21c 32) and 66 flashcards (m21a 32, m21b 34). Each one was read in full.
Automated checks: every answer index is valid, MCQ answers are single values and SATA answers are arrays, each optionRationales array matches its options in length, and every rationale's Correct/Incorrect prefix matches the key. No problems found.
After editing, m21a.js and m21c.js both parse ("ok m21"). m21b.js was not edited.

## Changes

1. **m21a-024** (biopsy discharge teaching), option 3 and its optionRationale
   - Problem: the distractor read "Some redness and yellow drainage this week are a normal part of healing." Serous drainage is normally pale yellow, so a student could argue this statement is true, which makes the item arguable.
   - Fix: changed "yellow drainage" to "thick yellow drainage" in the option, and "yellow (purulent)" to "thick yellow (purulent)" in its rationale. The distractor is now clearly describing purulent drainage, so the key (option 2) is the only defensible answer.

2. **m21c-021** (scabies outbreak), main rationale
   - Problem: it said to treat the resident and "all symptomatic contacts." CDC guidance is to treat all close or skin-to-skin contacts at the same time, whether or not they have symptoms, because symptoms can take 2 to 6 weeks to appear.
   - Fix: changed it to "all close contacts, even those without symptoms." The key is unchanged.

3. **m21a flashcard** "Where should a skin self-exam focus?" (topic skin-cancer-sun-protection)
   - Problem: the card was incomplete and did not match m21a-022, which teaches that melanoma in darker skin is more often found on the palms, soles, and nails.
   - Fix: added "In darker skin, also check the palms, soles, and nails."

## Reviewed but left unchanged

- **m21b-010** (incontinence skin care) and the matching m21b flashcard say to avoid petroleum ointments. In real practice, petrolatum is an accepted barrier for incontinence-associated dermatitis. The lesson text explicitly lists petroleum ointments under "Avoid," and the key (mild cleanser, warm water, pat dry, dimethicone) is still clearly the single best answer, so this was left as course content. Worth a note if the course material is updated.
- "Bathe older adults every other day" is the deciding detail in m21a-035, m21c-003, and m21c-035. It is consistent with the slides and with common teaching, so it was kept.
- The Tzanck test is keyed for herpes simplex in m21a-012. PCR is now preferred in practice, but no PCR option is offered and the item matches the lesson, so it was kept.

---

## qa-m21-questions-b

### QA log: m21 Tissue Integrity questions (batch b: m21d, m21e, m21f)

Scope: m21d.js (30 questions), m21e.js (37 questions), m21f.js (32 questions) = 99 questions; none of these files contains flashcards.
Every item was read in full (stem, exhibit tabs including vital-sign/lab tables, options, optionRationales, rationale, hint, takeaway).
Automated checks also passed for all 99: answer indices are valid, mcq answers are single values and sata answers are arrays, optionRationales line up 1:1 with options, and every rationale prefix (Correct/Incorrect/First/Not first/Intervene/Appropriate/Clarify) matches the key.

No keys were changed. Every keyed answer was confirmed as the single best answer (MCQ) or the complete and correct set (SATA).

## Changes

### m21f-001 (optionRationales[1])
- Problem: The rationale said mild POD 1 redness is "the normal inflammatory phase (about days 3–6)". That reads as if the inflammatory phase starts on day 3, which contradicts the POD 1 finding it explains. Inflammation begins at injury and lasts about 3–6 days.
- Fix: changed to "(which begins at injury and lasts about 3–6 days)".

### m21f-021 (rationale)
- Problem: Same error: "Inflammation (days 3–6) is necessary". This implies the phase starts on day 3.
- Fix: changed to "Inflammation (which begins at injury and lasts about 3–6 days) is necessary".

### m21e-013 (rationale)
- Problem: "the client with paraplegia is offsetting his with..." assigned a gender the stem never gives, and "his" had no noun after it (a wording error).
- Fix: changed to "offsetting those risks with".

## Reviewed, left unchanged (notes)
- m21d-015: the key "firm, direct pressure and elevate the leg" is kept. Current lay first-aid guidance no longer stresses elevation, but it does no harm, and direct pressure is still clearly the best first action.
- m21d-024: Tzanck test for herpes is kept as taught in the module (PCR is now preferred clinically). It is a distractor rationale and does not affect the key.
- m21d-003: the rationale's "hemoglobin is normal" is supported by this item's own lab tab (Hgb 13.9).
- m21e-003: the Braden subscales add up to 9 (very high risk), as keyed.

---

## qa-m5-guides

### QA log: Module 5 (Elimination) study guides

Files reviewed in full: guides-m5a.js (4 lessons), guides-m5b.js (4 lessons), guides-m5c.js (5 lessons). That is 13 lessons in all; every section, table, pearl, red flag, recap line and self-check was read.
All three files were re-parsed with the vm check after editing: ok m5 (x3).

## guides-m5a.js
1. urinary-assessment-diagnostics > "IVP: contrast dye, metformin, and allergies" (metformin bullet). The text gave only the slide rule (stop 48 h before) and said nothing about the timing current guidelines stress (ACR and FDA: hold at the time of contrast and for 48 h after, restart only once renal function is rechecked and stable). I added that sentence and kept the slide rule. Reason: NCLEX items often test holding metformin for 48 h after contrast.
2. Same section (allergies bullet). The text implied that a shellfish or iodine allergy predicts a contrast reaction. I added that a prior contrast reaction is the strongest predictor, that a shellfish allergy alone does not predict a reaction, and that it is still asked about and reported along with asthma. Reason: current ACR guidance; the old version invites a misconception.
3. urinary-interventions-pharm > "Medications that act on the bladder" table, Urecholine row. The only cautions listed were liver/pancreatic enzymes and obstruction. I added the cholinergic adverse effects (sweating, salivation, flushing, cramping, bradycardia, hypotension) and the asthma contraindication. Reason: these are the safety points NCLEX tests for bethanechol.
4. Same table, Pyridium row. I added "usually limited to about 2 days". The slide's "slightly sedating" wording was kept but is not a well-documented effect of phenazopyridine. It was flagged, not removed, because it comes from the course slides.
5. Same table, Myrbetriq row. Mirabegron is labeled a "urinary antispasmodic" by the slides. I added that it is a beta-3 agonist that relaxes the detrusor, so students don't confuse it with anticholinergics.
6. urinary-lifespan > "Pregnancy: kidneys working overtime". "GFR rises by as much as 50% beginning in the second trimester" was wrong: GFR rises early in the first trimester. I changed it to "rises early in pregnancy, reaching as much as 50% above normal by the second trimester".
7. urinary-lifespan > "School-age children" enuresis table, nocturnal row. The slide says bedwetting is "not a problem until after 7". I added that formal definitions (ICCS/AAP) use the term enuresis from age 5 and that treatment usually starts around age 6–7. Reason: this resolves a likely NCLEX conflict over what age defines enuresis.

## guides-m5b.js
8. bowel-interventions-prevention > "Collaborative therapies" medication table, stool softener row. I added that for opioid-induced constipation a softener alone is usually not enough and a stimulant (senna) is usually added. Reason: current opioid bowel-regimen guidance.
9. bowel-lifespan > "Breastfed vs formula-fed stools" table, odor row. The formula-fed cell said "Faint", the same as breastfed. Formula-fed stool usually smells stronger, so I changed it to "Faint, but usually stronger than a breastfed baby's".

## guides-m5c.js
10. constipation-impaction > "Lifespan: children and encopresis". The pediatric (Rome IV) criteria were stated wrongly: "Fewer than 2 stools per week" and "1 episode of incontinence per week", and the rule that at least 2 criteria must be present was missing. I corrected them to "at least 2 of the following", "2 or fewer stools per week" and "At least 1 episode of fecal incontinence per week".
11. constipation-impaction > "Pharmacologic therapy" table, stool softener row. I added the same opioid/stimulant clarification as item 8.
12. urinary-retention > "Reducing retention: Credé...". I added that Credé is not used with outlet obstruction or vesicoureteral reflux, because pressure can push urine back toward the kidneys. Reason: this safety contraindication was missing.

## Checked and left unchanged (correct or matching the slides)
Oliguria/anuria cutoffs, the 0.5 mL/kg/hr math in every example and check, BUN 8–20, Cr 0.5–1.2, SG 1.005–1.030, creatinine clearance 80–140, diuretic K+ effects, the spironolactone/salt-substitute check, HD vs PD, stoma color and output by location, auscultate-before-palpate, bowel sounds 5–30/min, EGD gag reflex, barium aftercare, intussusception signs, newborn first void and meconium timing, fiber 25/38 g, Kegel timing, the five UI types, PVR under about 50 mL, vasovagal precautions, impaction seepage, and fecal incontinence goals. All are correct or consistent with the slides.

---

## qa-m5-questions

### QA log: Module 5 (Elimination) questions and flashcards

Scope: cards-m5a.js (43 cards), cards-m5b.js (44), cards-m5c.js (52), m5.js (topic list only, no reviewable content), m5q.js (60 questions), m5x.js (55 questions).
Reviewed: 139 flashcards + 115 questions (75 MCQ, 40 SATA) = 254 items.
Structural checks: every answer index is valid; every keyed option's rationale starts with "Correct" and no unkeyed option's rationale does; option and rationale counts match. In these files, rationales for wrong options give the explanation without an "Incorrect." prefix. That is the house style here and I left it alone.
All edited files re-parsed OK with node vm.

## Changes

### m5q-021 (phenazopyridine teaching), m5q.js
- Problem: the keyed answer said Pyridium "may make me a little drowsy", and the option rationale, rationale and takeaway all called it "slightly/mildly sedating". Phenazopyridine is not a sedative. Its side effects are headache, GI upset, reddish-orange discoloration of body fluids, staining of contact lenses and fabric, and (rarely) hemolysis or methemoglobinemia. That made the keyed answer factually wrong.
- Fix: option 2 now reads "My urine may turn reddish-orange, and it can stain my contact lenses and underwear." I updated the option rationale, rationale and takeaway to match, and changed the hint from "its two side effects on the slides" to "its expected effect on urine". The key is still index 2.

### m5x-039 (Rome IV chronic constipation), m5x.js
- Problem: the item said Rome IV needs 2 or more symptoms "for at least 12 weeks" and keyed a client with only 4 months of symptoms as meeting the criteria. Rome IV requires symptoms for the last 3 months with onset at least 6 months before diagnosis, so a 4-month history does not meet them. As written, the key could be argued against.
- Fix: the stem now says 7 months. Option 0 text, option 0 rationale, option 2 rationale ("Seven months"), rationale and takeaway now state "last 3 months with onset at least 6 months before diagnosis". The key is unchanged.

### m5x-042 (pediatric constipation), m5x.js
- Problem: the rationale gave the pediatric Rome IV criterion as "fewer than 2 stools a week". The criterion is 2 or fewer defecations per week.
- Fix: changed it to "two or fewer stools a week". The key is unchanged.

### cards-m5a.js flashcard "Pyridium (phenazopyridine)"
- Problem: "slightly sedating" (same error as m5q-021).
- Fix: replaced with "can stain contact lenses and clothing. Short-term use only; it does not treat the infection."

### cards-m5a.js flashcard "IVP: two key nursing checks"
- Problem: "Stop metformin 48 hours before" is outdated and incomplete. Current guidance (ACR) is to hold metformin at or before the contrast study and for 48 hours after, resuming once renal function is rechecked.
- Fix: changed to "Hold metformin ... (at or before the study and for 48 hours after, until renal function is rechecked)". Added "prior contrast reactions" next to the iodine/shellfish check, which the course still teaches.

### cards-m5a.js flashcard "Myrbetriq (mirabegron)"
- Problem: it described mirabegron only as a "urinary antispasmodic". Pharmacologically it is a beta-3 adrenergic agonist (not antimuscarinic).
- Fix: changed to "Beta-3 adrenergic agonist (grouped with urinary antispasmodics) — relaxes the detrusor to treat overactive bladder and spasms." Kept the BP warning.

### cards-m5c.js flashcard "Rome IV criteria for chronic constipation"
- Problem: "for at least 12 weeks" left out the Rome IV onset requirement.
- Fix: changed to "present for the last 3 months with onset at least 6 months before diagnosis".

### cards-m5c.js flashcard "Habit training vs. scheduled toileting"
- Problem: "void at the times the bladder diary shows leaks" is imprecise. Habit training toilets the client on a schedule matched to their own voiding pattern, before leaks usually happen. The old wording also conflicted with m5x-019.
- Fix: changed to "toilet on a schedule matched to the client's own voiding pattern from the bladder diary (before leaks usually occur)".

## Checked and left as is (notes)
- m5q-009 / IVP shellfish: the evidence no longer treats shellfish allergy as a specific predictor of contrast reaction, but the item still works because any prior allergic reaction goes to the provider, and metformin alone justifies the keyed action. NCLEX convention still expects this check.
- Nocturnal enuresis "not a problem until after age 7" (m5q-029, m5x-011, flashcard): matches common clinical teaching (for example Mayo Clinic). Kept.
- Bethanechol raising liver and pancreatic enzymes: drug references list increases in AST, amylase and lipase. Kept.
- Oliguria <400 mL/day or <30 mL/hr, anuria <100 mL/day, 0.5 mL/kg/hr, BUN 8–20, Cr 0.5–1.2, SG 1.005–1.030, fiber 25 g/38 g, secondary enuresis after 6 months of dryness, SMOG enema contents, stoma output by location: all accurate. Kept.

---

## qa-m6-guides

### QA log: Module 6 guides (Fluids & Electrolytes)

Files reviewed in full: content/guides-m6a.js (4 lessons: fe-body-fluids, fe-fluid-movement, fe-intake-output, fe-iv-solutions), content/guides-m6b.js (3 lessons: fe-electrolytes, fe-assessment-diagnostics, fe-risk-interventions). 7 lessons total. Covered all sections, tables, key terms, pearls, red flags, recaps, and self-checks. Both files parse after editing ("ok m6").

## Changes

1. guides-m6a.js / fe-intake-output / section "The daily numbers" (table)
   - Problem: the output column added up to 2,200–2,400 mL (1,400–1,500 + 350–400 + 350–400 + 100), but the header and recap say 2,300–2,600 mL. That is an internal contradiction in a table students are expected to memorize.
   - Fix: changed intestines (stool) from "100" to "100–200" and added the row "Sweat (sensible) | 100". This matches the standard reference table (Potter & Perry), and the column now totals 2,300–2,600 mL.

2. guides-m6a.js / fe-iv-solutions / section "Colloid solutions: albumin and dextran 40" (body)
   - Problem: the lesson said albumin is "used in shock and burns" with no timing. On the NCLEX, isotonic crystalloid (LR, Parkland formula) is first-line in the first 24 hours after a major burn, because leaky capillaries let colloids escape into the tissues. Colloids are added after about 24 hours. Without this, a student would pick albumin for early burn resuscitation.
   - Fix: added two sentences explaining the first-24-hour crystalloid rule and when albumin is added.

3. guides-m6a.js / fe-iv-solutions / same section, check answer ("severe burns ... albumin rather than more crystalloid alone?")
   - Problem: the answer implied albumin is better than crystalloid for burns with no limit on timing (same NCLEX trap as #2).
   - Fix: added the timing point to the answer: LR is first-line in the first 24 hours, and albumin is usually added after that.

4. guides-m6b.js / fe-electrolytes / section "Calcium: bones, muscles, nerves, and clotting"
   - Problem: the course range for total calcium (9–11 mg/dL) is higher at the top than the usual NCLEX/standard reference range (about 9.0–10.5 mg/dL). A student could call a value of 10.6–11 normal on a standardized exam.
   - Fix: kept the course range and added a note giving the common NCLEX range, with an example (10.8). Nothing else in the lesson changed.

## Reviewed, no change needed (judgment calls)
- Na 135–145, K 3.5–5.0, Cl 95–105, Mg 1.5–2.5 mEq/L, phosphate 2.5–4.5 mg/dL, serum osm 280–300, urine osm 200–800, SG 1.005–1.030, albumin 3.5–5.0, prealbumin 15–36: all within accepted reference ranges.
- All worked calculations (0.5 mL/kg/hr, I&O totals, weight-to-fluid conversions) are correct.
- Chvostek/Trousseau were already corrected to low calcium. The diuretic and potassium table is correct. The IV potassium safety points (never IV push, check urine output) are correct.
- Slide-specific framing (bicarbonate listed in both ECF and ICF, magnesium "mainly intracellular", D5W tonicity caveat) is kept as course content. Each is either accurate or already explained.

---

## qa-m6-questions

### QA log — Module 6 Fluids & Electrolytes (questions + flashcards)

Files reviewed: cards-m6a.js (43 cards), cards-m6b.js (32 cards), m6.js (topic metadata), m6q.js (45 questions), m6r.js (45 questions).
Total: 90 questions (58 MCQ, 32 SATA) + 75 flashcards. Every item read in full and cross-checked against the course slide deck (source/Fluid and Electrolytes.pptx).

Automated checks (all passed): answer indices valid; MCQ answers scalar / SATA arrays; optionRationales count = options count; every rationale starting "Correct" matches the key exactly; MCQ key positions balanced (0:14, 1:14, 2:14, 3:16).
Math re-verified: all I&O totals (m6q-021, m6r-028, m6r-029), urine-output calculations (m6q-008/024/032, m6r-017/018/019/025/030), weight conversions (m6q-006, m6r-020, m6r-021), and the distractor arithmetic.

## Changes

### m6q-036 (m6q.js) — optionRationales[3]
- Problem: Called a hematocrit of 46% "the high starting value." Client sex is not given, and 46% is within the normal range for men (about 42–52%) and high-normal for women (about 37–47%), so calling it plainly "high" is inaccurate.
- Change: "the high starting value (46%) likely reflected the vomiting-related deficit" -> "the relatively high starting value (46%) likely reflected hemoconcentration from the vomiting-related deficit."
- Why: Keeps the teaching point (dehydration concentrates the blood) without misstating a normal-range value as abnormal. Key unchanged.

## Reviewed, not changed (noted)
- Daily output total (flashcard "Daily intake and output (adult)" in cards-m6a.js; m6q-031 rationale): the listed parts (urine 1,400–1,500 + lungs 350–400 + skin 350–400 + intestines 100) add up to 2,200–2,400 mL, not the stated 2,300–2,600 mL. These figures come word-for-word from course slide 29 (the textbook total also counts about 100 mL of sweat and 100–200 mL of stool). Left unchanged so the course values students are tested on stay the same. You may want to tell the instructor.
- Course-specific values kept as taught: total Ca 9–11 mg/dL, Cl 95–105 mEq/L, urine osmolality 200–800 mOsm/kg, "potassium is not stored," "bicarbonate is not obtained from the diet."
- Slide 50 says "Chvostek/Trousseau = Ca+ excess" (these signs actually mean hypocalcemia). No item in these files repeats that error, so nothing to change.
- No item could reasonably be argued two ways. Priority, delegation, and scope items follow NCLEX conventions (assess or verify before acting, ABCs, HCP order needed for fluid or medication changes).

---

## qa-new-m37

### QA log — Module 37 (Collaboration), independent review

Reviewed: 42 questions (all stems, keys, option rationales, rationales, hints), 34 flashcards, 3 lesson topics (all sections, tables, self-checks, end checks, NC notes, source clarifications) against the Module 37 study guide and the verified NC facts.

Verdict on keys: all 42 keys were defensible as the single best answer / exact SATA set by NCLEX-RN standards; no key changes were needed. Fixes targeted weak distractors, a recall/giveaway item, terminology accuracy, and lesson gaps.

## Question / flashcard changes
- m37-pro-003 (SATA, delegation): replaced straw-man distractor "Staying with a client who reports new chest pain while the RN charts" (wrong only because the RN was charting) with a standard non-delegable task (monitoring the first 15 min of a blood transfusion); updated option rationale and main rationale.
- m37-pro-008 (MCQ, PA orders): option A premise "PAs are licensed to prescribe in every state" is actually broadly true (PAs have prescriptive authority in all states), which muddied why it was wrong; rewrote to "nurses in the previous state could accept PA orders" so the error (assuming rules transfer across states) is unambiguous; updated option rationale and main rationale.
- m37-pro-009 (MCQ, PACE): replaced throwaway distractor "school-based interprofessional health team" (obviously wrong for a 79-year-old) with a plausible look-alike, intermittent skilled home health visits; added rationale explaining why it does not meet the respite/transport need.
- m37-pro-019 (SATA, I PASS THE BATON): corrected "THE Background" wording—"THE" is a connecting word in the mnemonic; B = Background.
- m37-pro-025 (MCQ, CUS): rewritten from recall ("which statement uses CUS?"—the key simply recited all three acronym words, a giveaway) into an application item: the nurse has already said "concerned" and "uncomfortable" and been dismissed; student must choose the next step (state the Safety issue with a specific request). New options of equal length; rationales, takeaway, and hints rewritten. No chain-of-command option included so the key cannot be argued two ways.
- Flashcard 11 (QSEN six competencies): official QSEN name is "Patient-centered care"; changed to "Patient-centered (client-centered) care".
- m37-pro-024 (MCQ, IPEC competencies): added a clinical context (discharge care conference for a client with COPD) to the bare recall stem; key unchanged.

## Lesson changes (guides-m37-pro.js)
- Guide nurse-collaborator, key term "QSEN Teamwork and Collaboration": "client-centered care" -> official QSEN name "patient-centered (client-centered) care".
- Guide nurse-collaborator, "How the NCLEX tests this" step 5: added note that an "assess respiratory status" option would outrank the SLP referral, so the sample (no assessment option offered; key = hold fluids + SLP) does not contradict question m37-pro-010 (key = assess and hold intake before SLP consult).
- Guide nurse-collaborator, "Collaboration and related concepts": section had no self-check and no worked method; added a step-by-step paragraph on using the concept links in exam items and a self-check with answer.
- Guide nurse-collaborator, "Collaborative practice beyond the hospital": added a self-check contrasting ACT vs. PACE (common exam look-alike).
- Guide ipec-teamstepps, key term and I PASS THE BATON table: the table labeled the row "THE" = Background (copied from the source). "THE" is a connecting word in the mnemonic and B = Background; relabeled the row "THE → B" and clarified the key-term definition.
- Guide ipec-teamstepps, NC practice note: the console/coach/discipline responses were stated as if they were NCBON rules; reworded to present the three NCBON categories (verified) and attribute the console/coach/discipline responses to the general Just Culture model.
- Guide ipec-teamstepps, "Teams and teamwork; barriers and evidence-based fixes": added a self-check on discipline-specific input followed by shared decision making.
- Guide conflict-management, end-of-lesson check (code documentation dispute): original answer told them to "resolve the documentation issue afterward," which implied leaving code documentation unassigned; revised so a recorder is assigned immediately and only the role debate is deferred.
- Guide conflict-management: added self-checks to "Why conflict happens" (organizational role ambiguity) and "Incivility, verbal abuse, horizontal violence, and bullying" (repeated sabotage vs. one-time incivility), which previously had none.
- Guide ipec-teamstepps, "Course source & clinical clarification" item (3): added explanation that the source’s "THE — Background" means THE is a connecting word and B = Background.

## Verified, no change needed (notable checks)
- Source errors already corrected in the lesson "Course source & clinical clarification" sections: "National League for Nurses" -> National League for Nursing; ANA collaboration standard (Standard 10 in 2015 ed., Standard 11 in 2021 4th ed.); RD/RDN does not make medical diagnoses; IPEC 2023 (v3) keeps the four domains; TeamSTEPPS 3.0.
- Thomas–Kilmann assertiveness/cooperativeness ratings, best uses, and cautions are correct and consistent between the lesson table, flashcards, and items 032–035, 040.
- TeamSTEPPS tools (call-out, checkback, CUS, Two-Challenge Rule, SBAR) correct and consistent across lessons, cards, and items 015–028.
- Delegation/assignment items (003, 004) consistent with NCSBN five rights and NC RN/LPN rules (21 NCAC 36 .0224/.0225).
- NC practice notes use only verified facts (NCBON, NPA G.S. 90-171.19 et seq., NA I/NA II registries, NLC, Just Culture tool, Board-reported conduct issues, alternative-to-discipline). No NC statute content appears in question stems.
- Validator: `node validate.mjs 37` -> OK; MCQ answer positions {0:7, 1:8, 2:8, 3:7}; no length-cue warning.

---

## qa-new-m39

### QA log: Module 39 (Managing Care), independent review

Reviewed: 43 questions (all stems, keys, option rationales, hints), 30 flashcards, 3 lessons (all sections, tables, checks, NC notes, clarifications) against the Module 39 study guide text.
Validator: `node validate.mjs 39` -> OK (MCQ answer positions {0:8, 1:8, 2:8, 3:7}; no length-cue warnings).

## Questions
- m39-pro-018 (recall -> application). It was a SATA asking you to list the 4 parts of a critical pathway. Rewritten as an exhibit-based MCQ: the case manager reviews a draft THA pathway that is missing expected outcomes; the key is "Add the expected client outcome for each time frame" (index 3). Distractors (replace time frames with "as tolerated", drop pharmacy/nutrition columns, add discharge destination) each match a real misconception. All option rationales, rationale, takeaway, hints, and cjmm (Analyze Cues) were rewritten.
- m39-pro-028 (recall -> analysis). It was a SATA listing the "five essential elements". Rewritten as an audit of a failing program: the student picks the findings that explain the poor results (late case-manager involvement, no physician support, no variance review, no pathways; key [0,2,3,5]). Elements that are present (certified RN case managers, daily team meetings) are the distractors. cjmm changed to Analyze Cues.
- m39-pro-041 (recall -> application). It was a SATA of "accurate statements for a presentation". Rewritten so the student corrects a resident's misconception ("we spend the most, so we're healthiest"). Key [0,1,4]: lowest life expectancy, admin waste/drug prices, highest obesity rate. Reversed-fact and socialized-system options are the distractors. cjmm changed to Take Action.
- m39-pro-033 (consistency). The stem now says Medicare is the payer. Before, the rationale and option rationales relied on Medicare hospital-acquired-condition (HAC) payment policy while the stem named no payer.
- m39-pro-029 (NC note, nationally consistent). Added one sentence to the rationale: NC is a universal-reporting state, so any person who suspects neglect reports to the county DSS. The key (report to CPS right away, no proof needed) is unchanged.
- All other items (001-017, 019-027, 030-040, 042-043): I checked the key, rationales, facts, ambiguity, and length cues. No change was needed. Specifically confirmed: the HMO and PPO items, Medicare vs Medicaid long-term care, the coinsurance math ($400), PPS/DRG, socialized insurance = Canada, mandatory insurance = Germany, voluntary insurance = U.S., CHIP is public, LPN assignment (no starting blood transfusions, no initial teaching), the five rights, primary vs case method, functional-method risks, and handoff = documentation plus verbal report.

## Flashcards
- Card 6 (differentiated practice): the old card said UAP work "at the top of their license", but UAP are unlicensed. Reworded to "licensed nurses at the top of their license; each role at the top of its scope."

## Lessons
- case-management, checks[] (15-year-old pregnant client with a controlling older boyfriend): the old answer said "follow mandatory reporting requirements". It now says report the suspected maltreatment of a juvenile to the county DSS under NC universal reporting, without waiting for proof. This matches the verified G.S. 7B-301 facts, and no unverified statute is added. Minor consent to prenatal care is kept (G.S. 90-21.5).
- Self-checks were added to 7 sections that had none, to strengthen step-by-step teaching (nothing was shortened):
  - managing-care S2 (UAP feeding: stable dementia client vs new stroke with no swallow screen)
  - managing-care S6 (competent client refusing oxygen: informed discussion, respect the decision, notify, document)
  - case-management S2 (assessment comes before referrals)
  - case-management S4 (why expected outcomes make variances visible; supports the new item 018)
  - case-management S6 (lifelong vs correctable childhood disability)
  - cost-effective-care S4 (CAUTI under PPS: the hospital absorbs the cost)
  - cost-effective-care S6 (reusing single-use devices is not cost-effective)
- I checked the facts and found no errors. Items checked: managed-care goals; the HMO/PPO table; the 7 delivery models table; RN/LPN/UAP table; the staffing-ratio clarification (California first; Oregon 2023 law; Massachusetts ICU); ACA ban on lifetime caps; Medicare Parts A-D; Medicaid long-term care; CMS HAC and readmission penalties; the four world health-system categories; the DALY and Commonwealth Fund figures (source); and all NC notes against the verified NC fact list. There were no wrong table cells, and no lesson contradicted a question.

---

## qa-new-m42

### QA review — Module 42 (Accountability) — independent NCLEX item/editor review

Scope: all 45 questions, 35 flashcards, and 3 lessons (accountability-foundations, accountability-practice, competence). Checked against the Module 42 study guide and the verified North Carolina facts.

## Overall finding
The writer's draft was strong. All 45 keys were correct by NCLEX-RN standards, with no SATA errors and no rationale contradicting its key. NC statutes in the lessons were used only as verified (NCBON / 21 NCAC 36 .0224/.0225, NA I/NA II registries, NLC, Just Culture tool, G.S. 7B-301, 108A-102, 90-21.14, 1-15(c)). No invented NC rules were found. The changes below cover weak recall items, one implausible distractor, one display-order bug, NC alignment, and teaching depth.

## Question changes
- m42-pro-002 (Foundations): Rewrote a near-duplicate recall item (it overlapped m42-pro-013, same restock/transport distractors) into a scenario on advocating for top-of-license practice; it now tests the advocacy duty, the shared-governance route, and the limit set by competence. The key stays at index 2. Difficulty 2→3.
- m42-pro-019 (Delegation): The rationale referred to "Option C", which is wrong once options are shuffled for display. Replaced with a reference to the option’s wording.
- m42-pro-021 (Range orders): Replaced the implausible distractor "give 4 mg plus 1 mg" with a realistic error: repeating 4 mg after 30 minutes, which breaks both the every-1-hour frequency and the 4-mg ceiling. Updated that option’s rationale and the main rationale so they teach that a range order limits both dose and interval.
- m42-pro-024 (Child abuse): Added the verified NC fact (report to county DSS; universal reporting) to the rationale and the correct option’s rationale. The key is unchanged and still correct by national standards.
- m42-pro-040 (Cultural competence): Rewrote a recall item ("which content should the training include") as an evaluation scenario in which the student must spot effective behaviors at the bedside. It still tests the source’s four core elements, plus stereotyping and dismissing herbal remedies. Key [0,1,3,4]. CJMM changed to Evaluate Outcomes.
- m42-pro-045 (Benner): Rewrote a recall list ("which characteristics should the manager include") as an evaluation scenario with observed behaviors. Added a proficient-stage distractor (relying on maxims) so the item tells proficient from expert. 6 options, key [0,2,3].

## Lesson changes (nothing shortened)
- Foundations › "The five components" section: Components 1–2 and 3–5 had been run together in two paragraphs. Split them so each component has its own paragraph, added a "How you will see it" behavior line to each, and added a 3-step method for "which component?" items, including the overtime and habit traps that m42-pro-005 tests. Nothing was removed.
- Accountability Practice › "Delegation and assignment" section: Added a 6-step delegation decision sequence (client stability, RN-only activities, scope/task list including the NC NA I/NA II lists and the NCBON decision tree, verified competence, specific directions, supervision and evaluation). The section had given only the principles and a table, with no worked procedure for a struggling student to follow.
- Accountability Practice › "Medication accountability" example: Added a safety note that the nurse checks renal function, bleeding risk, and GI history before an NSAID is suggested for a 78-year-old with renal colic. The original wording suggested an IV NSAID without any age or renal caution.
- Accountability Practice › worked case (Mrs. Greene): Added the verified NC route for the adult protective services report (county DSS, G.S. 108A-102), so the case matches the NC practice note.
- Competence › "Benner’s five stages" section: Added a 6-step method for working out the Benner stage from a stem (setting first, then decision style, competent vs proficient vs expert cues, then the safety-alert check). This supports m42-pro-032 and the rewritten m42-pro-045, which now uses a proficient-stage distractor.

## Verified with no change needed (selected)
- Levels of evidence (systematic review/meta-analysis of RCTs at top, expert opinion at base): correct.
- NCSBN/ANA 2019 definitions of delegation and assignment, five rights, and the LPN = assignment clarification for the Epworth case: correct and consistent with m42-pro-019.
- Just Culture (console / coach / sanction) in m42-pro-028, the lesson, and flashcard 21: consistent.
- Benner year ranges (2–3 competent, 3–5 proficient) match the source, with a setting-specific caveat. m42-pro-032 (4 years, maxims, discharge focus = proficient) is consistent.
- KCl IV push, unsafe-order chain of command (m42-pro-023), and source Review & Relate: consistent.
- Course-source clarifications (Magnet BSN requirement, ANA authors the Code of Ethics rather than the NCSBN, floating = negotiate before report and avoid abandonment) are accurate.
- Flashcards: all 35 accurate. Flashcard 20 correctly uses NC county DSS.

## Validation
node validate.mjs 42 → OK (mcq answer positions {"0":9,"1":8,"2":8,"3":8}, no length-cue warning).

---

## qa-new-m43

### QA review — Module 43 (Advocacy)

Reviewer: independent NCLEX-RN item review. Source: Module_43_Advocacy_Study_Guide.txt.
Scope reviewed: 43 questions (all keys, every optionRationale, rationales, hints), 33 flashcards, 3 lesson topics (all sections, tables, checks, NC notes, source clarifications).

## Summary
- Keys: all 43 keys verified as single best answer / exact SATA set; no key changes required.
- Answer-length giveaway: no MCQ correct option >15% longer than the longest distractor; MCQ answer positions balanced (8/8/7/7).
- NC facts: checked against the verified list; all NC content confined to "North Carolina practice note" sections, plus m43-pro-040 (report suspected child abuse to DSS without proof), which is also correct by national standards. No unverified statute numbers found.
- Flashcards: accurate; no changes.

## Changes — questions (m43-pro.js)
- m43-pro-002 (weak recall → application): rewrote stem from a classroom "reviewing examples" recall item into a clinical pattern scenario (rural readmissions, no clinic/transport); updated rationale and hint to teach pattern → macrosocial reasoning. Key unchanged (A).
- m43-pro-003 (rationale accuracy): option D rationale claimed the ethics committee "does not meet emergently" — many facilities have on-call ethics consultation; reworded to the real reason (holding all care is unsafe and delays informing the surgeon).
- m43-pro-013 (rationale accuracy): option C rationale stated flatly "there is no ethical dilemma to review" (overstated — nurse moral distress can warrant ethics support); reworded so the reason it is wrong is the delay that overrides the client’s documented wishes. Rationale adds that conscientious objection should be raised early.
- m43-pro-015 (fact accuracy): option C rationale said the wife "is not automatically the legal decision-maker" — in many states a spouse is high in the default-surrogate order; rewrote so the reason is that the client will regain capacity before an elective procedure. Rationale wording aligned.
- m43-pro-038 (internal contradiction): timeline was impossible — RN "relieved of client assignment" at 0720 but then observed at the medication cart at 0915. Re-timed entries to 0700 (odor) → 0705 (gait/speech at cart) → 0710 (charge nurse notified, RN relieved). Key unchanged.

## Changes — lessons (guides-m43-pro.js)
- Guide advocacy-interventions, "How the NCLEX tests this" sample item: Eliminate-B reasoning said "the spouse is not automatically the surrogate" (misleading — spouses are default surrogates in most states); rewrote around temporary incapacity + non-urgent procedure, matching corrected Q015.
- Guide advocacy-interventions, "Course source & clinical clarification": added (7) source misnames PAIMI as "State Protection and Advisory Systems" → Protection and Advocacy for Individuals with Mental Illness; (8) spouse/default-surrogate clarification.
- Guide reporting-unprofessional: ADDED section "Practice errors vs conduct: the Just Culture lens" (body, 4-row table, 5-step classification method, worked check) — Just Culture was tested in m43-pro-041/042 and flashcards but was taught only in one sentence of the NC note; added matching "At-risk vs reckless" row to Common traps table and clarification (5) in Course source.

## Reviewed, no change needed (notable checks)
- Source errors already correctly handled in lessons: PSDA dated 1991 in source (passed 1990, effective Dec 1991); ADA Amendments Act (2008, effective 1/1/2009); "nurse may NOT legally serve as surrogate" clarified as the treating nurse / ethical conflict (m43-pro-039 distractor B correctly rejects the absolute legal claim); Disability Rights Ohio name.
- Miglitol content (first bite of meals, GI effects, glucose not sucrose for lows, possible reduced digoxin levels) accurate.
- Federal research protections (pregnant women/fetuses/neonates, children, prisoners) accurate.
- Just Culture classification in m43-pro-041 (skipping barcode scanning = at-risk, coach) and conduct-issue list in m43-pro-042 accurate and now taught in the lesson.

## Validation
`node validate.mjs 43` → OK

---

## qa-new-m44

### QA review — Module 44 (Ethics)

Reviewer: independent NCLEX-RN item review. Files: content/m44-pro.js, content/guides-m44-pro.js. Source: Module_44_Ethics_Comprehensive_Study_Guide.txt.

Scope: 42 questions (all keys, option rationales, facts, ambiguity, length cues), 31 flashcards, 3 lesson topics (all sections, tables, self-checks, NC notes).

## Question changes
- **m44-pro-003** [accuracy] Rationale now notes the ICN co-worker element is from the 2012 edition and the duty persists in the 2021 revision (course cites 2012).
- **m44-pro-012** [recall→application] Rewrote abstract recall SATA ("student asks which behaviors") into a 90-day evaluation scenario with concrete observed behaviors; rationales, hints, takeaway updated; answer set kept [0,1,3,4]; CJMM changed to Recognize Cues.
- **m44-pro-014** [recall→application] Replaced pure trivia (who wrote the Nightingale Pledge) with an orientation "statement indicates correct understanding" item that tests the role of each code; key stays index 0; added accurate rationale that boards enforce the practice act, ICN applies worldwide.
- **m44-pro-015** [ambiguity] Added "has not authorized the release of any information" so the key cannot be challenged on the basis of a facility directory/authorized-contact exception.
- **m44-pro-022** [metadata] CJMM changed Prioritize Hypotheses → Take Action (stem asks for the first action).
- **m44-pro-024** [accuracy] Rationale/option 0 rationale now acknowledge the spouse is usually the default surrogate and explain substituted judgment, so the distractor is rejected for the right reason.
- **m44-pro-028** [accuracy/NC] Rationale rewritten: national rule stated first (all states allow minor STI consent), NC G.S. 90-21.5 limited to a parenthetical consistent with verified facts; hint reworded from recall to application.
- **m44-pro-029** [ambiguity] Keyed option (client asks nurse to keep prognosis from wife) was arguable: confidentiality law already dictates non-disclosure, the same "no freedom" logic used to eliminate the abuse option. Replaced with a capable older adult wanting to go home alone vs her son's wishes (autonomy vs beneficence, true freedom of how to advocate); balanced option lengths; rationales updated.
- **m44-pro-036** [length cue] Correct option was 138 chars vs 61–71 for distractors; rebalanced all four to 88–98 chars without changing meaning or key.
- **m44-pro-038, m44-pro-040** [length cue] Lengthened the shortest distractor so the key is no longer the longest option by >25%; meaning unchanged.

## Lesson changes
- **Guide morality §1 (dilemma criteria)** [accuracy/consistency] Promise/prognosis row now explains that confidentiality law settles non-disclosure but freedom remains in how to respond; added a capable-older-adult-wants-to-go-home row (matches revised Q029); added a step-by-step paragraph on applying the four criteria and why criterion 3 eliminates most distractors.
- **Guide morality worked case** [accuracy] Step 2 clarifies that HIPAA/confidentiality already forbids disclosure; the dilemma is how to respond and support disclosure, keeping the case consistent with the four criteria and with Q029.
- **Guide ethical-principles §1 (consent)** [expanded] Added step-by-step teaching on the emergency (implied consent) exception and on handling a capable client’s refusal/AMA, a high-yield gap for a student who struggles to apply content.
- **Guide ethical-principles §3 (HIPAA)** [expanded] Added a paragraph on lawful exceptions to confidentiality (mandatory reporting, reportable diseases, court order, imminent threat) and the minimum-necessary rule, so students do not over-apply "never disclose."
- **Guide ethical-principles NC note** [accuracy] Softened absolute "entitled to confidentiality" to "generally kept confidential" (only verified NC facts retained) and tied it to the national rule.

## Reviewed, no change needed
- All other keys verified as the single best answer / exact SATA set by NCLEX standards; option rationales agree with keys.
- Flashcards accurate; no edits.
- Guide course-source clarifications already correct (ICN 2021 revision, ANA 2025 revision, AACN 2021 Essentials, Joint Commission ethics process, Beauchamp & Childress four principles, teleologic "Was the action fair?" source error flagged). NC notes use only verified facts.

## Validation
```
m44: 3 topics, 42 questions, 31 cards; mcq answer positions {"0":7,"1":7,"2":8,"3":8}
OK
```

---

## qa-new-m45

### QA review — Module 45 (Evidence-Based Practice)

Reviewer: independent NCLEX-RN item review. Files: content/m45-pro.js, content/guides-m45-pro.js.
Source checked: Module_45_Evidence_Based_Practice_Study_Guide.txt.

## Scope reviewed
- 46 questions (all keys, option rationales, rationales, hints, exhibits), 33 flashcards, 3 guide topics (all sections, tables, self-checks, pearls, red flags, checks, NC notes, source clarifications).
- Every key verified as single best answer / exact SATA set. No keys were found to be wrong. NC facts used only as verified (NCBON, 21 NCAC 36 .0224/.0225, NA I/NA II registries, NLC, Just Culture, G.S. 90-21.5, G.S. 1-15(c), contributory negligence).

## Changes
1. m45-pro-001 (stem consistency): Option A refers to "the ordered arterial blood gas" but the stem never mentioned an ABG order; added the ABG order to the stem so the distractor is internally consistent.
2. m45-pro-007 (recall → application): Replaced a pure history-matching item ("which statement is accurate?") with a scenario in which a manager justifies following a Cochrane systematic review over a physician’s preference; distractors now reverse each pioneer’s actual message (Nightingale, Sackett, IOM). Difficulty 1→2; CJMM Recognize Cues→Analyze Cues (Recognize Cues still covered by other items).
3. m45-pro-010 (distractor strength): Exhibit distractors were purely preference notes, making the key obvious. Added treated-but-active symptoms to rooms 402 (pain 4/10 after opioid) and 403 (nausea 5/10, ondansetron 30 min ago) so the item requires prioritizing a physiologic threat over treated symptoms; updated option rationales and rationale.
4. m45-pro-014 (key wording): The key previously offered to "let your surgeon know" for a client who said she feared offending the surgeon, which could be argued as overriding her stated concern. Revised the key to affirm the right and offer practical help (arranging the opinion, obtaining scan copies); rationale updated.
5. m45-pro-036 (accuracy): Option B rationale said opinion is "the lowest level of evidence"; per the module hierarchy, individual opinion is lowest and expert opinion is second-lowest. Reworded to "near the bottom."
6. m45-pro-038 (duplicate → new skill): Item duplicated m45-pro-015 (evidence conflicts with policy → take it to manager/practice council, same key). Rewrote it to test the other half of LO 45.5: which change an individual nurse may make within policy (timing a required CHG bath to client preference) versus changes that alter the policy (dressing interval, flush technique, omitting the bath). Priority flag true→false (not a priority item); CJMM Take Action→Analyze Cues.
7. m45-pro-045 (stem): Added a brief clinical context (journal-club ideas) to a context-free stem.
8. Guide ebp-foundations (accuracy): Pearl 2 and Check 3 said expert opinion is "the weakest/lowest level" of evidence; the module hierarchy places individual opinion lowest and expert opinion second. Corrected to "near the bottom (only individual opinion ranks lower)."
9. Guide ebp-foundations, Worked case (clarity): Fixed a confusing sentence implying blood was needed for a GI bleed from last year; now states he refuses blood products even if he bleeds again.
10. Guide ebp-foundations, "Research, evidence, and experience" (teaching): Section had no self-check; added one that applies the research/evidence/experience distinction to a nurse who equates years of experience with EBP.
11. Guide ebp-foundations, "Translational research and the 17-year gap" (teaching): Added a self-check on choosing change strategies (champions, staff/client education, pilot) versus mandates.
12. Guide research-methods, "Informed consent in research and the IRB" (teaching): Added a self-check applying the nurse-vs-investigator consent roles (consistent with m45-pro-022).
13. Guide research-methods, "Standards of nursing care and professional accountability" (thin section expanded): Added two paragraphs explaining the three layers of standards (law, professional standards, facility policy) and how the reasonably prudent nurse standard is proven, plus a 5-step scope self-check list.
14. Guide ebp-steps, Step 3 self-check (accuracy): The example (4.1% vs 4.0% pneumonia in 5,000 clients, p = 0.04) is statistically impossible (that difference would give p ≈ 0.9). Replaced with a plausible example (10,000 clients, length of stay 5.0 vs 4.9 days, p = 0.04). Also expanded the bathroom-scale analogy to teach that a measure can be reliable but not valid.
15. Guide ebp-steps, NCLEX sample item (accuracy): Elimination step called provider preference "the lowest level of evidence"; corrected to "near the bottom of the hierarchy."
16. Guide ebp-steps, Big picture (accuracy): "expert opinion at the bottom" → "individual and expert opinion at the bottom" to match the hierarchy.
17. Guide ebp-steps, Course source & clinical clarification: Added Clarification 5 noting that the PEP stoplight is a simplification of ONS’s more detailed evidence categories, so students can recognize either wording.

## Verified without change (notable)
- COPD oxygen items (001, 010, guide Box 45.1): titrate to 88–92%, never withhold; source clarification retained.
- Hierarchy items (033, flashcard 27): consistent with source Figure 45.3 and current hierarchies.
- Belmont justice (020): fair selection keyed; guide clarifies source's confidentiality-under-justice framing.
- Delegation (043): NA I measuring/recording output is correct nationally and under NC rules; RN retains assessment/teaching/evaluation.
- Statistical vs clinical significance (035), case-control vs cohort (042), PEP yellow (037), research vs EBP project (039).

## Validator
node validate.mjs 45 → OK

---

## qa-new-m46

### QA review — Module 46 (Healthcare Systems)

Reviewed: all 44 questions (31 MCQ, 13 SATA), 30 flashcards, 3 guide topics (every section, table, check, pearl, red flag, recap, NC note, source clarification). Cross-checked against the Module 46 study guide text and the verified NC facts.

## Question changes (content/m46-pro.js)
- **m46-pro-002 (SATA, secondary prevention)**: replaced option 3, "CAD risk assessments with risk-reduction plans", which could be argued either way (a risk assessment in a person without disease could be read as primary prevention), with an unambiguous secondary item: "fasting blood glucose screening for employees with a family history of diabetes". Rewrote its option rationale. The overall rationale still covers the course's classification of risk assessment as secondary. Key unchanged [0,1,3].
- **m46-pro-004**: clientNeed changed from Safety & Infection Control to Physiological Integrity: Physiological Adaptation (recognizing a possible hypertensive emergency).
- **m46-pro-013**: option 0 rationale said the cue shows the client "cannot read labels", which overstates it. Changed to "may be unable to read or understand medication labels" (a cue, not proof). This now matches the item's own rationale.
- **m46-pro-018**: stem said "Which action by a nurse", but two options are done by a case manager and an insurer's reviewer. Reworded to "A nurse reviews several activities planned for clients… Which activity is the best example of patient-focused care?"
- **m46-pro-038**: clientNeed changed from Safety & Infection Control to Management of Care (unit-design/teamwork management decision).
- **m46-pro-040 (SATA, delegating a sterile dressing)**: by national NCLEX standards, sterile dressing changes are generally not delegated to UAP, so the item could be read two ways. The stem now says the state permits an advanced aide level (e.g., the NC Nurse Aide II) to do this task. The key [0,1,2] is now defensible both nationally (five rights) and under NC rules.
- **m46-pro-042 (rationing)**: the keyed option, "clinic puts new *uninsured* clients on a 4-month waiting list", mixed in discrimination by payer and did not show scarcity. Replaced with "Because the region has one pediatric psychiatrist, new referrals wait 4 months to be seen" (clear implicit rationing caused by scarcity). Rewrote its rationale. Key unchanged (3).

Verified as correct and left unchanged: all other keys, option rationales, and SATA sets. These include the EMTALA, Medicare (ESRD, 24-month SSDI), CHIP, HMO/PPO, IOM access steps, delegation/LPN assignment, ICU-bed allocation, and NC DSS child-report items. No length-cue warning came from the validator, and answer positions are balanced (8/8/7/8).

## Lesson changes (content/guides-m46-pro.js)
- **prevention-settings › Classifying the tricky interventions**: the opening sentence listed "screening is always secondary" among misleading single-word reflexes, which contradicted itself. Rewrote it: teaching can be any level, and screening/self-exam really is always secondary.
- **prevention-settings › Care settings ≠ prevention levels**: "diabetes management (tertiary)" contradicted the earlier section, which teaches that controlling early chronic disease (e.g., new hypertension) is secondary. Changed the example to "referral to a dietitian to manage complications of long-standing diabetes (tertiary)", which matches Table 46.1.
- **care-models-access › Perceptions of need… medical home**: the text said "Its six principles:" but the list that follows has 7 bullets (6 PCMH principles plus the AHRQ 5 features). Clarified the lead-in so students don't mix the two lists.
- **delivery-models-resources › Course source & clinical clarification**: added clarification (5). The course says the team leader "delegates" to RNs/LPNs. Under the NCSBN/ANA National Guidelines, giving work within a person's scope to an RN or LPN is technically *assignment*, while *delegation* is a task beyond the person's usual role. Either way, the RN keeps accountability. This matches the existing Delegation-vs-Assignment trap table.

Checked as accurate (no change needed): ACE prevalence clarification (64% / 1 in 6 with ≥4), health literacy 53%/36%, 2060 demographics, obesity 2030, $10,739 = 2017 CMS figure (already clarified), ACA mandate penalty $0 clarification, Medicare vs Medicaid long-term care, EMTALA wording, NLC, NA I/NA II registries, G.S. 7B-301, 108A-102, 90-21.5, NCBON Just Culture. Only verified NC facts are used. All self-check answers agree with the questions.

Validator: `node validate.mjs 46` → OK.

---

## qa-new-m47

### QA review — Module 47 (Health Policy)

Reviewer: independent NCLEX-RN item review. Scope: 52 questions, 39 flashcards, 3 lesson topics (36 sections), checked against the instructor study guide text and the verified North Carolina facts.

## Summary
- Items reviewed: 52 questions (all keys, option rationales, and rationales checked), 39 flashcards, 3 guide topics.
- Keys changed: 0 (all keys judged to be the single best answer / the exact SATA set).
- Critical fix: m47-pro-045 stem was missing the BP that its key, rationale, and hint depended on.
- Recall → application rewrites: 002, 020 (full rewrites); 003, 014, 025, 028 (stems recast as scenarios).
- Fact precision: 008, 022, 048, 051, 052; 2 flashcards.
- Lessons: 5 missing table captions fixed; 1 scope inaccuracy fixed; 2 thin sections expanded (with new tables/self-checks); NC note de-risked; clarifications added.
- Items verified with no change needed: all others (001, 004–007, 009–013, 015–019, 021, 023–024, 026–027, 029–044, 046–047, 049–050).

## Change log
- m47-pro-002 (weak recall → application): rewrote from a definition-recall item ("which statement about practice act vs board rules is accurate") into a scenario in which a coworker claims board delegation rules are "only a guideline"; key unchanged in concept (rules carry force of law), difficulty 1→2, rationales rewritten to match.
- m47-pro-003 (application): reframed the classroom "identify examples" stem as an orientation scenario and made the sorting criterion explicit ("carries the force of law") so the Joint Commission option cannot be argued as "public."
- m47-pro-008 (rationale accuracy): option 4 rationale said organizational policy "cannot be less restrictive" (a policy can be written that way); corrected to "cannot authorize what a regulation prohibits."
- m47-pro-014 (application): replaced the "student is reviewing" recall stem with a news-summary scenario; options/key unchanged.
- m47-pro-020 (weak recall → application): rewrote "student preparing a presentation on functions" into a community-referral scenario (nursing home complaint, lab licensure, birth certificate, measles follow-up vs. Medicare payment and accreditation); key remains 4 of 6; rationales rewritten.
- m47-pro-022 (fact precision): rationale said accreditation is "usually" required for Medicare/Medicaid participation; clarified deemed status vs. the state-survey alternative (matches lesson clarification).
- m47-pro-025 (application): added a scenario (ADN student planning RN-to-BSN) to the recall stem; key unchanged.
- m47-pro-028 (application): recast list-recall stem as a disaster-volunteer scenario; difficulty 1→2; key unchanged.
- m47-pro-045 (stem/key consistency — critical): stem omitted the blood pressure that the key, option rationale, rationale ("the vital signs show 176/102"), and hint ("look at the exhibit") relied on, so the "assess first" key was unsupported. Added "His blood pressure today is 176/102 mm Hg" to the stem; fixed rationale and hint wording.
- m47-pro-048 (fact precision): added that ESRD Medicare depends on work history and a short waiting period after dialysis starts, so "regardless of age" is not overstated.
- m47-pro-051 (clinical accuracy): option 3 rationale labeled 152/100 + headache as definite "preeclampsia with severe features"; proteinuria/labs not given, so reworded to "possible preeclampsia (headache can be a severe feature)."
- m47-pro-052 (fact precision): clarified that ALS Medicare begins when SSDI starts (no 24-month wait), distinguishing it from the 24-month disability rule tested in option 2.
- Flashcards: "Rank private plans" — added note that CDHP placement reflects cost design, not a distinct network type; "Who under 65 qualifies" — added the 24-month SSDI rule and ALS exception.
- Guide policy-process §1 example (scope accuracy): oxygen example said the RN "adjusts the oxygen personally"; clarified that titration must stay within the prescriber’s order, that judgment-based titration is not delegated, and that task list + competency + RN judgment are all required.
- Guide policy-process §7 "Common traps & look-alikes" (format): table had no caption (rendered "undefined"); added caption "Law, regulation, and policy look-alikes".
- Guide agencies-accreditation §2 "International health agencies" (format): table had no caption (rendered "undefined"); added caption "Three types of international health organizations".
- Guide agencies-accreditation §5 "Accreditation of nursing education programs" (format): table had no caption (rendered "undefined"); added caption "Nursing program approval and national accreditors".
- Guide agencies-accreditation §7 "Common traps & look-alikes" (format): table had no caption (rendered "undefined"); added caption "Agency, accreditation, and association look-alikes".
- Guide healthcare-financing §7 "Common traps & look-alikes" (format): table had no caption (rendered "undefined"); added caption "Financing look-alikes".
- Guide agencies-accreditation §2 "International health agencies" (thin section): added a step-by-step sorting method, why the category matters, and a section self-check.
- Guide healthcare-financing §1 (clarity): explained that CDHP is ranked by cost design and its network varies (consistent with the table row "Varies"), so students do not over-learn the spectrum position.
- Guide healthcare-financing §3 "How private coverage is obtained" (thin section: no table/check): added coverage-change teaching (COBRA, special enrollment period, Medicaid), a 5-step discharge coverage screen, a "Ways people obtain coverage" table, and a self-check.
- Guide healthcare-financing §10 NC note (NC accuracy/clarity): removed the unverified "CHIP-type coverage" claim and tied the DSS referral to the course statement; rewrote the confusing "connected to the same office for other protective services" sentence.

## Validator
```
m47: 3 topics, 52 questions, 39 cards; mcq answer positions {"0":9,"1":9,"2":9,"3":10}
OK
```

---

## qa-new-m49

### QA — Module 49 (Legal Issues), independent review

Files: content/m49-pro.js, content/guides-m49-pro.js
Reviewed: 47 questions (all keys, option rationales, and stems), 32 flashcards, and 3 guide topics (every section, table, check, pearl, recap, NC note, and course-clarification section). I compared everything against the Module 49 study guide and the verified NC facts.
Validator: `node validate.mjs 49` printed OK (MCQ answer positions 8/9/8/9, no warnings).

## Overall
- No keys were wrong. Every MCQ key is the single best answer, and every SATA key is the exact correct set by NCLEX-RN standards.
- Flashcards: accurate. No changes.
- Before this review, the questions contained no NC statute content. NC content in the lessons is limited to the verified facts.

## Question changes
### Ambiguity (an item could be argued two ways)
- m49-pro-003: option A reworded to state both missing elements (no order AND no less-restrictive trial) so it cannot be argued as an emergency restraint applied per policy.
- m49-pro-027: stem changed from “demonstrate a systems approach” to “help prevent medication-related malpractice” — reviewing drug knowledge (keyed correct) is an individual safeguard, not a systems one, so the old stem could be argued two ways; rationale aligned.
### Recall items rewritten as application items
- m49-pro-024: rewritten from a recall “which statement shows understanding” item into an application scenario (student pressured to hang a first-ever transfusion without the instructor); options, rationales, hints, takeaway updated; cjmm → Take Action, focus → Delegation & Safety, difficulty 1→2.
- m49-pro-035: rewritten from a definition-recall item into an application item (which bedside situation lets the nurse proceed on implied consent); distractors now test invasive procedure, sleeping client, and nonverbal refusal; difficulty 1→2.
- m49-pro-044: stem converted from schedule recall to a discharge-teaching application (which prescription cannot be refilled); focus → Client Teaching. Key (oxycodone, Schedule II) unchanged and verified; lorazepam IV, APAP-codeine III, pregabalin V verified.
### Inaccurate option rationale
- m49-pro-045: option B rationale corrected — it asserted the client “has been declared legally incompetent,” which the nurse has not yet verified (the point of the item).
### NC enrichment (correct by national standards too)
- m49-pro-037, m49-pro-047: added one-sentence verified NC note to rationale (county DSS receives child and disabled-adult reports); keys already correct nationally.

## Lesson changes
### Factual corrections and clarifications
- Guide malpractice-standard-care › “Course source & clinical clarification”: noted the added Just Culture and escalation content as standard practice beyond the course text.
- Guide consent-laws-lifespan › “Good Samaritan laws and whistleblowing”: corrected the implication that the Whistleblower Protection Act of 1989 covers all nurses — it covers federal employees; private-sector nurses rely on OSHA-administered provisions and state law.
- Guide consent-laws-lifespan › “Course source & clinical clarification”: added WPA-1989 scope correction, marijuana rescheduling status wording, and note on added vulnerable-adult content.
### Teaching gaps filled (tested in questions but not taught in the lesson body)
- Guide law-torts-privacy › “HIPAA in daily practice”: added a paragraph on the three parallel consequences of a breach (civil suit, HIPAA civil/criminal penalties, Board discipline) and how to handle a coworker’s breach — previously untaught but tested in m49-pro-005 and -011.
- Guide law-torts-privacy › “North Carolina practice note”: clarified NC universal child-maltreatment reporting (any person; knowing failure is a crime) and added disabled-adult reporting to county DSS, both as confidentiality exceptions (verified facts only).
- Guide malpractice-standard-care › “Box 49.1”: added bullets teaching escalation through the chain of command when the provider is unreachable and the hold–clarify–escalate rule for unsafe orders (tested in m49-pro-021/-029, previously only implied).
- Guide malpractice-standard-care › “Preventing negligence”: added a step-by-step Just Culture paragraph (human error → console, at-risk → coach, reckless → discipline, outcome does not decide category). Previously only in the NC note, yet m49-pro-030 tests it as national content.
- Guide consent-laws-lifespan › “Across the lifespan”: added an older/vulnerable-adult abuse and neglect paragraph (cues, report to adult protective services, no proof needed, then immediate care) — tested in m49-pro-047 but previously only in the NC note.
- Guide malpractice-standard-care › checks: added a Just Culture classification self-check with answer.
- Guide consent-laws-lifespan › checks: added a vulnerable-adult neglect self-check with answer.

## Verified with no change needed (notable items)
- The lessons already correct these course errors:
  - The Fourth Amendment is not the main legal basis for healthcare privacy.
  - The agency is the DEA (Drug Enforcement **Administration**).
  - Not all Schedule V drugs are "no Rx". Ezogabine was discontinued, so pregabalin is used as the example.
  - The course's 1–2-year statute of limitations is replaced, for NC, by 3 years with a 4-year statute of repose.
- The six-element malpractice model is kept to match the course, with a note on the four-element model.
- Facts checked and found correct:
  - Occurrence vs. claims-made insurance, including the m49-pro-023 timeline.
  - Res ipsa loquitur and respondeat superior.
  - The Jehovah's Witness emergency-doctrine exception.
  - Capacity vs. competency.
  - Minor consent: STI care, contraception, and the mature-minor case (Marvin).
  - Controlled-substance waste and diversion cues.
  - Good Samaritan conditions.
  - Child-abuse reporting without proof.
- NC notes were checked against the verified fact list. Accurate items:
  - NCBON and the NPA citation, 21 NCAC 36 .0224/.0225.
  - NA I/NA II registries.
  - Nurse Licensure Compact.
  - Just Culture Complaint Evaluation Tool.
  - G.S. 7B-301, 108A-102, 90-21.5, 90-21.14, and 1-15(c).
  - Contributory negligence.
  - Health Care Power of Attorney, living will (G.S. 90-321), and MOST.

---

## qa-new-m50

### QA review — Module 50 (Quality Improvement), independent reviewer

Scope: all 45 questions, 31 flashcards, and 3 lessons in content/m50-pro.js and content/guides-m50-pro.js, checked against Module_50_Quality_Improvement_Study_Guide.txt, NCLEX-RN standards, and the verified NC facts.

## Summary
- Keys: all 45 keys and SATA sets confirmed correct. No key changes were needed.
- Option rationales: all agree with their keys. One was refined (009).
- Recall items rewritten into scenarios: 011, 018, 041.
- Length cues removed: 004, 011, 018, 022, 024, 041.
- Currency/accuracy fixes: the sentinel event definition (030 rationale, flashcard, guide), the To Err Is Human range (flashcard), the utilization-review "misuse" definition (guide), the heparin rate error in the worked case (guide), and an NPSG→National Performance Goals note (guide).
- Lessons expanded (nothing shortened): method paragraphs and steps for NQS priorities, quality programs, sentinel event classification, RCA2, and Just Culture; three new self-checks.
- NC facts: used only as verified. The existing NC notes were checked and are accurate. One national-consistent NC mention was added (009: county DSS director).

## Change log
- m50-pro-004 (cue): correct option shortened and a distractor lengthened to remove the length cue; content unchanged.
- m50-pro-009 (accuracy/NC): option 0 rationale now names the designated agency (adult protective services; in NC the county DSS director, G.S. 108A-102) and states reporting is based on suspicion.
- m50-pro-011 (recall→application): rewrote the “needs further teaching” definition item into a staff-meeting scenario in which the nurse must choose the response that corrects an incomplete view of quality; new options/rationales; difficulty 1→2.
- m50-pro-018 (recall→application, cue): added a quality-council scenario to the stem, balanced option lengths (correct option was longest); difficulty 1→2.
- m50-pro-022 (cue): lengthened two distractors so the correct process indicator is no longer the longest option.
- m50-pro-024 (cue): expanded short option labels so the correct option is not the longest; key unchanged.
- m50-pro-030 (currency): rationale updated to the current Joint Commission sentinel event definition (reaches the client; death, permanent harm, or severe temporary harm) instead of the older “or the risk thereof” wording.
- m50-pro-041 (recall→application, cue): reframed as a committee-agenda scenario, replaced the “FMEA” label in the key with a description of the activity so the student must recognize proactive timing, and balanced option lengths; difficulty 1→2.
- Flashcard 22 (sentinel event): updated to the current Joint Commission definition.
- Flashcard 6 (To Err Is Human): now gives the report’s full 44,000–98,000 range, matching the guide clarification.
- Guide qi-foundations, Course source & clinical clarification: added note (6) that The Joint Commission is consolidating NPSGs into National Performance Goals (2026) while the tested bedside behaviors are unchanged.
- Guide qi-foundations, AHRQ National Quality Strategy section: added a three-step method for sorting projects into priorities and a new self-check (care coordination vs. patient safety).
- Guide qi-process-programs, Interprofessional assessment and utilization review: corrected the definition/example of misuse (appropriate service delivered incorrectly with a preventable complication; an unnecessary expensive scan is overuse), corrected the example label from “misuse of bed-days” to overuse, and added a classification self-check.
- Guide qi-process-programs, Quality assurance and the quality management programs: added a step-by-step method for identifying the program in a stem and a new self-check (Lean vs. QA).
- Guide patient-safety-culture, Sentinel events section and key term: led with the current Joint Commission definition (reaches the client; death, permanent harm, or severe temporary harm), labeled the source’s “or the risk thereof” as older wording, clarified that near misses are not sentinel events, and added a three-question classification method.
- Guide patient-safety-culture, Worked case: corrected the heparin programming error. The original “25 mL/hr instead of 2.5 mL/hr” used a realistic therapeutic rate as the error; changed to 200 mL/hr instead of the ordered 20 mL/hr (10-fold overdose) with the concentration stated.
- Guide patient-safety-culture, Blame-free environment vs. Just Culture: added a six-step classification procedure (behavior vs. outcome, intent, risk recognition, conscious disregard, substitution test, matched response).
- Guide patient-safety-culture, RCA2 section: added a seven-step walkthrough of how an RCA2 proceeds (from securing the client through owners, deadlines, pilot tests, and measures).

## Items reviewed with no change needed (key verified)
001–003, 005–008, 010, 012–017, 019–021, 023, 025–029, 031–040, 042–045.

## Validator
```
m50: 3 topics, 45 questions, 31 cards; mcq answer positions {"0":8,"1":8,"2":8,"3":8}
OK
```

---

## qa-unit6-guides

### QA log: Unit 6 study guides (Modules 7, 23, 29, 38, 41)

Scope: 18 lessons read in full (all fields: summary, objectives, bigPicture, keyTerms, every section incl. tables/examples/steps/checks, pearls, redFlags, recap, self-checks).
- m23: cognition-assessment, cognition-alterations, delirium
- m29: self-development, self-alterations, self-nursing-care
- m38: therapeutic-communication, communication-adaptations, documentation, reporting
- m41: learning-theories, teaching-plan, lifespan-digital-learning
- m7: wellness-context, promotion-change, fitness-exercise, oral-health, sleep-rest

Result: no factual errors, wrong self-check answers, wrong table cells, or internal contradictions found. Items checked included CAM criteria, Erikson stages, SCOFF threshold (>=2), DBT skills, SBAR, telephone-order read-back, HIPAA minimum-necessary treatment exception, focus/PIE charting, Bloom domains, teach-back, prevention levels, stages of change, PA guidelines (children 60 min/day; adults 150-300 moderate or 75-150 vigorous + strength 2 days; pregnancy 150 min), talk test, isotonic/isometric/isokinetic, AAPD fluoride and dental-home guidance, NREM N1-N3 staging, melatonin/GABA, and adult sleep ranges. All were correct, and the lessons already flag outdated slide content (water-only brushing, N4, GABA).

## Clarifying additions (5; nothing was removed)
1. guides-m23-unit6.js / cognition-alterations / "Compare the time course before choosing a label", comparison table.
   Problem: the table had no level-of-consciousness row. That is a classic NCLEX discriminator.
   Change: added the row "Level of consciousness | Often altered or fluctuating (drowsy to hyperalert) | Usually clear until late stages | Usually clear".
2. guides-m23-unit6.js / delirium / "Medication requires a specific purpose".
   Problem: the section did not mention benzodiazepines or anticholinergics. These are the drugs most often tested as causes or worsening factors of delirium (Beers criteria).
   Change: added one sentence saying benzodiazepines and strongly anticholinergic drugs (for example diphenhydramine) can cause or worsen delirium, especially in older adults, and that benzodiazepines are generally reserved for indications such as alcohol or benzodiazepine withdrawal.
3. guides-m29-unit6.js / self-alterations / "Medical findings matter".
   Problem: the section named "electrolyte abnormalities" without the specific high-yield complications.
   Change: added that purging can cause hypokalemia and dysrhythmias, that restriction can cause bradycardia, hypotension, and orthostatic changes, and that refeeding syndrome (falling phosphate, potassium, and magnesium) needs monitoring.
4. guides-m7-unit6.js / fitness-exercise / "Muscle contraction terms at the bedside".
   Problem: isometric exercise was presented without the tested point that isometric/Valsalva effort raises BP.
   Change: added a sentence on BP rise with breath-holding: clients should keep breathing, with caution in cardiovascular disease according to the plan.
5. guides-m7-unit6.js / oral-health / "Safe care for dependent clients".
   Problem: the positioning guidance was too vague for the standard unconscious-client oral care question.
   Change: added "commonly side-lying with the head turned so fluid drains out of the mouth rather than toward the airway".

Files untouched: guides-m38-unit6.js and guides-m41-unit6.js (no errors found).
Parse check: m23, m29, and m7 each print "ok <moduleId>".

---

## qa-unit6-questions

### QA log: Unit 6 questions and flashcards (Modules 7, 23, 29, 38, 41)

Scope: 90 questions (m7: 25, m23: 15, m29: 15, m38: 20, m41: 15; all MCQ/SATA) and 126 flashcards (m7: 35, m23: 21, m29: 21, m38: 28, m41: 21).

Automated checks (all files): answer indices in range; MCQ answers scalar, SATA arrays; optionRationales count equals options; every rationale prefix (Correct/Incorrect) matches the key; no duplicate ids. No problems found.

Manual clinical review: every stem, option, option rationale, rationale, takeaway, and flashcard read in full.

## Changes

### m7-unit6.js — flashcard (topic sleep-rest) "How many NREM stages are currently used?"
- Problem: Back said "older N3/N4 deep-sleep categories are combined in N3." That is wrong. The older Rechtschaffen & Kales system called them stages 3 and 4. "N" labels come from the AASM system, which never had an N4.
- Fix: Changed it to "the older stage 3 and stage 4 deep-sleep categories are combined into N3."
- Parse check: ok m7.

## Items reviewed and left unchanged (worth noting)
- m29-u6-004 (generativity in an older adult): Erikson places integrity vs despair in later life. But mentoring younger people is the textbook example of generativity, and the integrity distractor is worded "alone because age excludes earlier themes." Only one answer can be defended, so no change.
- m7-u6-003: Distractors 1 and 5 both test family history. That repeats a concept but is not a correctness error, so it was left as is.
- m7-u6-017: Fluoride guidance is current (AAPD: rice-grain smear under age 3, pea-size for ages 3-6, dental home by age 1).
- m7-u6-014 / flashcard: Talk test for moderate vs vigorous intensity matches CDC guidance.
- m23 CAM flashcard and m23-u6-012: CAM algorithm stated correctly.
- m29-u6-007: SCOFF threshold of 2 or more is correct.
- m7-u6-024: Oversedation and respiratory depression after a sleep medication is correctly prioritized.
- m38-u6-009: Sudden aphasia with arm weakness correctly triggers urgent stroke/neuro escalation.
