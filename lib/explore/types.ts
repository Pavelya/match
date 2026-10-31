import type { CardStatus } from '@/lib/matching/match-status'

/** One program in Explore's list, as a result row shows it (board "D3.3 Result row") */
export interface ExploreRow {
  id: string
  name: string
  university: string
  /** The campus city when the program has one, else the university's */
  city: string | null
  country: string
  /** As stored: "4 years", "3.5 years" */
  length: string
  /** Null when the program sets no IB minimum */
  minIBPoints: number | null
  /** The university's overall admit rate in percent, shown beside "None" */
  admitRate: number | null
  image: string | null
  /** The tile without an image: "SU" */
  initials: string
}

/** The student's fit, the Matches badge word for word (D3.3) */
export interface ExploreFit {
  status: CardStatus
  badge: string
}

export interface ExploreResponse {
  total: number
  rows: ExploreRow[]
  /** By program id, when a signed-in student has grades */
  fits?: Record<string, ExploreFit>
  /** With "Only ones I qualify for" on: how many of the total have no set grades */
  noSetGrades?: number
}

/**
 * How Best fit reads its list (EXPLORE_BEST_FIT, MAINT_tasks.md 5.27): the full order, or one
 * search lifting the student's countries and fields. "off" offers no Best fit at all.
 */
export type BestFitMode = 'full' | 'lifted' | 'off'

/** Who is looking, as far as the page needs: one narrow read when signed in, none signed out */
export interface ExploreViewer {
  signedIn: boolean
  /** Subjects and a total saved: the fit, the switch and the shortcuts */
  hasGrades: boolean
  /** "Up to my 38" */
  total: number | null
  /** The profile's own choices: "Use my fields", "Use my countries" */
  fields: string[]
  countries: string[]
  /** The shortlist, so Save shows "Saved" from the first paint */
  savedIds: string[]
  /** How Best fit is offered: with grades, unless the switch is off; null when it isn't */
  bestFit: Exclude<BestFitMode, 'off'> | null
}

export const SIGNED_OUT: ExploreViewer = {
  signedIn: false,
  hasGrades: false,
  total: null,
  fields: [],
  countries: [],
  savedIds: [],
  bestFit: null
}
