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
  ChoiceQuestion,
  DropdownQuestion,
  MatrixQuestion,
  OrderQuestion,
  Question,
  Response,
  SataQuestion,
} from '../../data/types';
import { TYPE_LABEL } from '../../data/types';
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
      <span className="q-type">{TYPE_LABEL[q.type]}</span>
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
