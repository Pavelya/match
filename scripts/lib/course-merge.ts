import type { CourseLevel } from '@prisma/client'

/**
 * Pure planning for scripts/merge-ib-courses.ts: given every row that points at either
 * course of a duplicate pair, decide what happens to each. No database access, so it is
 * unit-tested.
 */

export interface StudentCourseRow {
  id: string
  studentProfileId: string
  ibCourseId: string
  level: CourseLevel
  grade: number
}

export interface RequirementRow {
  id: string
  programId: string
  orGroupId: string | null
  ibCourseId: string
  requiredLevel: CourseLevel
  minGrade: number
  isCritical: boolean
}

/** For a student with both courses: keep the row on the kept course, or the retired one's values. */
export type StudentChoice = 'kept' | 'retired'

export interface StudentCollision {
  kept: StudentCourseRow
  retired: StudentCourseRow
  /** null until the owner chooses; the pair's student rows are then left alone. */
  choice: StudentChoice | null
}

export interface PairPlan {
  /** Retired-course rows to point at the kept course. */
  studentRepoint: StudentCourseRow[]
  studentCollisions: StudentCollision[]
  requirementRepoint: RequirementRow[]
  /** Retired-course rows identical to a kept-course row in the same program and OR group. */
  requirementDelete: RequirementRow[]
}

function sameRequirement(a: RequirementRow, b: RequirementRow): boolean {
  return (
    a.programId === b.programId &&
    a.orGroupId === b.orGroupId &&
    a.requiredLevel === b.requiredLevel &&
    a.minGrade === b.minGrade &&
    a.isCritical === b.isCritical
  )
}

export function planPair(input: {
  keepId: string
  retireId: string
  students: StudentCourseRow[]
  requirements: RequirementRow[]
  /** The owner's choice per student with both courses, keyed by studentProfileId. */
  choices: Record<string, StudentChoice>
}): PairPlan {
  const { keepId, retireId, students, requirements, choices } = input

  const keptByStudent = new Map(
    students.filter((s) => s.ibCourseId === keepId).map((s) => [s.studentProfileId, s])
  )
  const studentRepoint: StudentCourseRow[] = []
  const studentCollisions: StudentCollision[] = []
  for (const retired of students.filter((s) => s.ibCourseId === retireId)) {
    const kept = keptByStudent.get(retired.studentProfileId)
    if (kept) {
      studentCollisions.push({ kept, retired, choice: choices[retired.studentProfileId] ?? null })
    } else {
      studentRepoint.push(retired)
    }
  }

  // A retired row that repeats a kept row exactly would become a duplicate: same course,
  // group, level, grade and flag. It means the same thing, so it goes. Anything that differs,
  // even in grade, is repointed, so no requirement is lost.
  const kept = requirements.filter((r) => r.ibCourseId === keepId)
  const requirementRepoint: RequirementRow[] = []
  const requirementDelete: RequirementRow[] = []
  for (const retired of requirements.filter((r) => r.ibCourseId === retireId)) {
    if (kept.some((k) => sameRequirement(k, retired))) requirementDelete.push(retired)
    else requirementRepoint.push(retired)
  }

  return { studentRepoint, studentCollisions, requirementRepoint, requirementDelete }
}
