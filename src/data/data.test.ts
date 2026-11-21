import { describe, expect, it } from 'vitest';
import { CJMM_STEPS, FOCUS_AREAS, formatOf } from './types';
import { MODULES, QUESTIONS, UNITS, UNIT_6, UNIT_6_MODULES, UNIT_BY_SLUG, unitModules } from './index';

describe('content integrity', () => {
  it('loads all modules', () => {
    expect(MODULES.map((m) => m.number)).toEqual([5, 6, 7, 10, 15, 16, 21, 23, 29, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47, 49, 50]);
  });

  it('assigns every module to exactly one unit', () => {
    const ids = UNITS.flatMap((u) => u.moduleIds);
    expect(new Set(ids).size).toBe(ids.length);
    expect([...ids].sort()).toEqual(MODULES.map((m) => m.id).sort());
  });

  it('has complete, NCLEX-style Professional Nursing Concepts modules', () => {
    expect(unitModules(UNIT_BY_SLUG.professional).map((m) => m.number)).toEqual([37, 39, 43, 45, 46, 47, 50]);
    expect(unitModules(UNIT_BY_SLUG['unit-7']).map((m) => m.number)).toEqual([42, 44, 49]);
    const pro = [...unitModules(UNIT_BY_SLUG.professional), ...unitModules(UNIT_BY_SLUG['unit-7'])];
    for (const m of pro) {
      expect(new Set(m.questions.map(formatOf)), m.id).toEqual(new Set(['priority', 'single', 'sata']));
      expect(new Set(m.questions.map((q) => q.cjmm)), m.id).toEqual(new Set(CJMM_STEPS));
      for (const t of m.topics) {
        const words = JSON.stringify(t).replace(/<[^>]+>/g, ' ').split(/\s+/).length;
        expect(words, `${m.id}/${t.id} words`).toBeGreaterThan(1800);
        expect(m.questions.filter((q) => q.topic === t.id).length, `${m.id}/${t.id} questions`).toBeGreaterThanOrEqual(12);
        expect(m.flashcards.filter((c) => c.topic === t.id).length, `${m.id}/${t.id} cards`).toBeGreaterThanOrEqual(8);
        const heads = t.sections?.map((s) => s.heading ?? '') ?? [];
        expect(heads, `${m.id}/${t.id}`).toContain('Course source & clinical clarification');
        expect(heads.some((h) => h.startsWith('How the NCLEX tests this')), `${m.id}/${t.id} NCLEX walkthrough`).toBe(true);
        expect(heads.some((h) => h.startsWith('Worked case')), `${m.id}/${t.id} worked case`).toBe(true);
      }
      for (const q of m.questions) {
        if (q.type !== 'mcq' && q.type !== 'sata') throw new Error(`Unsupported format: ${q.id}`);
        expect(q.optionRationales?.length, q.id).toBe(q.options.length);
        expect(q.ref, q.id).toMatch(new RegExp(`^Module ${m.number} · `));
      }
    }
  });

  it('keeps Unit 6 distinct from Module 6 and complete across all study modes', () => {
    expect(UNIT_6_MODULES.map((m) => m.number)).toEqual([7, 23, 29, 38, 41]);
    expect(UNIT_6.moduleIds).not.toContain('m6');
    expect(MODULES.find((m) => m.id === 'm6')?.title).toBe('Fluids & Electrolytes');
    expect(new Set(UNIT_6_MODULES.flatMap((m) => m.questions.map((q) => q.cjmm)))).toEqual(new Set(CJMM_STEPS));
    for (const m of UNIT_6_MODULES) {
      expect(new Set(m.topics.map((t) => t.id)).size).toBe(m.topics.length);
      expect(new Set(m.questions.map(formatOf))).toEqual(new Set(['priority', 'single', 'sata']));
      for (const t of m.topics) {
        expect(m.questions.filter((q) => q.topic === t.id).length, `${m.id}/${t.id} questions`).toBeGreaterThanOrEqual(5);
        expect(m.flashcards.filter((c) => c.topic === t.id).length, `${m.id}/${t.id} cards`).toBeGreaterThanOrEqual(4);
        expect(t.sections?.some((s) => s.heading === 'Course source & clinical clarification')).toBe(true);
      }
      for (const q of m.questions) {
        if (q.type !== 'mcq' && q.type !== 'sata') throw new Error(`Unsupported Unit 6 format: ${q.id}`);
        const answers = q.type === 'sata' ? q.answer : [q.answer];
        expect(new Set(answers).size).toBe(answers.length);
        answers.forEach((answer) => {
          expect(Number.isInteger(answer)).toBe(true);
          expect(answer).toBeGreaterThanOrEqual(0);
        });
        expect(q.optionRationales?.length).toBe(q.options.length);
        expect(q.ref).toMatch(/slides \d+/);
        expect(q.stem).not.toMatch(/source slide|guide clarification|the slide/i);
      }
    }
  });

  it('has full lessons for every topic', () => {
    for (const m of MODULES)
      for (const t of m.topics) {
        const words = JSON.stringify(t).replace(/<[^>]+>/g, ' ').split(/\s+/).length;
        expect(words, `${m.id}/${t.id}`).toBeGreaterThan(1200);
        expect(t.checks?.length ?? 0, `${m.id}/${t.id} checks`).toBeGreaterThanOrEqual(3);
      }
  });

  it('has tripled question banks (Nov 2026 baseline × 3)', () => {
    const baseline: Record<string, number> = {"m5":115,"m6":90,"m10":109,"m15":110,"m16":109,"m21":207,"m23":36,"m29":38,"m37":42,"m38":52,"m39":43,"m41":36,"m42":45,"m43":43,"m44":42,"m45":46,"m46":44,"m47":52,"m49":47,"m50":45,"m7":60};
    for (const m of MODULES) expect(m.questions.length, m.id).toBeGreaterThanOrEqual(3 * (baseline[m.id] ?? 0));
  });

  it('has mostly best-answer single-choice items (all options plausible, key most right)', () => {
    for (const m of MODULES) {
      const mcq = m.questions.filter((q) => q.type === 'mcq');
      const best = mcq.filter((q) => q.bestAnswer);
      expect(best.length / mcq.length, m.id).toBeGreaterThanOrEqual(0.7);
      for (const q of best) if (q.type === 'mcq') q.optionRationales?.forEach((r, i) => i !== q.answer && expect(r, q.id).toMatch(/^Incorrect\./));
    }
  });

  it('has plain-language lessons with a key idea for every section', () => {
    for (const m of MODULES)
      for (const t of m.topics) {
        expect(t.recap?.length ?? 0, `${m.id}/${t.id} key points`).toBeGreaterThanOrEqual(5);
        for (const s of t.sections ?? []) {
          if (/^Course source/.test(s.heading ?? '')) continue;
          expect(s.keyIdea, `${m.id}/${t.id} · ${s.heading}`).toBeTruthy();
          expect(s.source?.length ?? 0, `${m.id}/${t.id} · ${s.heading} source`).toBeGreaterThan(7);
          expect(s.body ?? '', `${m.id}/${t.id} · ${s.heading} inline list`).not.toMatch(/\(1\)[\s\S]*\(2\)[\s\S]*\(3\)/);
        }
        const heads = (t.sections ?? []).map((s) => s.heading ?? '');
        expect(heads.some((h) => h.startsWith('How the NCLEX tests this')), `${m.id}/${t.id} NCLEX walkthrough`).toBe(true);
        expect(heads.some((h) => h.startsWith('Worked case')), `${m.id}/${t.id} worked case`).toBe(true);
      }
  });

  it('covers every Unit 7 exemplar from the course decks', () => {
    const ex = (id: string) => MODULES.find((m) => m.id === id)!.topics.map((t) => t.exemplar ?? '').join(' ');
    for (const e of ['44.A', '44.B', '44.C']) expect(ex('m44')).toContain(e);
    for (const e of ['49.A', '49.B', '49.C', '49.D']) expect(ex('m49')).toContain(e);
    expect(ex('m42')).toContain('42.A');
  });

  it('has unique question ids', () => {
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
  });

  for (const q of QUESTIONS) {
    it(`${q.id} is well-formed`, () => {
      const m = MODULES.find((x) => x.id === q.moduleId)!;
      expect(['mcq', 'sata']).toContain(q.type);
      if (q.type === 'mcq') expect(typeof q.priority).toBe('boolean');
      expect(q.caseId).toBeUndefined();
      expect(Array.isArray(q.alsoTests)).toBe(true);
      for (const t of q.alsoTests ?? []) {
        expect(m.topics.map((x) => x.id)).toContain(t);
        expect(t).not.toBe(q.topic);
      }
      if (q.type === 'sata') {
        expect(q.options.length).toBeGreaterThanOrEqual(5);
        expect(q.options.length).toBeLessThanOrEqual(6);
      }
      expect(m.topics.map((t) => t.id)).toContain(q.topic);
      expect(CJMM_STEPS).toContain(q.cjmm);
      expect(FOCUS_AREAS).toContain(q.focus);
      expect(q.ref).toMatch(/^Module \d+/);
      expect(q.hintContent?.length).toBeGreaterThan(10);
      expect(q.hintStrategy?.length).toBeGreaterThan(10);
      expect(q.rationale.length).toBeGreaterThan(20);
      if (q.type === 'mcq') {
        expect(q.options.length).toBeGreaterThanOrEqual(4);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
      }
      if (q.type === 'sata') {
        expect(q.answer.length).toBeGreaterThanOrEqual(1);
        expect(q.answer.length).toBeLessThan(q.options.length);
        q.answer.forEach((a) => expect(a).toBeLessThan(q.options.length));
      }
      if (q.type === 'order') expect(q.options.length).toBeGreaterThanOrEqual(3);
      if (q.type === 'matrix') {
        expect(q.answer.length).toBe(q.rows.length);
        q.answer.forEach((a) => expect(a).toBeLessThan(q.columns.length));
      }
      if (q.type === 'dropdown') {
        const slots = [...q.template.matchAll(/\{(\d+)\}/g)].map((x) => Number(x[1]));
        expect(slots.length).toBe(q.blanks.length);
        q.blanks.forEach((b) => expect(b.answer).toBeLessThan(b.options.length));
      }
      if (q.type === 'highlight') {
        const segs = (q.passage.match(/\{\{[\s\S]*?\}\}/g) ?? []).length;
        expect(segs).toBeGreaterThanOrEqual(3);
        expect(q.answer.length).toBeGreaterThanOrEqual(1);
        q.answer.forEach((a) => expect(a).toBeLessThan(segs));
      }
      if (q.type === 'bowtie') {
        expect(q.condition.answer).toBeLessThan(q.condition.options.length);
        expect(q.actions.answer.length).toBe(2);
        expect(q.parameters.answer.length).toBe(2);
        q.actions.answer.forEach((a) => expect(a).toBeLessThan(q.actions.options.length));
        q.parameters.answer.forEach((a) => expect(a).toBeLessThan(q.parameters.options.length));
      }
      if (q.exhibit) expect(q.exhibit.tabs.length).toBeGreaterThan(0);
    });
  }
});
