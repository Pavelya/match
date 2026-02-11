# Add Country Flags to Program Cards

> **Goal:** Display country flags on program cards via the Quick Info Bar for fast visual scanning of program locations.

---

## Chosen UX Approach: Option A — Flag in Quick Info Bar

Add a **country flag + country name chip** as the first item in the Quick Info bar (the rounded `bg-muted/50` metadata row), following the existing chip pattern (`icon + text`). The flag emoji acts as the icon, paired with the country name text.

**Why this approach:**
- Gives the flag proper visual weight — same size as other chip icons (Field, Duration, Degree)
- Follows existing design language — every chip in the Quick Info bar has an icon + label
- Keeps the subtitle clean (university + city only)
- Naturally fixes the "Hong Kong, Hong Kong" duplication bug (city stays in subtitle, country moves to Quick Info bar)
- Works with the existing Twemoji polyfill for Windows

**Rendering example (Quick Info bar):**
```
🇬🇧 United Kingdom  ·  🔬 Medicine & Health  ·  🕐 6 years  ·  � Master  ·  45 IB Points
```

---

## Tasks

### Task 1: Pass `flagEmoji` Data in Search Results ✅
**File:** `app/programs/search/SearchClient.tsx`  
**Goal:** The `transformToProgram()` function hardcoded `flagEmoji: null`. Updated to call `countryCodeToFlag(result.country.code)` so search result cards receive valid flag data.  
**Status:** Done.

---

### Task 2: Add Flag + Country Chip to Quick Info Bar (Card Variant)
**File:** `components/student/ProgramCard.tsx`  
**Goal:** In the card variant's Quick Info bar (~line 931), add a new chip as the **first item** in the bar:
```tsx
<span className="flex items-center gap-1.5 text-foreground">
  <span className="text-base">{program.country.flagEmoji || '🌍'}</span>
  {program.country.name}
</span>
```
The flag emoji serves as the chip's icon (sized `text-base` for visibility), with the country name as the label. Falls back to 🌍 globe if `flagEmoji` is null.

---

### Task 3: Remove Country Name from Card Subtitle
**File:** `components/student/ProgramCard.tsx`  
**Goal:** Since the country is now displayed in the Quick Info bar, remove it from the subtitle line (~line 909) to avoid duplication. The subtitle becomes:
- Before: `University of Cambridge, Cambridge, United Kingdom`
- After: `University of Cambridge, Cambridge`

This also fixes the pre-existing "Hong Kong, Hong Kong" bug where city and country share the same name.

---

### Task 4: Add Flag + Country Chip to Quick Info Bar (Detail Variant)
**File:** `components/student/ProgramCard.tsx`  
**Goal:** Apply the same Quick Info bar chip to the **detail variant's** Quick Info bar. The detail variant has its own Quick Info section in the hero area. Add the same `flagEmoji + country name` chip as the first item there too.

Also remove the country name from the detail variant's subtitle (~line 498-499) to match the card variant.

---

### Task 5: Verify Flag Rendering Across All Pages
**Goal:** Test that the flag renders correctly in the Quick Info bar on all affected pages:
1. `/programs/search` — search result cards
2. `/student/saved` — saved program cards
3. `/student/matches` — matched program cards
4. `/programs/[id]` — detail page

**Check:**
- Flag displays at correct size in the Quick Info chip
- Country name no longer appears in the subtitle
- No "Hong Kong, Hong Kong" duplication
- Existing Preferences section flags still work
- Filter chips in search still work
- Windows polyfill covers new placements (no code change needed)

---

## Summary

| # | Task | File | Status |
|---|------|------|--------|
| 1 | Pass `flagEmoji` in SearchClient | `SearchClient.tsx` | ✅ Done |
| 2 | Flag chip in Quick Info bar (card) | `ProgramCard.tsx` | To do |
| 3 | Remove country from card subtitle | `ProgramCard.tsx` | To do |
| 4 | Flag chip in Quick Info bar (detail) | `ProgramCard.tsx` | To do |
| 5 | Visual verification across pages | Manual testing | To do |

**Files affected:** `components/student/ProgramCard.tsx`, `app/programs/search/SearchClient.tsx`  
**No new dependencies.** Reuses existing `flagEmoji` data and `country-flag-emoji-polyfill`.
