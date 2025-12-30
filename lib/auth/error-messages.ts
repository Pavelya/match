/**
 * Authentication Error Messages Utility
 *
 * Centralized error messages for auth flows.
 * Maps error codes to user-friendly messages that don't expose technical details.
 *
 * Part of Rate Limit Error Handling implementation.
 */

/**
 * User-friendly error messages for authentication flows
 */
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  // Rate limiting errors
  rate_limit: 'Too many sign-in attempts. Please wait a moment and try again.',
  too_many_requests: 'Too many sign-in attempts. Please wait a moment and try again.',
  ratelimit: 'Too many sign-in attempts. Please wait a moment and try again.',

  // NextAuth errors
  configuration: 'There is a problem with the server configuration.',
  accessdenied: 'You do not have permission to sign in.',
  access_denied: 'You do not have permission to sign in.',
  verification: 'The sign-in link is no longer valid. It may have expired.',

  // Network errors
  network: 'Unable to connect. Please check your internet connection and try again.',
  fetch_error: 'Unable to connect. Please check your internet connection and try again.',

  // Generic fallback
  default: 'Something went wrong. Please try again.'
}

/**
 * Get a user-friendly error message for an auth error
 *
 * @param error - Error code or message from auth flow
 * @returns User-friendly error message
 *
 * @example
 * getAuthErrorMessage('RateLimit')
 * // => 'Too many sign-in attempts. Please wait a moment and try again.'
 *
 * @example
 * getAuthErrorMessage('UNKNOWN_ERROR')
 * // => 'Something went wrong. Please try again.'
 */
export function getAuthErrorMessage(error: string | undefined | null): string {
  if (!error) return AUTH_ERROR_MESSAGES.default

  // Normalize the error key: lowercase and replace non-alphanumeric with underscores
  const normalizedKey = error.toLowerCase().replace(/[^a-z0-9]/g, '_')

  return AUTH_ERROR_MESSAGES[normalizedKey] || AUTH_ERROR_MESSAGES.default
}

/**
 * Check if an error is a rate limit error
 *
 * @param error - Error code or message
 * @returns true if this is a rate limit error
 */
export function isRateLimitError(error: string | undefined | null): boolean {
  if (!error) return false

  const normalized = error.toLowerCase()
  return (
    normalized.includes('rate') || normalized.includes('too many') || normalized.includes('429')
  )
}

/**
 * Get rate limit specific message
 */
export const RATE_LIMIT_MESSAGE = AUTH_ERROR_MESSAGES.rate_limit
