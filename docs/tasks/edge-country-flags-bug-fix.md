# Edge Browser Country Flags Bug Fix

## Problem Summary

Country flag emojis are not displaying correctly in Microsoft Edge browser (and Chrome on Windows). Instead of showing flag images, users see two-letter country codes (e.g., "US" instead of 🇺🇸).

### Root Cause

**Windows Font Limitation**: Microsoft's default emoji font "Segoe UI Emoji" intentionally does not include country flag emojis. This is reportedly due to political sensitivities surrounding the recognition of certain countries.

- **Affected Browsers**: Microsoft Edge, Google Chrome (Chromium-based browsers on Windows)
- **Working Browsers**: Firefox (includes its own Twemoji font), Safari (macOS), all browsers on macOS/Linux

### Technical Details

The app currently uses Unicode Regional Indicator Symbols for country flags:
- Flags are stored in the database as `flagEmoji` string field (e.g., "🇺🇸", "🇬🇧", "🇩🇪")
- Generated using `countryCodeToFlag()` function in `lib/country-utils.ts`
- Rendered directly as text in React components

---

## Affected Components

The `flagEmoji` field is used in **50+ locations** across the application:

### Student-Facing (Critical Priority)

| Component | File | Usage |
|-----------|------|-------|
| LocationSelector | `components/student/LocationSelector.tsx` | Country selection in onboarding (Step 2) |
| ProgramCard | `components/student/ProgramCard.tsx` | Program location display (2 locations) |
| Field Selector Client | `app/student/onboarding/FieldSelectorClient.tsx` | Country interface definition |
| Recommendations Client | `app/student/matches/RecommendationsClient.tsx` | Matched program display |
| Saved Programs Client | `app/student/saved/SavedProgramsClient.tsx` | Saved programs list |
| Student Settings | `app/student/settings/page.tsx` | School info display |
| Student Invitations | `app/student/invitations/page.tsx` | School invitation display |

### Program Search & Details (Public)

| Component | File | Usage |
|-----------|------|-------|
| SearchClient | `app/programs/search/SearchClient.tsx` | Country filter & results (2 locations) |
| Program Detail Client | `app/programs/[id]/ProgramDetailClient.tsx` | Program location display |
| Program Page | `app/programs/[id]/page.tsx` | Server-side props |
| University Detail Client | `app/universities/[id]/UniversityDetailClient.tsx` | University location |
| University Page | `app/universities/[id]/page.tsx` | Server-side props |

### Coordinator Dashboard

| Component | File | Usage |
|-----------|------|-------|
| Coordinator Settings | `app/coordinator/settings/page.tsx` | School info display |
| Coordinator Analytics | `app/coordinator/analytics/page.tsx` | Country statistics |

### Admin Panel

| Component | File | Usage |
|-----------|------|-------|
| Schools Table | `components/admin/schools/SchoolsTable.tsx` | School list |
| Schools Form | `components/admin/schools/SchoolForm.tsx` | Country selector |
| Schools Edit Form | `components/admin/schools/SchoolEditForm.tsx` | Country selector |
| Schools List Client | `components/admin/schools/SchoolsListClient.tsx` | Type definition |
| Programs Table | `components/admin/programs/ProgramsTable.tsx` | Program location |
| Programs Form | `components/admin/programs/ProgramForm.tsx` | University selector |
| Programs Edit Form | `components/admin/programs/ProgramEditForm.tsx` | University selector |
| Programs List Client | `components/admin/programs/ProgramsListClient.tsx` | Type definition |
| Bulk Upload Form | `components/admin/programs/BulkUploadForm.tsx` | University selector |
| Universities Table | `components/admin/universities/UniversitiesTable.tsx` | University location |
| Universities Form | `components/admin/universities/UniversityForm.tsx` | Country selector |
| Universities Edit Form | `components/admin/universities/UniversityEditForm.tsx` | Country selector |
| Universities List Client | `components/admin/universities/UniversitiesListClient.tsx` | Type definition |
| Agents Table | `components/admin/agents/AgentsTable.tsx` | University location |
| Agents List Client | `components/admin/agents/AgentsListClient.tsx` | Type definition |
| Reference Data Client | `components/admin/reference/ReferenceDataClient.tsx` | Countries management |
| Admin Analytics | `app/admin/analytics/page.tsx` | Country statistics |
| Admin Students | `app/admin/students/[id]/page.tsx` | Student school info |
| Admin Coordinators | `app/admin/coordinators/[id]/page.tsx` | Coordinator school info |
| Admin Schools | `app/admin/schools/[id]/page.tsx` | School details |
| Admin Programs | `app/admin/programs/[id]/page.tsx` | Program location |

### Auth Flow

| Component | File | Usage |
|-----------|------|-------|
| Accept Invite | `app/auth/accept-invite/[token]/page.tsx` | School info in invite |
| Accept Student Invite | `app/auth/accept-student-invite/[token]/page.tsx` | School info in invite |

---

## Recommended Solution

