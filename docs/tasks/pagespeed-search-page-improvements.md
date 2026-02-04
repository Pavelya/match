# PageSpeed Improvements: /programs/search

> **Report Date:** 2026-02-04  
> **URL:** https://www.ibmatch.com/programs/search  
> **Report Source:** [PageSpeed Insights](https://pagespeed.web.dev/analysis/https-www-ibmatch-com-programs-search/g27nbgw8r6?hl=en_GB&form_factor=mobile)

---

## Current Scores (Mobile)

| Metric | Score | Status |
|--------|-------|--------|
| **Performance** | 88 | 🟡 Needs Improvement |
| **SEO** | 69 | 🔴 Poor |
| **Accessibility** | 85 | 🟡 Needs Improvement |
| **Best Practices** | 96 | 🟢 Good |

---

## Core Web Vitals

| Metric | Value | Status |
|--------|-------|--------|
| First Contentful Paint (FCP) | 0.9s | 🟢 Good |
| Largest Contentful Paint (LCP) | 3.2s | 🟡 Needs Improvement |
| Total Blocking Time (TBT) | 220ms | 🟡 Needs Improvement |
| Cumulative Layout Shift (CLS) | 0 | 🟢 Good |
| Speed Index | 3.3s | 🟢 Good |

---

## Tasks

### Task 1: ✅ COMPLETE - Enable Search Page Indexing

**Goal:** Allow search engines to index the search page to improve discoverability and SEO score.

**Investigation Summary:**
- ✅ Sitemap includes `/programs/search` with **priority 0.9** (indicating high SEO value)
- ✅ SEO Plan (Task 3) explicitly targets the search page for SEO optimization
- ✅ All other landing pages (Spain, Germany, etc.) use `robots: { index: true, follow: true }`
- ✅ The page already has full SEO: keywords, FAQ schema, Open Graph, canonical URL
- ❌ Original comment "prevent indexing to avoid Soft 404 errors" was incorrect - the page loads real content

**Change Made:**
```diff
// app/programs/search/page.tsx - Line 25-27
robots: {
-  index: false,
+  index: true,
   follow: true,
-  nocache: false
}
```

**Expected Impact:** SEO score should increase from 69 to 90+

---

### Task 2: Improve Largest Contentful Paint (LCP) - 3.2s → <2.5s

**Goal:** Reduce LCP to meet Google's "Good" threshold of ≤2.5 seconds.

**Issues Identified:**
1. **LCP element not preloaded** - The browser's preload scanner cannot discover the LCP element early
2. **Large images** - 232 KiB potential savings from image optimization

**Actions:**
- Add `<link rel="preload">` hints for critical above-the-fold content
- Optimize/compress images served on the search page (university logos)
- Consider using Next.js `<Image>` with `priority` prop for hero images
- Ensure LCP element (likely the main heading or hero section) loads early

---

### Task 3: Reduce Total Blocking Time (TBT) - 220ms → <200ms

**Goal:** Minimize main-thread blocking to improve interactivity.

**Issues Identified:**
1. **4 long tasks** identified blocking the main thread
2. **Unused JavaScript** - 22 KiB potential savings
3. **Legacy JavaScript polyfills** - 14 KiB potential savings

**Actions:**
- Analyze and code-split the `SearchClient.tsx` component
- Remove unused JavaScript imports and dead code
- Configure Next.js to avoid legacy polyfills for modern browsers
- Consider lazy-loading non-critical components with `React.lazy()` or `next/dynamic`

---

### Task 4: Optimize Image Delivery (-232 KiB)

**Goal:** Reduce page weight by optimizing image assets.

**Actions:**
- Ensure all images use modern formats (WebP/AVIF) via Next.js Image component
- Implement proper `width` and `height` attributes to prevent layout shift
- Lazy-load images below the fold
- Review university logo images for compression opportunities
- Consider using responsive `srcset` for different screen sizes

---

### Task 5: Reduce DOM Size (1,490 elements)

**Goal:** Simplify the DOM structure to reduce memory usage and style calculation time.

**Current Issue:** The page has 1,490 DOM elements, which is higher than the recommended limit (~800-1,000).

**Actions:**
- Review `SearchClient.tsx` for unnecessary wrapper elements
- Virtualize the search results list using `react-window` or similar
- Avoid rendering hidden elements; use conditional rendering instead
- Simplify filter panel markup

---

### Task 6: Fix Accessibility Issues (Score: 85 → 95+)

**Goal:** Improve accessibility for screen reader users and WCAG compliance.

**Issues Identified:**
1. **Buttons without accessible names** - Some buttons lack descriptive labels
2. **Links without discernible names** - Some links need `aria-label` or visible text
3. **Insufficient color contrast** - Background/foreground colors don't meet WCAG 4.5:1 ratio
4. **Heading order issues** - Headings skip levels (e.g., H1 → H3)

**Actions:**
- Add `aria-label` to icon-only buttons (filter toggle, clear search, pagination)
- Ensure all links have descriptive text or `aria-label`
- Audit and fix color contrast ratios using browser DevTools
- Fix heading hierarchy to be sequential (H1 → H2 → H3)

---

### Task 7: Address Best Practices Issues

**Goal:** Improve security headers and eliminate console errors.

**Issues Identified:**
1. **Browser console errors** during page load
2. **Missing Content Security Policy (CSP)** header
3. **Missing Cross-Origin Opener Policy (COOP)** header
4. **DOM-based XSS** - Consider implementing Trusted Types

**Actions:**
- Investigate and fix console errors (check network failures, JS errors)
- Add/update security headers in `next.config.ts` or Vercel configuration
- Review CSP policy in existing middleware

---

## Priority Order

| Priority | Task | Impact | Effort |
|----------|------|--------|--------|
| 🔴 P0 | Task 1: Enable indexing | High | Low |
| 🔴 P0 | Task 2: Improve LCP | High | Medium |
| 🟠 P1 | Task 4: Optimize images | Medium | Low |
| 🟠 P1 | Task 3: Reduce TBT | Medium | Medium |
| 🟡 P2 | Task 6: Accessibility | Medium | Medium |
| 🟡 P2 | Task 5: Reduce DOM | Low | Medium |
| 🟢 P3 | Task 7: Best Practices | Low | Low |

---

## Success Criteria

| Metric | Current | Target |
|--------|---------|--------|
| Performance Score | 88 | ≥95 |
| SEO Score | 69 | ≥95 |
| Accessibility Score | 85 | ≥95 |
| LCP | 3.2s | ≤2.5s |
| TBT | 220ms | ≤200ms |

---

## Related Files

- [`app/programs/search/page.tsx`](file:///Users/pavel/match/app/programs/search/page.tsx) - Page metadata and container
- [`app/programs/search/SearchClient.tsx`](file:///Users/pavel/match/app/programs/search/SearchClient.tsx) - Main search component
- [`components/student/ProgramCard.tsx`](file:///Users/pavel/match/components/student/ProgramCard.tsx) - Program card component
- [`next.config.ts`](file:///Users/pavel/match/next.config.ts) - Next.js configuration (for headers)
