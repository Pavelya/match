import { describe, expect, it, vi } from 'vitest'

/*
 * MAINT 5.28. A limiter built with `analytics: true` writes a record of every request, with the
 * account ID or IP address in it, to a sorted set that never expires. The limiters must keep only
 * their counters.
 */

const created = vi.hoisted(() => [] as Array<Record<string, unknown>>)

vi.mock('@upstash/ratelimit', () => {
  class Ratelimit {
    static slidingWindow(tokens: number, window: string) {
      return { tokens, window }
    }
    constructor(config: Record<string, unknown>) {
      created.push(config)
    }
    async limit() {
      return { success: true, limit: 1, remaining: 1, reset: 0 }
    }
  }
  return { Ratelimit }
})
vi.mock('@/lib/redis/client', () => ({ redis: {} }))
vi.mock('@/lib/logger', () => ({ logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() } }))

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
