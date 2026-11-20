import { UNITS, isNewModule, unitModules } from '../data';
import type { Module } from '../data/types';
import { Chip, toggleIn } from './ui';

/** Module filter chips grouped by unit, with a per-unit "Select all". */
export function ModuleChips({ selected, onChange, count }: { selected: string[]; onChange: (next: string[]) => void; count?: (m: Module) => number }) {
  return (
    <div className="module-chips">
      <div className="chips">
        <Chip on={!selected.length} onClick={() => onChange([])}>
          All modules
        </Chip>
      </div>
      {UNITS.map((u) => {
        const allOn = u.moduleIds.every((id) => selected.includes(id));
        return (
          <div key={u.slug} className="unit-chips">
            <div className="unit-chips-head">
              <span className="eyebrow">{u.title}</span>
              <button
                type="button"
                className="link-btn"
                onClick={() => onChange(allOn ? selected.filter((x) => !u.moduleIds.includes(x)) : [...new Set([...selected, ...u.moduleIds])])}
              >
                {allOn ? 'Clear' : 'Select all'}
              </button>
            </div>
            <div className="chips">
              {unitModules(u).map((m) => (
                <Chip key={m.id} isNew={isNewModule(m.id)} on={selected.includes(m.id)} color={m.color} onClick={() => onChange(toggleIn(selected, m.id))} count={count?.(m)}>
                  {m.number} · {m.title}
                </Chip>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
