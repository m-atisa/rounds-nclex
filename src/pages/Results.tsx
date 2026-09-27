import { motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MODULE_BY_ID, QUESTION_BY_ID } from '../data';
import type { Question } from '../data/types';
import { FORMAT_SHORT, formatOf } from '../data/types';
import { Icon } from '../components/Icon';
import { CaseLayout } from '../components/question/Exhibit';
import { QuestionBody, QuestionMeta } from '../components/question/QuestionView';
import { Feedback } from '../components/question/Support';
import { Bar, CountUp, Modal, Ring, celebrate, stagger } from '../components/ui';
import { groupStats, recommendations, type Dimension, type GroupStat, type PerfRecord } from '../lib/analytics';
import { PACE_SECONDS, classify, fragileReasons, isAnswered, scoreResponse, type Mastery } from '../lib/scoring';
import { createSession } from '../lib/session';
import { cx, fmtDuration, pct } from '../lib/util';
import { useProgress, type Session, type SessionItem } from '../store/progress';
import { NotFound } from './NotFound';

interface Row extends PerfRecord {
  i: number;
  item: SessionItem;
  answered: boolean;
}

const MASTERY_META: Record<Mastery, { label: string; color: string; desc: string }> = {
  mastered: { label: 'Mastered', color: 'var(--good)', desc: 'Correct, confident, on pace' },
  fragile: { label: 'Right but shaky', color: 'var(--warn)', desc: 'Correct, but slow, unsure or hinted' },
  missed: { label: 'Missed', color: 'var(--bad)', desc: 'Incorrect or partial credit' },
  skipped: { label: 'Unanswered', color: 'var(--ink-3)', desc: 'No answer given' },
};

const DIMS: { d: Dimension; label: string }[] = [
  { d: 'type', label: 'Question format' },
  { d: 'cjmm', label: 'Clinical judgment' },
  { d: 'focus', label: 'Nursing skill' },
  { d: 'topic', label: 'Topic' },
  { d: 'module', label: 'Module' },
];

export function buildRows(session: Session): Row[] {
  return session.qids
    .map((id, i) => {
      const q = QUESTION_BY_ID[id];
      const item = session.items[id];
      if (!q || !item) return null;
      const answered = isAnswered(item.response);
      const sc = scoreResponse(q, item.response);
      const correct = answered && sc.correct;
      return {
        i,
        q,
        item,
        answered,
        score: answered ? sc.score : 0,
        correct,
        ms: item.ms,
        mastery: classify({ q, answered, correct, ms: item.ms, hints: item.hints.length, confidence: item.confidence }),
      };
    })
    .filter((r): r is Row => r !== null);
}

