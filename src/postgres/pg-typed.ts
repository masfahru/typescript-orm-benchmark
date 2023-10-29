import Pool from 'pg-pool';
import { postgresConfig } from '../config';
import { PoolConfig } from 'pg';
import { findUserById } from './queries.queries';

const poolConfig: PoolConfig = postgresConfig;

if (!poolConfig.max) {
  delete poolConfig.max;
}

const pool = new Pool(poolConfig);

export const pgTypedGetUser = async (id: number) => {
  const client = await pool.connect();

  return findUserById
    .run(
      {
        id,
      },
      client
    )
    .then((rows) => rows[0])
    .finally(() => client.release());
};

export const pgTypedClose = async () => await pool.end();
