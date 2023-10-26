import { Pool, PoolConfig } from 'pg';
import { postgresConfig } from '../config';

const poolConfig: PoolConfig = postgresConfig;

if (!poolConfig.max) {
  delete poolConfig.max;
}

const pool = new Pool(poolConfig);

export const pgGetUser = async (id: number) =>
  await pool
    .query('SELECT * FROM users WHERE id = $1', [id])
    .then((res) => res.rows[0]);

export const pgClose = async () => await pool.end();
