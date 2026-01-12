/**
 * Admin Analytics Page
 *
 * Platform analytics and statistics.
 * Shows detailed insights about platform usage and trends.
 *
 * Updated: 2026-01-11
 * - Renamed supply-side charts for clarity
 * - Added student preference analytics (demand-side)
 * - Replaced "Schools with Coordinators" with more relevant metrics
 * - Removed "Coming Soon" placeholder
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
  Building2,
  Heart,
  Bookmark
} from 'lucide-react'
import { PageContainer, PageHeader, StatCard, InfoCard } from '@/components/admin/shared'
import { SubjectGroupIcon } from '@/lib/icons'

export default async function AnalyticsPage() {
  // Fetch analytics data
  const [
    totalStudents,
    studentsWithProfile,
    totalPrograms,
    totalUniversities,
    totalCoordinators,
    // Supply-side: Universities per country
    universityCountryStats,
    // Supply-side: Programs per field
    programFieldStats,
    // Demand-side: Student country preferences
    studentCountryPreferences,
    // Demand-side: Student field preferences
    studentFieldPreferences,
    // Engagement: Saved programs count
    savedProgramsCount,
    // Engagement: Students with saves
    studentsWithSaves,
    // Average IB score
    avgIBScore,
    // Top IB courses
    topIBCourses
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.studentProfile.count(),
    prisma.academicProgram.count(),
    prisma.university.count(),
    prisma.coordinatorProfile.count(),
    // Supply-side: Universities grouped by country
    prisma.university.groupBy({
      by: ['countryId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10
    }),
    // Supply-side: Programs grouped by field
    prisma.academicProgram.groupBy({
      by: ['fieldOfStudyId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10
    }),
    // Demand-side: Countries that students prefer (via many-to-many relation)
    prisma.country.findMany({
      select: {
        id: true,
        name: true,
        flagEmoji: true,
        _count: {
          select: { interestedStudents: true }
        }
      },
      orderBy: {
        interestedStudents: { _count: 'desc' }
      },
      take: 10
    }),
    // Demand-side: Fields that students prefer (via many-to-many relation)
    prisma.fieldOfStudy.findMany({
      select: {
        id: true,
        name: true,
        iconName: true,
        _count: {
          select: { interestedStudents: true }
        }
      },
      orderBy: {
        interestedStudents: { _count: 'desc' }
      },
      take: 10
    }),
    // Saved programs total
    prisma.savedProgram.count(),
    // Students with at least one saved program
    prisma.studentProfile.count({
      where: {
        savedPrograms: { some: {} }
      }
    }),
    // Average IB score (only for students who have entered scores)
    prisma.studentProfile.aggregate({
      _avg: { totalIBPoints: true },
      where: { totalIBPoints: { not: null } }
    }),
    // Top IB courses selected by students
    prisma.iBCourse.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        group: true,
        _count: {
          select: { studentCourses: true }
        }
      },
      orderBy: {
        studentCourses: { _count: 'desc' }
      },
      take: 10
    })
  ])

  // Fetch country names for university distribution stats
  const uniCountryIds = universityCountryStats.map((c) => c.countryId)
  const uniCountries = await prisma.country.findMany({
    where: { id: { in: uniCountryIds } },
    select: { id: true, name: true, flagEmoji: true }
  })
  const uniCountryMap = new Map(uniCountries.map((c) => [c.id, c]))

  // Fetch field names for program distribution stats
  const programFieldIds = programFieldStats.map((f) => f.fieldOfStudyId)
  const programFields = await prisma.fieldOfStudy.findMany({
    where: { id: { in: programFieldIds } },
    select: { id: true, name: true }
  })
  const programFieldMap = new Map(programFields.map((f) => [f.id, f]))

  // Calculate metrics
  const profileCompletionRate =
    totalStudents > 0 ? Math.round((studentsWithProfile / totalStudents) * 100) : 0

  const avgScore = avgIBScore._avg.totalIBPoints
    ? Math.round(avgIBScore._avg.totalIBPoints * 10) / 10
    : null

  const engagementRate =
    studentsWithProfile > 0 ? Math.round((studentsWithSaves / studentsWithProfile) * 100) : 0

  // Filter student preferences to only show those with selections
  const activeStudentCountryPrefs = studentCountryPreferences.filter(
    (c) => c._count.interestedStudents > 0
  )
  const activeStudentFieldPrefs = studentFieldPreferences.filter(
    (f) => f._count.interestedStudents > 0
  )

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

      {/* Profile & Platform Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Student Profile Stats */}
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

        {/* Platform Overview - Updated metrics */}
        <InfoCard title="Platform Overview" icon={TrendingUp}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Programs per University</span>
              <span className="text-sm font-medium">
                {totalUniversities > 0 ? (totalPrograms / totalUniversities).toFixed(1) : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Average IB Score</span>
              <span className="text-sm font-medium">{avgScore ? `${avgScore} pts` : '—'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Student:Coordinator Ratio</span>
              <span className="text-sm font-medium">
                {totalCoordinators > 0 ? `${Math.round(totalStudents / totalCoordinators)}:1` : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Engagement Rate</span>
              <span className="text-sm font-medium text-blue-600">{engagementRate}%</span>
            </div>
          </div>
        </InfoCard>
      </div>

      {/* Student Preferences Section (Demand-Side) */}
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Heart className="h-5 w-5 text-rose-500" />
        Student Preferences
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Popular Fields of Study (Student Selections) */}
        <InfoCard title="Popular Fields of Study" icon={BookOpen}>
          {activeStudentFieldPrefs.length > 0 ? (
            <div className="space-y-3">
              {activeStudentFieldPrefs.map((field, index) => {
                const maxCount = activeStudentFieldPrefs[0]?._count.interestedStudents || 1
                const percentage = Math.round((field._count.interestedStudents / maxCount) * 100)
                return (
                  <div key={field.id} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                    <span className="flex-1 text-sm font-medium truncate">{field.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {field._count.interestedStudents} students
                    </span>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-pink-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No student field preferences recorded yet.
            </p>
          )}
        </InfoCard>

        {/* Popular Study Destinations (Student Preferences) */}
        <InfoCard title="Popular Study Destinations" icon={Globe}>
          {activeStudentCountryPrefs.length > 0 ? (
            <div className="space-y-3">
              {activeStudentCountryPrefs.map((country, index) => {
                const maxCount = activeStudentCountryPrefs[0]?._count.interestedStudents || 1
                const percentage = Math.round((country._count.interestedStudents / maxCount) * 100)
                return (
                  <div key={country.id} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                    <span className="text-lg">{country.flagEmoji}</span>
                    <span className="flex-1 text-sm font-medium truncate">{country.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {country._count.interestedStudents} students
                    </span>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No student destination preferences recorded yet.
            </p>
          )}
        </InfoCard>
      </div>

      {/* IB Course Distribution */}
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-green-500" />
        IB Course Distribution
      </h2>
      <div className="grid grid-cols-1 gap-6 mb-8">
        <InfoCard title="Top IB Courses Selected by Students" icon={GraduationCap}>
          {topIBCourses.filter((c) => c._count.studentCourses > 0).length > 0 ? (
            <div className="space-y-3">
              {topIBCourses
                .filter((course) => course._count.studentCourses > 0)
                .map((course, index) => {
                  const maxCount = topIBCourses[0]?._count.studentCourses || 1
                  const percentage = Math.round((course._count.studentCourses / maxCount) * 100)
                  return (
                    <div key={course.id} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                      <SubjectGroupIcon
                        groupId={course.group}
                        className="h-4 w-4 text-muted-foreground"
                      />
                      <span className="flex-1 text-sm font-medium truncate">{course.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {course._count.studentCourses} students
                      </span>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No student course data available yet.
            </p>
          )}
        </InfoCard>
      </div>

      {/* Supply-Side Distribution (Programs & Universities) */}
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Building2 className="h-5 w-5 text-primary" />
        Platform Distribution
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Program Distribution by Field */}
        <InfoCard title="Program Distribution by Field" icon={BookOpen}>
          {programFieldStats.length > 0 ? (
            <div className="space-y-3">
              {programFieldStats.map((stat, index) => {
                const field = programFieldMap.get(stat.fieldOfStudyId)
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

        {/* University Distribution by Location */}
        <InfoCard title="University Distribution by Location" icon={Globe}>
          {universityCountryStats.length > 0 ? (
            <div className="space-y-3">
              {universityCountryStats.map((stat, index) => {
                const country = uniCountryMap.get(stat.countryId)
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
      </div>

      {/* Student Engagement Section */}
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Bookmark className="h-5 w-5 text-amber-500" />
        Student Engagement
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title="Saved Programs" icon={Bookmark}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Total Programs Saved</span>
              <span className="text-sm font-medium">{savedProgramsCount}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Students with Saves</span>
              <span className="text-sm font-medium">{studentsWithSaves}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Avg Saves per Student</span>
              <span className="text-sm font-medium">
                {studentsWithSaves > 0 ? (savedProgramsCount / studentsWithSaves).toFixed(1) : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Engagement Rate</span>
              <span className="text-sm font-medium text-amber-600">{engagementRate}%</span>
            </div>
          </div>
        </InfoCard>
      </div>
    </PageContainer>
  )
}
