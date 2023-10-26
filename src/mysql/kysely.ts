import { ColumnType, Generated, Selectable } from 'kysely';
import { createPool } from 'mysql2';
import { Kysely, MysqlDialect } from 'kysely';
import { mySqlConfig } from '../config';

interface Database {
  users: UserTable;
}

interface UserTable {
  id: Generated<number>;
  username: string;
  email: string;
  password: string;
  name: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
  deleted_at: ColumnType<Date, string | undefined, never> | null;
}

type User = Selectable<UserTable>;

const { connectionLimit, ...config } = mySqlConfig;

if (connectionLimit) {
  Object.assign(config, { connectionLimit });
}

const dialect = new MysqlDialect({
  pool: createPool(config),
});

const db = new Kysely<Database>({
  dialect,
});

export const kyselyMySqlGetUser = async (id: number) =>
  await db
    .selectFrom('users')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();

export const kyselyClose = () => db.destroy();
