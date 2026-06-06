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
const h = { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' };
const r = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/builds`, {
  method: 'POST', headers: h, body: JSON.stringify({ clear_cache: true }),
});
const b = await r.json();
console.log('build triggered:', r.status, b.id ?? b.message);
