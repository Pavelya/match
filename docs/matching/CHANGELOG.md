# Matching Algorithm Changelog

All notable changes to the matching algorithm are documented in this file.

---

## [2026-10-31] - Version XI.1: a fairer score (MAINT 5.43 Part A)

### Fixed

- **A bigger gap never scores higher.** The factor was 0.8 for 1 to 3 points short and $1 - d/m$ from 4,
  which starts above 0.8: with a minimum of 40, 5 short read 0.90 and 1 short 0.88. Every program now uses
  one curve, `pointsShortFactor`, $\max(0.5,\ 0.85 - 0.03(d-1))$, which does not read the minimum.
  Points-only programs had their own rule, which tied from 1 to 5 short and had a floor of 0.30. They
  follow the curve too.
- **Being open does not lower the number.** No fields gave F_M 0.5 with its weight kept. It now works as no
  countries does: F_M 1.0, $w_F=0$, the rest divided by their sum (0.667 and 0.333, or 1 with neither). A
  perfect match reads 100%, not 95% or 93%.

### What moves

- **No status, and no program joins or leaves a list.** `deriveMatchStatus` does not read the score. On the
  fingerprint every `status` is identical and no `optimized` line changes programs.
- **Fix 1, by kind:** with subjects, 1 and 2 short rise (0.88 to 0.90 and 0.892). From 3 short a score falls,
  or stays where a cap or the floor decides it. Points-only programs fall too. The exception in both is a
  total around half the minimum or less, which can rise to the curve's floor: on a points-only program
  that reads 0.5 where it could read 0.30.
- **Fix 2, by kind:** a program in the student's country, or with strong academics, rises. One outside it
  with weak academics can fall a little, because 0.05 of unearned field score goes. So a student with no
  fields can now score 0, on a program outside their countries, short on points and missing every subject,
  as a student with fields already could on one outside them. Caps and floors keep their values while the
  sum is rescaled, so a pair either side of a cap can swap: 14,608 of 1,596,000 fingerprint pairs, each with
  a cap, floor or penalty on one of the pair. A student with both lists keeps exactly 0.6, 0.3, 0.1.
- **Labels follow the score:** `category` and `categoryInfo` where a score crosses a line, and
  `selectivityBoost` by rounding or by the score. No screen reads them.

### Testing

- `academic-matcher.test.ts`: for minimums 24, 30, 36 and 45 and four shapes of program, the score falls or
  stays at each point from 1 to 21 short, is below 0 short, and does not depend on the minimum.
- `scorer.test.ts`, `match-why.test.ts` and `worked-examples.test.ts`: the curve's table, the four sets of
  weights, and the parts of the fit adding up to 100%.
- Seven made-up profiles on the real 1,676 programs, old against new: no status and no program changed, and
  the highest score at each shortfall, subjects met, now falls in every list.

### After merging

- Clear the cached matches once, with `clearAllMatchCache` (`docs/admin/maintenance-tools-guide.md`). Old
  values expire in 30 minutes anyway.

---

## [2026-10-30] - Coordinators see the list the student sees (MAINT 5.44)

### Changed

- **One path scores lists.** The coordinator student page, its matches page and analytics move from
  `getCachedMatches` to `getCachedMatchesV10`. A coordinator and a student share one cached value, about
  0.4 MB in place of 2.7 MB, so the list a student has just loaded costs a coordinator a cache hit.
- **The student's order.** `rankedResults` puts results in the order the new Matches page shows them: by
  status as `GROUPS` lists them, then `compareBestFit`. The top 3 and top 10 are now the first of the
  student's own list, not the highest scores in catalogue order.
- **No list without subjects.** A student without subjects has no list on Matches, so a coordinator gets
  none either, and nothing is computed or stored for them. The screens' empty states already say why.
- **Analytics reads a narrower set.** The chart still takes each student's highest score, now from their
  own list, not from all 1,676 programs. A student's bar moves only if their best score was outside it.
- **No score moved.** `score-fingerprint.ts` is byte-identical.

### Removed

- `getCachedMatches`, `getCachedMatch`, `getBatchCacheKey`, `invalidateProgramCache`, `getCacheStats` and
  the `match:` and `matches:` scans. A save now scans one pattern, not three. Old `matches:` values expire
  within 30 minutes.
- `GET /api/coordinator/analytics`, which nothing called. The analytics page computes its own figures.

### Testing

- `lib/matching/match-list.test.ts` holds `rankedResults` to the student's groups, flattened.
- `app/api/coordinator/students/[id]/matches/route.test.ts` holds the shared key, the cache hit after
  Matches, the order, and the refusals. `app/coordinator/students/[id]/page.test.tsx` renders the top 3.

---

## [2026-10-30] - A save no longer precomputes a list (MAINT 5.42)

### Removed

