import 'server-only'
import { cache } from 'react'
import { prisma } from '@/lib/prisma'

// One read per render, shared by generateMetadata and the page: React's cache
// memoises it for the rest of the request. Selected, not included - `include`
// returned every University column, and University.logo can hold an inline
// base64 image (365KB for Toronto), so every render of one of its programs moved
// that logo twice without ever showing it. Keep this to the fields the pages read.
export const getProgram = cache((id: string) =>
  prisma.academicProgram.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      degreeType: true,
      duration: true,
      campusCity: true,
      minIBPoints: true,
      programUrl: true,
      requirementsEntryYear: true,
      university: {
        select: {
          id: true,
          name: true,
          abbreviatedName: true,
          image: true,
          imageCredit: true,
          city: true,
          websiteUrl: true,
          // Display only, for a program with no IB minimum (rebranding 2.4)
          admitRate: true,
          internationalAdmitRate: true,
          admitRateYear: true,
          country: {
            select: { id: true, name: true, code: true, flagEmoji: true }
          }
        }
      },
      fieldOfStudy: {
        select: { id: true, name: true, iconName: true, description: true }
      },
      courseRequirements: {
        select: {
          id: true,
          requiredLevel: true,
          minGrade: true,
          isCritical: true,
          orGroupId: true,
          ownCourse: true,
          ibCourse: {
            select: { id: true, name: true, code: true, group: true }
          }
        }
      }
    }
  })
)

/** A program as its page reads it, in either design */
export type ProgramPageData = NonNullable<Awaited<ReturnType<typeof getProgram>>>
