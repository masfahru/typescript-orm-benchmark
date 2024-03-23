import postgres from 'postgres';
import { postgresConfig } from '../config';
import { users } from './users';

const sql = postgres({
  ...postgresConfig,
  max: 1,
  onnotice: () => {},
});

await sql`drop table if exists ${sql('users')}`;

await sql`
create table if not exists
${sql('users')} (
  "id" serial primary key,
  "username" varchar(255) not null,
  "email" varchar(255) not null,
  "password" varchar(255) not null,
  "name" varchar(255) not null,
  "created_at" timestamptz not null default CURRENT_TIMESTAMP,
  "updated_at" timestamptz not null default CURRENT_TIMESTAMP,
  "deleted_at" timestamptz null default null
)`;

await sql`create index "users_username_index" on ${sql('users')} ("username")`;

await sql`create index "users_email_index" on ${sql('users')} ("email")`;

const usersLen = users.length;
console.time(`[PostgreSQL] time elapsed for inserting ${usersLen} users`);
await sql`insert into ${sql.unsafe('users')} ${sql(users)}`;
console.timeEnd(`[PostgreSQL] time elapsed for inserting ${usersLen} users`);

await sql`select count(id) as total from ${sql('users')}`.then((res) =>
  console.log(`[PostgreSQL] total users: ${res[0].total}`)
);

await sql.end({ timeout: 1 });
