# Add Country Flags to Program Cards

> **Goal:** Visually indicate each program's country using a flag alongside the location text, making it faster to scan and identify program locations at a glance.

---

## Context & Research Findings

### Current State
- Location is displayed as **plain text only** (e.g. "Cambridge, United Kingdom") in two key places inside `ProgramCard`:
  - **Card variant** — subtitle line under the program name (line ~908–909)
  - **Detail variant** — hero section subtitle (line ~498)
- Country flags **already exist** in the Preferences section of ProgramCard (both variants) and in SearchClient filter chips — but only when `matchResult` is present (logged-in matched users)
- Public/search card views pass `flagEmoji: null` and show **no flag at all**

### Existing Flag Infrastructure
- Flags use **Unicode emoji** (`flagEmoji` field on Country model, generated via `countryCodeToFlag()` in `lib/country-utils.ts`)
- **Windows polyfill** implemented: `country-flag-emoji-polyfill` loads the Twemoji Country Flags font (~77KB .woff2) only on unsupported browsers (Edge/Chrome on Windows). The font is served locally from `public/fonts/TwemojiCountryFlags.woff2`
- CSS `font-family` in `globals.css` includes `"Twemoji Country Flags"` as the first font, scoped to flag unicode range only — so flag emojis render correctly everywhere
- **This infrastructure is fully functional** — reusing emoji flags is the correct approach; no new packages or assets needed

### UX / UI Research (2026 Best Practices)
- **Country flags are appropriate** for indicating geographic location of programs (this is a location context, not a language selector)
- Flags should always be **paired with a text label** — never shown alone
- Keep flags **small and inline** — they serve as a visual anchor, not a primary element
- Flags improve **scannability** on listing pages where users compare multiple programs from different countries
- On cards: place the flag **inline before the location text** for quick visual scanning (the "label + icon" pattern)
- On detail pages: slightly larger but still inline — flag adds geographical context without dominating

### Recommended Pattern
Add the flag emoji **inline before the country name** in the location text, using the same emoji approach already used in LocationSelector (onboarding step 2) and search filter chips. The polyfill ensures Windows compatibility.

**Example rendering:**
- Before: `Cambridge, United Kingdom`
- After: `🇬🇧 Cambridge, United Kingdom`

---

## Tasks

### Task 1: Ensure `flagEmoji` Data is Available in Search Results
**Title:** Pass `flagEmoji` through to ProgramCard in SearchClient  
**Goal:** The `transformToProgram()` function in `SearchClient.tsx` currently hardcodes `flagEmoji: null`. Update it to pass the flag data from the Algolia search result's `country.code` field. Since search results include `country.code`, use `countryCodeToFlag(country.code)` to generate the emoji, or include `flagEmoji` in the Algolia index. This ensures flag data is available for all program cards rendered from search.

---

### Task 2: Add Flag to ProgramCard Card Variant — Location Subtitle
**Title:** Display country flag inline in card header location text  
**Goal:** In `ProgramCard.tsx`, add the country flag emoji before the country name in the card variant's subtitle text (around line 908–909). The flag should appear inline, styled small (text-sm) to match the existing text. Pattern: `{program.country.flagEmoji} {city}, {country.name}`. Fall back gracefully if `flagEmoji` is null or empty (show text-only, as today).

---

### Task 3: Add Flag to ProgramCard Detail Variant — Hero Subtitle
**Title:** Display country flag inline in detail page hero location text  
**Goal:** In `ProgramCard.tsx`, add the country flag emoji before the country name in the detail variant's hero subtitle (around line 497–499). Same inline pattern as Task 2, slightly larger size. Pattern: `{program.country.flagEmoji} {city}, {country.name}`.

---

### Task 4: Add Flag to ProgramCard Quick Info Bar (Both Variants)
**Title:** Consider adding a small flag in the Quick Info bar  
**Goal:** Evaluate whether adding the flag to the "Quick Info" bar (the rounded muted-bg bar showing Field, Duration, Degree Type) is beneficial or redundant since the flag will already be in the subtitle. If the flag is added to the subtitle (Tasks 2 & 3), this task may be skipped to avoid visual clutter. Decision: **Skip unless the subtitle change proves insufficient during review.**

---

### Task 5: Verify Flag Rendering Across All Four Target Pages
**Title:** Test flag visibility on all four affected pages  
**Goal:** Manually verify that the flag emoji renders correctly on all four pages:
1. `/programs/search` — search results cards show flags
2. `/student/saved` — saved program cards show flags
3. `/student/matches` — matched program cards show flags
4. `/programs/[id]` — detail page hero shows flag

Also verify:
- Flags render on macOS (native), and Windows (polyfill)
- No layout shifts or visual regressions
- Existing Preferences section flags still work correctly
- Filter chips in SearchClient still work

---

### Task 6: Verify Windows Compatibility via Existing Polyfill
**Title:** Confirm Twemoji Country Flags polyfill covers new flag placements  
**Goal:** The existing `CountryFlagPolyfill.tsx` and `TwemojiCountryFlags.woff2` font handle flag rendering for Windows browsers. Since we're reusing the same emoji approach (not adding new rendering), verify that the new placements inherit the polyfill automatically via the CSS `font-family`. No code changes expected — just verification that the polyfill's unicode-range covers all flag positions.

---

## Summary

| # | Title | Scope | Risk |
|---|-------|-------|------|
| 1 | Pass `flagEmoji` through in SearchClient | `SearchClient.tsx` | Low |
| 2 | Flag in card variant subtitle | `ProgramCard.tsx` | Low |
| 3 | Flag in detail variant hero subtitle | `ProgramCard.tsx` | Low |
| 4 | Flag in Quick Info bar (likely skip) | `ProgramCard.tsx` | Low |
| 5 | Visual verification across 4 pages | Manual testing | Low |
| 6 | Windows polyfill verification | No code changes | Low |

**Files affected:** `components/student/ProgramCard.tsx`, `app/programs/search/SearchClient.tsx`  
**No new dependencies.** Reuses existing `flagEmoji` data and `country-flag-emoji-polyfill`.
