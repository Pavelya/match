import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Prisma } from '@prisma/client'
import { deleteCoordinatorAccount } from './delete-coordinator'

// The admin deletes a coordinator who has sent invitations (MAINT 5.29): the invitations they
// sent and the one sent to them go first, through the transaction's client, then the user.

const order: string[] = []
const fn = (name: string) => vi.fn(async () => void order.push(name))

const tx = {
  user: { findUnique: vi.fn(), delete: fn('user') },
  invitation: { deleteMany: fn('invitation') },
  verificationToken: { deleteMany: fn('verificationToken') },
  iBSchool: { delete: fn('iBSchool'), deleteMany: fn('iBSchool') },
  studentProfile: { delete: fn('studentProfile'), deleteMany: fn('studentProfile') }
}
const run = (userId = 'coord-1') =>
  deleteCoordinatorAccount(tx as unknown as Prisma.TransactionClient, userId)

beforeEach(() => {
  vi.clearAllMocks()
  order.length = 0
  tx.user.findUnique.mockResolvedValue({ email: 'Ana@School.org' })
})

describe('deleteCoordinatorAccount', () => {
  it('deletes the invitations before the user, and gives the address', async () => {
    expect(await run()).toEqual({ email: 'Ana@School.org' })
    expect(order).toEqual(['invitation', 'invitation', 'verificationToken', 'user'])
    expect(tx.user.delete).toHaveBeenCalledWith({ where: { id: 'coord-1' } })
  })

  it('deletes every invitation the coordinator sent', async () => {
    await run()
    expect(tx.invitation.deleteMany).toHaveBeenCalledWith({ where: { invitedById: 'coord-1' } })
  })

  it('deletes the coordinator invitation sent to their address, without case', async () => {
    await run()
    expect(tx.invitation.deleteMany).toHaveBeenCalledWith({
      where: { role: 'COORDINATOR', email: { equals: 'Ana@School.org', mode: 'insensitive' } }
    })
    expect(tx.verificationToken.deleteMany).toHaveBeenCalledWith({
      where: { identifier: 'Ana@School.org' }
    })
  })

  it('leaves the school and its students', async () => {
    await run()
    expect(tx.iBSchool.delete).not.toHaveBeenCalled()
    expect(tx.iBSchool.deleteMany).not.toHaveBeenCalled()
    expect(tx.studentProfile.delete).not.toHaveBeenCalled()
    expect(tx.studentProfile.deleteMany).not.toHaveBeenCalled()
  })

  it('deletes nothing when there is no such account', async () => {
    tx.user.findUnique.mockResolvedValue(null)
    await expect(run()).rejects.toThrow()
    expect(order).toEqual([])
  })
})
