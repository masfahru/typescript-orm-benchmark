import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2/promise';
import { mySqlConfig } from '../config';
import { mysqlTable, bigint, varchar, time } from 'drizzle-orm/mysql-core';
import { eq } from 'drizzle-orm';

const users = mysqlTable('users', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  username: varchar('username', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: time('created_at').notNull(),
  updatedAt: time('updated_at').notNull(),
  deletedAt: time('deleted_at'),
});

const { connectionLimit, ...config } = mySqlConfig;

if (connectionLimit) {
  Object.assign(config, { connectionLimit });
}

const poolConnection = createPool(config);

const db = drizzle(poolConnection, { schema: { users }, mode: 'default' });

export const drizzleMySqlGetUser = async (id: number) =>
  await db.query.users.findFirst({
    where: eq(users.id, id),
  });

export const drizzleClose = () => poolConnection.end();
