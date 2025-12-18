# Matching Algorithm Migration Plan: Version IX → X

**Version:** 1.0  
**Created:** December 2024  
**Status:** Approved for Implementation  
**Related Documents:**
- [DOC_2_matching-algo IX.md](./DOC_2_matching-algo%20IX.md) (Current)
- [DOC_2_matching-algo X.md](./DOC_2_matching-algo%20X.md) (Target)
- [ibmatch-algorithm-improvement-spec.md](./ibmatch-algorithm-improvement-spec.md) (Technical Spec)
- **[matching-algo-rollback-plan.md](./matching-algo-rollback-plan.md) (⚠️ CRITICAL: Rollback Procedures)**

---

## ⚠️ SAFETY CRITICAL: Rollback Capability

**The matching algorithm is the core of the IB Match platform. ALL changes MUST be reversible.**

### Mandatory Requirements Before Implementation

1. **Read the [Rollback Plan](./matching-algo-rollback-plan.md) first** - Understand all three rollback levels
2. **All schema changes must be additive** - Never drop existing columns
3. **Feature flags are mandatory** - Every V10 feature must be independently toggleable
4. **Keep V9 code paths intact** - Do not delete V9 logic until V10 is stable for 30+ days
5. **Database backups before migrations** - Always create backup before schema changes

### Rollback Levels Summary

| Level | Time | Action | Use When |
|-------|------|--------|----------|
| **Level 1** | ~1 min | Disable feature flags | Scoring issues detected |
| **Level 2** | ~5 min | Code rollback + deploy | V10 code has bugs |
| **Level 3** | ~30 min | Full DB schema revert | Need complete removal |

### Schema Design for Reversibility

All V10 schema additions follow these rules:

```prisma
// ✅ SAFE: Nullable with defaults (can DROP without data loss)
selectivityTier       Int?      @default(null)
openToAllFields       Boolean   @default(false)

// ❌ UNSAFE: Required field would break V9 code
// selectivityTier    Int       // DON'T DO THIS
```

### Code Design for Reversibility

```typescript
// ✅ SAFE: Feature flag wraps V10 logic
export function calculateMatch(input: MatchInput): MatchResult {
  if (isV10Enabled()) {
    return calculateMatchV10(input)  // New logic
  }
  return calculateMatchV9(input)     // Original logic preserved
}

// ❌ UNSAFE: Overwrites V9 logic
// export function calculateMatch(input: MatchInput): MatchResult {
//   return calculateMatchV10(input)  // V9 lost!
// }
```

---

## Executive Summary

This document outlines the migration plan from Matching Algorithm IX to X, implementing improvements validated from both business and technical perspectives.

### Validation Summary

| Aspect | Status | Rationale |
|--------|--------|-----------|
| **Business/Product** | ✅ Approved | Directly supports PRD goals: suitable matches, clear indicators, fast performance |
| **Technical** | ✅ Approved | Mathematically sound, reduces complexity, follows established patterns |

### Key Improvements

| Track | Improvement | Business Value | Technical Benefit |
|-------|-------------|----------------|-------------------|
| A | Fit Quality Score | High-achievers see appropriate programs | Smooth curves, no edge cases |
| A | Match Categorization | Clear SAFETY/MATCH/REACH labels | Better UX communication |
| A | Anti-Gaming | Platform integrity | Reduced gaming exploits |
| A | Confidence Scoring | Transparency | Explainable AI |
| A | Unified Penalties | Consistent scoring | Simpler debugging |
| B | StudentCapabilityVector | Faster results | O(1) lookups |
| B | ProgramIndex | Sub-100ms responses | 25x candidate reduction |
| B | Memoization | Consistent performance | 2x speedup |

---

## Migration Tasks

### Phase 1: Foundation (Week 1-2)

---

#### Task 1.1: Database Schema Updates for Track A

**Description:** Add new columns to support Track A features including selectivity tiers and explicit preference flags.

**Files to Modify:**
- `prisma/schema.prisma`
- Create migration: `prisma/migrations/[timestamp]_matching_v10_schema`

