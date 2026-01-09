/**
 * Coordinator Student Detail Page
 *
 * Shows full student details for coordinators:
 * - Sidebar: Quick stats (IB Points, TOK, EE, Courses count), Preferences summary
 * - Main: IB Courses table, Top Matches preview, Saved Programs
 *
 * Access Control: Only shows if student has given consent (coordinatorAccessConsentAt is set)
 *
 * Part of Task 4.6.2: Build student detail page
 */

import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { getCoordinatorAccess } from '@/lib/auth/access-control'
import { getCachedMatches } from '@/lib/matching'
import { getCachedPrograms } from '@/lib/matching/program-cache'
import {
  transformStudent,
  transformPrograms,
  type PrismaStudentWithRelations
} from '@/lib/matching/transformers'
import {
  PageContainer,
  PageHeader,
  DetailPageLayout,
  InfoCard,
  QuickStat,
  Breadcrumbs
} from '@/components/admin/shared'
import {
  User,
  Pencil,
  Target,
  BookOpen,
  Globe,
  GraduationCap,
  Bookmark,
  LineChart,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  ExternalLink
} from 'lucide-react'
import { getAvatarColor } from '@/lib/avatar-utils'
import { cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function StudentDetailPage({ params }: PageProps) {
  const { id } = await params

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

  // Fetch student with full profile data
  const student = await prisma.studentProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true
        }
      },
      courses: {
        include: {
          ibCourse: true
        },
        orderBy: { ibCourse: { group: 'asc' } }
      },
      preferredFields: {
        select: {
          id: true,
          name: true,
          iconName: true
        }
      },
      preferredCountries: {
        select: {
          id: true,
          name: true,
          flagEmoji: true
        }
      },
      savedPrograms: {
        include: {
          program: {
            include: {
              university: {
                select: {
                  name: true,
                  logo: true
                }
              },
              fieldOfStudy: {
                select: { name: true }
              }
            }
          }
        },
        take: 5,
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  // Check if student exists and belongs to this school
  if (!student || student.schoolId !== school.id) {
    notFound()
  }

  // Access control: Only show if student has given consent
  const hasConsent = student.coordinatorAccessConsentAt !== null

  // Calculate total course points
  const totalCoursePoints = student.courses.reduce((sum, c) => sum + c.grade, 0)

  // Group courses by IB group
  const coursesByGroup: Record<number, typeof student.courses> = {}
  student.courses.forEach((course) => {
    const group = course.ibCourse.group
    if (!coursesByGroup[group]) coursesByGroup[group] = []
    coursesByGroup[group].push(course)
  })

  const groupNames: Record<number, string> = {
    1: 'Language & Literature',
    2: 'Language Acquisition',
    3: 'Individuals & Societies',
    4: 'Sciences',
    5: 'Mathematics',
    6: 'The Arts'
  }

  // Fetch matches if coordinator has full access and student has consent
  let topMatches: Array<{
    programId: string
    overallScore: number
    program: {
      id: string
      name: string
      university: { name: string; image: string | null }
      fieldOfStudy: { name: string }
    } | null
  }> = []

  if (hasConsent && access.hasFullAccess) {
    try {
      const allPrograms = await getCachedPrograms()
      // Cast student to expected type - the matching algorithm only needs the common fields
      const transformedStudent = transformStudent(student as unknown as PrismaStudentWithRelations)
      const transformedPrograms = transformPrograms(allPrograms)
      const matches = await getCachedMatches(
        student.userId,
        transformedStudent,
        transformedPrograms,
        'BALANCED'
      )

      const programMap = new Map(allPrograms.map((p) => [p.id, p]))
      topMatches = matches.slice(0, 3).map((match) => {
        const program = programMap.get(match.programId)
        return {
          programId: match.programId,
          overallScore: match.overallScore,
          program: program
            ? {
                id: program.id,
                name: program.name,
                university: {
                  name: program.university.name,
                  image: program.university.image
                },
                fieldOfStudy: {
                  name: program.fieldOfStudy.name
                }
              }
            : null
        }
      })
    } catch {
      // Silently fail - matches preview is optional
      topMatches = []
    }
  }

  return (
    <PageContainer>
      {/* Breadcrumbs - using showHome=false to customize root */}
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/coordinator/dashboard' },
          { label: 'Students', href: '/coordinator/students' },
          { label: student.user.name || student.user.email }
        ]}
        showHome={false}
        className="mb-6"
      />

      <PageHeader
        backHref="/coordinator/students"
        backLabel="Back to Students"
        title={student.user.name || 'Student Profile'}
        icon={User}
        actions={
          hasConsent && access.canEditStudentData
            ? [
                {
                  label: 'Edit Profile',
                  href: `/coordinator/students/${student.id}/edit`,
                  icon: Pencil,
                  variant: 'primary'
                }
              ]
            : []
        }
      />

      {/* Student Info Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6 -mt-4">
        <div className="flex items-center gap-3">
          {student.user.image ? (
            <Image
              src={student.user.image}
              alt={student.user.name || 'Student'}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-white text-lg font-medium"
              style={{ backgroundColor: getAvatarColor(student.user.email) }}
            >
              {(student.user.name || student.user.email).charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className="text-sm text-muted-foreground">{student.user.email}</div>
          </div>
        </div>

        {/* Consent Badge */}
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full',
            hasConsent ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          )}
        >
          {hasConsent ? (
            <>
              <CheckCircle2 className="h-3 w-3" />
              Consented
            </>
          ) : (
            <>
              <AlertCircle className="h-3 w-3" />
              Consent Pending
            </>
          )}
        </span>
      </div>

      {/* Main Content - Only shown if consent given */}
      {!hasConsent ? (
        <InfoCard title="Access Restricted" icon={AlertCircle}>
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Consent Required</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              This student has not yet provided consent for coordinators to view their academic
              data. Once they accept the invitation and consent, you&apos;ll be able to see their
              full profile.
            </p>
          </div>
        </InfoCard>
      ) : (
        <DetailPageLayout
          sidebar={
            <>
              {/* Quick Stats Card */}
              <InfoCard title="Quick Stats" icon={Target} padding="compact">
                <div className="space-y-1">
                  <QuickStat
                    label="Total IB Points"
                    value={student.totalIBPoints ?? '—'}
                    icon={<Target className="h-4 w-4" />}
                  />
                  <QuickStat
                    label="TOK Grade"
                    value={student.tokGrade ?? '—'}
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <QuickStat
                    label="EE Grade"
                    value={student.eeGrade ?? '—'}
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <QuickStat
                    label="Courses"
                    value={student.courses.length}
                    icon={<GraduationCap className="h-4 w-4" />}
                  />
                  <QuickStat
                    label="Course Points"
                    value={totalCoursePoints > 0 ? totalCoursePoints : '—'}
                    icon={<Target className="h-4 w-4" />}
                  />
                </div>
              </InfoCard>

              {/* Preferences Card */}
              <InfoCard title="Preferences" icon={Globe} padding="compact">
                <div className="space-y-4">
                  {/* Fields of Study */}
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Fields of Study</div>
                    {student.preferredFields.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {student.preferredFields.map((field) => (
                          <span
                            key={field.id}
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-muted text-sm font-medium"
                          >
                            {field.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not set</span>
                    )}
                  </div>

                  {/* Countries */}
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Preferred Countries</div>
                    {student.preferredCountries.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {student.preferredCountries.map((country) => (
                          <span
                            key={country.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm font-medium"
                          >
                            <span>{country.flagEmoji}</span>
                            {country.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not set</span>
                    )}
                  </div>
                </div>
              </InfoCard>
            </>
          }
        >
          {/* IB Courses Card */}
          <InfoCard
            title="IB Courses"
            icon={BookOpen}
            action={
              access.canEditStudentData
                ? {
                    label: 'Edit',
                    href: `/coordinator/students/${student.id}/edit`,
                    icon: Pencil
                  }
                : undefined
            }
          >
            {student.courses.length > 0 ? (
              <div className="space-y-4">
                {Object.entries(coursesByGroup).map(([group, courses]) => (
                  <div key={group}>
                    <div className="text-xs font-medium text-muted-foreground mb-2">
                      Group {group}: {groupNames[parseInt(group)] || 'Other'}
                    </div>
                    <div className="space-y-2">
                      {courses.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50"
                        >
                          <div>
                            <span className="text-sm font-medium">{course.ibCourse.name}</span>
                            <span
                              className={cn(
                                'ml-2 text-xs px-1.5 py-0.5 rounded font-medium',
                                course.level === 'HL'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-600'
                              )}
                            >
                              {course.level}
                            </span>
                          </div>
                          <span className="text-sm font-bold">{course.grade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No courses added yet</p>
                {access.canEditStudentData && (
                  <Link
                    href={`/coordinator/students/${student.id}/edit`}
                    className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline"
                  >
                    <Pencil className="h-3 w-3" />
                    Add courses
                  </Link>
                )}
              </div>
            )}
          </InfoCard>

          {/* Top Matches Preview */}
          <InfoCard
            title="Top Matches"
            icon={LineChart}
            action={
              access.hasFullAccess
                ? {
                    label: 'View All',
                    href: `/coordinator/students/${student.id}/matches`
                  }
                : undefined
            }
          >
            {access.hasFullAccess ? (
              topMatches.length > 0 ? (
                <div className="divide-y">
                  {topMatches.map((match) => {
                    if (!match.program) return null
                    return (
                      <Link
                        key={match.programId}
                        href={`/programs/${match.programId}`}
                        className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-colors"
                      >
                        {match.program.university.image ? (
                          <Image
                            src={match.program.university.image}
                            alt={match.program.university.name}
                            width={40}
                            height={40}
                            className="rounded-lg object-contain"
                            unoptimized
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                            <GraduationCap className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">
                            {match.program.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {match.program.university.name}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                          <TrendingUp className="h-3.5 w-3.5" />
                          {Math.round(match.overallScore * 100)}%
                        </div>
                      </Link>
                    )
                  })}
                  <div className="pt-3">
                    <Link
                      href={`/coordinator/students/${student.id}/matches`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      View all matches
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <LineChart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-3">
                    No matches found. Ensure the student has completed their profile.
                  </p>
                  <Link
                    href={`/coordinator/students/${student.id}/matches`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    <LineChart className="h-4 w-4" />
                    View Matches
                  </Link>
                </div>
              )
            ) : (
              <div className="text-center py-6">
                <LineChart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Upgrade to VIP to view student matches
                </p>
              </div>
            )}
          </InfoCard>

          {/* Saved Programs */}
          <InfoCard title="Saved Programs" icon={Bookmark}>
            {student.savedPrograms.length > 0 ? (
              <div className="divide-y">
                {student.savedPrograms.map((saved) => (
                  <div key={saved.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      {saved.program.university.logo ? (
                        <Image
                          src={saved.program.university.logo}
                          alt={saved.program.university.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-contain"
                          unoptimized
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {saved.program.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {saved.program.university.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {saved.program.fieldOfStudy.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Bookmark className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No saved programs yet</p>
              </div>
            )}
          </InfoCard>
        </DetailPageLayout>
      )}
    </PageContainer>
  )
}
