import { PrismaClient } from '@prisma/client';
import { postgresConfig } from '../config';

const prismaClientOptions = {
  datasourceUrl: postgresConfig.max
    ? process.env.DATABASE_URL
    : `${process.env.DATABASE_URL}&connection_limit=${postgresConfig.max}`,
};

const prisma = new PrismaClient(prismaClientOptions);

export const prismaPostgresGetUser = async (id: number) =>
  await prisma.users.findFirst({
    where: {
      id,
    },
  });

export const prismaClose = () => prisma.$disconnect();
