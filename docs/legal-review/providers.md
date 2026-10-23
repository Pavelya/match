# What the providers ask for now

MAINT 7.4, step 2. Each page below was fetched and read as text on **23 October 2026**; "page dated" is the date the
page itself shows.

**What could still not be read** (some pages needed a headless browser; those were read that way): Vercel's
sub-processor list (`security.vercel.com` answers scripted requests and the browser with a bot check), the Data
Privacy Framework register (`dataprivacyframework.gov/list`: its search returned "no results" even for Stripe
and Vercel, so nothing was confirmed from it), and the Court of Justice's record of Case C-703/25 P. The Article 8
table is a secondary source. Those rows say so.

## Read this first: the Vercel plan decides three things

Vercel's pages, read directly:

- **Terms of Service** (page dated 19 October 2026): "You shall only use the Services under a Hobby plan for your
  personal or non-commercial use." IB Match charges schools through Stripe, so the Hobby plan is not for it.
- **Terms of Service:** "if you are on a Hobby plan or trial Pro plan, you agree that we may use Your Content to train
  our artificial intelligence ('AI') and machine learning models, and we may share Your Content with third parties
  for the purpose of developing and improving their products… If you are on a paid Pro plan, Model Training is not
  enabled by default and you may opt in." Whether "Your Content" reaches the traffic and data that runs through
  the app, as opposed to the code, is a question for Vercel's support or a lawyer.
- **Data Processing Addendum** (last updated 17 March 2026, effective 31 March 2026): it applies "to Vercel's
  Processing of Personal Data as a Processor under the Agreement for Customers who are on Enterprise and Pro plans".
  A Hobby project has no DPA, so the Privacy Policy could not say its hosting provider is bound by data
  processing terms.

**Check the plan (Vercel → Settings → Billing).** If it is Pro, also check that Model Training is off
(Team Settings). If it is Hobby, the plan needs to change before the Privacy Policy is published, and that is a
decision for the owner, not a wording fix.

## The table

