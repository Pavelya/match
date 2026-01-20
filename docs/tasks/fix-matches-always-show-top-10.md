# Fix: Always Show Top 10 Programs on Matches Page

**Date:** 2026-01-20  
**Status:** Ready for Implementation  
**Priority:** High

---

## Problem Statement

Students with complete profiles sometimes see fewer than 10 programs on the `/student/matches` page, or no matches at all. The expected behavior is that **every student with a complete profile should always see exactly 10 program recommendations**, even if the match scores are low.

---

## Root Cause Analysis

### Investigation Findings

The matching pipeline has a **performance optimization** that filters programs BEFORE scoring, which can exclude valid candidates:

```
                                    ┌──────────────────────────────┐
                                    │  All Programs (5000+)        │
                                    └──────────────┬───────────────┘
                                                   │
                         ┌─────────────────────────▼─────────────────────────┐
                         │  program-index.ts: filterCandidates()             │
                         │  - Filters by student's field preferences         │
                         │  - Filters by student's country preferences       │
                         │  - Filters by IB points range (±10 margin)        │
                         │  - Uses INTERSECTION (programs must match ALL)    │
                         └─────────────┬───────────────────────────────────┬─┘
                                       │                                   │
                                       ▼                                   ▼
                        ┌──────────────────────────┐         ┌─────────────────────┐
                        │  < 10 candidates remain  │         │  ≥ 10 candidates    │
                        │  BUG: Shows fewer than   │         │  OK: Shows top 10   │
                        │  10 recommendations      │         │  recommendations    │
                        └──────────────────────────┘         └─────────────────────┘
```

### Problematic Code Locations

