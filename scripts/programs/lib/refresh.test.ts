import { describe, expect, it } from 'vitest'
import { canonicalDegreeType } from '@/lib/programs/degree-types'
import { exportFile } from './refresh-export'
import {
  diffState,
  parseCheckedOn,
  planRefresh,
  planRestore,
  type Lookups,
  type RefreshFile,
  type RefreshProgram,
  type StoredProgram
} from './refresh'

const TODAY = new Date('2026-09-26T12:00:00Z')
const UNIVERSITY = 'Example University'

const lookups: Lookups = {
  courseCodes: new Set(['MATH-AA', 'MATH-AI', 'PHYS', 'CHEM', 'BIO']),
  fields: new Set(['Engineering', 'Sciences']),
  canonicalDegree: canonicalDegreeType
}

const stored = (overrides: Partial<StoredProgram['state']> = {}, id = 'p1'): StoredProgram => ({
  id,
  university: UNIVERSITY,
  state: {
    name: 'Physics',
    description: 'Study physics.',
    field: 'Sciences',
    degreeType: 'BSc',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://example.ac.uk/2026/physics',
    requirements: [
      { code: 'PHYS', level: 'HL', grade: 6, critical: true, group: null },
      { code: 'MATH-AA', level: 'SL', grade: 5, critical: true, group: 'g' },
      { code: 'MATH-AI', level: 'HL', grade: 5, critical: true, group: 'g' }
    ],
    ...overrides
  },
  stamps: {
    requirementsVerified: true,
    requirementsUpdatedAt: new Date('2026-01-20T06:22:09Z'),
    requirementsEntryYear: 2026
  }
})

/** The file `--export` writes for these programs, as a session would start from it. */
const exported = (programs: StoredProgram[]): RefreshFile =>
  exportFile(UNIVERSITY, 2027, '2026-09-26', programs, canonicalDegreeType)

/** The exported file with the first program edited. */
const withProgram = (
  programs: StoredProgram[],
  edit: Partial<RefreshProgram>,
  index = 0
): RefreshFile => {
  const file = exported(programs)
  file.programs[index] = { ...file.programs[index], ...edit }
  return file
}

const checked = { checkedFor: 2027, sources: ['https://example.ac.uk/2027/physics'] }