**Changes:**
```prisma
model Program {
  // ... existing fields
  selectivityTier     Int?      @default(null) // 1-4, calculated if null
  requirementsVerified Boolean  @default(false)
  requirementsUpdatedAt DateTime?
}

model StudentProfile {
  // ... existing fields
  openToAllFields    Boolean @default(false)
  openToAllLocations Boolean @default(false)
}
```

**Expected Outcomes:**
- [ ] Schema migration runs without errors
- [ ] Existing data is preserved (nullable fields)
- [ ] Prisma client regenerated with new types
- [ ] No breaking changes to existing API

**Tests:**
| Test Case | Expected Result | Priority |
|-----------|-----------------|----------|
| Run migration on empty DB | Migration completes successfully | P0 |
| Run migration on production clone | All existing data intact | P0 |
| Query programs with new fields | Returns null for selectivityTier | P1 |
| Create student with new flags | Defaults to false | P1 |
| Prisma generate | No TypeScript errors | P0 |

---

#### Task 1.2: Implement Fit Quality Score (FQS)

**Description:** Replace binary points threshold with continuous fit quality curve.

**Files to Create:**
- `lib/matching/fit-quality.ts`
- `lib/matching/fit-quality.test.ts`

**Files to Modify:**
- `lib/matching/academic-matcher.ts`

**Implementation:**
```typescript
// lib/matching/fit-quality.ts
export function calculatePointsFitQuality(
  studentPoints: number,
  requiredPoints: number
): number {
  const IB_MAX_POINTS = 45
  const IB_MIN_DIPLOMA = 24
  const OPTIMAL_BUFFER = 3
  
  const optimalPoints = requiredPoints + OPTIMAL_BUFFER
  
  // Under-qualified
  if (studentPoints < requiredPoints) {
    const deficit = requiredPoints - studentPoints
    const maxDeficit = requiredPoints - IB_MIN_DIPLOMA
    const decayRate = 0.60 / maxDeficit
    return Math.max(0.30, 0.90 - (deficit * decayRate))
  }
  
  // Optimal zone (0 to OPTIMAL_BUFFER points above)
  if (studentPoints <= optimalPoints) {
    const surplus = studentPoints - requiredPoints
    return 0.95 + (surplus / OPTIMAL_BUFFER) * 0.05
  }
  
  // Over-qualified
  const overAmount = studentPoints - optimalPoints
  const maxOver = IB_MAX_POINTS - optimalPoints
  const decayRate = 0.20 / maxOver
  return Math.max(0.80, 1.00 - (overAmount * decayRate))
}
```

**Expected Outcomes:**
- [ ] High achievers (45 pts) prefer selective programs (40+ req)
- [ ] Near-miss students (1-2 pts below) score higher than far-miss
- [ ] Overqualified students still see programs (min 0.80)
- [ ] All scores remain in [0.30, 1.00] range

**Tests:**
| Test Case | Input | Expected Output | Priority |
|-----------|-------|-----------------|----------|
| Exact optimal (+3 buffer) | 43 pts, 40 req | 1.00 | P0 |
| Exactly meeting | 40 pts, 40 req | 0.95 | P0 |
| Slightly over (+5) | 45 pts, 40 req | ~0.96 | P0 |
| Significantly over (+15) | 45 pts, 30 req | ~0.84 | P0 |
| Near miss (-2) | 38 pts, 40 req | ~0.84 | P0 |
| Far miss (-10) | 30 pts, 40 req | ~0.53 | P1 |
| Minimum threshold | 24 pts, 40 req | 0.30 | P1 |
| 1 pt above vs 1 pt below | Compare results | Above > Below | P0 |
| Monotonicity check | Range 24-45, req=38 | Scores increase monotonically until optimal | P1 |

---

#### Task 1.3: Implement Selectivity Boost

**Description:** Add selectivity tier calculation and boost for high-achieving students.

**Files to Create:**
- `lib/matching/selectivity.ts`
- `lib/matching/selectivity.test.ts`

