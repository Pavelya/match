import { describe, expect, it } from 'vitest'
import {
  EMPTY_QUERY,
  MAX_SHOWN,
  appliedChips,
  bestFitLine,
  catalogueSummary,
  chosenCount,
  clearAll,
  clearFilter,
  countParts,
  exploreHref,
  exploreListUrl,
  exploreSaveHref,
  exploreParams,
  noResultsText,
  pointsRange,
  readExplore,
  readPoints,
  removeChip,
  showLabel,
  shownSort,
  sortMenu,
  type ExploreQuery
} from './query'

const CS = 'cmfield000000000000000001'
const MED = 'cmfield000000000000000002'
const CA = 'cmcountry0000000000000001'
const NL = 'cmcountry0000000000000002'
const UK = 'cmcountry0000000000000003'

const names = {
  fields: new Map([
    [CS, 'Computer Science'],
    [MED, 'Medicine & Health']
  ]),
  countries: new Map([
    [CA, 'Canada'],
    [NL, 'Netherlands'],
    [UK, 'United Kingdom']
  ])
}

const read = (search: string) => readExplore(new URLSearchParams(search))

describe('readExplore', () => {
  it('reads nothing as the whole catalogue, 20 rows', () => {
    expect(read('')).toEqual({ query: EMPTY_QUERY, shown: 20 })
  })

  it('reads every part of the list', () => {
    const { query, shown } = read(
      `q=computer+science&fields=${CS}&countries=${CA},${UK}&minPoints=30&maxPoints=38&noMin=0&length=4,3&qualify=1&sort=low&shown=60`
    )
    expect(query).toEqual({
      q: 'computer science',
      fields: [CS],
      countries: [CA, UK],
      from: 30,
      to: 38,
      noMin: false,
      lengths: [3, 4],
      qualify: true,
      sort: 'low'
    })
    expect(shown).toBe(60)
  })

  it('ignores what it cannot use', () => {
    const { query, shown } = read(
      'fields=nope,1=1&countries=x&minPoints=12&maxPoints=52&length=2,9&sort=fit&shown=abc'
    )
    expect(query).toEqual(EMPTY_QUERY)
    expect(shown).toBe(20)
  })

  it('puts a range the right way round', () => {
    expect(read('minPoints=40&maxPoints=34').query).toMatchObject({ from: 34, to: 40 })
  })

  it('rounds shown up to a page and caps it', () => {
    expect(read('shown=21').shown).toBe(40)
    expect(read('shown=5000').shown).toBe(MAX_SHOWN)
    expect(read('shown=0').shown).toBe(20)
  })

  it('reads its own URL back', () => {
    const query: ExploreQuery = {
      ...EMPTY_QUERY,
      q: 'economics',
      countries: [NL],
      to: 38,
      lengths: [5],
      sort: 'high'
    }
    expect(readExplore(exploreParams(query, 40))).toEqual({ query, shown: 40 })
  })
})

