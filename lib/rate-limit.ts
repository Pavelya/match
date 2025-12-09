/**
 * Rate Limiting Utility
 *
 * Provides configurable rate limiting for API endpoints using Upstash Rate Limit.
 * Uses Redis-backed sliding window algorithm for accurate, distributed rate limiting.
 *
 * Rate Limit Tiers:
 * - AUTH: Strict limits for authentication endpoints (5 req/10s)
 * - API: Standard limits for authenticated API endpoints (20 req/min)
 * - SEARCH: Higher limits for search endpoints (30 req/min)
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
    analytics: true
  }),

  // Profile endpoints: 10 requests per minute per user
  // Prevents profile save spam
  profile: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    prefix: 'ratelimit:profile',
    analytics: true
  }),

  // Matches endpoints: 20 requests per minute per user
  // Protects compute-intensive matching
  matches: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, '1 m'),
    prefix: 'ratelimit:matches',
    analytics: true
  }),

  // Search endpoints: 30 requests per minute per IP
  // Protects Algolia quota and prevents scraping
  search: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '1 m'),
    prefix: 'ratelimit:search',
    analytics: true
  }),

  // General API: 60 requests per minute per user
  // Default fallback rate limit
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '1 m'),
    prefix: 'ratelimit:api',
    analytics: true
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
}

/**
 * Check rate limit for an identifier
 *
 * @param type - The type of rate limiter to use
 * @param identifier - Unique identifier (IP address or user ID)
 * @returns Rate limit result with success status and headers
 */
export async function checkRateLimit(
  type: RateLimitType,
  identifier: string
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
      identifier: identifier.slice(0, 8) + '...'
    })

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
 * @returns null if allowed, NextResponse if rate limited
 */
export async function applyRateLimit(
  type: RateLimitType,
  identifier: string
): Promise<NextResponse | null> {
  const result = await checkRateLimit(type, identifier)

  if (!result.success) {
    return rateLimitResponse(result)
  }

  return null
}
