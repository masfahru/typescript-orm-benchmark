import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const prismaPostgresGetUser = async (id: number) =>
  await prisma.users.findFirst({
    where: {
      id,
    },
  });

export const prismaClose = () => prisma.$disconnect();
