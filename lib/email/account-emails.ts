/**
 * Account Email Utilities
 *
 * Functions for sending account-related emails using Resend.
 * Includes account deletion notification.
 */

import { Resend } from 'resend'
import { logger } from '@/lib/logger'
import AccountDeletedEmail from '@/emails/account-deleted'

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

// Email sender configuration
const FROM_EMAIL = process.env.EMAIL_FROM || 'IB Match <support@ibmatch.com>'

/**
 * Send notification email when an admin deletes a student account
 *
 * @param params - Account deletion email parameters
 * @returns Promise resolving to success status
 */
export async function sendAccountDeletedEmail(params: {
  to: string
  userName?: string
}): Promise<boolean> {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: params.to,
      subject: 'Your IB Match Account Has Been Deleted',
      react: AccountDeletedEmail({
        userName: params.userName
      })
    })

    if (error) {
      logger.error('Failed to send account deleted email', {
        error: error.message,
        to: params.to.replace(/(.{2}).*(@.*)/, '$1***$2') // Redact email
      })
      return false
    }

    logger.info('Account deleted email sent', {
      emailId: data?.id,
      to: params.to.replace(/(.{2}).*(@.*)/, '$1***$2') // Redact email
    })
    return true
  } catch (error) {
    logger.error('Exception sending account deleted email', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return false
  }
}
