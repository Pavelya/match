import { describe, expect, it } from 'vitest'
import { buildValidationContext, formatWarnings, getValidPrograms, parseCSV } from './csv-parser'

// MAINT 5.16: a field the fields-of-study rule disagrees with is a warning, never an error,
// and campus_city is an optional column.

const context = buildValidationContext(
  [
    { id: 'field-be', name: 'Business & Economics' },
    { id: 'field-ss', name: 'Social Sciences' },
    { id: 'field-ns', name: 'Natural Sciences' }
  ],
  [{ id: 'course-math', code: 'MATH-AA' }]
)

const HEADER = 'name,description,field_of_study,degree_type,duration,campus_city'

function parse(...rows: string[]) {
  return parseCSV([HEADER, ...rows].join('\n'), context)
}

describe('parseCSV — field of study warnings', () => {
  it('warns about a field the rule disagrees with, and keeps the row valid', () => {
    const result = parse('Economics,A degree.,Social Sciences,Bachelor of Science,3 years,')

    expect(result.isValid).toBe(true)
    expect(result.warningRows).toBe(1)
    expect(result.rows[0].warnings).toEqual([
      {
        field: 'field_of_study',
        message: 'The fields-of-study rule files this name under Business & Economics (Economics)',
        value: 'Social Sciences'
      }
    ])
    expect(formatWarnings(result)).toEqual([
      'Row 2, field_of_study: The fields-of-study rule files this name under Business & Economics (Economics)'
    ])
    expect(getValidPrograms(result)).toHaveLength(1)
  })

  it('says nothing when the field agrees, in any case, or the name names no discipline', () => {
    const result = parse(
      'Economics,A degree.,business & economics,Bachelor of Science,3 years,',
      '"Mathematics and Computer Science",A degree.,Natural Sciences,Bachelor of Science,3 years,',
      'Innovation and Technology,A degree.,Social Sciences,Bachelor of Science,3 years,'
    )

    expect(result.warningRows).toBe(0)
    expect(result.rows.every((r) => r.warnings.length === 0)).toBe(true)
  })

  it('does not warn on a row whose field is unknown: that is already an error', () => {
    const result = parse('Economics,A degree.,Economics,Bachelor of Science,3 years,')

    expect(result.isValid).toBe(false)
    expect(result.rows[0].warnings).toEqual([])
  })
})

describe('parseCSV — campus city', () => {
  it('reads the campus city trimmed, and empty as the university city', () => {
    const result = parse(
      'Physics,A degree.,Natural Sciences,Bachelor of Science,4 years, Kelowna ',
      'Statistics,A degree.,Natural Sciences,Bachelor of Science,4 years,'
    )

    expect(getValidPrograms(result).map((p) => p.campusCity)).toEqual(['Kelowna', null])
  })

  it('accepts a file without the column', () => {
    const result = parseCSV(
      [
        'name,description,field_of_study,degree_type,duration',
        'Statistics,A degree.,Natural Sciences,Bachelor of Science,4 years'
      ].join('\n'),
      context
    )

    expect(result.isValid).toBe(true)
    expect(getValidPrograms(result)[0].campusCity).toBeNull()
  })
})