- **`POST /api/students/matches/precompute`**, the two calls to it from a profile save and a coordinator
  edit, `searchCandidatePrograms`, `isAlgoliaAvailable` and `INTERNAL_API_KEY`. The route stored its list
  under `matches:…`, with the count of an Algolia search, while Matches reads `matchesV10:…`. Only the
  coordinator pages could reach it, for a student with no fields or countries, and they compute the same
  list on a miss.
- **No score, list or order moved.** `invalidateStudentCache` still runs on a save, so Matches computes
  on the next load, as it did. Each save now costs one Algolia search, one programs read, one profile read,
  one rate-limit count and one Redis write less.

### Testing

- Both routes' tests hold that a save clears the student's cached matches and calls no other route.

---

## [2026-10-30] - Matches keeps every program a student qualifies for (MAINT 5.40)

### Changed

- **The points window has no lower end.** `filterByPointsRange` keeps every bucket from 0 up to the top
  of the window, in every tier, so a program far under the student's total is scored. A student on 36
  used to lose minimums under 25, which is why Matches found 2 where Explore found 8. "Meets all
  requirements" now holds the same programs as Explore with the same fields and countries and "Only
  ones I qualify for" on. `pointsMargin` now means how far above the total a minimum may be.
- **No score moved.** `score-fingerprint.ts` is byte-identical apart from its `optimized` lines, where
  18 of 60 students gain programs (257 in all), none lose one and none changes score.
- **Fewer students widen.** A student with enough programs under their total now stays in a lower tier.
  One who fell from tier 1 to tier 2 for lack of programs near their total no longer sees minimums more
  than about 10 over it, all of them gaps.
- **The list's last line** says "apart from those far above your total", not "near your total".

### Testing

- `lib/matching/worked-examples.test.ts` holds XI's worked examples to the code, row by row.
- `lib/explore/fit.test.ts` holds Matches to Explore for totals from 24 to 45.

---

## [2026-10-30] - Version XI of the algorithm document

### Documentation

- **`DOC_2_matching-algo XI.md` is the master version (owner, 30 October 2026).** It describes
  production, written from the code, and lists its known problems (MAINT 5.43). No score changed. Version X is kept, marked as a specification: most of it never reached the score.
  `calculateMatch` runs Version IX's core, and fit quality, selectivity, category and confidence are
  attached after scoring and read by no screen. XI adds what neither version had: courses of their own,
  the status, the order and the paths each caller takes.

---

## [2026-10-27] - "Two of" rules stored as two requirements (MAINT 5.39)

### Changed

- **47 more programs need two different subjects from a list**: McGill 13, Alberta 15, Waterloo 12,
  Trinity Physical Sciences and Physics, Imperial Geology, NUS Nursing, Leiden Science for Sustainable
  Societies (one HL and one SL), Lund Physical Geography and Ecosystem Science, Cambridge Natural Sciences.
  Each "two of" was stored once, so one subject met it; it is now two requirements marked `ownCourse`.
  At Alberta, Maths AA counts as Math 31, one of the list. `apply-2027-requirements.ts` now writes
  `ownCourse` too. Every other program's score is unchanged.

---

## [2026-10-27] - The first programs flagged (MAINT 5.18 step 5)

### Changed

- **18 programs need different subjects for their marked requirements.** Trinity Medicine and Dental
  Science (HL 6 and HL 5 in two of Biology, Chemistry, Physics), Manchester MBChB Medicine and UCL BSc
  Psychology (both science groups); Trinity's 13 science strands and Physiotherapy gained their second
  HL 5 group, both marked, so "two of" needs two subjects, not one. Written with
  `scripts/programs/refresh.ts`, which now reads, writes and backs up `ownCourse`. Every other program's
  score is unchanged.

---

## [2026-10-26] - Requirements that need a course of their own (MAINT 5.18)

### Added

