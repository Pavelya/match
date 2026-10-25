/**
 * Seasonal Themes Form (rebranding 6.1)
 *
 * Each season's switch and dates, and the switch that turns every season off. Saves the whole
 * schedule in one request to /api/admin/seasonal-themes, after the same checks the route makes
 * (lib/seasons/rules.ts). Dates are calendar days, both counted, and follow each visitor's own
 * date. Pages pick the new schedule up on their next visit.
 */

'use client'

import { useState } from 'react'
import { AlertCircle, Check, ExternalLink, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { checkSchedule, type ScheduleErrors, type SeasonInput } from '@/lib/seasons/rules'
import { MAX_SEASON_DAYS, daysInWindow, isCalendarDay, type SeasonKey } from '@/lib/seasons/seasons'

export interface SeasonRowProps extends SeasonInput {
  name: string
  usualWindow: string
}

interface SeasonalThemesClientProps {
  seasons: SeasonRowProps[]
  allOff: boolean
}

type Status =
  { kind: 'idle' } | { kind: 'saving' } | { kind: 'saved' } | { kind: 'failed'; message: string }

export function SeasonalThemesClient(props: SeasonalThemesClientProps) {
  const [seasons, setSeasons] = useState(props.seasons)
  const [allOff, setAllOff] = useState(props.allOff)
  const [errors, setErrors] = useState<ScheduleErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  function update(key: SeasonKey, change: Partial<SeasonInput>) {
    setSeasons((current) => current.map((s) => (s.key === key ? { ...s, ...change } : s)))
    setStatus({ kind: 'idle' })
  }

  async function save() {
    const input = seasons.map(({ key, enabled, startsOn, endsOn }) => ({
      key,
      enabled,
      startsOn,
      endsOn
    }))
    const found = checkSchedule(input)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus({ kind: 'failed', message: 'Nothing was saved. Fix the seasons marked above.' })
      return
    }

    setStatus({ kind: 'saving' })
    try {
      const response = await fetch('/api/admin/seasonal-themes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seasons: input, allOff })
      })
      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        if (body.errors) setErrors(body.errors)
        throw new Error(body.error || 'Failed to save')
      }
      setStatus({ kind: 'saved' })
    } catch (err) {
      setStatus({
        kind: 'failed',
        message: `Nothing was saved: ${err instanceof Error ? err.message : 'unknown error'}.`
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="season-all-off"
            checked={allOff}
            onChange={(e) => {
              setAllOff(e.target.checked)
              setStatus({ kind: 'idle' })
            }}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <div className="space-y-1">
            <Label htmlFor="season-all-off" className="text-base font-semibold">
              All seasonal decorations off
            </Label>
            <p className="text-sm text-muted-foreground">
              For a day when decoration would be wrong. While this is on, no season shows, whatever
              its dates.
            </p>
          </div>
        </div>
      </div>

      {seasons.map((season) => {
        const error = errors[season.key]
        const days =
          isCalendarDay(season.startsOn) &&
          isCalendarDay(season.endsOn) &&
          season.endsOn >= season.startsOn
            ? daysInWindow(season.startsOn, season.endsOn)
            : null
        return (
          <section
            key={season.key}
            aria-labelledby={`season-${season.key}-name`}
            className="space-y-4 rounded-xl border bg-card p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id={`season-${season.key}-on`}
                  checked={season.enabled}
                  onChange={(e) => update(season.key, { enabled: e.target.checked })}
                  aria-describedby={`season-${season.key}-window`}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <div className="space-y-1">
                  <Label
                    id={`season-${season.key}-name`}
                    htmlFor={`season-${season.key}-on`}
                    className="text-base font-semibold"
                  >
                    {season.name}
                  </Label>
                  <p id={`season-${season.key}-window`} className="text-sm text-muted-foreground">
                    Usually {season.usualWindow}. Check the dates every year.
                  </p>
                </div>
              </div>
              <a
                href={`/?season=${season.key}`}
                target="_blank"
                rel="noopener"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Preview
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`season-${season.key}-start`}>First day</Label>
                <Input
                  id={`season-${season.key}-start`}
                  type="date"
                  value={season.startsOn ?? ''}
                  onChange={(e) => update(season.key, { startsOn: e.target.value || null })}
                  aria-invalid={error ? true : undefined}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`season-${season.key}-end`}>Last day</Label>
                <Input
                  id={`season-${season.key}-end`}
                  type="date"
                  value={season.endsOn ?? ''}
                  onChange={(e) => update(season.key, { endsOn: e.target.value || null })}
                  aria-invalid={error ? true : undefined}
                />
              </div>
            </div>

            {error ? (
              <p className="flex items-center gap-2 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                {error}
              </p>
            ) : (
              days !== null && (
                <p className="text-sm text-muted-foreground">
                  {days} {days === 1 ? 'day' : 'days'}, both counted ({MAX_SEASON_DAYS} at most).
                </p>
              )
            )}
          </section>
        )
      })}

      <div className="flex items-center gap-4">
        <Button onClick={save} disabled={status.kind === 'saving'}>
          {status.kind === 'saving' && <Loader2 className="animate-spin" aria-hidden="true" />}
          Save
        </Button>
        <p role="status" className="text-sm">
          {status.kind === 'saved' && (
            <span className="inline-flex items-center gap-1.5 text-green-700">
              <Check className="h-4 w-4" aria-hidden="true" />
              Saved. Pages show the new schedule from their next visit.
            </span>
          )}
          {status.kind === 'failed' && <span className="text-red-700">{status.message}</span>}
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        Preview shows a season on any day, scheduled or not, in the new design: until release day,
        open the preview link first. A season never runs during the IB&apos;s May exams or around
        results days.
      </p>
    </div>
  )
}
