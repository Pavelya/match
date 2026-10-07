import { describe, expect, it } from 'vitest'
import { CORE_GRADES, getCorePoints, hasFailingCoreGrade, isCoreGrade } from './core-points'

// The IB's core points matrix (DP passing criteria): TOK grade, then EE grade.
const EXPECTED: Record<string, Record<string, number | 'failing'>> = {
  A: { A: 3, B: 3, C: 2, D: 2, E: 'failing' },
  B: { A: 3, B: 2, C: 2, D: 1, E: 'failing' },
  C: { A: 2, B: 2, C: 1, D: 0, E: 'failing' },
  D: { A: 2, B: 1, C: 0, D: 0, E: 'failing' },
  E: { A: 'failing', B: 'failing', C: 'failing', D: 'failing', E: 'failing' }
}

describe('getCorePoints', () => {
  const combinations = CORE_GRADES.flatMap((tok) =>
    CORE_GRADES.map((ee) => [tok, ee, EXPECTED[tok][ee]] as const)
  )

  it('covers all 25 combinations', () => {
    expect(combinations).toHaveLength(25)
  })

  it.each(combinations)('TOK %s, EE %s → %s', (tok, ee, expected) => {
    expect(getCorePoints(tok, ee)).toBe(expected)
  })

  // The formulas this replaced scored these one point low (onboarding) or high (coordinator).
  it.each([
    ['B', 'C', 2],
    ['C', 'B', 2],
    ['C', 'C', 1],
    ['B', 'D', 1],
    ['A', 'C', 2],
    ['B', 'B', 2]
  ])('TOK %s, EE %s scores %i, as stored totals are corrected to', (tok, ee, expected) => {
    expect(getCorePoints(tok, ee)).toBe(expected)
  })

  it('is null while a grade is missing or not a grade', () => {
    expect(getCorePoints(null, 'A')).toBeNull()
    expect(getCorePoints('A', undefined)).toBeNull()
    expect(getCorePoints('A', '')).toBeNull()
    expect(getCorePoints('a', 'A')).toBeNull()
    expect(getCorePoints('F', 'A')).toBeNull()
  })

  it('fails on an E even when the other grade is missing', () => {
    expect(getCorePoints('E', null)).toBe('failing')
    expect(getCorePoints(null, 'E')).toBe('failing')
  })
})

describe('hasFailingCoreGrade', () => {
  it('is true only for an E', () => {
    expect(hasFailingCoreGrade('E', 'A')).toBe(true)
    expect(hasFailingCoreGrade('A', 'E')).toBe(true)
    expect(hasFailingCoreGrade('D', 'D')).toBe(false)
    expect(hasFailingCoreGrade(null, null)).toBe(false)
  })
})

describe('isCoreGrade', () => {
  it('accepts A to E only', () => {
    for (const grade of CORE_GRADES) expect(isCoreGrade(grade)).toBe(true)
    for (const value of ['', 'a', 'F', 'AB', null, undefined, 3]) {
      expect(isCoreGrade(value)).toBe(false)
    }
  })
})
