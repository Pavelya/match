# What the providers ask for now

MAINT 7.4, step 2. Read on **23 October 2026**.

**How this was read, and what it is worth.** This session's network policy blocks `vercel.com`, `supabase.com`,
`resend.com`, `stripe.com`, `developers.google.com` and the other providers' sites, so the pages could not be
opened. Everything below comes from **search-result summaries** of the providers' own pages (the URLs are the
pages the summaries came from) and from the live ibmatch.com, which was read directly. Treat each line as a
pointer to check, not as a quotation. The "Open and check" column is what to read yourself before the drafts
rely on it. Where a summary said it could not confirm something, this says so.

Change since February 2026: not established for any provider. The summaries carry the pages' own dates only
loosely, and no provider's change log was readable. Subscribe to each provider's sub-processor notices
(Supabase, Resend and Stripe offer it; see below) and open each DPA's "last updated" line.

## The table

| Provider | Role for IB Match | What it holds | Region | Transfer mechanism (per the summary) | Open and check |
|---|---|---|---|---|---|
| **Supabase** | Database and file storage | Every table in `product-today.md` §1; university images and school logos (no personal data) | Not in the repo. Supabase says a project has one primary region and that "Europe" includes London and Zurich, which are not in the EU | EU SCCs (2021/914) in the DPA, Module 2; Supabase's transfer FAQ says data moves to the US and Singapore under them. Its DPA and a 2025 transfer impact assessment are public | Your project's region (Settings → Infrastructure). The sub-processor list: `supabase.com/legal/customer-resources/subprocessor-list`. Whether your plan keeps backups, and for how long: the policy draft says "deleted data can remain in backups" |
| **Vercel** | Hosting, delivery, serverless functions, logs | All traffic in transit; runtime logs. No database | `x-vercel-id: iad1::fra1::…` on a 22 October 2026 response of `/` suggests the function runs in Frankfurt (`fra1`) behind an edge node in Virginia. Confirm in Project → Settings → Functions | EU SCCs (2021/914) and the UK IDTA in the DPA; its privacy notice says it complies with the EU-US DPF, UK Extension and Swiss-US DPF. An older privacy-policy PDF still names Privacy Shield and is out of date | The DPA (`vercel.com/legal/dpa`) and the sub-processor list (the summary found two URLs: `security.vercel.com` and `vercel.com/legal/subprocessors`; one is stale). Your plan, because log retention depends on it |
| **Upstash** | Redis cache and rate limiting | Match cache (30 minutes), rate-limit counters by IP address or account ID, the programs cache (no personal data) | Not in the repo. Upstash lets a database be placed in one region | The trust center lists the DPF; the summary found no SCC wording | The DPA and sub-processors PDF (`trust.upstash.com`), and the database's region. **Encryption at rest is a Prod Pack feature ($200/month per paid database) or Enterprise, per Upstash's documentation; no summary says the free or pay-as-you-go plan has it.** TLS is always on |
| **Algolia** | Program search | Program records (no student data); search words from visitors, which its sub-processor Datadog may see in log management | Not in the repo. Algolia lets an application choose a cluster region | EU SCCs where the EU GDPR applies and the UK Addendum where the UK GDPR does; contracting party is Algolia SAS for subscribers in Europe, Algolia, Inc. otherwise | The DPA (`algolia.com/policies/data-processing-addendum`) and sub-processors (`algolia.com/subprocessors`). Your application's region and whether Search Analytics is on. Algolia gives subscribers ten business days to object to a new sub-processor |
| **Resend** | Email delivery | Recipient addresses and the content of all seven emails; a log of each send | **All account data is stored in the United States, whichever sending region is chosen**, per Resend's documentation | EU SCCs, Modules 2 and 3, and the UK Addendum, in a DPA that is pre-signed for every account. The summaries did not mention the DPF | Your plan: Resend's pages give 30 days of email and log data for Free, Pro and Scale, flexible for Enterprise, backups 7 days, deletion 90 days after termination. Notice of a new sub-processor is 14 days. Its list includes Supabase, Vercel, Stripe and AWS |
| **Stripe** | Payments for Regular schools | School name, school email, Stripe customer and subscription IDs; card details entered at Stripe | Not in the repo | EU SCCs (Modules 1, 2 and as applicable 3) in a Data Transfers Addendum; the DPF appears in Stripe's supplier terms, and the summary could not find the operative DPF clause in the user DPA | The DPA (`stripe.com/legal/dpa`). **Stripe is a processor for payment processing and an independent controller for some uses (fraud prevention, legal duties); the Privacy Policy draft says so only by pointing to Stripe.** Stripe gives 30 days' notice of a sub-processor |
| **Google** | "Continue with Google" | Nothing of ours. IB Match receives name, email and picture link; Google sees that a person signed in to IB Match | Not applicable | Google is an independent controller of its own account data | See below |

