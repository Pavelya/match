# Brief for the lawyer

MAINT 7.4. What to read, and the questions the drafts leave to you. Written 23 October 2026. The drafts are the owner's
words, prepared with an AI assistant's research; they are not legal advice, and nothing in them is published.

## The business in one paragraph

IB Match (`www.ibmatch.com`) matches International Baccalaureate Diploma students (usually 16 to 19) with university
programs in 23 countries. It is **free for students** and **run by Pavel Yampolsky, an individual in Poland, with no
registered company**; Tal, the founder, built it together with him. Schools
can pay a subscription (through Stripe) for extra coordinator features, and there **are paying customers**. A school's
coordinators can see a student's profile only after that student accepts an invitation. No donation has been received
(a Ko-fi page exists). Students sign up themselves (email link or Google); coordinators are invited; there is no
advertising and no analytics. Data is held with Supabase (Frankfurt), Vercel, Upstash, Algolia (France), Resend (USA)
and Stripe. Visitors and users are worldwide. `support@ibmatch.com` is the mailbox that is read; `privacy@` and
`legal@` forward to it.

## Read first

1. [`privacy-policy.redline.md`](./privacy-policy.redline.md), [`terms-of-service.redline.md`](./terms-of-service.redline.md)
   and [`cookie-policy.redline.md`](./cookie-policy.redline.md): the change list and the diff against what is published.
   The clean drafts are the `.proposed.md` files.
2. [`product-today.md`](./product-today.md): what the product does with data, from the code.
3. [`providers.md`](./providers.md): each provider's terms, transfer mechanism, region and plan.
4. [`claims.md`](./claims.md): every claim on the public pages, with the evidence and the proposed words.

## Questions for you

Each is tagged `[LAWYER: …]` in the drafts where it arises.

1. **The operator.** A private individual in Poland, running a service with paying school customers and no
   registered company. Is that position acceptable under Polish law (registered or unregistered business activity,
   VAT), and should it change (personal liability)? Tal built the service together with the operator but is not named:
   does that make a partnership, or change who the controller and the contracting party are? What must the Privacy
   Policy and Terms say to identify the operator, and is a postal address required (GDPR Article 13(1)(a), and any
   e-commerce or consumer-information duty), or are a name and `support@` enough? The supervisory authority would be
   Poland's UODO. (Privacy 1, Terms 1.)
2. **Governing law and courts** (Terms 15). The published Terms name "the laws of the applicable jurisdiction"; the draft
   now says the laws and courts of Poland, the operator's country. Is that right for worldwide users, does the carve-out
   for mandatory consumer law read correctly, and are schools consumers or businesses, and students?
3. **Controller and processor** (Privacy 10). The draft keeps the published position: IB Match is the controller for
   accounts and matching, and a processor when a school's coordinators manage a linked student's data. A student
   creates the account and agrees to the link; is IB Match really a processor there, a joint controller, or the
   controller throughout? Is a data processing agreement with schools needed?
4. **Legal bases** (Privacy 3). Contract, consent (the coordinator-access agreement, revocable by unlinking), legitimate
   interests (security, support, improving the service) and legal obligation. Anything missing or wrong? Is the
   invitation's checkbox valid consent?
5. **Age 16 and over** (Privacy 12, Terms 3). Chosen because Article 8 allows 13 to 16 and IB Diploma students are
   usually 16 to 19. Many 16 and 17 year olds are minors for contracts: does "you are capable of forming a binding
   contract" (Terms 3) still make sense? The country table in `providers.md` is from a commercial compilation:
   please confirm.
6. **Third-party data.** A coordinator enters an invited student's name and email before the student has an account
   (stored in the invitation, emailed by IB Match). What is the basis, and what must the invitee be told?
7. **Transfers** (Privacy 11). The wording puts the Standard Contractual Clauses first and the EU-US Data Privacy
   Framework "where a provider is certified" (its appeal, C-703/25 P, is pending; Resend's certification shows "Re-certification under
   Review"). Resend stores everything in the USA; Supabase's contracting company is in Singapore. Do you want a transfer
   impact assessment, and is the UK addendum wording enough?
8. **Retention** (Privacy 8). No backups are kept; invitation records stay while the school exists; sign-in links expire in 10
   minutes; the hosting provider's logs last a day, Algolia's search logs 90 days and Resend's email log 30 days.
   Is "kept while the school's account exists" an acceptable retention rule for invitation records?
9. **Cookies and local storage** (Cookie Policy). Essential cookies only, plus `localStorage` for a theme choice and a
   shortlist count. Are those exempt under ePrivacy Article 5(3)? Both banner buttons ("Accept all", "Essential only")
   leave the same cookies today: is that acceptable, or should the banner change?
10. **Limitation of liability and disclaimers** (Terms 11 and 12), unchanged from the published Terms: will they hold
    for consumers and for school customers in the places served?
11. **Public claims** (`claims.md`). Removing "non-profit", "non-commercial", "GDPR Compliant", "The only…" and the
    donation allocation; the four coordinator quotes if they are paraphrases; the brand names used as endorsements
    (Stripe, Slack and Medium for Algolia; Instagram and Spotify for PostgreSQL), which are removed. Anything else you
    would remove or qualify?
12. **Subscriptions** (Terms 6). Refunds, cancellation, and what is said about "VIP" early adopter schools. VAT and
    income tax are for a tax adviser, not covered here.

## Not for you

Wording the owner has already settled (no University Agent role; the age; "free for students" in place of "forever"; the
money claims) and the code changes listed in the README's action list.
