import { beforeEach, describe, expect, it, vi } from 'vitest'

// The access checks every admin and coordinator page makes for itself (SEC-1). The role is read
// from the database, never trusted from the token.

const { authMock, prismaMock, redirectMock, notFoundMock } = vi.hoisted(() => ({
  authMock: vi.fn(),
  prismaMock: { user: { findUnique: vi.fn() } },
  // Next's redirect and notFound throw to stop rendering; the mocks do the same
  redirectMock: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT ${url}`)
  }),
  notFoundMock: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  })
}))

vi.mock('server-only', () => ({}))
vi.mock('@/lib/auth/config', () => ({ auth: authMock }))
vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('next/navigation', () => ({ redirect: redirectMock, notFound: notFoundMock }))

import { COORDINATOR_SIGN_IN_PATH } from './callback-url'
import { readCoordinator, requireAdmin, requireCoordinator } from './guards'

const school = {
  id: 'school-1',
  name: 'Lycée Example',
  subscriptionTier: 'REGULAR',
  subscriptionStatus: 'ACTIVE'
}

function coordinatorRow(overrides: { role?: string; isActive?: boolean; school?: unknown } = {}) {
  return {
    id: 'user-1',
    role: overrides.role ?? 'COORDINATOR',
    email: 'coordinator@example.com',
    name: 'Ana',
    image: null,
    coordinatorProfile:
      overrides.school === null
        ? null
        : { isActive: overrides.isActive ?? true, school: overrides.school ?? school }
  }
}

describe('requireAdmin', () => {
  beforeEach(() => vi.clearAllMocks())

  it('sends a visitor with no session to sign-in, without reading the database', async () => {
    authMock.mockResolvedValue(null)

    await expect(requireAdmin()).rejects.toThrow('NEXT_REDIRECT /auth/signin')
    expect(prismaMock.user.findUnique).not.toHaveBeenCalled()
  })

  it.each(['STUDENT', 'COORDINATOR', 'UNIVERSITY_AGENT'])('sends a %s home', async (role) => {
    authMock.mockResolvedValue({ user: { id: 'user-1', role: 'PLATFORM_ADMIN' } })
    prismaMock.user.findUnique.mockResolvedValue({
      id: 'user-1',
      role,
      email: 'someone@example.com',
      name: null,
      image: null
    })

    await expect(requireAdmin()).rejects.toThrow('NEXT_REDIRECT /')
  })

  it('sends home a session whose account no longer exists', async () => {
    authMock.mockResolvedValue({ user: { id: 'gone', role: 'PLATFORM_ADMIN' } })
    prismaMock.user.findUnique.mockResolvedValue(null)

    await expect(requireAdmin()).rejects.toThrow('NEXT_REDIRECT /')
  })

  it("trusts the database's role over the token's", async () => {
    // The token still says admin; the account was demoted since
    authMock.mockResolvedValue({ user: { id: 'user-1', role: 'PLATFORM_ADMIN' } })
    prismaMock.user.findUnique.mockResolvedValue({
      id: 'user-1',
      role: 'STUDENT',
      email: 'a@example.com',
      name: null,
      image: null
    })

    await expect(requireAdmin()).rejects.toThrow('NEXT_REDIRECT /')
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'user-1' } })
    )
  })

  it('returns the admin', async () => {
    authMock.mockResolvedValue({ user: { id: 'admin-1' } })
    prismaMock.user.findUnique.mockResolvedValue({
      id: 'admin-1',
      role: 'PLATFORM_ADMIN',
      email: 'admin@example.com',
      name: 'Admin',
      image: null
    })

    await expect(requireAdmin()).resolves.toEqual({
      id: 'admin-1',
      email: 'admin@example.com',
      name: 'Admin',
      image: null
    })
    expect(redirectMock).not.toHaveBeenCalled()
  })
})

describe('readCoordinator and requireCoordinator', () => {
  beforeEach(() => vi.clearAllMocks())

  it('sends a visitor with no session to the coordinator sign-in, without reading the database', async () => {
    authMock.mockResolvedValue(null)

    await expect(requireCoordinator()).rejects.toThrow(`NEXT_REDIRECT ${COORDINATOR_SIGN_IN_PATH}`)
    expect(prismaMock.user.findUnique).not.toHaveBeenCalled()
  })

  it.each(['STUDENT', 'PLATFORM_ADMIN', 'UNIVERSITY_AGENT'])('sends a %s home', async (role) => {
    authMock.mockResolvedValue({ user: { id: 'user-1', role: 'COORDINATOR' } })
    prismaMock.user.findUnique.mockResolvedValue(coordinatorRow({ role }))

    await expect(requireCoordinator()).rejects.toThrow('NEXT_REDIRECT /')
  })

  it('sends home a coordinator with no profile or no school', async () => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    prismaMock.user.findUnique.mockResolvedValue(coordinatorRow({ school: null }))
    await expect(requireCoordinator()).rejects.toThrow('NEXT_REDIRECT /')

    prismaMock.user.findUnique.mockResolvedValue({
      ...coordinatorRow(),
      coordinatorProfile: { isActive: true, school: null }
    })
    await expect(requireCoordinator()).rejects.toThrow('NEXT_REDIRECT /')
  })

  it('refuses a revoked coordinator with a 404', async () => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    prismaMock.user.findUnique.mockResolvedValue(coordinatorRow({ isActive: false }))

    await expect(requireCoordinator()).rejects.toThrow('NEXT_NOT_FOUND')
    expect(redirectMock).not.toHaveBeenCalled()
  })

  it('gives the layout a revoked coordinator, for its "Access revoked" screen', async () => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    prismaMock.user.findUnique.mockResolvedValue(coordinatorRow({ isActive: false }))

    await expect(readCoordinator()).resolves.toMatchObject({ isActive: false, school })
    expect(notFoundMock).not.toHaveBeenCalled()
  })

  it('returns an active coordinator and their school', async () => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    prismaMock.user.findUnique.mockResolvedValue(coordinatorRow())

    await expect(requireCoordinator()).resolves.toEqual({
      id: 'user-1',
      email: 'coordinator@example.com',
      name: 'Ana',
      image: null,
      isActive: true,
      school
    })
  })
})
