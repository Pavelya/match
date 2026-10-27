/**
 * The day a user was last seen signed in (MAINT 7.6 Part A, the date chosen in 7.5 Part B).
 *
 * Sessions are JWTs, so a returning student who still holds a valid token never signs in again and
 * leaves no row. The jwt callback already re-reads the role every few minutes for an active user;
 * that read selects the date too, so recording it costs no new read, and it is written at most once
 * a day per user: never a row per visit (the hard rules on cost).
 *
 * The same write clears `inactivityNoticeSentAt`: a student warned that their account will be
 * deleted keeps it by coming back, and the 6 months start again.
 */
import type { UserRole } from '@/app/generated/prisma/enums'
import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'

/** The date is written again only once it is this old */
export const LAST_ACTIVE_WRITE_MS = 24 * 60 * 60 * 1000

/** Whether the stored date is old enough to write again: never written, or a day old or more */
export function lastActiveIsStale(lastActiveAt: Date | null, now: Date): boolean {
  return lastActiveAt === null || now.getTime() - lastActiveAt.getTime() >= LAST_ACTIVE_WRITE_MS
}

/**
 * Reads the user's role for the token and records the day they were active. Returns null when the
 * account no longer exists. A failed write is logged and never fails the sign-in or the request.
 */
export async function readRoleAndMarkActive(
  userId: string,
  now: Date = new Date()
): Promise<UserRole | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, lastActiveAt: true }
  })
  if (!user) return null

  if (lastActiveIsStale(user.lastActiveAt, now)) {
    try {
      // Conditional, so two requests that read the same old date write it once
      const cutoff = new Date(now.getTime() - LAST_ACTIVE_WRITE_MS)
      await prisma.user.updateMany({
        where: {
          id: userId,
          OR: [{ lastActiveAt: null }, { lastActiveAt: { lte: cutoff } }]
        },
        data: { lastActiveAt: now, inactivityNoticeSentAt: null }
      })
    } catch (error) {
      logger.error('Failed to record last activity', {
        userId: userId.slice(0, 8),
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  return user.role
}
