/**
 * Admin API: Revert Legal Document Version
 *
 * POST - Create a new draft from an archived version (revert)
 *
 * Security: Requires PLATFORM_ADMIN role
 *
 * URL Parameters:
 * - type: Document type slug
 * - id: Version ID to revert to
 *
 * This creates a new draft version with the content from the specified version.
 * The new draft must then be published to make it active.
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { createDraftFromVersion, SLUG_TO_DOCUMENT_TYPE } from '@/lib/legal-documents'

interface RouteParams {
  params: Promise<{ type: string; id: string }>
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { type: typeSlug, id } = await params

    // Check authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Validate document type
    if (!SLUG_TO_DOCUMENT_TYPE[typeSlug]) {
      return NextResponse.json({ error: 'Invalid document type' }, { status: 400 })
    }

    const newVersion = await createDraftFromVersion(id, session.user.id)

    logger.info('Created revert draft from version', {
      documentType: typeSlug,
      sourceVersionId: id,
      newVersionId: newVersion.id,
      newVersionNumber: newVersion.versionNumber,
      userId: session.user.id.slice(0, 8)
    })

    return NextResponse.json({ version: newVersion }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    if (message === 'Version not found') {
      return NextResponse.json({ error: message }, { status: 404 })
    }

    logger.error('Failed to create revert draft', { error: message })
    return NextResponse.json({ error: 'Failed to create revert draft' }, { status: 500 })
  }
}
