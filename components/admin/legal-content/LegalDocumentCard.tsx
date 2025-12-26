/**
 * Legal Document Card Component
 *
 * Card displaying a legal document type with its current status.
 * Shows published version info, draft status, and quick actions.
 */

'use client'

import Link from 'next/link'
import { FileText, Edit, Eye, Plus, Clock, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LegalDocumentType, DocumentStatus } from '@prisma/client'

interface PublishedVersion {
  id: string
  title: string
  versionNumber: number
  versionLabel: string
  effectiveDate: string | null
  publishedAt: string | null
}

interface LatestDraft {
  id: string
  title: string
  versionNumber: number
  status: DocumentStatus
  updatedAt: string
}

export interface LegalDocumentCardProps {
  type: LegalDocumentType
  typeLabel: string
  id: string | null
  publishedVersion: PublishedVersion | null
  latestDraft: LatestDraft | null
  totalVersions: number
}

const DOCUMENT_SLUGS: Record<LegalDocumentType, string> = {
  TERMS_OF_SERVICE: 'terms',
  PRIVACY_POLICY: 'privacy',
  FAQ: 'faqs',
  COOKIE_POLICY: 'cookies'
}

const DOCUMENT_DESCRIPTIONS: Record<LegalDocumentType, string> = {
  TERMS_OF_SERVICE: 'Terms and conditions for using the platform',
  PRIVACY_POLICY: 'How we collect, use, and protect user data',
  FAQ: 'Frequently asked questions and answers',
  COOKIE_POLICY: 'Cookie usage and consent information'
}

export function LegalDocumentCard({
  type,
  typeLabel,
  publishedVersion,
  latestDraft,
  totalVersions
}: LegalDocumentCardProps) {
  const slug = DOCUMENT_SLUGS[type]
  const description = DOCUMENT_DESCRIPTIONS[type]
  const hasPublished = !!publishedVersion
  const hasDraft = !!latestDraft

  return (
    <div className="rounded-xl border bg-card p-6 transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{typeLabel}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>
        {/* Status Badge */}
        {hasPublished ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3" />
            Published
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <Clock className="h-3 w-3" />
            Not Published
          </span>
        )}
      </div>

      {/* Published Version Info */}
      {hasPublished && publishedVersion && (
        <div className="mb-4 p-3 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Version</span>
            <span className="font-medium">
              v{publishedVersion.versionNumber} ({publishedVersion.versionLabel})
            </span>
          </div>
          {publishedVersion.effectiveDate && (
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground">Effective Since</span>
              <span className="font-medium">
                {new Date(publishedVersion.effectiveDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Draft Notice */}
      {hasDraft && (
        <div className="mb-4 p-3 rounded-lg border border-amber-200 bg-amber-50">
          <div className="flex items-center gap-2 text-sm text-amber-700">
            <Edit className="h-4 w-4" />
            <span>
              Draft v{latestDraft.versionNumber} — Last edited{' '}
              {new Date(latestDraft.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <span>
          {totalVersions} version{totalVersions !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t">
        <Link
          href={`/admin/legal-content/${slug}`}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
            'bg-primary text-primary-foreground hover:bg-primary/90'
          )}
        >
          <Edit className="h-4 w-4" />
          Edit
        </Link>
        {hasPublished && (
          <Link
            href={`/${slug === 'faqs' ? 'faqs' : slug}`}
            target="_blank"
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              'border border-input bg-background hover:bg-muted'
            )}
          >
            <Eye className="h-4 w-4" />
            View Live
          </Link>
        )}
        {!hasPublished && !hasDraft && (
          <Link
            href={`/admin/legal-content/${slug}?new=true`}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              'border border-input bg-background hover:bg-muted'
            )}
          >
            <Plus className="h-4 w-4" />
            Create First Version
          </Link>
        )}
      </div>
    </div>
  )
}
