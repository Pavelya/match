import { beforeEach, describe, expect, it, vi } from 'vitest'

// Deleting an account runs every delete in one transaction, so a failure deletes nothing
// (rebranding 3.3: the dialog's "Nothing was deleted" depends on it)

const { tx, prismaMock } = vi.hoisted(() => {
  const tx = {
    user: { findUnique: vi.fn(), delete: vi.fn() },
    savedProgram: { deleteMany: vi.fn() },
    studentCourse: { deleteMany: vi.fn() },
    studentProfile: { delete: vi.fn() },
    session: { deleteMany: vi.fn() },
    account: { deleteMany: vi.fn() },
    verificationToken: { deleteMany: vi.fn() }
  }
  return {
    tx,
    // The client outside the transaction: nothing may be deleted through it
    prismaMock: {
      $transaction: vi.fn(async (run: (client: typeof tx) => Promise<unknown>) => run(tx)),
      user: { findUnique: vi.fn(), delete: vi.fn() },
      studentProfile: { findUnique: vi.fn(), delete: vi.fn() }
    }
  }
})

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'user-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))

import { DELETE } from './route'

beforeEach(() => {
  vi.clearAllMocks()
  tx.user.findUnique.mockResolvedValue({
    email: 'maya@example.com',
    studentProfile: { id: 'profile-1' }
  })
})

describe('DELETE /api/students/account/delete', () => {
  it('deletes the student’s data, how they sign in, then the user, in one transaction', async () => {
    const order: string[] = []
    for (const [model, method] of [
      ['savedProgram', 'deleteMany'],
      ['studentCourse', 'deleteMany'],
      ['studentProfile', 'delete'],
      ['session', 'deleteMany'],
      ['account', 'deleteMany'],
      ['verificationToken', 'deleteMany'],
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
      'session',
      'account',
      'verificationToken',
      'user'
    ])
    expect(tx.savedProgram.deleteMany).toHaveBeenCalledWith({
      where: { studentProfileId: 'profile-1' }
    })
    expect(tx.verificationToken.deleteMany).toHaveBeenCalledWith({
      where: { identifier: 'maya@example.com' }
    })
    expect(prismaMock.user.delete).not.toHaveBeenCalled()
    expect(prismaMock.studentProfile.delete).not.toHaveBeenCalled()
  })

  it('deletes an account without a profile', async () => {
    tx.user.findUnique.mockResolvedValue({ email: 'maya@example.com', studentProfile: null })

    expect((await DELETE()).status).toBe(200)
    expect(tx.studentProfile.delete).not.toHaveBeenCalled()
    expect(tx.user.delete).toHaveBeenCalledWith({ where: { id: 'user-1' } })
  })

  it('fails as a whole when one delete fails', async () => {
    tx.account.deleteMany.mockRejectedValue(new Error('connection lost'))

    const response = await DELETE()

    expect(response.status).toBe(500)
    expect(tx.user.delete).not.toHaveBeenCalled()
  })
})
