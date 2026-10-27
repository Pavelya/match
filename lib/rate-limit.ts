/**
 * Rate Limiting Utility
 *
 * Provides configurable rate limiting for API endpoints using Upstash Rate Limit.
 * Uses Redis-backed sliding window algorithm for accurate, distributed rate limiting.
 *
 * Analytics are off on purpose (MAINT 5.28). With `analytics: true` the library adds a record of
 * every request, `{"identifier": <account ID or IP address>, "success": …}`, to a sorted set named
 * `ratelimit:<limiter>:events:<hour>` that never expires, and nothing reads it. A limiter keeps only
 * its counter, for the length of its window.
 *
 * Rate Limit Tiers:
 * - AUTH: Strict limits for authentication endpoints (5 req/10s)
 * - API: Standard limits for authenticated API endpoints (20 req/min)
 * - SEARCH: Higher limits for search endpoints (30 req/min)
 * - SIGN-IN EMAILS: per address and per IP, failing closed (SEC-2)
 *
 * A limiter that can't reach Redis lets the request through, so an Upstash outage doesn't take the
 * site down. The sign-in email limiters are the exception: with no limit, anyone could spend the
 * day's email quota, so they refuse instead (`failClosed`).
 */

import { Ratelimit } from '@upstash/ratelimit'
import { redis } from '@/lib/redis/client'
import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

/**
 * Rate limit configurations for different endpoint types
 */
export const rateLimiters = {
  // Auth endpoints: 5 requests per 10 seconds per IP
  // Protects against brute force attacks
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '10 s'),
    prefix: 'ratelimit:auth',
    analytics: false
  }),

  // Profile endpoints: 10 requests per minute per user
  // Prevents profile save spam
  profile: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    prefix: 'ratelimit:profile',
    analytics: false
  }),

  // Matches endpoints: 20 requests per minute per user
  // Protects compute-intensive matching
  matches: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, '1 m'),
    prefix: 'ratelimit:matches',
    analytics: false
  }),

  // Search endpoints: 30 requests per minute per IP
  // Protects Algolia quota and prevents scraping
  search: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '1 m'),
    prefix: 'ratelimit:search',
    analytics: false
  }),

  // General API: 60 requests per minute per user
  // Default fallback rate limit
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '1 m'),
    prefix: 'ratelimit:api',
    analytics: false
  }),

  // Invitations: 60 per hour per user
  // Every one of these sends mail through Resend. Generous enough for a school
  // onboarding a cohort in one sitting, tight enough that a compromised
  // coordinator account cannot be used as an email cannon.
  invite: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '1 h'),
    prefix: 'ratelimit:invite',
    analytics: false
  }),

  // Support tickets: 5 requests per hour per user
  // Prevents abuse while allowing legitimate support requests
  support: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    prefix: 'ratelimit:support',
    analytics: false
  }),

  // Sign-in callbacks: 60 per minute per IP (SEC-2)
  // The return from Google or from a sign-in link. A school's students share one IP, so a class
  // signing in together must get through; each callback needs a token or state only its own
  // sign-in has, so it is no way to guess anything.
  authCallback: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '1 m'),
    prefix: 'ratelimit:authcallback',
    analytics: false
  }),

  // Sign-in emails to one address: 3 per 15 minutes, and 10 per day (SEC-2)
  // Keyed by a keyed hash of the address (lib/auth/sign-in-limits.ts), never the address. Every
  // email spends the day's Resend quota, shared with invitations and account emails.
  signInAddress: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '15 m'),
    prefix: 'ratelimit:signinaddress',
    analytics: false
  }),
  signInAddressDay: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 d'),
    prefix: 'ratelimit:signinaddressday',
    analytics: false
  }),

  // Sign-in emails from one IP: 60 per hour (SEC-2)
  // Loose enough for a classroom asking for links together; stops a single machine
  signInIp: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '1 h'),
    prefix: 'ratelimit:signinip',
    analytics: false
  })
}

export type RateLimitType = keyof typeof rateLimiters

/**
 * Rate limit result with headers
 */
