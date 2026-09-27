import { describe, expect, it } from 'vitest';
import type { Question } from '../data/types';
import { classify, emptyResponse, isAnswered, scoreResponse } from './scoring';

const base = {
  id: 't',
  topic: 't',
  ref: '',
  difficulty: 2 as const,
  clientNeed: '',
  cjmm: 'Take Action' as const,
  focus: 'Prioritization' as const,
  stem: '',
  rationale: '',
  moduleId: 'm10',
};

describe('scoreResponse', () => {
  it('scores SATA with +/- rule and floor of zero', () => {
    const q: Question = { ...base, type: 'sata', options: ['a', 'b', 'c', 'd', 'e'], answer: [0, 2, 4] };
    expect(scoreResponse(q, { type: 'sata', value: [0, 2, 4] })).toMatchObject({ score: 1, correct: true });
    expect(scoreResponse(q, { type: 'sata', value: [0, 2, 1] })).toMatchObject({ earned: 1, correct: false });
    expect(scoreResponse(q, { type: 'sata', value: [1, 3] })).toMatchObject({ score: 0, correct: false });
  });

  it('scores matrix per row', () => {
    const q: Question = { ...base, type: 'matrix', rows: ['a', 'b'], columns: ['x', 'y'], answer: [0, 1] };
    expect(scoreResponse(q, { type: 'matrix', value: [0, 0] })).toMatchObject({ score: 0.5, correct: false });
  });

  it('scores ordering all-or-nothing', () => {
    const q: Question = { ...base, type: 'order', options: ['a', 'b', 'c'] };
    expect(scoreResponse(q, { type: 'order', value: [0, 1, 2], touched: true }).correct).toBe(true);
    expect(scoreResponse(q, { type: 'order', value: [0, 2, 1], touched: true }).score).toBe(0);
  });

  it('never presents an ordering question pre-solved', () => {
    const q: Question = { ...base, type: 'order', options: ['a', 'b'] };
    for (let i = 0; i < 50; i++) {
      const r = emptyResponse(q);
      expect(r.type === 'order' && r.value.join()).not.toBe('0,1');
      expect(isAnswered(r)).toBe(false);
    }
  });
});

describe('classify', () => {
  const q: Question = { ...base, type: 'mcq', options: ['a', 'b', 'c', 'd'], answer: 0 };
  it('marks hinted, unsure or slow correct answers as fragile', () => {
    expect(classify({ q, answered: true, correct: true, ms: 20_000, hints: 0, confidence: 'sure' })).toBe('mastered');
    expect(classify({ q, answered: true, correct: true, ms: 20_000, hints: 1 })).toBe('fragile');
    expect(classify({ q, answered: true, correct: true, ms: 20_000, hints: 0, confidence: 'guess' })).toBe('fragile');
    expect(classify({ q, answered: true, correct: true, ms: 200_000, hints: 0 })).toBe('fragile');
    expect(classify({ q, answered: true, correct: false, ms: 1, hints: 0 })).toBe('missed');
    expect(classify({ q, answered: false, correct: false, ms: 0, hints: 0 })).toBe('skipped');
  });
});

describe('NGN item types', () => {
  it('scores highlight with +/- rule', () => {
    const q: Question = { ...base, type: 'highlight', passage: 'a {{x}} b {{y}} c {{z}}', answer: [0, 2] };
    expect(scoreResponse(q, { type: 'highlight', value: [0, 2] }).correct).toBe(true);
    expect(scoreResponse(q, { type: 'highlight', value: [0, 1] })).toMatchObject({ earned: 0, correct: false });
  });
  it('scores bowtie out of 5', () => {
    const q: Question = {
      ...base,
      type: 'bowtie',
      condition: { options: ['a', 'b', 'c', 'd'], answer: 1 },
      actions: { options: ['a', 'b', 'c', 'd', 'e'], answer: [0, 3] },
      parameters: { options: ['a', 'b', 'c', 'd', 'e'], answer: [2, 4] },
    };
    const r = { type: 'bowtie' as const, value: { condition: 1, actions: [0, 1], parameters: [2, 4] } };
    expect(scoreResponse(q, r)).toMatchObject({ earned: 4, correct: false });
    expect(isAnswered({ type: 'bowtie', value: { condition: 1, actions: [0], parameters: [2, 4] } })).toBe(false);
  });
});
