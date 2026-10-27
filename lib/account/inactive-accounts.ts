import { render } from '@react-email/components'
import { inactivityNoticeMessage } from '@/emails/inactivity-notice'
import { deleteStudentAccount } from '@/lib/account/delete-student'
import {
  deletionDate,
  inactivityState,
  lastSeen,
  silentStudentsWhere,
  startOfUtcDay
} from '@/lib/account/inactivity'
import { getResendClient } from '@/lib/email/client'
import { env } from '@/lib/env'
import { logger } from '@/lib/logger'
import { invalidateStudentCache } from '@/lib/matching/cache'
import { prisma } from '@/lib/prisma'

/*
 * The admin's inactive-accounts page and its two buttons (MAINT 7.6 Part D): who is due a notice,
 * who has one, who is due for deletion, and the two actions. Each reads the students again and
 * applies `inactivityState`, never a list the browser sent. Logs carry counts, never addresses.
 */

/**
 * Notices a day, under Resend's free plan's 100 a day, which sign-in links and invitations share
 * (`docs/legal-review/providers.md`). The first round of about 70 goes out over two days.
 */
export const NOTICES_PER_DAY = 50

/** Accounts deleted per press, one transaction each, so a press ends well inside a request */
export const DELETIONS_PER_PRESS = 25

const FROM_EMAIL = process.env.EMAIL_FROM || 'IB Match <support@ibmatch.com>'

/** Whether the buttons work: only once the Privacy Policy that sets the rule is published */
export function inactiveAccountsEnabled(): boolean {
  return env.INACTIVE_ACCOUNTS_ENABLED === 'true'
}

const studentSelect = {
  id: true,
  email: true,
  name: true,
  createdAt: true,
  lastActiveAt: true,
  inactivityNoticeSentAt: true,
  studentProfile: { select: { school: { select: { name: true } } } }
} as const

export interface InactiveStudent {
  id: string
  email: string
  name: string | null
  createdAt: Date
  lastActiveAt: Date | null
  inactivityNoticeSentAt: Date | null
  studentProfile: { school: { name: string } | null } | null
}

export interface InactiveStudents {
  dueNotice: InactiveStudent[]
  notified: InactiveStudent[]
  dueDeletion: InactiveStudent[]
}

/**
 * The three lists: silent students with no notice standing, and every student with one, each
 * placed by `inactivityState`. Oldest first: the longest silent, the earliest notice.
 */
export async function listInactiveStudents(now: Date): Promise<InactiveStudents> {
  const [silent, withNotice] = await Promise.all([
    prisma.user.findMany({
      where: { AND: [silentStudentsWhere(now), { inactivityNoticeSentAt: null }] },
      select: studentSelect
    }),
    prisma.user.findMany({
      where: { role: 'STUDENT', inactivityNoticeSentAt: { not: null } },
      select: studentSelect
    })
  ])

  const lists: InactiveStudents = { dueNotice: [], notified: [], dueDeletion: [] }
  for (const student of [...silent, ...withNotice]) {
    const state = inactivityState(student, now)
    if (state === 'due-notice') lists.dueNotice.push(student)
    else if (state === 'notified') lists.notified.push(student)
    else if (state === 'due-deletion') lists.dueDeletion.push(student)
  }
  const bySeen = (a: InactiveStudent, b: InactiveStudent) =>
    lastSeen(a).getTime() - lastSeen(b).getTime()
  const byNotice = (a: InactiveStudent, b: InactiveStudent) =>
    a.inactivityNoticeSentAt!.getTime() - b.inactivityNoticeSentAt!.getTime()
  lists.dueNotice.sort(bySeen)
  lists.notified.sort(byNotice)
  lists.dueDeletion.sort(byNotice)
  return lists
}

/** Notices already sent today (UTC), against the daily cap */
export function noticesSentToday(now: Date): Promise<number> {
  return prisma.user.count({
    where: { role: 'STUDENT', inactivityNoticeSentAt: { gte: startOfUtcDay(now) } }
  })
}

export type SendResult = { ok: true; sent: number; stillDue: number } | { ok: false; error: string }

/**
 * Sends the notices due, up to what is left of today's cap, in one Resend batch. A batch is
 * accepted whole or not at all, and a notice is recorded only once Resend has accepted it.
 */
export async function sendDueNotices(now: Date): Promise<SendResult> {
  const [{ dueNotice }, sentToday] = await Promise.all([
    listInactiveStudents(now),
    noticesSentToday(now)
  ])
  const batch = dueNotice.slice(0, Math.max(0, NOTICES_PER_DAY - sentToday))
  if (batch.length === 0) return { ok: true, sent: 0, stillDue: dueNotice.length }

  const deletesOn = deletionDate(now)
  const emails = await Promise.all(
    batch.map(async (student) => {
      const message = inactivityNoticeMessage({
        lastSeen: lastSeen(student),
        deletesOn,
        schoolName: student.studentProfile?.school?.name
      })
      return {
        from: FROM_EMAIL,
        to: student.email,
        subject: message.subject,
        html: await render(message.react),
        text: message.text
      }
    })
  )

  const { data, error } = await getResendClient().batch.send(emails)
  if (error || !data) {
    logger.error('Inactivity notices not sent', { count: batch.length, error: error?.message })
    return { ok: false, error: 'The email service refused the notices. Nothing was recorded.' }
  }

  // Still unnotified: a student who came back meanwhile keeps no notice
  const { count } = await prisma.user.updateMany({
    where: { id: { in: batch.map((s) => s.id) }, inactivityNoticeSentAt: null },
    data: { inactivityNoticeSentAt: now }
  })
  logger.info('Inactivity notices sent', { sent: count, stillDue: dueNotice.length - count })
  return { ok: true, sent: count, stillDue: dueNotice.length - count }
}

export type DeleteResult = {
  deleted: number
  stillDue: number
  /** Set when an account failed: the deletion stopped there */
  error?: string
}

/**
 * Deletes the accounts due, up to the per-press limit, each in its own transaction through
 * `deleteStudentAccount`, which deletes everything the account holds (MAINT 5.25). Each is checked
 * again inside its transaction, so a student who came back since the list was read is kept. A
 * failure stops at that account. No email: the notice said none would follow (7.6, decision 5).
 */
export async function deleteDueAccounts(now: Date): Promise<DeleteResult> {
  const { dueDeletion } = await listInactiveStudents(now)
  const batch = dueDeletion.slice(0, DELETIONS_PER_PRESS)

  let deleted = 0
  const kept: string[] = []
  for (const student of batch) {
    try {
      const done = await prisma.$transaction(async (tx) => {
        const current = await tx.user.findUnique({
          where: { id: student.id },
          select: { role: true, createdAt: true, lastActiveAt: true, inactivityNoticeSentAt: true }
        })
        if (current?.role !== 'STUDENT' || inactivityState(current, now) !== 'due-deletion') {
          return false
        }
        await deleteStudentAccount(tx, student.id)
        return true
      })
      if (done) {
        deleted++
        await invalidateStudentCache(student.id).catch(() => undefined)
      } else {
        kept.push(student.id)
      }
    } catch (error) {
      logger.error('Inactive account deletion stopped', {
        deleted,
        studentId: student.id.slice(0, 8),
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      return {
        deleted,
        stillDue: dueDeletion.length - deleted - kept.length,
        error: `Deleting one account failed, so the rest were left. ${deleted} deleted.`
      }
    }
  }

  logger.info('Inactive accounts deleted', { deleted, kept: kept.length })
  return { deleted, stillDue: dueDeletion.length - deleted - kept.length }
}
