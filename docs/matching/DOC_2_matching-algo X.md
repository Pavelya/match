# IB Match – University Program Matching Algorithm (Version X)

**Version:** X (10.0)  
**Supersedes:** Version IX  
**Date:** December 2024  
**Status:** Specification Complete

---

## Overview

This algorithm computes a **compatibility score** (0 to 1) between a student's IB profile and a university program. A higher score means a better fit. Unlike previous versions, Version X introduces **Fit Quality Scoring** to differentiate between students who meet requirements and students who are optimally matched.

The score is based on three factors:

- **Academic Match (G_M):** How well the student's IB points and subjects meet the program's requirements, with consideration for both under-qualification and over-qualification.
- **Location Match (L_M):** Whether the program's country is among the student's preferred locations.
- **Field Match (F_M):** Whether the program's field of study is among the student's preferred fields.

These combine into an overall score:

$$M = w_G \times G_M + w_L \times L_M + w_F \times F_M$$

**Default weights:** $w_G=0.6$, $w_L=0.3$, $w_F=0.1$ (emphasizing academics). 

If a student has **no location preference** (and has not explicitly selected "open to all"), we set $w_L=0$ and redistribute:
- $w_G=0.75$, $w_F=0.25$

All weights sum to 1.

---

## Key Changes from Version IX

| Aspect | Version IX | Version X |
|--------|-----------|-----------|
| Points matching | Binary (meet = 1.0, below = scaled) | Fit Quality curve with optimal zone |
| Over-qualification | Treated as 1.0 (same as exact match) | Mild penalty (0.80-1.00) |
| No preferences | Implicit handling | Requires explicit "open to all" selection |
| Penalties | 6 sequential adjustments | Single unified calculation |
| Output | Score only | Score + Category + Confidence |
| Subject surplus | Ignored | Bonus (+0.02 per grade, max +0.05) |

---

## Field Match (F_M)

This measures how the program's field aligns with the student's interests.

### Explicit Preference Match
- **Exact Match:** If the program's field is one of the student's preferred fields: $F_M = 1.0$
- **Mismatch:** If the student has preferred fields and the program's field is not among them: $F_M = 0.0$

### Open to All Fields (Anti-Gaming)
- If the student explicitly selects "Open to all fields": $F_M = 0.70$
- This prevents gaming by leaving preferences empty while still showing all programs.

### Validation Requirement
Students **must** either:
1. Select at least 1 field of study preference, OR
2. Explicitly check "Open to all fields"

Empty preferences without explicit acknowledgment result in a validation error.

---

## Location Match (L_M)

This reflects the student's country preferences.

### Explicit Preference Match
- **Preferred Country:** If the program's country is on the student's list: $L_M = 1.0$
- **Not Preferred:** If the student has preferences and the program's country is not on the list: $L_M = 0.0$

### Open to All Locations (Anti-Gaming)
- If the student explicitly selects "Open to all locations": $L_M = 0.85$
- Higher than field (0.70) because location is often a secondary consideration.

### No Preference Without Explicit Opt-In
- If student has no location preferences and hasn't selected "open to all": $L_M = 0.60$
- Weight redistribution applies: $w_L = 0$, $w_G = 0.75$, $w_F = 0.25$

---

## Academic Match (G_M) – Fit Quality Scoring

**NEW in Version X:** Academic Match now includes **Fit Quality Scoring (FQS)** that creates a continuous curve rather than a binary threshold.

### Fit Quality Concept

The optimal match occurs when a student **slightly exceeds** requirements (providing a safety margin). Being significantly over-qualified suggests the program may not challenge the student appropriately.

```
Fit Quality Curve:

     1.0 │         ●●●●
         │       ●●    ●●
     0.9 │     ●●        ●●
         │   ●●            ●●
     0.8 │ ●●                ●●
         │●                    ●
     0.7 │                      
         └─────────────────────────
           Under   Optimal   Over
           -5 pts  +0-5 pts  +10+ pts
```

### Points Fit Quality Calculation

For a student with `studentPoints` and a program requiring `requiredPoints`:

