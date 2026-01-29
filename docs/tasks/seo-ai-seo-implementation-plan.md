# SEO & AI SEO Implementation Plan

**Created:** 2026-01-29  
**Status:** Awaiting Review  
**Priority:** High

---

## Executive Summary

This document evaluates the provided SEO and AI SEO (GEO - Generative Engine Optimization) recommendations and provides a prioritized implementation plan for the IB Match platform. After analyzing the existing SEO infrastructure and the app's unique positioning, this plan identifies **high-impact, feasible improvements** while filtering out redundant or low-ROI strategies.

### Current SEO State

**✅ Already Implemented:**
- Dynamic metadata for all pages
- Comprehensive sitemap.xml (static + 2-3K program pages)
- Robots.txt configuration
- JSON-LD structured data on program pages (EducationalOccupationalProgram schema)
- "How It Works" page explaining the algorithm
- Canonical URLs
- OpenGraph and Twitter Card metadata

**🎯 Opportunity:**
The platform has **thousands of program-specific pages** that are currently well-structured but under-optimized for long-tail keyword capture and AI search visibility.

---

## Strategy Evaluation

### 1. SEO Strategy (Traditional Search Engines)

#### A. Programmatic SEO - "Long Tail" Engine
**Status:** ⭐ **HIGH IMPACT - IMPLEMENT**

**Why It Works:**
- The platform has 2,000-3,000 program pages already indexed
- Each program page is unique with specific IB requirements
- Students search for specific queries like "Oxford Engineering IB requirements" or "Computer Science IB 40 points"
- The platform has deterministic, factual data (not competitor speculation)

**Current Implementation:**
```typescript
// app/programs/[id]/page.tsx - Line 42-43
const title = `${program.name} at ${program.university.name}`
const description = program.description.slice(0, 160)
```

**Gap:** Generic titles don't capture search intent for IB-specific queries.

**Recommendation:** ✅ **Implement enhanced dynamic metadata**

---

#### B. "Calculator" Keyword Strategy  
**Status:** ⚠️ **MODERATE IMPACT - SELECTIVE IMPLEMENTATION**

**Evaluation:**
- **Target Keywords:** "IB grade calculator," "IB to GPA converter," "University acceptance calculator"
- **Problem:** These keywords attract users looking for calculators, NOT university matching
- **Risk:** High bounce rate if users expect a simple calculator tool
- **ROI:** Low - doesn't align with core value proposition

**Recommendation:** 
- ❌ **DON'T** create a separate "IB Points Calculator" landing page (off-brand, confusing)
- ✅ **DO** enhance existing pages with calculator-adjacent language (see Task 3)

---

### 2. AI SEO Strategy (Generative Engine Optimization)

#### A. Structured Data (Schema Markup)
**Status:** ⭐ **HIGH IMPACT - EXPAND EXISTING**

**Current State:**  
Already implemented `EducationalOccupationalProgram` schema on program pages.

**Gap:**  
- No `Course` schema for IB requirements
- Missing `EducationalOccupationalCredential` schema for IB-specific admission requirements
- University pages lack comprehensive structured data

**Why It Works:**
- LLMs (ChatGPT, Perplexity, Gemini) prioritize structured data for factual queries
- Clear labeling of "IB Points Required," "HL/SL Subjects," "Country" makes data AI-parseable
- Increased chance of being cited as authoritative source

**Recommendation:** ✅ **Implement enhanced schema markup across all pages**

---

#### B. "Source of Truth" Manifesto / Technical Blog
**Status:** ⚠️ **MODERATE IMPACT - ADAPT EXISTING CONTENT**

**Original Recommendation:**
> "Publish a high-authority technical blog post based on your 'Under the Hood' source. Title: 'Why IB Match uses Deterministic Math, Not AI, for University Admissions.'"

**Evaluation:**
- **Strength:** Positions platform as factual counter to AI hallucinations
- **Weakness:** No "Under the Hood" document found in docs (user may have meant "How It Works" page)
- **Current Asset:** `/how-it-works` page already explains the algorithm
- **Risk:** "Blog post" format may feel promotional; technical documentation is more authoritative

**Recommendation:**
- ❌ **DON'T** create a separate "blog" section (adds maintenance burden)
- ✅ **DO** enhance existing `/how-it-works` page with AI-optimized content (see Task 5)
- ✅ **DO** create a dedicated `/algorithm` or `/methodology` page for deep technical explanation

---

## Implementation Plan

### Priority Legend
- 🔴 **P0:** Critical - High impact, low effort
- 🟠 **P1:** High - High impact, moderate effort  
- 🟡 **P2:** Medium - Moderate impact, moderate effort
- 🟢 **P3:** Low - Nice-to-have, low priority

