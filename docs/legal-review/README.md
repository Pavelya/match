# Legal pages and public claims: review for the owner

MAINT 7.4, steps 1 to 4. Drafted 23 October 2026. **Nothing here is published, and no code or consent flow was
changed.** Step 5 (publishing) waits for the owner's answers below. This is research and drafting, not legal advice.

## What is in this folder

| File | What it is |
|---|---|
| `README.md` | This page: the questions, the checks only the owner can make, what else was found, and how to publish |
| `product-today.md` | Step 1. What IB Match does with data today, from the code and the live site |
| `providers.md` | Step 2. Vercel, Supabase, Upstash, Algolia, Resend, Stripe and Google, and how far this session could read them |
| `privacy-policy.redline.md`, `terms-of-service.redline.md`, `cookie-policy.redline.md` | Step 4. For each: what changed and why, then the diff against the published words |
| `privacy-policy.proposed.md`, `terms-of-service.proposed.md`, `cookie-policy.proposed.md` | The proposed text, ready to paste into `/admin/legal-content` once the `[OWNER …]` notes are settled |
| `claims.md` | Step 4. Every claim on Support us, How it works, For schools, Home and FAQs: the evidence and proposed words |

## Three limits

1. **The providers' own pages could not be read.** This session's network policy blocked their sites. Step 2 is
   built from search-result summaries and is marked as such. The "Open and check" column in `providers.md` is
   what to read yourself.
2. **The published Terms and Privacy Policy are in the production database, which was not queried** (no `.env`
   here). They were read from the live pages on 23 October 2026. The text matches `docs/templates/legal/`,
   which is the baseline for the redlines. The Cookie Policy is the text in `app/cookies/page.tsx`.
3. **Only the owner knows some facts:** who IB Match is, what the accounts say, which plans and regions the
   providers are on. The drafts mark each with `[OWNER Qn: …]`. None may remain when a document is published.

## Questions for the owner (step 3)

Each has a recommendation. Answer them in this order; the first four unblock the drafts.

**Q1. Who runs IB Match, legally?** A person, or a registered organisation? The Privacy Policy must name its
controller and the Terms need a named party, a governing law and a place for disputes (the published Terms say
"the laws of the applicable jurisdiction", which names no law). The same answer decides whether Support us may
say "non-profit", whether donations are tax-deductible, and who is paid by Ko-fi. *Recommendation:* name the
person or entity that actually holds the Ko-fi, Stripe and provider accounts, even if it is you, and say plainly
what it is. Do not call it a non-profit unless it is registered as one.

**Q2. The age line.** Today: 13 and older (Terms 3, Privacy 12). GDPR Article 8 lets each member state set the age
for a child's consent anywhere from 13 to 16, and IB Match has no age check (no date of birth is asked).
*Recommendation:* Option A in the draft, 16 and older. Diploma students are usually 16 to 19, and 16 is at or above
every member state's age. Option B keeps 13 and asks a parent's permission where the law needs it, which the site
cannot check. Leaving 13 as it is would be wrong in any country with a higher age. A lawyer or the national
authority should confirm (`providers.md` explains why no country table is copied).

