import { MODULE_BY_ID, QUESTIONS, getTopic, topicKey } from '../data';
import type { Question, QuestionType } from '../data/types';
import { TYPE_LABEL } from '../data/types';
import type { Attempt } from '../store/progress';
import type { Mastery } from './scoring';
import { dayKey, shuffle } from './util';

/* ------------------------------------------------------------------ */
/* Per-question status                                                  */
/* ------------------------------------------------------------------ */

export type QStatus = 'new' | Mastery;

export function latest(attempts: Record<string, Attempt[]>, qid: string): Attempt | undefined {
  const a = attempts[qid];
  return a?.[a.length - 1];
}

export function statusOf(attempts: Record<string, Attempt[]>, qid: string): QStatus {
  return latest(attempts, qid)?.mastery ?? 'new';
}

/* ------------------------------------------------------------------ */
/* Grouped performance                                                  */
/* ------------------------------------------------------------------ */

export interface PerfRecord {
  q: Question;
  score: number;
  correct: boolean;
  ms: number;
  mastery: Mastery;
}

export type Dimension = 'type' | 'cjmm' | 'focus' | 'topic' | 'module';

export interface GroupStat {
  dim: Dimension;
  key: string;
  label: string;
  sub?: string;
  n: number;
  acc: number;
  avgMs: number;
  mastered: number;
  fragile: number;
  missed: number;
  verdict: 'strong' | 'developing' | 'weak';
  /** Deep link into practice for this group. */
  practiceQuery: string;
}

const keyFns: Record<Dimension, (q: Question) => string> = {
  type: (q) => q.type,
  cjmm: (q) => q.cjmm ?? 'Unspecified',
  focus: (q) => q.focus ?? 'Unspecified',
  topic: (q) => topicKey(q.moduleId, q.topic),
  module: (q) => q.moduleId,
};

function labelFor(dim: Dimension, key: string): { label: string; sub?: string } {
  if (dim === 'type') return { label: TYPE_LABEL[key as QuestionType] ?? key };
  if (dim === 'module') {
    const m = MODULE_BY_ID[key];
    return { label: m ? m.title : key, sub: m ? `Module ${m.number}` : undefined };
  }
  if (dim === 'topic') {
    const [mid, tid] = key.split(':');
    const m = MODULE_BY_ID[mid];
    return { label: getTopic(mid, tid)?.title ?? tid, sub: m ? `Module ${m.number} · ${m.title}` : undefined };
  }
  return { label: key };
}

function practiceQueryFor(dim: Dimension, key: string, scopeModules?: string[]) {
  const p = new URLSearchParams();
  if (dim === 'topic') {
    const [mid] = key.split(':');
    p.set('modules', mid);
    p.set('topics', key);
  } else {
    if (scopeModules?.length) p.set('modules', scopeModules.join(','));
    if (dim === 'module') p.set('modules', key);
    if (dim === 'type') p.set('types', key);
    if (dim === 'cjmm') p.set('cjmm', key);
    if (dim === 'focus') p.set('focus', key);
  }
  return p.toString();
}

export function verdictOf(acc: number, masteredShare: number): GroupStat['verdict'] {
  if (acc >= 0.8 && masteredShare >= 0.6) return 'strong';
  if (acc >= 0.6) return 'developing';
  return 'weak';
}

export function groupStats(records: PerfRecord[], dim: Dimension, scopeModules?: string[]): GroupStat[] {
  const groups = new Map<string, PerfRecord[]>();
  for (const r of records) {
    const k = keyFns[dim](r.q);
    groups.set(k, [...(groups.get(k) ?? []), r]);
  }
  return [...groups.entries()]
    .map(([key, rs]) => {
      const n = rs.length;
      const acc = rs.reduce((s, r) => s + r.score, 0) / n;
      const mastered = rs.filter((r) => r.mastery === 'mastered').length;
      return {
        dim,
        key,
        ...labelFor(dim, key),
        n,
        acc,
        avgMs: rs.reduce((s, r) => s + r.ms, 0) / n,
        mastered,
        fragile: rs.filter((r) => r.mastery === 'fragile').length,
        missed: rs.filter((r) => r.mastery === 'missed' || r.mastery === 'skipped').length,
        verdict: verdictOf(acc, mastered / n),
        practiceQuery: practiceQueryFor(dim, key, scopeModules),
      };
    })
    .sort((a, b) => a.acc - b.acc || b.n - a.n);
}