export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
  headers: Record<string, string>
  /** True when Redis couldn't answer and the limiter fails closed */
  unavailable?: boolean
}

export interface RateLimitOptions {
  /** Refuse when Redis can't answer, instead of letting the request through */
  failClosed?: boolean
}

/**
 * Check rate limit for an identifier
 *
 * @param type - The type of rate limiter to use
 * @param identifier - Unique identifier (IP address or user ID)
 * @param options - `failClosed` to refuse when Redis can't answer
 * @returns Rate limit result with success status and headers
 */
export async function checkRateLimit(
  type: RateLimitType,
  identifier: string,
  options: RateLimitOptions = {}
): Promise<RateLimitResult> {
  const limiter = rateLimiters[type]

  try {
    const result = await limiter.limit(identifier)

    const headers: Record<string, string> = {
      'X-RateLimit-Limit': result.limit.toString(),
      'X-RateLimit-Remaining': result.remaining.toString(),
      'X-RateLimit-Reset': result.reset.toString()
    }

    if (!result.success) {
      logger.warn('Rate limit exceeded', {
        type,
        identifier: identifier.slice(0, 8) + '...', // Redact for privacy
        limit: result.limit,
        reset: result.reset
      })
    }

    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
      headers
    }
  } catch (error) {
    // If rate limiting fails, log but allow the request through
    // This prevents Redis issues from blocking all traffic
    logger.error('Rate limit check failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      type,
      identifier: identifier.slice(0, 8) + '...',
      failClosed: options.failClosed === true
    })

    if (options.failClosed) {
      return { success: false, limit: 0, remaining: 0, reset: 0, headers: {}, unavailable: true }
    }

    return {
      success: true, // Fail open
      limit: 0,
      remaining: 0,
      reset: 0,
      headers: {}
    }
  }
}

/**
 * Create a rate-limited response (429 Too Many Requests)
 *
 * @param result - Rate limit result containing headers
 * @returns NextResponse with 429 status and rate limit headers
 */
export function rateLimitResponse(result: RateLimitResult): NextResponse {
  return NextResponse.json(
    {
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil((result.reset - Date.now()) / 1000)
    },
    {
      status: 429,
      headers: {
        ...result.headers,
        'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString()
      }
    }
  )
}

/**
 * The answer when a limiter that fails closed can't reach Redis (503). The same JSON shape as a
 * 429, so the sign-in cards show their "wait a moment and try again".
 */
export function rateLimitUnavailableResponse(): NextResponse {
  return NextResponse.json(
    {
      error: 'Service unavailable',
      message: 'Please try again in a few minutes.',
      retryAfter: 60
    },
    { status: 503, headers: { 'Retry-After': '60' } }
  )
}

/**
 * Get client IP address from request headers
 * Handles various proxy configurations (Vercel, Cloudflare, etc.)
 *
 * @param headers - Request headers
 * @returns IP address string
 */
export function getClientIp(headers: Headers): string {
  // Vercel/Next.js provides x-forwarded-for
  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) {
    // Take the first IP in case of multiple proxies
    return forwardedFor.split(',')[0].trim()
  }

  // Cloudflare provides cf-connecting-ip
  const cfIp = headers.get('cf-connecting-ip')
  if (cfIp) {
    return cfIp
  }

  // Fallback for direct connections or unknown proxies
  return headers.get('x-real-ip') || 'unknown'
}

/**
 * Convenience function to apply rate limiting to a request
 * Returns null if allowed, or a 429 response if rate limited
 *
 * @param type - Rate limiter type
 * @param identifier - Unique identifier (IP or user ID)
 * @param options - `failClosed` to answer 503 when Redis can't answer
 * @returns null if allowed, NextResponse if rate limited or (failing closed) unavailable
 */
export async function applyRateLimit(
  type: RateLimitType,
  identifier: string,
  options: RateLimitOptions = {}
): Promise<NextResponse | null> {
  const result = await checkRateLimit(type, identifier, options)

  if (result.unavailable) {
    return rateLimitUnavailableResponse()
  }
  if (!result.success) {
    return rateLimitResponse(result)
  }

  return null
}
