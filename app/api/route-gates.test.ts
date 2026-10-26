import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import type { UserRole } from '@/app/generated/prisma/enums'

// Every API route checks its caller inline: there is no shared role helper (MAINT 7.1 Part 1). This
// file loads every `route.ts` under app/api, so a route added later is covered without being
// listed, and checks the gate each kind of route must have (MAINT 7.1 Part 3):
//
// - an anonymous caller gets 401 from every route not in PUBLIC;
// - every admin route refuses every other role, and a deleted account, with 403;
// - every coordinator and subscription route refuses a caller with no coordinator profile, and one
//   whose access an admin revoked (MAINT 5.36);
// - every handler not in NOT_RATE_LIMITED answers 429 when its limiter says no.
//
// A refusal must come before the work: the route may make the gate's own lookup and nothing else.
// Prisma and Redis are recorded through Proxies, so any other read or write fails the test.

const { state, prismaCalls, prismaMock, redisCalls, redisMock, sendEmail } = vi.hoisted(() => {
  const state = {
    session: null as { user: { id: string; role: string } } | null,
    user: null as { role: string } | null,
    coordinatorProfile: null as Record<string, unknown> | null,
    rateLimited: false
  }
  const prismaCalls: string[] = []
  const redisCalls: string[] = []
  // Records `name.method` for every call. The role and coordinator-profile lookups answer from
  // `state`; every other read finds nothing.
  const recorder = (calls: string[], name: string) =>
    new Proxy(
      {},
      {
        get: (_target, method) =>
          typeof method !== 'string' || method === 'then'
            ? undefined
            : async () => {
                calls.push(`${name}.${method}`)
                const isRead = method === 'findUnique' || method === 'findFirst'
                if (isRead && name === 'user') return state.user
                if (isRead && name === 'coordinatorProfile') return state.coordinatorProfile
                return null
              }
      }
    )
  const prismaMock = new Proxy(
    {},
    {
      get: (_target, name) => {
        if (typeof name !== 'string' || name === 'then') return undefined
        if (name.startsWith('$'))
          return async () => {
            prismaCalls.push(name)
            return null
          }
        return recorder(prismaCalls, name)
      }
    }
  )
  return {
    state,
    prismaCalls,
    prismaMock,
    redisCalls,
    redisMock: recorder(redisCalls, 'redis'),
    sendEmail: vi.fn(async () => ({ data: { id: 'email-1' }, error: null }))
  }
})

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => state.session) }))
// Next's marker module, which only resolves inside a Next build.
vi.mock('server-only', () => ({}))
vi.mock('@/lib/logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() }
}))
vi.mock('@/lib/rate-limit', async () => {
  const { NextResponse } = await import('next/server')
  return {
    applyRateLimit: vi.fn(async () =>
      state.rateLimited ? NextResponse.json({ error: 'Too many requests' }, { status: 429 }) : null
    ),
    getClientIp: vi.fn(() => '203.0.113.1')
  }
})
// lib/env validates every variable at import; placeholders are enough, as nothing here connects.
vi.mock('@/lib/env', () => ({
  env: new Proxy({} as Record<string, string>, {
    get: (_target, key) => (key === 'then' ? undefined : 'placeholder')
  })
}))
vi.mock('@/lib/email/client', () => ({
  getResendClient: vi.fn(() => ({ emails: { send: sendEmail } }))
}))
// The programs cache reaches Redis directly; it is recorded like Prisma.
vi.mock('@/lib/redis/client', () => ({ redis: redisMock, getRedisClient: () => redisMock }))

const routes = import.meta.glob('./**/route.ts') as Record<
  string,
  () => Promise<Record<string, unknown>>
>

/** Routes an anonymous caller may reach, and what stands in for a session on each. */
const PUBLIC: Record<string, string> = {
  'auth/[...nextauth]': 'Auth.js itself',
  'auth/accept-invite': 'the invitation token is the credential',
  'auth/accept-student-invite': 'the invitation token is the credential',
  'auth/check-role': 'the coordinator sign-in asks before there is a session; see its own test',
  'legal-documents/[type]': 'the published Terms and Privacy Policy',
  preview: 'the preview key is the credential',
  'preview/exit': 'only turns Draft Mode off',
  'programs/explore': 'Explore is public',
  'programs/search': 'search is public',
  'webhooks/stripe': 'the Stripe signature is the credential; see its own test'
}

/** Handlers with no limiter, each for a reason. */
const NOT_RATE_LIMITED: Record<string, string> = {
  'GET preview': 'a wrong key is a 404 that does nothing',
  'POST preview/exit': 'only turns Draft Mode off',
  'POST webhooks/stripe': 'only Stripe can sign a request; limiting it would drop real events'
}

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const
const PARAMS = { id: 'id-1', type: 'TERMS', programId: 'program-1', nextauth: ['session'] }
const WRITE = /\.(create|createMany|update|updateMany|upsert|delete|deleteMany)$|^\$/

type Handler = (req: NextRequest, ctx: unknown) => Promise<Response>
type Route = { method: string; path: string; handler: Handler }

