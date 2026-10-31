import { designedMessage, type EmailMessage } from '@/components/email/message'
import { emailBaseUrl } from '@/components/email/tokens'

/*
 * The inactivity notice (MAINT 7.6 Part C, board "D4.18 Emails · inactivity notice", approved
 * 27 October 2026 with every recommendation): the one email a student gets after 6 months without
 * using IB Match, 30 days before the account is deleted. Nothing follows it, so it says everything
 * on its own. The button opens the sign-in page, never a sign-in link, so the email carries no
 * token and works all month. In the new design only: nothing is sent before release day.
 */

interface InactivityNoticeProps {
  /** The day the student was last seen (`lastSeen`, lib/account/inactivity.ts) */
  lastSeen: Date
  /** The day the account is deleted (`deletionDate`) */
  deletesOn: Date
  /** The school a linked student's coordinators see them through, named in the list */
  schoolName?: string | null
}

const SUPPORT = { text: 'support@ibmatch.com', href: 'mailto:support@ibmatch.com' }

/** "17 December 2026", the day in UTC */
function day(date: Date, year = true): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    ...(year && { year: 'numeric' }),
    timeZone: 'UTC'
  })
}

export function inactivityNoticeMessage({
  lastSeen,
  deletesOn,
  schoolName
}: InactivityNoticeProps): EmailMessage {
  const baseUrl = emailBaseUrl()
  const deletes = day(deletesOn)

  return designedMessage(
    `Your IB Match account will be deleted on ${deletes}`,
    {
      preview: `You haven’t used IB Match since ${day(lastSeen)}. Sign in once before ${day(deletesOn, false)} to keep your account.`,
      eyebrow: 'Inactive account',
      heading: `Your account will be deleted on ${deletes}`,
      blocks: [
        {
          type: 'text',
          content: [
            `You haven’t used IB Match since ${day(lastSeen)}. We delete student accounts that haven’t been used for 6 months, so we’ll delete yours on ${deletes}.`
          ]
        },
        {
          type: 'text',
          content: [
            'To keep it, sign in once before then. That’s all it takes: your account stays as it is, and the 6 months start again.'
          ]
        },
        {
          type: 'button',
          label: 'Sign in to keep my account',
          href: `${baseUrl}/auth/signin`,
          writeOut: true,
          writeOutLabel: 'Button not working? Go to this address and sign in with this email:'
        },
        {
          type: 'panel',
          title: 'What will be deleted',
          list: [
            'Your account and how you signed in',
            'Your subjects and grades',
            'Your interests, countries and shortlist',
            'Your support tickets',
            ...(schoolName
              ? [`Your link to ${schoolName}: its coordinators will no longer see your profile`]
              : []),
            'Any school invitations sent to you'
          ],
          note: 'Deleting is final. We keep no backups, so nothing can be restored.'
        },
        {
          type: 'text',
          content: [
            'Before then, you can also download your data, or delete your account yourself, in ',
            { text: 'Settings', href: `${baseUrl}/student/settings` },
            '.'
          ]
        },
        {
          type: 'small',
          content: ['This is the only email we’ll send about it. Nothing follows the deletion.']
        },
        {
          type: 'small',
          content: [
            'We keep your data only while you use IB Match. The rule is in our ',
            { text: 'Privacy Policy, section 8', href: `${baseUrl}/privacy#8-data-retention` },
            '.'
          ]
        },
        { type: 'small', content: ['Questions? Contact us at ', SUPPORT, '.'] }
      ]
    },
    { newUi: true }
  )
}

/** For React Email's preview (`npm run email:dev`) */
export default function InactivityNoticeEmail(props: InactivityNoticeProps) {
  return inactivityNoticeMessage(props).react
}

InactivityNoticeEmail.PreviewProps = {
  lastSeen: new Date('2026-01-30T12:39:42Z'),
  deletesOn: new Date('2026-12-17T00:00:00Z'),
  schoolName: 'Test School | Demo and feedback call with IB coordinator'
} satisfies InactivityNoticeProps
