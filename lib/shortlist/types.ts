import type { ExploreFit, ExploreRow } from '@/lib/explore/types'
import type { ChipKind } from '@/lib/matching/match-status'
import type { ProfileStep } from '@/lib/matching/match-groups'

/**
 * The Shortlist as the page shows it (rebranding 2.5, boards "D4.10 Shortlist" and "D3.7 Compare
 * table", approved 13 October 2026): what GET /api/students/shortlist sends for each program, for
 * List and Compare both, so switching views reads nothing. Types only: the browser downloads it.
 */

/** One saved program: Explore's row (D3.3), and what the compare table adds */
export interface ShortlistItem extends ExploreRow {
  /** As stored: "Bachelor of Science", "BA" */
  degree: string
  programUrl: string | null
  /** The intake the requirements were checked for; null when they haven't been yet */
  intake: { year: number; earlier: boolean } | null
  /** Outside the countries the student chose: the Country row says so */
  notYourCountry: boolean
  /** With subjects and grades only */
  fit?: ShortlistFit
}

/** The fit as Matches words it, and the parts the compare table spells out */
export interface ShortlistFit extends ExploreFit {
  /** The IB minimum against the student's total: "Met", "1 point short"; null with no minimum */
  points: { kind: ChipKind; text: string } | null
  /** Every named subject in the match card's words (D3.1), missing first; empty when none */
  subjects: { kind: ChipKind; label: string }[]
}

export type ShortlistResponse =
  | {
      /** No subjects and grades yet: first run's steps, and the list without the fit */
      complete: false
      steps: ProfileStep[]
      programs: ShortlistItem[]
    }
  | {
      complete: true
      /** "You have 38" */
      total: number
      /** The intake students apply for now, which an earlier one is confirmed against */
      currentYear: number
      /** Newest first, as saved */
      programs: ShortlistItem[]
    }
