# UI/UX review — November 19, 2026

Method: a scripted Chrome session (puppeteer-core) captured every unique screen at 1440×900 and 390×844 (mobile). Screens covered: Home, Learn, unit page, module page, lesson (top, 25%, 50%, 80%), old-format lesson, Flashcards (front and back), Practice builder, practice question, answer feedback, Exam builder, exam session, Question bank, Progress, 404, and the ⌘K palette. Each screen was critiqued. Fixes were re-captured and checked visually.

## Findings → fixes

| # | Screen | Problem | Fix |
|---|---|---|---|
| 1 | Lesson | Walls of text. Paragraphs of 120+ words, run-on "(1)…(2)…(7)" lists, reading grade about 12, 25-minute pages. | Every lesson was rewritten to a plain-language standard (grade 5–8, average sentence 10–12 words, one-sentence **key idea** per part, bullets and steps instead of inline lists, 2,000–3,200 words). The renderer also splits any leftover inline lists. |
| 2 | Lesson | No "short version"; recap hidden at the bottom. | **Key points — the 2-minute version** now opens every lesson. |
| 3 | Lesson | Huge 3-line titles; italic serif lede hard to read; 95-character lines. | Shorter titles (≤ 60 characters), smaller headings, sans-serif lede, 43rem reading column, 1.0625rem/1.75 body text. |
| 4 | Lesson | 12-item "In this lesson" grid pushes content down; no sense of place while scrolling. | Desktop: the side rail lists the lesson's parts and highlights the current one as you scroll, with a "Practice this lesson" button. Mobile: a collapsible outline. Each section shows "Part N of M". |
| 5 | Lesson | Objectives, glossary and outline stacked as heavy boxes before any teaching. | Objectives collapse into "What you'll be able to do". Key terms are collapsible. Fewer competing colors. |
| 6 | Lesson | "How the NCLEX tests this" was used for both a section and the pearls box. | Pearls are now labelled **NCLEX tips**. |
| 7 | Global | Top bar was translucent, so scrolled text showed through it. | Top bar and mobile tab bar are opaque. |
| 8 | Mobile | Zoom control crowded the mobile top bar. | Zoom is hidden on phones (pinch-zoom remains). |
| 9 | Mobile session | "Review: …" button overflowed the feedback card. | Buttons wrap inside the card. |
| 10 | Session | Keyboard hint always said "1–6". | It shows the real option count. |
| 11 | Flashcards, Exam, Progress | 21 module chips or cards in one unordered block. | Grouped by unit with "Select all" (shared `ModuleChips` component). Progress is grouped by unit too. |
| 12 | Home (mobile) | 15,000px-tall page; full module cards repeated. | The curriculum shows as a compact 2-column grid on phones. |
| 13 | Home | No way back into the lesson you were reading. | **Continue reading** card for the last lesson opened. |
| 14 | Lesson | Reading time inflated (it counted JSON keys). | Counts visible words only (15 minutes instead of 25 for the same lesson). |

Nothing was added that changes how the site works. Navigation, routes and study modes are unchanged.
