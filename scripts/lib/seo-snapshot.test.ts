import { describe, expect, it } from 'vitest'
import {
  cookieHeader,
  decodeEntities,
  diffLines,
  formatSnapshot,
  isNewUi,
  parseSeo
} from './seo-snapshot'

const page = `<!DOCTYPE html><html lang="en" data-ui="next"><head>
<meta charSet="utf-8"/><title>Study in the UK with IB Diploma | Official UCAS Guide (2027)</title>
<meta name="description" content="Official guide for IB students &amp; UCAS."/>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="https://www.ibmatch.com/study-in-uk-with-ib-diploma"/>
<!-- <h1>Commented out</h1> -->
</head><body>
<header><a aria-label="IB Match home" href="/"><span>IB Match</span></a></header>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"UK"}</script>
<main><h1 class="text-4xl">Study in the <span>UK</span>
 with the IB</h1><h2 id="a">Entry requirements</h2><h3>Oxford &amp; Cambridge</h3><h4>Not listed</h4></main>
<script>self.__next_f.push([1,"<h2>Not a heading</h2>"])</script>
</body></html>`

describe('parseSeo', () => {
  it('reads what a search engine reads', () => {
    const snapshot = parseSeo(page)
    expect(snapshot.title).toBe('Study in the UK with IB Diploma | Official UCAS Guide (2027)')
    expect(snapshot.description).toBe('Official guide for IB students & UCAS.')
    expect(snapshot.robots).toBe('index, follow')
    expect(snapshot.canonical).toBe('https://www.ibmatch.com/study-in-uk-with-ib-diploma')
    expect(snapshot.jsonLd).toHaveLength(1)
    expect(JSON.parse(snapshot.jsonLd[0])['@type']).toBe('WebPage')
  })

  it('lists h1 to h3 in order, ignoring comments and scripts', () => {
    expect(parseSeo(page).headings).toEqual([
      { level: 1, text: 'Study in the UK with the IB' },
      { level: 2, text: 'Entry requirements' },
      { level: 3, text: 'Oxford & Cambridge' }
    ])
  })

  it('reports what is missing', () => {
    const snapshot = parseSeo('<html><body><p>Nothing</p></body></html>')
    expect(snapshot).toEqual({
      title: null,
      description: null,
      canonical: null,
      robots: null,
      jsonLd: [],
      headings: []
    })
  })
})

describe('decodeEntities', () => {
  it('decodes named and numeric entities', () => {
    expect(decodeEntities('A &amp; B &#x27;C&#39; &lt;D&gt; &copy;')).toBe("A & B 'C' <D> &copy;")
  })
})

describe('formatSnapshot and diffLines', () => {
  it('shows no change for the same page', () => {
    const lines = formatSnapshot(parseSeo(page))
    expect(diffLines(lines, lines).every((line) => line.kind === ' ')).toBe(true)
  })

  it('shows a changed heading as one line out and one in', () => {
    const before = formatSnapshot(parseSeo(page))
    const after = formatSnapshot(parseSeo(page.replace('Entry requirements', 'Requirements')))
    const changed = diffLines(before, after).filter((line) => line.kind !== ' ')
    expect(changed).toEqual([
      { kind: '-', line: '    h2 Entry requirements' },
      { kind: '+', line: '    h2 Requirements' }
    ])
  })
})

describe('cookieHeader', () => {
  it('keeps each cookie name and value, without its attributes', () => {
    expect(
      cookieHeader([
        '__prerender_bypass=abc123; Path=/; HttpOnly; Secure; SameSite=None',
        'other=1; Path=/'
      ])
    ).toBe('__prerender_bypass=abc123; other=1')
  })
})

describe('isNewUi', () => {
  it('reads data-ui on <html>', () => {
    expect(isNewUi(page)).toBe(true)
    expect(isNewUi('<html lang="en" class="light"><body></body></html>')).toBe(false)
  })
})
