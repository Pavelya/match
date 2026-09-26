import { describe, expect, it } from 'vitest'
import {
  currentEntryYear,
  parseEntryYear,
  requirementsCheck,
  requirementsStamp,
  type StoredRequirements
} from './entry-year'

const SEPT_2026 = new Date('2026-09-26T12:00:00Z')
const AUG_2027 = new Date('2027-08-31T23:59:59Z')

describe('currentEntryYear', () => {
  it('is next year from 1 September, once this year has enrolled', () => {
    expect(currentEntryYear(new Date('2026-08-31T23:59:59Z'))).toBe(2026)
    expect(currentEntryYear(new Date('2026-09-01T00:00:00Z'))).toBe(2027)
    expect(currentEntryYear(SEPT_2026)).toBe(2027)
    expect(currentEntryYear(AUG_2027)).toBe(2027)
  })
})

describe('requirementsCheck', () => {
  it('calls the current intake current, and anything earlier older', () => {
    expect(requirementsCheck(2027, SEPT_2026)).toEqual({ status: 'current', entryYear: 2027 })
    expect(requirementsCheck(2026, SEPT_2026)).toEqual({ status: 'older', entryYear: 2026 })
    expect(requirementsCheck(null, SEPT_2026)).toEqual({ status: 'unchecked' })
  })

  it('lets 2027 data go stale when the 2028 intake opens', () => {
    expect(requirementsCheck(2027, AUG_2027).status).toBe('current')
    expect(requirementsCheck(2027, new Date('2027-09-01T00:00:00Z')).status).toBe('older')
  })
})

describe('parseEntryYear', () => {
  it('reads a year from the form or the API, and empty as not checked', () => {
    expect(parseEntryYear('2027', SEPT_2026)).toEqual({ year: 2027 })
    expect(parseEntryYear(2026, SEPT_2026)).toEqual({ year: 2026 })
    expect(parseEntryYear('', SEPT_2026)).toEqual({ year: null })
    expect(parseEntryYear('  ', SEPT_2026)).toEqual({ year: null })
    expect(parseEntryYear(null, SEPT_2026)).toEqual({ year: null })
  })

  it('refuses anything that is not a plausible intake', () => {
    for (const value of ['20227', 2019, 2029, '2027.5', 'next year', true, {}]) {
      expect(parseEntryYear(value, SEPT_2026)).toHaveProperty('error')
    }
    expect(parseEntryYear(2028, SEPT_2026)).toEqual({ year: 2028 })
  })
})

describe('requirementsStamp', () => {
  const stored: StoredRequirements = {
    minIBPoints: 38,
    requirementsEntryYear: 2026,
    courseRequirements: [
      { ibCourseId: 'chem', requiredLevel: 'HL', minGrade: 6, isCritical: true, orGroupId: null },
      { ibCourseId: 'bio', requiredLevel: 'HL', minGrade: 6, isCritical: true, orGroupId: 'g1' },
      { ibCourseId: 'phys', requiredLevel: 'HL', minGrade: 6, isCritical: true, orGroupId: 'g1' }
    ]
  }
  // What the edit form sends back when nothing is touched: same rows, new order.
  const untouched = {
    minIBPoints: 38,
    requirementsEntryYear: 2026,
    courseRequirements: [...stored.courseRequirements].reverse()
  }

  it('leaves the stamps alone when the requirements and the entry year are unchanged', () => {
    expect(requirementsStamp(stored, untouched, SEPT_2026)).toBeNull()
    expect(requirementsStamp(stored, {}, SEPT_2026)).toBeNull()
  })

  it('ignores OR-group ids: the same group saved under a new id is not a change', () => {
    const regrouped = stored.courseRequirements.map((r) =>
      r.orGroupId ? { ...r, orGroupId: 'fresh-uuid' } : r
    )
    expect(
      requirementsStamp(stored, { ...untouched, courseRequirements: regrouped }, SEPT_2026)
    ).toBeNull()
  })

  it('stamps when the points change, keeping the stored entry year', () => {
    expect(requirementsStamp(stored, { ...untouched, minIBPoints: 37 }, SEPT_2026)).toEqual({
      requirementsUpdatedAt: SEPT_2026,
      requirementsEntryYear: 2026,
      requirementsVerified: true
    })
  })

  it('stamps when a subject changes, or moves in or out of an OR group', () => {
    const [chem, bio, phys] = stored.courseRequirements
    const edits = [
      [{ ...chem, minGrade: 7 }, bio, phys],
      [chem, bio, { ...phys, requiredLevel: 'SL' }],
      [chem, bio, { ...phys, orGroupId: null }],
      [{ ...chem, orGroupId: 'g1' }, bio, phys],
      [chem, bio],
      [{ ...chem, isCritical: false }, bio, phys]
    ]
    for (const courseRequirements of edits) {
      expect(
        requirementsStamp(stored, { ...untouched, courseRequirements }, SEPT_2026)
      ).not.toBeNull()
    }
  })

  it('stamps the entry year the edit gives, alone or with a change', () => {
    expect(
      requirementsStamp(stored, { ...untouched, requirementsEntryYear: 2027 }, SEPT_2026)
    ).toEqual({
      requirementsUpdatedAt: SEPT_2026,
      requirementsEntryYear: 2027,
      requirementsVerified: true
    })
  })

  it('unverifies a program whose entry year is cleared', () => {
    expect(
      requirementsStamp(stored, { ...untouched, requirementsEntryYear: null }, SEPT_2026)
    ).toEqual({
      requirementsUpdatedAt: SEPT_2026,
      requirementsEntryYear: null,
      requirementsVerified: false
    })
  })
})
