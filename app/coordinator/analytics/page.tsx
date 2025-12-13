/**
 * Coordinator Analytics Page
 *
 * Analytics dashboard for coordinators.
 * VIP-only feature - Regular tier sees upgrade prompt.
 *
 * Features for VIP:
 * - School-wide statistics
 * - Student IB score distribution
 * - Popular fields of study
 * - Match quality metrics
 *
 * Features for Freemium:
 * - Basic overview stats with locked detailed sections
 * - Upgrade prompts for advanced analytics
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  PageContainer,
  PageHeader,
  StatCard,
  InfoCard,
  UpgradePromptBanner
} from '@/components/admin/shared'
import { BarChart3, Users, Target, TrendingUp, GraduationCap, Globe, Award } from 'lucide-react'
import { getCoordinatorAccess } from '@/lib/auth/access-control'

export default async function CoordinatorAnalyticsPage() {
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
          subscriptionStatus: true,
          _count: {
            select: {
              students: true
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
  const studentCount = school._count.students

  // Fetch basic stats (available for all tiers)
  const basicStats = await prisma.studentProfile.aggregate({
    where: { schoolId: school.id },
    _avg: { totalIBPoints: true },
    _count: true
  })

  const avgIBPoints = Math.round(basicStats._avg.totalIBPoints || 0)

  // For VIP, fetch more detailed analytics
  let detailedStats = null
  if (access.hasFullAccess && studentCount > 0) {
    // Get students with their preferences
    const studentsWithData = await prisma.studentProfile.findMany({
      where: { schoolId: school.id },
      select: {
        totalIBPoints: true,
        preferredFields: { select: { name: true } },
        preferredCountries: { select: { name: true } },
        courses: { select: { id: true } }
      }
    })

    // Calculate field popularity
    const fieldCounts: Record<string, number> = {}
    studentsWithData.forEach((s) => {
      s.preferredFields.forEach((f) => {
        fieldCounts[f.name] = (fieldCounts[f.name] || 0) + 1
      })
    })

    const topFields = Object.entries(fieldCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    // Calculate country popularity
    const countryCounts: Record<string, number> = {}
    studentsWithData.forEach((s) => {
      s.preferredCountries.forEach((c) => {
        countryCounts[c.name] = (countryCounts[c.name] || 0) + 1
      })
    })

    const topCountries = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    // Students with complete profiles
    const completeProfiles = studentsWithData.filter(
      (s) => s.totalIBPoints !== null && s.courses.length >= 6
    ).length

    detailedStats = {
      topFields,
      topCountries,
      completeProfiles,
      profileCompletionRate:
        studentCount > 0 ? Math.round((completeProfiles / studentCount) * 100) : 0
    }
  }

  // Freemium view - locked analytics
  if (!access.hasFullAccess) {
    return (
      <PageContainer>
        <PageHeader
          title="Analytics"
          icon={BarChart3}
          description="Detailed insights about your students and their university matches"
          backHref="/coordinator/dashboard"
          backLabel="Back to Dashboard"
        />

        {/* Basic stats - visible to all */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Students" value={studentCount} icon={Users} iconColor="blue" />
          <StatCard title="Avg IB Score" value={avgIBPoints} icon={Target} iconColor="green" />
          <StatCard
            title="Profile Completion"
            value={0}
            icon={Award}
            locked
            lockedMessage="VIP Feature"
          />
          <StatCard
            title="Match Quality"
            value={0}
            icon={TrendingUp}
            locked
            lockedMessage="VIP Feature"
          />
        </div>

        {/* Upgrade prompts for locked sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpgradePromptBanner
            feature="Popular Fields of Study"
            description="See which academic fields your students are most interested in and how it compares to global trends."
            variant="card"
            icon={GraduationCap}
          />
          <UpgradePromptBanner
            feature="Preferred Countries"
            description="Discover where your students want to study and track application trends by destination."
            variant="card"
            icon={Globe}
          />
        </div>

        <UpgradePromptBanner
          feature="Match Distribution & Trends"
          description="View detailed match quality analysis, score distributions, and track how your students' matches improve over time."
          variant="card"
          icon={TrendingUp}
          className="mt-6"
        />
      </PageContainer>
    )
  }

  // VIP view - full analytics
  return (
    <PageContainer>
      <PageHeader
        title="Analytics"
        icon={BarChart3}
        description={`Analytics for ${school.name}`}
        backHref="/coordinator/dashboard"
        backLabel="Back to Dashboard"
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Students" value={studentCount} icon={Users} iconColor="blue" />
        <StatCard title="Avg IB Score" value={avgIBPoints} icon={Target} iconColor="green" />
        <StatCard
          title="Complete Profiles"
          value={detailedStats?.completeProfiles || 0}
          icon={Award}
          iconColor="purple"
        />
        <StatCard
          title="Completion Rate"
          value={detailedStats?.profileCompletionRate || 0}
          icon={TrendingUp}
          iconColor="amber"
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Fields */}
        <InfoCard title="Popular Fields of Study" icon={GraduationCap}>
          {detailedStats?.topFields && detailedStats.topFields.length > 0 ? (
            <div className="space-y-3">
              {detailedStats.topFields.map(([field, count], index) => (
                <div key={field} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-sm">{field}</span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {count} student{count !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No student preferences data available yet.
            </p>
          )}
        </InfoCard>

        {/* Preferred Countries */}
        <InfoCard title="Preferred Countries" icon={Globe}>
          {detailedStats?.topCountries && detailedStats.topCountries.length > 0 ? (
            <div className="space-y-3">
              {detailedStats.topCountries.map(([country, count], index) => (
                <div key={country} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-sm">{country}</span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {count} student{count !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No country preferences data available yet.
            </p>
          )}
        </InfoCard>
      </div>

      {/* Coming Soon Section */}
      <div className="mt-6 rounded-xl border border-dashed bg-muted/30 p-8 text-center">
        <TrendingUp className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
        <h3 className="text-lg font-semibold mb-2">More Analytics Coming Soon</h3>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          Match quality charts, score distributions, and trend analysis will be available in a
          future update.
        </p>
      </div>
    </PageContainer>
  )
}
