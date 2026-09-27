import type { Question, Response } from '../data/types';
import { shuffle } from './util';

export function emptyResponse(q: Question): Response {
  switch (q.type) {
    case 'mcq':
      return { type: 'mcq', value: null };
    case 'sata':
      return { type: 'sata', value: [] };
    case 'order': {
      const ids = q.options.map((_, i) => i);
      let order = shuffle(ids);
      // Never present an ordering question already solved.
      for (let tries = 0; tries < 5 && order.every((v, i) => v === i) && ids.length > 1; tries++) order = shuffle(ids);
      if (order.every((v, i) => v === i) && ids.length > 1) order = [...ids].reverse();
      return { type: 'order', value: order, touched: false };
    }
    case 'matrix':
      return { type: 'matrix', value: q.rows.map(() => null) };
    case 'dropdown':
      return { type: 'dropdown', value: q.blanks.map(() => null) };
  }
}

export function isAnswered(r: Response): boolean {
  switch (r.type) {
    case 'mcq':
      return r.value !== null;
    case 'sata':
      return r.value.length > 0;
    case 'order':
      return r.touched;
    case 'matrix':
    case 'dropdown':
      return r.value.every((v) => v !== null);
  }
}

export interface Score {
  /** 0..1 credit using NGN-style partial scoring. */
  score: number;
  /** Full credit only. */
  correct: boolean;
  earned: number;
  possible: number;
}

/**
 * NGN-inspired scoring:
 * - mcq / order: 0/1
 * - sata: +/- (each correct pick +1, each wrong pick −1, floor 0)
 * - matrix / dropdown: 0/1 per row or blank
 */
export function scoreResponse(q: Question, r: Response): Score {
  if (q.type !== r.type) return { score: 0, correct: false, earned: 0, possible: 1 };
  switch (q.type) {
    case 'mcq': {
      const ok = (r as Extract<Response, { type: 'mcq' }>).value === q.answer;
      return { score: ok ? 1 : 0, correct: ok, earned: ok ? 1 : 0, possible: 1 };
    }
    case 'sata': {
      const picked = new Set((r as Extract<Response, { type: 'sata' }>).value);
      const key = new Set(q.answer);
      let pts = 0;
      picked.forEach((i) => (pts += key.has(i) ? 1 : -1));
      const earned = Math.max(0, pts);
      const exact = picked.size === key.size && [...key].every((i) => picked.has(i));
      return { score: earned / key.size, correct: exact, earned, possible: key.size };
    }
    case 'order': {
      const v = (r as Extract<Response, { type: 'order' }>).value;
      const ok = v.length === q.options.length && v.every((x, i) => x === i);
      return { score: ok ? 1 : 0, correct: ok, earned: ok ? 1 : 0, possible: 1 };
    }
    case 'matrix': {
      const v = (r as Extract<Response, { type: 'matrix' }>).value;
      const earned = q.answer.filter((a, i) => v[i] === a).length;
      return { score: earned / q.answer.length, correct: earned === q.answer.length, earned, possible: q.answer.length };
    }
    case 'dropdown': {
      const v = (r as Extract<Response, { type: 'dropdown' }>).value;
      const earned = q.blanks.filter((b, i) => v[i] === b.answer).length;
      return { score: earned / q.blanks.length, correct: earned === q.blanks.length, earned, possible: q.blanks.length };
    }
  }
}

/** Expected seconds for a prepared student; used to flag "slow" answers. */
export const PACE_SECONDS: Record<Question['type'], number> = {
  mcq: 70,
  sata: 100,
  order: 100,
  matrix: 120,
  dropdown: 90,
};

export function isSlow(q: Question, ms: number) {
  return ms / 1000 > PACE_SECONDS[q.type] * (q.difficulty === 3 ? 1.25 : 1);
}

export type Confidence = 'sure' | 'unsure' | 'guess';

export type Mastery = 'mastered' | 'fragile' | 'missed' | 'skipped';

/**
 * Correct answers can still be shaky. A correct answer is "fragile" if the student needed a hint,
 * wasn't confident, or took much longer than a prepared student would.
 */
export function classify(opts: {
  q: Question;
  answered: boolean;
  correct: boolean;
  ms: number;
  hints: number;
  confidence?: Confidence | null;
}): Mastery {
  if (!opts.answered) return 'skipped';
  if (!opts.correct) return 'missed';
  if (opts.hints > 0 || (opts.confidence && opts.confidence !== 'sure') || isSlow(opts.q, opts.ms)) return 'fragile';
  return 'mastered';
}

export function fragileReasons(opts: { q: Question; ms: number; hints: number; confidence?: Confidence | null }) {
  const out: string[] = [];
  if (opts.hints > 0) out.push(opts.hints > 1 ? 'Used 2 hints' : 'Used a hint');
  if (opts.confidence === 'guess') out.push('Guessed');
  else if (opts.confidence === 'unsure') out.push('Unsure');
  if (isSlow(opts.q, opts.ms)) out.push('Slow');
  return out;
}
