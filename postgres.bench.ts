import { run, bench, group, baseline } from 'mitata';
import { getUser } from './src/helpers';
import {
  drizzlePostgreGetUser,
  knexPostgresGetUser,
  kyselyPostgresGetUser,
  mikroPostgresGetUser,
  pgGetUser,
  postgresGetUser,
  prismaPostgresGetUser,
  sequelizePostgresGetUser,
} from './src/postgres';

group('PostgreSQL', () => {
  bench('DrizzleORM', async () => await getUser(drizzlePostgreGetUser));
  bench('KnexJS', async () => await getUser(knexPostgresGetUser));
  bench('Kysely', async () => await getUser(kyselyPostgresGetUser));
  bench('MikroORM', async () => await getUser(mikroPostgresGetUser));
  bench('Pg', async () => await getUser(pgGetUser));
  bench('Postgres.js', async () => await getUser(postgresGetUser));
  bench('Prisma', async () => await getUser(prismaPostgresGetUser));
  bench('Sequelize', async () => await getUser(sequelizePostgresGetUser));
});

await run({
  colors: false,
});

process.exit(0)