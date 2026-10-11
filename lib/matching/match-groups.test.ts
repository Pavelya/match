import { describe, expect, it } from 'vitest'
import {
  compareBestFit,
  jumpLabel,
  showMoreLabel,
  sortMatches,
  summaryText,
  type MatchItem
} from './match-groups'

function item(
  name: string,
  university: string,
  score: number,
  minIBPoints: number | null,
  country = 'United Kingdom'
): MatchItem {
  return {
    id: `${university}/${name}`,
    name,
    university,
    country,
    image: null,
    initials: 'U',
    minIBPoints,
    score,
    status: 'meets',
    badge: 'Meets all requirements',
    chips: [],
    why: {} as MatchItem['why']
  }
}

const names = (items: MatchItem[]) => items.map((m) => `${m.university} ${m.name}`)

describe('best fit (D4.6)', () => {
  it('score, then the minimum closest to the total, then no minimum, then A–Z', () => {
    const items = [
      item('Economics', 'University of Michigan', 100, null, 'United States'),
      item('Commerce', 'University of British Columbia', 100, 37, 'Canada'),
      item('Management', 'LSE', 100, 38),
      item('Accounting', 'LSE', 88, 39),
      item('Computer Science', 'Trinity College Dublin', 100, 37, 'Ireland'),
      item('Economics', 'LSE', 100, 38),
      item('Data Science', 'University of Michigan', 100, null, 'United States')
    ]
    expect(names([...items].sort(compareBestFit(38)))).toEqual([
      'LSE Economics',
      'LSE Management',
      'Trinity College Dublin Computer Science',
      'University of British Columbia Commerce',
      'University of Michigan Data Science',
      'University of Michigan Economics',
      'LSE Accounting'
    ])
  })

  it('lowest points needed and country put no minimum last', () => {
    const items = [
      item('A', 'MIT', 100, null, 'United States'),
      item('B', 'Toronto', 90, 37, 'Canada'),
      item('C', 'Arizona State', 100, 30, 'United States'),
      item('D', 'McGill', 100, 33, 'Canada')
    ]
    expect(names(sortMatches(items, 'points', 38))).toEqual([
      'Arizona State C',
      'McGill D',
      'Toronto B',
      'MIT A'
    ])
    expect(names(sortMatches(items, 'country', 38))).toEqual([
      'McGill D',
      'Toronto B',
      'Arizona State C',
      'MIT A'
    ])
    // A new list: the one passed in keeps its order
    expect(names(items)[0]).toBe('MIT A')
  })
})

describe('the words around the list', () => {
  it('counts the groups for the jump links', () => {
    expect(jumpLabel('meets', 139)).toBe('139 meet all requirements')
    expect(jumpLabel('meets', 1)).toBe('1 meets all requirements')
    expect(jumpLabel('close', 21)).toBe('21 within reach')
    expect(jumpLabel('gap', 11)).toBe('11 missing a requirement')
  })

  it('shows 20 more, or the remainder', () => {
    expect(showMoreLabel(5, 139)).toBe('Show 20 more')
    expect(showMoreLabel(5, 21)).toBe('Show 16 more')
  })

  it('summarises the list, counting fields and countries on a phone', () => {
    expect(summaryText(171, 2, 5, false)).toBe(
      '171 programs in your fields and countries, grouped by how close you are.'
    )
    expect(summaryText(171, 2, 5, true)).toBe(
      '171 programs in your 2 fields and 5 countries, grouped by how close you are.'
    )
    expect(summaryText(38, 1, 2, false)).toBe(
      '38 programs in your field and countries, grouped by how close you are.'
    )
    expect(summaryText(38, 1, 2, true)).toBe(
      '38 programs in your field and 2 countries, grouped by how close you are.'
    )
    expect(summaryText(1, 0, 0, true)).toBe(
      '1 program near your total, grouped by how close you are.'
    )
  })
})