const handlers: Route[] = []
for (const [file, load] of Object.entries(routes)) {
  const mod = await load()
  const path = file.slice('./'.length, -'/route.ts'.length)
  for (const method of METHODS) {
    if (typeof mod[method] === 'function') {
      handlers.push({ method, path, handler: mod[method] as Handler })
    }
  }
}
handlers.sort((a, b) => a.path.localeCompare(b.path) || a.method.localeCompare(b.method))

const rows = (list: Route[]) => list.map((h) => [`${h.method} ${h.path}`, h] as [string, Route])

function call({ method, path, handler }: Route) {
  const req = new NextRequest(`http://localhost/api/${path}`, {
    method,
    ...(method === 'GET' ? {} : { body: '{}', headers: { 'content-type': 'application/json' } })
  })
  return handler(req, { params: Promise.resolve(PARAMS) })
}

/** null: a session that outlived its account. */
function signIn(role: UserRole | null) {
  state.session = { user: { id: 'user-1', role: role ?? 'STUDENT' } }
  state.user = role ? { role } : null
}

function expectNothingElseTouched() {
  expect(redisCalls).toEqual([])
  expect(sendEmail).not.toHaveBeenCalled()
}

beforeEach(() => {
  prismaCalls.length = 0
  redisCalls.length = 0
  sendEmail.mockClear()
  state.session = null
  state.user = null
  state.rateLimited = false
})

describe('the lists', () => {
  it('finds every route', () => {
    expect(handlers.length).toBeGreaterThan(90)
  })

  it('name only routes that exist', () => {
    const paths = new Set(handlers.map((h) => h.path))
    const named = new Set(handlers.map((h) => `${h.method} ${h.path}`))
    expect(Object.keys(PUBLIC).filter((path) => !paths.has(path))).toEqual([])
    expect(Object.keys(NOT_RATE_LIMITED).filter((key) => !named.has(key))).toEqual([])
  })
})

describe('an anonymous caller', () => {
  it.each(rows(handlers.filter((h) => !(h.path in PUBLIC))))(
    '%s → 401, before any read',
    async (_name, h) => {
      const res = await call(h)

      expect(res.status).toBe(401)
      expect(prismaCalls).toEqual([])
      expectNothingElseTouched()
    }
  )
})

describe('an admin route', () => {
  const admin = handlers.filter((h) => h.path.startsWith('admin/'))

  describe.each([
    ['a student', 'STUDENT'],
    ['a coordinator', 'COORDINATOR'],
    ['a university agent', 'UNIVERSITY_AGENT'],
    ['a deleted account', null]
  ] as [string, UserRole | null][])('called by %s', (_who, role) => {
    it.each(rows(admin))('%s → 403, after the role lookup only', async (_name, h) => {
      signIn(role)

      const res = await call(h)

      expect(res.status).toBe(403)
      expect(prismaCalls).toEqual(['user.findUnique'])
      expectNothingElseTouched()
    })
  })
})

describe('a coordinator or subscription route', () => {
  const coordinator = handlers.filter(
    (h) => h.path.startsWith('coordinator/') || h.path.startsWith('subscriptions/')
  )

  // The coordinator profile is what names the school. An admin has none, so is refused too.
  describe.each(['STUDENT', 'PLATFORM_ADMIN'] as const)('called by a %s', (role) => {
    it.each(rows(coordinator))('%s → refused, after the profile lookup only', async (_name, h) => {
      signIn(role)

      const res = await call(h)

      expect([403, 404]).toContain(res.status)
      expect(prismaCalls).toEqual(['coordinatorProfile.findFirst'])
      expectNothingElseTouched()
    })
  })
})

describe('a coordinator whose access an admin revoked', () => {
  const coordinator = handlers.filter(
    (h) => h.path.startsWith('coordinator/') || h.path.startsWith('subscriptions/')
  )

  it.each(rows(coordinator))('%s → 403, after the profile lookup only', async (_name, h) => {
    signIn('COORDINATOR')
    state.coordinatorProfile = {
      id: 'coordinator-1',
      userId: 'user-1',
      schoolId: 'school-1',
      isActive: false,
      school: {
        id: 'school-1',
        name: 'Example School',
        subscriptionTier: 'VIP',
        subscriptionStatus: 'ACTIVE'
      }
    }

    const res = await call(h)

    expect(res.status).toBe(403)
    expect(prismaCalls).toEqual(['coordinatorProfile.findFirst'])
    expectNothingElseTouched()
  })
})

describe('a caller over the rate limit', () => {
  const limited = handlers.filter((h) => !(`${h.method} ${h.path}` in NOT_RATE_LIMITED))

  it.each(rows(limited))('%s → 429, having written nothing', async (_name, h) => {
    // An admin passes every role check that comes before a limiter; a student passes the
    // support-ticket check, which refuses admins.
    signIn(h.path.startsWith('admin/') ? 'PLATFORM_ADMIN' : 'STUDENT')
    state.rateLimited = true

    const res = await call(h)

    expect(res.status).toBe(429)
    expect(prismaCalls.filter((name) => WRITE.test(name))).toEqual([])
    expectNothingElseTouched()
  })
})
