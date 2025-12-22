/**
 * Matching Algorithm Metrics
 *
 * Observability and monitoring for the matching algorithm.
 * Tracks performance, quality, and algorithm health metrics.
 *
 * Metrics include:
 * - Latency histograms
 * - Candidate counts
 * - Cache hit rates
 * - Category distributions
 * - High achiever fit scores
 *
 * Based on: DOC_2_matching-algo X.md - Monitoring
 */

import type { MatchCategory } from './categorization'
import { logger } from '@/lib/logger'

// ============================================
// Types
// ============================================

export interface MatchingMetrics {
  // Latency
  latencyMs: number
  filterTimeMs?: number
  matchTimeMs?: number

  // Candidates
  totalPrograms: number
  candidatesEvaluated: number
  reductionRatio: number

  // Cache
  cacheHits?: number
  cacheMisses?: number
  cacheHitRate?: number

  // Results
  resultsReturned: number
  categoryDistribution: Record<MatchCategory, number>

  // Student context
  studentPoints: number
  isHighAchiever: boolean

  // Version
  algorithmVersion: 'v9' | 'v10'
  v10FeaturesEnabled: string[]
}

export interface MetricsCollector {
  recordMetrics: (metrics: MatchingMetrics) => void
  getAggregatedMetrics: () => AggregatedMetrics
  reset: () => void
}

export interface AggregatedMetrics {
  requestCount: number
  avgLatencyMs: number
  p50LatencyMs: number
  p95LatencyMs: number
  p99LatencyMs: number
  avgCandidatesEvaluated: number
  avgCacheHitRate: number
  categoryTotals: Record<MatchCategory, number>
  highAchieverRequests: number
  v10RequestCount: number
}

// ============================================
// Metric Recording
// ============================================

// In-memory metrics store (for development/testing)
// In production, this would push to a metrics service
const metricsStore: MatchingMetrics[] = []
const MAX_STORED_METRICS = 1000

/**
 * Record matching metrics
 */
export function recordMatchingMetrics(metrics: MatchingMetrics): void {
  // Add to in-memory store
  metricsStore.push(metrics)

  // Trim if too many
  while (metricsStore.length > MAX_STORED_METRICS) {
    metricsStore.shift()
  }

  // Log for observability
  logMetrics(metrics)
}

/**
 * Log metrics in a structured format
 */
function logMetrics(metrics: MatchingMetrics): void {
  // Use console.log for now; in production, use a proper logger
  const logData = {
    event: 'matching_request',
    timestamp: new Date().toISOString(),
    latency_ms: metrics.latencyMs,
    candidates: metrics.candidatesEvaluated,
    total_programs: metrics.totalPrograms,
    reduction_ratio: metrics.reductionRatio.toFixed(2),
    cache_hit_rate: metrics.cacheHitRate?.toFixed(2) ?? 'n/a',
    results: metrics.resultsReturned,
    student_points: metrics.studentPoints,
    is_high_achiever: metrics.isHighAchiever,
    algorithm_version: metrics.algorithmVersion,
    v10_features:
      metrics.v10FeaturesEnabled.length > 0 ? metrics.v10FeaturesEnabled.join(',') : 'none',
    categories: JSON.stringify(metrics.categoryDistribution)
  }

  // Only log in development or if explicitly enabled
  if (process.env.NODE_ENV === 'development' || process.env.MATCHING_METRICS_LOG === 'true') {
    logger.debug('matching_metrics', logData)
  }
}

// ============================================
// Metric Aggregation
// ============================================

/**
 * Get aggregated metrics from recorded data
 */
export function getAggregatedMetrics(): AggregatedMetrics {
  if (metricsStore.length === 0) {
    return createEmptyAggregation()
  }

  const latencies = metricsStore.map((m) => m.latencyMs).sort((a, b) => a - b)
  const cacheHitRates = metricsStore
    .filter((m) => m.cacheHitRate !== undefined)
    .map((m) => m.cacheHitRate!)

  const categoryTotals: Record<MatchCategory, number> = {
    SAFETY: 0,
    MATCH: 0,
    REACH: 0,
    UNLIKELY: 0
  }

  for (const m of metricsStore) {
    for (const category of Object.keys(m.categoryDistribution) as MatchCategory[]) {
      categoryTotals[category] += m.categoryDistribution[category]
    }
  }

  return {
    requestCount: metricsStore.length,
    avgLatencyMs: average(latencies),
    p50LatencyMs: percentile(latencies, 50),
    p95LatencyMs: percentile(latencies, 95),
    p99LatencyMs: percentile(latencies, 99),
    avgCandidatesEvaluated: average(metricsStore.map((m) => m.candidatesEvaluated)),
    avgCacheHitRate: cacheHitRates.length > 0 ? average(cacheHitRates) : 0,
    categoryTotals,
    highAchieverRequests: metricsStore.filter((m) => m.isHighAchiever).length,
    v10RequestCount: metricsStore.filter((m) => m.algorithmVersion === 'v10').length
  }
}

