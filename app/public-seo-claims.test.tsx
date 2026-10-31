import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

/*
 * The titles, descriptions, keywords and structured data that search engines read say what the
 * legal review left standing (docs/legal-review/claims.md, MAINT 7.4): IB Match is not a
 * non-profit and not non-commercial (schools pay), and "the only" platform is a claim about every
 * competitor. Both designs share this copy, so it is checked once. The same goes for the FAQ list
 * and for how the structured data describes the score (MAINT 5.45). IB Match gives no probability,
 * so neither Explore's questions nor a program's description promises one (MAINT 5.47).
 */

vi.mock('@/lib/new-ui', () => ({ showsNewUi: vi.fn(async () => false) }))
vi.mock('@/components/layout/StudentFooter', () => ({ StudentFooter: () => null }))
vi.mock('@/lib/brand/metadata', () => ({
  organizationLogo: () => ({ url: 'https://example.test/logo.png' })
}))
vi.mock('@/lib/legal-documents', () => ({ getPublishedDocument: vi.fn(async () => null) }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => null) }))
vi.mock('@/lib/prisma', () => ({ prisma: {} }))
vi.mock('./programs/[id]/program', () => ({ getProgram: vi.fn() }))
vi.mock('./programs/[id]/NewProgramPage', () => ({ NewProgramPage: () => null }))
vi.mock('@/lib/matching', () => ({ calculateMatch: vi.fn() }))

import HomePage, { metadata as homeMetadata } from './page'
import FAQPage from './faqs/page'
import { NewHowItWorks } from './how-it-works/NewHowItWorks'
import HowItWorksPage from './how-it-works/page'
import SupportUsPage, { metadata as supportMetadata } from './support-us/page'
import { generateMetadata as programMetadata } from './programs/[id]/page'
import { getProgram } from './programs/[id]/program'
import { EXPLORE_QUESTIONS } from '@/lib/explore/questions'

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

  it('names the three factors the page names in its structured data', async () => {
    const data = jsonLd(renderToStaticMarkup(await HowItWorksPage()))
    const page = renderToStaticMarkup(NewHowItWorks())
    for (const factor of ['Academic match', 'Location match', 'Field match']) {
      expect(page).toContain(factor)
      expect(data).toContain(factor)
    }
    expect(data).not.toMatch(/IB Points Compatibility|Subject Match|Preference Alignment/)
  })
})

describe('FAQs', () => {
  it('says what a coordinator can view, as the invitation does', async () => {
    const data = jsonLd(renderToStaticMarkup(await FAQPage()))
    expect(data).toContain('can view your academic profile, matches and saved programs')
  })
})

describe('Explore', () => {
  it('promises no probability in the questions its structured data repeats', () => {
    const answers = EXPLORE_QUESTIONS.map(({ answer }) => answer).join('\n')
    expect(answers).not.toMatch(/probabilit/i)
    expect(answers).toContain('see how you stand against each requirement')
  })

  it('does not undercount the programs', () => {
    const answers = EXPLORE_QUESTIONS.map(({ answer }) => answer).join('\n')
    expect(answers).not.toMatch(/over 1,?000/i)
  })
})

describe('Program pages', () => {
  const course = (id: string, name: string) => ({
    id,
    requiredLevel: 'HL',
    minGrade: 6,
    orGroupId: null,
    ibCourse: { id, name, code: id }
  })
  const subjects = [course('a', 'Mathematics Analysis and Approaches'), course('b', 'Physics')]

  /** The description of a 38-point program whose name and university take up `names` characters */
  async function describeProgram(names: number, courseRequirements: unknown[] = []) {
    vi.mocked(getProgram).mockResolvedValue({
      id: 'p',
      name: 'n'.repeat(names - 4),
      description: 'From the university',
      minIBPoints: 38,
      courseRequirements,
      fieldOfStudy: { name: 'Engineering' },
      university: { name: 'Univ', image: null, country: { name: 'Poland' } }
    } as never)
    const { description } = await programMetadata({ params: Promise.resolve({ id: 'p' }) })
    return String(description)
  }

  // Each fallback in generateMetadata, from the longest. "Check if you match" stays as it was.
  it.each([
    ['every detail', 20, [], /^Explore .*each requirement for \d{4}\/\d{2}\.$/],
    ['without the cycle', 60, [], /^Explore .*Minimum 38 IB points\. See how you stand on each\.$/],
    [
      'the short intro',
      90,
      [],
      /^IB requirements for .*: 38 points\. See how you stand on each\.$/
    ],
    ['no subjects', 50, subjects, /^IB requirements for .*Check if you match based on/],
    [
      'the fewest words',
      90,
      subjects,
      /requires 38 IB points\. See how you stand for \d{4}\/\d{2}\.$/
    ],
    ['a cut name', 110, subjects, /requires 38 IB points\. See match for \d{4}\/\d{2}\.$/]
  ])('promises no probability with %s', async (_, names, courses, ending) => {
    const description = await describeProgram(names, courses)
    expect(description).toMatch(ending)
    expect(description).not.toMatch(/probabilit/i)
    expect(description.length).toBeLessThanOrEqual(160)
  })
})
