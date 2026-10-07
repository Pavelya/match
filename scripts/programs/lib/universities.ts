/**
 * New universities for the refresh (content task 5.1): the data file's shape and the pure half
 * of `scripts/programs/add-universities.ts`, checking a file and planning the creates. No
 * database access, so it is unit-tested.
 *
 * A university is only ever created. One already stored under the same name (any case) is
 * listed and left as it is, so the file can be run again after an apply. Images and logos are
 * not part of the file: they go to Storage through /admin/universities, never into a column, and
 * an image's credit goes beside it there, never into the description (content 8.3).
 */

import { splitImageCredit } from '@/lib/universities/image-credit'

export type Classification = 'PUBLIC' | 'PRIVATE'

export interface UniversityDef {
  name: string
  abbreviatedName: string | null
  description: string
  /** A `Country` name. */
  country: string
  /**
   * One place: the seat or main campus (content 8.2). A program taught on another campus gives
   * its own `campusCity` in its refresh data file.
   */
  city: string
  classification: Classification
  studentPopulation: number | null
  websiteUrl: string
  /** The admissions office's, where published; a general address only when there is none (owner, 4 October 2026). */
  email: string | null
  /** As `email`: the admissions office's number where published. */
  phone: string | null
  /** Official pages for the facts above. */
  sources: string[]
}

export interface UniversitiesFile {
  /** ISO date the sources were read. */
  checkedOn: string
  universities: UniversityDef[]
}

export interface UniversityPlan {
  errors: string[]
  creates: UniversityDef[]
  /** Already stored under this name: not written. */
  existing: string[]
}

function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value)
    return protocol === 'https:' || protocol === 'http:'
  } catch {
    return false
  }
}

const key = (name: string) => name.trim().toLowerCase()

/** Check a file against the stored university names and the `Country` names. */
export function planUniversities(
  file: UniversitiesFile,
  storedNames: readonly string[],
  countries: ReadonlySet<string>
): UniversityPlan {
  const plan: UniversityPlan = { errors: [], creates: [], existing: [] }
  if (!file || !Array.isArray(file.universities)) {
    plan.errors.push('not a universities file: it needs checkedOn and universities')
    return plan
  }
  const stored = new Set(storedNames.map(key))
  const seen = new Set<string>()

  file.universities.forEach((u, index) => {
    const label = u?.name?.trim() || `universities[${index}]`
    const problems: string[] = []
    if (!u?.name?.trim()) problems.push('has no name')
    if (!u?.description?.trim()) problems.push('has no description')
    else if (splitImageCredit(u.description)) {
      problems.push(
        'description ends with an image credit: add it with the image, in /admin/universities'
      )
    }
    if (!u?.city?.trim()) problems.push('has no city')
    else if (/[,;/]/.test(u.city)) {
      problems.push(
        `city "${u.city}" lists several places: give the main campus, and campusCity to programs taught elsewhere`
      )
    }
    if (!countries.has(u?.country)) problems.push(`country "${u?.country}" is not in Country`)
    if (u?.classification !== 'PUBLIC' && u?.classification !== 'PRIVATE') {
      problems.push(`classification "${u?.classification}" is not PUBLIC or PRIVATE`)
    }
    if (
      u?.studentPopulation !== null &&
      !(Number.isInteger(u?.studentPopulation) && u.studentPopulation > 0)
    ) {
      problems.push(`studentPopulation ${u?.studentPopulation} is not a positive whole number`)
    }
    if (!isHttpUrl(u?.websiteUrl ?? ''))
      problems.push(`websiteUrl "${u?.websiteUrl}" is not a web address`)
    if (!Array.isArray(u?.sources) || u.sources.length === 0) problems.push('lists no sources')
    for (const source of u?.sources ?? []) {
      if (!isHttpUrl(source)) problems.push(`source "${source}" is not a web address`)
    }
    if (u?.name && seen.has(key(u.name))) problems.push('is listed twice')
    if (u?.name) seen.add(key(u.name))

    for (const problem of problems) plan.errors.push(`${label}: ${problem}`)
    if (problems.length > 0) return
    if (stored.has(key(u.name))) plan.existing.push(u.name)
    else plan.creates.push(u)
  })
  return plan
}
