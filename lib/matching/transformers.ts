/**
 * Type Transformers for Matching Algorithm
 *
 * Converts Prisma database types to the matching algorithm's expected types.
 * This ensures type safety without using 'as any' workarounds.
 */

import type { Prisma } from '@prisma/client'
import type {
  StudentProfile,
  ProgramRequirements,
  StudentCourse,
  SubjectRequirement
} from './types'

/**
 * Prisma types with all necessary relations included
 */
export type PrismaStudentWithRelations = Prisma.StudentProfileGetPayload<{
  include: {
    courses: {
      include: {
        ibCourse: true
      }
    }
    preferredFields: true
    preferredCountries: true
  }
}>

export type PrismaProgramWithRelations = Prisma.AcademicProgramGetPayload<{
  include: {
    university: {
      include: {
        country: true
      }
    }
    fieldOfStudy: true
    courseRequirements: {
      include: {
        ibCourse: true
      }
    }
  }
}>

/**
 * Transform Prisma student profile to matching algorithm format
 */
export function transformStudent(prismaStudent: PrismaStudentWithRelations): StudentProfile {
  return {
    // Academic data - handle nulls properly
    totalIBPoints: prismaStudent.totalIBPoints ?? 0,
    tokGrade: (prismaStudent.tokGrade as 'A' | 'B' | 'C' | 'D' | 'E') ?? undefined,
    eeGrade: (prismaStudent.eeGrade as 'A' | 'B' | 'C' | 'D' | 'E') ?? undefined,

    // Courses with proper type mapping
    courses: prismaStudent.courses.map(
      (course): StudentCourse => ({
        courseId: course.ibCourse.id,
        courseName: course.ibCourse.name,
        level: course.level as 'HL' | 'SL',
        grade: course.grade as 1 | 2 | 3 | 4 | 5 | 6 | 7
      })
    ),

    // Preferences - field IDs
    interestedFields: prismaStudent.preferredFields.map((field) => field.id),

    // Preferences - country IDs
    preferredCountries: prismaStudent.preferredCountries.map((country) => country.id)
  }
}

/**
 * Transform Prisma program to matching algorithm format
 */
export function transformProgram(prismaProgram: PrismaProgramWithRelations): ProgramRequirements {
  // Determine program type based on requirements
  const hasSubjects = prismaProgram.courseRequirements.length > 0
  const hasPoints = prismaProgram.minIBPoints !== null

  let type: 'FULL_REQUIREMENTS' | 'POINTS_ONLY' | 'SUBJECTS_ONLY'
  if (hasSubjects && hasPoints) {
    type = 'FULL_REQUIREMENTS'
  } else if (hasPoints) {
    type = 'POINTS_ONLY'
  } else {
    type = 'SUBJECTS_ONLY'
  }

  return {
    // Program identification
    programId: prismaProgram.id,
    programName: prismaProgram.name,
    universityId: prismaProgram.university.id,
    universityName: prismaProgram.university.name,

    // Program type
    type,

    // Field of study
    fieldId: prismaProgram.fieldOfStudy.id,

    // Country
    countryId: prismaProgram.university.country.id,

    // Academic requirements
    minimumIBPoints: prismaProgram.minIBPoints ?? undefined,

    // Required subjects (not OR-groups)
    requiredSubjects: prismaProgram.courseRequirements.map(
      (req): SubjectRequirement => ({
        courseId: req.ibCourse.id,
        courseName: req.ibCourse.name,
        level: req.requiredLevel as 'HL' | 'SL',
        minimumGrade: req.minGrade as 1 | 2 | 3 | 4 | 5 | 6 | 7,
        isCritical: req.isCritical
      })
    ),

    // OR-group requirements (empty for now - would need separate schema field)
    orGroupRequirements: []
  }
}

/**
 * Transform array of Prisma programs
 */
export function transformPrograms(
  prismaPrograms: PrismaProgramWithRelations[]
): ProgramRequirements[] {
  return prismaPrograms.map(transformProgram)
}
