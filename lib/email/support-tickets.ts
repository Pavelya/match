/**
 * Support Ticket Email Utilities
 *
 * Functions for sending support ticket-related emails using Resend.
 * Includes ticket creation confirmation and resolution notification emails.
 */

import { Resend } from 'resend'
import { TicketCategory } from '@prisma/client'
import { logger } from '@/lib/logger'
import TicketCreatedEmail from '@/emails/ticket-created'
import TicketResolvedEmail from '@/emails/ticket-resolved'

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

// Email sender configuration
const FROM_EMAIL = process.env.EMAIL_FROM || 'IB Match <support@ibmatch.com>'

/**
 * Send confirmation email when a support ticket is created
 *
 * @param params - Ticket creation email parameters
 * @returns Promise resolving to success status
 */
export async function sendTicketCreatedEmail(params: {
  to: string
  ticketNumber: string
  category: TicketCategory
  subject: string
  userName?: string
}): Promise<boolean> {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: params.to,
      subject: `Support Ticket ${params.ticketNumber} - We've Received Your Request`,
      react: TicketCreatedEmail({
        ticketNumber: params.ticketNumber,
        category: params.category,
        subject: params.subject,
        userName: params.userName
      })
    })

    if (error) {
      logger.error('Failed to send ticket created email', {
        error: error.message,
        ticketNumber: params.ticketNumber,
        to: params.to
      })
      return false
    }

    logger.info('Ticket created email sent', {
      emailId: data?.id,
      ticketNumber: params.ticketNumber,
      to: params.to
    })
    return true
  } catch (error) {
    logger.error('Exception sending ticket created email', {
      error: error instanceof Error ? error.message : 'Unknown error',
      ticketNumber: params.ticketNumber
    })
    return false
  }
}

/**
 * Send notification email when a support ticket is resolved
 *
 * @param params - Ticket resolution email parameters
 * @returns Promise resolving to success status
 */
export async function sendTicketResolvedEmail(params: {
  to: string
  ticketNumber: string
  category: TicketCategory
  subject: string
  adminResponse: string
  userName?: string
}): Promise<boolean> {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: params.to,
      subject: `Support Ticket ${params.ticketNumber} - Your Request Has Been Resolved`,
      react: TicketResolvedEmail({
        ticketNumber: params.ticketNumber,
        category: params.category,
        subject: params.subject,
        adminResponse: params.adminResponse,
        userName: params.userName
      })
    })

    if (error) {
      logger.error('Failed to send ticket resolved email', {
        error: error.message,
        ticketNumber: params.ticketNumber,
        to: params.to
      })
      return false
    }

    logger.info('Ticket resolved email sent', {
      emailId: data?.id,
      ticketNumber: params.ticketNumber,
      to: params.to
    })
    return true
  } catch (error) {
    logger.error('Exception sending ticket resolved email', {
      error: error instanceof Error ? error.message : 'Unknown error',
      ticketNumber: params.ticketNumber
    })
    return false
  }
}

/**
 * Generate a unique, human-readable ticket number
 *
 * Format: TKT-XXXXXX (6 alphanumeric characters)
 * Uses uppercase letters and numbers for readability
 */
export function generateTicketNumber(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Exclude confusing chars (I, O, 0, 1)
  let ticketId = ''
  for (let i = 0; i < 6; i++) {
    ticketId += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `TKT-${ticketId}`
}
