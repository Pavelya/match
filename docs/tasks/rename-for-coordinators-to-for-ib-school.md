# Rename "For Coordinators" to "For IB School"

Rename the public-facing landing page from `/for-coordinators` to `/for-ib-school` and update all navigation labels from "For Coordinators" to "For IB School".

## User Review Required

> [!IMPORTANT]
> **Route rename will affect SEO**: The page `/for-coordinators` is indexed in `sitemap.ts` with priority 0.8. Renaming to `/for-ib-school` will change the URL. Consider whether a redirect from the old URL is needed.

> [!NOTE]
> **Two footer components exist**: The app has two different footers with different link structures:
> - `StudentFooter.tsx` - Used on student pages, links to `/for-coordinators`
> - `Footer.tsx` (shared) - Uses `/for-schools` route (which doesn't exist yet)
> 
> Should we align both footers to use `/for-ib-school`?

## Current State Analysis

### Footer Components

| Component | Current Label | Current Route | Location |
|-----------|---------------|---------------|----------|
| [StudentFooter.tsx](file:///Users/pavel/match/components/layout/StudentFooter.tsx#L22) | "For Coordinators" | `/for-coordinators` | Student pages footer |
| [Footer.tsx](file:///Users/pavel/match/components/shared/Footer.tsx#L45-46) | "IB Coordinators" | `/for-schools` | Shared footer (landing pages) |

### Page & Metadata References

| File | Reference | Line |
|------|-----------|------|
| [page.tsx](file:///Users/pavel/match/app/for-coordinators/page.tsx) | Route: `/for-coordinators` | Page route |
| [page.tsx](file:///Users/pavel/match/app/for-coordinators/page.tsx#L17) | `title: 'For IB Coordinators'` | 17 |
| [page.tsx](file:///Users/pavel/match/app/for-coordinators/page.tsx#L30) | `title: 'For IB Coordinators \| IB Match'` | 30 |
| [page.tsx](file:///Users/pavel/match/app/for-coordinators/page.tsx#L34) | `url: \`${baseUrl}/for-coordinators\`` | 34 |
| [page.tsx](file:///Users/pavel/match/app/for-coordinators/page.tsx#L38) | `title: 'For IB Coordinators \| IB Match'` | 38 |
| [page.tsx](file:///Users/pavel/match/app/for-coordinators/page.tsx#L42) | `canonical: \`${baseUrl}/for-coordinators\`` | 42 |
| [page.tsx](file:///Users/pavel/match/app/for-coordinators/page.tsx#L52) | `url: \`${baseUrl}/for-coordinators\`` | 52 |
| [sitemap.ts](file:///Users/pavel/match/app/sitemap.ts#L67) | `url: \`${baseUrl}/for-coordinators\`` | 67 |

### Files to Rename

The page directory needs to be renamed:
- `app/for-coordinators/` → `app/for-ib-school/`

---

## Proposed Changes

### Navigation & Footers

#### [MODIFY] [StudentFooter.tsx](file:///Users/pavel/match/components/layout/StudentFooter.tsx)

Update the footer link label and route:
```diff
-  { href: '/for-coordinators', label: 'For Coordinators' }
+  { href: '/for-ib-school', label: 'For IB School' }
```

#### [MODIFY] [Footer.tsx](file:///Users/pavel/match/components/shared/Footer.tsx)

Update the shared footer link (currently points to non-existent `/for-schools`):
```diff
-  <Link href="/for-schools" className="hover:text-foreground">
-    IB Coordinators
+  <Link href="/for-ib-school" className="hover:text-foreground">
+    For IB School
```

---

### Page Route Rename

#### [RENAME] `app/for-coordinators/` → `app/for-ib-school/`

Move the entire directory to rename the route.

---

### Metadata Updates

#### [MODIFY] [page.tsx](file:///Users/pavel/match/app/for-coordinators/page.tsx) (after rename)

Update all metadata references:
- Title: "For IB Coordinators" → "For IB School"
- OpenGraph title and URL
- Twitter title
- Canonical URL
- JSON-LD structured data

```diff
 export const metadata: Metadata = {
-  title: 'For IB Coordinators',
+  title: 'For IB School',
   description: '...',
   openGraph: {
-    title: 'For IB Coordinators | IB Match',
+    title: 'For IB School | IB Match',
-    url: `${baseUrl}/for-coordinators`
+    url: `${baseUrl}/for-ib-school`
   },
   twitter: {
-    title: 'For IB Coordinators | IB Match',
+    title: 'For IB School | IB Match',
   },
   alternates: {
-    canonical: `${baseUrl}/for-coordinators`
+    canonical: `${baseUrl}/for-ib-school`
   }
 }
```

---

### Sitemap

#### [MODIFY] [sitemap.ts](file:///Users/pavel/match/app/sitemap.ts)

```diff
     {
-      url: `${baseUrl}/for-coordinators`,
+      url: `${baseUrl}/for-ib-school`,
       lastModified: new Date(),
       changeFrequency: 'monthly',
       priority: 0.8
     },
```

---

## Verification Plan

### Manual Verification

1. **Footer Links**: After changes, navigate to any student page and verify:
   - Footer shows "For IB School" link
   - Clicking the link navigates to `/for-ib-school`
   - Page loads correctly with all sections

2. **Landing Page Access**: Verify the landing page works at the new URL:
   - Visit `/for-ib-school` directly
   - All 5 sections render (Hero, Story, Features, Dashboard, CTA)
   - Footer displays correctly on the page

3. **Build Verification**: Run `npm run build` to ensure no broken imports or missing pages.
