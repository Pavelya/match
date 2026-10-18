'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Bookmark, CircleCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ds/Toast'
import {
  CountriesChoice,
  InterestsChoice,
  StepFooter,
  StepQuestion,
  SubjectsFooter
} from '@/components/first-run/Steps'
import { ProfileEditor } from '@/components/profile-editor/ProfileEditor'
import { useFirstRunExit } from '@/components/site/first-run-exit'
import { useShortlistCounter } from '@/components/site/shortlist-count'
import { calculateTotalPoints } from '@/lib/ib/diploma'
import { MAX_FIELDS } from '@/lib/student/draft'
import { finishHref, firstRunTitle, type FirstRunStep, type Waiting } from '@/lib/student/first-run'
import {
  chosenSubjects,
  editorFooter,
  isBlank,
  placeSubjects,
  subjectsDraft,
  type SubjectsState
} from '@/lib/student/subject-editor'

/*
 * First run's steps in the new design (rebranding 3.1; boards "D2.6 Checkbox rows and grid",
 * "D4.3 First run, step 1" and "D4.4 First run, step 2", approved 13 October 2026), and step 3,
 * the subject editor (3.2; "D3.6 Subject editor" and "D4.5 First run, step 3", approved 14
 * October 2026). Steps 1 and 2 save as drafts on Continue, so leaving loses nothing (03-flows F1);
 * step 3 writes nothing while choosing, and Finish saves the profile once, with its total. After
 * first run, Academic opens each step on its own instead (3.3, Academic.tsx). Loaded through
 * NewOnboarding.tsx, so today's design downloads none of it.
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

const SUBJECTS_FAILED = 'Couldn’t save your subjects and grades.'

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
  const { fields, countries, waiting, returnTo } = props
  const router = useRouter()
  const toast = useToast()
  const counter = useShortlistCounter()

  const [step, setStep] = useState<FirstRunStep>(props.step)
  const [opened] = useState<FirstRunStep>(props.step)
  const [chosenFields, setChosenFields] = useState<string[]>(props.initial.fields)
  const [chosenCountries, setChosenCountries] = useState<string[]>(props.initial.countries)
  const [anywhere, setAnywhere] = useState(props.initial.anywhere)
  const [refused, setRefused] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const courses = props.courses
  // Step 3 opens on the subjects saved by Save and exit, each in its group's row (D3.6)
  const [subjects, setSubjects] = useState<SubjectsState>(() => ({
    rows: placeSubjects(
      props.initial.courseSelections.map(({ courseId, level, grade }) => ({
        courseId,
        level,
        grade
      })),
      courses
    ),
    tok: props.initial.tokGrade,
    ee: props.initial.eeGrade
  }))
  const footer = useMemo(() => editorFooter(subjects, courses), [subjects, courses])

  const question = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)

  // The title follows the step; a new step takes focus at its question, from the top
  useEffect(() => {
    document.title = firstRunTitle(step)
    if (!moved.current) return
    window.scrollTo({ top: 0 })
    question.current?.focus()
  }, [step])

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

  // "Save and exit" in focus mode's header saves the step in progress (D2.12). At step 3 it keeps
  // each complete subject and the core as a draft without a total, so the student still has no
  // grades and Save keeps leading here (D4.5).
  const exitPlan = useMemo(
    () => ({
      waiting,
      save: async () => {
        let saved = true
        if (step === 1 && chosenFields.length > 0) saved = await interests()
        if (step === 2 && (anywhere || chosenCountries.length > 0)) saved = await places()
        if (step === 3 && !isBlank(subjects)) saved = await saveDraft(subjectsDraft(subjects))
        if (!saved) {
          toast({
            tone: 'gap',
            message:
              step === 1
                ? 'Couldn’t save your interests.'
                : step === 2
                  ? 'Couldn’t save your countries.'
                  : SUBJECTS_FAILED
          })
        }
        return saved
      }
    }),
    [waiting, step, chosenFields, anywhere, chosenCountries, subjects, interests, places, toast]
  )
  useFirstRunExit(exitPlan)

  /**
   * Finish: the profile once, with its total, as today; then back where Save was pressed, or
   * Matches. If it fails the student stays, everything kept (D2.9).
   */
  const complete = async () => {
    if (!footer.ready || saving) return
    setSaving(true)
    const courseSelections = chosenSubjects(subjects.rows, courses)
    let saved = false
    try {
      const response = await fetch('/api/students/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interestedFields: chosenFields,
          preferredCountries: anywhere ? [] : chosenCountries,
          courseSelections,
          tokGrade: subjects.tok,
          eeGrade: subjects.ee,
          totalIBPoints: calculateTotalPoints(courseSelections, subjects.tok, subjects.ee)
        })
      })
      saved = response.ok
    } catch {
      saved = false
    }
    if (!saved) {
      setSaving(false)
      toast({
        tone: 'gap',
        message: SUBJECTS_FAILED,
        // The latest Finish, so a choice changed since the failure is saved too
        action: { label: 'Try again', onClick: () => finishAgain.current() }
      })
      return
    }
    // The first grades mean an empty shortlist: the nav count starts at 0, and a save makes 1
    counter?.record(0)
    router.push(finishHref(returnTo))
  }
  const finishAgain = useRef<() => void>(() => {})
  useEffect(() => {
    finishAgain.current = () => void complete()
  })

  return (
    <div
      // Focus mode while first run lasts: app/globals.css swaps the header and drops the tab bar
      data-first-run=""
      className={cn(
        'mx-auto flex w-full max-w-[58rem] flex-col gap-4 px-4 pt-4 md:gap-5 md:px-6 md:pt-8',
        'pb-[calc(var(--step-footer)+2.5rem)]'
      )}
    >
      {step !== 1 && (
        <button
          type="button"
          onClick={() => go(step === 3 ? 2 : 1)}
          className="-my-2 -ml-1 inline-flex h-9 items-center gap-1.5 self-start rounded-chip px-1 text-body font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
          {step === 3 ? 'Back to countries' : 'Back to interests'}
        </button>
      )}

      <div className="flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-body font-semibold text-muted-foreground">Set up your profile</h1>
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
        <p className="flex items-start gap-2.5 text-[0.9375rem]/[1.375rem]">
          <CircleCheck
            aria-hidden="true"
            size={18}
            strokeWidth={2}
            className="mt-0.5 shrink-0 text-ok"
          />
          {props.kept}
        </p>
      )}

      {waiting && (
        <div className="grid grid-cols-[20px_minmax(0,1fr)] items-start gap-x-3 rounded-[0.75rem] border border-border bg-card px-4 py-3.25">
          <Bookmark
            aria-hidden="true"
            size={20}
            strokeWidth={1.75}
            className="mt-px text-primary"
          />
          <p className="text-[0.9375rem]/[1.375rem]">
            <strong className="font-semibold">{waiting.program}</strong>, {waiting.university}, is
            waiting. We’ll add it to your shortlist when you finish.
          </p>
        </div>
      )}

      <StepQuestion
        headingRef={question}
        question={
          step === 1
            ? 'What would you like to study?'
            : step === 2
              ? 'Where would you like to study?'
              : 'What are your subjects and grades?'
        }
        sub={
          step === 1
            ? 'Choose up to five. You can change them any time.'
            : step === 2
              ? 'Choose as many as you like, or Open to anywhere.'
              : waiting
                ? // The waiting line says where finishing leads
                  'Your six subjects, each with its level and your predicted grade. Final grades work too.'
                : 'Your six subjects, each with its level and your predicted grade. Final grades work too. When you finish, we’ll show your matches.'
        }
      />

      {step === 1 && (
        <InterestsChoice
          fields={fields}
          chosen={chosenFields}
          onChange={(next) => {
            setRefused(null)
            setChosenFields(next)
          }}
          onRefused={setRefused}
        />
      )}

      {step === 2 && (
        <CountriesChoice
          countries={countries}
          chosen={chosenCountries}
          anywhere={anywhere}
          onChange={setChosenCountries}
          onAnywhereChange={setAnywhere}
        />
      )}

      {step === 3 && <ProfileEditor courses={courses} value={subjects} onChange={setSubjects} />}

      {step === 3 ? (
        <SubjectsFooter
          footer={footer}
          label="Finish"
          saving={saving}
          onFinish={() => void complete()}
        />
      ) : (
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
          label="Continue"
          onPress={() => void saveAndContinue(step === 1 ? 1 : 2)}
        />
      )}
    </div>
  )
}
