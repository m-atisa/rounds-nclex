import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { readingMinutes } from '../data';
import type { SelfCheck, TableData, Topic } from '../data/types';
import { cx } from '../lib/util';
import { Icon } from './Icon';
import { Html } from './ui';

export const sectionId = (i: number) => `sec-${i}`;

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as const },
};

function Table({ t }: { t: TableData }) {
  return (
    <div className="table-wrap">
      <table>
        {t.caption && <caption>{t.caption}</caption>}
        <thead>
          <tr>
            {t.headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>
                  <Html html={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Tap-to-reveal self-check. */
export function CheckCard({ c, label = 'Quick check' }: { c: SelfCheck; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cx('check-card', open && 'open')}>
      <div className="check-q">
        <span className="check-label">
          <Icon name="target" /> {label}
        </span>
        <Html as="p" html={c.q} />
      </div>
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.div
            key="a"
            className="check-a"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon name="check" />
            <Html as="p" html={c.a} />
          </motion.div>
        ) : (
          <motion.button key="b" type="button" className="btn btn-sm check-reveal" onClick={() => setOpen(true)} exit={{ opacity: 0 }}>
            Think it through, then reveal <Icon name="eye" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TopicArticle({ topic, compact }: { moduleId: string; topic: Topic; compact?: boolean }) {
  const mins = readingMinutes(topic);
  const isLesson = !!(topic.objectives?.length || topic.bigPicture || topic.keyTerms?.length);
  return (
    <article className="article">
      <div className="article-meta">
        {topic.exemplar && <span className="exemplar-tag">Exemplar {topic.exemplar}</span>}
        <span className="read-time">
          <Icon name="clock" /> {mins} min read
        </span>
      </div>
      {compact ? <h2 className="article-title">{topic.title}</h2> : <h1>{topic.title}</h1>}
      {topic.summary && <Html as="p" className="summary" html={topic.summary} />}

      {isLesson && !compact && topic.sections && topic.sections.length > 2 && (
        <nav className="lesson-outline" aria-label="In this lesson">
          <span className="eyebrow">In this lesson</span>
          <ol>
            {topic.sections.map((s, i) =>
              s.heading ? (
                <li key={i}>
                  <a href={`#${sectionId(i)}`} onClick={(e) => { e.preventDefault(); document.getElementById(sectionId(i))?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
                    {s.heading}
                  </a>
                </li>
              ) : null,
            )}
          </ol>
        </nav>
      )}

      {!!topic.objectives?.length && (
        <motion.div className="lesson-box objectives" {...reveal}>
          <h3>
            <Icon name="target" /> By the end of this lesson you can
          </h3>
          <ul>
            {topic.objectives.map((o, i) => (
              <Html as="li" key={i} html={o.replace(/^After this lesson you can\s*/i, '').replace(/^./, (c) => c.toUpperCase())} />
            ))}
          </ul>
        </motion.div>
      )}

      {topic.bigPicture && (
        <motion.section className="big-picture" {...reveal}>
          <span className="eyebrow">The big picture</span>
          <Html as="div" html={topic.bigPicture} />
        </motion.section>
      )}

      {!!topic.keyTerms?.length && (
        <motion.section className="key-terms" {...reveal}>
          <h2>Key terms</h2>
          <dl>
            {topic.keyTerms.map((k) => (
              <div key={k.term}>
                <dt>{k.term}</dt>
                <Html as="span" className="dd" html={k.def} />
              </div>
            ))}
          </dl>
        </motion.section>
      )}

      {topic.sections?.map((s, i) => (
        <motion.section key={i} id={sectionId(i)} className="lesson-section" {...reveal}>
          {s.heading && <h2>{s.heading}</h2>}
          {s.body && <Html as="div" className="prose" html={s.body.includes('<p') ? s.body : `<p>${s.body}</p>`} />}
          {s.analogy && (
            <div className="callout analogy">
              <h3>
                <Icon name="bulb" /> Think of it like this
              </h3>
              <Html as="p" html={s.analogy} />
            </div>
          )}
          {s.bullets && (
            <ul>
              {s.bullets.map((b, j) => (
                <Html as="li" key={j} html={b} />
              ))}
            </ul>
          )}
          {s.steps && (
            <ol className="steps">
              {s.steps.map((b, j) => (
                <li key={j}>
                  <span className="step-n">{j + 1}</span>
                  <Html html={b} />
                </li>
              ))}
            </ol>
          )}
          {s.table && <Table t={s.table} />}
          {s.example && (
            <div className="callout example">
              <h3>
                <Icon name="clipboard" /> At the bedside
              </h3>
              <Html as="div" html={s.example.replace(/^\s*<strong>\s*At the bedside:?\s*<\/strong>:?\s*/i, '')} />
            </div>
          )}
          {s.check && <CheckCard c={s.check} />}
        </motion.section>
      ))}

      {topic.table && (
        <motion.div {...reveal} id="sec-table">
          <Table t={topic.table} />
        </motion.div>
      )}

      {!!topic.mnemonics?.length && (
        <motion.div className="callout mnemonic" {...reveal}>
          <h3>
            <Icon name="sparkle" /> Memory aids
          </h3>
          {topic.mnemonics.map((m) => (
            <div key={m.name} className="mnemonic-row">
              <b>{m.name}</b>
              <Html as="p" html={m.text} />
            </div>
          ))}
        </motion.div>
      )}

      {!!topic.pearls?.length && (
        <motion.div className="callout pearl" {...reveal} id="sec-pearls">
          <h3>
            <Icon name="sparkle" /> How the NCLEX tests this
          </h3>
          <ul>
            {topic.pearls.map((p, i) => (
              <Html as="li" key={i} html={p} />
            ))}
          </ul>
        </motion.div>
      )}

      {!!topic.redFlags?.length && (
        <motion.div className="callout red" {...reveal} id="sec-red">
          <h3>
            <Icon name="alert" /> Red flags — act now
          </h3>
          <ul>
            {topic.redFlags.map((p, i) => (
              <Html as="li" key={i} html={p} />
            ))}
          </ul>
        </motion.div>
      )}

      {!!topic.recap?.length && (
        <motion.div className="lesson-box recap" {...reveal}>
          <h3>
            <Icon name="check" /> Lesson recap
          </h3>
          <ul>
            {topic.recap.map((r, i) => (
              <Html as="li" key={i} html={r} />
            ))}
          </ul>
        </motion.div>
      )}

      {!!topic.checks?.length && (
        <motion.section className="self-checks" {...reveal}>
          <h2>Check your understanding</h2>
          <p className="muted small">Answer each one in your head first — retrieval is what makes it stick.</p>
          <div className="stack">
            {topic.checks.map((c, i) => (
              <CheckCard key={i} c={c} label={`Question ${i + 1}`} />
            ))}
          </div>
        </motion.section>
      )}
    </article>
  );
}