```
OPTIMAL_BUFFER = 3 points
optimalPoints = requiredPoints + OPTIMAL_BUFFER

IF studentPoints < requiredPoints:
    # UNDER-QUALIFIED: Linear decay from 0.90 to floor of 0.30
    deficit = requiredPoints - studentPoints
    maxDeficit = requiredPoints - 24  # IB minimum diploma
    decayRate = 0.60 / maxDeficit
    pointsFit = max(0.30, 0.90 - (deficit × decayRate))

ELSE IF studentPoints ≤ optimalPoints:
    # OPTIMAL ZONE: Scale from 0.95 to 1.00
    surplus = studentPoints - requiredPoints
    pointsFit = 0.95 + (surplus / OPTIMAL_BUFFER) × 0.05

ELSE:
    # OVER-QUALIFIED: Gentle decay from 1.00 to floor of 0.80
    overAmount = studentPoints - optimalPoints
    maxOver = 45 - optimalPoints  # IB maximum
    decayRate = 0.20 / maxOver
    pointsFit = max(0.80, 1.00 - (overAmount × decayRate))
```

### Example Fit Quality Scores

| Student Points | Required Points | Fit Quality | Interpretation |
|---------------|-----------------|-------------|----------------|
| 43 | 40 | 1.00 | Optimal (+3 buffer) |
| 40 | 40 | 0.95 | Exactly meeting (no buffer) |
| 45 | 40 | 0.96 | Slightly over-qualified |
| 45 | 35 | 0.87 | Notably over-qualified |
| 45 | 28 | 0.81 | Significantly over-qualified |
| 38 | 40 | 0.84 | Near miss (-2) |
| 35 | 40 | 0.71 | Moderate shortfall (-5) |
| 30 | 40 | 0.53 | Significant shortfall (-10) |

---

## Programs with Subject Requirements

For programs with specific subject requirements:

### 1. Calculate Subject Requirements Score

For each required subject (or OR-group), compute a subject score (0 to 1). Let **subjectsMatchScore** be the average of these scores.

### 2. Combine with Points Fit Quality

$$G_M = 0.70 \times \text{subjectsMatchScore} + 0.30 \times \text{pointsFitQuality}$$

This gives subjects primary importance while ensuring points fit quality also influences the score.

### 3. Apply Unified Penalties

See "Unified Penalty System" section below.

---

## Programs with Only IB Points Requirement

If there are no subject requirements:

$$G_M = \text{pointsFitQuality}$$

The Fit Quality Score directly becomes the academic match score.

---

## Subject Requirement Matching

When programs require specific IB subjects, we compute each required subject's score with **surplus recognition**.

### Full Credit (1.0)
If the student took the subject at the required level or higher AND earned at least the minimum grade.

### Exceeds Requirement (1.0 - 1.05) **[NEW]**
If the student exceeds the grade requirement:
- Bonus: +0.02 per grade point above requirement
- Maximum bonus: +0.05
- Example: Required 5, student has 7 → 1.0 + (2 × 0.02) = 1.04

### Partial Credit (0.25 - 0.99)
If the student took the subject but did not fully meet the requirement:

#### Grade Shortfall (Same Level)
```
IF deficit = 1 AND isCritical:
    subjectScore = 0.85  # Near-miss bonus for critical subjects
ELSE:
    baseScore = studentGrade / requiredGrade
    subjectScore = max(0.25, baseScore × 0.90)
```

#### Level Mismatch (SL for HL Required)
- Treat SL 7 as roughly equivalent to HL 5
- Apply 0.8 multiplier and cap at 0.80

```
equivalentHLGrade = max(1, studentGrade - 2)
baseScore = equivalentHLGrade / requiredGrade
subjectScore = max(0.25, min(0.80, baseScore × 0.8))
```

### No Credit (0.0)
If the student did not take the subject at all.

### OR-Group Requirements

For requirements allowing alternatives (e.g., "Physics OR Chemistry"):

