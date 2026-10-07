# 02 · What "modern" means for 2026–27, and what applies here

This is a synthesis of current practice, filtered for **a free, trust-dependent tool used by
16–18-year-olds, their parents and IB coordinators, on school Windows laptops, Chromebooks and
phones**. Sources are at the end. Where sources disagree or a claim is soft, it says so.

---

## 1 · The direction of travel

| Trend | What it means | Apply here? |
|---|---|---|
| **Calm, low-effort interfaces** | The 2026 question has moved from "how do we make this exciting?" to "will this reduce effort?". Fewer decisions per screen, clear hierarchy, motion that explains rather than performs (Envato, Tubik, Figma). | **Yes, centrally.** Students arrive anxious about university. The product should feel like a calm, competent advisor. |
| **Transparency as a feature** | Users want to see *why* a suggestion appeared and what happens if they ignore it. Hidden reasoning reads as evasive (Envato on AI-native UX). | **Yes, and it is the brand.** IB Match's differentiator is "no AI, shows its working". The redesign makes the reasoning visible on every card ("Meets all · 38/37 · Math HL 6") with the full breakdown one tap away. |
| **Accessibility as infrastructure** | High contrast, keyboard, reduced motion, large targets, built in from the start. Now also a legal matter in the EU: the European Accessibility Act has been enforced since 28 June 2025, and 2026 is moving from guidance to market-surveillance inspections, with WCAG 2.2 AA as the reference. | **Yes.** Several AA failures exist today (audit §6). Whether the EAA formally covers a free tool is a legal question; WCAG 2.2 AA is the right bar either way. |
| **Token-based systems, light and dark** | One set of colour, type, spacing and motion tokens, with themes as overrides. Low-contrast grey text is called out as a legal risk under the EAA. | **Yes.** Tailwind v4 `@theme` plus CSS variables is already the setup; it needs real tokens and a dark theme. |
| **Expressive type over neo-grotesk UI** | After years of Inter-and-Geist everything, brands are adding a characterful display face (often a serif) over a neutral UI sans. Variable fonts are now the default delivery. | **Yes, carefully.** A serif display gives an academic, editorial voice. Keep Geist for UI text; it is already loaded, tuned and readable on Windows. |
| **Colour: away from SaaS blue** | Blue-greens, soft-tech pastels and warm neutrals (Pantone 2026 is a white, "Cloud Dancer"). Warm off-white grounds instead of stark white with grey-50 bands. | **Partly.** Keep blue as brand equity, but deepen it to ultramarine, put it on a warm paper ground, and add one small highlight colour used only for brand moments. |
| **Gen Z expectations** | Fast, mobile-first, frictionless; dark mode expected (one industry write-up claims 82% expect it by default, which is unverified). Students say they want "clean, intuitive, as if tested by real students" and **don't want badges, points or gamification** (EdSurge, Feb 2026). Some agencies push "functional maximalism" for Gen Z. | **Mostly.** Dark mode that follows the OS, density and speed, no gamification. Maximalism is wrong here, because parents and coordinators are also the audience. |
| **Liquid Glass and translucency** (Apple 2025) | Frosted, refractive surfaces. | **No.** `backdrop-filter` over large areas is costly on low-end Windows laptops and Chromebooks, hurts text contrast, and dates fast. At most a light blur on a sticky header. |
| **AI chat everywhere** | Assistants in sidebars. | **No, not now.** It would undercut the "no AI guesswork" promise. If ever added, it belongs beside the reasoning, not in place of it. |

## 2 · Patterns from the domain

**Reach, match and safety.** US tools such as Naviance label each college as a reach, match or safety
by comparing a student's grades and scores with typical admits, and advice is to build a balanced
list across the three. IB Match knows **requirements**, not admission probabilities, so copying
those labels would overstate what it knows. The honest version, used in the mockups:

- **Meets all requirements**: points at or above the minimum and every named subject met.
- **Within reach**: up to 3 points short, or one grade short in one subject.
- **Gap**: a required subject not taken, or not at the required level (for example "Needs a language at HL").

The labels describe facts the student can act on, and they map directly onto `academicMatch`
data the algorithm already returns.

**Filtering.** Baymard's 2025 benchmark rates 78% of mobile product filtering as poor or mediocre,
against 58% on desktop. The fixes it keeps finding apply here:
multi-select within a facet, applied filters shown as removable chips, the most-used facets
first, the rest collapsed, and the result count on the button that applies the filters. The
current search has multi-select and chips, but hides every facet behind one toggle and has no
phone-specific sheet.

