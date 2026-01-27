# Fix OR-Group Subject Display Bug

**Created:** 2026-01-27  
**Status:** Planning  
**Priority:** High  
**Complexity:** Medium

---

## Problem Description

### Current Behavior (Bug)
When a student matches with a program via an OR-group requirement (e.g., "Biology OR Computer Science OR Economics"), the system displays **the first subject in the OR group** rather than the **actual subject the student took**.

### Example Scenario
- **Program Requirement:** Biology OR Computer Science OR Economics (Biology is first in admin)
- **Student's Actual Course:** Computer Science (HL 6)
- **What's Displayed:** ❌ **Biology** (incorrect - student didn't take Biology)
- **What Should Display:** ✅ **Computer Science** (correct - student actually took this)

### Impact
- **User Confusion:** Students see subjects they never took listed as "fulfilled requirements"
- **Loss of Trust:** Students question the accuracy of the matching system
- **Poor UX:** Defeats the purpose of personalized matching recommendations

---

## Root Cause Analysis

### Location of Bug
The bug exists in `/components/student/ProgramCard.tsx`, specifically in the **`processRequirementsForCardDisplay`** function (lines 230-304).

### Technical Cause

#### Current Logic (Incorrect):
```typescript
// Lines 262-283 in ProgramCard.tsx
const orGroupMatch = findMatchForCourse(groupItems[0].ibCourse.id)

// Find the best matching option from the group
let bestReq = groupItems[0]  // ❌ DEFAULTS TO FIRST ITEM
let bestScore = -1

for (const option of groupItems) {
  const optionMatch = findMatchForCourse(option.ibCourse.id)
  const hasMatch = optionMatch !== undefined
  const score = hasMatch ? 1 : 0
  
  if (score > bestScore) {
    bestScore = score
    bestReq = option  // Only updates if match found
  }
}
```

**Problem:** The function:
1. Defaults to `groupItems[0]` (first subject in admin order)
2. Only gives score of `1` if a match is found, `0` otherwise
3. Doesn't check **which specific option the student actually took**
4. The `findMatchForCourse` returns the **OR-group match status**, not individual course matches

#### Why This Happens:
The matching algorithm in `/lib/matching/subject-matcher.ts` correctly calculates the OR-group match (it finds the best score), but the **match result** stored in `SubjectMatchDetail` contains:
- The **OR-group requirement** as a whole
- The **best score** achieved
- The **reason** mentioning which option matched

However, the **`processRequirementsForCardDisplay`** function doesn't properly parse the `reason` field or check the student's actual courses to determine which specific option was taken.

### Data Flow Issue

```
Matching Algorithm (✅ Correct)
  ↓
  calculateORGroupMatch() finds best option
  ↓
  Returns: { requirement: ORGroupRequirement, score: 1.0, reason: "Best match via Computer Science: Fully met" }
  ↓
Display Logic (❌ Bug)
  ↓
  processRequirementsForCardDisplay() selects first option by default
  ↓
  Student sees: "Biology - Requirement met" (WRONG)
```

---

## Solution Strategy

### High-Level Approach
1. **Enhance match result data** to include which specific course in an OR-group was matched
2. **Update display logic** to use the actual matched course instead of defaulting to first option
3. **Add fallback logic** for edge cases (no match, multiple partial matches, etc.)
4. **Update both card and detail views** to ensure consistency

### Key Decisions
- ✅ **Preserve existing algorithm logic** - only change display layer
- ✅ **Add new fields to match results** rather than changing existing structure (safer)
- ✅ **Graceful degradation** - if matched course data is missing, fall back to best logic
- ✅ **Consistent across views** - fix both card variant and detail variant

---

## Implementation Tasks

### Task 1: Enhance SubjectMatchDetail Type
**Goal:** Add a field to track which specific course was matched in an OR-group

**Files to Change:**
- `/lib/matching/types.ts`

**Changes:**
```typescript
export interface SubjectMatchDetail {
  requirement: SubjectRequirement | ORGroupRequirement
  score: number
  status: 'FULL_MATCH' | 'PARTIAL_MATCH' | 'NO_MATCH'
  reason?: string
  // NEW: Track which specific course matched (for OR-groups)
  matchedCourseId?: string  // The actual courseId that produced the best match
  matchedCourseName?: string  // Human-readable name for display
}
```

