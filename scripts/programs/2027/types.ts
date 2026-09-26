import type { RequirementDef } from '../lib/requirements-diff'

export type { RequirementDef }

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
  /** The intake the check was for. */
  entryYear: number
  /**
   * The intake to stamp on a program whose sources name no year. Rule 2 of the refresh
   * (docs/tasks/CONTENT_tasks.md): a program counts as checked for `entryYear` only when a
   * source says so. Raise it to `entryYear` once an owner check confirms undated sources.
   */
  undatedEntryYear: number
  /** ISO date; stamped into `requirementsUpdatedAt`. */
  checkedOn: string
  programs: ProgramUpdate[]
}

/** The intake a program is stamped as checked for, `requirementsEntryYear`. */
export function checkedEntryYear(file: UniversityUpdate, program: ProgramUpdate): number {
  return program.sourceYear ?? file.undatedEntryYear
}
