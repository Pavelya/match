import 'server-only'
import { prisma } from '@/lib/prisma'

/**
 * The profile first run reads (rebranding 3.1): the choices and grades the steps open on, and
 * whether first run is finished. One read, as today's page makes, but a select where it
 * includes every column.
 */
export const firstRunProfile = (userId: string) =>
  prisma.studentProfile.findUnique({
    where: { userId },
    select: {
      totalIBPoints: true,
      tokGrade: true,
      eeGrade: true,
      openToAllLocations: true,
      preferredFields: { select: { id: true } },
      preferredCountries: { select: { id: true } },
      courses: {
        select: { level: true, grade: true, ibCourse: { select: { id: true, name: true } } }
      }
    }
  })
