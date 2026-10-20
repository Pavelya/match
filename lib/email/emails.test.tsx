import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { render } from '@react-email/components'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import type { EmailMessage } from '@/components/email/message'
import { accountDeletedMessage } from '@/emails/account-deleted'
import { coordinatorInviteMessage } from '@/emails/coordinator-invite'
import { coordinatorSignInMessage } from '@/emails/coordinator-magic-link'
import { signInMessage } from '@/emails/magic-link'
import { studentInviteMessage } from '@/emails/student-invite'
import { ticketCreatedMessage } from '@/emails/ticket-created'
import { ticketResolvedMessage } from '@/emails/ticket-resolved'

/*
 * The seven emails (rebranding 4.7). Until release day they render byte for byte as on `main`,
 * subject and plain text included: `__fixtures__/legacy` was rendered from main's templates on
 * 20 October 2026, before they moved. From release day, the words are the D4.18 boards'.
 */

const BASE = 'https://www.ibmatch.com'
// The one school in production: 56 characters
const SCHOOL = 'Test School | Demo and feedback call with IB coordinator'
const SIGN_IN_URL = `${BASE}/api/auth/callback/resend?callbackUrl=${encodeURIComponent(`${BASE}/student`)}&token=abc123&email=maya%40example.com`
const STUDENT_INVITE_URL = `${BASE}/auth/accept-student-invite/Hk3VqZ8pR2mXc7LwN5tB0yFgJ4sDa9eU6oTiK1rQvE_bW-hY`
const EXISTING_URL = `${BASE}/student/invitations`
const COORD_INVITE_URL = `${BASE}/auth/accept-invite/0f1e2d3c4b5a69788796a5b4c3d2e1f00f1e2d3c4b5a69788796a5b4c3d2e1f0`
const REPLY =
  'Hi,\n\nThanks for asking. <b>Within reach</b> means you’re close.\n\nIB Match support'
const TICKET = { ticketNumber: 'TKT-7KQ4ZP', subject: 'Why is Imperial “within reach”?' }

/** Every email and version, by its fixture's name */
const EMAILS: Record<string, () => EmailMessage> = {
  'sign-in': () => signInMessage({ url: SIGN_IN_URL }),
  'coordinator-sign-in': () => coordinatorSignInMessage({ url: SIGN_IN_URL }),
  'student-invite': () =>
    studentInviteMessage({ inviteUrl: STUDENT_INVITE_URL, schoolName: SCHOOL, expiresInDays: 7 }),
  'student-invite-named': () =>
    studentInviteMessage({
      inviteUrl: STUDENT_INVITE_URL,
      schoolName: SCHOOL,
      coordinatorName: 'Jordan Lee',
      expiresInDays: 7
    }),
  'student-invite-existing': () =>
    studentInviteMessage({
      inviteUrl: EXISTING_URL,
      schoolName: SCHOOL,
      expiresInDays: 7,
      existingAccount: true
    }),
  'student-invite-reminder': () =>
    studentInviteMessage({
      inviteUrl: STUDENT_INVITE_URL,
      schoolName: SCHOOL,
      expiresInDays: 7,
      reminder: true
    }),
  'coordinator-invite': () =>
    coordinatorInviteMessage({ inviteUrl: COORD_INVITE_URL, schoolName: SCHOOL, expiresInDays: 7 }),
  'coordinator-invite-named': () =>
    coordinatorInviteMessage({
      inviteUrl: COORD_INVITE_URL,
      schoolName: SCHOOL,
      inviterName: 'Jordan Lee',
      expiresInDays: 7
    }),
  'coordinator-invite-reminder': () =>
    coordinatorInviteMessage({
      inviteUrl: COORD_INVITE_URL,
      schoolName: SCHOOL,
      expiresInDays: 7,
      reminder: true
    }),
  'ticket-created': () =>
    ticketCreatedMessage({ ...TICKET, category: 'MATCHING_QUESTION', userName: 'Maya Okafor' }),
  'ticket-resolved': () =>
    ticketResolvedMessage({ ...TICKET, category: 'SUBSCRIPTION_BILLING', adminResponse: REPLY }),
  'account-deleted': () => accountDeletedMessage({ userName: 'Maya Okafor', deletedBy: 'admin' })
}

