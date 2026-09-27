import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AnimatePresence, motion } from 'motion/react';
import { Fragment, useId } from 'react';
import { MODULE_BY_ID } from '../../data';
import type {
  BowtieQuestion,
  HighlightQuestion,
  ChoiceQuestion,
  DropdownQuestion,
  MatrixQuestion,
  OrderQuestion,
  Question,
  Response,
  SataQuestion,
} from '../../data/types';
import { FORMAT_LABEL, formatOf } from '../../data/types';
import { highlightSegments } from '../../lib/scoring';
import { cx, letter } from '../../lib/util';
import { Icon } from '../Icon';
import { Difficulty, Html } from '../ui';

type Props = {
  q: Question;
  response: Response;
  perm: number[];
  /** Show correctness + rationales on the options. */
  revealed: boolean;
  /** Inputs disabled. */
  locked: boolean;
  onChange: (r: Response) => void;
};

export function RefBadge({ q }: { q: Question }) {
  const m = MODULE_BY_ID[q.moduleId];
  return (
    <span className="badge badge-ref" style={{ ['--mc' as string]: m?.color }} title="Content reference">
      <Icon name="book" />
      {q.ref}
    </span>
  );
}

export function QuestionMeta({ q, extra }: { q: Question; extra?: React.ReactNode }) {
  return (
    <div className="q-meta">
      <RefBadge q={q} />
      <span className={cx('q-type', formatOf(q) === 'priority' && 'is-priority')}>{FORMAT_LABEL[formatOf(q)]}</span>
      <Difficulty level={q.difficulty} />
      {extra}
    </div>
  );
}

