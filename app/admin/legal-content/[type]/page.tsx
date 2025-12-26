/**
 * Admin Legal Document Editor Page
 *
 * Editor page for individual legal documents (Terms, Privacy, FAQs, Cookies).
 * Features:
 * - Markdown editor with live preview
 * - Version management (drafts, publish, revert)
 * - Version history view
 */

import { notFound } from 'next/navigation'
import { FileText } from 'lucide-react'
import { FormPageLayout } from '@/components/admin/shared'
import { DocumentEditorClient } from '@/components/admin/legal-content'
import { SLUG_TO_DOCUMENT_TYPE, DOCUMENT_TYPE_LABELS } from '@/lib/legal-documents'

interface PageProps {
  params: Promise<{ type: string }>
}

export default async function LegalDocumentEditorPage({ params }: PageProps) {
  const { type: slug } = await params

  // Validate document type
  const documentType = SLUG_TO_DOCUMENT_TYPE[slug]
  if (!documentType) {
    notFound()
  }

  const typeLabel = DOCUMENT_TYPE_LABELS[documentType]

  return (
    <FormPageLayout
      title={`Edit ${typeLabel}`}
      description="Edit content, manage versions, and publish changes."
      icon={FileText}
      breadcrumbs={[{ label: 'Legal Content', href: '/admin/legal-content' }, { label: typeLabel }]}
    >
      <DocumentEditorClient documentType={documentType} slug={slug} />
    </FormPageLayout>
  )
}