describe('planRefresh', () => {
  it('finds nothing to do in a fresh export: every program is unchecked', () => {
    const programs = [
      stored(),
      stored({ name: 'Chemistry', degreeType: 'Bachelor of Science' }, 'p2')
    ]
    const plan = planRefresh(exported(programs), programs, lookups, TODAY)
    expect(plan.errors).toEqual([])
    expect(plan.writes).toEqual([])
    expect(plan.unchecked).toEqual(['Chemistry', 'Physics'])
    expect(plan.notInFile).toEqual([])
  })

  it('stamps a checked program that did not change, and normalises its degree', () => {
    const plan = planRefresh(withProgram([stored()], checked), [stored()], lookups, TODAY)
    expect(plan.errors).toEqual([])
    expect(plan.writes).toHaveLength(1)
    const [write] = plan.writes
    expect(write.changes).toEqual(['Degree: "BSc" → "Bachelor of Science"'])
    expect(write.requirementsChanged).toBe(false)
    expect(write.stampChanges).toEqual([
      'Checked for: 2026 → 2027',
      'Checked on: 2026-01-20 → 2026-09-26'
    ])
    expect(write.stamps).toEqual({
      requirementsVerified: true,
      requirementsUpdatedAt: new Date('2026-09-26T00:00:00Z'),
      requirementsEntryYear: 2027
    })
  })

  it('lists every change to a checked program', () => {
    const file = withProgram([stored()], {
      ...checked,
      name: 'Physics BSc',
      minIBPoints: 37,
      programUrl: 'https://example.ac.uk/2027/physics',
      duration: '4 years',
      field: 'Engineering',
      description: 'Physics, 2027.',
      requirements: [{ courses: ['PHYS'], level: 'HL', grade: 7 }]
    })
    const [write] = planRefresh(file, [stored()], lookups, TODAY).writes
    expect(write.changes).toEqual([
      'Name: "Physics" → "Physics BSc"',
      'URL: https://example.ac.uk/2026/physics → https://example.ac.uk/2027/physics',
      'Points: 38 → 37',
      'Subjects: PHYS HL6; (MATH-AA SL5 or MATH-AI HL5) → PHYS HL7',
      'Degree: "BSc" → "Bachelor of Science"',
      'Duration: "3 years" → "4 years"',
      'Field: Sciences → Engineering',
      'Description: rewritten (14 → 14 characters)'
    ])
    expect(write.requirementsChanged).toBe(true)
  })

  it('reports a program already written as up to date', () => {
    const now = stored({ degreeType: 'Bachelor of Science' })
    now.stamps = {
      requirementsVerified: true,
      requirementsUpdatedAt: new Date('2026-09-26T00:00:00Z'),
      requirementsEntryYear: 2027
    }
    const plan = planRefresh(withProgram([now], checked), [now], lookups, TODAY)
    expect(plan.writes).toEqual([])
    expect(plan.upToDate).toEqual(['Physics'])
  })

  it('refuses edits to a program that is not checked, so nothing unverified is written', () => {
    const plan = planRefresh(
      withProgram([stored()], { minIBPoints: 36 }),
      [stored()],
      lookups,
      TODAY
    )
    expect(plan.errors).toEqual([
      'Physics (p1): edited but not checked. Set checkedFor to the intake the sources state, or undo: Points: 38 → 36'
    ])
  })

  it('lists programs whose sources describe an earlier intake', () => {
    const file = withProgram([stored()], { ...checked, checkedFor: 2026 })
    const plan = planRefresh(file, [stored()], lookups, TODAY)
    expect(plan.earlierIntake).toEqual([{ name: 'Physics', checkedFor: 2026 }])
    expect(plan.writes[0].stamps.requirementsEntryYear).toBe(2026)
  })

  it('creates a checked new program', () => {
    const file = exported([stored()])
    file.programs.push({
      ...file.programs[0],
      id: undefined,
      status: 'new',
      name: 'Astrophysics',
      ...checked
    })
    const plan = planRefresh(file, [stored()], lookups, TODAY)
    expect(plan.errors).toEqual([])
    expect(
      plan.creates.map((c) => [c.name, c.target.degreeType, c.stamps.requirementsEntryYear])
    ).toEqual([['Astrophysics', 'Bachelor of Science', 2027]])
  })

  it('refuses a new program that is unchecked, or whose name is already stored', () => {
    const file = exported([stored()])
    const base = { ...file.programs[0], id: undefined, status: 'new' as const }
    file.programs.push({ ...base, name: 'Astrophysics' }, { ...base, name: 'physics', ...checked })
    expect(planRefresh(file, [stored()], lookups, TODAY).errors).toEqual([
      'Astrophysics: a new program must be checked; set checkedFor',
      'physics: Example University already has "Physics" (p1). If it was created by an earlier --apply, make it status current with id \'p1\'.'
    ])
  })

  it('reports discontinued programs and never writes them', () => {
    const file = withProgram([stored()], {
      status: 'discontinued',
      minIBPoints: 0,
      notes: 'Page gone; not in the 2027 list.'
    })
    const plan = planRefresh(file, [stored()], lookups, TODAY)
    expect(plan.errors).toEqual([])
    expect(plan.writes).toEqual([])
    expect(plan.discontinued).toEqual([
      { id: 'p1', name: 'Physics', notes: 'Page gone; not in the 2027 list.' }
    ])
  })

  it('lists stored programs missing from the file', () => {
    const programs = [stored(), stored({ name: 'Chemistry' }, 'p2')]
    const plan = planRefresh(exported([programs[0]]), programs, lookups, TODAY)
    expect(plan.notInFile).toEqual([{ id: 'p2', name: 'Chemistry' }])
  })

  it('checks every field against the reference data and the conventions', () => {
    const file = withProgram([stored()], {
      ...checked,
      sources: [],
      field: 'Astrology',
      degree: 'BSc' as RefreshProgram['degree'],
      minIBPoints: 50,
      checkedFor: 2028,
      requirements: [{ courses: ['LATIN'], level: 'HL', grade: 8 }]
    })
    expect(planRefresh(file, [stored()], lookups, TODAY).errors).toEqual([
      'Physics (p1): field "Astrology" is not a field of study',
      'Physics (p1): degree "BSc" is not in the degree type list (lib/programs/degree-types.ts)',
      'Physics (p1): minIBPoints 50 is not a total from 24 to 45',
      'Physics (p1): requirement 1: unknown IB course code LATIN',
      'Physics (p1): requirement 1: grade 8 is not 1 to 7',
      'Physics (p1): checkedFor 2028 is not a year from 2020 to 2027',
      'Physics (p1): is checked but lists no sources'
    ])
  })

  it('requires a note when a checked program has no subject requirements', () => {
    const file = withProgram([stored()], { ...checked, requirements: [] })
    expect(planRefresh(file, [stored()], lookups, TODAY).errors).toEqual([
      'Physics (p1): has no subject requirements: say "checked, none required" in notes'
    ])
    file.programs[0].notes = 'Checked, none required.'
    expect(planRefresh(file, [stored()], lookups, TODAY).errors).toEqual([])
  })

  it('refuses ids that are unknown, repeated or at another university', () => {
    const elsewhere = { ...stored({}, 'p9'), university: 'Other University' }
    const file = exported([stored()])
    file.programs.push(
      { ...file.programs[0] },
      { ...file.programs[0], id: 'p9' },
      { ...file.programs[0], id: 'nope' }
    )
    expect(planRefresh(file, [stored(), elsewhere], lookups, TODAY).errors).toEqual([
      'Physics (p1): listed twice',
      'Physics (p9): belongs to Other University, not Example University',
      'Physics (nope): not in the database'
    ])
  })

  it('refuses a rename onto another program’s name', () => {
    const programs = [stored(), stored({ name: 'Chemistry' }, 'p2')]
    const file = withProgram(programs, { ...checked, name: 'Chemistry' }, 1)
    // Programs export sorted by name: Chemistry (p2) first, then Physics (p1).
    file.programs[1] = { ...file.programs[1], name: 'chemistry' }
    expect(planRefresh(file, programs, lookups, TODAY).errors).toEqual([
      'chemistry (p1): renamed to the name of p2'
    ])
  })

  it('checks the file itself', () => {
    const file = { ...exported([stored()]), checkedOn: '2026-09-27' }
    expect(planRefresh(file, [stored()], lookups, TODAY).errors).toEqual([
      'checkedOn 2026-09-27 is in the future'
    ])
  })

  it('names a 1.2 file for what it is, once', () => {
    const oxford = {
      university: UNIVERSITY,
      entryYear: 2027,
      checkedOn: '2026-09-24',
      programs: [
        { id: 'p1', name: 'Physics' },
        { id: 'p2', name: 'Chemistry' }
      ]
    } as unknown as RefreshFile
    const { errors } = planRefresh(oxford, [stored()], lookups, TODAY)
    expect(errors).toHaveLength(1)
    expect(errors[0]).toMatch(/no program has a status.*apply-2027-requirements/)
  })
})

