// Writes one real HTML file per route (dist/<route>/index.html), plus a 404
// page, sitemap.xml and robots.txt. Runs after the client and SSR builds.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const {render, routes} = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const SITE = 'https://weddingparty.co.za';

const page = (route) => {
  const {html, head} = render(route);
  return template
    // The home page opens behind the ivory veil: paint the header for it from the first frame.
    .replace('<html lang="en-ZA">', route === '/' ? '<html lang="en-ZA" data-veil="on">' : '<html lang="en-ZA">')
    .replace(/<!--head:start-->[\s\S]*?<!--head:end-->/, head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
};

for (const {path: route} of routes) {
  const dir = path.join(dist, route);
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(path.join(dir, 'index.html'), page(route));
  console.log('  prerendered', route);
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404/'));

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => `  <url><loc>${SITE}${r.path}</loc><lastmod>${today}</lastmod><priority>${r.path === '/' ? '1.0' : r.path === '/weddings/' ? '0.9' : '0.7'}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
fs.rmSync(path.join(root, 'dist-ssr'), {recursive: true, force: true});
console.log('  sitemap.xml, robots.txt, 404.html written');
