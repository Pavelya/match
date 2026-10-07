# 01 · Current-state audit

**How this was done (2026-10-05):**

- Read every student-facing route and component: `app/page.tsx`, `app/programs/**`, `app/universities/**`,
  `app/student/**`, `app/auth/signin`, `components/{student,layout,shared,ui}`, `app/globals.css`.
- Screenshots of production at 1440×900 and 390×844, with headless Chrome. The logged-out pages are in the
  canvas's "Today" board.
- Page weight and LCP/CLS measured on production, mobile emulation.
- Contrast ratios computed from the actual token values.
- **Logged-in screens** were first reviewed from code, then checked against 14 screenshots the owner
  supplied on 2026-10-06: onboarding steps 1–3, the add-subject dialog, the diploma warning,
  matches, empty matches, settings, sign-in and phone onboarding. The code-based findings held.
  Findings that came only from those screenshots are marked **(S)**.

Severity: **High** = breaks trust, blocks a task, or fails WCAG AA. **Medium** = visibly dated or
slows the task. **Low** = polish.

---

## 1 · Navigation and page shell

| # | Finding | Evidence | Severity |
|---|---|---|---|
| 1.1 | **About 30 public pages have no header.** Home, the 22 `study-in-*` guides, `/ib-university-requirements`, `/how-it-works`, `/faqs`, `/contact`, `/support-us` and `/universities/[id]` render with no logo, navigation or sign-in. Only `/programs/*`, `/student/*` and the three legal pages include `StudentHeader`. A visitor from search lands on a dead end. | `grep -l StudentHeader app` | High |
| 1.2 | **Logged-out header lists four destinations that all lead to sign-in** (My Matches, Saved Programs, Academic Profile, Settings) and one that works (Program Search). | `components/layout/StudentHeader.tsx:42` | Medium |
| 1.3 | **"Academic Profile" opens the onboarding wizard**, whose heading is hard-coded "Update Your Profile", so a new student is told to update a profile they never made. | `components/ui/step-indicator.tsx:42` | Medium |
| 1.4 | **Back links use `window.history.back()`.** From a Google result, "← Back to results" leaves the site. The university page always says "Back to program", even when the student came from search. | `ProgramCard.tsx:500-507`, `UniversityDetailClient.tsx:76,91` | Medium |
| 1.5 | **Two footers.** `StudentFooter` (one row of links) and an unused `components/shared/Footer.tsx` that links to routes that do not exist (`/programs`, `/universities`, `/about`, `/pricing`, `/for-schools`, `/auth/signup`). The same file has an unused `Header.tsx`. | `components/shared/Footer.tsx`, `Header.tsx` | Low (dead code) |
| 1.6 | The phone bottom bar has no Profile or Settings item; settings are reachable only through the header avatar. Its "Academic" tab reopens the onboarding wizard (see 1.3). "Matches" uses a **heart** next to "Saved" with a **bookmark**, so there are two "favourite" metaphors side by side. | `components/layout/MobileBottomNav.tsx:30` | Low |
| 1.7 | **(S)** Settings is well organised (profile, school connection, session, data and privacy) but is a separate destination from the academic profile, and there is no place for an appearance (light, dark, system) preference. On a phone the two belong behind one Profile tab. | `/student/settings` | Low |

## 2 · Visual identity and consistency

| # | Finding | Evidence | Severity |
|---|---|---|---|
| 2.1 | **Three blues.** Logo #3573E5; app `--primary` oklch(0.576 0.185 254), about #0078E2; landing and marketing CTAs use Tailwind `blue-600`, #155DFC. The cookie banner adds a fourth shade. Side by side the difference is visible. | `public/logo-restored.svg`, `app/globals.css:52`, `app/landing/students/_components/Hero.tsx:33` | Medium |
| 2.2 | **Two styling systems.** Marketing and content pages use hard-coded palette classes: 4,260 in the country guides, 336 in home, how-it-works and FAQs, against 3 token classes. The app uses tokens: 694 token classes against 119 hard-coded. A re-theme through `globals.css` would not reach about 30 public pages. | class counts across `app/` | High (for any redesign) |
| 2.3 | **Template look.** Pill badge, two-tone headline ("Find Your Perfect / University Match"), generic illustration of people and a network, a four-column icon feature grid, and an all-blue CTA band. The same sequence appears on how-it-works, the requirements hub and every country guide. Nothing about it says IB. | screenshots | Medium |
| 2.4 | **The logo is live text in an SVG.** `<text font-family="Inter">`. In an `<img>` the browser cannot load web fonts, so the logo renders in Helvetica on macOS and Arial or Segoe on Windows. "Match" at 48px is about 9px tall. The favicon is `<text>` in Arial. | `public/logo-restored.svg:6,9`, `public/favicon.svg:6` | Medium |
| 2.5 | **Radius drift.** `rounded-xl` 323 times, `rounded-2xl` 252, `rounded-lg` 200, `rounded-full` 183. Buttons are pills on marketing pages and 6px in the app; filter chips are 12px; cards are 12px and 16px. | class counts | Low |
| 2.6 | **Dark mode tokens exist but are greyscale shadcn defaults and never used.** `<html className="light">` is forced, so students on dark OS settings get a white page at night. | `app/layout.tsx:121`, `app/globals.css:124` | Medium |
| 2.7 | **Emoji as interface icons** in onboarding (📝 Extended Essay, 💡 TOK), the cookie banner title (🍪) and the field fallback (📚). Emoji render differently on every OS, and this breaks the repo's own rule in `docs/UX/icons-reference.md`. | `DetailedGradesInput.tsx:300,336`, `CookieConsentBanner.tsx:150` | Low |
| 2.8 | **(S)** The page ground changes between screens: onboarding is grey (`bg-muted/30`), matches and settings are white. | `app/student/onboarding/layout.tsx:14` | Low |

