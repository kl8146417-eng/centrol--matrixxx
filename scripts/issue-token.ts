import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { createHash, randomBytes } from 'crypto';
import { apiTokens } from '../lib/db/schema';

/**
 * Mint a new API token for the blog endpoint.
 *
 *   pnpm issue-token "n8n SEO agent"            (default scope blog:write)
 *   pnpm issue-token "Partner X" blog:write
 *
 * Prints the PLAINTEXT token ONCE. Only the hash is stored.
 */
function hashToken(plaintext: string): string {
  const pepper = process.env.CM_TOKEN_PEPPER ?? '';
  return createHash('sha256').update(`${plaintext}${pepper}`).digest('hex');
}

async function main() {
  const url =
    process.env.NETLIFY_DATABASE_URL_UNPOOLED ??
    process.env.NETLIFY_DATABASE_URL ??
    process.env.DATABASE_URL;
  if (!url) {
    console.error('No database URL set (NETLIFY_DATABASE_URL or DATABASE_URL).');
    process.exit(1);
  }

  const label = process.argv[2] ?? 'Untitled token';
  const scopes = (process.argv[3] ?? 'blog:write').split(',').map((s) => s.trim());

  const plaintext = `cm_${randomBytes(24).toString('hex')}`;
  const tokenHash = hashToken(plaintext);

  const sql = postgres(url, { max: 1 });
  const db = drizzle(sql);
  const [row] = await db
    .insert(apiTokens)
    .values({ label, tokenHash, scopes })
    .returning({ id: apiTokens.id, label: apiTokens.label, scopes: apiTokens.scopes });
  await sql.end();

  console.log('\n  Token created — copy it now, it will not be shown again:\n');
  console.log(`    ${plaintext}\n`);
  console.log(`  id:     ${row.id}`);
  console.log(`  label:  ${row.label}`);
  console.log(`  scopes: ${row.scopes.join(', ')}\n`);
  console.log('  Use it as:  Authorization: Bearer <token>\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
