# Rounds — NCLEX practice for concept-based nursing

Study guides, flashcards, and NCLEX/NGN-style questions for **Module 10 Inflammation, 15 Oxygenation, 16 Perfusion, and 21 Tissue Integrity** (incl. Exemplars 21.B Pressure Injuries and 21.C Wound Healing).

- **Learn** — 49 full lessons (~2,500 words each) written for students starting from zero: objectives, plain-language big picture, key terms, analogies, bedside examples, NCLEX tips, recap, and self-checks.
- **Practice** — filter by module, topic, nursing skill, clinical-judgment step (NCSBN CJMM), format and difficulty. Content & strategy hints, instant rationales.
- **Exam** — timed, no hints, flag & review, optional confidence rating. Report breaks performance down by question type, skill, topic and pace, and flags "right but shaky" answers (slow, unsure, or hinted).
- **535 questions** scoped to the course PowerPoints, in three formats: **priority**, **single best answer**, and **select all that apply** — plus **10 unfolding case studies** with tabbed client charts (Nurses' Notes, Vitals, Labs, Orders).
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