1. **Full Match (1.0+):** If any option is fully met (or exceeded)
2. **Partial Match:** Take the highest partial score among options
3. **No Match (0):** If none of the listed subjects were taken

---

## Program Selectivity Tiers **[NEW]**

Programs are classified into selectivity tiers based on required points:

| Tier | Required Points | Description |
|------|-----------------|-------------|
| 1 | 40+ | Highly Selective |
| 2 | 36-39 | Selective |
| 3 | 32-35 | Moderately Selective |
| 4 | 24-31 | Standard |

### Selectivity Boost for High Achievers

Students with 38+ total points receive a small boost for choosing appropriately challenging programs:

| Tier | Boost |
|------|-------|
| 1 (Highly Selective) | +0.05 |
| 2 (Selective) | +0.03 |
| 3 (Moderately Selective) | +0.01 |
| 4 (Standard) | +0.00 |

The boost is applied after all other scoring and capped at 1.0:

```
IF studentPoints ≥ 38:
    finalScore = min(1.0, rawScore + TIER_BOOST[tier])
ELSE:
    finalScore = rawScore
```

---

## Unified Penalty System **[NEW]**

Version X replaces the previous 6 sequential penalty adjustments with a **single unified calculation**.

### Penalty Collection

```
penalties = []
caps = []

# 1. Points shortfall penalty
IF studentPoints < requiredPoints:
    shortfall = requiredPoints - studentPoints
    penalties.add({
        type: 'points_shortfall',
        value: shortfall × 0.025  # 2.5% per point
    })
    caps.add({ type: 'points_unmet', value: 0.90 })

# 2. Missing/low requirements penalty
missing = count of requirements not taken
low = count of requirements partially met
total = total requirements

IF missing > 0 OR low > 0:
    missingPenalty = (missing / total) × 0.30  # Up to 30%
    lowPenalty = (low / total) × 0.15          # Up to 15%
    penalties.add({
        type: 'requirement_gaps',
        value: missingPenalty + lowPenalty
    })

# 3. Critical subject issues
IF criticalSubjectMissing:
    caps.add({ type: 'critical_missing', value: 0.45 })
ELSE IF criticalSubjectLargeMiss:
    caps.add({ type: 'critical_large_miss', value: 0.60 })
ELSE IF criticalSubjectNearMiss:
    caps.add({ type: 'critical_near_miss', value: 0.80 })
```

### Application

```
totalPenalty = sum(penalty.value for penalty in penalties)
penalizedScore = rawScore × (1 - min(totalPenalty, 0.60))

effectiveCap = min(cap.value for cap in caps) if caps else 1.0
cappedScore = min(penalizedScore, effectiveCap)

finalScore = max(0.15, cappedScore)  # Floor: 15% minimum
```

### Penalty Breakdown

The result includes a detailed breakdown for transparency:
```
{
    adjustedScore: 0.72,
    appliedPenalties: [
        { type: 'points_shortfall', value: 0.075, description: '3 points below' },
        { type: 'requirement_gaps', value: 0.15, description: '1 missing, 1 partial' }
    ],
    effectiveCap: 0.90,
    caps: [{ type: 'points_unmet', value: 0.90 }]
}
```

---

## Match Categorization **[NEW]**

Each match is categorized to help students understand their chances:

| Category | Criteria | Meaning |
|----------|----------|---------|
| **SAFETY** | Score ≥ 0.92, points +5, all subjects met | Strong position, high confidence |
| **MATCH** | Score ≥ 0.78, points ≥ 0, all subjects met | Good fit, reasonable chance |
| **REACH** | Score ≥ 0.55, OR (points ≥ -3 AND score ≥ 0.45) | Aspirational but achievable |
| **UNLIKELY** | Below REACH thresholds | Significant gaps exist |

```
IF score ≥ 0.92 AND pointsMargin ≥ 5 AND meetsAllSubjects:
    category = 'SAFETY'
ELSE IF score ≥ 0.78 AND pointsMargin ≥ 0 AND meetsAllSubjects:
    category = 'MATCH'
ELSE IF score ≥ 0.55 OR (pointsMargin ≥ -3 AND score ≥ 0.45):
    category = 'REACH'
ELSE:
    category = 'UNLIKELY'
```

