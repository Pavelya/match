import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { SEASON_KEYS } from './seasons'

/*
 * Every drawing in public/ is served for a year as immutable (next.config.ts), and a redraw keeps
 * the file's name, so a browser that saw the old one would keep it (6.3, after #165). Each
 * season's stylesheet, which is revalidated on every visit, therefore asks for each drawing with
 * `?v=` and the first 8 hex digits of its SHA-256: a changed drawing gets a new address.
 */

const ROOT = join(process.cwd(), 'public/seasons')

describe.each(SEASON_KEYS)('season %s', (key) => {
  const dir = join(ROOT, key)
  const css = readFileSync(join(dir, 'season.css'), 'utf8')
  const urls = [...css.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)].map((m) => m[1])

  it('versions every drawing it uses by its contents', () => {
    expect(urls.length).toBeGreaterThan(0)
    for (const url of urls) {
      const [file] = url.split('?')
      const version = createHash('sha256')
        .update(readFileSync(join(dir, file)))
        .digest('hex')
        .slice(0, 8)
      expect(url, `season.css should ask for ${file}?v=${version}`).toBe(`${file}?v=${version}`)
    }
  })

  it('uses every drawing in its folder', () => {
    const used = new Set(urls.map((url) => url.split('?')[0]))
    const drawings = readdirSync(dir).filter((file) => file.endsWith('.svg'))
    expect([...used].sort()).toEqual(drawings.sort())
  })
})
