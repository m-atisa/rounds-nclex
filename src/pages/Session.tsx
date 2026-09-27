import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MODULE_BY_ID, QUESTION_BY_ID } from '../data';
import type { Question, Response } from '../data/types';
import { Icon } from '../components/Icon';
import { QuestionBody, QuestionMeta } from '../components/question/QuestionView';
import { ConfidencePicker, Feedback, Hints } from '../components/question/Support';
import { Bar, Modal, celebrate, toast } from '../components/ui';
import { classify, fragileReasons, isAnswered, isSlow, scoreResponse, type Confidence } from '../lib/scoring';
import { cx, fmtClock, fmtDuration } from '../lib/util';
import { useProgress, type HintKind, type Session, type SessionItem } from '../store/progress';

export function SessionPage() {
  const active = useProgress((s) => s.active);
  if (!active) {
    return (
      <div className="container empty">
        <Icon name="pulse" />
        <h2>No session in progress</h2>
        <p>Start a practice set or an exam to begin.</p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Link to="/practice" className="btn btn-primary">
            Practice
          </Link>
          <Link to="/exam" className="btn">
            Exam
          </Link>
        </div>
      </div>
    );
  }
  return <Runner key={active.id} session={active} />;
}

function Runner({ session }: { session: Session }) {
  const { updateActive, recordAttempt, finishActive, discardActive } = useProgress();
  const navigate = useNavigate();
  const isExam = session.mode === 'exam';
  const qid = session.qids[session.idx];
  const q = QUESTION_BY_ID[qid];
  const item = session.items[qid];
  const total = session.qids.length;
  const [exitOpen, setExitOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [runStreak, setRunStreak] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);
  const shownAt = useRef(performance.now());
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('in-quiz');
    return () => document.body.classList.remove('in-quiz');
  }, []);

  const patchItem = useCallback(
    (id: string, patch: Partial<SessionItem> | ((it: SessionItem) => Partial<SessionItem>)) =>
      updateActive((s) => {
        const it = s.items[id];
        const p = typeof patch === 'function' ? patch(it) : patch;
        return { ...s, items: { ...s.items, [id]: { ...it, ...p } } };
      }),
    [updateActive],
  );

  /** Move accumulated on-screen time into the current item. Returns the item's new total ms. */
  const flush = useCallback(() => {
    const now = performance.now();
    const d = now - shownAt.current;
    shownAt.current = now;
    const cur = useProgress.getState().active;
    if (!cur) return 0;
    const it = cur.items[cur.qids[cur.idx]];
    if (!it || it.locked) return it?.ms ?? 0;
    const ms = it.ms + Math.min(d, 10 * 60_000); // cap idle gaps
    patchItem(cur.qids[cur.idx], { ms });
    return ms;
  }, [patchItem]);

  // Pause timing when the tab is hidden; flush on unmount.
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) flush();
      else shownAt.current = performance.now();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      flush();
    };
  }, [flush]);

  useEffect(() => {
    shownAt.current = performance.now();
    cardRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [session.idx]);

  /* ---------------- finishing ---------------- */

  const finish = useCallback(() => {
    flush();
    const cur = useProgress.getState().active;
    if (!cur) return;
    let qids = cur.qids;
    const items = { ...cur.items };
    if (cur.mode === 'exam') {
      for (const id of qids) {
        const it = items[id];
        const qq = QUESTION_BY_ID[id];
        const answered = isAnswered(it.response);
        const sc = scoreResponse(qq, it.response);
        items[id] = { ...it, locked: true, score: answered ? sc.score : 0, correct: answered && sc.correct };
        recordAttempt(id, {
          t: Date.now(),
          score: answered ? sc.score : 0,
          correct: answered && sc.correct,
          ms: it.ms,
          hints: 0,
          conf: it.confidence,
          mode: 'exam',
          mastery: classify({ q: qq, answered, correct: answered && sc.correct, ms: it.ms, hints: 0, confidence: it.confidence }),
        });
      }
    } else {
      qids = qids.filter((id) => items[id].locked);
      if (!qids.length) {
        discardActive();
        navigate('/practice');
        return;
      }
    }
    updateActive((s) => ({ ...s, qids, items, idx: 0 }));
    const id = finishActive();
    if (id) navigate(`/results/${id}`);
  }, [flush, recordAttempt, updateActive, finishActive, discardActive, navigate]);

  /* ---------------- exam clock ---------------- */

  useEffect(() => {
    if (!isExam) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      updateActive((s) => ({ ...s, elapsedSec: s.elapsedSec + 1 }));
    }, 1000);
    return () => clearInterval(t);
  }, [isExam, updateActive]);

  const remaining = session.timeLimitSec ? session.timeLimitSec - session.elapsedSec : null;
  const warnedRef = useRef(false);
  useEffect(() => {
    if (remaining === null) return;
    if (remaining <= 300 && remaining > 0 && !warnedRef.current && session.timeLimitSec! > 600) {
      warnedRef.current = true;
      toast('⏱ 5 minutes remaining');
    }
    if (remaining <= 0) {
      toast('Time’s up — submitting your exam');
      finish();
    }
  }, [remaining, finish, session.timeLimitSec]);

  /* ---------------- actions ---------------- */

  const setResponse = (r: Response) => {
    if (item.locked) return;
    patchItem(qid, { response: r });
  };

  const takeHint = (k: HintKind) => patchItem(qid, (it) => ({ hints: [...it.hints, k] }));

  const submit = () => {
    if (item.locked || !isAnswered(item.response)) return;
    const ms = flush();
    const sc = scoreResponse(q, item.response);
    const mastery = classify({ q, answered: true, correct: sc.correct, ms, hints: item.hints.length });
    patchItem(qid, { locked: true, score: sc.score, correct: sc.correct, ms });
    recordAttempt(qid, { t: Date.now(), score: sc.score, correct: sc.correct, ms, hints: item.hints.length, mode: 'practice', mastery });
    if (sc.correct) {
      const s = runStreak + 1;
      setRunStreak(s);
      if (s === 5 || s === 10 || s === 20) {
        celebrate(0.6);
        toast(`${s} in a row! 🔥`);
      }
    } else {
      setRunStreak(0);
      setShakeKey((k) => k + 1);
    }
  };

  const go = (idx: number) => {
    if (idx < 0 || idx >= total) return;
    flush();
    updateActive((s) => ({ ...s, idx }));
  };

  const next = () => {
    if (session.idx >= total - 1) {
      if (isExam) setReviewOpen(true);
      else finish();
    } else go(session.idx + 1);
  };

  // Keyboard: 1-9 choose options, Enter submits / advances.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (exitOpen || reviewOpen) return;
      const el = e.target as HTMLElement;
      if (el.closest('select, input, textarea, [role="dialog"]')) return;
      if (e.key === 'Enter' && !el.closest('button')) {
        e.preventDefault();
        if (!isExam && !item.locked) submit();
        else next();
      }
      const n = Number(e.key);
      if (n >= 1 && n <= 9 && !item.locked && (q.type === 'mcq' || q.type === 'sata')) {
        const orig = item.perm[n - 1];
        if (orig === undefined) return;
        if (q.type === 'mcq') setResponse({ type: 'mcq', value: orig });
        else {
          const cur = item.response.type === 'sata' ? item.response.value : [];
          setResponse({ type: 'sata', value: cur.includes(orig) ? cur.filter((x) => x !== orig) : [...cur, orig] });
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!q || !item) {
    return (
      <div className="container empty">
        <h2>This session references questions that no longer exist.</h2>
        <button className="btn btn-primary" onClick={() => { discardActive(); navigate('/'); }}>
          Discard session
        </button>
      </div>
    );
  }

  const answeredCount = session.qids.filter((id) => (isExam ? isAnswered(session.items[id].response) : session.items[id].locked)).length;
  const m = MODULE_BY_ID[q.moduleId];
  const answered = isAnswered(item.response);
  const revealed = !isExam && item.locked;
  const sc = revealed ? scoreResponse(q, item.response) : null;

  return (
    <div className="container" style={{ ['--mc' as string]: m?.color }}>
      <div className="quiz-top">
        <div className="quiz-wrap quiz-bar">
          <button className="icon-btn" onClick={() => setExitOpen(true)} aria-label="Pause or exit session">
            <Icon name="x" />
          </button>
          <Bar value={answeredCount / total} />
          <span className="quiz-count">
            {session.idx + 1}/{total}
          </span>
          {remaining !== null && (
            <span className={cx('timer', remaining < 60 && 'low')}>
              <Icon name="clock" /> {fmtClock(remaining)}
            </span>
          )}
          {!isExam && runStreak >= 2 && (
            <motion.span className="streak-pill" key={runStreak} initial={{ scale: 0.6 }} animate={{ scale: 1 }}>
              🔥 {runStreak}
            </motion.span>
          )}
        </div>
      </div>

      <div className="quiz-wrap">
        <div className="session-title">
          <span className={cx('mode-tag', session.mode)}>{isExam ? 'Exam mode' : 'Practice mode'}</span>
          <span className="faint">{session.title}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={qid}
            ref={cardRef}
            tabIndex={-1}
            className="card q-card"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <QuestionMeta
              q={q}
              extra={
                isExam ? (
                  <button
                    type="button"
                    className={cx('btn btn-sm flag-btn')}
                    aria-pressed={item.flagged}
                    onClick={() => patchItem(qid, { flagged: !item.flagged })}
                  >
                    <Icon name="flag" /> {item.flagged ? 'Flagged' : 'Flag'}
                  </button>
                ) : null
              }
            />
            <motion.div key={shakeKey} animate={shakeKey ? { x: [0, -7, 7, -5, 5, 0] } : {}} transition={{ duration: 0.4 }}>
              <QuestionBody q={q} response={item.response} perm={item.perm} revealed={revealed} locked={item.locked} onChange={setResponse} />
            </motion.div>

            {!isExam && !item.locked && <Hints q={q} used={item.hints} onUse={takeHint} />}

            {isExam && session.askConfidence && answered && (
              <ConfidencePicker value={item.confidence} onChange={(c: Confidence) => patchItem(qid, { confidence: c })} />
            )}

            {revealed && sc && <Feedback q={q} score={sc} extra={<PaceNote q={q} item={item} correct={sc.correct} />} />}

            <div className="quiz-actions">
              {isExam && (
                <button className="btn btn-ghost" onClick={() => go(session.idx - 1)} disabled={session.idx === 0}>
                  <Icon name="arrowLeft" /> Back
                </button>
              )}
              <div className="spacer" />
              {!isExam && !item.locked && (
                <motion.button className="btn btn-primary btn-lg" onClick={submit} disabled={!answered} whileTap={{ scale: 0.97 }}>
                  Check answer <Icon name="check" />
                </motion.button>
              )}
              {(isExam || item.locked) && (
                <motion.button
                  className={cx('btn btn-lg', isExam ? 'btn-primary' : 'btn-primary')}
                  onClick={next}
                  whileTap={{ scale: 0.97 }}
                  initial={!isExam ? { opacity: 0, y: 8 } : false}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {session.idx >= total - 1 ? (isExam ? 'Review & submit' : 'See results') : 'Next'} <Icon name="arrowRight" />
                </motion.button>
              )}
            </div>
            {!isExam && !item.locked && (
              <div className="kbd-hints">
                <span>
                  <span className="kbd">1</span>–<span className="kbd">6</span> choose
                </span>
                <span>
                  <span className="kbd">Enter</span> check
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {isExam && (
          <div className="navigator" aria-label="Question navigator">
            {session.qids.map((id, i) => {
              const it = session.items[id];
              return (
                <button
                  key={id}
                  className={cx(i === session.idx && 'current', isAnswered(it.response) && 'answered', it.flagged && 'flagged')}
                  onClick={() => go(i)}
                  aria-label={`Question ${i + 1}${it.flagged ? ', flagged' : ''}${isAnswered(it.response) ? ', answered' : ''}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Modal open={exitOpen} onClose={() => setExitOpen(false)} title={<b>Take a breather?</b>}>
        <p className="muted">Your progress is saved. You can resume this session any time from the home page.</p>
        <div className="stack">
          <button className="btn btn-primary btn-block" onClick={() => { flush(); navigate('/'); }}>
            Save &amp; exit
          </button>
          <button className="btn btn-block" onClick={() => { setExitOpen(false); finish(); }}>
            {isExam ? 'Submit exam now' : 'End session & see results'}
          </button>
          <button className="btn btn-ghost btn-block danger" onClick={() => { discardActive(); navigate('/'); }}>
            Discard session
          </button>
        </div>
      </Modal>

      {isExam && (
        <Modal open={reviewOpen} onClose={() => setReviewOpen(false)} title={<b>Ready to submit?</b>}>
          <ExamReview session={session} onJump={(i) => { setReviewOpen(false); go(i); }} />
          <div className="row" style={{ marginTop: 18 }}>
            <button className="btn" onClick={() => setReviewOpen(false)}>
              Keep working
            </button>
            <div className="spacer" />
            <button className="btn btn-primary" onClick={() => { setReviewOpen(false); finish(); }}>
              Submit exam <Icon name="check" />
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function PaceNote({ q, item, correct }: { q: Question; item: SessionItem; correct: boolean }) {
  const reasons = fragileReasons({ q, ms: item.ms, hints: item.hints.length });
  const slow = isSlow(q, item.ms);
  return (
    <div className="pace-note">
      <span className={cx('badge', slow ? 'badge-warn' : 'badge-good')}>
        <Icon name="clock" width={13} /> {fmtDuration(item.ms)} {slow ? '· slower than NCLEX pace' : '· on pace'}
      </span>
      {item.hints.length > 0 && (
        <span className="badge">
          <Icon name="bulb" width={13} /> {item.hints.length} hint{item.hints.length > 1 ? 's' : ''} used
        </span>
      )}
      {correct && reasons.length > 0 && <span className="faint small">We’ll bring this one back — right answers with support still need reps.</span>}
    </div>
  );
}

function ExamReview({ session, onJump }: { session: Session; onJump: (i: number) => void }) {
  const unanswered = session.qids.map((id, i) => ({ id, i })).filter(({ id }) => !isAnswered(session.items[id].response));
  const flagged = session.qids.map((id, i) => ({ id, i })).filter(({ id }) => session.items[id].flagged);
  return (
    <div className="stack">
      <div className="stat-row">
        <div className="stat">
          <b>{session.qids.length - unanswered.length}</b>
          <span>answered</span>
        </div>
        <div className="stat">
          <b>{unanswered.length}</b>
          <span>unanswered</span>
        </div>
        <div className="stat">
          <b>{flagged.length}</b>
          <span>flagged</span>
        </div>
      </div>
      {[
        { label: 'Unanswered', list: unanswered },
        { label: 'Flagged for review', list: flagged },
      ].map(
        (g) =>
          g.list.length > 0 && (
            <div key={g.label}>
              <span className="eyebrow">{g.label}</span>
              <div className="navigator" style={{ marginTop: 8 }}>
                {g.list.map(({ id, i }) => (
                  <button key={id} onClick={() => onJump(i)}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          ),
      )}
      {unanswered.length > 0 && <p className="faint small">Unanswered questions count as incorrect.</p>}
    </div>
  );
}