---

## Task 1: Enhanced Programmatic SEO for Program Pages 🔴 P0

### Goal
Optimize all 2,000-3,000 program detail pages to capture long-tail IB-specific search queries.

### Current State
- Generic titles: `${program.name} at ${program.university.name}`
- Descriptions truncated from program description (not SEO-optimized)

### Proposed Changes

#### 1.1: Dynamic Title Tag Formula
**File:** `app/programs/[id]/page.tsx`

**New Format:**
```
IB Requirements: ${Program Name} at ${University} | ${Min Points} Points | IB Match
```

**Examples:**
- `IB Requirements: Computer Science at Oxford | 40 Points | IB Match`
- `IB Requirements: Engineering at Imperial College | 42 Points | IB Match`

**Why:** Captures searches like "Oxford Computer Science IB requirements" while front-loading keywords.

#### 1.2: SEO-Optimized Meta Descriptions
**Format:**
```
Explore IB admission requirements for ${Program} at ${University}. Minimum ${Points} IB points, ${HL/SL subjects if any}. Check your match probability based on the ${year} cycle.
```

**Example:**
```
Explore IB admission requirements for Engineering at Imperial College. Minimum 42 IB points, HL Math 6, HL Physics 6. Check your match probability based on the 2026 cycle.
```

**Why:** Includes primary keywords + call-to-action + temporal relevance.

#### 1.3: Add IB-Specific Keywords to Metadata
**Additional Keywords Array:**
```typescript
keywords: [
  `${program.name} IB requirements`,
  `${university.name} IB admission`,
  `IB ${minPoints} points ${fieldOfStudy.name}`,
  `${country.name} university IB diploma`,
  ...courseRequirements.map(req => `IB ${req.course} ${req.level}`)
]
```

**Why:** Helps search engines understand content relevance for niche queries.

### Implementation Details
- Modify `generateMetadata()` function in `app/programs/[id]/page.tsx`
- Ensure all metadata respects character limits (title ≤60 chars, description ≤160 chars)
- Handle edge cases: programs without IB points, programs with complex OR-group requirements

### Verification Plan
1. **Build Test:** Run `npm run build` to ensure no metadata generation errors
2. **Manual Test:** 
   - Navigate to 5 different program pages in dev mode
   - View page source (Ctrl+U) and verify:
     - Title tag matches new format
     - Meta description includes IB points and requirements
     - Keywords array is populated
3. **SEO Audit:** Use Google's Rich Results Test on 3 program pages to verify structured data validity
4. **Lighthouse Check:** Run Lighthouse SEO audit on program pages - target score ≥95

---

## Task 2: Expand Schema.org Structured Data 🔴 P0

### Goal
Enhance structured data to maximize AI search engine visibility and citation probability.

### Current State
- `EducationalOccupationalProgram` schema implemented on program pages
- No `Course` schema for IB requirements
- University pages lack structured data

### Proposed Changes

#### 2.1: Add `Course` Schema for IB Requirements
**File:** `app/programs/[id]/page.tsx`

**New Schema Addition:**
```typescript
const courseRequirementsSchema = program.courseRequirements.map(req => ({
  '@type': 'Course',
  'name': req.ibCourse.name,
  'courseCode': req.ibCourse.code,
  'educationalLevel': req.requiredLevel, // "HL" or "SL"
  'competencyRequired': `Minimum grade ${req.minGrade}`,
  'inLanguage': 'en',
  'provider': {
    '@type': 'Organization',
    'name': 'International Baccalaureate'
  }
}))
```

**Why:** Makes IB course requirements machine-readable for AI engines.

#### 2.2: Add `EducationalOccupationalCredential` for Admission Requirements
**New Schema Addition:**
```typescript
const admissionRequirements = {
  '@type': 'EducationalOccupationalCredential',
  'credentialCategory': 'International Baccalaureate Diploma',
  'competencyRequired': `${program.minIBPoints} IB Points`,
  'educationalLevel': 'High School',
  'recognizedBy': {
    '@type': 'CollegeOrUniversity',
    'name': program.university.name
  }
}
```

**Why:** Explicitly declares IB diploma as the credential required, helping AI understand admission context.

#### 2.3: Add Comprehensive Schema to University Pages
**File:** `app/universities/[id]/page.tsx`

