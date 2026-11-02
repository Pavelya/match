/**
 * Old invitations and sign-in records (MAINT 5.50)
 *
 * The Privacy Policy, section 8, promises a review at least every three months that deletes
 * invitations that have expired, been declined or been cancelled, and expired sign-in records. This
 * counts what is due and deletes it only with --apply:
 *   - Invitation with status CANCELLED or EXPIRED. There is no declined status: a decline writes
 *     CANCELLED.
 *   - Invitation with status PENDING, past expiresAt. Nothing writes EXPIRED: an expired invitation
 *     stays PENDING and the screens work it out from the date, so the status alone would find none.
 *   - VerificationToken past expires. A used one is removed when used; an unused one stays.
 * An ACCEPTED invitation is never due: the policy keeps it as evidence of the student's permission
 * until the account is deleted.
 *
 * It prints counts only, never a row. --apply changes production, so it first writes the rows it
 * will delete to scripts/backups/purge-expired-records/ (gitignored: it holds addresses).
 *
 * The routine: by three months after the policy is published, then every three months. Run it
 * without --apply, get the owner's explicit approval for the run with it (AGENTS.md), check the
 * counts, then delete the backup: these are the records the policy says are gone.
 *
 * Run with: npx tsx scripts/purge-expired-records.ts
 * To delete them: npx tsx scripts/purge-expired-records.ts --apply
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import type { Prisma } from '@/app/generated/prisma/client'
import { prisma } from '@/lib/prisma-standalone'

async function main() {
  const apply = process.argv.includes('--apply')
  const now = new Date()

  const closed: Prisma.InvitationWhereInput = { status: { in: ['CANCELLED', 'EXPIRED'] } }
  const lapsed: Prisma.InvitationWhereInput = { status: 'PENDING', expiresAt: { lt: now } }
  const dueInvitation: Prisma.InvitationWhereInput = { OR: [closed, lapsed] }
  const dueSignInRecord: Prisma.VerificationTokenWhereInput = { expires: { lt: now } }

  const closedCount = await prisma.invitation.count({ where: closed })
  const lapsedCount = await prisma.invitation.count({ where: lapsed })
  const signInCount = await prisma.verificationToken.count({ where: dueSignInRecord })
  console.log(`Invitations declined, cancelled or marked expired: ${closedCount}`)
  console.log(`Invitations still pending, past their date: ${lapsedCount}`)
  console.log(`Expired sign-in records: ${signInCount}`)

  if (!apply) {
    console.log('Nothing deleted. Run again with --apply to delete them.')
    return
  }
  if (closedCount + lapsedCount + signInCount === 0) {
    console.log('Nothing due.')
    return
  }

  const invitations = await prisma.invitation.findMany({ where: dueInvitation })
  const signInRecords = await prisma.verificationToken.findMany({ where: dueSignInRecord })
  const dir = path.join(process.cwd(), 'scripts/backups/purge-expired-records')
  mkdirSync(dir, { recursive: true })
  const file = path.join(dir, `${now.toISOString().replace(/[:.]/g, '-')}.json`)
  writeFileSync(
    file,
    JSON.stringify({ takenAt: now.toISOString(), invitations, signInRecords }, null, 2),
    { mode: 0o600 }
  )
  console.log(
    `Backup of ${invitations.length} invitations and ${signInRecords.length} sign-in records: ` +
      path.relative(process.cwd(), file)
  )

  // Only rows in the backup, and only while still due: a resend or an accept may have landed since
  const [deletedInvitations, deletedSignInRecords] = await prisma.$transaction([
    prisma.invitation.deleteMany({
      where: { AND: [{ id: { in: invitations.map((i) => i.id) } }, dueInvitation] }
    }),
    prisma.verificationToken.deleteMany({
      where: { AND: [{ token: { in: signInRecords.map((r) => r.token) } }, dueSignInRecord] }
    })
  ])
  console.log(
    `Deleted ${deletedInvitations.count} invitations and ${deletedSignInRecords.count} sign-in records.`
  )
  console.log('Once the counts are right, delete the backup.')
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
