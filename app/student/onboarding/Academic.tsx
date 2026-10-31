'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AcademicHeading } from '@/components/academic/AcademicHeading'
import { AcademicSummary, editLinkId } from '@/components/academic/AcademicSummary'
import { ConfirmDialog } from '@/components/ds/ConfirmDialog'
import { useToast } from '@/components/ds/Toast'
import { fieldIcon } from '@/components/first-run/field-icons'
import {
  CountriesChoice,
  InterestsChoice,
  StepFooter,
  StepQuestion,
  SubjectsFooter
} from '@/components/first-run/Steps'
import { ProfileEditor } from '@/components/profile-editor/ProfileEditor'
import { APP_PLACES } from '@/components/site/nav'
import { calculateTotalPoints } from '@/lib/ib/diploma'
import {
  ACADEMIC_PATH,
  academicHref,
  academicTitle,
  countriesCount,
  countriesStatus,
  failedMessage,
  interestsCount,
  interestsStatus,
  leaveText,
  namesInOrder,
  readScreen,
  sameChoice,
  savedMessage,
  savedProfileProblem,
  subjectLines,
  totalDetail,
  type AcademicScreen
} from '@/lib/student/academic'
import {
  chosenSubjects,
  editorFooter,
  placeSubjects,
  sameSubjects,
  type SubjectsState
} from '@/lib/student/subject-editor'

/*
 * The Academic page once the student has grades (rebranding 3.3; boards "D4.11 Academic profile"
 * and "D4.11 Academic profile · phone", approved 18 October 2026). A summary in three panels, each
 * opening its own screen at its own address (?edit=interests), which first run's steps draw on
 * their own: "Back to Academic profile", "Update your profile" with no step count, and Save
 * changes. Nothing is written until Save changes, which goes back to the summary with a toast.
 * Leaving a screen with changes not saved asks first (D2.10). The screens open without a request:
 * the page reads the profile once, as today's /student/onboarding does, and the summary shows what
 * each save wrote. Loaded through NewOnboarding.tsx, so today's design downloads none of it.
 */

interface IBCourse {
  id: string
  name: string
  code: string
  group: number
}

/** The profile as saved, which the summary shows and each screen opens on */
interface Saved {
  fields: string[]
  countries: string[]
  anywhere: boolean
  subjects: SubjectsState
  total: number
}

export interface AcademicProps {
  fields: { id: string; name: string; description: string }[]
  countries: { id: string; name: string }[]
  courses: IBCourse[]
  saved: {
    fields: string[]
    countries: string[]
    anywhere: boolean
    courseSelections: { courseId: string; level: 'HL' | 'SL'; grade: number }[]
    tokGrade: string | null
    eeGrade: string | null
    total: number
  }
}

const PREFERENCES = '/api/students/profile/preferences'

async function send(url: string, method: 'PUT' | 'POST', body: unknown): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return response.ok
  } catch {
    return false
  }
}

const QUESTION: Record<AcademicScreen, { question: string; sub: string }> = {
  interests: {
    question: 'What would you like to study?',
    sub: 'Choose up to five. Your matches update when you save.'
  },
  countries: {
    question: 'Where would you like to study?',
    sub: 'Choose as many as you like, or Open to anywhere. Your matches update when you save.'
  },
  subjects: {
    question: 'What are your subjects and grades?',
    sub: 'Change a subject, level or grade where it is. Your matches update when you save.'
  }
}

