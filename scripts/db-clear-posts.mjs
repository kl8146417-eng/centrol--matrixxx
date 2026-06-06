import postgres from 'postgres';
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
const r = await sql`delete from posts`;
console.log('cleared posts:', r.count);
await sql.end();
