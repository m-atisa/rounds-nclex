import { motion, useScroll, useSpring } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { MODULE_BY_ID, UNGROUPED_MODULES, UNITS, UNIT_BY_SLUG, isNewModule, readingMinutes, topicKey, unitModules, unitOf } from '../data';
import type { Module, Topic } from '../data/types';
import { Icon } from '../components/Icon';
import { TopicArticle } from '../components/TopicArticle';
import { Bar, stagger } from '../components/ui';
import { statusOf } from '../lib/analytics';
import { cx } from '../lib/util';
import { useProgress } from '../store/progress';
import { Footer, ModuleGlyph } from './Home';
import { NotFound } from './NotFound';
import { NewBadge } from '../components/UnitOverview';

export function ModuleCard({ m, label }: { m: Module; label?: string }) {
  const read = useProgress((s) => s.read);
  const done = m.topics.filter((t) => read[topicKey(m.id, t.id)]).length;
  const fresh = isNewModule(m.id);
  return (
    <Link to={`/learn/${m.id}`} className={cx('card card-link module-card', fresh && 'is-new')} style={{ ['--mc' as string]: m.color }}>
      {fresh && <NewBadge />}
      <ModuleGlyph icon={m.icon} />
      <div className="module-num" style={{ marginTop: 14 }}>
        {label ? `${label.toUpperCase()} · ` : ''}MODULE {m.number}
      </div>
      <h3>{m.title}</h3>
      <p>{m.overview || m.tagline}</p>
      <div className="module-meta">
        <span><b>{m.topics.length}</b> lessons</span>
        <span><b>{m.questions.length}</b> questions</span>
        <span><b>{m.flashcards.length}</b> cards</span>
      </div>
      <div className="module-foot">
        <div style={{ flex: 1 }}>
          <Bar value={done / Math.max(1, m.topics.length)} color={m.color} />
        </div>
        <span className="faint small">
          {done}/{m.topics.length} read
        </span>
      </div>
    </Link>
  );
}

