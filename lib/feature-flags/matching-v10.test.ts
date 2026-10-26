import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  isFeatureEnabled,
  isAnyV10FeatureEnabled,
  getEnabledV10Features,
  getFlagConfig,
  getAllFlagConfigs,
  useFitQualityScore,
  useSelectivityBoost,
  useAntiGaming,
  useConfidenceScoring,
  useCategorization,
  usePerformanceOptimizations,
  MATCHING_V10_FLAGS
} from './matching-v10'

/*
 * The flags are read from the environment on every call. Production's `.env` sets
 * MATCHING_V10_FULL, so each test starts with none of them set and stubs what it needs.
 */
beforeEach(() => {
  for (const flag of MATCHING_V10_FLAGS) {
    vi.stubEnv(flag, undefined)
    vi.stubEnv(`${flag}_ROLLOUT`, undefined)
  }
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('default state', () => {
  it.each([...MATCHING_V10_FLAGS])('Default: %s disabled', (flag) => {
    expect(isFeatureEnabled(flag)).toBe(false)
  })

  it('Default: no V10 features enabled, and an empty list', () => {
    expect(isAnyV10FeatureEnabled()).toBe(false)
    expect(getEnabledV10Features().length).toBe(0)
  })

  it('Helpers: all false by default', () => {
    expect(useFitQualityScore()).toBe(false)
    expect(useSelectivityBoost()).toBe(false)
    expect(useAntiGaming()).toBe(false)
    expect(useConfidenceScoring()).toBe(false)
    expect(useCategorization()).toBe(false)
    expect(usePerformanceOptimizations()).toBe(false)
  })
})

describe('context overrides', () => {
  it('Force enable: returns true', () => {
    expect(isFeatureEnabled('MATCHING_V10_FIT_QUALITY', { forceEnable: true })).toBe(true)
    expect(useFitQualityScore({ forceEnable: true })).toBe(true)
  })

  it('Force disable: returns false', () => {
    expect(isFeatureEnabled('MATCHING_V10_FIT_QUALITY', { forceDisable: true })).toBe(false)
  })

  it('Force disable overrides force enable', () => {
    expect(
      isFeatureEnabled('MATCHING_V10_FIT_QUALITY', { forceEnable: true, forceDisable: true })
    ).toBe(false)
  })
})

describe('flag configuration', () => {
  it('Config: has enabled, rolloutPercentage and description', () => {
    const fitQualityConfig = getFlagConfig('MATCHING_V10_FIT_QUALITY')
    expect('enabled' in fitQualityConfig).toBe(true)
    expect('rolloutPercentage' in fitQualityConfig).toBe(true)
    expect('description' in fitQualityConfig).toBe(true)
  })

  it('All configs: has all flags', () => {
    expect(Object.keys(getAllFlagConfigs()).length).toBe(MATCHING_V10_FLAGS.length)
  })
})

describe('rollout', () => {
  it('Consistent hashing: each user gets the same answer on every call', () => {
    // The old script passed `forceEnable`, which returns before any hashing
    vi.stubEnv('MATCHING_V10_FIT_QUALITY', 'true')
    vi.stubEnv('MATCHING_V10_FIT_QUALITY_ROLLOUT', '50')

    for (const userId of ['test-user-123', 'test-user-456']) {
      const answers = Array.from({ length: 5 }, () =>
        isFeatureEnabled('MATCHING_V10_FIT_QUALITY', { userId })
      )
      expect(new Set(answers).size, userId).toBe(1)
    }
  })
})

describe('flag list', () => {
  it('Flag list: includes FIT_QUALITY, SELECTIVITY and FULL', () => {
    expect(MATCHING_V10_FLAGS).toContain('MATCHING_V10_FIT_QUALITY')
    expect(MATCHING_V10_FLAGS).toContain('MATCHING_V10_SELECTIVITY')
    expect(MATCHING_V10_FLAGS).toContain('MATCHING_V10_FULL')
  })

  it('Flag list: correct count', () => {
    expect(MATCHING_V10_FLAGS.length).toBe(7)
  })
})
