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

export const QUESTION_TYPES = ['mcq', 'sata', 'order', 'matrix', 'dropdown'] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export const TYPE_LABEL: Record<QuestionType, string> = {
  mcq: 'Multiple choice',
  sata: 'Select all that apply',
  order: 'Ordered response',
  matrix: 'Matrix / grid',
  dropdown: 'Drop-down cloze',
};

export const TYPE_SHORT: Record<QuestionType, string> = {
  mcq: 'MCQ',
  sata: 'SATA',
  order: 'Ordering',
  matrix: 'Matrix',
  dropdown: 'Cloze',
};

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
  /** Added at load time. */
  moduleId: string;
}

export interface ChoiceQuestion extends QuestionBase {
  type: 'mcq';
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

export type Question = ChoiceQuestion | SataQuestion | OrderQuestion | MatrixQuestion | DropdownQuestion;

export interface TopicSection {
  heading?: string;
  body?: string;
  bullets?: string[];
}

export interface Topic {
  id: string;
  title: string;
  exemplar?: string | null;
  summary?: string;
  sections?: TopicSection[];
  table?: { caption?: string; headers: string[]; rows: string[][] };
  pearls?: string[];
  redFlags?: string[];
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
  | { type: 'dropdown'; value: (number | null)[] };
