import { isDegreeType, type DegreeType } from '@/lib/programs/degree-types'
import {
  defOptions,
  diffProgram,
  rowsFromDefs,
  sameRequirements,
  type AnyRequirementDef,
  type ProgramState
} from './requirements-diff'

/**
 * The refresh tool's data files and the pure half of `scripts/programs/refresh.ts`:
 * checking a file and planning what it changes. No database access, so it is unit-tested.
 */

/**
 * `current`: an existing program, written when checked. `new`: created when checked.
 * `discontinued`: reported for the owner to decide, never written or deleted.
 */
export type ProgramStatus = 'current' | 'new' | 'discontinued'

export interface RefreshProgram {
  /** The stored program. Required for `current` and `discontinued`; a `new` program has none. */
  id?: string
  status: ProgramStatus
  name: string
  description: string
  /** A `FieldOfStudy` name. */
  field: string
  /** A canonical degree type from `lib/programs/degree-types.ts` (content 3.2). */
  degree: DegreeType
  duration: string
  /** The published minimum total. A typical offer above it goes in `notes`. */
  minIBPoints: number | null
  /** The page for the intake checked. */
  programUrl: string | null
  /** Empty means checked, no subject required, which `notes` must say. */
  requirements: AnyRequirementDef[]
  /**
   * The intake the sources state these requirements for, stamped into
   * `requirementsEntryYear`. Null means not checked in this refresh: nothing is written.
   * A source that names no year counts as the previous intake (refresh rule 2).
   */
  checkedFor: number | null
  /** Official pages read, university-wide IB page first. Required once checked. */
  sources: string[]
  notes?: string
}

export interface RefreshFile {
  university: string
  /** The intake this refresh is for. */
  entryYear: number
  /** ISO date the sources were read, stamped into `requirementsUpdatedAt`. */
  checkedOn: string
  programs: RefreshProgram[]
}

/** Every program field the tool compares and writes. */
export interface RefreshState extends ProgramState {
  description: string
  field: string
  degreeType: string
  duration: string
}

export interface Stamps {
  requirementsVerified: boolean
  requirementsUpdatedAt: Date | null
  requirementsEntryYear: number | null
}

/** A program as stored. */
export interface StoredProgram {
  id: string
  university: string
  state: RefreshState
  stamps: Stamps
}

/** Reference data a file is checked against. */
export interface Lookups {
  courseCodes: ReadonlySet<string>
  fields: ReadonlySet<string>
  /** Maps a stored degree spelling to its canonical type, as `canonicalDegreeType` does. */
  canonicalDegree: (value: string) => string | null
}

export interface ProgramWrite {
  id: string
  name: string
  changes: string[]
  stampChanges: string[]
  requirementsChanged: boolean
  target: RefreshState
  stamps: Stamps
}

export interface ProgramCreate {
  name: string
  target: RefreshState
  stamps: Stamps
}

export interface RefreshPlan {
  errors: string[]
  warnings: string[]
  /** Existing programs to write: changed, or only re-stamped. */
  writes: ProgramWrite[]
  creates: ProgramCreate[]
  upToDate: string[]
  /** `current` programs left at `checkedFor: null`. */
  unchecked: string[]
  discontinued: Array<{ id: string; name: string; notes: string | null }>
  /** Checked, but the sources describe an earlier intake than the file's: list these in the PR. */
  earlierIntake: Array<{ name: string; checkedFor: number }>
  /** Stored at the university but missing from the file, so untouched. */
  notInFile: Array<{ id: string; name: string }>
}

/** The stored data starts with 2026 entry; anything much older is a typo. */
const EARLIEST_ENTRY_YEAR = 2020
const STATUSES: readonly string[] = ['current', 'new', 'discontinued']

