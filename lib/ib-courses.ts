import { prisma } from '@/lib/prisma'

/**
 * The IB course with this name, ignoring case and surrounding spaces, other than
 * `exceptId`. The admin course routes refuse a second course of the same name: a duplicate
 * "Geography" under another code splits students from the requirements written against the
 * first (content task 3.5).
 */
export function findCourseByName(name: string, exceptId?: string) {
  return prisma.iBCourse.findFirst({
    where: {
      name: { equals: name.trim(), mode: 'insensitive' },
      ...(exceptId && { id: { not: exceptId } })
    },
    select: { code: true }
  })
}
