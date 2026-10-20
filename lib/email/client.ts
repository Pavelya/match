import { Resend } from 'resend'
import { env } from '@/lib/env'

// Singleton Resend client, built on the first send: building it when this file loads would
// throw on import wherever RESEND_API_KEY is unset (MAINT 5.24)
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
