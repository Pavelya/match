/**
 * Consent Version Service
 *
 * Logic for comparing user's accepted versions with current published versions.
 * Used to detect when users need to re-accept updated terms or privacy policy.
 */

import { prisma } from '@/lib/prisma'
import { LegalDocumentType } from '@prisma/client'

/**
 * Result of version comparison
 */
export interface ConsentStatus {
  /** Whether terms need re-consent */
  termsNeedsReconsent: boolean
  /** Whether privacy policy needs re-consent */
  privacyNeedsReconsent: boolean
  /** Current published terms version */
  currentTermsVersion: string | null
  /** Current published privacy version */
  currentPrivacyVersion: string | null
  /** User's accepted terms version */
  userTermsVersion: string | null
  /** User's accepted privacy version */
  userPrivacyVersion: string | null
}

/**
 * Get current published version labels for terms and privacy
 */
export async function getCurrentVersionLabels(): Promise<{
  terms: string | null
  privacy: string | null
}> {
  const [termsDoc, privacyDoc] = await Promise.all([
    prisma.legalDocument.findUnique({
      where: { type: 'TERMS_OF_SERVICE' },
      include: {
        publishedVersion: {
          select: { versionLabel: true }
        }
      }
    }),
    prisma.legalDocument.findUnique({
      where: { type: 'PRIVACY_POLICY' },
      include: {
        publishedVersion: {
          select: { versionLabel: true }
        }
      }
    })
  ])

  return {
    terms: termsDoc?.publishedVersion?.versionLabel || null,
    privacy: privacyDoc?.publishedVersion?.versionLabel || null
  }
}

/**
 * Get user's accepted version labels
 */
export async function getUserAcceptedVersions(userId: string): Promise<{
  terms: string | null
  privacy: string | null
}> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      termsVersion: true,
      privacyPolicyVersion: true
    }
  })

  return {
    terms: user?.termsVersion || null,
    privacy: user?.privacyPolicyVersion || null
  }
}

/**
 * Compare versions - returns true if they are different (needs re-consent)
 * Returns false if either is null (can't compare) or if they match
 */
export function versionsAreDifferent(
  userVersion: string | null,
  currentVersion: string | null
): boolean {
  // If no published version exists, no re-consent needed
  if (!currentVersion) return false

  // If user hasn't accepted any version, they need to consent
  if (!userVersion) return true

  // Compare versions (case-insensitive, trimmed)
  return userVersion.trim().toLowerCase() !== currentVersion.trim().toLowerCase()
}

/**
 * Check if a user needs to re-consent to any legal documents
 */
export async function checkConsentStatus(userId: string): Promise<ConsentStatus> {
  const [currentVersions, userVersions] = await Promise.all([
    getCurrentVersionLabels(),
    getUserAcceptedVersions(userId)
  ])

  return {
    termsNeedsReconsent: versionsAreDifferent(userVersions.terms, currentVersions.terms),
    privacyNeedsReconsent: versionsAreDifferent(userVersions.privacy, currentVersions.privacy),
    currentTermsVersion: currentVersions.terms,
    currentPrivacyVersion: currentVersions.privacy,
    userTermsVersion: userVersions.terms,
    userPrivacyVersion: userVersions.privacy
  }
}

/**
 * Record user's consent to current versions
 */
export async function recordConsent(
  userId: string,
  documentTypes: LegalDocumentType[]
): Promise<void> {
  const currentVersions = await getCurrentVersionLabels()
  const now = new Date()

  const updateData: Record<string, unknown> = {}

  if (documentTypes.includes('TERMS_OF_SERVICE') && currentVersions.terms) {
    updateData.termsVersion = currentVersions.terms
    updateData.termsAcceptedAt = now
  }

  if (documentTypes.includes('PRIVACY_POLICY') && currentVersions.privacy) {
    updateData.privacyPolicyVersion = currentVersions.privacy
    updateData.privacyAcceptedAt = now
  }

  if (Object.keys(updateData).length > 0) {
    await prisma.user.update({
      where: { id: userId },
      data: updateData
    })
  }
}

/**
 * Record consent to all required documents (terms + privacy)
 */
export async function recordAllConsents(userId: string): Promise<void> {
  await recordConsent(userId, ['TERMS_OF_SERVICE', 'PRIVACY_POLICY'])
}
