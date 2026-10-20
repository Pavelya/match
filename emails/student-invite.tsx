import LegacyStudentInviteEmail from '@/components/email/legacy/student-invite'
import { designedMessage, type EmailMessage } from '@/components/email/message'
import { emailBaseUrl } from '@/components/email/tokens'
import { emailBrand } from '@/lib/brand/email'

/*
 * A coordinator's invitation to a student (rebranding 4.7, board "D4.18 Emails", sections 6–8),
 * in three versions: an address with no account, which creates one linked to the school; an
 * existing account, whose link goes to School invitations; and the reminder Resend sends, which
 * is either of those with "Reminder" above the heading. The button opens the invitation, since
 * the student consents on the page (D4.16), not in the email.
 */

interface StudentInviteProps {
  inviteUrl: string
  schoolName: string
  coordinatorName?: string
  expiresInDays: number
  /** The address has an account already: the link is School invitations */
  existingAccount?: boolean
  /** Sent again by Resend */
  reminder?: boolean
}

const COORDINATORS_CAN = [
  'View your academic profile (courses, grades, TOK/EE)',
  'View your program matches and saved programs',
  'Help manage your academic data'
]

export function studentInviteMessage({
  inviteUrl,
  schoolName: school,
  coordinatorName,
  expiresInDays: days,
  existingAccount = false,
  reminder = false
}: StudentInviteProps): EmailMessage {
  if (!emailBrand().newUi) {
    return {
      subject: reminder
        ? `Reminder: You're invited to join ${school} on IB Match`
        : existingAccount
          ? `${school} wants to connect with your IB Match account`
          : `You're invited to join ${school} on IB Match`,
      react: LegacyStudentInviteEmail({
        inviteUrl,
        schoolName: school,
        coordinatorName,
        expiresInDays: days
      })
    }
  }

  const subject = existingAccount
    ? `${reminder ? 'Reminder: ' : ''}${school} wants to connect with your IB Match account`
    : reminder
      ? `Reminder: you’re invited to join ${school} on IB Match`
      : `You’re invited to join ${school} on IB Match`
  const from = coordinatorName
    ? `${coordinatorName}, your IB coordinator at ${school},`
    : `Your coordinator at ${school}`
  // An existing account's link is School invitations, which a new token doesn't change
  const newLink =
    reminder && !existingAccount
      ? ' This is a new link: the one in the first email no longer works.'
      : ''
  const expiry = `The invitation expires in ${days} days. If you didn’t expect it, you can ignore this email.`

  return designedMessage(subject, {
    preview: newLink
      ? `A new link: the invitation expires in ${days} days.`
      : existingAccount
        ? `Accept or decline it in IB Match within ${days} days.`
        : `Accept within ${days} days to create your account, linked to your school.`,
    eyebrow: reminder ? 'Reminder · school invitation' : 'School invitation',
    heading: existingAccount ? `Connect with ${school}` : `Join ${school} on IB Match`,
    blocks: [
      {
        type: 'text',
        content: [
          existingAccount
            ? `${from} has invited you to link your IB Match account to their school.${newLink}`
            : `${from} has invited you to create an IB Match account linked to their school.${newLink}`
        ]
      },
      {
        type: 'panel',
        title: 'What coordinators can access',
        intro: `If you accept, coordinators at ${school} can:`,
        list: COORDINATORS_CAN,
        note: 'You can unlink at any time in Settings.'
      },
      { type: 'button', label: 'Open the invitation', href: inviteUrl, writeOut: true },
      ...(existingAccount
        ? [
            {
              type: 'small' as const,
              content: [`You’ll sign in first if you aren’t signed in. ${expiry}`]
            }
          ]
        : [
            {
              type: 'small' as const,
              content: [
                'Don’t want to link your account? ',
                {
                  text: 'Create a regular account instead',
                  href: `${emailBaseUrl()}/auth/signin?declineInvite=true`
                }
              ]
            },
            { type: 'small' as const, content: [expiry] }
          ])
    ]
  })
}

/** For React Email's preview (`npm run email:dev`), in the design `NEW_UI_FOR_EVERYONE` gives */
export default function StudentInviteEmail(props: StudentInviteProps) {
  return studentInviteMessage(props).react
}

StudentInviteEmail.PreviewProps = {
  inviteUrl:
    'https://www.ibmatch.com/auth/accept-student-invite/Hk3VqZ8pR2mXc7LwN5tB0yFgJ4sDa9eU6oTiK1rQvE_bW-hY',
  // The one school in production: 56 characters
  schoolName: 'Test School | Demo and feedback call with IB coordinator',
  expiresInDays: 7,
  existingAccount: false,
  reminder: false
} satisfies StudentInviteProps
