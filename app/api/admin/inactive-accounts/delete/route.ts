/**
 * POST /api/admin/inactive-accounts/delete - Delete the accounts due (MAINT 7.6 Part D)
 *
 * Up to the per-press limit, each in its own transaction; a failure stops at that account. The
 * database keeps no backups, so a deletion is final. Admin only, and only with
 * INACTIVE_ACCOUNTS_ENABLED on.
 */

import { NextResponse } from 'next/server'
import { deleteDueAccounts } from '@/lib/account/inactive-accounts'
import { logger } from '@/lib/logger'
import { inactiveAccountsGate } from '../gate'

export async function POST() {
  try {
    const refused = await inactiveAccountsGate()
    if (refused) return refused

    const result = await deleteDueAccounts(new Date())
    return NextResponse.json(result, { status: result.error ? 500 : 200 })
  } catch (error) {
    logger.error('Delete inactive accounts error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'The accounts could not be deleted.' }, { status: 500 })
  }
}
