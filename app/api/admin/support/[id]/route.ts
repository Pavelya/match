/**
 * Admin API: Support Ticket Detail
 *
 * GET - Get detailed ticket information
 * PATCH - Update ticket status, priority, or respond/resolve
 *
 * Security: Requires PLATFORM_ADMIN role
 *
 * PATCH Body:
 * - status?: TicketStatus
 * - priority?: TicketPriority
 * - adminResponse?: string (required when status = RESOLVED)
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { TicketStatus, TicketPriority } from '@prisma/client'
import { sendTicketResolvedEmail } from '@/lib/email/support-tickets'

// Validation schema for ticket update
const updateTicketSchema = z
  .object({
    status: z.nativeEnum(TicketStatus).optional(),
    priority: z.nativeEnum(TicketPriority).optional(),
    adminResponse: z.string().max(10000, 'Response cannot exceed 10000 characters').optional()
  })
  .refine(
    (data) => {
      // If status is RESOLVED, adminResponse is required
      if (data.status === 'RESOLVED' && !data.adminResponse?.trim()) {
        return false
      }
      return true
    },
    { message: 'Admin response is required when resolving a ticket', path: ['adminResponse'] }
  )

interface RouteParams {
  params: Promise<{ id: string }>
}

/**
 * GET /api/admin/support/[id]
 *
 * Get detailed information about a specific support ticket.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

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

    // Fetch ticket with full details
    const ticket = await prisma.supportTicket.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true
          }
        },
        school: {
          select: {
            id: true,
            name: true,
            subscriptionTier: true
          }
        },
        resolvedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    return NextResponse.json(ticket)
  } catch (error) {
    logger.error('Failed to fetch support ticket', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'Failed to fetch ticket' }, { status: 500 })
  }
}

/**
 * PATCH /api/admin/support/[id]
 *
 * Update a support ticket (status, priority, or respond/resolve).
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    // Check authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, role: true, name: true }
    })

    if (admin?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Verify ticket exists and get current state
    const existingTicket = await prisma.supportTicket.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    })

    if (!existingTicket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = updateTicketSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message
      }))
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 })
    }

    const { status, priority, adminResponse } = validationResult.data

    // Build update data
    const updateData: {
      status?: TicketStatus
      priority?: TicketPriority
      adminResponse?: string
      resolvedById?: string
      resolvedAt?: Date
    } = {}

    if (status) {
      updateData.status = status

      // If resolving, set resolution metadata
      if (status === 'RESOLVED') {
        updateData.adminResponse = adminResponse?.trim()
        updateData.resolvedById = admin.id
        updateData.resolvedAt = new Date()
      }
    }

    if (priority) {
      updateData.priority = priority
    }

    // Only update adminResponse if explicitly provided (even without status change)
    if (adminResponse !== undefined && !updateData.adminResponse) {
      updateData.adminResponse = adminResponse.trim()
    }

    // Update the ticket
    const updatedTicket = await prisma.supportTicket.update({
      where: { id },
      data: updateData,
      include: {
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
        },
        resolvedBy: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    logger.info('Support ticket updated', {
      ticketId: id,
      ticketNumber: updatedTicket.ticketNumber,
      adminId: admin.id,
      updatedFields: Object.keys(updateData)
    })

    // If resolved, send notification email asynchronously
    if (status === 'RESOLVED' && adminResponse) {
      sendTicketResolvedEmail({
        to: existingTicket.user.email,
        ticketNumber: existingTicket.ticketNumber,
        category: existingTicket.category,
        subject: existingTicket.subject,
        adminResponse: adminResponse.trim(),
        userName: existingTicket.user.name || undefined
      }).catch((err) => {
        logger.error('Failed to send ticket resolved email', {
          error: err.message,
          ticketNumber: existingTicket.ticketNumber
        })
      })
    }

    return NextResponse.json(updatedTicket)
  } catch (error) {
    logger.error('Failed to update support ticket', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 })
  }
}
