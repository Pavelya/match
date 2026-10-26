import { expect, test } from 'vitest'
import { calculateMatch, calculateMatches } from './scorer'
import type { StudentProfile, ProgramRequirements, MatchInput } from './types'

// === Test Data ===

const strongStudent: StudentProfile = {
  courses: [
    { courseId: 'bio', courseName: 'Biology', level: 'HL', grade: 7 },
    { courseId: 'chem', courseName: 'Chemistry', level: 'HL', grade: 7 },
    { courseId: 'math', courseName: 'Math', level: 'HL', grade: 6 },
    { courseId: 'eng', courseName: 'English', level: 'SL', grade: 7 },
    { courseId: 'spa', courseName: 'Spanish', level: 'SL', grade: 6 },
    { courseId: 'econ', courseName: 'Economics', level: 'SL', grade: 6 }
  ],
  totalIBPoints: 42,
  tokGrade: 'A',
  eeGrade: 'A',
  interestedFields: ['field-medicine', 'field-biology'],
  preferredCountries: ['country-usa', 'country-uk']
}

const perfectMatchProgram: ProgramRequirements = {
  programId: 'prog-perfect',
  programName: 'Medicine at Top University',
  universityId: 'uni-1',
  universityName: 'Top University',
  type: 'FULL_REQUIREMENTS',
  fieldId: 'field-medicine',
  countryId: 'country-usa',
  minimumIBPoints: 40,
  requiredSubjects: [
    { courseId: 'bio', courseName: 'Biology', level: 'HL', minimumGrade: 6, isCritical: true },
    { courseId: 'chem', courseName: 'Chemistry', level: 'HL', minimumGrade: 6, isCritical: true }
  ],
  orGroupRequirements: []
}

const nearMissProgram: ProgramRequirements = {
  programId: 'prog-near-miss',
  programName: 'Medicine at Elite University',
  universityId: 'uni-2',
  universityName: 'Elite University',
  type: 'FULL_REQUIREMENTS',
  fieldId: 'field-medicine',
  countryId: 'country-usa',
  minimumIBPoints: 43, // Student has 42
  requiredSubjects: [
    { courseId: 'bio', courseName: 'Biology', level: 'HL', minimumGrade: 6, isCritical: true },
    { courseId: 'chem', courseName: 'Chemistry', level: 'HL', minimumGrade: 6, isCritical: true }
  ],
  orGroupRequirements: []
}

const wrongFieldProgram: ProgramRequirements = {
  programId: 'prog-wrong-field',
  programName: 'Engineering Program',
  universityId: 'uni-3',
  universityName: 'Tech University',
  type: 'FULL_REQUIREMENTS',
  fieldId: 'field-engineering',
  countryId: 'country-usa',
  minimumIBPoints: 40,
  requiredSubjects: [
    { courseId: 'math', courseName: 'Math', level: 'HL', minimumGrade: 6, isCritical: true }
  ],
  orGroupRequirements: []
}

// === Test 1: Perfect Match ===

test('Perfect match → high score close to 1.0', () => {
  const input: MatchInput = {
    student: strongStudent,
    program: perfectMatchProgram,
    mode: 'BALANCED'
  }

  const result = calculateMatch(input)

  // Should be very high score
  expect(result.overallScore).toBeGreaterThan(0.9)
  expect(result.academicMatch.score).toBe(1.0)
  expect(result.locationMatch.score).toBe(1.0)
  expect(result.fieldMatch.score).toBe(1.0)
  expect(result.programId).toBe('prog-perfect')
})

// === Test 2: Near Miss on Points ===

test('Near miss on points → capped at 0.90', () => {
  const input: MatchInput = {
    student: strongStudent,
    program: nearMissProgram,
    mode: 'BALANCED'
  }

  const result = calculateMatch(input)

  // Should be capped at 0.90 due to points shortfall
  expect(result.overallScore).toBeLessThanOrEqual(0.9)
  expect(result.academicMatch.meetsPointsRequirement).toBe(false)
  expect(result.adjustments.caps.unmetRequirements).toBe(0.9)
})

// === Test 3: Wrong Field ===

test('Wrong field → lower score due to field mismatch', () => {
  const input: MatchInput = {
    student: strongStudent,
    program: wrongFieldProgram,
    mode: 'BALANCED'
  }

  const result = calculateMatch(input)

  // Field match should be 0.0
  expect(result.fieldMatch.score).toBe(0.0)
  expect(result.fieldMatch.isMatch).toBe(false)

  // Overall score should be lower
  expect(result.overallScore).toBeLessThan(0.95)
})

// === Test 4: Weight Adjustments ===

test('Academic-focused mode → weights academic heavily', () => {
  const input: MatchInput = {
    student: strongStudent,
    program: perfectMatchProgram,
    mode: 'ACADEMIC_FOCUSED'
  }

  const result = calculateMatch(input)

  expect(result.weightsUsed.academic).toBe(0.8)
  expect(result.weightsUsed.location).toBe(0.1)
  expect(result.weightsUsed.field).toBe(0.1)
})

test('No location preference → redistribute weights', () => {
  const studentNoLocation: StudentProfile = {
    ...strongStudent,
    preferredCountries: []
  }

  const input: MatchInput = {
    student: studentNoLocation,
    program: perfectMatchProgram,
    mode: 'BALANCED'
  }

  const result = calculateMatch(input)

  // w_L should be 0, others redistributed
  expect(result.weightsUsed.location).toBe(0)
  expect(result.weightsUsed.academic).toBeCloseTo(0.857, 2) // 0.6 / (0.6 + 0.1)
  expect(result.weightsUsed.field).toBeCloseTo(0.143, 2) // 0.1 / (0.6 + 0.1)
})

// === Test 5: Batch Processing ===

test('Batch processing → sorted by score descending', () => {
  const programs = [wrongFieldProgram, nearMissProgram, perfectMatchProgram]

  const results = calculateMatches(strongStudent, programs, 'BALANCED')

  expect(results.length).toBe(3)

  // Should be sorted with perfect match first
  expect(results[0].programId).toBe('prog-perfect')
  expect(results[0].overallScore).toBeGreaterThan(results[1].overallScore)
  expect(results[1].overallScore).toBeGreaterThan(results[2].overallScore)
})

test('Batch processing → all programs evaluated', () => {
  const programs = [perfectMatchProgram, nearMissProgram]

  const results = calculateMatches(strongStudent, programs)

  expect(results.length).toBe(2)
  expect(results.every((r) => r.overallScore >= 0 && r.overallScore <= 1)).toBe(true)
})

// === Test 6: Score Range ===

test('All scores → between 0 and 1', () => {
  const programs = [perfectMatchProgram, nearMissProgram, wrongFieldProgram]

  const results = calculateMatches(strongStudent, programs)

  results.forEach((result) => {
    expect(result.overallScore).toBeGreaterThanOrEqual(0)
    expect(result.overallScore).toBeLessThanOrEqual(1)
  })
})
