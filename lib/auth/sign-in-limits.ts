import { createHmac } from 'crypto'
import type { NextRequest } from 'next/server'
import { env } from '@/lib/env'
import { applyRateLimit } from '@/lib/rate-limit'

/**
 * Limits on sign-in emails (SEC-2). Each one spends Resend's daily quota, which invitations and the
 * account emails share, and lands in the inbox of whoever's address was typed. So an address gets
 * at most 3 in 15 minutes and 10 a day, from any number of IPs, and one IP may ask for 60 an hour.
 * These limiters fail closed: with Redis down there is no limit at all, so nothing is sent.
 */

/**
 * The address as Auth.js reads it before sending (`defaultNormalizer` in
 * @auth/core/lib/actions/signin/send-token.js): NFKC, lowercase, trimmed, and nothing after a comma
 * in the domain. So `Maya@Example.com ` and `maya@example.com,x` count as the same inbox.
 */
export function normalizeAddress(address: string): string {
  const trimmed = address.normalize('NFKC').toLowerCase().trim()
  const [local, domain = ''] = trimmed.split('@')
  return `${local}@${domain.split(',')[0]}`
}

/**
 * The limiter's key for an address: a keyed hash, never the address, so Redis holds no addresses
 * (MAINT 5.28). Keyed with the auth secret, so the key can't be matched against a list of addresses.
 */
export function addressKey(address: string): string {
  return createHmac('sha256', env.NEXTAUTH_SECRET).update(normalizeAddress(address)).digest('hex')
}

/** The address a sign-in form posted, or null when there is none to read */
async function postedAddress(request: NextRequest): Promise<string | null> {
  try {
    const email = (await request.clone().formData()).get('email')
    return typeof email === 'string' && email.trim() !== '' ? email : null
  } catch {
    return null
  }
}

/**
 * Applies the sign-in email limits to a POST to /api/auth/signin/resend. Returns the refusal (429,
 * or 503 when Redis can't answer), or null to let Auth.js send the link.
 */
export async function limitSignInEmail(
  request: NextRequest,
  clientIp: string
): Promise<Response | null> {
  const perIp = await applyRateLimit('signInIp', clientIp, { failClosed: true })
  if (perIp) return perIp

  // No address: Auth.js refuses the request itself, and sends nothing
  const address = await postedAddress(request)
  if (!address) return null

  const key = addressKey(address)
  return (
    (await applyRateLimit('signInAddress', key, { failClosed: true })) ??
    (await applyRateLimit('signInAddressDay', key, { failClosed: true }))
  )
}
