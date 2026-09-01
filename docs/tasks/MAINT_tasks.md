# Maintenance Roadmap

**Written:** 30 August 2026 · **Covers:** work remaining after maintenance phases 1–4

**How to use this.** [Start here](#start-here) says which tasks to run in which
session, and in what order. The checklist after it is the flat list. Everything below
that is one detailed section per task — the part a session actually works from.

Each task is written to be picked up by a **fresh AI session with no memory of the
earlier work**. Every session should read [Standing context](#standing-context) first:
it holds the rules that stop a session breaking production or burning the free-tier
quota.

---

## Start here

**Eleven sessions, in this order.** Each one is a fresh AI session, one branch, one
pull request, merged before the next starts.

| # | Session | Tasks | Size | Why these are together |
|---|---|---|---|---|
| 1 | Small cleanups | 5.2, 5.3, 5.4 | short | Three tiny changes, none touch the database, and one verification pass covers all three |
| 2 | Client-side navigation | 5.1 | short | Needs a judgement call at each call site, and sign-in has to be clicked through by hand |
| 3 | Prisma 7 | 6.1 | medium | **Done.** Closed all advisories, but needed an `overrides` block as well as the upgrade |
| 4 | Stripe 22 | 6.2 | medium | Money path. Alone, so a failure points at one thing |
| 5 | Minor and patch batch | 6.4 | short | Alone, so a regression is attributable to this batch |
| 6 | lucide-react 1.x | 6.3 | medium | 171 files, and only a human eye can confirm the icons |
| 7 | TypeScript 7 | 6.5 | unknown | Last, because it is the most likely to produce unrelated noise |
| 8 | Pick a test framework, test access control | 7.1, part 1 | medium | The decision, then the highest-value tests |
| 9, 10 | More tests | 7.1, rest | medium each | One area per session: webhook, then API routes |
| 11+ | Country pages | 7.2 | large | Migrate two or three, prove the pattern, then the rest |
| any | Manchester's image | 5.5 | tiny | Blocked on Supabase Storage. Fold into whichever session comes after it is unrestricted |

Sessions 1 and 2 are the cheapest and safest — good places to start.
Session 3 is the most valuable.

### Rules for grouping

1. **Never two dependency upgrades in one session.** If something breaks you will not
   know which upgrade did it, and you will spend more time unpicking it than you saved.
2. **Never mix a risky change with cleanups.** Anything that might need reverting
   deserves a pull request with nothing else in it.
3. **Group only changes that are individually trivial** and share one verification
   pass. That is why session 1 works and nothing else is batched.
4. **Stop when the pull request gets hard to review**, not when the task list is empty.

### What this costs

More sessions costs more in AI time; a bad batch costs more in debugging. Batching
only trivia is the balance. Every session ends with a merged pull request, so the next
one starts from a clean `main` and does not have to rediscover anything.

---

## The full list

Phase 5 — quick wins

- [ ] 5.1 Use the router for internal navigation
- [x] 5.2 Delete the unused admin programs API route
- [x] 5.3 Remove the redundant Cache-Control on Next's own static assets
- [x] 5.4 Set `trustHost` explicitly in the auth config
- [ ] 5.5 Restore the University of Manchester image

Phase 6 — dependency majors

- [x] 6.1 Prisma 6 → 7
- [ ] 6.2 Stripe 20 → 22
- [ ] 6.3 lucide-react 0.x → 1.x
- [ ] 6.4 The minor and patch batch
- [ ] 6.5 TypeScript 5.9 → 7
- [ ] 6.6 Move to the `prisma-client` generator

Phase 7 — structural

- [ ] 7.1 Test coverage beyond the matching algorithm
- [ ] 7.2 Collapse the 22 country landing pages

Owner tasks — not AI work

- [ ] Enable branch protection on `main`
- [ ] Watch Supabase egress for a week after the quota reset
- [ ] Decide the test framework before session 8

---

## Standing context

**Read this before starting any task below.**

### What this project is

IB Match — Next.js 16 (App Router, Turbopack), React 19, TypeScript 5, PostgreSQL on
Supabase via Prisma 7, NextAuth v5, Algolia, Upstash Redis, Resend, Stripe, hosted on
Vercel. `AGENTS.md` at the repo root is authoritative: **this is Next.js 16 and it
differs from training data. Read `node_modules/next/dist/docs/` before writing code
that touches framework behaviour.** That directory is the installed version's own
documentation and has been correct every time it was consulted.

### State as of 30 August 2026

| | |
|---|---|
| Vulnerabilities | 0 — closed in session 3 by the Prisma 7 upgrade plus a small `overrides` block |
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

`npm run dev` and `npm start` both work with no extra variables. Auth.js v5 auto-trusts
the host only in dev and on Vercel, so `lib/auth/config.ts` sets `trustHost: true`
explicitly (task 5.4). Without that, every `/api/auth/*` route returns 500 with
`UntrustedHost` outside those two environments.

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

### 6.1 — Prisma 6 → 7 — **done**

**Outcome:** `npm audit` reports **0 vulnerabilities**, Prisma is on 7.10.0, and the
`package.json` seed block has moved to `prisma.config.ts`.

**What the plan got wrong.** Three things, all worth knowing before the next upgrade:

1. **The upgrade alone does not close the advisories — it adds one.** `@prisma/config@7.10.0`
   still pins the vulnerable `deepmerge-ts@7.1.5`, and the Prisma 7 CLI bundles a
   vulnerable `mysql2` that Prisma 6 did not. Prisma 7 on its own takes the count from
   4 high to 5. What actually reaches 0 is the upgrade **plus** an `overrides` block:

   ```json
   "overrides": {
     "deepmerge-ts": "^8.0.2",
     "brace-expansion@1": "^1.1.18",
     "mysql2": "^3.22.0"
   }
   ```

   The upgrade is still required: `effect@<3.20.0`, reachable only through
   `@prisma/config`, cannot be fixed on Prisma 6. Neither half is sufficient alone.

   Note the `brace-expansion@1` key. An unscoped `brace-expansion` override forces
   every copy in the tree to 1.x, and this tree also carries 2.x and 5.x. Scope it.

2. **`npm install prisma@latest` installs a release candidate.** The `latest` dist-tag
   currently points at `8.0.0-rc`; stable v7 sits under `prev`. Pin the version.

3. **The upgrade is much larger than "swap the seed block".** Prisma 7 removed the Rust
   query engine, so a driver adapter (`@prisma/adapter-pg`) is mandatory —
   `new PrismaClient()` throws without one. That is a runtime failure, not a type error,
   so `tsc` stays green while every script is broken. All 41 construction sites had to
   move to a shared client.

**The TLS trap.** node-postgres reads `sslmode=require` as "encrypt **and** verify the
chain"; Prisma 6's engine read it as "encrypt, don't verify". Supabase's pooler presents
a chain Node does not trust, so after the upgrade every query failed with
`self-signed certificate in certificate chain` — including `npm run build`, which
prerenders `app/ib-university-requirements`. `lib/prisma-adapter.ts` rewrites the value
to `no-verify`, which is exactly the posture Prisma 6 already had. Doing it in code
rather than in `.env` means the Vercel variables did not have to change in lockstep.

**Follow-up worth doing:** verify the chain properly (`verify-full` plus Supabase's CA
certificate). That is a change to the trust model, so it was deliberately kept out of a
major-version upgrade rather than folded into it.

**Connection pool.** A driver adapter inherits node-postgres's pool defaults, where
`max` is 10 — double the Prisma 6 default it replaces (`num_cpus * 2 + 1`). On the free
tier with pgbouncer already pooling server-side, `lib/prisma.ts` sets `max: 5`
explicitly rather than silently doubling connections per instance.

**What changed:** `prisma.config.ts` (new), `lib/prisma-adapter.ts` (new),
`lib/prisma-standalone.ts` (new), `lib/prisma.ts`, `prisma/schema.prisma` (the
datasource no longer carries `url`/`directUrl` — Prisma 7 rejects them), `package.json`,
and 40 scripts repointed off `new PrismaClient()`.

**Verified:** 0 vulnerabilities · `migrate status` up to date · type-check, lint,
prettier and build all clean · 20/20 matching tests · the 5 migrations rebuild a fresh
database with `migrate diff` reporting no difference · both Prisma extensions confirmed
firing at runtime under the new query pipeline, against a throwaway local database.

**Still to check by hand:** edit a program in the admin UI and confirm it syncs to
Algolia and invalidates the programs cache. The reference-data extension was proven to
fire; the program-level Algolia path needs a real edit, which means a production write.

**Note:** the generator is still the deprecated `prisma-client-js`, which keeps
generating into `node_modules` so all 60 `@prisma/client` import sites are unchanged.
Moving to the `prisma-client` generator means a required `output` path and rewriting
every one of those imports. It is a mechanical but wide change and deserves its own
session — see 6.6.

---

### 6.6 — Move to the `prisma-client` generator

**Outcome:** the schema uses `provider = "prisma-client"` with an explicit `output`, and
no code imports from `@prisma/client`.

**Why:** `prisma-client-js` is deprecated and Prisma has said it will be removed. It
also generates into `node_modules`, which is the thing Prisma 7 moved away from.

**Size:** ~60 files, mechanical. Check the generated directory is gitignored, and watch
for the known `.prisma/client/default` resolution issue on Next 16 + Turbopack.

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
