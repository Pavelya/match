import { describe, expect, it } from 'vitest'
import { pickSeason, scheduleFromRows, seasonScript, type SeasonRow } from './pick'
import { SEASON_KEYS, localDay, type SeasonWindow } from './seasons'

const WINTER: SeasonWindow = ['winter', '2026-12-14', '2027-01-01']
const LUNAR: SeasonWindow = ['lunar-new-year', '2027-02-03', '2027-02-12']
const EID: SeasonWindow = ['eid-al-fitr', '2027-03-09', '2027-03-12']
const DIWALI: SeasonWindow = ['diwali', '2027-10-27', '2027-10-31']

function row(key: string, enabled: boolean, startsOn?: string, endsOn?: string): SeasonRow {
  return {
    key,
    enabled,
    startsOn: startsOn ? new Date(`${startsOn}T00:00:00Z`) : null,
    endsOn: endsOn ? new Date(`${endsOn}T00:00:00Z`) : null
  }
}

describe('pickSeason', () => {
  it('includes both ends of the window', () => {
    expect(pickSeason([WINTER], '2026-12-13', null)).toBeNull()
    expect(pickSeason([WINTER], '2026-12-14', null)).toBe('winter')
    expect(pickSeason([WINTER], '2027-01-01', null)).toBe('winter')
    expect(pickSeason([WINTER], '2027-01-02', null)).toBeNull()
  })

  it('takes the first window that holds the day when two overlap', () => {
    const later: SeasonWindow = ['winter', '2026-12-20', '2026-12-31']
    expect(pickSeason([WINTER, later], '2026-12-24', null)).toBe('winter')
    expect(pickSeason([later, WINTER], '2026-12-15', null)).toBe('winter')
  })

  it('previews any season built in code, scheduled or not', () => {
    expect(pickSeason([], '2026-06-01', 'winter')).toBe('winter')
    expect(pickSeason([], '2026-06-01', 'halloween')).toBeNull()
    expect(pickSeason([WINTER], '2026-12-20', 'nope')).toBe('winter')
  })

  it('shows nothing for an empty or broken schedule', () => {
    expect(pickSeason([], '2026-12-20', null)).toBeNull()
    expect(pickSeason(null, '2026-12-20', null)).toBeNull()
    expect(pickSeason('winter', '2026-12-20', null)).toBeNull()
    expect(pickSeason([['winter']], '2026-12-20', null)).toBeNull()
    expect(pickSeason([['winter', 20261214, 20270101]], '2026-12-20', null)).toBeNull()
    expect(pickSeason([null, WINTER], '2026-12-20', null)).toBeNull()
  })
})

describe('localDay', () => {
  it("is the visitor's own date, around their midnight", () => {
    // Local times: the visitor's clock, whatever UTC says
    expect(localDay(new Date(2026, 11, 13, 23, 59, 59))).toBe('2026-12-13')
    expect(localDay(new Date(2026, 11, 14, 0, 0, 0))).toBe('2026-12-14')
    expect(localDay(new Date(2027, 0, 1, 23, 59))).toBe('2027-01-01')
    expect(localDay(new Date(2027, 0, 2, 0, 0))).toBe('2027-01-02')
  })
})

describe('scheduleFromRows', () => {
  it('keeps the seasons switched on with both dates, earliest first', () => {
    expect(
      scheduleFromRows([row('winter', true, '2026-12-14', '2027-01-01')], '2026-12-01')
    ).toEqual([WINTER])
  })

  it('leaves out seasons switched off, without dates, unknown or ending before they start', () => {
    const rows = [
      row('winter', false, '2026-12-14', '2027-01-01'),
      row('halloween', true, '2026-10-28', '2026-10-31'),
      row('winter', true),
      row('winter', true, '2027-01-01', '2026-12-14')
    ]
    expect(scheduleFromRows(rows, '2026-12-01')).toEqual([])
  })

  it('keeps a season until it is over in the last time zone, then drops it', () => {
    const rows = [row('winter', true, '2026-12-14', '2027-01-01')]
    // 2 January UTC: UTC−12 is still on 1 January until noon
    expect(scheduleFromRows(rows, '2027-01-02')).toEqual([WINTER])
    expect(scheduleFromRows(rows, '2027-01-03')).toEqual([])
  })

  it('is empty while everything is switched off', () => {
    const rows = [row('winter', true, '2026-12-14', '2027-01-01'), row('all-off', true)]
    expect(scheduleFromRows(rows, '2026-12-20')).toEqual([])
    expect(scheduleFromRows([...rows.slice(0, 1), row('all-off', false)], '2026-12-20')).toEqual([
      WINTER
    ])
  })
})

