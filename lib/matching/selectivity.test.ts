import { describe, expect, it } from 'vitest'
import {
  calculateSelectivityTier,
  applySelectivityBoost,
  isHighAchiever,
  getSelectivityTierName,
  getBoostAmount
} from './selectivity'

describe('calculateSelectivityTier', () => {
  it.each([
    // Tier 1: Highly Selective (40+)
    [42, 1],
    [40, 1],
    [45, 1],
    // Tier 2: Selective (36-39)
    [38, 2],
    [36, 2],
    [39, 2],
    // Tier 3: Moderately Selective (32-35)
    [34, 3],
    [32, 3],
    [35, 3],
    // Tier 4: Standard (<32)
    [28, 4],
    [31, 4],
    [24, 4],
    [null, 4],
    [undefined, 4]
  ])('%s required points is tier %s', (points, tier) => {
    expect(calculateSelectivityTier(points)).toBe(tier)
  })
})

describe('applySelectivityBoost', () => {
  it.each([
    // A high achiever gets the tier's boost
    { name: 'High achiever, Tier 1', base: 0.85, points: 42, tier: 1, expected: 0.9 },
    { name: 'High achiever, Tier 2', base: 0.85, points: 42, tier: 2, expected: 0.88 },
    { name: 'High achiever, Tier 3', base: 0.85, points: 42, tier: 3, expected: 0.86 },
    { name: 'High achiever, Tier 4', base: 0.85, points: 42, tier: 4, expected: 0.85 },
    // An average student gets none
    { name: 'Average student, no boost', base: 0.85, points: 35, tier: 1, expected: 0.85 },
    { name: 'Average student, no boost', base: 0.9, points: 37, tier: 1, expected: 0.9 },
    // 38 points is a high achiever
    { name: 'Boundary achiever', base: 0.85, points: 38, tier: 1, expected: 0.9 },
    { name: 'Cap at 1.0', base: 0.98, points: 42, tier: 1, expected: 1.0 },
    { name: 'Cap at 1.0', base: 0.99, points: 42, tier: 2, expected: 1.0 }
  ] as const)('$name ($points pts, $base base, Tier $tier) is $expected', (tc) => {
    expect(applySelectivityBoost(tc.base, tc.points, tc.tier)).toBe(tc.expected)
  })
})

describe('helpers', () => {
  it.each([
    [42, true],
    [38, true],
    [37, false],
    [35, false]
  ])('isHighAchiever: %s pts is %s', (points, expected) => {
    expect(isHighAchiever(points)).toBe(expected)
  })

  it.each([
    [1, 0.05, 'Highly Selective'],
    [2, 0.03, 'Selective'],
    [3, 0.01, 'Moderately Selective'],
    [4, 0.0, 'Standard']
  ] as const)('Tier %s: boost %s, named %s', (tier, boost, name) => {
    expect(getBoostAmount(tier)).toBe(boost)
    expect(getSelectivityTierName(tier)).toBe(name)
  })
})
