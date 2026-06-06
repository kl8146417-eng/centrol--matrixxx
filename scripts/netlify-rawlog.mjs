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
const tk = token();
const h = { Authorization: `Bearer ${tk}` };

const deploys = await (await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys?per_page=1`, { headers: h })).json();
const dep = deploys[0];
const buildId = dep.build_id;
console.log('deploy:', dep.id, 'build:', buildId, 'state:', dep.state);

// The dashboard reads logs from socket.netlify.com. Try the documented endpoints.
const candidates = [
  `https://api.netlify.com/api/v1/deploys/${dep.id}/log`,
  `https://api.netlify.com/api/v1/builds/${buildId}/log`,
  `https://app.netlify.com/access-control/bb-api/api/v1/deploys/${dep.id}/log`,
  `https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys/${dep.id}/log`,
];
for (const url of candidates) {
  try {
    const r = await fetch(url, { headers: h });
    console.log(`\n=== ${url} -> ${r.status} ${r.headers.get('content-type')}`);
    if (r.ok) {
      const text = await r.text();
      console.log(text.slice(0, 6000));
    }
  } catch (e) {
    console.log(url, 'ERR', e.message);
  }
}