/** Pick the most useful areas to practice next across several dimensions. */
export function recommendations(records: PerfRecord[], scopeModules?: string[], max = 3): GroupStat[] {
  const all = (['topic', 'type', 'focus', 'cjmm'] as Dimension[]).flatMap((d) => groupStats(records, d, scopeModules));
  const need = (g: GroupStat) => (1 - g.acc) * 2 + (g.fragile / g.n) * 0.8 + Math.min(g.n, 5) * 0.05;
  const seen = new Set<string>();
  return all
    .filter((g) => g.verdict !== 'strong' || g.fragile > 0)
    .sort((a, b) => need(b) - need(a))
    .filter((g) => {
      const k = `${g.dim}:${g.key}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .slice(0, max);
}

export function recordsFromAttempts(attempts: Record<string, Attempt[]>): PerfRecord[] {
  const out: PerfRecord[] = [];
  for (const q of QUESTIONS) {
    const a = latest(attempts, q.id);
    if (a) out.push({ q, score: a.score, correct: a.correct, ms: a.ms, mastery: a.mastery });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Streaks & activity                                                   */
/* ------------------------------------------------------------------ */

export function streak(days: Record<string, { q: number }>) {
  let n = 0;
  const d = new Date();
  if (!days[dayKey(d)]) d.setDate(d.getDate() - 1); // today not started yet doesn't break the streak
  while (days[dayKey(d)]?.q) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

/* ------------------------------------------------------------------ */
/* Practice filters                                                     */
/* ------------------------------------------------------------------ */

export type Pool = 'smart' | 'new' | 'missed' | 'weak' | 'all';

export interface Filters {
  modules: string[];
  topics: string[];
  types: string[];
  focus: string[];
  cjmm: string[];
  difficulty: string[];
  pool: Pool;
}

export const emptyFilters = (): Filters => ({
  modules: [],
  topics: [],
  types: [],
  focus: [],
  cjmm: [],
  difficulty: [],
  pool: 'smart',
});

export function filtersFromParams(p: URLSearchParams): Filters {
  const list = (k: string) => (p.get(k) ? p.get(k)!.split(',').filter(Boolean) : []);
  return {
    modules: list('modules'),
    topics: list('topics'),
    types: list('types'),
    focus: list('focus'),
    cjmm: list('cjmm'),
    difficulty: list('difficulty'),
    pool: (p.get('pool') as Pool) || 'smart',
  };
}

export function filtersToParams(f: Filters) {
  const p = new URLSearchParams();
  (['modules', 'topics', 'types', 'focus', 'cjmm', 'difficulty'] as const).forEach((k) => {
    if (f[k].length) p.set(k, f[k].join(','));
  });
  if (f.pool !== 'smart') p.set('pool', f.pool);
  return p.toString();
}

export function matchQuestions(f: Filters, attempts: Record<string, Attempt[]>): Question[] {
  const has = (arr: string[], v: string) => !arr.length || arr.includes(v);
  return QUESTIONS.filter((q) => {
    if (!has(f.modules, q.moduleId)) return false;
    if (f.topics.length) {
      const topicsForModule = f.topics.filter((t) => t.startsWith(`${q.moduleId}:`));
      // Topic filters only narrow the modules they belong to.
      if (topicsForModule.length && !topicsForModule.includes(topicKey(q.moduleId, q.topic))) return false;
    }
    if (!has(f.types, q.type) || !has(f.focus, q.focus) || !has(f.cjmm, q.cjmm) || !has(f.difficulty, String(q.difficulty)))
      return false;
    const st = statusOf(attempts, q.id);
    if (f.pool === 'new') return st === 'new';
    if (f.pool === 'missed') return st === 'missed' || st === 'skipped';
    if (f.pool === 'weak') return st === 'missed' || st === 'skipped' || st === 'fragile';
    return true;
  });
}

/** Smart order: missed → fragile → unseen → mastered (oldest first), randomized within each tier. */
export function smartPick(qs: Question[], attempts: Record<string, Attempt[]>, n: number): Question[] {
  const tier: Record<QStatus, number> = { missed: 0, skipped: 0, fragile: 1, new: 2, mastered: 3 };
  return shuffle(qs)
    .sort((a, b) => tier[statusOf(attempts, a.id)] - tier[statusOf(attempts, b.id)])
    .slice(0, n);
}

/** Balanced random pick across modules (for exams). */
export function balancedPick(qs: Question[], n: number): Question[] {
  const byMod = new Map<string, Question[]>();
  shuffle(qs).forEach((q) => byMod.set(q.moduleId, [...(byMod.get(q.moduleId) ?? []), q]));
  const lists = [...byMod.values()];
  const out: Question[] = [];
  while (out.length < n && lists.some((l) => l.length)) {
    for (const l of lists) if (l.length && out.length < n) out.push(l.shift()!);
  }
  return shuffle(out);
}
