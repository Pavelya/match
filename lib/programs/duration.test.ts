import { describe, expect, it } from 'vitest'
import { durationYears } from './duration'

describe('durationYears', () => {
  // The nine values stored on 11 October 2026, and their counts: 608, 7, 927, 1, 1, 68, 1, 13, 2
  it.each([
    ['3 years', 3],
    ['3.5 years', 3],
    ['4 years', 4],
    ['4.5 years', 4],
    ['4-5 years', 4],
    ['5 years', 5],
    ['5 years (4+1)', 5],
    ['6 years', 5],
    ['7 years', 5]
  ])('files "%s" under %i', (stored, years) => {
    expect(durationYears(stored)).toBe(years)
  })

  it('reads a fraction or an en dash as the years before it', () => {
    expect(durationYears('3½ years')).toBe(3)
    expect(durationYears('4–5 years')).toBe(4)
  })

  it('files nothing it cannot read, or shorter than three years', () => {
    expect(durationYears('')).toBeNull()
    expect(durationYears('Varies')).toBeNull()
    expect(durationYears('2 years')).toBeNull()
  })
})
