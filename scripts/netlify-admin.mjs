// Netlify admin helper. Reads the CLI token from config and calls the API.
// Usage:
//   node scripts/netlify-admin.mjs get
//   node scripts/netlify-admin.mjs set-dir .next
//   node scripts/netlify-admin.mjs set-dir ""        (clears)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const SITE_ID = '8dc00469-950c-48ec-a7e7-5530cae88a1a';

function token() {
  const p = path.join(os.homedir(), 'AppData', 'Roaming', 'netlify', 'Config', 'config.json');
  const cfg = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const u of Object.values(cfg.users ?? {})) {
    if (u?.auth?.token) return u.auth.token;
  }
  throw new Error('no netlify token in config');
}

const t = token();
const base = `https://api.netlify.com/api/v1/sites/${SITE_ID}`;
const h = { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json' };

const cmd = process.argv[2];

if (cmd === 'get') {
  const r = await fetch(base, { headers: h });
  const s = await r.json();
  console.log(JSON.stringify({ build_settings: s.build_settings, published_deploy: s.published_deploy?.state }, null, 2));
} else if (cmd === 'set-dir') {
  const dir = process.argv[3] ?? '';
  const r = await fetch(base, {
    method: 'PATCH',
    headers: h,
    body: JSON.stringify({ build_settings: { dir } }),
  });
  const s = await r.json();
  console.log('status', r.status, 'dir=', JSON.stringify(s.build_settings?.dir));
} else {
  console.error('unknown command');
  process.exit(1);
}