/** The dry run's lines for one program: every field that changes, in words. */
export function diffState(current: RefreshState, target: RefreshState): string[] {
  const changes = diffProgram(current, target)
  if (current.degreeType !== target.degreeType) {
    changes.push(`Degree: "${current.degreeType}" → "${target.degreeType}"`)
  }
  if (current.duration !== target.duration) {
    changes.push(`Duration: "${current.duration}" → "${target.duration}"`)
  }
  if (current.field !== target.field) {
    changes.push(`Field: ${current.field} → ${target.field}`)
  }
  if (current.description !== target.description) {
    changes.push(
      `Description: rewritten (${current.description.length} → ${target.description.length} characters)`
    )
  }
  return changes
}

const isoDate = (date: Date | null) => date?.toISOString().slice(0, 10) ?? 'never'

export function diffStamps(current: Stamps, target: Stamps): string[] {
  const changes: string[] = []
  if (current.requirementsEntryYear !== target.requirementsEntryYear) {
    changes.push(
      `Checked for: ${current.requirementsEntryYear ?? 'none'} → ${target.requirementsEntryYear ?? 'none'}`
    )
  }
  if (current.requirementsUpdatedAt?.getTime() !== target.requirementsUpdatedAt?.getTime()) {
    changes.push(
      `Checked on: ${isoDate(current.requirementsUpdatedAt)} → ${isoDate(target.requirementsUpdatedAt)}`
    )
  }
  if (current.requirementsVerified !== target.requirementsVerified) {
    changes.push(
      `Verified: ${current.requirementsVerified ? 'yes' : 'no'} → ${target.requirementsVerified ? 'yes' : 'no'}`
    )
  }
  return changes
}

/** A program's state as the file gives it. */
export function stateFromProgram(p: RefreshProgram): RefreshState {
  return {
    name: p.name,
    description: p.description,
    field: p.field,
    degreeType: p.degree,
    duration: p.duration,
    minIBPoints: p.minIBPoints,
    programUrl: p.programUrl,
    requirements: rowsFromDefs(p.requirements)
  }
}

/** Parse `YYYY-MM-DD` as midnight UTC, or null if it is not a real date. */
export function parseCheckedOn(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const date = new Date(`${value}T00:00:00Z`)
  return isoDate(date) === value ? date : null
}

function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value)
    return protocol === 'https:' || protocol === 'http:'
  } catch {
    return false
  }
}

const sameName = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase()

/** Problems with one program's fields, each prefixed by the caller. */
function checkFields(p: RefreshProgram, file: RefreshFile, lookups: Lookups): string[] {
  const problems: string[] = []
  if (!p.name?.trim()) problems.push('has no name')
  if (p.status === 'new' && !p.description?.trim()) problems.push('has no description')
  if (!lookups.fields.has(p.field)) problems.push(`field "${p.field}" is not a field of study`)
  if (!isDegreeType(p.degree)) {
    problems.push(
      `degree "${p.degree}" is not in the degree type list (lib/programs/degree-types.ts)`
    )
  }
  if (!p.duration?.trim()) problems.push('has no duration')
  if (
    p.minIBPoints !== null &&
    !(Number.isInteger(p.minIBPoints) && p.minIBPoints >= 24 && p.minIBPoints <= 45)
  ) {
    problems.push(`minIBPoints ${p.minIBPoints} is not a total from 24 to 45`)
  }
  if (p.programUrl !== null && !isHttpUrl(p.programUrl)) {
    problems.push(`programUrl "${p.programUrl}" is not a web address`)
  }
  p.requirements.forEach((def, i) => {
    const options = defOptions(def)
    if (options.length === 0) problems.push(`requirement ${i + 1} has no course`)
    for (const o of options) {
      if (!lookups.courseCodes.has(o.course)) {
        problems.push(`requirement ${i + 1}: unknown IB course code ${o.course}`)
      }
      if (o.level !== 'HL' && o.level !== 'SL') {
        problems.push(`requirement ${i + 1}: level ${o.level} is not HL or SL`)
      }
      if (!(Number.isInteger(o.grade) && o.grade >= 1 && o.grade <= 7)) {
        problems.push(`requirement ${i + 1}: grade ${o.grade} is not 1 to 7`)
      }
    }
  })
  if (p.checkedFor !== null) {
    if (
      !Number.isInteger(p.checkedFor) ||
      p.checkedFor < EARLIEST_ENTRY_YEAR ||
      p.checkedFor > file.entryYear
    ) {
      problems.push(
        `checkedFor ${p.checkedFor} is not a year from ${EARLIEST_ENTRY_YEAR} to ${file.entryYear}`
      )
    }
    if (!Array.isArray(p.sources) || p.sources.length === 0) {
      problems.push('is checked but lists no sources')
    }
    if (p.requirements.length === 0 && !p.notes?.trim()) {
      problems.push('has no subject requirements: say "checked, none required" in notes')
    }
  }
  for (const source of p.sources ?? []) {
    if (!isHttpUrl(source)) problems.push(`source "${source}" is not a web address`)
  }
  return problems
}

