import 'server-only'
import { prisma } from '@/lib/prisma'
import { transformStudent, type TransformableStudent } from '@/lib/matching/transformers'
import type { StudentProfile } from '@/lib/matching/types'
import { bestFitMode } from './search'
import type { ExploreViewer } from './types'

/**
 * Who Explore's fit is for (rebranding 2.3 decides where it is worked out): the student's
 * subjects and total, and the fields and countries Best fit puts first (MAINT_tasks.md 5.27),
 * read fresh with one narrow query on each search, so a change to the academic profile shows at
 * once. The programs' side comes from the search records the list fetches anyway
 * (lib/explore/fit.ts), never from the programs cache. Signed out, nothing is read.
 */

const STUDENT = {
  totalIBPoints: true,
  tokGrade: true,
  eeGrade: true,
  courses: {
    select: { level: true, grade: true, ibCourse: { select: { id: true, name: true } } }
  },
  preferredFields: { select: { id: true } },
  preferredCountries: { select: { id: true } }
} as const

function toStudent(profile: TransformableStudent | null): StudentProfile | null {
  if (!profile || profile.courses.length === 0 || profile.totalIBPoints === null) return null
  return transformStudent(profile)
}

/** The signed-in student's subjects, total, fields and countries, or null before grades. */
export async function exploreStudent(userId: string): Promise<StudentProfile | null> {
  return toStudent(await prisma.studentProfile.findUnique({ where: { userId }, select: STUDENT }))
}

/**
 * Who is looking, for the page itself: the subjects (for the switch and Best fit), the
 * profile's own choices (for the shortcuts and Best fit) and the shortlist, in the one read.
 */
export async function exploreViewer(
  userId: string
): Promise<{ viewer: ExploreViewer; student: StudentProfile | null }> {
  const profile = await prisma.studentProfile.findUnique({
    where: { userId },
    select: {
      ...STUDENT,
      savedPrograms: { select: { programId: true } }
    }
  })
  const student = toStudent(profile)
  const mode = bestFitMode()
  return {
    student,
    viewer: {
      signedIn: true,
      hasGrades: student !== null,
      total: profile?.totalIBPoints ?? null,
      fields: profile?.preferredFields.map((f) => f.id) ?? [],
      countries: profile?.preferredCountries.map((c) => c.id) ?? [],
      savedIds: profile?.savedPrograms.map((s) => s.programId) ?? [],
      bestFit: student && mode !== 'off' ? mode : null
    }
  }
}
