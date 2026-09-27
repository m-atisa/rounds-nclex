import { describe, expect, it } from 'vitest';
import { CJMM_STEPS, FOCUS_AREAS, QUESTION_TYPES } from './types';
import { MODULES, QUESTIONS } from './index';

describe('content integrity', () => {
  it('loads all four modules', () => {
    expect(MODULES.map((m) => m.number)).toEqual([10, 15, 16, 21]);
  });

  it('keeps NGN case studies complete and ordered', () => {
    const cases = new Map<string, number[]>();
    QUESTIONS.filter((q) => q.caseId).forEach((q) => cases.set(q.caseId!, [...(cases.get(q.caseId!) ?? []), q.caseOrder ?? 0]));
    for (const [, orders] of cases) expect([...orders].sort((a, b) => a - b)).toEqual(orders.map((_, i) => i + 1));
  });

  it('has unique question ids', () => {
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
  });

  for (const q of QUESTIONS) {
    it(`${q.id} is well-formed`, () => {
      const m = MODULES.find((x) => x.id === q.moduleId)!;
      expect(QUESTION_TYPES).toContain(q.type);
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
