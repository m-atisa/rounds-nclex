import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { MODULE_BY_ID, getTopic } from '../../data';
import type { Question } from '../../data/types';
import type { Confidence, Score } from '../../lib/scoring';
import type { HintKind } from '../../store/progress';
import { cx } from '../../lib/util';
import { Icon } from '../Icon';
import { TopicArticle } from '../TopicArticle';
import { Html, Modal } from '../ui';

/* ------------------------------------------------------------------ */
/* Hints                                                                */
/* ------------------------------------------------------------------ */

const HINTS: Record<HintKind, { label: string; sub: string; icon: 'book' | 'compass' }> = {
  content: { label: 'Content hint', sub: 'What do I need to know?', icon: 'book' },
  strategy: { label: 'Strategy hint', sub: 'How do I approach this?', icon: 'compass' },
};

export function Hints({ q, used, onUse, disabled }: { q: Question; used: HintKind[]; onUse: (k: HintKind) => void; disabled?: boolean }) {
  const text: Record<HintKind, string | undefined> = { content: q.hintContent, strategy: q.hintStrategy };
  const kinds = (['content', 'strategy'] as HintKind[]).filter((k) => text[k]);
  if (!kinds.length) return null;
  return (
    <div className="hints">
      <div className="hint-buttons">
        <span className="hint-label">
          <Icon name="bulb" /> Stuck?
        </span>
        {kinds.map((k) => (
          <motion.button
            key={k}
            type="button"
            className={cx('hint-btn', k, used.includes(k) && 'used')}
            onClick={() => !used.includes(k) && onUse(k)}
            disabled={disabled && !used.includes(k)}
            whileTap={{ scale: 0.96 }}
            aria-expanded={used.includes(k)}
          >
            <Icon name={HINTS[k].icon} />
            <span>
              <b>{HINTS[k].label}</b>
              <small>{HINTS[k].sub}</small>
            </span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence initial={false}>
        {kinds
          .filter((k) => used.includes(k))
          .map((k) => (
            <motion.div
              key={k}
              className={cx('hint-box', k)}
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="hint-inner">
                <Icon name={HINTS[k].icon} />
                <div>
                  <b>{HINTS[k].label}</b>
                  <Html as="p" html={text[k]!} />
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Confidence (exam)                                                    */
/* ------------------------------------------------------------------ */

const CONF: { v: Confidence; label: string; icon: 'check' | 'minus' | 'x' }[] = [
  { v: 'sure', label: 'Confident', icon: 'check' },
  { v: 'unsure', label: 'Unsure', icon: 'minus' },
  { v: 'guess', label: 'Guessing', icon: 'x' },
];

export function ConfidencePicker({ value, onChange }: { value: Confidence | null; onChange: (c: Confidence) => void }) {
  return (
    <motion.div className="confidence" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <span className="faint">Confidence</span>
      <div className="seg">
        {CONF.map((c) => (
          <button key={c.v} type="button" aria-pressed={value === c.v} onClick={() => onChange(c.v)}>
            <Icon name={c.icon} /> {c.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Feedback / rationale                                                 */
/* ------------------------------------------------------------------ */

export function Feedback({ q, score, extra }: { q: Question; score: Score; extra?: React.ReactNode }) {
  const [topicOpen, setTopicOpen] = useState(false);
  const kind = score.correct ? 'ok' : score.score > 0 ? 'part' : 'no';
  const head = score.correct ? 'Correct' : score.score > 0 ? 'Partially correct' : 'Not quite';
  const topic = getTopic(q.moduleId, q.topic);
  const m = MODULE_BY_ID[q.moduleId];
  return (
    <motion.div
      className={cx('feedback', kind)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="fb-head">
        <motion.span
          className="fb-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.1 }}
        >
          <Icon name={score.correct ? 'check' : score.score > 0 ? 'minus' : 'x'} />
        </motion.span>
        {head}
        {score.possible > 1 && (
          <span className="fb-score">
            {score.earned}/{score.possible} pts
          </span>
        )}
      </div>
      {extra}
      <h4 className="fb-sub">Rationale</h4>
      <Html as="p" html={q.rationale} />
      {q.takeaway && (
        <div className="takeaway">
          <Icon name="sparkle" />
          <div>
            <b>Takeaway</b> <Html html={q.takeaway} />
          </div>
        </div>
      )}
      <div className="fb-links">
        <span className="faint fb-cats">
          {q.cjmm} · {q.focus} · {q.clientNeed}
        </span>
        {topic && (
          <button type="button" className="btn btn-sm" onClick={() => setTopicOpen(true)}>
            <Icon name="book" /> Review: {topic.title}
          </button>
        )}
      </div>
      {topic && (
        <Modal
          open={topicOpen}
          onClose={() => setTopicOpen(false)}
          wide
          title={<span className="eyebrow">Module {m?.number} · {m?.title}</span>}
        >
          <div style={{ ['--mc' as string]: m?.color }}>
            <TopicArticle moduleId={q.moduleId} topic={topic} compact />
          </div>
        </Modal>
      )}
    </motion.div>
  );
}
