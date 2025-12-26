/**
 * Legal Content List Client Component
 *
 * Client component that fetches and displays all legal documents.
 * Shows cards for each document type with status and actions.
 */

'use client'

import { useState, useEffect } from 'react'
import { LegalDocumentCard, LegalDocumentCardProps } from './LegalDocumentCard'
import { DOCUMENT_TYPE_LABELS } from '@/lib/legal-documents/types'
import { LegalDocumentType } from '@prisma/client'

interface LegalDocumentSummary {
  id: string
  type: LegalDocumentType
  publishedVersion: {
    id: string
    title: string
    versionNumber: number
    versionLabel: string
    effectiveDate: string | null
    publishedAt: string | null
  } | null
  latestDraft: {
    id: string
    title: string
    versionNumber: number
    status: string
    updatedAt: string
  } | null
  totalVersions: number
}

export function LegalContentClient() {
  const [documents, setDocuments] = useState<LegalDocumentSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch('/api/admin/legal-documents')
        if (!response.ok) {
          throw new Error('Failed to fetch documents')
        }
        const data = await response.json()
        setDocuments(data.documents)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border bg-card p-6 animate-pulse">
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-32 bg-muted rounded" />
                <div className="h-4 w-48 bg-muted rounded" />
              </div>
            </div>
            <div className="h-16 bg-muted rounded-lg mb-4" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-red-700">Failed to load documents: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {documents.map((doc) => (
        <LegalDocumentCard
          key={doc.type}
          type={doc.type}
          typeLabel={DOCUMENT_TYPE_LABELS[doc.type]}
          id={doc.id}
          publishedVersion={doc.publishedVersion}
          latestDraft={doc.latestDraft as LegalDocumentCardProps['latestDraft']}
          totalVersions={doc.totalVersions}
        />
      ))}
    </div>
  )
}
