import { PrismaClient } from '@prisma/client'
import { createPrismaAdapter } from '@/lib/prisma-adapter'
import { algoliaExtension } from '@/lib/algolia/middleware'
import { referenceDataSyncExtension } from '@/lib/algolia/reference-sync-extension'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Prisma 7 requires a driver adapter. This connects through node-postgres
// against the pooled `DATABASE_URL` (pgbouncer, 6543); migrations use
// `DIRECT_URL` instead and are configured in prisma.config.ts. See
// `lib/prisma-adapter.ts` for the TLS and pool-size reasoning.
const adapter = createPrismaAdapter({ max: 5 })

const basePrisma = new PrismaClient({
  adapter,
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
