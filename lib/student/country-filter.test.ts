import { describe, expect, it } from 'vitest'
import { filterCountries } from './country-filter'

const COUNTRIES = [
  'Australia',
  'Austria',
  'Belgium',
  'Canada',
  'Czech Republic',
  'Hong Kong',
  'Ireland',
  'Netherlands',
  'Poland',
  'Switzerland',
  'United Kingdom',
  'United States'
].map((name) => ({ name }))

const names = (query: string) => filterCountries(COUNTRIES, query).map((c) => c.name)

describe('filterCountries', () => {
  it('keeps every country for a blank filter', () => {
    expect(names('  ')).toHaveLength(COUNTRIES.length)
  })

  it('matches any part of a name, in the list’s order', () => {
    expect(names('land')).toEqual(['Ireland', 'Netherlands', 'Poland', 'Switzerland'])
    expect(names('LAND')).toEqual(names('land'))
  })

  it('finds a country by a short name no name contains', () => {
    expect(names('uk')).toEqual(['United Kingdom'])
    expect(names('england')).toEqual(['United Kingdom'])
    expect(names('usa')).toEqual(['United States'])
    expect(names('holland')).toEqual(['Netherlands'])
    expect(names('czechia')).toEqual(['Czech Republic'])
  })

  it('keeps contained matches beside a short name', () => {
    expect(names('us')).toEqual(['Australia', 'Austria', 'United States'])
  })

  it('ignores accents', () => {
    expect(filterCountries([{ name: 'Österreich' }], 'oster')).toHaveLength(1)
  })

  it('finds nothing for a country without programs', () => {
    expect(names('brazil')).toEqual([])
  })
})
