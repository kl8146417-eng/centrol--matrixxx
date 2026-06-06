import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Netlify DB (powered by Neon) auto-injects NETLIFY_DATABASE_URL at build/runtime.
// Fall back to DATABASE_URL for local dev or other Postgres providers.
const connectionString =
  process.env.NETLIFY_DATABASE_URL ??
  process.env.NETLIFY_DATABASE_URL_UNPOOLED ??
  process.env.DATABASE_URL;

// Lazily created so the app can build/render static pages even before the
// database is provisioned. Routes that need the DB throw a clear error if it's missing.
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getDb() {
  if (!connectionString) {
    throw new Error(
      'No database URL set. On Netlify this is NETLIFY_DATABASE_URL (run `netlify db init`). ' +
        'Locally, set DATABASE_URL (or NETLIFY_DATABASE_URL) in .env.local.'
    );
  }
  if (!dbInstance) {
    const sql = neon(connectionString);
    dbInstance = drizzle(sql, { schema });
  }
  return dbInstance;
}

export { schema };
