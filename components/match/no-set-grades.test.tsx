import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { FitPanel } from '@/components/program/FitPanel'
import type { WhyThisMatch as WhyData } from '@/lib/matching/match-why'
import { WhyThisMatch } from './WhyThisMatch'

/*
 * A program with no set grades has no fit score (board "D3.1 No IB minimum"): neither "Why this
 * match" nor the program page's panel shows a percentage, and the note takes its place.
 */

const NOTE =
  'There’s nothing here to check your grades against, so we can’t say how you compare. See how the university decides on its own page.'

const WHY: WhyData = {
  rows: [
    {
      kind: 'info',
      type: 'points',
      name: 'IB Diploma points',
      needed: '24',
      you: '28',
      detail: '24 is the Diploma itself.'
    },
    { kind: 'info', type: 'none', name: 'Named subjects', needed: 'None', you: '–' }
  ],
  note: { kind: 'info', text: NOTE },
  intake: null,
  programUrl: null,
  field: { kind: 'met', text: 'Business & Economics, one of yours' },
  country: { kind: 'met', text: 'Italy, one of yours' },
  fit: null
}

describe('no fit score reaches the panel', () => {
  it('in “Why this match”', () => {
    const html = renderToStaticMarkup(
      <WhyThisMatch id="why" programId="p" programName="Economics" why={WHY} />
    )
    expect(html).not.toContain('Fit score')
    expect(html).not.toContain('How ranking works')
    expect(html).not.toContain('272px')
    expect(html).toContain('24 is the Diploma itself.')
    expect(html).toContain('we can’t say how you compare')
  })

  it('on the program page, with the large neutral badge', () => {
    const html = renderToStaticMarkup(
      <FitPanel status="neutral" badge="No set grades" why={WHY} academicHref="/student/academic" />
    )
    expect(html).toContain('No set grades')
    expect(html).toContain('we can’t say how you compare')
    expect(html).not.toContain('How the fit is worked out')
    expect(html).not.toContain('%')
  })
})
