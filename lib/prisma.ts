import { PrismaClient } from '@prisma/client'
import { algoliaExtension } from '@/lib/algolia/middleware'
import { referenceDataSyncExtension } from '@/lib/algolia/reference-sync-extension'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const basePrisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
})

// Extend Prisma with Algolia auto-sync extensions (only in non-test environments)
export const prisma =
  globalForPrisma.prisma ||
  (process.env.NODE_ENV !== 'test'
    ? basePrisma.$extends(algoliaExtension).$extends(referenceDataSyncExtension)
    : basePrisma)

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
