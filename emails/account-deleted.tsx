import LegacyAccountDeletedEmail from '@/components/email/legacy/account-deleted'
import { designedMessage, type EmailMessage } from '@/components/email/message'
import { emailBrand } from '@/lib/brand/email'

/*
 * "Account deleted", when an admin deletes a student or the student deletes the account in
 * Settings (rebranding 4.7, board "D4.18 Emails · support and account", sections 12 and 13;
 * MAINT 5.24). It says who did it, and what to do if it wasn't them. Its list is true because
 * the deletion takes the student's invitations too (MAINT 5.25).
 */

interface AccountDeletedProps {
  /** Today's design greets by name; the new one has no greeting */
  userName?: string
  deletedBy: 'student' | 'admin'
}

const SUPPORT = { text: 'support@ibmatch.com', href: 'mailto:support@ibmatch.com' }

export function accountDeletedMessage({ userName, deletedBy }: AccountDeletedProps): EmailMessage {
  if (!emailBrand().newUi) {
    return {
      subject: 'Your IB Match Account Has Been Deleted',
      react: LegacyAccountDeletedEmail({ userName, deletedBy })
    }
  }

  const byStudent = deletedBy === 'student'

  return designedMessage('Your IB Match account has been deleted', {
    preview: 'Your account and everything in it have been removed.',
    heading: 'Your account is deleted',
    blocks: [
      {
        type: 'text',
        content: [
          byStudent
            ? 'This email confirms that you deleted your IB Match account in Settings.'
            : 'An IB Match administrator has deleted your account.'
        ]
      },
      {
        type: 'panel',
        title: 'What was deleted',
        list: [
          'Your account and how you signed in',
          'Your subjects and grades',
          'Your interests, countries and shortlist',
          'Your support tickets',
          'Your link to your school, and any school invitations sent to you'
        ]
      },
      {
        type: 'text',
        content: byStudent
          ? ['If you didn’t do this, contact us straight away at ', SUPPORT, '.']
          : ['If you think this was a mistake, or have a question, contact us at ', SUPPORT, '.']
      },
      { type: 'small', content: ['You can make a new account with the same email any time.'] }
    ]
  })
}

/** For React Email's preview (`npm run email:dev`), in the design `NEW_UI_FOR_EVERYONE` gives */
export default function AccountDeletedEmail(props: AccountDeletedProps) {
  return accountDeletedMessage(props).react
}

AccountDeletedEmail.PreviewProps = { deletedBy: 'student' } satisfies AccountDeletedProps
