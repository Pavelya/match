import { describe, expect, it } from 'vitest'
import { isInternalHref, parseRich, richToText } from './rich-text'

describe('parseRich', () => {
  it('reads bold, italic and links', () => {
    expect(parseRich('The **IB Diploma** is *the* [CAO](https://www.cao.ie) route.')).toEqual([
      'The ',
      { kind: 'bold', children: ['IB Diploma'] },
      ' is ',
      { kind: 'italic', children: ['the'] },
      ' ',
      { kind: 'link', href: 'https://www.cao.ie', children: ['CAO'] },
      ' route.'
    ])
  })

  it('nests marks inside one another', () => {
    expect(parseRich('**direct access (*Hochschulzugang*)**')).toEqual([
      {
        kind: 'bold',
        children: ['direct access (', { kind: 'italic', children: ['Hochschulzugang'] }, ')']
      }
    ])
    expect(parseRich('[**UCAS**](https://www.ucas.com)')).toEqual([
      {
        kind: 'link',
        href: 'https://www.ucas.com',
        children: [{ kind: 'bold', children: ['UCAS'] }]
      }
    ])
  })

  it('keeps brackets inside a link label', () => {
    expect(parseRich('[Central Applications Office [CAO]](https://www.cao.ie)')).toEqual([
      { kind: 'link', href: 'https://www.cao.ie', children: ['Central Applications Office [CAO]'] }
    ])
  })

  it('shows unmatched marks as plain text', () => {
    expect(parseRich('5 * 2 and [not a link] and **open')).toEqual([
      '5 * 2 and [not a link] and **open'
    ])
  })
})

describe('richToText', () => {
  it('drops the marks and keeps every word', () => {
    expect(richToText('Learn [how IB Match evaluates **Irish** admission](/how-it-works).')).toBe(
      'Learn how IB Match evaluates Irish admission.'
    )
  })
})

describe('isInternalHref', () => {
  it('tells a page on IB Match from another site', () => {
    expect(isInternalHref('/how-it-works')).toBe(true)
    expect(isInternalHref('https://www.cao.ie')).toBe(false)
    expect(isInternalHref('//example.com')).toBe(false)
  })
})
