import { describe, expect, it, vi } from 'vitest'

// The key the sign-in email limits count by (SEC-2): one per inbox as Auth.js reads it, and never
// the address itself (MAINT 5.28).

vi.mock('@/lib/env', () => ({ env: { NEXTAUTH_SECRET: 'test-secret-0123456789abcdefghijklmnop' } }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn() }))

import { addressKey, normalizeAddress } from './sign-in-limits'

describe('normalizeAddress', () => {
  it.each([
    ['maya@example.com', 'maya@example.com'],
    ['  Maya@Example.COM ', 'maya@example.com'],
    // Auth.js drops what follows a comma in the domain, so this is the same inbox
    ['maya@example.com,other@example.org', 'maya@example.com'],
    // NFKC turns a fullwidth letter into its plain one, as Auth.js does
    ['ｍaya@example.com', 'maya@example.com']
  ])('reads %j as %j', (input, expected) => {
    expect(normalizeAddress(input)).toBe(expected)
  })
})

describe('addressKey', () => {
  it('is 64 hex characters, with nothing of the address in it', () => {
    const key = addressKey('maya@example.com')
    expect(key).toMatch(/^[0-9a-f]{64}$/)
    expect(key).not.toContain('maya')
  })

  it('is the same for every spelling of one inbox', () => {
    expect(addressKey(' MAYA@example.com')).toBe(addressKey('maya@example.com'))
  })

  it('differs between inboxes', () => {
    expect(addressKey('maya@example.com')).not.toBe(addressKey('mara@example.com'))
  })

  it('is keyed: not the plain SHA-256 of the address, which a list of addresses could match', async () => {
    const { createHash } = await import('crypto')
    const plain = createHash('sha256').update('maya@example.com').digest('hex')
    expect(addressKey('maya@example.com')).not.toBe(plain)
  })
})
