import { describe, expect, it } from 'vitest'

// MAINT 7.6 Part B: who is silent (6 calendar months since last seen) and who is active (30 days).

import {
  activeStudentsWhere,
  daysLeft,
  deletionDate,
  inactivityState,
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

describe('inactivityState', () => {
  const created = at('2025-06-01T00:00:00.000Z')
  const state = (lastActiveAt: Date | null, notice: Date | null, when = now) =>
    inactivityState({ lastActiveAt, createdAt: created, inactivityNoticeSentAt: notice }, when)

  it('is active when seen within 6 months, and due a notice from exactly 6 months', () => {
    expect(state(new Date(silentCutoff(now).getTime() + 1), null)).toBe('active')
    expect(state(silentCutoff(now), null)).toBe('due-notice')
  })

  it('counts an account with no date from the day it was made', () => {
    expect(state(null, null)).toBe('due-notice')
  })

  it('is notified through the 29th day after the notice, and due for deletion from the 30th', () => {
    const notice = at('2026-11-17T09:30:00.000Z')
    const seen = at('2026-01-30T12:00:00.000Z')
    expect(state(seen, notice, at('2026-11-17T09:31:00.000Z'))).toBe('notified')
    expect(state(seen, notice, at('2026-12-16T23:59:59.999Z'))).toBe('notified')
    expect(state(seen, notice, at('2026-12-17T00:00:00.000Z'))).toBe('due-deletion')
    expect(state(seen, notice, at('2027-02-01T00:00:00.000Z'))).toBe('due-deletion')
  })

  it('keeps a student who came back after the notice, even if the notice was not cleared', () => {
    const notice = at('2026-11-17T09:30:00.000Z')
    const later = at('2026-12-20T00:00:00.000Z')
    expect(state(at('2026-11-20T10:00:00.000Z'), notice, later)).toBe('active')
    // The same second as the notice is not coming back
    expect(state(notice, notice, later)).toBe('due-deletion')
  })

  it('needs a fresh 6 months before another notice', () => {
    // Came back on 20 November, cleared; silent again only from 20 May
    expect(state(at('2026-11-20T10:00:00.000Z'), null, at('2027-05-19T10:00:00.000Z'))).toBe(
      'active'
    )
    expect(state(at('2026-11-20T10:00:00.000Z'), null, at('2027-05-20T10:00:00.000Z'))).toBe(
      'due-notice'
    )
  })
})

describe('the deletion date', () => {
  it('is the notice day plus 30 whole days, at midnight UTC', () => {
    expect(deletionDate(at('2026-11-17T23:59:00.000Z'))).toEqual(at('2026-12-17T00:00:00.000Z'))
    expect(deletionDate(at('2026-11-17T00:00:00.000Z'))).toEqual(at('2026-12-17T00:00:00.000Z'))
  })

  it('counts the days left in whole UTC days, never below 0', () => {
    const notice = at('2026-11-17T09:30:00.000Z')
    expect(daysLeft(notice, at('2026-11-17T22:00:00.000Z'))).toBe(30)
    expect(daysLeft(notice, at('2026-12-16T01:00:00.000Z'))).toBe(1)
    expect(daysLeft(notice, at('2026-12-17T01:00:00.000Z'))).toBe(0)
    expect(daysLeft(notice, at('2027-01-17T01:00:00.000Z'))).toBe(0)
  })
})
