import { AnimatePresence, motion } from 'motion/react';
import { useState, type ReactNode } from 'react';
import { QUESTIONS } from '../../data';
import type { Question } from '../../data/types';
import { cx } from '../../lib/util';
import { Icon } from '../Icon';
import { Html } from '../ui';

const caseSizes = QUESTIONS.reduce<Record<string, number>>((acc, q) => {
  if (q.caseId) acc[q.caseId] = (acc[q.caseId] ?? 0) + 1;
  return acc;
}, {});

export function CaseBadge({ q }: { q: Question }) {
  if (!q.caseId) return null;
  return (
    <span className="badge badge-case">
      <Icon name="clipboard" /> Case study · item {q.caseOrder ?? '?'} of {caseSizes[q.caseId] ?? '?'}
    </span>
  );
}

export function Exhibit({ q }: { q: Question }) {
  const tabs = q.exhibit?.tabs ?? [];
  const [active, setActive] = useState(0);
  if (!tabs.length) return null;
  const tab = tabs[Math.min(active, tabs.length - 1)];
  return (
    <section className="exhibit" aria-label="Client chart">
      <div className="exhibit-head">
        <Icon name="clipboard" />
        <span>Client chart</span>
      </div>
      <div className="exhibit-tabs" role="tablist">
        {tabs.map((t, i) => (
          <button key={t.title} role="tab" aria-selected={i === active} className={cx(i === active && 'on')} onClick={() => setActive(i)}>
            {i === active && <motion.span layoutId={`ex-tab-${q.id}`} className="exhibit-tab-line" />}
            {t.title}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="exhibit-body"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {tab.html && <Html as="div" html={tab.html} />}
          {tab.table && (
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    {tab.table.headers.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tab.table.rows.map((r, i) => (
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
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/** Split layout (chart | question) when the item has an exhibit, NCLEX-style. */
export function CaseLayout({ q, children }: { q: Question; children: ReactNode }) {
  if (!q.exhibit?.tabs?.length) return <>{children}</>;
  return (
    <div className="case-split">
      <div className="case-exhibit">
        <Exhibit q={q} />
      </div>
      <div className="case-question">{children}</div>
    </div>
  );
}
