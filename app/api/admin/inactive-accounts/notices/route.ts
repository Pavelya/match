/**
 * POST /api/admin/inactive-accounts/notices - Send the inactivity notices due (MAINT 7.6 Part D)
 *
 * Up to what is left of today's cap, in one Resend batch; a notice is recorded only once Resend
 * accepts it. Admin only, and only with INACTIVE_ACCOUNTS_ENABLED on.
 */

import { NextResponse } from 'next/server'
import { sendDueNotices } from '@/lib/account/inactive-accounts'
import { logger } from '@/lib/logger'
import { inactiveAccountsGate } from '../gate'

export async function POST() {
  try {
    const refused = await inactiveAccountsGate()
    if (refused) return refused

    const result = await sendDueNotices(new Date())
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 502 })
    return NextResponse.json({ sent: result.sent, stillDue: result.stillDue })
  } catch (error) {
    logger.error('Send inactivity notices error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'The notices could not be sent.' }, { status: 500 })
  }
}
