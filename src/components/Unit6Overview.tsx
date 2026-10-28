import { Link } from 'react-router-dom';
import { UNIT_6, UNIT_6_MODULES } from '../data';
import { Icon } from './Icon';

/** Course unit entry, distinct from Module 6 (Fluids & Electrolytes). */
export function Unit6Overview() {
  const topics = UNIT_6_MODULES.reduce((sum, m) => sum + m.topics.length, 0);
  const questions = UNIT_6_MODULES.reduce((sum, m) => sum + m.questions.length, 0);
  return (
    <section className="section" aria-label="Unit 6">
      <Link to="/learn/unit-6" className="card card-link unit-overview" style={{ ['--mc' as string]: 'var(--m6)' }}>
        <div>
          <span className="eyebrow">Unit 6 · Modules 7, 23, 29, 38 &amp; 41</span>
          <h2>{UNIT_6.title}</h2>
          <p>{topics} full lessons · {questions} questions · flashcards for every topic</p>
        </div>
        <span className="btn btn-primary">Explore Unit 6 <Icon name="arrowRight" /></span>
      </Link>
    </section>
  );
}
