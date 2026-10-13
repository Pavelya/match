'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Bookmark, CircleCheck, Earth, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ds/Button'
import { CheckboxRow, CheckboxTile } from '@/components/ds/Choice'
import { SearchInput } from '@/components/ds/SearchInput'
import { useToast } from '@/components/ds/Toast'
import { fieldIcon } from '@/components/first-run/field-icons'
import { useFirstRunExit } from '@/components/site/first-run-exit'
import { useShortlistCounter } from '@/components/site/shortlist-count'
import { Button as TodayButton } from '@/components/ui/button'
import { DetailedGradesInput } from '@/components/student/DetailedGradesInput'
import { calculateTotalPoints } from '@/lib/ib/diploma'
import { MAX_FIELDS } from '@/lib/student/draft'
import { filterCountries } from '@/lib/student/country-filter'
import { finishHref, firstRunTitle, type FirstRunStep, type Waiting } from '@/lib/student/first-run'

/*
 * First run's steps in the new design (rebranding 3.1; boards "D2.6 Checkbox rows and grid",
 * "D4.3 First run, step 1" and "D4.4 First run, step 2", approved 13 October 2026). Steps 1 and 2
 * save as drafts on Continue, so leaving loses nothing (03-flows F1). Step 3 is today's subject
 * step until 3.2 rebuilds it. Loaded through NewOnboarding.tsx, so today's design downloads none
 * of it.
 */

interface IBCourse {
  id: string
  name: string
  code: string
  group: number
}

interface CourseSelection {
  courseId: string
  courseName: string
  level: 'HL' | 'SL'
  grade: number
}

export interface FirstRunProps {
  /** First run isn't finished: focus mode, and "Set up your profile" */
  firstRun: boolean
  /** Where it opens: the first step not yet saved, in first run */
  step: FirstRunStep
  /** Opening at a later step, what is kept */
  kept: string | null
  fields: { id: string; name: string; description: string }[]
  countries: { id: string; name: string }[]
  courses: IBCourse[]
  initial: {
    fields: string[]
    countries: string[]
    anywhere: boolean
    courseSelections: CourseSelection[]
    tokGrade: string | null
    eeGrade: string | null
  }
  /** Where Save was pressed, to go back to when the grades are saved */
  returnTo: string | null
  /** The program that Save is waiting to save */
  waiting: Waiting | null
}

const PREFERENCES = '/api/students/profile/preferences'