| File | Line Range | Issue |
|------|------------|-------|
| [optimized-matcher.ts](file:///Users/pavel/match/lib/matching/optimized-matcher.ts#L117-L142) | 117-142 | Pre-filters programs using `program-index` before scoring |
| [program-index.ts](file:///Users/pavel/match/lib/matching/program-index.ts#L292-L324) | 292-324 | `filterCombined()` uses set intersection - requires programs to match ALL criteria |

### Why Fewer Than 10 Matches Occur

1. **Field Preference Filtering**: If student selects a niche field (e.g., "Veterinary Science"), only programs in that field survive the filter
2. **Country Preference Filtering**: If student selects countries with few programs in the database
3. **IB Points Filtering**: The ±10 point margin can exclude programs outside the range
4. **Set Intersection**: All three filters are combined with AND logic - programs must match ALL criteria

### Example Scenario

A student with:
- Field: "Veterinary Science" (only 5 programs in DB)
- Countries: ["Ireland", "Netherlands"] (sparse coverage)
- IB Points: 35

The intersection might yield only 2-3 programs, even though the database has 5000+ programs.

---

## Solution Design

### Key Constraint: Do NOT Change Matching Algorithm

The matching algorithm (scoring, weights, penalties, categorization) must remain unchanged. We only modify the **candidate selection strategy** to ensure at least 10 candidates are always evaluated.

### Approach: Tiered Fallback Strategy

When the filtered candidate set has fewer than 10 programs, progressively relax filters to gather more candidates:

```
Tier 1: Apply all filters (field + country + points)
        └─ If < 10 candidates:
           
Tier 2: Relax IB points filter (increase margin)
        └─ If < 10 candidates:
           
Tier 3: Remove country filter, keep field + points
        └─ If < 10 candidates:
           
Tier 4: Remove field filter, keep country + points
        └─ If < 10 candidates:
           
Tier 5: Only points filter (wide margin)
        └─ If < 10 candidates:
           
Tier 6: No filtering (sample from all programs)
```

> [!IMPORTANT]
> The matching SCORES will still reflect true compatibility. A student who doesn't match well will see 10 programs with low scores (e.g., all categorized as "UNLIKELY"). This is the expected behavior per user requirements.

---

## Implementation Tasks

### Task 1: Update `optimized-matcher.ts` with Fallback Logic

**Goal:** Ensure `calculateOptimizedMatches()` always returns at least 10 candidates by implementing tiered filter relaxation.

**File:** [optimized-matcher.ts](file:///Users/pavel/match/lib/matching/optimized-matcher.ts)

**Changes:**

1. Add constant `MINIMUM_CANDIDATES = 10`
2. Modify the filtering logic (lines 115-142) to implement fallback tiers
3. If fewer than 10 candidates after all filters, progressively relax filters
4. Log which tier was used for debugging/monitoring

**Expected Outcome:**  
- The function always returns ≥10 results (or all programs if < 10 exist in DB)
- Filtering performance remains optimal since most students will still hit Tier 1
- No changes to scoring logic

---

### Task 2: Update `program-index.ts` to Support Filter Relaxation

**Goal:** Add methods to `ProgramIndex` that allow filtering with specific criteria disabled.

**File:** [program-index.ts](file:///Users/pavel/match/lib/matching/program-index.ts)

**Changes:**

1. Add new method `filterWithRelaxation(criteria, relaxOptions)` that can skip specific filters
2. Alternatively, modify `filterCombined()` to accept optional `skipField`, `skipCountry` flags
3. Add `filterByPointsOnly()` helper for fallback

**Expected Outcome:**  
- Index can be queried with different filter combinations
- No changes to existing functionality when relaxation is not needed

---

### Task 3: Update `cache.ts` Cache Key Strategy

**Goal:** Ensure cached results account for the relaxation tier used.

**File:** [cache.ts](file:///Users/pavel/match/lib/matching/cache.ts)

**Changes:**

1. Cache key should NOT include the relaxation tier - we want to cache the final result
2. Verify that cache invalidation works correctly when student preferences change

**Expected Outcome:**  
- Cache hits return correctly padded results
- No stale data issues

---

### Task 4: Add Monitoring and Logging

**Goal:** Track when fallback tiers are used to understand the scope of the issue.

**File:** [matching-metrics.ts](file:///Users/pavel/match/lib/matching/matching-metrics.ts)

**Changes:**

1. Add `fallbackTierUsed` field to metrics
2. Log when Tier 2+ is activated (for monitoring in production)

**Expected Outcome:**  
- Ability to monitor how often students hit fallback paths
- Data to inform future improvements (e.g., adding more programs in underserved areas)

---

### Task 5: Verify Existing Tests and Add New Tests

**Goal:** Ensure the fix works correctly and doesn't break existing functionality.

**Existing Test Files:**
- [optimized-matcher.verify.ts](file:///Users/pavel/match/lib/matching/optimized-matcher.verify.ts)
- [program-index.verify.ts](file:///Users/pavel/match/lib/matching/program-index.verify.ts)

**New Test Cases to Add:**

1. **Test: Sparse Field Preference**
   - Student with field preference matching only 3 programs
   - Assert: Returns 10 results (3 from preferred field + 7 from fallback)

2. **Test: Sparse Country Preference**  
   - Student with country preference matching only 5 programs
   - Assert: Returns 10 results

3. **Test: Empty Intersection**
   - Student with preferences that have zero intersection
   - Assert: Returns 10 results from fallback

4. **Test: Normal Case (No Fallback)**
   - Student with preferences matching 50+ programs
   - Assert: Performance is not degraded, returns top 10

---

## Non-Goals (Explicitly Out of Scope)

> [!CAUTION]
> The following must NOT be changed as per requirements:

1. **Matching Algorithm Scores** - The scoring formula, weights, penalties, and categorization logic must remain unchanged
2. **Algolia Integration** - Search functionality is separate and must not be affected
3. **Security** - No changes to authentication or authorization
4. **Performance** - The fix should not significantly impact response times for normal cases

---

## Verification Plan

### Automated Tests

Run the existing matching tests plus new test cases:

```bash
# Run matching algorithm tests
npx vitest run lib/matching/optimized-matcher.verify.ts
npx vitest run lib/matching/program-index.verify.ts
```

### Manual Verification

1. Create test student accounts with various edge-case profiles:
   - Student with niche field preference
   - Student with country preferences matching few programs
   - Student with preferences that score 0 for most programs

2. Verify each student sees exactly 10 programs on `/student/matches`

3. Verify scores are calculated correctly (low-matching programs should show low scores)

---

## Rollback Plan

If issues arise post-deployment:

1. Feature flag: Add `MATCHING_FALLBACK_ENABLED` flag (default: true)
2. If disabled, system reverts to current behavior
3. Monitor error rates and performance metrics for 24 hours before removing flag

---

## Files to Modify

| File | Change Type |
|------|-------------|
| `lib/matching/optimized-matcher.ts` | Modify |
| `lib/matching/program-index.ts` | Modify |
| `lib/matching/cache.ts` | Verify (may not need changes) |
| `lib/matching/matching-metrics.ts` | Modify |
| `lib/matching/optimized-matcher.verify.ts` | Add tests |
| `lib/matching/program-index.verify.ts` | Add tests |

---

## Success Criteria

1. ✅ Every student with a complete profile sees exactly 10 programs on the matches page
2. ✅ Match scores accurately reflect compatibility (low scores for poor matches is expected)
3. ✅ No changes to matching algorithm scoring logic
4. ✅ Existing tests pass
5. ✅ Performance remains acceptable (< 200ms for matches API)
6. ✅ No impact on Algolia search functionality