**Why:** This allows the display layer to know exactly which course the student took that satisfied the OR-group requirement.

---

### Task 2: Update OR-Group Matching Logic
**Goal:** Populate the new `matchedCourseId` field when calculating OR-group matches

**Files to Change:**
- `/lib/matching/subject-matcher.ts`

**Changes:**
Update the `calculateORGroupMatch` function (lines 106-137):

```typescript
export function calculateORGroupMatch(
  orGroup: ORGroupRequirement,
  studentCourses: StudentCourse[]
): SubjectMatchDetail {
  let bestMatch: SubjectMatchDetail = {
    requirement: orGroup,
    score: 0.0,
    status: 'NO_MATCH',
    reason: 'None of the OR options met'
  }
  
  let matchedOption: SubjectRequirement | undefined

  for (const option of orGroup.options) {
    const match = calculateSubjectMatch(option, studentCourses)

    if (match.score > bestMatch.score) {
      matchedOption = option  // NEW: Track which option matched
      bestMatch = {
        requirement: orGroup,
        score: match.score,
        status: match.status,
        reason: `Best match via ${option.courseName}: ${match.reason || 'Fully met'}`,
        // NEW: Store the matched course details
        matchedCourseId: option.courseId,
        matchedCourseName: option.courseName
      }
    }

    if (match.score === 1.0) {
      break
    }
  }

  return bestMatch
}
```

**Why:** This ensures every OR-group match result contains the specific course that produced the best match.

---

### Task 3: Update Card Display Logic
**Goal:** Use the `matchedCourseId` to display the correct subject in program cards

**Files to Change:**
- `/components/student/ProgramCard.tsx`

**Changes:**
Update `processRequirementsForCardDisplay` function (lines 230-304):

```typescript
function processRequirementsForCardDisplay(
  requirements: CourseRequirement[],
  subjectMatches: SubjectMatchDetail[] | undefined
): { requirement: CourseRequirement; status: string; reason?: string }[] {
  const result: { requirement: CourseRequirement; status: string; reason?: string }[] = []
  const processedGroups = new Set<string>()

  const findMatchForCourse = (courseId: string): SubjectMatchDetail | undefined => {
    return subjectMatches?.find((sm) => {
      if ('courseId' in sm.requirement && sm.requirement.courseId === courseId) {
        return true
      }
      if ('options' in sm.requirement) {
        return sm.requirement.options.some((opt) => opt.courseId === courseId)
      }
      return false
    })
  }

  for (const req of requirements) {
    if (req.orGroupId) {
      if (!processedGroups.has(req.orGroupId)) {
        processedGroups.add(req.orGroupId)
        const groupItems = requirements.filter((r) => r.orGroupId === req.orGroupId)

        // Find the OR-group match entry
        const orGroupMatch = findMatchForCourse(groupItems[0].ibCourse.id)

        // NEW: Use matchedCourseId to find the correct option
        let displayReq = groupItems[0] // Fallback to first
        
        if (orGroupMatch?.matchedCourseId) {
          // Find the requirement that matches the courseId from the match result
          const matchedReq = groupItems.find(
            (item) => item.ibCourse.id === orGroupMatch.matchedCourseId
          )
          if (matchedReq) {
            displayReq = matchedReq
          }
        } else {
          // FALLBACK: No matched course ID, try to find best based on status
          // (This handles backward compatibility or edge cases)
          for (const option of groupItems) {
            const optionMatch = findMatchForCourse(option.ibCourse.id)
            if (optionMatch?.status === 'FULL_MATCH') {
              displayReq = option
              break
            }
          }
        }

        result.push({
          requirement: displayReq,
          status: orGroupMatch?.status || 'NO_MATCH',
          reason: orGroupMatch?.reason
        })
      }
    } else {
      // Regular requirement (not OR group)
      const matchInfo = findMatchForCourse(req.ibCourse.id)
      result.push({
        requirement: req,
        status: matchInfo?.status || 'NO_MATCH',
        reason: matchInfo?.reason
      })
    }
  }

  return result
}
```

**Why:** This ensures the card view displays the actual course the student took, not the first one in the admin list.

---

### Task 4: Update Detail View Display Logic
**Goal:** Apply the same fix to the detail view variant

