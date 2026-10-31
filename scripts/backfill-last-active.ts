/**
 * Where the inactivity clock starts for students who signed up before the date was stored
 * (MAINT 7.6 Part A, decision 3, owner 27 October 2026)
 *
 * `User.lastActiveAt` is written by the jwt callback from the day it ships. A student who has not
 * been seen since has no date, so this fills it, once, with the latest change stored on the account
 * or its profile: the email sign-in date, the policy acceptances, the profile's dates, saved
 * programs, support tickets, accepted invitations and `User.updatedAt` (the dates 7.5 Part A counted
 * from). It leaves out the 20 profiles that 5.8's fix rewrote on 7 October 2026 at 13:08:42–43 UTC,
 * or they would all look active that day. Students only, and only where the date is still empty,
 * so a date the jwt callback wrote is never overwritten.
 *
 * The dry run prints counts and dates only, never an address. --apply changes production: run it
 * only with the owner's explicit approval (AGENTS.md). It first writes the ids it fills to
 * scripts/backups/last-active/ (gitignored); the columns were empty before, so undoing it is
 * setting them back to NULL for those ids.
 *
 * Run with: npx tsx scripts/backfill-last-active.ts
 * To fill them: npx tsx scripts/backfill-last-active.ts --apply
 */

import 'dotenv/config'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { prisma } from '@/lib/prisma-standalone'

const LATEST_TRACE = `
  SELECT u."id",
    GREATEST(
      u."createdAt",
      u."updatedAt",
      u."emailVerified",
      u."termsAcceptedAt",
      u."privacyAcceptedAt",
      p."createdAt",
      CASE
        WHEN p."updatedAt" >= '2026-10-07 13:08:42' AND p."updatedAt" < '2026-10-07 13:08:44'
          THEN NULL
        ELSE p."updatedAt"
      END,
      (SELECT max(s."createdAt") FROM "SavedProgram" s WHERE s."studentProfileId" = p."id"),
      (SELECT max(t."createdAt") FROM "SupportTicket" t WHERE t."userId" = u."id"),
      (SELECT max(i."acceptedAt") FROM "Invitation" i WHERE lower(i."email") = lower(u."email"))
    ) AS "lastTrace"
  FROM "User" u
  LEFT JOIN "StudentProfile" p ON p."userId" = u."id"
  WHERE u."role" = 'STUDENT' AND u."lastActiveAt" IS NULL
`

async function main() {
  const apply = process.argv.includes('--apply')

  const [summary] = await prisma.$queryRawUnsafe<
    {
      students: bigint
      toFill: bigint
      silent: bigint
      last30: bigint
      oldest: Date | null
      newest: Date | null
    }[]
  >(`
    SELECT
      (SELECT count(*) FROM "User" WHERE "role" = 'STUDENT') AS "students",
      count(*) AS "toFill",
      count(*) FILTER (WHERE t."lastTrace" <= now() AT TIME ZONE 'UTC' - interval '6 months') AS "silent",
      count(*) FILTER (WHERE t."lastTrace" > now() AT TIME ZONE 'UTC' - interval '30 days') AS "last30",
      min(t."lastTrace") AS "oldest",
      max(t."lastTrace") AS "newest"
    FROM (${LATEST_TRACE}) t
  `)
  console.log(`Students: ${summary.students}; with no last-active date: ${summary.toFill}`)
  console.log(`Of those, last change 6 months ago or more (silent): ${summary.silent}`)
  console.log(`Of those, last change in the last 30 days: ${summary.last30}`)
  console.log(`Oldest: ${summary.oldest?.toISOString()}; newest: ${summary.newest?.toISOString()}`)

  // A batch write would show as many students sharing one second
  const batches = await prisma.$queryRawUnsafe<{ second: Date; students: bigint }[]>(`
    SELECT date_trunc('second', t."lastTrace") AS "second", count(*) AS "students"
    FROM (${LATEST_TRACE}) t
    GROUP BY 1 HAVING count(*) > 1
    ORDER BY 2 DESC LIMIT 5
  `)
  console.log(
    batches.length === 0
      ? 'No two students share a second.'
      : `Students sharing one second: ${batches
          .map((b) => `${b.students} at ${b.second.toISOString()}`)
          .join('; ')}`
  )

  if (!apply) {
    console.log('Nothing written. Run again with --apply to fill them.')
    return
  }

  const rows = await prisma.$queryRawUnsafe<{ id: string; lastTrace: Date }[]>(LATEST_TRACE)
  const dir = path.join(process.cwd(), 'scripts/backups/last-active')
  mkdirSync(dir, { recursive: true })
  const file = path.join(dir, `${new Date().toISOString().replace(/[:.]/g, '-')}.json`)
  writeFileSync(
    file,
    JSON.stringify(
      {
        note: 'lastActiveAt was NULL for every id below before the backfill; to undo, set it back to NULL for these ids',
        filled: rows.map((r) => ({ id: r.id, lastActiveAt: r.lastTrace.toISOString() }))
      },
      null,
      2
    )
  )
  console.log(`Backup of ${rows.length} ids: ${path.relative(process.cwd(), file)}`)

  // Raw SQL, so User.updatedAt keeps its meaning; IS NULL again, in case the jwt callback wrote one
  const filled = await prisma.$executeRawUnsafe(`
    UPDATE "User" u SET "lastActiveAt" = t."lastTrace"
    FROM (${LATEST_TRACE}) t
    WHERE u."id" = t."id" AND u."lastActiveAt" IS NULL
  `)
  console.log(`Filled ${filled}.`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
