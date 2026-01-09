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
  SubjectRequirement,
  ORGroupRequirement
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
 * Minimal program interface for matching algorithm transformation
 * This allows both full Prisma types and optimized CachedProgram types to work
 */
export interface TransformableProgram {
  id: string
  name: string
  minIBPoints: number | null
  university: {
    id: string
    name: string
    country: {
      id: string
    }
  }
  fieldOfStudy: {
    id: string
  }
  courseRequirements: Array<{
    ibCourse: {
      id: string
      name: string
    }
    requiredLevel: string
    minGrade: number
    isCritical: boolean
    orGroupId: string | null
  }>
}

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
 * Transform program to matching algorithm format
 * Accepts both full Prisma types and optimized CachedProgram types
 */
export function transformProgram(program: TransformableProgram): ProgramRequirements {
  // Determine program type based on requirements
  const hasSubjects = program.courseRequirements.length > 0
  const hasPoints = program.minIBPoints !== null

  let type: 'FULL_REQUIREMENTS' | 'POINTS_ONLY' | 'SUBJECTS_ONLY'
  if (hasSubjects && hasPoints) {
    type = 'FULL_REQUIREMENTS'
  } else if (hasPoints) {
    type = 'POINTS_ONLY'
  } else {
    type = 'SUBJECTS_ONLY'
  }

  // Separate standalone requirements from OR-grouped requirements
  const standaloneRequirements: SubjectRequirement[] = []
  const orGroupMap = new Map<string, SubjectRequirement[]>()

  for (const req of program.courseRequirements) {
    const subjectReq: SubjectRequirement = {
      courseId: req.ibCourse.id,
      courseName: req.ibCourse.name,
      level: req.requiredLevel as 'HL' | 'SL',
      minimumGrade: req.minGrade as 1 | 2 | 3 | 4 | 5 | 6 | 7,
      isCritical: req.isCritical
    }

    if (req.orGroupId) {
      // This requirement is part of an OR-group
      const existing = orGroupMap.get(req.orGroupId) || []
      existing.push(subjectReq)
      orGroupMap.set(req.orGroupId, existing)
    } else {
      // Standalone requirement
      standaloneRequirements.push(subjectReq)
    }
  }

  // Convert OR-group map to array of ORGroupRequirement
  const orGroupRequirements: ORGroupRequirement[] = []
  for (const [, options] of orGroupMap) {
    // An OR-group is critical if any of its options is critical
    const isCritical = options.some((opt) => opt.isCritical)
    orGroupRequirements.push({
      options,
      isCritical
    })
  }

  return {
    // Program identification
    programId: program.id,
    programName: program.name,
    universityId: program.university.id,
    universityName: program.university.name,

    // Program type
    type,

    // Field of study
    fieldId: program.fieldOfStudy.id,

    // Country
    countryId: program.university.country.id,

    // Academic requirements
    minimumIBPoints: program.minIBPoints ?? undefined,

    // Required subjects (standalone, not in OR-groups)
    requiredSubjects: standaloneRequirements,

    // OR-group requirements (grouped by orGroupId)
    orGroupRequirements
  }
}

/**
 * Transform array of programs
 * Accepts both full Prisma types and optimized CachedProgram types
 */
export function transformPrograms(programs: TransformableProgram[]): ProgramRequirements[] {
  return programs.map(transformProgram)
}
