/**
 * Check Role API Route
 *
 * POST /api/auth/check-role
 *
 * Tells the coordinator sign-in page whether an address belongs to a student,
 * so it can point them at the student sign-in instead.
 *
 * Deliberately does NOT disclose whether an account exists, or which role it
 * has beyond "student or not". It previously answered 404 for unknown
 * addresses and 200 with the exact role otherwise, which - unauthenticated and
 * unthrottled - let anyone confirm an address had an account and whether it was
 * a PLATFORM_ADMIN. Unknown addresses and coordinators now return the same
 * response.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { applyRateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const rateLimited = await applyRateLimit('auth', getClientIp(request.headers))
    if (rateLimited) return rateLimited

    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { role: true }
    })

    // Unknown address, coordinator, admin and agent all answer identically.
    return NextResponse.json({ isStudent: user?.role === 'STUDENT' })
  } catch {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
