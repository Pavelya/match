import { describe, expect, it } from 'vitest'
import { checkSchedule, parseScheduleInput, type SeasonInput } from './rules'
import { daysInWindow, isCalendarDay } from './seasons'

function winter(change: Partial<SeasonInput> = {}): SeasonInput {
  return { key: 'winter', enabled: true, startsOn: '2026-12-14', endsOn: '2027-01-01', ...change }
}

describe('checkSchedule', () => {
  it("accepts winter's window: 19 days, both counted", () => {
    expect(daysInWindow('2026-12-14', '2027-01-01')).toBe(19)
    expect(checkSchedule([winter()])).toEqual({})
  })

  it('accepts 21 days and refuses 22', () => {
    expect(checkSchedule([winter({ startsOn: '2026-12-12' })])).toEqual({})
    expect(checkSchedule([winter({ startsOn: '2026-12-11' })]).winter).toMatch(/21 days at most/)
  })

  it('refuses an end before the start', () => {
    expect(checkSchedule([winter({ endsOn: '2026-12-13' })]).winter).toMatch(/before the first/)
  })

  it('accepts a one-day season', () => {
    expect(checkSchedule([winter({ endsOn: '2026-12-14' })])).toEqual({})
  })

  it('refuses a season switched on without dates, or with one', () => {
    expect(checkSchedule([winter({ startsOn: null, endsOn: null })]).winter).toMatch(/first and/)
    expect(checkSchedule([winter({ endsOn: null })]).winter).toMatch(/both days/)
  })

  it('lets a season switched off keep its dates, or have none', () => {
    expect(checkSchedule([winter({ enabled: false })])).toEqual({})
    expect(checkSchedule([winter({ enabled: false, startsOn: null, endsOn: null })])).toEqual({})
  })

  it('refuses a day that does not exist', () => {
    expect(isCalendarDay('2027-02-29')).toBe(false)
    expect(isCalendarDay('2028-02-29')).toBe(true)
    expect(checkSchedule([winter({ startsOn: '2026-13-01' })]).winter).toMatch(/real day/)
  })

  it('refuses two seasons switched on whose days overlap, and not when one is off', () => {
    const other = winter({ key: 'lunar-new-year', startsOn: '2027-01-01', endsOn: '2027-01-05' })
    const both = [winter(), other]
    expect(checkSchedule(both).winter).toMatch(/overlap Lunar New Year/)
    expect(checkSchedule([winter(), { ...other, enabled: false }])).toEqual({})
    expect(checkSchedule([winter(), { ...other, startsOn: '2027-01-02' }])).toEqual({})
  })
})

describe('parseScheduleInput', () => {
  const body = {
    allOff: false,
    seasons: [
      { key: 'winter', enabled: true, startsOn: '2026-12-14', endsOn: '2027-01-01' },
      { key: 'lunar-new-year', enabled: false, startsOn: null, endsOn: null },
      { key: 'eid-al-fitr', enabled: false, startsOn: null, endsOn: null },
      { key: 'diwali', enabled: false, startsOn: null, endsOn: null }
    ]
  }

  it('reads every season built in code and the switch', () => {
    expect(parseScheduleInput(body)).toEqual(body)
  })

  it('reads an empty date as none', () => {
    const input = parseScheduleInput({
      allOff: true,
      seasons: [
        { key: 'winter', enabled: false, startsOn: '', endsOn: null },
        { key: 'lunar-new-year', enabled: false, startsOn: null, endsOn: '' },
        { key: 'eid-al-fitr', enabled: false, startsOn: '', endsOn: '' },
        { key: 'diwali', enabled: false, startsOn: '', endsOn: null }
      ]
    })
    expect(input?.seasons[0]).toMatchObject({ startsOn: null, endsOn: null })
    expect(input?.seasons[1]).toMatchObject({ startsOn: null, endsOn: null })
    expect(input?.seasons[2]).toMatchObject({ startsOn: null, endsOn: null })
    expect(input?.seasons[3]).toMatchObject({ startsOn: null, endsOn: null })
  })

  it('refuses anything else', () => {
    expect(parseScheduleInput(null)).toBeNull()
    expect(parseScheduleInput({ ...body, allOff: 'no' })).toBeNull()
    expect(parseScheduleInput({ ...body, seasons: [] })).toBeNull()
    expect(parseScheduleInput({ ...body, seasons: [body.seasons[0]] })).toBeNull()
    expect(parseScheduleInput({ ...body, seasons: body.seasons.slice(0, 3) })).toBeNull()
    expect(
      parseScheduleInput({ ...body, seasons: [{ ...body.seasons[0], key: 'halloween' }] })
    ).toBeNull()
    expect(
      parseScheduleInput({ ...body, seasons: [{ ...body.seasons[0], enabled: 'yes' }] })
    ).toBeNull()
    expect(
      parseScheduleInput({ ...body, seasons: [{ ...body.seasons[0], startsOn: 20261214 }] })
    ).toBeNull()
  })
})
