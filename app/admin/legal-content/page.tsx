/**
 * Admin Legal Content Page
 *
 * Main page for administrators to manage legal documents.
 * Features:
 * - Cards for each document type (Terms, Privacy, FAQs, Cookies)
 * - Status indicators (Published/Draft/Not Created)
 * - Quick actions to edit or view live pages
 */

import { FileText } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { LegalContentClient } from '@/components/admin/legal-content'

export default function AdminLegalContentPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Legal Content"
        icon={FileText}
        description="Manage Terms of Service, Privacy Policy, FAQs, and Cookie Policy with version control."
      />

      <LegalContentClient />
    </PageContainer>
  )
}