**Files to Change:**
- `/components/student/ProgramCard.tsx`

**Changes:**
Update `processRequirementsForDisplay` function (lines 191-227) with similar logic:

```typescript
function processRequirementsForDisplay(
  requirements: CourseRequirement[],
  studentCourses: StudentCourse[]
): { requirement: CourseRequirement; isFromOrGroup: boolean; orGroupSize: number }[] {
  const result: { requirement: CourseRequirement; isFromOrGroup: boolean; orGroupSize: number }[] = []
  const processedGroups = new Set<string>()

  for (const req of requirements) {
    if (req.orGroupId) {
      if (!processedGroups.has(req.orGroupId)) {
        processedGroups.add(req.orGroupId)
        const groupItems = requirements.filter((r) => r.orGroupId === req.orGroupId)

        // NEW: Find which option the student actually took
        let bestReq = groupItems[0]
        let bestScore = -1

        for (const option of groupItems) {
          // Check if student took this specific course
          const studentHasCourse = studentCourses.some(
            (sc) => sc.ibCourse.id === option.ibCourse.id
          )
          
          if (studentHasCourse) {
            const status = getRequirementStatus(option, studentCourses)
            // Prioritize: met > partial > not taken
            const score = status.met ? 2 : 1
            if (score > bestScore) {
              bestScore = score
              bestReq = option
            }
            // If we found a met requirement, stop searching
            if (status.met) break
          }
        }

        result.push({ requirement: bestReq, isFromOrGroup: true, orGroupSize: groupItems.length })
      }
    } else {
      result.push({ requirement: req, isFromOrGroup: false, orGroupSize: 1 })
    }
  }

  return result
}
```

**Why:** Ensures consistency across both card and detail views.

---

### Task 5: Add Integration Tests
**Goal:** Verify the fix works correctly for various OR-group scenarios

**Files to Create:**
- `/lib/matching/__tests__/or-group-display.test.ts`

**Test Cases:**
1. **Full match in OR-group:** Student has Computer Science HL 6, requirement is Biology OR CS OR Economics → displays "Computer Science"
2. **Partial match in OR-group:** Student has CS SL 5, requirement is CS HL 6 → displays "Computer Science" with partial status
3. **Multiple matches in OR-group:** Student has both Biology and CS → displays the one with best match
4. **No match in OR-group:** Student has none of the options → displays first option with "not taken" status
5. **Backward compatibility:** Old match results without `matchedCourseId` still work

**Why:** Prevents regressions and ensures the fix handles edge cases.

---

### Task 6: Update Documentation
**Goal:** Document the fix and update matching algorithm docs

**Files to Change:**
- `/docs/matching/CHANGELOG.md`
- `/docs/matching/DOC_2_matching-algo X.md` (if needed)

**Changes:**
Add entry to CHANGELOG:
```markdown
## [Date] - OR-Group Display Fix

### Fixed
- **OR-Group Subject Display:** Program cards and detail pages now correctly display the actual subject a student took when matching via OR-groups, instead of showing the first subject in the admin list.
  - Enhanced `SubjectMatchDetail` type with `matchedCourseId` and `matchedCourseName` fields
  - Updated `calculateORGroupMatch` to track which specific option matched
  - Fixed `processRequirementsForCardDisplay` and `processRequirementsForDisplay` to use matched course data
  - Maintains backward compatibility with existing match results

### Example
- **Before:** Student took Computer Science → showed "Biology" (first in OR-group)
- **After:** Student took Computer Science → correctly shows "Computer Science"
```

**Why:** Maintains clear documentation of changes for future reference.

---

## Testing Strategy

### Manual Testing Checklist
- [ ] Create test student with Computer Science HL 6
- [ ] Create test program with "Biology OR Computer Science OR Economics" requirement
- [ ] Verify student/matches page shows "Computer Science", not "Biology"
- [ ] Verify program detail page shows "Computer Science", not "Biology"
- [ ] Test with multiple OR-groups in same program
- [ ] Test with partial matches (e.g., SL instead of HL)
- [ ] Test with no matches in OR-group
- [ ] Test coordinator view (student match display)

### Automated Testing
- [ ] Run existing matching algorithm tests
- [ ] Run new OR-group display tests
- [ ] Verify no regressions in other matching scenarios

