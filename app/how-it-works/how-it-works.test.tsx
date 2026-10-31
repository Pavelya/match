import { createElement, type ComponentType } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { WEIGHT_CONFIGS } from '@/lib/matching/types'
import { MatchingEngine } from './_components/MatchingEngine'
import { NewHowItWorks } from './NewHowItWorks'

/*
 * "How we score" states the matcher's weights in both designs, until R.2 removes today's, and
 * lists them in that order (board "D3.1 No IB minimum", D4.14).
 */

const { academic, field, location } = WEIGHT_CONFIGS.BALANCED

const text = (component: ComponentType) =>
  renderToStaticMarkup(createElement(component))
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')

describe.each([
  ['today’s design', MatchingEngine, ['Academic Match', 'Field Match', 'Location Match']],
  ['the new design', NewHowItWorks, ['Academic match', 'Field match', 'Location match']]
] as const)('How we score, %s', (_, component, names) => {
  it('states the matcher’s weights, largest first', () => {
    const page = text(component)
    const positions = names.map((name) => page.indexOf(name))
    expect(positions.every((p) => p >= 0)).toBe(true)
    expect(positions).toEqual([...positions].sort((a, b) => a - b))

    const stated = names.map((name, i) => {
      const after = page.slice(positions[i], positions[i + 1])
      return Number(/(\d+)%/.exec(after)?.[1]) / 100
    })
    expect(stated).toEqual([academic, field, location])
  })
})
