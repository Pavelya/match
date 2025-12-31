/**
 * Account Update API Route
 *
 * PATCH /api/students/account/update
 *
 * Updates user profile information (name).
 */

import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { applyRateLimit } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Apply rate limiting
    const rateLimitResponse = await applyRateLimit('profile', session.user.id)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Parse request body
    const body = await request.json()
    const { name } = body

    // Validate name if provided
    if (name !== null && name !== undefined) {
      if (typeof name !== 'string') {
        return NextResponse.json({ error: 'Name must be a string' }, { status: 400 })
      }
      if (name.length > 100) {
        return NextResponse.json({ error: 'Name must be 100 characters or less' }, { status: 400 })
      }
    }

    // Update user
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name?.trim() || null
      }
    })

    // Invalidate the settings cache so the user sees updated data immediately
    revalidateTag(`user-settings-${session.user.id}`, { expire: 0 })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Account update error', { error })
    return NextResponse.json({ error: 'Failed to update account' }, { status: 500 })
  }
}
