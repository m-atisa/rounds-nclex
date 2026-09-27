import { motion, useScroll, useSpring } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { MODULES, MODULE_BY_ID, topicKey } from '../data';
import type { Module, Topic } from '../data/types';
import { Icon } from '../components/Icon';
import { TopicArticle } from '../components/TopicArticle';
import { Bar, stagger } from '../components/ui';
import { statusOf } from '../lib/analytics';
import { cx } from '../lib/util';
import { useProgress } from '../store/progress';
import { Footer, ModuleGlyph } from './Home';
import { NotFound } from './NotFound';

export function Learn() {
  const read = useProgress((s) => s.read);
  return (
    <div className="container">
      <header className="page-head">
        <span className="eyebrow">Learn</span>
        <h1>Study guides</h1>
        <p>Textbook-depth explanations built from your module slides and current evidence — with NCLEX pearls and red flags for every topic.</p>
      </header>
      <motion.div className="grid grid-2" variants={stagger.container} initial="hidden" animate="show">
        {MODULES.map((m) => {
          const done = m.topics.filter((t) => read[topicKey(m.id, t.id)]).length;
          return (
            <motion.div key={m.id} variants={stagger.item}>
              <Link to={`/learn/${m.id}`} className="card card-link module-card" style={{ ['--mc' as string]: m.color }}>
                <ModuleGlyph icon={m.icon} />
                <div className="module-num" style={{ marginTop: 14 }}>
                  MODULE {m.number}
                </div>
                <h3>{m.title}</h3>
                <p>{m.overview || m.tagline}</p>
                <div className="module-foot">
                  <div style={{ flex: 1 }}>
                    <Bar value={done / m.topics.length} color={m.color} />
                  </div>
                  <span className="faint" style={{ fontSize: '.82rem' }}>
                    {done}/{m.topics.length} read
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
      <Footer />
    </div>
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
        <Link to="/learn">Learn</Link> <Icon name="chevronRight" width={14} /> <span>Module {m.number}</span>
      </nav>
      <motion.section className="module-banner" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <div className="glyph-bg">
          <Icon name={m.icon} />
        </div>
        <div className="module-num">MODULE {m.number}</div>
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
                        {t.summary ? t.summary.replace(/<[^>]+>/g, '') : ''} {n ? <span className="faint">· {n} questions</span> : null}
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
