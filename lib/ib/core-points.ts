/**
 * IB core points: what Theory of Knowledge and the Extended Essay add to the six subject
 * grades. The IB awards 0-3 points from a fixed matrix, not from a sum of the two grades,
 * and a grade E in either is a failing condition: no diploma.
 */

export const CORE_GRADES = ['A', 'B', 'C', 'D', 'E'] as const

export type CoreGrade = (typeof CORE_GRADES)[number]

type PassingCoreGrade = Exclude<CoreGrade, 'E'>

/** TOK grade, then EE grade. The matrix is symmetric. An E has no row: it fails. */
const CORE_POINTS_MATRIX: Record<PassingCoreGrade, Record<PassingCoreGrade, number>> = {
  A: { A: 3, B: 3, C: 2, D: 2 },
  B: { A: 3, B: 2, C: 2, D: 1 },
  C: { A: 2, B: 2, C: 1, D: 0 },
  D: { A: 2, B: 1, C: 0, D: 0 }
}

export const CORE_FAILING_MESSAGE =
  'A grade E in TOK or the Extended Essay is a failing condition: the IB does not award the diploma.'

export function isCoreGrade(value: unknown): value is CoreGrade {
  return typeof value === 'string' && (CORE_GRADES as readonly string[]).includes(value)
}

/** True when either grade is E. A missing grade is not failing yet. */
export function hasFailingCoreGrade(
  tokGrade: string | null | undefined,
  eeGrade: string | null | undefined
): boolean {
  return tokGrade === 'E' || eeGrade === 'E'
}

/**
 * The core points for a TOK and an EE grade: 0-3 from the matrix, `'failing'` when either
 * is E, or null while either is missing or not a grade.
 */
export function getCorePoints(
  tokGrade: string | null | undefined,
  eeGrade: string | null | undefined
): number | 'failing' | null {
  if (hasFailingCoreGrade(tokGrade, eeGrade)) return 'failing'
  if (!isCoreGrade(tokGrade) || !isCoreGrade(eeGrade)) return null
  return CORE_POINTS_MATRIX[tokGrade as PassingCoreGrade][eeGrade as PassingCoreGrade]
}
