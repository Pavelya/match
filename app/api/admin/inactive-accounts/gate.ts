import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { inactiveAccountsEnabled } from '@/lib/account/inactive-accounts'
import { prisma } from '@/lib/prisma'
import { applyRateLimit } from '@/lib/rate-limit'

/**
 * The gate both inactive-accounts buttons share (MAINT 7.6 Part D): signed in, under the limit,
 * an admin, and the switch on. Returns the refusal, or null to go ahead. The switch stays off
 * until the Privacy Policy that sets the rule is published, so nothing is sent or deleted before.
 */
export async function inactiveAccountsGate(): Promise<NextResponse | null> {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const rateLimited = await applyRateLimit('api', session.user.id)
  if (rateLimited) return rateLimited

  const adminUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })
  if (adminUser?.role !== 'PLATFORM_ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  if (!inactiveAccountsEnabled()) {
    return NextResponse.json(
      {
        error:
          'Switched off until the Privacy Policy that sets the rule is published (INACTIVE_ACCOUNTS_ENABLED).'
      },
      { status: 409 }
    )
  }
  return null
}
