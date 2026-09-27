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
  { q: 'Rough seas make better sailors. Hard questions make better nurses.', a: 'Every clinical instructor, ever' },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Burning the midnight oil';
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

export function Home() {
  const { attempts, days, active, startSession } = useProgress();
  const navigate = useNavigate();
  const records = useMemo(() => recordsFromAttempts(attempts), [attempts]);
  const answered = records.length;
  const accuracy = answered ? records.reduce((s, r) => s + r.score, 0) / answered : 0;
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
    { icon: 'bolt', title: 'Quick 10', sub: 'Smart mix, instant rationales', color: 'var(--brand)', onClick: () => quick('smart') },
    {
      icon: 'target',
      title: 'Weak spots',
      sub: answered ? 'Missed + shaky questions' : 'Unlocks after you practice',
      color: 'var(--accent)',
      onClick: () => (answered ? quick('weak') : navigate('/practice')),
    },
    { icon: 'exam', title: 'Timed exam', sub: 'NCLEX-style, no hints', color: 'var(--m21)', to: '/exam' },
    { icon: 'cards', title: 'Flashcards', sub: `${MODULES.reduce((s, m) => s + m.flashcards.length, 0)} cards to flip`, color: 'var(--m15)', to: '/flashcards' },
  ];

  return (
    <div className="container">
      <motion.section className="hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <svg className="ecg" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 70 H260 l20 -8 l14 8 H380 l12 -52 l16 96 l14 -64 l10 20 H560 l18 -10 l16 10 H760 l12 -52 l16 96 l14 -64 l10 20 H960 l18 -10 l16 10 H1200" />
        </svg>
        <span className="eyebrow">
          {greeting()} · {QUESTIONS.length} NCLEX-style questions
        </span>
        <h1>
          Think like a nurse. <em>Pass like one.</em>
        </h1>
        <p className="lead">
          Learn the concept, then prove it with clinical-judgment questions written the way NCLEX item writers build them — with hints when
          you need a nudge and rationales that teach.
        </p>
        <div className="row" style={{ marginTop: 22 }}>
          <Link className="btn btn-primary btn-lg" to="/practice">
            <Icon name="play" /> Start practicing
          </Link>
          <Link className="btn btn-ghost btn-lg" to="/learn">
            <Icon name="book" /> Study the modules
          </Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <b>
              <CountUp to={answered} />
            </b>
            <span>questions answered</span>
          </div>
          <div className="hero-stat">
            <b>{answered ? <CountUp to={Math.round(accuracy * 100)} suffix="%" /> : '—'}</b>
            <span>accuracy</span>
          </div>
          <div className="hero-stat">
            <b>
              <CountUp to={days_} />
              <span className="flame">{days_ > 0 ? ' 🔥' : ''}</span>
            </b>
            <span>day streak</span>
          </div>
        </div>
      </motion.section>

      {active && (
        <motion.div className="resume card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="action-icon" style={{ ['--c' as string]: 'var(--accent)' }}>
            <Icon name={active.mode === 'exam' ? 'exam' : 'pulse'} />
          </div>
          <div>
            <b>Pick up where you left off</b>
            <p className="muted" style={{ margin: 0 }}>
              {active.title} · question {active.idx + 1} of {active.qids.length}
            </p>
          </div>
          <div className="spacer" />
          <Link to="/session" className="btn btn-accent">
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
              <div>
                <h3>{a.title}</h3>
                <p>{a.sub}</p>
              </div>
            </>
          );
          return (
            <motion.div key={a.title} variants={stagger.item}>
              {a.to ? (
                <Link to={a.to} className="card card-link action">
                  {inner}
                </Link>
              ) : (
                <button type="button" onClick={a.onClick} className="card card-link action as-button">
                  {inner}
                </button>
              )}
            </motion.div>
          );
        })}
      </motion.section>

      {rec && (
        <motion.section className="section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="next-step card">
            <div>
              <span className="eyebrow">Your next best step</span>
              <h3>
                Strengthen <em>{rec.label}</em>
              </h3>
              <p className="muted">
                {Math.round(rec.acc * 100)}% accuracy across {rec.n} question{rec.n === 1 ? '' : 's'}
                {rec.fragile ? ` · ${rec.fragile} right-but-shaky` : ''}. A focused set here will move your score the most.
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
            <span className="eyebrow">Your modules</span>
            <h2>Concepts &amp; exemplars</h2>
          </div>
          <Link to="/learn" className="btn btn-ghost btn-sm">
            All study guides <Icon name="arrowRight" />
          </Link>
        </div>
        <motion.div
          className="grid grid-2"
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {MODULES.map((m) => {
            const mastered = m.questions.filter((q) => statusOf(attempts, q.id) === 'mastered').length;
            const seen = m.questions.filter((q) => statusOf(attempts, q.id) !== 'new').length;
            return (
              <motion.div key={m.id} variants={stagger.item}>
                <Link to={`/learn/${m.id}`} className="card card-link module-card" style={{ ['--mc' as string]: m.color }}>
                  <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <ModuleGlyph icon={m.icon} />
                    <Ring value={mastered / Math.max(1, m.questions.length)} color={m.color}>
                      {Math.round((mastered / Math.max(1, m.questions.length)) * 100)}%
                    </Ring>
                  </div>
                  <div className="module-num">MODULE {m.number}</div>
                  <h3>{m.title}</h3>
                  <p>{m.tagline}</p>
                  <div className="module-meta">
                    <span>{m.topics.length} topics</span>
                    <span>{m.questions.length} questions</span>
                    <span>{seen} attempted</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <motion.section className="section" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="quote">
          <span className="quote-mark">“</span>
          <div>
            <blockquote>{quote.q}</blockquote>
            <cite>— {quote.a}</cite>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

export function Footer() {
  return (
    <p className="foot">
      Rounds is an independent study aid for concept-based nursing students. Content is original and research-informed but is not a
      substitute for your textbook, instructors, or facility policy. Not affiliated with NCSBN or any publisher.
    </p>
  );
}
