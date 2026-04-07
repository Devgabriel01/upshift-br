import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { _prismaClient?: PrismaClient };

export function getPrisma(): PrismaClient {
  if (!globalForPrisma._prismaClient) {
    globalForPrisma._prismaClient = new PrismaClient();
  }
  return globalForPrisma._prismaClient;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return Reflect.get(getPrisma(), prop);
  },
});
