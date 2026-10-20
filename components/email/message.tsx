import type { ReactElement } from 'react'
import type { EmailContent } from './content'
import { EmailLayout } from './EmailLayout'
import { toPlainText } from './plain-text'

/**
 * What a sender hands to Resend: the subject, the HTML as React, and the plain text. Each template
 * in `emails/` builds one, in today's design or the new one (`emailBrand()`, rebranding 4.7), so
 * the subject and the plain text switch on release day with the HTML.
 */
export interface EmailMessage {
  subject: string
  react: ReactElement
  /** Today's design sends none, but for the two sign-in emails */
  text?: string
}

/** A message in the new design: the layout and the plain text from the same words */
export function designedMessage(subject: string, content: EmailContent): EmailMessage {
  return { subject, react: <EmailLayout content={content} />, text: toPlainText(content) }
}
