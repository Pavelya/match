/**
 * Admin API: Legal Document Detail
 *
 * GET - Get a document with all its versions
 *
 * Security: Requires PLATFORM_ADMIN role
 *
 * URL Parameters:
 * - type: Document type slug (terms, privacy, faqs, cookies)
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { getDocument, SLUG_TO_DOCUMENT_TYPE, DOCUMENT_TYPE_LABELS } from '@/lib/legal-documents'
import { LegalDocumentType } from '@prisma/client'

interface RouteParams {
  params: Promise<{ type: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
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

    // Get document with all versions
    const document = await getDocument(documentType)

    // Return empty structure if document doesn't exist yet
    if (!document) {
      return NextResponse.json({
        document: {
          id: null,
          type: documentType,
          typeLabel: DOCUMENT_TYPE_LABELS[documentType as LegalDocumentType],
          publishedVersionId: null,
          versions: [],
          createdAt: null,
          updatedAt: null
        }
      })
    }

    return NextResponse.json({
      document: {
        ...document,
        typeLabel: DOCUMENT_TYPE_LABELS[documentType as LegalDocumentType]
      }
    })
  } catch (error) {
    logger.error('Failed to fetch legal document', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'Failed to fetch legal document' }, { status: 500 })
  }
}
