import LegacyCoordinatorMagicLinkEmail from '@/components/email/legacy/coordinator-magic-link'
import { designedMessage, type EmailMessage } from '@/components/email/message'
import { SIGN_IN_LINK_LIFETIME } from '@/lib/auth/sign-in-link'
import { emailBrand } from '@/lib/brand/email'

/*
 * The sign-in link for coordinators and admins (rebranding 4.7, board "D4.18 Emails", section 5):
 * "IB coordinator portal" above the heading, as on the coordinator's sign-in card (D4.2).
 */

interface CoordinatorSignInProps {
  url: string
}

const SUBJECT = 'Sign in to IB Match'

export function coordinatorSignInMessage({ url }: CoordinatorSignInProps): EmailMessage {
  if (!emailBrand().newUi) {
    return {
      subject: SUBJECT,
      react: LegacyCoordinatorMagicLinkEmail({ url }),
      text: `Sign in to IB Match Coordinator Dashboard\n\nClick the link below to sign in:\n${url}\n\nThis link will expire in ${SIGN_IN_LINK_LIFETIME}.\n\nIf you didn't request this, you can safely ignore this email.`
    }
  }

  return designedMessage(SUBJECT, {
    preview: `Your link to the coordinator portal works for ${SIGN_IN_LINK_LIFETIME}, and only once.`,
    eyebrow: 'IB coordinator portal',
    heading: 'Sign in to IB Match',
    blocks: [
      {
        type: 'text',
        content: [
          `Use this link to sign in to the coordinator portal. It works for ${SIGN_IN_LINK_LIFETIME}, and only once.`
        ]
      },
      {
        type: 'button',
        label: 'Sign in to the coordinator portal',
        href: url,
        writeOut: true,
        plain: 'url'
      },
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
export default function CoordinatorMagicLinkEmail(props: CoordinatorSignInProps) {
  return coordinatorSignInMessage(props).react
}

CoordinatorMagicLinkEmail.PreviewProps = {
  url: 'https://www.ibmatch.com/api/auth/callback/resend?callbackUrl=https%3A%2F%2Fwww.ibmatch.com%2Fcoordinator&token=9f2c4e81a07d5b36c1e8f42a9d0b7c65e3f18a2d4b6c90e7f1a3d5b8c2e4f607&email=coordinator%40school.example'
} satisfies CoordinatorSignInProps
