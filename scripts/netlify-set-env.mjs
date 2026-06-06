import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';

const SITE_ID = '8dc00469-950c-48ec-a7e7-5530cae88a1a';
function token() {
  const p = path.join(os.homedir(), 'AppData', 'Roaming', 'netlify', 'Config', 'config.json');
  const cfg = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const u of Object.values(cfg.users ?? {})) if (u?.auth?.token) return u.auth.token;
  throw new Error('no token');
}
const h = { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' };

// Find the account_id that owns this site (env var API is account-scoped).
const site = await (await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}`, { headers: h })).json();
const accountId = site.account_id ?? site.account_slug;
console.log('account_id:', accountId);

const key = process.argv[2];
let value = process.argv[3];
if (!key) throw new Error('usage: node netlify-set-env.mjs KEY [VALUE]');
if (value === '--gen' || value === undefined) value = crypto.randomBytes(48).toString('hex');
const isSecret = process.argv.includes('--secret');

const scopes = isSecret
  ? ['builds', 'functions', 'runtime']
  : ['builds', 'functions', 'runtime', 'post_processing'];
const body = [{
  key,
  scopes,
  values: [
    { context: 'production', value },
    { context: 'deploy-preview', value },
    { context: 'branch-deploy', value },
  ],
  is_secret: isSecret,
}];

// Create (POST). If it exists, PATCH the single key.
let r = await fetch(`https://api.netlify.com/api/v1/accounts/${accountId}/env?site_id=${SITE_ID}`, {
  method: 'POST', headers: h, body: JSON.stringify(body),
});
if (r.status === 422 || r.status === 409) {
  r = await fetch(`https://api.netlify.com/api/v1/accounts/${accountId}/env/${key}?site_id=${SITE_ID}`, {
    method: 'PUT', headers: h, body: JSON.stringify(body[0]),
  });
}
console.log('set', key, '->', r.status, isSecret ? '(secret)' : `= ${value}`);
const t = await r.text();
if (!r.ok) console.log(t.slice(0, 400));
