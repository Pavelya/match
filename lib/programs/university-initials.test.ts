import { describe, expect, it } from 'vitest'
import { universityInitials } from './university-initials'

describe('universityInitials', () => {
  it('uses the stored abbreviation when it is an acronym of five letters or fewer', () => {
    expect(universityInitials('Massachusetts Institute of Technology', 'MIT')).toBe('MIT')
    expect(universityInitials('University of California, Los Angeles', 'UCLA')).toBe('UCLA')
    expect(universityInitials('University of British Columbia', 'UBC')).toBe('UBC')
  })

  it('reads the name when the abbreviation is a word (Michigan) or missing', () => {
    expect(universityInitials('University of Michigan', 'Michigan')).toBe('UM')
    expect(universityInitials('Imperial College London', 'London')).toBe('ICL')
    expect(universityInitials('Arizona State University', null)).toBe('ASU')
  })

  it('skips the small words and keeps accented letters', () => {
    expect(universityInitials('The University of Manchester', null)).toBe('UM')
    expect(universityInitials('École Polytechnique Fédérale de Lausanne', null)).toBe('ÉPFL')
  })

  it('stops at four letters', () => {
    expect(universityInitials('London School of Economics and Political Science', '')).toBe('LSEP')
  })
})
