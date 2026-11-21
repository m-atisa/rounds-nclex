# Redesign — critique and plan (November 20, 2026)

Inputs:
- the user's three screenshots (Practice, Lesson, Question bank)
- a fresh capture of every screen, desktop and mobile (`shoot.js`)
- research on what makes interfaces look AI-generated ("vibe-coded"): the AI Slop Catalog (impeccable / wystack), UX Collective, MindStudio and Built In commentary, plus readability research on line length (45–75 characters) and whitespace (more space improves comprehension).

## 1. Critique

### Visual language ("vibe-coded" tells we exhibit)
| Tell | Where |
|---|---|
| Dark "glow mode" hero: gradient, grid texture, glowing dots, ECG line, italic serif flourish | Home, module and unit banners |
| Hero-metric layout: big counters of zeros (0 answered, 0 mastered, 0 streak) | Home, module banner, Progress |
| Monospace "tech theater": uppercase mono eyebrows on nearly every block | Everywhere |
| Iconitis: a rounded icon tile on every card | Home, Learn, action cards |
| Cardocalypse: cards inside cards; every choice is a bordered box | Practice, Exam, Learn |
| Rainbow accents: 21 module colors, colored dots, colored side borders, with no meaning attached | Sidebar, chips, cards, lesson accents |
| Sparkle "NEW" pills repeated on every chip, card and heading | Everywhere |
| Count pills on every filter chip | Practice, Exam |
| Lazy border accent: thick colored left border on key ideas and the big picture | Lesson |
| Spring and bounce motion, page blur transitions, cursor spotlight | Global |
| Generic copy ("Think like a nurse. Pass like one.", "Practice with a coach") and quote card | Home, Practice |

### Information architecture and function
1. **Navigation sprawl.** The sidebar has 7 destinations plus 21 module links plus 4 unit links. The Learn page duplicates them. Exam and Question bank compete with Practice.
2. **Lesson page.** Three navigation columns (app sidebar, module rail with 15 nested parts, content) squeeze the text. The key-terms grid leaves empty gray cells. Five box styles compete (key points, key idea, example, analogy, check). Parts run together, and there is no clear "where am I / what's next". The user called it "too compact" and "confusing".
3. **Practice builder.** Six filter groups and about 60 controls are shown at once. The single decision "what do I practice?" is buried. Counts and NEW pills add noise.
4. **Question bank.** Each row repeats a long colored reference pill, a format pill, a CJMM pill and difficulty bars before the stem. The stem, which is what matters, comes last.
5. **Home.** It's 4,000px tall: hero, four action tiles, three unit banners, and a full grid of every module repeated from Learn. No single obvious next step.
6. **Module page.** A dark banner takes half the screen for three buttons and two stats.
7. **Feedback and session.** These are fine functionally, but share the badge clutter.

### Content
- Lessons are plain-language now, but they are not visibly tied to the course source, so a student can't see which slide or page a part comes from.
- Some parts paraphrase loosely where the source wording was already clear.

## 2. Plan of attack

**A. Design system.** One palette, one type pairing, enforced through tokens.
- Warm paper background, white surfaces, warm ink.
- One brand color: deep pine `#0E5A50` for actions, links and focus.
- Semantic colors only for correct (green), incorrect (red) and caution (amber).
- No per-module colors, no gradients, no glow.
- Type: **Public Sans** for interface and body (designed for clear public-service reading), **Source Serif 4** for headings, tabular numbers instead of a monospace font.
- An 8-pt spacing scale, three radii, two shadow levels, calm 150–200 ms fades only.

**B. Navigation.**
- Sidebar: Home · Learn · Practice · Flashcards · Progress.
- Exam is a mode inside Practice; Question bank is linked from Practice.
- No module list in the sidebar; Learn is the map.

**C. Home.** Greeting plus one primary next step (continue the lesson or session), a quick-practice action, then units as simple rows with progress. No hero, counters or quote.

**D. Learn, unit and module pages.**
- Lists, not card grids.
- A plain header with one primary action ("Start lesson 1" or "Continue") and secondary text actions.

**E. Lesson page.** Rebuilt for reading.
- A single 68-character column.
- A right-side "On this page" outline on wide screens.
- Module lessons move to a compact switcher.
- Generous spacing between parts, each part with its number, heading and a **key idea lead sentence** (no colored box).
- One quiet callout style.
- Key terms as a single-column glossary.
- A source line on every part.
- "Next lesson" and "Practice this lesson" at the end.

