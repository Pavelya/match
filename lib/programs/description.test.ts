import { describe, expect, it } from 'vitest'
import { descriptionClamp, estimateLines, splitDescription } from './description'

const words = (chars: number) => 'a'.repeat(chars)

describe('estimateLines', () => {
  it('counts each paragraph and the blank line between them', () => {
    expect(estimateLines(words(150), 74)).toBe(3)
    expect(estimateLines(`${words(74)}\n\n${words(10)}`, 74)).toBe(3)
    expect(estimateLines('', 74)).toBe(1)
  })
})

describe('descriptionClamp', () => {
  it('shows nine or ten lines whole, and cuts past ten', () => {
    // Sciences Po: 664 characters, nine lines on desktop
    expect(descriptionClamp(words(664)).wide).toBe(false)
    expect(descriptionClamp(words(740)).wide).toBe(false)
    expect(descriptionClamp(words(741)).wide).toBe(true)
    // Toronto's Computer Science: 1,197 characters
    expect(descriptionClamp(words(1197))).toEqual({ phone: true, wide: true })
  })

  it('cuts sooner on a phone', () => {
    // MIT: 459 characters, twelve lines at 390px
    expect(descriptionClamp(words(459))).toEqual({ phone: true, wide: false })
    expect(descriptionClamp(words(380))).toEqual({ phone: false, wide: false })
  })
})

describe('splitDescription', () => {
  it('takes a closing "How competitive:" paragraph out, without its label', () => {
    expect(
      splitDescription(
        'Economics studies decision-making.\n\nHow competitive: MIT admitted 4.6% for fall 2025.'
      )
    ).toEqual({
      about: 'Economics studies decision-making.',
      competitive: 'MIT admitted 4.6% for fall 2025.'
    })
  })

  it('starts the paragraph with a capital once its label has gone', () => {
    expect(
      splitDescription('Economics.\n\nHow competitive: for fall 2025, MIT admitted 4.6%.')
        .competitive
    ).toBe('For fall 2025, MIT admitted 4.6%.')
  })

  it('keeps every other paragraph in About', () => {
    const text = 'First paragraph.\n\nSecond paragraph.\n\nHow competitive: Grades vary.'
    expect(splitDescription(text).about).toBe('First paragraph.\n\nSecond paragraph.')
  })

  it('leaves a description without one as it is', () => {
    expect(splitDescription('A program.\n\nIt mentions how competitive: it is.')).toEqual({
      about: 'A program.\n\nIt mentions how competitive: it is.',
      competitive: null
    })
  })
})
