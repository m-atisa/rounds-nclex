import confetti from 'canvas-confetti';
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { create } from 'zustand';
import { cx } from '../lib/util';
import { Icon } from './Icon';

/* ------------------------------------------------------------------ */
/* Progress ring                                                        */
/* ------------------------------------------------------------------ */

export function Ring({
  value,
  color,
  size = 56,
  stroke = 6,
  children,
  className,
}: {
  value: number;
  color?: string;
  size?: number;
  stroke?: number;
  children?: ReactNode;
  className?: string;
}) {
  const r = (100 - stroke) / 2;
  const c = 2 * Math.PI * r;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className={cx('ring', className)} style={{ width: size, height: size, ['--rc' as string]: color }}>
      <svg viewBox="0 0 100 100">
        <circle className="track" cx="50" cy="50" r={r} strokeWidth={stroke} />
        <motion.circle
          className="val"
          cx="50"
          cy="50"
          r={r}
          strokeWidth={stroke}
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: inView ? c * (1 - Math.max(0, Math.min(1, value))) : c }}
          transition={{ duration: 1.3, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </svg>
      <div className="ring-label">{children}</div>
    </div>
  );
}

export function Bar({ value, color }: { value: number; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="bar" style={{ ['--bc' as string]: color }}>
      <motion.i
        initial={{ width: 0 }}
        animate={{ width: inView ? `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%` : 0 }}
        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
      />
    </div>
  );
}

/** Animated count-up number. */
export function CountUp({ to, suffix = '', decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const text = useTransform(spring, (v) => `${v.toFixed(decimals)}${suffix}`);
  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);
  return <motion.span ref={ref}>{text}</motion.span>;
}

/* ------------------------------------------------------------------ */
/* Chips                                                                */
/* ------------------------------------------------------------------ */

export function Chip({
  on,
  onClick,
  children,
  color,
  count,
}: {
  on: boolean;
  onClick: () => void;
  children: ReactNode;
  color?: string;
  count?: number;
}) {
  return (
    <motion.button
      type="button"
      className="chip"
      aria-pressed={on}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      style={{ ['--mc' as string]: color }}
    >
      {color && <span className="dot" />}
      {children}
      {count !== undefined && <span className="chip-count">{count}</span>}
    </motion.button>
  );
}

export function toggleIn<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

/* ------------------------------------------------------------------ */
/* Modal / sheet                                                        */
/* ------------------------------------------------------------------ */

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className={cx('modal-panel', wide && 'wide')}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <div className="modal-head">
              <div className="modal-title">{title}</div>
              <button className="icon-btn" onClick={onClose} aria-label="Close">
                <Icon name="x" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* ------------------------------------------------------------------ */
/* Toasts                                                               */
/* ------------------------------------------------------------------ */

const useToasts = create<{ items: { id: number; text: string }[]; push: (t: string) => void }>((set) => ({
  items: [],
  push: (text) => {
    const id = Date.now() + Math.random();
    set((s) => ({ items: [...s.items, { id, text }] }));
    setTimeout(() => set((s) => ({ items: s.items.filter((i) => i.id !== id) })), 2600);
  },
}));

export const toast = (text: string) => useToasts.getState().push(text);

export function Toasts() {
  const items = useToasts((s) => s.items);
  return (
    <div className="toast-wrap" aria-live="polite">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            className="toast"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            {t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Confetti                                                             */
/* ------------------------------------------------------------------ */

export function celebrate(intensity = 1) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#0f766e', '#2dd4bf', '#f26a4b', '#fbbf24', '#a78bfa', '#38bdf8'];
  const burst = (x: number, angle: number) =>
    confetti({ particleCount: Math.round(70 * intensity), angle, spread: 70, startVelocity: 55, origin: { x, y: 0.7 }, colors, disableForReducedMotion: true });
  burst(0.15, 60);
  burst(0.85, 120);
  setTimeout(() => confetti({ particleCount: Math.round(60 * intensity), spread: 120, origin: { y: 0.4 }, colors, scalar: 0.9 }), 250);
}

/* ------------------------------------------------------------------ */
/* Misc                                                                 */
/* ------------------------------------------------------------------ */

export function Html({ html, as: Tag = 'span', className }: { html: string; as?: 'span' | 'div' | 'p' | 'li'; className?: string }) {
  // Content is authored in-repo (trusted) and may contain <strong>/<em>.
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function useNow(active: boolean, ms = 1000) {
  const [, setT] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setT((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [active, ms]);
}

export function Difficulty({ level }: { level: number }) {
  const label = ['', 'Foundational', 'Application', 'Analysis'][level] ?? '';
  return (
    <span className="diff" title={`Difficulty: ${label}`} aria-label={`Difficulty ${level} of 3`}>
      {[1, 2, 3].map((i) => (
        <i key={i} className={i <= level ? 'on' : ''} />
      ))}
    </span>
  );
}

export const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.06 } } },
  item: {
    hidden: { opacity: 0, y: 18, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const } },
  },
};
