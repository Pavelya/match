import { beforeEach, describe, expect, it, vi } from 'vitest'

// MAINT 7.6 Part D: the inactive-accounts page's lists and its two buttons. Prisma and Resend are
// mocked; the rule and the email are the real ones.

const {
  findMany,
  count,
  updateMany,
  txFindUnique,
  transaction,
  batchSend,
  deleteStudent,
  invalidate
} = vi.hoisted(() => {
  const txFindUnique = vi.fn()
  return {
    findMany: vi.fn(),
    count: vi.fn(),
    updateMany: vi.fn(),
    txFindUnique,
    transaction: vi.fn(),
    batchSend: vi.fn(),
    deleteStudent: vi.fn(),
    invalidate: vi.fn(async (_id: string) => undefined)
  }
})

vi.mock('@/lib/prisma', () => ({
  prisma: { user: { findMany, count, updateMany }, $transaction: transaction }
}))
vi.mock('@/lib/email/client', () => ({ getResendClient: () => ({ batch: { send: batchSend } }) }))
vi.mock('@/lib/account/delete-student', () => ({ deleteStudentAccount: deleteStudent }))
vi.mock('@/lib/matching/cache', () => ({ invalidateStudentCache: invalidate }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), error: vi.fn() } }))
vi.mock('@/lib/env', () => ({ env: { INACTIVE_ACCOUNTS_ENABLED: undefined } }))

import {
  DELETIONS_PER_PRESS,
  NOTICES_PER_DAY,
  deleteDueAccounts,
  inactiveAccountsEnabled,
  listInactiveStudents,
  sendDueNotices,
  type InactiveStudent
} from './inactive-accounts'

const now = new Date('2026-11-17T10:00:00.000Z')
const at = (iso: string) => new Date(iso)

function student(id: string, over: Partial<InactiveStudent> = {}): InactiveStudent {
  return {
    id,
    email: `${id}@example.com`,
    name: null,
    createdAt: at('2026-01-01T00:00:00.000Z'),
    lastActiveAt: at('2026-02-01T00:00:00.000Z'),
    inactivityNoticeSentAt: null,
    studentProfile: null,
    ...over
  }
}

/** The two reads: silent with no notice, then every student with a notice */
function students(silent: InactiveStudent[], withNotice: InactiveStudent[] = []) {
  findMany.mockResolvedValueOnce(silent).mockResolvedValueOnce(withNotice)
}

beforeEach(() => {
  vi.clearAllMocks()
  count.mockResolvedValue(0)
  updateMany.mockImplementation(async ({ where }) => ({ count: where.id.in.length }))
  transaction.mockImplementation(async (fn) => fn({ user: { findUnique: txFindUnique } }))
})

describe('the switch', () => {
  it('is off unless INACTIVE_ACCOUNTS_ENABLED is "true"', () => {
    expect(inactiveAccountsEnabled()).toBe(false)
  })
})

describe('listInactiveStudents', () => {
  it('places each student by the rule, oldest first', async () => {
    students(
      [student('b', { lastActiveAt: at('2026-03-01') }), student('a', { lastActiveAt: null })],
      [
        student('n', { inactivityNoticeSentAt: at('2026-11-01T08:00:00Z') }),
        student('d', { inactivityNoticeSentAt: at('2026-10-10T08:00:00Z') }),
        student('back', {
          inactivityNoticeSentAt: at('2026-10-01T08:00:00Z'),
          lastActiveAt: at('2026-10-05T08:00:00Z')
        })
      ]
    )
    const lists = await listInactiveStudents(now)

    expect(lists.dueNotice.map((s) => s.id)).toEqual(['a', 'b'])
    expect(lists.notified.map((s) => s.id)).toEqual(['n'])
    expect(lists.dueDeletion.map((s) => s.id)).toEqual(['d'])
  })

  it('reads ids, addresses, names, dates and the school name only', async () => {
    students([])
    await listInactiveStudents(now)
    const select = findMany.mock.calls[0][0].select
    expect(Object.keys(select).sort()).toEqual(
      [
        'createdAt',
        'email',
        'id',
        'inactivityNoticeSentAt',
        'lastActiveAt',
        'name',
        'studentProfile'
      ].sort()
    )
  })
})

