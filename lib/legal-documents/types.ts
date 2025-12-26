/**
 * Legal Document Types
 *
 * TypeScript interfaces for legal document versioning system.
 */

import { LegalDocumentType, DocumentStatus } from '@prisma/client'

// Re-export Prisma enums for convenience
export { LegalDocumentType, DocumentStatus }

// API Response types
export interface LegalDocumentSummary {
  id: string
  type: LegalDocumentType
  publishedVersion: {
    id: string
    title: string
    versionNumber: number
    versionLabel: string
    effectiveDate: Date | null
    publishedAt: Date | null
  } | null
  latestDraft: {
    id: string
    title: string
    versionNumber: number
    status: DocumentStatus
    updatedAt: Date
  } | null
  totalVersions: number
}

export interface LegalDocumentDetail {
  id: string
  type: LegalDocumentType
  publishedVersionId: string | null
  versions: LegalDocumentVersionDetail[]
  createdAt: Date
  updatedAt: Date
}

export interface LegalDocumentVersionDetail {
  id: string
  title: string
  content: string
  versionNumber: number
  versionLabel: string
  status: DocumentStatus
  effectiveDate: Date | null
  changeNotes: string | null
  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
  createdBy: {
    id: string
    name: string | null
    email: string
  }
  publishedBy: {
    id: string
    name: string | null
    email: string
  } | null
}

// Request body types
export interface CreateVersionInput {
  title: string
  content: string
  versionLabel?: string
  changeNotes?: string
}

export interface UpdateVersionInput {
  title?: string
  content?: string
  versionLabel?: string
  changeNotes?: string
}

export interface PublishVersionInput {
  effectiveDate?: Date | string
}

// Type guard for document type validation
export function isValidDocumentType(type: string): type is LegalDocumentType {
  return Object.values(LegalDocumentType).includes(type as LegalDocumentType)
}

// Human-readable labels for document types
export const DOCUMENT_TYPE_LABELS: Record<LegalDocumentType, string> = {
  TERMS_OF_SERVICE: 'Terms of Service',
  PRIVACY_POLICY: 'Privacy Policy',
  FAQ: 'Frequently Asked Questions',
  COOKIE_POLICY: 'Cookie Policy'
}

// URL slugs for document types
export const DOCUMENT_TYPE_SLUGS: Record<LegalDocumentType, string> = {
  TERMS_OF_SERVICE: 'terms',
  PRIVACY_POLICY: 'privacy',
  FAQ: 'faqs',
  COOKIE_POLICY: 'cookies'
}

// Reverse mapping from slug to type
export const SLUG_TO_DOCUMENT_TYPE: Record<string, LegalDocumentType> = {
  terms: 'TERMS_OF_SERVICE',
  privacy: 'PRIVACY_POLICY',
  faqs: 'FAQ',
  cookies: 'COOKIE_POLICY'
}
