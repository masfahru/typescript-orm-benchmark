import postgres, { Options } from 'postgres';
import { postgresConfig } from '../config';

const options: Options<any> = postgresConfig;

if (!options.max) {
  delete options.max;
}

const sql = postgres(Object.assign({ transform: postgres.camel }, options));

export const postgresGetUser = async (id: number) =>
  await sql`SELECT * FROM users WHERE id = ${id}`.then((rows) => rows[0]);

export const postgresClose = async () => await sql.end();
