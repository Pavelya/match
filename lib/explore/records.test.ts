import { describe, expect, it } from 'vitest'
import { sortByPoints, toRow } from './records'

describe('toRow', () => {
  it('takes what a row shows from a search record', () => {
    expect(
      toRow({
        objectID: 'p1',
        programName: 'Economics',
        universityName: 'Stanford University',
        universityAbbreviation: 'Stanford',
        city: 'Stanford',
        country: { name: 'United States' },
        duration: '4 years',
        admitRate: 3.8
      })
    ).toEqual({
      id: 'p1',
      name: 'Economics',
      university: 'Stanford University',
      city: 'Stanford',
      country: 'United States',
      length: '4 years',
      minIBPoints: null,
      admitRate: 3.8,
      image: null,
      initials: 'SU'
    })
  })
})

describe('sortByPoints', () => {
  const records = [
    { id: 'a', minimumIBPoints: 37 },
    { id: 'none-1' },
    { id: 'b', minimumIBPoints: 32 },
    { id: 'c', minimumIBPoints: 37 },
    { id: 'none-2' },
    { id: 'd', minimumIBPoints: 41 }
  ]

  it('puts the lowest minimum first, and no minimum last', () => {
    expect(sortByPoints(records, 'low').map((r) => r.id)).toEqual([
      'b',
      'a',
      'c',
      'd',
      'none-1',
      'none-2'
    ])
  })

  it('puts the highest minimum first, and no minimum still last', () => {
    expect(sortByPoints(records, 'high').map((r) => r.id)).toEqual([
      'd',
      'a',
      'c',
      'b',
      'none-1',
      'none-2'
    ])
  })
})
