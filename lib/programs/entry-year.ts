/**
 * The intake a program's requirements were checked for (`requirementsEntryYear`): what
 * program pages tell students about it, and when an admin edit stamps it. Pure, so it is
 * unit-tested; the admin routes and program pages call it.
 */

/**
 * The intake students are applying for: next year's from 1 September, once this year's
 * has enrolled. In September 2026 that is 2027.
 */
export function currentEntryYear(now: Date = new Date()): number {
  const year = now.getUTCFullYear()
  return now.getUTCMonth() >= 8 ? year + 1 : year
}

/** How fresh a program's requirements are, for the line on its page. */
export type RequirementsCheck =
  | { status: 'current'; entryYear: number }
  | { status: 'older'; entryYear: number }
  | { status: 'unchecked' }

export function requirementsCheck(entryYear: number | null, now?: Date): RequirementsCheck {
  if (entryYear === null) return { status: 'unchecked' }
  return entryYear >= currentEntryYear(now)
    ? { status: 'current', entryYear }
    : { status: 'older', entryYear }
}

/** The stored data starts with 2026 entry; anything much older is a typo. */
const EARLIEST_ENTRY_YEAR = 2020

/**
 * Read the admin form's "entry year checked" value. Empty means not checked. A year must
 * fall between 2020 and the intake after the current one.
 */
export function parseEntryYear(
  value: unknown,
  now?: Date
): { year: number | null } | { error: string } {
  const text = typeof value === 'string' ? value.trim() : undefined
  if (value === null || text === '') return { year: null }
  const year = text === undefined ? value : Number(text)
  const latest = currentEntryYear(now) + 1
  if (
    typeof year !== 'number' ||
    !Number.isInteger(year) ||
    year < EARLIEST_ENTRY_YEAR ||
    year > latest
  ) {
    return { error: `Entry year must be a year from ${EARLIEST_ENTRY_YEAR} to ${latest}` }
  }
  return { year }
}

/** A subject requirement as the admin form sends it and the database stores it. */
export interface RequirementInput {
  ibCourseId: string
  requiredLevel: string
  minGrade: number
  isCritical?: boolean
  orGroupId?: string | null
}

/**
 * An order-independent key for a set of requirements. OR groups are compared by their
 * members, not their ids, so the same requirements saved again give the same key.
 */
function requirementsKey(rows: RequirementInput[]): string {
  const groups = new Map<string, string[]>()
  const standalone: string[] = []
  for (const row of rows) {
    const option = `${row.ibCourseId} ${row.requiredLevel}${row.minGrade}${row.isCritical ? '' : ' nc'}`
    if (!row.orGroupId) {
      standalone.push(option)
      continue
    }
    const options = groups.get(row.orGroupId) ?? []
    options.push(option)
    groups.set(row.orGroupId, options)
  }
  const grouped = [...groups.values()].map((options) => `(${options.sort().join(' | ')})`)
  return [...standalone, ...grouped].sort().join('; ')
}

export interface StoredRequirements {
  minIBPoints: number | null
  requirementsEntryYear: number | null
  courseRequirements: RequirementInput[]
}

/** What an edit sends. `undefined` means the field was not sent. */
export interface RequirementsEdit {
  minIBPoints?: number | null
  courseRequirements?: RequirementInput[]
  requirementsEntryYear?: number | null
}

export interface RequirementsStamp {
  requirementsUpdatedAt: Date
  requirementsEntryYear: number | null
  requirementsVerified: boolean
}

/**
 * The stamps an admin edit writes, or null when neither the requirements (points and
 * subjects) nor the entry year change: the edit form sends every field on each save, so
 * saving a name change must not re-date the requirements. Otherwise they count as
 * updated now, for the entry year the edit gives (the stored one if it sends none), and
 * the program is verified exactly when it has an entry year.
 */
export function requirementsStamp(
  stored: StoredRequirements,
  edit: RequirementsEdit,
  now: Date = new Date()
): RequirementsStamp | null {
  const entryYear =
    edit.requirementsEntryYear === undefined
      ? stored.requirementsEntryYear
      : edit.requirementsEntryYear
  const changed =
    (edit.minIBPoints !== undefined && edit.minIBPoints !== stored.minIBPoints) ||
    (edit.courseRequirements !== undefined &&
      requirementsKey(edit.courseRequirements) !== requirementsKey(stored.courseRequirements)) ||
    entryYear !== stored.requirementsEntryYear
  if (!changed) return null
  return {
    requirementsUpdatedAt: now,
    requirementsEntryYear: entryYear,
    requirementsVerified: entryYear !== null
  }
}
