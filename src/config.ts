import { createPool } from 'mariadb';
import postgres from 'postgres';
import os from 'node:os';

const maxConnection = String(process.env.MAX_CONNECTION).toUpperCase();

const mySqlConfig = {
  host: process.env.MYSQL_HOST ?? 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER ?? 'mysqltest',
  password: process.env.MYSQL_PASSWORD ?? 'mysqltest',
  database: process.env.MYSQL_DATABASE ?? 'mysqltest',
  connectionLimit: Number(maxConnection) || 1,
};

const postgresConfig = {
  host: process.env.PG_HOST ?? 'localhost',
  port: Number(process.env.PG_PORT) || 5432,
  user: process.env.PG_USER ?? 'postgres',
  password: process.env.PG_PASSWORD ?? 'postgres',
  database: process.env.PG_DATABASE ?? 'postgres',
  max: Number(maxConnection) || 1,
};

if (maxConnection !== 'DEFAULT') {
  if (maxConnection === 'MAX') {
    const mysql = createPool(mySqlConfig);
    const sql = postgres({
      ...postgresConfig,
      max: 1,
    });

    mySqlConfig.connectionLimit = await mysql
      .execute('SHOW VARIABLES LIKE "max_connections"')
      .then((res) => Math.floor(Number(res[0].Value) * 0.95));
    postgresConfig.max = await sql`SHOW max_connections`.then((res) =>
      Number(res[0].max_connections)
    );
  } else if (maxConnection === 'CPU_COUNT') {
    // @ts-ignore
    mySqlConfig.connectionLimit = os.availableParallelism();
    postgresConfig.max = mySqlConfig.connectionLimit;
  }
} else {
  mySqlConfig.connectionLimit = 0;
  postgresConfig.max = 0;
}

export { mySqlConfig, postgresConfig };
