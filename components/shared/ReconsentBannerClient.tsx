/**
 * Re-consent Banner Client Wrapper
 *
 * Client component that handles the accept action by calling the API.
 */

'use client'

import { useRouter } from 'next/navigation'
import { ReconsentBanner } from './ReconsentBanner'

interface ReconsentBannerClientProps {
  termsNeedsReconsent: boolean
  privacyNeedsReconsent: boolean
  currentTermsVersion: string | null
  currentPrivacyVersion: string | null
}

export function ReconsentBannerClient({
  termsNeedsReconsent,
  privacyNeedsReconsent,
  currentTermsVersion,
  currentPrivacyVersion
}: ReconsentBannerClientProps) {
  const router = useRouter()

  const handleAccept = async () => {
    const response = await fetch('/api/consent/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      // Refresh the page to update the consent status
      router.refresh()
    }
    // Silent fail - user can try again
  }

  return (
    <ReconsentBanner
      termsNeedsReconsent={termsNeedsReconsent}
      privacyNeedsReconsent={privacyNeedsReconsent}
      currentTermsVersion={currentTermsVersion}
      currentPrivacyVersion={currentPrivacyVersion}
      onAccept={handleAccept}
    />
  )
}
