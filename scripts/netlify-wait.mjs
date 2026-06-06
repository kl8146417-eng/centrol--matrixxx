import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const SITE_ID = '8dc00469-950c-48ec-a7e7-5530cae88a1a';
function token() {
  const p = path.join(os.homedir(), 'AppData', 'Roaming', 'netlify', 'Config', 'config.json');
  const cfg = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const u of Object.values(cfg.users ?? {})) if (u?.auth?.token) return u.auth.token;
  throw new Error('no token');
}
const h = { Authorization: `Bearer ${token()}` };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const sha = process.argv[2];

for (let i = 0; i < 60; i++) {
  const d = await (await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys?per_page=1`, { headers: h })).json();
  const dep = d[0];
  process.stdout.write(`[${i}] ${dep.state} ${dep.commit_ref?.slice(0, 7)} ${dep.error_message ?? ''}\n`);
  if (['ready', 'error', 'failed'].includes(dep.state)) {
    console.log('FINAL:', dep.state, '| url:', dep.ssl_url, '| error:', dep.error_message ?? 'none');
    process.exit(dep.state === 'ready' ? 0 : 1);
  }
  await sleep(8000);
}
console.log('timed out waiting');