**New Schema:**
```typescript
const universitySchema = {
  '@context': 'https://schema.org',
  '@type': 'CollegeOrUniversity',
  'name': university.name,
  'url': university.websiteUrl,
  'description': university.description,
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': university.city,
    'addressCountry': university.country.code
  },
  'numberOfStudents': university.studentPopulation,
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Academic Programs',
    'itemListElement': university.programs.map(p => ({
      '@type': 'Offer',
      'itemOffered': {
        '@type': 'EducationalOccupationalProgram',
        'name': p.name,
        'url': `${baseUrl}/programs/${p.id}`
      }
    }))
  }
}
```

**Why:** University pages become citable sources for AI engines answering "What programs does X university offer for IB students?"

### Implementation Details
- Update `app/programs/[id]/page.tsx` to include new schemas
- Create or update `app/universities/[id]/page.tsx` with university schema
- Validate all schemas using Google's Structured Data Testing Tool

### Verification Plan
1. **Schema Validation:**
   - Use [Google Rich Results Test](https://search.google.com/test/rich-results) on 5 program pages
   - Verify all new schemas (`Course`, `EducationalOccupationalCredential`) are detected without errors
2. **University Page Test:**
   - Navigate to 3 university pages in dev mode
   - View page source and verify `CollegeOrUniversity` schema is present and valid
3. **Build Test:** Run `npm run build` to ensure no serialization errors in JSON-LD

---

## Task 3: Optimize Search Page for Discovery Keywords 🟡 P2

### Goal
Enhance the `/programs/search` page to capture broader "university finder" and "IB matching" queries.

### Current State
- Title: "Search Programs"
- Description: "Search and discover university programs that match your IB profile."
- Generic metadata, not optimized for discovery keywords

### Proposed Changes

#### 3.1: Enhanced Search Page Metadata
**File:** `app/programs/search/page.tsx`

**New Title:**
```
Find Your University: IB Program Search & Matching Tool | IB Match
```

**New Description:**
```
Search 2,000+ university programs by IB points, subjects, and location. See your match probability for programs worldwide based on your IB Diploma grades.
```

**Additional Keywords:**
```typescript
keywords: [
  'IB university search',
  'IB program finder',
  'university IB requirements',
  'IB points university match',
  'find university for IB student',
  'IB diploma university acceptance',
  'international baccalaureate university programs'
]
```

**Why:** Captures users searching for "find university IB" or "IB program search" without misleading them about calculator functionality.

#### 3.2: Add FAQ Schema to Search Page
**New Schema:**
```typescript
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'How many IB points do I need for university?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'University IB point requirements vary from 24 to 45 points. Use our search tool to find programs matching your predicted IB grade.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Can I search universities by IB subjects?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes, filter by required IB subjects (HL/SL) to find programs matching your course selection.'
      }
    }
  ]
}
```

**Why:** FAQ schema increases chances of appearing in "People also ask" boxes and AI summaries.

### Implementation Details
- Edit `app/programs/search/page.tsx` metadata export
- Add FAQ schema to page (consider adding visible FAQ section for UX consistency)

### Verification Plan
1. **Rich Results Test:** Validate FAQ schema using Google's tool
2. **Manual Check:** View `/programs/search` source and verify updated metadata
3. **Lighthouse SEO:** Run audit, target score ≥95

---

## Task 4: Create "IB University Requirements" Landing Page 🟠 P1

### Goal
Create a high-authority landing page targeting the query "IB university requirements" that serves as an entry point to the platform.

### Rationale
- High search volume for generic "IB university requirements" or "IB diploma university admission"
- Opportunity to rank for broad informational queries and funnel to program search
- Differentiates from program-specific pages (broader intent)

### Proposed Content Structure

**URL:** `/ib-university-requirements`

**Title:** `IB University Requirements 2026/27: Complete Guide by Country & Program | IB Match`

**Description:** `Comprehensive guide to IB Diploma university requirements worldwide. Compare IB points, subject requirements (HL/SL), and admission criteria for 2,000+ programs.`

**Content Sections:**
1. **Hero:** "Understand IB University Requirements"
2. **Quick Stats:**
   - Countries with programs: X
   - Total programs: 2,000+
   - IB Points range: 24-45
3. **By Country:** Interactive table showing IB requirements by country (min/max points, common subjects)
4. **By Field of Study:** Average IB requirements for Engineering, Business, Medicine, etc.
5. **How to Use Your IB Points:** Explanation of scoring + link to search
6. **CTA:** "Find Programs Matching Your IB Profile"

### Schema Markup
```typescript
{
  '@type': 'WebPage',
  'name': 'IB University Requirements Guide',
  'description': 'Complete guide to IB Diploma admission requirements for universities worldwide',
  'about': {
    '@type': 'EducationalOccupationalCredential',
    'credentialCategory': 'International Baccalaureate Diploma'
  }
}
```

### Implementation Details
- Create `app/ib-university-requirements/page.tsx`
- Use server-side data fetching to pull stats from database (min/max points, countries, fields)
- Style as informational guide (not sales pitch)
- Add to sitemap with priority 0.9

### Verification Plan
1. **Build Test:** Ensure page builds without errors
2. **Manual Review:** Navigate to page and verify all stats are dynamically loaded
3. **SEO Check:** Rich Results Test + Lighthouse audit
4. **Internal Linking:** Add link from footer and `/how-it-works` page

---

## Task 5: Enhance "How It Works" for AI Search Visibility 🟠 P1

### Goal
Transform the existing `/how-it-works` page into an AI-optimized "source of truth" document that LLMs will cite when answering IB university matching queries.

### Current State
- Page exists at `/how-it-works`
- Explains Algolia search, three-factor scoring, and "No AI" philosophy
- Has JSON-LD schema as `WebPage` and `SoftwareApplication`

### Proposed Enhancements

#### 5.1: Content Additions
**New Section: "Why Deterministic Matching Beats AI for University Admissions"**

**Key Points to Add:**
- **Problem with AI:** ChatGPT hallucinates IB requirements, provides outdated data
- **IB Match Solution:** Deterministic algorithm using verified university data
- **Transparency:** Exact formula disclosed (link to algorithm doc if public-facing version exists)
- **Accuracy:** "No guessing—only facts from official university sources"

**Why:** Positions the platform as anti-AI-hallucination, increasing citation probability when AI engines are asked "How accurate is AI for university matching?"

#### 5.2: Add Technical Methodology Section
**Content:**
```markdown
### Our Matching Methodology

IB Match uses a three-factor compatibility score:
1. **Academic Match (60%):** Fit Quality Score comparing your IB points and subject grades to program requirements
2. **Location Match (30%):** Alignment with your preferred study countries
3. **Field Match (10%):** Match with your academic interests

Unlike AI-based systems, our algorithm is:
- **Deterministic:** Same input = same output, every time
- **Explainable:** See exactly why you matched with each program
- **Data-driven:** Based on official 2026/27 admission requirements (updated quarterly)
```

**Why:** Makes the page citable for queries like "How does IB Match calculate compatibility?"

#### 5.3: Enhanced Schema for E-E-A-T
**Add to existing schema:**
```typescript
{
  '@type': 'TechArticle',
  'headline': 'How IB Match Works: Deterministic University Matching for IB Students',
  'author': {
    '@type': 'Organization',
    'name': 'IB Match Team'
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'IB Match'
  },
  'datePublished': '2024-12-01',
  'dateModified': new Date().toISOString(),
  'description': 'Technical explanation of IB Match\'s deterministic matching algorithm',
  'keywords': 'IB matching algorithm, university matching system, deterministic algorithm'
}
```

**Why:** `TechArticle` schema signals expertise and authority to AI engines (E-E-A-T signal).

### Implementation Details
- Edit `app/how-it-works/page.tsx` and component files
- Add new content sections without removing existing content
- Update schema to include `TechArticle` type

### Verification Plan
1. **Content Review:** User reviews new sections for tone and accuracy
2. **Schema Test:** Rich Results Test validates `TechArticle` schema
3. **Lighthouse:** SEO score ≥95

---

## Task 6: Sitemap & Robots.txt Enhancements 🟢 P3

### Goal
Optimize sitemap for AI crawler discovery and add hints for AI engines.

### Current State
- Dynamic sitemap includes all programs
- Robots.txt allows crawling of public pages

### Proposed Changes

#### 6.1: Add Priority Hints to Sitemap
**File:** `app/sitemap.ts`

**Current Priority:**
- Programs: 0.8
- Search: 0.9
- Home: 1.0

**Recommended Adjustment:**
- Programs with IB requirements: **0.85** (higher priority)
- Programs without IB requirements: **0.75** (lower priority)
- New "IB Requirements" landing page: **0.9**

**Why:** Signals to crawlers which pages are most valuable (IB-specific content).

#### 6.2: Add `lastmod` Accuracy
**Enhancement:**
Use `program.updatedAt` for dynamic lastmod instead of generic `new Date()`

**Why:** Helps AI engines understand content freshness.

### Implementation Details
- Modify sitemap generation logic to prioritize programs with `minIBPoints !== null`
- Ensure `updatedAt` timestamps are accurate in database

### Verification Plan
1. **Sitemap Check:** Visit `/sitemap.xml` and verify priority values
2. **Build Test:** No sitemap generation errors

---

## Task 7: Google Search Console Integration 🟢 P3

### Goal
Leverage Google Search Console to monitor SEO performance and discover new keyword opportunities.

### Actions
1. **Submit sitemap** to Google Search Console (if not already done)
2. **Monitor Core Web Vitals** - ensure all pages meet Google's performance thresholds
3. **Track keyword rankings** for target queries:
   - "IB university requirements"
   - "[University name] IB requirements"
   - "IB [points] university programs"
4. **Analyze "People also ask" queries** - identify content gaps

### Implementation Details
- Admin sets up Google Search Console (no code changes required)
- Weekly monitoring for first 3 months, then monthly

### Verification Plan
- User confirms Search Console access and sitemap submission
- No technical implementation needed

---

## Rejected / Deprioritized Recommendations

### ❌ Rejected: Separate "IB Points Calculator" Landing Page
**Why:**
- Off-brand: Platform is a matching tool, not a calculator
- High bounce risk: Users expecting calculator get university search instead
- Keyword mismatch: "Calculator" searchers have different intent than "matching" searchers

**Alternative:** Use calculator-adjacent language on existing pages (see Task 3).

---

### ❌ Rejected: Separate Blog Section
**Why:**
- Maintenance burden: Blog requires ongoing content creation
- Dilutes focus: Platform strength is in data, not content marketing
- AI engines don't prioritize blogs over technical documentation

**Alternative:** Enhance existing pages to serve as authoritative sources (see Task 5).

---

### 🔄 Deprioritized: Ubersuggest / Keyword Research Tools
**Why:**
- Not a technical implementation task
- User can conduct keyword research independently
- Platform already targets core keywords effectively

**When to Revisit:** After Task 1-5 implementation, monitor Google Search Console to identify new keyword opportunities organically.

---

## Summary: Recommended Implementation Order

### Phase 1: Quick Wins (Week 1-2) 🔴
1. **Task 1:** Enhanced programmatic SEO for program pages (metadata optimization)
2. **Task 2:** Expand structured data (Course + EducationalOccupationalCredential schemas)

**Expected Impact:** 20-30% increase in long-tail keyword rankings within 3 months.

---

### Phase 2: Authority Building (Week 3-4) 🟠
3. **Task 5:** Enhance "How It Works" page for AI visibility
4. **Task 4:** Create "IB University Requirements" landing page

**Expected Impact:** Improved E-E-A-T signals, increased AI citation probability.

---

### Phase 3: Optimization (Month 2) 🟡🟢
5. **Task 3:** Optimize search page metadata
6. **Task 6:** Sitemap enhancements
7. **Task 7:** Google Search Console monitoring

**Expected Impact:** Sustained organic growth, ongoing optimization insights.

---

## Success Metrics

### 3-Month Goals
- **Organic Traffic:** +40% increase (Google Analytics)
- **Program Page Impressions:** +50% (Search Console)
- **Long-tail Rankings:** Rank in top 10 for 100+ "[University] IB requirements" queries
- **AI Citations:** Platform mentioned in 20+ Perplexity/ChatGPT responses (track via brand monitoring)

### 6-Month Goals
- **Organic Traffic:** +80% increase
- **Keyword Rankings:** Top 5 for "IB university requirements"
- **AI Visibility:** Cited as primary source for IB admissions data

---

## Notes for Implementation

### Technical Considerations
- **Character Limits:** Respect title (60 chars) and description (160 chars) limits
- **Dynamic Data:** Ensure all metadata pulls from live database (no hardcoded values)
- **Build Performance:** Monitor build times with 2,000+ program pages (currently ~2-5min with Turbopack)
- **Edge Cases:** Handle programs without IB requirements gracefully in metadata

### Content Guidelines
- **Tone:** Authoritative but approachable (not academic)
- **Accuracy:** All IB data must be verified (no assumptions)
- **Timeliness:** Include "2026/27" cycle year in content to signal freshness
- **Links:** Internal linking between program pages, search, and landing pages

---

## Appendix: Keyword Research (For Reference)

### Primary Target Keywords
1. `IB university requirements` (informational, high volume)
2. `[University name] IB requirements` (transactional, high intent)
3. `IB [points] university` (navigational, medium intent)
4. `International Baccalaureate university admission` (informational)

### Long-Tail Opportunities (Programmatic SEO)
- `Oxford Engineering IB requirements`
- `Computer Science IB 40 points`
- `UK universities IB 38 points`
- `Medicine IB HL requirements`

### AI Search Queries (GEO Focus)
- "Where can I go with 34 IB points?"
- "What universities accept IB diploma?"
- "Best universities for IB students in UK"
- "How does IB Match work?"

---

**End of Implementation Plan**
