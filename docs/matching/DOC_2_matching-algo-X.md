# Matching Algorithm V10

## Overview

Version 10 (V10) of the matching algorithm introduces significant enhancements to improve match quality, student experience, and system performance. This document describes the algorithm components, scoring methodology, and new features.

## Core Matching Formula

The base matching score is calculated as a weighted combination of three components:

```
M = w_G × G_M + w_L × L_M + w_F × F_M
```

Where:
- **G_M** = Academic Match (grade requirements, HL/SL levels)
- **L_M** = Location Match (country preferences)
- **F_M** = Field Match (field of study preferences)
- **w_G, w_L, w_F** = Configurable weights (default: 0.6, 0.1, 0.3)

## V10 Enhancements

### 1. Fit Quality Score (FQS)

Instead of a binary "meets/doesn't meet" approach, V10 uses a continuous curve:

| Zone | Points vs Required | Score Range |
|------|-------------------|-------------|
| Under-qualified | Below required | 0.30 - 0.90 |
| Optimal | 0-3 above | 0.95 - 1.00 |
| Over-qualified | >3 above | 0.80 - 1.00 |

The optimal match occurs when a student exceeds requirements by 2-3 points.

### 2. Selectivity Boost

High-achieving students (38+ points) receive a small boost when matched with selective programs:

| Tier | Points Requirement | Boost |
|------|-------------------|-------|
| 1 - Highly Selective | 40+ | +5% |
| 2 - Selective | 36-39 | +3% |
| 3 - Moderately Selective | 32-35 | +1% |
| 4 - Standard | <32 | 0% |

### 3. Match Categorization

Matches are categorized for better student understanding:

| Category | Description | Criteria |
|----------|-------------|----------|
| **SAFETY** | Strong admission chances | Score ≥0.85 + points margin ≥5 |
| **MATCH** | Good admission chances | Score ≥0.70 |
| **REACH** | Competitive admission | Score ≥0.55 |
| **UNLIKELY** | Low admission probability | Score <0.55 |

### 4. Confidence Scoring

Each match includes a confidence indicator reflecting data quality:

| Level | Score Range | Typical Factors |
|-------|-------------|-----------------|
| High | ≥85% | Final grades, verified requirements |
| Medium | 65-84% | Predicted grades, all subjects |
| Low | <65% | Missing data, unverified info |

**Confidence Impact Factors:**
- Predicted grades: -8%
- Missing subjects: -5% each
- Incomplete profile: -10%
- Unverified requirements: -12%

### 5. Unified Penalty System

V10 consolidates all penalties into a single, transparent system:

| Penalty Type | Impact | Description |
|--------------|--------|-------------|
| Missing critical subject | Cap at 0.45 | e.g., missing required Math HL |
| Missing non-critical subject | Cap at 0.70 | e.g., optional science |
| Grade below requirement | -0.05 per point | Per point deficit |
| Multiple requirements missed | Compound penalty | Diminishing returns |

### 6. Anti-Gaming Measures

Protections against score manipulation:

- **Excessive subject stacking**: Diminishing returns after 3 subjects above requirement
- **Inflated grade claims**: Cross-validation checks
- **Field flooding**: Wide field preferences don't inflate location scores

## Performance Optimizations

### StudentCapabilityVector

Pre-computed data structure for O(1) subject lookups:

```typescript
const vector = createStudentCapabilityVector(student.courses)
vector.hasSubject('Mathematics', 'HL') // O(1)
vector.getGrade('Mathematics', 'HL')   // O(1)
```

### ProgramIndex

Multi-dimensional index for fast candidate filtering:

- Reduces candidates from ~5000 to ~100-500 (5-25x reduction)
- Indexes by: points range, field, country, subjects

### Memoization Cache

LRU cache for repeated calculations:

- 80%+ cache hit rate for batch operations
- Configurable size and TTL
- Session-level global cache

## Feature Flags

V10 features can be enabled independently:

| Flag | Description |
|------|-------------|
| `MATCHING_V10_FIT_QUALITY` | Fit Quality Score |
| `MATCHING_V10_SELECTIVITY` | Selectivity boost |
| `MATCHING_V10_ANTI_GAMING` | Anti-gaming measures |
| `MATCHING_V10_CONFIDENCE` | Confidence scoring |
| `MATCHING_V10_CATEGORIZATION` | Match categorization |
| `MATCHING_V10_PERFORMANCE` | Performance optimizations |
| `MATCHING_V10_FULL` | All V10 features |

Enable via environment variables:

```bash
MATCHING_V10_FULL=true              # Enable all
MATCHING_V10_FIT_QUALITY_ROLLOUT=25 # 25% gradual rollout
```

## API Response

V10 enhances the match result with additional fields:

```typescript
interface EnhancedMatchResult {
  // Base fields (V9)
  programId: string
  overallScore: number
  academicMatch: AcademicMatchScore
  locationMatch: LocationMatchScore
  fieldMatch: FieldMatchScore
  
  // V10 additions
  category: 'SAFETY' | 'MATCH' | 'REACH' | 'UNLIKELY'
  categoryInfo: {
    label: string
    description: string
    confidenceIndicator: 'high' | 'medium' | 'low'
  }
  confidence: {
    score: number  // 0-1
    level: 'high' | 'medium' | 'low'
    factors: ConfidenceFactor[]
  }
  fitQuality: {
    pointsFitScore: number
    pointsFitCategory: string
    selectivityBoost: number
    selectivityTier: 1 | 2 | 3 | 4
  }
}
```

## Metrics and Monitoring

V10 includes built-in observability:

| Metric | Description |
|--------|-------------|
| `latencyMs` | Request latency (p50/p95/p99) |
| `candidatesEvaluated` | Programs per request |
| `cacheHitRate` | Cache effectiveness |
| `categoryDistribution` | Category breakdown |
| `isHighAchiever` | High achiever request tracking |

Health check endpoint verifies:
- Average latency < 100ms
- Cache hit rate > 50%
- Category distribution balance

## Migration from V9

V10 is backward compatible. Existing V9 clients continue to work - V10 fields are additive. Enable features gradually using the feature flag system.

Recommended rollout:
1. Enable performance optimizations first (lowest risk)
2. Enable categorization and confidence (UX improvements)
3. Enable fit quality and selectivity (scoring changes)
4. Monitor metrics for quality regression

## Files Reference

| Component | File |
|-----------|------|
| Fit Quality | `lib/matching/fit-quality.ts` |
| Selectivity | `lib/matching/selectivity.ts` |
| Categorization | `lib/matching/categorization.ts` |
| Confidence | `lib/matching/confidence.ts` |
| Anti-Gaming | `lib/matching/preference-validator.ts` |
| Unified Penalties | `lib/matching/unified-penalties.ts` |
| Performance | `lib/matching/optimized-matcher.ts` |
| Feature Flags | `lib/feature-flags/matching-v10.ts` |
| Metrics | `lib/matching/matching-metrics.ts` |
| Enhanced Result | `lib/matching/enhanced-match-result.ts` |
