import LegacyCoordinatorInviteEmail from '@/components/email/legacy/coordinator-invite'
import { designedMessage, type EmailMessage } from '@/components/email/message'
import { emailBrand } from '@/lib/brand/email'

/*
 * An invitation to join a school as a coordinator, from another coordinator or an admin
 * (rebranding 4.7, board "D4.18 Emails", section 9), and its reminder. The link opens D4.16's
 * coordinator card.
 */

interface CoordinatorInviteProps {
  inviteUrl: string
  /** Missing only if an admin resends an invitation whose school has gone */
  schoolName: string | null | undefined
  inviterName?: string
  expiresInDays: number
  /** Sent again by an admin's Resend */
  reminder?: boolean
}

export function coordinatorInviteMessage({
  inviteUrl,
  schoolName,
  inviterName,
  expiresInDays: days,
  reminder = false
}: CoordinatorInviteProps): EmailMessage {
  if (!emailBrand().newUi) {
    return {
      subject: `${reminder ? 'Reminder: ' : ''}You're invited to join ${schoolName || 'a school'} on IB Match`,
      react: LegacyCoordinatorInviteEmail({
        inviteUrl,
        schoolName: schoolName || 'the school',
        inviterName,
        expiresInDays: days
      })
    }
  }

  const school = schoolName || 'the school'
  const invited = inviterName
    ? `${inviterName} has invited you to join ${school} as an IB coordinator on IB Match.`
    : `You’ve been invited to join ${school} as an IB coordinator on IB Match.`
  const newLink = reminder ? ' This is a new link: the one in the first email no longer works.' : ''

  return designedMessage(
    reminder
      ? `Reminder: you’re invited to join ${school} on IB Match`
      : `You’re invited to join ${school} on IB Match`,
    {
      preview: reminder
        ? `A new link: the invitation expires in ${days} days.`
        : `Accept within ${days} days to join your school’s coordinator portal.`,
      eyebrow: reminder ? 'Reminder · IB coordinator portal' : 'IB coordinator portal',
      heading: `Join ${school} on IB Match`,
      blocks: [
        { type: 'text', content: [`${invited}${newLink}`] },
        {
          type: 'text',
          content: [
            'As a coordinator, you’ll be able to manage students, view analytics and help your students find university programs that fit their IB profiles.'
          ]
        },
        { type: 'button', label: 'Open the invitation', href: inviteUrl, writeOut: true },
        {
          type: 'small',
          content: [
            `The invitation expires in ${days} days. If you didn’t expect it, you can ignore this email.`
          ]
        }
      ]
    }
  )
}

/** For React Email's preview (`npm run email:dev`), in the design `NEW_UI_FOR_EVERYONE` gives */
export default function CoordinatorInviteEmail(props: CoordinatorInviteProps) {
  return coordinatorInviteMessage(props).react
}

CoordinatorInviteEmail.PreviewProps = {
  inviteUrl:
    'https://www.ibmatch.com/auth/accept-invite/0f1e2d3c4b5a69788796a5b4c3d2e1f00f1e2d3c4b5a69788796a5b4c3d2e1f0',
  // The one school in production: 56 characters
  schoolName: 'Test School | Demo and feedback call with IB coordinator',
  expiresInDays: 7,
  reminder: false
} satisfies CoordinatorInviteProps