## Google sign-in

- The live redirect asks for `scope=openid profile email`, nothing else (observed 23 October 2026).
- Google's **API Services User Data Policy** has "Limited Use" rules for data from **sensitive and restricted** scopes. `openid`, `email` and `profile` are Google's default sign-in scopes and are not described as either, so the
  Limited Use rules should not bind IB Match. The summary said this is an inference, not a quotation: read
  `developers.google.com/terms/api-services-user-data-policy` to confirm. The Privacy Policy draft says what
  IB Match asks for and receives either way, which is what Google's verification expects to find.
- **OAuth consent screen** (Google Cloud Console → Google Auth Platform): Google's help pages say the app
  homepage must link to the privacy policy, the consent screen's privacy policy link must be on the same
  domain and match, and changing the app name, logo, homepage or privacy link on a verified app means
  brand verification again. `/privacy` stays at the same address, so nothing needs re-verifying. **Check
  that the consent screen's privacy link is `https://www.ibmatch.com/privacy`, that the app is "In
  production", and that the homepage is not just a login page.**
- A Google Cloud project in "Testing" status makes refresh tokens expire after 7 days, except where the only
  scopes are name, email and profile. Not relevant to IB Match.

## Transfers outside the EU

- **The EU-US Data Privacy Framework** remains in force. The General Court dismissed the challenge
  (Latombe v Commission) on 3 September 2025; Latombe appealed on 31 October 2025 (Case C-703/25 P); on
  4 June 2026 the President admitted Microsoft as an intervener; one source reports it still pending in
  October 2026. These are law-firm and commentary pages, not the court's register. **The draft Privacy
  Policy therefore names the Standard Contractual Clauses first and the DPF only "where a provider is
  certified", so a ruling would not make it wrong.**
- Only Vercel's DPF certification, and an Upstash trust-center entry listing the DPF, appeared in the
  summaries. Check each provider on `dataprivacyframework.gov/list` before the policy says more.

## The age of digital consent (GDPR Article 8)

Article 8 sets 16 and lets each member state choose between 13 and 16 where a service relies on a child's
consent. The searches confirmed Ireland (13) and Portugal (13) and no complete table. **No table is copied
here, because none was readable and a wrong one is worse than none.** Ask the lawyer (Q2 in `README.md`) or
use the data-protection authority of each country you serve. IB Diploma students are usually 16 to 19, so
Option A in the draft (16 and older) sits above every member state's age.

## Not processors, but linked from the public pages

- **Ko-fi** (donations). Ko-fi's help pages: no Ko-fi fee on one-time tips on the free tier, 5% on
  memberships, shop sales and monthly tips; PayPal or Stripe fees are charged on top, usually about
  3% plus $0.30. Payments go straight to the creator's own PayPal or Stripe account. The pages read were
  years old, so check the current pricing page. This is the evidence behind the "100% goes to platform
  costs" row in `claims.md`.
- **Calendly** (the coordinator feedback call). Third party; the Cookie Policy draft says so.

## Sources

Search summaries of these pages, 23 October 2026: `vercel.com/legal/dpa`, `vercel.com/docs/logs/runtime`
(log retention: 1 hour Hobby, 1 day Pro, 3 days Enterprise, 30 days with Observability Plus; whether
logs hold client IP addresses was not confirmed), `supabase.com/legal/customer-resources/data-processing-addendum`,
`supabase.com/legal/privacy-resources/data-residency-and-transfers-faq`, `supabase.com/security`
(AES-256 at rest, TLS in transit, daily backups for paid plans, per-project keys), `supabase.com/regions`,
`upstash.com/docs/redis/features/security`, `upstash.com/docs/redis/overall/enterprise`,
`trust.upstash.com`, `algolia.com/policies/data-processing-addendum`, `algolia.com/policies/infrastructure-and-sub-processors`,
`resend.com/security/gdpr`, `resend.com/legal/dpa`, `resend.com/docs/dashboard/domains/regions`, `stripe.com/legal/dpa`,
`stripe.com/legal/dta`, `stripe.com/legal/privacy-center`, `developers.google.com/terms/api-services-user-data-policy`,
`support.google.com/cloud/answer/13806988`, `help.ko-fi.com/hc/en-us/articles/360002506494-Does-Ko-fi-take-a-fee`.
Read directly: `https://www.ibmatch.com/` and `/api/auth/*` response headers, 22–23 October 2026.