**Lists over cards for scanning.** When the task is comparing many similar items on two or three
numbers (minimum points, length, fit), a dense row with aligned numbers beats a big card with an
image. Images help recognition on detail pages, not in result lists. The mockups use 48–64px
thumbnails in lists and a large image only on the program page.

**Compare.** Study and course platforms commonly offer side-by-side comparison of shortlisted
programs. IB Match already has every field a comparison needs; it only lacks the view.

**Delayed sign-up (lazy registration).** Letting people try before creating an account reduces
the biggest early drop-off, and people value what they have already used (Auth0, Rownd). For IB
Match: enter subjects, see matches, then "sign in to save them". It was considered and **declined on
2026-10-06: sign-in stays first**, and first run saves a draft after each step instead.

## 3 · Typography for every OS

- **Geist** for UI and body: already self-hosted through `next/font` with size-adjusted
  fallbacks (no layout shift), variable weights, tabular figures, good hinting. Popular, but neutral
  by design. Its job is to disappear.
- **Newsreader** for display (22px and up only): a variable serif from Production Type with an
  optical-size axis, made for on-screen reading. Optical sizing keeps headlines sharp, and limiting it
  to large sizes avoids ClearType's weakness with small serif text on Windows.
- **Drop Geist Mono.** It is used once. That keeps the font total at about two files.
- **Fallback stacks** with matching metrics: `Geist, "Segoe UI", system-ui, sans-serif` and
  `Newsreader, Georgia, "Times New Roman", serif`. `next/font` generates `size-adjust` overrides, so
  a swap does not shift layout.
- **Weights:** on Windows, Geist 400 renders heavier and 500 is barely distinguishable from 400. Build
  hierarchy from size and from 400 against 600, not 400 against 500.
- Logo and favicon become **outlined paths**, never `<text>`.

## 4 · Browser support for what the proposal uses

All of the following work in current Chrome, Edge, Firefox and Safari on Windows, macOS, iOS,
Android and ChromeOS, unless marked otherwise.

| Feature | Status | Use in the proposal |
|---|---|---|
| `oklch()`, `color-mix()` | Baseline | Tokens and tints (already used in `globals.css`) |
| `prefers-color-scheme`, `prefers-reduced-motion`, `forced-colors` | Baseline | Dark theme, motion fallback, Windows High Contrast |
| Container queries (size) | Baseline | Cards that change layout by their own width (match card in the list versus the sidebar) |
| `:has()` | Baseline | Styling a row whose checkbox is checked, without JS |
| `text-wrap: balance` | Baseline | Headlines |
| `text-wrap: pretty` | Chrome and Safari; ignored elsewhere | Paragraphs (harmless where unsupported) |
| `accent-color`, `scrollbar-gutter`, `scrollbar-width` | Baseline | Native checkboxes in brand colour; no layout jump on Windows scrollbars |
| `<dialog>`, Popover API | Baseline | Filter sheet and menus (Radix is fine too) |
| Same-document View Transitions | Baseline since October 2025 (Firefox 144) | List to detail and tab changes, through React's `<ViewTransition>`, which Next 16's App Router supports without configuration (`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`) |
| Cross-document View Transitions | Chrome, Edge, Safari; not Firefox yet | Not needed; the app uses client navigation |
| Scroll-driven animations, anchor positioning, `contrast-color()` | Interop 2026 focus areas, not yet safe everywhere | **Not used.** Progressive enhancement only, if ever |

Rule for implementation: **if a feature is not Baseline, the page must look and work correctly
without it.** View transitions are the only enhancement in the proposal, and without them the
page simply navigates.

## 5 · Performance practice that keeps the current speed

- Self-hosted variable fonts through `next/font`, latin subset, `display: swap` with
  metric-matched fallbacks. Budget: **60 KB of fonts total**.
- Only `transform` and `opacity` animate. No infinite loops. Skeletons are static tints, not
  shimmer, so there is no constant repaint on low-end machines.
- No `backdrop-filter` on large or scrolling surfaces.
- Smaller list thumbnails (48–64px instead of up to 720px full-width on phones) **cut image bytes
  on search and matches by a large factor**. `next/image` with `sizes` already serves the right size.
