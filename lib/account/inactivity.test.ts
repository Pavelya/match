import { describe, expect, it } from 'vitest'

// MAINT 7.6 Part B: who is silent (6 calendar months since last seen) and who is active (30 days).

import {
  activeStudentsWhere,
  isSilent,
  lastSeen,
  monthsBefore,
  silentCutoff,
  silentStudentsWhere
} from './inactivity'

const now = new Date('2026-10-27T12:00:00.000Z')
const at = (iso: string) => new Date(iso)

describe('monthsBefore', () => {
  it('counts calendar months in UTC, keeping the time', () => {
    expect(monthsBefore(now, 6)).toEqual(at('2026-04-27T12:00:00.000Z'))
  })

  it('crosses the year', () => {
    expect(monthsBefore(at('2026-03-15T00:00:00.000Z'), 6)).toEqual(at('2025-09-15T00:00:00.000Z'))
  })

  it('falls back to the last day of a shorter month, as Postgres does', () => {
    expect(monthsBefore(at('2026-08-31T08:00:00.000Z'), 6)).toEqual(at('2026-02-28T08:00:00.000Z'))
    expect(monthsBefore(at('2028-08-31T08:00:00.000Z'), 6)).toEqual(at('2028-02-29T08:00:00.000Z'))
  })
})

describe('isSilent', () => {
  const cutoff = silentCutoff(now)

  it('is silent exactly 6 months after the last visit, not a moment before', () => {
    expect(isSilent({ lastActiveAt: cutoff, createdAt: at('2026-01-01') }, now)).toBe(true)
    expect(
      isSilent({ lastActiveAt: new Date(cutoff.getTime() + 1), createdAt: at('2026-01-01') }, now)
    ).toBe(false)
  })

  it('is not silent when seen recently', () => {
    expect(isSilent({ lastActiveAt: at('2026-10-20'), createdAt: at('2026-01-01') }, now)).toBe(
      false
    )
  })

  it('counts from the account being made when there is no date', () => {
    expect(isSilent({ lastActiveAt: null, createdAt: at('2026-02-01') }, now)).toBe(true)
    expect(isSilent({ lastActiveAt: null, createdAt: at('2026-09-01') }, now)).toBe(false)
    expect(lastSeen({ lastActiveAt: null, createdAt: at('2026-09-01') })).toEqual(at('2026-09-01'))
  })

  it('uses the stored date over the day the account was made', () => {
    expect(isSilent({ lastActiveAt: at('2026-10-01'), createdAt: at('2025-01-01') }, now)).toBe(
      false
    )
  })
})

describe('the count conditions', () => {
  it('counts silent students by the same cutoff, with or without a date', () => {
    const cutoff = silentCutoff(now)
    expect(silentStudentsWhere(now)).toEqual({
      role: 'STUDENT',
      OR: [{ lastActiveAt: { lte: cutoff } }, { lastActiveAt: null, createdAt: { lte: cutoff } }]
    })
  })

  it('counts students seen in the last 30 days', () => {
    expect(activeStudentsWhere(now)).toEqual({
      role: 'STUDENT',
      lastActiveAt: { gt: at('2026-09-27T12:00:00.000Z') }
    })
  })
})
