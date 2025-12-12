/**
 * Admin Analytics Page
 *
 * Platform analytics and statistics.
 * Shows detailed insights about platform usage and trends.
 */

import { prisma } from '@/lib/prisma'
import {
  BarChart3,
  TrendingUp,
  Users,
  GraduationCap,
  Globe,
  BookOpen,
  Target,
  MapPin
} from 'lucide-react'
import { PageContainer, PageHeader, StatCard, InfoCard } from '@/components/admin/shared'

export default async function AnalyticsPage() {
  // Fetch analytics data
  const [
    totalStudents,
    studentsWithProfile,
    totalPrograms,
    totalUniversities,
    totalSchools,
    totalCoordinators,
    // Get popular countries
    countryStats,
    // Get popular fields
    fieldStats
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.studentProfile.count(),
    prisma.academicProgram.count(),
    prisma.university.count(),
    prisma.iBSchool.count(),
    prisma.coordinatorProfile.count(),
    prisma.university.groupBy({
      by: ['countryId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10
    }),
    prisma.academicProgram.groupBy({
      by: ['fieldOfStudyId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10
    })
  ])

  // Fetch country names for the stats
  const countryIds = countryStats.map((c) => c.countryId)
  const countries = await prisma.country.findMany({
    where: { id: { in: countryIds } },
    select: { id: true, name: true, flagEmoji: true }
  })
  const countryMap = new Map(countries.map((c) => [c.id, c]))

  // Fetch field names for the stats
  const fieldIds = fieldStats.map((f) => f.fieldOfStudyId)
  const fields = await prisma.fieldOfStudy.findMany({
    where: { id: { in: fieldIds } },
    select: { id: true, name: true }
  })
  const fieldMap = new Map(fields.map((f) => [f.id, f]))

  // Calculate profile completion rate
  const profileCompletionRate =
    totalStudents > 0 ? Math.round((studentsWithProfile / totalStudents) * 100) : 0

  return (
    <PageContainer>
      <PageHeader
        title="Analytics"
        icon={BarChart3}
        description="Platform insights, trends, and detailed statistics."
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Profile Completion %"
          value={profileCompletionRate}
          icon={Target}
          variant="horizontal"
          iconColor="green"
        />
        <StatCard
          title="Active Students"
          value={studentsWithProfile}
          icon={Users}
          variant="horizontal"
          iconColor="blue"
        />
        <StatCard
          title="Programs Available"
          value={totalPrograms}
          icon={BookOpen}
          variant="horizontal"
          iconColor="purple"
        />
        <StatCard
          title="Universities"
          value={totalUniversities}
          icon={GraduationCap}
          variant="horizontal"
          iconColor="amber"
        />
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Profile Completion Stats */}
        <InfoCard title="Student Profile Stats" icon={Users}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Total Students</span>
              <span className="text-sm font-medium">{totalStudents}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">With Complete Profile</span>
              <span className="text-sm font-medium">{studentsWithProfile}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Without Profile</span>
              <span className="text-sm font-medium">{totalStudents - studentsWithProfile}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Completion Rate</span>
              <span className="text-sm font-medium text-green-600">{profileCompletionRate}%</span>
            </div>
          </div>
        </InfoCard>

        {/* Platform Overview */}
        <InfoCard title="Platform Overview" icon={TrendingUp}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Programs per University</span>
              <span className="text-sm font-medium">
                {totalUniversities > 0 ? (totalPrograms / totalUniversities).toFixed(1) : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Schools with Coordinators</span>
              <span className="text-sm font-medium">
                {totalSchools > 0
                  ? `${Math.round((totalCoordinators / totalSchools) * 100)}%`
                  : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Student:Coordinator Ratio</span>
              <span className="text-sm font-medium">
                {totalCoordinators > 0 ? `${Math.round(totalStudents / totalCoordinators)}:1` : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Total Coordinators</span>
              <span className="text-sm font-medium">{totalCoordinators}</span>
            </div>
          </div>
        </InfoCard>
      </div>

      {/* Popular Destinations & Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Study Destinations */}
        <InfoCard title="Popular Study Destinations" icon={Globe}>
          {countryStats.length > 0 ? (
            <div className="space-y-3">
              {countryStats.map((stat, index) => {
                const country = countryMap.get(stat.countryId)
                if (!country) return null
                const percentage = Math.round((stat._count.id / totalUniversities) * 100)
                return (
                  <div key={stat.countryId} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                    <span className="text-lg">{country.flagEmoji}</span>
                    <span className="flex-1 text-sm font-medium truncate">{country.name}</span>
                    <span className="text-sm text-muted-foreground">{stat._count.id} unis</span>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No university data available yet.
            </p>
          )}
        </InfoCard>

        {/* Popular Fields of Study */}
        <InfoCard title="Popular Fields of Study" icon={MapPin}>
          {fieldStats.length > 0 ? (
            <div className="space-y-3">
              {fieldStats.map((stat, index) => {
                const field = fieldMap.get(stat.fieldOfStudyId)
                if (!field) return null
                const percentage = Math.round((stat._count.id / totalPrograms) * 100)
                return (
                  <div key={stat.fieldOfStudyId} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                    <span className="flex-1 text-sm font-medium truncate">{field.name}</span>
                    <span className="text-sm text-muted-foreground">{stat._count.id} programs</span>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No program data available yet.
            </p>
          )}
        </InfoCard>
      </div>

      {/* Coming Soon Section */}
      <div className="mt-8">
        <InfoCard title="Coming Soon">
          <div className="rounded-lg border border-dashed border-muted-foreground/25 p-6 text-center">
            <BarChart3 className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm mb-3">
              More detailed analytics features are in development
            </p>
            <ul className="text-xs text-muted-foreground/75 space-y-1">
              <li>• Interactive charts and graphs</li>
              <li>• Time-based trend analysis</li>
              <li>• Match success rates</li>
              <li>• User engagement metrics</li>
              <li>• Export reports to CSV/PDF</li>
            </ul>
          </div>
        </InfoCard>
      </div>
    </PageContainer>
  )
}