**Implementation:**
```typescript
export function calculateSelectivityTier(requiredPoints: number): 1 | 2 | 3 | 4 {
  if (requiredPoints >= 40) return 1  // Highly selective
  if (requiredPoints >= 36) return 2  // Selective
  if (requiredPoints >= 32) return 3  // Moderately selective
  return 4                             // Standard
}

export function applySelectivityBoost(
  baseScore: number,
  studentPoints: number,
  programTier: 1 | 2 | 3 | 4
): number {
  const HIGH_ACHIEVER_THRESHOLD = 38
  
  if (studentPoints < HIGH_ACHIEVER_THRESHOLD) {
    return baseScore
  }
  
  const TIER_BOOSTS: Record<1 | 2 | 3 | 4, number> = {
    1: 0.05,
    2: 0.03,
    3: 0.01,
    4: 0.00
  }
  
  return Math.min(1.0, baseScore + TIER_BOOSTS[programTier])
}
```

**Expected Outcomes:**
- [ ] Programs correctly classified into tiers 1-4
- [ ] High achievers (38+) receive tier-appropriate boosts
- [ ] Average students receive no boost
- [ ] Scores never exceed 1.0 after boost

**Tests:**
| Test Case | Input | Expected Output | Priority |
|-----------|-------|-----------------|----------|
| Tier 1 classification | 42 req pts | Tier 1 | P0 |
| Tier 2 classification | 38 req pts | Tier 2 | P0 |
| Tier 3 classification | 34 req pts | Tier 3 | P0 |
| Tier 4 classification | 28 req pts | Tier 4 | P0 |
| High achiever boost Tier 1 | 42 pts, 0.85 base, Tier 1 | 0.90 | P0 |
| High achiever boost Tier 4 | 42 pts, 0.85 base, Tier 4 | 0.85 | P0 |
| Average student no boost | 35 pts, 0.85 base, Tier 1 | 0.85 | P0 |
| Cap at 1.0 | 42 pts, 0.98 base, Tier 1 | 1.00 | P1 |

---

#### Task 1.4: Implement Anti-Gaming Measures

**Description:** Add explicit preference validation and adjusted scoring for "open to all" selections.

**Files to Modify:**
- `lib/matching/field-matcher.ts`
- `lib/matching/location-matcher.ts`
- `lib/matching/types.ts`

**Files to Create:**
- `lib/matching/preference-validator.ts`

**Expected Outcomes:**
- [ ] Students must explicitly choose "open to all" vs leaving empty
- [ ] "Open to all fields" scores 0.70 (not 1.0)
- [ ] "Open to all locations" scores 0.85 (not 1.0)
- [ ] Validation errors for invalid preference combinations

**Tests:**
| Test Case | Input | Expected Output | Priority |
|-----------|-------|-----------------|----------|
| Explicit field match | prefs: ['Engineering'], program: 'Engineering' | 1.00 | P0 |
| Open to all fields | openToAllFields: true | 0.70 | P0 |
| No prefs, not explicit | prefs: [], openToAllFields: false | ValidationError | P0 |
| Explicit location match | prefs: ['UK'], program: 'UK' | 1.00 | P0 |
| Open to all locations | openToAllLocations: true | 0.85 | P0 |
| Field mismatch | prefs: ['Engineering'], program: 'Medicine' | 0.00 | P0 |

---

### Phase 2: Core Logic (Week 2-3)

---

#### Task 2.1: Implement Unified Penalty System

**Description:** Replace 6 sequential penalty adjustments with single unified calculation.

**Files to Create:**
- `lib/matching/unified-penalties.ts`
- `lib/matching/unified-penalties.test.ts`

**Files to Modify:**
- `lib/matching/penalties.ts` (deprecate old functions)
- `lib/matching/scorer.ts` (switch to new system)

**Expected Outcomes:**
- [ ] Single function replaces multiple sequential calls
- [ ] Order-independent results
- [ ] Same or better score accuracy vs current implementation
- [ ] Clear penalty breakdown in result object

**Tests:**
| Test Case | Current Score | New Score | Acceptable Variance |
|-----------|---------------|-----------|---------------------|
| Full match, no penalties | 1.00 | 1.00 | 0% |
| Points shortfall only | 0.85 | 0.82-0.88 | ±5% |
| Missing critical subject | ≤0.45 | ≤0.45 | 0% on cap |
| Multiple issues | Varies | Similar | ±10% |
| Edge case: conflicting adjustments | Complex | Consistent | N/A |

**Additional Tests:**
| Test Case | Expected | Priority |
|-----------|----------|----------|
| penaltyBreakdown includes all applied penalties | Array of penalty objects | P0 |
| effectiveCap is minimum of all applicable caps | Correct cap value | P0 |
| Floor of 0.15 never breached | Score >= 0.15 | P0 |