describe('sendDueNotices', () => {
  it('sends one batch, then records exactly those it sent', async () => {
    students([
      student('s1'),
      student('s2', { studentProfile: { school: { name: 'Lakeside International' } } })
    ])
    batchSend.mockResolvedValue({ data: { data: [{ id: 'e1' }, { id: 'e2' }] }, error: null })

    expect(await sendDueNotices(now)).toEqual({ ok: true, sent: 2, stillDue: 0 })

    const emails = batchSend.mock.calls[0][0]
    expect(emails.map((e: { to: string }) => e.to)).toEqual(['s1@example.com', 's2@example.com'])
    expect(emails[0].subject).toBe('Your IB Match account will be deleted on 17 December 2026')
    expect(emails[0].text).toContain('since 1 February 2026')
    expect(emails[1].text).toContain('Your link to Lakeside International')
    expect(emails[0].html).toContain('<h1')
    expect(updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['s1', 's2'] }, inactivityNoticeSentAt: null },
      data: { inactivityNoticeSentAt: now }
    })
  })

  it('records nothing when Resend refuses the batch', async () => {
    students([student('s1')])
    batchSend.mockResolvedValue({ data: null, error: { message: 'daily_quota_exceeded' } })

    const result = await sendDueNotices(now)

    expect(result.ok).toBe(false)
    expect(updateMany).not.toHaveBeenCalled()
  })

  it('sends only what is left of today’s cap, and nothing once it is used', async () => {
    const many = Array.from({ length: 70 }, (_, i) => student(`s${i}`))
    students(many)
    count.mockResolvedValue(NOTICES_PER_DAY - 5)
    batchSend.mockResolvedValue({ data: { data: [] }, error: null })

    expect(await sendDueNotices(now)).toEqual({ ok: true, sent: 5, stillDue: 65 })
    expect(batchSend.mock.calls[0][0]).toHaveLength(5)

    students(many)
    count.mockResolvedValue(NOTICES_PER_DAY)
    expect(await sendDueNotices(now)).toEqual({ ok: true, sent: 0, stillDue: 70 })
    expect(batchSend).toHaveBeenCalledTimes(1)
  })

  it('counts today’s notices from midnight UTC', async () => {
    students([])
    await sendDueNotices(now)
    expect(count).toHaveBeenCalledWith({
      where: { role: 'STUDENT', inactivityNoticeSentAt: { gte: at('2026-11-17T00:00:00.000Z') } }
    })
  })
})

describe('deleteDueAccounts', () => {
  const due = (id: string) => student(id, { inactivityNoticeSentAt: at('2026-10-01T08:00:00Z') })
  const asStored = (s: InactiveStudent) => ({
    role: 'STUDENT',
    createdAt: s.createdAt,
    lastActiveAt: s.lastActiveAt,
    inactivityNoticeSentAt: s.inactivityNoticeSentAt
  })

  it('deletes each due account in its own transaction, and clears its matches', async () => {
    const list = [due('d1'), due('d2')]
    students([], list)
    txFindUnique.mockImplementation(async ({ where }) =>
      asStored(list.find((s) => s.id === where.id)!)
    )

    expect(await deleteDueAccounts(now)).toEqual({ deleted: 2, stillDue: 0 })
    expect(transaction).toHaveBeenCalledTimes(2)
    expect(deleteStudent.mock.calls.map((c) => c[1])).toEqual(['d1', 'd2'])
    expect(invalidate.mock.calls.map((c) => c[0])).toEqual(['d1', 'd2'])
  })

  it('keeps a student who came back after the list was read', async () => {
    students([], [due('d1')])
    txFindUnique.mockResolvedValue({
      ...asStored(due('d1')),
      lastActiveAt: at('2026-11-17T09:00:00Z'),
      inactivityNoticeSentAt: null
    })

    expect(await deleteDueAccounts(now)).toEqual({ deleted: 0, stillDue: 0 })
    expect(deleteStudent).not.toHaveBeenCalled()
  })

  it('stops at the first failure and says how many went', async () => {
    const list = [due('d1'), due('d2'), due('d3')]
    students([], list)
    txFindUnique.mockImplementation(async ({ where }) =>
      asStored(list.find((s) => s.id === where.id)!)
    )
    deleteStudent.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error('deadlock'))

    const result = await deleteDueAccounts(now)

    expect(result).toMatchObject({ deleted: 1, stillDue: 2 })
    expect(result.error).toContain('1 deleted')
    expect(deleteStudent).toHaveBeenCalledTimes(2)
  })

  it('deletes at most the per-press limit', async () => {
    const list = Array.from({ length: DELETIONS_PER_PRESS + 5 }, (_, i) => due(`d${i}`))
    students([], list)
    txFindUnique.mockImplementation(async ({ where }) =>
      asStored(list.find((s) => s.id === where.id)!)
    )

    expect(await deleteDueAccounts(now)).toEqual({ deleted: DELETIONS_PER_PRESS, stillDue: 5 })
  })

  it('never touches an account not yet 30 days from its notice', async () => {
    students([], [student('n', { inactivityNoticeSentAt: at('2026-11-01T08:00:00Z') })])

    expect(await deleteDueAccounts(now)).toEqual({ deleted: 0, stillDue: 0 })
    expect(transaction).not.toHaveBeenCalled()
  })
})
