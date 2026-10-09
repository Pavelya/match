import { describe, expect, it } from 'vitest'
import { countLabel, filterPickerGroups, findMatch, type PickerGroup } from './picker-filter'

const GROUPS: PickerGroup[] = [
  {
    label: 'Group 1 · Language and literature',
    options: [
      { value: 'ENG-LL', label: 'English A: Language & Literature' },
      {
        value: 'ENG-LIT',
        label: 'English A: Literature',
        disabled: true,
        note: 'In your subjects'
      },
      { value: 'FRA-LL', label: 'French A: Language & Literature' },
      { value: 'FRA-LIT', label: 'French A: Literature' }
    ]
  },
  {
    label: 'Group 2 · Language acquisition',
    options: [
      { value: 'FRA-AB', label: 'French ab initio' },
      { value: 'FRA-B', label: 'French B' },
      { value: 'SPA-B', label: 'Spanish B' }
    ]
  },
  {
    label: 'Group 5 · Mathematics',
    options: [
      { value: 'MATH-AA', label: 'Mathematics: Analysis and Approaches' },
      { value: 'MATH-AI', label: 'Mathematics: Applications and Interpretation' }
    ]
  },
  {
    label: 'Group 6 · The arts',
    options: [{ value: 'LIT-PERF', label: 'Literature and Performance' }]
  }
]

const labels = (groups: PickerGroup[]) => groups.map((group) => group.options.map((o) => o.label))

describe('filterPickerGroups', () => {
  it('keeps every option for a blank query', () => {
    expect(filterPickerGroups(GROUPS, '   ')).toEqual(GROUPS)
  })

  it('matches anywhere in the name, ignoring case', () => {
    expect(labels(filterPickerGroups(GROUPS, 'lit'))).toEqual([
      [
        'English A: Language & Literature',
        'English A: Literature',
        'French A: Language & Literature',
        'French A: Literature'
      ],
      ['Literature and Performance']
    ])
  })

  it('leaves out groups with nothing left', () => {
    const result = filterPickerGroups(GROUPS, 'fre')
    expect(result.map((group) => group.label)).toEqual([
      'Group 1 · Language and literature',
      'Group 2 · Language acquisition'
    ])
    expect(result.flatMap((group) => group.options)).toHaveLength(4)
  })

  it("puts the row's own group first and keeps the rest in order", () => {
    expect(filterPickerGroups(GROUPS, '', 'Group 5 · Mathematics').map((g) => g.label)).toEqual([
      'Group 5 · Mathematics',
      'Group 1 · Language and literature',
      'Group 2 · Language acquisition',
      'Group 6 · The arts'
    ])
  })

  it('keeps a subject the student already has, still marked', () => {
    const taken = filterPickerGroups(GROUPS, 'english a: lit')[0].options
    expect(taken).toEqual([GROUPS[0].options[1]])
  })

  it('ignores accents both ways', () => {
    const groups = [{ label: 'Group 2', options: [{ value: 'x', label: 'Français B' }] }]
    expect(filterPickerGroups(groups, 'francais')).toHaveLength(1)
    expect(filterPickerGroups(GROUPS, 'Frénch')).toHaveLength(2)
  })

  it('returns nothing when nothing matches', () => {
    expect(filterPickerGroups(GROUPS, 'Korean A')).toEqual([])
  })
})

describe('findMatch', () => {
  it('finds the first place the query appears', () => {
    expect(findMatch('French B', 'fre')).toEqual([0, 3])
    expect(findMatch('English A: Language & Literature', 'lit')).toEqual([22, 25])
  })

  it('maps back across accented letters', () => {
    expect(findMatch('Français B', 'cais')).toEqual([4, 8])
  })

  it('is null for a blank or missing query', () => {
    expect(findMatch('French B', '')).toBeNull()
    expect(findMatch('French B', 'xyz')).toBeNull()
  })
})

describe('countLabel', () => {
  it('says how many match', () => {
    expect(countLabel(4)).toBe('4 subjects')
    expect(countLabel(1)).toBe('1 subject')
    expect(countLabel(0)).toBe('No subjects')
  })
})