**Q3. Which mailboxes are read?** `privacy@` (Privacy 9 and 14, Cookie Policy; the draft promises a reply within one
month, the legal limit), `legal@` (Terms 6.4 and 16), `support@` (Organization JSON-LD, emails' sender),
`universities@` (Support us) and `admin@` (Support us' program suggestion). Also "we typically respond within
24–48 hours" on Contact, the forms and the ticket email. *Recommendation:* publish only addresses someone reads,
fewer is better (`privacy@` and `support@`), and keep the 24–48-hour line only if it is what happens.

**Q4. Will a lawyer review the drafts?** *Recommendation:* yes, the Privacy Policy and Terms, before they are
published. The points to ask about are marked: the legal bases (Privacy 3); the paragraph that makes a school the
controller and IB Match its processor when the student created the account and agreed to the link themselves
(Privacy 10); the transfers wording (Privacy 11); the limitation of liability (Terms 12); the governing law
(Terms 15). The Cookie Policy is the least risky of the three.

**Q5. The university agent role.** Terms 2, 5.3, 6.1 and 14, and Privacy 3, 4.2 and 10 promise agent accounts,
program management and anonymised statistics. None exists: no sign-up, no dashboard, no feature (`product-today.md`
§1). *Recommendation:* the drafts remove them and say no university sees student data. Restore a section, with
the policy updated first, when the role ships.

**Q6. Invitation records.** The Privacy Policy says expired or declined ones are deleted after 90 days. Nothing
does that (no cron, no job), and "decline" only sets `CANCELLED`. *Recommendation:* change the words now (the
draft does: kept while the school exists, and a student's own are deleted with their account). If you want the
shorter promise because it is better data minimisation, it is a small separate task (a scheduled delete); restore
the old sentence only after it ships.

**Q7. Deleting a coordinator or a school.** The policy and Terms say coordinators "request deletion through the
platform". The portal's button is a placeholder ("Data Deletion Coming Soon… Contact support"), and an admin's
delete of a coordinator who has sent invitations is restricted by a foreign key (finding F2). *Recommendation:*
the draft says "ask us through a Data & privacy request or privacy@"; build the self-serve request only if
schools ask for it.

**Q8. "GDPR Compliant".** A legal conclusion on How it works. *Recommendation:* remove it. The drafts fix the gaps a
reader of the policy would find (no controller named, missing sub-processors, a retention promise nothing keeps,
no legal bases), but only a lawyer or regulator concludes "compliant". Replace with statements a student can check:
"Your data is never sold. Download or delete it any time in Settings."

**Q9. One founder story.** Five different sentences say who built IB Match: "an IB graduate", "a former IB
student", "I built IB Match… Tal", "former IB students… we", "students helping students" (`claims.md` S9, C8).
*Recommendation:* if it is one person, say "IB Match was built by Tal, an IB Diploma graduate" on every page and
keep "I" in the founder note; if it is a team, change the founder note instead.

**Q10. Money.** Support us says non-profit, non-commercial, "100% goes to platform costs", a 60/20/15/5 split,
"Most Popular" and what $5, $15 and $50 buy (`claims.md` S1 to S7). *Recommendation:* remove the percentages, the
badge and the "covers…" lines; keep "free for students" and "donations help pay for hosting, the database, search
and email". Restore figures only from the real accounts, with the year they cover.

**Q11. Facts only your dashboards show.** See "Checks" below.

**Q12. When to publish.** A new Terms or Privacy Policy version shows "We've updated our policies" to **every
signed-in user the moment it is published**; choosing a later effective date only changes the date shown. The new
design's notice is built (rebranding 4.6, done 20 October). *Recommendation:* publish both on release day, after the
new design is live, so each student sees the notice once and in the new design; use the publishing day as both the
label and the effective date. Publish the Cookie Policy at the same time (it needs no notice). The public pages'
wording changes in code in the same window (below).

## Checks only the owner can make

1. **Supabase.** Project region (Settings → Infrastructure); plan, and whether it keeps backups and for how long;
   that the DPA is accepted (Dashboard → Legal documents).
2. **Vercel.** Plan (log retention is 1 hour on Hobby, 1 day on Pro); function region (the `x-vercel-id` read
   `iad1::fra1`, so probably Frankfurt); that Web Analytics and Speed Insights are off; the DPA.
3. **Upstash.** Region and plan. Whether the database has encryption at rest (a Prod Pack or Enterprise feature).
4. **Upstash rate-limit analytics.** `lib/rate-limit.ts` creates each limiter with `analytics: true`. In the
   Upstash data browser, look at the keys under `@upstash/ratelimit` and `ratelimit:`: if they keep IP addresses
   with no expiry, the Privacy Policy has to say so or the flag goes (a code change).
5. **Algolia.** Cluster region; whether Search Analytics is on; the DPA.
6. **Resend.** Plan (Resend keeps 30 days of email and log data on Free, Pro and Scale); the DPA; the sending region.
   All Resend account data is in the US.
7. **Stripe.** The DPA in your dashboard's settings.
8. **Google Cloud Console.** OAuth consent screen: the privacy policy link is `https://www.ibmatch.com/privacy`, the
   app is "In production", and the homepage is not only a login page.
9. **Ko-fi.** Which of your PayPal or Stripe accounts it pays into, and the fee on your page.
10. **The DPF list** (`dataprivacyframework.gov/list`) for each provider the Privacy Policy would name.
11. **Subscribe** to each provider's sub-processor notices.

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

## How to publish (step 5)

1. Answer Q1 to Q10, tell me or a session, and have the lawyer read the three drafts. Settle every `[OWNER …]`.
   Check: `grep -n "\[OWNER" docs/legal-review/*.proposed.md` returns nothing.
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
