import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { createPrismaAdapter } from '@/lib/prisma-adapter'

/**
 * A plain Prisma client for standalone scripts and the seeder.
 *
 * Prisma 7 requires a driver adapter, so `new PrismaClient()` no longer works
 * on its own — every script that used to do that would now throw at runtime.
 * They share this client instead of each constructing their own.
 *
 * This deliberately does NOT carry the Algolia sync extensions that
 * `@/lib/prisma` adds: these scripts previously used an unextended client and
 * some of them are the Algolia sync tooling itself. Application code should
 * import `prisma` from `@/lib/prisma`, not this file.
 *
 * `dotenv/config` is imported here because many of these scripts never loaded
 * it themselves — under Prisma 6 the client found `.env` on its own, and with
 * a driver adapter it is plain `process.env` that has to be populated.
 */
export const prisma = new PrismaClient({
  adapter: createPrismaAdapter()
})
