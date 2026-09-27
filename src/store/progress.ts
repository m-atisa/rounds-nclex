import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Response } from '../data/types';
import type { Confidence, Mastery } from '../lib/scoring';
import { dayKey } from '../lib/util';

export type Mode = 'practice' | 'exam';
export type HintKind = 'content' | 'strategy';

export interface Attempt {
  t: number;
  score: number;
  correct: boolean;
  ms: number;
  hints: number;
  conf?: Confidence | null;
  mode: Mode;
  mastery: Mastery;
}

export interface SessionItem {
  response: Response;
  /** Display order of options for mcq / sata (original indices). */
  perm: number[];
  locked: boolean;
  score?: number;
  correct?: boolean;
  ms: number;
  hints: HintKind[];
  confidence: Confidence | null;
  flagged: boolean;
}

export interface Session {
  id: string;
  mode: Mode;
  title: string;
  created: number;
  finishedAt?: number;
  qids: string[];
  idx: number;
  items: Record<string, SessionItem>;
  timeLimitSec: number | null;
  elapsedSec: number;
  askConfidence: boolean;
  /** Query string that recreates this session's filters (practice) for "practice again". */
  source?: string;
}

interface DayStat {
  q: number;
  ms: number;
}

interface ProgressState {
  attempts: Record<string, Attempt[]>;
  read: Record<string, number>;
  cards: Record<string, { known: number; seen: number; last: number }>;
  sessions: Session[];
  days: Record<string, DayStat>;
  active: Session | null;
  recordAttempt: (qid: string, a: Attempt) => void;
  markRead: (key: string) => void;
  rateCard: (key: string, known: boolean) => void;
  startSession: (s: Session) => void;
  updateActive: (fn: (s: Session) => Session) => void;
  finishActive: () => string | null;
  discardActive: () => void;
  reset: () => void;
}

const MAX_ATTEMPTS = 12;
const MAX_SESSIONS = 30;

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      attempts: {},
      read: {},
      cards: {},
      sessions: [],
      days: {},
      active: null,

      recordAttempt: (qid, a) =>
        set((s) => {
          const d = dayKey(new Date(a.t));
          const prev = s.days[d] ?? { q: 0, ms: 0 };
          return {
            attempts: { ...s.attempts, [qid]: [...(s.attempts[qid] ?? []), a].slice(-MAX_ATTEMPTS) },
            days: { ...s.days, [d]: { q: prev.q + 1, ms: prev.ms + a.ms } },
          };
        }),

      markRead: (key) => set((s) => (s.read[key] ? s : { read: { ...s.read, [key]: Date.now() } })),

      rateCard: (key, known) =>
        set((s) => {
          const c = s.cards[key] ?? { known: 0, seen: 0, last: 0 };
          return { cards: { ...s.cards, [key]: { known: known ? c.known + 1 : 0, seen: c.seen + 1, last: Date.now() } } };
        }),

      startSession: (session) => set({ active: session }),

      updateActive: (fn) => set((s) => (s.active ? { active: fn(s.active) } : s)),

      finishActive: () => {
        const a = get().active;
        if (!a) return null;
        const done = { ...a, finishedAt: Date.now() };
        set((s) => ({ active: null, sessions: [done, ...s.sessions].slice(0, MAX_SESSIONS) }));
        return done.id;
      },

      discardActive: () => set({ active: null }),

      reset: () => set({ attempts: {}, read: {}, cards: {}, sessions: [], days: {}, active: null }),
    }),
    {
      name: 'rounds.progress.v1',
      storage: createJSONStorage(() => {
        try {
          const k = '__rounds_probe__';
          localStorage.setItem(k, '1');
          localStorage.removeItem(k);
          return localStorage;
        } catch {
          const mem = new Map<string, string>();
          return {
            getItem: (k) => mem.get(k) ?? null,
            setItem: (k, v) => void mem.set(k, v),
            removeItem: (k) => void mem.delete(k),
          };
        }
      }),
      partialize: ({ attempts, read, cards, sessions, days, active }) => ({ attempts, read, cards, sessions, days, active }),
    },
  ),
);
