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

**The facts the owner gave:** IB Match has no registered company; it is a hobby project run by **Pavel Yampolsky, an
individual in Poland**; it has received **no donations** so far and **has paying customers** (schools); Tal is the
founder and it was built together with Pavel; a lawyer will check the Privacy Policy and Terms. The owner accepted every
recommendation made in the first version of this page and answered the rest.

| | Decision | What it did to the drafts |
|---|---|---|
| **Q1** | The operator is **Pavel Yampolsky, an individual in Poland**; no registered company. Only the name and country were given: no postal address | Both drafts say "run by Pavel Yampolsky, an individual in Poland. It is not a registered company", reachable at `support@`. Terms 15: the laws and courts of **Poland**. "Non-profit" and "non-commercial" go (schools pay). Terms 6.5: donations are not tax-deductible. Whether a postal address is required is the lawyer's call |
| **Q2** | **A: 16 and older** | Privacy 12 and Terms 3 |
| **Q3** | `support@` is read; **`privacy@` and `legal@` forward to it**; "reply in 24–48 hours" is true | Privacy and the Cookie Policy keep `privacy@`; Terms keep `legal@`; the 24–48-hour line stays. `universities@` and `admin@` become `support@` (`claims.md` M6) |
| **Q4** | **A lawyer reviews** | `[LAWYER: …]` notes in the drafts and [`lawyer-brief.md`](./lawyer-brief.md) |
| **Q5** | Remove the University Agent promises | Both drafts |
| **Q6** | Change the invitation-record words, do not build a deletion | Privacy 8 |
| **Q7** | Coordinator and school deletion stays "ask us" | Privacy 8 and 9 |
| **Q8** | Remove "GDPR Compliant" | `claims.md` H1 |
| **Q9** | **Tal is the founder; built together with Pavel** | One sentence everywhere: "started by Tal, an IB Diploma graduate, and built together with Pavel" (`claims.md` S9) |
| **Q10** | Remove the money claims | Wider than proposed: with no donations received, the whole "Where your support goes" section goes (`claims.md` S1 to S7, K1) |
| **Q11** | The dashboards answered most of it | See "Checks" |
| **Q12** | Publish all three on release day; label and effective date are the day | Unchanged |
| S8 | **"Free for students. We have no plans to charge them."** instead of "forever" and "always" | Terms 6.1 and seven places in code (`claims.md` S8) |
| C6 | The early adopter program is **open** | Keep, reworded (`claims.md` C6) |
| C7 | The four coordinator quotes are **not real** | Remove them (`claims.md` C7, C9) |

## Action list: what is left, and who does it

**Nothing blocks the pull request or the drafts any more.** Two optional confirmations, each with a default I will use:

| Question | Default if you do not answer |
|---|---|
| Is **Pavel also an IB graduate**? (For schools says "former IB students… we lived through the IB experience ourselves") | Singular: "started by an IB graduate", as only Tal is known to be one |
| Have coordinators actually **given feedback**? (For schools says "Based on coordinator feedback, we're building…") | Drop "Based on coordinator feedback" (`claims.md` C9) |

**Owner checks** (facts from your dashboards that the screenshots did not show: "Still open" below, 8 items).

**Lawyer:** read the three drafts with [`lawyer-brief.md`](./lawyer-brief.md); settle every `[LAWYER: …]` note.

**Me, in separate sessions** (each its own pull request):

| Task | What | Needs |
|---|---|---|
| **A. The public pages' words, in code, both designs** | Every **Decided** row in `claims.md`: the Support us section and claims, the founder wording, "free for students", the coordinator quotes, `universities@` and `admin@`, and the structured data (`nonprofitStatus`, "non-profit education") on Support us. Merged on release day with the `go-live` pull requests | Nothing: ready to start |
| **B. Small fixes found on the way** (none in this pull request) | Admin deletion of a coordinator who has sent invitations (F2); the invitation consent version (F3); the export's missing parts (F4); the unredacted address in a log (F5); "Upgrade to VIP" (F6); `analytics: false` on Algolia search if wanted (F9) | Nothing; independent of publishing |
| **C. After publication** | `docs/templates/legal/*.md` and the three fallbacks in code updated to the published text | Publication |

