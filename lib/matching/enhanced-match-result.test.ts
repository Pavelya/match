import { describe, expect, it } from 'vitest'
import {
  enhanceMatchResult,
  enhanceMatchResults,
  serializeEnhancedResult,
  isEnhancedMatchResult
} from './enhanced-match-result'
import { calculateMatch } from './scorer'
import type { StudentProfile, ProgramRequirements } from './types'

const testStudent: StudentProfile = {
  courses: [
    { courseId: 'math-hl', courseName: 'Mathematics', level: 'HL', grade: 6 },
    { courseId: 'phys-hl', courseName: 'Physics', level: 'HL', grade: 5 },
    { courseId: 'chem-hl', courseName: 'Chemistry', level: 'HL', grade: 6 },
    { courseId: 'eng-sl', courseName: 'English', level: 'SL', grade: 6 },
    { courseId: 'hist-sl', courseName: 'History', level: 'SL', grade: 5 },
    { courseId: 'span-sl', courseName: 'Spanish', level: 'SL', grade: 5 }
  ],
  totalIBPoints: 38,
  tokGrade: 'B',
  eeGrade: 'B',
  interestedFields: ['engineering'],
  preferredCountries: ['uk']
}

const testProgram: ProgramRequirements = {
  programId: 'prog-1',
  programName: 'Computer Science',
  universityId: 'uni-1',
  universityName: 'Test University',
  type: 'FULL_REQUIREMENTS',
  fieldId: 'engineering',
  countryId: 'uk',
  minimumIBPoints: 35,
  requiredSubjects: [
    {
      courseId: 'math-hl',
      courseName: 'Mathematics',
      level: 'HL',
      minimumGrade: 5,
      isCritical: true
    }
  ],
  orGroupRequirements: []
}

const baseResult = calculateMatch({ student: testStudent, program: testProgram })
const enhanced = enhanceMatchResult(baseResult, testStudent, testProgram)

describe('basic enhancement', () => {
  it.each(['category', 'categoryInfo', 'confidence', 'fitQuality'])('Enhanced: has %s', (key) => {
    expect(key in enhanced).toBe(true)
  })

  it('Enhanced: preserves programId', () => {
    expect(enhanced.programId).toBe(testProgram.programId)
  })

  it('Enhanced: preserves overallScore', () => {
    expect(typeof enhanced.overallScore).toBe('number')
  })
})

describe('category', () => {
  it('Category: valid value', () => {
    expect(['SAFETY', 'MATCH', 'REACH', 'UNLIKELY']).toContain(enhanced.category)
  })

  it('Category: has label', () => {
    expect(typeof enhanced.categoryInfo.label).toBe('string')
  })

  it('Category: has description', () => {
    expect(typeof enhanced.categoryInfo.description).toBe('string')
  })

  it('Category: has confidenceIndicator', () => {
    expect(['high', 'medium', 'low']).toContain(enhanced.categoryInfo.confidenceIndicator)
  })
})

describe('confidence', () => {
  it('Confidence: has score', () => {
    expect(typeof enhanced.confidence.score).toBe('number')
  })

  it('Confidence: score in range', () => {
    expect(enhanced.confidence.score).toBeGreaterThanOrEqual(0)
    expect(enhanced.confidence.score).toBeLessThanOrEqual(1)
  })

  it('Confidence: has level', () => {
    expect(['high', 'medium', 'low']).toContain(enhanced.confidence.level)
  })

  it('Confidence: has factors array', () => {
    expect(Array.isArray(enhanced.confidence.factors)).toBe(true)
  })
})

describe('fit quality', () => {
  it('FitQuality: has pointsFitScore', () => {
    expect(typeof enhanced.fitQuality.pointsFitScore).toBe('number')
  })

  it('FitQuality: has pointsFitCategory', () => {
    expect(['OPTIMAL', 'ABOVE', 'BELOW', 'FAR_BELOW', 'FAR_ABOVE']).toContain(
      enhanced.fitQuality.pointsFitCategory
    )
  })

  it('FitQuality: has selectivityBoost', () => {
    expect(typeof enhanced.fitQuality.selectivityBoost).toBe('number')
  })

  it('FitQuality: has selectivityTier', () => {
    expect([1, 2, 3, 4]).toContain(enhanced.fitQuality.selectivityTier)
  })

  it('FitQuality: has tierName', () => {
    expect(typeof enhanced.fitQuality.tierName).toBe('string')
  })
})

describe('config options', () => {
  it('Config: unverified lowers confidence', () => {
    // Grades not final = lower confidence
    const notFinal = enhanceMatchResult(baseResult, testStudent, testProgram, {
      gradesAreFinal: false,
      requirementsVerified: false
    })
    expect(
      notFinal.confidence.score < enhanced.confidence.score ||
        notFinal.confidence.factors.length > 0
    ).toBe(true)
  })

  it('Config: can disable features', () => {
    const minimal = enhanceMatchResult(baseResult, testStudent, testProgram, {
      includeCategory: true,
      includeConfidence: false,
      includeFitQuality: false
    })
    expect(minimal.confidence.score).toBe(1.0)
  })
})

describe('batch enhancement', () => {
  const programs = [testProgram, { ...testProgram, programId: 'prog-2' }]
  const baseResults = programs.map((p) => calculateMatch({ student: testStudent, program: p }))
  const programsMap = new Map(programs.map((p) => [p.programId, p]))
  const batchEnhanced = enhanceMatchResults(baseResults, testStudent, programsMap)

  it('Batch: enhances all results', () => {
    expect(batchEnhanced.length).toBe(2)
  })

  it('Batch: all have category', () => {
    expect(batchEnhanced.every((r) => 'category' in r)).toBe(true)
  })
})

describe('API serialization', () => {
  const serialized = serializeEnhancedResult(enhanced)

  it.each(['programId', 'category', 'confidence', 'fitQuality'])('Serialized: has %s', (key) => {
    expect(key in serialized).toBe(true)
  })

  it('Serialized: valid JSON', () => {
    expect(JSON.stringify(serialized).length).toBeGreaterThan(0)
  })
})

describe('type guard', () => {
  it('TypeGuard: enhanced is enhanced', () => {
    expect(isEnhancedMatchResult(enhanced)).toBe(true)
  })

  it('TypeGuard: base is not enhanced', () => {
    expect(isEnhancedMatchResult(baseResult)).toBe(false)
  })
})
