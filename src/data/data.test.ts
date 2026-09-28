import { describe, expect, it } from 'vitest';
import { CJMM_STEPS, FOCUS_AREAS } from './types';
import { MODULES, QUESTIONS } from './index';

describe('content integrity', () => {
  it('loads all four modules', () => {
    expect(MODULES.map((m) => m.number)).toEqual([10, 15, 16, 21]);
  });

  it('has full lessons for every topic', () => {
    for (const m of MODULES)
      for (const t of m.topics) {
        const words = JSON.stringify(t).replace(/<[^>]+>/g, ' ').split(/\s+/).length;
        expect(words, `${m.id}/${t.id}`).toBeGreaterThan(1200);
        expect(t.checks?.length ?? 0, `${m.id}/${t.id} checks`).toBeGreaterThanOrEqual(3);
      }
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
