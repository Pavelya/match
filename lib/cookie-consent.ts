/**
 * The cookie banner's choice. ePrivacy Directive compliant: the app only sets essential cookies
 * (authentication) today, and the other three kinds are ready for analytics, preferences or
 * marketing later.
 *
 * Essential cookies (always allowed):
 * - next-auth.session-token / __Secure-next-auth.session-token (session)
 * - next-auth.csrf-token (CSRF protection)
 * - next-auth.callback-url (redirect after login)
 *
 * The choice lives in the browser only: localStorage, and a cookie of the same name for a later
 * server-side check. Nothing reads it on the server, so pages stay static. Today's banner and the
 * new design's (rebranding 4.1, board "D4.1 Home") share this, so a choice made in one design
 * holds in the other.
 */

export type CookieConsent = {
  essential: boolean // Always true, required for app to function
  analytics: boolean // Google Analytics, etc.
  preferences: boolean // User preferences beyond essential
  marketing: boolean // Advertising, retargeting
  timestamp: string // When consent was given/updated
}

export type CookieChoice = Omit<CookieConsent, 'timestamp'>

const CONSENT_COOKIE_NAME = 'cookie-consent'

/** "Essential only" */
export const ESSENTIAL_ONLY: CookieChoice = {
  essential: true,
  analytics: false,
  preferences: false,
  marketing: false
}

/** "Accept all" */
export const ACCEPT_ALL: CookieChoice = {
  essential: true,
  analytics: true,
  preferences: true,
  marketing: true
}

// Default consent (only essential)
const DEFAULT_CONSENT: CookieConsent = { ...ESSENTIAL_ONLY, timestamp: '' }

/**
 * Get stored consent from localStorage
 */
function getStoredConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(CONSENT_COOKIE_NAME)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // Invalid JSON, clear it. Storage the browser blocks reads as no choice.
    try {
      localStorage.removeItem(CONSENT_COOKIE_NAME)
    } catch {}
  }
  return null
}

/**
 * Store consent in localStorage and cookie
 */
export function storeConsent(choice: CookieChoice): void {
  if (typeof window === 'undefined') return

  const consentWithTimestamp: CookieConsent = {
    ...choice,
    timestamp: new Date().toISOString()
  }

  // Store in localStorage for easy access, where the browser allows it
  try {
    localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(consentWithTimestamp))
  } catch {}

  // Also set a simple cookie for server-side checks
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consentWithTimestamp))}; path=/; max-age=31536000; SameSite=Lax`
}

/**
 * Check if user has made a consent choice
 */
export function hasConsentChoice(): boolean {
  return getStoredConsent() !== null
}

/**
 * Get current consent preferences
 */
export function getConsent(): CookieConsent {
  return getStoredConsent() || DEFAULT_CONSENT
}
