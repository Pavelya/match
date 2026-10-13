/**
 * Builds the Shortlist on the server (rebranding 2.5): each saved program as its row and its
 * compare column show it. The fit is Explore's (lib/explore/fit.ts), worked out from the
 * requirement rows the shortlist query returns, so the page reads no programs cache and makes
 * no search. Pure: the route reads, this words.
 */

import { academicFit } from '@/lib/explore/fit'
import { CLOSE_POINTS, subjectChips } from '@/lib/matching/match-status'
import { transformProgram } from '@/lib/matching/transformers'
import type { StudentProfile } from '@/lib/matching/types'
import { requirementsCheck } from '@/lib/programs/entry-year'
import { universityInitials } from '@/lib/programs/university-initials'
import type { ShortlistFit, ShortlistItem } from './types'

/** A saved program as the route selects it */
export interface SavedProgramRow {
  id: string
  name: string
  degreeType: string
  duration: string
  campusCity: string | null
  minIBPoints: number | null
  programUrl: string | null
  requirementsEntryYear: number | null
  fieldOfStudy: { id: string }
  university: {
    id: string
    name: string
    abbreviatedName: string | null
    image: string | null
    city: string
    admitRate: number | null
    country: { id: string; name: string }
  }
  courseRequirements: {
    requiredLevel: string
    minGrade: number
    isCritical: boolean
    orGroupId: string | null
    ibCourse: { id: string; name: string }
  }[]
}

/** Whose shortlist it is: the fit needs subjects and a total; the Country row, their countries */
export interface ShortlistViewer {
  student: StudentProfile | null
  countryIds: readonly string[]
  openToAllLocations: boolean
}

export function shortlistItem(
  program: SavedProgramRow,
  viewer: ShortlistViewer,
  now?: Date
): ShortlistItem {
  const { university } = program
  const check = requirementsCheck(program.requirementsEntryYear, now)
  const choseCountries = !viewer.openToAllLocations && viewer.countryIds.length > 0
  return {
    id: program.id,
    name: program.name,
    university: university.name,
    city: program.campusCity ?? university.city,
    country: university.country.name,
    length: program.duration,
    minIBPoints: program.minIBPoints,
    admitRate: university.admitRate,
    image: university.image,
    initials: universityInitials(university.name, university.abbreviatedName),
    degree: program.degreeType,
    programUrl: program.programUrl,
    intake:
      check.status === 'unchecked'
        ? null
        : { year: check.entryYear, earlier: check.status === 'older' },
    notYourCountry: choseCountries && !viewer.countryIds.includes(university.country.id),
    ...(viewer.student && { fit: shortlistFit(viewer.student, program) })
  }
}

function shortlistFit(student: StudentProfile, program: SavedProgramRow): ShortlistFit {
  const { status, badge, academicMatch } = academicFit(student, {
    minIBPoints: program.minIBPoints,
    requirements: transformProgram({
      ...program,
      university: { ...program.university, country: { id: program.university.country.id } }
    })
  })
  return {
    status,
    badge,
    points: pointsMark(student.totalIBPoints, program.minIBPoints),
    subjects: subjectChips(academicMatch.subjectMatches).map(({ kind, label }) => ({
      kind,
      label
    }))
  }
}

/** "Met", "1 point short", "6 points short", in the points chip's status (D3.7) */
export function pointsMark(total: number, minIBPoints: number | null): ShortlistFit['points'] {
  // As the matcher: no minimum, or 0, is no points requirement
  if (!minIBPoints) return null
  const short = Math.max(0, minIBPoints - total)
  if (short === 0) return { kind: 'met', text: 'Met' }
  return {
    kind: short <= CLOSE_POINTS ? 'close' : 'gap',
    text: `${short} ${short === 1 ? 'point' : 'points'} short`
  }
}