---

#### Task 2.2: Implement Match Categorization

**Description:** Add SAFETY/MATCH/REACH/UNLIKELY categorization to match results.

**Files to Create:**
- `lib/matching/categorization.ts`
- `lib/matching/categorization.test.ts`

**Files to Modify:**
- `lib/matching/types.ts` (add MatchCategory type)
- `lib/matching/scorer.ts` (include category in result)

**Implementation:**
```typescript
export type MatchCategory = 'SAFETY' | 'MATCH' | 'REACH' | 'UNLIKELY'

export function categorizeMatch(
  student: StudentProfile,
  program: ProgramRequirements,
  matchScore: number
): MatchCategory {
  const pointsMargin = student.totalPoints - program.requiredPoints
  const meetsAllSubjects = checkAllSubjectRequirements(student, program)
  
  if (matchScore >= 0.92 && pointsMargin >= 5 && meetsAllSubjects) {
    return 'SAFETY'
  }
  if (matchScore >= 0.78 && pointsMargin >= 0 && meetsAllSubjects) {
    return 'MATCH'
  }
  if (matchScore >= 0.55 || (pointsMargin >= -3 && matchScore >= 0.45)) {
    return 'REACH'
  }
  return 'UNLIKELY'
}
```

**Expected Outcomes:**
- [ ] Every match result includes a category
- [ ] Categories align with user expectations (SAFETY = high confidence)
- [ ] UI can display category badges

**Tests:**
| Test Case | Points Margin | Score | Meets Subjects | Expected Category |
|-----------|--------------|-------|----------------|-------------------|
| Strong fit | +7 | 0.95 | Yes | SAFETY |
| Good fit | +2 | 0.85 | Yes | MATCH |
| Aspirational | -2 | 0.65 | Partial | REACH |
| Significant gaps | -8 | 0.40 | No | UNLIKELY |
| Edge: score high but missing subjects | +5 | 0.90 | No | MATCH (not SAFETY) |

---

#### Task 2.3: Implement Confidence Scoring

**Description:** Add confidence indicator showing match prediction reliability.

**Files to Create:**
- `lib/matching/confidence.ts`
- `lib/matching/confidence.test.ts`

**Expected Outcomes:**
- [ ] Confidence levels: 'high' | 'medium' | 'low'
- [ ] Factors array explains confidence reduction reasons
- [ ] Confidence score (0-1) for programmatic use

**Tests:**
| Test Case | Confidence Score | Level | Priority |
|-----------|-----------------|-------|----------|
| All data complete, verified program | 1.0 | high | P0 |
| Predicted grades (not final) | 0.92 | high | P1 |
| Missing some subject grades | 0.85 | medium | P1 |
| Incomplete program requirements | 0.88 | high | P1 |
| Multiple data gaps | < 0.70 | low | P1 |
| Factors array populated correctly | Contains relevant strings | P0 |

---

### Phase 3: Performance Optimizations (Week 3-4)

---

#### Task 3.1: Implement StudentCapabilityVector

**Description:** Create precomputed data structure for O(1) subject lookups.

**Files to Create:**
- `lib/matching/student-capability-vector.ts`
- `lib/matching/student-capability-vector.test.ts`

**Expected Outcomes:**
- [ ] O(1) subject lookup by name and level
- [ ] O(1) subject lookup by name only (preferring HL)
- [ ] Cached computed properties (maxHLGrade, etc.)
- [ ] Memory efficient (Map-based)

**Tests:**
| Test Case | Method | Expected | Priority |
|-----------|--------|----------|----------|
| Get Math HL | getSubject('Math', 'HL') | { name, grade, level } | P0 |
| Get Math SL when has HL | getSubject('Math', 'SL') | null | P0 |
| Get any level, has HL | getSubjectAnyLevel('Math') | HL version | P0 |
| Get non-existent subject | getSubject('Biology', 'HL') | null | P0 |
| hasSubjectAtLevel HL required | hasSubjectAtLevel('Math', 'HL') | true/false | P0 |
| Performance: 1000 lookups | Time < 1ms | Measure | P1 |