const FIXTURES = join(__dirname, '__fixtures__', 'legacy')
const fixture = (name: string) => ({
  html: readFileSync(join(FIXTURES, `${name}.html`), 'utf8'),
  ...(JSON.parse(readFileSync(join(FIXTURES, `${name}.json`), 'utf8')) as {
    subject: string
    text: string | null
  })
})

beforeAll(() => {
  // The footer's year
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-10-20T10:42:00Z'))
})

afterAll(() => {
  vi.useRealTimers()
  vi.unstubAllEnvs()
})

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_APP_URL', BASE)
})

describe('until release day', () => {
  beforeEach(() => vi.stubEnv('NEW_UI_FOR_EVERYONE', undefined))

  it.each(Object.keys(EMAILS))('%s is as on main', async (name) => {
    const message = EMAILS[name]()
    const expected = fixture(name)
    let html = expected.html
    if (name === 'account-deleted') {
      // The one change, approved with MAINT 5.25: the list names what 5.25 now deletes
      html = html.replace(
        /(<li[^>]*>)Any support tickets you submitted<\/li>/,
        '$&$1Your link to your school, and any school invitations sent to you</li>'
      )
      expect(html).not.toBe(expected.html)
    }

    expect(await render(message.react)).toBe(html)
    expect(message.subject).toBe(expected.subject)
    expect(message.text ?? null).toBe(expected.text)
  })

  it('tells a student who deleted their own account that they did (MAINT 5.24)', async () => {
    const admin = await render(
      accountDeletedMessage({ userName: 'Maya Okafor', deletedBy: 'admin' }).react
    )
    const student = accountDeletedMessage({ userName: 'Maya Okafor', deletedBy: 'student' })
    const html = await render(student.react)

    expect(student.subject).toBe('Your IB Match Account Has Been Deleted')
    expect(html).toContain(
      'This email confirms that you deleted your IB Match account in Settings.'
    )
    expect(html).toContain('If you didn&#x27;t do this, contact us straight away at')
    expect(html).not.toContain('platform')
    expect(html).not.toContain('If you believe this was done in error')
    // Everything else is the admin's version
    expect(html).toContain('Any support tickets you submitted')
    expect(html.length).toBeGreaterThan(admin.length - 200)
  })
})