## 3 · Components and density

| # | Finding | Evidence | Severity |
|---|---|---|---|
| 3.1 | **`ProgramCard` is 1,278 lines doing three jobs** (match card, search card, program detail page). The requirement and preference tile markup is duplicated four times inside it. Any visual change has to be made in several places. | `components/student/ProgramCard.tsx` | Medium (for any redesign) |
| 3.2 | **Match card about 700px tall**: 192px image, title, a grey "quick info" bar, a full-width "View Program Details" button, a score bar, then two 3-column tile grids for requirements and preferences. Ten matches take about ten screens. Field and country appear twice. | screenshots, `ProgramCard.tsx:930-1273` | Medium |
| 3.3 | **Search results are the same big card without the match section.** 50 per page. On a phone each result is about 1.4 screens because the image is full width at 16:9. The key comparison number (minimum IB points) is small blue text that looks like a link. | `SearchClient.tsx:104`, phone screenshot | Medium |
| 3.4 | **Double padding.** `Card` adds `py-6`, `CardContent` is `p-0`, and the inner block adds `p-5 sm:p-6`, which leaves about 48px of empty space above every card's content. | `components/ui/card.tsx:18`, `ProgramCard.tsx:932` | Low |
| 3.5 | **Status colours do not form a system.** The match label is green ("Excellent", "Strong"), blue ("Good"), amber or red; a met requirement is brand blue, a partial one orange, a missing one red; the unused `MatchBreakdown` uses green, blue, yellow and orange. "Met" in blue reads as a link or a selection, not as success. | `ProgramCard.tsx:175-181`, `MatchBreakdown.tsx:26-41` | Medium |
| 3.6 | **The progress bar is the same blue at 92% and at 41%.** The number carries all the meaning. | `ProgramCard.tsx:1056` | Low |
| 3.7 | **Either/or requirements render as long run-on strings** ("Mathematics: Analysis and Approaches or Mathematics: Applications and Interpretation") in a small tile, and groups that list one course at two levels or grades read as repeats ("Analysis and Approaches or Analysis and Approaches"). The card prints the first option's level and grade for every option. The data is right. | live pages; **tracked as `MAINT_tasks.md` 5.7** | Medium |
| 3.8 | **(S) Onboarding pickers are large cards.** Twelve field cards about 236px tall. The **22 countries are cards in 6 rows on desktop and 11 on a phone** (about 1,900px of scrolling), and Continue appears only after the last row. There is no sticky action bar. Education and Media have no icon mapping, so both fall back to the same open book. | screenshots, `lib/icons.tsx:113` | Medium |
| 3.9 | **(S) Requirement tiles say "SL • Required: 4 ✓ Requirement met" without the student's own grade.** A "100% Excellent Match" cannot be checked by eye. | match card screenshot | Medium |

## 4 · Matches and trust

