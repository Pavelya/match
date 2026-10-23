import { createElement, type ComponentType } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

/*
 * The words the legal review took off the public pages (docs/legal-review/claims.md, MAINT 7.4)
 * stay off, in today's components and in the new design's pages. Each one was a claim the code
 * could not support: "non-profit" and "non-commercial" (schools pay), "100% goes to platform
 * costs", the "where your support goes" split, "most popular", "forever", "GDPR compliant", other
 * companies' names, and the mailboxes nobody reads.
 */

vi.mock('@/lib/new-ui', () => ({ showsNewUi: vi.fn(async () => false) }))
vi.mock('@/components/support/islands', () => ({ ProgramSuggestion: () => null }))
vi.mock('@/components/layout/StudentFooter', () => ({ StudentFooter: () => null }))
vi.mock('@/lib/brand/metadata', () => ({
  organizationLogo: vi.fn(async () => 'https://example.test/logo.png')
}))

import { CoordinatorCTA } from './for-coordinators/_components/CoordinatorCTA'
import { CoordinatorDashboard } from './for-coordinators/_components/CoordinatorDashboard'
import { CoordinatorFeatures } from './for-coordinators/_components/CoordinatorFeatures'
import { CoordinatorStory } from './for-coordinators/_components/CoordinatorStory'
import { NewForCoordinators } from './for-coordinators/NewForCoordinators'
import { FilterSystem } from './how-it-works/_components/FilterSystem'
import { HowItWorksHero } from './how-it-works/_components/HowItWorksHero'
import { ProgramDatabase } from './how-it-works/_components/ProgramDatabase'
import { TechStack } from './how-it-works/_components/TechStack'
import { NewHowItWorks } from './how-it-works/NewHowItWorks'
import { DonationOptions } from './support-us/_components/DonationOptions'
import { SupportCTA } from './support-us/_components/SupportCTA'
import { SupportHero } from './support-us/_components/SupportHero'
import { WhoCanSupport } from './support-us/_components/WhoCanSupport'
import { WhySupport } from './support-us/_components/WhySupport'
import { NewSupportUs } from './support-us/NewSupportUs'
import { metadata as supportMetadata } from './support-us/page'
import SupportUsPage from './support-us/page'

const RETIRED: [string, RegExp][] = [
  ['"non-profit"', /non-?profit/i],
  ['"non-commercial"', /non-?commercial/i],
  ['"100% goes"', /100% goes/i],
  ['"most popular"', /most popular/i],
  ['"forever"', /forever/i],
  ['"always free"', /always free|free, always/i],
  ['"GDPR compliant"', /gdpr compliant/i],
  ['another company as a customer', /stripe|slack|instagram|spotify/i],
  ['the unread universities@ and admin@ mailboxes', /universities@|admin@/i],
  [
    '"where your support goes"',
    /where your support goes|how funds are used|complete transparency/i
  ],
  ['a "covers…" donation line', /covers 1 (week|month)|helps add 10 new/i],
  ['a latency figure', /under 50 milliseconds|in milliseconds|load in milliseconds/i],
  ['"bulk management"', /bulk management/i],
  [
    'the invented coordinator quotes',
    /what we hear from coordinators|balancing academic guidance/i
  ],
  ['"based on coordinator feedback"', /based on coordinator feedback/i],
  ['"the only" platform', /the only (university )?matching platform/i]
]

function html(Component: ComponentType): string {
  return renderToStaticMarkup(createElement(Component))
}

const PAGES: [string, ComponentType][] = [
  ['SupportHero', SupportHero],
  ['WhySupport', WhySupport],
  ['WhoCanSupport', WhoCanSupport],
  ['DonationOptions', DonationOptions],
  ['SupportCTA', SupportCTA],
  ['NewSupportUs', NewSupportUs],
  ['HowItWorksHero', HowItWorksHero],
  ['ProgramDatabase', ProgramDatabase],
  ['FilterSystem', FilterSystem],
  ['TechStack', TechStack],
  ['NewHowItWorks', NewHowItWorks],
  ['CoordinatorDashboard', CoordinatorDashboard],
  ['CoordinatorFeatures', CoordinatorFeatures],
  ['CoordinatorStory', CoordinatorStory],
  ['CoordinatorCTA', CoordinatorCTA],
  ['NewForCoordinators', NewForCoordinators]
]

describe.each(PAGES)('%s', (_name, Component) => {
  const markup = html(Component)

  it.each(RETIRED)('does not say %s', (_what, pattern) => {
    expect(markup).not.toMatch(pattern)
  })
})

describe('Support us', () => {
  it('sends partnership and sponsorship mail to support@', () => {
    for (const Component of [DonationOptions, WhoCanSupport, NewSupportUs]) {
      expect(html(Component)).toContain('mailto:support@ibmatch.com')
    }
  })

  it('names the founder and the builder the same way in both designs', () => {
    const sentence = 'started by Tal, an IB Diploma graduate'
    expect(html(SupportHero)).toContain(sentence)
    expect(html(NewSupportUs)).toContain(sentence)
  })

  it('says what donations pay for, with no split', () => {
    for (const Component of [DonationOptions, NewSupportUs]) {
      expect(html(Component)).toContain('hosting, the database, search and email')
    }
  })

  it('does not tell search engines it is a non-profit', async () => {
    const keywords = (supportMetadata.keywords as string[]).join(' ')
    expect(keywords).not.toMatch(/non-?profit/i)
    expect(String(supportMetadata.description)).not.toMatch(/non-?commercial/i)

    const page = renderToStaticMarkup(await SupportUsPage())
    expect(page).not.toMatch(/nonprofitStatus|NonprofitType|non-?commercial/i)
  })
})

describe('For schools', () => {
  it('describes the portal in the present tense, with what is paid for', () => {
    for (const Component of [CoordinatorDashboard, NewForCoordinators]) {
      const markup = html(Component)
      expect(markup).toContain('The coordinator portal gives you')
      expect(markup).toContain('Any school can link up to 10 students for free')
      expect(markup).toContain('CSV (paid or VIP plan)')
    }
  })
})
