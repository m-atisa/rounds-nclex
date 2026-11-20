import { motion, useScroll, useSpring } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { MODULE_BY_ID, UNGROUPED_MODULES, UNITS, UNIT_BY_SLUG, readingMinutes, topicKey, unitModules, unitOf } from '../data';
import type { Module, Topic } from '../data/types';
import { Icon } from '../components/Icon';
import { TopicArticle, sectionId } from '../components/TopicArticle';
import { useEffect, useState } from 'react';
import { statusOf } from '../lib/analytics';
import { cx } from '../lib/util';
import { useProgress } from '../store/progress';
import { Footer } from './Home';
import { NotFound } from './NotFound';
import { NewBadge } from '../components/UnitOverview';

export function ModuleCard({ m }: { m: Module; label?: string }) {
  const read = useProgress((s) => s.read);
  const done = m.topics.filter((t) => read[topicKey(m.id, t.id)]).length;
  return (
    <Link to={`/learn/${m.id}`} className="row-link">
      <div className="row-main">
        <span className="row-kicker">
          Module {m.number}
        </span>
        <strong>{m.title}</strong>
        <span className="row-sub">
          {m.topics.length} lesson{m.topics.length === 1 ? '' : 's'} · {m.questions.length} questions · {done}/{m.topics.length} read
        </span>
      </div>
      <div className="row-progress" aria-hidden="true">
        <i style={{ width: `${(done / Math.max(1, m.topics.length)) * 100}%` }} />
      </div>
      <Icon name="chevronRight" className="row-chev" />
    </Link>
  );
}

