import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import { brand } from './config'

// The files in public/brand/ are swapped when the mark changes. These checks catch a replacement
// with the wrong size, or an SVG that sets the name in live text, which renders in whatever font
// the visitor has (audit 2.4).

const read = (src: string) => readFileSync(join(process.cwd(), 'public', src))

/** Width and height from a PNG's IHDR chunk */
function pngSize(file: Buffer): { width: number; height: number } {
  expect(file.subarray(1, 4).toString('ascii')).toBe('PNG')
  return { width: file.readUInt32BE(16), height: file.readUInt32BE(20) }
}

describe('brand files', () => {
  it.each([
    ['favicon PNG', brand.faviconPng, 32, 32],
    ['Apple touch icon', brand.appleTouchIcon, 180, 180],
    ['email logo', brand.emailLogo, 80, 80],
    ['square logo', brand.logoSquare.src, brand.logoSquare.width, brand.logoSquare.height],
    ['share image', brand.ogImage.src, brand.ogImage.width, brand.ogImage.height]
  ])('the %s is a PNG at its size', (_, src, width, height) => {
    expect(pngSize(read(src))).toEqual({ width, height })
  })

  it('the Apple touch icon is opaque: iOS fills transparency with black', () => {
    // Colour type 2 is RGB without alpha
    expect(read(brand.appleTouchIcon)[25]).toBe(2)
  })

  it.each([brand.mark, brand.favicon])('%s is outlined paths, never text', (src) => {
    const svg = read(src).toString('utf8')
    expect(svg).toContain('viewBox="0 0 32 32"')
    expect(svg).not.toMatch(/<text|<tspan|font-family/)
  })
})
