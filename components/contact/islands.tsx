'use client'

import { lazy } from 'react'

/*
 * Contact's form as its own chunk (rebranding 4.3), so today's design downloads only these lines
 * (components/sign-in/islands.tsx says why). Deleted at cleanup (R.2).
 */
const ContactFormFrame = lazy(() =>
  import('./ContactForm').then((m) => ({ default: m.ContactForm }))
)

export function ContactForm(props: { userName: string | null }) {
  return <ContactFormFrame {...props} />
}
