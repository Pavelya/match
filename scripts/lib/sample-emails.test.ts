import { afterEach, describe, expect, it, vi } from 'vitest'
import { MAX_EMAILS_PER_RUN, parseInboxes, renderSampleEmails, SITE_URL } from './sample-emails'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('renderSampleEmails', () => {
  it('gives all eight in the new design, whatever .env says', async () => {
    vi.stubEnv('NEW_UI_FOR_EVERYONE', 'false')
    vi.stubEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000')

    const emails = await renderSampleEmails()

    expect(emails).toHaveLength(8)
    for (const { name, html, text } of emails) {
      expect(html, name).toContain(`src="${SITE_URL}/brand/logo-email.png"`)
      expect(html, name).toContain('prefers-color-scheme')
      expect(html, name).not.toContain('localhost')
      expect(text, name).toBeTruthy()
    }
  })
})

describe('parseInboxes', () => {
  it('trims, lowercases and drops repeats', () => {
    expect(parseInboxes([' Me@Example.com', 'me@example.com', 'you@example.org'], 8)).toEqual([
      'me@example.com',
      'you@example.org'
    ])
  })

  it('refuses no address and anything that is not one', () => {
    expect(() => parseInboxes([], 8)).toThrow('at least one')
    expect(() => parseInboxes(['--send'], 8)).toThrow('Not an address: --send')
  })

  it('refuses a run over the limit', () => {
    const inboxes = Array.from({ length: 7 }, (_, i) => `me+${i}@example.com`)
    expect(parseInboxes(inboxes.slice(0, 6), 8)).toHaveLength(6)
    expect(() => parseInboxes(inboxes, 8)).toThrow(`over the ${MAX_EMAILS_PER_RUN}`)
  })
})
