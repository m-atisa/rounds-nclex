import { motion } from 'motion/react';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MODULES, QUESTIONS } from '../data';
import { Icon, type IconName } from '../components/Icon';
import { CountUp, Ring, stagger } from '../components/ui';
import { emptyFilters, matchQuestions, recommendations, recordsFromAttempts, smartPick, statusOf, streak } from '../lib/analytics';
import { createSession } from '../lib/session';
import { useProgress } from '../store/progress';

const QUOTES = [
  { q: 'Let us never consider ourselves finished nurses… we must be learning all of our lives.', a: 'Florence Nightingale' },
  { q: 'I attribute my success to this: I never gave or took any excuse.', a: 'Florence Nightingale' },
  { q: 'Nurses are the heart of healthcare.', a: 'Donna Wilk Cardillo' },
  { q: 'Were there none who were discontented with what they have, the world would never reach anything better.', a: 'Florence Nightingale' },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Late-night study';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function ModuleGlyph({ icon }: { icon: IconName }) {
  return (
    <div className="module-glyph">
      <Icon name={icon} />
    </div>
  );
}

const caseCount = new Set(QUESTIONS.filter((q) => q.caseId).map((q) => q.caseId)).size;

export function Home() {
  const { attempts, days, active, startSession } = useProgress();
  const navigate = useNavigate();
  const records = useMemo(() => recordsFromAttempts(attempts), [attempts]);
  const answered = records.length;
  const accuracy = answered ? records.reduce((s, r) => s + r.score, 0) / answered : 0;
  const mastered = records.filter((r) => r.mastery === 'mastered').length;
  const days_ = streak(days);
  const rec = useMemo(() => recommendations(records, undefined, 1)[0], [records]);
  const quote = QUOTES[new Date().getDate() % QUOTES.length];

  const quick = (pool: 'smart' | 'weak') => {
    const f = { ...emptyFilters(), pool };
    const qs = smartPick(matchQuestions(f, attempts), attempts, 10);
    if (!qs.length) return navigate('/practice');
    startSession(createSession(qs, { mode: 'practice', title: pool === 'weak' ? 'Weak spots' : 'Quick 10', source: `pool=${pool}` }));
    navigate('/session');
  };

  const actions: { icon: IconName; title: string; sub: string; color: string; onClick?: () => void; to?: string }[] = [
    { icon: 'bolt', title: 'Quick 10', sub: 'Adaptive mix with hints and instant rationales', color: 'var(--brand)', onClick: () => quick('smart') },
    {
      icon: 'target',
      title: 'Weak spots',
      sub: answered ? 'Missed and right-but-shaky questions' : 'Unlocks once you’ve practiced',
      color: 'var(--m16)',
      onClick: () => (answered ? quick('weak') : navigate('/practice')),
    },
    { icon: 'clipboard', title: 'NGN case studies', sub: `${caseCount} unfolding cases with client charts`, color: 'var(--accent)', to: '/practice?cases=only' },
    { icon: 'exam', title: 'Timed exam', sub: 'Test conditions and a full performance report', color: 'var(--m15)', to: '/exam' },
  ];

  return (
    <div className="container">
      <motion.section className="hero" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}>
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow b" />
        <svg className="ecg" viewBox="0 0 1200 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60 H240 l18 -6 l12 6 H360 l10 -44 l14 84 l12 -56 l9 16 H560 l16 -8 l14 8 H760 l10 -44 l14 84 l12 -56 l9 16 H960 l16 -8 l14 8 H1200" />
        </svg>
        <span className="eyebrow">
          <span className="live-dot" /> {greeting()} · NCLEX-RN · NGN format
        </span>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
          Think like a nurse. <em>Pass like one.</em>
        </motion.h1>
        <motion.p className="lead" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.6 }}>
          {QUESTIONS.length} NCLEX-style questions — priority, single best answer, and select-all-that-apply, plus unfolding case studies with client charts — built from your course modules, with coaching hints and rationales that teach.
        </motion.p>
        <motion.div className="row" style={{ marginTop: '1.5rem' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.6 }}>
          <Link className="btn btn-primary btn-lg" to="/practice">
            Start practicing <Icon name="arrowRight" />
          </Link>
          <Link className="btn btn-ghost btn-lg" to="/learn">
            <Icon name="book" /> Study guides
          </Link>
        </motion.div>
        <div className="hero-stats">
          <div className="hero-stat">
            <b>
              <CountUp to={answered} />
            </b>
            <span>Questions answered</span>
          </div>
          <div className="hero-stat">
            <b>{answered ? <CountUp to={Math.round(accuracy * 100)} suffix="%" /> : '—'}</b>
            <span>Average score</span>
          </div>
          <div className="hero-stat">
            <b>
              <CountUp to={mastered} />
            </b>
            <span>Mastered</span>
          </div>
          <div className="hero-stat">
            <b>
              <CountUp to={days_} />
            </b>
            <span>Day streak</span>
          </div>
        </div>
      </motion.section>

      {active && (
        <motion.div className="resume card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="resume-icon">
            <Icon name={active.mode === 'exam' ? 'exam' : 'pulse'} />
          </div>
          <div>
            <b>Resume your session</b>
            <p className="muted small" style={{ margin: 0 }}>
              {active.title} · question {active.idx + 1} of {active.qids.length}
            </p>
          </div>
          <div className="spacer" />
          <Link to="/session" className="btn btn-primary">
            Resume <Icon name="arrowRight" />
          </Link>
        </motion.div>
      )}

      <motion.section className="section grid grid-4" variants={stagger.container} initial="hidden" animate="show">
        {actions.map((a) => {
          const inner = (
            <>
              <div className="action-icon" style={{ ['--c' as string]: a.color }}>
                <Icon name={a.icon} />
              </div>
              <span className="arrow-go">
                <Icon name="arrowRight" />
              </span>
              <div>
                <h3>{a.title}</h3>
                <p>{a.sub}</p>
              </div>
            </>
          );
          return (
            <motion.div key={a.title} variants={stagger.item}>
              {a.to ? (
                <Link to={a.to} className="card card-link action spot" style={{ ['--mc' as string]: a.color }}>
                  {inner}
                </Link>
              ) : (
                <button type="button" onClick={a.onClick} className="card card-link action as-button spot" style={{ ['--mc' as string]: a.color }}>
                  {inner}
                </button>
              )}
            </motion.div>
          );
        })}
      </motion.section>

      {rec && (
        <motion.section className="section" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="next-step card">
            <div>
              <span className="eyebrow">Recommended next</span>
              <h3>
                Strengthen <em>{rec.label}</em>
              </h3>
              <p className="muted small">
                {Math.round(rec.acc * 100)}% across {rec.n} question{rec.n === 1 ? '' : 's'}
                {rec.fragile ? ` · ${rec.fragile} correct but shaky` : ''}. A focused set here will move your score the most.
              </p>
            </div>
            <Link className="btn btn-primary" to={`/practice?${rec.practiceQuery}`}>
              Practice this <Icon name="arrowRight" />
            </Link>
          </div>
        </motion.section>
      )}

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Curriculum</span>
            <h2>Concepts &amp; exemplars</h2>
          </div>
          <Link to="/learn" className="btn btn-ghost btn-sm">
            All study guides <Icon name="arrowRight" />
          </Link>
        </div>
        <motion.div className="grid grid-2" variants={stagger.container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {MODULES.map((m) => {
            const mm = m.questions.filter((q) => statusOf(attempts, q.id) === 'mastered').length;
            const seen = m.questions.filter((q) => statusOf(attempts, q.id) !== 'new').length;
            const pct = mm / Math.max(1, m.questions.length);
            return (
              <motion.div key={m.id} variants={stagger.item}>
                <Link to={`/learn/${m.id}`} className="card card-link module-card spot" style={{ ['--mc' as string]: m.color }}>
                  <div className="module-card-top">
                    <ModuleGlyph icon={m.icon} />
                    <Ring value={pct} color={m.color} size={48} stroke={8}>
                      {Math.round(pct * 100)}
                    </Ring>
                  </div>
                  <div className="module-num">MODULE {m.number}</div>
                  <h3>{m.title}</h3>
                  <p>{m.tagline}</p>
                  <div className="module-meta">
                    <span>
                      <b>{m.topics.length}</b> topics
                    </span>
                    <span>
                      <b>{m.questions.length}</b> questions
                    </span>
                    <span>
                      <b>{seen}</b> attempted
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <motion.section className="section card quote" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="quote-mark">“</span>
        <div>
          <blockquote>{quote.q}</blockquote>
          <cite>— {quote.a}</cite>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

export function Footer() {
  return (
    <p className="foot">
      Rounds is an independent study aid for concept-based nursing students. Content is original and research-informed but does not replace
      your textbook, instructors, or facility policy. Not affiliated with NCSBN or Pearson.
    </p>
  );
}
