/**
 * Request Data Deletion Page - Placeholder
 *
 * Will be fully implemented as part of GDPR compliance features.
 * This placeholder shows the basic structure.
 */

import { PageContainer, PageHeader, InfoCard } from '@/components/admin/shared'
import { Shield, AlertTriangle } from 'lucide-react'

export default function DeleteRequestPage() {
  return (
    <PageContainer maxWidth="3xl">
      <PageHeader
        title="Request Data Deletion"
        icon={Shield}
        description="Request deletion of your school's data from IB Match"
        backHref="/coordinator/settings"
        backLabel="Back to Settings"
      />

      <div className="rounded-xl border border-red-200 bg-red-50 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-red-900 mb-2">
              This action cannot be undone
            </h2>
            <p className="text-sm text-red-700">
              Requesting data deletion will permanently remove all your school&apos;s data from IB
              Match, including student links, coordinator accounts, and analytics history.
            </p>
          </div>
        </div>
      </div>

      <InfoCard title="What will be deleted">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• All coordinator accounts linked to your school</li>
          <li>• Student links to your school (student accounts remain)</li>
          <li>• School profile and settings</li>
          <li>• Analytics and usage data</li>
          <li>• Invitation history</li>
        </ul>
      </InfoCard>

      <div className="mt-6">
        <button
          disabled
          className="px-6 py-2.5 rounded-lg bg-red-600 text-white font-medium opacity-50 cursor-not-allowed"
        >
          Data Deletion Coming Soon
        </button>
        <p className="text-sm text-muted-foreground mt-2">
          This feature will be available in a future update. Contact support for immediate data
          deletion requests.
        </p>
      </div>
    </PageContainer>
  )
}
