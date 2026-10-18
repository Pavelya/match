import { returnPath } from '@/lib/auth/callback-url'

/*
 * First run's steps, and the way from Save to first run and back (rebranding 3.1; boards "D4.3
 * First run, step 1", "D4.4 First run, step 2" and "D2.1 Save · without grades", approved 13
 * October 2026). Pure, so the rules are tested; the pages and the student layout only use them.
 */

export const FIRST_RUN_PATH = '/student/onboarding'

/** Where first run ends when nothing sent the student there */
export const MATCHES_PATH = '/student/matches'

/** Added to the return address, so the page there says "Profile saved." rather than "Signed in." */
export const VIA_PARAM = 'via'
export const VIA_FIRST_RUN = 'first-run'

export type FirstRunStep = 1 | 2 | 3

/** What the steps need from the profile */
export interface FirstRunProfile {
  totalIBPoints: number | null
  openToAllLocations: boolean
  preferredFields: readonly unknown[]
  preferredCountries: readonly unknown[]
  courses: readonly unknown[]
}

/** A program a student pressed Save on, waiting for first run to finish */
export interface Waiting {
  /** "Computer Science" */
  program: string
  /** "University of Toronto" */
  university: string
}

/**
 * Grades are in: subjects and a total, as `hasSubjects` (lib/matching/match-list.ts) judges. Save
 * needs them, and first run is finished once they are saved.
 */
export function hasGrades(profile: Pick<FirstRunProfile, 'totalIBPoints' | 'courses'> | null) {
  return Boolean(profile && profile.courses.length > 0 && profile.totalIBPoints !== null)
}

/**
 * Where first run opens: the first step not yet saved, so a student who left after step 2
 * starts at step 3. Interests are saved once one field is; countries once one is, or "Open to
 * anywhere" is.
 */
export function firstUnsavedStep(profile: FirstRunProfile | null): FirstRunStep {
  if (!profile || profile.preferredFields.length === 0) return 1
  if (profile.preferredCountries.length === 0 && !profile.openToAllLocations) return 2
  return 3
}

/** Opening at a later step, what is kept (D4.3) */
export function keptLine(step: FirstRunStep): string | null {
  if (step === 2) return 'Your interests are saved.'
  if (step === 3) return 'Your interests and countries are saved.'
  return null
}

/** "Set up your profile · Step 1 of 3 · IB Match", the page's title as the steps change */
export function firstRunTitle(step: FirstRunStep): string {
  return `Set up your profile · Step ${step} of 3 · IB Match`
}

/**
 * The link Save without grades follows, and "Add your grades": first run, with the page to come
 * back to. With a program waiting, its names ride along for the line on every step, so first run
 * reads nothing to say what is waiting.
 */
export function firstRunHref(returnTo: string, waiting?: Waiting): string {
  const params = new URLSearchParams({ return: returnTo })
  if (waiting) {
    params.set('program', waiting.program)
    params.set('university', waiting.university)
  }
  return `${FIRST_RUN_PATH}?${params}`
}

const NAME_MAX = 200

function name(value: string | null): string | null {
  const text = value?.replace(/\s+/g, ' ').trim().slice(0, NAME_MAX)
  return text || null
}

interface ParamsLike {
  get(name: string): string | null
}

/**
 * What first run reads from its address. A return address that isn't a path on this site is
 * dropped (`returnPath`), and the waiting program with it: names alone save nothing.
 */
export function readFirstRun(params: ParamsLike): {
  returnTo: string | null
  waiting: Waiting | null
} {
  const returnTo = returnPath(params.get('return'))
  const program = name(params.get('program'))
  const university = name(params.get('university'))
  return {
    returnTo,
    waiting: returnTo && program && university ? { program, university } : null
  }
}

/**
 * Where the last step goes: back where Save was pressed, marked as coming from first run, or
 * Matches when nothing sent the student here.
 */
export function finishHref(returnTo: string | null): string {
  if (!returnTo) return MATCHES_PATH
  const url = new URL(returnTo, 'https://return.invalid')
  url.searchParams.set(VIA_PARAM, VIA_FIRST_RUN)
  return `${url.pathname}${url.search}${url.hash}`
}
