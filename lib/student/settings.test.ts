import { describe, expect, it } from 'vitest'
import { isDeleteWord, longDate, nameToSave, schoolLine } from './settings'

// Settings' words (rebranding 3.3, boards "D4.11 Settings", approved 18 October 2026)

describe('longDate', () => {
  it('writes the day, the month in full and the year, in UTC', () => {
    expect(longDate('2026-09-02T23:30:00.000Z')).toBe('2 September 2026')
    expect(longDate(new Date('2026-03-12T00:00:00.000Z'))).toBe('12 March 2026')
  })
})

describe('schoolLine', () => {
  const school = { city: 'Krakow', country: 'Poland' }

  it('says how and when the student linked', () => {
    expect(
      schoolLine({ ...school, linkedAt: '2026-09-02T10:00:00.000Z', byInvitation: true })
    ).toBe('Krakow, Poland · linked through an invitation on 2 September 2026')
    expect(
      schoolLine({ ...school, linkedAt: '2026-09-02T10:00:00.000Z', byInvitation: false })
    ).toBe('Krakow, Poland · linked on 2 September 2026')
  })

  it('gives only the place when there is no date', () => {
    expect(schoolLine({ ...school, linkedAt: null, byInvitation: true })).toBe('Krakow, Poland')
  })
})

describe('nameToSave', () => {
  it('trims the name, and an empty one is none', () => {
    expect(nameToSave('  Maya Okafor ')).toBe('Maya Okafor')
    expect(nameToSave('   ')).toBeNull()
    expect(nameToSave('')).toBeNull()
  })
})

describe('isDeleteWord', () => {
  it('takes DELETE in any case, spaces round it ignored', () => {
    expect(isDeleteWord('DELETE')).toBe(true)
    expect(isDeleteWord('delete')).toBe(true)
    expect(isDeleteWord(' Delete ')).toBe(true)
  })

  it('refuses anything else', () => {
    expect(isDeleteWord('')).toBe(false)
    expect(isDeleteWord('DELET')).toBe(false)
    expect(isDeleteWord('DELETE IT')).toBe(false)
  })
})
