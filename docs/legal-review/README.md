# Legal pages and public claims: review for the owner

MAINT 7.4, steps 1 to 4. Drafted 23 October 2026. **Nothing here is published, and no code or consent flow was
changed.** Step 5 (publishing) waits for the owner's answers below. This is research and drafting, not legal advice.

## What is in this folder

| File | What it is |
|---|---|
| `README.md` | This page: the questions, the checks only the owner can make, what else was found, and how to publish |
| `product-today.md` | Step 1. What IB Match does with data today, from the code and the live site |
| `providers.md` | Step 2. Vercel, Supabase, Upstash, Algolia, Resend, Stripe, Google and Ko-fi, read from their own pages on 23 October 2026 |
| `privacy-policy.redline.md`, `terms-of-service.redline.md`, `cookie-policy.redline.md` | Step 4. For each: what changed and why, then the diff against the published words |
| `privacy-policy.proposed.md`, `terms-of-service.proposed.md`, `cookie-policy.proposed.md` | The proposed text, ready to paste into `/admin/legal-content` once the `[OWNER …]` notes are settled |
| `claims.md` | Step 4. Every claim on Support us, How it works, For schools, Home and FAQs: the evidence, the decision and the proposed words |
| `lawyer-brief.md` | What the lawyer should read, and the twelve questions the drafts leave to them |

## Three limits

1. **Provider pages.** The first pass of step 2 was blocked by the environment's network policy. Once it was widened, nearly
   every page was read directly, some in a headless browser; the owner then supplied what no outsider can open:
   dashboard screenshots, the DPF participant list, the Court's order in the DPF appeal, Resend's signed DPA and a
   sub-processor export (`providers.md`). Still unread: anything in the DPF appeal after 4 June 2026, and an official
   Article 8 age table (the one used is a commercial compilation).
2. **The published Terms and Privacy Policy are in the production database, which was not queried** (no `.env`
   here). They were read from the live pages on 23 October 2026. The text matches `docs/templates/legal/`,
   which is the baseline for the redlines. The Cookie Policy is the text in `app/cookies/page.tsx`.
3. **Only the owner knows some facts:** who IB Match is, what the accounts say, which plans and regions the
   providers are on. The drafts mark each with `[OWNER Qn: …]`. None may remain when a document is published.

## Decisions settled on 23 October 2026 (step 3)

**The facts the owner gave:** IB Match has no registered company; it is a hobby project run by an individual; it has
received **no donations** so far and **has paying customers** (schools); `support@ibmatch.com` is the mailbox that is
read; a lawyer will check the Privacy Policy and Terms. The owner accepted every recommendation made in the first
version of this page.

| | Decision | What it did to the drafts |
|---|---|---|
| **Q1** | The operator is an **individual**, not a company | Both drafts now say "run by [name], an individual in [country]. It is not a registered company". "Non-profit" and "non-commercial" go (schools pay). Terms 6.5 says donations are not tax-deductible, because IB Match is not a registered charity. **Name, country and address are still needed (below)** |
| **Q2** | **A: 16 and older** | Privacy 12 and Terms 3 say 16; Option B is gone |
| **Q3** | **`support@` is the address kept** | Every contact point in the drafts is `support@ibmatch.com`, or the Contact page's Data & privacy request. `privacy@`, `legal@`, `universities@` and `admin@` leave the drafts and the public pages (`claims.md` M6) |
| **Q4** | **A lawyer reviews** | The points for the lawyer are tagged `[LAWYER: …]` in the drafts and listed in [`lawyer-brief.md`](./lawyer-brief.md) |
| **Q5** | Remove the University Agent promises | Done in both drafts |
| **Q6** | Change the invitation-record words, do not build a deletion | Done in Privacy 8 |
| **Q7** | Coordinator and school deletion stays "ask us" | Done in Privacy 8 and 9 |
| **Q8** | Remove "GDPR Compliant" | `claims.md` H1 |
| **Q9** | One story everywhere | **Who** is still missing (below) |
| **Q10** | Remove the money claims | **Wider than proposed:** with no donations received, the whole "Where your support goes" section goes, not only the percentages (`claims.md` S1 to S7, K1) |
| **Q11** | The dashboards answered most of it | See "Checks" |
| **Q12** | Publish all three on release day; label and effective date are the day | Unchanged |

## Action list: what is left, and who does it

**Answers I need from the owner** (each blocks the item shown):

