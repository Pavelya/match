import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import {
  recordMatchingMetrics,
  getAggregatedMetrics,
  resetMetrics,
  getRawMetrics,
  createMatchingMetrics,
  checkAlgorithmHealth,
  METRICS_CONSTANTS
} from './matching-metrics'

const metrics1 = createMatchingMetrics({
  latencyMs: 25,
  totalPrograms: 500,
  candidatesEvaluated: 100,
  resultsReturned: 10,
  categoryDistribution: { SAFETY: 2, MATCH: 5, REACH: 2, UNLIKELY: 1 },
  studentPoints: 38,
  cacheHits: 80,
  cacheMisses: 20,
  algorithmVersion: 'v10',
  v10FeaturesEnabled: ['FIT_QUALITY', 'CATEGORIZATION']
})

/** Three requests: v10 at 38 points, v9 at 35, v10 at 42. */
function recordThree() {
  recordMatchingMetrics(metrics1)
  recordMatchingMetrics(
    createMatchingMetrics({
      latencyMs: 35,
      totalPrograms: 500,
      candidatesEvaluated: 150,
      resultsReturned: 10,
      categoryDistribution: { SAFETY: 1, MATCH: 6, REACH: 2, UNLIKELY: 1 },
      studentPoints: 35,
      algorithmVersion: 'v9'
    })
  )
  recordMatchingMetrics(
    createMatchingMetrics({
      latencyMs: 15,
      totalPrograms: 500,
      candidatesEvaluated: 80,
      resultsReturned: 10,
      categoryDistribution: { SAFETY: 3, MATCH: 4, REACH: 2, UNLIKELY: 1 },
      studentPoints: 42,
      cacheHits: 90,
      cacheMisses: 10,
      algorithmVersion: 'v10',
      v10FeaturesEnabled: ['FULL']
    })
  )
}

describe('createMatchingMetrics', () => {
  it('Create: copies the inputs', () => {
    expect(metrics1.latencyMs).toBe(25)
    expect(metrics1.totalPrograms).toBe(500)
    expect(metrics1.candidatesEvaluated).toBe(100)
    expect(metrics1.algorithmVersion).toBe('v10')
  })

  it('Create: calculates reductionRatio', () => {
    expect(metrics1.reductionRatio).toBe(5)
  })

  it('Create: calculates cacheHitRate', () => {
    expect(metrics1.cacheHitRate).toBe(0.8)
  })

  it('Create: calculates isHighAchiever', () => {
    expect(metrics1.isHighAchiever).toBe(true)
  })
})

describe('recording', () => {
  beforeEach(() => {
    resetMetrics()
  })

  it('Record: stores metrics', () => {
    recordMatchingMetrics(metrics1)
    const raw = getRawMetrics()
    expect(raw.length).toBe(1)
    expect(raw[0].latencyMs).toBe(25)
  })

  it('Record: all stored', () => {
    recordThree()
    expect(getRawMetrics().length).toBe(3)
  })

  it('Reset: clears metrics', () => {
    recordThree()
    resetMetrics()
    expect(getRawMetrics().length).toBe(0)
    expect(getAggregatedMetrics().requestCount).toBe(0)
  })
})

describe('aggregation and health', () => {
  beforeAll(() => {
    resetMetrics()
    recordThree()
  })

  it('Aggregation: requestCount', () => {
    expect(getAggregatedMetrics().requestCount).toBe(3)
  })

  it('Aggregation: avgLatencyMs', () => {
    const { avgLatencyMs } = getAggregatedMetrics()
    expect(avgLatencyMs).toBeGreaterThanOrEqual(20)
    expect(avgLatencyMs).toBeLessThanOrEqual(30)
  })

  it('Aggregation: highAchieverRequests', () => {
    expect(getAggregatedMetrics().highAchieverRequests).toBe(2)
  })

  it('Aggregation: v10RequestCount', () => {
    expect(getAggregatedMetrics().v10RequestCount).toBe(2)
  })

  it('Aggregation: category totals add up', () => {
    const { categoryTotals } = getAggregatedMetrics()
    expect(
      categoryTotals.SAFETY + categoryTotals.MATCH + categoryTotals.REACH + categoryTotals.UNLIKELY
    ).toBe(30)
  })

  it('Health: healthy, latency ok, with category details', () => {
    const health = checkAlgorithmHealth({ maxAvgLatencyMs: 100, minCacheHitRate: 0.5 })
    expect(health.healthy).toBe(true)
    expect(health.checks.latency.ok).toBe(true)
    expect(health.checks.categoryBalance.details.length).toBeGreaterThan(0)
  })
})

describe('high achiever detection', () => {
  const base = {
    latencyMs: 10,
    totalPrograms: 100,
    candidatesEvaluated: 20,
    resultsReturned: 10
  }

  it('High achiever: 35 pts = not high achiever', () => {
    const metrics = createMatchingMetrics({
      ...base,
      categoryDistribution: { SAFETY: 0, MATCH: 5, REACH: 5, UNLIKELY: 0 },
      studentPoints: 35,
      algorithmVersion: 'v9'
    })
    expect(metrics.isHighAchiever).toBe(false)
  })

  it('High achiever: 42 pts = high achiever', () => {
    const metrics = createMatchingMetrics({
      ...base,
      categoryDistribution: { SAFETY: 5, MATCH: 5, REACH: 0, UNLIKELY: 0 },
      studentPoints: 42,
      algorithmVersion: 'v10'
    })
    expect(metrics.isHighAchiever).toBe(true)
  })

  it('High achiever threshold', () => {
    expect(METRICS_CONSTANTS.HIGH_ACHIEVER_THRESHOLD).toBe(38)
  })
})
