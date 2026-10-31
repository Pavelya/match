import { describe, expect, it } from 'vitest'
import { EMAIL_CSS, EMAIL_DARK, EMAIL_LIGHT } from './tokens'

// The emails' colours pass WCAG AA in light and in their own dark (rebranding 4.7, Definition of
// done 1): every text on every ground it sits on, as the spec table on "D4.18 Emails" measures.

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const [r, g, b] = channels.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string): number {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (high + 0.05) / (low + 0.05)
}

type Token = keyof typeof EMAIL_LIGHT

// [text, ground]: all of it 4.5:1, since nothing in an email is large text but the heading
const PAIRS: [Token, Token][] = [
  ['ink', 'card'],
  ['text', 'card'],
  ['muted', 'card'],
  ['brand', 'card'],
  ['ink', 'panel'],
  ['text', 'panel'],
  ['muted', 'paper'],
  ['brand', 'paper'],
  ['onBrand', 'brand']
]

describe('the emails’ colours', () => {
  for (const [name, colours] of [
    ['light', EMAIL_LIGHT],
    ['dark', EMAIL_DARK]
  ] as const) {
    it.each(PAIRS)(`${name}: %s on %s reaches 4.5:1`, (text, ground) => {
      expect(contrast(colours[text], colours[ground])).toBeGreaterThanOrEqual(4.5)
    })
  }

  it('swaps every dark colour in by class', () => {
    for (const colour of Object.values(EMAIL_DARK)) expect(EMAIL_CSS).toContain(colour)
  })
})
