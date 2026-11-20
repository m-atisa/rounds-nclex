import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path';
const C = new URL('../../content', import.meta.url).pathname;
export const load = f => { const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(f,'utf8'), ctx); return ctx.window.NURSE_DATA[0]; };
export const packs = () => fs.readdirSync(C).filter(f => f.endsWith('.js')).map(f => { try { return { f, p: load(path.join(C, f)) }; } catch (e) { return { f, err: e.message }; } });
export const strip = s => String(s ?? '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
export const words = s => strip(s).split(' ').filter(Boolean);
export const sentences = s => strip(s).split(/(?<=[.!?])\s+(?=[A-Z“"(])/).filter(x => x.split(' ').length > 2);
export function syl(w) { w = w.toLowerCase().replace(/[^a-z]/g, ''); if (!w) return 0; if (w.length <= 3) return 1; w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, ''); const m = w.match(/[aeiouy]{1,2}/g); return m ? m.length : 1; }
export function fk(text) { const s = sentences(text); const w = words(text); if (!s.length || !w.length) return 0; const sy = w.reduce((a, x) => a + syl(x), 0); return 0.39 * (w.length / s.length) + 11.8 * (sy / w.length) - 15.59; }
export const tokens = s => new Set(strip(s).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(' ').filter(w => w.length > 3));
export const jacc = (a, b) => { let i = 0; for (const x of a) if (b.has(x)) i++; return i / (a.size + b.size - i || 1); };