---

## Confidence Scoring **[NEW]**

Each match includes a confidence indicator showing prediction reliability:

### Confidence Factors

| Factor | Impact | Reason |
|--------|--------|--------|
| Predicted grades (not final) | ×0.92 | Grades may change |
| Missing subject grades | ×0.85 | Incomplete profile |
| Unverified program requirements | ×0.88 | Data may be outdated |
| Multiple OR-groups (>2) | ×0.95 | More uncertainty in matching |

### Confidence Levels

| Score | Level | Meaning |
|-------|-------|---------|
| ≥ 0.85 | High | Reliable prediction |
| 0.70 - 0.84 | Medium | Some uncertainty |
| < 0.70 | Low | Significant data gaps |

### Confidence Output

```
{
    level: 'high',
    score: 0.92,
    factors: ['Using predicted grades (not final)']
}
```

---

## Mode-Specific Weighting

The platform supports different weight configurations:

| Mode | w_G | w_L | w_F | Best For |
|------|-----|-----|-----|----------|
| Academic-Focused | 0.80 | 0.10 | 0.10 | Students prioritizing admission |
| Location-Focused | 0.40 | 0.50 | 0.10 | Students with strong location preference |
| Balanced (Default) | 0.60 | 0.30 | 0.10 | General use |

All modes apply the same Fit Quality, penalties, and caps; only weight proportions change.

---

## Complete Algorithm Flow

```
1. VALIDATE preferences (anti-gaming)
   - Ensure explicit field selection OR "open to all"
   - Ensure explicit location selection OR "open to all" OR empty (with redistribution)

2. CALCULATE Field Match (F_M)
   - Explicit match: 1.0
   - Open to all: 0.70
   - Mismatch: 0.0

3. CALCULATE Location Match (L_M)
   - Explicit match: 1.0
   - Open to all: 0.85
   - No preference (not explicit): 0.60
   - Mismatch: 0.0

4. CALCULATE Academic Match (G_M)
   IF program has subject requirements:
       a. Calculate each subject/group score (with surplus bonus)
       b. Average to get subjectsMatchScore
       c. Calculate pointsFitQuality
       d. G_M = 0.70 × subjectsMatchScore + 0.30 × pointsFitQuality
   ELSE:
       G_M = pointsFitQuality

5. DETERMINE weights
   IF student has no location preference:
       weights = { academic: 0.75, location: 0.0, field: 0.25 }
   ELSE:
       weights = mode-specific weights

6. CALCULATE weighted score
   rawScore = w_G × G_M + w_L × L_M + w_F × F_M

7. APPLY unified penalties
   - Collect all penalty factors
   - Collect all caps
   - Apply penalties (max 60% reduction)
   - Apply caps (lowest cap wins)
   - Apply floor (minimum 0.15)

8. APPLY selectivity boost (if student ≥ 38 points)
   finalScore = min(1.0, penalizedScore + tierBoost)

9. CALCULATE confidence
   - Multiply factors for data completeness
   - Determine level: high/medium/low

10. CATEGORIZE match
    - SAFETY / MATCH / REACH / UNLIKELY

11. RETURN complete result
    {
        score: 0.87,
        category: 'MATCH',
        confidence: { level: 'high', score: 0.92, factors: [...] },
        breakdown: { academic: 0.85, location: 1.0, field: 1.0 },
        fitQuality: { pointsFit: 0.95, selectivityBoost: 0.03, tier: 2 },
        penalties: [...],
        caps: [...]
    }
```

---

## Examples and Edge Cases

### Example 1: High Achiever Finding Optimal Match

**Student:** 44 points, Math HL 7, Physics HL 7, Chemistry HL 6, prefers Engineering in UK

