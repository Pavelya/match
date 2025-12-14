/**
 * Invite Student Page
 *
 * Form for coordinators to invite students to link their accounts.
 * Checks access level and remaining invites for freemium schools.
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PageContainer, PageHeader, FormPageLayout, FormSection } from '@/components/admin/shared'
import { UserPlus } from 'lucide-react'
import {
  getCoordinatorAccess,
  getRemainingStudentInvites,
  FREEMIUM_MAX_STUDENTS
} from '@/lib/auth/access-control'
import { InviteStudentForm } from './InviteStudentForm'

export default async function InviteStudentPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/auth/coordinator/signin')
  }

  // Get coordinator's school
  const coordinator = await prisma.coordinatorProfile.findFirst({
    where: { userId: session.user.id },
    include: {
      school: {
        select: {
          id: true,
          name: true,
          subscriptionTier: true,
          subscriptionStatus: true
        }
      }
    }
  })

  if (!coordinator?.school) {
    redirect('/')
  }

  const school = coordinator.school
  const access = getCoordinatorAccess(school)

  // Count current students linked to school
  const currentStudentCount = await prisma.studentProfile.count({
    where: { schoolId: school.id }
  })

  // Count pending student invitations
  const pendingInviteCount = await prisma.invitation.count({
    where: {
      schoolId: school.id,
      role: 'STUDENT',
      status: 'PENDING',
      expiresAt: { gt: new Date() }
    }
  })

  const totalStudentCount = currentStudentCount + pendingInviteCount
  const remainingInvites = getRemainingStudentInvites(totalStudentCount, access)
  const canInvite = access.canInviteStudents(totalStudentCount)

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
        {!canInvite ? (
          <FormSection title="Invitation Limit Reached">
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-800 mb-3">
                You have reached the maximum of {FREEMIUM_MAX_STUDENTS} students for free accounts.
                Upgrade your subscription to invite more students.
              </p>
              <a
                href="/coordinator/settings/subscription"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Upgrade to Subscribe
              </a>
            </div>
          </FormSection>
        ) : (
          <InviteStudentForm
            schoolName={school.name}
            remainingInvites={remainingInvites}
            hasFullAccess={access.hasFullAccess}
          />
        )}
      </FormPageLayout>
    </PageContainer>
  )
}
