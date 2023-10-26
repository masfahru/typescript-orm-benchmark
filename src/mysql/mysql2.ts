import { createPool } from 'mysql2/promise';
import { mySqlConfig } from '../config';

const { connectionLimit, ...config } = mySqlConfig;

if (connectionLimit) {
  Object.assign(config, { connectionLimit });
}

const pool = createPool(config);

export const mySql2GetUser = async (id: number) =>
  await pool
    .execute('SELECT * FROM `users` WHERE id = ?', [id])
    .then(([rows]) => (rows as unknown[])[0]);

export const mySql2Close = () => pool.end();
