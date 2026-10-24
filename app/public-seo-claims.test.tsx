import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

/*
 * The titles, descriptions, keywords and structured data that search engines read say what the
 * legal review left standing (docs/legal-review/claims.md, MAINT 7.4): IB Match is not a
 * non-profit and not non-commercial (schools pay), and "the only" platform is a claim about every
 * competitor. Both designs share this copy, so it is checked once.
 */

vi.mock('@/lib/new-ui', () => ({ showsNewUi: vi.fn(async () => false) }))
vi.mock('@/components/layout/StudentFooter', () => ({ StudentFooter: () => null }))
vi.mock('@/lib/brand/metadata', () => ({
  organizationLogo: () => ({ url: 'https://example.test/logo.png' })
}))

import HomePage, { metadata as homeMetadata } from './page'
import HowItWorksPage from './how-it-works/page'
import SupportUsPage, { metadata as supportMetadata } from './support-us/page'

/** Every JSON-LD block in the markup, as one string */
function jsonLd(markup: string): string {
  const blocks = markup.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) ?? []
  expect(blocks.length).toBeGreaterThan(0)
  return blocks.join('\n')
}

function metadataText(metadata: object): string {
  return JSON.stringify(metadata)
}

describe('Support us', () => {
  it('does not call IB Match a non-profit or non-commercial in its metadata', () => {
    expect(metadataText(supportMetadata)).not.toMatch(/non-?profit|non-?commercial/i)
  })

  it('does not tell search engines it is a non-profit or non-commercial', async () => {
    const data = jsonLd(renderToStaticMarkup(await SupportUsPage()))
    expect(data).not.toMatch(/nonprofitStatus|NonprofitType|non-?commercial/i)
  })

  it('says what donations pay for, with no allocation', () => {
    expect(String(supportMetadata.description)).toContain('hosting, the database, search and email')
    expect(metadataText(supportMetadata)).not.toMatch(/infrastructure, development, and growth/i)
  })
})

describe('Home', () => {
  it('does not claim to be the only platform', async () => {
    expect(metadataText(homeMetadata)).not.toMatch(/the only /i)
    expect(jsonLd(renderToStaticMarkup(await HomePage()))).not.toMatch(/the only /i)
  })

  it('does not say it was built by an IB graduate', () => {
    expect(metadataText(homeMetadata)).not.toMatch(/built by an? (former )?IB/i)
  })
})

describe('How it works', () => {
  it('does not promise instant filtering in its structured data', async () => {
    const data = jsonLd(renderToStaticMarkup(await HowItWorksPage()))
    expect(data).not.toMatch(/instant/i)
  })
})
