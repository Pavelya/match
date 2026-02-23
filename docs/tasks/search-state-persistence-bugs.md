# Search State Persistence Bugs

When a user applies filters or a search query on `/programs/search`, navigates to a program detail page (`/programs/[id]`), and then returns (via browser back or "← Back to results" CTA), the search state is lost.

---

## Bug 1 — Filters Lost on Back Navigation

**Number:** 1  
**Title:** Search filters are not restored when navigating back from program detail  

**Goal:** When a user navigates back to `/programs/search` from a program detail page, all previously applied filters (fields of study, countries, IB points range) must be restored and the results must reflect those filters. The active filter chips should be visible without expanding the full filter panel.

### Root Cause Analysis

Three issues combine to cause this bug:

1. **Filter state not initialized from URL params.**  
   In `SearchClient.tsx` (lines 108–111), `selectedFields`, `selectedCountries`, `minPoints`, and `maxPoints` are initialized as empty — they never read from `searchParams`, even though the URL update effect (line 223–230) writes them via `router.replace()`.

2. **`hasInitializedRef` skips the first search.**  
   Line 201–208: if `initialResults` were provided by SSR (they always are, see `page.tsx` line 84–91), the first search effect is skipped entirely. When returning with URL params, the component mounts with SSR results (unfiltered) and never re-fetches.

3. **"Back to results" link ignores query params.**  
   In `ProgramCard.tsx` (line 455–460), the back link is hardcoded to `/programs/search` — it discards any `?q=...&fields=...&countries=...` that was in the URL.

### Files to Modify

| File | Change |
|------|--------|
| `app/programs/search/SearchClient.tsx` | Init `selectedFields`, `selectedCountries`, `minPoints`, `maxPoints` from `searchParams` |
| `app/programs/search/SearchClient.tsx` | Fix `hasInitializedRef` to NOT skip the first search when URL params contain filters |
| `components/student/ProgramCard.tsx` | Make "Back to results" link preserve the original search URL query params |

---

## Bug 2 — Search Query Shows Stale Results on Back Navigation

**Number:** 2  
**Title:** Search by name restores the query text but not the filtered results  

**Goal:** When a user searches by name (e.g. "Med"), navigates to a program, and returns, the search results must match the query shown in the search bar. Currently the query text "Med" persists visually, but all programs are displayed (the unfiltered SSR results).

### Root Cause Analysis

The query text *is* correctly initialized from `searchParams.get('q')` on line 97. However the actual search is never executed because:

1. **`hasInitializedRef` suppresses the first search.**  
   Same root cause as Bug 1 — the guard at line 206 sees that `initialResults` came from SSR (which are unfiltered, top-20 programs) and skips the API call that would filter by the query "Med".

2. **URL correctly contains `?q=Med`** — so the query text appears in the input — but the results array stays at `initialResults` (unfiltered SSR data).

### Files to Modify

| File | Change |
|------|--------|
| `app/programs/search/SearchClient.tsx` | Same `hasInitializedRef` fix as Bug 1 — skip the first search only when there are no URL params present |

---

## Summary of All Changes

| # | File | Description |
|---|------|-------------|
| 1 | `app/programs/search/SearchClient.tsx` | Read `fields`, `countries`, `minPoints`, `maxPoints` from `searchParams` on initialization |
| 2 | `app/programs/search/SearchClient.tsx` | Only skip the initial search when the URL has no query/filter params (i.e., it's the default landing) |
| 3 | `components/student/ProgramCard.tsx` | Make "← Back to results" link preserve the search query params |
