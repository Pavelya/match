/**
 * GET /api/programs/explore: Explore's list in the new design (rebranding 2.3). Today's page
 * keeps GET /api/programs/search until release; that route goes at cleanup (R.2).
 *
 * Takes the page's own URL parameters (lib/explore/query.ts) and a window, `offset` and
 * `limit` (`exploreListUrl`), and returns the window's rows with the list's total, which the filter menus and
 * the sheet show on their button. Open to everyone, as the search is. Signed in with grades,
 * the rows come with the student's fit, from one narrow read of their subjects and the search
 * records themselves, and "Only ones I qualify for" applies; signed out, nothing is read. It
 * never reads the programs cache (MAINT_tasks.md 5.19).
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { MAX_SHOWN, PAGE_SIZE, readExplore } from '@/lib/explore/query'
import { searchExplore } from '@/lib/explore/search'
import { exploreStudent } from '@/lib/explore/student'
import type { ExploreResponse } from '@/lib/explore/types'
import { logger } from '@/lib/logger'
import { applyRateLimit, getClientIp } from '@/lib/rate-limit'

/** Past the whole catalogue several times over; only a made-up URL asks for more */
const MAX_OFFSET = 10_000

export async function GET(request: NextRequest) {
  try {
    // Signed in, 30 a minute for the account; signed out, 120 a minute for the address (SEC-11). A
    // school's students share one address, so counting a class's searches together refused them
    const session = await auth()
    const limited = session?.user?.id
      ? await applyRateLimit('search', session.user.id)
      : await applyRateLimit('searchIp', getClientIp(request.headers))
    if (limited) return limited

    const params = request.nextUrl.searchParams
    const { query } = readExplore(params)
    const offset = whole(params.get('offset'), 0, 0, MAX_OFFSET)
    // `limit`, not `length`: that is the Length filter's parameter
    const length = whole(params.get('limit'), PAGE_SIZE, 1, MAX_SHOWN)

    // Read fresh each time, so a change to the academic profile shows at once. The switch needs
    // grades; without them the list is the one without it.
    const student = session?.user?.id ? await exploreStudent(session.user.id) : null

    const body: ExploreResponse = await searchExplore(query, { offset, length }, student)
    return NextResponse.json(body)
  } catch (error) {
    logger.error('Explore search failed', { error })
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}

function whole(value: string | null, fallback: number, min: number, max: number): number {
  const number = Number(value)
  if (value === null || !Number.isInteger(number)) return fallback
  return Math.min(max, Math.max(min, number))
}
