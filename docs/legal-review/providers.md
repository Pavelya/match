# What the providers ask for now

MAINT 7.4, step 2. Each page below was fetched and read as text on **23 October 2026**; "page dated" is the date the
page itself shows.

**Added by the owner on 23 October 2026** (private pages and files this session could not open): screenshots of the
Vercel, Supabase, Algolia and Resend dashboards; the Data Privacy Framework participant list (`.xlsx`); a CSV
of sub-processors exported from a SafeBase page; Resend's countersigned DPA (PDF); Google's OAuth scope list; the
Court of Justice's order in Case C-703/25 P; and the text of the published Terms and Privacy Policy as an admin sees
them (it matches the live pages used as the redline baseline). Those are cited below as "owner's screenshot",
"owner's file" and so on.

**Still not read:** Vercel's own sub-processor page (the CSV stands in for it, and does not name its source, which
is inferred from the file name and the entries); anything in the Court of Justice's case after the 4 June 2026 order; an
official Article 8 table (the one below is a commercial compilation).

## The Vercel plan: Pro, so the Hobby problem does not arise

Vercel's pages, read directly, say the Hobby plan is for "personal or non-commercial use" only and may be used for AI
model training by default, and that its DPA covers Pro and Enterprise plans (Terms of Service, page dated 19 October
2026; DPA effective 31 March 2026). The owner's screenshot of Vercel's Add-Ons page says "Included in your plan: 12
months viewable history; Custom Events with 2 properties", and Vercel's Web Analytics limits page gives exactly that for the
**Pro** plan (Hobby: one month, no custom events). So IB Match is on **Pro**: the DPA applies, the commercial use is
allowed, and Model Training is "not enabled by default" (it is an opt-in). **Still to check: Team Settings, Model
Training, is off.** On the same screenshot Speed Insights Plus, Observability Plus and Web Analytics Plus are all
off, so runtime logs are kept for Pro's default of **one day** (Vercel's runtime-logs page: Hobby 1 hour, Pro 1 day, Pro
with Observability Plus 30 days, Enterprise 3 days).

## The table

