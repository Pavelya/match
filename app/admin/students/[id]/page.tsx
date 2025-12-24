/**
 * Admin Student Detail Page
 *
 * Shows student details with two-column layout:
 * - Left (2/3): Profile info, IB Courses, Preferences
 * - Right (1/3): Account Info, School Info
 */

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  BookOpen,
  Globe,
  Bookmark,
  Award,
  Target
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  PageContainer,
  PageHeader,
  DetailPageLayout,
  InfoCard,
  InfoRow,
  QuickStat,
  Breadcrumbs
} from '@/components/admin/shared'
import { StudentDetailActions } from '@/components/admin/students/StudentDetailActions'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function StudentDetailPage({ params }: PageProps) {
  const { id } = await params

  // id can be either userId or profileId, try both
  const student = await prisma.user.findUnique({
    where: { id, role: 'STUDENT' },
    include: {
      studentProfile: {
        include: {
          school: {
            include: {
              country: true
            }
          },
          courses: {
            include: {
              ibCourse: true
            },
            orderBy: [{ level: 'asc' }, { ibCourse: { group: 'asc' } }]
          },
          preferredFields: true,
          preferredCountries: true,
          savedPrograms: {
            include: {
              program: {
                include: {
                  university: true
                }
              }
            },
            take: 5
          }
        }
      }
    }
  })

  if (!student) {
    notFound()
  }

  const profile = student.studentProfile
  const hasProfile = !!profile

  // Calculate IB points from courses if available
  const hlCourses = profile?.courses.filter((c) => c.level === 'HL') || []
  const slCourses = profile?.courses.filter((c) => c.level === 'SL') || []

  return (
    <PageContainer>
      <PageHeader
        backHref="/admin/students"
        backLabel="Back to Students"
        title={student.name || 'Unnamed Student'}
        icon={User}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Students', href: '/admin/students' },
          { label: student.name || student.email }
        ]}
        className="mb-6 -mt-4"
      />

      {/* Student Info Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Avatar */}
        {student.image ? (
          <Image
            src={student.image}
            alt={student.name || 'Student'}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <User className="h-6 w-6" />
          </div>
        )}

        {/* Status Badges */}
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full',
            hasProfile ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          )}
        >
          {hasProfile ? 'Profile Complete' : 'No Profile'}
        </span>

        {profile?.school && (
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <GraduationCap className="h-4 w-4" />
            <span className="mr-1">{profile.school.country.flagEmoji}</span>
            {profile.school.name}
          </div>
        )}

        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <Mail className="h-4 w-4" />
          {student.email}
        </div>
      </div>

      <DetailPageLayout
        sidebar={
          <>
            {/* Account Info Card */}
            <InfoCard title="Account Info" icon={Calendar} padding="compact">
              <InfoRow label="User ID" value={student.id} copyable />
              <InfoRow label="Email" value={student.email} />
              <InfoRow
                label="Joined"
                value={student.createdAt.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              />
              <InfoRow label="Profile Status" value={hasProfile ? 'Complete' : 'Not Created'} />
            </InfoCard>

            {/* School Info Card */}
            {profile?.school && (
              <InfoCard title="School" icon={GraduationCap} padding="compact">
                <InfoRow label="Name" value={profile.school.name} />
                <InfoRow
                  label="Location"
                  value={`${profile.school.city}, ${profile.school.country.name}`}
                />
                <InfoRow label="Tier" value={profile.school.subscriptionTier} />
                <Link
                  href={`/admin/schools/${profile.school.id}`}
                  className="mt-2 text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  View School Details →
                </Link>
              </InfoCard>
            )}

            {/* Quick Stats Card */}
            {hasProfile && (
              <InfoCard title="Quick Stats" icon={Target}>
                <div className="grid grid-cols-2 gap-3">
                  <QuickStat label="IB Points" value={profile.totalIBPoints ?? '—'} />
                  <QuickStat label="Courses" value={profile.courses.length} />
                  <QuickStat label="Saved Programs" value={profile.savedPrograms.length} />
                  <QuickStat
                    label="Preferred Countries"
                    value={profile.preferredCountries.length}
                  />
                </div>
              </InfoCard>
            )}

            {/* Danger Zone - Delete Account */}
            <StudentDetailActions
              studentId={student.id}
              studentName={student.name}
              studentEmail={student.email}
            />
          </>
        }
      >
        {/* Profile Info */}
        {hasProfile ? (
          <>
            {/* IB Scores Overview */}
            <InfoCard title="IB Academic Profile" icon={Award}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">
                    {profile.totalIBPoints ?? '—'}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">
                    {profile.tokGrade ?? '—'}
                  </div>
                  <div className="text-xs text-muted-foreground">TOK Grade</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{profile.eeGrade ?? '—'}</div>
                  <div className="text-xs text-muted-foreground">EE Grade</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">
                    {hlCourses.length}/{slCourses.length}
                  </div>
                  <div className="text-xs text-muted-foreground">HL/SL Courses</div>
                </div>
              </div>
            </InfoCard>

            {/* IB Courses */}
            {profile.courses.length > 0 && (
              <InfoCard title="IB Courses" icon={BookOpen}>
                <div className="divide-y">
                  {profile.courses.map((course) => (
                    <div key={course.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            'px-2 py-0.5 text-xs font-medium rounded',
                            course.level === 'HL'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                          )}
                        >
                          {course.level}
                        </span>
                        <div>
                          <div className="text-sm font-medium">{course.ibCourse.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Group {course.ibCourse.group} • {course.ibCourse.code}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-foreground">{course.grade}</div>
                    </div>
                  ))}
                </div>
              </InfoCard>
            )}

            {/* Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preferred Fields */}
              <InfoCard title="Preferred Fields" icon={Target}>
                {profile.preferredFields.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.preferredFields.map((field) => (
                      <span key={field.id} className="px-3 py-1.5 text-sm bg-muted rounded-full">
                        {field.iconName} {field.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No preferred fields selected.</p>
                )}
              </InfoCard>

              {/* Preferred Countries */}
              <InfoCard title="Preferred Countries" icon={Globe}>
                {profile.preferredCountries.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.preferredCountries.map((country) => (
                      <span key={country.id} className="px-3 py-1.5 text-sm bg-muted rounded-full">
                        {country.flagEmoji} {country.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No preferred countries selected.</p>
                )}
              </InfoCard>
            </div>

            {/* Saved Programs */}
            {profile.savedPrograms.length > 0 && (
              <InfoCard title="Saved Programs" icon={Bookmark}>
                <div className="divide-y">
                  {profile.savedPrograms.map((saved) => (
                    <div key={saved.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{saved.program.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {saved.program.university.name}
                        </div>
                      </div>
                      <Link
                        href={`/admin/programs/${saved.program.id}`}
                        className="text-sm text-primary hover:underline"
                      >
                        View →
                      </Link>
                    </div>
                  ))}
                </div>
              </InfoCard>
            )}
          </>
        ) : (
          <InfoCard title="Profile Status">
            <div className="text-center py-12">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Profile Created</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                This student has not completed their profile yet. They will need to go through the
                onboarding process to add their IB courses and preferences.
              </p>
            </div>
          </InfoCard>
        )}
      </DetailPageLayout>
    </PageContainer>
  )
}