export function Learn() {
  return (
    <div className="container">
      <header className="page-head">
        <span className="eyebrow">Learn</span>
        <h1>Study guides</h1>
        <p>
          Full lessons built from your course materials — each one teaches the concept, shows how the NCLEX tests it, walks through a worked case,
          and ends with self-checks. New material is marked <NewBadge />.
        </p>
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
          <motion.div className="grid grid-2" variants={stagger.container} initial="hidden" animate="show">
            {unitModules(u).map((m) => (
              <motion.div key={m.id} variants={stagger.item}>
                <ModuleCard m={m} />
              </motion.div>
            ))}
          </motion.div>
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
  const cards = mods.flatMap((m) => m.flashcards);
  return (
    <div className="container" style={{ ['--mc' as string]: unit.color }}>
      <nav className="crumbs"><Link to="/learn">Learn</Link><Icon name="chevronRight" width={14} /><span>{unit.label}</span></nav>
      <section className="module-banner">
        <div className="module-num">{unit.eyebrow.toUpperCase()}</div>
        <h1>{unit.title}</h1>
        <p>{unit.overview}</p>
        <div className="row" style={{ marginTop: 22 }}>
          <Link className="btn btn-primary" to={`/practice?${query}`}><Icon name="pulse" /> Practice {unit.label} · {questions.length}</Link>
          <Link className="btn" to={`/flashcards?${query}`}><Icon name="cards" /> Flashcards</Link>
          <Link className="btn" to={`/exam?${query}`}><Icon name="exam" /> Unit exam</Link>
        </div>
        <div className="banner-stats">
          <span><b>{mods.length}</b> modules</span>
          <span><b>{topics.length}</b> full lessons</span>
          <span><b>{questions.length}</b> questions</span>
          <span><b>{cards.length}</b> flashcards</span>
        </div>
      </section>
      {unit.isNew && (
        <section className="section card how-to-study">
          <span className="eyebrow">How to study this unit</span>
          <ol>
            <li><b>Read the lesson</b> for one topic — pay special attention to “How the NCLEX tests this” and the worked case.</li>
            <li><b>Answer the self-checks</b> at the end before looking at the answers.</li>
            <li><b>Practice that topic</b> with hints on. Read every option rationale — especially for the ones you got right but weren’t sure about.</li>
            <li><b>Review flashcards</b>, then take a timed unit exam once you’ve finished several modules.</li>
          </ol>
        </section>
      )}
      <section className="section" aria-label={`${unit.label} modules`}>
        <div className="section-head"><h2>Concepts &amp; exemplars</h2></div>
        <div className="grid grid-2">
          {mods.map((m) => (
            <ModuleCard key={m.id} m={m} />
          ))}
        </div>
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
  let idx = 0;
  return (
    <div className="container" style={{ ['--mc' as string]: m.color }}>
      <nav className="crumbs">
        <Link to="/learn">Learn</Link> <Icon name="chevronRight" width={14} />
        <UnitCrumb moduleId={m.id} />
        <span>Module {m.number}</span>
      </nav>
      <motion.section className="module-banner" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <div className="glyph-bg">
          <Icon name={m.icon} />
        </div>
        <div className="module-num">MODULE {m.number}{isNewModule(m.id) && <> · <NewBadge /></>}</div>
        <h1>{m.title}</h1>
        <p>{m.overview || m.tagline}</p>
        <div className="row" style={{ marginTop: 22 }}>
          <Link className="btn btn-primary" to={`/practice?modules=${m.id}`}>
            <Icon name="pulse" /> Practice module · {m.questions.length}
          </Link>
          <Link className="btn" to={`/flashcards?modules=${m.id}`}>
            <Icon name="cards" /> Flashcards
          </Link>
          <Link className="btn" to={`/exam?modules=${m.id}`}>
            <Icon name="exam" /> Module exam
          </Link>
        </div>
        <div className="banner-stats">
          <span>
            <b>{m.topics.filter((t) => read[topicKey(m.id, t.id)]).length}</b>/{m.topics.length} topics read
          </span>
          <span>
            <b>{mastered}</b>/{m.questions.length} questions mastered
          </span>
        </div>
      </motion.section>

      {groupTopics(m).map(([group, topics]) => (
        <section className="section" key={group}>
          <div className="section-head">
            <h2>{group}</h2>
          </div>
          <motion.div className="topic-list" variants={stagger.container} initial="hidden" animate="show">
            {topics.map((t) => {
              idx++;
              const done = !!read[topicKey(m.id, t.id)];
              const n = m.questions.filter((q) => q.topic === t.id).length;
              return (
                <motion.div key={t.id} variants={stagger.item}>
                  <Link to={`/learn/${m.id}/${t.id}`} className={cx('topic-item', done && 'done')}>
                    <span className="topic-idx">{done ? <Icon name="check" width={16} /> : String(idx).padStart(2, '0')}</span>
                    <div>
                      <h3>{t.title}</h3>
                      <p>
                        {t.summary ? t.summary.replace(/<[^>]+>/g, '') : ''}{' '}
                        <span className="faint">
                          · {readingMinutes(t)} min read{n ? ` · ${n} questions` : ''}
                        </span>
                      </p>
                    </div>
                    <span className="arrow">
                      <Icon name="arrowRight" width={18} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      ))}
      <Footer />
    </div>
  );
}

export function TopicPage() {
  const { moduleId = '', topicId = '' } = useParams();
  const m = MODULE_BY_ID[moduleId];
  const { read, markRead } = useProgress();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const topic = m?.topics.find((t) => t.id === topicId);
  if (!m || !topic) return <NotFound />;
  const i = m.topics.indexOf(topic);
  const prev = m.topics[i - 1];
  const next = m.topics[i + 1];
  const n = m.questions.filter((q) => q.topic === topic.id).length;
  const key = topicKey(m.id, topic.id);

  return (
    <div className="container" style={{ ['--mc' as string]: m.color }}>
      <motion.div className="read-progress" style={{ scaleX: progress }} />
      <nav className="crumbs">
        <Link to="/learn">Learn</Link> <Icon name="chevronRight" width={14} />
        <UnitCrumb moduleId={m.id} />
        <Link to={`/learn/${m.id}`}>
          Module {m.number} · {m.title}
        </Link>
      </nav>
      <div className="reader">
        <aside className="toc" aria-label="Topics in this module">
          <span className="eyebrow" style={{ display: 'block', padding: '0 12px 8px' }}>
            Module {m.number}
          </span>
          {m.topics.map((t) => (
            <Link key={t.id} to={`/learn/${m.id}/${t.id}`} className={cx(t.id === topic.id && 'current')}>
              {read[topicKey(m.id, t.id)] && <Icon name="check" width={13} className="toc-check" />}
              {t.title}
            </Link>
          ))}
        </aside>
        <div>
          <TopicArticle moduleId={m.id} topic={topic} />
          <motion.div onViewportEnter={() => markRead(key)} viewport={{ once: true }} />
          <div className="article-foot">
            {n > 0 && (
              <Link className="btn btn-primary" to={`/practice?modules=${m.id}&topics=${key}`}>
                <Icon name="pulse" /> Practice this topic · {n}
              </Link>
            )}
            <Link className="btn" to={`/flashcards?modules=${m.id}&topics=${topic.id}`}>
              <Icon name="cards" /> Flashcards
            </Link>
            {read[key] && (
              <span className="badge badge-good" style={{ alignSelf: 'center' }}>
                <Icon name="check" width={13} /> Read
              </span>
            )}
          </div>
          <div className="pager">
            {prev && (
              <Link to={`/learn/${m.id}/${prev.id}`}>
                <small>← Previous</small>
                <b>{prev.title}</b>
              </Link>
            )}
            {next && (
              <Link className="next" to={`/learn/${m.id}/${next.id}`}>
                <small>Next →</small>
                <b>{next.title}</b>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
