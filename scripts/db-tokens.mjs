import postgres from 'postgres';
const url = process.env.DATABASE_URL;
const sql = postgres(url, { max: 1 });
const rows = await sql`select id, label, scopes, revoked, created_at from api_tokens order by created_at desc limit 5`;
console.log(JSON.stringify(rows, null, 2));
await sql.end();
