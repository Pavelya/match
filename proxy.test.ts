import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

// The proxy turns away a visitor without the role from /admin and /coordinator before anything
// renders (SEC-1). Each page still checks the database itself; this is the quick first layer.

// `auth(handler)` hands the handler the request with `req.auth` set; the mock passes it straight on
vi.mock('@/lib/auth/config', () => ({ auth: (handler: unknown) => handler }))

import proxy from './proxy'

type Role = 'STUDENT' | 'COORDINATOR' | 'PLATFORM_ADMIN' | 'UNIVERSITY_AGENT'

function visit(pathname: string, role?: Role) {
  const req = new NextRequest(new URL(pathname, 'https://example.com')) as NextRequest & {
    auth: { user: { id: string; role: Role } } | null
  }
  req.auth = role ? { user: { id: 'user-1', role } } : null
  return (proxy as unknown as (r: typeof req) => Response)(req)
}

/** Where a response redirects to, as a path, or null when it lets the request through */
function redirectsTo(response: Response): string | null {
  const location = response.headers.get('location')
  if (!location) return null
  const url = new URL(location)
  return url.pathname + url.search
}

describe('proxy: admin and coordinator areas', () => {
  it.each(['/admin', '/admin/students', '/admin/students/abc'])(
    'sends a signed-out visitor from %s to sign-in',
    (pathname) => {
      const response = visit(pathname)
      expect(response.status).toBe(307)
      expect(redirectsTo(response)).toBe('/auth/signin')
    }
  )

  // SEC-5: each to their own start page; a university agent has none yet
  it.each([
    ['STUDENT', '/student/matches'],
    ['COORDINATOR', '/coordinator/dashboard'],
    ['UNIVERSITY_AGENT', '/']
  ] as const)('sends a %s from /admin/students to %s', (role, start) => {
    expect(redirectsTo(visit('/admin/students', role))).toBe(start)
  })

  it('lets an admin through to /admin', () => {
    const response = visit('/admin/students', 'PLATFORM_ADMIN')
    expect(redirectsTo(response)).toBeNull()
    expect(response.headers.get('x-request-id')).toBeTruthy()
  })

  it.each(['/coordinator', '/coordinator/students', '/coordinator/students/abc/matches'])(
    'sends a signed-out visitor from %s to the coordinator sign-in',
    (pathname) => {
      expect(redirectsTo(visit(pathname))).toBe('/auth/coordinator')
    }
  )

  // SEC-5: a student who signed in through the coordinator page lands on Matches
  it.each([
    ['STUDENT', '/student/matches'],
    ['PLATFORM_ADMIN', '/admin/dashboard'],
    ['UNIVERSITY_AGENT', '/']
  ] as const)('sends a %s from /coordinator/students to %s', (role, start) => {
    expect(redirectsTo(visit('/coordinator/students', role))).toBe(start)
  })

  it('sends a student from the coordinator sign-in link’s destination to Matches', () => {
    expect(redirectsTo(visit('/coordinator/dashboard', 'STUDENT'))).toBe('/student/matches')
  })

  it('lets a coordinator through to /coordinator', () => {
    expect(redirectsTo(visit('/coordinator/students', 'COORDINATOR'))).toBeNull()
  })

  it('leaves paths that only start with the same letters alone', () => {
    // /administration or /coordinators would be other pages, not the areas
    expect(redirectsTo(visit('/administration'))).toBeNull()
    expect(redirectsTo(visit('/coordinators'))).toBeNull()
  })

  it('gives every redirect a request id', () => {
    expect(visit('/admin/students').headers.get('x-request-id')).toBeTruthy()
  })
})

describe('proxy: what it did before, unchanged', () => {
  it('sends a signed-out visitor from /student to sign-in, returning to the page', () => {
    expect(redirectsTo(visit('/student/matches'))).toBe(
      '/auth/signin?callbackUrl=%2Fstudent%2Fmatches'
    )
  })

  it('lets any signed-in visitor through to /student', () => {
    expect(redirectsTo(visit('/student/matches', 'STUDENT'))).toBeNull()
  })

  it.each([
    ['STUDENT', '/student/matches'],
    ['COORDINATOR', '/coordinator/dashboard'],
    ['PLATFORM_ADMIN', '/admin/dashboard']
  ] as const)('sends a signed-in %s from sign-in to %s', (role, destination) => {
    expect(redirectsTo(visit('/auth/signin', role))).toBe(destination)
  })

  it('leaves public pages alone, signed in or out', () => {
    expect(redirectsTo(visit('/'))).toBeNull()
    expect(redirectsTo(visit('/programs/search', 'STUDENT'))).toBeNull()
  })
})