async function saveDraft(body: unknown): Promise<boolean> {
  try {
    const response = await fetch(PREFERENCES, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return response.ok
  } catch {
    return false
  }
}

export function FirstRun(props: FirstRunProps) {
  const { firstRun, fields, countries, waiting, returnTo } = props
  const router = useRouter()
  const toast = useToast()
  const counter = useShortlistCounter()

  const [step, setStep] = useState<FirstRunStep>(props.step)
  const [opened] = useState<FirstRunStep>(props.step)
  const [chosenFields, setChosenFields] = useState<string[]>(props.initial.fields)
  const [chosenCountries, setChosenCountries] = useState<string[]>(props.initial.countries)
  const [anywhere, setAnywhere] = useState(props.initial.anywhere)
  const [filter, setFilter] = useState('')
  const [refused, setRefused] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [courseSelections, setCourseSelections] = useState(props.initial.courseSelections)
  const [tokGrade, setTokGrade] = useState(props.initial.tokGrade)
  const [eeGrade, setEeGrade] = useState(props.initial.eeGrade)
  const [diplomaValid, setDiplomaValid] = useState(true)
  const [saveError, setSaveError] = useState<string | null>(null)

  const question = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)

  // The title follows the step; a new step takes focus at its question, from the top
  useEffect(() => {
    document.title = firstRunTitle(firstRun, step)
    if (!moved.current) return
    window.scrollTo({ top: 0 })
    question.current?.focus()
  }, [firstRun, step])

  const go = (next: FirstRunStep) => {
    moved.current = true
    setRefused(null)
    setStep(next)
  }

  const interests = useCallback(
    () => saveDraft({ step: 'interests', fields: chosenFields }),
    [chosenFields]
  )
  const places = useCallback(
    () => saveDraft({ step: 'countries', countries: anywhere ? [] : chosenCountries, anywhere }),
    [anywhere, chosenCountries]
  )

  /** Continue: save the step as a draft, then the next; a failure stays, choices kept */
  const saveAndContinue = async (which: 1 | 2) => {
    if (saving) return
    setSaving(true)
    const saved = await (which === 1 ? interests() : places())
    setSaving(false)
    if (saved) {
      go(which === 1 ? 2 : 3)
      return
    }
    toast({
      tone: 'gap',
      message: which === 1 ? 'Couldn’t save your interests.' : 'Couldn’t save your countries.',
      action: { label: 'Try again', onClick: () => void saveAndContinue(which) }
    })
  }

  // "Save and exit" in focus mode's header saves the step in progress (D2.12). Step 3's subjects
  // are kept once all six are in, until 3.2's editor saves them as they go.
  const exitPlan = useMemo(
    () => ({
      waiting,
      save: async () => {
        let saved = true
        if (step === 1 && chosenFields.length > 0) saved = await interests()
        if (step === 2 && (anywhere || chosenCountries.length > 0)) saved = await places()
        if (!saved) {
          toast({
            tone: 'gap',
            message: step === 1 ? 'Couldn’t save your interests.' : 'Couldn’t save your countries.'
          })
        }
        return saved
      }
    }),
    [waiting, step, chosenFields, anywhere, chosenCountries, interests, places, toast]
  )
  useFirstRunExit(exitPlan)

  const toggleField = (id: string, on: boolean) => {
    setRefused(null)
    setChosenFields((current) =>
      on ? (current.includes(id) ? current : [...current, id]) : current.filter((f) => f !== id)
    )
  }

  const toggleCountry = (id: string, on: boolean) => {
    setChosenCountries((current) =>
      on ? (current.includes(id) ? current : [...current, id]) : current.filter((c) => c !== id)
    )
  }

  const shownCountries = useMemo(() => filterCountries(countries, filter), [countries, filter])

  /** Step 3, today's: all six subjects, TOK and the EE, then back where Save was pressed */
  const complete = async () => {
    if (courseSelections.length !== 6 || !tokGrade || !eeGrade || !diplomaValid || saving) return
    setSaving(true)
    setSaveError(null)
    try {
      const response = await fetch('/api/students/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interestedFields: chosenFields,
          preferredCountries: anywhere ? [] : chosenCountries,
          courseSelections,
          tokGrade,
          eeGrade,
          totalIBPoints: calculateTotalPoints(courseSelections, tokGrade, eeGrade)
        })
      })
      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.error || 'Failed to save profile')
      }
      // The first grades mean an empty shortlist: the nav count starts at 0, and a save makes 1
      if (firstRun) counter?.record(0)
      router.push(finishHref(returnTo))
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save profile')
      setSaving(false)
    }
  }

  const fieldsFull = chosenFields.length >= MAX_FIELDS

  return (
    <div
      // Focus mode while first run lasts: app/globals.css swaps the header and drops the tab bar
      data-first-run={firstRun ? '' : undefined}
      className={cn(
        'mx-auto flex w-full max-w-[58rem] flex-col gap-4 px-4 pt-4 md:gap-5 md:px-6 md:pt-8',
        step === 3 ? 'pb-16' : 'pb-[calc(var(--step-footer)+2.5rem)]'
      )}
    >
      {step === 2 && (
        <button
          type="button"
          onClick={() => go(1)}
          className="-my-2 -ml-1 inline-flex h-9 items-center gap-1.5 self-start rounded-chip px-1 text-body font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
          Back to interests
        </button>
      )}

      <div className="flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-body/6 font-semibold text-muted-foreground">
            {firstRun ? 'Set up your profile' : 'Update your profile'}
          </h1>
          <span className="text-small font-normal text-muted-foreground tabular-nums">
            Step {step} of 3
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Your profile"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step}
          aria-valuetext={`Step ${step} of 3`}
          className="grid grid-cols-3 gap-1.5"
        >
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={cn(
                'h-1 rounded-full border border-transparent',
                n <= step
                  ? 'bg-primary forced-colors:bg-[Highlight] forced-colors:forced-color-adjust-none'
                  : 'bg-border'
              )}
            />
          ))}
        </div>
      </div>

      {props.kept && step === opened && (
        <p className="flex items-start gap-2.5 text-body/[1.375rem]">
          <CircleCheck
            aria-hidden="true"
            size={18}
            strokeWidth={2}
            className="mt-0.5 shrink-0 text-ok"
          />
          {props.kept}
        </p>
      )}

      {waiting && step !== 3 && (
        <div className="grid grid-cols-[20px_minmax(0,1fr)] items-start gap-x-3 rounded-[0.75rem] border border-border bg-card px-4 py-3.25">
          <Bookmark
            aria-hidden="true"
            size={20}
            strokeWidth={1.75}
            className="mt-px text-primary"
          />
          <p className="text-body/[1.375rem]">
            <strong className="font-semibold">{waiting.program}</strong>, {waiting.university}, is
            waiting. We’ll add it to your shortlist when you finish.
          </p>
        </div>
      )}

      <div className="mt-1 flex flex-col gap-1.5">
        <h2 ref={question} id="first-run-question" tabIndex={-1} className="text-h1 outline-none">
          {step === 1
            ? 'What would you like to study?'
            : step === 2
              ? 'Where would you like to study?'
              : 'Your subjects and grades'}
        </h2>
        {step !== 3 && (
          <p className="text-body text-muted-foreground md:text-body-l">
            {step === 1
              ? 'Choose up to five. You can change them any time.'
              : 'Choose as many as you like, or Open to anywhere.'}
          </p>
        )}
      </div>

      {step === 1 && (
        <fieldset
          aria-labelledby="first-run-question"
          className="grid min-w-0 grid-cols-1 gap-2 md:grid-cols-2"
        >
          {fields.map((field) => {
            const on = chosenFields.includes(field.id)
            return (
              <CheckboxRow
                key={field.id}
                id={`field-${field.id}`}
                name={field.name}
                description={field.description || undefined}
                icon={fieldIcon(field.name)}
                checked={on}
                limited={!on && fieldsFull}
                onRefused={() =>
                  setRefused(
                    `You can choose up to ${MAX_FIELDS}. Untick one to choose ${field.name}.`
                  )
                }
                onCheckedChange={(checked) => toggleField(field.id, checked)}
              />
            )
          })}
        </fieldset>
      )}

      {step === 2 && (
        <fieldset aria-labelledby="first-run-question" className="flex min-w-0 flex-col gap-3">
          <CheckboxRow
            id="anywhere"
            name="Open to anywhere"
            description={`Programs in all ${countries.length} countries`}
            icon={Earth}
            checked={anywhere}
            onCheckedChange={setAnywhere}
            className="md:max-w-[27rem]"
          />
          {anywhere ? (
            <p className="text-body text-muted-foreground">
              You’ll see programs in all {countries.length} countries. Untick it to choose
              countries; the ones you had come back.
            </p>
          ) : (
            <>
              <SearchInput
                value={filter}
                onValueChange={setFilter}
                aria-label="Filter countries"
                placeholder="Filter countries"
                clearLabel="Clear filter"
                className="md:h-11 md:max-w-[27rem]"
              />
              <span role="status" className="sr-only">
                {filter.trim()
                  ? shownCountries.length === 1
                    ? '1 country'
                    : `${shownCountries.length} countries`
                  : ''}
              </span>
              {shownCountries.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {shownCountries.map((country) => (
                    <CheckboxTile
                      key={country.id}
                      id={`country-${country.id}`}
                      name={country.name}
                      checked={chosenCountries.includes(country.id)}
                      onCheckedChange={(checked) => toggleCountry(country.id, checked)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-start gap-0.5 rounded-[0.75rem] border border-border bg-card px-5 pt-4.5 pb-3">
                  <p className="text-body font-semibold">No country matches “{filter.trim()}”</p>
                  <p className="text-body text-muted-foreground">
                    IB Match has programs in {countries.length} countries.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilter('')}
                    className="-ml-1 h-11 rounded-chip px-1 text-body font-semibold text-primary underline underline-offset-3"
                  >
                    Clear filter
                  </button>
                </div>
              )}
            </>
          )}
        </fieldset>
      )}

      {step === 3 && (
        // Today's subject step (FieldSelectorClient.tsx) until 3.2 rebuilds it
        <div className="flex flex-col gap-6">
          <DetailedGradesInput
            courses={props.courses}
            selections={courseSelections}
            tokGrade={tokGrade}
            eeGrade={eeGrade}
            onSelectionsChange={(selections, tok, ee) => {
              setCourseSelections(selections)
              setTokGrade(tok)
              setEeGrade(ee)
            }}
            onValidationChange={setDiplomaValid}
          />
          {saveError && (
            <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
              {saveError}
            </div>
          )}
          <div className="mt-2 flex justify-between">
            <TodayButton variant="outline" onClick={() => go(2)} size="lg" disabled={saving}>
              ← Back
            </TodayButton>
            <TodayButton
              onClick={() => void complete()}
              disabled={
                courseSelections.length !== 6 || !tokGrade || !eeGrade || !diplomaValid || saving
              }
              size="lg"
            >
              {saving ? 'Saving...' : 'Complete Profile'}
            </TodayButton>
          </div>
        </div>
      )}

      {step !== 3 && (
        <StepFooter
          status={
            step === 1
              ? refused
                ? { text: refused, notice: true }
                : chosenFields.length === 0
                  ? { text: 'Choose at least one field' }
                  : { count: chosenFields.length, text: ` of ${MAX_FIELDS} chosen` }
              : anywhere
                ? { text: 'Every country', strong: true }
                : chosenCountries.length === 0
                  ? { text: 'Choose a country, or Open to anywhere' }
                  : { count: chosenCountries.length, text: ' chosen' }
          }
          ready={step === 1 ? chosenFields.length > 0 : anywhere || chosenCountries.length > 0}
          saving={saving}
          onContinue={() => void saveAndContinue(step === 1 ? 1 : 2)}
        />
      )}
    </div>
  )
}

