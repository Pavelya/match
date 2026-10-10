/**
 * Admit rates for universities that set no IB minimum (content 6, US): the data file's shape and
 * the pure half of `scripts/programs/set-admit-rates.ts`, checking a file and planning the writes.
 * No database access, so it is unit-tested.
 *
 * The file holds the counts its source publishes (the Common Data Set's C1: first-year applicants
 * and admits, and the international breakdown where reported), so the stored percentages can be
 * checked against them. Only `University.admitRate`, `internationalAdmitRate` and `admitRateYear`
 * are written; matching never reads them.
 */

export interface AdmitCounts {
  applied: number
  admitted: number
}

export interface AdmitRateDef {
  /** A stored `University.name`. */
  university: string
  /** The fall intake the counts describe: 2025 for fall 2025. */
  year: number
  firstYear: AdmitCounts
  /** Where the source reports first-year international applicants separately. */
  international?: AdmitCounts
  /** The page or file the counts come from. */
  source: string
}

export interface AdmitRatesFile {
  /** ISO date the sources were read. */
  checkedOn: string
  universities: AdmitRateDef[]
}

export interface AdmitRates {
  admitRate: number | null
  internationalAdmitRate: number | null
  admitRateYear: number | null
}

export interface StoredUniversity extends AdmitRates {
  id: string
  name: string
}

export interface AdmitRateWrite {
  id: string
  name: string
  from: AdmitRates
  to: AdmitRates
}

export interface AdmitRatePlan {
  errors: string[]
  writes: AdmitRateWrite[]
  /** Already stored with these rates. */
  unchanged: string[]
  /** Not stored yet (a university its PR adds); run again after it is created. */
  missing: string[]
}

/** The share admitted, in percent with one decimal: 716 of 9,758 is 7.3. */
export function percent({ applied, admitted }: AdmitCounts): number {
  return Math.round((admitted / applied) * 1000) / 10
}

function countsProblem(label: string, counts: AdmitCounts | undefined): string | null {
  if (!counts) return `${label} counts are missing`
  const { applied, admitted } = counts
  if (!Number.isInteger(applied) || applied <= 0)
    return `${label} applied must be a positive whole number`
  if (!Number.isInteger(admitted) || admitted < 0 || admitted > applied) {
    return `${label} admitted must be a whole number from 0 to applied`
  }
  return null
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

/** Check a file against the stored universities and plan what changes. */
export function planAdmitRates(
  file: AdmitRatesFile,
  stored: readonly StoredUniversity[]
): AdmitRatePlan {
  const plan: AdmitRatePlan = { errors: [], writes: [], unchanged: [], missing: [] }
  const byName = new Map(stored.map((u) => [key(u.name), u]))
  const seen = new Set<string>()

  for (const def of file.universities) {
    const label = def.university?.trim() || '(no name)'
    const problems = [
      countsProblem('first-year', def.firstYear),
      def.international ? countsProblem('international', def.international) : null,
      Number.isInteger(def.year) && def.year >= 2000 && def.year <= 2100
        ? null
        : 'year must be a fall intake, such as 2025',
      isHttpUrl(def.source ?? '') ? null : 'source must be a web address'
    ].filter((p): p is string => p !== null)
    if (seen.has(key(label))) problems.push('appears twice')
    seen.add(key(label))
    if (problems.length > 0) {
      plan.errors.push(`${label}: ${problems.join('; ')}`)
      continue
    }

    const university = byName.get(key(label))
    if (!university) {
      plan.missing.push(label)
      continue
    }
    const to: AdmitRates = {
      admitRate: percent(def.firstYear),
      internationalAdmitRate: def.international ? percent(def.international) : null,
      admitRateYear: def.year
    }
    const from: AdmitRates = {
      admitRate: university.admitRate,
      internationalAdmitRate: university.internationalAdmitRate,
      admitRateYear: university.admitRateYear
    }
    const same =
      from.admitRate === to.admitRate &&
      from.internationalAdmitRate === to.internationalAdmitRate &&
      from.admitRateYear === to.admitRateYear
    if (same) plan.unchanged.push(university.name)
    else plan.writes.push({ id: university.id, name: university.name, from, to })
  }
  return plan
}
