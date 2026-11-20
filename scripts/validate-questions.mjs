// node scripts/validate-questions.mjs <content/file.js>   — validates a NEW question pack against the whole bank
import path from 'node:path'; import { load, packs, strip, tokens, jacc } from './lib/common.mjs';
const CJMM = ['Recognize Cues','Analyze Cues','Prioritize Hypotheses','Generate Solutions','Take Action','Evaluate Outcomes'];
const FOCUS = ['Prioritization','Assessment Findings','Nursing Interventions','Client Teaching','Pharmacology','Delegation & Safety','Lifespan & Diversity','Pathophysiology'];
const target = path.resolve(process.argv[2]); const errs = [], warns = [];
let p; try { p = load(target); } catch (e) { console.log('ERROR syntax: ' + e.message); process.exit(1); }
const all = packs(); const bad = all.filter(x => x.err); if (bad.length) warns.push('other packs failed to parse: ' + bad.map(b => b.f).join(','));
const mid = p.moduleId; const same = all.filter(x => x.p && x.p.moduleId === mid);
const topicIds = new Set(same.flatMap(x => (x.p.topics || []).map(t => t.id)));
const otherQs = all.filter(x => x.p && path.join(new URL('../content', import.meta.url).pathname, x.f) !== target).flatMap(x => x.p.questions || []);
const ids = new Set(otherQs.map(q => q.id));
const exist = otherQs.filter(q => q.id.startsWith(mid + '-') || same.some(s => (s.p.questions||[]).includes(q))).map(q => ({ id: q.id, t: tokens(q.stem + ' ' + q.options.join(' ')) }));
const unit6 = ['m7','m23','m29','m38','m41'].includes(mid);
const pos = {}; let longest = 0, mcqN = 0; const fm = { priority: 0, single: 0, sata: 0 }; const seen = [];
for (const q of p.questions || []) {
  const E = m => errs.push(q.id + ': ' + m), W = m => warns.push(q.id + ': ' + m);
  if (ids.has(q.id)) E('id already used'); ids.add(q.id);
  if (!topicIds.has(q.topic)) E('unknown topic ' + q.topic);
  if (!Array.isArray(q.alsoTests)) E('alsoTests must be array'); else q.alsoTests.forEach(a => { if (!topicIds.has(a) || a === q.topic) E('bad alsoTests ' + a); });
  if (!CJMM.includes(q.cjmm)) E('bad cjmm'); if (!FOCUS.includes(q.focus)) E('bad focus ' + q.focus);
  if (![1,2,3].includes(q.difficulty)) E('bad difficulty');
  if (!new RegExp('^Module ' + p.moduleNumber + ' · ').test(q.ref || '')) E('ref must start "Module ' + p.moduleNumber + ' · "');
  if (unit6 && !/slides \d+/.test(q.ref)) E('Unit 6 ref must include "slides N"');
  if (/source slide|guide clarification|the slide|study guide|textbook|the pdf/i.test(q.stem)) E('stem mentions source material');
  if (!(q.hintContent?.length > 15) || !(q.hintStrategy?.length > 15)) E('hints missing/short');
  if (!(strip(q.rationale).length > 150)) E('rationale too short');
  if (!q.takeaway || !q.clientNeed) E('takeaway/clientNeed missing');
  if (q.optionRationales?.length !== q.options?.length) E('optionRationales must match options');
  if (/\boption [A-F]\b|\bchoice [A-F]\b|\b[A-D]\) /i.test(q.rationale + (q.optionRationales||[]).join(' '))) E('rationale refers to option letters (options are shuffled)');
  if (q.type === 'mcq') {
    mcqN++; if (typeof q.priority !== 'boolean') E('priority must be boolean'); fm[q.priority ? 'priority' : 'single']++;
    if (q.options.length !== 4) E('mcq needs 4 options'); if (!(q.answer >= 0 && q.answer < 4)) E('bad answer');
    pos[q.answer] = (pos[q.answer] || 0) + 1;
    const L = q.options.map(o => o.length); if (L[q.answer] === Math.max(...L) && L[q.answer] > 1.2 * Math.min(...L.filter((_, i) => i !== q.answer))) longest++;
    q.optionRationales?.forEach((r, i) => { if ((i === q.answer) !== /^Correct/.test(r)) E('optionRationale ' + i + ' Correct/Incorrect mismatch'); });
  } else if (q.type === 'sata') {
    fm.sata++; if (q.options.length < 5 || q.options.length > 6) E('sata needs 5-6 options');
    if (!/Select all that apply\.?$/.test(q.stem.trim())) E('sata stem must end "Select all that apply."');
    if (!Array.isArray(q.answer) || q.answer.length < 2 || q.answer.length >= q.options.length || new Set(q.answer).size !== q.answer.length || q.answer.some(a => !(a >= 0 && a < q.options.length))) E('bad sata answer');
    q.optionRationales?.forEach((r, i) => { if (q.answer.includes(i) !== /^Correct/.test(r)) E('optionRationale ' + i + ' Correct/Incorrect mismatch'); });
  } else E('type must be mcq or sata');
  if (/^(what is|which (term|word|definition)|.* is defined as|define )/i.test(q.stem) || /\bis called\b|\bis known as\b/i.test(q.stem)) W('looks like pure recall — prefer a clinical scenario');
  const t = tokens(q.stem + ' ' + q.options.join(' '));
  for (const e of exist) if (jacc(t, e.t) > 0.6) E('near-duplicate of existing ' + e.id);
  for (const s of seen) if (jacc(t, s.t) > 0.6) E('near-duplicate of ' + s.id + ' in this file');
  seen.push({ id: q.id, t });
}
const n = (p.questions || []).length;
if (mcqN && Math.max(...Object.values(pos)) > 0.36 * mcqN) errs.push('MCQ answer positions unbalanced ' + JSON.stringify(pos));
if (mcqN && longest > 0.25 * mcqN) errs.push('correct MCQ option is clearly the longest in ' + longest + '/' + mcqN + ' (length cue)');
if (n && fm.sata < 0.22 * n) errs.push('need ~30% SATA (have ' + fm.sata + '/' + n + ')');
if (n && fm.priority < 0.25 * n) errs.push('need ~35-40% priority MCQs (have ' + fm.priority + '/' + n + ')');
const byTopic = {}; (p.questions || []).forEach(q => byTopic[q.topic] = (byTopic[q.topic] || 0) + 1);
console.log(path.basename(target) + ': ' + n + ' questions ' + JSON.stringify(byTopic) + ' formats ' + JSON.stringify(fm) + ' positions ' + JSON.stringify(pos));
warns.forEach(w => console.log('WARN ' + w)); errs.forEach(e => console.log('ERROR ' + e));
console.log(errs.length ? 'FAILED with ' + errs.length + ' errors' : 'OK'); process.exit(errs.length ? 1 : 0);
