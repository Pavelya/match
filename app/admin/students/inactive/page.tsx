/**
 * Admin Inactive Accounts Page (MAINT 7.6 Part D)
 *
 * Students not seen signed in for 6 months get one notice, and are deleted 30 days later unless
 * they come back (lib/account/inactivity.ts). Three lists, and the two buttons that act on them.
 * The buttons stay off until the Privacy Policy that sets the rule is published.
 */

import { Moon } from 'lucide-react'
import { PageContainer, PageHeader, StatCard } from '@/components/admin/shared'
import {
  InactiveAccountsActions,
  InactiveAccountsList,
  type InactiveRow
} from '@/components/admin/students/InactiveAccounts'
import {
  DELETIONS_PER_PRESS,
  NOTICES_PER_DAY,
  inactiveAccountsEnabled,
  listInactiveStudents,
  noticesSentToday,
  type InactiveStudent
} from '@/lib/account/inactive-accounts'
import { daysLeft, deletionDate, lastSeen } from '@/lib/account/inactivity'
import { requireAdmin } from '@/lib/auth/guards'

export default async function InactiveAccountsPage() {
  await requireAdmin()
  const now = new Date()
  const [lists, sentToday] = await Promise.all([listInactiveStudents(now), noticesSentToday(now)])
  const enabled = inactiveAccountsEnabled()

  const row = (student: InactiveStudent): InactiveRow => {
    const notice = student.inactivityNoticeSentAt
    return {
      id: student.id,
      email: student.email,
      name: student.name,
      school: student.studentProfile?.school?.name ?? null,
      lastSeen: lastSeen(student).toISOString(),
      noticeSentAt: notice?.toISOString() ?? null,
      deletesOn: notice ? deletionDate(notice).toISOString() : null,
      daysLeft: notice ? daysLeft(notice, now) : null
    }
  }

  return (
    <PageContainer>
      <PageHeader
        title="Inactive accounts"
        icon={Moon}
        backHref="/admin/students"
        backLabel="Back to Students"
        description="A student not seen signed in for 6 months gets one notice. Their account is deleted 30 days later, unless they sign in. Students only; dates in UTC."
      />

      {!enabled && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 mb-6 text-sm text-amber-900">
          Switched off. Nothing can be sent or deleted until the Privacy Policy that sets the rule
          is published and <code>INACTIVE_ACCOUNTS_ENABLED</code> is set to <code>true</code>.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Due a notice"
          value={lists.dueNotice.length}
          icon={Moon}
          iconColor="amber"
        />
        <StatCard title="Notified" value={lists.notified.length} icon={Moon} iconColor="blue" />
        <StatCard
          title="Due for deletion"
          value={lists.dueDeletion.length}
          icon={Moon}
          iconColor="red"
        />
      </div>

      <InactiveAccountsActions
        enabled={enabled}
        toSend={Math.min(lists.dueNotice.length, Math.max(0, NOTICES_PER_DAY - sentToday))}
        toDelete={Math.min(lists.dueDeletion.length, DELETIONS_PER_PRESS)}
        dueNotice={lists.dueNotice.length}
        dueDeletion={lists.dueDeletion.length}
        noticesPerDay={NOTICES_PER_DAY}
        sentToday={sentToday}
        deletionsPerPress={DELETIONS_PER_PRESS}
      />

      <InactiveAccountsList
        list="dueDeletion"
        title="Due for deletion"
        empty="No account is due for deletion."
        rows={lists.dueDeletion.map(row)}
      />
      <InactiveAccountsList
        list="notified"
        title="Notified"
        empty="No notice is waiting out its 30 days."
        rows={lists.notified.map(row)}
      />
      <InactiveAccountsList
        list="dueNotice"
        title="Due a notice"
        empty="No student is silent without a notice."
        rows={lists.dueNotice.map(row)}
      />
    </PageContainer>
  )
}
