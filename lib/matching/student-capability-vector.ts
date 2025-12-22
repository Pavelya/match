/**
 * Student Capability Vector
 *
 * NEW in Matching Algorithm V10 - Performance Optimization
 *
 * A precomputed data structure that enables O(1) subject lookups for matching.
 * Instead of iterating through arrays for each requirement check, this creates
 * indexed maps for instant access to student data.
 *
 * Performance improvements:
 * - O(1) subject lookup by name and level
 * - O(1) subject lookup by name (prefers HL)
 * - Cached computed properties (max grades, course counts)
 * - Memory efficient Map-based storage
 *
 * Based on: DOC_2_matching-algo X.md - Performance Optimizations
 */

import type { StudentCourse, CourseLevel, IBGrade } from './types'

// ============================================
// Types
// ============================================

export interface StudentCapabilityVector {
  // Indexed lookups
  getSubject: (name: string, level: CourseLevel) => SubjectCapability | null
  getSubjectAnyLevel: (name: string) => SubjectCapability | null
  hasSubject: (name: string) => boolean
  hasSubjectAtLevel: (name: string, level: CourseLevel) => boolean
  meetsRequirement: (name: string, level: CourseLevel, minGrade: IBGrade) => boolean

  // Computed properties
  readonly totalPoints: number
  readonly hlCount: number
  readonly slCount: number
  readonly maxHLGrade: IBGrade | null
  readonly maxSLGrade: IBGrade | null
  readonly averageGrade: number
  readonly courses: readonly SubjectCapability[]

  // Raw access for debugging
  readonly coursesByNameLevel: ReadonlyMap<string, SubjectCapability>
  readonly coursesByName: ReadonlyMap<string, SubjectCapability>
}

export interface SubjectCapability {
  courseId: string
  courseName: string
  normalizedName: string // Lowercase for case-insensitive matching
  level: CourseLevel
  grade: IBGrade
}

// ============================================
// Main Factory Function
// ============================================

/**
 * Create a StudentCapabilityVector from an array of courses
 *
 * @param courses - Student's courses with grades
 * @param totalPoints - Student's total IB points (optional, will be calculated if not provided)
 * @returns StudentCapabilityVector for O(1) lookups
 *
 * @example
 * const vector = createStudentCapabilityVector([
 *   { courseId: 'math-hl', courseName: 'Mathematics', level: 'HL', grade: 6 },
 *   { courseId: 'phys-hl', courseName: 'Physics', level: 'HL', grade: 5 },
 *   // ... more courses
 * ])
 *
 * // O(1) lookups
 * vector.getSubject('Mathematics', 'HL') // { courseName: 'Mathematics', level: 'HL', grade: 6 }
 * vector.hasSubjectAtLevel('Physics', 'HL') // true
 * vector.meetsRequirement('Mathematics', 'HL', 5) // true (grade 6 >= 5)
 */
export function createStudentCapabilityVector(
  courses: StudentCourse[],
  totalPoints?: number
): StudentCapabilityVector {
  // Build indexed maps
  const coursesByNameLevel = new Map<string, SubjectCapability>()
  const coursesByName = new Map<string, SubjectCapability>()
  const capabilities: SubjectCapability[] = []

  let hlCount = 0
  let slCount = 0
  let maxHLGrade: IBGrade | null = null
  let maxSLGrade: IBGrade | null = null
  let gradeSum = 0

  for (const course of courses) {
    const normalizedName = normalizeName(course.courseName)
    const capability: SubjectCapability = {
      courseId: course.courseId,
      courseName: course.courseName,
      normalizedName,
      level: course.level,
      grade: course.grade
    }

    capabilities.push(capability)
    gradeSum += course.grade

    // Index by name + level (e.g., "mathematics:hl")
    const nameLevalKey = `${normalizedName}:${course.level.toLowerCase()}`
    coursesByNameLevel.set(nameLevalKey, capability)

    // Index by name only (prefer HL over SL)
    const existingByName = coursesByName.get(normalizedName)
    if (!existingByName || course.level === 'HL') {
      coursesByName.set(normalizedName, capability)
    }

    // Count and track max grades
    if (course.level === 'HL') {
      hlCount++
      if (maxHLGrade === null || course.grade > maxHLGrade) {
        maxHLGrade = course.grade
      }
    } else {
      slCount++
      if (maxSLGrade === null || course.grade > maxSLGrade) {
        maxSLGrade = course.grade
      }
    }
  }

  const averageGrade = courses.length > 0 ? gradeSum / courses.length : 0
  const computedTotalPoints = totalPoints ?? gradeSum // Simplified; real calculation includes EE+TOK

  // Return the vector with all methods
  return {
    // O(1) lookup by name and level
    getSubject(name: string, level: CourseLevel): SubjectCapability | null {
      const key = `${normalizeName(name)}:${level.toLowerCase()}`
      return coursesByNameLevel.get(key) ?? null
    },

    // O(1) lookup by name (prefers HL)
    getSubjectAnyLevel(name: string): SubjectCapability | null {
      return coursesByName.get(normalizeName(name)) ?? null
    },

    // O(1) check if has subject
    hasSubject(name: string): boolean {
      return coursesByName.has(normalizeName(name))
    },

    // O(1) check if has subject at specific level
    hasSubjectAtLevel(name: string, level: CourseLevel): boolean {
      const key = `${normalizeName(name)}:${level.toLowerCase()}`
      return coursesByNameLevel.has(key)
    },

    // O(1) check if meets requirement
    meetsRequirement(name: string, level: CourseLevel, minGrade: IBGrade): boolean {
      const key = `${normalizeName(name)}:${level.toLowerCase()}`
      const capability = coursesByNameLevel.get(key)
      if (!capability) return false

      // Check grade requirement
      return capability.grade >= minGrade
    },

    // Computed properties
    totalPoints: computedTotalPoints,
    hlCount,
    slCount,
    maxHLGrade,
    maxSLGrade,
    averageGrade,
    courses: Object.freeze(capabilities),

    // Raw access
    coursesByNameLevel,
    coursesByName
  }
}

// ============================================
// Helper Functions
// ============================================

/**
 * Normalize a course/subject name for case-insensitive matching
 */
function normalizeName(name: string): string {
  return name.toLowerCase().trim()
}

/**
 * Create an empty capability vector (for testing or default state)
 */
export function createEmptyCapabilityVector(): StudentCapabilityVector {
  return createStudentCapabilityVector([])
}

/**
 * Check if a capability vector can meet a set of requirements
 * (Quick pre-check before full matching)
 */
export function canMeetRequirements(
  vector: StudentCapabilityVector,
  requirements: Array<{ name: string; level: CourseLevel }>
): boolean {
  for (const req of requirements) {
    if (!vector.hasSubjectAtLevel(req.name, req.level)) {
      return false
    }
  }
  return true
}

// ============================================
// Performance Measurement
// ============================================

/**
 * Measure lookup performance (for benchmarking)
 */
export function measureLookupPerformance(
  vector: StudentCapabilityVector,
  lookups: number = 1000
): { totalMs: number; avgNs: number } {
  const start = performance.now()

  for (let i = 0; i < lookups; i++) {
    vector.getSubject('Mathematics', 'HL')
    vector.hasSubjectAtLevel('Physics', 'HL')
    vector.meetsRequirement('Chemistry', 'HL', 5)
  }

  const totalMs = performance.now() - start
  const avgNs = (totalMs * 1_000_000) / (lookups * 3) // 3 operations per iteration

  return { totalMs, avgNs }
}
