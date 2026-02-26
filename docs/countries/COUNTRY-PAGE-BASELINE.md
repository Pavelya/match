# Country IB Landing Page — Baseline Technical Spec

> **Purpose:** This document contains everything an AI agent needs to create a new `/study-in-{country}-with-ib-diploma` landing page.  
> **Input required:** Country name only. Everything else is derived from this spec + research.

---

## 1. Task Overview

Each country page lives at:

```
app/study-in-{country-slug}-with-ib-diploma/
├── page.tsx              # Metadata, JSON-LD schemas, layout wrapper
└── {Country}Content.tsx  # Client component with all visible content
```

Additionally:
- **`app/sitemap.ts`** must be updated with the new route
- No changes to `robots.ts`, `layout.tsx`, or `next.config.ts` are needed

---

## 2. Research Phase — Official Source Investigation

### 2.1 Research goals

Before writing any code, the agent **must** research and document:

| Topic | What to find |
|-------|-------------|
| **IB Recognition** | How the country officially recognizes the IB Diploma (automatic, equivalence, credential evaluation, etc.) |
| **Diploma Equivalence** | Whether IB students need a local secondary diploma or if IB is standalone |
| **Admission System** | Centralized vs decentralized; national platform vs university-direct |
| **Grade Conversion** | Whether an official IB-to-local grade conversion exists (table, formula, none) |
| **Entrance Exams** | Whether any programs (Medicine, Engineering, etc.) require mandatory entrance exams |
| **Language Requirements** | Language(s) of instruction and proficiency requirements for IB students |
| **University Types** | Public vs private distinction and how it affects IB admission |
| **Required Documents** | Typical application documents for IB students |
| **Application Timeline** | Key deadlines (applications, equivalence, enrollment) |
| **FAQ Material** | 4–6 common questions IB students ask about studying in the country |

### 2.2 How to search for official sources

**Priority order for sources:**

1. **Government education portals** (e.g., `education.gov.xx`, `study-in-{country}.xx`)
2. **National credential recognition agencies** (e.g., NARIC, NUFFIC, ENIC, WES)
3. **Official university admission pages** (e.g., top 3–5 universities in the country)
4. **IBO recognition database** at `ibo.org` (search for the country)
5. **Regional/state education agencies** (for federal countries)

**Search queries to use (replace `{Country}` with actual name):**

```
{Country} IB diploma university admission official government
{Country} international baccalaureate equivalence recognition official
{Country} university entrance exam IB students
{Country} study in {country} IB diploma requirements 2026
site:ibo.org {Country} recognition
```

**⚠️ Critical rules:**

- **Every URL must be validated** using `read_url_content` before being included — only use URLs that return HTTP 200
- Never use URLs from aggregator sites (studyportals, topuniversities, etc.) as primary sources
- If a government URL is unreachable (timeout, connection reset), note it as a text reference without a hyperlink
- Prefer English-language pages when available; if only native-language pages exist, reference them but describe content in English

### 2.3 Country code

Use the **ISO 3166-1 alpha-2** country code (e.g., `BE`, `CA`, `AU`, `DE`). This is used in:
- The CTA link: `/programs/search?countries={COUNTRY_DB_ID}` (the country's Prisma database ID — see §9.2 below)
- Schema markup

---

## 3. File 1: `page.tsx` — Metadata & JSON-LD Schemas

### Template structure

```tsx
import { Metadata } from 'next'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { {Country}Content } from './{Country}Content'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days
```

### 3.1 Metadata export

| Field | Format |
|-------|--------|
| `title` | `Study in {Country} with IB Diploma \| Official University Guide (2026)` — max 60 chars |
| `description` | Max 155 chars. Must mention IB, country name, and 2–3 key topics |
| `keywords` | Array of 6–8 long-tail keywords. Always include: `study in {country} with ib diploma`, `ib diploma {country} university admission` |
| `openGraph.title` | Same as title |
| `openGraph.description` | Slightly expanded version of meta description |
| `openGraph.type` | `'website'` |
| `openGraph.url` | `${baseUrl}/study-in-{country-slug}-with-ib-diploma` |
| `openGraph.siteName` | `'IB Match'` |
| `twitter.card` | `'summary_large_image'` |
| `alternates.canonical` | Same as OG URL |
| `robots` | `{ index: true, follow: true }` |

### 3.2 JSON-LD schemas (3 required)

**Schema 1: WebPage**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Study in {Country} with the IB Diploma",
  "description": "...",
  "url": "...",
  "isPartOf": { "@type": "WebSite", "name": "IB Match", "url": baseUrl },
  "about": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "International Baccalaureate Diploma",
    "description": "University admission requirements for IB Diploma holders in {Country}"
  },
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": ["IB Student", "IB Coordinator", "Parent"]
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".content-section p", "article p", ".faq-answer"]
  }
}
```

**Schema 2: Article (E-E-A-T)**
- `datePublished`: `'2025-01-01'`
- `dateModified`: `new Date().toISOString().split('T')[0]`
- `author` and `publisher`: `{ "@type": "Organization", "name": "IB Match", "url": baseUrl }`
- `about` array: Include country-specific entities (recognition body, IB credential, country)

**Schema 3: FAQPage**
- 4–6 questions matching the FAQ section text **exactly**
- Each answer must include a `Source:` attribution

### 3.3 Default export

```tsx
export default function StudyIn{Country}Page() {
  return (
    <>
      <script type="application/ld+json" ... /> {/* WebPage */}
      <script type="application/ld+json" ... /> {/* Article */}
      <script type="application/ld+json" ... /> {/* FAQPage */}
      <main className="flex min-h-screen flex-col">
        <{Country}Content />
      </main>
      <StudentFooter />
    </>
  )
}
```

---

## 4. File 2: `{Country}Content.tsx` — Content Sections

### 4.1 File header

```tsx
'use client'