export function Results() {
  const { id = '' } = useParams();
  const session = useProgress((s) => s.sessions.find((x) => x.id === id));
  const startSession = useProgress((s) => s.startSession);
  const navigate = useNavigate();
  const rows = useMemo(() => (session ? buildRows(session) : []), [session]);
  const [dim, setDim] = useState<Dimension>('type');
  const [open, setOpen] = useState<Row | null>(null);

  const score = rows.length ? rows.reduce((s, r) => s + r.score, 0) / rows.length : 0;
  useEffect(() => {
    if (score >= 0.8 && rows.length >= 3) setTimeout(() => celebrate(1), 600);
  }, [score, rows.length]);

  if (!session) return <NotFound />;
  const isExam = session.mode === 'exam';
  const scopeModules = [...new Set(rows.map((r) => r.q.moduleId))];
  const counts = { mastered: 0, fragile: 0, missed: 0, skipped: 0 } as Record<Mastery, number>;
  rows.forEach((r) => counts[r.mastery]++);
  const totalMs = rows.reduce((s, r) => s + r.ms, 0);
  const correct = rows.filter((r) => r.correct).length;
  const hints = rows.reduce((s, r) => s + r.item.hints.length, 0);
  const groups = groupStats(rows, dim, scopeModules);
  const recs = recommendations(rows, scopeModules, 3);
  const fragile = rows.filter((r) => r.mastery === 'fragile');
  const lucky = rows.filter((r) => r.correct && r.item.confidence === 'guess').length;
  const overconfident = rows.filter((r) => !r.correct && r.item.confidence === 'sure').length;

  const headline =
    score >= 0.9 ? 'Outstanding work' : score >= 0.8 ? 'Strong performance' : score >= 0.65 ? 'Solid foundation' : score >= 0.5 ? 'Keep building' : 'Every expert started here';
  const sub =
    score >= 0.8
      ? 'You’re thinking like a nurse. Lock it in by clearing the shaky ones below.'
      : score >= 0.6
        ? 'You’re close to the passing zone. Focused practice on your weak spots will move you fastest.'
        : 'This is exactly what practice is for. Review the rationales, then target the areas below.';

  const retryMissed = () => {
    const qs = rows.filter((r) => r.mastery !== 'mastered').map((r) => r.q);
    if (!qs.length) return;
    startSession(createSession(qs, { mode: 'practice', title: 'Review: missed & shaky' }));
    navigate('/session');
  };

  return (
    <div className="container">
      <nav className="crumbs">
        <Link to="/progress">Progress</Link> <Icon name="chevronRight" width={14} /> <span>{session.title}</span>
      </nav>

      <motion.section className="card results-hero" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <Ring value={score} size={170} stroke={9} className="ring-lg" color={score >= 0.8 ? 'var(--good)' : score >= 0.6 ? 'var(--brand)' : 'var(--accent)'}>
          <span>
            <CountUp to={Math.round(score * 100)} suffix="%" />
            <small>score</small>
          </span>
        </Ring>
        <div style={{ width: '100%' }}>
          <span className={cx('mode-tag', session.mode)}>{isExam ? 'Exam report' : 'Practice report'}</span>
          <h1>{headline}</h1>
          <p className="muted">{sub}</p>
          <div className="stat-row">
            <div className="stat">
              <b>
                {correct}/{rows.length}
              </b>
              <span>fully correct</span>
            </div>
            <div className="stat">
              <b>{fmtDuration(rows.length ? totalMs / rows.length : 0)}</b>
              <span>avg per question</span>
            </div>
            <div className="stat">
              <b>{fmtDuration(totalMs)}</b>
              <span>total time</span>
            </div>
            <div className="stat">
              <b>{isExam ? rows.filter((r) => r.item.flagged).length : hints}</b>
              <span>{isExam ? 'flagged' : 'hints used'}</span>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="section">
        <div className="mastery-strip" role="img" aria-label="Mastery breakdown">
          {(Object.keys(counts) as Mastery[])
            .filter((k) => counts[k])
            .map((k, i) => (
              <motion.span
                key={k}
                style={{ background: MASTERY_META[k].color }}
                initial={{ flexGrow: 0 }}
                animate={{ flexGrow: counts[k] }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              />
            ))}
        </div>
        <div className="mastery-legend">
          {(Object.keys(counts) as Mastery[]).map((k) =>
            counts[k] || k !== 'skipped' ? (
              <div key={k}>
                <i style={{ background: MASTERY_META[k].color }} />
                <b>{counts[k]}</b> {MASTERY_META[k].label}
                <small>{MASTERY_META[k].desc}</small>
              </div>
            ) : null,
          )}
        </div>
        {isExam && session.askConfidence && (lucky > 0 || overconfident > 0) && (
          <p className="calibration">
            <Icon name="target" width={16} />
            {lucky > 0 && (
              <span>
                <b>{lucky}</b> correct answer{lucky > 1 ? 's were' : ' was a'} guess{lucky > 1 ? 'es' : ''} — treat {lucky > 1 ? 'them' : 'it'} as not yet learned.{' '}
              </span>
            )}
            {overconfident > 0 && (
              <span>
                <b>{overconfident}</b> confident answer{overconfident > 1 ? 's were' : ' was'} wrong — these are misconceptions worth re-reading.
              </span>
            )}
          </p>
        )}
      </section>

      {recs.length > 0 && (
        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Recommended next</span>
              <h2>Where practice pays off most</h2>
            </div>
          </div>
          <motion.div className="grid grid-3" variants={stagger.container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {recs.map((g) => (
              <motion.div key={g.dim + g.key} variants={stagger.item} className="card rec-card">
                <span className="eyebrow">{DIMS.find((d) => d.d === g.dim)?.label}</span>
                <h3>{g.label}</h3>
                {g.sub && <p className="faint small">{g.sub}</p>}
                <p className="muted small">
                  {pct(g.acc)} accuracy · {g.n} question{g.n > 1 ? 's' : ''}
                  {g.fragile ? ` · ${g.fragile} shaky` : ''} · {fmtDuration(g.avgMs)} avg
                </p>
                <Link className="btn btn-primary btn-sm" to={`/practice?${g.practiceQuery}&pool=smart`}>
                  Practice this <Icon name="arrowRight" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Performance insights</span>
            <h2>Strengths &amp; gaps</h2>
          </div>
          <div className="seg" role="tablist">
            {DIMS.map((d) => (
              <button key={d.d} role="tab" aria-pressed={dim === d.d} onClick={() => setDim(d.d)}>
                {dim === d.d && <motion.span layoutId="dim-pill" className="seg-pill" />}
                <span>{d.label}</span>
              </button>
            ))}
          </div>
        </div>
        <InsightTable groups={groups} key={dim} />
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Pacing</span>
            <h2>Time on each question</h2>
          </div>
          <span className="faint small">Dashed line ≈ NCLEX pace for that item type. Tap a bar to review.</span>
        </div>
        <PaceChart rows={rows} onPick={setOpen} />
      </section>

      {fragile.length > 0 && (
        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Right, but shaky</span>
              <h2>You got these — but not solidly</h2>
            </div>
          </div>
          <div className="stack">
            {fragile.map((r) => (
              <ReviewItem key={r.q.id} r={r} onOpen={() => setOpen(r)} reasons={fragileReasons({ q: r.q, ms: r.ms, hints: r.item.hints.length, confidence: r.item.confidence })} />
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Review</span>
            <h2>Every question, with rationales</h2>
          </div>
        </div>
        <div className="stack">
          {rows.map((r) => (
            <ReviewItem key={r.q.id} r={r} onOpen={() => setOpen(r)} />
          ))}
        </div>
      </section>

      <div className="results-actions">
        {rows.some((r) => r.mastery !== 'mastered') && (
          <button className="btn btn-accent btn-lg" onClick={retryMissed}>
            <Icon name="refresh" /> Redo missed &amp; shaky
          </button>
        )}
        <Link className="btn btn-lg" to={isExam ? '/exam' : `/practice${session.source ? `?${session.source}` : ''}`}>
          {isExam ? 'New exam' : 'Practice again'}
        </Link>
        <Link className="btn btn-ghost btn-lg" to="/">
          Home
        </Link>
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} wide title={open && <span className="eyebrow">Question {open.i + 1}</span>}>
        {open && (
          <CaseLayout q={open.q}>
          <div className="q-card review" style={{ ['--mc' as string]: MODULE_BY_ID[open.q.moduleId]?.color }}>
            <QuestionMeta q={open.q} />
            <QuestionBody q={open.q} response={open.item.response} perm={open.item.perm} revealed locked onChange={() => {}} />
            <Feedback
              q={open.q}
              score={open.answered ? scoreResponse(open.q, open.item.response) : { score: 0, correct: false, earned: 0, possible: 1 }}
              extra={
                <div className="pace-note">
                  <span className="badge">
                    <Icon name="clock" width={13} /> {fmtDuration(open.ms)}
                  </span>
                  {open.item.confidence && <span className="badge">Confidence: {open.item.confidence}</span>}
                  {!open.answered && <span className="badge badge-bad">Not answered</span>}
                </div>
              }
            />
          </div>
          </CaseLayout>
        )}
      </Modal>
    </div>
  );
}

export function InsightTable({ groups }: { groups: GroupStat[] }) {
  if (!groups.length) return <p className="faint">No data yet.</p>;
  const verdictLabel = { strong: 'Strong', developing: 'Developing', weak: 'Needs work' };
  return (
    <motion.div className="insights card" variants={stagger.container} initial="hidden" animate="show">
      <div className="insight-head">
        <span>Area</span>
        <span>Accuracy</span>
        <span className="hide-sm">Avg time</span>
        <span className="hide-sm">Mastery</span>
        <span />
      </div>
      {groups.map((g) => (
        <motion.div key={g.key} className="insight-row" variants={stagger.item}>
          <div>
            <b>{g.label}</b>
            <small className="faint">
              {g.sub ? `${g.sub} · ` : ''}
              {g.n} question{g.n > 1 ? 's' : ''}
            </small>
          </div>
          <div className="insight-acc">
            <Bar value={g.acc} color={g.verdict === 'strong' ? 'var(--good)' : g.verdict === 'developing' ? 'var(--warn)' : 'var(--bad)'} />
            <span className="pct">{pct(g.acc)}</span>
          </div>
          <span className="hide-sm mono">{fmtDuration(g.avgMs)}</span>
          <span className="hide-sm mini-dots" title={`${g.mastered} mastered · ${g.fragile} shaky · ${g.missed} missed`}>
            {Array.from({ length: g.mastered }, (_, i) => <i key={`m${i}`} className="m" />)}
            {Array.from({ length: g.fragile }, (_, i) => <i key={`f${i}`} className="f" />)}
            {Array.from({ length: g.missed }, (_, i) => <i key={`x${i}`} className="x" />)}
          </span>
          <div className="insight-end">
            <span className={cx('badge', g.verdict === 'strong' ? 'badge-good' : g.verdict === 'developing' ? 'badge-warn' : 'badge-bad')}>{verdictLabel[g.verdict]}</span>
            {g.verdict !== 'strong' || g.fragile ? (
              <Link to={`/practice?${g.practiceQuery}`} className="btn btn-sm btn-ghost" aria-label={`Practice ${g.label}`}>
                <Icon name="play" />
              </Link>
            ) : (
              <span style={{ width: 36 }} />
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function PaceChart({ rows, onPick }: { rows: Row[]; onPick: (r: Row) => void }) {
  const max = Math.max(...rows.map((r) => Math.max(r.ms / 1000, PACE_SECONDS[r.q.type] * 1.3)), 30);
  return (
    <div className="pace-chart card">
      <div className="pace-bars">
        {rows.map((r, i) => {
          const h = (r.ms / 1000 / max) * 100;
          const pace = (PACE_SECONDS[r.q.type] / max) * 100;
          return (
            <button key={r.q.id} className="pace-col" onClick={() => onPick(r)} title={`Q${i + 1} · ${FORMAT_SHORT[formatOf(r.q)]} · ${fmtDuration(r.ms)} · ${MASTERY_META[r.mastery].label}`}>
              <span className="pace-line" style={{ bottom: `${pace}%` }} />
              <motion.span
                className="pace-bar"
                style={{ background: MASTERY_META[r.mastery].color }}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(2, h)}%` }}
                transition={{ delay: i * 0.02, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              />
              <span className="pace-x">{i + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ReviewItem({ r, onOpen, reasons }: { r: Row; onOpen: () => void; reasons?: string[] }) {
  const cls = r.mastery === 'mastered' ? 'good' : r.mastery === 'fragile' ? 'part' : 'bad';
  return (
    <button className="review-item" onClick={onOpen}>
      <span className={cx('review-dot', cls)}>
        <Icon name={r.correct ? 'check' : r.score > 0 ? 'minus' : 'x'} />
      </span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <p>
          <b>Q{r.i + 1}.</b> {stripTags(r.q.stem)}
        </p>
        <div className="row" style={{ gap: 6 }}>
          <RefChip q={r.q} />
          <span className="badge">{FORMAT_SHORT[formatOf(r.q)]}</span>
          <span className="badge">
            <Icon name="clock" width={12} /> {fmtDuration(r.ms)}
          </span>
          {reasons?.map((x) => (
            <span key={x} className="badge badge-warn">
              {x}
            </span>
          ))}
        </div>
      </div>
      <Icon name="chevronRight" width={18} className="faint" />
    </button>
  );
}

function RefChip({ q }: { q: Question }) {
  return (
    <span className="badge badge-ref" style={{ ['--mc' as string]: MODULE_BY_ID[q.moduleId]?.color }}>
      {q.ref}
    </span>
  );
}

export const stripTags = (s: string) => s.replace(/<[^>]+>/g, '');
