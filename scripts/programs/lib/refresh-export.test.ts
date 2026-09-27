import ts from 'typescript'
import { describe, expect, it } from 'vitest'
import { canonicalDegreeType } from '@/lib/programs/degree-types'
import { exportFile, renderRefreshFile, slugify, storedComment } from './refresh-export'
import type { StoredProgram } from './refresh'

const program = (
  degreeType: string,
  entryYear: number | null,
  id = 'p1',
  name = 'Physics'
): StoredProgram => ({
  id,
  university: 'Example University',
  state: {
    name,
    description: 'Line one.\nIt\'s "quoted".',
    field: 'Sciences',
    degreeType,
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://example.ac.uk/physics',
    requirements: [
      { code: 'PHYS', level: 'HL', grade: 6, critical: true, group: null },
      { code: 'MATH-AA', level: 'SL', grade: 5, critical: true, group: 'g' },
      { code: 'MATH-AI', level: 'HL', grade: 5, critical: true, group: 'g' }
    ]
  },
  stamps: {
    requirementsVerified: entryYear !== null,
    requirementsUpdatedAt: new Date('2026-01-20T06:22:09Z'),
    requirementsEntryYear: entryYear
  }
})

describe('slugify', () => {
  it('makes a file name from a university name', () => {
    expect(slugify('Tel Aviv University')).toBe('tel-aviv-university')
    expect(slugify('Universitat Autònoma de Barcelona')).toBe('universitat-autonoma-de-barcelona')
    expect(slugify('ETH Zürich')).toBe('eth-zurich')
    expect(slugify('University of Gdańsk')).toBe('university-of-gdansk')
    expect(slugify('London School of Economics and Political Science')).toBe(
      'london-school-of-economics-and-political-science'
    )
  })
})

describe('exportFile', () => {
  it('writes every program unchecked, sorted by name, with the canonical degree', () => {
    const file = exportFile(
      'Example University',
      2027,
      '2026-09-26',
      [
        program('BSc', 2026, 'p1', 'Physics'),
        program('Bachelor of Science', null, 'p2', 'Chemistry')
      ],
      canonicalDegreeType
    )
    expect(file.programs.map((p) => [p.name, p.degree, p.checkedFor, p.sources])).toEqual([
      ['Chemistry', 'Bachelor of Science', null, []],
      ['Physics', 'Bachelor of Science', null, []]
    ])
    // Critical first, then HL before SL.
    expect(file.programs[1].requirements).toEqual([
      { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
      {
        anyOf: [
          { course: 'MATH-AA', level: 'SL', grade: 5 },
          { course: 'MATH-AI', level: 'HL', grade: 5 }
        ],
        critical: true
      }
    ])
  })
})

describe('storedComment', () => {
  it('says what was stored: the intake, the date and a degree spelling that changes', () => {
    expect(storedComment(program('BSc', 2026), canonicalDegreeType)).toBe(
      'Stored: checked for 2026 entry on 2026-01-20. Degree stored as "BSc".'
    )
    expect(storedComment(program('Bachelor of Science', null), canonicalDegreeType)).toBe(
      'Stored: not checked for any intake.'
    )
    expect(storedComment(program('Bachelor of Wizardry', null), canonicalDegreeType)).toBe(
      'Stored: not checked for any intake. Degree "Bachelor of Wizardry" is not in the list: choose one from lib/programs/degree-types.ts.'
    )
  })
})

describe('renderRefreshFile', () => {
  it('writes TypeScript that evaluates to the same file', () => {
    const file = exportFile(
      'Example University',
      2027,
      '2026-09-26',
      [program('BSc', 2026)],
      canonicalDegreeType
    )
    const text = renderRefreshFile(
      file,
      new Map([['p1', 'Stored: checked for 2026 entry on 2026-01-20.']]),
      'npx tsx scripts/programs/refresh.ts example-university'
    )
    expect(text).toContain("import type { RefreshFile } from '../lib/refresh'")
    expect(text).toContain('// Stored: checked for 2026 entry on 2026-01-20.\n{ id: "p1"')
    expect(text).toContain('Dry run: npx tsx scripts/programs/refresh.ts example-university')

    const { outputText } = ts.transpileModule(text, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
    })
    const loaded = { exports: {} as { default?: unknown } }
    new Function('module', 'exports', outputText)(loaded, loaded.exports)
    expect(loaded.exports.default).toEqual(file)
  })
})