import Link from 'next/link'
import {
  CheckCircle2, FileText, Building2, ArrowRight,
  Search, ExternalLink, Languages, // + any extra icons needed
} from 'lucide-react'
```

### 4.2 Data arrays (defined before the component)

| Array | Purpose |
|-------|---------|
| `requiredDocuments` | String array of 5–6 documents |
| `timelineSteps` | Array of `{ period, description }` objects (3–5 items) |
| `faqs` | Array of `{ question, answer, source, sourceUrl }` — must match FAQ schema exactly |
| Country-specific data | Any tables (e.g., grade conversion) relevant to the country |

### 4.3 Content sections (in order)

Every page **must** include these sections in this order. Alternate `bg-white` and `bg-gray-50` backgrounds.

| # | Section | Background | Key elements |
|---|---------|-----------|-------------|
| 1 | **Hero** | `bg-white` | Country flag emoji in badge, h1 with `<span className="text-blue-600">IB Diploma</span>`, subtitle, 3 trust badges (IB Diploma only / Official sources / 2026 intake) |
| 2 | **Recognition** | `bg-gray-50` | How the country recognizes IB. Official source links |
| 3 | **Equivalence / Local Diploma** | `bg-white` | Yes/No answer in a colored card. Green for "No" (IB standalone), Amber for caveats |
| 4 | **Admission System** | `bg-gray-50` | Centralized vs decentralized. Checklist of how admission works |
| 5 | **Grade Evaluation** | `bg-white` | How IB scores are assessed. Include conversion table if one exists |
| 6 | **Entrance Exams** | `bg-gray-50` | Which programs require them (or "Usually no") |
| 7 | **Language Requirements** | `bg-white` | Cards for each language. Use `Languages` icon |
| 8 | **University Types** | `bg-gray-50` | Public vs Private, 2-column grid |
| 9 | **Required Documents** | `bg-white` | List with `FileText` icons |
| 10 | **Application Timeline** | `bg-gray-50` | Numbered steps with `bg-blue-600` circles |
| 11 | **FAQ** | `bg-white` | Rendered from `faqs` array. **Must include the internal link block** |
| 12 | **CTA** | `bg-gray-50` | Flag emoji, heading, two buttons |

### 4.4 Internal link block (MANDATORY — inside FAQ section)

This block must appear after the FAQ list, inside the same section:

```tsx
<div className="mt-8 rounded-xl bg-blue-50 p-6 border border-blue-100">
  <p className="text-gray-700">
    Learn{' '}
    <Link href="/how-it-works" className="text-blue-600 font-medium hover:underline">
      how IB Match evaluates {Country adjective} admission
    </Link>{' '}
    requirements for your profile.
  </p>
</div>
```

Replace `{Country adjective}` with the appropriate demonym (e.g., "Canadian", "Belgian", "Australian").

### 4.5 CTA section (MANDATORY — final section)

Two buttons:

| Button | Style | href |
|--------|-------|------|
| **Primary** | `bg-blue-600` rounded-full | `/auth/signin` |
| **Secondary** | White border rounded-full | `/programs/search?countries={COUNTRY_DB_ID}` |

Text:
- Primary: `Get Started — It's Free` with `ArrowRight` icon
- Secondary: `Explore Programs in {Country}` with `Search` icon
- Subtext: `100% free for students. No credit card required.`

---

## 5. Sitemap Update

Add to `app/sitemap.ts` inside the return array, grouped with other country pages:

```typescript
{
  url: `${baseUrl}/study-in-{country-slug}-with-ib-diploma`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8
},
```

---

