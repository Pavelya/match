import { describe, expect, it, vi } from 'vitest'

// Flushing the reference caches is a change, so it answers POST only (SEC-8): a GET could be set
// off by a link on another site, with the admin's cookie sent along. Next answers 405 for a method
// the route doesn't export.

vi.mock('@/lib/auth/config', () => ({ auth: vi.fn() }))
vi.mock('@/lib/prisma', () => ({ prisma: {} }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn() }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), error: vi.fn() } }))
vi.mock('next/cache', () => ({ revalidateTag: vi.fn() }))

import * as route from './route'

describe('/api/admin/cache/invalidate', () => {
  it('answers POST, and nothing that a link can set off', () => {
    expect(Object.keys(route).sort()).toEqual(['POST'])
  })
})
