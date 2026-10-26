import type { Prisma } from '@/app/generated/prisma/client'

/**
 * Deletes a coordinator's account for the admin's delete button (MAINT 5.29). Run it inside
 * `prisma.$transaction`, so a failure part-way deletes nothing.
 *
 * Deletes what the cascade does not reach, then the user: the invitations the coordinator sent,
 * which have no `onDelete` and would otherwise block the delete; the coordinator invitation sent
 * to their address, matched without case as `deleteStudentAccount` does; and sign-in links sent to
 * their email. The user's delete cascades to the coordinator profile, support tickets, sessions
 * and sign-in accounts. The school, and the students linked to it, stay.
 *
 * Returns the address read first, for the log. Throws when there is no such user.
 */
export async function deleteCoordinatorAccount(
  tx: Prisma.TransactionClient,
  userId: string
): Promise<{ email: string }> {
  const user = await tx.user.findUnique({ where: { id: userId }, select: { email: true } })
  if (!user) throw new Error('No account to delete')

  // 1. Invitations they sent, to students or other coordinators, in any status
  await tx.invitation.deleteMany({ where: { invitedById: userId } })

  // 2. The invitation that made them a coordinator. Only coordinators' at this address: a
  // student's invitation is someone else's
  await tx.invitation.deleteMany({
    where: { role: 'COORDINATOR', email: { equals: user.email, mode: 'insensitive' } }
  })

  // 3. Sign-in links sent to their email
  await tx.verificationToken.deleteMany({ where: { identifier: user.email } })

  // 4. Finally, the user; the profile, tickets, sessions and accounts cascade
  await tx.user.delete({ where: { id: userId } })

  return { email: user.email }
}
