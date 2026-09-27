import { describe, expect, it } from 'vitest'
import {
  assignGroupIds,
  defsFromRows,
  diffProgram,
  formatRequirements,
  rowsFromDefs,
  sameRequirements,
  type ProgramState,
  type RequirementRow
} from './requirements-diff'

const row = (
  code: string,
  grade: number,
  group: string | null = null,
  critical = true
): RequirementRow => ({ code, level: 'HL', grade, critical, group })

const program = (overrides: Partial<ProgramState> = {}): ProgramState => ({
  name: 'Mathematics',
  programUrl: 'https://example.ac.uk/maths',
  minIBPoints: 39,
  requirements: [row('MATH-AA', 7, 'g1'), row('MATH-AI', 7, 'g1')],
  ...overrides
})

describe('rowsFromDefs', () => {
  it('turns a multi-course definition into one OR group and a single course into a standalone row', () => {
    const rows = rowsFromDefs([
      { courses: ['CHEM'], level: 'HL', grade: 7 },
      { courses: ['BIO', 'PHYS'], level: 'HL', grade: 6, critical: false }
    ])
    expect(rows).toEqual([
      { code: 'CHEM', level: 'HL', grade: 7, critical: true, group: null },
      { code: 'BIO', level: 'HL', grade: 6, critical: false, group: 'def-1' },
      { code: 'PHYS', level: 'HL', grade: 6, critical: false, group: 'def-1' }
    ])
  })
})

describe('rowsFromDefs with mixed OR groups', () => {
  it('gives each anyOf option its own level and grade, in one group', () => {
    const rows = rowsFromDefs([
      {
        anyOf: [
          { course: 'MATH-AA', level: 'SL', grade: 5 },
          { course: 'MATH-AI', level: 'HL', grade: 5 }
        ]
      }
    ])
    expect(rows).toEqual([
      { code: 'MATH-AA', level: 'SL', grade: 5, critical: true, group: 'def-0' },
      { code: 'MATH-AI', level: 'HL', grade: 5, critical: true, group: 'def-0' }
    ])
  })
})

describe('defsFromRows', () => {
  it('writes a group whose options share a level and grade as courses', () => {
    expect(defsFromRows([row('MATH-AI', 6, 'g'), row('MATH-AA', 6, 'g')])).toEqual([
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
    ])
  })

  it('writes a group whose options differ as anyOf', () => {
    const rows = [row('MATH-AI', 5, 'g'), { ...row('MATH-AA', 5, 'g'), level: 'SL' as const }]
    expect(defsFromRows(rows)).toEqual([
      {
        anyOf: [
          { course: 'MATH-AA', level: 'SL', grade: 5 },
          { course: 'MATH-AI', level: 'HL', grade: 5 }
        ],
        critical: true
      }
    ])
  })

  it('lists critical requirements first, and marks a group critical if any option is', () => {
    const rows = [
      row('CS', 5, null, false),
      row('BIO', 6, 'g', false),
      row('PHYS', 6, 'g', true),
      row('CHEM', 7)
    ]
    expect(defsFromRows(rows)).toEqual([
      { courses: ['BIO', 'PHYS'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 7, critical: true },
      { courses: ['CS'], level: 'HL', grade: 5, critical: false }
    ])
  })

  it('round-trips: rowsFromDefs gives back the same requirements', () => {
    const rows = [
      row('CHEM', 7),
      row('BIO', 6, 'a'),
      { ...row('BIO', 7, 'a'), level: 'SL' as const },
      row('PHYS', 5, 'b', false),
      row('ENG-LL', 4, 'solo')
    ]
    expect(sameRequirements(rows, rowsFromDefs(defsFromRows(rows)))).toBe(true)
  })

  it('returns nothing for no requirements', () => {
    expect(defsFromRows([])).toEqual([])
  })
})

describe('sameRequirements', () => {
  it('ignores the order of groups, of options, and the group ids themselves', () => {
    const stored = [row('PHYS', 6, 'x'), row('BIO', 6, 'x'), row('CHEM', 7)]
    const target = rowsFromDefs([
      { courses: ['CHEM'], level: 'HL', grade: 7 },
      { courses: ['BIO', 'PHYS'], level: 'HL', grade: 6 }
    ])
    expect(sameRequirements(stored, target)).toBe(true)
  })

  it('treats two separate requirements as different from one OR group of the same subjects', () => {
    // Cambridge English was stored as ENG-LIT and ENG-LL both required.
    const bothRequired = [row('ENG-LIT', 7), row('ENG-LL', 7)]
    const either = [row('ENG-LIT', 7, 'g'), row('ENG-LL', 7, 'g')]
    expect(sameRequirements(bothRequired, either)).toBe(false)
  })

  it('reads an OR group as critical when any option is, as the matcher does', () => {
    const mixed = [row('BIO', 6, 'g', true), row('PHYS', 6, 'g', false)]
    const allCritical = [row('BIO', 6, 'g', true), row('PHYS', 6, 'g', true)]
    expect(sameRequirements(mixed, allCritical)).toBe(true)
  })

  it('notices a grade, level or critical change', () => {
    expect(sameRequirements([row('HIST', 7)], [row('HIST', 6)])).toBe(false)
    expect(sameRequirements([row('HIST', 6)], [{ ...row('HIST', 6), level: 'SL' }])).toBe(false)
    expect(sameRequirements([row('MUSIC', 6)], [row('MUSIC', 6, null, false)])).toBe(false)
  })
})

describe('diffProgram', () => {
  it('returns nothing when the program already matches', () => {
    expect(diffProgram(program(), program())).toEqual([])
  })

  it('lists every field that changes', () => {
    const current = program({ minIBPoints: 40, requirements: [row('MATH-AA', 7)] })
    const target = program({ name: 'Maths', programUrl: 'https://example.ac.uk/new' })
    expect(diffProgram(current, target)).toEqual([
      'Name: "Mathematics" → "Maths"',
      'URL: https://example.ac.uk/maths → https://example.ac.uk/new',
      'Points: 40 → 39',
      'Subjects: MATH-AA HL7 → (MATH-AA or MATH-AI) HL7'
    ])
  })

  it('shows empty points and no subjects in words', () => {
    const current = program({ minIBPoints: null, requirements: [row('GEOG', 7)] })
    const target = program({ minIBPoints: 41, requirements: [] })
    expect(diffProgram(current, target)).toEqual([
      'Points: empty → 41',
      'Subjects: GEOG HL7 → none'
    ])
  })
})

describe('formatRequirements', () => {
  it('writes mixed-grade OR groups option by option and marks non-critical groups', () => {
    const rows = [row('CHEM', 7, 'g', false), row('PHYS', 5, 'g', false), row('CS', 5, null, false)]
    expect(formatRequirements(rows)).toBe('(CHEM HL7 or PHYS HL5) (nc); CS HL5 (nc)')
  })
})

describe('assignGroupIds', () => {
  it('gives each OR group one fresh id and standalone rows none', () => {
    let n = 0
    const rows = assignGroupIds(
      [row('CHEM', 7), row('BIO', 6, 'a'), row('PHYS', 6, 'a'), row('MATH-AA', 6, 'b')],
      () => `id-${++n}`
    )
    expect(rows.map((r) => [r.code, r.orGroupId])).toEqual([
      ['CHEM', null],
      ['BIO', 'id-1'],
      ['PHYS', 'id-1'],
      ['MATH-AA', 'id-2']
    ])
  })
})
