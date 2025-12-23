/**
 * Admin API: Support Tickets List
 *
 * GET - List all support tickets with filters and pagination
 *
 * Security: Requires PLATFORM_ADMIN role
 *
 * Query Parameters:
 * - status: Filter by ticket status (OPEN, IN_PROGRESS, RESOLVED, CLOSED)
 * - category: Filter by ticket category
 * - userRole: Filter by user role (STUDENT, COORDINATOR)
 * - search: Search in subject, message, ticket number, user email
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 20, max: 100)
 * - sortBy: Sort field (createdAt, priority, status) - default: createdAt
 * - sortOrder: Sort order (asc, desc) - default: desc
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { TicketCategory, TicketStatus, UserRole, Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
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

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') as TicketStatus | null
    const category = searchParams.get('category') as TicketCategory | null
    const userRole = searchParams.get('userRole') as UserRole | null
    const search = searchParams.get('search')
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc'

    // Build where clause
    const where: Prisma.SupportTicketWhereInput = {}

    if (status && Object.values(TicketStatus).includes(status)) {
      where.status = status
    }

    if (category && Object.values(TicketCategory).includes(category)) {
      where.category = category
    }

    if (userRole && (userRole === 'STUDENT' || userRole === 'COORDINATOR')) {
      where.userRole = userRole
    }

    if (search) {
      where.OR = [
        { ticketNumber: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { user: { name: { contains: search, mode: 'insensitive' } } }
      ]
    }

    // Build orderBy clause
    const validSortFields = ['createdAt', 'priority', 'status', 'updatedAt']
    const orderByField = validSortFields.includes(sortBy) ? sortBy : 'createdAt'
    const orderBy: Prisma.SupportTicketOrderByWithRelationInput = {
      [orderByField]: sortOrder
    }

    // Get total count for pagination
    const total = await prisma.supportTicket.count({ where })

    // Fetch tickets with pagination
    const tickets = await prisma.supportTicket.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        ticketNumber: true,
        category: true,
        subject: true,
        status: true,
        priority: true,
        userRole: true,
        createdAt: true,
        updatedAt: true,
        resolvedAt: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        },
        school: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      tickets,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    logger.error('Failed to fetch support tickets', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 })
  }
}
