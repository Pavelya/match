import { describe, expect, it } from 'vitest'
import { buttonVariants } from './button-variants'

const VARIANTS = ['primary', 'secondary', 'danger', 'link'] as const
const SIZES = ['sm', 'md', 'lg', 'icon'] as const

/** The type sizes from app/globals.css; a modifier such as md: is a different rule */
const TEXT_SIZE = /^text-(display-xl|display-l|h1|h2|h3|body-l|body|field|small|label|total)$/

describe('buttonVariants', () => {
  // Pages call it without cn() (Support us, For schools), so nothing merges two sizes there
  for (const variant of VARIANTS) {
    for (const size of SIZES) {
      it(`gives ${variant} ${size} one text size`, () => {
        const sizes = buttonVariants({ variant, size })
          .split(/\s+/)
          .filter((c) => TEXT_SIZE.test(c))
        expect(sizes).toHaveLength(1)
      })
    }
  }

  it('sets the 52px button in 17px, as the boards draw it', () => {
    expect(buttonVariants({ size: 'lg' }).split(/\s+/)).toContain('text-body-l')
    expect(buttonVariants({ size: 'lg' }).split(/\s+/)).not.toContain('text-body')
  })
})
