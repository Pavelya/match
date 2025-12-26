/**
 * Admin API: Legal Document Version Detail
 *
 * GET - Get a specific version
 * PATCH - Update a draft version
 * DELETE - Delete a draft version
 *
 * Security: Requires PLATFORM_ADMIN role
 *
 * URL Parameters:
 * - type: Document type slug
 * - id: Version ID
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import {
  getVersion,
  updateVersion,
  deleteVersion,
  SLUG_TO_DOCUMENT_TYPE,
  UpdateVersionInput
} from '@/lib/legal-documents'

interface RouteParams {
  params: Promise<{ type: string; id: string }>
}

async function verifyAdminAccess() {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: 'Unauthorized', status: 401, userId: null }
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })

  if (user?.role !== 'PLATFORM_ADMIN') {
    return { error: 'Forbidden', status: 403, userId: null }
  }

  return { error: null, status: 200, userId: session.user.id }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { type: typeSlug, id } = await params

    const { error, status } = await verifyAdminAccess()
    if (error) {
      return NextResponse.json({ error }, { status })
    }

    // Validate document type
    if (!SLUG_TO_DOCUMENT_TYPE[typeSlug]) {
      return NextResponse.json({ error: 'Invalid document type' }, { status: 400 })
    }

    const version = await getVersion(id)
    if (!version) {
      return NextResponse.json({ error: 'Version not found' }, { status: 404 })
    }

    return NextResponse.json({ version })
  } catch (error) {
    logger.error('Failed to fetch version', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'Failed to fetch version' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { type: typeSlug, id } = await params

    const { error, status, userId } = await verifyAdminAccess()
    if (error || !userId) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status })
    }

    // Validate document type
    if (!SLUG_TO_DOCUMENT_TYPE[typeSlug]) {
      return NextResponse.json({ error: 'Invalid document type' }, { status: 400 })
    }

    const body = await request.json()
    const { title, content, versionLabel, changeNotes } = body

    const input: UpdateVersionInput = {}
    if (title !== undefined) input.title = title.trim()
    if (content !== undefined) input.content = content.trim()
    if (versionLabel !== undefined) input.versionLabel = versionLabel.trim()
    if (changeNotes !== undefined) input.changeNotes = changeNotes.trim()

    const version = await updateVersion(id, input)

    logger.info('Updated legal document version', {
      versionId: id,
      userId: userId.slice(0, 8)
    })

    return NextResponse.json({ version })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    if (message === 'Version not found') {
      return NextResponse.json({ error: message }, { status: 404 })
    }
    if (message === 'Only draft versions can be edited') {
      return NextResponse.json({ error: message }, { status: 400 })
    }

    logger.error('Failed to update version', { error: message })
    return NextResponse.json({ error: 'Failed to update version' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { type: typeSlug, id } = await params

    const { error, status, userId } = await verifyAdminAccess()
    if (error || !userId) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status })
    }

    // Validate document type
    if (!SLUG_TO_DOCUMENT_TYPE[typeSlug]) {
      return NextResponse.json({ error: 'Invalid document type' }, { status: 400 })
    }

    await deleteVersion(id)

    logger.info('Deleted legal document version', {
      versionId: id,
      userId: userId.slice(0, 8)
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    if (message === 'Version not found') {
      return NextResponse.json({ error: message }, { status: 404 })
    }
    if (message === 'Only draft versions can be deleted') {
      return NextResponse.json({ error: message }, { status: 400 })
    }

    logger.error('Failed to delete version', { error: message })
    return NextResponse.json({ error: 'Failed to delete version' }, { status: 500 })
  }
}
