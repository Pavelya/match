# OR-Group Subject Display Bug - Executive Summary

**Date:** 2026-01-27  
**Status:** Ready for Implementation  
**Priority:** High  
**Estimated Effort:** 6.5 hours

---

## The Problem

Students see **wrong subject names** in their program matches when the match was made via an OR-group requirement.

**Example:**
- Program requires: **Biology OR Computer Science OR Economics**
- Student took: **Computer Science HL 6** ✅
- System currently shows: **"Biology - Requirement met"** ❌ (WRONG!)
- Should show: **"Computer Science - Requirement met"** ✅ (CORRECT!)

---

## Root Cause

**File:** `/components/student/ProgramCard.tsx`  
**Function:** `processRequirementsForCardDisplay()` (lines 230-304)

**Bug:** The function defaults to showing the **first subject in the OR-group** (based on admin entry order) instead of the **actual subject the student took**.

**Why:** The matching algorithm correctly identifies the best match, but the display logic doesn't properly track **which specific course** in the OR-group was matched.

---

## Solution Overview

### Strategy
Add tracking of the **matched course ID** to the match result data, then use it in display logic.

### Changes Required
1. **Type Definition** - Add `matchedCourseId` field to `SubjectMatchDetail`
2. **Algorithm** - Populate the field in `calculateORGroupMatch()`
3. **Display Logic** - Use the field in both card and detail views
4. **Tests** - Verify the fix works for all OR-group scenarios

### Files Affected
- `/lib/matching/types.ts` - Type definition
- `/lib/matching/subject-matcher.ts` - Matching logic
- `/components/student/ProgramCard.tsx` - Display logic (2 functions)

---

## Implementation Tasks

| # | Task | Goal | Effort |
|---|------|------|--------|
| 1 | Enhance SubjectMatchDetail type | Add `matchedCourseId` and `matchedCourseName` fields | 30 min |
| 2 | Update OR-group matching | Populate new fields in algorithm | 1 hour |
| 3 | Fix card display logic | Use matched course ID instead of first item | 1.5 hours |
| 4 | Fix detail view logic | Apply same fix to detail variant | 1 hour |
| 5 | Add integration tests | Verify fix works for all scenarios | 2 hours |
| 6 | Update documentation | Add CHANGELOG entry | 30 min |

**Total:** 6.5 hours

---

## Benefits

### User Experience
- ✅ Students see **accurate** information about their matches
- ✅ **Trust** in the matching system restored
- ✅ **Clarity** about which courses fulfilled requirements

### Technical
- ✅ **Minimal changes** - only adds fields, doesn't modify existing logic
- ✅ **Type-safe** - TypeScript ensures correct usage
- ✅ **Backward compatible** - fallback logic for old data
- ✅ **No performance impact** - same computational complexity

---

## Risk Assessment

### Risk Level: **LOW**

**Why:**
- No database schema changes
- No changes to matching algorithm logic
- Only display layer modifications
- Backward compatible fallbacks in place

### Rollback Plan
- Simple `git revert` if issues arise
- No data migrations to undo
- Can deploy/rollback anytime

---

## Testing Plan

### Automated Tests
- ✅ OR-group with full match
- ✅ OR-group with partial match
- ✅ Multiple courses in student profile
- ✅ No match in OR-group
- ✅ Backward compatibility with old match results

### Manual QA
- ✅ Check student/matches page
- ✅ Check program detail page  
- ✅ Check coordinator view
- ✅ Verify multiple OR-groups in same program

---

## Success Metrics

### Immediate
- Students see correct subject names in matches
- Both card and detail views show accurate data
- All tests pass

### Long-term
- Reduced support tickets about "wrong subjects"
- Improved user trust in matching accuracy
- Better student satisfaction scores

---

## Next Steps

1. ✅ **Review** this document with team
2. **Approve** implementation plan
3. **Implement** tasks 1-6 in sequence
4. **Test** thoroughly on staging
5. **Deploy** to production
6. **Monitor** for any issues

---

## Detailed Documentation

See full task breakdown: `/docs/tasks/fix-or-group-subject-display-bug.md`

---

*This is a high-priority bug fix that significantly improves user experience with minimal technical risk.*
