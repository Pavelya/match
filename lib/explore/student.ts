import 'server-only'
import { prisma } from '@/lib/prisma'
import { getCachedPrograms } from '@/lib/matching/program-cache'
import { transformProgram, transformStudent } from '@/lib/matching/transformers'
import type { StudentProfile } from '@/lib/matching/types'
import { programFit, type FitProgram } from './fit'
import type { ExploreFit, ExploreViewer } from './types'

/**
 * Where Explore's fit is worked out (rebranding 2.3 decides it): on the server, from one narrow
 * read of the student's subjects per search and the programs cache the matcher already uses.
 * The student's cached matches cover only programs in their fields and countries near their
 * total, and Explore lists every program, so each fit is worked out here. Signed out, nothing
 * is read.
 */

const SUBJECTS = {
  totalIBPoints: true,
  tokGrade: true,
  eeGrade: true,
  courses: {
    select: { level: true, grade: true, ibCourse: { select: { id: true, name: true } } }
  }
} as const

type Subjects = {
  totalIBPoints: number | null
  tokGrade: string | null
  eeGrade: string | null
  courses: { level: string; grade: number; ibCourse: { id: string; name: string } }[]
}

function toStudent(profile: Subjects | null): StudentProfile | null {
  if (!profile || profile.courses.length === 0 || profile.totalIBPoints === null) return null
  return transformStudent({ ...profile, preferredFields: [], preferredCountries: [] })
}

/** The signed-in student's subjects and total, or null before they add grades. */
export async function exploreStudent(userId: string): Promise<StudentProfile | null> {
  return toStudent(await prisma.studentProfile.findUnique({ where: { userId }, select: SUBJECTS }))
}

/**
 * Who is looking, for the page itself: the subjects (for the switch), the profile's own
 * choices (for the shortcuts) and the shortlist, in the one read.
 */
export async function exploreViewer(
  userId: string
): Promise<{ viewer: ExploreViewer; student: StudentProfile | null }> {
  const profile = await prisma.studentProfile.findUnique({
    where: { userId },
    select: {
      ...SUBJECTS,
      preferredFields: { select: { id: true } },
      preferredCountries: { select: { id: true } },
      savedPrograms: { select: { programId: true } }
    }
  })
  const student = toStudent(profile)
  return {
    student,
    viewer: {
      signedIn: true,
      hasGrades: student !== null,
      total: profile?.totalIBPoints ?? null,
      fields: profile?.preferredFields.map((f) => f.id) ?? [],
      countries: profile?.preferredCountries.map((c) => c.id) ?? [],
      savedIds: profile?.savedPrograms.map((s) => s.programId) ?? []
    }
  }
}

/**
 * The catalogue's requirements, kept for five minutes by each server instance. A student's
 * searches each need the fit, and the programs cache is a large read from Redis; five minutes
 * is well inside the 30 that a student's matches are cached for.
 */
const KEPT_FOR_MS = 5 * 60 * 1000
let kept: { at: number; programs: Promise<Map<string, FitProgram>> } | null = null

function fitPrograms(): Promise<Map<string, FitProgram>> {
  if (!kept || Date.now() - kept.at > KEPT_FOR_MS) {
    const programs = getCachedPrograms().then(
      (list) =>
        new Map(
          list.map((p) => [p.id, { requirements: transformProgram(p), minIBPoints: p.minIBPoints }])
        )
    )
    const entry = { at: Date.now(), programs }
    kept = entry
    // A failed read isn't kept
    programs.catch(() => {
      if (kept === entry) kept = null
    })
  }
  return kept.programs
}

/** The fit for each program; null for one the cache doesn't hold yet. */
export async function fitsFor(
  student: StudentProfile,
  programIds: readonly string[]
): Promise<Record<string, ExploreFit | null>> {
  const programs = await fitPrograms()
  return Object.fromEntries(
    programIds.map((id) => {
      const program = programs.get(id)
      return [id, program ? programFit(student, program) : null]
    })
  )
}

/** Whether the student meets every requirement of a program: "Only ones I qualify for". */
export async function qualifier(student: StudentProfile): Promise<(programId: string) => boolean> {
  const programs = await fitPrograms()
  const meets = new Set<string>()
  for (const [id, program] of programs) {
    if (programFit(student, program).status === 'meets') meets.add(id)
  }
  return (programId) => meets.has(programId)
}
