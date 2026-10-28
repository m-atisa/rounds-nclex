import type { ContentPack, Module, Question, Topic } from './types';

const packs = import.meta.glob<ContentPack>('./raw/*.json', { eager: true, import: 'default' });

const META: Record<string, Pick<Module, 'color' | 'icon'> & { fallbackTagline: string }> = {
  m5: { color: 'var(--m5)', icon: 'drop', fallbackTagline: 'What goes in must come out — safely.' },
  m6: { color: 'var(--m6)', icon: 'beaker', fallbackTagline: 'Balance is everything.' },
  m10: { color: 'var(--m10)', icon: 'flame', fallbackTagline: 'The body’s first responder.' },
  m15: { color: 'var(--m15)', icon: 'lungs', fallbackTagline: 'Every cell, every breath.' },
  m16: { color: 'var(--m16)', icon: 'heart', fallbackTagline: 'Flow is life.' },
  m21: { color: 'var(--m21)', icon: 'layers', fallbackTagline: 'The barrier that protects everything.' },
  m7: { color: 'var(--m5)', icon: 'heart', fallbackTagline: 'Build wellness around the person’s life.' },
  m23: { color: 'var(--m21)', icon: 'layers', fallbackTagline: 'Notice the change. Protect the person.' },
  m29: { color: 'var(--m16)', icon: 'heart', fallbackTagline: 'Support identity, dignity, and independence.' },
  m38: { color: 'var(--m6)', icon: 'layers', fallbackTagline: 'Listen clearly. Record accurately. Report safely.' },
  m41: { color: 'var(--m10)', icon: 'layers', fallbackTagline: 'Learning shows up in what the person can do.' },
};

const byId: Record<string, Module> = {};
const guideTopics: Record<string, Topic[]> = {};

for (const path of Object.keys(packs).sort()) {
  const p = packs[path];
  const meta = META[p.moduleId] ?? { color: 'var(--brand)', icon: 'layers', fallbackTagline: '' };
  const m = (byId[p.moduleId] ??= {
    id: p.moduleId,
    number: p.moduleNumber,
    title: p.moduleTitle,
    tagline: '',
    overview: '',
    color: meta.color,
    icon: meta.icon,
    topics: [],
    flashcards: [],
    questions: [],
  });
  if (p.tagline) m.tagline = p.tagline;
  if (p.overview) m.overview = p.overview;
  if (p.kind === 'guide') {
    (guideTopics[p.moduleId] ??= []).push(...(p.topics ?? []));
    continue;
  }
  m.topics.push(...(p.topics ?? []));
  (p.flashcards ?? []).forEach((c, i) =>
    m.flashcards.push({ ...c, moduleId: m.id, key: `${path.split('/').pop()}:${i}` }),
  );
  for (const q of p.questions ?? []) m.questions.push({ ...q, moduleId: m.id } as Question);
  if (!m.tagline) m.tagline = meta.fallbackTagline;
}

// Full lessons replace the shorter topic outlines while keeping the original topic order.
for (const [mid, topics] of Object.entries(guideTopics)) {
  const m = byId[mid];
  if (!m) continue;
  for (const t of topics) {
    const i = m.topics.findIndex((x) => x.id === t.id);
    if (i >= 0) m.topics[i] = { ...m.topics[i], ...t };
    else m.topics.push(t);
  }
}

/** Approximate reading time for a topic, in minutes. */
export function readingMinutes(t: Topic) {
  const words = JSON.stringify(t).replace(/<[^>]+>/g, ' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export const MODULES: Module[] = Object.values(byId).sort((a, b) => a.number - b.number);
export const UNIT_6 = {
  number: 6,
  title: 'Health, Wellness, Illness, Communication, Teaching & Learning',
  overview: 'Build wellness with the whole person in mind. Connect cognition and self-concept with therapeutic communication, accurate documentation, safe reporting, and teaching that leads to learning.',
  moduleIds: ['m7', 'm23', 'm29', 'm38', 'm41'],
};
export const UNIT_6_MODULES = UNIT_6.moduleIds.map((id) => byId[id]);
export const MODULE_BY_ID = byId;
export const QUESTIONS: Question[] = MODULES.flatMap((m) => m.questions);
export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));
export const FLASHCARDS = MODULES.flatMap((m) => m.flashcards);

export function getTopic(moduleId: string, topicId: string): Topic | undefined {
  return byId[moduleId]?.topics.find((t) => t.id === topicId);
}

export function topicKey(moduleId: string, topicId: string) {
  return `${moduleId}:${topicId}`;
}

/** Short human label for a question's topic, e.g. "Anaphylaxis". */
export function topicTitle(q: Question) {
  return getTopic(q.moduleId, q.topic)?.title ?? q.topic;
}
