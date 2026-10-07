import { describe, expect, it } from 'vitest'
import {
  DISCIPLINES,
  FIELD_DESCRIPTIONS,
  FIELD_NAMES,
  KEPT,
  findDisciplines,
  findOutliers,
  homeOf,
  postgresPattern
} from './fields-of-study'

const fieldOf = (name: string) => homeOf(name)?.field ?? null

describe('the discipline table', () => {
  it('gives each discipline one name and one home', () => {
    const names = DISCIPLINES.map((d) => d.name)
    expect(new Set(names).size).toBe(names.length)
    for (const d of DISCIPLINES) expect(FIELD_NAMES).toContain(d.field)
  })

  it('writes stems that Postgres reads the same way', () => {
    for (const d of DISCIPLINES) {
      for (const stem of d.stems) expect(stem).toMatch(/^(?:[a-z ?|()-]|\(\?:|\\b)+$/)
    }
  })

  it('turns \\b into Postgres word ends', () => {
    const law = DISCIPLINES.find((d) => d.name === 'Law')!
    expect(postgresPattern(law)).toBe(
      '\\m(?:laws?\\M|legal|jurisprud|(?:criminal|international) justice|llb\\M)'
    )
  })

  it('keeps exceptions in real fields', () => {
    for (const k of Object.values(KEPT)) expect(FIELD_NAMES).toContain(k.field)
  })
})

describe('the field descriptions', () => {
  it('describe every field', () => {
    expect(Object.keys(FIELD_DESCRIPTIONS).sort()).toEqual([...FIELD_NAMES].sort())
  })

  it("name only their own field's disciplines", () => {
    for (const field of FIELD_NAMES) {
      const others = findDisciplines(FIELD_DESCRIPTIONS[field])
        .filter((m) => !m.discipline.weak && m.discipline.field !== field)
        .map((m) => `${m.discipline.name} (${m.discipline.field})`)
      expect({ field, others }).toEqual({ field, others: [] })
    }
  })

  it('name no discipline under two fields', () => {
    for (const d of DISCIPLINES.filter((x) => !x.weak)) {
      const word = new RegExp(`\\b${d.name}\\b`, 'i')
      const under = FIELD_NAMES.filter((f) => word.test(FIELD_DESCRIPTIONS[f]))
      expect(under.filter((f) => f !== d.field)).toEqual([])
    }
  })

  it('no longer repeat the overlaps the audit found', () => {
    expect(FIELD_DESCRIPTIONS.Engineering).not.toMatch(/Computer Science/)
    expect(FIELD_DESCRIPTIONS['Social Sciences']).not.toMatch(/Economics/)
    expect(FIELD_DESCRIPTIONS['Natural Sciences']).not.toMatch(/Environmental/)
    expect(FIELD_DESCRIPTIONS['Natural Sciences']).toMatch(/^Mathematics/)
  })
})

describe('homeOf', () => {
  it('files one discipline under its home', () => {
    expect(fieldOf('Economics')).toBe('Business & Economics')
    expect(fieldOf('Economics (BSc)')).toBe('Business & Economics')
    expect(fieldOf('BA Social Anthropology')).toBe('Social Sciences')
    expect(fieldOf('History, BA (Hons)')).toBe('Arts & Humanities')
  })

  it('files a compound under its head, the last discipline', () => {
    expect(fieldOf('Biomedical Engineering')).toBe('Engineering')
    expect(fieldOf('Economic History')).toBe('Arts & Humanities')
    expect(fieldOf('Mathematical Finance')).toBe('Business & Economics')
    expect(fieldOf('Financial Mathematics and Statistics')).toBe('Natural Sciences')
  })

  it('files "X of Y" and "X for Y" under X', () => {
    expect(fieldOf('BSc Psychology of Education')).toBe('Social Sciences')
    expect(fieldOf('History of Art')).toBe('Arts & Humanities')
    expect(fieldOf("Bachelor's in Applied Mathematics for Economics and Management")).toBe(
      'Natural Sciences'
    )
  })

  it('files a joint degree under its first-named discipline', () => {
    expect(homeOf('Mathematics and Economics (Honors)')).toMatchObject({
      field: 'Natural Sciences',
      named: [{ name: 'Mathematics' }, { name: 'Economics' }]
    })
    expect(fieldOf('Economics and Mathematics MA (Hons)')).toBe('Business & Economics')
    expect(fieldOf('BSc Geography with Economics')).toBe('Social Sciences')
  })

  it('reads adjectives joined by "and" as one compound', () => {
    expect(fieldOf('Electrical and Computer Engineering')).toBe('Engineering')
    expect(fieldOf('BSc in Sustainable and Green Finance')).toBe('Business & Economics')
    expect(fieldOf('Chemical and Physical Sciences')).toBe('Natural Sciences')
    // "Music" ends like an adjective but is not one.
    expect(fieldOf('Music - Performance Based Pedagogy')).toBe('Arts & Humanities')
  })

  it('prefers the longer discipline where two overlap', () => {
    expect(fieldOf('Computer Engineering')).toBe('Engineering')
    expect(fieldOf('Computer Science')).toBe('Computer Science')
    expect(fieldOf('Chemical Engineering')).toBe('Engineering')
    expect(fieldOf('Chemical Sciences')).toBe('Natural Sciences')
    expect(fieldOf('Software Engineering (Vejle)')).toBe('Computer Science')
  })

  it('skips degree titles, and reads brackets only when nothing else names a subject', () => {
    expect(fieldOf('Bachelor of Engineering Honours (Software Engineering)')).toBe(
      'Computer Science'
    )
    expect(fieldOf('Bachelor of Engineering in Computer Engineering')).toBe('Engineering')
    expect(fieldOf('Data Science (Okanagan)')).toBe('Computer Science')
    expect(fieldOf('Primary Education (English)')).toBe('Education')
    expect(fieldOf('Bachelor of Design')).toBe('Architecture')
  })

  it('applies the special cases', () => {
    expect(homeOf('Bachelor of Economics and Bachelor of Laws')).toMatchObject({
      field: 'Law',
      rule: 'a double degree with a Bachelor of Laws is Law'
    })
    expect(fieldOf('Politics, Philosophy and Economics')).toBe('Social Sciences')
    expect(fieldOf('BSc Philosophy and Economics')).toBe('Arts & Humanities')
  })

  it('says nothing about a name with no discipline, or only "Science"', () => {
    expect(homeOf('Bachelor of Science in Innovation and Technology')).toBeNull()
    expect(homeOf('Human Sciences')).toBeNull()
    expect(fieldOf('Science (Group A) with Extended Major in Artificial Intelligence')).toBe(
      'Natural Sciences'
    )
  })
})

describe('findOutliers', () => {
  const at = (id: string, name: string, field: string) => ({
    id,
    name,
    field,
    university: 'Example University'
  })

  it('sorts what is filed elsewhere by kind, and passes what is filed right', () => {
    const { outliers } = findOutliers(
      [
        at('a', 'Economics', 'Social Sciences'),
        at('b', 'Mathematics and Economics', 'Business & Economics'),
        at('c', 'Geography with Economics', 'Environmental Studies'),
        at('d', 'Politics, Philosophy and Economics', 'Business & Economics'),
        at('e', 'Economics', 'Business & Economics'),
        at('f', 'Innovation and Technology', 'Computer Science')
      ],
      {}
    )
    expect(outliers.map((o) => [o.id, o.kind, o.home])).toEqual([
      ['a', 'single', 'Business & Economics'],
      ['b', 'joint-other', 'Natural Sciences'],
      ['c', 'joint-none', 'Social Sciences'],
      ['d', 'special', 'Social Sciences']
    ])
    expect(outliers[1].reason).toBe('Mathematics + Economics')
  })

  it("lists a kept program only when it is not in the owner's field", () => {
    const kept = { k: { name: 'Kept', field: 'Media' as const, why: 'marketing' } }
    expect(findOutliers([at('k', 'Sustainability in Marketing', 'Media')], kept)).toEqual({
      outliers: [],
      kept: ['k']
    })
    const { outliers } = findOutliers([at('k', 'Sustainability in Marketing', 'Law')], kept)
    expect(outliers).toMatchObject([{ id: 'k', kind: 'kept', home: 'Media', reason: 'marketing' }])
  })
})