| # | Question | Blocks |
|---|---|---|
| 1 | **Your name as it should appear** in the Privacy Policy and Terms, the **country** whose law governs and whose courts hear disputes, and whether to give a **postal address** (the lawyer decides if one is required) | Privacy 1, Terms 1 and 15 |
| 2 | **Q9: who built IB Match?** One person? Is it "Tal" as the founder note says, and is Tal the person named in answer 1? | The founder wording on five pages |
| 3 | **"Free forever"** (`claims.md` S8): keep it, or "free for students; we have no plans to charge them"? My lean is the second | Support us, Home, Terms 6.1 |
| 4 | **Is the early adopter program still open** (C6)? | For schools |
| 5 | **Are the four coordinator quotes real** (C7)? | For schools |
| 6 | **Is "we usually reply in 24–48 hours" true** (M3)? | Contact, forms, ticket email |
| 7 | Do `privacy@` and `legal@` forward to the `support@` inbox? If yes they could stay; if not the drafts keep `support@` only | Optional |

**Owner checks** (facts from your dashboards: the "Still open" list below, 8 items).

**Lawyer:** read the three drafts with [`lawyer-brief.md`](./lawyer-brief.md); settle every `[LAWYER: …]` note.

**Me, once 1 to 6 are answered** (separate sessions, each its own pull request):

| Task | What | Needs |
|---|---|---|
| **A. The public pages' words, in code, both designs** | Every **Decided** row in `claims.md`, `support@` in place of the other mailboxes, and the structured data (`nonprofitStatus`, "non-profit education") on Support us. Merged on release day with the `go-live` pull requests | Answers 2 to 6 |
| **B. Small fixes found on the way** (none in this pull request) | Admin deletion of a coordinator who has sent invitations (F2); the invitation consent version (F3); the export's missing parts (F4); the unredacted address in a log (F5); "Upgrade to VIP" (F6); `analytics: false` on Algolia search if wanted (F9) | Nothing; independent of publishing |
| **C. After publication** | `docs/templates/legal/*.md` and the three fallbacks in code updated to the published text | Publication |

**This pull request** (docs only, nothing published): the branch is 5 commits ahead of `main` and 0 behind, merges
cleanly, touches no code, and Prettier ignores Markdown, so CI is unaffected. The `[OWNER …]` and `[LAWYER …]` notes
are expected in drafts. It can be opened as soon as you say so.

## Checks only the owner can make

**Answered on 23 October 2026** (screenshots and files from you), and what each changed:

| Check | Result | Effect |
|---|---|---|
| Supabase | **Free plan, Central EU (Frankfurt), Nano, no backups** | The Privacy draft says the database is in Frankfurt and that no backups are kept |
| Vercel plan | **Pro** (the Add-Ons page's "12 months viewable history" is Pro's; Hobby has one month). Speed Insights Plus, Observability Plus and Web Analytics Plus are off | The Hobby problem does not arise; the DPA applies; runtime logs last one day; no Vercel analytics |
| Algolia | **Build plan, Europe (FR), 1.78K records; Search Analytics on** (366 searches, "258 users", no events) | Search words sit in Algolia's logs for 90 days in France; the "users" are Vercel's server addresses, since no `userToken` or visitor IP is sent |
| Resend | **Free plan**, 6 of 3,000 emails this month; countersigned DPA (generic, customer block blank) | 30-day log confirmed; the Privacy draft's placeholder is gone |
| Google scopes | `userinfo.email`, `userinfo.profile`, `openid`: all non-sensitive | Limited Use rules do not bind IB Match |
| DPF register | Vercel, Stripe, Upstash **Active**; **Resend "Active - Re-certification under Review"**; Algolia, Supabase and Ko-fi not on it | The draft names the SCCs first, so it stays right either way |
| DPF appeal | Order of 4 June 2026 (C-703/25 P): appeal pending; Microsoft admitted as intervener | Wording unchanged |
| Ko-fi | Account type: creator | Ko-fi's tax clause applies to you (Q1) |
| Published Terms and Privacy | The text matches the live pages used as the baseline | No change |

**Still open:**

1. **Vercel → Team Settings: Model Training is off.** The Terms say it is an opt-in on a paid Pro plan, but Vercel's privacy notice
   (changed since February) says that for "Hobby and Pro plan users, subject to your data preferences in your team settings" it
   may share de-identified information with AI partners, and lists a Team Preferences "Opt-out of Model Training". Check it is off.
2. **Vercel function region** (Settings → Functions; the `x-vercel-id` read `iad1::fra1`, so probably Frankfurt) and
   **Upstash: region, plan and Prod Pack** (+$200/month, which is what gives Redis encryption at rest; without it, say
   "encrypted at rest" only of the Supabase database). Neither was in the screenshots.
3. **Upstash rate-limit analytics.** `lib/rate-limit.ts` creates each limiter with `analytics: true`. In the Upstash data
   browser, look at the keys under `@upstash/ratelimit` and `ratelimit:`: if they keep IP addresses with no expiry, the
   Privacy Policy has to say so or the flag goes (a code change).
