import { AnimatePresence, motion } from 'motion/react';
import { useDeferredValue, useMemo, useRef, useState } from 'react';
import { MODULES, MODULE_BY_ID, QUESTIONS, topicTitle } from '../data';
import type { Question, Response } from '../data/types';
import { CJMM_STEPS, FOCUS_AREAS, QUESTION_TYPES, TYPE_LABEL, TYPE_SHORT } from '../data/types';
import { Icon } from '../components/Icon';
import { QuestionBody, QuestionMeta } from '../components/question/QuestionView';
import { Feedback, Hints } from '../components/question/Support';
import { Difficulty, Modal } from '../components/ui';
import { statusOf, type QStatus } from '../lib/analytics';
import { classify, isAnswered, scoreResponse } from '../lib/scoring';
import { newItem } from '../lib/session';
import { cx } from '../lib/util';
import { useProgress, type SessionItem } from '../store/progress';
import { stripTags } from './Results';

const STATUS_LABEL: Record<QStatus, string> = {
  new: 'Not attempted',
  mastered: 'Mastered',
  fragile: 'Right but shaky',
  missed: 'Missed',
  skipped: 'Missed',
};

export function Bank() {
  const attempts = useProgress((s) => s.attempts);
  const [query, setQuery] = useState('');
  const [mod, setMod] = useState('');
  const [type, setType] = useState('');
  const [skill, setSkill] = useState('');
  const [status, setStatus] = useState('');
  const [limit, setLimit] = useState(40);
  const [open, setOpen] = useState<Question | null>(null);
  const q = useDeferredValue(query.trim().toLowerCase());

  const list = useMemo(
    () =>
      QUESTIONS.filter((x) => {
        if (mod && x.moduleId !== mod) return false;
        if (type && x.type !== type) return false;
        if (skill && x.focus !== skill && x.cjmm !== skill) return false;
        if (status) {
          const st = statusOf(attempts, x.id);
          if (status === 'missed' ? st !== 'missed' && st !== 'skipped' : st !== status) return false;
        }
        if (q && !`${x.stem} ${x.ref} ${x.id} ${topicTitle(x)}`.toLowerCase().includes(q)) return false;
        return true;
      }),
    [q, mod, type, skill, status, attempts],
  );

  return (
    <div className="container">
      <header className="page-head">
        <span className="eyebrow">Question bank</span>
        <h1>All {QUESTIONS.length} questions</h1>
        <p>Every item is tagged with its module, topic and the clinical-judgment skill it tests. Open any question to try it with hints.</p>
      </header>

      <div className="bank-tools">
        <label className="search">
          <Icon name="search" />
          <input className="input" placeholder="Search stems, topics, references…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <select className="select" value={mod} onChange={(e) => setMod(e.target.value)} aria-label="Module">
          <option value="">All modules</option>
          {MODULES.map((m) => (
            <option key={m.id} value={m.id}>
              Module {m.number} · {m.title}
            </option>
          ))}
        </select>
        <select className="select" value={type} onChange={(e) => setType(e.target.value)} aria-label="Question type">
          <option value="">All formats</option>
          {QUESTION_TYPES.map((t) => (
            <option key={t} value={t}>
              {TYPE_LABEL[t]}
            </option>
          ))}
        </select>
        <select className="select" value={skill} onChange={(e) => setSkill(e.target.value)} aria-label="Skill">
          <option value="">All skills</option>
          <optgroup label="Nursing skill">
            {FOCUS_AREAS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </optgroup>
          <optgroup label="Clinical judgment">
            {CJMM_STEPS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </optgroup>
        </select>
        <select className="select" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="">Any status</option>
          <option value="new">Not attempted</option>
          <option value="mastered">Mastered</option>
          <option value="fragile">Right but shaky</option>
          <option value="missed">Missed</option>
        </select>
      </div>

      <p className="faint small" style={{ margin: '0 0 12px' }}>
        {list.length} question{list.length === 1 ? '' : 's'}
      </p>

      <div className="bank-list">
        <AnimatePresence initial={false}>
          {list.slice(0, limit).map((x, i) => {
            const st = statusOf(attempts, x.id);
            return (
              <motion.button
                layout="position"
                key={x.id}
                className="bank-item"
                onClick={() => setOpen(x)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i, 12) * 0.025 } }}
                exit={{ opacity: 0 }}
                style={{ ['--mc' as string]: MODULE_BY_ID[x.moduleId]?.color }}
              >
                <div className="row">
                  <span className={cx('status-dot', st)} title={STATUS_LABEL[st]} />
                  <span className="badge badge-ref">
                    <Icon name="book" /> {x.ref}
                  </span>
                  <span className="badge">{TYPE_SHORT[x.type]}</span>
                  <span className="badge hide-sm">{x.cjmm}</span>
                  <Difficulty level={x.difficulty} />
                </div>
                <p className="stem">{stripTags(x.stem)}</p>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
      {list.length > limit && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button className="btn" onClick={() => setLimit((l) => l + 40)}>
            Show more ({list.length - limit} left)
          </button>
        </div>
      )}
      {!list.length && (
        <div className="empty">
          <Icon name="search" />
          <p>No questions match those filters.</p>
        </div>
      )}

      <Modal open={!!open} onClose={() => setOpen(null)} wide title={open && <span className="eyebrow">{open.id}</span>}>
        {open && <SingleQuestion key={open.id} q={open} />}
      </Modal>
    </div>
  );
}

/** Stand-alone practice of one question (used in the bank). */
export function SingleQuestion({ q }: { q: Question }) {
  const [item, setItem] = useState<SessionItem>(() => newItem(q));
  const recordAttempt = useProgress((s) => s.recordAttempt);
  const shownAt = useRef(performance.now());
  const answered = isAnswered(item.response);
  const sc = item.locked ? scoreResponse(q, item.response) : null;

  const check = () => {
    const ms = performance.now() - shownAt.current;
    const s = scoreResponse(q, item.response);
    setItem((it) => ({ ...it, locked: true, ms }));
    recordAttempt(q.id, {
      t: Date.now(),
      score: s.score,
      correct: s.correct,
      ms,
      hints: item.hints.length,
      mode: 'practice',
      mastery: classify({ q, answered: true, correct: s.correct, ms, hints: item.hints.length }),
    });
  };

  return (
    <div className="q-card" style={{ ['--mc' as string]: MODULE_BY_ID[q.moduleId]?.color }}>
      <QuestionMeta q={q} />
      <QuestionBody
        q={q}
        response={item.response}
        perm={item.perm}
        revealed={item.locked}
        locked={item.locked}
        onChange={(r: Response) => setItem((it) => ({ ...it, response: r }))}
      />
      {!item.locked && <Hints q={q} used={item.hints} onUse={(k) => setItem((it) => ({ ...it, hints: [...it.hints, k] }))} />}
      {sc && <Feedback q={q} score={sc} />}
      <div className="quiz-actions">
        <div className="spacer" />
        {!item.locked ? (
          <button className="btn btn-primary" onClick={check} disabled={!answered}>
            Check answer <Icon name="check" />
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => {
              setItem(newItem(q));
              shownAt.current = performance.now();
            }}
          >
            <Icon name="refresh" /> Try again
          </button>
        )}
      </div>
    </div>
  );
}
