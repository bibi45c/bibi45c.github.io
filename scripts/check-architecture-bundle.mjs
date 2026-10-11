import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const bundle = 'architecture/hex-tactics/';
const read = (path) => readFileSync(resolve(root, path));
const manifest = JSON.parse(read(`public/${bundle}provenance.json`));
assert.match(manifest.deliveryRevision, /^[a-f0-9]{40}$/);
assert.match(manifest.evidenceRevision, /^[a-f0-9]{40}$/);
for (const [file, record] of Object.entries(manifest.files)) {
  assert.ok(['index.html', 'en.html', 'preview-light.png', 'preview-dark.png'].includes(file));
  const bytes = read(`public/${bundle}${file}`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), record.sha256, file);
  if (file.endsWith('.html')) {
    const html = bytes.toString('utf8');
    assert.ok(html.includes(manifest.evidenceRevision));
    assert.ok(html.includes(file === 'en.html' ? '<html lang="en"' : '<html lang="zh-CN"'));
    assert.ok(!/<(?:script|link)\b[^>]*(?:src|href)=["'](?:https?:)?\/\//i.test(html));
  }
  if (process.argv.includes('--export')) {
    assert.ok(bytes.equals(read(`out/${bundle}${file}`)), `Static export changed ${file}`);
  }
}
assert.equal(Object.keys(manifest.files).length, 4);
assert.ok(read(`public/${bundle}ARCHIFY-LICENSE.md`).toString('utf8').includes('MIT License'));
for (const [file, destination] of [['index.html', `/${bundle}`], ['en.html', `/${bundle}en.html`]]) {
  const path = `UEA-CMP-SEM2-GAME-Turn_Based_Strategy/${file}`;
  const bytes = read(`public/${path}`);
  assert.ok(bytes.toString('utf8').includes(`url=${destination}`), `Invalid legacy redirect ${file}`);
  if (process.argv.includes('--export')) assert.ok(bytes.equals(read(`out/${path}`)));
}
const projects = read(process.argv.includes('--export') ? 'out/project/index.html' : 'components/pages/ProjectPage.jsx').toString('utf8');
for (const path of [`/${bundle}`, `/${bundle}en.html`]) assert.ok(projects.includes(path));
console.log('Architecture bundle passed: accepted EN/ZH hashes, themes, license, project links and legacy redirects' + (process.argv.includes('--export') ? ', including static export.' : '.'));
