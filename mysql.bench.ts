import { run, bench, group } from 'mitata';
import { getUser } from './src/helpers';
import {
  drizzleMySqlGetUser,
  knexMySqlGetUser,
  kyselyMySqlGetUser,
  mariadbGetUser,
  mikroMySqlGetUser,
  mySql2GetUser,
  prismaMySqlGetUser,
  sequelizeMySqlGetUser,
} from './src/mysql';

group('MySQL', async () => {
  bench('DrizzleORM', async () => await getUser(drizzleMySqlGetUser));
  bench('KnexJS', async () => await getUser(knexMySqlGetUser));
  bench('Kysely', async () => await getUser(kyselyMySqlGetUser));
  bench('Mariadb', async () => await getUser(mariadbGetUser));
  bench('MikroORM', async () => await getUser(mikroMySqlGetUser));
  bench('MySQL2', async () => await getUser(mySql2GetUser));
  bench('Prisma', async () => await getUser(prismaMySqlGetUser));
  bench('Sequelize', async () => await getUser(sequelizeMySqlGetUser));
});

await run({
  colors: false,
});

process.exit(0)
