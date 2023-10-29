import { describe, it, expect } from 'bun:test';
import { drizzleClose, drizzlePostgreGetUser } from './drizzle';
import { knexPostgresGetUser, knexClose } from './knex';
import { kyselyClose, kyselyPostgresGetUser } from './kysely';
import { mikroClose, mikroPostgresGetUser } from './mikro';
import { prismaClose, prismaPostgresGetUser } from './prisma';
import { sequelizeClose, sequelizePostgresGetUser } from './sequelize';
import { pgClose, pgGetUser } from './pg';
import { postgresClose, postgresGetUser } from './postgres';
import { typeormClose, typeormPostgresGetUser } from './typeorm';
import { pgTypedClose, pgTypedGetUser } from './pg-typed';

describe('[PostgreSQL] unit tests', () => {
  const checkUnit = async (fun: (id: number) => Promise<any>) => {
    const user = await fun(1);
    expect(user?.id).toBe(1);
  };

  it('DrizzleORM', async () => {
    await checkUnit(drizzlePostgreGetUser);
    await drizzleClose();
  });

  it('KnexJS', async () => {
    await checkUnit(knexPostgresGetUser);
    await knexClose();
  });

  it('Kysely', async () => {
    await checkUnit(kyselyPostgresGetUser);
    await kyselyClose();
  });

  it('MikroORM', async () => {
    await checkUnit(mikroPostgresGetUser);
    await mikroClose();
  });

  it('Pg', async () => {
    await checkUnit(pgGetUser);
    await pgClose();
  });

  it('PgTyped', async () => {
    await checkUnit(pgTypedGetUser);
    await pgTypedClose();
  });

  it('Postgres.js', async () => {
    await checkUnit(postgresGetUser);
    await postgresClose();
  });

  it('Prisma', async () => {
    await checkUnit(prismaPostgresGetUser);
    await prismaClose();
  });

  it('Sequelize', async () => {
    await checkUnit(sequelizePostgresGetUser);
    await sequelizeClose();
  });

  it('TypeORM', async () => {
    await checkUnit(typeormPostgresGetUser);
    await typeormClose();
  });
});
