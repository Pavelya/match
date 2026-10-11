import { describe, expect, it } from 'vitest'
import { exploreFilters } from './filters'
import { EMPTY_QUERY } from './query'

const CS = 'cmfield000000000000000001'
const ENG = 'cmfield000000000000000002'
const CA = 'cmcountry0000000000000001'

describe('exploreFilters', () => {
  it('filters nothing for the whole catalogue', () => {
    expect(exploreFilters(EMPTY_QUERY)).toBeUndefined()
  })

  it('ORs within a filter and ANDs between them', () => {
    expect(exploreFilters({ ...EMPTY_QUERY, fields: [CS, ENG], countries: [CA] })).toBe(
      `(fieldOfStudyId:${CS} OR fieldOfStudyId:${ENG}) AND countryId:${CA}`
    )
  })

  it('keeps programs with no IB minimum in any range while their box is ticked', () => {
    expect(exploreFilters({ ...EMPTY_QUERY, to: 38 })).toBe(
      '(minimumIBPoints <= 38 OR noIBMinimum = 1)'
    )
    // Today a "from" value drops them without a word; the box decides now
    expect(exploreFilters({ ...EMPTY_QUERY, from: 34 })).toBe(
      '(minimumIBPoints >= 34 OR noIBMinimum = 1)'
    )
    expect(exploreFilters({ ...EMPTY_QUERY, from: 34, to: 40 })).toBe(
      '(minimumIBPoints:34 TO 40 OR noIBMinimum = 1)'
    )
  })

  it('drops them when the box is unticked, with or without a range', () => {
    expect(exploreFilters({ ...EMPTY_QUERY, to: 38, noMin: false })).toBe('minimumIBPoints <= 38')
    expect(exploreFilters({ ...EMPTY_QUERY, noMin: false })).toBe('minimumIBPoints >= 0')
  })

  it('filters the length by its years', () => {
    expect(exploreFilters({ ...EMPTY_QUERY, lengths: [3, 5] })).toBe(
      '(durationYears = 3 OR durationYears = 5)'
    )
  })

  it('never passes an id that could change the filter', () => {
    expect(
      exploreFilters({ ...EMPTY_QUERY, fields: ['x OR 1=1', CS], countries: ['countryId:y'] })
    ).toBe(`fieldOfStudyId:${CS}`)
  })
})
