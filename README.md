# IB Match

A platform that matches International Baccalaureate students to university programmes,
and gives IB school coordinators tools to track and support their students.

Students use it free. Schools are either VIP (free, full access) or Regular, which can
buy a subscription for full coordinator access or run on a limited freemium tier.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript 7 |
| Database | PostgreSQL on Supabase, via Prisma 7 |
| Auth | NextAuth v5 (Auth.js) — Google OAuth and Resend magic links |
| Search | Algolia, synced from Postgres by Prisma client extensions |
| Cache / rate limiting | Upstash Redis |
| Email | Resend, with React Email templates in `emails/` |
| Payments | Stripe (Regular school subscriptions only) |
| Hosting | Vercel |

## Getting started

Requires **Node 24** (see `.nvmrc`), the version Vercel builds and runs on.

```bash
cp .env.example .env      # then fill in the values
npm install               # runs `prisma generate` via postinstall
npm run dev               # http://localhost:3000
```

`.env.example` marks which variables the app refuses to start without. They are
validated by Zod in `lib/env.ts`, so a missing or malformed value fails loudly at
boot rather than at first use.

`npm start` — a production build served locally — needs no extra variables. Auth.js
v5 trusts the request host automatically only in development and on Vercel; the config
in `lib/auth/config.ts` sets `trustHost: true` explicitly so a production build runs
correctly anywhere without `AUTH_TRUST_HOST`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build. Requires a reachable database — some pages query Prisma at build time |
| `npm run type-check` | `tsc --noEmit` |
| `npm run lint` | ESLint — code quality only; formatting belongs to Prettier |
| `npm run format` | `prettier --write .` |
| `npm test` | Vitest, once. `npm run test:watch` re-runs on save |
| `npm run email:dev` | Preview the React Email templates |
| `npx tsx scripts/algolia-usage.ts` | Algolia search requests this month against the free plan's 10,000, the last 30 days and the month's pace. Read-only, one request; run it weekly after release (MAINT 5.27) |
| `npx tsx scripts/send-sample-emails.ts` | Lists the eight emails in the new design with sample data. With `--send` and addresses, sends them through Resend (runbook step 9). No database read |

CI runs type-check, lint, `prettier --check`, both test suites and a production build on
every pull request.

`npm run type-check` runs the native TypeScript 7 compiler, installed as
`@typescript/native` — it owns the `tsc` binary. The `typescript` package is an alias
for `@typescript/typescript6`, which provides the 6.0 JavaScript API that
typescript-eslint still requires; TypeScript 7 does not ship that API. Both are
needed. Installing plain `typescript@7` over the alias makes `npm run lint` fail with
"typescript-eslint does not support TS 7.0".

## Testing

One suite, run in CI:

```bash
npm test            # Vitest: every *.test.ts file
npm run test:watch  # the same, re-run on every save
```

Put tests next to the code they cover as `*.test.ts`. Import `describe`/`it`/`expect`
from `vitest`; globals are off. The `@/` alias resolves as it does in the app.

Tests must never reach the production database that `.env` points at. Mock the client
with `vi.mock('@/lib/prisma')`, or run against a local Postgres built with
`prisma migrate deploy`, the way the CI build job does.

The matching algorithm's tests (`lib/matching/*.test.ts`) were standalone `*.verify.ts`
scripts run by `scripts/run-all-tests.ts` until 7.1 Part 4 moved them into Vitest.

## Database

Prisma schema lives in `prisma/schema.prisma`; migrations in `prisma/migrations`.

A fresh database can be built from migrations alone:

```bash
createdb ibmatch_local
DATABASE_URL=... DIRECT_URL=... npx prisma migrate deploy
```

Between December 2025 and February 2026 the schema was changed with `prisma db push`
without recording migrations. `20260828000000_baseline_invitations_support_legal_cms`
closes that gap. It is purely additive, and on any database that already has those
changes it must be marked as applied rather than executed:

```bash
npx prisma migrate resolve --applied 20260828000000_baseline_invitations_support_legal_cms
```

Two things to know before running any Prisma CLI command:

- **Connection URLs live in `prisma.config.ts`, not the schema.** Prisma 7 rejects
  `url` and `directUrl` in `schema.prisma`. The CLI reads `DIRECT_URL`; the app
  connects through the driver adapter in `lib/prisma.ts` using `DATABASE_URL`.
- **The CLI reads `.env` only.** `.env.local` is a Next.js convention, so a `DIRECT_URL`
  that works for the app can still fail every migrate command with `P1001`.
- **Never run `prisma migrate dev` against production.** It offers to reset the database
  when it detects drift. Use `migrate deploy` for applying and `migrate diff` for
  inspecting; both are safe.

## Layout

```
app/            Routes. Grouped by audience: student, coordinator, admin, plus
                public marketing and per-country SEO landing pages
components/     React components, mirroring the same grouping
lib/            Domain logic — matching, auth, algolia, stripe, email, redis
emails/         React Email templates
prisma/         Schema, migrations, seed
scripts/        Operational and data-loading scripts
docs/           Architecture, product specs, matching algorithm, task records
```

## Documentation

- `docs/tasks/RELEASE_RUNBOOK.md` — the go-live, step by step
- `docs/product/DOC_3_technical-architecture.md` — architecture and the reasoning behind each choice; a December 2025
  proposal, so read its banner first
- `docs/product/subscription-access-model.md` — school tiers and what each can access
- `docs/matching/` — the matching algorithm: `DOC_2_matching-algo XI.md` is the master version, with the changelog
- `docs/tasks/SEC_tasks.md` — security tasks from the audit of 27 October 2026
- `docs/archive/` — old records, kept for reference
