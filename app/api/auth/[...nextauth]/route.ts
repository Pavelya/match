import { NextRequest } from 'next/server'
import { handlers } from '@/lib/auth/config'
import { applyRateLimit, getClientIp } from '@/lib/rate-limit'

/**
 * Wrap NextAuth handlers with rate limiting
 * Auth endpoints get strict limits: 5 requests per 10 seconds per IP
 *
 * Note: Some endpoints are exempt from rate limiting to prevent cascade failures:
 * - /api/auth/error - Error page must always be accessible
 * - /api/auth/providers - Provider list for sign-in form
 * - /api/auth/csrf - CSRF token for forms
 * - /api/auth/session - Session check
 */

// Endpoints that should NOT be rate limited
// - /error - Error page must always be accessible
// - /providers - Provider list for sign-in form
// - /csrf - CSRF token for forms
// - /session - Session check
// - /callback - OAuth callbacks come from provider servers, not users
const RATE_LIMIT_EXEMPT_PATHS = ['/error', '/providers', '/csrf', '/session', '/callback']

function shouldSkipRateLimit(request: NextRequest): boolean {
  const pathname = request.nextUrl.pathname
  return RATE_LIMIT_EXEMPT_PATHS.some((path) => pathname.endsWith(path))
}

export async function GET(request: NextRequest) {
  // Skip rate limiting for safe endpoints
  if (!shouldSkipRateLimit(request)) {
    const clientIp = getClientIp(request.headers)
    const rateLimitResponse = await applyRateLimit('auth', clientIp)
    if (rateLimitResponse) {
      return rateLimitResponse
    }
  }

  return handlers.GET(request)
}

export async function POST(request: NextRequest) {
  // Always rate limit POST requests (sign-in, sign-out actions)
  const clientIp = getClientIp(request.headers)
  const rateLimitResponse = await applyRateLimit('auth', clientIp)
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  return handlers.POST(request)
}
