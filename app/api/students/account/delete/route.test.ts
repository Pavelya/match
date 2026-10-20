import { beforeEach, describe, expect, it, vi } from 'vitest'

// Deleting an account runs every delete in one transaction, so a failure deletes nothing
// (rebranding 3.3: the dialog's "Nothing was deleted" depends on it). Once it has committed,
// "Account deleted" goes to the student (MAINT 5.24) and their cached matches go (5.25), after
// the response, and neither can fail the deletion.

const { tx, prismaMock, afterQueue, sendMock, invalidateMock } = vi.hoisted(() => {
  const tx = {
    user: { findUnique: vi.fn(), delete: vi.fn() },
    savedProgram: { deleteMany: vi.fn() },
    studentCourse: { deleteMany: vi.fn() },
    studentProfile: { delete: vi.fn() },
    supportTicket: { deleteMany: vi.fn() },
    session: { deleteMany: vi.fn() },
    account: { deleteMany: vi.fn() },
    verificationToken: { deleteMany: vi.fn() },
    invitation: { deleteMany: vi.fn() }
  }
  return {
    tx,
    // The client outside the transaction: nothing may be deleted through it
    prismaMock: {
      $transaction: vi.fn(async (run: (client: typeof tx) => Promise<unknown>) => run(tx)),
      user: { findUnique: vi.fn(), delete: vi.fn() },
      studentProfile: { findUnique: vi.fn(), delete: vi.fn() }
    },
    afterQueue: [] as (() => Promise<void>)[],
    sendMock: vi.fn(),
    invalidateMock: vi.fn()
  }
})

vi.mock('next/server', async (original) => ({
  ...(await original<typeof import('next/server')>()),
  after: (task: () => Promise<void>) => afterQueue.push(task)
}))
vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'user-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))
vi.mock('@/lib/email/account-emails', () => ({ sendAccountDeletedEmail: sendMock }))
vi.mock('@/lib/matching/cache', () => ({ invalidateStudentCache: invalidateMock }))

import { DELETE } from './route'

/** What `after()` was given, run as Next.js runs it once the response is sent */
async function runAfter() {
  for (const task of afterQueue.splice(0)) await task()
}

beforeEach(() => {
  vi.clearAllMocks()
  afterQueue.length = 0
  tx.user.findUnique.mockResolvedValue({
    email: 'maya@example.com',
    name: 'Maya Okafor',
    studentProfile: { id: 'profile-1' }
  })
  sendMock.mockResolvedValue(true)
  invalidateMock.mockResolvedValue(undefined)
})

describe('DELETE /api/students/account/delete', () => {
  it('deletes the student’s data, how they sign in, then the user, in one transaction', async () => {
    const order: string[] = []
    for (const [model, method] of [
      ['savedProgram', 'deleteMany'],
      ['studentCourse', 'deleteMany'],
      ['studentProfile', 'delete'],
      ['supportTicket', 'deleteMany'],
      ['session', 'deleteMany'],
      ['account', 'deleteMany'],
      ['verificationToken', 'deleteMany'],
      ['invitation', 'deleteMany'],
      ['user', 'delete']
    ] as const) {
      ;(tx[model] as Record<string, ReturnType<typeof vi.fn>>)[method].mockImplementation(
        async () => {
          order.push(model)
        }
      )
    }

    const response = await DELETE()

    expect(response.status).toBe(200)
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1)
    expect(order).toEqual([
      'savedProgram',
      'studentCourse',
      'studentProfile',
      'supportTicket',
      'session',
      'account',
      'verificationToken',
      'invitation',
      'user'
    ])
    expect(prismaMock.user.delete).not.toHaveBeenCalled()
    expect(prismaMock.studentProfile.delete).not.toHaveBeenCalled()
  })

  it('deletes an account without a profile', async () => {
    tx.user.findUnique.mockResolvedValue({
      email: 'maya@example.com',
      name: null,
      studentProfile: null
    })

    expect((await DELETE()).status).toBe(200)
    expect(tx.studentProfile.delete).not.toHaveBeenCalled()
    expect(tx.user.delete).toHaveBeenCalledWith({ where: { id: 'user-1' } })
  })

  it('emails the student and clears their matches once the deletion has committed', async () => {
    const response = await DELETE()
    expect(response.status).toBe(200)
    // Nothing before the response
    expect(sendMock).not.toHaveBeenCalled()

    await runAfter()
    expect(sendMock).toHaveBeenCalledWith({
      to: 'maya@example.com',
      userName: 'Maya Okafor',
      deletedBy: 'student'
    })
    expect(invalidateMock).toHaveBeenCalledWith('user-1')
    expect(tx.user.delete.mock.invocationCallOrder[0]).toBeLessThan(
      sendMock.mock.invocationCallOrder[0]
    )
  })

  it('still answers 200 when the email or the cache fails', async () => {
    sendMock.mockRejectedValue(new Error('Resend down'))
    invalidateMock.mockRejectedValue(new Error('Redis down'))

    expect((await DELETE()).status).toBe(200)
    await expect(runAfter()).resolves.toBeUndefined()
  })

  it('fails as a whole when one delete fails, and sends nothing', async () => {
    tx.account.deleteMany.mockRejectedValue(new Error('connection lost'))

    const response = await DELETE()

    expect(response.status).toBe(500)
    expect(tx.user.delete).not.toHaveBeenCalled()
    await runAfter()
    expect(sendMock).not.toHaveBeenCalled()
    expect(invalidateMock).not.toHaveBeenCalled()
  })
})
