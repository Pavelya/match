import LegacyMagicLinkEmail from '@/components/email/legacy/magic-link'
import { designedMessage, type EmailMessage } from '@/components/email/message'
import { SIGN_IN_LINK_LIFETIME } from '@/lib/auth/sign-in-link'
import { emailBrand } from '@/lib/brand/email'

/*
 * The sign-in link a student asks for (rebranding 4.7, board "D4.18 Emails", section 4). Today's
 * email until release day, the new one after (`emailBrand()`); the time comes from
 * lib/auth/sign-in-link.ts in both.
 */

interface SignInProps {
  url: string
}

const SUBJECT = 'Sign in to IB Match'

export function signInMessage({ url }: SignInProps): EmailMessage {
  if (!emailBrand().newUi) {
    return {
      subject: SUBJECT,
      react: LegacyMagicLinkEmail({ url }),
      text: `Sign in to IB Match\n\nClick the link below to sign in:\n${url}\n\nThis link will expire in ${SIGN_IN_LINK_LIFETIME}.\n\nIf you didn't request this, you can safely ignore this email.`
    }
  }

  return designedMessage(SUBJECT, {
    preview: `Your sign-in link works for ${SIGN_IN_LINK_LIFETIME}, and only once.`,
    heading: 'Sign in to IB Match',
    blocks: [
      {
        type: 'text',
        content: [
          `Use this link to sign in. It works for ${SIGN_IN_LINK_LIFETIME}, and only once. If it’s your first time, we’ll create your account.`
        ]
      },
      { type: 'button', label: 'Sign in to IB Match', href: url, writeOut: true, plain: 'url' },
      {
        type: 'small',
        content: [
          'If you didn’t ask for this link, you can ignore this email. Nobody can sign in without it.'
        ]
      }
    ]
  })
}

/** For React Email's preview (`npm run email:dev`), in the design `NEW_UI_FOR_EVERYONE` gives */
export default function MagicLinkEmail(props: SignInProps) {
  return signInMessage(props).react
}

MagicLinkEmail.PreviewProps = {
  url: 'https://www.ibmatch.com/api/auth/callback/resend?callbackUrl=https%3A%2F%2Fwww.ibmatch.com%2Fstudent&token=9f2c4e81a07d5b36c1e8f42a9d0b7c65e3f18a2d4b6c90e7f1a3d5b8c2e4f607&email=maya%40example.com'
} satisfies SignInProps
