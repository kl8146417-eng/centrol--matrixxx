import 'dotenv/config';
import { config as loadEnv } from 'dotenv';
import fs from 'node:fs';
import postgres from 'postgres';

// Prefer .env.local (Next.js convention) but fall back to .env.
loadEnv({ path: '.env.local' });

const url =
  process.env.NETLIFY_DATABASE_URL_UNPOOLED ||
  process.env.NETLIFY_DATABASE_URL ||
  process.env.DATABASE_URL;

if (!url) {
  console.error('No database URL set (NETLIFY_DATABASE_URL_UNPOOLED / NETLIFY_DATABASE_URL / DATABASE_URL).');
  process.exit(1);
}

const sql = postgres(url, { max: 1 });
const raw = fs.readFileSync('drizzle/0001_create_media_table.sql', 'utf8');
const stmts = raw.split('--> statement-breakpoint');

try {
  for (const s of stmts) {
    const t = s.trim();
    if (t) await sql.unsafe(t);
  }
  const rows = await sql.unsafe(
    "select column_name from information_schema.columns where table_name='media' order by ordinal_position"
  );
  console.log('media columns:', rows.map((r) => r.column_name).join(', '));
} catch (e) {
  console.error(e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
