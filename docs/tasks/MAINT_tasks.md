# Maintenance Roadmap

**Written:** 30 August 2026 · **Covers:** work remaining after maintenance phases 1–4

Each task below is written to be picked up by a **fresh AI session with no memory of
the earlier work**. Read [Standing context](#standing-context) first — it contains the
rules that stop a session breaking production or burning the free-tier quota.

Phases are ordered by value. Tasks inside a phase are independent unless a
**Depends on** line says otherwise.

---

## Standing context

**Read this before starting any task below.**

### What this project is

IB Match — Next.js 16 (App Router, Turbopack), React 19, TypeScript 5, PostgreSQL on
Supabase via Prisma 6, NextAuth v5, Algolia, Upstash Redis, Resend, Stripe, hosted on
Vercel. `AGENTS.md` at the repo root is authoritative: **this is Next.js 16 and it
differs from training data. Read `node_modules/next/dist/docs/` before writing code
that touches framework behaviour.** That directory is the installed version's own
documentation and has been correct every time it was consulted.

### State as of 30 August 2026

| | |
|---|---|
| Vulnerabilities | 4 high, all under the `prisma` devDependency (build-time only) |
| Type check / lint / format | clean — 0 errors, 7 warnings |
| CI | type-check, lint, `prettier --check`, and a production build against a throwaway Postgres |
| Migrations | 5, and a fresh database can be rebuilt from them |
| Rate limits | 61 of 62 API routes (Stripe webhook excluded deliberately) |
| Programs cache | working — ~2.2 MB payload, 6-hour TTL |
| Branch protection | **off** — CI reports but does not block a red merge |

### Hard rules — production safety

The local `.env` points at the **production** Supabase database. There is no separate
development database. Every Prisma command run from this directory hits production.

1. **Never run `prisma migrate dev`.** It offers to reset the database when it detects
   drift. Use `migrate deploy` to apply and `migrate diff` to inspect; both are safe.
2. **Never run `prisma db push`** against production. That is what broke the migration
   history in the first place; it took a whole phase to repair.
3. **The Prisma CLI reads `.env` only** — `.env.local` is a Next.js convention. A
   `DIRECT_URL` that works for the app can still fail every migrate command with
   `P1001`.
4. **Destructive SQL needs explicit approval** from the user, plus a backup taken
   first. Prepare it, explain it, let them run it.
5. Schema changes go through a migration file, never a direct `ALTER`.

### Hard rules — cost

Supabase is on the **free tier: 5 GB egress per month**. It has already been exceeded
once, which restricted Storage and broke every university image for several days. The
cause was application code, not traffic: a broken cache re-reading 37 MB per request.

1. **Never `SELECT` whole tables from production to inspect them.** Use aggregates —
   `count()`, `sum(length(col))`, `max()`. A single careless `findMany` with `include`
   can move tens of megabytes.
2. **Prefer `select` over `include`** in every new query. `include` returns every
   column of every joined row. Both known egress incidents came from `include`.
3. **`npm run build` queries the production database** — `app/ib-university-requirements/page.tsx`
   is prerendered and calls Prisma. Builds are cheap but not free; don't loop them.
   CI builds against its own throwaway Postgres and costs nothing.
4. **Never store binary data in a database column.** Images belong in Supabase
   Storage as URLs. One 537 KB base64 image joined across 68 programs is what caused
   the outage.
5. Keep AI sessions scoped. Each task below names the files to read so a session does
   not have to explore the whole repo to start work.

### Verification commands

Every task's **Verify** section assumes these. All are free and hit no external service
except the build:

```bash
npx tsc --noEmit                 # must be 0 errors
npx eslint .                     # must be 0 errors
npx prettier --check .           # must be clean
npm run build                    # must exit 0
npm audit                        # compare against the baseline in the task
npx tsx scripts/run-all-tests.ts # matching algorithm suite (20 files)
```

`npm run dev` works normally. `npm start` — a production build served locally —
additionally needs `AUTH_TRUST_HOST=true`, or every `/api/auth/*` route returns 500
with `UntrustedHost`. Auth.js v5 auto-trusts the host only in dev and on Vercel.

### Working agreement

One task per branch, one PR, CI green before merge. **Merging `main` deploys to
production.** Do not commit to `main` directly.

---

## Phase 5 — Quick wins

Small, independent, low risk. Good first sessions. None of them touch the database.

### 5.1 — Use the router for internal navigation

**Outcome:** No page does a full browser reload to move between internal routes, and
CI fails if a new one appears.

**Why:** 11 uses of `window.location.href`, 7 of which ESLint flags via
`@next/next/no-location-assign-relative-destination`. Each throws away the client-side
router: full document reload, re-download, re-hydrate. They are the only warnings CI
reports, which is why `--max-warnings 0` cannot be enabled yet.

**Read first:** `node_modules/next/dist/docs/01-app/` — the routing and `useRouter`
pages.

**Files:** `app/auth/signin/page.tsx`, `app/auth/coordinator/page.tsx`,
`app/student/matches/RecommendationsClient.tsx`,
`app/universities/[id]/UniversityDetailClient.tsx`,
`components/admin/coordinators/CoordinatorsListClient.tsx`.

**Steps:**
1. `npx eslint . 2>&1 | grep no-location-assign` to get the exact list.
2. In client components, replace with `useRouter().push()`. In server components or
   the render phase, use `redirect()`.
3. Check each site individually — some sign-in paths assign a URL returned by
   NextAuth's `signIn()`, which may legitimately be external. Those should stay, and
   get a targeted `eslint-disable-next-line` with a one-line reason.
4. Once the count is zero, change the CI lint step to `npm run lint -- --max-warnings 0`.

**Verify:**
- `npx eslint .` reports **0 errors and 0 warnings**
- `npm run build` exits 0
- Manually: sign in, then use each changed control and confirm the page transitions
  without a full reload (the browser tab spinner should not restart)

**Guardrails:** Behaviour change on auth paths. Test sign-in end to end before merging.

**Session size:** Small.

---

### 5.2 — Delete the unused admin programs API route

**Outcome:** `GET /api/admin/programs` is gone; nothing regresses.

**Why:** Nothing in the codebase calls it. The admin page queries Prisma directly in
`app/admin/programs/page.tsx`. The handler still uses `include`, so it would transfer
~17 MB if it were ever hit. Dead weight with a sharp edge.

**Files:** `app/api/admin/programs/route.ts` — **the `POST` handler in this file is
live and creates programs. Only `GET` is dead.**

**Steps:**
1. Re-confirm nothing calls it: `grep -rn "api/admin/programs" --include="*.tsx" --include="*.ts" app components`.
   Expect hits only for `POST` (`components/admin/programs/ProgramForm.tsx`) and for
   page links under `/admin/programs`.
2. Delete only the `GET` export and any imports it alone used.

**Verify:** type-check, lint, build all clean; open `/admin/programs` and confirm the
table still renders; create a program and confirm `POST` still works.

**Session size:** Small.

---

### 5.3 — Remove the redundant Cache-Control on Next's own static assets

**Outcome:** The build no longer warns about custom headers on `/_next/static`.

**Why:** Next 16.3 warns that a custom `Cache-Control` on `/_next/static/:path*` can
break development behaviour. Next already serves those fingerprinted assets as
immutable, so the block adds nothing.

**Read first:** `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/headers.md`

**Files:** `next.config.ts` — the `/_next/static/:path*` entry only. **Leave the other
cache entries alone**; the ones for images, fonts and the API routes are deliberate.

**Verify:** `npm run build` output no longer contains "Custom Cache-Control headers
detected"; `curl -I` a `/_next/static/...` asset from `npm start` and confirm it still
has a long-lived cache header (Next sets its own).

**Session size:** Very small. Good to combine with 5.2.

---

### 5.4 — Set `trustHost` explicitly in the auth config

**Outcome:** A production build runs correctly outside Vercel without an extra
environment variable.

**Why:** Auth.js v5 does not take host trust from `NEXTAUTH_URL` — that is the v4
name. It auto-trusts only in development and on Vercel, so `npm start` anywhere else
returns 500 on every `/api/auth/*` route. Today that is worked around with
`AUTH_TRUST_HOST=true`, which means the app depends on a Vercel environment variable
for correctness.

**Files:** `lib/auth/config.ts`. Also update the `AUTH_TRUST_HOST` notes in
`.env.example` and `README.md` once it is no longer needed.

**Steps:** Add `trustHost: true` to the NextAuth config. It is safe here because the
app is served from a known host behind Vercel; document that reasoning in a comment.

**Verify:**
```bash
npm run build && npm start          # deliberately WITHOUT AUTH_TRUST_HOST
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/auth/providers
```
Expect **200**, not 500. Then confirm sign-in still works in `npm run dev`.

**Session size:** Small.

---

### 5.5 — Restore the University of Manchester image

**Outcome:** All 57 universities have a working image.

**Why:** That row held a 537 KB base64 image which was multiplied across its 68
programs and broke the cache. The column was set to `NULL` to stop the bleeding, which
discarded the only copy. It currently renders the placeholder icon.

**Depends on:** Supabase Storage being out of restriction (quota reset was due
2 September 2026). Check first:
```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  "https://<project>.supabase.co/storage/v1/object/public/university-images/<any-known-file>"
```
`402` means still restricted — stop and report.

**Steps:** Either restore the base64 from the Supabase backup taken before the `UPDATE`
and then run `npx tsx scripts/fix-university-images.ts` to move it to Storage, or
re-source the photo and upload it through the admin UI, which now converts to Storage
automatically.

**Verify:** the row's `image` starts with `https://`, not `data:`; the image renders on
a Manchester program card; `SELECT count(*) FROM "University" WHERE image LIKE 'data:%'`
returns **0**.

**Guardrails:** Do not paste base64 into the database. The admin route now returns 502
rather than storing it, and that is intentional.

**Session size:** Small, but partly a human task.

---

## Phase 6 — Dependency majors

One major per session. Sequential — do not batch them, because when something breaks
you want to know which upgrade did it.

### 6.1 — Prisma 6 → 7

**Outcome:** `npm audit` reports **0 vulnerabilities**, and the deprecation warning
printed by every Prisma command is gone.

**Why:** The last 4 advisories all sit under `@prisma/config` → `deepmerge-ts`. They
are build-time only, never in the running app, which is why they were deferred — but
this is the one remaining task that closes a real finding rather than modernising for
its own sake.

**Read first:**
- The Prisma 7 upgrade guide (web — this needs `WebFetch`/`WebSearch`)
- `prisma/schema.prisma` and the `prisma` block in `package.json`

**Steps:**
1. Upgrade `prisma` and `@prisma/client` together — they must stay in lockstep.
2. Migrate the `"prisma": { "seed": ... }` block out of `package.json` and into
   `prisma.config.ts`. This is the deprecation the CLI has been warning about.
3. **`prisma.config.ts` does not load `.env` automatically.** It must import dotenv
   explicitly, or every command loses `DATABASE_URL` and `DIRECT_URL`. Given the
   history with `DIRECT_URL` on this project, verify this early rather than late.
4. Check whether client generation output or the extension API changed —
   `lib/prisma.ts` uses two client extensions (`algoliaExtension`,
   `referenceDataSyncExtension`).

**Verify:**
```bash
npm audit                                    # expect 0 vulnerabilities
npx prisma migrate status                    # expect "Database schema is up to date!"
npx tsc --noEmit && npx eslint . && npm run build
```
Then prove the migration history still rebuilds a database, since this is the
component that owns it:
```bash
createdb ibmatch_verify
DATABASE_URL=postgresql://$(whoami)@localhost:5432/ibmatch_verify \
DIRECT_URL=postgresql://$(whoami)@localhost:5432/ibmatch_verify \
  npx prisma migrate deploy
# then diff that database against the schema — expect "empty migration"
dropdb ibmatch_verify
```
Also exercise both Prisma extensions: edit a program in the admin UI and confirm it
still syncs to Algolia and still invalidates the programs cache.

**Guardrails:** `migrate status` and `migrate diff` are read-only and safe. `migrate
dev` is not — see the standing rules. PostgreSQL is installed locally for throwaway
databases; use it rather than production.

**Session size:** Medium. The highest-value remaining task.

---

### 6.2 — Stripe 20 → 22

**Outcome:** Stripe SDK current, webhook and checkout both verified working.

**Why:** Two majors behind. Money path, so it deserves care rather than urgency.

**Read first:** Stripe's Node SDK changelog for v21 and v22, and the API version
changelog (web). The pinned API version in `lib/stripe/server.ts` is
`'2025-11-17.clover'` and will need to move with the SDK.

**Files:** `lib/stripe/server.ts`, `app/api/webhooks/stripe/route.ts`,
`app/api/subscriptions/create-checkout/route.ts`,
`app/api/subscriptions/create-portal/route.ts`.

**Steps:**
1. Upgrade, bump `apiVersion`, fix type errors.
2. The client is constructed lazily via `getStripe()` — keep it that way. Constructing
   at module load makes `STRIPE_SECRET_KEY` required for any build, which was fixed in
   phase 3a.

**Verify:**
- Type-check, lint, build clean
- A test-mode checkout end to end
- A test-mode webhook: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
  and trigger `checkout.session.completed`; confirm signature verification passes and
  the subscription record updates
- Confirm the customer portal still opens

**Guardrails:** Do not touch live Stripe keys. Test mode only.

**Session size:** Medium.

---

### 6.3 — lucide-react 0.x → 1.x

**Outcome:** Icons upgraded across the app with no visual regressions.

**Why:** 0.555 → 1.34, the 0.x-to-stable transition. **171 files import it** — the
widest blast radius of anything remaining.

**Read first:** lucide-react v1 release notes and any icon rename list (web).

**Steps:**
1. Upgrade and let `tsc` find removed or renamed icons — most breakage surfaces as
   missing exports.
2. `docs/UX/icons-reference.md` documents the icon set; update it if names change.

**Verify:**
- Type-check clean (this is the main safety net — missing icons are type errors)
- `npm run build` clean
- Walk the main surfaces with a browser: student matches, coordinator dashboard, admin
  programs and universities, and one country landing page. Icons are visual; the type
  checker cannot tell you one now renders as the wrong glyph.

**Session size:** Medium — mechanical, but needs real visual checking.

---

### 6.4 — The minor and patch batch

**Outcome:** Everything except deliberate holdouts is current.

**Why:** ~20 packages are behind by minors and patches with no breaking changes:
`@supabase/supabase-js`, `algoliasearch`, the Radix set, `zod`, `tailwindcss` and
`@tailwindcss/postcss`, `@upstash/*`, `@typescript-eslint/*`, `dotenv`,
`country-flag-emoji-polyfill`, `@types/react`, `@types/react-dom`, `@react-email/components`.

**Steps:** `npm update` for the non-major set, then review the `package.json` diff to
confirm nothing crossed a major boundary. Hold back anything covered by its own task
(`prisma`, `@prisma/client`, `stripe`, `lucide-react`, `typescript`, `@types/node`,
`react-email`).

**Verify:** full gate set plus `npx tsx scripts/run-all-tests.ts`. Because this touches
many packages at once, run the matching suite specifically — `zod` and `algoliasearch`
sit under it.

**Session size:** Small.

---

### 6.5 — TypeScript 5.9 → 7

**Outcome:** On the native TypeScript compiler.

**Why:** A rewritten compiler. Expect new errors from stricter inference rather than
intentional breaking changes.

**Do this last.** It is the most likely to produce unrelated noise, and it is easier to
judge when every other upgrade has already landed. `@types/node` 22 → 26 belongs with
this task; keep it aligned with the Node version in `engines` and `.nvmrc` (currently 22).

**Verify:** full gate set. If the error count is large, land it as its own PR with no
other changes so the diff stays reviewable.

**Session size:** Medium to large, unpredictable.

---

## Phase 7 — Structural

Projects, not maintenance. Each deserves its own planning.

### 7.1 — Test coverage beyond the matching algorithm

**Outcome:** A real test runner, and coverage of the paths where a regression costs
money or leaks data.

**Why:** The working suite is 20 hand-rolled `.verify.ts` scripts run by
`scripts/run-all-tests.ts`, and it covers `lib/matching` only — the hardest part of the
product, and the right thing to have covered. Everything else has none: 62 API routes,
the RBAC in `lib/auth/access-control.ts`, subscription tier gating, and the Stripe
webhook state machine.

Two Jest test files were deleted in phase 2 because Jest was never installed and they
had never run. **The framework choice is genuinely open** — treat it as a decision to
put to the user, not an assumption.

**Suggested order, highest value first:**
1. `lib/auth/access-control.ts` — pure functions, no I/O, and they decide who sees what
2. The Stripe webhook state machine — money, and hard to test manually
3. Representative API routes — one authenticated, one admin, one unauthenticated
4. Rate limiting — that limits apply and return 429

**Guardrails:** Tests must not hit the production database. Either mock Prisma, or
stand up a local Postgres via `prisma migrate deploy` the way CI does. The CI workflow
already shows the pattern.

**Verify:** the suite runs in CI as a required check, and fails when a deliberately
broken assertion is introduced.

**Session size:** Large. Split across sessions — framework decision first, then one
area per session.

---

### 7.2 — Collapse the 22 country landing pages

**Outcome:** One `[country]` route driven by data, instead of 22 near-identical pages.

**Why:** 4,387 lines across 22 directories. The prose is genuinely country-specific and
belongs in the repo, but the ~200-line page shell around it — metadata, three or four
JSON-LD blocks, the same section scaffold — is copy-pasted every time. Adding a country
means duplicating all of it, and drift is already observable: three pages were missing
their ISR config until phase 3a fixed them.

**Read first:** `node_modules/next/dist/docs/01-app/` on dynamic routes,
`generateStaticParams` and metadata. `docs/countries/COUNTRY-PAGE-BASELINE.md`.

**Constraints that must survive:**
- Each page stays statically rendered with `revalidate = 604800`. Use
  `generateStaticParams`. **Do not let these become dynamic** — they are the public SEO
  surface and dynamic rendering costs both latency and money.
- URLs must not change: `/study-in-<country>-with-ib-diploma`. These are indexed.
- JSON-LD must be preserved per country. Use `serializeJsonLd` from `lib/utils.ts` for
  anything with a database-derived value.

**Verify:**
- `npm run build` shows all 22 routes still `○ (Static)` with a 1-week revalidate
- Every URL returns 200 and its title, meta description and JSON-LD match what the old
  page produced — diff the rendered HTML of two or three before and after
- The sitemap still lists them

**Session size:** Large. Migrate two or three countries first, prove the pattern, then
do the rest.

---

## Deliberately not doing

Recorded so nobody re-opens them without new information.

| Item | Why not |
|---|---|
| **Nonce-based CSP** | Per the Next 16 CSP guide, nonces force every page into dynamic rendering — ISR disabled, no CDN caching, higher cost. Bad trade for an app that loads no third-party scripts. `'unsafe-eval'` is already gone from production. Revisit if `experimental.sri` stops being experimental. |
| **Rate limiting the Stripe webhook** | Throttling it makes Stripe retry and eventually drop events. It is guarded by signature verification instead. |
| **Shortening the 30-day session** | Role revocation now takes effect within 5 minutes, so session length is a product preference rather than a security control. Change it if the user wants shorter, not for security. |
| **Removing `'unsafe-inline'` from `script-src`** | Next emits inline bootstrap and hydration scripts. Needs nonces or SRI — see above. |

---

## Owner tasks

Not AI work, but they gate real value.

1. **Enable branch protection on `main`.** CI currently reports but does not block; a
   red PR can still be merged. Settings → Branches → require status checks → tick
   "Type check, lint, format", "Production build" and the Vercel check. Two minutes,
   and worth more than most remaining code changes.
2. **Watch Supabase egress** for a week after the quota reset. Expected steady state is
   well under 1 GB/month. If it climbs, look for a new `include` in a hot path first.
3. **Decide the test framework** for 7.1 before that session starts.
