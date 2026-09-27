import { useEffect } from 'react';
import { create } from 'zustand';

const ZOOMS = [0.85, 0.925, 1, 1.1, 1.2, 1.35, 1.5];

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function write(key: string, v: string | null) {
  try {
    if (v === null) localStorage.removeItem(key);
    else localStorage.setItem(key, v);
  } catch {
    /* storage unavailable */
  }
}

const systemDark = () => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

interface Prefs {
  zoom: number;
  theme: 'light' | 'dark' | null;
  setZoom: (z: number) => void;
  setTheme: (t: 'light' | 'dark' | null) => void;
}

const usePrefStore = create<Prefs>((set) => ({
  zoom: Number(read('rounds.zoom')) || 1,
  theme: (read('rounds.theme') as Prefs['theme']) || null,
  setZoom: (zoom) => {
    write('rounds.zoom', String(zoom));
    set({ zoom });
  },
  setTheme: (theme) => {
    write('rounds.theme', theme);
    set({ theme });
  },
}));

/** Applies zoom (root font size — the whole UI is rem-based) and theme to <html>. */
export function useApplyPrefs() {
  const { zoom, theme } = usePrefStore();
  useEffect(() => {
    document.documentElement.style.fontSize = `${zoom * 100}%`;
  }, [zoom]);
  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
    else delete document.documentElement.dataset.theme;
  }, [theme]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey) || e.altKey) return;
      const { zoom: z, setZoom } = usePrefStore.getState();
      const i = ZOOMS.indexOf(z);
      if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        setZoom(ZOOMS[Math.min(ZOOMS.length - 1, (i < 0 ? 2 : i) + 1)]);
      } else if (e.key === '-') {
        e.preventDefault();
        setZoom(ZOOMS[Math.max(0, (i < 0 ? 2 : i) - 1)]);
      } else if (e.key === '0') {
        e.preventDefault();
        setZoom(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}

export function usePrefs() {
  const { zoom, theme, setZoom, setTheme } = usePrefStore();
  const isDark = theme ? theme === 'dark' : systemDark();
  const i = ZOOMS.indexOf(zoom);
  return {
    zoom,
    isDark,
    zoomIn: () => setZoom(ZOOMS[Math.min(ZOOMS.length - 1, (i < 0 ? 2 : i) + 1)]),
    zoomOut: () => setZoom(ZOOMS[Math.max(0, (i < 0 ? 2 : i) - 1)]),
    resetZoom: () => setZoom(1),
    toggleTheme: () => setTheme(isDark ? 'light' : 'dark'),
  };
}
