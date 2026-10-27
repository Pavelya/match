/*
 * An email's words, once (rebranding 4.7): `EmailLayout` draws them as HTML and `toPlainText`
 * writes the plain-text body from the same object, so the two can't drift apart. Each template in
 * `emails/` builds one of these and nothing else.
 */

/** A run of text, or a link inside it */
export type Inline = string | { text: string; href: string }

export type EmailBlock =
  /** Body text, 16px */
  | { type: 'text'; content: Inline[]; plain?: string }
  /** Small print, 14px */
  | { type: 'small'; content: Inline[]; plain?: string }
  /**
   * The one button, with its link written out under it where `writeOut` says so (the sign-in and
   * invitation emails). Plain text gives "Label:" and the link, or the link alone (`plain: 'url'`)
   */
  | {
      type: 'button'
      label: string
      href: string
      writeOut?: boolean
      /** The line above the written-out link, when it isn't "Button not working? Paste this…" */
      writeOutLabel?: string
      plain?: 'url'
    }
  /** The details panel: what coordinators can access, a ticket, the reply, what was deleted */
  | {
      type: 'panel'
      title: string
      intro?: string
      list?: string[]
      rows?: [label: string, value: string][]
      /** Kept as written, line breaks and all: the admin's reply */
      body?: string
      note?: string
    }

export interface EmailContent {
  /** The inbox line under the subject */
  preview: string
  /** The line above the heading ("School invitation") */
  eyebrow?: string
  /** The one h1 */
  heading: string
  blocks: EmailBlock[]
}

/** A mailto link reads as its address; any other link as its words, then where it goes */
export function inlinePlain(content: Inline[]): string {
  return content
    .map((part) =>
      typeof part === 'string'
        ? part
        : part.href.startsWith('mailto:')
          ? part.text
          : `${part.text}:\n${part.href}`
    )
    .join('')
}
