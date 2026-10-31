import { describe, expect, it } from 'vitest'
import {
  chosenLine,
  comparingLabel,
  desktopColumns,
  phonePair,
  pickForPhone,
  readShortlistAddress,
  shortlistHref,
  shortlistSummary,
  toggleChosen
} from './view'

const IDS = ['mit', 'imperial', 'tcd-cs', 'tcd-csll', 'ntu', 'constructor', 'oxford', 'lse']

describe('the address', () => {
  it('reads the list by default and Compare with its choice', () => {
    expect(readShortlistAddress(new URLSearchParams(''))).toEqual({ view: 'list', chosen: [] })
    expect(readShortlistAddress(new URLSearchParams('view=compare&compare=ntu,lse'))).toEqual({
      view: 'compare',
      chosen: ['ntu', 'lse']
    })
    expect(readShortlistAddress(new URLSearchParams('view=table')).view).toBe('list')
  })

  it('writes each view its own address, with readable commas', () => {
    expect(shortlistHref({ view: 'list', chosen: [] })).toBe('/student/saved')
    expect(shortlistHref({ view: 'list', chosen: ['ntu', 'lse'] })).toBe(
      '/student/saved?compare=ntu,lse'
    )
    expect(shortlistHref({ view: 'compare', chosen: [] })).toBe('/student/saved?view=compare')
    expect(shortlistHref({ view: 'compare', chosen: ['ntu', 'lse'] })).toBe(
      '/student/saved?view=compare&compare=ntu,lse'
    )
  })
})

describe('desktop columns', () => {
  it('compares the first four until the student chooses', () => {
    expect(desktopColumns([], IDS)).toEqual(['mit', 'imperial', 'tcd-cs', 'tcd-csll'])
    expect(desktopColumns([], IDS.slice(0, 2))).toEqual(['mit', 'imperial'])
  })

  it('keeps a choice in the shortlist’s order, four at most', () => {
    expect(desktopColumns(['lse', 'ntu', 'constructor', 'oxford'], IDS)).toEqual([
      'ntu',
      'constructor',
      'oxford',
      'lse'
    ])
    expect(desktopColumns(['lse', 'ntu', 'mit', 'oxford', 'imperial'], IDS)).toHaveLength(4)
  })

  it('ignores programs no longer on the shortlist, and a choice of fewer than two', () => {
    expect(desktopColumns(['gone', 'ntu', 'lse'], IDS)).toEqual(['ntu', 'lse'])
    expect(desktopColumns(['gone', 'ntu'], IDS)).toEqual(['mit', 'imperial', 'tcd-cs', 'tcd-csll'])
  })
})

describe('choosing programs', () => {
  const four = ['mit', 'imperial', 'tcd-cs', 'tcd-csll']

  it('adds in the shortlist’s order, and refuses a fifth', () => {
    expect(toggleChosen(['mit', 'oxford'], 'ntu', true, IDS)).toEqual(['mit', 'ntu', 'oxford'])
    expect(toggleChosen(four, 'ntu', true, IDS)).toBeNull()
  })

  it('removes, and refuses to go below two', () => {
    expect(toggleChosen(four, 'imperial', false, IDS)).toEqual(['mit', 'tcd-cs', 'tcd-csll'])
    expect(toggleChosen(['mit', 'imperial'], 'mit', false, IDS)).toBeNull()
  })

  it('changes nothing when the box already says it', () => {
    expect(toggleChosen(four, 'mit', true, IDS)).toBeNull()
    expect(toggleChosen(four, 'ntu', false, IDS)).toBeNull()
  })

  it('says how many are chosen, and why one can’t change', () => {
    expect(chosenLine(3)).toBe('3 of 4 chosen.')
    expect(chosenLine(4)).toBe('4 of 4 chosen. Untick one to choose another.')
    expect(chosenLine(2)).toBe('2 of 4 chosen. Compare at least two.')
    expect(comparingLabel(4, 8)).toBe('Comparing 4 of 8')
  })
})

describe('a phone’s two programs', () => {
  it('opens with the first two in the list, or the first two of a wider screen’s choice', () => {
    expect(phonePair([], IDS)).toEqual(['mit', 'imperial'])
    expect(phonePair(['ntu', 'constructor', 'oxford'], IDS)).toEqual(['ntu', 'constructor'])
    expect(phonePair(['gone', 'ntu'], IDS)).toEqual(['mit', 'imperial'])
  })

  it('keeps the order a phone chose', () => {
    expect(phonePair(['lse', 'mit'], IDS)).toEqual(['lse', 'mit'])
  })

  it('replaces one, or swaps when picking the other’s program', () => {
    expect(pickForPhone(['mit', 'imperial'], 0, 'ntu')).toEqual(['ntu', 'imperial'])
    expect(pickForPhone(['mit', 'imperial'], 1, 'ntu')).toEqual(['mit', 'ntu'])
    expect(pickForPhone(['mit', 'imperial'], 0, 'imperial')).toEqual(['imperial', 'mit'])
    expect(pickForPhone(['mit', 'imperial'], 1, 'mit')).toEqual(['imperial', 'mit'])
  })
})

describe('the summary', () => {
  it('counts each status, as on the board', () => {
    const eight = ['meets', 'close', 'meets', 'gap', 'close', 'meets', 'close', 'meets'] as const
    expect(shortlistSummary(eight)).toBe(
      '8 programs. 4 meet all requirements, 3 are within reach and 1 is missing a requirement.'
    )
    expect(shortlistSummary(['meets', 'meets', 'close'])).toBe(
      '3 programs. 2 meet all requirements and 1 is within reach.'
    )
  })

  it('counts the programs with no set grades, third of four', () => {
    expect(
      shortlistSummary(['gap', 'neutral', 'meets', 'meets', 'meets', 'meets', 'close', 'close'])
    ).toBe(
      '8 programs. 4 meet all requirements, 2 are within reach, 1 has no set grades and 1 is missing a requirement.'
    )
    expect(shortlistSummary(['neutral', 'neutral', 'meets'])).toBe(
      '3 programs. 1 meets all requirements and 2 have no set grades.'
    )
    expect(shortlistSummary(['neutral'])).toBe('1 program, and it has no set grades.')
    expect(shortlistSummary(['neutral', 'neutral'])).toBe(
      '2 programs, and both have no set grades.'
    )
  })

  it('reads well for one program and for one status', () => {
    expect(shortlistSummary(['meets'])).toBe('1 program, and it meets all requirements.')
    expect(shortlistSummary(['gap'])).toBe('1 program, and it is missing a requirement.')
    expect(shortlistSummary(['close', 'close'])).toBe('2 programs, and both are within reach.')
    expect(shortlistSummary(['meets', 'meets', 'meets'])).toBe(
      '3 programs, and all 3 meet all requirements.'
    )
  })

  it('says when every program has been removed', () => {
    expect(shortlistSummary([])).toBe('Nothing is on your shortlist now.')
  })
})
