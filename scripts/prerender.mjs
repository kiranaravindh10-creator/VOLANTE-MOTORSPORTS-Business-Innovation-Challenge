/**
 * Bakes the rendered page into dist/index.html after `vite build`, so the site
 * arrives as complete static HTML (fast first paint, readable without JS) and
 * React hydrates it in the browser.
 */
import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'dist', 'index.html');
const ssrDir = path.join(root, 'dist-ssr');

const template = await readFile(htmlPath, 'utf8');
const placeholder = '<!--app-html-->';
if (!template.includes(placeholder)) {
  throw new Error(`Prerender: "${placeholder}" not found in dist/index.html`);
}

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const appHtml = render();

await writeFile(htmlPath, template.replace(placeholder, appHtml));
await rm(ssrDir, { recursive: true, force: true });

console.log(`Prerendered ${(appHtml.length / 1024).toFixed(1)} kB of HTML into dist/index.html`);
