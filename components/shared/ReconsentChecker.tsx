/**
 * Re-consent Checker Component
 *
 * Server component that checks if user needs to re-consent to updated policies,
 * then renders the ReconsentBanner if needed.
 */

import { auth } from '@/lib/auth/config'
import { checkConsentStatus } from '@/lib/legal-documents'
import { ReconsentBannerClient } from './ReconsentBannerClient'

export async function ReconsentChecker() {
  const session = await auth()

  // Only check for logged-in users
  if (!session?.user?.id) {
    return null
  }

  // Check if user needs to re-consent
  const consentStatus = await checkConsentStatus(session.user.id)

  // Don't render if no re-consent needed
  if (!consentStatus.termsNeedsReconsent && !consentStatus.privacyNeedsReconsent) {
    return null
  }

  return (
    <ReconsentBannerClient
      termsNeedsReconsent={consentStatus.termsNeedsReconsent}
      privacyNeedsReconsent={consentStatus.privacyNeedsReconsent}
      currentTermsVersion={consentStatus.currentTermsVersion}
      currentPrivacyVersion={consentStatus.currentPrivacyVersion}
    />
  )
}
