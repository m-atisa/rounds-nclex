// node scripts/validate-guides.mjs content/guides-*.js  — readability + structure checks for rewritten lessons
import path from 'node:path'; import { load, strip, words, sentences, fk } from './lib/common.mjs';
const errs = [], warns = [];
for (const f of process.argv.slice(2)) {
  let p; try { p = load(path.resolve(f)); } catch (e) { errs.push(f + ' syntax: ' + e.message); continue; }
  const pro = /-pro\.js$/.test(f), u6 = /-unit6\.js$/.test(f);
  if (p.kind !== 'guide') errs.push(f + ': kind must be "guide"');
  for (const t of p.topics) {
    const E = m => errs.push(t.id + ': ' + m), W = m => warns.push(t.id + ': ' + m);
    const prose = [t.bigPicture, ...(t.sections || []).map(s => [s.body, s.example, s.analogy].join(' '))].join(' ');
    const allText = [t.summary, t.bigPicture, ...(t.objectives||[]), ...(t.keyTerms||[]).map(k => k.term + ' ' + k.def), ...(t.sections||[]).map(s => [s.heading, s.keyIdea, s.body, s.example, s.analogy, ...(s.bullets||[]), ...(s.steps||[]), s.table ? s.table.rows.flat().join(' ') : '', s.check ? s.check.q + ' ' + s.check.a : ''].join(' ')), ...(t.pearls||[]), ...(t.redFlags||[]), ...(t.recap||[]), ...(t.checks||[]).map(c => c.q + ' ' + c.a)].join(' ');
    const W_ = words(allText).length;
    if (W_ < 1800) E('lesson only ' + W_ + ' words (need 1,800–3,600) — keep it truly educational'); if (W_ > 3600) E('lesson ' + W_ + ' words (max 3,600) — simplify');
    if ((t.title || '').length > 64) E('title too long (' + t.title.length + ' chars, max 64)');
    if (words(t.summary).length > 32) E('summary > 32 words');
    if (words(t.bigPicture).length > 170) E('bigPicture > 170 words');
    if (!((t.objectives||[]).length >= 4 && t.objectives.length <= 6)) E('objectives must be 4–6');
    if (!((t.recap||[]).length >= 5 && t.recap.length <= 8)) E('recap ("must-know points") must be 5–8');
    if ((t.checks||[]).length < 4) E('need >= 4 checks');
    if (!(t.keyTerms||[]).length) E('keyTerms missing'); (t.keyTerms||[]).forEach(k => { if (words(k.def).length > 35) E('key term def > 35 words: ' + k.term); });
    const secs = t.sections || []; if (secs.length < 7 || secs.length > 12) E('need 7–12 sections (have ' + secs.length + ')');
    const heads = secs.map(s => s.heading || '');
    const need = ['Common traps', 'How the NCLEX tests this', 'Worked case'].concat(pro || u6 ? ['Course source & clinical clarification'] : []);
    for (const h of need) if (!heads.some(x => x.startsWith(h))) E('missing section starting "' + h + '"');
    secs.forEach((s, i) => {
      const h = s.heading || ('#' + i);
      if (words(s.heading).length > 9) E('heading > 9 words: ' + h);
      if (!s.keyIdea && !/^Course source/.test(h)) E('section needs keyIdea: ' + h); else if (words(s.keyIdea).length > 28) E('keyIdea > 28 words: ' + h);
      const paras = String(s.body || '').split(/<\/p>|\n\n/).map(strip).filter(Boolean);
      paras.forEach(pp => { if (words(pp).length > 85) E('paragraph > 85 words in "' + h + '" — split it or use bullets'); });
      if (/\(1\)[^]*\(2\)/.test(strip(s.body))) E('inline numbered list "(1)…(2)" in "' + h + '" — use bullets or steps');
      if (words(s.body).length > 260) E('section body > 260 words: ' + h);
    });
    const ss = sentences(prose); const avg = words(prose).length / (ss.length || 1); const grade = fk(prose);
    if (avg > 19) E('average sentence ' + avg.toFixed(1) + ' words (max 19)');
    if (grade > 10.5) E('reading grade ' + grade.toFixed(1) + ' (max 10.5) — shorter sentences, plainer words');
    const longS = ss.filter(x => x.split(' ').length > 32).length; if (longS > 3) E(longS + ' sentences longer than 32 words (max 3)');
    console.log(t.id + ': ' + W_ + ' words, ' + secs.length + ' sections, avg sentence ' + avg.toFixed(1) + ', grade ' + grade.toFixed(1));
  }
}
warns.forEach(w => console.log('WARN ' + w)); errs.forEach(e => console.log('ERROR ' + e));
console.log(errs.length ? 'FAILED with ' + errs.length + ' errors' : 'OK'); process.exit(errs.length ? 1 : 0);
