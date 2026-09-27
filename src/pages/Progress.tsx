import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MODULES, QUESTIONS, topicKey } from '../data';
import { Icon } from '../components/Icon';
import { Bar, CountUp, Modal, Ring, stagger, toast } from '../components/ui';
import { groupStats, recordsFromAttempts, statusOf, streak, type Dimension } from '../lib/analytics';
import { dayKey, fmtDuration, pct } from '../lib/util';
import { useProgress } from '../store/progress';
import { InsightTable, buildRows } from './Results';

const DIMS: { d: Dimension; label: string }[] = [
  { d: 'type', label: 'Question type' },
  { d: 'cjmm', label: 'Clinical judgment' },
  { d: 'focus', label: 'Nursing skill' },
  { d: 'topic', label: 'Topic' },
];

export function ProgressPage() {
  const { attempts, days, sessions, read, reset } = useProgress();
  const records = useMemo(() => recordsFromAttempts(attempts), [attempts]);
  const [dim, setDim] = useState<Dimension>('focus');
  const [confirm, setConfirm] = useState(false);

  const answered = records.length;
  const acc = answered ? records.reduce((s, r) => s + r.score, 0) / answered : 0;
  const mastered = records.filter((r) => r.mastery === 'mastered').length;
  const totalMs = Object.values(days).reduce((s, d) => s + d.ms, 0);

  const weeks = 18;
  const cells = useMemo(() => {
    const out: { key: string; q: number }[] = [];
    const d = new Date();
    d.setDate(d.getDate() - (weeks * 7 - 1) - d.getDay());
    for (let i = 0; i < weeks * 7; i++) {
      const k = dayKey(d);
      out.push({ key: k, q: days[k]?.q ?? 0 });
      d.setDate(d.getDate() + 1);
    }
    return out;
  }, [days]);
  const level = (q: number) => (q === 0 ? 0 : q < 5 ? 1 : q < 15 ? 2 : q < 30 ? 3 : 4);

  return (
    <div className="container">
      <header className="page-head">
        <span className="eyebrow">Progress</span>
        <h1>Your clinical judgment, charted</h1>
        <p>Built from your most recent attempt at each question. Progress is saved in this browser.</p>
      </header>

      <motion.div className="kpis" variants={stagger.container} initial="hidden" animate="show">
        {[
          { v: answered, label: `of ${QUESTIONS.length} questions attempted` },
          { v: Math.round(acc * 100), suffix: '%', label: 'average score' },
          { v: mastered, label: 'questions mastered' },
          { v: streak(days), label: 'day streak', extra: streak(days) ? ' 🔥' : '' },
        ].map((k) => (
          <motion.div key={k.label} className="card kpi" variants={stagger.item}>
            <b>
              <CountUp to={k.v} suffix={k.suffix} />
              {k.extra}
            </b>
            <span>{k.label}</span>
          </motion.div>
        ))}
      </motion.div>

      <section className="section card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Activity</span>
            <h3 style={{ margin: 0 }}>Last {weeks} weeks</h3>
          </div>
          <span className="faint small">{fmtDuration(totalMs)} of focused practice</span>
        </div>
        <div className="heat-wrap">
          <div className="heat" style={{ gridTemplateRows: 'repeat(7, 14px)', gridAutoFlow: 'column' }}>
            {cells.map((c, i) => (
              <motion.i
                key={c.key}
                data-l={level(c.q)}
                title={`${c.key}: ${c.q} question${c.q === 1 ? '' : 's'}`}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.003 }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>By module</h2>
        </div>
        <div className="grid grid-2">
          {MODULES.map((m) => {
            const seen = m.questions.filter((q) => statusOf(attempts, q.id) !== 'new');
            const recs = records.filter((r) => r.q.moduleId === m.id);
            const a = recs.length ? recs.reduce((s, r) => s + r.score, 0) / recs.length : 0;
            const mm = m.questions.filter((q) => statusOf(attempts, q.id) === 'mastered').length;
            const rd = m.topics.filter((t) => read[topicKey(m.id, t.id)]).length;
            return (
              <div key={m.id} className="card module-progress" style={{ ['--mc' as string]: m.color }}>
                <Ring value={mm / m.questions.length} color={m.color} size={72} stroke={8}>
                  {pct(mm / m.questions.length)}
                </Ring>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="module-num">MODULE {m.number}</span>
                  <h3 style={{ margin: '2px 0 10px' }}>{m.title}</h3>
                  <div className="mini-stat">
                    <span>Attempted</span>
                    <Bar value={seen.length / m.questions.length} color={m.color} />
                    <b>
                      {seen.length}/{m.questions.length}
                    </b>
                  </div>
                  <div className="mini-stat">
                    <span>Accuracy</span>
                    <Bar value={a} color={m.color} />
                    <b>{recs.length ? pct(a) : '—'}</b>
                  </div>
                  <div className="mini-stat">
                    <span>Topics read</span>
                    <Bar value={rd / m.topics.length} color={m.color} />
                    <b>
                      {rd}/{m.topics.length}
                    </b>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Skills</span>
            <h2>Where you’re strong — and where to aim</h2>
          </div>
          <div className="seg" role="tablist">
            {DIMS.map((d) => (
              <button key={d.d} role="tab" aria-pressed={dim === d.d} onClick={() => setDim(d.d)}>
                {dim === d.d && <motion.span layoutId="prog-pill" className="seg-pill" />}
                <span>{d.label}</span>
              </button>
            ))}
          </div>
        </div>
        {records.length ? (
          <InsightTable key={dim} groups={groupStats(records, dim)} />
        ) : (
          <div className="card empty">
            <Icon name="chart" />
            <p>Answer a few questions and your skill map will appear here.</p>
            <Link to="/practice" className="btn btn-primary">
              Start practicing
            </Link>
          </div>
        )}
      </section>

      {sessions.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Session history</h2>
          </div>
          <div className="stack">
            {sessions.map((s) => {
              const rows = buildRows(s);
              const sc = rows.length ? rows.reduce((a, r) => a + r.score, 0) / rows.length : 0;
              return (
                <Link key={s.id} to={`/results/${s.id}`} className="review-item">
                  <Ring value={sc} size={44} stroke={9} color={sc >= 0.8 ? 'var(--good)' : sc >= 0.6 ? 'var(--brand)' : 'var(--accent)'}>
                    <span style={{ fontSize: '.7rem' }}>{Math.round(sc * 100)}</span>
                  </Ring>
                  <div style={{ flex: 1 }}>
                    <b>{s.title}</b>
                    <div className="faint small">
                      <span className={`mode-tag ${s.mode}`}>{s.mode}</span> {new Date(s.finishedAt ?? s.created).toLocaleString()} · {rows.length} questions
                    </div>
                  </div>
                  <Icon name="chevronRight" width={18} />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="section" style={{ textAlign: 'center' }}>
        <button className="btn btn-ghost danger" onClick={() => setConfirm(true)}>
          <Icon name="trash" /> Reset all progress
        </button>
      </section>

      <Modal open={confirm} onClose={() => setConfirm(false)} title={<b>Reset all progress?</b>}>
        <p className="muted">This permanently clears your attempts, sessions, flashcard history and streak in this browser.</p>
        <div className="row">
          <button className="btn" onClick={() => setConfirm(false)}>
            Cancel
          </button>
          <div className="spacer" />
          <button
            className="btn btn-accent"
            onClick={() => {
              reset();
              setConfirm(false);
              toast('Progress reset');
            }}
          >
            Reset everything
          </button>
        </div>
      </Modal>
    </div>
  );
}
