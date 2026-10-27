import { render } from '@react-email/components'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { inactivityNoticeMessage } from '@/emails/inactivity-notice'

/*
 * The inactivity notice (MAINT 7.6 Part C), as the approved board "D4.18 Emails · inactivity
 * notice" writes it: subject, inbox line, plain text, and the layout's checks every email passes.
 */

const BASE = 'https://www.ibmatch.com'
const SCHOOL = 'Test School | Demo and feedback call with IB coordinator'
const PROPS = {
  lastSeen: new Date('2026-01-30T12:39:42.769Z'),
  deletesOn: new Date('2026-12-17T00:00:00.000Z')
}

beforeAll(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-11-17T10:42:00Z'))
})

afterAll(() => {
  vi.useRealTimers()
  vi.unstubAllEnvs()
})

beforeEach(() => vi.stubEnv('NEXT_PUBLIC_APP_URL', BASE))

describe('the inactivity notice', () => {
  it('names the date in the subject and the inbox line', async () => {
    const message = inactivityNoticeMessage(PROPS)
    const html = await render(message.react)

    expect(message.subject).toBe('Your IB Match account will be deleted on 17 December 2026')
    expect(html.match(/data-skip-in-text="true">([^<]*)</)?.[1]).toBe(
      'You haven’t used IB Match since 30 January 2026. Sign in once before 17 December to keep your account.'
    )
  })

  it('writes the plain text as the board does', () => {
    expect(inactivityNoticeMessage(PROPS).text).toBe(
      [
        'Inactive account\nYour account will be deleted on 17 December 2026',
        'You haven’t used IB Match since 30 January 2026. We delete student accounts that haven’t been used for 6 months, so we’ll delete yours on 17 December 2026.',
        'To keep it, sign in once before then. That’s all it takes: your account stays as it is, and the 6 months start again.',
        `Sign in to keep my account:\n${BASE}/auth/signin`,
        [
          'What will be deleted',
          '- Your account and how you signed in',
          '- Your subjects and grades',
          '- Your interests, countries and shortlist',
          '- Your support tickets',
          '- Any school invitations sent to you',
          'Deleting is final. We keep no backups, so nothing can be restored.'
        ].join('\n'),
        `Before then, you can also download your data, or delete your account yourself, in Settings:\n${BASE}/student/settings.`,
        'This is the only email we’ll send about it. Nothing follows the deletion.',
        `We keep your data only while you use IB Match. The rule is in our Privacy Policy, section 8:\n${BASE}/privacy#8-data-retention.`,
        'Questions? Contact us at support@ibmatch.com.',
        [
          '--',
          'IB Match connects IB students with university programs worldwide.',
          `Terms of Service: ${BASE}/terms`,
          `Privacy Policy: ${BASE}/privacy`
        ].join('\n')
      ].join('\n\n')
    )
  })

  it('names a linked student’s school in the list, whole', async () => {
    const message = inactivityNoticeMessage({ ...PROPS, schoolName: SCHOOL })
    const html = await render(message.react)

    const line = `Your link to ${SCHOOL}: its coordinators will no longer see your profile`
    expect(message.text).toContain(`- ${line}\n- Any school invitations sent to you`)
    expect(html).toContain(line.replace('|', '|'))
    expect(inactivityNoticeMessage(PROPS).text).not.toContain('Your link to')
  })

  it('opens the sign-in page, with no token, and writes the address out', async () => {
    const html = await render(inactivityNoticeMessage(PROPS).react)

    expect(html).toContain(`href="${BASE}/auth/signin"`)
    expect(html).toContain('Button not working? Go to this address and sign in with this email:')
    expect(html).not.toMatch(/token=|callback\/resend/)
  })

  it('is drawn as D4.18 says', async () => {
    const html = await render(inactivityNoticeMessage({ ...PROPS, schoolName: SCHOOL }).react)

    expect(html).toContain('<meta name="color-scheme" content="light dark"/>')
    expect(html).toContain('@media (prefers-color-scheme:dark)')
    expect(html).toMatch(/<html [^>]*lang="en"/)
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1)
    const sizes = [...html.matchAll(/font-size:(\d+)px/g)].map((m) => Number(m[1]))
    expect(Math.min(...sizes)).toBeGreaterThanOrEqual(14)
    expect(Buffer.byteLength(html)).toBeLessThan(30 * 1024)
    expect(html).not.toMatch(/Hello|Hi there|!</)
  })

  it('is the same in both designs, with the new header: it has no version in today’s', async () => {
    vi.stubEnv('NEW_UI_FOR_EVERYONE', undefined)
    const before = await render(inactivityNoticeMessage(PROPS).react)
    vi.stubEnv('NEW_UI_FOR_EVERYONE', 'true')
    expect(await render(inactivityNoticeMessage(PROPS).react)).toBe(before)
    expect(before).toMatch(
      /<img alt="" height="40" src="https:\/\/www\.ibmatch\.com\/brand\/logo-email\.png"/
    )
  })
})
