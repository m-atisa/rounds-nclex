import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { MODULES, QUESTIONS } from '../data';
import { TYPE_SHORT } from '../data/types';
import { cx } from '../lib/util';
import { Icon, type IconName } from './Icon';

export const useCommand = create<{ open: boolean; setOpen: (o: boolean) => void }>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

interface Entry {
  group: 'Go to' | 'Modules' | 'Topics' | 'Questions';
  title: string;
  sub?: string;
  to: string;
  icon: IconName;
  color?: string;
  hay: string;
}

const strip = (s: string) => s.replace(/<[^>]+>/g, '');

const ENTRIES: Entry[] = [
  ...(
    [
      ['Dashboard', '/', 'home'],
      ['Study guides', '/learn', 'book'],
      ['Flashcards', '/flashcards', 'cards'],
      ['Practice', '/practice', 'pulse'],
      ['Practice missed questions', '/practice?pool=missed', 'target'],
      ['NGN case studies', '/questions?kind=case', 'clipboard'],
      ['Exam', '/exam', 'exam'],
      ['Question bank', '/questions', 'list'],
      ['Progress', '/progress', 'chart'],
    ] as [string, string, IconName][]
  ).map(([title, to, icon]) => ({ group: 'Go to' as const, title, to, icon, hay: title.toLowerCase() })),
  ...MODULES.map((m) => ({
    group: 'Modules' as const,
    title: `Module ${m.number} · ${m.title}`,
    sub: m.tagline,
    to: `/learn/${m.id}`,
    icon: m.icon as IconName,
    color: m.color,
    hay: `module ${m.number} ${m.title}`.toLowerCase(),
  })),
  ...MODULES.flatMap((m) =>
    m.topics.map((t) => ({
      group: 'Topics' as const,
      title: t.title,
      sub: `Module ${m.number} · ${m.title}${t.exemplar ? ` · Exemplar ${t.exemplar}` : ''}`,
      to: `/learn/${m.id}/${t.id}`,
      icon: 'book' as IconName,
      color: m.color,
      hay: `${t.title} ${m.title} ${t.exemplar ?? ''} ${strip(t.summary ?? '')}`.toLowerCase(),
    })),
  ),
  ...QUESTIONS.map((q) => ({
    group: 'Questions' as const,
    title: strip(q.stem),
    sub: `${q.ref} · ${TYPE_SHORT[q.type]}`,
    to: `/questions?open=${q.id}`,
    icon: 'list' as IconName,
    color: MODULES.find((m) => m.id === q.moduleId)?.color,
    hay: `${strip(q.stem)} ${q.ref} ${q.id}`.toLowerCase(),
  })),
];

const LIMITS: Record<Entry['group'], number> = { 'Go to': 4, Modules: 4, Topics: 6, Questions: 8 };

export function CommandPalette() {
  const { open, setOpen } = useCommand();
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!useCommand.getState().open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSel(0);
    }
  }, [open]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const counts: Record<string, number> = {};
    return ENTRIES.filter((e) => {
      if (!terms.length && e.group !== 'Go to' && e.group !== 'Modules') return false;
      if (!terms.every((t) => e.hay.includes(t))) return false;
      counts[e.group] = (counts[e.group] ?? 0) + 1;
      return counts[e.group] <= (terms.length ? LIMITS[e.group] : 12);
    });
  }, [query]);

  const go = (e: Entry | undefined) => {
    if (!e) return;
    setOpen(false);
    navigate(e.to);
  };

  useEffect(() => {
    listRef.current?.querySelector(`[data-i="${sel}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [sel]);

  let lastGroup = '';
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmdk-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            className="cmdk"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 480, damping: 36 }}
          >
            <div className="cmdk-input">
              <Icon name="search" />
              <input
                autoFocus
                placeholder="Search topics, modules, and questions…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSel(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSel((s) => Math.min(results.length - 1, s + 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSel((s) => Math.max(0, s - 1));
                  } else if (e.key === 'Enter') go(results[sel]);
                  else if (e.key === 'Escape') setOpen(false);
                }}
              />
              <kbd>esc</kbd>
            </div>
            <div className="cmdk-list" ref={listRef}>
              {results.length === 0 && <p className="cmdk-empty">No matches for “{query}”.</p>}
              {results.map((r, i) => {
                const header = r.group !== lastGroup ? r.group : null;
                lastGroup = r.group;
                return (
                  <div key={r.group + r.to + i}>
                    {header && <div className="cmdk-group">{header}</div>}
                    <button
                      data-i={i}
                      className={cx('cmdk-item', i === sel && 'sel')}
                      onMouseMove={() => setSel(i)}
                      onClick={() => go(r)}
                      style={{ ['--mc' as string]: r.color }}
                    >
                      <span className="cmdk-icon">
                        <Icon name={r.icon} />
                      </span>
                      <span className="cmdk-text">
                        <b>{r.title}</b>
                        {r.sub && <small>{r.sub}</small>}
                      </span>
                      {i === sel && <Icon name="arrowRight" className="cmdk-go" />}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="cmdk-foot">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> navigate
              </span>
              <span>
                <kbd>↵</kbd> open
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
