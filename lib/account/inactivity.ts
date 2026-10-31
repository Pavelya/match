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
 * After the notice (Part D), a student is deleted 30 days later, counted in whole UTC days from the
 * day it was sent, unless they come back: the jwt callback's daily write clears the notice
 * (lib/auth/last-active.ts), and a date later than the notice counts as coming back too.
 *
 * The admin list, the student's page, the dashboard, the inactive-accounts page and both of its
 * buttons all read the rule from here.
 */

export const SILENT_AFTER_MONTHS = 6

/** Days from the notice to the deletion */
export const NOTICE_DAYS = 30
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

/** Midnight UTC at the start of the date's day */
export function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

/** The day an account notified on `noticeSentAt` is due for deletion: 30 whole days later */
export function deletionDate(noticeSentAt: Date): Date {
  return new Date(startOfUtcDay(noticeSentAt).getTime() + NOTICE_DAYS * DAY_MS)
}

/** Whole days from today (UTC) to the deletion date; 0 once it is due */
export function daysLeft(noticeSentAt: Date, now: Date): number {
  const days = (deletionDate(noticeSentAt).getTime() - startOfUtcDay(now).getTime()) / DAY_MS
  return Math.max(0, Math.round(days))
}

export type InactivityState = 'active' | 'due-notice' | 'notified' | 'due-deletion'

/**
 * Where a student stands. Active: not silent. Due a notice: silent, with no notice standing.
 * Notified: the notice sent and the student not seen since, inside the 30 days. Due for deletion:
 * the same, from the 30th day on.
 */
export function inactivityState(
  user: { lastActiveAt: Date | null; createdAt: Date; inactivityNoticeSentAt: Date | null },
  now: Date
): InactivityState {
  const notice = user.inactivityNoticeSentAt
  if (notice && !(user.lastActiveAt && user.lastActiveAt.getTime() > notice.getTime())) {
    return now.getTime() >= deletionDate(notice).getTime() ? 'due-deletion' : 'notified'
  }
  return isSilent(user, now) ? 'due-notice' : 'active'
}
