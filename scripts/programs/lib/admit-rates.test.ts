import { describe, expect, it } from 'vitest'
import {
  percent,
  planAdmitRates,
  type AdmitRateDef,
  type AdmitRatesFile,
  type StoredUniversity
} from './admit-rates'

const def = (overrides: Partial<AdmitRateDef> = {}): AdmitRateDef => ({
  university: 'Georgia Institute of Technology',
  year: 2025,
  firstYear: { applied: 66881, admitted: 8921 },
  international: { applied: 9758, admitted: 716 },
  source: 'https://irp.gatech.edu/common-data-set',
  ...overrides
})

const file = (...universities: AdmitRateDef[]): AdmitRatesFile => ({
  checkedOn: '2026-10-10',
  universities
})

const stored = (overrides: Partial<StoredUniversity> = {}): StoredUniversity => ({
  id: 'gt',
  name: 'Georgia Institute of Technology',
  admitRate: null,
  internationalAdmitRate: null,
  admitRateYear: null,
  ...overrides
})

describe('percent', () => {
  it('rounds to one decimal', () => {
    expect(percent({ applied: 66881, admitted: 8921 })).toBe(13.3)
    expect(percent({ applied: 9758, admitted: 716 })).toBe(7.3)
    expect(percent({ applied: 15794, admitted: 2521 })).toBe(16)
  })
})

describe('planAdmitRates', () => {
  it('writes the rates of a stored university', () => {
    const plan = planAdmitRates(file(def()), [stored()])
    expect(plan.errors).toEqual([])
    expect(plan.writes).toEqual([
      {
        id: 'gt',
        name: 'Georgia Institute of Technology',
        from: { admitRate: null, internationalAdmitRate: null, admitRateYear: null },
        to: { admitRate: 13.3, internationalAdmitRate: 7.3, admitRateYear: 2025 }
      }
    ])
  })

  it('leaves the international rate empty when the source reports none', () => {
    const plan = planAdmitRates(file(def({ international: undefined })), [stored()])
    expect(plan.writes[0].to.internationalAdmitRate).toBeNull()
  })

  it('skips a university already up to date, and matches names in any case', () => {
    const current = stored({ admitRate: 13.3, internationalAdmitRate: 7.3, admitRateYear: 2025 })
    const plan = planAdmitRates(file(def({ university: 'georgia institute of technology' })), [
      current
    ])
    expect(plan.writes).toEqual([])
    expect(plan.unchanged).toEqual(['Georgia Institute of Technology'])
  })

  it('lists a university not stored yet', () => {
    const plan = planAdmitRates(file(def({ university: 'Purdue University' })), [stored()])
    expect(plan.missing).toEqual(['Purdue University'])
    expect(plan.writes).toEqual([])
  })

  it('refuses impossible counts, a bad year or source, and duplicates', () => {
    const plan = planAdmitRates(
      file(
        def({ firstYear: { applied: 100, admitted: 101 } }),
        def({ university: 'MIT', year: 25, source: 'CDS' }),
        def({ university: 'MIT' })
      ),
      [stored()]
    )
    expect(plan.errors).toEqual([
      'Georgia Institute of Technology: first-year admitted must be a whole number from 0 to applied',
      'MIT: year must be a fall intake, such as 2025; source must be a web address',
      'MIT: appears twice'
    ])
  })
})
