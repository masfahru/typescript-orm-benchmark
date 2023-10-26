import { createPool } from 'mariadb';
import { mySqlConfig } from '../config';
import { users } from './users';

const pool = createPool(mySqlConfig);

await pool.execute('drop table if exists `users`');

await pool.execute(`
create table
  if not exists \`users\` (
    id int unsigned not null auto_increment primary key,
    username varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    name varchar(255) not null,
    created_at datetime not null default CURRENT_TIMESTAMP,
    updated_at datetime not null default CURRENT_TIMESTAMP,
    deleted_at datetime null
  )`);

await pool.execute(
  'alter table `users` add index users_username_index (username)'
);

await pool.execute('alter table `users` add index users_email_index (email)');

const usersLen = users.length;
console.time(`[MySQL] time elapsed for inserting ${usersLen} users`);
await pool.batch(
  'insert into `users`(username, email, password, name) values (?, ?, ?, ?)',
  users.map((user) => [user.username, user.email, user.password, user.name])
);
console.timeEnd(`[MySQL] time elapsed for inserting ${usersLen} users`);

await pool
  .execute('select count(id) as total from `users`')
  .then((res) => console.log(`[MySQL] total users: ${res[0].total}`));

await pool.end();
