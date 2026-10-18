/**
 * The diploma check both profile APIs run on grades they are about to store. It names each
 * subject from the cached IB course list, so a reason reads as the forms show it ("you have a 1 in
 * Physics"), and refuses a subject that isn't on the list rather than failing on its foreign key.
 * The list is the one onboarding reads, cached for an hour and refreshed whenever an admin changes
 * a course, so this adds no database read.
 */

import { getCachedIBCourses } from '@/lib/reference-data'
import { checkDiploma, type DiplomaCheck } from './diploma'

export interface CourseToSave {
  courseId: string
  level: string
  grade: number
}

export const NOT_AN_IB_SUBJECT = 'Choose every subject from the list of IB subjects.'

export async function checkGradesToSave(
  courses: CourseToSave[] | undefined,
  tokGrade: string | null | undefined,
  eeGrade: string | null | undefined
): Promise<DiplomaCheck> {
  const sent = Array.isArray(courses) ? courses : []
  const names = new Map((await getCachedIBCourses()).map((course) => [course.id, course.name]))
  if (sent.some((course) => !names.has(course?.courseId))) {
    return { reasons: [NOT_AN_IB_SUBJECT], conditions: [], total: null }
  }
  return checkDiploma(
    sent.map(({ courseId, level, grade }) => ({
      courseId,
      courseName: names.get(courseId)!,
      level,
      grade
    })),
    tokGrade,
    eeGrade
  )
}
