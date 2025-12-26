/**
 * Public API: Legal Document Content
 *
 * GET - Get the currently published version of a legal document
 *
 * Public endpoint - no authentication required
 *
 * URL Parameters:
 * - type: Document type slug (terms, privacy, faqs, cookies)
 *
 * Response:
 * - id: version id
 * - title: document title
 * - content: markdown content
 * - versionLabel: version identifier
 * - effectiveDate: when this version became active
 * - publishedAt: when it was published
 *
 * Caching: 5 minute cache for performance
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { SLUG_TO_DOCUMENT_TYPE, DOCUMENT_TYPE_LABELS } from '@/lib/legal-documents'

interface RouteParams {
  params: Promise<{ type: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { type: typeSlug } = await params

    // Validate document type
    const documentType = SLUG_TO_DOCUMENT_TYPE[typeSlug]
    if (!documentType) {
      return NextResponse.json(
        { error: `Invalid document type: ${typeSlug}. Valid types: terms, privacy, faqs, cookies` },
        { status: 400 }
      )
    }

    // Get the document with its published version
    const document = await prisma.legalDocument.findUnique({
      where: { type: documentType },
      include: {
        publishedVersion: {
          select: {
            id: true,
            title: true,
            content: true,
            versionNumber: true,
            versionLabel: true,
            effectiveDate: true,
            publishedAt: true
          }
        }
      }
    })

    // Check if document exists and has a published version
    if (!document || !document.publishedVersion) {
      return NextResponse.json(
        { error: 'Document not found or not published yet' },
        { status: 404 }
      )
    }

    const response = NextResponse.json({
      document: {
        type: documentType,
        typeLabel: DOCUMENT_TYPE_LABELS[documentType],
        ...document.publishedVersion
      }
    })

    // Set cache headers - 5 minute cache with stale-while-revalidate
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')

    return response
  } catch (error) {
    logger.error('Failed to fetch legal document', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 })
  }
}
