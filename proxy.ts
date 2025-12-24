/**
 * Next.js Proxy (Middleware in Next.js 16+)
 *
 * Centralized security and authentication enforcement at the edge.
 *
 * Features:
 * - Adds request ID to all responses for tracing
 * - Protects /student/* routes (requires authentication)
 * - Runs before every request to matched routes
 */

import { auth } from '@/lib/auth/config'
import { NextResponse } from 'next/server'

/**
 * Auth middleware wrapper
 * - Adds request ID for tracing
 * - Redirects logged-in users from auth pages to role-appropriate dashboards
 * - Protects /student/* routes (requires authentication)
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
    const role = req.auth.user.role
    let redirectTo = '/student/matches' // Default for students

    if (role === 'COORDINATOR') {
      redirectTo = '/coordinator/dashboard'
    } else if (role === 'PLATFORM_ADMIN') {
      redirectTo = '/admin/dashboard'
    } else if (role === 'UNIVERSITY_AGENT') {
      redirectTo = '/' // Placeholder until agent dashboard exists
    }

    const redirectUrl = new URL(redirectTo, req.url)
    const redirectResponse = NextResponse.redirect(redirectUrl)
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
