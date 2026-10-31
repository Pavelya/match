import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// MAINT 5.21 and 5.22: after the accept route makes the account, the sign-in link goes through
// the "resend" provider to the invited address; a link that can't be sent, and an address that
// already has an account, each get an outcome of their own.

const { signInMock } = vi.hoisted(() => ({ signInMock: vi.fn() }))
vi.mock('next-auth/react', () => ({ signIn: signInMock }))

import { SIGN_IN_TO_ACCEPT_HREF, acceptStudentInvite } from './accept-student-invite'

const fetchMock = vi.fn()

function answer(status: number, body: unknown = {}) {
  fetchMock.mockResolvedValue(new Response(JSON.stringify(body), { status }))
}

describe('acceptStudentInvite', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('fetch', fetchMock)
  })
  afterEach(() => vi.unstubAllGlobals())

  it('sends the link to the invited address through the resend provider', async () => {
    answer(200, { success: true })
    signInMock.mockResolvedValue({ url: 'https://www.ibmatch.com/auth/verify-request' })

    const outcome = await acceptStudentInvite('tok', 'maya@example.com')

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/auth/accept-student-invite',
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ token: 'tok' }) })
    )
    expect(signInMock).toHaveBeenCalledWith('resend', {
      email: 'maya@example.com',
      callbackUrl: '/student/onboarding',
      redirect: false
    })
    expect(outcome).toEqual({ kind: 'sent', url: 'https://www.ibmatch.com/auth/verify-request' })
  })

  it('goes to "Check your email" when Auth.js gives no address', async () => {
    answer(200)
    signInMock.mockResolvedValue({})
    expect(await acceptStudentInvite('tok', 'maya@example.com')).toEqual({
      kind: 'sent',
      url: '/auth/verify-request'
    })
  })

  it('says the account is ready when the link fails, rather than offering Accept again', async () => {
    answer(200)
    signInMock.mockResolvedValue({ error: 'EmailSignin' })
    expect(await acceptStudentInvite('tok', 'maya@example.com')).toEqual({ kind: 'not-sent' })

    signInMock.mockRejectedValue(new Error('network'))
    expect(await acceptStudentInvite('tok', 'maya@example.com')).toEqual({ kind: 'not-sent' })
  })

  it('sends a student who already has an account to sign in, returning to School invitations', async () => {
    answer(409, { error: 'An account with this email already exists. Please sign in instead.' })
    expect(await acceptStudentInvite('tok', 'maya@example.com')).toEqual({ kind: 'exists' })
    expect(signInMock).not.toHaveBeenCalled()
    expect(SIGN_IN_TO_ACCEPT_HREF).toBe('/auth/signin?callbackUrl=%2Fstudent%2Finvitations')
  })

  it("keeps today's words for too many attempts and for no answer", async () => {
    answer(429)
    expect(await acceptStudentInvite('tok', 'maya@example.com')).toEqual({ kind: 'try-later' })
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))
    expect(await acceptStudentInvite('tok', 'maya@example.com')).toEqual({ kind: 'try-later' })
  })

  it("passes on the route's own reason", async () => {
    answer(400, { error: 'This invitation has expired' })
    expect(await acceptStudentInvite('tok', 'maya@example.com')).toEqual({
      kind: 'failed',
      message: 'This invitation has expired'
    })
    answer(500, 'not json')
    expect(await acceptStudentInvite('tok', 'maya@example.com')).toEqual({
      kind: 'failed',
      message: null
    })
  })
})
