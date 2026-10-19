import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// One number for how long an emailed sign-in link works (rebranding 4.3, D4.2): the provider's
// maxAge, both emails and both plain-text bodies all come from lib/auth/sign-in-link.ts, so a
// change there reaches every one of them, and a change anywhere else fails here.

const { config, prismaMock } = vi.hoisted(() => ({
  config: { current: null as null | { providers: Record<string, unknown>[] } },
  prismaMock: {
    user: { findUnique: vi.fn() },
    invitation: { findFirst: vi.fn() }
  }
}))

vi.mock('next-auth', () => ({
  default: (options: { providers: Record<string, unknown>[] }) => {
    config.current = options
    return { handlers: {}, signIn: vi.fn(), signOut: vi.fn(), auth: vi.fn() }
  }
}))
vi.mock('next-auth/providers/resend', () => ({
  default: (options: Record<string, unknown>) => ({ id: 'resend', ...options })
}))
vi.mock('next-auth/providers/google', () => ({
  default: (options: Record<string, unknown>) => ({ id: 'google', ...options })
}))
vi.mock('@auth/prisma-adapter', () => ({ PrismaAdapter: () => ({}) }))
vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/env', () => ({
  env: { RESEND_API_KEY: 're_test', EMAIL_FROM: 'IB Match <hello@example.com>' }
}))

import { render } from '@react-email/components'
import CoordinatorMagicLinkEmail from '@/emails/coordinator-magic-link'
import MagicLinkEmail from '@/emails/magic-link'
import './config'
import { SIGN_IN_LINK_LIFETIME, SIGN_IN_LINK_MAX_AGE, SIGN_IN_LINK_MINUTES } from './sign-in-link'

type Send = (params: {
  identifier: string
  url: string
  provider: { apiKey: string; from: string }
}) => Promise<void>

function resendProvider() {
  const provider = config.current?.providers.find((p) => p.id === 'resend')
  if (!provider) throw new Error('No Resend provider')
  return provider as { maxAge?: number; sendVerificationRequest: Send }
}

/** The plain-text body the provider sends, for a student or a coordinator */
async function sentText(role: 'STUDENT' | 'COORDINATOR'): Promise<string> {
  prismaMock.user.findUnique.mockResolvedValue({ role })
  prismaMock.invitation.findFirst.mockResolvedValue(null)
  const fetchMock = vi.fn(async () => new Response('{}', { status: 200 }))
  vi.stubGlobal('fetch', fetchMock)
  await resendProvider().sendVerificationRequest({
    identifier: 'maya@example.com',
    url: 'https://www.ibmatch.com/api/auth/callback/resend?token=t',
    provider: { apiKey: 're_test', from: 'IB Match <hello@example.com>' }
  })
  const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
  return JSON.parse(String(init.body)).text
}

describe('the sign-in link', () => {
  beforeEach(() => vi.clearAllMocks())
  afterEach(() => vi.unstubAllGlobals())

  it('works for 10 minutes', () => {
    expect(SIGN_IN_LINK_MINUTES).toBe(10)
    expect(SIGN_IN_LINK_LIFETIME).toBe('10 minutes')
  })

  it('is set on the provider, so Auth.js no longer applies its 24 hours', () => {
    expect(resendProvider().maxAge).toBe(SIGN_IN_LINK_MAX_AGE)
    expect(SIGN_IN_LINK_MAX_AGE).toBe(600)
  })

  it('is the time both emails give', async () => {
    const student = await render(MagicLinkEmail({ url: 'https://www.ibmatch.com/x' }))
    const coordinator = await render(
      CoordinatorMagicLinkEmail({ url: 'https://www.ibmatch.com/x' })
    )
    expect(student).toContain(`This link expires in ${SIGN_IN_LINK_LIFETIME}.`)
    expect(coordinator).toContain(`This link will expire in ${SIGN_IN_LINK_LIFETIME}.`)
    for (const html of [student, coordinator]) {
      expect(html.match(/\d+ (minutes|hours)/g)).toEqual([SIGN_IN_LINK_LIFETIME])
    }
  })

  it('is the time both plain-text bodies give', async () => {
    for (const role of ['STUDENT', 'COORDINATOR'] as const) {
      const text = await sentText(role)
      expect(text).toContain(`This link will expire in ${SIGN_IN_LINK_LIFETIME}.`)
      expect(text.match(/\d+ (minutes|hours)/g)).toEqual([SIGN_IN_LINK_LIFETIME])
    }
  })
})