/**
 * Reset stored metrics
 */
export function resetMetrics(): void {
  metricsStore.length = 0
}

/**
 * Get raw metrics (for testing)
 */
export function getRawMetrics(): MatchingMetrics[] {
  return [...metricsStore]
}

// ============================================
// Helper Functions
// ============================================

function createEmptyAggregation(): AggregatedMetrics {
  return {
    requestCount: 0,
    avgLatencyMs: 0,
    p50LatencyMs: 0,
    p95LatencyMs: 0,
    p99LatencyMs: 0,
    avgCandidatesEvaluated: 0,
    avgCacheHitRate: 0,
    categoryTotals: { SAFETY: 0, MATCH: 0, REACH: 0, UNLIKELY: 0 },
    highAchieverRequests: 0,
    v10RequestCount: 0
  }
}

function average(arr: number[]): number {
  if (arr.length === 0) return 0
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

function percentile(arr: number[], p: number): number {
  if (arr.length === 0) return 0
  const index = Math.ceil((p / 100) * arr.length) - 1
  return arr[Math.max(0, index)]
}

// ============================================
// Metrics Builder
// ============================================

/**
 * Create a metrics object from matching results
 */
export function createMatchingMetrics(params: {
  latencyMs: number
  filterTimeMs?: number
  matchTimeMs?: number
  totalPrograms: number
  candidatesEvaluated: number
  resultsReturned: number
  categoryDistribution: Record<MatchCategory, number>
  studentPoints: number
  cacheHits?: number
  cacheMisses?: number
  algorithmVersion: 'v9' | 'v10'
  v10FeaturesEnabled?: string[]
}): MatchingMetrics {
  const cacheTotal = (params.cacheHits ?? 0) + (params.cacheMisses ?? 0)
  const cacheHitRate = cacheTotal > 0 ? (params.cacheHits ?? 0) / cacheTotal : undefined

  return {
    latencyMs: params.latencyMs,
    filterTimeMs: params.filterTimeMs,
    matchTimeMs: params.matchTimeMs,
    totalPrograms: params.totalPrograms,
    candidatesEvaluated: params.candidatesEvaluated,
    reductionRatio: params.totalPrograms / Math.max(1, params.candidatesEvaluated),
    cacheHits: params.cacheHits,
    cacheMisses: params.cacheMisses,
    cacheHitRate,
    resultsReturned: params.resultsReturned,
    categoryDistribution: params.categoryDistribution,
    studentPoints: params.studentPoints,
    isHighAchiever: params.studentPoints >= 38,
    algorithmVersion: params.algorithmVersion,
    v10FeaturesEnabled: params.v10FeaturesEnabled ?? []
  }
}

// ============================================
// Health Checks
// ============================================

export interface HealthCheckResult {
  healthy: boolean
  checks: {
    latency: { ok: boolean; avgMs: number; threshold: number }
    cacheHitRate: { ok: boolean; rate: number; threshold: number }
    categoryBalance: { ok: boolean; details: string }
  }
}

/**
 * Check algorithm health based on aggregated metrics
 */
export function checkAlgorithmHealth(
  thresholds: {
    maxAvgLatencyMs?: number
    minCacheHitRate?: number
  } = {}
): HealthCheckResult {
  const { maxAvgLatencyMs = 100, minCacheHitRate = 0.5 } = thresholds

  const agg = getAggregatedMetrics()

  const latencyOk = agg.avgLatencyMs <= maxAvgLatencyMs
  const cacheOk = agg.avgCacheHitRate >= minCacheHitRate

  // Check category balance (no category should be 0% or 100%)
  const total = Object.values(agg.categoryTotals).reduce((a, b) => a + b, 0)
  let categoryBalanceOk = true
  let categoryDetails = 'balanced'

  if (total > 0) {
    const distribution = Object.entries(agg.categoryTotals)
      .map(([cat, count]) => `${cat}:${((count / total) * 100).toFixed(0)}%`)
      .join(', ')
    categoryDetails = distribution

    // Check for extreme imbalance (any category > 80%)
    for (const count of Object.values(agg.categoryTotals)) {
      if (count / total > 0.8) {
        categoryBalanceOk = false
      }
    }
  }

  return {
    healthy: latencyOk && cacheOk && categoryBalanceOk,
    checks: {
      latency: { ok: latencyOk, avgMs: agg.avgLatencyMs, threshold: maxAvgLatencyMs },
      cacheHitRate: { ok: cacheOk, rate: agg.avgCacheHitRate, threshold: minCacheHitRate },
      categoryBalance: { ok: categoryBalanceOk, details: categoryDetails }
    }
  }
}

// ============================================
// Exports
// ============================================

export const METRICS_CONSTANTS = {
  MAX_STORED_METRICS,
  HIGH_ACHIEVER_THRESHOLD: 38
} as const
