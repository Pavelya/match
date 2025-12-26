/**
 * Re-consent Banner Component
 *
 * Displays when a user needs to re-accept updated Terms of Service
 * or Privacy Policy. Uses the consent version comparison logic.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, X, FileText, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ReconsentBannerProps {
  /** Whether terms need re-consent */
  termsNeedsReconsent: boolean
  /** Whether privacy needs re-consent */
  privacyNeedsReconsent: boolean
  /** Current terms version label */
  currentTermsVersion: string | null
  /** Current privacy version label */
  currentPrivacyVersion: string | null
  /** Callback when user accepts the updated policies */
  onAccept: () => Promise<void>
}

export function ReconsentBanner({
  termsNeedsReconsent,
  privacyNeedsReconsent,
  currentTermsVersion,
  currentPrivacyVersion,
  onAccept
}: ReconsentBannerProps) {
  const [isAccepting, setIsAccepting] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  // Don't show if nothing needs re-consent or if dismissed
  if ((!termsNeedsReconsent && !privacyNeedsReconsent) || isDismissed) {
    return null
  }

  const handleAccept = async () => {
    setIsAccepting(true)
    try {
      await onAccept()
    } finally {
      setIsAccepting(false)
    }
  }

  // Build the message based on what needs updating
  const updatedDocs: string[] = []
  if (termsNeedsReconsent) updatedDocs.push('Terms of Service')
  if (privacyNeedsReconsent) updatedDocs.push('Privacy Policy')

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-3xl rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-lg md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 shrink-0">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-amber-900">We&apos;ve Updated Our Policies</h3>
            <p className="mt-1 text-sm text-amber-800">
              Our {updatedDocs.join(' and ')} {updatedDocs.length > 1 ? 'have' : 'has'} been
              updated. Please review and accept to continue using IB Match.
            </p>

            {/* Links to view updated documents */}
            <div className="mt-3 flex flex-wrap gap-3">
              {termsNeedsReconsent && (
                <Link
                  href="/terms"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 hover:text-amber-900 hover:underline"
                >
                  <FileText className="h-4 w-4" />
                  View Terms {currentTermsVersion && `(v${currentTermsVersion})`}
                </Link>
              )}
              {privacyNeedsReconsent && (
                <Link
                  href="/privacy"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 hover:text-amber-900 hover:underline"
                >
                  <Shield className="h-4 w-4" />
                  View Privacy Policy {currentPrivacyVersion && `(v${currentPrivacyVersion})`}
                </Link>
              )}
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button
                onClick={handleAccept}
                disabled={isAccepting}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                {isAccepting ? 'Accepting...' : 'I Accept the Updated Policies'}
              </Button>
              <button
                onClick={() => setIsDismissed(true)}
                className="text-sm text-amber-600 hover:text-amber-800 hover:underline"
              >
                Remind me later
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="text-amber-400 hover:text-amber-600 shrink-0"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