export function QuestionBody(props: Props) {
  const { q } = props;
  return (
    <>
      <Html as="div" className="q-stem" html={q.stem} />
      {q.type === 'mcq' && <Choices {...props} q={q} />}
      {q.type === 'sata' && <Choices {...props} q={q} />}
      {q.type === 'order' && <OrderList {...props} q={q} />}
      {q.type === 'matrix' && <Matrix {...props} q={q} />}
      {q.type === 'dropdown' && <Cloze {...props} q={q} />}
      {q.type === 'highlight' && <Highlight {...props} q={q} />}
      {q.type === 'bowtie' && <Bowtie {...props} q={q} />}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* MCQ + SATA                                                           */
/* ------------------------------------------------------------------ */

function Choices({ q, response, perm, revealed, locked, onChange }: Props & { q: ChoiceQuestion | SataQuestion }) {
  const multi = q.type === 'sata';
  const selected = new Set<number>(
    response.type === 'sata' ? response.value : response.type === 'mcq' && response.value !== null ? [response.value] : [],
  );
  const key = new Set<number>(q.type === 'sata' ? q.answer : [q.answer]);
  const order = perm.length === q.options.length ? perm : q.options.map((_, i) => i);

  const pick = (i: number) => {
    if (locked) return;
    if (multi) {
      const next = selected.has(i) ? [...selected].filter((x) => x !== i) : [...selected, i];
      onChange({ type: 'sata', value: next });
    } else onChange({ type: 'mcq', value: i });
  };

  return (
    <div className="options" role={multi ? 'group' : 'radiogroup'} aria-label="Answer options">
      {order.map((orig, pos) => {
        const isSel = selected.has(orig);
        const isKey = key.has(orig);
        const state = revealed ? (isKey ? (isSel ? 'correct' : 'missed') : isSel ? 'wrong' : 'neutral') : '';
        const why = revealed ? q.optionRationales?.[orig] : undefined;
        return (
          <motion.button
            type="button"
            key={orig}
            className={cx('opt', multi && 'sata', state, revealed && !isKey && !isSel && 'dim')}
            role={multi ? 'checkbox' : 'radio'}
            aria-checked={isSel}
            disabled={locked}
            onClick={() => pick(orig)}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 + pos * 0.05, duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            whileTap={locked ? undefined : { scale: 0.99 }}
            layout="position"
          >
            <span className="opt-key">
              {multi ? <Icon name="check" /> : letter(pos)}
            </span>
            <span className="opt-text">
              <Html html={q.options[orig]} />
              {revealed && (state === 'correct' || state === 'missed') && (
                <span className="opt-flag good">{state === 'missed' ? 'Correct answer — not selected' : 'Correct'}</span>
              )}
              {revealed && state === 'wrong' && <span className="opt-flag bad">Your answer</span>}
              <AnimatePresence>
                {why && (
                  <motion.span className="opt-why" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <Html html={why} />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ordered response (drag & drop, keyboard, buttons)                    */
/* ------------------------------------------------------------------ */

function OrderList({ q, response, revealed, locked, onChange }: Props & { q: OrderQuestion }) {
  const value = response.type === 'order' ? response.value : q.options.map((_, i) => i);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const commit = (next: number[]) => onChange({ type: 'order', value: next, touched: true });
  const onDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const from = value.indexOf(Number(e.active.id));
    const to = value.indexOf(Number(e.over.id));
    commit(arrayMove(value, from, to));
  };
  const move = (pos: number, dir: -1 | 1) => {
    const to = pos + dir;
    if (to < 0 || to >= value.length) return;
    commit(arrayMove(value, pos, to));
  };

  return (
    <>
      {!locked && <p className="order-help faint">Drag items (or use the arrows) to arrange them from first to last.</p>}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={value.map(String)} strategy={verticalListSortingStrategy}>
          <ol className="order-list">
            {value.map((orig, pos) => (
              <SortableRow
                key={orig}
                id={String(orig)}
                pos={pos}
                total={value.length}
                text={q.options[orig]}
                locked={locked}
                state={revealed ? (orig === pos ? 'correct' : 'wrong') : ''}
                correctPos={orig}
                onMove={(d) => move(pos, d)}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
    </>
  );
}

function SortableRow({
  id,
  pos,
  total,
  text,
  locked,
  state,
  correctPos,
  onMove,
}: {
  id: string;
  pos: number;
  total: number;
  text: string;
  locked: boolean;
  state: string;
  correctPos: number;
  onMove: (d: -1 | 1) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled: locked });
  return (
    <li
      ref={setNodeRef}
      className={cx('order-item', isDragging && 'dragging', state, locked && 'locked')}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      {!locked && (
        <span className="order-grip">
          <Icon name="grip" />
        </span>
      )}
      <span className="order-num">{pos + 1}</span>
      <span className="order-text">
        <Html html={text} />
        {state === 'wrong' && <span className="order-correct-hint">Belongs in position {correctPos + 1}</span>}
      </span>
      {!locked && (
        <span className="order-btns" onPointerDown={(e) => e.stopPropagation()}>
          <button type="button" aria-label="Move up" disabled={pos === 0} onClick={() => onMove(-1)}>
            <Icon name="chevronUp" />
          </button>
          <button type="button" aria-label="Move down" disabled={pos === total - 1} onClick={() => onMove(1)}>
            <Icon name="chevronDown" />
          </button>
        </span>
      )}
      {state === 'correct' && (
        <span className="order-state good">
          <Icon name="check" />
        </span>
      )}
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Matrix                                                               */
/* ------------------------------------------------------------------ */

function Matrix({ q, response, revealed, locked, onChange }: Props & { q: MatrixQuestion }) {
  const value = response.type === 'matrix' ? response.value : q.rows.map(() => null);
  const name = useId();
  return (
    <div className="matrix-wrap">
      <table className="matrix">
        <thead>
          <tr>
            <th scope="col">Finding / action</th>
            {q.columns.map((c) => (
              <th scope="col" key={c}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {q.rows.map((row, r) => {
            const ok = value[r] === q.answer[r];
            return (
              <motion.tr
                key={r}
                className={revealed ? (ok ? 'correct' : 'wrong') : ''}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + r * 0.05 }}
              >
                <td>
                  <Html html={row} />
                  {revealed && q.optionRationales?.[r] && <Html className="row-why" html={q.optionRationales[r]} />}
                </td>
                {q.columns.map((c, ci) => (
                  <td key={c}>
                    <input
                      className={cx('radio', revealed && q.answer[r] === ci && 'is-answer')}
                      type="radio"
                      name={`${name}-${r}`}
                      aria-label={`${row.replace(/<[^>]+>/g, '')}: ${c}`}
                      checked={value[r] === ci}
                      disabled={locked}
                      onChange={() => {
                        const next = [...value];
                        next[r] = ci;
                        onChange({ type: 'matrix', value: next });
                      }}
                    />
                  </td>
                ))}
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Drop-down cloze                                                      */
/* ------------------------------------------------------------------ */

function Cloze({ q, response, revealed, locked, onChange }: Props & { q: DropdownQuestion }) {
  const value = response.type === 'dropdown' ? response.value : q.blanks.map(() => null);
  const parts = q.template.split(/\{(\d+)\}/);
  return (
    <motion.div className="cloze" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
      {parts.map((part, i) => {
        if (i % 2 === 0) return <Html key={i} html={part} />;
        const b = Number(part);
        const blank = q.blanks[b];
        if (!blank) return null;
        const v = value[b];
        const ok = v === blank.answer;
        return (
          <Fragment key={i}>
            <select
              className={cx(revealed && (ok ? 'correct' : 'wrong'))}
              value={v ?? ''}
              disabled={locked}
              aria-label={`Blank ${b + 1}`}
              onChange={(e) => {
                const next = [...value];
                next[b] = e.target.value === '' ? null : Number(e.target.value);
                onChange({ type: 'dropdown', value: next });
              }}
            >
              <option value="">Select…</option>
              {blank.options.map((o, oi) => (
                <option key={oi} value={oi}>
                  {o}
                </option>
              ))}
            </select>
            {revealed && !ok && <span className="fix"> → {blank.options[blank.answer]}</span>}
          </Fragment>
        );
      })}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Highlight (NGN)                                                      */
/* ------------------------------------------------------------------ */

function Highlight({ q, response, revealed, locked, onChange }: Props & { q: HighlightQuestion }) {
  const picked = new Set(response.type === 'highlight' ? response.value : []);
  const key = new Set(q.answer);
  const parts = highlightSegments(q.passage);
  const toggle = (i: number) => {
    if (locked) return;
    const next = picked.has(i) ? [...picked].filter((x) => x !== i) : [...picked, i];
    onChange({ type: 'highlight', value: next });
  };
  let seg = -1;
  const notes = revealed
    ? parts
        .map((text, i) => (i % 2 ? { i: (i - 1) / 2, text } : null))
        .filter((x): x is { i: number; text: string } => !!x && (key.has(x.i) || picked.has(x.i)) && !!q.optionRationales?.[x.i])
    : [];
  return (
    <>
      {!locked && <p className="order-help faint">Select each phrase that applies. Select again to remove the highlight.</p>}
      <motion.div className="hl-passage" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
        {parts.map((text, i) => {
          if (i % 2 === 0) return <Html key={i} html={text} />;
          seg++;
          const s = seg;
          const on = picked.has(s);
          const state = revealed ? (key.has(s) ? (on ? 'correct' : 'missed') : on ? 'wrong' : '') : '';
          return (
            <span
              key={i}
              role="button"
              tabIndex={locked ? -1 : 0}
              className={cx('hl-seg', on && 'on', state, locked && 'locked')}
              aria-pressed={on}
              aria-disabled={locked}
              onClick={() => toggle(s)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  toggle(s);
                }
              }}
            >
              {text}
            </span>
          );
        })}
      </motion.div>
      {notes.length > 0 && (
        <ul className="hl-notes">
          {notes.map((n) => (
            <li key={n.i} className={key.has(n.i) ? 'good' : 'bad'}>
              <b>{n.text}</b> — <Html html={q.optionRationales![n.i]} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Bowtie (NGN)                                                         */
/* ------------------------------------------------------------------ */

type BowKey = 'actions' | 'condition' | 'parameters';
const BOW_META: Record<BowKey, { title: string; max: number }> = {
  actions: { title: 'Actions to take', max: 2 },
  condition: { title: 'Potential condition', max: 1 },
  parameters: { title: 'Parameters to monitor', max: 2 },
};

function Bowtie({ q, response, revealed, locked, onChange }: Props & { q: BowtieQuestion }) {
  const v = response.type === 'bowtie' ? response.value : { condition: null, actions: [], parameters: [] };
  const picked = (k: BowKey): number[] => (k === 'condition' ? (v.condition === null ? [] : [v.condition]) : v[k]);
  const keyOf = (k: BowKey): number[] => (k === 'condition' ? [q.condition.answer] : q[k].answer);
  const pick = (k: BowKey, i: number) => {
    if (locked) return;
    if (k === 'condition') return onChange({ type: 'bowtie', value: { ...v, condition: v.condition === i ? null : i } });
    const cur = v[k];
    const next = cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i].slice(-BOW_META[k].max);
    onChange({ type: 'bowtie', value: { ...v, [k]: next } });
  };
  const slot = (k: BowKey, n: number) => {
    const idx = picked(k)[n];
    const filled = idx !== undefined;
    const ok = revealed && filled && keyOf(k).includes(idx);
    return (
      <motion.div
        key={`${k}-${n}-${idx ?? 'x'}`}
        className={cx('bow-slot', filled && 'filled', revealed && filled && (ok ? 'correct' : 'wrong'))}
        initial={filled ? { scale: 0.92, opacity: 0.4 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      >
        {filled ? <Html html={q[k].options[idx]} /> : <span className="faint">Select below</span>}
      </motion.div>
    );
  };
  return (
    <div className="bowtie">
      <div className="bow-diagram" aria-hidden="true">
        <div className="bow-col">
          <span className="bow-label">{BOW_META.actions.title}</span>
          {slot('actions', 0)}
          {slot('actions', 1)}
        </div>
        <svg className="bow-lines" viewBox="0 0 40 100" preserveAspectRatio="none">
          <path d="M0 25 L40 50 M0 75 L40 50" />
        </svg>
        <div className="bow-col center">
          <span className="bow-label">{BOW_META.condition.title}</span>
          {slot('condition', 0)}
        </div>
        <svg className="bow-lines" viewBox="0 0 40 100" preserveAspectRatio="none">
          <path d="M0 50 L40 25 M0 50 L40 75" />
        </svg>
        <div className="bow-col">
          <span className="bow-label">{BOW_META.parameters.title}</span>
          {slot('parameters', 0)}
          {slot('parameters', 1)}
        </div>
      </div>
      <div className="bow-banks">
        {(['actions', 'condition', 'parameters'] as BowKey[]).map((k) => (
          <div key={k} className="bow-bank">
            <span className="bow-label">
              {BOW_META[k].title} <span className="faint">· choose {BOW_META[k].max}</span>
            </span>
            {q[k].options.map((o, i) => {
              const on = picked(k).includes(i);
              const isKey = keyOf(k).includes(i);
              const state = revealed ? (isKey ? (on ? 'correct' : 'missed') : on ? 'wrong' : '') : '';
              const why = revealed && (isKey || on) ? q.optionRationales?.[k]?.[i] : undefined;
              return (
                <button key={i} type="button" className={cx('bow-opt', on && 'on', state)} aria-pressed={on} disabled={locked} onClick={() => pick(k, i)}>
                  <Html html={o} />
                  {why && <Html className="opt-why" html={why} />}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
