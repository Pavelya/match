import { beforeEach, describe, expect, it, vi } from 'vitest'

// The support-ticket emails log the recipient as the account emails do (MAINT 5.32)

const send = vi.fn()
vi.mock('@/lib/email/client', () => ({ getResendClient: () => ({ emails: { send } }) }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), error: vi.fn() } }))

const { logger } = await import('@/lib/logger')
const { redactEmailAddress } = await import('./redact')
const { sendTicketCreatedEmail, sendTicketResolvedEmail } = await import('./support-tickets')
const { sendAccountDeletedEmail } = await import('./account-emails')

const ticket = { ticketNumber: 'TKT-ABC234', category: 'OTHER' as const, subject: 'Help' }

beforeEach(() => vi.clearAllMocks())

describe('redactEmailAddress', () => {
  it('keeps two characters and the domain', () => {
    expect(redactEmailAddress('abcdef@example.com')).toBe('ab***@example.com')
    expect(redactEmailAddress('Ana.Lopez@School.org')).toBe('An***@School.org')
  })

  it('never keeps the whole local part', () => {
    expect(redactEmailAddress('ab@example.com')).toBe('a***@example.com')
    expect(redactEmailAddress('a@example.com')).toBe('***@example.com')
  })

  it('logs no part of something that is not an address', () => {
    expect(redactEmailAddress('not-an-address')).toBe('***')
    expect(redactEmailAddress('@example.com')).toBe('***')
  })
})

describe('the senders log the redacted address', () => {
  it.each([
    ['ticket created', () => sendTicketCreatedEmail({ to: 'student@example.com', ...ticket })],
    [
      'ticket resolved',
      () => sendTicketResolvedEmail({ to: 'student@example.com', ...ticket, adminResponse: 'Done' })
    ],
    [
      'account deleted',
      () => sendAccountDeletedEmail({ to: 'student@example.com', deletedBy: 'student' })
    ]
  ])('%s: on success and on failure', async (_, sendIt) => {
    send.mockResolvedValueOnce({ data: { id: 'e1' }, error: null })
    expect(await sendIt()).toBe(true)
    send.mockResolvedValueOnce({ data: null, error: { message: 'rejected' } })
    expect(await sendIt()).toBe(false)

    expect(send).toHaveBeenCalledWith(expect.objectContaining({ to: 'student@example.com' }))
    const logged = JSON.stringify([
      vi.mocked(logger.info).mock.calls,
      vi.mocked(logger.error).mock.calls
    ])
    expect(logged).toContain('st***@example.com')
    expect(logged).not.toContain('student@')
  })
})
