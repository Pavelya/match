<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

Short by design — this file is in every session's context. Depth lives in the
documents listed at the bottom.

## Before touching the database

The local `.env` points at the **production** Supabase database. There is no separate
development database, so every Prisma command run here hits production.

- **Never run `prisma migrate dev`.** It offers to reset the database when it finds
  drift, and there has been drift.
- **Never run `prisma db push`.** That is what broke the migration history once
  already; repairing it took a full phase.
- `prisma migrate deploy` (apply) and `prisma migrate diff` (inspect) are safe.
- The Prisma CLI reads `.env` **only**. `.env.local` is a Next.js convention, so a
  `DIRECT_URL` that works for the app can still fail every migrate command with `P1001`.
- Connection URLs live in `prisma.config.ts`, not `schema.prisma` — Prisma 7 rejects
  `url`/`directUrl` in the schema. That file loads `dotenv` itself and points Migrate at
  `DIRECT_URL`; the app connects through the adapter in `lib/prisma.ts` on `DATABASE_URL`.
- **Never `new PrismaClient()`** — Prisma 7 requires a driver adapter and it throws
  without one. App code imports `prisma` from `@/lib/prisma`; scripts and the seeder
  import it from `@/lib/prisma-standalone`.
- Destructive SQL needs the user's explicit approval, and a backup taken first.
- **Every table has Row Level Security on and no policies**, and an event trigger turns it on for new
  tables (MAINT 5.37). The app connects as the owner, so it is unaffected. Never disable it or grant
  anything to `anon` or `authenticated`. Supabase's Data API is off.

## Cost — Supabase is on a 5 GB free tier

It was exceeded every month from December 2025, by application code rather than
traffic. Storage was restricted and every university image broke.

- **Never read the whole catalogue per server start or per request.** `instrumentation.ts`
  re-read every program on each Vercel cold start, ~600 times a day; that was the
  recurring overage. The programs cache fills itself on a miss.
- **Prefer `select` over `include`.** `include` returns every column of every joined
  row, which multiplied the cost of each of those reads.
- **Inspect production with aggregates** — `count()`, `sum(length(col))`, `max()`.
  Never `SELECT` a whole table just to see what is in it.
- **Never store binary data in a column.** Images belong in Supabase Storage as URLs.
  One 537 KB base64 image joined across 68 programs caused the outage.
- `npm run build` queries production, because `app/ib-university-requirements` is
  prerendered and calls Prisma. Fine to run; don't loop it.

## Conventions that are easy to get wrong

- **Prettier owns formatting; ESLint owns code quality.** Do not add stylistic rules to
  `eslint.config.mjs` — that conflict once produced 670 errors that could not be fixed,
  because the two tools kept reverting each other.
- **Tests are Vitest: `*.test.ts` next to the code, run by `npm test`.** Mock
  `@/lib/prisma` rather than reaching the database. The matching algorithm's tests are
  Vitest too, since 7.1 Part 4; there is no second suite.
- **Import `prisma` from `@/lib/prisma`.** Never `new PrismaClient()` — the shared
  client is pooled and carries the Algolia sync extensions.
- **Prisma types and enums come from `@/app/generated/prisma/client`**, or `/enums` for
  enums alone, which client components must use. Never `@prisma/client`: it is no
  longer generated (MAINT 6.6).
- **Use `logger` from `@/lib/logger`.** `no-console` is an error outside scripts.
- **Two TypeScript packages, on purpose.** `typescript` is an alias for
  `@typescript/typescript6` (the 6.0 JavaScript API, which typescript-eslint needs) and
  `@typescript/native` is an alias for `typescript@7` (which owns the `tsc` binary).
  Running `npm install -D typescript@latest` collapses that and breaks `npx eslint .`
  with "typescript-eslint does not support TS 7.0".
- **The 23 `study-in-*` pages are static with a one-week revalidate deliberately.**
  Keep them static; dynamic rendering costs both latency and money.
- `npm start` needs `AUTH_TRUST_HOST=true` outside Vercel, or every `/api/auth/*` route
  returns 500 with `UntrustedHost`. Auth.js v5 auto-trusts only in dev and on Vercel.
- **Every admin and coordinator page calls `requireAdmin()` or `requireCoordinator()` first**
  (`lib/auth/guards.ts`). A layout's check does not cover the pages under it; Next renders a page
  alongside its layout. `app/page-guards.test.ts` fails for a page without one (SEC-1).

## Workflow

**Merging `main` deploys to production.** Work on a branch, open a pull request, let CI
pass, and let the user merge. Never commit to `main`. The user merges between sessions, so
start every change from a new branch off `origin/main` and check the branch before committing.
Finishing a task from `docs/tasks/MAINT_tasks.md` includes moving it to "1. Done" there, in the same
pull request (the rule is at the top of its "Start here").

**The repository is public.** A commit, pull request or doc that describes an unfixed vulnerability
publishes it. Fix first, in neutral words; write the finding up once the fix is deployed.

Verification — all free, and nothing reaches a third party except the build:

```bash
npx tsc --noEmit && npx eslint . && npx prettier --check . && npm run build
npm test
```

## Where to look

- `docs/tasks/RELEASE_RUNBOOK.md` — the go-live: every step from now to the old design's deletion, in
  order. For the release's order it overrides the other task files
- `docs/tasks/MAINT_tasks.md` — remaining work, grouped into sessions, with the full
  standing context and per-task verification
- `docs/tasks/REBRANDING_tasks.md` — the redesign: design tasks (D…) on the canvas, build
  sessions in code, and how each kind of session runs
- `docs/product/DOC_3_technical-architecture.md` — architecture and the reasoning
  behind each choice
- `docs/matching/DOC_2_matching-algo XI.md` — the master version of the matching algorithm: what runs
  and its known problems. Earlier versions are records. The work left on it is the order at the top of
  `MAINT_tasks.md`, "Start here"
- `docs/tasks/SEC_tasks.md` — security tasks from the audit of 27 October 2026, in priority order
- `docs/security/security-audit-report-2026-01.md` — security audit history
- `README.md` — setup, scripts, and database notes
