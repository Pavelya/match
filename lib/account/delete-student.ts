import type { Prisma } from '@/app/generated/prisma/client'

/**
 * Deletes everything a student's account holds, for both ways an account is deleted: the student
 * in Settings and an admin (MAINT 5.25, decided 19 October 2026: "We need to delete all the
 * info"). Run it inside `prisma.$transaction`, so a failure part-way deletes nothing.
 *
 * Deletes in order, for the foreign keys, naming each table rather than trusting the cascade:
 * saved programs, courses and the profile; support tickets; how they sign in; sign-in links; the
 * student invitations sent to their address, from any school, in any status; then the user. The
 * invitations are found by address, not by user, so no cascade reaches them, and the invite routes
 * store the address lower-cased or as the account has it, so it's matched without case.
 *
 * Returns the address and name read first, for "Account deleted" (MAINT 5.24). Throws when there
 * is no such user.
 */
export async function deleteStudentAccount(
  tx: Prisma.TransactionClient,
  userId: string
): Promise<{ email: string; name: string | null }> {
  const user = await tx.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true, studentProfile: { select: { id: true } } }
  })
  if (!user) throw new Error('No account to delete')

  // 1. The student's data: saved programs, courses, then the profile
  const profileId = user.studentProfile?.id
  if (profileId) {
    await tx.savedProgram.deleteMany({ where: { studentProfileId: profileId } })
    await tx.studentCourse.deleteMany({ where: { studentProfileId: profileId } })
    await tx.studentProfile.delete({ where: { id: profileId } })
  }

  // 2. Their support tickets
  await tx.supportTicket.deleteMany({ where: { userId } })

  // 3. How they sign in
  await tx.session.deleteMany({ where: { userId } })
  await tx.account.deleteMany({ where: { userId } })

  // 4. Sign-in links sent to their email
  await tx.verificationToken.deleteMany({ where: { identifier: user.email } })

  // 5. School invitations sent to them. Only students' at this address: a coordinator's
  // invitation, or another student's, is someone else's
  await tx.invitation.deleteMany({
    where: { role: 'STUDENT', email: { equals: user.email, mode: 'insensitive' } }
  })

  // 6. Finally, the user
  await tx.user.delete({ where: { id: userId } })

  return { email: user.email, name: user.name }
}
