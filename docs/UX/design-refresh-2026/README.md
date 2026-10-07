# Student experience: design audit and refresh options

**Date:** 2026-10-06 · **Scope:** everything a student sees (home, country guides, search,
program and university pages, sign-in, onboarding, matches, saved, settings). Coordinator and
admin areas are out of scope. **Status:** research only; no code has changed.

Visual proposal (design system and core pages, desktop and phone):
**https://claude.ai/artifact/TyMyphwJN7iwx3rSPLsjuH** (private until shared from its Share menu).

| Document | What it answers |
|---|---|
| [01-audit.md](01-audit.md) | What is wrong today, with evidence, by severity |
| [02-research.md](02-research.md) | What "modern" means for 2026–27, cross-browser and Windows constraints, what applies here |
| [03-flows.md](03-flows.md) | Each student flow as it is, where it leaks, what to keep, what to change |
| [04-design-system.md](04-design-system.md) | The recommended system (tokens, type, components) and how it maps onto the code |

---

## The short version

The UX is mostly sound: three-step onboarding, a ranked match list, search, save. What makes
the product look dated is **inconsistency and low density, not the layout model**:

- **No shared shell.** The home page, 22 country guides, the requirements hub, How it works, FAQs and
  university pages have **no header at all**: no logo, no navigation, no sign-in. A student
  who arrives from Google on a country guide has nowhere to go but the footer.
