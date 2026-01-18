# Task: Filter Countries in Program Search Page

**Date:** 2025-01-17  
**Status:** Proposed  
**Priority:** Low  
**Impact:** UX Improvement

---

## Problem Statement

The program search page (`/programs/search`) displays **all countries** in the filter dropdown, including countries that have no university programs. This is the same issue we fixed in student onboarding.

**Current behavior:** Country filters show countries like Austria even if no programs exist there, leading users to filter by a country and get 0 results.

**Desired behavior:** Only show countries that have at least one university program.

---

## Root Cause Analysis

In `app/programs/search/page.tsx` (line 41):

```typescript
const [fields, countries] = await Promise.all([getCachedFields(), getCachedCountries()])
```

The page uses `getCachedCountries()` which returns **all** countries, instead of `getCachedCountriesWithPrograms()` which filters to only countries with programs.

---

## Proposed Solution

This is a **1-line fix** - simply swap the function call.

### Task 1: Update Search Page Import and Call

**File:** `app/programs/search/page.tsx`

**Goal:** Use filtered countries query instead of all countries.

**Changes:**

```diff
- import { getCachedFields, getCachedCountries } from '@/lib/reference-data'
+ import { getCachedFields, getCachedCountriesWithPrograms } from '@/lib/reference-data'
```

```diff
- const [fields, countries] = await Promise.all([getCachedFields(), getCachedCountries()])
+ const [fields, countries] = await Promise.all([getCachedFields(), getCachedCountriesWithPrograms()])
```

**Outcome:** Country filters only show countries with programs.

---

## Implementation Checklist

- [x] **Task 1.1:** Update import statement in `page.tsx`
  - Replace `getCachedCountries` with `getCachedCountriesWithPrograms`

- [x] **Task 1.2:** Update function call in `page.tsx`
  - Replace `getCachedCountries()` with `getCachedCountriesWithPrograms()`

---

## Verification Plan

### Manual Testing

1. Open `/programs/search` in browser
2. Click the filter button (sliders icon)
3. Expand the "Countries" section
4. Verify only countries with programs are shown
5. Verify filtering by a country returns programs

### Quick Verification

After the fix, the number of countries in the filter should match the countries shown in student onboarding Step 2.

---

## Files to Modify

| File | Action | Description |
|------|--------|-------------|
| `app/programs/search/page.tsx` | Modify | Switch to `getCachedCountriesWithPrograms()` |

---

## Notes

- No cache invalidation changes needed (already done in the previous task)
- No additional API changes needed
- The `getCachedCountriesWithPrograms()` function already exists from the onboarding fix
