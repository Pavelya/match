import { CircleCheck, Clock, Link2Off, type LucideIcon } from 'lucide-react'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { IconTile } from '@/components/ds/IconTile'
import { AuthCard, CardHeading } from '@/components/sign-in/AuthPage'

/*
 * Where an invitation link can end before the card (rebranding 4.3, board "D4.16 School
 * invitation"): today's outcomes, in today's words in sentence case, in D4.2's card. A cancelled
 * invitation is the 404 (D4.15), as today. Server components.
 */

export type InvitationOutcome = 'invalid' | 'expired' | 'accepted' | 'not-for-students'

const OUTCOMES: Record<
  InvitationOutcome,
  { icon: LucideIcon; title: string; text: string; action: string; primary?: boolean }
> = {
  invalid: {
    icon: Link2Off,
    title: 'Invalid invitation',
    text: 'This invitation link is invalid or has already been used.',
    action: 'Go to sign in'
  },
  expired: {
    icon: Clock,
    title: 'Invitation expired',
    text: 'This invitation has expired. Please contact your coordinator for a new invitation.',
    action: 'Go to sign in'
  },
  accepted: {
    icon: CircleCheck,
    title: 'Already accepted',
    text: 'This invitation has already been accepted. You can sign in to your account.',
    action: 'Sign in',
    primary: true
  },
  'not-for-students': {
    icon: Link2Off,
    title: 'Invalid invitation type',
    text: 'This is not a student invitation. Please use the correct invitation link.',
    action: 'Go to sign in'
  }
}

export function OutcomeCard({
  outcome,
  signInHref = '/auth/signin',
  expiredText
}: {
  outcome: InvitationOutcome
  /** A coordinator's invitation signs in at /auth/coordinator */
  signInHref?: string
  /** A coordinator's expired invitation names the administrator, as today */
  expiredText?: string
}) {
  const { icon, title, text, action, primary } = OUTCOMES[outcome]
  return (
    <AuthCard labelledBy="invitation-outcome">
      <IconTile icon={icon} />
      <CardHeading id="invitation-outcome" title={title}>
        {outcome === 'expired' && expiredText ? expiredText : text}
      </CardHeading>
      <ButtonLink href={signInHref} variant={primary ? 'primary' : 'secondary'} className="w-full">
        {action}
      </ButtonLink>
    </AuthCard>
  )
}
