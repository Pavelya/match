import { describe, expect, it } from 'vitest'
import { legalSections } from './sections'

describe('legalSections', () => {
  it('drops a leading h1, so the page keeps one', () => {
    const { opening, sections } = legalSections('# Cookie Policy\n\n## What Are Cookies?\n\nText.')
    expect(opening).toBe('')
    expect(sections).toEqual([
      { id: 'what-are-cookies', title: 'What Are Cookies?', body: 'Text.' }
    ])
  })

  it('keeps a section for each ## heading, with its subheadings, lists and tables', () => {
    const md = [
      '## 1. Introduction',
      '',
      'IB Match is committed.',
      '',
      '## 10. Data Processing Roles (GDPR)',
      '',
      '### Sub-Processors',
      '',
      '| Provider | Purpose |',
      '|---|---|',
      '| **Vercel** | Hosting |'
    ].join('\n')
    const { sections } = legalSections(md)
    expect(sections.map((s) => s.id)).toEqual(['1-introduction', '10-data-processing-roles-gdpr'])
    expect(sections[1].body).toBe(
      '### Sub-Processors\n\n| Provider | Purpose |\n|---|---|\n| **Vercel** | Hosting |'
    )
  })

  it('keeps what comes before the first section, and gives repeated headings their own ids', () => {
    const { opening, sections } = legalSections(
      'Opening line.\n\n## Contact\n\nA\n\n## Contact\n\nB'
    )
    expect(opening).toBe('Opening line.')
    expect(sections.map((s) => s.id)).toEqual(['contact', 'contact-2'])
  })

  it('drops only a leading h1', () => {
    const { opening } = legalSections('Intro\n\n# Not first')
    expect(opening).toBe('Intro\n\n# Not first')
  })
})
