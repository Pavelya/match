import { PrismaPg } from '@prisma/adapter-pg'

/**
 * Builds the node-postgres driver adapter that Prisma 7 requires.
 *
 * Prisma 7 removed the built-in Rust query engine, so `new PrismaClient()`
 * with no adapter now throws. Everything that opens a connection goes through
 * here so the two things below are decided in one place.
 *
 * ## TLS
 *
 * Supabase's pooler presents a certificate signed by a CA that is not in the
 * default Node trust store. Prisma 6's engine read `sslmode=require` as
 * "encrypt, don't verify the chain" and connected happily. node-postgres reads
 * the same value as "encrypt AND verify", so every query fails with
 * `self-signed certificate in certificate chain` — including the build, which
 * prerenders `app/ib-university-requirements`.
 *
 * `no-verify` is node-postgres's spelling of the behaviour Prisma 6 already
 * had: still encrypted, chain not verified. Rewriting it here rather than in
 * `.env` means the Vercel environment variables do not have to change in
 * lockstep with this deploy.
 *
 * This preserves the previous security posture rather than improving it.
 * Verifying properly (`sslmode=verify-full` plus Supabase's CA certificate)
 * is a worthwhile follow-up, but it is a change to the trust model and does
 * not belong in the same commit as a major version upgrade.
 *
 * ## Pool size
 *
 * A driver adapter takes its pool settings from node-postgres, whose default
 * `max` is 10 — twice the Prisma 6 default it replaces (`num_cpus * 2 + 1`,
 * which is 5 on a typical Vercel instance). Supabase is on the free tier and
 * pgbouncer already pools server-side, so the callers set this explicitly
 * instead of silently doubling the connection count per instance.
 */
export function createPrismaAdapter({ max }: { max?: number } = {}) {
  const connectionString = process.env.DATABASE_URL?.replace(/sslmode=require/, 'sslmode=no-verify')

  return new PrismaPg({ connectionString, max })
}