| # | Finding | Evidence | Severity |
|---|---|---|---|
| 4.1 | **The logged-out Save button lies.** On a program page `onSave` is undefined for logged-out users, but the card still flips to "Saved". On search the POST returns 401 and the bookmark still fills. Nothing was saved. | `ProgramCard.tsx:441-449`, `ProgramDetailClient.tsx:174`, `api/students/saved-programs/route.ts:23` | High |
| 4.2 | **Empty "Academic Requirements" when logged out.** The IB points tile renders only when `matchResult` exists. For a program with no named subjects, a logged-out visitor sees the heading and the entry-year note with nothing under them (University of Sydney, Medicine). | `ProgramCard.tsx:658` | High |
| 4.3 | **The explanation of a match is built but not shown.** `MatchBreakdown.tsx` (weights, caps, near-misses) is imported nowhere. The card says only "Matches your field and location preferences". The product's main promise, transparent and "no AI", has no visible proof. | `grep -r MatchBreakdown` | Medium |
| 4.4 | **"Refresh Recommendations"** implies the list is stale or random. Matches change only when the profile changes. | `RecommendationsClient.tsx:250` | Low |
| 4.5 | **No grouping or filtering of the ten matches.** A student cannot tell "safe" from "stretch" without reading every card. | `RecommendationsClient.tsx` | Medium |
| 4.6 | Image credit appears as raw text inside the university "About" paragraph ("Image attribution: By Jason Tong - Own work, CC BY-SA 3.0, https://…"). It needs its own field, shown as a caption. | `/universities/[id]` for Sydney | Low |
| 4.7 | **(S) Matches are cut at 10.** The page says "We found 14 programs matching your profile. Showing top 10", and there is no way to see the other four. | `api/students/matches/route.ts:124` | Medium |
| 4.8 | **(S) Location is the university's city, not the campus.** UBC's "Data Science (Okanagan)" and "Geography (Okanagan)" show Vancouver; the Okanagan campus is in Kelowna. Programs need their own campus city. | match card screenshot, search API | Low |

## 5 · Onboarding and profile (detail in 03-flows.md)

| # | Finding | Severity |
|---|---|---|
| 5.1 | Adding one subject takes 6 interactions (open dialog → group → subject → level → grade → "Add"). Six subjects take **36**. A wrong grade cannot be edited, only removed and re-added. | Medium |
| 5.2 | The total is shown three times (big tile, summary grid, diploma summary). The progress bar and the step circles say the same thing. | Low |
| 5.3 | Diploma checks cover grade 1, the number of 2s and 3s, the HL and SL point floors, the 24 total and an E in the core. **They do not check that 3 or 4 subjects are HL**, so 6 SL subjects can be saved. | Medium |
| 5.4 | Sign-in comes before any value: "Find My Match" goes straight to `/auth/signin`. | Medium (product decision) |
| 5.5 | **(S)** "Total Points" is a running sum styled as the final result. It reads "3" after one subject at grade 3. | Low |
| 5.6 | **(S)** The diploma warning says "You can still save your profile once the grades meet diploma requirements" while the save button is disabled, and the failing total appears three times in red. | Low |
| 5.7 | **(S)** On a phone, onboarding keeps the bottom tab bar on screen, the heading "Update Your Profile" takes about a third of the first screen, and the step indicator's focus ring draws a rectangle across the connector line. | Low |

## 6 · Accessibility (WCAG 2.2 AA, which the European Accessibility Act points to)

| # | Finding | Evidence | Severity |
|---|---|---|---|
| 6.1 | **Primary button text fails contrast.** White on `--primary` is 4.39:1 (needs 4.5:1). White on the logo blue is 4.43:1. Every primary button in the app is affected. | computed | High |
| 6.2 | **Status text fails contrast.** `text-orange-600` on white 3.60:1 (partial-match reason), `text-green-600` 3.22:1 (match labels, hero ticks). The search placeholder is about 2.6:1. | computed | High |
| 6.3 | **Field and country pickers are not keyboard-operable.** They are `Card` divs with `onClick`, with no role, tabindex or key handler. Onboarding steps 1 and 2 cannot be completed without a pointer. | `FieldSelector.tsx:72`, `LocationSelector.tsx:55` | High |
| 6.4 | Grade, level and TOK/EE buttons have no `aria-pressed` or radio semantics, so a screen reader announces "button A" with no state. | `DetailedGradesInput.tsx`, `SubjectSelectorDialog.tsx` | Medium |
| 6.5 | **Focus is drawn with box-shadow rings on top of `outline-none`**: the shared `Button` and `Input` primitives and the step indicator. Windows High Contrast (forced colours) removes box-shadows, so keyboard focus disappears on every button and input there. | `components/ui/button.tsx:8`, `components/ui/input.tsx:18`, `step-indicator.tsx:111` | High |
| 6.6 | Requirement status is conveyed by border colour plus a 10px icon. The icons are too small to read as the primary cue. | `ProgramCard.tsx` tiles | Low |
| 6.7 | The amber onboarding dot uses `animate-ping` in an infinite loop. Reduced motion is handled globally, which is good, but the loop is distracting for everyone else. | `StudentHeader.tsx:103`, `MobileBottomNav.tsx:141` | Low |

## 7 · Cross-platform (Windows in particular)

