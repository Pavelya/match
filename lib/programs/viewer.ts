import 'server-only'
import { prisma } from '@/lib/prisma'
import { transformStudent } from '@/lib/matching/transformers'
import type { StudentProfile } from '@/lib/matching/types'

/**
 * The signed-in student a program page is for (rebranding 2.4): their subjects, total and
 * choices, which the fit is worked out from, and whether this program is on their shortlist. One
 * narrow read. It replaces today's two: the whole profile with every course and choice included,
 * and the call the page made from the browser for the whole shortlist.
 */
export async function programViewer(
  userId: string,
  programId: string
): Promise<{ student: StudentProfile | null; saved: boolean }> {
  const profile = await prisma.studentProfile.findUnique({
    where: { userId },
    select: {
      totalIBPoints: true,
      tokGrade: true,
      eeGrade: true,
      courses: {
        select: { level: true, grade: true, ibCourse: { select: { id: true, name: true } } }
      },
      preferredFields: { select: { id: true } },
      preferredCountries: { select: { id: true } },
      savedPrograms: { where: { programId }, select: { programId: true } }
    }
  })
  // Grades are the subjects and the total; until both are in, there is nothing to check
  const graded = profile && profile.courses.length > 0 && profile.totalIBPoints !== null
  return {
    student: graded ? transformStudent(profile) : null,
    saved: (profile?.savedPrograms.length ?? 0) > 0
  }
}
