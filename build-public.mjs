// Publish only intentional public assets, never repository notes, tests or audit data.
import { promises as fs } from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const out = path.join(root, 'dist');
await fs.mkdir(out, { recursive: true });
if (await fs.realpath(out) !== path.join(await fs.realpath(root), 'dist')) {
    throw new Error('Refusing to clean a dist directory that resolves outside the project.');
}
const allowed = file => file.endsWith('.html') || /^(style|script)\.[a-f0-9]{10}\.min\.(css|js)$/.test(file)
    || ['ads.txt', 'robots.txt', 'sitemap.xml', 'manifest.webmanifest', 'service-worker.js', 'CNAME'].includes(file);
// Remove only files previously staged inside the checked, fixed output directory.
for (const file of await fs.readdir(out)) await fs.rm(path.join(out, file), { recursive: true, force: true });
for (const file of await fs.readdir(root)) {
    if (allowed(file)) await fs.copyFile(path.join(root, file), path.join(out, file));
}
for (const dir of ['images', '.well-known']) await fs.cp(path.join(root, dir), path.join(out, dir), { recursive: true });
await fs.writeFile(path.join(out, '.nojekyll'), '');
console.log('Public artifact staged in dist/');
