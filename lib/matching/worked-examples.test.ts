import { describe, expect, it } from 'vitest'
import { calculateMatch } from './scorer'
import type { MatchResult, ProgramRequirements, StudentProfile, SubjectRequirement } from './types'

// "Worked examples" in docs/matching/DOC_2_matching-algo XI.md, row by row, through the production
// scorer with BALANCED. A change to the algorithm changes that table and this file together, so
// the document cannot drift from the code as Version X did.

const FIELD = 'field'
const COUNTRY = 'country'

type Grades = { maths?: 5 | 6 | 7; physics?: 7 }

function student(
  totalIBPoints: number,
  { maths, physics }: Grades = {},
  preferredCountries = [COUNTRY],
  interestedFields = [FIELD]
): StudentProfile {
  return {
    totalIBPoints,
    tokGrade: 'B',
    eeGrade: 'B',
    courses: [
      ...(maths
        ? [{ courseId: 'maths', courseName: 'Maths', level: 'HL' as const, grade: maths }]
        : []),
      ...(physics
        ? [{ courseId: 'physics', courseName: 'Physics', level: 'HL' as const, grade: physics }]
        : [])
    ],
    interestedFields,
    preferredCountries
  }
}

function hl(
  courseId: string,
  courseName: string,
  minimumGrade: 5 | 6,
  isCritical: boolean
): SubjectRequirement {
  return { courseId, courseName, level: 'HL', minimumGrade, isCritical }
}

/** A program in the student's own field and country */
function program(
  minimumIBPoints: number,
  requiredSubjects: SubjectRequirement[] = []
): ProgramRequirements {
  return {
    programId: 'program',
    programName: 'Program',
    universityId: 'university',
    universityName: 'University',
    type: requiredSubjects.length > 0 ? 'FULL_REQUIREMENTS' : 'POINTS_ONLY',
    fieldId: FIELD,
    countryId: COUNTRY,
    minimumIBPoints,
    requiredSubjects,
    orGroupRequirements: []
  }
}

const score = (s: StudentProfile, p: ProgramRequirements): MatchResult =>
  calculateMatch({ student: s, program: p, mode: 'BALANCED' })

describe('XI, "Worked examples"', () => {
  it('44, Maths HL 7, Physics HL 7, against 42, Maths HL 6, Physics HL 6: everything met, 1.00', () => {
    const result = score(
      student(44, { maths: 7, physics: 7 }),
      program(42, [hl('maths', 'Maths', 6, false), hl('physics', 'Physics', 6, false)])
    )
    expect(result.overallScore).toBeCloseTo(1, 3)
  })

  it('44, the same student, against 28 with no subjects: over the minimum costs nothing, 1.00', () => {
    const result = score(student(44, { maths: 7, physics: 7 }), program(28))
    expect(result.overallScore).toBeCloseTo(1, 3)
  })

  it('36 against 24 with no subjects: the same at any margin, 1.00', () => {
    expect(score(student(36), program(24)).overallScore).toBeCloseTo(1, 3)
  })

  it('38, Maths HL 5, against 40, Maths HL 6 critical: G_M 0.697, raw 0.818, capped at 0.80', () => {
    const result = score(student(38, { maths: 5 }), program(40, [hl('maths', 'Maths', 6, true)]))
    expect(result.academicMatch.score).toBeCloseTo(0.697, 3)
    expect(result.adjustments.rawScore).toBeCloseTo(0.818, 3)
    expect(result.overallScore).toBeCloseTo(0.8, 3)
  })

  it('40 against 38 with no subjects, own field, another country: field above country, 0.90', () => {
    expect(score(student(40), { ...program(38), countryId: 'elsewhere' }).overallScore).toBeCloseTo(
      0.9,
      3
    )
  })

  it('40 against 38 with no subjects, own country, another field: 0.70', () => {
    expect(score(student(40), { ...program(38), fieldId: 'other' }).overallScore).toBeCloseTo(
      0.7,
      3
    )
  })

  it('40, Maths HL 6, no countries, against 38 with no subjects: weights 0.667 and 0.333, 1.00', () => {
    const result = score(student(40, { maths: 6 }, []), program(38))
    expect(result.weightsUsed.academic).toBeCloseTo(0.667, 3)
    expect(result.weightsUsed.field).toBeCloseTo(0.333, 3)
    expect(result.weightsUsed.location).toBe(0)
    expect(result.overallScore).toBeCloseTo(1, 3)
  })

  it('39, Maths HL 6, against 40, Maths HL 6: 1 short, G_M 0.85, raw 0.91, capped at 0.90', () => {
    const result = score(student(39, { maths: 6 }), program(40, [hl('maths', 'Maths', 6, false)]))
    expect(result.academicMatch.score).toBeCloseTo(0.85, 3)
    expect(result.adjustments.rawScore).toBeCloseTo(0.91, 3)
    expect(result.overallScore).toBeCloseTo(0.9, 3)
  })

  it('35, Maths HL 6, against 40, Maths HL 6: 5 short, G_M 0.73, 0.838, below 1 short', () => {
    const result = score(student(35, { maths: 6 }), program(40, [hl('maths', 'Maths', 6, false)]))
    expect(result.academicMatch.score).toBeCloseTo(0.73, 3)
    expect(result.overallScore).toBeCloseTo(0.838, 3)
  })

  it('40, no fields listed, against 38 with no subjects: weights 0.857 and 0.143, 1.00', () => {
    const result = score(student(40, {}, [COUNTRY], []), program(38))
    expect(result.weightsUsed.academic).toBeCloseTo(0.857, 3)
    expect(result.weightsUsed.location).toBeCloseTo(0.143, 3)
    expect(result.weightsUsed.field).toBe(0)
    expect(result.overallScore).toBeCloseTo(1, 3)
  })

  it('40, no fields or countries listed, against 38 with no subjects: academics alone, 1.00', () => {
    const result = score(student(40, {}, [], []), program(38))
    expect(result.weightsUsed.academic).toBe(1)
    expect(result.overallScore).toBeCloseTo(1, 3)
  })

  it('42, no Physics, against 40, Physics HL 5 critical: G_M 0, raw 0.40, under the 0.45 cap', () => {
    const result = score(student(42), program(40, [hl('physics', 'Physics', 5, true)]))
    expect(result.academicMatch.score).toBe(0)
    expect(result.adjustments.rawScore).toBeCloseTo(0.4, 3)
    expect(result.overallScore).toBeCloseTo(0.4, 3)
  })
})
