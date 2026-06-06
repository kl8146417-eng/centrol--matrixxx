import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

// Lazily created so the app can build/render static pages even before the
// Supabase connection string is provided. Routes that need the DB will throw
// a clear error if it's missing.
let client: ReturnType<typeof postgres> | undefined;
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getDb() {
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL is not set. Add the Supabase pooled connection string to .env.local.'
    );
  }
  if (!dbInstance) {
    // prepare:false is required for Supabase's transaction-mode pooler (pgbouncer).
    client = postgres(connectionString, { prepare: false });
    dbInstance = drizzle(client, { schema });
  }
  return dbInstance;
}

export { schema };
