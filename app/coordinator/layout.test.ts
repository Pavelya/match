import { existsSync } from 'node:fs'
import path from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// A signed-out visitor to the coordinator portal goes to the coordinator sign-in (MAINT 5.26).
// It used to go to a path with no route behind it, so every bookmark ended on the 404.

const { authMock, prismaMock, redirectMock } = vi.hoisted(() => ({
  authMock: vi.fn(),
  prismaMock: { user: { findUnique: vi.fn() } },
  // Next's redirect throws to stop rendering; the mock does the same
  redirectMock: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT ${url}`)
  })
}))

vi.mock('@/lib/auth/config', () => ({ auth: authMock }))
vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('next/navigation', () => ({ redirect: redirectMock }))
vi.mock('@/lib/new-ui', () => ({ showsNewUi: vi.fn(async () => false) }))

import { COORDINATOR_SIGN_IN_PATH } from '@/lib/auth/callback-url'
import CoordinatorLayout from './layout'

describe('coordinator layout', () => {
  beforeEach(() => vi.clearAllMocks())

  it('sends a visitor with no session to the coordinator sign-in, without reading the database', async () => {
    authMock.mockResolvedValue(null)

    await expect(CoordinatorLayout({ children: null })).rejects.toThrow(
      `NEXT_REDIRECT ${COORDINATOR_SIGN_IN_PATH}`
    )
    expect(redirectMock).toHaveBeenCalledWith('/auth/coordinator')
    expect(prismaMock.user.findUnique).not.toHaveBeenCalled()
  })

  it('still sends a signed-in student to the home page', async () => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    prismaMock.user.findUnique.mockResolvedValue({ id: 'user-1', role: 'STUDENT' })

    await expect(CoordinatorLayout({ children: null })).rejects.toThrow('NEXT_REDIRECT /')
  })

  it('points at a route that exists', () => {
    const page = path.join(process.cwd(), 'app', COORDINATOR_SIGN_IN_PATH, 'page.tsx')
    expect(existsSync(page)).toBe(true)
  })
})