**F. Practice.**
- One decision first: what to practice (unit, module, topic) and how many.
- A Practice / Timed-exam switch.
- Everything else under "More options" (skill, clinical-judgment step, format, difficulty, which questions).
- No counts or NEW pills on chips.

**G. Question bank, Flashcards, Progress, Session.**
- Stem first, then metadata as one muted line.
- Dropdown filters.
- A Progress table grouped by unit.
- Fewer badges in sessions.

**H. Content tied to source.** Every lesson part gets a `source` citation (deck and slides, or study guide and pages). Each part is checked against that source:
- clear source wording is reused;
- the part is paraphrased only where that makes it simpler;
- anything taught beyond the course is labelled "Added for the NCLEX".

A validator enforces a source on every part. Independent reviewers spot-check that each citation matches.

**I. Verify.** Re-screenshot every page on desktop and mobile, compare against this critique, then run tests, deploy and check the live build.

## 3. What shipped

Verified with full desktop and mobile re-captures, in light and dark mode.

**Theme**
- Warm paper (#f7f5f1) with a single pine accent (#0e5a50 light, #72bcae dark).
- Public Sans for interface text, Source Serif 4 for headings.
- All 21 module colors, gradients, glow, monospace labels, sparkle pills, count pills, cursor spotlight, springy motion and stat counters removed.

**Navigation**
- 5 items: Home, Learn, Practice, Flashcards, Progress.
- A units list in place of 21 module links.
- Exam and Question bank live inside Practice.

**Pages**
- **Home:** one "next step" (resume, continue reading, or start here), three quick actions, and units as rows with progress.
- **Learn, unit and module pages:** lists instead of icon card grids, plain headers with one primary action.
- **Lesson:**
  - a 42rem reading column and a lesson switcher;
  - a right-hand "On this page" outline that tracks your place;
  - key points first;
  - each part opens with its key idea as a bold lead sentence and ends with a **Source** line;
  - one callout style;
  - a single-column glossary;
  - a clear end card with "Practice this lesson" and "Next lesson".
- **Practice:** "1. What do you want to practice?" and "2. How many?" (5/10/20/40), with everything else under "More options".
- **Question bank:** stem first, metadata as one muted line.

**Content**
- Every lesson part (1,415) cites its source.
- Hundreds of parts were corrected to match the course materials.
- Material beyond the course is labelled "Added for the NCLEX".
- The automated citation check found 0 invalid slide numbers.
- The 40 low-overlap parts were reviewed by hand: each is honestly marked as added detail on a slide that names the topic.

**Questions**
- Unchanged in this pass; they're already simple.
- Median stem is 35 words, 90% are under 50 words, and no answer option is over 30 words.

## 4. Second pass (November 20, 2026, evening)

Feedback: the lesson column still felt squished; unit names were inconsistent; units should be cards with new ones highlighted; key terms should be cards; the font should be easier to read; more questions should have all-plausible choices.

- **Font:** Atkinson Hyperlegible Next for all text (designed by the Braille Institute for low-vision legibility: distinct letter shapes, open forms). Source Serif 4 stays for headings.
- **Lesson width:** the reading column grew from 42rem to 60rem (about 960px), body text to 18px, with more space between parts. The outline rail stays on the right.
- **Unit names:** one "X & Y" pattern everywhere (sidebar, cards, headers): Ethics & Law, Leadership & Quality, Health & Communication, Physiology & Body Systems. The course's own unit and module numbers are kept in the small line above each name.
- **Cards:** Home shows units as cards (two columns); Learn and unit pages show modules as cards; module pages show lessons as numbered cards. New units and modules have a light green tint and a **New** label.
- **Key terms:** shown as vocabulary cards (term and plain definition), first 9 with "Show all".
- **Best-answer questions:** 3,179 single-answer items were reviewed in 112 batches. A writer agent either confirmed that all distractors were already plausible (1,135), rewrote throwaway distractors so each is partly right but less right than the key (1,707), or kept the item as it was where that would create two defensible answers (337). An independent reviewer agent then checked every item for one defensible best answer, clinical accuracy and simplicity, and fixed 285. Stems, keys and answer positions were not changed. When a student misses one of these items, the feedback says that every choice was partly right and points to the per-choice rationales.
