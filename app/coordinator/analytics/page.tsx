/**
 * Coordinator Analytics Page
 *
 * Analytics dashboard for coordinators.
 * VIP/subscribed coordinators get full access, freemium sees upgrade prompts.
 *
 * Features for VIP/Subscribed:
 * - School-wide statistics
 * - Student IB score distribution
 * - Popular fields of study with visual bars
 * - Preferred countries with visual bars
 * - Match quality distribution
 *
 * Features for Freemium:
 * - Basic overview stats (total students, avg IB)
 * - Locked detailed sections with upgrade prompts
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
import {
  BarChart3,
  Users,
  Target,
  TrendingUp,
  GraduationCap,
  Globe,
  Award,
  Percent
} from 'lucide-react'
import { getCoordinatorAccess } from '@/lib/auth/access-control'
import { getCachedMatches } from '@/lib/matching'
import { getCachedPrograms } from '@/lib/matching/program-cache'
import { transformStudent, transformPrograms } from '@/lib/matching/transformers'
import type { PrismaStudentWithRelations } from '@/lib/matching/transformers'
import { FieldIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

// Simple horizontal bar component for visualization
function HorizontalBar({
  value,
  maxValue,
  color = 'primary'
}: {
  value: number
  maxValue: number
  color?: 'primary' | 'green' | 'blue' | 'amber' | 'purple'
}) {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0
  const colorClasses = {
    primary: 'bg-primary',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500'
  }

  return (
    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
      <div
        className={cn('h-full rounded-full transition-all duration-500', colorClasses[color])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

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

  // For VIP/subscribed, fetch more detailed analytics
  let detailedStats: {
    topFields: { name: string; count: number; iconName: string | null }[]
    topCountries: { name: string; count: number; flagEmoji: string | null }[]
    completeProfiles: number
    profileCompletionRate: number
    matchDistribution: { bucket: string; count: number }[] | null
  } | null = null

  if (access.hasFullAccess && studentCount > 0) {
    // Get students with their preferences
    const studentsWithData = await prisma.studentProfile.findMany({
      where: { schoolId: school.id },
      include: {
        courses: { include: { ibCourse: true } },
        preferredFields: { select: { id: true, name: true, iconName: true } },
        preferredCountries: { select: { id: true, name: true, flagEmoji: true } }
      }
    })

    // Calculate field popularity with iconName
    const fieldData: Record<string, { count: number; iconName: string | null }> = {}
    studentsWithData.forEach((s) => {
      s.preferredFields.forEach((f) => {
        if (!fieldData[f.name]) {
          fieldData[f.name] = { count: 0, iconName: f.iconName }
        }
        fieldData[f.name].count++
      })
    })

    const topFields = Object.entries(fieldData)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([name, data]) => ({ name, count: data.count, iconName: data.iconName }))

    // Calculate country popularity with flagEmoji
    const countryData: Record<string, { count: number; flagEmoji: string | null }> = {}
    studentsWithData.forEach((s) => {
      s.preferredCountries.forEach((c) => {
        if (!countryData[c.name]) {
          countryData[c.name] = { count: 0, flagEmoji: c.flagEmoji }
        }
        countryData[c.name].count++
      })
    })

    const topCountries = Object.entries(countryData)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([name, data]) => ({ name, count: data.count, flagEmoji: data.flagEmoji }))

    // Students with complete profiles
    const completeProfiles = studentsWithData.filter(
      (s) => s.totalIBPoints !== null && s.courses.length >= 6
    ).length

    // Calculate match distribution for schools with < 50 students
    let matchDistribution: { bucket: string; count: number }[] | null = null

    if (studentCount <= 50) {
      const programs = await getCachedPrograms()
      const transformedPrograms = transformPrograms(programs)

      const matchScores: number[] = []

      for (const student of studentsWithData) {
        if (student.totalIBPoints !== null && student.courses.length > 0) {
          const transformedStudent = transformStudent(student as PrismaStudentWithRelations)
          const matches = await getCachedMatches(
            student.userId,
            transformedStudent,
            transformedPrograms
          )

          if (matches.length > 0) {
            const topScore = matches[0].overallScore * 100
            matchScores.push(topScore)
          }
        }
      }

      if (matchScores.length > 0) {
        const buckets = [
          { label: '90-100%', min: 90, max: 100, count: 0 },
          { label: '80-89%', min: 80, max: 89, count: 0 },
          { label: '70-79%', min: 70, max: 79, count: 0 },
          { label: '60-69%', min: 60, max: 69, count: 0 },
          { label: 'Below 60%', min: 0, max: 59, count: 0 }
        ]

        matchScores.forEach((score) => {
          const bucket = buckets.find((b) => score >= b.min && score <= b.max)
          if (bucket) bucket.count++
        })

        matchDistribution = buckets.map((b) => ({ bucket: b.label, count: b.count }))
      }
    }

    detailedStats = {
      topFields,
      topCountries,
      completeProfiles,
      profileCompletionRate:
        studentCount > 0 ? Math.round((completeProfiles / studentCount) * 100) : 0,
      matchDistribution
    }
  }

  // Get max count for bar scaling
  const maxFieldCount = detailedStats?.topFields?.[0]?.count ?? 0
  const maxCountryCount = detailedStats?.topCountries?.[0]?.count ?? 0
  const maxMatchCount = detailedStats?.matchDistribution
    ? Math.max(...detailedStats.matchDistribution.map((b) => b.count))
    : 0

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
            lockedMessage="Subscribe"
          />
          <StatCard
            title="Match Quality"
            value={0}
            icon={TrendingUp}
            locked
            lockedMessage="Subscribe"
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

  // VIP/Subscribed view - full analytics
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
          icon={Percent}
          iconColor="amber"
        />
      </div>

      {/* Match Distribution Chart */}
      {studentCount <= 50 && (
        <InfoCard title="Match Quality Distribution" icon={TrendingUp} className="mb-6">
          {detailedStats?.matchDistribution && detailedStats.matchDistribution.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Distribution of top match scores across your students
              </p>
              <div className="space-y-3">
                {detailedStats.matchDistribution.map((bucket) => (
                  <div key={bucket.bucket} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-24 shrink-0">{bucket.bucket}</span>
                    <div className="flex-1">
                      <HorizontalBar value={bucket.count} maxValue={maxMatchCount} color="blue" />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {bucket.count}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No match data available yet.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Students need complete profiles (IB courses and points) to calculate matches.
              </p>
            </div>
          )}
        </InfoCard>
      )}

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Fields with visual bars */}
        <InfoCard title="Popular Fields of Study" icon={GraduationCap}>
          {detailedStats?.topFields && detailedStats.topFields.length > 0 ? (
            <div className="space-y-4">
              {detailedStats.topFields.map((field) => (
                <div key={field.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
                        <FieldIcon
                          fieldName={field.name}
                          iconKey={field.iconName}
                          className="h-4 w-4 text-primary"
                        />
                      </span>
                      <span className="text-sm font-medium">{field.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {field.count} student{field.count !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <HorizontalBar value={field.count} maxValue={maxFieldCount} color="blue" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No student preferences data available yet.
            </p>
          )}
        </InfoCard>

        {/* Preferred Countries with visual bars */}
        <InfoCard title="Preferred Countries" icon={Globe}>
          {detailedStats?.topCountries && detailedStats.topCountries.length > 0 ? (
            <div className="space-y-4">
              {detailedStats.topCountries.map((country) => (
                <div key={country.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg leading-none">{country.flagEmoji || '🌍'}</span>
                      <span className="text-sm font-medium">{country.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {country.count} student{country.count !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <HorizontalBar value={country.count} maxValue={maxCountryCount} color="blue" />
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

      {/* Note for large schools */}
      {studentCount > 50 && !detailedStats?.matchDistribution && (
        <div className="mt-6 rounded-xl border border-dashed bg-muted/30 p-6 text-center">
          <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-sm">
            Match distribution analysis is available for schools with up to 50 students.
            <br />
            Contact support for enterprise analytics.
          </p>
        </div>
      )}
    </PageContainer>
  )
}
