'use client'

import { lazy } from 'react'
import type { CoordinatorInviteProps } from './CoordinatorInviteCard'
import type { PendingInvitation } from './InvitationsList'
import type { StudentInviteProps } from './StudentInviteCard'

/*
 * The invitation cards that run in the browser, each its own chunk (rebranding 4.3), so today's
 * design downloads only these lines (components/sign-in/islands.tsx says why). Deleted at cleanup
 * (R.2), when the pages import the cards.
 */

const StudentInviteFrame = lazy(() =>
  import('./StudentInviteCard').then((m) => ({ default: m.StudentInviteCard }))
)
const CoordinatorInviteFrame = lazy(() =>
  import('./CoordinatorInviteCard').then((m) => ({ default: m.CoordinatorInviteCard }))
)
const InvitationsListFrame = lazy(() =>
  import('./InvitationsList').then((m) => ({ default: m.InvitationsList }))
)

export function StudentInviteCard(props: StudentInviteProps) {
  return <StudentInviteFrame {...props} />
}

export function CoordinatorInviteCard(props: CoordinatorInviteProps) {
  return <CoordinatorInviteFrame {...props} />
}

export function InvitationsList(props: { invitations: PendingInvitation[] }) {
  return <InvitationsListFrame {...props} />
}
