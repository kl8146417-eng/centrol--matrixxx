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

const cmd = process.argv[2] ?? 'list';

if (cmd === 'list') {
  const r = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys?per_page=8`, { headers: h });
  const d = await r.json();
  for (const x of d) {
    console.log(
      `${x.state.padEnd(10)} ${(x.branch ?? '').padEnd(6)} ${(x.context ?? '').padEnd(14)} ${x.created_at}  ${x.commit_ref?.slice(0, 7) ?? '-'}  ${x.error_message ?? ''}`
    );
  }
} else if (cmd === 'build') {
  // Trigger a fresh build on the connected repo branch.
  const r = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/builds`, {
    method: 'POST',
    headers: { ...h, 'Content-Type': 'application/json' },
    body: JSON.stringify({ clear_cache: true }),
  });
  const b = await r.json();
  console.log('build triggered:', r.status, b.id ?? b.message ?? JSON.stringify(b).slice(0, 200));
} else if (cmd === 'log') {
  const id = process.argv[3];
  const r = await fetch(`https://api.netlify.com/api/v1/deploys/${id}`, { headers: h });
  const d = await r.json();
  console.log(JSON.stringify({ state: d.state, error: d.error_message, summary: d.summary, log: d.log_access_attributes?.url }, null, 2));
}
