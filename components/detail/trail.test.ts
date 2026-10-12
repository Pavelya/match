import { describe, expect, it } from 'vitest'
import { breadcrumbJsonLd, programTrail, universityTrail } from './trail'

const canada = { code: 'CA', name: 'Canada' }
const toronto = { id: 'uoft', name: 'University of Toronto' }

describe('programTrail', () => {
  it('stops at the university, the country opening its guide', () => {
    expect(programTrail(canada, toronto)).toEqual([
      { label: 'Explore', href: '/programs/search' },
      { label: 'Canada', href: '/study-in-canada-with-ib-diploma' },
      { label: 'University of Toronto', href: '/universities/uoft' }
    ])
  })

  it('leaves out a country without a guide', () => {
    expect(programTrail({ code: 'NZ', name: 'New Zealand' }, toronto).map((c) => c.label)).toEqual([
      'Explore',
      'University of Toronto'
    ])
  })
})

describe('universityTrail', () => {
  it('stops at the country', () => {
    expect(universityTrail({ code: 'GB', name: 'United Kingdom' })).toEqual([
      { label: 'Explore', href: '/programs/search' },
      { label: 'United Kingdom', href: '/study-in-uk-with-ib-diploma' }
    ])
  })
})

describe('breadcrumbJsonLd', () => {
  it('lists the same names and links, in order', () => {
    expect(breadcrumbJsonLd(programTrail(canada, toronto), 'https://www.ibmatch.com')).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Explore',
          item: 'https://www.ibmatch.com/programs/search'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Canada',
          item: 'https://www.ibmatch.com/study-in-canada-with-ib-diploma'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'University of Toronto',
          item: 'https://www.ibmatch.com/universities/uoft'
        }
      ]
    })
  })
})
