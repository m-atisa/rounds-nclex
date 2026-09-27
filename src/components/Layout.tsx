import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useOutlet } from 'react-router-dom';
import { useProgress } from '../store/progress';
import { Icon, type IconName } from './Icon';
import { Toasts } from './ui';

const NAV: { to: string; label: string; icon: IconName; mobile?: string }[] = [
  { to: '/', label: 'Home', icon: 'home', mobile: 'Home' },
  { to: '/learn', label: 'Learn', icon: 'book', mobile: 'Learn' },
  { to: '/flashcards', label: 'Flashcards', icon: 'cards' },
  { to: '/practice', label: 'Practice', icon: 'pulse', mobile: 'Practice' },
  { to: '/exam', label: 'Exam', icon: 'exam' },
  { to: '/questions', label: 'Questions', icon: 'list', mobile: 'Bank' },
  { to: '/progress', label: 'Progress', icon: 'chart', mobile: 'Progress' },
];

function useTheme() {
  const [theme, setTheme] = useState<string | null>(() => {
    try {
      return localStorage.getItem('rounds.theme');
    } catch {
      return null;
    }
  });
  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
    else delete document.documentElement.dataset.theme;
    try {
      if (theme) localStorage.setItem('rounds.theme', theme);
      else localStorage.removeItem('rounds.theme');
    } catch {
      /* storage unavailable */
    }
  }, [theme]);
  const isDark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  return { isDark, toggle: () => setTheme(isDark ? 'light' : 'dark') };
}

export function Layout() {
  const location = useLocation();
  const outlet = useOutlet();
  const { isDark, toggle } = useTheme();
  const inSession = location.pathname.startsWith('/session');
  const activeMode = useProgress((s) => s.active?.mode);
  const section = '/' + (location.pathname.split('/')[1] ?? '');

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const isActive = (to: string) => (to === '/' ? section === '/' : section === to || (section === '/session' && to === (activeMode === 'exam' ? '/exam' : '/practice')));

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <div className="topbar-inner">
          <Link className="brand" to="/" aria-label="Rounds home">
            <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="9" fill="currentColor" />
              <path
                d="M5 17h5l2.5-6 4 12 3-9 1.5 3H27"
                fill="none"
                stroke="#fff"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Rounds</span>
          </Link>
          <nav className="nav" aria-label="Primary">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={isActive(n.to) ? 'active' : ''} end={n.to === '/'}>
                {isActive(n.to) && (
                  <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                )}
                <span className="nav-label">{n.label}</span>
              </NavLink>
            ))}
          </nav>
          <button className="icon-btn theme-toggle" onClick={toggle} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'moon' : 'sun'}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'grid' }}
              >
                <Icon name={isDark ? 'moon' : 'sun'} />
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      {!inSession && (
        <nav className="tabbar" aria-label="Primary mobile">
          {NAV.filter((n) => n.mobile).map((n) => (
            <NavLink key={n.to} to={n.to} className={isActive(n.to) ? 'active' : ''} end={n.to === '/'}>
              {isActive(n.to) && (
                <motion.span layoutId="tab-pill" className="tab-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
              )}
              <Icon name={n.icon} />
              <span>{n.mobile}</span>
            </NavLink>
          ))}
        </nav>
      )}
      <Toasts />
    </>
  );
}
