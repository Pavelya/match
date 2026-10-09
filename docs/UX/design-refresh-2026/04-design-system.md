# 04 · Design system for Direction B, "Ultramarine"

The visual reference is the canvas boards "B · Foundations" and "B · Components". This file is the
implementation spec: token values, how they map onto `app/globals.css` (Tailwind v4 `@theme`),
and which components replace which.

Principles, in priority order:

1. **Evidence first.** Status and numbers lead; decoration follows.
2. **One system everywhere.** Marketing, content guides and the app use the same tokens. No raw
   palette classes (`blue-600`, `gray-900`) in student-facing code.
3. **Calm.** A warm paper ground, hairlines instead of heavy shadows, one accent, motion only to
   explain a change.
4. **Works the same on every OS.** No emoji in interface chrome, no live text in logos, focus that
   survives forced colours, weights chosen for ClearType.

---

## 1 · Colour tokens

Contrast is against the token's usual background (paper or surface).

### Light

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--paper` | #F7F6F2 | Page ground | n/a |
| `--surface` | #FFFFFF | Cards, inputs, sheets | n/a |
| `--sunken` | #EFEEE8 | Wells, segmented-control track, table header | n/a |
| `--line` | #E3E1D9 | Hairlines, card edges | n/a |
| `--line-2` | #CFCCC1 | Chip and secondary-button borders | 1.5:1; decorative edges only |
| `--line-3` | #858277 | Field edges: inputs, selects, checkboxes, the switch track, the chosen segment | 3.9:1 on surface, 3.6:1 on paper |
| `--ink` | #14161B | Primary text | 16.7:1 |
| `--ink-2` | #464B57 | Secondary text | 8.1:1 |
| `--ink-3` | #686D79 | Tertiary text, minimum for any text | 4.8:1 |
| `--brand` | #2B3FD6 | Primary actions, links, selection | white on it 7.6:1 |
| `--brand-hover` | #2233B4 | Hover and pressed | n/a |
| `--brand-soft` / `--brand-ink` | #E8EAFB / #1C2A99 | Selected chips, "on shortlist" | over 8:1 |
| `--lime` | #D5F36B | **Brand moments only**: logo overlap, one highlighted phrase, final CTA band. Never status, never text. | ink on it about 15:1 |
| `--ok` / `--ok-soft` | #17723F / #E2F2E7 | Meets | 5.2:1 |
| `--close` / `--close-soft` | #94580A / #FBEFD9 | Within reach, older requirements data | 5.0:1 |
| `--gap` / `--gap-soft` | #B3261E / #FBE6E4 | Missing requirement, errors | 5.5:1 |

### Dark (System by default, with a toggle in the account menu and in every footer; see §10)

| Token | Value | Notes |
|---|---|---|
| `--paper` / `--surface` / `--sunken` | #0E1014 / #161920 / #1D2129 | Not pure black, so surfaces stay distinguishable on cheap panels |
| `--line` / `--line-2` / `--line-3` | #2A2F3A / #3A404D / #6B7180 | line-3: 3.6:1 on surface, 3.9:1 on paper |
| `--ink` / `--ink-2` / `--ink-3` | #F1F0EB / #BBBFC9 / #9095A2 | 16.7, 10.4 and 6.4:1 |
| `--brand` / `--on-brand` | #8E9BFF / #0B0E2B | Lighter brand; **dark text on the button** (7.5:1) |
| `--brand-hover` | #A6B0FF | Hover and pressed, as on "B · Foundations" |
| `--brand-soft` / `--brand-ink` | #1E2452 / #C9CFFF | |
| `--ok` / `--close` / `--gap` (text) | #72D69B / #F0B95C / #FF8E85 | On their `-soft` backgrounds #14301F / #33260F / #3A1715 |

**Measured 8 October 2026** (`app/globals.test.ts`, which fails the build's tests if a pair drops below
AA): every text pair reaches 4.5:1 and the focus outline 3:1, in light and dark. Three limits come with
the values rather than with a token:

- `--ink-3` is for paper and surface. On `--sunken` in light it is 4.46:1, so no `--ink-3` text in wells,
  segmented tracks or table headers.
- `--line-2` is 1.5 to 1.8:1, so it only decorates. A field's edge needs 3:1 (WCAG 1.4.11), so fields
  use `--line-3` (D2.2, decided 8 October 2026; added in 1.2).
- `--lime` is the same in both themes, so text on it is always #14161B, never `--foreground` (1.1:1 in
  dark).

### Mapping onto the current setup

`app/globals.css` already uses the shadcn variable names (`--background`, `--primary`, `--muted`…)
through `@theme inline`. Keep those names so existing `bg-primary` and `text-muted-foreground`
classes keep working, and **point them at the new values**. Then add the semantic tokens that
do not exist yet. **Until release, all of this is scoped to `[data-ui="next"]` instead of `:root`**,
so only the new design picks it up. The cleanup after release moves it to `:root`, as written
below (`REBRANDING_tasks.md` 1.1 and R.2):

```css
:root {
  --background: #F7F6F2;          /* paper */
  --card: #FFFFFF;                /* surface */
  --foreground: #14161B;          /* ink */
  --muted: #EFEEE8;               /* sunken */
  --muted-foreground: #464B57;    /* ink-2 */
  --border: #E3E1D9;  --input: #858277;   /* line-3 */
  --primary: #2B3FD6; --primary-foreground: #FFFFFF;
  --ring: #2B3FD6;
  --destructive: #B3261E;
  /* new */
  --ink-3: #686D79; --line-3: #858277; --brand-soft: #E8EAFB; --brand-ink: #1C2A99; --lime: #D5F36B;
  --ok: #17723F; --ok-soft: #E2F2E7; --close: #94580A; --close-soft: #FBEFD9;
  --gap: #B3261E; --gap-soft: #FBE6E4;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) { /* dark values */ } }
:root[data-theme='dark'] { /* dark values */ }
```

…and expose the new ones in `@theme inline` (`--color-ok: var(--ok)` and so on), so they become
`text-ok` and `bg-ok-soft`. Replace the forced `className="light"` on `<html>` in `app/layout.tsx`.
Keep the `@custom-variant dark` working off `data-theme` and the media query.

**Migration rule:** the 4,596 raw palette classes in marketing and content pages are not
re-mapped one by one. Those pages move onto shared components (section 6), which use tokens only.
After the migration, a lint rule (`no-restricted-syntax` on class strings matching
`(text|bg|border)-(blue|gray|green|…)-\d`) keeps them from coming back. That is a code-quality rule,
not a stylistic one, so it does not conflict with Prettier.

## 2 · Typography

Size / line height in px. Approved 8 October 2026 (D1.2): the desktop scale on "B · Foundations",
the phone sizes on the three "D1.2 Type" boards. Bold marks a size that differs on a phone.

| Style | Family, weight | Desktop, 768px and up | Phone, below 768px | Use |
|---|---|---|---|---|
| Display XL | Newsreader 500, −0.02em | 56/60 | **40/44** | Home hero |
| Display L | Newsreader 500, −0.015em | 44/48 | **32/36** | Section heads on marketing pages, country guide titles |
| H1 | Newsreader 500, −0.01em | 34/40 | **30/36** | Page titles in the app (Your matches, Explore programs), program and university names |
| H2 | Geist 600, −0.01em | 22/30 | 22/30 | Section titles (Entry requirements) |
| H3 | Geist 600 | 17/24 | 17/24 | Card titles |
| Body L | Geist 400 | 17/28 | 17/28 | Marketing paragraphs, program descriptions |
| Body | Geist 400 | 15/24 | 15/24 | App default |
| Input | Geist 400 | 15/24 | **16/24** | Text typed into fields and search |
| Small | Geist 500 | 13/18 | 13/18 | Meta lines, badges |
| Label | Geist 600, uppercase, +0.06em | 12/16 | 12/16 | Group labels, table headers |
| Figures | Geist 600, `tabular-nums` | As needed; the big total 40/44 | As needed; the big total **32/36** | Points, grades, counts |

- `Geist` (variable) through `next/font/google`. **Newsreader is a static 500 cut at optical size 36**,
  self-hosted through `next/font/local` (`app/fonts/newsreader/`), not preloaded. The variable font with
  its `opsz` axis is 132 KB for latin alone, and 61 KB with the weight fixed, against a 60 KB budget
  for both families. Every serif style is 500, and optical size 36 matches the boards from 30 to 44px
  and stays close at 56px; Google's default static cut (optical size 16) sets visibly wider.
  `next/font/google` can't pin an optical size, hence the local files: latin (23.8 KB) and latin-ext
  (14.6 KB, loaded only for names that need it, such as "Łódzki"). Built 8 October 2026 (1.1); the
  owner chose it over the variable font the same day.
  `Geist_Mono` goes when 4.3 rebuilds How it works.
- Serif only at 22px and above. Never set body text in it. On a phone the smallest serif is H1 at 30px.
- Hierarchy uses 400 against 600, not 500 against 600 (Windows ClearType flattens 500).
- **The token changes, not the component.** Each style is one class (`text-display-xl`), and its value
  switches at 768px (`48rem`) in `globals.css`, where the phone tab bar gives way to the header. No
  component picks a phone size of its own. The classes: `text-display-xl`, `text-display-l`, `text-h1`,
  `text-h2`, `text-h3`, `text-body-l`, `text-body`, `text-field` (Input: `text-input` is already the
  `--input` border colour), `text-small`, `text-label` and `text-total` (the big points total). A
  `font-*`, `leading-*` or `tracking-*` class still overrides a style's default.
- **Sizes in rem,** so text follows the browser's text-size setting. At 200% zoom a 1440px window is
  720px wide, gets the phone sizes and reflows (WCAG 1.4.10).
- **Fields are 16px on a phone.** iOS Safari zooms in on any field whose text is under 16px, and the
  page stays zoomed.
- **Nothing under 12px.** Label is the smallest text on any screen.
- `text-wrap: balance` on Display and H1, `text-wrap: pretty` on Body L. Every heading that shows a
  program or university name gets `overflow-wrap: break-word`: program names run to 110 characters,
  and one word to 24 ("Mathematics/Mathematical").

## 3 · Space, radius, elevation, motion

- **Spacing:** 4px base: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 96. Cards use 16–20 padding, page sections 64–96.
- **Radius:** 6 (small chips in tables) · **10 (buttons, inputs, thumbnails)** · **14 (cards)** · 20 (sheets, panels, hero images) · full (pills, avatars). Set `--radius: 0.875rem` and derive the rest; remove ad-hoc `rounded-2xl` and `rounded-3xl`.
- **Elevation:** flat (1px `--line`) for lists and panels; raised (`0 1px 2px rgb(20 22 27/.06)` plus the border) for cards that open, deepening to `0 4px 12px -4px rgb(20 22 27/.14)` on hover; overlay (`0 12px 32px -12px rgb(20 22 27/.22)` plus the border) for menus, sheets and dialogs. Nothing else. The edge is a real 1px border, never a box-shadow hairline, so it survives forced colours (D2.8).
- **Motion:** 120ms press · 180ms hover and state · 240ms sheets, dialogs and list-to-detail. Easing `cubic-bezier(0.2, 0.8, 0.2, 1)`. Only transform and opacity. No infinite animations (remove `animate-ping` and the shimmer). Reduced motion swaps movement for opacity, as `globals.css` already does globally. View transitions through React `<ViewTransition>` for list → program (thumbnail to hero image) and tab switches.
- **Focus:** `outline: 2px solid var(--ring); outline-offset: 2px` on every interactive element, replacing `outline-none` plus a box-shadow ring in `components/ui/button.tsx` and `input.tsx`. Add `@media (forced-colors: active)` checks for selected states (use `CanvasText` and `Highlight` system colours where a selected state is shown only by background).
- **Sticky chrome:** `scroll-padding-top: 80px; scroll-padding-bottom: 96px` on `html` (phone) so focus is never hidden under the header or tab bar (WCAG 2.4.11).

## 4 · Components: what replaces what

| New component | Replaces | Notes |
|---|---|---|
| `SiteHeader` (public and app variants) and `SiteFooter` | `StudentHeader`, `StudentFooter` (the dead `shared/Header.tsx` and `shared/Footer.tsx` were deleted in MAINT 5.14) | The root layout wraps every public page in the signed-out header and footer, deciding by the path, and `/student` and `/programs` draw theirs from the session, so no page moved (built 9 October 2026, `components/site/`). The logged-out nav shows real public destinations only. Signed in: Matches · Explore · Shortlist · Academic · Guides and the avatar (9 October 2026). On a phone, Menu when signed out and Guides with the avatar when signed in, never both. Canvas: "D2.12 Header", "D2.13 Footer". |
| `TabBar` (phone) | `MobileBottomNav` | Matches · Explore · Shortlist · Academic (9 October 2026). Matches uses Lucide's `ListChecks`, not a heart and not the logo's mark, so the bar doesn't change with the logo; Academic uses `GraduationCap`. The current tab gets a brand-soft pill behind its icon. No count on Shortlist. Hidden during first-run onboarding (focus mode). **Hides on scroll down and shows on scroll up, as `MobileBottomNav` does today** (owner, 9 October 2026, replacing this file's earlier "no hide-on-scroll"): a 240ms `transform` slide, a fade with reduced motion, and its links stay focusable while hidden. Canvas: "D2.14 Phone tab bar". |
| Academic page and Settings | `/student/settings` page, "Academic" tab | Split on 9 October 2026 (`REBRANDING_tasks.md` 3.3). Academic, at `/student/onboarding`: predicted total and edit, interests, countries. Settings, from the account menu: account (name, school), your data (download, delete). Appearance and sign out sit in the account menu. Keeps every Settings feature. |
| `ChoiceList` (rows with checkbox) and `ChoiceGrid` (two-column checkboxes with filter) | `FieldSelector`, `LocationSelector` (tall `Card` divs) | Real `<input type="checkbox">` in a `<fieldset>`, so they are keyboard-operable for free. About 56px rows and 48px tiles; sticky footer with count and Continue. Every field gets its own icon (Education and Media currently share one). |
| `BrandMark` and `BrandLogo` | `logo-restored.svg`, `favicon.svg`, `logo-email.png` and 29 hard-coded references | Render whatever `lib/brand/config.ts` points to (§8). The mark is chosen on the canvas "Logo options" board (Lens recommended), drawn as outlined paths, with favicon, Apple touch icon, email PNG and OG image generated from it. |
| `ThemeSwitch` and `AccountMenu` | none (the avatar links straight to Settings) | System, Light, Dark as a radio group, in the account menu behind the avatar on desktop and phone, and in every footer (§10). The menu is a disclosure, not an ARIA menu: Settings, FAQs, Contact, Appearance, Sign out (canvas "D1.4 Account menu"). |
| `RequirementChip`, `MatchStatusBadge`, `WhyThisMatch` | tile grids and the colour logic in `ProgramCard`, the unused `MatchBreakdown` | One chip per requirement with its own status; a badge derived from them; one disclosure for desktop and phone (§9). |
| `Button`, `Input`, `Select` | `components/ui/button.tsx`, `input.tsx`, `select.tsx` | New files in `components/ds/` (1.2); `components/ui/` stays for today's screens until cleanup. Heights 36 / 44 / 52, one radius. Select is the native element; the subject list is `SubjectPicker`. |
| `Chip` (filter, removable) and `Segmented` | inline buttons in `SearchClient`, `QuickScoreInput`, `DetailedGradesInput` | Real `role="radio"` and `aria-checked`, or `aria-pressed`. |
| `StatusBadge` (`meets` · `close` · `gap` · `neutral`) | `getMatchRating` colours, tile borders | Icon plus word plus colour. The single source of status styling. |
| `RequirementChecklist` | the four duplicated tile grids in `ProgramCard` | Rows: icon · requirement (with "either X or Y") · needed · you. A logged-out variant without the "you" column. |
| `MatchCard` | `ProgramCard` variant `card` with `showMatchDetails` | About 180px; status and evidence line; "Why this match" disclosure. |
| `ResultRow` | `ProgramCard` in search and saved | Thumbnail · program · university · country · length · points · fit · save. |
| `ProgramHero`, `KeyFacts`, `FitPanel` | `ProgramCard` variant `detail` | Breadcrumbs instead of `history.back()`. |
| `SubjectRow` and `ProfileEditor` | `SubjectSelectorDialog`, `DetailedGradesInput`, `QuickScoreInput`, `StepIndicator` | One editor for first run and edit. Live total; diploma checks including the 3–4 HL rule. |
| `CompareTable` | none | Shortlist compare view. |
| `CountryGuide` template and data files | the 22 `*Content.tsx` files (about 20,000 lines) | Same sections as `docs/countries/COUNTRY-PAGE-BASELINE.md`, rendered from typed data. Pages stay static with `revalidate` of one week. |
| `Skeleton` | `animate-shimmer`, `.skeleton-bg` | Static tint, same box as the final card. |
| `CountryFlag` (SVG, only the 22 used) | flag emoji and the Windows polyfill font | Identical on every OS; drops a font download on Windows. Optional, phase 4. |

Animation helpers: `animated-number.tsx`, `loading-wrapper.tsx` and `button-loading.tsx` had no
importers and were deleted in MAINT 5.14. `fade-in.tsx` (6 importers) and `stagger-children.tsx` (2) wrap
whole pages and lists in entrance animations, which is the "visual theatrics" 2026 practice moves
away from and which delays content by up to 800ms on the matches page. Remove them as their
screens are rebuilt, and reduce `page-loader.tsx` to the static Skeleton.

## 5 · Content style that goes with it

- Sentence case for every heading and button ("Get my matches", not "Find My Match").
- Numbers first, then words: "38 / 37 points", "1 point short", "Math AA HL 7 (you 6)".
- Say what the data is: "Checked for 2026 entry. Confirm the 2027 figures on the university's page."
- No exclamation marks, no "Perfect match". Use "Meets all requirements" and "Within reach".

## 6 · Order of work (matches the README phases)

1. Tokens and fonts in `globals.css` and `layout.tsx`. Because the shadcn names are re-pointed
   rather than renamed, every app screen picks up the new colours and type with no component
   changes. Marketing pages do not, until step 6.
2. Primitives (Button, Input, Chip, Segmented, StatusBadge, Card) and focus styles.
3. Public layout (header and footer) for every student route; remove the dead header and footer.
4. Split `ProgramCard`; build RequirementChecklist, MatchCard, ResultRow and the program page.
5. ProfileEditor (first run and edit).
6. Home, then the CountryGuide template; migrate the guides one at a time, each verified against
   its current text so no content is lost.
7. Lint guard against raw palette classes; delete the animation helpers.

Each step runs the AGENTS.md verification (`tsc`, `eslint`, `prettier --check`, `build`,
`npm test`, the matching suite). New components get Vitest tests next to them, with
`@/lib/prisma` mocked where relevant. Screenshots in light, dark and forced-colours, at 1440 and 390,
on Chrome (Windows) and Safari (macOS and iOS), before each PR.

## 7 · Budget to hold

| Measure | Today | Limit |
|---|---|---|
| First-load JS (home) | 171 KB | no increase |
| CSS | 22 KB | 32 KB |
| Fonts | 52 KB (Geist + Geist Mono) | 60 KB (Geist + Newsreader) |
| CLS | 0 | 0 |
| LCP (p75, field) | not measured | under 2.5 s |
| Accessibility | several AA failures | axe: zero serious or critical; Lighthouse accessibility 95 or above |

## 8 · Brand configuration: the logo comes from config

Today the logo is hard-coded in **29 places across 19 files**: the student, coordinator and admin
headers; sign-in and invitation pages; `app/layout.tsx` metadata; the JSON-LD on `/`,
`/how-it-works` and `/for-coordinators`; and all 7 email templates (`logo-email.png`).

One typed module becomes the only place that names brand assets:

```ts
// lib/brand/config.ts
export const brand = {
  name: 'IB Match',
  mark: { light: '/brand/mark.svg', dark: '/brand/mark-dark.svg' }, // square mark, outlined paths
  lockup: { light: '/brand/lockup.svg', dark: '/brand/lockup-dark.svg' }, // mark + wordmark
  favicon: '/brand/favicon.svg',
  appleTouchIcon: '/brand/apple-touch-icon.png', // 180×180
  emailLogo: '/brand/logo-email.png', // PNG at 2×: many email clients block SVG
  ogImage: '/brand/og-image.png',
  colors: { brand: '#2B3FD6', highlight: '#D5F36B' } // emails and the web manifest
} as const
```

- `BrandMark` and `BrandLogo` read it and render `<img>` (a `<picture>` source handles the dark
  variant). Never inline the paths, and never use `<text>`.
- `metadata.icons` in `app/layout.tsx`, the JSON-LD `logo`, the Open Graph image, the 7 emails
  (`${baseUrl}${brand.emailLogo}`) and the coordinator and admin headers all import from it.
- **Changing the logo** means replacing the files in `public/brand/`, or pointing the paths at Supabase
  Storage URLs, and editing this one file if the names change. No component changes.
- To change it **without a deploy**, the paths can come from environment variables
  (`NEXT_PUBLIC_BRAND_MARK_URL`, …) with the file values as defaults. Do not read brand settings
  from Postgres on each request (AGENTS.md cost rules). If an admin setting is ever wanted, cache
  it with the existing `unstable_cache` pattern and a revalidation tag.
- Every asset is checked at 16, 32 and 180px, in light and dark, and in Windows High Contrast.

**Clearance before shipping a new mark.** Two interlocking circles is Mastercard's territory, and
Mastercard opposes look-alike marks in the US and EU, including outside payments. That is
why "Rings" is flagged. "Lens" (the overlap alone) and "Threshold" avoid that, but any mark still
needs a search of the EUIPO (eSearch plus or TMview), USPTO and WIPO Global Brand Database
registers for figurative marks in Nice classes 41 (education) and 42 (software). Ideally a
trademark lawyer gives an opinion too. A lens is a common geometric shape, so register the
**lockup** (mark with the wordmark) rather than the bare shape.

## 9 · Match status, requirement chips and "Why this match"

**No change to the matching algorithm is needed to build this.** Everything derives from the
existing `MatchResult`. One small additive change to `SubjectMatchDetail` in `lib/matching/types.ts`
makes it robust: add `kind` (`met` · `grade_short` · `level_short` · `not_taken`), `gradeGap`, and the
student's own `studentLevel` and `studentGrade`. That way the UI does not parse `reason` strings, and
"you 6" can be shown at all; today the detail does not carry the student's grade.

**Per requirement → chip**

| Case (algorithm) | Chip | Status |
|---|---|---|
| Points met | ✓ 38 / 37 points | met |
| Points short by 1–3 | – 38 / 39 points | close |
| Points short by 4 or more | × 33 / 39 points | gap |
| `FULL_MATCH` | ✓ Maths HL 6 | met |
| `FULL_MATCH` with HL for SL | ✓ Maths SL 6 · your HL 6 | met |
| Either/or met | ✓ English A SL 6 · via Literature | met |
| `PARTIAL_MATCH`, grade 1 below | – Maths HL 7 · you 6 | close |
| `PARTIAL_MATCH`, grade 2+ below | × Maths HL 7 · you 5 | gap |
| `PARTIAL_MATCH`, SL instead of HL | × Chemistry HL 5 · you SL | gap |
| `NO_MATCH`, not taken | × Biology HL 5 · not taken | gap |
| Either/or, none met | × French or Spanish HL 5 · not taken | gap |
| No named subjects (`POINTS_ONLY`) | • No named subjects | info |
| Field or country not preferred | • Medicine & Health · not your field | info |
| Requirements from an earlier intake | • Checked for 2026 entry | info |

Order on the card: gap (×), then close (–), then met (✓), then info (•). Show at most four; the rest
collapse to "+N met", which uses the met style with a tick. Info chips carry Lucide's Info icon (D2.7).

**Status model: requirement-based (owner, 7 October 2026).** The V10 algorithm's `category`
(`SAFETY` / `MATCH` / `REACH` / `UNLIKELY`, `lib/matching/categorization.ts`) stays unused by the UI. Its
copy promises an admission likelihood IB Match cannot know, and "Reach" mixes fixable and unfixable gaps.
Scores are unchanged for now (`MAINT_tasks.md` 5.15). They order cards within a group and appear only
in "Why this match".

**Card status**: **Meets all requirements** if every chip is met. **Within reach** if there is no gap and at
most one subject is close, whether or not points are close. **Missing a requirement** otherwise. Badge copy is specific:
"Within reach · 1 point short", "Within reach · 1 grade short", "Within reach · 1 point, 1 grade",
"Needs Biology HL and Chemistry HL", "Needs a language at HL".

**Lists**: grouped by status (the "Missing a requirement" group is collapsed by default), then
sorted by `overallScore` within each group. Running the production algorithm on real programs
showed why the score cannot lead on its own:

- A level gap that grades can't fix (SL where HL is required) scored **90%**.
- Being 1 point short scored **88%**, and so did being 3 points short.
- Six programs tied at **100%**.

Whether a level gap should be scored lower is a separate question for the matching docs
(`docs/matching/`), not a design change.

**"Why this match"**: one component on desktop and phone. A `<button aria-expanded aria-controls>`
opens a region inside the card. It contains:

1. Each requirement with needed and actual values.
2. A one-line note: what would close it, or why grades alone can't.
3. Field and country.
4. The **fit score**, with its three weighted parts (`weightsUsed` × component scores) and any
   adjustment in plain words ("Lowered because 2 of 4 subject requirements aren't met").

This is the only place the percentage appears. Reuse the logic in the unused
`MatchBreakdown.tsx`; drop its dialog.

## 10 · Theme switching (System, Light, Dark)

- Light tokens on `:root`. Dark tokens under
  `@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) { … } }`
  and again under `:root[data-theme='dark']`. Remove the forced `className="light"` from `<html>`.
  **Until release**, the dark tokens sit inside the `[data-ui="next"]` scope, and only the new design
  drops the forced light `<html>`. Everyone else keeps it, so old screens don't change
  (`REBRANDING_tasks.md` 0.1, 1.4).
- The choice is stored in `localStorage` (`ibm-theme`: `system` | `light` | `dark`), **per device**.
  Use no cookie and no database: reading a cookie in the root layout would make every page dynamic,
  including the 22 static country guides. A synced preference is not worth that cost.
- A few lines of inline script in `<head>` set `data-theme` from `localStorage` before first paint,
  so a reload doesn't flash the wrong theme. Add `suppressHydrationWarning` on `<html>` and
  `<meta name="color-scheme" content="light dark">` (plus the CSS `color-scheme` property), so
  native controls and Windows scrollbars follow the theme.
- `ThemeSwitch` is a radio group (System, Light, Dark). It appears in the account menu behind the
  avatar, on desktop and phone, and in every footer (icon-only with `aria-label`s on desktop,
  labelled on phone). Canvas: "Theme: System, Light, Dark" and "D1.4 Account menu"; until 9 October
  2026 the phone placement was the Profile tab, which became Academic.
- Check every page in light, dark and forced colours before each PR.

