import type { ContentPack, Module, Question, Topic } from './types';
import type { IconName } from '../components/Icon';

const packs = import.meta.glob<ContentPack>('./raw/*.json', { eager: true, import: 'default' });

const META: Record<string, { color: string; icon: IconName; fallbackTagline: string }> = {
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
  // Professional Nursing Concepts (new)
  m37: { color: 'var(--m15)', icon: 'layers', fallbackTagline: 'Better care is a team sport.' },
  m39: { color: 'var(--m6)', icon: 'clipboard', fallbackTagline: 'Right care, right person, right cost.' },
  m42: { color: 'var(--m21)', icon: 'check', fallbackTagline: 'Own your practice.' },
  m43: { color: 'var(--m16)', icon: 'flag', fallbackTagline: 'Speak up for the person in the bed.' },
  m44: { color: 'var(--accent)', icon: 'compass', fallbackTagline: 'Do the right thing for the right reason.' },
  m45: { color: 'var(--m5)', icon: 'bulb', fallbackTagline: 'Evidence + expertise + patient values.' },
  m46: { color: 'var(--brand)', icon: 'home', fallbackTagline: 'Know the system your patient moves through.' },
  m47: { color: 'var(--m10)', icon: 'book', fallbackTagline: 'Policy shapes every bedside.' },
  m49: { color: 'var(--m16)', icon: 'alert', fallbackTagline: 'Know the law that protects your patient and your license.' },
  m50: { color: 'var(--m15)', icon: 'chart', fallbackTagline: 'Measure, improve, repeat.' },
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

export interface Unit {
  /** Route slug: /learn/<slug> */
  slug: string;
  label: string;
  title: string;
  eyebrow: string;
  overview: string;
  color: string;
  moduleIds: string[];
  /** Newly added content gets a subtle highlight across the site. */
  isNew?: boolean;
}

const ALL_UNITS: Unit[] = [
  {
    slug: 'professional',
    label: 'Professional Nursing',
    title: 'Professional Nursing Concepts',
    eyebrow: 'Modules 37, 39, 42–47, 49 & 50',
    overview:
      'Collaboration, managing care, accountability, advocacy, ethics, evidence-based practice, healthcare systems, health policy, legal issues, and quality improvement — the judgment behind delegation, prioritization, consent, reporting, and safe systems, with North Carolina practice notes.',
    color: 'var(--new)',
    moduleIds: ['m37', 'm39', 'm42', 'm43', 'm44', 'm45', 'm46', 'm47', 'm49', 'm50'],
    isNew: true,
  },
  {
    slug: 'unit-6',
    label: 'Unit 6',
    title: UNIT_6.title,
    eyebrow: 'Unit 6 · Modules 7, 23, 29, 38 & 41',
    overview: UNIT_6.overview,
    color: 'var(--m6)',
    moduleIds: UNIT_6.moduleIds,
  },
  {
    slug: 'core',
    label: 'Core concepts',
    title: 'Physiological Concepts',
    eyebrow: 'Modules 5, 6, 10, 15, 16 & 21',
    overview: 'Elimination, fluids and electrolytes, inflammation, oxygenation, perfusion, and tissue integrity — the physiology behind priority-setting at the bedside.',
    color: 'var(--brand)',
    moduleIds: ['m5', 'm6', 'm10', 'm15', 'm16', 'm21'],
  },
];
/** Units with at least one loaded module, in display order (newest first). */
export const UNITS: Unit[] = ALL_UNITS.map((u) => ({ ...u, moduleIds: u.moduleIds.filter((id) => byId[id]) })).filter((u) => u.moduleIds.length);
export const UNIT_BY_SLUG: Record<string, Unit> = Object.fromEntries(UNITS.map((u) => [u.slug, u]));
export const unitModules = (u: Unit) => u.moduleIds.map((id) => byId[id]);
export const unitOf = (moduleId: string) => UNITS.find((u) => u.moduleIds.includes(moduleId));
export const NEW_MODULE_IDS = new Set(UNITS.filter((u) => u.isNew).flatMap((u) => u.moduleIds));
export const isNewModule = (moduleId: string) => NEW_MODULE_IDS.has(moduleId);
/** Modules not assigned to any unit (shown last). */
export const UNGROUPED_MODULES = Object.values(byId).filter((m) => !unitOf(m.id)).sort((a, b) => a.number - b.number);
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
