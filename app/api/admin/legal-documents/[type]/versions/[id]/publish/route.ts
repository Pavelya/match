/**
 * Admin API: Publish Legal Document Version
 *
 * POST - Publish a version (makes it the active version)
 *
 * Security: Requires PLATFORM_ADMIN role
 *
 * URL Parameters:
 * - type: Document type slug
 * - id: Version ID
 *
 * Request Body:
 * - effectiveDate?: string (ISO date) - When the version takes effect
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { publishVersion, SLUG_TO_DOCUMENT_TYPE } from '@/lib/legal-documents'

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

    // Parse optional effectiveDate from body
    let effectiveDate: Date | undefined
    try {
      const body = await request.json()
      if (body.effectiveDate) {
        effectiveDate = new Date(body.effectiveDate)
        if (isNaN(effectiveDate.getTime())) {
          return NextResponse.json({ error: 'Invalid effectiveDate format' }, { status: 400 })
        }
      }
    } catch {
      // Empty body is OK, effectiveDate will be now
    }

    const version = await publishVersion(id, session.user.id, effectiveDate)

    logger.info('Published legal document version', {
      documentType: typeSlug,
      versionId: id,
      versionNumber: version.versionNumber,
      effectiveDate: version.effectiveDate,
      userId: session.user.id.slice(0, 8)
    })

    return NextResponse.json({ version })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    if (message === 'Version not found') {
      return NextResponse.json({ error: message }, { status: 404 })
    }
    if (message === 'Version is already published') {
      return NextResponse.json({ error: message }, { status: 400 })
    }

    logger.error('Failed to publish version', { error: message })
    return NextResponse.json({ error: 'Failed to publish version' }, { status: 500 })
  }
}
