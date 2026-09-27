import type { ContentPack, Module, Question, Topic } from './types';

const packs = import.meta.glob<ContentPack>('./raw/*.json', { eager: true, import: 'default' });

const META: Record<string, Pick<Module, 'color' | 'icon'> & { fallbackTagline: string }> = {
  m10: { color: 'var(--m10)', icon: 'flame', fallbackTagline: 'The body’s first responder.' },
  m15: { color: 'var(--m15)', icon: 'lungs', fallbackTagline: 'Every cell, every breath.' },
  m16: { color: 'var(--m16)', icon: 'heart', fallbackTagline: 'Flow is life.' },
  m21: { color: 'var(--m21)', icon: 'layers', fallbackTagline: 'The barrier that protects everything.' },
};

const byId: Record<string, Module> = {};

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
  m.topics.push(...(p.topics ?? []));
  (p.flashcards ?? []).forEach((c, i) =>
    m.flashcards.push({ ...c, moduleId: m.id, key: `${path.split('/').pop()}:${i}` }),
  );
  for (const q of p.questions ?? []) m.questions.push({ ...q, moduleId: m.id } as Question);
  if (!m.tagline) m.tagline = meta.fallbackTagline;
}

export const MODULES: Module[] = Object.values(byId).sort((a, b) => a.number - b.number);
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
