# Rounds — NCLEX practice for concept-based nursing

Study guides, flashcards, and NCLEX/NGN-style questions for **Module 5 Elimination** (incl. exemplars Bladder Incontinence & Retention; Bowel Incontinence, Constipation & Impaction), **6 Fluids & Electrolytes**, **10 Inflammation**, **15 Oxygenation**, **16 Perfusion**, and **21 Tissue Integrity** (incl. Exemplars 21.B Pressure Injuries and 21.C Wound Healing), plus **Unit 6: Modules 7 Health/Wellness, 23 Cognition, 29 Self, 38 Communication, and 41 Teaching/Learning**.

- **Learn** — 87 full lessons written for students starting from zero: objectives, plain-language big picture, key terms, comparisons, bedside examples, NCLEX tips, recap, and self-checks.
- **Practice** — filter by module, topic, nursing skill, clinical-judgment step (NCSBN CJMM), format and difficulty. Content & strategy hints, instant rationales.
- **Exam** — timed, no hints, flag & review, optional confidence rating. Report breaks performance down by question type, skill, topic and pace, and flags "right but shaky" answers (slow, unsure, or hinted).
- **830 questions** scoped to the course PowerPoints, in three formats (**priority**, **single best answer**, **select all that apply**). Integrated items connect topics from the same module, tagged "Also tests".
- **Questions** — searchable bank (⌘K search anywhere); every item shows its reference, e.g. `Module 21 · Tissue Integrity · Wound Classification`.
- Zoom control and light/dark theme. Progress is stored locally in the browser.

## Stack
Vite + React 19 + TypeScript, Motion (animations), dnd-kit (ordered-response drag & drop), Zustand (persisted state), React Router (hash routing for static hosting), Vitest. Deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Develop
```bash
npm install
npm run dev      # local dev server
npm test         # scoring + content-integrity tests (every question is validated)
npm run build
```

## Editing content
Question banks live in `content/*.js` (`window.NURSE_DATA.push({...})`, see the types in `src/data/types.ts`). `npm run content` converts them to JSON in `src/data/raw/`; the build does this automatically. `npm test` fails on malformed questions.

## Unit 6

Open `#/learn/unit-6` for the unit overview and combined practice, flashcard, and exam links. Unit 6 is a course grouping; **Module 6 remains Fluids & Electrolytes**.

The new unit contains 18 lessons, 126 flashcards, and 90 original questions (29 priority, 33 single best answer, 28 SATA). Every topic has five questions and seven flashcards. Items include option rationales, content/strategy hints, clinical-judgment tags, integrated-topic tags, and source-slide references. All six CJMM steps are represented.

The seven supplied decks and coverage/clinical clarifications are recorded in [the Unit 6 source map](docs/unit-6-sources.md). Original course decks remain in the sibling `source/unit-6/` folder and are excluded from publication. Edit the authored `*-unit6.js` packs, regenerate content, then run tests and build.
