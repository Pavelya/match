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
 *
 * Today's design. The new design's banner is components/site/CookieBanner.tsx; both store the
 * choice through lib/cookie-consent.ts.
 */

'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ACCEPT_ALL, ESSENTIAL_ONLY, hasConsentChoice, storeConsent } from '@/lib/cookie-consent'

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const pathname = usePathname()

  // Don't show the banner on auth pages (before user is logged in)
  const isAuthPage = pathname?.startsWith('/auth')

  useEffect(() => {
    // Skip if on auth pages
    if (isAuthPage) {
      return
    }

    // Check if user has already made a choice
    const hasChoice = hasConsentChoice()
    if (!hasChoice) {
      // Small delay to avoid flash on page load
      const timer = setTimeout(() => setShowBanner(true), 500)
      return () => clearTimeout(timer)
    }
  }, [isAuthPage])

  const handleAcceptAll = () => {
    storeConsent(ACCEPT_ALL)
    setShowBanner(false)
  }

  const handleAcceptEssential = () => {
    storeConsent(ESSENTIAL_ONLY)
    setShowBanner(false)
  }

  // Don't show on auth pages or if banner is hidden
  if (isAuthPage || !showBanner) return null

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
                <Link href="/cookies" className="text-primary hover:underline">
                  Cookie Policy
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
