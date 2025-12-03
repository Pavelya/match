import { Resend } from 'resend'
import { env } from '@/lib/env'

// Singleton Resend client
let resendInstance: Resend | null = null

export function getResendClient(): Resend {
  if (!resendInstance) {
    if (!env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is required but not set in environment variables')
    }

    resendInstance = new Resend(env.RESEND_API_KEY)
  }

  return resendInstance
}

// Export singleton instance
export const resend = getResendClient()
