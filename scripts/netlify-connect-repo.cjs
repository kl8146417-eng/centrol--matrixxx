// Connects the Netlify site to the GitHub repo for continuous deployment,
// entirely via API (no browser OAuth). This makes Netlify build on its own
// Linux CI, which sidesteps the @netlify/plugin-nextjs Windows local-deploy bug.
//
// Steps:
//   1. Create a Netlify deploy key (returns a public key).
//   2. Add that public key to the GitHub repo as a read-only deploy key.
//   3. PATCH the Netlify site build_settings to point at the repo.
//   4. Create the GitHub webhook so pushes trigger Netlify builds.
//
// Reads the Netlify token from the CLI config and the GitHub token from `gh auth token`
// (passed in as argv to keep it out of files).

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const SITE_ID = '8dc00469-950c-48ec-a7e7-5530cae88a1a';
const REPO = 'kl8146417-eng/centrol--matrixxx';
const BRANCH = 'main';

function netlifyToken() {
  const cfgPath = path.join(process.env.APPDATA, 'netlify', 'Config', 'config.json');
  const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  for (const u of Object.values(cfg.users ?? {})) {
    if (u?.auth?.token) return u.auth.token;
  }
  throw new Error('No Netlify token in CLI config.');
}

function ghToken() {
  return execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', shell: true }).trim();
}

const NF = netlifyToken();
const GH = ghToken();

async function nf(method, urlPath, body) {
  const res = await fetch(`https://api.netlify.com/api/v1${urlPath}`, {
    method,
    headers: { Authorization: `Bearer ${NF}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  if (!res.ok) throw new Error(`Netlify ${method} ${urlPath} -> ${res.status}: ${text}`);
  return json;
}

async function gh(method, urlPath, body) {
  const res = await fetch(`https://api.github.com${urlPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${GH}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'centrol-matrix-setup',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  if (!res.ok && res.status !== 422) throw new Error(`GitHub ${method} ${urlPath} -> ${res.status}: ${text}`);
  return { status: res.status, json };
}

(async () => {
  console.log('1) Creating Netlify deploy key…');
  const key = await nf('POST', '/deploy_keys', {});
  console.log('   deploy key id:', key.id);

  console.log('2) Adding deploy key to GitHub repo…');
  const dk = await gh('POST', `/repos/${REPO}/keys`, {
    title: 'Netlify centrol-matrix',
    key: key.public_key,
    read_only: true,
  });
  console.log('   github deploy key status:', dk.status);

  console.log('3) Pointing the Netlify site at the repo…');
  const site = await nf('PATCH', `/sites/${SITE_ID}`, {
    build_settings: {
      provider: 'github',
      repo_path: REPO,
      repo_branch: BRANCH,
      repo_url: `https://github.com/${REPO}`,
      cmd: 'npm run build',
      dir: '.next',
      deploy_key_id: key.id,
      allowed_branches: [BRANCH],
    },
  });
  console.log('   repo_url:', site.build_settings?.repo_url);

  console.log('4) Creating GitHub webhook for pushes…');
  const hookUrl = `https://api.netlify.com/hooks/github`;
  const wh = await gh('POST', `/repos/${REPO}/hooks`, {
    name: 'web',
    active: true,
    events: ['push', 'pull_request', 'delete'],
    config: { url: hookUrl, content_type: 'json' },
  });
  console.log('   webhook status:', wh.status);

  console.log('\nDone. Repo connected. Trigger a build next.');
})().catch((e) => {
  console.error('FAILED:', e.message);
  process.exit(1);
});