---

#### Task 3.2: Implement ProgramIndex

**Description:** Create index structure for fast candidate filtering.

**Files to Create:**
- `lib/matching/program-index.ts`
- `lib/matching/program-index.test.ts`

**Expected Outcomes:**
- [ ] 25x reduction in candidates (5000 → ~200)
- [ ] Index by points bucket, field, country, required subjects
- [ ] Invalidation function for cache refresh

**Tests:**
| Test Case | Input | Expected | Priority |
|-----------|-------|----------|----------|
| Filter by points ±10 | 40 pts student | Programs in 30-45 range | P0 |
| Filter by location | ['UK', 'Germany'] | UK + DE programs | P0 |
| Filter by field | ['Engineering'] | Engineering programs | P0 |
| Combined filtering | All params | Union of results | P0 |
| Candidate count | 5000 programs | 100-500 candidates | P0 |
| Index invalidation | Call invalidate | Next call rebuilds | P1 |

---

#### Task 3.3: Implement Memoization Layer

**Description:** Add caching for repeated calculations.

**Files to Create:**
- `lib/matching/memo-cache.ts`
- `lib/matching/memo-cache.test.ts`

**Expected Outcomes:**
- [ ] LRU eviction with configurable max size
- [ ] 98%+ cache hit rate for typical use cases
- [ ] 2x speedup for batch calculations

**Tests:**
| Test Case | Expected | Priority |
|-----------|----------|----------|
| Cache hit returns same value | Consistent | P0 |
| Cache miss calculates fresh | Correct value | P0 |
| LRU eviction works | Oldest entry removed | P1 |
| Hit rate measurement | > 90% for batch ops | P1 |

---

#### Task 3.4: Integrate Performance Optimizations

**Description:** Connect all Track B components into the main scoring flow.

**Files to Modify:**
- `lib/matching/scorer.ts`
- `lib/matching/index.ts`
- `app/api/students/matches/route.ts`

**Expected Outcomes:**
- [ ] Recommendation latency < 50ms (from ~1.2ms per program)
- [ ] Same match results as non-optimized version
- [ ] Feature flag for A/B testing

**Tests:**
| Test Case | Metric | Target | Priority |
|-----------|--------|--------|----------|
| End-to-end latency (5000 programs) | Time | < 100ms | P0 |
| Score equivalence check | Current vs New | Identical top-10 | P0 |
| Memory usage | Peak RAM | < 50MB additional | P1 |
| Concurrent requests (10 parallel) | All succeed | No errors | P1 |

---

### Phase 4: Integration & Deployment (Week 4-5)

---

#### Task 4.1: Update MatchResult Type and API Response

**Description:** Extend match result to include new fields.

**Files to Modify:**
- `lib/matching/types.ts`
- `app/api/students/matches/route.ts`
- `components/student/ProgramCard.tsx`
- `components/student/MatchBreakdown.tsx`

**New MatchResult Fields:**
```typescript
interface MatchResult {
  // Existing
  programId: string
  overallScore: number
  academicMatch: AcademicMatchResult
  locationMatch: ComponentScore
  fieldMatch: ComponentScore
  weightsUsed: WeightConfig
  adjustments: AdjustmentResult
  
  // New in V10
  category: MatchCategory        // SAFETY | MATCH | REACH | UNLIKELY
  confidence: ConfidenceResult   // { level, score, factors }
  fitQuality: {                  // Detailed fit breakdown
    pointsFit: number
    selectivityBoost: number
    effectiveTier: 1 | 2 | 3 | 4
  }
}
```

**Expected Outcomes:**
- [ ] API returns new fields
- [ ] UI displays category badges
- [ ] Confidence indicator shown to users

**Tests:**
| Test Case | Expected | Priority |
|-----------|----------|----------|
| API response includes category | Valid category string | P0 |
| API response includes confidence | Valid confidence object | P0 |
| UI renders category badge | Badge visible | P0 |
| Backward compatibility | Old clients don't break | P0 |

---

#### Task 4.2: Feature Flag Implementation

**Description:** Add feature flags for gradual rollout.

**Files to Create:**
- `lib/feature-flags/matching-v10.ts`

