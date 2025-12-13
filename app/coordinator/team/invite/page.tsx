/**
 * Invite Coordinator Page - Placeholder
 *
 * Will be fully implemented in task 4.8.
 * This placeholder shows the form structure.
 */

import { PageContainer, PageHeader, FormPageLayout, FormSection } from '@/components/admin/shared'
import { UserCog } from 'lucide-react'

export default function InviteCoordinatorPage() {
  return (
    <PageContainer maxWidth="3xl">
      <PageHeader
        title="Invite Coordinator"
        icon={UserCog}
        description="Invite another coordinator to help manage your school"
        backHref="/coordinator/team"
        backLabel="Back to Team"
      />

      <FormPageLayout
        title="Coordinator Invitation"
        description="The coordinator will receive an email with an invitation link. Once they accept, they'll have access to manage students at your school."
      >
        <FormSection title="Coordinator Email">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                disabled
                placeholder="coordinator@example.com"
                className="w-full px-4 py-2 rounded-lg border bg-muted text-muted-foreground cursor-not-allowed"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Coordinator invitation functionality will be available in a future update.
              </p>
            </div>

            <button
              disabled
              className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium opacity-50 cursor-not-allowed"
            >
              Send Invitation
            </button>
          </div>
        </FormSection>
      </FormPageLayout>
    </PageContainer>
  )
}
