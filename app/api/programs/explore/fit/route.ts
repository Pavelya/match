/**
 * GET /api/programs/explore/fit?ids=…: the signed-in student's fit for rows the page already
 * shows (rebranding 2.3, board "D3.3 Result row"). The first rows are in the server HTML for
 * everyone, as today; the fit follows a moment later into its own column. Rows the list adds
 * later come with their fit from /api/programs/explore.
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { MAX_SHOWN, isId } from '@/lib/explore/query'
import { exploreStudent, fitsFor } from '@/lib/explore/student'
import type { FitResponse } from '@/lib/explore/types'
import { logger } from '@/lib/logger'
import { applyRateLimit } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const limited = await applyRateLimit('api', session.user.id)
    if (limited) return limited

    const ids = [
      ...new Set((request.nextUrl.searchParams.get('ids') ?? '').split(',').filter(isId))
    ].slice(0, MAX_SHOWN)
    const student = await exploreStudent(session.user.id)
    const body: FitResponse = {
      fits: student ? await fitsFor(student, ids) : Object.fromEntries(ids.map((id) => [id, null]))
    }
    return NextResponse.json(body)
  } catch (error) {
    logger.error('Explore fit failed', { error })
    return NextResponse.json({ error: 'Failed to work out the fit' }, { status: 500 })
  }
}
