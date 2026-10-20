/**
 * Account Email Utilities
 *
 * Functions for sending account-related emails using Resend.
 * Includes account deletion notification.
 */

import { logger } from '@/lib/logger'
import { getResendClient } from '@/lib/email/client'
import { accountDeletedMessage } from '@/emails/account-deleted'

// Email sender configuration
const FROM_EMAIL = process.env.EMAIL_FROM || 'IB Match <support@ibmatch.com>'

/**
 * Send "Account deleted" once a deletion has committed: by an admin, or by the student in
 * Settings (MAINT 5.24). Never throws: a missing key or a failed send is logged, with the address
 * redacted, and the deletion stands.
 *
 * @param params - Account deletion email parameters
 * @returns Promise resolving to success status
 */
export async function sendAccountDeletedEmail(params: {
  to: string
  userName?: string
  deletedBy: 'student' | 'admin'
}): Promise<boolean> {
  const to = params.to.replace(/(.{2}).*(@.*)/, '$1***$2') // Redact email
  try {
    const { data, error } = await getResendClient().emails.send({
      from: FROM_EMAIL,
      to: params.to,
      ...accountDeletedMessage({
        userName: params.userName,
        deletedBy: params.deletedBy
      })
    })

    if (error) {
      logger.error('Failed to send account deleted email', { error: error.message, to })
      return false
    }

    logger.info('Account deleted email sent', { emailId: data?.id, to })
    return true
  } catch (error) {
    logger.error('Exception sending account deleted email', {
      error: error instanceof Error ? error.message : 'Unknown error',
      to
    })
    return false
  }
}
