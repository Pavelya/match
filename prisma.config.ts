import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

/**
 * Prisma CLI configuration.
 *
 * Two things here are easy to get wrong and both have bitten this project:
 *
 * 1. `dotenv/config` is imported explicitly. Prisma 7 does not load `.env`
 *    by itself, and the CLI reads `.env` only — `.env.local` is a Next.js
 *    convention. Without this import every command fails with P1001.
 *
 * 2. The datasource URL is `DIRECT_URL`, not `DATABASE_URL`. `DATABASE_URL`
 *    is the pgbouncer pooler on port 6543, which cannot run migrations.
 *    `DIRECT_URL` is the session pooler on 5432. In Prisma 6 the schema
 *    carried both and Migrate picked `directUrl` on its own; in Prisma 7
 *    there is one URL here and it has to be the direct one.
 *
 * The application itself does not read this file. It connects through the
 * driver adapter in `lib/prisma.ts` using the pooled `DATABASE_URL`.
 */
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts'
  },
  datasource: {
    url: env('DIRECT_URL')
  }
})