describe('planRestore', () => {
  it('writes back what changed, stamps included, and skips what already matches', () => {
    const before = stored()
    const now = stored({ minIBPoints: 37 })
    now.stamps = { ...now.stamps, requirementsEntryYear: 2027 }
    const plan = planRestore([before], [now])
    expect(plan.writes.map((w) => [w.changes, w.stampChanges])).toEqual([
      [['Points: 37 → 38'], ['Checked for: 2027 → 2026']]
    ])
    expect(planRestore([before], [stored()]).upToDate).toEqual(['Physics'])
  })

  it('keeps a stored spelling outside the degree list', () => {
    const plan = planRestore([stored()], [stored({ degreeType: 'Bachelor of Science' })])
    expect(plan.writes[0].target.degreeType).toBe('BSc')
  })
})

describe('diffState', () => {
  it('is empty for the same state', () => {
    expect(diffState(stored().state, stored().state)).toEqual([])
  })
})

describe('parseCheckedOn', () => {
  it('reads a real date as midnight UTC and refuses anything else', () => {
    expect(parseCheckedOn('2026-09-26')).toEqual(new Date('2026-09-26T00:00:00Z'))
    expect(parseCheckedOn('2026-02-30')).toBeNull()
    expect(parseCheckedOn('26 September 2026')).toBeNull()
  })
})
