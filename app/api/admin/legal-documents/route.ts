/**
 * Admin API: Legal Documents List
 *
 * GET - List all legal document types with their current status
 *
 * Security: Requires PLATFORM_ADMIN role
 *
 * Response: Array of document summaries including:
 * - Document type
 * - Published version info
 * - Latest draft info
 * - Total version count
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { getAllDocuments } from '@/lib/legal-documents'

export async function GET() {
  try {
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

    // Get all documents
    const documents = await getAllDocuments()

    return NextResponse.json({ documents })
  } catch (error) {
    logger.error('Failed to fetch legal documents', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'Failed to fetch legal documents' }, { status: 500 })
  }
}
