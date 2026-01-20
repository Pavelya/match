/**
 * Program Index
 *
 * NEW in Matching Algorithm V10 - Performance Optimization
 *
 * A multi-dimensional index for fast candidate filtering. Instead of
 * iterating through all 5000+ programs, this narrows candidates to
 * ~100-500 relevant programs before detailed matching.
 *
 * Index dimensions:
 * - Points bucket (rounded to 5-point ranges)
 * - Field of study
 * - Country/location
 * - Required subjects (for quick elimination)
 *
 * Expected improvement: 25x reduction in candidates
 *
 * Based on: DOC_2_matching-algo X.md - Performance Optimizations
 */

import type { ProgramRequirements } from './types'

// ============================================
// Types
// ============================================

export interface ProgramIndex {
  // Filtering methods
  filterByPoints: (studentPoints: number, margin?: number) => Set<string>
  filterByField: (fieldIds: string[]) => Set<string>
  filterByCountry: (countryIds: string[]) => Set<string>
  filterBySubject: (subjectName: string) => Set<string>

  // Combined filtering (intersection)
  filterCandidates: (criteria: FilterCriteria) => string[]

  // Get all program IDs (no filtering - for fallback scenarios)
  getAllProgramIds: () => string[]

  // Index management
  invalidate: () => void
  rebuild: (programs: ProgramRequirements[]) => void
  getStats: () => IndexStats

  // Raw access
  readonly size: number
  readonly programs: ReadonlyMap<string, ProgramRequirements>
}

export interface FilterCriteria {
  studentPoints?: number
  pointsMargin?: number // Default: 10 (±10 points)
  fieldIds?: string[]
  countryIds?: string[]
  includeOpenFields?: boolean // Include programs if student is open to all fields
  includeOpenLocations?: boolean // Include programs if student is open to all locations
}

export interface IndexStats {
  totalPrograms: number
  pointsBuckets: number
  fieldsIndexed: number
  countriesIndexed: number
  subjectsIndexed: number
}

// ============================================
// Index Implementation
// ============================================

interface InternalIndex {
  byPointsBucket: Map<number, Set<string>> // bucket → program IDs
  byField: Map<string, Set<string>> // fieldId → program IDs
  byCountry: Map<string, Set<string>> // countryId → program IDs
  bySubject: Map<string, Set<string>> // normalized subject name → program IDs
  programs: Map<string, ProgramRequirements>
}

/**
 * Create a ProgramIndex from an array of programs
 *
 * @param programs - Array of program requirements to index
 * @returns ProgramIndex for fast filtering
 *
 * @example
 * const index = createProgramIndex(programs)
 *
 * // Filter to candidates
 * const candidates = index.filterCandidates({
 *   studentPoints: 38,
 *   fieldIds: ['engineering'],
 *   countryIds: ['uk', 'germany']
 * })
 * // Returns ~100-500 program IDs instead of 5000+
 */
export function createProgramIndex(programs: ProgramRequirements[]): ProgramIndex {
  const internal = buildIndex(programs)

  return {
    filterByPoints(studentPoints: number, margin: number = 10): Set<string> {
      return filterByPointsRange(internal, studentPoints, margin)
    },

    filterByField(fieldIds: string[]): Set<string> {
      return filterByFieldIds(internal, fieldIds)
    },

    filterByCountry(countryIds: string[]): Set<string> {
      return filterByCountryIds(internal, countryIds)
    },

    filterBySubject(subjectName: string): Set<string> {
      const normalized = subjectName.toLowerCase().trim()
      return internal.bySubject.get(normalized) ?? new Set()
    },

    filterCandidates(criteria: FilterCriteria): string[] {
      return filterCombined(internal, criteria)
    },

    getAllProgramIds(): string[] {
      return Array.from(internal.programs.keys())
    },

    invalidate(): void {
      internal.byPointsBucket.clear()
      internal.byField.clear()
      internal.byCountry.clear()
      internal.bySubject.clear()
      internal.programs.clear()
    },

    rebuild(newPrograms: ProgramRequirements[]): void {
      const rebuilt = buildIndex(newPrograms)
      internal.byPointsBucket = rebuilt.byPointsBucket
      internal.byField = rebuilt.byField
      internal.byCountry = rebuilt.byCountry
      internal.bySubject = rebuilt.bySubject
      internal.programs = rebuilt.programs
    },

    getStats(): IndexStats {
      return {
        totalPrograms: internal.programs.size,
        pointsBuckets: internal.byPointsBucket.size,
        fieldsIndexed: internal.byField.size,
        countriesIndexed: internal.byCountry.size,
        subjectsIndexed: internal.bySubject.size
      }
    },

    get size(): number {
      return internal.programs.size
    },

    get programs(): ReadonlyMap<string, ProgramRequirements> {
      return internal.programs
    }
  }
}

// ============================================
// Internal Index Building
// ============================================