- **`ProgramCourseRequirement.ownCourse`**, false by default. Within a program, the requirements
  that have it are each met by a different course ("HL 6 in one of Biology, Chemistry or Physics and
  HL 5 in another"); the others may share a course, as before. `lib/matching/own-course.ts` tries
  every assignment and keeps the one that meets the most, then scores highest, then meets the most
  demanding requirements, then keeps each on the course it uses alone. A marked requirement left
  without a course is not met and names the course used elsewhere (`courseUsedElsewhere`).
- **No score changed:** no program has the flag yet, and `scripts/score-fingerprint.ts` is
  byte-identical before and after. Which programs need it: `docs/matching/5.18-shared-courses.md`.

---

## [2026-01-27] - OR-Group Subject Display Fix

### Fixed

- **OR-Group Subject Display Bug**: Program cards and detail pages now correctly display the actual subject a student took when matching via OR-groups, instead of showing the first subject in the admin list.
  
  **Technical Changes:**
  - Enhanced `SubjectMatchDetail` type with `matchedCourseId` and `matchedCourseName` fields
  - Updated `calculateORGroupMatch()` to track which specific option matched
  - Fixed `processRequirementsForCardDisplay()` to use matched course data
  - Fixed `processRequirementsForDisplay()` to prioritize student's actual courses
  - Maintains backward compatibility with existing match results through fallback logic

  **Example:**
  - **Before:** Student took Computer Science → showed "Biology" (first in OR-group)
  - **After:** Student took Computer Science → correctly shows "Computer Science"

  **Files Modified:**
  - `lib/matching/types.ts` - Added optional fields to SubjectMatchDetail
  - `lib/matching/subject-matcher.ts` - Populate matched course tracking
  - `components/student/ProgramCard.tsx` - Display correct matched courses

---

## [V10] - 2024-12-20

### Added

#### Phase 1: Foundation
- **Task 1.1**: Fit Quality Score (FQS) - Continuous curve for points matching
  - Optimal zone (+0-3 above required): 0.95-1.00
  - Under-qualified penalty: 0.30-0.90
  - Over-qualified gentle decay: 0.80-1.00
- **Task 1.2**: Selectivity Boost - Rewards high achievers (38+ pts) for selective programs
  - Tier 1 (40+ pts): +5% boost
  - Tier 2 (36-39 pts): +3% boost
  - Tier 3 (32-35 pts): +1% boost
- **Task 1.3**: Anti-Gaming Measures - Protections against score manipulation
  - Diminishing returns for excessive subjects
  - Cross-validation checks
  - Field flooding prevention

#### Phase 2: Core Logic
- **Task 2.1**: Unified Penalty System - Consolidated penalty framework
  - Score caps for missing requirements
  - Compound penalties for multiple issues
  - Critical vs non-critical subject handling
- **Task 2.2**: Match Categorization - Clear match labels
  - SAFETY: Strong admission chances
  - MATCH: Good admission chances
  - REACH: Competitive admission
  - UNLIKELY: Low probability
- **Task 2.3**: Confidence Scoring - Data quality indicator
  - High/Medium/Low confidence levels
  - Factor-based scoring (predicted grades, missing subjects, etc.)

#### Phase 3: Performance Optimizations
- **Task 3.1**: StudentCapabilityVector - O(1) subject lookups
  - Map-based indexing for courses
  - Precomputed properties (hlCount, maxGrade, etc.)
- **Task 3.2**: ProgramIndex - Fast candidate filtering
  - Multi-dimensional indexing (points, field, country)
  - 5-25x candidate reduction
- **Task 3.3**: Memoization Cache - Repeated calculation caching
  - LRU eviction with configurable size
  - 80%+ cache hit rate
  - TTL support
- **Task 3.4**: Optimized Matcher - Integrated performance features
  - Combines all optimization components
  - 0.5ms for 200 programs
  - Score equivalence verified

#### Phase 4: Integration & Deployment
- **Task 4.1**: Enhanced Match Result - Extended API response
  - Added category, confidence, fitQuality fields
  - Backward compatible (additive fields)
- **Task 4.2**: Feature Flags - Gradual rollout support
  - 7 independent feature flags
  - Percentage-based rollout
  - Consistent user hashing
- **Task 4.3**: Monitoring and Metrics - Observability
  - Latency histograms (p50/p95/p99)
  - Cache hit rate tracking
  - Category distribution
  - Health checks
- **Task 4.4**: Documentation Update
  - DOC_2_matching-algo-X.md created
  - CHANGELOG.md created

### Files Created
- `lib/matching/fit-quality.ts`
- `lib/matching/selectivity.ts`
- `lib/matching/preference-validator.ts`
- `lib/matching/unified-penalties.ts`
- `lib/matching/categorization.ts`
- `lib/matching/confidence.ts`
- `lib/matching/student-capability-vector.ts`
- `lib/matching/program-index.ts`
- `lib/matching/memo-cache.ts`
- `lib/matching/optimized-matcher.ts`
- `lib/matching/enhanced-match-result.ts`
- `lib/matching/matching-metrics.ts`
- `lib/feature-flags/matching-v10.ts`
- `lib/feature-flags/index.ts`
- `docs/matching/DOC_2_matching-algo-X.md`
- `docs/matching/CHANGELOG.md`

### Test Coverage
All modules include verification tests (`*.verify.ts`):
- Total: 200+ test cases passing
- P0 (Critical): 100% pass rate
- P1 (Important): 100% pass rate

---

## [V9] - Previous Version

The V9 algorithm (current production) uses:
- Binary points matching (meets/doesn't meet)
- No selectivity differentiation
- Basic penalty system
- No performance optimizations
- No match categorization

V10 is backward compatible with V9 - enable features gradually using feature flags.
