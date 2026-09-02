import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const pages = ['index.html', 'node.html', 'dunwich.html', 'culture.html', 'uses.html', 'digital-twin.html', 'process.html', 'cooperative.html', 'network.html', 'sitemap.html'];
const heroPages = [...pages, '404.html'];
const errors = [];
const textExtensions = new Set(['.html', '.md', '.js', '.mjs', '.css', '.json', '.xml', '.txt', '.webmanifest']);
const allFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const location = path.join(directory, entry.name);
    entry.isDirectory() ? walk(location) : allFiles.push(location);
  }
}

walk(root);

for (const file of allFiles) {
  if (!textExtensions.has(path.extname(file).toLowerCase()) && path.basename(file) !== 'LICENSE') continue;
  const relative = path.relative(root, file);
  const source = fs.readFileSync(file, 'utf8');
  const vectorWord = ['s', 'v', 'g'].join('');
  const vectorReference = new RegExp(`<${vectorWord}\\b|image\\/${vectorWord}|\\.${vectorWord}(?:\\b|[?#])`, 'i');
  if (vectorReference.test(source)) errors.push(`${relative}: prohibited vector-image reference`);
  if (new RegExp(`[\\u2013\\u2014]`).test(source)) errors.push(`${relative}: contains an en dash or em dash`);
}

const heroHashes = new Map();
const expectedNav = pages.map(file => `href="${file}"`);

for (const page of heroPages) {
  const location = path.join(root, page);
  if (!fs.existsSync(location)) {
    errors.push(`${page}: missing`);
    continue;
  }
  const html = fs.readFileSync(location, 'utf8');
  const hero = html.match(/<img class="hero-image" src="([^"]+)"[^>]*>/);
  if (!hero) {
    errors.push(`${page}: missing full-width hero image`);
  } else {
    const source = hero[1];
    if (/^https?:/i.test(source)) errors.push(`${page}: hero is remotely hosted`);
    if (!/\.(webp|png|jpe?g)$/i.test(source)) errors.push(`${page}: hero is not raster`);
    const heroFile = path.resolve(root, source);
    if (!fs.existsSync(heroFile)) {
      errors.push(`${page}: missing hero asset ${source}`);
    } else {
      const hash = crypto.createHash('sha256').update(fs.readFileSync(heroFile)).digest('hex');
      if (heroHashes.has(hash)) errors.push(`${page}: hero duplicates ${heroHashes.get(hash)}`);
      heroHashes.set(hash, page);
    }
  }
  if (!/<button class="to-top"/.test(html)) errors.push(`${page}: missing floating return-to-top button`);
  if (!/<div class="wrap route-nav">/.test(html)) errors.push(`${page}: missing previous and next navigation`);
  if (/<p class="eyebrow"|class="eyebrow"/.test(html)) errors.push(`${page}: contains a decorative eyebrow label`);
  if (/\b(?:can|should|must)\b/i.test(stripMarkup(html))) errors.push(`${page}: contains directive or permission language`);
  for (const expected of expectedNav) {
    if (!html.includes(expected)) errors.push(`${page}: header omits ${expected.slice(6, -1)}`);
  }
  for (const match of html.matchAll(/<a\b([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/g)) {
    const attributes = `${match[1]}${match[3]}`;
    if (!/target="_blank"/.test(attributes) || !/rel="noopener noreferrer"/.test(attributes)) errors.push(`${page}: unsafe external link ${match[2]}`);
  }
  for (const match of html.matchAll(/<img\b[^>]*src="([^"]+)"/g)) {
    if (/^https?:/i.test(match[1])) errors.push(`${page}: remote image ${match[1]}`);
  }
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|tel:|#)/i.test(href)) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = path.resolve(root, path.dirname(page), clean);
    if (!fs.existsSync(target)) errors.push(`${page}: broken internal link ${href}`);
  }
}

for (const icon of ['assets/favicon-32.png', 'assets/favicon-192.png', 'assets/apple-touch-icon.png', 'assets/favicon.png']) {
  if (!fs.existsSync(path.join(root, icon))) errors.push(`missing raster icon ${icon}`);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const page of pages) {
  const route = page === 'index.html' ? 'ready-set-co-op-cultural-intelligence-node/' : `ready-set-co-op-cultural-intelligence-node/${page}`;
  if (!sitemap.includes(route)) errors.push(`sitemap.xml: missing ${page}`);
}

function stripMarkup(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ');
}

if (heroHashes.size !== heroPages.length) errors.push(`unique hero count ${heroHashes.size} does not match ${heroPages.length} hero pages`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Checked ${pages.length} main pages, 404.html, ${allFiles.length} repository files and ${heroHashes.size} unique local raster heroes.`);
console.log('Confirmed: complete navigation, safe external links, raster favicons, no remote images, no vector references, no decorative eyebrows, no directive or permission language, and no en dashes or em dashes.');
