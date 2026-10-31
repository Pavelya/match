/**
 * Accepted student invitations left behind by deleted accounts (MAINT 5.25, step 6)
 *
 * Before 5.25, deleting a student's account left their `Invitation` rows: the address, the name
 * the coordinator typed, the school. This counts the accepted student invitations whose address
 * no account has, and deletes them only with --apply. Only accepted ones: a pending or expired
 * invitation to an address with no account may be someone who never signed up (MAINT 7.4 covers
 * those).
 *
 * It reads aggregates only, never the rows. The delete changes production: run --apply only with
 * the owner's explicit approval, after a backup (AGENTS.md).
 *
 * Run with: npx tsx scripts/delete-orphaned-student-invitations.ts
 * To delete them: npx tsx scripts/delete-orphaned-student-invitations.ts --apply
 */

import 'dotenv/config'
import { prisma } from '@/lib/prisma-standalone'

const ORPHANED = `
  FROM "Invitation" i
  WHERE i."role" = 'STUDENT'
    AND i."status" = 'ACCEPTED'
    AND NOT EXISTS (SELECT 1 FROM "User" u WHERE lower(u."email") = lower(i."email"))
`

async function main() {
  const apply = process.argv.includes('--apply')

  const [{ count }] = await prisma.$queryRawUnsafe<{ count: bigint }[]>(
    `SELECT count(*) AS count ${ORPHANED}`
  )
  console.log(`Accepted student invitations whose address has no account: ${count}`)

  if (!apply) {
    console.log('Nothing deleted. Run again with --apply to delete them.')
    return
  }

  const deleted = await prisma.$executeRawUnsafe(
    `DELETE FROM "Invitation" WHERE "id" IN (SELECT i."id" ${ORPHANED})`
  )
  console.log(`Deleted ${deleted}.`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
