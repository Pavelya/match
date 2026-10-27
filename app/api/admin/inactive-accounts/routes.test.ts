import { beforeEach, describe, expect, it, vi } from 'vitest'

// MAINT 7.6 Part D: both buttons refuse while INACTIVE_ACCOUNTS_ENABLED is off, before any work.
// The other gates (signed in, admin, limiter) are route-gates.test.ts's.

const { state, sendDueNotices, deleteDueAccounts } = vi.hoisted(() => ({
  state: { enabled: false },
  sendDueNotices: vi.fn(
    async (): Promise<{ ok: boolean; sent?: number; stillDue?: number; error?: string }> => ({
      ok: true,
      sent: 3,
      stillDue: 1
    })
  ),
  deleteDueAccounts: vi.fn(
    async (): Promise<{ deleted: number; stillDue: number; error?: string }> => ({
      deleted: 2,
      stillDue: 0
    })
  )
}))

vi.mock('@/lib/auth/config', () => ({
  auth: vi.fn(async () => ({ user: { id: 'admin-1', role: 'PLATFORM_ADMIN' } }))
}))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/prisma', () => ({
  prisma: { user: { findUnique: vi.fn(async () => ({ role: 'PLATFORM_ADMIN' })) } }
}))
vi.mock('@/lib/logger', () => ({ logger: { error: vi.fn() } }))
vi.mock('@/lib/account/inactive-accounts', () => ({
  inactiveAccountsEnabled: () => state.enabled,
  sendDueNotices,
  deleteDueAccounts
}))

import { POST as sendNotices } from './notices/route'
import { POST as deleteAccounts } from './delete/route'

beforeEach(() => {
  vi.clearAllMocks()
  state.enabled = false
})

describe('with the switch off', () => {
  it.each([
    ['Send notices', sendNotices],
    ['Delete due accounts', deleteAccounts]
  ])('%s → 409, and does nothing', async (_name, post) => {
    const res = await post()

    expect(res.status).toBe(409)
    expect((await res.json()).error).toContain('Privacy Policy')
    expect(sendDueNotices).not.toHaveBeenCalled()
    expect(deleteDueAccounts).not.toHaveBeenCalled()
  })
})

describe('with the switch on', () => {
  beforeEach(() => {
    state.enabled = true
  })

  it('sends the notices due', async () => {
    const res = await sendNotices()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ sent: 3, stillDue: 1 })
  })

  it('deletes the accounts due', async () => {
    const res = await deleteAccounts()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ deleted: 2, stillDue: 0 })
  })

  it('says how far a stopped deletion got', async () => {
    deleteDueAccounts.mockResolvedValueOnce({ deleted: 1, stillDue: 2, error: 'Deleting one…' })
    const res = await deleteAccounts()
    expect(res.status).toBe(500)
    expect(await res.json()).toMatchObject({ deleted: 1, stillDue: 2 })
  })

  it('reports a refused batch as the email service’s', async () => {
    sendDueNotices.mockResolvedValueOnce({ ok: false, error: 'The email service refused…' })
    const res = await sendNotices()
    expect(res.status).toBe(502)
  })
})
