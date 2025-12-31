/**
 * Coordinator Dashboard Page
 *
 * Main dashboard for IB Coordinators.
 * Shows school-level KPIs, quick actions, and feature previews.
 *
 * Features:
 * - Student count and average IB score
 * - Coordinator team count
 * - Quick actions (invite student, invite coordinator)
 * - VIP-only features with upgrade prompts for Regular tier
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  UserCog,
  Target,
  TrendingUp,
  UserPlus,
  ArrowRight,
  Plus
} from 'lucide-react'
import {
  PageContainer,
  PageHeader,
  StatCard,
  InfoCard,
  UpgradePromptBanner
} from '@/components/admin/shared'
import { FadeIn } from '@/components/ui/fade-in'
import { getCoordinatorAccess, getRemainingStudentInvites } from '@/lib/auth/access-control'

export default async function CoordinatorDashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/auth/coordinator/signin')
  }

  // Get coordinator's school data
  const coordinator = await prisma.coordinatorProfile.findFirst({
    where: { userId: session.user.id },
    include: {
      school: {
        include: {
          _count: {
            select: {
              students: true,
              coordinators: true
            }
          }
        }
      }
    }
  })

  if (!coordinator?.school) {
    redirect('/')
  }

  const school = coordinator.school
  const access = getCoordinatorAccess(school)

  // Fetch all school statistics in parallel for better performance
  // Previously: 3 sequential queries (~150ms) → Now: parallel (~50ms)
  const [stats, studentsWithConsent, completeProfiles] = await Promise.all([
    // Average IB points
    prisma.studentProfile.aggregate({
      where: { schoolId: school.id },
      _avg: { totalIBPoints: true },
      _count: true
    }),
    // Count students with consent
    prisma.studentProfile.count({
      where: {
        schoolId: school.id,
        coordinatorAccessConsentAt: { not: null }
      }
    }),
    // Count students with complete profiles (has IB points and at least one course)
    prisma.studentProfile.count({
      where: {
        schoolId: school.id,
        totalIBPoints: { not: null },
        courses: { some: {} }
      }
    })
  ])

  const studentCount = school._count.students
  const coordinatorCount = school._count.coordinators
  const avgIBPoints = Math.round(stats._avg.totalIBPoints || 0)
  const remainingInvites = getRemainingStudentInvites(studentCount, access)
  const consentRate = studentCount > 0 ? Math.round((studentsWithConsent / studentCount) * 100) : 0
  const profileCompletionRate =
    studentCount > 0 ? Math.round((completeProfiles / studentCount) * 100) : 0

  return (
    <PageContainer>
      {/* Animated Header */}
      <FadeIn direction="down" duration={300}>
        <PageHeader
          title="School Dashboard"
          icon={LayoutDashboard}
          description={`Welcome back! Here's an overview of ${school.name}`}
        />
      </FadeIn>

      {/* Freemium Usage Warning */}
      {!access.hasFullAccess && remainingInvites !== null && remainingInvites <= 3 && (
        <FadeIn direction="up" delay={100}>
          <UpgradePromptBanner
            feature={`${remainingInvites} student invite${remainingInvites === 1 ? '' : 's'} remaining`}
            description="Upgrade to VIP for unlimited student invitations and full access to all features."
            variant="subtle"
            upgradeHref="/coordinator/settings/subscription"
            className="mb-6"
          />
        </FadeIn>
      )}

      {/* Key Metrics - 4 actionable cards with staggered animation */}
      <FadeIn direction="up" delay={150} duration={400}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Students"
            value={studentCount}
            icon={Users}
            href="/coordinator/students"
            iconColor="blue"
          />
          <StatCard
            title="With Consent"
            value={studentsWithConsent}
            icon={Users}
            href="/coordinator/students"
            iconColor="green"
          />
          <StatCard title="Avg IB Score" value={avgIBPoints} icon={Target} iconColor="amber" />
          <StatCard
            title="Coordinators"
            value={coordinatorCount}
            icon={UserCog}
            href="/coordinator/team"
            iconColor="purple"
          />
        </div>
      </FadeIn>

      {/* Main Content Grid */}
      <FadeIn direction="up" delay={300} duration={400}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <InfoCard title="Quick Actions" icon={Plus}>
            <div className="space-y-3">
              <QuickActionLink
                href="/coordinator/students/invite"
                label="Invite Student"
                icon={UserPlus}
                description={
                  remainingInvites !== null
                    ? `${remainingInvites} invite${remainingInvites === 1 ? '' : 's'} remaining`
                    : undefined
                }
                disabled={!access.canInviteStudents(studentCount)}
              />
              <QuickActionLink
                href="/coordinator/team/invite"
                label="Invite Coordinator"
                icon={UserCog}
                locked={!access.canInviteCoordinators}
              />
              <QuickActionLink
                href="/coordinator/students"
                label="View All Students"
                icon={Users}
              />
            </div>
          </InfoCard>

          {/* Analytics Preview or Upgrade Prompt */}
          {access.hasFullAccess ? (
            <InfoCard title="Student Readiness" icon={TrendingUp}>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Consent Rate</span>
                  <span className="text-sm font-medium">{consentRate}%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Profile Completion</span>
                  <span className="text-sm font-medium">{profileCompletionRate}%</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Complete Profiles</span>
                  <span className="text-sm font-medium">
                    {completeProfiles} of {studentCount}
                  </span>
                </div>
                <Link
                  href="/coordinator/analytics"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-2"
                >
                  View Full Analytics
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </InfoCard>
          ) : (
            <UpgradePromptBanner
              feature="Advanced Analytics"
              description="Track student match performance, popular fields, and compare with global trends. Get detailed insights about your students' university matches."
              variant="card"
              upgradeHref="/coordinator/settings/subscription"
            />
          )}
        </div>
      </FadeIn>
    </PageContainer>
  )
}

// Quick Action Link Component
function QuickActionLink({
  href,
  label,
  icon: Icon,
  description,
  disabled,
  locked
}: {
  href: string
  label: string
  icon: typeof Users
  description?: string
  disabled?: boolean
  locked?: boolean
}) {
  if (disabled) {
    return (
      <div className="flex items-center justify-between p-3 -mx-3 rounded-lg bg-muted/30 opacity-60 cursor-not-allowed">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <span className="text-sm font-medium text-foreground">{label}</span>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>
      </div>
    )
  }

  if (locked) {
    return (
      <Link
        href="/coordinator/settings/subscription"
        className="flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-muted/50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <span className="text-sm font-medium text-foreground">{label}</span>
            <p className="text-xs text-amber-600">VIP Feature</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className="flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-muted/50 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <span className="text-sm font-medium text-foreground">{label}</span>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  )
}
