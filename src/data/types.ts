export const CJMM_STEPS = [
  'Recognize Cues',
  'Analyze Cues',
  'Prioritize Hypotheses',
  'Generate Solutions',
  'Take Action',
  'Evaluate Outcomes',
] as const;
export type Cjmm = (typeof CJMM_STEPS)[number];

export const FOCUS_AREAS = [
  'Prioritization',
  'Assessment Findings',
  'Nursing Interventions',
  'Client Teaching',
  'Pharmacology',
  'Delegation & Safety',
  'Lifespan & Diversity',
  'Pathophysiology',
] as const;
export type Focus = (typeof FOCUS_AREAS)[number];

export const QUESTION_TYPES = ['mcq', 'sata', 'order', 'matrix', 'dropdown', 'highlight', 'bowtie'] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export const TYPE_LABEL: Record<QuestionType, string> = {
  mcq: 'Multiple choice',
  sata: 'Select all that apply',
  order: 'Ordered response',
  matrix: 'Matrix / grid',
  dropdown: 'Drop-down cloze',
  highlight: 'Highlight',
  bowtie: 'Bowtie',
};

export const TYPE_SHORT: Record<QuestionType, string> = {
  mcq: 'MCQ',
  sata: 'SATA',
  order: 'Ordering',
  matrix: 'Matrix',
  dropdown: 'Cloze',
  highlight: 'Highlight',
  bowtie: 'Bowtie',
};

/** The three formats students see: priority (single answer), single best answer, select all that apply. */
export const FORMATS = ['priority', 'single', 'sata'] as const;
export type Format = (typeof FORMATS)[number];
export const FORMAT_LABEL: Record<Format, string> = {
  priority: 'Priority',
  single: 'Single best answer',
  sata: 'Select all that apply',
};
export const FORMAT_SHORT: Record<Format, string> = { priority: 'Priority', single: 'Single answer', sata: 'SATA' };
export const FORMAT_HELP: Record<Format, string> = {
  priority: 'What should the nurse do or address first?',
  single: 'One correct answer',
  sata: 'Choose every correct option',
};
export function formatOf(q: { type: string; priority?: boolean }): Format {
  if (q.type === 'sata') return 'sata';
  return q.priority ? 'priority' : 'single';
}

export interface ExhibitTab {
  title: string;
  html?: string;
  table?: { headers: string[]; rows: string[][] };
}

interface QuestionBase {
  id: string;
  type: QuestionType;
  topic: string;
  ref: string;
  difficulty: 1 | 2 | 3;
  clientNeed: string;
  cjmm: Cjmm;
  focus: Focus;
  stem: string;
  rationale: string;
  takeaway?: string;
  hintContent?: string;
  hintStrategy?: string;
  /** NGN-style chart shown beside the question. */
  exhibit?: { tabs: ExhibitTab[] };
  /** Other topic ids (same module) this integrated item also requires. */
  alsoTests?: string[];
  /** Legacy (case studies removed). */
  caseId?: string;
  caseOrder?: number;
  /** Added at load time. */
  moduleId: string;
}

export interface ChoiceQuestion extends QuestionBase {
  type: 'mcq';
  /** Stem emphasizes priority ("first", "most important"). */
  priority?: boolean;
  options: string[];
  answer: number;
  optionRationales?: string[];
}
export interface SataQuestion extends QuestionBase {
  type: 'sata';
  options: string[];
  answer: number[];
  optionRationales?: string[];
}
export interface OrderQuestion extends QuestionBase {
  type: 'order';
  /** Stored in the correct order. */
  options: string[];
}
export interface MatrixQuestion extends QuestionBase {
  type: 'matrix';
  rows: string[];
  columns: string[];
  answer: number[];
  optionRationales?: string[];
}
export interface DropdownQuestion extends QuestionBase {
  type: 'dropdown';
  template: string;
  blanks: { options: string[]; answer: number }[];
}

export interface HighlightQuestion extends QuestionBase {
  type: 'highlight';
  /** Text where each {{segment}} is selectable. */
  passage: string;
  answer: number[];
  optionRationales?: string[];
}
export interface BowtiePart {
  options: string[];
}
export interface BowtieQuestion extends QuestionBase {
  type: 'bowtie';
  condition: BowtiePart & { answer: number };
  actions: BowtiePart & { answer: number[] };
  parameters: BowtiePart & { answer: number[] };
  optionRationales?: { condition?: string[]; actions?: string[]; parameters?: string[] };
}

export type Question =
  | ChoiceQuestion
  | SataQuestion
  | OrderQuestion
  | MatrixQuestion
  | DropdownQuestion
  | HighlightQuestion
  | BowtieQuestion;

export interface TableData {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface SelfCheck {
  q: string;
  a: string;
}

export interface TopicSection {
  heading?: string;
  body?: string;
  bullets?: string[];
  steps?: string[];
  table?: TableData;
  analogy?: string;
  example?: string;
  check?: SelfCheck;
}

export interface Topic {
  id: string;
  title: string;
  exemplar?: string | null;
  summary?: string;
  sections?: TopicSection[];
  table?: TableData;
  pearls?: string[];
  redFlags?: string[];
  objectives?: string[];
  bigPicture?: string;
  keyTerms?: { term: string; def: string }[];
  mnemonics?: { name: string; text: string }[];
  recap?: string[];
  checks?: SelfCheck[];
}

export interface Flashcard {
  front: string;
  back: string;
  topic?: string;
}

export interface ContentPack {
  moduleId: string;
  moduleNumber: number;
  moduleTitle: string;
  /** "guide" packs replace study-guide topics (by id) defined in the question packs. */
  kind?: 'guide';
  tagline?: string;
  overview?: string;
  topics?: Topic[];
  flashcards?: Flashcard[];
  questions?: Omit<Question, 'moduleId'>[];
}

export interface Module {
  id: string;
  number: number;
  title: string;
  tagline: string;
  overview: string;
  color: string;
  icon: 'flame' | 'lungs' | 'heart' | 'layers';
  topics: Topic[];
  flashcards: (Flashcard & { key: string; moduleId: string })[];
  questions: Question[];
}

/** Student response shape per type (indices always refer to the ORIGINAL option order). */
export type Response =
  | { type: 'mcq'; value: number | null }
  | { type: 'sata'; value: number[] }
  | { type: 'order'; value: number[]; touched: boolean }
  | { type: 'matrix'; value: (number | null)[] }
  | { type: 'dropdown'; value: (number | null)[] }
  | { type: 'highlight'; value: number[] }
  | { type: 'bowtie'; value: { condition: number | null; actions: number[]; parameters: number[] } };