| Provider | Role for IB Match | What it holds | Where | Transfer mechanism | Notice of change | Page dated |
|---|---|---|---|---|---|---|
| **Supabase** | Database and file storage | Every table in `product-today.md` §1; university images and school logos | **Central EU (Frankfurt), `eu-central-1`, on the Free plan, Nano compute, "No backups"** (owner's screenshot). Supabase: "your PostgreSQL database, as well as Auth service and Storage objects are hosted in that region, alongside backups". Not guaranteed never to leave it: account information, usage information and logs, content delivery and support access are processed elsewhere. The contracting company is Supabase Pte. Ltd. (Singapore), with Supabase, Inc. (US) for support | EU SCCs (2021/914), Module Two (controller to processor), incorporated in the DPA; "acceptance of the Agreement shall have the same effect as signing the SCCs". Its FAQ names the US and Singapore as destinations. **No DPF** | 30 days' notice of a new sub-processor if you subscribe at `supabase.com/legal/customer-resources/subprocessor-list`. Lists dated **1 June 2026** and **12 October 2026** (read; includes AWS, Cloudflare, Google, Upstash, Vercel, Sentry, OpenAI) | DPA incorporated by the Terms; security page: "All customer data is encrypted at rest with AES-256 and in transit via TLS"; "All paid customer databases are backed up every day" (so a free project has no backup) |
| **Vercel** | Hosting, delivery, serverless functions, logs | All traffic in transit; request and runtime logs (its privacy notice: "End User IP address, location information derived from IP address"). No database | Primary processing in the US. The `x-vercel-id` of `/` on 22 October read `iad1::fra1`, so probably functions in Frankfurt (confirm in Settings → Functions). **Plan: Pro** (see above) | 2021 EU SCCs (Irish law) and the UK IDTA in the DPA. Privacy Notice (dated 1 June 2026): complies with the EU-US DPF, the UK Extension and the Swiss-US DPF. **On the DPF register: Vercel Inc., Active, EU-US since 20 June 2019, valid to 29 April 2027** (owner's file) | Notice only if you email `privacy@vercel.com` to subscribe. List (owner's CSV from SafeBase, inferred to be Vercel's): 25 entries, among them AWS, Google, Microsoft, Datadog, Stripe, Upstash, Neon and six AI vendors (OpenAI, Anthropic, Groq, Cerebras, Baseten, SpaceX). **One addition since February: SpaceX, "generative AI services", 21 August 2026** | DPA 17 March 2026 (**after** February); Privacy Notice 1 June 2026; Terms 19 October 2026 |
| **Upstash** | Redis cache and rate limiting | Match cache (30 minutes), rate-limit counters by IP address or account ID, the programs cache | The database's region, chosen when created (not in the repo, and not in the owner's screenshots) | DPA: Upstash Inc. "will use the Data Privacy Framework to lawfully receive European Data in the United States", with the SCCs incorporated if the DPF does not cover the transfer or is invalidated. **On the DPF register: Upstash, Inc., Active, EU-US since 8 May 2025, valid to 29 April 2027** (owner's file) | A subscription page; five days to object. Sub-processors PDF read: AWS, Google, Stripe, Vercel, Auth0, GitHub and others | DPA and sub-processor PDFs undated. **Encryption at rest is a Prod Pack feature (+$200/month per database) or Enterprise**; TLS is always on; SOC 2 for Pro and Enterprise support plans |
| **Algolia** | Program search | Program records; the search words visitors type, with the visitor's IP address as seen by Algolia's sub-processors Datadog (log management: "indexing operations, end-user queries, end-user IP addresses") and Cloudflare (IP address) | **Europe (FR), on the Build plan, 2 indices, 1.78K records** (owner's screenshot). Attachment 3 of the DPA keeps EEA, UK and Swiss subscribers' end-user data inside those regions only if the subscriber keeps its services there and end users do not use some features from outside, so it cannot be assumed for a site read worldwide | EU SCCs (2021/914, French law) and the UK Addendum. **No DPF** in the DPA or privacy policy, and **Algolia is not on the register** (owner's file). Algolia SAS is the contracting party for subscribers in Europe | Notice by email or dashboard; **ten business days** to object. Deletes on a rolling 90 days after termination | DPA and sub-processors page both **12 January 2026**: no change since February |
| **Resend** | Email delivery | Recipient addresses and the content of all seven emails; delivery logs | **All stored in the United States** ("message content, delivery logs, webhook payloads, and account records"), whatever sending region is chosen. **Plan: Free**, 6 of 3,000 emails used this month (owner's screenshot) | EU SCCs Modules Two and Three and the UK Addendum in a DPA "pre-signed by Resend and fully executed once you sign up"; the page also says it participates in the EU-US DPF ("The SCCs stand on their own"). **The countersigned DPA** (owner's PDF) is Resend's standard text "updated on 12/31/2025", signed for Resend by its CEO on 14 January 2026, with the customer's signature block blank: it becomes binding on acceptance of the Terms, and does not name IB Match. SCCs Modules One to Three, Irish law and courts; section 11 repeats its DPF participation. **On the DPF register Resend (PLUS FIVE FIVE) shows "Active - Re-certification under Review"**, valid to 3 March 2027 (owner's file) | 14 days, deemed accepted without objection. List dated **27 August 2026** (read; includes AWS, Anthropic, Datadog, Google) | "email and log data is retained for 30 days on Free, Pro, and Scale plans"; backups 7 days; deleted within 90 days of account termination |
| **Stripe** | Payments for Regular schools | School name, school email, Stripe customer and subscription IDs; card details entered at Stripe | Not in the repo | EU SCCs (Modules 1, 2 and as applicable 3) in the Data Transfers Addendum (dated 18 November 2025); "Stripe, LLC is self-certified under the Data Privacy Framework". **On the register: Stripe, LLC, Active, since 11 May 2026, valid to 11 May 2027** (owner's file) | 30 days' notice if you subscribe at the sub-processors list | DPA dated **28 September 2026** (after February). Roles: processor for the service; "independent Data Controller" for third-party banks, fraud prevention, financial loss, legal and AML duties, and improving its products |
| **Google** | "Continue with Google" | Nothing of ours. IB Match receives name, email and picture link | Not applicable | Independent controller of its own account data. **On the register: Google LLC, Active** (owner's file) | Not applicable | See below |

**Algolia Search Analytics is on** (owner's screenshot: 366 searches and "258 users" for 16–22 October, no events sent).
Algolia's docs: "By default, Algolia uses IP addresses to distinguish users. If you send searches from your backend, set a
`userToken`"; and "Algolia retains your Search API logs for processing and auditing for 90 days in the region you specified"
(Insights logs 90 days, extendable to 365). IB Match sends no `userToken` and forwards no visitor IP
(`lib/algolia/search.ts`), so Algolia sees **Vercel's server addresses, not visitors'**: the "258 users" are
server addresses, not people, and a visitor's search words sit in Algolia's logs for 90 days without an identity.

AI vendors (Anthropic and OpenAI among them) appear in Resend's, Supabase's and Algolia's lists. IB Match uses none of
those providers' AI features, as far as the code shows; Resend's reason for listing them is not stated on the page.

## What changed since February 2026

The Wayback Machine's snapshots could not be fetched from this session (its content host resets the connection, though its
index answered), so this compares the earlier versions that providers publish themselves, and the dates on the
pages. Read on 23 October 2026.

| Provider | Since February 2026 | What it means for IB Match |
|---|---|---|
| **Vercel DPA** | Page last updated 17 March 2026, effective **31 March 2026**, and it "applies to… Customers who are on Enterprise and Pro plans". An older DPA, an undated PDF at `assets.vercel.com` that is probably the one before, supplements "the Vercel Enterprise Services Order Form and Enterprise Terms and Conditions" and lets a customer retrieve or delete data for 90 days after termination; the new one says deletion "within a commercially reasonable timeframe" | **Probably new for Pro customers: from 31 March 2026 the DPA reaches a Pro plan.** Before that, IB Match may have had no DPA with Vercel. The PDF is undated, so this is an inference |
| **Vercel privacy notice** | Three versions: 23 April 2024 (the one in force in February), 17 March 2026, 1 June 2026 (current). The 2024 → March 2026 changes, from the two PDFs: Vercel says it is a controller except "when we process information at the direction of our Customer as their data processor subject to our Data Processing Addendum"; it adds AI product information; **"For Hobby and Pro plan users, subject to your data preferences in your team settings, we may disclose de-identified information… to AI business partners for their product improvement and development, including training and improving AI and machine learning models"**, with a Team Preferences option to "Opt-out of Model Training"; it reworks the rights section (adds a right to complain), sets a minimum age of 16, and adds a US-state disclosure table including sharing for advertising. The 1 June 2026 changes were not isolated (PDF against web text is too noisy) | The Model Training setting applies to Pro too, so the open check on Vercel's Team Settings stands (`README.md`). Vercel's rows in the Privacy draft do not change |
| **Vercel Terms** | Page dated 19 October 2026. No earlier version was readable | The Hobby and trial-Pro Model Training clause and Hobby's non-commercial rule are as described above; when they appeared is unknown |
| **Vercel sub-processors** | Owner's CSV, with a "Created At" column: **one addition since February, SpaceX ("generative AI services"), 21 August 2026**; the others are dated June 2025 to January 2026 (Cerebras, Baseten and Raindrop.ai on 28 January 2026) | A sub-processor that IB Match does not use features of. Nothing to change in the draft |
| **Supabase sub-processors** | Lists dated 1 June 2026 and 12 October 2026 are the earliest available. June → October: **removed** Atlassian (status page), Fly.io (hosting), PandaDoc; **added** Supabase Pte. Ltd. (Singapore, "support services in marketplace related activities") | Supports naming Singapore in the transfers paragraph. The list before June was not available. No earlier DPA was readable |
| **Resend** | DPA: the current page says "Last update: December 31st, 2025" and the owner's signed copy says "Updated on 12/31/2025", and the two texts match except for layout: **no change**. Sub-processors list: 27 August 2026; no earlier version readable | None |
| **Stripe** | DPA dated 28 September 2026 (the PDF is named for it); the earlier text was not readable. The Data Transfers Addendum is dated 18 November 2025, so **unchanged since before February** | The roles clause is what the Privacy draft relies on; if the controller list changed, the draft's one sentence on it is still true of the current text |
| **Algolia** | DPA and sub-processors both 12 January 2026; the GDPR FAQ says its Terms were revised that day: **unchanged since before February** | None |
| **Google** | API Services User Data Policy dated 15 February 2024: **unchanged** | None |
| **Ko-fi** | Terms dated 13 July 2026; the earlier text was not readable | The tax clause is as quoted above; when it appeared is unknown |
| **Upstash** | DPA and sub-processor PDFs are undated | Not comparable |

**To finish this comparison,** the earlier versions that matter are on the Wayback Machine, which this session cannot
reach. Open these in a normal browser and save each as text or PDF (the first two matter most):

- Vercel DPA: `https://web.archive.org/web/20260214074622/https://vercel.com/legal/dpa`
- Vercel Terms: `https://web.archive.org/web/20260216013606/https://vercel.com/legal/terms`
- Stripe DPA: `https://web.archive.org/web/20260215181928/https://stripe.com/legal/dpa`
- Ko-fi terms: `https://web.archive.org/web/20260218013806/https://more.ko-fi.com/terms`
- Resend sub-processors: `https://web.archive.org/web/20260113023425/https://resend.com/legal/subprocessors`

## Google sign-in

- The live redirect asks for `scope=openid profile email`, nothing else (observed 23 October 2026), and the owner's paste
  from Google's console lists only "your non-sensitive scopes": `userinfo.email`, `userinfo.profile` and `openid`.
- **API Services User Data Policy** (page dated 15 February 2024). Its "Limited Use" rules sit under "Additional
  Requirements for Specific API Scopes" and apply to "Sensitive and Restricted Scopes"; `openid`, `email` and
  `profile` are Google's sign-in scopes, so they do not bind IB Match (the console confirms none of its scopes is sensitive or restricted). **The policy's general rules bind every
  app that uses Google API Services**, though: "You must publish a privacy policy that fully documents how your application
  interacts with user data. You must list the privacy policy URL in your OAuth client configuration"; the policy and
  in-product notices "must thoroughly disclose the manner in which your application accesses, uses, stores, or shares
  Google user data"; and "Your use of Google user data must be limited to the practices explicitly disclosed in your
  published privacy policy". The draft Privacy Policy now says what is received, that the tokens are stored, and what
  the data is used for.
- **Consent screen** (Google's help pages, read): the app homepage must "include a link to your privacy policy (this link
  should match the link you added on your consent screen configuration)", be "visible to users without requiring them to
  log-in", and sit on a domain you own and have verified; the privacy policy must be an HTML page on that domain.
  `/privacy` stays at the same address. **Check the consent screen's privacy link is `https://www.ibmatch.com/privacy`.**

## Transfers outside the EU

- **The EU-US Data Privacy Framework** remains in force. **Primary source (owner's file): the Order of the President of
  the Court of Justice of 4 June 2026 in Case C-703/25 P** (in French). It records that Philippe Latombe appealed on
  31 October 2025 against the General Court's judgment of 3 September 2025 (T-553/23), which dismissed his action against the
  Commission's adequacy decision (EU) 2023/1795; that Microsoft applied on 29 January 2026 to intervene in support of
  the Commission; and that it was admitted. The Commission was supported at first instance by Germany, Ireland and
  the United States. The order is about the intervention only: it contains no ruling and no hearing date, and nothing
  later was provided, so the appeal is **pending as of 4 June 2026**. (The earlier summary also mentioned a possible
  separate challenge by noyb; that remains a secondary report.)
- **The register** (the owner's participant list; Algolia, Supabase and Ko-fi are not on it):

  | Provider | Register entry | Valid to |
  |---|---|---|
  | Vercel Inc. | Active (EU-US since 20 June 2019; Swiss-US; UK Extension since 6 May 2024) | 29 April 2027 |
  | Stripe, LLC | Active (since 11 May 2026) | 11 May 2027 |
  | Upstash, Inc. | Active (since 8 May 2025) | 29 April 2027 |
  | Resend (PLUS FIVE FIVE) | **Active - Re-certification under Review** (since 20 February 2025; no Swiss entry) | 3 March 2027 |
  | Google LLC, Calendly LLC, Datadog, Inc. | Active | 2027 |

  Resend's SCCs do not depend on this ("The SCCs stand on their own"). **The draft Privacy Policy names the SCCs
  first and the DPF only "where a provider is certified", so neither a ruling nor Resend's re-certification would
  make it wrong.**

## The age of digital consent (GDPR Article 8)

Article 8 sets 16 and lets each member state choose between 13 and 16 where a service relies on a child's consent.
The only table found is a commercial compilation (GDPR Local, "updated on October 15, 2026", read 23 October 2026,
citing each national law). **It is not an official source, other compilations disagree on Belgium, Czechia and
Germany, and it should be checked with the national authorities or the lawyer before anything relies on it:**

| Age | Where (per that compilation) |
|---|---|
| 13 | Belgium, Denmark, Estonia, Finland, Latvia, Malta, Portugal, Sweden, and the UK (outside the EU) |
| 14 | Austria, Bulgaria, Cyprus, Italy, Lithuania, Spain |
| 15 | Czech Republic, France, Greece. (Slovenia: the compilation cites only a proposed 15 under an old law; treat as unconfirmed) |
| 16 | Croatia, Germany, Hungary, Ireland, Luxembourg, Netherlands, Poland, Romania, Slovakia |

The highest age anywhere in it is 16 (Ireland's 16 is from section 31 of its Data Protection Act 2018, as the compilation
cites it). IB Diploma students are usually 16 to 19, so Option A in the draft (16 and older) is at or above every
figure here.

## Not processors, but linked from the public pages

- **Ko-fi** (donations). Terms page dated 13 July 2026, read: "Ko-fi is not a party to any Donation solicited by a Creator.
  You agree that any purchases or Donations you make on our site are with Creators"; "applicable transaction fees…
  shall automatically be deducted from the relevant transaction by one of our third-party payment providers", at the
  rates "listed from time to time on our site"; and the creator "is solely responsible for determining, withholding,
  collecting, reporting, and remitting any taxes (including but not limited to income tax, VAT, GST…)". The
  rates, from Ko-fi's help page "Does Ko-fi take a fee?" and its pricing page (read in a browser): on the Free
  option, 0% on one-off tips and 5% on monthly tips, memberships, commissions and shop sales; on Standard, 5% on
  everything; "New creators now start with all of Ko-fi unlocked from day one" (the 5% mode) unless they opt out;
  "Normal payment processor fees also apply on top" (typically around 3% + $0.30). This is the evidence behind
  the "100% goes to platform costs" row in `claims.md`. The owner's screenshot says the account type is "You are a creator" (so these creator terms apply, including the tax
  clause); the fee option (Free or Standard) was not shown. **IB Match's own Ko-fi page** (`ko-fi.com/ibmatch`) says
  "non-commercial passion project", "Over 1K programs from more than 40 universities", "Next milestone: the rollout
  of the module for the IB coordinators" and "100% free, forever": see row K1 in `claims.md`.
- **Calendly** (the coordinator feedback call). Third party; the Cookie Policy draft says so.

## Pages read

All fetched 23 October 2026: `vercel.com/legal/dpa`, `/legal/privacy-policy`, `/legal/terms`, `/docs/logs/runtime`,
`/security`, `/docs/security/compliance`; `supabase.com/legal/customer-resources/data-processing-addendum`,
`/legal/customer-resources/subprocessor-list` and its October 2026 PDF,
`/legal/privacy-resources/data-residency-and-transfers-faq`, `/security`, `/docs/guides/platform/regions`;
`upstash.com/docs/redis/features/security`, `/docs/common/help/compliance`, `/docs/redis/overall/enterprise`,
`/pricing/redis`, and the DPA and sub-processor PDFs under `/static/trust/`;
`algolia.com/policies/data-processing-addendum`, `/policies/infrastructure-and-sub-processors`, `/policies/privacy`;
`resend.com/legal/dpa`, `/security/gdpr`, `/legal/subprocessors`, `/docs/dashboard/domains/regions`;
`stripe.com/legal/dpa`, `/legal/dta`, `/legal/service-providers`;
`developers.google.com/terms/api-services-user-data-policy`, `support.google.com/cloud/answer/13806988`, `/13807376`,
and Google's OAuth policy-compliance page; `more.ko-fi.com/terms`; `gdprlocal.com/digital-age-of-consent-under-the-gdpr/`.
Read from the live site: `https://www.ibmatch.com/` and `/api/auth/*` response headers, 22–23 October 2026.
Read in a headless browser: Ko-fi's help, pricing and IB Match pages, the Algolia GDPR FAQ (its terms were revised
12 January 2026), the Upstash trust center. Search summaries only: the DPF appeal.
