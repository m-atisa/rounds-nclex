import type { Question } from '../data/types';
import type { Mode, Session, SessionItem } from '../store/progress';
import { emptyResponse } from './scoring';
import { shuffle, uid } from './util';

export function newItem(q: Question): SessionItem {
  const perm = q.type === 'mcq' || q.type === 'sata' ? shuffle(q.options.map((_, i) => i)) : [];
  return { response: emptyResponse(q), perm, locked: false, ms: 0, hints: [], confidence: null, flagged: false };
}

export function createSession(
  qs: Question[],
  opts: { mode: Mode; title: string; timeLimitSec?: number | null; askConfidence?: boolean; source?: string },
): Session {
  return {
    id: uid(),
    mode: opts.mode,
    title: opts.title,
    created: Date.now(),
    qids: qs.map((q) => q.id),
    idx: 0,
    items: Object.fromEntries(qs.map((q) => [q.id, newItem(q)])),
    timeLimitSec: opts.timeLimitSec ?? null,
    elapsedSec: 0,
    askConfidence: opts.askConfidence ?? opts.mode === 'exam',
    source: opts.source,
  };
}
