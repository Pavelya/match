import type { TicketCategory } from '@prisma/client'
import LegacyTicketCreatedEmail from '@/components/email/legacy/ticket-created'
import { designedMessage, type EmailMessage } from '@/components/email/message'
import { emailBrand } from '@/lib/brand/email'

/*
 * Sent when someone sends Contact or the coordinator support form (rebranding 4.7, board "D4.18
 * Emails · support and account", section 10). The number is in the subject and the panel.
 */

/** Contact's own labels (D4.14), in sentence case */
export const TICKET_CATEGORY_LABELS: Record<TicketCategory, string> = {
  ACCOUNT_ISSUE: 'Account issue',
  TECHNICAL_PROBLEM: 'Technical problem',
  MATCHING_QUESTION: 'Matching question',
  SUBSCRIPTION_BILLING: 'Subscription & billing',
  DATA_PRIVACY: 'Data & privacy',
  FEATURE_REQUEST: 'Feature request',
  OTHER: 'General inquiry'
}

interface TicketCreatedProps {
  ticketNumber: string
  category: TicketCategory
  subject: string
  /** Today's design greets by name; the new one has no greeting */
  userName?: string
}

export function ticketCreatedMessage(props: TicketCreatedProps): EmailMessage {
  const { ticketNumber, category, subject } = props
  if (!emailBrand().newUi) {
    return {
      subject: `Support Ticket ${ticketNumber} - We've Received Your Request`,
      react: LegacyTicketCreatedEmail(props)
    }
  }

  return designedMessage(`Support ticket ${ticketNumber}: we’ve received your request`, {
    preview: 'We typically respond within 24–48 hours during business days.',
    heading: 'We’ve received your request',
    blocks: [
      {
        type: 'text',
        content: [
          'Thanks for contacting IB Match support. We’ll reply to this address. We typically respond within 24–48 hours during business days.'
        ]
      },
      {
        type: 'panel',
        title: `Ticket ${ticketNumber}`,
        rows: [
          ['Category', TICKET_CATEGORY_LABELS[category]],
          ['Subject', subject]
        ]
      },
      {
        type: 'small',
        content: [
          'Keep the ticket number if you write to us about this request. You don’t need to reply to this email.'
        ]
      }
    ]
  })
}

/** For React Email's preview (`npm run email:dev`), in the design `NEW_UI_FOR_EVERYONE` gives */
export default function TicketCreatedEmail(props: TicketCreatedProps) {
  return ticketCreatedMessage(props).react
}

TicketCreatedEmail.PreviewProps = {
  ticketNumber: 'TKT-7KQ4ZP',
  category: 'MATCHING_QUESTION',
  subject: 'Why is Imperial “within reach”?'
} satisfies TicketCreatedProps