export function Learn() {
  return (
    <div className="container">
      <header className="page-head">
        <span className="eyebrow">Learn</span>
        <h1>Lessons</h1>
        <p>Plain-language lessons built from your course slides and study guides. Each one ends with questions you can practice.</p>
      </header>
      {UNITS.map((u) => (
        <section className={cx('section unit-section', u.isNew && 'is-new-section')} key={u.slug} aria-label={u.title}>
          <div className="section-head">
            <div>
              <span className="eyebrow">{u.eyebrow}</span>
              <h2>{u.title}</h2>
            </div>
            <Link to={`/learn/${u.slug}`} className="btn btn-ghost btn-sm">
              {u.label} overview <Icon name="arrowRight" />
            </Link>
          </div>
          <ul className="row-list">
            {unitModules(u).map((m) => (
              <li key={m.id}>
                <ModuleCard m={m} />
              </li>
            ))}
          </ul>
        </section>
      ))}
      {UNGROUPED_MODULES.length > 0 && (
        <section className="section">
          <div className="section-head"><h2>More modules</h2></div>
          <div className="grid grid-2">
            {UNGROUPED_MODULES.map((m) => (
              <ModuleCard key={m.id} m={m} />
            ))}
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}

export function UnitPage({ slug }: { slug: string }) {
  const unit = UNIT_BY_SLUG[slug];
  if (!unit) return <NotFound />;
  const mods = unitModules(unit);
  const query = `modules=${unit.moduleIds.join(',')}`;
  const topics = mods.flatMap((m) => m.topics);
  const questions = mods.flatMap((m) => m.questions);
  const firstLesson = mods[0]?.topics[0];
  return (
    <div className="container">
      <nav className="crumbs"><Link to="/learn">Learn</Link><Icon name="chevronRight" width={14} /><span>{unit.label}</span></nav>
      <header className="page-head plain-head">
        <span className="eyebrow">{unit.eyebrow} {unit.isNew && <NewBadge />}</span>
        <h1>{unit.title}</h1>
        <p>{unit.overview}</p>
        <div className="head-actions">
          {firstLesson && <Link className="btn btn-primary" to={`/learn/${mods[0].id}/${firstLesson.id}`}>Start the first lesson</Link>}
          <Link className="btn" to={`/practice?${query}`}>Practice this unit</Link>
          <Link className="text-link" to={`/flashcards?${query}`}>Flashcards</Link>
          <Link className="text-link" to={`/exam?${query}`}>Unit exam</Link>
        </div>
        <p className="head-meta">{mods.length} modules · {topics.length} lessons · {questions.length} questions</p>
      </header>
      <section className="section">
        <h2 className="list-title">Modules</h2>
        <ul className="row-list">
          {mods.map((m) => (
            <li key={m.id}><ModuleCard m={m} /></li>
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
}

function UnitCrumb({ moduleId }: { moduleId: string }) {
  const u = unitOf(moduleId);
  if (!u) return null;
  return (
    <>
      <Link to={`/learn/${u.slug}`}>{u.label}</Link>
      <Icon name="chevronRight" width={14} />
    </>
  );
}

function groupTopics(m: Module) {
  const groups = new Map<string, Topic[]>();
  m.topics.forEach((t) => {
    const k = t.exemplar ? `Exemplar ${t.exemplar}` : 'The concept';
    groups.set(k, [...(groups.get(k) ?? []), t]);
  });
  return [...groups.entries()];
}

export function ModulePage() {
  const { moduleId = '' } = useParams();
  const m = MODULE_BY_ID[moduleId];
  const { read, attempts } = useProgress();
  if (!m) return <NotFound />;
  const mastered = m.questions.filter((q) => statusOf(attempts, q.id) === 'mastered').length;
  const nextLesson = m.topics.find((t) => !read[topicKey(m.id, t.id)]) ?? m.topics[0];
  let idx = 0;
  return (
    <div className="container">
      <nav className="crumbs">
        <Link to="/learn">Learn</Link> <Icon name="chevronRight" width={14} />
        <UnitCrumb moduleId={m.id} />
        <span>Module {m.number}</span>
      </nav>
      <header className="page-head plain-head">
        <span className="eyebrow">Module {m.number}</span>
        <h1>{m.title}</h1>
        <p>{m.overview || m.tagline}</p>
        <div className="head-actions">
          {nextLesson && (
            <Link className="btn btn-primary" to={`/learn/${m.id}/${nextLesson.id}`}>
              {read[topicKey(m.id, nextLesson.id)] ? 'Review lessons' : m.topics.some((t) => read[topicKey(m.id, t.id)]) ? 'Continue reading' : 'Start the first lesson'}
            </Link>
          )}
          <Link className="btn" to={`/practice?modules=${m.id}`}>Practice this module</Link>
          <Link className="text-link" to={`/flashcards?modules=${m.id}`}>Flashcards</Link>
          <Link className="text-link" to={`/exam?modules=${m.id}`}>Module exam</Link>
        </div>
        <p className="head-meta">
          {m.topics.filter((t) => read[topicKey(m.id, t.id)]).length}/{m.topics.length} lessons read · {mastered}/{m.questions.length} questions mastered
        </p>
      </header>

      {groupTopics(m).map(([group, topics]) => (
        <section className="section" key={group}>
          <h2 className="list-title">{group}</h2>
          <ol className="row-list lesson-list">
            {topics.map((t) => {
              idx++;
              const done = !!read[topicKey(m.id, t.id)];
              const n = m.questions.filter((q) => q.topic === t.id).length;
              return (
                <li key={t.id}>
                  <Link to={`/learn/${m.id}/${t.id}`} className={cx('row-link', done && 'done')}>
                    <span className="row-num">{done ? <Icon name="check" width={16} /> : idx}</span>
                    <div className="row-main">
                      <strong>{t.title}</strong>
                      <span className="row-sub">{t.summary ? t.summary.replace(/<[^>]+>/g, '') : ''}</span>
                      <span className="row-meta">{readingMinutes(t)} min read{n ? ` · ${n} questions` : ''}</span>
                    </div>
                    <Icon name="chevronRight" className="row-chev" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
      <Footer />
    </div>
  );
}

export function TopicPage() {
  const { moduleId = '', topicId = '' } = useParams();
  const m = MODULE_BY_ID[moduleId];
  const { read, markRead, setLastTopic } = useProgress();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const topic = m?.topics.find((t) => t.id === topicId);
  const [activeSec, setActiveSec] = useState(-1);
  const key = topic ? topicKey(m.id, topic.id) : '';
  useEffect(() => {
    if (key) setLastTopic(key);
  }, [key, setLastTopic]);
  useEffect(() => {
    if (!topic) return;
    setActiveSec(-1);
    const els = (topic.sections ?? []).map((_, i) => document.getElementById(sectionId(i))).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vis) setActiveSec(Number(vis.target.id.replace('sec-', '')));
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [topic]);
  if (!m || !topic) return <NotFound />;
  const i = m.topics.indexOf(topic);
  const prev = m.topics[i - 1];
  const next = m.topics[i + 1];
  const n = m.questions.filter((q) => q.topic === topic.id).length;
  const go = (j: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(sectionId(j))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const parts = (topic.sections ?? []).map((s, j) => ({ s, j })).filter((x) => x.s.heading);
  return (
    <div className="container lesson-page">
      <motion.div className="read-progress" style={{ scaleX: progress }} />
      <nav className="crumbs">
        <Link to="/learn">Learn</Link> <Icon name="chevronRight" width={14} />
        <UnitCrumb moduleId={m.id} />
        <Link to={`/learn/${m.id}`}>
          Module {m.number} · {m.title}
        </Link>
      </nav>
      <div className="lesson-layout">
        <div className="lesson-main">
          <details className="lesson-switch">
            <summary>
              Lesson {i + 1} of {m.topics.length} in Module {m.number}
            </summary>
            <ol>
              {m.topics.map((t, k) => (
                <li key={t.id}>
                  <Link to={`/learn/${m.id}/${t.id}`} className={cx(t.id === topic.id && 'current')}>
                    <span className="ls-n">{read[topicKey(m.id, t.id)] ? <Icon name="check" width={13} /> : k + 1}</span>
                    {t.title}
                  </Link>
                </li>
              ))}
            </ol>
          </details>
          <TopicArticle moduleId={m.id} topic={topic} />
          <motion.div onViewportEnter={() => markRead(key)} viewport={{ once: true }} />
          <div className="lesson-end">
            <h2>You finished this lesson</h2>
            <p>Now answer a few questions on it — that is where it sticks.</p>
            <div className="head-actions">
              {n > 0 && (
                <Link className="btn btn-primary" to={`/practice?modules=${m.id}&topics=${key}`}>
                  Practice this lesson ({n} questions)
                </Link>
              )}
              {next ? (
                <Link className="btn" to={`/learn/${m.id}/${next.id}`}>
                  Next lesson: {next.title}
                </Link>
              ) : (
                <Link className="btn" to={`/learn/${m.id}`}>
                  Back to Module {m.number}
                </Link>
              )}
              <Link className="text-link" to={`/flashcards?modules=${m.id}&topics=${topic.id}`}>
                Flashcards
              </Link>
            </div>
            {prev && (
              <p className="faint small">
                Previous: <Link to={`/learn/${m.id}/${prev.id}`}>{prev.title}</Link>
              </p>
            )}
          </div>
        </div>
        <aside className="on-page" aria-label="On this page">
          <span className="on-page-title">On this page</span>
          <ol>
            {parts.map(({ s, j }) => (
              <li key={j}>
                <a href={`#${sectionId(j)}`} onClick={go(j)} className={cx(activeSec === j && 'on')}>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
          {n > 0 && (
            <Link className="btn btn-sm on-page-cta" to={`/practice?modules=${m.id}&topics=${key}`}>
              Practice this lesson
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}