---

## Rollout Plan

### Phase 1: Implementation (Dev)
1. Implement Tasks 1-4 in order
2. Run local tests
3. Manual verification on dev environment

### Phase 2: Testing (Staging)
1. Deploy to staging
2. Run full test suite
3. Manual QA with test data
4. Performance check (ensure no slowdown)

### Phase 3: Production Deploy
1. Deploy during low-traffic window
2. Monitor error logs for any issues
3. Spot-check several student profiles
4. If issues: immediate rollback available

### Rollback Plan
- Git revert the changes
- Redeploy previous version
- No database migrations required, so rollback is safe

---

## Success Criteria

### Definition of Done
- ✅ Students see the actual subjects they took in OR-group matches
- ✅ Both card and detail views display correctly
- ✅ All automated tests pass
- ✅ Manual testing confirms fix across different scenarios
- ✅ No performance degradation
- ✅ Documentation updated

### Metrics to Monitor
- **User feedback:** Reduction in confusion about matched subjects
- **Support tickets:** Decrease in "wrong subject shown" complaints
- **Match accuracy perception:** Improved trust in matching system

---

## Related Files

### Core Algorithm
- `/lib/matching/types.ts` - Type definitions
- `/lib/matching/subject-matcher.ts` - OR-group matching logic

### Display Components
- `/components/student/ProgramCard.tsx` - Card and detail view rendering

### API Endpoints
- `/app/api/students/matches/route.ts` - Returns match results (may need type updates)

### Tests
- `/lib/matching/subject-matcher.verify.ts` - Existing tests to verify still pass
- `/lib/matching/__tests__/or-group-display.test.ts` - New tests (to be created)

### Documentation
- `/docs/matching/CHANGELOG.md` - Algorithm change log
- `/docs/matching/DOC_2_matching-algo X.md` - Main algorithm specification

---

## Notes

### Why This Approach?
- **Minimal changes:** Only adds fields, doesn't modify existing logic
- **Backward compatible:** Fallback logic handles old match results
- **Type-safe:** TypeScript ensures proper usage
- **Testable:** Clear inputs/outputs for each function

### Alternatives Considered

#### Alternative 1: Parse the `reason` string
**Rejected because:**
- Fragile (depends on string format)
- Not type-safe
- Harder to maintain

#### Alternative 2: Re-calculate match on display
**Rejected because:**
- Performance overhead
- Duplicates algorithm logic
- Inconsistent with cached results

#### Alternative 3: Store full student course data in match results
**Rejected because:**
- Bloats match result size
- Privacy concerns
- Unnecessary data duplication

### Current Approach Benefits
- ✅ Clean separation of concerns
- ✅ Minimal data overhead (just 2 fields)
- ✅ Type-safe and maintainable
- ✅ Backward compatible

---

## Estimated Effort

- **Task 1:** 30 minutes (type definition)
- **Task 2:** 1 hour (algorithm update + testing)
- **Task 3:** 1.5 hours (card display logic + testing)
- **Task 4:** 1 hour (detail view logic + testing)
- **Task 5:** 2 hours (comprehensive tests)
- **Task 6:** 30 minutes (documentation)

**Total:** ~6.5 hours

---

## Questions & Assumptions

### Assumptions
1. OR-group requirements always have at least one option
2. Course IDs are stable and unique
3. Student course data is accurate when matching occurs
4. The matching algorithm already correctly identifies the best match

### Open Questions
1. Are there any OR-groups with more than 5 options? (affects performance)
2. Should we display multiple matched courses if student took more than one option?
3. Do we need to track partial match details differently?

### Answers
1. **OR-groups size:** Typically 2-3 options, max seen is ~5 → no performance concern
2. **Multiple matches:** Display the best one (highest score), consistent with algorithm
3. **Partial matches:** Use same logic, `matchedCourseId` already captures this

---

## Conclusion

This task fixes a critical UX bug where students see incorrect subject names in their program matches. The solution is minimal, type-safe, and backward compatible, ensuring a smooth rollout with low risk.

**Next Steps:**
1. Review this task document with team
2. Get approval to proceed
3. Implement tasks in order (1-6)
4. Deploy and monitor

---

*Document Version: 1.0*  
*Last Updated: 2026-01-27*
