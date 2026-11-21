import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { readingMinutes } from '../data';
import type { SelfCheck, TableData, Topic } from '../data/types';
import { cx } from '../lib/util';
import { Icon } from './Icon';
import { Html } from './ui';

export const sectionId = (i: number) => `sec-${i}`;

/** Turns run-on "(1) … (2) … (3) …" sentences into real lists so dense paragraphs scan easily. */
export function tidyHtml(html: string) {
  const wrapped = /<p[\s>]/.test(html) ? html : `<p>${html}</p>`;
  return wrapped.replace(/<p>([\s\S]*?)<\/p>/g, (m, inner: string) => {
    if (!/\(1\)[\s\S]*\(2\)/.test(inner)) return m;
    const parts = inner.split(/\s*\((\d{1,2})\)\s+/);
    const lead = parts[0].trim();
    const items: string[] = [];
    for (let i = 2; i < parts.length; i += 2) items.push(parts[i].trim().replace(/[;,]\s*(and|or)?\s*$/i, ''));
    if (items.length < 2) return m;
    return (lead ? `<p>${lead}</p>` : '') + `<ol class="inline-list">${items.map((x) => `<li>${x}</li>`).join('')}</ol>`;
  });
}

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
        <span className="check-label">{label}</span>
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
  const sections = topic.sections ?? [];
  const parts = sections.filter((s) => s.heading).length;
  return (
    <article className="article lesson">
      <div className="article-meta">
        {topic.exemplar && <span className="exemplar-tag">Exemplar {topic.exemplar}</span>}
        <span className="read-time">
          {mins} min read{parts ? ` · ${parts} parts` : ''}
        </span>
      </div>
      {compact ? <h2 className="article-title">{topic.title}</h2> : <h1>{topic.title}</h1>}
      {topic.summary && <Html as="p" className="summary" html={topic.summary} />}

      {!!topic.recap?.length && (
        <section className="key-points" aria-label="Key points">
          <h2 className="kp-title">
            Key points <span>· the 2-minute version</span>
          </h2>
          <ul>
            {topic.recap.map((r, i) => (
              <Html as="li" key={i} html={r} />
            ))}
          </ul>
        </section>
      )}

      {topic.bigPicture && (
        <section className="big-picture">
          <span className="eyebrow">In plain words</span>
          <Html as="div" html={tidyHtml(topic.bigPicture)} />
        </section>
      )}

      {!!topic.objectives?.length && (
        <details className="lesson-details">
          <summary>
            What you’ll be able to do
          </summary>
          <ul>
            {topic.objectives.map((o, i) => (
              <Html as="li" key={i} html={o.replace(/^After this lesson you can\s*/i, '').replace(/^./, (c) => c.toUpperCase())} />
            ))}
          </ul>
        </details>
      )}

      {!!topic.keyTerms?.length && !compact && (
        <section className="vocab" aria-label="Key terms">
          <h2 className="vocab-title">
            Key terms <span>{topic.keyTerms.length} words to know</span>
          </h2>
          <VocabCards terms={topic.keyTerms} />
        </section>
      )}

      {!!topic.keyTerms?.length && compact && (
        <details className="lesson-details key-terms">
          <summary>
            Key terms <span className="faint">({topic.keyTerms.length})</span>
          </summary>
          <dl>
            {topic.keyTerms.map((k) => (
              <div key={k.term}>
                <dt>{k.term}</dt>
                <Html as="span" className="dd" html={k.def} />
              </div>
            ))}
          </dl>
        </details>
      )}

      {!compact && parts > 2 && (
        <details className="lesson-details outline-sm">
          <summary>
            In this lesson <span className="faint">({parts} parts)</span>
          </summary>
          <ol>
            {sections.map((s, i) =>
              s.heading ? (
                <li key={i}>
                  <a href={`#${sectionId(i)}`} onClick={(e) => { e.preventDefault(); document.getElementById(sectionId(i))?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
                    {s.heading}
                  </a>
                </li>
              ) : null,
            )}
          </ol>
        </details>
      )}

      {sections.map((s, i) => (
        <section key={i} id={sectionId(i)} className="lesson-section">
          {s.heading && (
            <>
              <span className="part-no">Part {sections.slice(0, i + 1).filter((x) => x.heading).length}</span>
              <h2>{s.heading}</h2>
            </>
          )}
          {s.keyIdea && <Html as="p" className="key-idea" html={s.keyIdea} />}
          {s.body && <Html as="div" className="prose" html={tidyHtml(s.body)} />}
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
          {s.analogy && (
            <div className="callout analogy">
              <h3>
                Think of it like this
              </h3>
              <Html as="p" html={s.analogy} />
            </div>
          )}
          {s.example && (
            <div className="callout example">
              <h3>
                At the bedside
              </h3>
              <Html as="div" html={tidyHtml(s.example.replace(/^\s*<strong>\s*At the bedside:?\s*<\/strong>:?\s*/i, ''))} />
            </div>
          )}
          {s.check && <CheckCard c={s.check} />}
          {s.source && (
            <p className="part-source">
              <span>Source:</span> {s.source}
            </p>
          )}
        </section>
      ))}

      {topic.table && (
        <div id="sec-table">
          <Table t={topic.table} />
        </div>
      )}

      {!!topic.mnemonics?.length && (
        <div className="callout mnemonic">
          <h3>
            Memory aids
          </h3>
          {topic.mnemonics.map((m) => (
            <div key={m.name} className="mnemonic-row">
              <b>{m.name}</b>
              <Html as="p" html={m.text} />
            </div>
          ))}
        </div>
      )}

      {!!topic.pearls?.length && (
        <div className="callout pearl" id="sec-pearls">
          <h3>
            NCLEX tips
          </h3>
          <ul>
            {topic.pearls.map((p, i) => (
              <Html as="li" key={i} html={p} />
            ))}
          </ul>
        </div>
      )}

      {!!topic.redFlags?.length && (
        <div className="callout red" id="sec-red">
          <h3>
            Red flags — act now
          </h3>
          <ul>
            {topic.redFlags.map((p, i) => (
              <Html as="li" key={i} html={p} />
            ))}
          </ul>
        </div>
      )}

      {!!topic.checks?.length && (
        <section className="self-checks">
          <h2>Check your understanding</h2>
          <p className="muted small">Answer each one in your head first — pulling it from memory is what makes it stick.</p>
          <div className="stack">
            {topic.checks.map((c, i) => (
              <CheckCard key={i} c={c} label={`Question ${i + 1}`} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function VocabCards({ terms }: { terms: { term: string; def: string }[] }) {
  const LIMIT = 9;
  const [all, setAll] = useState(terms.length <= LIMIT + 3);
  const shown = all ? terms : terms.slice(0, LIMIT);
  return (
    <>
      <div className="vocab-grid">
        {shown.map((k) => (
          <div className="vocab-card" key={k.term}>
            <span className="vocab-term">{k.term}</span>
            <Html as="span" className="vocab-def" html={k.def} />
          </div>
        ))}
      </div>
      {!all && (
        <button type="button" className="btn btn-sm vocab-more" onClick={() => setAll(true)}>
          Show all {terms.length} terms
        </button>
      )}
    </>
  );
}