**Program A:** Requires 42 points, Math HL 6, Physics HL 6, Engineering, UK
- Points fit: 0.98 (44 vs 42+3 optimal = 45, slightly under optimal)
- Subject scores: Math 1.02 (surplus), Physics 1.02 (surplus), avg = 1.02
- G_M = 0.70 × 1.02 + 0.30 × 0.98 = 1.01 (capped to 1.0)
- L_M = 1.0, F_M = 1.0
- Raw = 0.6 × 1.0 + 0.3 × 1.0 + 0.1 × 1.0 = 1.0
- Selectivity boost: Tier 1 (+0.05), but already at 1.0
- **Final: 1.0, Category: SAFETY**

**Program B:** Requires 28 points, no specific subjects, Engineering, UK
- Points fit: 0.81 (significantly over-qualified)
- G_M = 0.81
- L_M = 1.0, F_M = 1.0
- Raw = 0.6 × 0.81 + 0.3 × 1.0 + 0.1 × 1.0 = 0.886
- Selectivity boost: Tier 4 (+0.00)
- **Final: 0.89, Category: MATCH**

**Result:** Program A (1.0) ranks higher than Program B (0.89), guiding the high achiever toward an appropriately challenging program.

### Example 2: Near-Miss Student

**Student:** 38 points, Math HL 5, prefers Computer Science in Germany

**Program:** Requires 40 points, Math HL 6, Computer Science, Germany
- Points fit: 0.84 (2 points short)
- Subject score: Math 0.85 (critical near-miss)
- G_M = 0.70 × 0.85 + 0.30 × 0.84 = 0.85
- L_M = 1.0, F_M = 1.0
- Raw = 0.6 × 0.85 + 0.3 × 1.0 + 0.1 × 1.0 = 0.91
- Penalties: points_shortfall (0.05), critical_near_miss cap (0.80)
- **Final: 0.80, Category: REACH**

### Example 3: Open to All Locations

**Student:** 40 points, explicitly selected "Open to all locations", prefers Business

**Program:** Requires 38 points, Business, Netherlands
- Points fit: 0.98 (2 above required, near optimal)
- G_M = 0.98
- L_M = 0.85 (open to all)
- F_M = 1.0 (explicit match)
- Raw = 0.6 × 0.98 + 0.3 × 0.85 + 0.1 × 1.0 = 0.94
- Selectivity boost: 38 pts = Tier 2 (+0.03), but student is 40 = high achiever
- **Final: 0.97, Category: SAFETY**

### Example 4: Missing Critical Subject

**Student:** 42 points, has Biology HL 7, Chemistry HL 6, no Physics

**Program:** Requires 40 points, Physics HL 5 (critical), Engineering, UK
- Points fit: 0.98
- Subject score: Physics = 0 (missing critical)
- G_M = 0.70 × 0 + 0.30 × 0.98 = 0.29
- L_M = 1.0, F_M = 1.0
- Raw = 0.6 × 0.29 + 0.3 × 1.0 + 0.1 × 1.0 = 0.57
- Cap: critical_missing = 0.45
- **Final: 0.45, Category: REACH**

---

## Performance Considerations

Version X includes performance optimizations for scale:

### StudentCapabilityVector
Precomputed data structure for O(1) subject lookups instead of O(n) array searches.

### ProgramIndex
Index structure enabling fast candidate filtering (5000 → ~200 programs).

### Memoization
Caching for repeated calculations (points fit, subject scores) with 98%+ hit rate.

### Expected Performance
- Candidate filtering: 25x reduction
- Per-match calculation: ~0.1ms (down from ~1.2ms)
- Full recommendation (5000 programs): < 100ms

---

## Appendix A: Configuration Constants

