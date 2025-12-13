/**
 * Invite Student Page - Placeholder
 *
 * Will be fully implemented in task 4.4.
 * This placeholder shows the form structure.
 */

import { PageContainer, PageHeader, FormPageLayout, FormSection } from '@/components/admin/shared'
import { UserPlus } from 'lucide-react'

export default function InviteStudentPage() {
  return (
    <PageContainer maxWidth="3xl">
      <PageHeader
        title="Invite Student"
        icon={UserPlus}
        description="Send an invitation to a student to link their account with your school"
        backHref="/coordinator/students"
        backLabel="Back to Students"
      />

      <FormPageLayout
        title="Student Invitation"
        description="The student will receive an email with an invitation link. They must accept the invitation and consent to coordinator access before their account is linked to your school."
      >
        <FormSection title="Student Email">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                disabled
                placeholder="student@example.com"
                className="w-full px-4 py-2 rounded-lg border bg-muted text-muted-foreground cursor-not-allowed"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Student invitation functionality will be available in a future update.
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
