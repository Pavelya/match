/**
 * Admin Program Detail Page
 *
 * Shows program details with:
 * - Full information display
 * - Course requirements
 * - Edit and delete actions
 */

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  ArrowLeft,
  Pencil,
  BookOpen,
  Building2,
  GraduationCap,
  Globe,
  Clock,
  Target,
  ExternalLink
} from 'lucide-react'
import { ProgramDeleteButton } from '@/components/admin/programs/ProgramDeleteButton'

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
    <div className="p-8">
      {/* Back link */}
      <Link
        href="/admin/programs"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Programs
      </Link>

      {/* Header with Actions */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{program.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="inline-flex px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {program.degreeType}
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {program.duration}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/programs/${program.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-muted transition-colors"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
          <ProgramDeleteButton programId={program.id} programName={program.name} />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">About</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">{program.description}</p>
          </div>

          {/* Course Requirements */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">IB Course Requirements</h2>
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
                          <span className="font-medium text-foreground">
                            {reqs[0].ibCourse.name}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-muted rounded">
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
          </div>
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          {/* University */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">University</h2>
            <Link
              href={`/admin/universities/${program.university.id}`}
              className="flex items-center gap-3 hover:bg-muted/50 -mx-2 -my-1 px-2 py-1 rounded-lg transition-colors"
            >
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">{program.university.name}</p>
                <p className="text-sm text-muted-foreground">
                  {program.university.country.flagEmoji} {program.university.city},{' '}
                  {program.university.country.name}
                </p>
              </div>
            </Link>
          </div>

          {/* Field of Study */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Field of Study</h2>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
              <span className="text-foreground">{program.fieldOfStudy.name}</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Requirements</h2>
            <div className="space-y-4">
              {program.minIBPoints && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Target className="h-4 w-4" />
                    <span>Min IB Points</span>
                  </div>
                  <span className="font-medium text-foreground">{program.minIBPoints}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>Course Requirements</span>
                </div>
                <span className="font-medium text-foreground">
                  {program.courseRequirements.length}
                </span>
              </div>
            </div>
          </div>

          {/* Program URL */}
          {program.programUrl && (
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">External Link</h2>
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
            </div>
          )}

          {/* Saved Stats */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Statistics</h2>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Saved by students</span>
              <span className="font-medium text-foreground">{program._count.savedBy}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
