import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Prisma } from '@prisma/client'
import { deleteStudentAccount } from './delete-student'

// One deletion for both routes (MAINT 5.25): every table that holds the student, through the
// transaction's client, in order, the invitations by address without case and students' only.

const order: string[] = []
const fn = (name: string) => vi.fn(async () => void order.push(name))

const tx = {
  user: { findUnique: vi.fn(), delete: fn('user') },
  savedProgram: { deleteMany: fn('savedProgram') },
  studentCourse: { deleteMany: fn('studentCourse') },
  studentProfile: { delete: fn('studentProfile') },
  supportTicket: { deleteMany: fn('supportTicket') },
  session: { deleteMany: fn('session') },
  account: { deleteMany: fn('account') },
  verificationToken: { deleteMany: fn('verificationToken') },
  invitation: { deleteMany: fn('invitation') }
}
const run = (userId = 'user-1') =>
  deleteStudentAccount(tx as unknown as Prisma.TransactionClient, userId)

beforeEach(() => {
  vi.clearAllMocks()
  order.length = 0
  tx.user.findUnique.mockResolvedValue({
    email: 'Maya@Example.com',
    name: 'Maya Okafor',
    studentProfile: { id: 'profile-1' }
  })
})

describe('deleteStudentAccount', () => {
  it('deletes everything the account holds, in order, and gives the address and name', async () => {
    expect(await run()).toEqual({ email: 'Maya@Example.com', name: 'Maya Okafor' })
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
    expect(tx.savedProgram.deleteMany).toHaveBeenCalledWith({
      where: { studentProfileId: 'profile-1' }
    })
    expect(tx.supportTicket.deleteMany).toHaveBeenCalledWith({ where: { userId: 'user-1' } })
    expect(tx.verificationToken.deleteMany).toHaveBeenCalledWith({
      where: { identifier: 'Maya@Example.com' }
    })
    expect(tx.user.delete).toHaveBeenCalledWith({ where: { id: 'user-1' } })
  })

  it('deletes the student invitations sent to the address, from any school, without case', async () => {
    await run()
    expect(tx.invitation.deleteMany).toHaveBeenCalledWith({
      where: { role: 'STUDENT', email: { equals: 'Maya@Example.com', mode: 'insensitive' } }
    })
  })

  it('deletes an account without a profile', async () => {
    tx.user.findUnique.mockResolvedValue({
      email: 'maya@example.com',
      name: null,
      studentProfile: null
    })
    expect(await run()).toEqual({ email: 'maya@example.com', name: null })
    expect(tx.studentProfile.delete).not.toHaveBeenCalled()
    expect(order).toContain('invitation')
    expect(order.at(-1)).toBe('user')
  })

  it('deletes nothing when there is no such account', async () => {
    tx.user.findUnique.mockResolvedValue(null)
    await expect(run()).rejects.toThrow()
    expect(order).toEqual([])
  })
})