describe('the sort (D3.5 Sort · best fit)', () => {
  const shown = (search: string, bestFit: boolean) => shownSort(read(search).query, bestFit)

  it('opens on Best fit with grades and nothing typed, and Most relevant once words are typed', () => {
    expect(shown('', true)).toBe('best')
    expect(shown('q=economics', true)).toBe('relevant')
    // Clearing the words brings Best fit back
    expect(shown('q=', true)).toBe('best')
  })

  it('opens on Highest points needed signed out or before grades, with nothing typed', () => {
    expect(shown('', false)).toBe('high')
    expect(shown('q=economics', false)).toBe('relevant')
  })

  it('keeps a picked sort, words or not', () => {
    expect(shown('sort=best&q=economics', true)).toBe('best')
    expect(shown('sort=low', true)).toBe('low')
    expect(shown('sort=low&q=economics', false)).toBe('low')
  })

  it('opens with the default when the menu does not offer the picked sort', () => {
    // A shared link with Best fit, signed out, before grades or with the switch off
    expect(shown('sort=best', false)).toBe('high')
    expect(shown('sort=best&q=economics', false)).toBe('relevant')
    // Today's links: "Most relevant" with nothing typed was the highest minimum first
    expect(shown('sort=relevant', false)).toBe('high')
    expect(shown('sort=relevant', true)).toBe('high')
    expect(shown('sort=relevant&q=law', true)).toBe('relevant')
  })

  it('offers each visitor the board’s menu, the default first', () => {
    expect(sortMenu('', true)).toEqual(['best', 'low', 'high'])
    expect(sortMenu('law', true)).toEqual(['relevant', 'best', 'low', 'high'])
    expect(sortMenu('', false)).toEqual(['high', 'low'])
    expect(sortMenu('law', false)).toEqual(['relevant', 'low', 'high'])
  })

  it('writes a picked sort in the URL, never the default', () => {
    expect(exploreHref(EMPTY_QUERY)).toBe('/programs/search')
    expect(exploreHref({ ...EMPTY_QUERY, sort: 'best' })).toBe('/programs/search?sort=best')
    expect(read('sort=best').query.sort).toBe('best')
  })

  it('says what Best fit puts first, under the count', () => {
    const viewer = { fields: [CS], countries: [CA, UK], total: 38 }
    expect(bestFitLine(viewer, 'full', false)).toBe(
      'Your fields and countries come first, then your fields anywhere; in each, the ones you meet, closest to your 38.'
    )
    // Open to anywhere: every country is theirs
    expect(bestFitLine({ ...viewer, countries: [] }, 'full', false)).toBe(
      'Your fields come first; in each, the ones you meet, closest to your 38.'
    )
    // Their countries alone
    expect(bestFitLine({ ...viewer, fields: [] }, 'full', false)).toBe(
      'Your countries come first; in each, the ones you meet, closest to your 38.'
    )
    // The fallback's one search lifts the tiers and says nothing more…
    expect(bestFitLine(viewer, 'lifted', false)).toBe('Your fields and countries come first.')
    // …unless the switch is on, which reads the whole list in the full order anyway
    expect(bestFitLine(viewer, 'lifted', true)).toBe(
      'Your fields and countries come first, then your fields anywhere; in each, the ones you meet, closest to your 38.'
    )
  })
})

describe('exploreHref', () => {
  it('leaves out the defaults', () => {
    expect(exploreHref(EMPTY_QUERY)).toBe('/programs/search')
    expect(exploreHref({ ...EMPTY_QUERY, q: 'law', qualify: true }, 40)).toBe(
      '/programs/search?q=law&qualify=1&shown=40'
    )
  })
})

describe('exploreSaveHref', () => {
  it('keeps the search and the rows shown, and asks for the save', () => {
    const href = exploreSaveHref({ ...EMPTY_QUERY, q: 'computer science' }, 40, 'abc123')
    expect(href).toBe('/programs/search?q=computer+science&shown=40&save=abc123')
    // The save is no part of the list itself
    expect(readExplore(new URLSearchParams(href.split('?')[1]))).toEqual({
      query: { ...EMPTY_QUERY, q: 'computer science' },
      shown: 40
    })
  })
})

describe('exploreListUrl', () => {
  it('asks for a window without losing the Length filter', () => {
    const url = new URL(exploreListUrl({ ...EMPTY_QUERY, lengths: [3, 4] }, 40, 20), 'http://x')
    expect(url.pathname).toBe('/api/programs/explore')
    expect(readExplore(url.searchParams).query.lengths).toEqual([3, 4])
    expect(url.searchParams.get('offset')).toBe('40')
    expect(url.searchParams.get('limit')).toBe('20')
  })
})

