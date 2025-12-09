import { NextRequest } from 'next/server'
import { handlers } from '@/lib/auth/config'
import { applyRateLimit, getClientIp } from '@/lib/rate-limit'

/**
 * Wrap NextAuth handlers with rate limiting
 * Auth endpoints get strict limits: 5 requests per 10 seconds per IP
 */

export async function GET(request: NextRequest) {
  // Apply rate limiting for auth endpoints
  const clientIp = getClientIp(request.headers)
  const rateLimitResponse = await applyRateLimit('auth', clientIp)
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  return handlers.GET(request)
}

export async function POST(request: NextRequest) {
  // Apply rate limiting for auth endpoints
  const clientIp = getClientIp(request.headers)
  const rateLimitResponse = await applyRateLimit('auth', clientIp)
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  return handlers.POST(request)
}
