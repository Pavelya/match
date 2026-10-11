import 'server-only'
import { prisma } from '@/lib/prisma'
import { transformStudent } from '@/lib/matching/transformers'
import type { StudentProfile } from '@/lib/matching/types'
import type { ExploreViewer } from './types'

/**
 * Who Explore's fit is for (rebranding 2.3 decides where it is worked out): the student's
 * subjects and total, read fresh with one narrow query on each search, so a change to the
 * academic profile shows at once. The programs' side comes from the search records the list
 * fetches anyway (lib/explore/fit.ts), never from the programs cache. Signed out, nothing is
 * read.
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
