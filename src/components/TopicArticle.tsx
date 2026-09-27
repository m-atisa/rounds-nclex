import { motion } from 'motion/react';
import type { Topic } from '../data/types';
import { Icon } from './Icon';
import { Html } from './ui';

export const sectionId = (i: number) => `sec-${i}`;

export function TopicArticle({ topic, compact }: { moduleId: string; topic: Topic; compact?: boolean }) {
  const reveal = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const },
  };
  return (
    <article className="article">
      {topic.exemplar && <span className="exemplar-tag">Exemplar {topic.exemplar}</span>}
      {compact ? <h2 className="article-title">{topic.title}</h2> : <h1>{topic.title}</h1>}
      {topic.summary && <Html as="p" className="summary" html={topic.summary} />}

      {topic.sections?.map((s, i) => (
        <motion.section key={i} id={sectionId(i)} {...reveal}>
          {s.heading && <h2>{s.heading}</h2>}
          {s.body && <Html as="p" html={s.body} />}
          {s.bullets && (
            <ul>
              {s.bullets.map((b, j) => (
                <Html as="li" key={j} html={b} />
              ))}
            </ul>
          )}
        </motion.section>
      ))}

      {topic.table && (
        <motion.div className="table-wrap" {...reveal} id="sec-table">
          <table>
            {topic.table.caption && <caption>{topic.table.caption}</caption>}
            <thead>
              <tr>
                {topic.table.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topic.table.rows.map((r, i) => (
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
        </motion.div>
      )}

      {!!topic.pearls?.length && (
        <motion.div className="callout pearl" {...reveal} id="sec-pearls">
          <h3>
            <Icon name="sparkle" /> NCLEX pearls
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
    </article>
  );
}
