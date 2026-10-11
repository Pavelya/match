import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// The new design's colour tokens (rebranding 1.1) must meet WCAG 2.2 AA in light and dark:
// 4.5:1 for text, and 3:1 for the focus outline and the edges that show where to act. This reads
// them from app/globals.css, so a token change that breaks a pair fails here rather than on a
// student's screen.
//
// Known limits, by design rather than by token (04-design-system.md §1):
// - ink-3 is for paper and surface. On sunken in light it is 4.46:1, so no ink-3 text in wells.
// - line-2 is 1.5 to 1.8:1, so it only decorates (chips, secondary buttons). Fields and the chosen
//   segment use line-3, which --input points to (D2.2 and D2.4, decided 8 October 2026).
// - Lime is the same in both themes, so text on it is always the light ink, never --foreground.

const css = readFileSync(join(__dirname, 'globals.css'), 'utf8')

/** The text between the `{` at `open` and its matching `}`. */
function blockAt(text: string, open: number): string {
  let depth = 0
  for (let i = open; i < text.length; i++) {
    if (text[i] === '{') depth++
    if (text[i] === '}' && --depth === 0) return text.slice(open + 1, i)
  }
  throw new Error('Unbalanced braces in globals.css')
}

function hexTokens(text: string): Record<string, string> {
  const tokens: Record<string, string> = {}
  for (const [, name, value] of text.matchAll(/(--[a-z0-9-]+):\s*(#[0-9a-f]{6})\s*;/gi)) {
    tokens[name] = value.toLowerCase()
  }
  return tokens
}

const scopeStart = css.indexOf("[data-ui='next'] {")
const scope = blockAt(css, css.indexOf('{', scopeStart))
const darkStart = scope.indexOf('@variant dark {')
const darkBlock = blockAt(scope, scope.indexOf('{', darkStart))

const light = hexTokens(scope.replace(darkBlock, ''))
const dark = { ...light, ...hexTokens(darkBlock) }

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const [r, g, b] = channels.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string): number {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (high + 0.05) / (low + 0.05)
}

const TEXT = 4.5
const UI = 3

// [foreground, background, minimum]
const PAIRS: [string, string, number][] = [
  // Body text on the page, on cards and in wells
  ['--foreground', '--background', TEXT],
  ['--foreground', '--card', TEXT],
  ['--foreground', '--muted', TEXT],
  ['--muted-foreground', '--background', TEXT],
  ['--muted-foreground', '--card', TEXT],
  ['--muted-foreground', '--muted', TEXT],
  ['--ink-3', '--background', TEXT],
  ['--ink-3', '--card', TEXT],
  // Buttons, at rest and on hover, and links
  ['--primary-foreground', '--primary', TEXT],
  ['--primary-foreground', '--brand-hover', TEXT],
  ['--primary-foreground', '--brand-ink', TEXT], // pressed
  ['--primary', '--background', TEXT],
  ['--primary', '--card', TEXT],
  ['--brand-ink', '--brand-soft', TEXT],
  // The three statuses, in their chips and as plain text
  ['--ok', '--ok-soft', TEXT],
  ['--close', '--close-soft', TEXT],
  ['--gap', '--gap-soft', TEXT],
  ['--ok', '--card', TEXT],
  ['--close', '--card', TEXT],
  ['--gap', '--card', TEXT],
  ['--destructive', '--background', TEXT],
  ['--destructive', '--card', TEXT],
  // A chosen E in TOK or the Extended Essay fills with gap (D2.4)
  ['--background', '--gap', TEXT],
  // Field edges on paper and surface, and the chosen segment's edge on its track
  ['--line-3', '--background', UI],
  ['--line-3', '--card', UI],
  ['--line-3', '--muted', UI],
  // The focus outline
  ['--ring', '--background', UI],
  ['--ring', '--card', UI],
  ['--ring', '--muted', UI],
  // The toast takes the other theme: page colours swapped, the other theme's icons and outline
  ['--background', '--foreground', TEXT],
  ['--toast-ok', '--foreground', UI],
  ['--toast-gap', '--foreground', UI],
  ['--toast-ring', '--foreground', UI]
]

describe.each([
  ['light', light],
  ['dark', dark]
])('%s tokens', (_, tokens) => {
  it.each(PAIRS)('%s on %s reaches %s:1', (fg, bg, minimum) => {
    expect(tokens[fg], `${fg} is not defined`).toBeDefined()
    expect(tokens[bg], `${bg} is not defined`).toBeDefined()
    expect(contrast(tokens[fg], tokens[bg])).toBeGreaterThanOrEqual(minimum)
  })
})

describe('the dark theme', () => {
  it('redefines every colour except lime', () => {
    const notRedefined = Object.keys(light).filter((name) => !(name in hexTokens(darkBlock)))
    expect(notRedefined).toEqual(['--lime'])
  })
})

describe('contrast', () => {
  it('matches the WCAG reference values', () => {
    expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 5)
    expect(contrast('#ffffff', '#ffffff')).toBeCloseTo(1, 5)
    expect(contrast('#767676', '#ffffff')).toBeCloseTo(4.54, 2)
  })
})
