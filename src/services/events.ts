import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async () => {
  try {
    return await prisma.event.findMany();
  } catch (error) {
    return false;
  }
};

export const getOne = async () => {
  try {
    return await prisma.event.findFirst();
  } catch (error) {
    return false;
  }
};