| Provider | Role for IB Match | What it holds | Where | Transfer mechanism | Notice of change | Page dated |
|---|---|---|---|---|---|---|
| **Supabase** | Database and file storage | Every table in `product-today.md` §1; university images and school logos | The AWS region chosen when the project was created: "your PostgreSQL database, as well as Auth service and Storage objects are hosted in that region, alongside backups". Not guaranteed never to leave it: account information, usage information and logs, content delivery and support access are processed elsewhere. The contracting company is Supabase Pte. Ltd. (Singapore), with Supabase, Inc. (US) for support | EU SCCs (2021/914), Module Two (controller to processor), incorporated in the DPA; "acceptance of the Agreement shall have the same effect as signing the SCCs". Its FAQ names the US and Singapore as destinations. **No DPF** | 30 days' notice of a new sub-processor if you subscribe at `supabase.com/legal/customer-resources/subprocessor-list`. Lists dated **1 June 2026** and **12 October 2026** (read; includes AWS, Cloudflare, Google, Upstash, Vercel, Sentry, OpenAI) | DPA incorporated by the Terms; security page: "All customer data is encrypted at rest with AES-256 and in transit via TLS"; "All paid customer databases are backed up every day" (so a free project has no backup) |
| **Vercel** | Hosting, delivery, serverless functions, logs | All traffic in transit; request and runtime logs (its privacy notice: "End User IP address, location information derived from IP address"). No database | Primary processing in the US; the `x-vercel-id` of `/` on 22 October read `iad1::fra1`, so probably functions in Frankfurt (confirm in Settings → Functions) | 2021 EU SCCs (Irish law) and the UK IDTA in the DPA. Privacy Notice (dated 1 June 2026): complies with the EU-US DPF, the UK Extension and the Swiss-US DPF | Notice only if you email `privacy@vercel.com` to subscribe; list at `security.vercel.com` (unread) | DPA 17 March 2026 (**after** February); Privacy Notice 1 June 2026; Terms 19 October 2026 |
| **Upstash** | Redis cache and rate limiting | Match cache (30 minutes), rate-limit counters by IP address or account ID, the programs cache | The database's region, chosen when created (not in the repo) | DPA: Upstash Inc. "will use the Data Privacy Framework to lawfully receive European Data in the United States", with the SCCs incorporated if the DPF does not cover the transfer or is invalidated | A subscription page; five days to object. Sub-processors PDF read: AWS, Google, Stripe, Vercel, Auth0, GitHub and others | DPA and sub-processor PDFs undated. **Encryption at rest is a Prod Pack feature (+$200/month per database) or Enterprise**; TLS is always on; SOC 2 for Pro and Enterprise support plans |
| **Algolia** | Program search | Program records; the search words visitors type, with the visitor's IP address as seen by Algolia's sub-processors Datadog (log management: "indexing operations, end-user queries, end-user IP addresses") and Cloudflare (IP address) | The application's cluster region (not in the repo). Attachment 3 of the DPA keeps EEA, UK and Swiss subscribers' end-user data inside those regions only if the subscriber keeps its services there and end users do not use some features from outside, so it cannot be assumed for a site read worldwide | EU SCCs (2021/914, French law) and the UK Addendum. **No DPF** in the DPA or privacy policy. Algolia SAS is the contracting party for subscribers in Europe | Notice by email or dashboard; **ten business days** to object. Deletes on a rolling 90 days after termination | DPA and sub-processors page both **12 January 2026**: no change since February |
| **Resend** | Email delivery | Recipient addresses and the content of all seven emails; delivery logs | **All stored in the United States** ("message content, delivery logs, webhook payloads, and account records"), whatever sending region is chosen | EU SCCs Modules Two and Three and the UK Addendum in a DPA "pre-signed by Resend and fully executed once you sign up"; the page also says it participates in the EU-US DPF ("The SCCs stand on their own") | 14 days, deemed accepted without objection. List dated **27 August 2026** (read; includes AWS, Anthropic, Datadog, Google) | "email and log data is retained for 30 days on Free, Pro, and Scale plans"; backups 7 days; deleted within 90 days of account termination |
| **Stripe** | Payments for Regular schools | School name, school email, Stripe customer and subscription IDs; card details entered at Stripe | Not in the repo | EU SCCs (Modules 1, 2 and as applicable 3) in the Data Transfers Addendum (dated 18 November 2025); "Stripe, LLC is self-certified under the Data Privacy Framework" | 30 days' notice if you subscribe at the sub-processors list | DPA dated **28 September 2026** (after February). Roles: processor for the service; "independent Data Controller" for third-party banks, fraud prevention, financial loss, legal and AML duties, and improving its products |
| **Google** | "Continue with Google" | Nothing of ours. IB Match receives name, email and picture link | Not applicable | Independent controller of its own account data | Not applicable | See below |

AI vendors (Anthropic and OpenAI among them) appear in Resend's, Supabase's and Algolia's lists. IB Match uses none of
those providers' AI features, as far as the code shows; Resend's reason for listing them is not stated on the page.

Changes since February 2026 that were found: Vercel's DPA (March), Privacy Notice (June) and Terms (October);
Supabase's sub-processor list (June, October); Resend's list (August); Ko-fi's terms (July); Stripe's DPA
(September). Algolia's DPA and list are unchanged since January. None of these changes was compared with its
earlier text: no earlier versions were available to read.

## Google sign-in

- The live redirect asks for `scope=openid profile email`, nothing else (observed 23 October 2026).
- **API Services User Data Policy** (page dated 15 February 2024). Its "Limited Use" rules sit under "Additional
  Requirements for Specific API Scopes" and apply to "Sensitive and Restricted Scopes"; `openid`, `email` and
  `profile` are Google's sign-in scopes, so they should not bind IB Match. **The policy's general rules bind every
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

- **The EU-US Data Privacy Framework** remains in force. From secondary sources (law-firm and commentary pages, not
  the court's register): the General Court dismissed the challenge (Latombe v Commission) on 3 September 2025;
  Latombe appealed on 31 October 2025 (Case C-703/25 P); Microsoft was admitted as an intervener on 4 June 2026; no
  ruling or hearing date was reported. The providers' own pages say Vercel, Resend, Stripe and Upstash use or are
  certified under the DPF (Upstash's trust center lists it under Compliance); Supabase and Algolia rely on the
  SCCs alone. **The draft Privacy Policy names the SCCs
  first and the DPF only "where a provider is certified", so a ruling would not make it wrong.** The register itself could not
  be searched from here: confirm each certification on `dataprivacyframework.gov/list` in a normal browser.

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
  the "100% goes to platform costs" row in `claims.md`. **IB Match's own Ko-fi page** (`ko-fi.com/ibmatch`) says
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