/**
 * Check a data file against what is stored and plan the writes. `stored` holds every program
 * of the file's university, plus any other program the file names by id. `today` bounds
 * `checkedOn`. A plan with errors must not be applied.
 */
export function planRefresh(
  file: RefreshFile,
  stored: StoredProgram[],
  lookups: Lookups,
  today: Date = new Date()
): RefreshPlan {
  const plan: RefreshPlan = {
    errors: [],
    warnings: [],
    writes: [],
    creates: [],
    upToDate: [],
    unchecked: [],
    discontinued: [],
    earlierIntake: [],
    notInFile: []
  }
  const error = (message: string) => plan.errors.push(message)

  if (!file || typeof file.university !== 'string' || !Array.isArray(file.programs)) {
    error('not a refresh data file: it needs university, entryYear, checkedOn and programs')
    return plan
  }
  if (file.programs.length > 0 && file.programs.every((p) => !p || !('status' in p))) {
    error(
      'not a refresh data file: no program has a status. ' +
        'The 1.2 Oxford and Cambridge files go through apply-2027-requirements.ts.'
    )
    return plan
  }
  if (!Number.isInteger(file.entryYear) || file.entryYear < EARLIEST_ENTRY_YEAR) {
    error(`entryYear ${file.entryYear} is not an intake year`)
  }
  const checkedOn = parseCheckedOn(file.checkedOn)
  if (!checkedOn) error(`checkedOn "${file.checkedOn}" is not a date (YYYY-MM-DD)`)
  else if (checkedOn.getTime() > today.getTime())
    error(`checkedOn ${file.checkedOn} is in the future`)

  const byId = new Map(stored.map((s) => [s.id, s]))
  const atUniversity = stored.filter((s) => s.university === file.university)
  if (atUniversity.length === 0) {
    plan.warnings.push(`no program is stored at "${file.university}"; check the university name`)
  }
  const seenIds = new Set<string>()
  // The name each stored program will carry, to catch a rename onto another program's name.
  const finalNames = new Map(atUniversity.map((s) => [s.id, s.state.name]))
  const renamed: string[] = []
  const newNames: string[] = []

  file.programs.forEach((p, index) => {
    const label = `${p?.name ?? `programs[${index}]`}${p?.id ? ` (${p.id})` : ''}`
    if (!p || !STATUSES.includes(p.status)) {
      error(`${label}: status must be current, new or discontinued`)
      return
    }

    if (p.status === 'new') {
      if (p.id) {
        error(`${label}: a new program has no id; use status current for a stored one`)
        return
      }
    } else {
      if (!p.id) {
        error(`${label}: a ${p.status} program needs its id`)
        return
      }
      if (seenIds.has(p.id)) {
        error(`${label}: listed twice`)
        return
      }
      seenIds.add(p.id)
      const now = byId.get(p.id)
      if (!now) {
        error(`${label}: not in the database`)
        return
      }
      if (now.university !== file.university) {
        error(`${label}: belongs to ${now.university}, not ${file.university}`)
        return
      }
    }

    if (p.status === 'discontinued') {
      plan.discontinued.push({ id: p.id!, name: p.name, notes: p.notes?.trim() || null })
      return
    }

    const problems = checkFields(p, file, lookups)
    for (const problem of problems) error(`${label}: ${problem}`)
    if (problems.length > 0) return

    const target = stateFromProgram(p)
    const stamps: Stamps | null =
      p.checkedFor === null || !checkedOn
        ? null
        : {
            requirementsVerified: true,
            requirementsUpdatedAt: checkedOn,
            requirementsEntryYear: p.checkedFor
          }
    if (p.checkedFor !== null && p.checkedFor < file.entryYear) {
      plan.earlierIntake.push({ name: p.name, checkedFor: p.checkedFor })
    }

    if (p.status === 'new') {
      if (!stamps) {
        error(`${label}: a new program must be checked; set checkedFor`)
        return
      }
      const clash = atUniversity.find((s) => sameName(s.state.name, p.name))
      if (clash) {
        error(
          `${label}: ${file.university} already has "${clash.state.name}" (${clash.id}). ` +
            `If it was created by an earlier --apply, make it status current with id '${clash.id}'.`
        )
        return
      }
      if (newNames.some((n) => sameName(n, p.name))) {
        error(`${label}: two new programs share this name`)
        return
      }
      newNames.push(p.name)
      plan.creates.push({ name: p.name, target, stamps })
      return
    }

    const now = byId.get(p.id!)!
    if (!sameName(now.state.name, p.name)) {
      finalNames.set(p.id!, p.name)
      renamed.push(p.id!)
    }
    if (!stamps) {
      // Export writes the canonical degree for a stored variant spelling; that alone is no edit.
      const current = {
        ...now.state,
        degreeType: lookups.canonicalDegree(now.state.degreeType) ?? now.state.degreeType
      }
      const edits = diffState(current, target)
      if (edits.length > 0) {
        error(
          `${label}: edited but not checked. Set checkedFor to the intake the sources state, ` +
            `or undo: ${edits.join('; ')}`
        )
        return
      }
      plan.unchecked.push(p.name)
      return
    }

    const changes = diffState(now.state, target)
    const stampChanges = diffStamps(now.stamps, stamps)
    if (changes.length === 0 && stampChanges.length === 0) {
      plan.upToDate.push(p.name)
      return
    }
    plan.writes.push({
      id: p.id!,
      name: p.name,
      changes,
      stampChanges,
      requirementsChanged: !sameRequirements(now.state.requirements, target.requirements),
      target,
      stamps
    })
  })

  // A rename onto another program's name would leave two programs with one name.
  for (const id of renamed) {
    const name = finalNames.get(id)!
    const other = [...finalNames].find(([otherId, n]) => otherId !== id && sameName(n, name))
    if (other) error(`${name} (${id}): renamed to the name of ${other[0]}`)
  }

  for (const s of atUniversity) {
    if (!seenIds.has(s.id)) plan.notInFile.push({ id: s.id, name: s.state.name })
  }
  return plan
}

/**
 * Plan a restore: write each backed-up program back as it was. Nothing is validated against
 * the degree list, because the backup holds what was stored.
 */
export function planRestore(
  backup: Array<{ id: string; state: RefreshState; stamps: Stamps }>,
  stored: StoredProgram[]
): Pick<RefreshPlan, 'errors' | 'writes' | 'upToDate'> {
  const byId = new Map(stored.map((s) => [s.id, s]))
  const plan: Pick<RefreshPlan, 'errors' | 'writes' | 'upToDate'> = {
    errors: [],
    writes: [],
    upToDate: []
  }
  for (const b of backup) {
    const now = byId.get(b.id)
    if (!now) {
      plan.errors.push(`${b.state.name} (${b.id}): not in the database`)
      continue
    }
    const changes = diffState(now.state, b.state)
    const stampChanges = diffStamps(now.stamps, b.stamps)
    if (changes.length === 0 && stampChanges.length === 0) {
      plan.upToDate.push(b.state.name)
      continue
    }
    plan.writes.push({
      id: b.id,
      name: b.state.name,
      changes,
      stampChanges,
      requirementsChanged: !sameRequirements(now.state.requirements, b.state.requirements),
      target: b.state,
      stamps: b.stamps
    })
  }
  return plan
}