```
# Fit Quality
OPTIMAL_BUFFER = 3           # Points above required for optimal fit
UNDER_QUALIFIED_FLOOR = 0.30 # Minimum score for under-qualified
OVER_QUALIFIED_FLOOR = 0.80  # Minimum score for over-qualified

# Selectivity
HIGH_ACHIEVER_THRESHOLD = 38
TIER_BOOSTS = { 1: 0.05, 2: 0.03, 3: 0.01, 4: 0.00 }

# Anti-Gaming
OPEN_TO_ALL_FIELD_SCORE = 0.70
OPEN_TO_ALL_LOCATION_SCORE = 0.85
NO_PREFERENCE_LOCATION_SCORE = 0.60

# Penalties
MAX_PENALTY_REDUCTION = 0.60  # Maximum 60% penalty
SCORE_FLOOR = 0.15            # Minimum possible score

# Subject Scoring
SURPLUS_BONUS_PER_GRADE = 0.02
MAX_SURPLUS_BONUS = 0.05
CRITICAL_NEAR_MISS_SCORE = 0.85
GRADE_SHORTFALL_MULTIPLIER = 0.90
MINIMUM_SUBJECT_SCORE = 0.25
LEVEL_MISMATCH_MULTIPLIER = 0.80
LEVEL_MISMATCH_CAP = 0.80

# Caps
CAP_POINTS_UNMET = 0.90
CAP_CRITICAL_MISSING = 0.45
CAP_CRITICAL_LARGE_MISS = 0.60
CAP_CRITICAL_NEAR_MISS = 0.80

# Categorization
SAFETY_MIN_SCORE = 0.92
SAFETY_MIN_POINTS_MARGIN = 5
MATCH_MIN_SCORE = 0.78
REACH_MIN_SCORE = 0.55
REACH_NEAR_MISS_SCORE = 0.45
REACH_NEAR_MISS_POINTS = -3

# Confidence
PREDICTED_GRADES_FACTOR = 0.92
MISSING_GRADES_FACTOR = 0.85
UNVERIFIED_PROGRAM_FACTOR = 0.88
COMPLEX_REQUIREMENTS_FACTOR = 0.95
HIGH_CONFIDENCE_THRESHOLD = 0.85
MEDIUM_CONFIDENCE_THRESHOLD = 0.70
```

---

## Appendix B: API Response Format

```typescript
interface MatchResultV10 {
  programId: string
  
  // Core score
  overallScore: number  // 0.00 - 1.00
  
  // Categorization (NEW)
  category: 'SAFETY' | 'MATCH' | 'REACH' | 'UNLIKELY'
  
  // Confidence (NEW)
  confidence: {
    level: 'high' | 'medium' | 'low'
    score: number
    factors: string[]
  }
  
  // Component scores
  academicMatch: {
    score: number
    subjectsMatchScore: number
    pointsFitQuality: number
    subjectScores: Array<{
      requirement: string
      score: number
      status: 'met' | 'exceeded' | 'partial' | 'missing'
    }>
  }
  
  locationMatch: {
    score: number
    isExplicitMatch: boolean
    isOpenToAll: boolean
  }
  
  fieldMatch: {
    score: number
    isExplicitMatch: boolean
    isOpenToAll: boolean
  }
  
  // Fit Quality details (NEW)
  fitQuality: {
    pointsFit: number
    selectivityBoost: number
    effectiveTier: 1 | 2 | 3 | 4
  }
  
  // Weights used
  weightsUsed: {
    academic: number
    location: number
    field: number
  }
  
  // Penalty breakdown (NEW)
  adjustments: {
    rawScore: number
    finalScore: number
    appliedPenalties: Array<{
      type: string
      value: number
      description: string
    }>
    effectiveCap: number | null
    caps: Array<{
      type: string
      value: number
    }>
  }
}
```

---

## Appendix C: Migration Notes

### Breaking Changes
1. **Preference validation:** Students must now explicitly select "open to all" or choose preferences
2. **Score distribution shift:** High achievers will see lower scores for low-requirement programs
3. **New required fields:** API response includes `category`, `confidence`, `fitQuality`

### Backward Compatibility
- All existing fields remain in API response
- Old scoring logic available via feature flag during transition
- Database migration is additive (no data loss)

### Rollout Strategy
1. Deploy with feature flags disabled
2. Enable for 5% of users (A/B test)
3. Monitor metrics and gather feedback
4. Gradual rollout: 5% → 25% → 50% → 100%
5. Remove feature flags after 2 weeks at 100%

---

*Document End*