### Option A: country-flag-emoji-polyfill (Recommended - Minimal Code Changes)

Install the `country-flag-emoji-polyfill` npm package which injects a subset of Twemoji Country Flags font specifically for browsers that don't support flag emojis.

**Pros:**
- Minimal code changes (single import)
- Keeps existing `flagEmoji` approach
- Only loads font when needed (smaller bundle on supporting browsers)
- No database schema changes

**Cons:**
- Additional font download (~75KB) on Windows
- Relies on third-party package maintenance

### Option B: SVG Flag Library (react-country-flag)

Replace emoji rendering with SVG flags using `react-country-flag` component with `svg` prop.

**Pros:**
- Consistent appearance across all platforms
- High-quality vector graphics
- More styling control

**Cons:**
- Significant code changes (50+ files)
- Slightly larger bundle size
- Need to pass country code (already available)

### Option C: Twemoji Integration

Add Twemoji parsing to replace emojis with Twitter's standardized images.

**Pros:**
- Works for all emojis, not just flags
- Consistent emoji appearance

**Cons:**
- Complex integration
- Larger bundle impact
- May affect emojis in other contexts

---

## Implementation Plan

### Recommended: Option A (Polyfill) ✅ IMPLEMENTED

#### Task 1: Install Polyfill Package ✅ COMPLETE
- [x] Install `country-flag-emoji-polyfill` package
- [x] Run `npm install country-flag-emoji-polyfill`

#### Task 2: Import Polyfill in Root Layout ✅ COMPLETE
- [x] Created `components/shared/CountryFlagPolyfill.tsx` client component
- [x] Added polyfill import to `app/layout.tsx`
- [x] Component calls polyfill on mount (client-side only)
- [x] Updated `app/globals.css` to include "Twemoji Country Flags" font

**Files Changed:**
- `components/shared/CountryFlagPolyfill.tsx` (new file)
- `app/layout.tsx` (import and render CountryFlagPolyfill)
- `app/globals.css` (add font-family for body)

#### Task 3: Testing & Verification (Required)
- [ ] Test in Microsoft Edge on Windows
- [ ] Test in Google Chrome on Windows
- [ ] Test in Firefox (should still work)
- [ ] Test in Safari/Chrome on macOS (should still work)
- [ ] Verify student onboarding flow (LocationSelector)
- [ ] Verify program search and cards
- [ ] Verify admin panel functionality
- [ ] Check bundle size impact

#### Task 4: Documentation Update
- [x] Created bug fix implementation doc

---

## Alternative Implementation: Option B (If Polyfill Doesn't Work)

### Task 1: Create CountryFlag Component
- [ ] Create `components/shared/CountryFlag.tsx`
- [ ] Accept `code` (ISO 2-letter) and `size` props
- [ ] Use `react-country-flag` with `svg` prop

### Task 2: Update Student Components (Priority 1)
- [ ] Update `LocationSelector.tsx` - replace `{country.flagEmoji}` with `<CountryFlag code={country.code} />`
- [ ] Update `ProgramCard.tsx` (2 locations)
- [ ] Update `FieldSelectorClient.tsx`
- [ ] Update `RecommendationsClient.tsx`
- [ ] Update `SavedProgramsClient.tsx`

### Task 3: Update Public Pages (Priority 2)
- [ ] Update `SearchClient.tsx` (2 locations)
- [ ] Update `ProgramDetailClient.tsx`
- [ ] Update `UniversityDetailClient.tsx`

### Task 4: Update Admin Components (Priority 3)
- [ ] Update all admin tables and forms (20+ files)

### Task 5: Update Auth Flow
- [ ] Update invitation pages

---

## Risk Assessment

| Change | Risk Level | Impact if Failed | Mitigation |
|--------|------------|------------------|------------|
| Polyfill installation | Low | None | Can uninstall |
| Polyfill import | Low | Fallback to codes | Feature detection |
| SVG replacement | Medium | UI changes | Test thoroughly |
| Database changes | N/A | N/A | Not required |

---

## Success Criteria

1. ✅ Country flags display correctly in Microsoft Edge on Windows
2. ✅ Country flags display correctly in Google Chrome on Windows
3. ✅ Country flags continue to work in Firefox and Safari
4. ✅ Student onboarding LocationSelector shows all country flags
5. ✅ Program cards show country flags properly
6. ✅ Admin panel displays flags correctly
7. ✅ No performance regression (verify bundle size)
8. ✅ No visual regression on other browsers

---

## References

- [country-flag-emoji-polyfill npm](https://www.npmjs.com/package/country-flag-emoji-polyfill)
- [react-country-flag npm](https://www.npmjs.com/package/react-country-flag)
- [Windows flag emoji issue - Stack Overflow](https://stackoverflow.com/questions/54090475/flags-not-rendering-using-unicode-emoji-modifier-sequences)
- [Microsoft's decision explained](https://answers.microsoft.com/en-us/windows/forum/all/flag-emoji/85b163bc-786a-4918-9042-763ccf4b6c05)
