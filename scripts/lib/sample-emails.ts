/**
 * The eight emails with sample data, as `scripts/send-sample-emails.ts` sends them. Each template's
 * own `PreviewProps` are the sample, so there is no database read and the data matches the boards:
 * the 56-character school name, a long reply from support.
 */
import { render } from '@react-email/components'
import type { EmailMessage } from '@/components/email/message'
import AccountDeletedEmail, { accountDeletedMessage } from '@/emails/account-deleted'
import CoordinatorInviteEmail, { coordinatorInviteMessage } from '@/emails/coordinator-invite'
import CoordinatorMagicLinkEmail, {
  coordinatorSignInMessage
} from '@/emails/coordinator-magic-link'
import InactivityNoticeEmail, { inactivityNoticeMessage } from '@/emails/inactivity-notice'
import MagicLinkEmail, { signInMessage } from '@/emails/magic-link'
import StudentInviteEmail, { studentInviteMessage } from '@/emails/student-invite'
import TicketCreatedEmail, { ticketCreatedMessage } from '@/emails/ticket-created'
import TicketResolvedEmail, { ticketResolvedMessage } from '@/emails/ticket-resolved'

/** Where a mail app fetches the mark: `.env` says localhost, which no inbox can reach */
export const SITE_URL = 'https://www.ibmatch.com'

/** Under Resend's 100 a day, as the inactivity notices' 50, so real sign-in links still go out */
export const MAX_EMAILS_PER_RUN = 50

export interface SampleEmail {
  name: string
  subject: string
  html: string
  text?: string
}

/** The addresses to send to, or why they can't be used */
export function parseInboxes(args: string[], emailsEach: number): string[] {
  const inboxes = [...new Set(args.map((address) => address.trim().toLowerCase()))]
  if (inboxes.length === 0) throw new Error('Give at least one address after --send.')

  const invalid = inboxes.filter((address) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address))
  if (invalid.length > 0) throw new Error(`Not an address: ${invalid.join(', ')}`)

  const total = inboxes.length * emailsEach
  if (total > MAX_EMAILS_PER_RUN) {
    throw new Error(`${total} emails is over the ${MAX_EMAILS_PER_RUN} a run allowed.`)
  }
  return inboxes
}

/** In the new design and with live links whatever `.env` says; the templates read both when called */
export async function renderSampleEmails(): Promise<SampleEmail[]> {
  process.env.NEW_UI_FOR_EVERYONE = 'true'
  process.env.NEXT_PUBLIC_APP_URL = SITE_URL

  const messages: [string, EmailMessage][] = [
    ['Sign-in link', signInMessage(MagicLinkEmail.PreviewProps)],
    ['Coordinator sign-in link', coordinatorSignInMessage(CoordinatorMagicLinkEmail.PreviewProps)],
    ['Student invitation', studentInviteMessage(StudentInviteEmail.PreviewProps)],
    ['Coordinator invitation', coordinatorInviteMessage(CoordinatorInviteEmail.PreviewProps)],
    ['Support ticket received', ticketCreatedMessage(TicketCreatedEmail.PreviewProps)],
    ['Support ticket resolved', ticketResolvedMessage(TicketResolvedEmail.PreviewProps)],
    ['Account deleted', accountDeletedMessage(AccountDeletedEmail.PreviewProps)],
    ['Inactivity notice', inactivityNoticeMessage(InactivityNoticeEmail.PreviewProps)]
  ]

  return Promise.all(
    messages.map(async ([name, { subject, react, text }]) => ({
      name,
      subject,
      html: await render(react),
      text
    }))
  )
}
