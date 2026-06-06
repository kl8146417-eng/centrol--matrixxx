import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const SITE_ID = '8dc00469-950c-48ec-a7e7-5530cae88a1a';
function token() {
  const cfg = JSON.parse(fs.readFileSync(path.join(os.homedir(), 'AppData', 'Roaming', 'netlify', 'Config', 'config.json'), 'utf8'));
  for (const u of Object.values(cfg.users ?? {})) if (u?.auth?.token) return u.auth.token;
  throw new Error('no token');
}
const t = token();
const h = { Authorization: `Bearer ${t}` };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Wait for a final deploy state, then dump everything we can about it.
let dep;
for (let i = 0; i < 70; i++) {
  const d = await (await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys?per_page=1`, { headers: h })).json();
  dep = d[0];
  console.log(`[${i}] ${dep.state} ${dep.commit_ref?.slice(0,7)} build=${dep.build_id}`);
  if (['ready', 'error', 'failed'].includes(dep.state)) break;
  await sleep(7000);
}

console.log('\n=== DEPLOY ===', dep.state, dep.error_message ?? '');
// Try several log endpoints with the fresh token.
const endpoints = [
  `https://api.netlify.com/api/v1/deploys/${dep.id}/log`,
  `https://api.netlify.com/api/v1/builds/${dep.build_id}/log`,
  `https://app.netlify.com/access-control/bb-api/api/v1/builds/${dep.build_id}/log`,
];
for (const url of endpoints) {
  try {
    const r = await fetch(url, { headers: h });
    const body = await r.text();
    console.log(`\n--- ${url} -> ${r.status} ---`);
    if (r.ok && body.trim()) console.log(body.slice(-6000));
  } catch (e) {
    console.log(`\n--- ${url} -> ERR ${e.message} ---`);
  }
}
