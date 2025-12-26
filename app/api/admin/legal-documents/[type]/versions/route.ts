/**
 * Admin API: Legal Document Versions
 *
 * POST - Create a new version of a document
 * GET - List all versions of a document (handled by parent route)
 *
 * Security: Requires PLATFORM_ADMIN role
 *
 * URL Parameters:
 * - type: Document type slug (terms, privacy, faqs, cookies)
 *
 * Request Body (POST):
 * - title: string (required)
 * - content: string (required) - Markdown content
 * - versionLabel?: string - Human-readable version label
 * - changeNotes?: string - Summary of changes
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { createVersion, SLUG_TO_DOCUMENT_TYPE, CreateVersionInput } from '@/lib/legal-documents'

interface RouteParams {
  params: Promise<{ type: string }>
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { type: typeSlug } = await params

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
    const documentType = SLUG_TO_DOCUMENT_TYPE[typeSlug]
    if (!documentType) {
      return NextResponse.json(
        { error: `Invalid document type: ${typeSlug}. Valid types: terms, privacy, faqs, cookies` },
        { status: 400 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const { title, content, versionLabel, changeNotes } = body

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    const input: CreateVersionInput = {
      title: title.trim(),
      content: content.trim(),
      versionLabel: versionLabel?.trim(),
      changeNotes: changeNotes?.trim()
    }

    // Create new version
    const version = await createVersion(documentType, input, session.user.id)

    logger.info('Created legal document version', {
      documentType,
      versionId: version.id,
      versionNumber: version.versionNumber,
      userId: session.user.id.slice(0, 8)
    })

    return NextResponse.json({ version }, { status: 201 })
  } catch (error) {
    logger.error('Failed to create legal document version', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'Failed to create version' }, { status: 500 })
  }
}
