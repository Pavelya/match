import type { CourseLevel } from '@prisma/client'

/**
 * Pure helpers for comparing a program's stored subject requirements with a target, and
 * for turning a target into rows to write. No database access, so they are unit-tested.
 */

/**
 * One subject requirement, as the data files write it. Several `courses` form an OR group.
 * Same shape as the seed scripts in `scripts/programs/`.
 */
export interface RequirementDef {
  courses: string[]
  level: CourseLevel
  grade: number
  critical?: boolean
}

/** One option of a mixed OR group: a course at its own level and grade. */
export interface RequirementOption {
  course: string
  level: CourseLevel
  grade: number
}

/**
 * An OR group whose options differ in level or grade: "Maths AA SL5 or Maths AI HL5".
 * 73 stored groups had this shape on 26 September 2026.
 */
export interface MixedRequirementDef {
  anyOf: RequirementOption[]
  critical?: boolean
}

export type AnyRequirementDef = RequirementDef | MixedRequirementDef

/** One `ProgramCourseRequirement` row, keyed by course code. `group` is the OR-group key. */
export interface RequirementRow {
  code: string
  level: CourseLevel
  grade: number
  critical: boolean
  group: string | null
}

/** The fields the script compares and writes. */
export interface ProgramState {
  name: string
  programUrl: string | null
  minIBPoints: number | null
  requirements: RequirementRow[]
}

interface Group {
  options: RequirementRow[]
  critical: boolean
}

/**
 * Collect rows into requirements: rows sharing a `group` are one OR group, every row
 * without one stands alone. A group is critical if any option is, which is how
 * `lib/matching/transformers.ts` reads it.
 */
function toGroups(rows: RequirementRow[]): Group[] {
  const grouped = new Map<string, RequirementRow[]>()
  const groups: Group[] = []
  for (const row of rows) {
    if (row.group === null) {
      groups.push({ options: [row], critical: row.critical })
      continue
    }
    const options = grouped.get(row.group)
    if (options) {
      options.push(row)
    } else {
      const created = [row]
      grouped.set(row.group, created)
      groups.push({ options: created, critical: false })
    }
  }
  for (const group of groups) {
    group.critical = group.options.some((o) => o.critical)
  }
  return groups
}

/** An order-independent key: the same requirements in any order give the same key. */
function canonicalKey(rows: RequirementRow[]): string {
  return toGroups(rows)
    .map((g) => {
      const options = g.options.map((o) => `${o.code} ${o.level}${o.grade}`).sort()
      return `${options.join('|')}${g.critical ? '' : ' nc'}`
    })
    .sort()
    .join(';')
}

/** `CHEM HL7; (BIO or PHYS) HL6 (nc)` — the notation used in the handoff files. */
export function formatRequirements(rows: RequirementRow[]): string {
  const groups = toGroups(rows)
  if (groups.length === 0) return 'none'
  return groups
    .map((g) => {
      const levels = new Set(g.options.map((o) => `${o.level}${o.grade}`))
      let text: string
      if (g.options.length === 1) {
        text = `${g.options[0].code} ${g.options[0].level}${g.options[0].grade}`
      } else if (levels.size === 1) {
        text = `(${g.options.map((o) => o.code).join(' or ')}) ${[...levels][0]}`
      } else {
        text = `(${g.options.map((o) => `${o.code} ${o.level}${o.grade}`).join(' or ')})`
      }
      return g.critical ? text : `${text} (nc)`
    })
    .join('; ')
}

/** A definition's options, one per course. */
export function defOptions(def: AnyRequirementDef): RequirementOption[] {
  return 'anyOf' in def
    ? def.anyOf
    : def.courses.map((course) => ({ course, level: def.level, grade: def.grade }))
}

/**
 * Expand requirement definitions into rows. Each definition with several options gets its
 * own group key; single-option definitions stand alone. `critical` defaults to true.
 */
export function rowsFromDefs(defs: AnyRequirementDef[]): RequirementRow[] {
  return defs.flatMap((def, index) => {
    const options = defOptions(def)
    return options.map((o) => ({
      code: o.course,
      level: o.level,
      grade: o.grade,
      critical: def.critical ?? true,
      group: options.length > 1 ? `def-${index}` : null
    }))
  })
}

/**
 * The inverse of `rowsFromDefs`, for exporting stored requirements to a data file: one
 * definition per requirement, in a stable order. An OR group whose options share a level
 * and grade becomes `courses`; one whose options differ becomes `anyOf`. A group is critical
 * if any option is, as the matcher reads it, so `rowsFromDefs` gives back the same
 * requirements (`sameRequirements`).
 */
export function defsFromRows(rows: RequirementRow[]): AnyRequirementDef[] {
  const byOption = (a: RequirementRow, b: RequirementRow) =>
    a.code.localeCompare(b.code) || a.level.localeCompare(b.level) || a.grade - b.grade
  const defs = toGroups(rows).map((g): AnyRequirementDef => {
    const options = [...g.options].sort(byOption)
    const [first] = options
    if (options.every((o) => o.level === first.level && o.grade === first.grade)) {
      return {
        courses: options.map((o) => o.code),
        level: first.level,
        grade: first.grade,
        critical: g.critical
      }
    }
    return {
      anyOf: options.map((o) => ({ course: o.code, level: o.level, grade: o.grade })),
      critical: g.critical
    }
  })
  // Critical first, then by first option: the order a reader expects, and the same every export.
  const key = (def: AnyRequirementDef) => {
    const [o] = defOptions(def)
    return `${def.critical === false ? 1 : 0} ${o.level} ${o.course} ${o.grade}`
  }
  return defs.sort((a, b) => key(a).localeCompare(key(b)))
}

export function sameRequirements(a: RequirementRow[], b: RequirementRow[]): boolean {
  return canonicalKey(a) === canonicalKey(b)
}

/** Human-readable differences from `current` to `target`; empty when nothing changes. */
export function diffProgram(current: ProgramState, target: ProgramState): string[] {
  const changes: string[] = []
  if (current.name !== target.name) {
    changes.push(`Name: "${current.name}" → "${target.name}"`)
  }
  if (current.programUrl !== target.programUrl) {
    changes.push(`URL: ${current.programUrl ?? 'empty'} → ${target.programUrl ?? 'empty'}`)
  }
  if (current.minIBPoints !== target.minIBPoints) {
    changes.push(`Points: ${current.minIBPoints ?? 'empty'} → ${target.minIBPoints ?? 'empty'}`)
  }
  if (!sameRequirements(current.requirements, target.requirements)) {
    changes.push(
      `Subjects: ${formatRequirements(current.requirements)} → ${formatRequirements(target.requirements)}`
    )
  }
  return changes
}

/**
 * Give each group a fresh `orGroupId` for writing. Rows that share a group key in the
 * input share an id in the output; standalone rows get null.
 */
export function assignGroupIds(
  rows: RequirementRow[],
  newId: () => string
): Array<Omit<RequirementRow, 'group'> & { orGroupId: string | null }> {
  const ids = new Map<string, string>()
  return rows.map(({ group, ...row }) => {
    if (group === null) return { ...row, orGroupId: null }
    let id = ids.get(group)
    if (!id) {
      id = newId()
      ids.set(group, id)
    }
    return { ...row, orGroupId: id }
  })
}
