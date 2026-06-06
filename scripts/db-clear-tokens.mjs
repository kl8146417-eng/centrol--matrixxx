import postgres from 'postgres';
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
await sql`delete from api_tokens`;
console.log('cleared api_tokens');
await sql.end();
