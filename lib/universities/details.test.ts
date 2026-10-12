import { describe, expect, it } from 'vitest'
import { alsoKnownAs, displayUrl, placeName, plural, programsByField, telHref } from './details'

describe('placeName', () => {
  it('says the city and the country, or one when they share a name', () => {
    expect(placeName('Toronto', 'Canada')).toBe('Toronto, Canada')
    expect(placeName('Singapore', 'Singapore')).toBe('Singapore')
    expect(placeName(null, 'France')).toBe('France')
  })
})

describe('alsoKnownAs', () => {
  it('gives a short name that adds something', () => {
    expect(alsoKnownAs('University of Toronto', 'U of T')).toBe('U of T')
    expect(alsoKnownAs('Massachusetts Institute of Technology', 'MIT')).toBe('MIT')
    expect(alsoKnownAs('London School of Economics and Political Science', 'LSE')).toBe('LSE')
  })

  it('leaves out one already in the name', () => {
    expect(alsoKnownAs('Sciences Po', 'Sciences Po')).toBeNull()
    expect(alsoKnownAs('Imperial College London', 'London')).toBeNull()
    expect(alsoKnownAs('University of Michigan', 'Michigan')).toBeNull()
    expect(alsoKnownAs('Harvard University', 'Harvard')).toBeNull()
  })

  it('matches whole words, not letters inside one', () => {
    expect(alsoKnownAs('University College London', 'UCL')).toBe('UCL')
    expect(alsoKnownAs('Universität Wien', 'Uni Wien')).toBe('Uni Wien')
  })

  it('has nothing without a short name', () => {
    expect(alsoKnownAs('Lund University', null)).toBeNull()
    expect(alsoKnownAs('Lund University', '  ')).toBeNull()
  })
})

describe('displayUrl', () => {
  it('drops the scheme, www and a trailing slash', () => {
    expect(displayUrl('https://www.utoronto.ca/')).toBe('utoronto.ca')
    expect(displayUrl('https://www.sciencespo.fr/en/')).toBe('sciencespo.fr/en')
    expect(displayUrl('not a url')).toBe('not a url')
  })
})

describe('telHref', () => {
  it('keeps digits and a leading plus', () => {
    expect(telHref('+44 (0) 161 306 6000')).toBe('tel:+4401613066000')
    expect(telHref('416-978-2190')).toBe('tel:4169782190')
  })
})

describe('plural', () => {
  it('counts', () => {
    expect(plural(1, 'program')).toBe('1 program')
    expect(plural(40, 'program')).toBe('40 programs')
    expect(plural(103000, 'student')).toBe('103,000 students')
  })
})

describe('programsByField', () => {
  const program = (name: string, field: string) => ({ name, fieldOfStudy: { name: field } })

  it('groups fields A–Z and programs A–Z within each', () => {
    const groups = programsByField([
      program('Economics', 'Business & Economics'),
      program('Architecture Studies', 'Architecture'),
      program('Actuarial Science', 'Business & Economics')
    ])
    expect(groups.map((g) => [g.name, g.programs.map((p) => p.name)])).toEqual([
      ['Architecture', ['Architecture Studies']],
      ['Business & Economics', ['Actuarial Science', 'Economics']]
    ])
    expect(groups[1].anchor).toBe('field-business-economics')
  })
})
