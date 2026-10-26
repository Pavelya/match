/**
 * A fingerprint of the matcher's output, for changes that must not move any score.
 *
 * Seeded synthetic data, no database: 400 programs (standalone requirements and either/or
 * groups, some listing one course twice, as 51 real programs do) and 60 students, scored in
 * the three modes, with the V10 enhancement and the card status. Plus the optimized matcher's
 * ranking for each student. One line per result, so `cmp` names the first difference.
 *
 *   npx tsx scripts/score-fingerprint.ts before.txt   # on main
 *   npx tsx scripts/score-fingerprint.ts after.txt    # on the branch
 *   cmp before.txt after.txt
 *
 * Rebuilt for MAINT 5.18 from the method of rebranding 2.1 (commit d285db0), whose copy was a
 * scratchpad file that did not survive.
 */

import { createHash } from 'node:crypto'
import { writeFileSync } from 'node:fs'
import { calculateMatch } from '@/lib/matching/scorer'
import { calculateOptimizedMatches } from '@/lib/matching/optimized-matcher'
import { enhanceMatchResult } from '@/lib/matching/enhanced-match-result'
import { deriveMatchStatus } from '@/lib/matching/match-status'
import type {
  CourseLevel,
  IBGrade,
  MatchingMode,
  ORGroupRequirement,
  ProgramRequirements,
  StudentCourse,
  StudentProfile,
  SubjectRequirement
} from '@/lib/matching/types'

const PROGRAMS = 400
const STUDENTS = 60
const MODES: MatchingMode[] = ['BALANCED', 'ACADEMIC_FOCUSED', 'LOCATION_FOCUSED']

// A fixed LCG, so every run draws the same numbers
let seed = 20261026
function random(): number {
  seed = (seed * 1664525 + 1013904223) % 4294967296
  return seed / 4294967296
}
const int = (min: number, max: number) => min + Math.floor(random() * (max - min + 1))
const pick = <T>(items: T[]): T => items[Math.floor(random() * items.length)]
function sample<T>(items: T[], n: number): T[] {
  const pool = [...items]
  const out: T[] = []
  while (out.length < n && pool.length > 0) out.push(pool.splice(int(0, pool.length - 1), 1)[0])
  return out
}

const COURSES = Array.from({ length: 18 }, (_, i) => ({ id: `course-${i}`, name: `Course ${i}` }))
const FIELDS = Array.from({ length: 8 }, (_, i) => `field-${i}`)
const COUNTRIES = Array.from({ length: 10 }, (_, i) => `country-${i}`)
const level = (): CourseLevel => (random() < 0.5 ? 'HL' : 'SL')
const grade = (min: number): IBGrade => int(min, 7) as IBGrade

function requirement(course: { id: string; name: string }): SubjectRequirement {
  return {
    courseId: course.id,
    courseName: course.name,
    level: level(),
    minimumGrade: grade(3),
    isCritical: random() < 0.6
  }
}

function program(i: number): ProgramRequirements {
  const requiredSubjects = sample(COURSES, int(0, 3)).map(requirement)
  const orGroupRequirements: ORGroupRequirement[] = Array.from({ length: int(0, 3) }, () => {
    const options = sample(COURSES, int(2, 5)).map(requirement)
    return { options, isCritical: options.some((o) => o.isCritical) }
  })
  // A course in two requirements: today each one may use it
  if (random() < 0.3 && orGroupRequirements.length > 0 && requiredSubjects.length > 0) {
    orGroupRequirements[0].options.push({ ...requiredSubjects[0], minimumGrade: grade(3) })
  }
  const hasSubjects = requiredSubjects.length + orGroupRequirements.length > 0
  const minimumIBPoints = random() < 0.85 ? int(24, 42) : undefined
  return {
    programId: `program-${i}`,
    programName: `Program ${i}`,
    universityId: `university-${i % 50}`,
    universityName: `University ${i % 50}`,
    type:
      hasSubjects && minimumIBPoints
        ? 'FULL_REQUIREMENTS'
        : minimumIBPoints
          ? 'POINTS_ONLY'
          : 'SUBJECTS_ONLY',
    fieldId: pick(FIELDS),
    countryId: pick(COUNTRIES),
    minimumIBPoints,
    requiredSubjects,
    orGroupRequirements
  }
}

function student(): StudentProfile {
  const courses: StudentCourse[] = sample(COURSES, 6).map((c, i) => ({
    courseId: c.id,
    courseName: c.name,
    level: i < 3 ? 'HL' : 'SL',
    grade: grade(2)
  }))
  return {
    courses,
    totalIBPoints: int(22, 45),
    tokGrade: pick(['A', 'B', 'C', 'D']),
    eeGrade: pick(['A', 'B', 'C', 'D']),
    interestedFields: sample(FIELDS, int(0, 3)),
    preferredCountries: sample(COUNTRIES, int(0, 3))
  }
}

const programs = Array.from({ length: PROGRAMS }, (_, i) => program(i))
const students = Array.from({ length: STUDENTS }, student)
const lines: string[] = []

for (const mode of MODES) {
  students.forEach((s, si) => {
    for (const p of programs) {
      const result = calculateMatch({ student: s, program: p, mode })
      const enhanced = enhanceMatchResult(result, s, p, {
        includeCategory: true,
        includeConfidence: true,
        includeFitQuality: true
      })
      const status = deriveMatchStatus({
        result,
        studentPoints: s.totalIBPoints,
        minIBPoints: p.minimumIBPoints ?? null,
        fieldName: 'Field',
        countryName: 'Country',
        requirementsEntryYear: null
      })
      lines.push(`${mode} ${si} ${p.programId} ${JSON.stringify({ enhanced, status })}`)
    }
  })
}

students.forEach((s, si) => {
  const { results } = calculateOptimizedMatches(s, programs, { useCache: false }, 'BALANCED')
  lines.push(`optimized ${si} ${results.map((r) => `${r.programId}:${r.overallScore}`).join(',')}`)
})

const text = lines.join('\n') + '\n'
const out = process.argv[2]
if (out) writeFileSync(out, text)
const sha = createHash('sha256').update(text).digest('hex')
process.stdout.write(`${lines.length} lines, sha256 ${sha}\n`)
