import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MODULE_BY_ID, UNITS, getTopic, unitModules } from '../data';
import { NewBadge } from '../components/UnitOverview';
import { Icon, type IconName } from '../components/Icon';
import { emptyFilters, matchQuestions, recommendations, recordsFromAttempts, smartPick, statusOf, streak } from '../lib/analytics';
import { createSession } from '../lib/session';
import { useProgress } from '../store/progress';

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


export function Home() {
  const { attempts, days, active, startSession, lastTopic, read } = useProgress();
  const navigate = useNavigate();
  const records = useMemo(() => recordsFromAttempts(attempts), [attempts]);
  const answered = records.length;
  const accuracy = answered ? records.reduce((s, r) => s + r.score, 0) / answered : 0;
  const mastered = records.filter((r) => r.mastery === 'mastered').length;
  const days_ = streak(days);
  const rec = useMemo(() => recommendations(records, undefined, 1)[0], [records]);
  const [lastMid, lastTid] = (lastTopic ?? '').split(':');
  const lastT = lastTopic ? getTopic(lastMid, lastTid) : undefined;
  const lastM = lastT ? MODULE_BY_ID[lastMid] : undefined;
  const firstUnit = UNITS[0];

  const quick = (pool: 'smart' | 'weak') => {
    const f = { ...emptyFilters(), pool };
    const qs = smartPick(matchQuestions(f, attempts), attempts, 10);
    if (!qs.length) return navigate('/practice');
    startSession(createSession(qs, { mode: 'practice', title: pool === 'weak' ? 'Weak spots' : 'Quick 10', source: `pool=${pool}` }));
    navigate('/session');
  };

  let next: { label: string; title: string; detail: string; to: string; cta: string };
  if (active) next = { label: 'Pick up where you left off', title: active.title, detail: `Question ${active.idx + 1} of ${active.qids.length}`, to: '/session', cta: 'Resume session' };
  else if (lastT && lastM) next = { label: 'Continue reading', title: lastT.title, detail: `Module ${lastM.number} · ${lastM.title}`, to: `/learn/${lastMid}/${lastTid}`, cta: 'Open lesson' };
  else next = { label: 'Start here', title: firstUnit.title, detail: `${firstUnit.label} · read a lesson, then practice its questions`, to: `/learn/${firstUnit.slug}`, cta: `Open ${firstUnit.label}` };

  return (
    <div className="container home">
      <header className="home-head">
        <p className="eyebrow">{greeting()}</p>
        <h1>What would you like to study today?</h1>
      </header>

      <Link to={next.to} className="next-up">
        <div>
          <span className="next-label">{next.label}</span>
          <strong className="next-title">{next.title}</strong>
          <span className="next-detail">{next.detail}</span>
        </div>
        <span className="btn btn-primary">
          {next.cta} <Icon name="arrowRight" />
        </span>
      </Link>

      <div className="quick-actions">
        <button type="button" className="quick" onClick={() => quick('smart')}>
          <b>Quick 10</b>
          <span>A mixed set with hints and rationales</span>
        </button>
        <button type="button" className="quick" onClick={() => (answered ? quick('weak') : navigate('/practice'))}>
          <b>{answered ? 'Review weak spots' : 'Choose a topic'}</b>
          <span>{answered ? 'Questions you missed or guessed' : 'Pick a module or lesson to practice'}</span>
        </button>
        <Link className="quick" to="/exam">
          <b>Timed exam</b>
          <span>No hints, a clock, and a full report</span>
        </Link>
      </div>

      {rec && (
        <p className="home-tip">
          Suggested next: strengthen <Link to={`/practice?${rec.practiceQuery}`}>{rec.label}</Link> ({Math.round(rec.acc * 100)}% across {rec.n} question{rec.n === 1 ? '' : 's'}).
        </p>
      )}

      <section className="section">
        <div className="section-head">
          <h2>Your units</h2>
          <Link to="/learn" className="text-link">
            All lessons <Icon name="arrowRight" />
          </Link>
        </div>
        <ul className="row-list">
          {UNITS.map((u) => {
            const mods = unitModules(u);
            const topics = mods.flatMap((m) => m.topics.map((t) => `${m.id}:${t.id}`));
            const done = topics.filter((k) => read[k]).length;
            const qs = mods.flatMap((m) => m.questions);
            const mm = qs.filter((q) => statusOf(attempts, q.id) === 'mastered').length;
            return (
              <li key={u.slug}>
                <Link to={`/learn/${u.slug}`} className="row-link">
                  <div className="row-main">
                    <span className="row-kicker">
                      {u.eyebrow} {u.isNew && <NewBadge />}
                    </span>
                    <strong>{u.title}</strong>
                    <span className="row-sub">
                      {done}/{topics.length} lessons read · {mm}/{qs.length} questions mastered
                    </span>
                  </div>
                  <div className="row-progress" aria-hidden="true">
                    <i style={{ width: `${(done / Math.max(1, topics.length)) * 100}%` }} />
                  </div>
                  <Icon name="chevronRight" className="row-chev" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {answered > 0 && (
        <p className="home-stats">
          {answered} answered · {Math.round(accuracy * 100)}% average · {mastered} mastered{days_ ? ` · ${days_}-day streak` : ''} · <Link to="/progress">See progress</Link>
        </p>
      )}
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
