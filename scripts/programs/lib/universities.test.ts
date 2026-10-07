import { describe, expect, it } from 'vitest'
import { planUniversities, type UniversitiesFile, type UniversityDef } from './universities'

const COUNTRIES = new Set(['Denmark', 'Austria'])

const university = (overrides: Partial<UniversityDef> = {}): UniversityDef => ({
  name: 'Example University',
  abbreviatedName: 'EU',
  description: 'A public university.',
  country: 'Denmark',
  city: 'Odense',
  classification: 'PUBLIC',
  studentPopulation: 12000,
  websiteUrl: 'https://www.example.dk/en',
  email: null,
  phone: null,
  sources: ['https://www.example.dk/en/facts'],
  ...overrides
})

const file = (...universities: UniversityDef[]): UniversitiesFile => ({
  checkedOn: '2026-10-04',
  universities
})

describe('planUniversities', () => {
  it('creates a university that is not stored', () => {
    const plan = planUniversities(file(university()), ['Copenhagen Business School'], COUNTRIES)
    expect(plan.errors).toEqual([])
    expect(plan.creates.map((u) => u.name)).toEqual(['Example University'])
    expect(plan.existing).toEqual([])
  })

  it('leaves one stored under the same name, in any case, as it is', () => {
    const plan = planUniversities(file(university()), ['  example university '], COUNTRIES)
    expect(plan.errors).toEqual([])
    expect(plan.creates).toEqual([])
    expect(plan.existing).toEqual(['Example University'])
  })

  it('refuses an unknown country, a bad classification and a missing source', () => {
    const plan = planUniversities(
      file(
        university({
          country: 'Atlantis',
          classification: 'STATE' as UniversityDef['classification'],
          sources: []
        })
      ),
      [],
      COUNTRIES
    )
    expect(plan.creates).toEqual([])
    expect(plan.errors).toEqual([
      'Example University: country "Atlantis" is not in Country',
      'Example University: classification "STATE" is not PUBLIC or PRIVATE',
      'Example University: lists no sources'
    ])
  })

  it('refuses a population that is not a positive whole number, but allows none', () => {
    const bad = planUniversities(file(university({ studentPopulation: 0 })), [], COUNTRIES)
    expect(bad.errors).toEqual([
      'Example University: studentPopulation 0 is not a positive whole number'
    ])
    const none = planUniversities(file(university({ studentPopulation: null })), [], COUNTRIES)
    expect(none.errors).toEqual([])
  })

  it('refuses a name listed twice and web addresses that are not', () => {
    const plan = planUniversities(
      file(university(), university({ name: 'EXAMPLE University', websiteUrl: 'example.dk' })),
      [],
      COUNTRIES
    )
    expect(plan.errors).toEqual([
      'EXAMPLE University: websiteUrl "example.dk" is not a web address',
      'EXAMPLE University: is listed twice'
    ])
    expect(plan.creates.map((u) => u.name)).toEqual(['Example University'])
  })

  it('refuses a city that lists several places, and a description ending with a credit', () => {
    const plan = planUniversities(
      file(
        university({
          city: 'Odense, Sønderborg, Vejle',
          description:
            'A public university.\n\nImage: By Soerens, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=799031'
        })
      ),
      [],
      COUNTRIES
    )
    expect(plan.errors).toEqual([
      'Example University: description ends with an image credit: add it with the image, in /admin/universities',
      'Example University: city "Odense, Sønderborg, Vejle" lists several places: give the main campus, and campusCity to programs taught elsewhere'
    ])
  })

  it('refuses a file without a universities list', () => {
    const plan = planUniversities({} as UniversitiesFile, [], COUNTRIES)
    expect(plan.errors).toEqual(['not a universities file: it needs checkedOn and universities'])
  })
})
