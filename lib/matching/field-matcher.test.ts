/**
 * Unit tests for Field Match (F_M) Calculator
 */

import { describe, it, expect } from '@jest/globals'
import { calculateFieldMatch } from './field-matcher'

describe('calculateFieldMatch', () => {
  describe('Exact Match - student preferences include program field', () => {
    it('should return 1.0 when program field is in student preferences', () => {
      const studentFields = ['field-engineering', 'field-medicine', 'field-computer-science']
      const programField = 'field-engineering'

      const result = calculateFieldMatch(studentFields, programField)

      expect(result.score).toBe(1.0)
      expect(result.isMatch).toBe(true)
      expect(result.noPreferences).toBe(false)
    })

    it('should return 1.0 when student has only one preference and it matches', () => {
      const studentFields = ['field-medicine']
      const programField = 'field-medicine'

      const result = calculateFieldMatch(studentFields, programField)

      expect(result.score).toBe(1.0)
      expect(result.isMatch).toBe(true)
      expect(result.noPreferences).toBe(false)
    })

    it('should return 1.0 when matching the last field in a long list', () => {
      const studentFields = ['field-a', 'field-b', 'field-c', 'field-d', 'field-engineering']
      const programField = 'field-engineering'

      const result = calculateFieldMatch(studentFields, programField)

      expect(result.score).toBe(1.0)
      expect(result.isMatch).toBe(true)
      expect(result.noPreferences).toBe(false)
    })
  })

  describe('No Preferences - student has no field preferences', () => {
    it('should return 0.5 when student has empty field preferences', () => {
      const studentFields: string[] = []
      const programField = 'field-engineering'

      const result = calculateFieldMatch(studentFields, programField)

      expect(result.score).toBe(0.5)
      expect(result.isMatch).toBe(false)
      expect(result.noPreferences).toBe(true)
    })

    it('should return 0.5 for any program field when no preferences', () => {
      const studentFields: string[] = []
      const programFields = [
        'field-engineering',
        'field-medicine',
        'field-business',
        'field-arts',
        'field-sciences'
      ]

      programFields.forEach((programField) => {
        const result = calculateFieldMatch(studentFields, programField)

        expect(result.score).toBe(0.5)
        expect(result.isMatch).toBe(false)
        expect(result.noPreferences).toBe(true)
      })
    })
  })

  describe('Mismatch - program field not in student preferences', () => {
    it('should return 0.0 when program field is not in preferences', () => {
      const studentFields = ['field-engineering', 'field-medicine']
      const programField = 'field-business'

      const result = calculateFieldMatch(studentFields, programField)

      expect(result.score).toBe(0.0)
      expect(result.isMatch).toBe(false)
      expect(result.noPreferences).toBe(false)
    })

    it('should return 0.0 when student has preferences but none match', () => {
      const studentFields = ['field-arts', 'field-humanities']
      const programField = 'field-engineering'

      const result = calculateFieldMatch(studentFields, programField)

      expect(result.score).toBe(0.0)
      expect(result.isMatch).toBe(false)
      expect(result.noPreferences).toBe(false)
    })

    it('should be case-sensitive - field-Engineering != field-engineering', () => {
      const studentFields = ['field-Engineering']
      const programField = 'field-engineering'

      const result = calculateFieldMatch(studentFields, programField)

      expect(result.score).toBe(0.0)
      expect(result.isMatch).toBe(false)
      expect(result.noPreferences).toBe(false)
    })
  })

  describe('Edge cases', () => {
    it('should handle duplicate fields in student preferences', () => {
      const studentFields = ['field-engineering', 'field-engineering', 'field-medicine']
      const programField = 'field-engineering'

      const result = calculateFieldMatch(studentFields, programField)

      expect(result.score).toBe(1.0)
      expect(result.isMatch).toBe(true)
    })

    it('should handle very long field IDs', () => {
      const longFieldId = 'field-' + 'a'.repeat(100)
      const studentFields = [longFieldId]
      const programField = longFieldId

      const result = calculateFieldMatch(studentFields, programField)

      expect(result.score).toBe(1.0)
      expect(result.isMatch).toBe(true)
    })
  })
})
