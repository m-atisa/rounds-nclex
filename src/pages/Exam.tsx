import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MODULES, MODULE_BY_ID, QUESTIONS } from '../data';
import { Icon, type IconName } from '../components/Icon';
import { Chip, toggleIn } from '../components/ui';
import { balancedPick } from '../lib/analytics';
import { createSession } from '../lib/session';
import { useProgress } from '../store/progress';

const PRESETS: { id: string; icon: IconName; title: string; sub: string; n: number; min: number }[] = [
  { id: 'quick', icon: 'bolt', title: 'Quick check', sub: '10 questions · 15 min', n: 10, min: 15 },
  { id: 'module', icon: 'target', title: 'Module exam', sub: '25 questions · 40 min', n: 25, min: 40 },
  { id: 'comp', icon: 'trophy', title: 'Comprehensive', sub: '60 questions · 90 min', n: 60, min: 90 },
];

export function ExamBuilder() {
  const [params] = useSearchParams();
  const [modules, setModules] = useState<string[]>(() => params.get('modules')?.split(',').filter(Boolean) ?? []);
  const [preset, setPreset] = useState(modules.length === 1 ? 'module' : 'quick');
  const [count, setCount] = useState(modules.length === 1 ? 25 : 10);
  const [minutes, setMinutes] = useState(modules.length === 1 ? 40 : 15);
  const [timed, setTimed] = useState(true);
  const [askConfidence, setAskConfidence] = useState(true);
  const { startSession } = useProgress();
  const navigate = useNavigate();

  const pool = useMemo(() => QUESTIONS.filter((q) => !modules.length || modules.includes(q.moduleId)), [modules]);
  const n = Math.min(count, pool.length);

  const choose = (p: (typeof PRESETS)[number]) => {
    setPreset(p.id);
    setCount(p.n);
    setMinutes(p.min);
    if (p.id === 'comp') setModules([]);
  };

  const start = () => {
    const qs = balancedPick(pool, n);
    const title =
      modules.length === 1 ? `Module ${MODULE_BY_ID[modules[0]].number} exam · ${MODULE_BY_ID[modules[0]].title}` : modules.length ? 'Multi-module exam' : 'Comprehensive exam';
    startSession(createSession(qs, { mode: 'exam', title, timeLimitSec: timed ? minutes * 60 : null, askConfidence }));
    navigate('/session');
  };

  return (
    <div className="container">
      <header className="page-head">
        <div className="mode-switch">
          <Link to={`/practice${modules.length ? `?modules=${modules.join(',')}` : ''}`}>
            <Icon name="pulse" /> Practice
          </Link>
          <Link to="/exam" className="on">
            <Icon name="exam" /> Exam
          </Link>
        </div>
        <h1>Test conditions</h1>
        <p>
          No hints, no rationales until the end — just you and the clock, like the real NCLEX. Afterward you’ll see exactly which question
          types, skills and topics are solid, which are shaky, and where your time went.
        </p>
      </header>

      <div className="builder">
        <div className="stack">
          <section className="card">
            <h3>Format</h3>
            <div className="preset-grid">
              {PRESETS.map((p) => (
                <motion.button key={p.id} type="button" className="mode" aria-pressed={preset === p.id} onClick={() => choose(p)} whileTap={{ scale: 0.97 }}>
                  <Icon name={p.icon} />
                  <b>{p.title}</b>
                  <span>{p.sub}</span>
                </motion.button>
              ))}
            </div>
          </section>

          <section className="card">
            <h3>Modules covered</h3>
            <div className="chips">
              <Chip on={!modules.length} onClick={() => setModules([])}>
                All modules
              </Chip>
              {MODULES.map((m) => (
                <Chip key={m.id} on={modules.includes(m.id)} color={m.color} onClick={() => setModules(toggleIn(modules, m.id))} count={m.questions.length}>
                  {m.number} · {m.title}
                </Chip>
              ))}
            </div>
          </section>

          <section className="card">
            <h3>Options</h3>
            <div className="stack">
              <label className="slider-label">
                <span>
                  Questions: <b>{n}</b> <span className="faint">of {pool.length} available</span>
                </span>
                <input
                  className="slider"
                  type="range"
                  min={5}
                  max={Math.max(5, Math.min(85, pool.length))}
                  value={n}
                  onChange={(e) => {
                    setCount(Number(e.target.value));
                    setPreset('custom');
                  }}
                />
              </label>
              <label className="toggle">
                <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} />
                Timed
              </label>
              {timed && (
                <label className="slider-label">
                  <span>
                    Time limit: <b>{minutes} min</b> <span className="faint">≈ {Math.round((minutes * 60) / Math.max(1, n))}s per question</span>
                  </span>
                  <input
                    className="slider"
                    type="range"
                    min={5}
                    max={180}
                    step={5}
                    value={minutes}
                    onChange={(e) => {
                      setMinutes(Number(e.target.value));
                      setPreset('custom');
                    }}
                  />
                </label>
              )}
              <label className="toggle">
                <input type="checkbox" checked={askConfidence} onChange={(e) => setAskConfidence(e.target.checked)} />
                <span>
                  Rate my confidence on each answer <span className="faint">— reveals lucky guesses in your report</span>
                </span>
              </label>
            </div>
          </section>
        </div>

        <aside className="builder-summary card">
          <span className="eyebrow">Exam mode</span>
          <div className="summary-count">
            <span className="big-num">{n}</span>
            <span className="muted">questions{timed ? ` · ${minutes} min` : ' · untimed'}</span>
          </div>
          <ul className="perks">
            <li>
              <Icon name="flag" /> Flag &amp; revisit any question
            </li>
            <li>
              <Icon name="x" /> No hints or rationales until you submit
            </li>
            <li>
              <Icon name="chart" /> Report by type, skill, topic &amp; pace
            </li>
          </ul>
          <motion.button className="btn btn-primary btn-lg btn-block" onClick={start} disabled={!n} whileTap={{ scale: 0.97 }}>
            <Icon name="play" /> Begin exam
          </motion.button>
          <p className="faint small" style={{ marginTop: 10 }}>
            Tip: NCLEX gives you about 1–1.5 minutes per question. Practice at that pace.
          </p>
        </aside>
      </div>
    </div>
  );
}
