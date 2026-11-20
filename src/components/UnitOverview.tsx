import { Link } from 'react-router-dom';
import { unitModules, type Unit } from '../data';
import { cx } from '../lib/util';
import { Icon } from './Icon';

export function NewBadge({ label = 'New' }: { label?: string }) {
  return (
    <span className="new-badge">{label}</span>
  );
}

/** Entry card for a course unit (a grouping of modules). */
export function UnitOverview({ unit }: { unit: Unit }) {
  const mods = unitModules(unit);
  const topics = mods.reduce((sum, m) => sum + m.topics.length, 0);
  const questions = mods.reduce((sum, m) => sum + m.questions.length, 0);
  const cards = mods.reduce((sum, m) => sum + m.flashcards.length, 0);
  return (
    <section className="section" aria-label={unit.title}>
      <Link to={`/learn/${unit.slug}`} className={cx('card card-link unit-overview', unit.isNew && 'is-new')} style={{ ['--mc' as string]: unit.color }}>
        {unit.isNew && <NewBadge label="New content" />}
        <div>
          <span className="eyebrow">{unit.eyebrow}</span>
          <h2>{unit.title}</h2>
          <p>
            {mods.length} modules · {topics} full lessons · {questions} questions · {cards} flashcards
          </p>
        </div>
        <span className="btn btn-primary">
          Explore {unit.label} <Icon name="arrowRight" />
        </span>
      </Link>
    </section>
  );
}
