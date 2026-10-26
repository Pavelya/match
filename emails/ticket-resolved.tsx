import type { TicketCategory } from '@/app/generated/prisma/enums'
import LegacyTicketResolvedEmail from '@/components/email/legacy/ticket-resolved'
import { designedMessage, type EmailMessage } from '@/components/email/message'
import { emailBaseUrl } from '@/components/email/tokens'
import { emailBrand } from '@/lib/brand/email'
import { TICKET_CATEGORY_LABELS } from './ticket-created'

/*
 * Sent when an admin resolves a support ticket (rebranding 4.7, board "D4.18 Emails · support and
 * account", section 11): the ticket, then the reply in a panel of its own, its line breaks kept
 * and never cut.
 */

interface TicketResolvedProps {
  ticketNumber: string
  category: TicketCategory
  subject: string
  adminResponse: string
  /** Today's design greets by name; the new one has no greeting */
  userName?: string
}

export function ticketResolvedMessage(props: TicketResolvedProps): EmailMessage {
  const { ticketNumber, category, subject, adminResponse } = props
  if (!emailBrand().newUi) {
    return {
      subject: `Support Ticket ${ticketNumber} - Your Request Has Been Resolved`,
      react: LegacyTicketResolvedEmail(props)
    }
  }

  const contact = `${emailBaseUrl()}/contact`

  return designedMessage(`Support ticket ${ticketNumber}: your request is resolved`, {
    preview: 'Our reply to your request is inside.',
    heading: 'Your request is resolved',
    blocks: [
      { type: 'text', content: ['We’ve answered your support request. Our reply is below.'] },
      {
        type: 'panel',
        title: `Ticket ${ticketNumber}`,
        rows: [
          ['Category', TICKET_CATEGORY_LABELS[category]],
          ['Subject', subject]
        ]
      },
      { type: 'panel', title: 'Our reply', body: adminResponse },
      {
        type: 'text',
        content: [
          'If this doesn’t fully answer your question, send us a new request from ',
          { text: 'Contact', href: contact },
          '.'
        ],
        plain: `If this doesn’t fully answer your question, send us a new request from Contact: ${contact}`
      },
      { type: 'small', content: ['Thank you for using IB Match.'] }
    ]
  })
}

/** For React Email's preview (`npm run email:dev`), in the design `NEW_UI_FOR_EVERYONE` gives */
export default function TicketResolvedEmail(props: TicketResolvedProps) {
  return ticketResolvedMessage(props).react
}

TicketResolvedEmail.PreviewProps = {
  ticketNumber: 'TKT-7KQ4ZP',
  category: 'MATCHING_QUESTION',
  subject: 'Why is Imperial “within reach”?',
  // A long reply, as on the board: production's one resolved ticket has 3 characters
  adminResponse:
    'Hi,\n\nThanks for asking. Within reach means you’re close on everything you don’t yet meet: up to 3 points short overall, and at most one subject one grade short. You’re 1 point short of Imperial’s 39, and one grade short of the 7 in Mathematics: Analysis and Approaches HL, so Economics, Finance and Data Science is within reach. A bigger gap, or a second subject short, would show as missing a requirement.\n\nWe checked Imperial’s page for 2027 entry this week, and both figures are unchanged. If your predicted grades go up, update them in Academic and your matches change straight away.\n\nImperial also reads your personal statement and your reference, which IB Match doesn’t score, so read their own page before you decide. The program page links to it.\n\nIB Match support'
} satisfies TicketResolvedProps