**Before publishing** (not before the pull request): the lawyer's review, the eight checks, and the `[LAWYER: …]`
and remaining `[OWNER: …]` notes settled (one is left in the Privacy draft: the Vercel and Upstash regions).

**This pull request** (docs only, nothing published): the branch merges cleanly with `main`, touches no code, and
Prettier ignores Markdown, so CI is unaffected. It can be opened as soon as you say so.

## Checks only the owner can make

**Answered from your screenshots and files on 23 October 2026.** Five of the original eleven checks were settled by
them, and the others in part:

| Check | What you showed | Result | Effect |
|---|---|---|---|
| Supabase | Project overview | **Free plan, Central EU (Frankfurt), Nano, "No backups"** | The Privacy draft says the database is in Frankfurt and that no backups are kept |
| Vercel plan | Add-Ons page | **Pro** ("12 months viewable history" is Pro's; Hobby has one month). Speed Insights Plus, Observability Plus and Web Analytics Plus are **off** | The Hobby problem does not arise; the DPA applies; runtime logs last one day. The Plus add-ons being off says nothing about the free base Web Analytics; that none runs is from the live site, which loads no Vercel script |
| Algolia | Applications and Analytics pages | **Build plan, Europe (FR), 1.78K records; Search Analytics on** (366 searches, "258 users", no events) | Search words sit in Algolia's logs for 90 days in France; the "users" are Vercel's server addresses, since no `userToken` or visitor IP is sent |
| Resend | Settings → Usage | **Free plan**, 6 of 3,000 emails this month; Marketing: 0 of 1,000 contacts; a Documents tab | 30-day log confirmed; no marketing audience, matching "we send no marketing email". The signed DPA you attached is generic |
| Google scopes | Scope list | `userinfo.email`, `userinfo.profile`, `openid`: all non-sensitive | Limited Use rules do not bind IB Match |
| DPF register | The participant list | Vercel, Stripe, Upstash **Active**; **Resend "Active - Re-certification under Review"**; Algolia, Supabase and Ko-fi not on it | The draft names the SCCs first, so it stays right either way |
| DPF appeal | The Court's order | C-703/25 P pending; Microsoft admitted | Wording unchanged |
| Ko-fi | Account type | Creator | Ko-fi's tax clause applies to you |
| Published Terms and Privacy | The admin's view | Matches the live pages used as the baseline | No change |

**Still open** (none of the screenshots showed these screens; where to find each):

| # | Check | Where | Why it matters |
|---|---|---|---|
| 1 | **Model Training is off** | Vercel → Team Settings → "Model Training" (or the team's data preferences) | The Terms say it is an opt-in on paid Pro, but Vercel's privacy notice (changed since February) says Hobby and Pro teams' de-identified data may go to AI partners "subject to your data preferences in your team settings" |
| 2 | **Vercel function region** | Vercel → project → Settings → Functions. The `x-vercel-id` read `iad1::fra1`, so probably Frankfurt | Privacy 11 |
| 3 | **Upstash: region, plan, Prod Pack** | Upstash console → the database → Details. Prod Pack (+$200/month) is what gives encryption at rest | Privacy 11; "encrypted at rest" is true of the Supabase database, and of Redis only with Prod Pack |
| 4 | **Upstash rate-limit analytics** | Upstash data browser: keys under `@upstash/ratelimit` and `ratelimit:`. `lib/rate-limit.ts` sets `analytics: true` | If IP addresses stay there with no expiry, the Privacy Policy must say so, or the flag goes (a code change) |
| 5 | **Resend open and click tracking are off** | Resend → Domains → `ibmatch.com` → tracking options | Resend's DPA (Exhibit A): tracking "could include IP address, location, operating system, browser, device, email client"; click tracking rewrites sign-in links |
| 6 | **Google consent screen** | Google Cloud Console → Google Auth Platform → Branding / Audience: privacy policy link is `https://www.ibmatch.com/privacy`, publishing status "In production" | Google requires the link to match the homepage's |
| 7 | **Ko-fi fee option and payout account** | Ko-fi → Settings → Payment | Free (0% on one-off tips) or Standard (5% on everything) |
| 8 | **Is a Cookie Policy or FAQ already published?** | `/admin/legal-content` (the live pages show the code text for both) | Decides whether publishing replaces something |

Also: subscribe to each provider's sub-processor notices (Supabase, Stripe, Upstash and Vercel offer it).

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
