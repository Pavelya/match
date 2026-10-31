import { beforeEach, describe, expect, it, vi } from 'vitest'

// Which limits each Auth.js request meets (SEC-2). A sign-in email is limited per IP and per
// address, failing closed; callbacks have their own looser limit, so a class behind one school IP
// can sign in together; the rest of /api/auth keeps the strict per-IP limit.

const { applyRateLimit, handlers } = vi.hoisted(() => ({
  applyRateLimit: vi.fn(),
  handlers: { GET: vi.fn(), POST: vi.fn() }
}))

vi.mock('@/lib/auth/config', () => ({ handlers }))
vi.mock('@/lib/env', () => ({ env: { NEXTAUTH_SECRET: 'test-secret-0123456789abcdefghijklmnop' } }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit, getClientIp: () => '203.0.113.7' }))

import { NextRequest, NextResponse } from 'next/server'
import { GET, POST } from './route'

const IP = '203.0.113.7'

function get(action: string) {
  return GET(new NextRequest(`http://localhost/api/auth${action}`))
}

function post(action: string, form: Record<string, string> = {}) {
  return POST(
    new NextRequest(`http://localhost/api/auth${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(form)
    })
  )
}

/** The limiters a request met, in order, with their options */
function limitersMet() {
  return applyRateLimit.mock.calls.map(([type, , options]) =>
    options ? `${type} (${JSON.stringify(options)})` : type
  )
}

function refuseWith(type: string, status: number) {
  applyRateLimit.mockImplementation(async (t: string) =>
    t === type ? NextResponse.json({ error: 'refused' }, { status }) : null
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  applyRateLimit.mockResolvedValue(null)
  handlers.GET.mockResolvedValue(new Response('ok'))
  handlers.POST.mockResolvedValue(new Response('ok'))
})

describe('GET /api/auth/*', () => {
  it.each(['/session', '/csrf', '/providers', '/error'])('does not limit %s', async (action) => {
    await get(action)
    expect(applyRateLimit).not.toHaveBeenCalled()
    expect(handlers.GET).toHaveBeenCalledOnce()
  })

  it.each(['/callback/google', '/callback/resend'])(
    'gives %s the callback limit, not the strict one',
    async (action) => {
      await get(action)
      expect(applyRateLimit).toHaveBeenCalledExactlyOnceWith('authCallback', IP)
    }
  )

  it('keeps the strict limit for the rest', async () => {
    await get('/signin')
    expect(applyRateLimit).toHaveBeenCalledExactlyOnceWith('auth', IP)
  })

  it('limits an action that only ends like an exempt one', async () => {
    await get('/signin/session')
    expect(applyRateLimit).toHaveBeenCalledExactlyOnceWith('auth', IP)
  })

  it('answers the limiter’s refusal without reaching Auth.js', async () => {
    refuseWith('authCallback', 429)
    const res = await get('/callback/google')
    expect(res.status).toBe(429)
    expect(handlers.GET).not.toHaveBeenCalled()
  })
})

describe('POST /api/auth/signin/resend: a sign-in email', () => {
  it('meets the strict limit, then the per-IP and per-address email limits, all closed', async () => {
    await post('/signin/resend', { email: 'maya@example.com', csrfToken: 't' })

    expect(limitersMet()).toEqual([
      'auth',
      'signInIp ({"failClosed":true})',
      'signInAddress ({"failClosed":true})',
      'signInAddressDay ({"failClosed":true})'
    ])
    expect(applyRateLimit.mock.calls[1][1]).toBe(IP)
    expect(handlers.POST).toHaveBeenCalledOnce()
  })

  it('keys the address limits by a hash, never the address', async () => {
    await post('/signin/resend', { email: 'maya@example.com' })

    const key = applyRateLimit.mock.calls[2][1]
    expect(key).toMatch(/^[0-9a-f]{64}$/)
    expect(JSON.stringify(applyRateLimit.mock.calls)).not.toContain('maya')
  })

  it('counts two spellings of one inbox as one address', async () => {
    await post('/signin/resend', { email: ' Maya@Example.COM ' })
    await post('/signin/resend', { email: 'maya@example.com' })

    const keys = applyRateLimit.mock.calls
      .filter(([type]) => type === 'signInAddress')
      .map(([, key]) => key)
    expect(keys).toHaveLength(2)
    expect(keys[0]).toBe(keys[1])
  })

  it.each([
    ['too many for the address', 'signInAddress', 429],
    ['too many for the address today', 'signInAddressDay', 429],
    ['too many from the IP', 'signInIp', 429],
    ['Redis not answering', 'signInIp', 503]
  ])('sends nothing when %s', async (_case, type, status) => {
    refuseWith(type, status)

    const res = await post('/signin/resend', { email: 'maya@example.com' })

    expect(res.status).toBe(status)
    expect(handlers.POST).not.toHaveBeenCalled()
  })

  it('leaves the form for Auth.js to read', async () => {
    await post('/signin/resend', { email: 'maya@example.com', csrfToken: 't' })

    const forwarded = handlers.POST.mock.calls[0][0] as NextRequest
    expect((await forwarded.formData()).get('email')).toBe('maya@example.com')
  })

  it('leaves a form with no address to Auth.js, which refuses it itself', async () => {
    await post('/signin/resend', { csrfToken: 't' })

    expect(limitersMet()).toEqual(['auth', 'signInIp ({"failClosed":true})'])
    expect(handlers.POST).toHaveBeenCalledOnce()
  })
})

describe('other POSTs', () => {
  it.each(['/signin/google', '/signout'])('%s meets the strict limit only', async (action) => {
    await post(action)
    expect(limitersMet()).toEqual(['auth'])
    expect(handlers.POST).toHaveBeenCalledOnce()
  })

  it('a POST to a callback gets the callback limit', async () => {
    await post('/callback/resend')
    expect(limitersMet()).toEqual(['authCallback'])
  })
})