**Flags:**
- `MATCHING_V10_FIT_QUALITY`: Enable Fit Quality Score
- `MATCHING_V10_SELECTIVITY`: Enable selectivity boost  
- `MATCHING_V10_ANTI_GAMING`: Enable anti-gaming measures
- `MATCHING_V10_PERFORMANCE`: Enable performance optimizations
- `MATCHING_V10_FULL`: Enable all V10 features

**Expected Outcomes:**
- [ ] Each feature independently toggleable
- [ ] Flags configurable via environment variables
- [ ] A/B testing support (percentage rollout)

**Tests:**
| Test Case | Expected | Priority |
|-----------|----------|----------|
| Flag disabled: old behavior | V9 scoring | P0 |
| Flag enabled: new behavior | V10 scoring | P0 |
| Percentage rollout | Consistent per-user | P1 |

---

#### Task 4.3: Monitoring and Metrics

**Description:** Add observability for algorithm performance and quality.

**Metrics to Track:**
- `matching.latency_ms` - Request latency histogram
- `matching.candidate_count` - Programs evaluated per request
- `matching.cache_hit_rate` - Memoization effectiveness
- `matching.category_distribution` - SAFETY/MATCH/REACH/UNLIKELY counts
- `matching.high_achiever_fit` - Score variance for 40+ point students

**Expected Outcomes:**
- [ ] Metrics exported to logging system
- [ ] Dashboard showing algorithm health
- [ ] Alerts for latency/quality regression

---

#### Task 4.4: Documentation Update

**Description:** Update all related documentation.

**Files to Create/Update:**
- `docs/matching/DOC_2_matching-algo X.md` (new algorithm doc)
- `docs/matching/CHANGELOG.md` (version history)

**Files to Update:**
- `lib/matching/scorer.ts` (header comments)
- `lib/matching/README.md` (if exists)

**Expected Outcomes:**
- [ ] DOC_2_matching-algo X.md is complete and accurate
- [ ] Code comments reference correct algorithm version
- [ ] Changelog documents all changes

---

## Rollout Plan

### Stage 1: Internal Testing (Week 5, Day 1-2)
- Deploy to staging environment
- All feature flags OFF
- Run automated test suite
- Manual QA testing

### Stage 2: Canary Deployment (Week 5, Day 3-4)
- Enable for 5% of users
- Monitor metrics
- Compare scores between V9 and V10 cohorts

### Stage 3: Gradual Rollout (Week 5, Day 5 - Week 6)
- 5% → 25% → 50% → 100%
- Monitor for regressions
- Collect user feedback

### Rollback Plan
1. Disable feature flags immediately
2. Verify V9 behavior restored
3. Investigate root cause
4. Fix and re-attempt rollout

---

## Success Criteria

| Metric | Target | Measurement |
|--------|--------|-------------|
| High-achiever recommendation quality | Top-5 avg tier < 2.5 | A/B test comparison |
| Recommendation latency | < 100ms p95 | Metrics dashboard |
| Score accuracy | 100% parity with spec | Unit tests |
| Zero regressions | No P0/P1 bugs | QA sign-off |
| User satisfaction | No negative feedback spike | Support tickets |

---

## Appendix: File Change Summary

### New Files
- `lib/matching/fit-quality.ts`
- `lib/matching/selectivity.ts`
- `lib/matching/preference-validator.ts`
- `lib/matching/unified-penalties.ts`
- `lib/matching/categorization.ts`
- `lib/matching/confidence.ts`
- `lib/matching/student-capability-vector.ts`
- `lib/matching/program-index.ts`
- `lib/matching/memo-cache.ts`
- `lib/feature-flags/matching-v10.ts`
- `docs/matching/DOC_2_matching-algo X.md`
- `docs/matching/CHANGELOG.md`
- All corresponding `.test.ts` files

### Modified Files
- `prisma/schema.prisma`
- `lib/matching/types.ts`
- `lib/matching/scorer.ts`
- `lib/matching/academic-matcher.ts`
- `lib/matching/field-matcher.ts`
- `lib/matching/location-matcher.ts`
- `lib/matching/penalties.ts`
- `lib/matching/index.ts`
- `app/api/students/matches/route.ts`
- `components/student/ProgramCard.tsx`
- `components/student/MatchBreakdown.tsx`

---

*Document End*
