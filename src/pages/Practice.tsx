import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MODULES, MODULE_BY_ID, UNITS, isNewModule, topicKey, unitModules } from '../data';
import { CJMM_STEPS, FOCUS_AREAS, FORMATS, FORMAT_HELP, FORMAT_LABEL } from '../data/types';
import { Icon } from '../components/Icon';
import { Chip, toggleIn } from '../components/ui';
import { filtersFromParams, filtersToParams, matchQuestions, smartPick, type Filters, type Pool } from '../lib/analytics';
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

  const n = Math.min(count, matches.length);
  const start = () => {
    const qs = smartPick(matches, attempts, n);
    const mods = [...new Set(qs.map((q) => q.moduleId))];
    const title =
      mods.length === 1 ? `Practice · ${MODULE_BY_ID[mods[0]].title}` : f.focus.length === 1 ? `Practice · ${f.focus[0]}` : 'Custom practice';
    startSession(createSession(qs, { mode: 'practice', title, source: filtersToParams(f) }));
    navigate('/session');
  };

  const selectedModules = f.modules.length ? MODULES.filter((m) => f.modules.includes(m.id)) : [];
  const activeFilterCount =
    f.modules.length + f.topics.length + f.types.length + f.focus.length + f.cjmm.length + f.difficulty.length;

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
        <h1>Practice</h1>
        <p>Choose what to practice and how many questions. You get hints if you want them and an explanation after every answer.</p>
      </header>

      <div className="builder">
        <div className="stack">
          <section className="card step-card">
            <h3>1. What do you want to practice?</h3>
            <p className="faint small step-help">Pick one or more modules. Leave everything blank for a mix from all modules.</p>
            {UNITS.map((u) => {
              const ids = u.moduleIds;
              const allOn = ids.every((id) => f.modules.includes(id));
              return (
                <div key={u.slug} className="unit-chips">
                  <div className="unit-chips-head">
                    <span className="eyebrow">{u.title}</span>
                    <button
                      type="button"
                      className="link-btn"
                      onClick={() => update({ modules: allOn ? f.modules.filter((x) => !ids.includes(x)) : [...new Set([...f.modules, ...ids])] })}
                    >
                      {allOn ? 'Clear' : 'Select all'}
                    </button>
                  </div>
                  <div className="chips">
                    {unitModules(u).map((m) => (
                      <Chip
                        key={m.id}
                        on={f.modules.includes(m.id)}
                        color={m.color}
                        isNew={isNewModule(m.id)}
                        onClick={() => update({ modules: toggleIn(f.modules, m.id) })}
                        count={countWith({ modules: [m.id], topics: [] })}
                      >
                        {m.number} · {m.title}
                      </Chip>
                    ))}
                  </div>
                </div>
              );
            })}
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

          <details className="more-options" open={f.focus.length + f.cjmm.length + f.types.length + f.difficulty.length > 0 || f.pool !== 'smart'}>
            <summary>More options <span className="faint">— skill, clinical-judgment step, format, difficulty, which questions</span></summary>
            <div className="more-body">
          <section className="opt-group">
            <h3>Nursing skill</h3>
            <div className="chips">
              {FOCUS_AREAS.map((x) => (
                <Chip key={x} on={f.focus.includes(x)} onClick={() => update({ focus: toggleIn(f.focus, x) })} count={countWith({ focus: [x] })}>
                  {x}
                </Chip>
              ))}
            </div>
          </section>

          <section className="opt-group">
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

          <div className="opt-pair">
            <section className="opt-group">
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
            <section className="opt-group">
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


          <section className="opt-group">
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
          </details>
        </div>

        <aside className="builder-summary card">
          <h3>2. How many questions?</h3>
          <div className="count-seg" role="group" aria-label="Number of questions">
            {[5, 10, 20, 40].map((k) => (
              <button key={k} type="button" aria-pressed={count === k} onClick={() => setCount(k)} disabled={!matches.length}>
                {k}
              </button>
            ))}
          </div>
          <p className="faint small">{matches.length} question{matches.length === 1 ? '' : 's'} match your choices{matches.length && matches.length < count ? ` — you’ll get all ${matches.length}` : ''}.</p>
          {activeFilterCount > 0 && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => update({ modules: [], topics: [], types: [], focus: [], cjmm: [], difficulty: [], pool: 'smart' })}
            >
              Clear {activeFilterCount} filter{activeFilterCount === 1 ? '' : 's'}
            </button>
          )}
          <p className="small muted summary-note">Hints are optional. You see the explanation after each answer. Want test conditions? Use <Link to={`/exam${f.modules.length ? `?modules=${f.modules.join(',')}` : ''}`}>Timed exam</Link>.</p>
          <motion.button className="btn btn-primary btn-lg btn-block" onClick={start} disabled={!matches.length} whileTap={{ scale: 0.97 }}>
            Start {n} question{n === 1 ? '' : 's'}
          </motion.button>
          {!matches.length && <p className="faint small">No questions match these choices. Remove an option to see more.</p>}
          <p className="small summary-bank"><Link to="/questions">Browse all questions</Link></p>
        </aside>
      </div>
    </div>
  );
}
