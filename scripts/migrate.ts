import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

async function main() {
  const url =
    process.env.NETLIFY_DATABASE_URL_UNPOOLED ??
    process.env.NETLIFY_DATABASE_URL ??
    process.env.DATABASE_URL;
  if (!url) {
    console.error(
      'No database URL set. Use `netlify db init` then `netlify env:get NETLIFY_DATABASE_URL`, ' +
        'or set DATABASE_URL in .env.local.'
    );
    process.exit(1);
  }
  // Use a non-pooled, single connection for migrations.
  const sql = postgres(url, { max: 1 });
  const db = drizzle(sql);
  console.log('Running migrations…');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Done.');
  await sql.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
