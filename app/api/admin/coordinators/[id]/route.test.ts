import type { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// An admin deletes a coordinator, invitations and all, in one transaction (MAINT 5.29). Before,
// a lone `user.delete` was refused by the foreign key from any invitation they had sent.

const { prismaMock, deleteMock } = vi.hoisted(() => {
  const tx = { marker: 'tx' }
  return {
    prismaMock: {
      $transaction: vi.fn(async (run: (client: typeof tx) => Promise<unknown>) => run(tx)),
      user: { findUnique: vi.fn(), delete: vi.fn() },
      coordinatorProfile: { findUnique: vi.fn() }
    },
    deleteMock: vi.fn()
  }
})

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'admin-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))
vi.mock('@/lib/account/delete-coordinator', () => ({ deleteCoordinatorAccount: deleteMock }))

import { DELETE } from './route'

const request = {} as NextRequest
const params = { params: Promise.resolve({ id: 'profile-1' }) }

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.user.findUnique.mockResolvedValue({ role: 'PLATFORM_ADMIN' })
  prismaMock.coordinatorProfile.findUnique.mockResolvedValue({ userId: 'coord-1' })
  deleteMock.mockResolvedValue({ email: 'ana@school.org' })
})

describe('DELETE /api/admin/coordinators/[id]', () => {
  it("deletes the coordinator's account in one transaction", async () => {
    const response = await DELETE(request, params)

    expect(response.status).toBe(200)
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1)
    expect(deleteMock).toHaveBeenCalledWith({ marker: 'tx' }, 'coord-1')
    expect(prismaMock.user.delete).not.toHaveBeenCalled()
  })

  it('answers 404 and deletes nothing for an unknown coordinator', async () => {
    prismaMock.coordinatorProfile.findUnique.mockResolvedValue(null)

    const response = await DELETE(request, params)

    expect(response.status).toBe(404)
    expect(prismaMock.$transaction).not.toHaveBeenCalled()
  })

  it('refuses anyone but an admin', async () => {
    prismaMock.user.findUnique.mockResolvedValue({ role: 'COORDINATOR' })

    const response = await DELETE(request, params)

    expect(response.status).toBe(403)
    expect(prismaMock.$transaction).not.toHaveBeenCalled()
  })

  it('answers 500 when the transaction fails', async () => {
    deleteMock.mockRejectedValue(new Error('Foreign key constraint violated'))

    const response = await DELETE(request, params)

    expect(response.status).toBe(500)
  })
})