| # | Finding | Severity |
|---|---|---|
| 7.1 | The logo and favicon render in a different font on each OS (see 2.4). | Medium |
| 7.2 | Country flags rely on emoji. Windows has no flag emoji, so `country-flag-emoji-polyfill` downloads a Twemoji font on Windows only. It works, but flags at 26px look different on each OS, and the font is an extra request for every Windows user. | Low |
| 7.3 | `-webkit-font-smoothing: antialiased` (Tailwind's `antialiased`) affects macOS only. Geist at 400 renders noticeably heavier on Windows ClearType, so the hierarchy built from weight 500 against 600 is flatter there. Choose sizes and weights with enough contrast to survive this. | Low |
| 7.4 | Forced colours mode is not considered anywhere (see 6.5). Windows is the only desktop OS where it is common. | Medium |
| 7.5 | Native scrollbars on the filter panel and long lists are wide and grey on Windows. `scrollbar-gutter: stable` and `scrollbar-width: thin` (both Baseline) would stop layouts jumping. | Low |

## 8 · Measurement and the cookie banner

*Decision, 2026-10-06: analytics is out of scope for this redesign and will be a separate task.*

- **There is no web analytics.** The cookie banner's own comment says no analytics cookies exist yet
  (`CookieConsentBanner.tsx:6,14`), yet every first visit gets a banner that covers about 20% of a
  phone screen, including the bottom navigation. If only strictly necessary cookies are set, a
  consent banner is generally not required under the ePrivacy rules (confirm with whoever owns
  legal). Removing it would improve the first impression on every page.
- Without measurement, a redesign cannot be judged. A cookieless, privacy-friendly analytics
  tool would answer "did onboarding completion go up" without a consent banner. **Do not record
  events in Supabase**: the free-tier limits in AGENTS.md apply.

## 9 · Found along the way (not design, but students see the result)

- **TOK/EE bonus points use a simplified formula** (`FieldSelectorClient.tsx:109`,
  `DetailedGradesInput.tsx:159`) that undercounts several grade pairs (B+C, B+D, C+C). **Already
  tracked as `MAINT_tasks.md` 5.8**, reported by the owner on 2 October 2026. That task confirms the
  IB matrix and found 20 stored totals one point low.
- The repeated names in either/or groups (3.7) are a display bug, not a data issue: `MAINT_tasks.md` 5.7.
- **(S) Fields of study overlap, and matching treats them as exact.** The field descriptions list the same
  discipline under two fields: Computer Science under Engineering, Economics under Social Sciences,
  Environmental Science under both Natural Sciences and Environmental Studies. Programs follow
  suit: the first page of an "economics" search has 36 Economics programs filed under Business &
  Economics, 4 under Social Sciences (including Western and Bocconi) and 2 under Arts & Humanities.
  A student who picks only Business & Economics gets no field match for those six. The fix is
  content work: give each discipline one home, re-file the outliers, and remove overlapping words from the
  descriptions. The phone mockups use de-duplicated descriptions.

## 10 · What works and should stay

- The IA is small and right: Matches, Search, Saved, Profile. Keep four destinations.
- Three-step onboarding (fields → countries → grades) is a good order: easy questions first.
- The entry-year note ("Requirements checked for 2027 entry", or "confirm on the university's
  site") is exactly the honesty this product needs. Make it more visible, not less.
- Settings has the right content (export your data, delete your account, school connection). Keep
  all of it and move it under the Profile tab.
- Reduced-motion handling is global and correct, hover effects are gated to fine pointers, and
  skeletons exist.
- Server rendering, the static country pages, `next/image` with Supabase URLs and a CLS of 0 are
  a strong performance base.

## Performance baseline (production, 2026-10-05, mobile emulation, warm CDN)

| Page | LCP | CLS | DOM nodes | Transfer (first visit) |
|---|---|---|---|---|
| `/` | 0.38 s | 0 | 201 | JS 171 KB, CSS 22 KB, fonts 52 KB, images 44 KB |
| `/programs/search` | 0.37 s | 0 | 1,151 | images 179 KB (20 cards) |
| `/programs/[id]` | 0.25 s | 0 | 211 | n/a |
| `/study-in-uk-with-ib-diploma` | 0.19 s | 0 | 521 | n/a |

The later rows reuse the cache from the first visit. Geist Mono is loaded but used in exactly one
place (`NoAISection.tsx:32`).

## Where each finding is tracked

| Kind | File | Tasks |
|---|---|---|
| UX | `docs/tasks/REBRANDING_tasks.md` | No separate fix phase: each UX finding is a must-have of the redesign task that rebuilds that screen (contrast, keyboard, focus, emoji and animation in its Definition of done; the header in 1.5; honest save and visible requirements in 2.2 and 2.4; onboarding in 3.1 and 3.2) |
| Logic and code | `docs/tasks/MAINT_tasks.md` | 5.7 and 5.8 (existing), 5.12–5.15, and an owner task for the cookie banner |
| Data | `docs/tasks/CONTENT_tasks.md` | 8.1 fields of study, 8.2 campus city, 8.3 image credits |

