import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/*
 * MAINT 5.28. A limiter built with `analytics: true` writes a record of every request, with the
 * account ID or IP address in it, to a sorted set that never expires. The limiters must keep only
 * their counters.
 */

const { created, limit, logger } = vi.hoisted(() => ({
  created: [] as Array<Record<string, unknown>>,
  limit: vi.fn(),
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() }
}))

vi.mock('@upstash/ratelimit', () => {
  class Ratelimit {
    static slidingWindow(tokens: number, window: string) {
      return { tokens, window }
    }
    constructor(private config: Record<string, unknown>) {
      created.push(config)
    }
    async limit(identifier: string) {
      return limit(this.config.prefix, identifier)
    }
  }
  return { Ratelimit }
})
vi.mock('@/lib/redis/client', () => ({ redis: {} }))
vi.mock('@/lib/logger', () => ({ logger }))

describe('rate limiters', () => {
  it('builds every limiter with analytics off', async () => {
    const { rateLimiters } = await import('./rate-limit')

    expect(Object.keys(rateLimiters)).toHaveLength(7)
    expect(created).toHaveLength(7)
    for (const config of created) {
      expect(config.analytics, `${String(config.prefix)} keeps request records`).toBe(false)
    }
  })

  it('keeps one prefix per limiter, so the purge script can tell the records apart', async () => {
    await import('./rate-limit')
    const prefixes = created.map((config) => config.prefix)
    expect(new Set(prefixes).size).toBe(prefixes.length)
    for (const prefix of prefixes) {
      expect(prefix).toMatch(/^ratelimit:[a-z]+$/)
    }
  })
})

// MAINT 7.1 Part 3: what a route returns when its limiter says no. Every route's own use of
// `applyRateLimit` is checked in app/api/route-gates.test.ts.
describe('applyRateLimit', () => {
  const NOW = new Date('2026-10-26T12:00:00Z').getTime()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('lets a request under the limit through', async () => {
    const { applyRateLimit } = await import('./rate-limit')
    limit.mockResolvedValue({ success: true, limit: 60, remaining: 59, reset: NOW + 60_000 })

    expect(await applyRateLimit('api', 'user-123456789')).toBeNull()
    expect(limit).toHaveBeenCalledWith('ratelimit:api', 'user-123456789')
  })

  it('answers 429 with when to try again', async () => {
    const { applyRateLimit } = await import('./rate-limit')
    limit.mockResolvedValue({ success: false, limit: 5, remaining: 0, reset: NOW + 7_200 })

    const res = await applyRateLimit('auth', '203.0.113.1')

    expect(res?.status).toBe(429)
    expect(res?.headers.get('Retry-After')).toBe('8')
    expect(res?.headers.get('X-RateLimit-Limit')).toBe('5')
    expect(res?.headers.get('X-RateLimit-Remaining')).toBe('0')
    expect(res?.headers.get('X-RateLimit-Reset')).toBe(String(NOW + 7_200))
    expect(await res?.json()).toEqual({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: 8
    })
  })

  it('logs no more than the first eight characters of the account ID or address', async () => {
    const { applyRateLimit } = await import('./rate-limit')
    limit.mockResolvedValue({ success: false, limit: 5, remaining: 0, reset: NOW + 1_000 })

    await applyRateLimit('auth', 'cmabcdefghijklmnop')

    expect(JSON.stringify(logger.warn.mock.calls)).not.toContain('cmabcdefghijklmnop')
    expect(logger.warn.mock.calls[0][1]).toMatchObject({ identifier: 'cmabcdef...' })
  })

  // Deliberate: an Upstash outage must not take the whole site down with it.
  it('lets the request through when Redis fails', async () => {
    const { applyRateLimit } = await import('./rate-limit')
    limit.mockRejectedValue(new Error('fetch failed'))

    expect(await applyRateLimit('api', 'user-123456789')).toBeNull()
    expect(logger.error).toHaveBeenCalledOnce()
  })
})

describe('getClientIp', () => {
  it.each([
    [
      'the first x-forwarded-for address',
      { 'x-forwarded-for': '203.0.113.1, 10.0.0.1' },
      '203.0.113.1'
    ],
    ['cf-connecting-ip', { 'cf-connecting-ip': '203.0.113.2' }, '203.0.113.2'],
    ['x-real-ip', { 'x-real-ip': '203.0.113.3' }, '203.0.113.3'],
    ['"unknown" with none of them', {}, 'unknown']
  ])('uses %s', async (_name, headers, ip) => {
    const { getClientIp } = await import('./rate-limit')

    expect(getClientIp(new Headers(headers))).toBe(ip)
  })
})
