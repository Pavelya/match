import { describe, expect, it } from 'vitest'
import { PAGE_DATES } from '@/lib/page-dates'
import { countryName, isNumbersOnly, lastUpdated, numberColumns, sectionId } from './guide'
import type { CountryGuide, GuideTable } from './types'

const table = (rows: string[][]): GuideTable => ({
  caption: 'A table',
  columns: ['A', 'B', 'C'],
  rows
})

describe('sectionId', () => {
  it('makes an anchor of a label', () => {
    expect(sectionId('Admission system')).toBe('admission-system')
    expect(sectionId('Tuition & fees')).toBe('tuition-fees')
    expect(sectionId('Maturità exemption')).toBe('maturita-exemption')
    expect(sectionId('uni-assist')).toBe('uni-assist')
  })
})

describe('numberColumns', () => {
  it('finds the columns of numbers, ranges included', () => {
    const t = table([
      ['45', '600', 'Excellent'],
      ['43–45', '20.00', 'Good'],
      ['-3', '0,5', 'Fail']
    ])
    expect(numberColumns(t)).toEqual([true, true, false])
    expect(isNumbersOnly(t)).toBe(false)
  })

  it('treats a table of numbers only as one', () => {
    expect(isNumbersOnly(table([['45.75', '99.95', '1']]))).toBe(true)
  })
})

const ireland = {
  path: '/study-in-ireland-with-ib-diploma',
  countryCode: 'IE'
} as CountryGuide

describe('lastUpdated', () => {
  it("reads the page's modified date from lib/page-dates.ts and writes it out", () => {
    const { iso, text } = lastUpdated(ireland)
    expect(iso).toBe(PAGE_DATES[ireland.path].modified)
    const [year, month, day] = iso.split('-').map(Number)
    const months =
      'January February March April May June July August September October November December'
    expect(text).toBe(`${day} ${months.split(' ')[month - 1]} ${year}`)
  })
})

describe('countryName', () => {
  it('names the country as a sentence reads it', () => {
    expect(countryName(ireland)).toBe('Ireland')
    expect(countryName({ ...ireland, countryCode: 'CZ' })).toBe('the Czech Republic')
  })

  it('refuses a country with no guide', () => {
    expect(() => countryName({ ...ireland, countryCode: 'XX' })).toThrow()
  })
})
