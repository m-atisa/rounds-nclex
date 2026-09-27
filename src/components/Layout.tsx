import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo } from 'react';
import { Link, NavLink, useLocation, useOutlet } from 'react-router-dom';
import { MODULES } from '../data';
import { statusOf, streak } from '../lib/analytics';
import { cx, dayKey } from '../lib/util';
import { useProgress } from '../store/progress';
import { useApplyPrefs, usePrefs } from '../store/prefs';
import { CommandPalette, useCommand } from './CommandPalette';
import { Icon, type IconName } from './Icon';
import { Toasts } from './ui';

type NavItem = { to: string; label: string; icon: IconName; mobile?: string };

const SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Study',
    items: [
      { to: '/', label: 'Dashboard', icon: 'home', mobile: 'Home' },
      { to: '/learn', label: 'Study guides', icon: 'book', mobile: 'Learn' },
      { to: '/flashcards', label: 'Flashcards', icon: 'cards' },
    ],
  },
  {
    title: 'Assess',
    items: [
      { to: '/practice', label: 'Practice', icon: 'pulse', mobile: 'Practice' },
      { to: '/exam', label: 'Exam', icon: 'exam' },
      { to: '/questions', label: 'Question bank', icon: 'list', mobile: 'Bank' },
    ],
  },
  { title: 'Insights', items: [{ to: '/progress', label: 'Progress', icon: 'chart', mobile: 'Progress' }] },
];
const ALL = SECTIONS.flatMap((s) => s.items);

export function Brand({ compact }: { compact?: boolean }) {
  return (
    <Link className="brand" to="/" aria-label="Rounds home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32">
          <path d="M4 17h5.5l2.5-6 4 12 3-9 1.5 3H28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {!compact && (
        <span className="brand-text">
          Rounds<small>NCLEX-RN prep</small>
        </span>
      )}
    </Link>
  );
}

export function ViewControls() {
  const { zoom, zoomIn, zoomOut, resetZoom, isDark, toggleTheme } = usePrefs();
  return (
    <div className="view-controls">
      <div className="zoom" role="group" aria-label="Text size">
        <button onClick={zoomOut} disabled={zoom <= 0.85} aria-label="Zoom out" title="Zoom out (Ctrl −)">
          <Icon name="zoomOut" />
        </button>
        <button className="zoom-val" onClick={resetZoom} title="Reset zoom" aria-label={`Zoom ${Math.round(zoom * 100)} percent, reset`}>
          {Math.round(zoom * 100)}%
        </button>
        <button onClick={zoomIn} disabled={zoom >= 1.5} aria-label="Zoom in" title="Zoom in (Ctrl +)">
          <Icon name="zoomIn" />
        </button>
      </div>
      <button className="icon-btn" onClick={toggleTheme} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} title="Toggle theme">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22 }}
            style={{ display: 'grid' }}
          >
            <Icon name={isDark ? 'moon' : 'sun'} />
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}

export function SearchButton() {
  const open = useCommand((s) => s.setOpen);
  const mac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
  return (
    <button className="search-btn" onClick={() => open(true)} aria-label="Search">
      <Icon name="search" />
      <span>Search topics &amp; questions</span>
      <kbd>{mac ? '⌘' : 'Ctrl'} K</kbd>
    </button>
  );
}

function Sidebar({ isActive }: { isActive: (to: string) => boolean }) {
  const { attempts, days } = useProgress();
  const s = streak(days);
  const today = days[dayKey()]?.q ?? 0;
  const moduleStats = useMemo(
    () =>
      MODULES.map((m) => ({
        m,
        pct: m.questions.filter((q) => statusOf(attempts, q.id) === 'mastered').length / Math.max(1, m.questions.length),
      })),
    [attempts],
  );
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <Brand />
      <nav className="side-nav">
        {SECTIONS.map((sec) => (
          <div key={sec.title} className="side-section">
            <span className="side-title">{sec.title}</span>
            {sec.items.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={cx('side-link', isActive(n.to) && 'active')}>
                {isActive(n.to) && (
                  <motion.span layoutId="side-active" className="side-active" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />
                )}
                <Icon name={n.icon} />
                <span>{n.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
        <div className="side-section">
          <span className="side-title">Modules</span>
          {moduleStats.map(({ m, pct }) => (
            <NavLink key={m.id} to={`/learn/${m.id}`} className="side-link side-module" style={{ ['--mc' as string]: m.color }}>
              <span className="side-dot" />
              <span className="side-module-name">
                <small>{m.number}</small> {m.title}
              </span>
              <span className="side-pct">{Math.round(pct * 100)}%</span>
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="side-foot">
        <div className="side-streak">
          <Icon name="bolt" />
          <div>
            <b>
              {s} day streak
            </b>
            <small>{today ? `${today} answered today` : 'Answer one question to keep it going'}</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function Layout() {
  useApplyPrefs();
  const location = useLocation();
  const outlet = useOutlet();
  const activeMode = useProgress((s) => s.active?.mode);
  const inSession = location.pathname.startsWith('/session');
  const section = '/' + (location.pathname.split('/')[1] ?? '');

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  // Cursor-follow spotlight for elements with .spot
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('.spot') as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const isActive = (to: string) =>
    to === '/'
      ? section === '/'
      : section === to ||
        (section === '/results' && to === '/progress') ||
        (section === '/session' && to === (activeMode === 'exam' ? '/exam' : '/practice'));

  return (
    <div className={cx('shell', inSession && 'focus')}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      {!inSession && <Sidebar isActive={isActive} />}
      <div className="shell-main">
        {!inSession && (
          <header className="topbar">
            <div className="topbar-inner">
              <span className="mobile-brand">
                <Brand compact />
              </span>
              <SearchButton />
              <div className="spacer" />
              <ViewControls />
            </div>
          </header>
        )}
        <main id="main" tabIndex={-1}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
              transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {!inSession && (
        <nav className="tabbar" aria-label="Primary mobile">
          {ALL.filter((n) => n.mobile).map((n) => (
            <NavLink key={n.to} to={n.to} className={isActive(n.to) ? 'active' : ''} end={n.to === '/'}>
              {isActive(n.to) && <motion.span layoutId="tab-pill" className="tab-pill" transition={{ type: 'spring', stiffness: 460, damping: 36 }} />}
              <Icon name={n.icon} />
              <span>{n.mobile}</span>
            </NavLink>
          ))}
        </nav>
      )}
      <CommandPalette />
      <Toasts />
    </div>
  );
}