## 6. Design System Reference

### Color palette used across all sections

| Element | Classes |
|---------|---------|
| Section label (above h2) | `text-base font-semibold leading-7 text-blue-600` |
| Section heading (h2) | `text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl` |
| Hero h1 | `text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl` |
| Body text | `text-base leading-7 text-gray-600` |
| Positive callout card | `rounded-2xl bg-green-50 p-8 border border-green-100` |
| Warning callout card | `rounded-2xl bg-amber-50 p-8 border border-amber-100` |
| Info callout card | `rounded-2xl bg-blue-50 p-8 border border-blue-100` |
| Source box | `rounded-xl bg-white p-6 shadow-sm border border-gray-200` |
| Content card | `rounded-2xl bg-white p-8 border border-gray-200 shadow-sm` |
| Trust badge | `inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600` |
| Primary CTA | `rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-all duration-200 hover:-translate-y-0.5` |
| Secondary CTA | `rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200` |

### Layout constraints

- Max content width: `max-w-3xl` inside `max-w-7xl` container
- Section padding: `py-16 sm:py-24`
- CTA section padding: `py-24 sm:py-32`

---

## 7. SEO Checklist

Before considering the page complete, verify:

- [ ] `title` tag ≤ 60 characters
- [ ] `description` ≤ 155 characters
- [ ] Canonical URL set correctly
- [ ] 3 JSON-LD schemas present (WebPage, Article, FAQPage)
- [ ] FAQ schema questions match page text **exactly**
- [ ] All external URLs validated (HTTP 200)
- [ ] Country flag emoji present in hero badge and CTA section
- [ ] Internal link to `/how-it-works` present
- [ ] CTAs to `/auth/signin` and `/programs/search?countries={COUNTRY_DB_ID}` present
- [ ] Page added to `app/sitemap.ts`
- [ ] Country added to `COUNTRY_GUIDE_SLUGS` in `app/ib-university-requirements/page.tsx` (see §9.1)
- [ ] `export const dynamic = 'force-static'` set
- [ ] `export const revalidate = 604800` set
- [ ] `npx next build` passes with exit code 0
- [ ] Page appears as `○ (Static)` in build output

---

## 8. Tone & Safety Rules

### Required

- Neutral, factual, student-first tone
- No marketing language in content sections
- Explicit "IB Diploma only" scope
- Dates visible ("Last updated for the 2026 intake")
- Every claim backed by an official source

### Forbidden phrases

- "Easy admission", "Guaranteed", "Best universities", "Fast-track", "Top-ranked"
- Any promise of admission outcomes
- Any university rankings or comparisons

---

## 9. Verification

After implementation, run:

```bash
npx next build
```

The page must:
1. Compile without errors (exit code 0)
2. Appear in the route table as `○ (Static)`
3. Be listed in `sitemap.xml`

### 9.1 Register on the Catalog Page

Every new country page **must** be added to the `COUNTRY_GUIDE_SLUGS` map in `app/ib-university-requirements/page.tsx`. This is what makes the country appear as a **primary card** (with a direct link to the guide) on the `/ib-university-requirements` catalog page.

Add an entry like this:

```typescript
// In COUNTRY_GUIDE_SLUGS (app/ib-university-requirements/page.tsx)
'{ISO_CODE}': {
  slug: '{country-slug}',          // must match the folder name: study-in-{slug}-with-ib-diploma
  summary: '{System summary}'      // e.g. "UCAS Tariff points · Conditional offers based on IB total"
},
```

**Fields:**
- `{ISO_CODE}` — ISO 3166-1 alpha-2 country code (e.g., `NL`, `FR`, `JP`)
- `slug` — the slug used in the page folder name (`study-in-{slug}-with-ib-diploma`)
- `summary` — a short one-liner describing the admission system (shown on the card)

Without this entry, the country will appear under "More Countries" as a secondary card linking to program search instead of the guide page.

### 9.2 Country Database ID for CTA Links

The program search page uses the **Prisma database ID** (CUID) for filtering, not the ISO country code. The CTA "Search Programs in {Country}" must link to:

```
/programs/search?countries={COUNTRY_DB_ID}
```

**How to find the country DB ID:**

1. Check the catalog page's server component — after aggregation, each country object includes its `id` field
2. Or query the database directly: `npx prisma studio` → Country table → find the row → copy the `id`
3. Or run: `npx ts-node -e "import {prisma} from './lib/prisma'; prisma.country.findFirst({where:{code:'{ISO_CODE}'}}).then(c=>console.log(c?.id))"`

Example: Spain's DB ID is `cmkxwd9ui0000lg04p0t1gmln`, so the link is `/programs/search?countries=cmkxwd9ui0000lg04p0t1gmln`.