function buildIndex(programs: ProgramRequirements[]): InternalIndex {
  const byPointsBucket = new Map<number, Set<string>>()
  const byField = new Map<string, Set<string>>()
  const byCountry = new Map<string, Set<string>>()
  const bySubject = new Map<string, Set<string>>()
  const programsMap = new Map<string, ProgramRequirements>()

  for (const program of programs) {
    const id = program.programId
    programsMap.set(id, program)

    // Index by points bucket (5-point ranges)
    const bucket = getPointsBucket(program.minimumIBPoints)
    addToIndex(byPointsBucket, bucket, id)

    // Index by field
    if (program.fieldId) {
      addToIndex(byField, program.fieldId.toLowerCase(), id)
    }

    // Index by country
    if (program.countryId) {
      addToIndex(byCountry, program.countryId.toLowerCase(), id)
    }

    // Index by required subjects
    for (const req of program.requiredSubjects) {
      const normalized = req.courseName.toLowerCase().trim()
      addToIndex(bySubject, normalized, id)
    }

    // Index OR-group subjects too
    for (const orGroup of program.orGroupRequirements) {
      for (const opt of orGroup.options) {
        const normalized = opt.courseName.toLowerCase().trim()
        addToIndex(bySubject, normalized, id)
      }
    }
  }

  return { byPointsBucket, byField, byCountry, bySubject, programs: programsMap }
}

function getPointsBucket(points: number | undefined): number {
  if (points === undefined || points === null) {
    return 0 // Programs with no points requirement go in bucket 0
  }
  return Math.floor(points / 5) * 5 // Round down to nearest 5
}

function addToIndex(
  map: Map<number | string, Set<string>>,
  key: number | string,
  id: string
): void {
  let set = map.get(key)
  if (!set) {
    set = new Set()
    map.set(key, set)
  }
  set.add(id)
}

// ============================================
// Filtering Functions
// ============================================

function filterByPointsRange(
  internal: InternalIndex,
  studentPoints: number,
  margin: number
): Set<string> {
  const result = new Set<string>()
  const minPoints = studentPoints - margin
  const maxPoints = studentPoints + margin

  // Get all buckets in range
  const minBucket = Math.floor(minPoints / 5) * 5
  const maxBucket = Math.floor(maxPoints / 5) * 5

  // Include bucket 0 (no requirement) always
  const noPtsReq = internal.byPointsBucket.get(0)
  if (noPtsReq) {
    for (const id of noPtsReq) {
      result.add(id)
    }
  }

  // Include all buckets in range
  for (let bucket = minBucket; bucket <= maxBucket; bucket += 5) {
    const programIds = internal.byPointsBucket.get(bucket)
    if (programIds) {
      for (const id of programIds) {
        result.add(id)
      }
    }
  }

  return result
}

function filterByFieldIds(internal: InternalIndex, fieldIds: string[]): Set<string> {
  const result = new Set<string>()

  for (const fieldId of fieldIds) {
    const normalized = fieldId.toLowerCase()
    const programIds = internal.byField.get(normalized)
    if (programIds) {
      for (const id of programIds) {
        result.add(id)
      }
    }
  }

  return result
}

function filterByCountryIds(internal: InternalIndex, countryIds: string[]): Set<string> {
  const result = new Set<string>()

  for (const countryId of countryIds) {
    const normalized = countryId.toLowerCase()
    const programIds = internal.byCountry.get(normalized)
    if (programIds) {
      for (const id of programIds) {
        result.add(id)
      }
    }
  }

  return result
}

function filterCombined(internal: InternalIndex, criteria: FilterCriteria): string[] {
  const sets: Set<string>[] = []

  // Points filter (if specified)
  if (criteria.studentPoints !== undefined) {
    const margin = criteria.pointsMargin ?? 10
    sets.push(filterByPointsRange(internal, criteria.studentPoints, margin))
  }

  // Field filter (if has preferences)
  if (criteria.fieldIds && criteria.fieldIds.length > 0) {
    sets.push(filterByFieldIds(internal, criteria.fieldIds))
  } else if (criteria.includeOpenFields) {
    // Include all programs if open to all fields
    // (no filtering by field)
  }

  // Country filter (if has preferences)
  if (criteria.countryIds && criteria.countryIds.length > 0) {
    sets.push(filterByCountryIds(internal, criteria.countryIds))
  } else if (criteria.includeOpenLocations) {
    // Include all programs if open to all locations
    // (no filtering by country)
  }

  // If no filters applied, return all programs
  if (sets.length === 0) {
    return Array.from(internal.programs.keys())
  }

  // Intersect all sets (programs must match ALL criteria)
  const intersection = intersectSets(sets)
  return Array.from(intersection)
}

function intersectSets(sets: Set<string>[]): Set<string> {
  if (sets.length === 0) return new Set()
  if (sets.length === 1) return sets[0]

  // Start with smallest set for efficiency
  const sorted = sets.sort((a, b) => a.size - b.size)
  const result = new Set(sorted[0])

  for (let i = 1; i < sorted.length; i++) {
    for (const id of result) {
      if (!sorted[i].has(id)) {
        result.delete(id)
      }
    }
  }

  return result
}

// ============================================
// Helpers
// ============================================

/**
 * Create an empty program index
 */
export function createEmptyProgramIndex(): ProgramIndex {
  return createProgramIndex([])
}

/**
 * Calculate the reduction ratio (for performance measurement)
 */
export function calculateReductionRatio(totalPrograms: number, filteredCount: number): number {
  if (filteredCount === 0) return totalPrograms
  return totalPrograms / filteredCount
}
