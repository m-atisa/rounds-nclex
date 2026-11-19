# Rounds — NCLEX-RN practice for concept-based nursing

Rounds is a static study site (study guides, flashcards, practice, and timed exams) for a concept-based nursing curriculum. It is written for a North Carolina RN student preparing for the NCLEX-RN. Its main focus is applying knowledge to questions, beyond recall.

**Live site:** https://m-atisa.github.io/rounds-nclex/

## What's on the site

The **21 modules** are grouped into three units. Grouping is defined in `UNITS` in `src/data/index.ts`.

| Unit | Modules | Route |
| --- | --- | --- |
| **Professional Nursing Concepts** *(new, highlighted)* | 37 Collaboration · 39 Managing Care · 42 Accountability · 43 Advocacy · 44 Ethics · 45 Evidence-Based Practice · 46 Healthcare Systems · 47 Health Policy · 49 Legal Issues · 50 Quality Improvement | `#/learn/professional` |
| **Unit 6** — Health, Wellness, Illness, Communication, Teaching & Learning | 7 · 23 · 29 · 38 · 41 | `#/learn/unit-6` |
| **Physiological Concepts** | 5 Elimination · 6 Fluids & Electrolytes · 10 Inflammation · 15 Oxygenation · 16 Perfusion · 21 Tissue Integrity | `#/learn/core` |

Module 6 is Fluids & Electrolytes. **Unit 6** is a separate course grouping.

- **Learn**: 117 full lessons. Each one has objectives, a plain-language big picture, key terms, comparison tables, bedside examples, NCLEX pearls and red flags, a recap, and self-checks. Every Professional Nursing lesson also includes *Common traps & look-alikes*, *How the NCLEX tests this* (a sample question reasoned step by step), a *Worked case*, and a *North Carolina practice note* where it applies.
- **Practice**: filter by unit, module, topic, nursing skill, NCSBN clinical-judgment step, format, and difficulty. Content and strategy hints are available, and every option has its own rationale.
- **Exam**: timed, with no hints, flag-and-review, and an optional confidence rating. The report breaks down performance and flags answers that were right but shaky.
- **Questions**: about 1,400 items in three formats (priority, single best answer, select all that apply). The searchable bank opens with ⌘K. Every item cites its source (for example `Module 49 · Legal Issues · … · pp. 2759–2763`).
- **Flashcards**: spaced re-queueing of missed cards.
- **New content highlight**: new modules carry a subtle orange **New** badge and tint on cards, sidebar, practice filters, and unit pages. The `isNew` flag on a unit controls this.
- Zoom control and light/dark theme. Progress is stored locally in the browser.

## Project layout

```
content/                 authored packs (window.NURSE_DATA.push({...}))
  mNN*.js                topics, flashcards, questions for a module
  guides-mNN*.js         full lessons (kind: "guide"), merged into topics by id
  *-unit6.js             Unit 6 packs
  *-pro.js               Professional Nursing Concepts packs
scripts/import-data.mjs  converts content/*.js → src/data/raw/*.json (runs on build)
src/data/index.ts        loads packs, module colours/icons, UNITS, NEW_MODULE_IDS
src/data/types.ts        Question / Topic / Flashcard types
src/data/data.test.ts    content-integrity tests (every question validated)
src/pages/               Home, Learn (units, modules, topics), Practice, Exam, Session, Results, Bank, Flashcards, Progress
src/components/          Layout (sidebar grouped by unit), UnitOverview, TopicArticle, question views
docs/                    source maps and clarifications (unit-6-sources.md, professional-sources.md)
```

Source decks and PDFs live in the sibling `../source/` folder. They are not published.

## Develop

```bash
npm install
npm run dev       # local dev server
npm run content   # regenerate src/data/raw from content/
npm test          # scoring + content-integrity tests
npm run build     # content → typecheck → production build in dist/
```

## Adding new material

1. Put the source file in `../source/`.
2. Write `content/mNN-<tag>.js` (topics, flashcards, questions) and `content/guides-mNN-<tag>.js` (lessons). Follow `src/data/types.ts` and use an existing pack as a model.
3. Register the module's colour and icon in `META` and add it to a unit in `UNITS` (`src/data/index.ts`). Set `isNew: true` on the unit to highlight it, and remove the flag when it is no longer new.
4. Add tests to `src/data/data.test.ts` if the unit has its own rules.
5. Run `npm run content && npm test && npm run build`.

### Content standards

- **Questions** use only `mcq` (4 options, `priority: true` for "first/priority" stems) and `sata` (5–6 options). Each needs:
  - option rationales starting "Correct." or "Incorrect."
  - a teaching rationale and a takeaway
  - content and strategy hints
  - a CJMM step, focus, difficulty, client-need category, and `ref`
  - `alsoTests` (an array, which may be empty)
- Stems are clinical scenarios at application/analysis level: best response, first action, delegation, "needs further teaching", and look-alike concepts.
- Correct-answer positions are balanced, and the correct answer must not be the longest option by habit.
- **Professional Nursing** topics need at least 12 questions, 8 flashcards, and 2,200 words. They must include the sections *How the NCLEX tests this…*, *Worked case…*, and *Course source & clinical clarification*. `npm test` enforces this.
- North Carolina specifics (NCBON, Nurse Aide I/II, G.S. 7B-301, 108A-102, 90-21.5, 90-21.14, MOST) appear in lessons. They appear in questions only when the answer is also correct by national NCLEX standards.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`: `npm ci`, then content, test, and build. It publishes `dist/` to GitHub Pages. Hash routing (`#/…`) keeps deep links working on static hosting.

## Disclaimer

Rounds is an independent study aid. It does not replace your textbook, instructors, or facility policy, and it is not affiliated with NCSBN, NCBON, or Pearson.