/**
 * The footer fixed to the bottom of every step (D2.6): the count, or what Continue needs, or why
 * a box didn't tick, then Continue, which saves the step. 88px with a 48px button on a phone; a
 * full-width 76px bar on desktop with its contents on the page's column.
 */
function StepFooter({
  status,
  ready,
  saving,
  onContinue
}: {
  status: { text: string; count?: number; notice?: boolean; strong?: boolean }
  ready: boolean
  saving: boolean
  onContinue: () => void
}) {
  return (
    <div
      data-step-footer=""
      className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/94 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:h-19 md:py-0"
    >
      <div className="mx-auto flex w-full max-w-[58rem] items-center justify-between gap-3 px-4 md:h-full md:gap-6 md:px-6">
        <p
          role="status"
          id="first-run-status"
          className={cn(
            'flex min-w-0 items-start gap-2 text-body/5 tabular-nums',
            status.notice || status.strong ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {status.notice && (
            <Info aria-hidden="true" size={18} strokeWidth={2} className="mt-px shrink-0" />
          )}
          <span>
            {status.count !== undefined && (
              <strong className="font-semibold text-foreground">{status.count}</strong>
            )}
            {status.text}
          </span>
        </p>
        <Button
          disabled={!ready}
          loading={saving}
          loadingLabel="Saving…"
          aria-describedby={ready ? undefined : 'first-run-status'}
          onClick={onContinue}
          className="h-12 min-w-30 px-6 text-[1rem] md:h-11 md:min-w-32 md:px-5 md:text-body"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
