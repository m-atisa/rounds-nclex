import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MODULES, MODULE_BY_ID, topicKey } from '../data';
import { CJMM_STEPS, FOCUS_AREAS, FORMATS, FORMAT_HELP, FORMAT_LABEL } from '../data/types';
import { Icon } from '../components/Icon';
import { Chip, toggleIn } from '../components/ui';
import { filtersFromParams, filtersToParams, matchQuestions, pickCases, smartPick, type Filters, type Pool } from '../lib/analytics';
import { createSession } from '../lib/session';
import { useProgress } from '../store/progress';

export const CJMM_HELP: Record<string, string> = {
  'Recognize Cues': 'Spot what matters in the data',
  'Analyze Cues': 'Connect cues to what’s happening',
  'Prioritize Hypotheses': 'Decide what’s most urgent',
  'Generate Solutions': 'Plan the right interventions',
  'Take Action': 'Choose what to do first/next',
  'Evaluate Outcomes': 'Judge if care is working',
};

const POOLS: { v: Pool; label: string; sub: string }[] = [
  { v: 'smart', label: 'Smart mix', sub: 'Missed & unseen first' },
  { v: 'new', label: 'Unseen', sub: 'Never attempted' },
  { v: 'missed', label: 'Missed', sub: 'Got it wrong last time' },
  { v: 'weak', label: 'Shaky', sub: 'Missed + right-but-unsure' },
  { v: 'all', label: 'Everything', sub: 'Random from all' },
];

const DIFF = [
  { v: '1', label: 'Foundational' },
  { v: '2', label: 'Application' },
  { v: '3', label: 'Analysis' },
];