- **Three different blues and two styling systems.** Marketing pages use hard-coded Tailwind
  palette classes (4,596 of them, 4,260 in the country guides alone); the app uses theme tokens. The
  logo, the app's `--primary` and the landing CTA are three different blues. The app's
  primary (#0078E2) gives white text **4.39:1**, below the WCAG AA minimum of 4.5:1.
- **Template look.** The landing page follows the 2023 Tailwind UI template: pill badge, two-tone
  headline, generic illustration, four-icon feature grid. The logo is an SVG made of `<text>` in
  Inter, so it renders in whatever font each OS has. On Windows that is usually Arial.
- **Cards that take a whole screen.** One match card is about 700px tall on desktop, and each search result is
  about 1.4 screens on a phone. Field and country appear twice per card, and a full-width "View Program
  Details" button repeats the title link. Onboarding asks for countries through 22 tall cards
  (11 rows on a phone) with Continue only at the bottom.
- **Small trust breakers:** the logged-out Save button shows "Saved" when nothing was saved,
  the requirements block on a program page can render empty when logged out, the field and
  country pickers in onboarding cannot be used with a keyboard, the matches page finds 14 but shows
  10 with no way to see the rest, and "Requirement met" never shows the student's own grade.

None of this needs a new IA. It needs one design system applied everywhere, denser and
clearer components, and a handful of flow fixes.

## Three options

The canvas shows all three side by side on its first board ("Three directions").

| | **A · Polish** | **B · Refresh "Ultramarine"** (recommended) | **C · Rethink "Night Studio"** |
|---|---|---|---|
| What changes | One accessible blue, consistent radius and spacing, header on every page, the trust bugs, denser cards | New tokens (colour, type, spacing, elevation) in light and dark, a serif display face, new logo, rebuilt core components, tightened flows | Dark-first expressive brand, new IA with a planning workspace (shortlist board, compare, deadlines), try-before-sign-up |
| Looks after | Clean but still generic | Distinctive, calm, editorial; reads as "academic" without being stuffy | Bold, youthful; risks feeling like a consumer app to parents and coordinators |
| Flows | Unchanged | Same IA; faster subject entry, grouped matches with reasons, compare, real breadcrumbs | New flows, which need user research to validate |
| Rough effort, one developer | 1–1.5 weeks | 4–6 weeks, shippable in phases | 10–14 weeks plus research |
| Risk | Very low | Low to medium: lots of files touched, no logic changes | High: new IA, new data (deadlines, notes), new auth flow |
| Performance | Neutral | Neutral if the budget below holds (one more font file, minus Geist Mono) | Heavier: more motion, more client state |

**Decided (2026-10-06): B, delivered in phases, plus the side-by-side compare from C**, which is
already in the B mockups and built from existing data. Try-before-sign-up was considered and
declined: sign-in stays first. The rest of C (planning workspace, deadlines) makes sense only once
there is evidence that students come back to plan.

Why not A alone: it fixes the defects but leaves the product looking like every other
Tailwind template. That look is what makes it feel outdated. Why not C: it changes what the
product is before anyone has measured what students do with the current one, and its dark,
playful look weakens trust with parents and IB coordinators, who also use the site.

## Phasing for B

All rebranding work goes into a dedicated `rebranding` branch, one pull request per task. Production
gets the redesign in a single merge at the end (`REBRANDING_tasks.md`, "The rebranding branch"). None of it
needs a database change.

**Tracked as tasks:** `docs/tasks/REBRANDING_tasks.md` (the phases below; each audit UX fix is a
must-have of the task that rebuilds its screen), `docs/tasks/MAINT_tasks.md` 5.12–5.15 (logic),
`docs/tasks/CONTENT_tasks.md` 8.1–8.3 (data). The redesign starts within days, so there is no
separate "fix first" phase for UX.

| Phase | Contents | Size |
|---|---|---|
| Logic, any time | Every match, not the top 10 (`MAINT_tasks.md` 5.12); TOK/EE core points and 3 or 4 HL subjects (5.8, 5.13, before phase 3); unused components (5.14) | 1–2 days |
| Content, in parallel | One home per discipline in the fields of study, re-file the Economics outliers, de-duplicate field descriptions, add a campus city for programs such as UBC Okanagan (audit §9, 4.8) | admin work, no code |
| 1 · Foundations | Tokens in `app/globals.css` (light and dark), fonts, **brand config with the logo loaded from it** (04 §8), theme switching with System, Light and Dark (04 §10), primitives (Button, Input, Chip, StatusBadge, Card), **one public layout with header and footer for every student-facing route** | ~1 week |
| 2 · Core app | Split `ProgramCard` (1,278 lines, three jobs) into MatchCard, ResultRow and ProgramDetail; requirement checklist; matches in three status groups with requirement chips and "Why this match" on desktop and phone (04 §9); search toolbar, phone filter sheet, 20 results per page; program page; shortlist with compare | ~2 weeks |
| 3 · Profile | Compact interest and country steps with a sticky Continue, and no tab bar during first run; inline subject editor in place of the 6-step dialog; HL-count check; one component for first run and editing; the phone Profile tab becomes the hub that absorbs Settings | ~1 week |
| 4 · Marketing and content | New home; move the 22 country guides onto one template that keeps them static with the one-week revalidate; How it works, FAQs | ~1–1.5 weeks |

## Decisions (6 October 2026)

| # | Question | Decision | Where it is worked out |
|---|---|---|---|
| 1 | Direction | **B** | everything below |
| 2 | Colour | **Ultramarine #2B3FD6** | 04 §1 |
| 3 | Serif display | **Yes, Newsreader** | 04 §2 |
| 4 | New logo mark | **Lens, provisionally** (7 October 2026). The final mark is decided after seeing every screen on the `rebranding` branch. The two-circle "Rings" was dropped for its closeness to Mastercard's marks. **The logo loads from configuration**, so a later swap is a file change. A new mark needs a clearance search before release. | canvas row 5, 04 §8 |
| 5 | Match score | **Status first; the percentage moves into "Why this match".** Statuses are **requirement-based** (Meets all, Within reach, Missing a requirement), not the algorithm's Safety/Match/Reach labels (7 October 2026). Scores stay as they are for now (`MAINT_tasks.md` 5.15). The card keeps every requirement visible as a small status chip, so nothing is hidden. "Why this match" opens in place on desktop and on a phone. Every state (full match, HL counting for SL, either/or, points short, grade short, SL where HL is required, subject not taken, no named subjects, outside your fields, older data) is on the canvas, with fit scores from the real algorithm. | canvas row 5, 03 F2, 04 §9 |
| 6 | Dark mode | **System by default, with a toggle**: the account menu (desktop), the Profile tab (phone), and the footer of every public page | canvas row 5, 04 §10 |
| 7 | Try-before-sign-up | **No: sign-in stays first.** First run saves a draft after each step instead. | 03 F1 |
| 8 | Analytics | **Out of scope here**; to be handled as a separate task | n/a |

**Logo, 7 October 2026: Lens, provisionally.** The owner will confirm or replace it after seeing all screens
on the `rebranding` branch. If the final logo is a new mark, it needs a formal clearance search in the EU and US
trademark registers (EUIPO and USPTO), classes 41 and 42, before the release merge.

## Guardrails that apply to every option

- **Performance budget**, measured on production on 2026-10-05: first-load JS about 171 KB, CSS 22 KB,
  fonts 52 KB, LCP 0.2–0.4 s on a fast connection, CLS 0. The redesign must not exceed JS +0 KB, CSS +10 KB or
  fonts 60 KB in total, must keep CLS at 0, and must not add a client component where a server component works.
- **Supabase cost rules from AGENTS.md still bind.** Nothing in the redesign reads more data. Do not
  log UI events to Postgres.
- **The 22 `study-in-*` pages stay static** with the one-week revalidate.
- **Windows, macOS, iOS, Android and ChromeOS** in current Chrome, Edge, Safari and Firefox. Every
  feature in the proposal is Baseline or degrades to plain navigation (see 02-research.md §4).
