// Converts the authored content files (../data/*.js, window.NURSE_DATA format) into JSON for the app.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(root, '../content');
const out = path.resolve(root, '../src/data/raw');
fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(src).filter((f) => f.endsWith('.js')).sort()) {
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(src, f), 'utf8'), ctx);
  const [pack] = ctx.window.NURSE_DATA;
  fs.writeFileSync(path.join(out, f.replace('.js', '.json')), JSON.stringify(pack, null, 1));
  console.log(`${f}: ${pack.topics?.length ?? 0} topics, ${pack.flashcards?.length ?? 0} cards, ${pack.questions?.length ?? 0} questions`);
}
