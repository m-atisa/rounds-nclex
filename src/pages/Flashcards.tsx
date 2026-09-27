import { AnimatePresence, motion, useMotionValue, useTransform, type PanInfo } from 'motion/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FLASHCARDS, MODULES, MODULE_BY_ID, getTopic } from '../data';
import { Icon } from '../components/Icon';
import { Bar, Chip, Html, celebrate, toggleIn } from '../components/ui';
import { shuffle } from '../lib/util';
import { useProgress } from '../store/progress';

export function Flashcards() {
  const [params, setParams] = useSearchParams();
  const modules = params.get('modules')?.split(',').filter(Boolean) ?? [];
  const topic = params.get('topics') ?? '';
  const { cards, rateCard } = useProgress();

  const deckSource = useMemo(
    () =>
      FLASHCARDS.filter((c) => (!modules.length || modules.includes(c.moduleId)) && (!topic || c.topic === topic)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modules.join(), topic],
  );

  const build = useCallback(() => {
    // Cards you struggle with come first; well-known cards go last.
    return shuffle(deckSource)
      .sort((a, b) => (cards[a.key]?.known ?? 0) - (cards[b.key]?.known ?? 0))
      .map((c) => c.key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckSource]);

  const [queue, setQueue] = useState<string[]>(build);
  const [done, setDone] = useState(0);
  const [again, setAgain] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [exitDir, setExitDir] = useState(1);

  useEffect(() => {
    setQueue(build());
    setDone(0);
    setAgain(0);
    setFlipped(false);
  }, [build]);

  const total = deckSource.length;
  const current = FLASHCARDS.find((c) => c.key === queue[0]);

  const rate = useCallback(
    (known: boolean) => {
      if (!current) return;
      rateCard(current.key, known);
      setExitDir(known ? 1 : -1);
      setFlipped(false);
      setQueue((q) => {
        const [head, ...rest] = q;
        if (known) {
          if (rest.length === 0) setTimeout(() => celebrate(0.8), 350);
          return rest;
        }
        const at = Math.min(rest.length, 3);
        return [...rest.slice(0, at), head, ...rest.slice(at)];
      });
      if (known) setDone((d) => d + 1);
      else setAgain((a) => a + 1);
    },
    [current, rateCard],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input, select, textarea')) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === 'ArrowRight') rate(true);
      else if (e.key === 'ArrowLeft') rate(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [rate]);

  const setModules = (next: string[]) => {
    const p = new URLSearchParams();
    if (next.length) p.set('modules', next.join(','));
    setParams(p, { replace: true });
  };

  const m = current ? MODULE_BY_ID[current.moduleId] : undefined;
  const topicTitle = current?.topic ? getTopic(current.moduleId, current.topic)?.title : undefined;

  return (
    <div className="container">
      <header className="page-head">
        <span className="eyebrow">Flashcards</span>
        <h1>Flip, recall, repeat</h1>
        <p>Cards you miss come back sooner. Swipe right if you knew it, left to see it again.</p>
      </header>

      <div className="chips" style={{ marginBottom: 22 }}>
        <Chip on={!modules.length && !topic} onClick={() => setModules([])}>
          All modules
        </Chip>
        {MODULES.map((mm) => (
          <Chip key={mm.id} on={modules.includes(mm.id)} color={mm.color} onClick={() => setModules(toggleIn(modules, mm.id))}>
            {mm.number} · {mm.title}
          </Chip>
        ))}
        {topic && (
          <Chip on onClick={() => setModules(modules)}>
            Topic: {getTopic(modules[0] ?? '', topic)?.title ?? topic} ✕
          </Chip>
        )}
      </div>

      <div className="fc-progress">
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8, fontSize: '.86rem' }}>
          <span className="muted">
            <b style={{ color: 'var(--ink)' }}>{done}</b> of {total} known
          </span>
          <span className="faint">{again ? `${again} to revisit` : ''}</span>
        </div>
        <Bar value={total ? done / total : 0} />
      </div>

      <div className="fc-stage">
        <AnimatePresence mode="popLayout" custom={exitDir}>
          {current ? (
            <SwipeCard
              key={current.key + ':' + (done + again)}
              exitDir={exitDir}
              flipped={flipped}
              onFlip={() => setFlipped((f) => !f)}
              onSwipe={rate}
              color={m?.color}
              front={current.front}
              back={current.back}
              label={`Module ${m?.number} · ${m?.title}${topicTitle ? ` · ${topicTitle}` : ''}`}
            />
          ) : (
            <motion.div key="done" className="card fc-done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="big-emoji">🎉</div>
              <h2>{total ? 'Deck complete!' : 'No cards here yet'}</h2>
              <p className="muted">{total ? `You worked through ${total} cards${again ? ` and revisited ${again}` : ''}.` : 'Try another module.'}</p>
              {total > 0 && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setQueue(build());
                    setDone(0);
                    setAgain(0);
                  }}
                >
                  <Icon name="refresh" /> Shuffle &amp; restart
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {current && (
        <div className="fc-controls">
          <button className="btn btn-again" onClick={() => rate(false)}>
            <Icon name="refresh" /> Again
          </button>
          <button className="btn btn-got" onClick={() => rate(true)}>
            <Icon name="check" /> Got it
          </button>
        </div>
      )}
      <div className="kbd-hints">
        <span>
          <span className="kbd">Space</span> flip
        </span>
        <span>
          <span className="kbd">←</span> again
        </span>
        <span>
          <span className="kbd">→</span> got it
        </span>
      </div>
    </div>
  );
}

function SwipeCard({
  front,
  back,
  label,
  color,
  flipped,
  onFlip,
  onSwipe,
  exitDir,
}: {
  front: string;
  back: string;
  label: string;
  color?: string;
  flipped: boolean;
  onFlip: () => void;
  onSwipe: (known: boolean) => void;
  exitDir: number;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-14, 14]);
  const goodOpacity = useTransform(x, [20, 120], [0, 1]);
  const badOpacity = useTransform(x, [-120, -20], [1, 0]);
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 110 || info.velocity.x > 600) onSwipe(true);
    else if (info.offset.x < -110 || info.velocity.x < -600) onSwipe(false);
  };
  return (
    <motion.div
      className="fc-swipe"
      style={{ x, rotate, ['--mc' as string]: color }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={onDragEnd}
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ x: exitDir * 420, opacity: 0, rotate: exitDir * 16, transition: { duration: 0.35 } }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <motion.span className="swipe-tag good" style={{ opacity: goodOpacity }}>
        Got it
      </motion.span>
      <motion.span className="swipe-tag bad" style={{ opacity: badOpacity }}>
        Again
      </motion.span>
      <motion.div
        className="fc"
        onClick={onFlip}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        role="button"
        tabIndex={0}
        aria-label={flipped ? 'Show question' : 'Show answer'}
      >
        <div className="fc-face fc-front">
          <span className="eyebrow">{label}</span>
          <div className="fc-body">
            <Html html={front} />
          </div>
          <div className="fc-hint">Tap to reveal</div>
        </div>
        <div className="fc-face fc-back">
          <span className="eyebrow">Answer</span>
          <div className="fc-body">
            <Html html={back} />
          </div>
          <div className="fc-hint">Swipe or use the buttons below</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