- Fewer client components. The new match card and result row can be server-rendered, with only
  the save toggle and the "Why this match" disclosure as small client islands.
- Watch INP on the profile editor, where many buttons update a live total: keep that state local
  and cheap.

## 6 · WCAG 2.2 criteria that bite on this design

| Criterion | Where it applies |
|---|---|
| 1.4.3 Contrast (minimum) | Primary buttons and status text (audit 6.1, 6.2). Every token pair in 04-design-system.md is 4.5:1 or better. |
| 1.4.11 Non-text contrast | Input borders, segmented controls, focus rings: 3:1 against neighbours |
| 2.4.7 / 2.4.13 Focus visible and appearance | Use `outline` (survives forced colours), 2px, offset 2px |
| 2.4.11 Focus not obscured (new in 2.2) | Sticky header and phone bottom bar must not cover the focused element: set `scroll-padding-top` and `scroll-padding-bottom` |
| 2.5.8 Target size, minimum (new in 2.2) | 24×24 minimum; the design uses 44px height everywhere, and grade buttons at least 32px wide on phones |
| 3.3.7 Redundant entry (new in 2.2) | Never ask again for something already entered: a draft saved mid-onboarding is restored, and Interests and Countries edits open pre-filled |
| 1.4.1 Use of colour | Every status is icon plus word plus colour |
| 4.1.2 Name, role, value | Pickers become real checkboxes and radios; toggles get `aria-pressed` or `role="switch"` |

## Sources

- [UX/UI design trends for 2026: calm interfaces, transparent AI and the end of visual theatrics (Envato)](https://elements.envato.com/learn/ux-ui-design-trends)
- [7 UI design trends of 2026 (Tubik)](https://tubikstudio.com/blog/ui-design-trends-2026/)
- [Top web design trends for 2026 (Figma)](https://www.figma.com/resource-library/web-design-trends/)
- [Font trends 2026 (Made Good Designs)](https://madegooddesigns.com/font-trends-2026/)
- [Best variable fonts for product UI 2026](https://fontalternatives.com/blog/best-variable-fonts-product-ui-2026/)
- [Color trends 2026](https://wannathis.one/blog/color-trends-2026-for-designers-and-brands), [2026 web color trends](https://gopickcolors.com/blog/2026-web-color-trends-predictions)
- [How researchers are putting students at the center of edtech design (EdSurge, 2026-02-04)](https://www.edsurge.com/news/2026-02-04-how-researchers-are-putting-students-at-the-center-of-edtech-design)
- [Tactile maximalism: the Gen Z UI trend (AufaitUX)](https://www.aufaitux.com/blog/tactile-maximalism-gen-z-ui/)
- [Interop 2026 (web.dev)](https://web.dev/blog/interop-2026), [Launching Interop 2026 (Mozilla)](https://hacks.mozilla.org/2026/02/launching-interop-2026/)
- [Same-document view transitions are Baseline (web.dev, Oct 2025)](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available)
- [European Accessibility Act: what's next in 2026](https://getwcag.com/blog/european-accessibility-act-whats-next-in-2026), [Web accessibility in 2026](https://pdpspectra.com/blog/web-accessibility-2026)
- [Forced colors mode (Ben Myers)](https://benmyers.dev/encyclopedia/forced-colors-mode/), [High contrast mode handbook (PatternFly)](https://www.patternfly.org/design-foundations/theming/high-contrast-handbook/)
- [Why 78% of mobile product filters fail (citing Baymard 2025)](https://wisepim.com/blog/ecommerce-product-filters-ux-best-practices), [Baymard mobile filtering example](https://baymard.com/ecommerce-design-examples/filtering-options/25547-bh-photo)
- [Reach, match and safety schools (UWorld)](https://collegeprep.uworld.com/blog/how-to-pick-reach-match-and-safety-schools/), [St. John's guide](https://www.stjohns.edu/news-media/johnnies-blog/how-build-your-college-list-reach-match-and-safety-schools-explained)
- [Should you give users access before they register? (Auth0)](https://auth0.com/blog/should-you-give-users-access-before-they-register/), [Delayed onboarding (Rownd)](https://rownd.io/blog/the-strategic-advantage-of-delayed-onboarding-enhancing-user-experience-and-conversion)
- [Quality of webfonts on Windows (TypeDrawers)](https://typedrawers.com/discussion/comment/69849/)