/** Runs the head script against a fake page, as a browser would before first paint. */
function runScript(schedule: unknown, now: Date, search = '') {
  const attributes: Record<string, string> = {}
  const links: { rel: string; href: string }[] = []
  const document = {
    documentElement: {
      setAttribute: (name: string, value: string) => (attributes[name] = value)
    },
    createElement: () => ({ rel: '', href: '' }),
    head: { appendChild: (link: { rel: string; href: string }) => links.push(link) }
  }
  class FakeDate extends Date {
    constructor() {
      super(now.getTime())
    }
  }
  const source = seasonScript(schedule as SeasonWindow[])
  new Function('document', 'location', 'Date', 'URLSearchParams', source)(
    document,
    { search },
    FakeDate,
    URLSearchParams
  )
  return { season: attributes['data-season'] ?? null, links }
}

describe('the head script', () => {
  const cases: [unknown, Date, string][] = [
    [[WINTER], new Date(2026, 11, 13, 23, 59), ''],
    [[WINTER], new Date(2026, 11, 14, 0, 0), ''],
    [[WINTER], new Date(2027, 0, 1, 23, 59), ''],
    [[WINTER], new Date(2027, 0, 2, 0, 0), ''],
    [[], new Date(2026, 5, 1), '?season=winter'],
    [[], new Date(2026, 5, 1), '?season=halloween'],
    [[WINTER], new Date(2026, 11, 20), '?season=nope&x=1'],
    [[], new Date(2026, 11, 20), ''],
    [[['winter']], new Date(2026, 11, 20), ''],
    [[null, WINTER], new Date(2026, 11, 20), ''],
    [[WINTER, LUNAR], new Date(2027, 1, 6), ''],
    [[WINTER, LUNAR], new Date(2027, 0, 20), ''],
    [[WINTER], new Date(2026, 11, 20), '?season=lunar-new-year'],
    [[WINTER, LUNAR, EID], new Date(2027, 2, 9), ''],
    [[WINTER, LUNAR, EID], new Date(2027, 2, 12, 23, 59), ''],
    [[WINTER, LUNAR, EID], new Date(2027, 2, 13, 0, 0), ''],
    [[WINTER], new Date(2026, 11, 20), '?season=eid-al-fitr'],
    [[WINTER, LUNAR, EID, DIWALI], new Date(2027, 9, 27), ''],
    [[WINTER, LUNAR, EID, DIWALI], new Date(2027, 9, 31, 23, 59), ''],
    [[WINTER, LUNAR, EID, DIWALI], new Date(2027, 10, 1, 0, 0), ''],
    [[WINTER], new Date(2026, 11, 20), '?season=diwali']
  ]

  it.each(cases)('agrees with pickSeason (%j, %s, %s)', (schedule, now, search) => {
    const preview = new URLSearchParams(search).get('season')
    expect(runScript(schedule, now, search).season).toBe(
      pickSeason(schedule, localDay(now), preview)
    )
  })

  it("adds that season's stylesheet, and nothing outside a season", () => {
    expect(runScript([WINTER], new Date(2026, 11, 20)).links).toEqual([
      { rel: 'stylesheet', href: '/seasons/winter/season.css' }
    ])
    expect(runScript([WINTER], new Date(2026, 10, 20)).links).toEqual([])
    expect(runScript([WINTER, LUNAR], new Date(2027, 1, 3)).links).toEqual([
      { rel: 'stylesheet', href: '/seasons/lunar-new-year/season.css' }
    ])
    expect(runScript([WINTER, LUNAR, EID], new Date(2027, 2, 9)).links).toEqual([
      { rel: 'stylesheet', href: '/seasons/eid-al-fitr/season.css' }
    ])
    expect(runScript([WINTER, LUNAR, EID, DIWALI], new Date(2027, 9, 29)).links).toEqual([
      { rel: 'stylesheet', href: '/seasons/diwali/season.css' }
    ])
  })

  it('stays under 600 bytes with every season built in code scheduled', () => {
    const full = SEASON_KEYS.map((key): SeasonWindow => [key, '2026-12-14', '2027-01-01'])
    expect(new TextEncoder().encode(seasonScript(full)).length).toBeLessThan(600)
  })

  it('cannot close its own script element', () => {
    expect(seasonScript([['</script>' as 'winter', '1', '2']])).not.toContain('</script>')
  })
})