export function PracticeBuilder() {
  const [params, setParams] = useSearchParams();
  const [f, setF] = useState<Filters>(() => filtersFromParams(params));
  const [count, setCount] = useState(() => Number(params.get('n')) || 10);
  const { attempts, startSession } = useProgress();
  const navigate = useNavigate();

  const update = (patch: Partial<Filters>) => {
    const next = { ...f, ...patch };
    // Drop topic selections for modules no longer selected.
    if (patch.modules) next.topics = next.topics.filter((t) => !next.modules.length || next.modules.includes(t.split(':')[0]));
    setF(next);
    setParams(filtersToParams(next), { replace: true });
  };

  const matches = useMemo(() => matchQuestions(f, attempts), [f, attempts]);
  /** Count of matches if a single dimension value were chosen (with other filters applied). */
  const countWith = (patch: Partial<Filters>) => matchQuestions({ ...f, ...patch }, attempts).length;

  const caseMode = f.cases === 'only';
  const caseTotal = useMemo(() => new Set(matches.filter((q) => q.caseId).map((q) => q.caseId)).size, [matches]);
  const [caseCount, setCaseCount] = useState(1);
  const n = caseMode ? Math.min(caseCount, caseTotal) : Math.min(count, matches.length);
  const start = () => {
    const qs = caseMode ? pickCases(matches, n) : smartPick(matches, attempts, n);
    const mods = [...new Set(qs.map((q) => q.moduleId))];
    const title =
      mods.length === 1 ? `Practice · ${MODULE_BY_ID[mods[0]].title}` : f.focus.length === 1 ? `Practice · ${f.focus[0]}` : 'Custom practice';
    startSession(createSession(qs, { mode: 'practice', title, source: filtersToParams(f) }));
    navigate('/session');
  };

  const selectedModules = f.modules.length ? MODULES.filter((m) => f.modules.includes(m.id)) : [];
  const activeFilterCount =
    f.modules.length + f.topics.length + f.types.length + f.focus.length + f.cjmm.length + f.difficulty.length + (f.cases !== 'any' ? 1 : 0);

  return (
    <div className="container">
      <header className="page-head">
        <div className="mode-switch">
          <Link to="/practice" className="on">
            <Icon name="pulse" /> Practice
          </Link>
          <Link to={`/exam${f.modules.length ? `?modules=${f.modules.join(',')}` : ''}`}>
            <Icon name="exam" /> Exam
          </Link>
        </div>
        <h1>Practice with a coach</h1>
        <p>
          Target exactly what you’re struggling with — a module, a topic, or a kind of thinking. Hints are there when you need them, and
          every answer comes with a rationale.
        </p>
      </header>

      <div className="builder">
        <div className="stack">
          <section className="card">
            <h3>Module</h3>
            <div className="chips">
              {MODULES.map((m) => (
                <Chip
                  key={m.id}
                  on={f.modules.includes(m.id)}
                  color={m.color}
                  onClick={() => update({ modules: toggleIn(f.modules, m.id) })}
                  count={countWith({ modules: [m.id], topics: [] })}
                >
                  {m.number} · {m.title}
                </Chip>
              ))}
            </div>
            <AnimatePresence initial={false}>
              {selectedModules.length > 0 && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                  {selectedModules.map((m) => (
                    <div key={m.id} className="topic-chips">
                      <span className="eyebrow" style={{ color: m.color }}>
                        Module {m.number} topics
                      </span>
                      <div className="chips">
                        {m.topics.map((t) => {
                          const k = topicKey(m.id, t.id);
                          const c = countWith({ topics: [k] });
                          if (!m.questions.some((q) => q.topic === t.id)) return null;
                          return (
                            <Chip key={k} on={f.topics.includes(k)} onClick={() => update({ topics: toggleIn(f.topics, k) })} count={c}>
                              {t.title}
                            </Chip>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            {!selectedModules.length && <p className="faint small">Pick a module to narrow by topic.</p>}
          </section>

          <section className="card">
            <h3>Nursing skill</h3>
            <div className="chips">
              {FOCUS_AREAS.map((x) => (
                <Chip key={x} on={f.focus.includes(x)} onClick={() => update({ focus: toggleIn(f.focus, x) })} count={countWith({ focus: [x] })}>
                  {x}
                </Chip>
              ))}
            </div>
          </section>

          <section className="card">
            <h3>Clinical judgment step (NCSBN model)</h3>
            <div className="cjmm-grid">
              {CJMM_STEPS.map((x, i) => (
                <motion.button
                  key={x}
                  type="button"
                  className="cjmm"
                  aria-pressed={f.cjmm.includes(x)}
                  onClick={() => update({ cjmm: toggleIn(f.cjmm, x) })}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="cjmm-n">{i + 1}</span>
                  <span>
                    <b>{x}</b>
                    <small>{CJMM_HELP[x]}</small>
                  </span>
                  <span className="chip-count">{countWith({ cjmm: [x] })}</span>
                </motion.button>
              ))}
            </div>
          </section>

          <div className="grid grid-2">
            <section className="card">
              <h3>Question format</h3>
              <div className="format-grid">
                {FORMATS.map((x) => (
                  <button key={x} type="button" className="mode" aria-pressed={f.types.includes(x)} onClick={() => update({ types: toggleIn(f.types, x) })}>
                    <b>{FORMAT_LABEL[x]}</b>
                    <span>{FORMAT_HELP[x]}</span>
                    <span className="chip-count">{countWith({ types: [x] })}</span>
                  </button>
                ))}
              </div>
            </section>
            <section className="card">
              <h3>Difficulty</h3>
              <div className="chips">
                {DIFF.map((d) => (
                  <Chip
                    key={d.v}
                    on={f.difficulty.includes(d.v)}
                    onClick={() => update({ difficulty: toggleIn(f.difficulty, d.v) })}
                    count={countWith({ difficulty: [d.v] })}
                  >
                    {d.label}
                  </Chip>
                ))}
              </div>
            </section>
          </div>

          <section className="card">
            <h3>NGN case studies</h3>
            <div className="seg" role="group" aria-label="Case studies">
              {(
                [
                  ['any', 'Include'],
                  ['only', 'Case studies only'],
                  ['exclude', 'Stand-alone items only'],
                ] as const
              ).map(([v, label]) => (
                <button key={v} type="button" aria-pressed={f.cases === v} onClick={() => update({ cases: v })}>
                  {f.cases === v && <motion.span layoutId="cases-pill" className="seg-pill" />}
                  <span>
                    {label} <span className="chip-count">{countWith({ cases: v })}</span>
                  </span>
                </button>
              ))}
            </div>
            <p className="faint small" style={{ margin: '.6rem 0 0' }}>
              Unfolding cases present a client chart and walk through all six clinical-judgment steps, just like the NGN.
            </p>
          </section>

          <section className="card">
            <h3>Which questions</h3>
            <div className="pool-grid">
              {POOLS.map((p) => (
                <button key={p.v} type="button" className="mode" aria-pressed={f.pool === p.v} onClick={() => update({ pool: p.v })}>
                  <b>{p.label}</b>
                  <span>{p.sub}</span>
                  <span className="chip-count">{countWith({ pool: p.v })}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="builder-summary card">
          <span className="eyebrow">Your session</span>
          <div className="summary-count">
            <motion.span key={matches.length} className="big-num" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              {matches.length}
            </motion.span>
            <span className="muted">questions match</span>
          </div>
          {activeFilterCount > 0 && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => update({ modules: [], topics: [], types: [], focus: [], cjmm: [], difficulty: [], pool: 'smart', cases: 'any' })}
            >
              Clear {activeFilterCount} filter{activeFilterCount === 1 ? '' : 's'}
            </button>
          )}
          <label className="slider-label">
            <span>
              {caseMode ? 'Case studies' : 'Questions'}: <b>{n}</b>
              {caseMode && <span className="faint"> · {n * 6} items</span>}
            </span>
            <input
              className="slider"
              type="range"
              min={1}
              max={Math.max(1, caseMode ? caseTotal : Math.min(50, matches.length))}
              value={n}
              disabled={!matches.length}
              onChange={(e) => (caseMode ? setCaseCount(Number(e.target.value)) : setCount(Number(e.target.value)))}
            />
          </label>
          <ul className="perks">
            <li>
              <Icon name="bulb" /> Content &amp; strategy hints
            </li>
            <li>
              <Icon name="check" /> Instant rationale after each answer
            </li>
            <li>
              <Icon name="clock" /> Untimed — we still track your pace
            </li>
          </ul>
          <motion.button className="btn btn-primary btn-lg btn-block" onClick={start} disabled={!matches.length} whileTap={{ scale: 0.97 }}>
            <Icon name="play" /> Start {n} {caseMode ? `case stud${n === 1 ? 'y' : 'ies'}` : `question${n === 1 ? '' : 's'}`}
          </motion.button>
          {!matches.length && <p className="faint small">No questions match — loosen a filter.</p>}
        </aside>
      </div>
    </div>
  );
}
