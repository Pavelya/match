import type { CourseLevel } from '@prisma/client'

/**
 * One subject requirement. Several `courses` form an OR group. Same shape as the
 * seed scripts in `scripts/programs/`, so the refresh tool in content task 3.3 can
 * reuse these files.
 */
export interface RequirementDef {
  courses: string[]
  level: CourseLevel
  grade: number
  critical?: boolean
}

/** The checked requirements for one existing program. */
export interface ProgramUpdate {
  id: string
  /** The name as stored when checked. The script refuses to write if the database disagrees. */
  name: string
  rename?: string
  programUrl?: string
  minIBPoints: number
  /** Empty means checked, no subject required. */
  requirements: RequirementDef[]
  sources: string[]
  /** The entry year the source states, or null when it names none. */
  sourceYear: number | null
  notes?: string
  /** Why the owner still has to confirm this row. The script skips held rows. */
  hold?: string
}

export interface UniversityUpdate {
  university: string
  entryYear: number
  /** ISO date; stamped into `requirementsUpdatedAt`. */
  checkedOn: string
  programs: ProgramUpdate[]
}
