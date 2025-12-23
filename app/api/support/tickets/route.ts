/**
 * Support Ticket Submission API
 *
 * POST /api/support/tickets - Create a new support ticket
 * GET /api/support/tickets - List user's own tickets (for future use)
 *
 * Features:
 * - Rate limited: 5 tickets per hour per user
 * - Validates input with Zod
 * - Sends confirmation email asynchronously
 * - Captures user role and school context for coordinators
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { applyRateLimit } from '@/lib/rate-limit'
import { TicketCategory, UserRole } from '@prisma/client'
import { sendTicketCreatedEmail, generateTicketNumber } from '@/lib/email/support-tickets'

// Validation schema for ticket creation
const createTicketSchema = z.object({
  category: z.nativeEnum(TicketCategory),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject cannot exceed 200 characters'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(5000, 'Message cannot exceed 5000 characters')
})

/**
 * POST /api/support/tickets
 *
 * Create a new support ticket.
 * Available to authenticated STUDENT and COORDINATOR users.
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user exists and has correct role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        coordinatorProfile: {
          select: {
            schoolId: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Only allow students and coordinators to submit tickets
    if (user.role !== UserRole.STUDENT && user.role !== UserRole.COORDINATOR) {
      return NextResponse.json(
        { error: 'Only students and coordinators can submit support tickets' },
        { status: 403 }
      )
    }

    // Apply rate limiting (5 tickets per hour per user)
    const rateLimitResponse = await applyRateLimit('support', user.id)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = createTicketSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message
      }))
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 })
    }

    const { category, subject, message } = validationResult.data

    // Generate unique ticket number with retry logic
    let ticketNumber: string
    let attempts = 0
    const maxAttempts = 5

    do {
      ticketNumber = generateTicketNumber()
      const existing = await prisma.supportTicket.findUnique({
        where: { ticketNumber },
        select: { id: true }
      })
      if (!existing) break
      attempts++
    } while (attempts < maxAttempts)

    if (attempts >= maxAttempts) {
      logger.error('Failed to generate unique ticket number after max attempts')
      return NextResponse.json(
        { error: 'Failed to create ticket. Please try again.' },
        { status: 500 }
      )
    }

    // Create the support ticket
    const ticket = await prisma.supportTicket.create({
      data: {
        ticketNumber,
        userId: user.id,
        userRole: user.role,
        schoolId: user.coordinatorProfile?.schoolId || null,
        category,
        subject,
        message,
        status: 'OPEN',
        priority: 'NORMAL'
      }
    })

    logger.info('Support ticket created', {
      ticketId: ticket.id,
      ticketNumber,
      userId: user.id,
      userRole: user.role,
      category
    })

    // Send confirmation email asynchronously (don't block response)
    sendTicketCreatedEmail({
      to: user.email,
      ticketNumber,
      category,
      subject,
      userName: user.name || undefined
    }).catch((err) => {
      logger.error('Failed to send ticket confirmation email', {
        error: err.message,
        ticketNumber
      })
    })

    return NextResponse.json({
      success: true,
      ticketNumber,
      message:
        'Your support ticket has been submitted successfully. You will receive a confirmation email shortly.'
    })
  } catch (error) {
    logger.error('Failed to create support ticket', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Failed to create support ticket. Please try again.' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/support/tickets
 *
 * List the authenticated user's own support tickets.
 * Returns tickets sorted by creation date (newest first).
 */
export async function GET() {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch user's tickets
    const tickets = await prisma.supportTicket.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        ticketNumber: true,
        category: true,
        subject: true,
        status: true,
        priority: true,
        createdAt: true,
        resolvedAt: true
      }
    })

    return NextResponse.json({ tickets })
  } catch (error) {
    logger.error('Failed to fetch support tickets', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 })
  }
}
