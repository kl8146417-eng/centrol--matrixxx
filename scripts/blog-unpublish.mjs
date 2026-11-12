// Set the off-topic posts listed in content/blog-unpublished.ts to `draft` in the database, through the
// public blog API (needs a token with the blog:write scope; nothing is deleted).
//
//   CM_BLOG_TOKEN=cm_xxx node scripts/blog-unpublish.mjs            # dry run: shows what would change
//   CM_BLOG_TOKEN=cm_xxx node scripts/blog-unpublish.mjs --apply    # sets each one to draft
//
// BASE defaults to https://centrolmatrix.com.
import fs from 'node:fs';

const BASE = (process.env.BASE || 'https://centrolmatrix.com').replace(/\/$/, '');
const TOKEN = process.env.CM_BLOG_TOKEN;
const apply = process.argv.includes('--apply');
if (!TOKEN) {
  console.error('Set CM_BLOG_TOKEN (a blog:write token).');
  process.exit(1);
}

const src = fs.readFileSync(new URL('../content/blog-unpublished.ts', import.meta.url), 'utf8');
const slugs = [...src.matchAll(/^\s*'([a-z0-9-]+)',/gm)].map((m) => m[1]);
const h = { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };

const list = await (await fetch(`${BASE}/api/blog/admin?status=published`, { headers: h })).json();
if (!Array.isArray(list.posts)) {
  console.error('Could not list posts:', list.error || list);
  process.exit(1);
}
for (const slug of slugs) {
  const p = list.posts.find((x) => x.slug === slug);
  if (!p) { console.log(`skip   ${slug} (not published or not found)`); continue; }
  if (!apply) { console.log(`would  ${slug} -> draft`); continue; }
  const r = await fetch(`${BASE}/api/blog/${p.id}`, { method: 'PUT', headers: h, body: JSON.stringify({ status: 'draft' }) });
  console.log(`${r.ok ? 'draft ' : 'FAIL  '} ${slug} (${r.status})`);
}
