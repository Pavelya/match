import type { Prisma } from '@/app/generated/prisma/client'

/**
 * When a student is silent, and when active (MAINT 7.6, decided by the owner 26–27 October 2026).
 *
 * A student is silent once 6 months have passed since they were last seen signed in
 * (`User.lastActiveAt`, lib/auth/last-active.ts), and is then due the inactivity notice. A student
 * with no date yet (an invited account whose sign-in link was never used) counts from the day the
 * account was made, so it follows the same rule. Students only: coordinators, admins and agents are
 * never silent. Months are calendar months in UTC, as Postgres's `interval '6 months'` counts them.
 *
 * The admin list, the student's page and the dashboard all read it from here; Part D's notice and
 * deletion rule is added to this file.
 */

export const SILENT_AFTER_MONTHS = 6

/** "Active students, last 30 days" on the dashboard */
export const ACTIVE_WINDOW_DAYS = 30

const DAY_MS = 24 * 60 * 60 * 1000

/** `months` calendar months before `date`, in UTC; the 31st falls back to the month's last day */
export function monthsBefore(date: Date, months: number): Date {
  const result = new Date(date)
  const day = result.getUTCDate()
  result.setUTCDate(1)
  result.setUTCMonth(result.getUTCMonth() - months)
  const lastDay = new Date(
    Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)
  ).getUTCDate()
  result.setUTCDate(Math.min(day, lastDay))
  return result
}

/** A student last seen on or before this is silent */
export function silentCutoff(now: Date): Date {
  return monthsBefore(now, SILENT_AFTER_MONTHS)
}

/** The day the student was last seen: the stored date, or the day the account was made */
export function lastSeen(user: { lastActiveAt: Date | null; createdAt: Date }): Date {
  return user.lastActiveAt ?? user.createdAt
}

export function isSilent(user: { lastActiveAt: Date | null; createdAt: Date }, now: Date): boolean {
  return lastSeen(user).getTime() <= silentCutoff(now).getTime()
}

/** The same rule as `isSilent`, for `count()` and lists */
export function silentStudentsWhere(now: Date): Prisma.UserWhereInput {
  const cutoff = silentCutoff(now)
  return {
    role: 'STUDENT',
    OR: [{ lastActiveAt: { lte: cutoff } }, { lastActiveAt: null, createdAt: { lte: cutoff } }]
  }
}

/** Students seen signed in within the last 30 days */
export function activeStudentsWhere(now: Date): Prisma.UserWhereInput {
  return {
    role: 'STUDENT',
    lastActiveAt: { gt: new Date(now.getTime() - ACTIVE_WINDOW_DAYS * DAY_MS) }
  }
}
