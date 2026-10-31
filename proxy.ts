/**
 * Next.js Proxy (Middleware in Next.js 16+)
 *
 * Centralized security and authentication enforcement at the edge.
 *
 * Features:
 * - Adds request ID to all responses for tracing
 * - Protects /student/* routes (requires authentication)
 * - Keeps /admin/* and /coordinator/* to their roles (SEC-1)
 * - Runs before every request to matched routes
 *
 * The role here is the token's, which can be a few minutes old (ROLE_REFRESH_MS in
 * lib/auth/session-token.ts). It turns away the obvious cases before anything renders; each admin and
 * coordinator page still checks the database itself (lib/auth/guards.ts).
 */

import { auth } from '@/lib/auth/config'
import { COORDINATOR_SIGN_IN_PATH, startPageFor } from '@/lib/auth/callback-url'
import { NextResponse } from 'next/server'

/** The role each area needs, and where a visitor with no session signs in */
const ROLE_AREAS = [
  { prefix: '/admin', role: 'PLATFORM_ADMIN', signIn: '/auth/signin' },
  { prefix: '/coordinator', role: 'COORDINATOR', signIn: COORDINATOR_SIGN_IN_PATH }
] as const

function inArea(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

/**
 * Auth middleware wrapper
 * - Adds request ID for tracing
 * - Redirects logged-in users from auth pages to role-appropriate dashboards
 * - Protects /student/* routes (requires authentication)
 * - Sends a visitor without the role away from /admin/* and /coordinator/*
 */
export default auth((req) => {
  const { pathname } = req.nextUrl

  // Add request ID for tracing
  const requestId = crypto.randomUUID()
  const response = NextResponse.next()
  response.headers.set('x-request-id', requestId)

  // Auth sign-in pages that should redirect logged-in users
  const isAuthSignInPage = pathname === '/auth/signin' || pathname === '/auth/coordinator'

  // Skip redirect for special auth flows (invitations, verify, error)
  const isSpecialAuthFlow =
    pathname.includes('/accept-invite') ||
    pathname.includes('/accept-student-invite') ||
    pathname === '/auth/verify-request' ||
    pathname === '/auth/error'

  // Redirect logged-in users from auth sign-in pages to their dashboard
  if (isAuthSignInPage && !isSpecialAuthFlow && req.auth?.user) {
    const redirectTo = startPageFor(req.auth.user.role)

    const redirectUrl = new URL(redirectTo, req.url)
    const redirectResponse = NextResponse.redirect(redirectUrl)
    redirectResponse.headers.set('x-request-id', requestId)
    return redirectResponse
  }

  // Admin and coordinator areas: signed out to that area's sign-in, the wrong role to their own start
  // page (SEC-5), as the pages' own checks do (lib/auth/guards.ts)
  const area = ROLE_AREAS.find(({ prefix }) => inArea(pathname, prefix))
  if (area && req.auth?.user?.role !== area.role) {
    const redirectResponse = NextResponse.redirect(
      new URL(req.auth?.user ? startPageFor(req.auth.user.role) : area.signIn, req.url)
    )
    redirectResponse.headers.set('x-request-id', requestId)
    return redirectResponse
  }

  // Protected routes that require authentication
  const isProtectedRoute = pathname.startsWith('/student')

  // If user is not authenticated and trying to access protected route
  if (isProtectedRoute && !req.auth) {
    const signInUrl = new URL('/auth/signin', req.url)
    // Add callbackUrl so user returns to intended page after login
    signInUrl.searchParams.set('callbackUrl', pathname)
    const redirectResponse = NextResponse.redirect(signInUrl)
    redirectResponse.headers.set('x-request-id', requestId)
    return redirectResponse
  }

  return response
})

// Configure which routes to run proxy on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes - have their own auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (static files)
     * - Public image files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}
