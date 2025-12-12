/**
 * Admin Program Detail Page
 *
 * Shows program details with two-column layout:
 * - Left (2/3): About, Course Requirements
 * - Right (1/3): University, Field of Study, Requirements, Stats
 */

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  Pencil,
  BookOpen,
  Building2,
  GraduationCap,
  Globe,
  Clock,
  Target,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProgramDeleteButton } from '@/components/admin/programs/ProgramDeleteButton'
import {
  PageContainer,
  PageHeader,
  DetailPageLayout,
  InfoCard,
  Breadcrumbs
} from '@/components/admin/shared'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { id } = await params

  const program = await prisma.academicProgram.findUnique({
    where: { id },
    include: {
      university: { include: { country: true } },
      fieldOfStudy: true,
      courseRequirements: {
        include: { ibCourse: true },
        orderBy: [{ orGroupId: 'asc' }, { ibCourse: { name: 'asc' } }]
      },
      _count: {
        select: { savedBy: true }
      }
    }
  })

  if (!program) {
    notFound()
  }

  // Group requirements by orGroupId for display
  const groupedRequirements: Record<string, typeof program.courseRequirements> = {}
  program.courseRequirements.forEach((req) => {
    const key = req.orGroupId || req.id // Standalone requirements use their own ID
    if (!groupedRequirements[key]) {
      groupedRequirements[key] = []
    }
    groupedRequirements[key].push(req)
  })

  return (
    <PageContainer>
      <PageHeader
        backHref="/admin/programs"
        backLabel="Back to Programs"
        title={program.name}
        icon={BookOpen}
        actions={[
          {
            label: 'Edit',
            href: `/admin/programs/${program.id}/edit`,
            icon: Pencil,
            variant: 'primary'
          }
        ]}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Programs', href: '/admin/programs' }, { label: program.name }]}
        className="mb-6 -mt-4"
      />

      {/* Program Info Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span className="inline-flex px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
          {program.degreeType}
        </span>
        <span className="text-muted-foreground flex items-center gap-1 text-sm">
          <Clock className="h-4 w-4" />
          {program.duration}
        </span>
        {program.minIBPoints && (
          <span className="text-muted-foreground flex items-center gap-1 text-sm">
            <Target className="h-4 w-4" />
            Min {program.minIBPoints} IB Points
          </span>
        )}
      </div>

      <DetailPageLayout
        sidebar={
          <>
            {/* University */}
            <InfoCard title="University" icon={Building2} padding="compact">
              <Link
                href={`/admin/universities/${program.university.id}`}
                className="flex items-center gap-3 hover:bg-muted/50 -mx-2 -my-1 px-2 py-1 rounded-lg transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{program.university.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {program.university.country.flagEmoji} {program.university.city},{' '}
                    {program.university.country.name}
                  </p>
                </div>
              </Link>
            </InfoCard>

            {/* Field of Study */}
            <InfoCard title="Field of Study" icon={GraduationCap} padding="compact">
              <div className="flex items-center gap-3">
                <span className="text-foreground">{program.fieldOfStudy.name}</span>
              </div>
            </InfoCard>

            {/* Quick Stats */}
            <InfoCard title="Requirements & Stats" icon={Target} padding="compact">
              <div className="space-y-3">
                {program.minIBPoints && (
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-muted-foreground">Min IB Points</span>
                    <span className="text-sm font-medium">{program.minIBPoints}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-muted-foreground">Course Requirements</span>
                  <span className="text-sm font-medium">{program.courseRequirements.length}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-muted-foreground">Saved by students</span>
                  <span className="text-sm font-medium">{program._count.savedBy}</span>
                </div>
              </div>
            </InfoCard>

            {/* Program URL */}
            {program.programUrl && (
              <InfoCard title="External Link" icon={Globe} padding="compact">
                <a
                  href={program.programUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  View Program Page
                  <ExternalLink className="h-3 w-3" />
                </a>
              </InfoCard>
            )}

            {/* Danger Zone */}
            <InfoCard title="Danger Zone" padding="compact">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Delete Program</p>
                  <p className="text-xs text-muted-foreground">This action cannot be undone</p>
                </div>
                <ProgramDeleteButton programId={program.id} programName={program.name} />
              </div>
            </InfoCard>
          </>
        }
      >
        {/* Description */}
        <InfoCard title="About" icon={BookOpen}>
          <p className="text-muted-foreground whitespace-pre-wrap">{program.description}</p>
        </InfoCard>

        {/* Course Requirements */}
        <InfoCard title="IB Course Requirements" icon={BookOpen}>
          {program.courseRequirements.length === 0 ? (
            <p className="text-muted-foreground">No specific course requirements defined.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedRequirements).map(([groupId, reqs]) => (
                <div key={groupId} className="border rounded-lg p-4">
                  {reqs.length > 1 ? (
                    <>
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        One of the following (OR):
                      </p>
                      <div className="space-y-2">
                        {reqs.map((req) => (
                          <div
                            key={req.id}
                            className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">
                                {req.ibCourse.name}
                              </span>
                              <span className="text-xs px-2 py-0.5 bg-background rounded">
                                {req.requiredLevel}
                              </span>
                              {req.isCritical && (
                                <span className="text-xs px-2 py-0.5 bg-destructive/10 text-destructive rounded">
                                  Critical
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              Min grade: {req.minGrade}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{reqs[0].ibCourse.name}</span>
                        <span
                          className={cn(
                            'text-xs px-2 py-0.5 rounded',
                            reqs[0].requiredLevel === 'HL'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                          )}
                        >
                          {reqs[0].requiredLevel}
                        </span>
                        {reqs[0].isCritical && (
                          <span className="text-xs px-2 py-0.5 bg-destructive/10 text-destructive rounded">
                            Critical
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Min grade: {reqs[0].minGrade}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </InfoCard>
      </DetailPageLayout>
    </PageContainer>
  )
}