describe('from release day', () => {
  beforeEach(() => vi.stubEnv('NEW_UI_FOR_EVERYONE', 'true'))

  const FOOTER = [
    '--',
    'IB Match connects IB students with university programs worldwide.',
    `Terms of Service: ${BASE}/terms`,
    `Privacy Policy: ${BASE}/privacy`
  ].join('\n')

  it.each(Object.keys(EMAILS))('%s is drawn as D4.18 says', async (name) => {
    const message = EMAILS[name]()
    const html = await render(message.react)

    // Readable in dark mail apps, with colours of its own
    expect(html).toContain('<meta name="color-scheme" content="light dark"/>')
    expect(html).toContain('<meta name="supported-color-schemes" content="light dark"/>')
    expect(html).toContain('@media (prefers-color-scheme:dark)')
    // Accessible: the language, one heading, the mark beside its name
    expect(html).toMatch(/<html [^>]*lang="en"/)
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1)
    expect(html).toMatch(
      /<img alt="" [^>]*src="https:\/\/www\.ibmatch\.com\/brand\/logo-email\.png"/
    )
    // Nothing under 14px
    const sizes = [...html.matchAll(/font-size:(\d+)px/g)].map((m) => Number(m[1]))
    expect(Math.min(...sizes)).toBeGreaterThanOrEqual(14)
    // Well under Gmail's 102 KB
    expect(Buffer.byteLength(html)).toBeLessThan(30 * 1024)
    // No greeting, no shouting, the footer's links named after the pages
    expect(html).not.toMatch(/Hello|Hi there|!</)
    expect(html).toContain('Terms of Service')
    // A plain-text body for every email, ending with the footer
    expect(message.text?.endsWith(FOOTER)).toBe(true)
    expect(message.text).not.toMatch(/Hello/)
  })

  it('writes the subject and the inbox line for each, in sentence case', async () => {
    const lines = await Promise.all(
      Object.entries(EMAILS).map(async ([name, build]) => {
        const message = build()
        const html = await render(message.react)
        const preview = html.match(/data-skip-in-text="true">([^<]*)</)?.[1]
        return [name, message.subject, preview]
      })
    )
    expect(lines).toEqual([
      ['sign-in', 'Sign in to IB Match', 'Your sign-in link works for 10 minutes, and only once.'],
      [
        'coordinator-sign-in',
        'Sign in to IB Match',
        'Your link to the coordinator portal works for 10 minutes, and only once.'
      ],
      [
        'student-invite',
        `You’re invited to join ${SCHOOL} on IB Match`,
        'Accept within 7 days to create your account, linked to your school.'
      ],
      [
        'student-invite-named',
        `You’re invited to join ${SCHOOL} on IB Match`,
        'Accept within 7 days to create your account, linked to your school.'
      ],
      [
        'student-invite-existing',
        `${SCHOOL} wants to connect with your IB Match account`,
        'Accept or decline it in IB Match within 7 days.'
      ],
      [
        'student-invite-reminder',
        `Reminder: you’re invited to join ${SCHOOL} on IB Match`,
        'A new link: the invitation expires in 7 days.'
      ],
      [
        'coordinator-invite',
        `You’re invited to join ${SCHOOL} on IB Match`,
        'Accept within 7 days to join your school’s coordinator portal.'
      ],
      [
        'coordinator-invite-named',
        `You’re invited to join ${SCHOOL} on IB Match`,
        'Accept within 7 days to join your school’s coordinator portal.'
      ],
      [
        'coordinator-invite-reminder',
        `Reminder: you’re invited to join ${SCHOOL} on IB Match`,
        'A new link: the invitation expires in 7 days.'
      ],
      [
        'ticket-created',
        'Support ticket TKT-7KQ4ZP: we’ve received your request',
        'We typically respond within 24–48 hours during business days.'
      ],
      [
        'ticket-resolved',
        'Support ticket TKT-7KQ4ZP: your request is resolved',
        'Our reply to your request is inside.'
      ],
      [
        'account-deleted',
        'Your IB Match account has been deleted',
        'Your account and everything in it have been removed.'
      ]
    ])
  })

  it('writes the sign-in email’s plain text as the board does', () => {
    expect(signInMessage({ url: SIGN_IN_URL }).text).toBe(
      [
        'Sign in to IB Match',
        'Use this link to sign in. It works for 10 minutes, and only once. If it’s your first time, we’ll create your account.',
        SIGN_IN_URL,
        'If you didn’t ask for this link, you can ignore this email. Nobody can sign in without it.',
        FOOTER
      ].join('\n\n')
    )
    expect(coordinatorSignInMessage({ url: SIGN_IN_URL }).text).toBe(
      [
        'IB coordinator portal\nSign in to IB Match',
        'Use this link to sign in to the coordinator portal. It works for 10 minutes, and only once.',
        SIGN_IN_URL,
        'If you didn’t ask for this link, you can ignore this email. Nobody can sign in without it.',
        FOOTER
      ].join('\n\n')
    )
  })

  it('writes the invitation’s plain text as the board does, the reminder’s too', () => {
    const panel = [
      'What coordinators can access',
      `If you accept, coordinators at ${SCHOOL} can:`,
      '- View your academic profile (courses, grades, TOK/EE)',
      '- View your program matches and saved programs',
      '- Help manage your academic data',
      'You can unlink at any time in Settings.'
    ].join('\n')
    const rest = [
      panel,
      `Open the invitation:\n${STUDENT_INVITE_URL}`,
      `Don’t want to link your account? Create a regular account instead:\n${BASE}/auth/signin?declineInvite=true`,
      'The invitation expires in 7 days. If you didn’t expect it, you can ignore this email.',
      FOOTER
    ]
    const sentence = `Your coordinator at ${SCHOOL} has invited you to create an IB Match account linked to their school.`

    expect(EMAILS['student-invite']().text).toBe(
      [`School invitation\nJoin ${SCHOOL} on IB Match`, sentence, ...rest].join('\n\n')
    )
    expect(EMAILS['student-invite-reminder']().text).toBe(
      [
        `Reminder · school invitation\nJoin ${SCHOOL} on IB Match`,
        `${sentence} This is a new link: the one in the first email no longer works.`,
        ...rest
      ].join('\n\n')
    )
  })

  it('gives an existing account its own invitation, without the new-account parts', () => {
    const text = EMAILS['student-invite-existing']().text
    expect(text).toContain(`Connect with ${SCHOOL}`)
    expect(text).toContain(
      `Your coordinator at ${SCHOOL} has invited you to link your IB Match account to their school.`
    )
    expect(text).toContain(`Open the invitation:\n${EXISTING_URL}`)
    expect(text).toContain(
      'You’ll sign in first if you aren’t signed in. The invitation expires in 7 days.'
    )
    expect(text).not.toContain('Create a regular account')

    // Its reminder: the link to School invitations still works, so no "new link"
    const reminder = studentInviteMessage({
      inviteUrl: EXISTING_URL,
      schoolName: SCHOOL,
      expiresInDays: 7,
      existingAccount: true,
      reminder: true
    })
    expect(reminder.subject).toBe(`Reminder: ${SCHOOL} wants to connect with your IB Match account`)
    expect(reminder.text).toContain(`Reminder · school invitation\nConnect with ${SCHOOL}`)
    expect(reminder.text).not.toContain('new link')
  })

  it('names the coordinator or inviter when there is one', () => {
    expect(EMAILS['student-invite-named']().text).toContain(
      `Jordan Lee, your IB coordinator at ${SCHOOL}, has invited you to create an IB Match account`
    )
    expect(EMAILS['coordinator-invite']().text).toContain(
      `You’ve been invited to join ${SCHOOL} as an IB coordinator on IB Match.`
    )
    expect(EMAILS['coordinator-invite-named']().text).toContain(
      `Jordan Lee has invited you to join ${SCHOOL} as an IB coordinator on IB Match.`
    )
    expect(EMAILS['coordinator-invite-reminder']().text).toContain(
      'Reminder · IB coordinator portal'
    )
  })

  it('keeps the reply whole, its line breaks and all', async () => {
    const message = EMAILS['ticket-resolved']()
    const html = await render(message.react)
    expect(html).toContain('white-space:pre-wrap')
    expect(html).toContain(
      'Hi,\n\nThanks for asking. &lt;b&gt;Within reach&lt;/b&gt; means you’re close.\n\nIB Match support'
    )
    expect(message.text).toContain(
      [
        'Ticket TKT-7KQ4ZP',
        'Category: Subscription & billing',
        'Subject: Why is Imperial “within reach”?'
      ].join('\n')
    )
    expect(message.text).toContain(`Our reply\n${REPLY}`)
    expect(message.text).toContain(
      `If this doesn’t fully answer your question, send us a new request from Contact: ${BASE}/contact`
    )
  })

  it('says who deleted the account, and lists what went', () => {
    const admin = accountDeletedMessage({ deletedBy: 'admin' }).text
    const student = accountDeletedMessage({ deletedBy: 'student' }).text
    expect(admin).toContain('An IB Match administrator has deleted your account.')
    expect(admin).toContain(
      'If you think this was a mistake, or have a question, contact us at support@ibmatch.com.'
    )
    expect(student).toContain(
      'This email confirms that you deleted your IB Match account in Settings.'
    )
    expect(student).toContain(
      'If you didn’t do this, contact us straight away at support@ibmatch.com.'
    )
    for (const text of [admin, student]) {
      expect(text).toContain('- Your link to your school, and any school invitations sent to you')
    }
  })
})