export function Academic(props: AcademicProps) {
  const { fields, countries, courses } = props
  const router = useRouter()
  const toast = useToast()
  const screen = readScreen(useSearchParams())

  const [saved, setSaved] = useState<Saved>(() => ({
    fields: props.saved.fields,
    countries: props.saved.countries,
    anywhere: props.saved.anywhere,
    subjects: {
      rows: placeSubjects(props.saved.courseSelections, courses),
      tok: props.saved.tokGrade,
      ee: props.saved.eeGrade
    },
    total: props.saved.total
  }))

  // What each screen holds until Save changes. Opening a screen from the summary starts it from
  // the profile as saved.
  const [chosenFields, setChosenFields] = useState(saved.fields)
  const [refused, setRefused] = useState<string | null>(null)
  const [chosenCountries, setChosenCountries] = useState(saved.countries)
  const [anywhere, setAnywhere] = useState(saved.anywhere)
  const [subjects, setSubjects] = useState<SubjectsState>(saved.subjects)
  const [saving, setSaving] = useState(false)

  const interests = interestsStatus(chosenFields, saved.fields, refused)
  const places = countriesStatus(chosenCountries, anywhere, saved)
  const footer = useMemo(
    () => editorFooter(subjects, courses, saved.subjects),
    [subjects, courses, saved.subjects]
  )
  const changed =
    screen === 'interests'
      ? !sameChoice(chosenFields, saved.fields)
      : screen === 'countries'
        ? anywhere !== saved.anywhere ||
          (!anywhere && !sameChoice(chosenCountries, saved.countries))
        : screen === 'subjects'
          ? !sameSubjects(subjects, saved.subjects)
          : false

  // The way between the summary and its screens, without a request. A screen opened from the
  // summary goes back through the history, so Back after it doesn't return to the screen.
  const pushed = useRef(false)
  const summaryScroll = useRef(0)
  // The screen drawn last; undefined before the first, which moves nothing
  const drawn = useRef<AcademicScreen | null | undefined>(undefined)
  const question = useRef<HTMLHeadingElement>(null)

  const open = (next: AcademicScreen, event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setChosenFields(saved.fields)
    setRefused(null)
    setChosenCountries(saved.countries)
    setAnywhere(saved.anywhere)
    setSubjects(saved.subjects)
    summaryScroll.current = window.scrollY
    pushed.current = true
    window.history.pushState(null, '', academicHref(next))
  }

  const backToSummary = useCallback(() => {
    if (pushed.current) {
      pushed.current = false
      window.history.back()
    } else {
      window.history.replaceState(null, '', ACADEMIC_PATH)
    }
  }, [])

  // The title follows the screen. A screen opens at the top with focus on its question, as in
  // first run; back on the summary, by any way including the browser's Back, the page is where it
  // was, with focus on the panel's link.
  useEffect(() => {
    document.title = academicTitle(screen)
    const previous = drawn.current
    drawn.current = screen
    if (!screen) pushed.current = false
    if (previous === undefined || previous === screen) return
    if (screen) {
      window.scrollTo({ top: 0 })
      question.current?.focus()
    } else if (previous) {
      window.scrollTo({ top: summaryScroll.current })
      document.getElementById(editLinkId(previous))?.focus({ preventScroll: true })
    }
  }, [screen])

  // Leaving a screen with changes not saved asks first (D2.10)
  const [leaving, setLeaving] = useState<{ go: () => void } | null>(null)
  const changedRef = useRef(changed)
  const goingRef = useRef(false)
  useEffect(() => {
    changedRef.current = changed
  })

  useEffect(() => {
    if (!screen) return
    goingRef.current = false
    // Links on the page, in the header, the tab bar and the footer. Academic's own address is
    // the summary, shown here without a request.
    const onClick = (event: globalThis.MouseEvent) => {
      if (goingRef.current || event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest?.('a[href]')
      if (!(link instanceof HTMLAnchorElement)) return
      if ((link.target && link.target !== '_self') || link.hasAttribute('download')) return
      const url = new URL(link.href, window.location.href)
      const here = url.origin === window.location.origin
      const summary = here && url.pathname === ACADEMIC_PATH && url.search === ''
      if (!summary && !changedRef.current) return
      event.preventDefault()
      event.stopPropagation()
      const go = summary
        ? backToSummary
        : here
          ? () => router.push(`${url.pathname}${url.search}${url.hash}`)
          : () => window.location.assign(url.href)
      if (changedRef.current) setLeaving({ go })
      else go()
    }
    // Sign out, in the account panel
    const onSubmit = (event: SubmitEvent) => {
      if (goingRef.current || !changedRef.current) return
      const form = event.target
      if (!(form instanceof HTMLFormElement)) return
      event.preventDefault()
      event.stopPropagation()
      setLeaving({ go: () => form.requestSubmit() })
    }
    // Closing the tab or reloading: the browser's own prompt
    const onUnload = (event: BeforeUnloadEvent) => {
      if (!changedRef.current || goingRef.current) return
      event.preventDefault()
    }
    document.addEventListener('click', onClick, true)
    document.addEventListener('submit', onSubmit, true)
    window.addEventListener('beforeunload', onUnload)
    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('submit', onSubmit, true)
      window.removeEventListener('beforeunload', onUnload)
    }
  }, [screen, router, backToSummary])

  /** Save changes: one write, then back to the summary with the toast; a failure stays (D2.9) */
  const save = async (which: AcademicScreen) => {
    if (saving) return
    setSaving(true)
    let next: Saved = saved
    let ok: boolean
    if (which === 'interests') {
      ok = await send(PREFERENCES, 'PUT', { step: 'interests', fields: chosenFields })
      next = { ...saved, fields: chosenFields }
    } else if (which === 'countries') {
      const kept = anywhere ? [] : chosenCountries
      ok = await send(PREFERENCES, 'PUT', { step: 'countries', countries: kept, anywhere })
      next = { ...saved, countries: kept, anywhere }
    } else {
      const courseSelections = chosenSubjects(subjects.rows, courses)
      const total = calculateTotalPoints(courseSelections, subjects.tok, subjects.ee)
      ok = await send('/api/students/profile', 'POST', {
        interestedFields: saved.fields,
        preferredCountries: saved.anywhere ? [] : saved.countries,
        courseSelections,
        tokGrade: subjects.tok,
        eeGrade: subjects.ee,
        totalIBPoints: total
      })
      next = { ...saved, subjects, total: total ?? saved.total }
    }
    setSaving(false)
    if (!ok) {
      toast({
        tone: 'gap',
        message: failedMessage(which),
        // The latest choices, so a change made since the failure is saved too
        action: { label: 'Try again', onClick: () => saveAgain.current(which) }
      })
      return
    }
    setSaved(next)
    toast({
      tone: 'ok',
      message: savedMessage(which),
      action: { label: 'See matches', href: APP_PLACES.matches.href }
    })
    goingRef.current = true
    backToSummary()
  }
  const saveAgain = useRef<(which: AcademicScreen) => void>(() => {})
  useEffect(() => {
    saveAgain.current = (which) => void save(which)
  })

  if (!screen) {
    const lines = subjectLines(saved.subjects.rows, courses)
    return (
      // A quiet page: the header's season accessory hides on it (D1.7, app/globals.css)
      <div
        data-quiet=""
        className="mx-auto flex w-full max-w-[58rem] flex-col gap-4 px-4 pt-5 pb-16 md:gap-6 md:px-6 md:pt-10 md:pb-24"
      >
        <AcademicHeading />
        <div className="flex flex-col gap-4 md:gap-6">
          <AcademicSummary
            subjects={{
              total: saved.total,
              detail: totalDetail(saved.subjects.rows, saved.subjects.tok, saved.subjects.ee),
              lines,
              tok: saved.subjects.tok,
              ee: saved.subjects.ee,
              problem: savedProfileProblem(
                saved.subjects.rows,
                saved.subjects.tok,
                saved.subjects.ee,
                courses
              )
            }}
            interests={{
              count: interestsCount(saved.fields.length),
              items: namesInOrder(fields, saved.fields).map((name) => ({
                name,
                icon: fieldIcon(name)
              }))
            }}
            countries={{
              count: countriesCount(saved.countries.length, saved.anywhere),
              anywhere: saved.anywhere,
              names: namesInOrder(countries, saved.countries).join(', '),
              all: countries.length
            }}
            onOpen={open}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      data-quiet=""
      className={cn(
        'mx-auto flex w-full max-w-[58rem] flex-col gap-4 px-4 pt-4 md:gap-5 md:px-6 md:pt-8',
        'pb-[calc(var(--step-footer)+2.5rem)]'
      )}
    >
      {/* The page's own link: a request without the script, the summary with it (onClick above) */}
      <a
        href={ACADEMIC_PATH}
        className="-my-2 -ml-1 inline-flex h-9 items-center gap-1.5 self-start rounded-chip px-1 text-body font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
        Back to Academic profile
      </a>
      <h1 className="text-body font-semibold text-muted-foreground">Update your profile</h1>
      <StepQuestion headingRef={question} {...QUESTION[screen]} />

      {screen === 'interests' && (
        <>
          <InterestsChoice
            fields={fields}
            chosen={chosenFields}
            onChange={(next) => {
              setRefused(null)
              setChosenFields(next)
            }}
            onRefused={setRefused}
          />
          <StepFooter
            status={interests}
            ready={interests.ready}
            saving={saving}
            label="Save changes"
            onPress={() => void save('interests')}
          />
        </>
      )}

      {screen === 'countries' && (
        <>
          <CountriesChoice
            countries={countries}
            chosen={chosenCountries}
            anywhere={anywhere}
            onChange={setChosenCountries}
            onAnywhereChange={setAnywhere}
          />
          <StepFooter
            status={places}
            ready={places.ready}
            saving={saving}
            label="Save changes"
            onPress={() => void save('countries')}
          />
        </>
      )}

      {screen === 'subjects' && (
        <>
          <ProfileEditor courses={courses} value={subjects} onChange={setSubjects} />
          <SubjectsFooter
            footer={footer}
            label="Save changes"
            saving={saving}
            onFinish={() => void save('subjects')}
          />
        </>
      )}

      <ConfirmDialog
        open={leaving !== null}
        onCancel={() => setLeaving(null)}
        title="Leave without saving?"
        cancelLabel="Keep editing"
        actionLabel="Leave"
        onAction={() => {
          const go = leaving?.go
          goingRef.current = true
          setLeaving(null)
          go?.()
        }}
      >
        <p>{leaveText(screen)}</p>
      </ConfirmDialog>
    </div>
  )
}
