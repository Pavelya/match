/**
 * Cookie Consent Banner Component
 *
 * ePrivacy Directive compliant cookie consent banner.
 * Currently the app only uses essential cookies (authentication),
 * but this banner provides infrastructure for future analytics/marketing cookies.
 *
 * Essential cookies (always allowed):
 * - next-auth.session-token / __Secure-next-auth.session-token (session)
 * - next-auth.csrf-token (CSRF protection)
 * - next-auth.callback-url (redirect after login)
 *
 * Non-essential cookies (requires consent):
 * - None currently, but ready for analytics, preferences, marketing
 */

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Cookie consent preferences
export type CookieConsent = {
  essential: boolean // Always true, required for app to function
  analytics: boolean // Google Analytics, etc.
  preferences: boolean // User preferences beyond essential
  marketing: boolean // Advertising, retargeting
  timestamp: string // When consent was given/updated
}

const CONSENT_COOKIE_NAME = 'cookie-consent'
const _CONSENT_VERSION = '1.0' // Update when changing cookie categories

// Default consent (only essential)
const DEFAULT_CONSENT: CookieConsent = {
  essential: true,
  analytics: false,
  preferences: false,
  marketing: false,
  timestamp: ''
}

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
    // Invalid JSON, clear it
    localStorage.removeItem(CONSENT_COOKIE_NAME)
  }
  return null
}

/**
 * Store consent in localStorage and cookie
 */
function storeConsent(consent: CookieConsent): void {
  if (typeof window === 'undefined') return

  const consentWithTimestamp = {
    ...consent,
    timestamp: new Date().toISOString()
  }

  // Store in localStorage for easy access
  localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(consentWithTimestamp))

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

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const hasChoice = hasConsentChoice()
    if (!hasChoice) {
      // Small delay to avoid flash on page load
      const timer = setTimeout(() => setShowBanner(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    storeConsent({
      essential: true,
      analytics: true,
      preferences: true,
      marketing: true,
      timestamp: ''
    })
    setShowBanner(false)
  }

  const handleAcceptEssential = () => {
    storeConsent({
      essential: true,
      analytics: false,
      preferences: false,
      marketing: false,
      timestamp: ''
    })
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl rounded-xl border bg-card p-4 shadow-lg md:p-6">
        {!showDetails ? (
          // Simple view
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">🍪 Cookie Preferences</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We use cookies to enhance your experience. Essential cookies are required for the
                app to work. You can accept all cookies or only essential ones.{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>
                Customize
              </Button>
              <Button variant="outline" size="sm" onClick={handleAcceptEssential}>
                Essential Only
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        ) : (
          // Detailed view
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground">Cookie Settings</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your cookie preferences. Essential cookies cannot be disabled as they are
                required for the app to function.
              </p>
            </div>

            <div className="space-y-3">
              {/* Essential Cookies */}
              <div className="flex items-start justify-between rounded-lg border bg-muted/30 p-3">
                <div>
                  <h4 className="font-medium text-foreground">Essential Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Required for authentication and security. Cannot be disabled.
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="text-sm font-medium text-primary">Always On</span>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between rounded-lg border p-3">
                <div>
                  <h4 className="font-medium text-foreground">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how you use the app to improve it.
                  </p>
                </div>
                <div className="shrink-0 text-sm text-muted-foreground">Not currently used</div>
              </div>

              {/* Preference Cookies */}
              <div className="flex items-start justify-between rounded-lg border p-3">
                <div>
                  <h4 className="font-medium text-foreground">Preference Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Remember your settings and preferences.
                  </p>
                </div>
                <div className="shrink-0 text-sm text-muted-foreground">Not currently used</div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between rounded-lg border p-3">
                <div>
                  <h4 className="font-medium text-foreground">Marketing Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Used for advertising and retargeting.
                  </p>
                </div>
                <div className="shrink-0 text-sm text-muted-foreground">Not currently used</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-2 border-t pt-4">
              <Button variant="outline" size="sm" onClick={() => setShowDetails(false)}>
                Back
              </Button>
              <Button variant="outline" size="sm" onClick={handleAcceptEssential}>
                Essential Only
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
