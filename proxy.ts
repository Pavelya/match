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
 * Checks authentication and redirects unauthenticated users from protected routes
 */
export default auth((req) => {
  const { pathname } = req.nextUrl

  // Add request ID for tracing
  const requestId = crypto.randomUUID()
  const response = NextResponse.next()
  response.headers.set('x-request-id', requestId)

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
