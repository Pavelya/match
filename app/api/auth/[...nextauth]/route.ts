import { NextRequest } from 'next/server'
import { handlers } from '@/lib/auth/config'
import { limitSignInEmail } from '@/lib/auth/sign-in-limits'
import { applyRateLimit, getClientIp } from '@/lib/rate-limit'

/**
 * Wrap NextAuth handlers with rate limiting
 *
 * - Most auth endpoints: 5 requests per 10 seconds per IP (`auth`)
 * - Callbacks, the return from Google or from a sign-in link: 60 a minute per IP (`authCallback`).
 *   A school's students share one IP, and a class signing in together must get through (SEC-2)
 * - A sign-in email: also 60 an hour per IP, and 3 per 15 minutes and 10 a day per address, failing
 *   closed (lib/auth/sign-in-limits.ts)
 *
 * Not limited, to prevent cascade failures:
 * - /api/auth/error - Error page must always be accessible
 * - /api/auth/providers - Provider list for sign-in form
 * - /api/auth/csrf - CSRF token for forms
 * - /api/auth/session - Session check
 */

const RATE_LIMIT_EXEMPT_ACTIONS = new Set(['/error', '/providers', '/csrf', '/session'])

/** The part of the path after /api/auth: "/session", "/callback/google", "/signin/resend" */
function authAction(request: NextRequest): string {
  return request.nextUrl.pathname.replace(/^\/api\/auth/, '')
}

function isCallback(action: string): boolean {
  return action.startsWith('/callback/')
}

export async function GET(request: NextRequest) {
  const action = authAction(request)
  if (!RATE_LIMIT_EXEMPT_ACTIONS.has(action)) {
    const clientIp = getClientIp(request.headers)
    const rateLimitResponse = await applyRateLimit(
      isCallback(action) ? 'authCallback' : 'auth',
      clientIp
    )
    if (rateLimitResponse) {
      return rateLimitResponse
    }
  }

  return handlers.GET(request)
}

export async function POST(request: NextRequest) {
  const action = authAction(request)
  const clientIp = getClientIp(request.headers)

  // Always rate limit POST requests (sign-in, sign-out actions)
  const rateLimitResponse = await applyRateLimit(
    isCallback(action) ? 'authCallback' : 'auth',
    clientIp
  )
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  // A sign-in link by email: limited per IP and per address as well (SEC-2)
  if (action === '/signin/resend') {
    const refused = await limitSignInEmail(request, clientIp)
    if (refused) return refused
  }

  return handlers.POST(request)
}
