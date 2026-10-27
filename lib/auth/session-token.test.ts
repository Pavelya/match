import { beforeEach, describe, expect, it, vi } from 'vitest'

// The jwt callback (SEC-6): the role is read at sign-in and re-read every few minutes, and a session
// whose account no longer exists ends at the next re-read instead of carrying on as a student.

const { readRoleAndMarkActive } = vi.hoisted(() => ({ readRoleAndMarkActive: vi.fn() }))
vi.mock('./last-active', () => ({ readRoleAndMarkActive }))

import { ROLE_REFRESH_MS, refreshSessionToken } from './session-token'

const NOW = new Date('2026-10-27T12:00:00Z').getTime()

beforeEach(() => vi.clearAllMocks())

describe('refreshSessionToken at sign-in', () => {
  it('reads the role and stamps the time', async () => {
    readRoleAndMarkActive.mockResolvedValue('COORDINATOR')

    const token = await refreshSessionToken({ sub: 'user-1' }, 'user-1', NOW)

    expect(token).toEqual({ sub: 'user-1', role: 'COORDINATOR', roleCheckedAt: NOW })
    expect(readRoleAndMarkActive).toHaveBeenCalledWith('user-1', new Date(NOW))
  })

  it('reads at sign-in even when the token was checked a moment ago', async () => {
    readRoleAndMarkActive.mockResolvedValue('STUDENT')

    await refreshSessionToken({ sub: 'user-1', roleCheckedAt: NOW - 1000 }, 'user-1', NOW)

    expect(readRoleAndMarkActive).toHaveBeenCalledOnce()
  })

  it('gives no session to an account that is already gone', async () => {
    readRoleAndMarkActive.mockResolvedValue(null)

    expect(await refreshSessionToken({ sub: 'user-1' }, 'user-1', NOW)).toBeNull()
  })
})

describe('refreshSessionToken after sign-in', () => {
  it('trusts the role in the token until it is due', async () => {
    const token = { sub: 'user-1', role: 'STUDENT' as const, roleCheckedAt: NOW - 1000 }

    expect(await refreshSessionToken(token, undefined, NOW)).toEqual(token)
    expect(readRoleAndMarkActive).not.toHaveBeenCalled()
  })

  it('re-reads the role once it is due, and takes the database’s', async () => {
    readRoleAndMarkActive.mockResolvedValue('STUDENT')
    const token = {
      sub: 'user-1',
      role: 'PLATFORM_ADMIN' as const,
      roleCheckedAt: NOW - ROLE_REFRESH_MS - 1
    }

    expect(await refreshSessionToken(token, undefined, NOW)).toEqual({
      sub: 'user-1',
      role: 'STUDENT',
      roleCheckedAt: NOW
    })
  })

  it('re-reads a token that was never stamped', async () => {
    readRoleAndMarkActive.mockResolvedValue('STUDENT')

    await refreshSessionToken({ sub: 'user-1' }, undefined, NOW)

    expect(readRoleAndMarkActive).toHaveBeenCalledOnce()
  })

  it('ends the session once the account is deleted, rather than carrying on as a student', async () => {
    readRoleAndMarkActive.mockResolvedValue(null)
    const token = {
      sub: 'deleted-1',
      role: 'STUDENT' as const,
      roleCheckedAt: NOW - ROLE_REFRESH_MS - 1
    }

    expect(await refreshSessionToken(token, undefined, NOW)).toBeNull()
  })

  it('leaves a token with no subject alone', async () => {
    expect(await refreshSessionToken({}, undefined, NOW)).toEqual({})
    expect(readRoleAndMarkActive).not.toHaveBeenCalled()
  })
})