describe('readPoints', () => {
  it('takes a whole number from 24 to 45, or nothing', () => {
    expect(readPoints(' 38 ')).toBe(38)
    expect(readPoints('')).toBeNull()
    expect(readPoints('52')).toBe('invalid')
    expect(readPoints('23')).toBe('invalid')
    expect(readPoints('35.5')).toBe('invalid')
    expect(readPoints('3e1')).toBe('invalid')
  })
})

describe('the chips', () => {
  const query: ExploreQuery = {
    ...EMPTY_QUERY,
    fields: [CS],
    countries: [CA, UK],
    to: 38,
    noMin: false,
    lengths: [4],
    qualify: true
  }

  it('names each applied filter, the switch last (D3.5, D4.7)', () => {
    expect(appliedChips(query, names).map((c) => c.label)).toEqual([
      'Computer Science',
      'Canada',
      'United Kingdom',
      'Up to 38 points',
      'Only with an IB minimum',
      '4 years',
      'Only ones I qualify for'
    ])
  })

  it('counts the choices behind "Filters · 3", not the switch', () => {
    expect(chosenCount(query)).toBe(6)
    expect(chosenCount({ ...EMPTY_QUERY, countries: [CA, NL, UK] })).toBe(3)
  })

  it('removes one chip at a time', () => {
    expect(removeChip(query, `country:${CA}`).countries).toEqual([UK])
    expect(removeChip(query, 'points')).toMatchObject({ from: null, to: null, noMin: false })
    expect(removeChip(query, 'length:4').lengths).toEqual([])
    expect(removeChip(query, 'qualify').qualify).toBe(false)
  })

  it('clears one filter, or all of them and the switch', () => {
    expect(clearFilter(query, 'points')).toMatchObject({ from: null, to: null, noMin: true })
    expect(clearFilter(query, 'countries').countries).toEqual([])
    expect(clearAll({ ...query, q: 'law', sort: 'low' })).toEqual({
      ...EMPTY_QUERY,
      q: 'law',
      sort: 'low'
    })
  })

  it('names a range on the IB points chip', () => {
    expect(pointsRange(null, 38)).toBe('up to 38')
    expect(pointsRange(34, null)).toBe('from 34')
    expect(pointsRange(34, 40)).toBe('34 to 40')
    expect(pointsRange(null, null)).toBeNull()
  })
})

describe('the words', () => {
  it('counts the list', () => {
    expect(countParts(73, 'computer science')).toEqual({
      figure: '73',
      rest: 'programs for “computer science”'
    })
    expect(countParts(1628, '')).toEqual({ figure: '1,628', rest: 'programs' })
    expect(countParts(1, '')).toEqual({ figure: '1', rest: 'program' })
  })

  it('puts the count on the button, and says when nothing matches', () => {
    expect(showLabel(43)).toBe('Show 43 programs')
    expect(showLabel(1)).toBe('Show 1 program')
    expect(showLabel(0)).toBe('No programs match')
    expect(showLabel(null)).toBe('Show programs')
  })

  it('sums up the catalogue', () => {
    expect(catalogueSummary(1628, 23)).toBe(
      '1,628 programs in 23 countries, each with its IB requirements.'
    )
  })

  it('names the filters when nothing matches (D2.11)', () => {
    expect(noResultsText({ ...EMPTY_QUERY, fields: [MED], countries: [NL] }, names)).toBe(
      'There are no Medicine & Health programs in the Netherlands on IB Match yet.'
    )
    expect(
      noResultsText(
        { ...EMPTY_QUERY, q: 'dentistry', countries: [CA, UK], to: 30, lengths: [3] },
        names
      )
    ).toBe(
      'There are no programs for “dentistry” in Canada or the UK with a minimum up to 30 taking 3 years on IB Match yet.'
    )
    expect(noResultsText({ ...EMPTY_QUERY, fields: [MED], qualify: true }, names)).toBe(
      'No Medicine & Health programs on IB Match meet every requirement with your grades yet.'
    )
  })
})
