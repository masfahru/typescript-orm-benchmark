import { PrismaClient } from '@prisma/client';
import { postgresConfig } from '../config';

const prismaClientOptions = {
  datasourceUrl: postgresConfig.max
    ? `${process.env.DATABASE_URL}&connection_limit=${postgresConfig.max}`
    : process.env.DATABASE_URL,
};

const prisma = new PrismaClient(prismaClientOptions);

export const prismaPostgresGetUser = async (id: number) =>
  await prisma.users.findFirst({
    where: {
      id,
    },
  });

export const prismaClose = () => prisma.$disconnect();