4. **Resend → Domains → `ibmatch.com`: open tracking and click tracking are off.** Resend's DPA (Exhibit A) says a customer
   "has the option to enable open/link tracking… which could include IP address, location, operating system, browser,
   device, email client". If either is on, the Privacy Policy has to say so, and click tracking rewrites sign-in links.
5. **Google Cloud Console, OAuth consent screen:** the privacy policy link is `https://www.ibmatch.com/privacy` and the
   app is "In production". The scopes were shown; those two things were not.
6. **Ko-fi:** which PayPal or Stripe account it pays into, and whether the page is on the Free option (0% on one-off tips)
   or Standard (5% on everything). The page's own text carries the claims in `claims.md` K1.
7. **Production database / `/admin/legal-content`:** whether a Cookie Policy or FAQ document is already published
   there (the live pages show the code text for both).
8. **Subscribe** to each provider's sub-processor notices (Supabase, Stripe, Upstash and Vercel offer it).

## Found while checking (not in the 7.4 list)

Each is a separate, small change or a decision. None was changed here, because the task forbids touching a consent
flow in this pull request and nothing may reach production before approval.

- **F1. Today's cookie banner has no switches either.** The task text says it does. `components/shared/CookieConsentBanner.tsx`
  shows four static rows ("Not currently used") under Customize. So the published Cookie Policy's "choose which
  categories to enable" is wrong for both designs, and the sentence can change before release day. The other new
  facts in the draft (`ibm-theme`, `shortlist-count`) exist only in the new design, so publishing everything on
  release day is simplest.
- **F2. A coordinator who has invited anyone cannot be deleted by the admin button.** `Invitation.invitedBy` has no
  `onDelete`, so Prisma restricts it (`prisma/schema.prisma:447`). Read from the schema and the route; not run
  against production. `scripts/cleanup-user-invitations.sql` is the manual workaround.
- **F3. Students who join by invitation are shown "We've updated our policies" at once.** The invitation stores
  `'2025-12-14'` as their Terms and Privacy version, which is never a published label (`accept-student-invite/route.ts`,
  `students/invitations/accept/route.ts`). `/api/students/consent`, which would store `'2025-12-09'`, is called
  by nothing. A small fix: store the published labels. A consent-flow change, so its own pull request.
- **F4. The export is partial.** It leaves out consent records, support tickets and invitations; the draft says so
  and offers the rest by request.
- **F5. `lib/email/support-tickets.ts` logs the recipient's address unredacted** on each send; the account emails
  redact it. Logs are short-lived, so this is a consistency fix for a later cleanup, not a policy problem.
- **F6. In the coordinator portal,** "Upgrade to VIP" (`app/coordinator/students/page.tsx:118`, `:172`) offers
  something a school cannot buy (`claims.md` P1).
- **F7. Pages the owner listed but that also carry claims** (`claims.md`): the home page's "The only university
  matching platform…" (M1), the FAQ's "Your data is never shared without your consent" (M2) and Contact's response
  time (M3). M2 belongs in go-live pull request #127.
- **F8. `docs/product/DOC_3_technical-architecture.md` is out of date** (it names Vercel Postgres, Vercel Blob and
  Vercel Analytics). Not read by users; worth a line the next time it is touched.
- **F9. Algolia's Search Analytics is on and keeps search words for 90 days** (and the server's address, not visitors'). That is
  fine and now in the Privacy draft; if you would rather keep none, send `analytics: false` on the search call
  (`lib/algolia/search.ts`, a small code change). The Explore count query already does.

## How to publish (step 5)

1. Answer the open questions above, and have the lawyer read the three drafts. Settle every `[OWNER …]` and `[LAWYER …]` note.
   Check: `grep -n "\[OWNER\|\[LAWYER" docs/legal-review/*.proposed.md` returns nothing.
2. Fill in the regions, plans and entity in the drafts; keep the structure and the numbered `##` headings.
3. In `/admin/legal-content`, for each of Terms, Privacy and Cookie Policy: create the version from the proposed
   text, give it the publishing day as its label (`YYYY-MM-DD`), publish with "effective now". Terms and Privacy
   trigger the notice for signed-in users immediately; Cookie Policy does not. Drop a leading `# ` heading if you
   paste one (5.23).
4. After publishing, update `docs/templates/legal/*.md` to the published text, and `FALLBACK_CONTENT` in
   `app/cookies/page.tsx`, `app/privacy/page.tsx` and `app/terms/page.tsx` in the same change, so a missing CMS row
   never shows an old document.
5. The public pages' wording (`claims.md`), as one reviewed pull request that edits both designs' files, merged at
   the same time as release day's other `go-live` changes; `npm run build` and the SEO snapshot (`scripts/seo-snapshot.ts`)
   show whether titles and descriptions moved, and 7.3 should hear if they did.
6. The emails' "Terms And Conditions" link is renamed by rebranding 4.7 from release day. Nothing to do here.
