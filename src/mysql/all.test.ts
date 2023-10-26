import { describe, it, expect, afterAll } from 'bun:test';
import { drizzleClose, drizzleMySqlGetUser } from './drizzle';
import { knexClose, knexMySqlGetUser } from './knex';
import { kyselyClose, kyselyMySqlGetUser } from './kysely';
import { mariadbClose, mariadbGetUser } from './mariadb';
import { mySql2Close, mySql2GetUser } from './mysql2';
import { prismaClose, prismaMySqlGetUser } from './prisma';
import { sequelizeClose, sequelizeMySqlGetUser } from './sequelize';
import { mikroClose, mikroMySqlGetUser } from './mikro';
import { typeormClose, typeormMySqlGetUser } from './typeorm';
import { mySqlClose, mySqlGetUser } from './mysql';

describe('[MySQL] unit tests', () => {
  const checkUnit = async (fun: (id: number) => Promise<any>) => {
    const user = await fun(1);
    expect(user?.id).toBe(1);
  };

  it('DrizzleORM', async () => {
    await checkUnit(drizzleMySqlGetUser);
    await drizzleClose();
  });

  it('KnexJS', async () => {
    await checkUnit(knexMySqlGetUser);
    await knexClose();
  });

  it('Kysely', async () => {
    await checkUnit(kyselyMySqlGetUser);
    await kyselyClose();
  });

  it('Mariadb', async () => {
    await checkUnit(mariadbGetUser);
    await mariadbClose();
  });

  it('MikroORM', async () => {
    await checkUnit(mikroMySqlGetUser);
    await mikroClose();
  });

  it('MySQL', async () => {
    await checkUnit(mySqlGetUser);
    mySqlClose();
  });

  it('MySQL2', async () => {
    await checkUnit(mySql2GetUser);
    await mySql2Close();
  });

  it('Prisma', async () => {
    await checkUnit(prismaMySqlGetUser);
    await prismaClose();
  });

  it('Sequelize', async () => {
    await checkUnit(sequelizeMySqlGetUser);
    await sequelizeClose();
  });

  it('TypeORM', async () => {
    await checkUnit(typeormMySqlGetUser);
    await typeormClose();
  });
});
