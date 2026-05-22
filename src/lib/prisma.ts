// ========================================
// Prisma Client Singleton
// Handles missing DATABASE_URL gracefully
// ========================================

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  try {
    return new PrismaClient();
  } catch (error) {
    console.warn('Prisma: Could not create client:', error instanceof Error ? error.message : error);
    // Return a proxy that throws helpful errors instead of crashing the app
    return new Proxy({} as PrismaClient, {
      get(_, prop) {
        if (prop === 'then' || prop === 'catch') return undefined;
        return new Proxy(() => {}, {
          get() {
            return () => {
              throw new Error(
                'Database not configured. Set DATABASE_URL in .env.local and run: npx prisma migrate dev'
              );
            };
          },
          apply() {
            throw new Error(
              'Database not configured. Set DATABASE_URL in .env.local and run: npx prisma migrate dev'
            );
          },
        });
      },
    });
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
