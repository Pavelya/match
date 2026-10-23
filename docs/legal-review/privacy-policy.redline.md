# Privacy Policy: redline

Baseline: `docs/templates/legal/privacy-policy.md`, which is the markdown published on 23 February 2026 (label `2026-03-23`); the live page differs from it only in how links and the table render.
Proposed: [`privacy-policy.proposed.md`](./privacy-policy.proposed.md). Text in `[OWNER Qn: …]` brackets is a question for the owner (see
[`README.md`](./README.md)); none may remain when it is published.
Lines starting with `-` are the published words, `+` the proposed ones. Blank lines are collapsed before comparing.

## What changed, and why

1. **Version and date.** Label the new version with the day it is published (`YYYY-MM-DD`) and give it that day as its effective date. The published one is labelled `2026-03-23` but takes effect on 23 February 2026. The banner compares the label exactly, so a new, unused label is what makes every signed-in user see "We've updated our policies" once.
2. **1. Introduction.** Says who runs IB Match: Pavel Yampolsky, an individual in Poland, not a registered company, reachable at `support@ibmatch.com` (decided 23 October 2026: GDPR Article 13(1)(a) requires the controller to be identified; whether a postal address is needed is left to the lawyer). Drops "By using IB Match, you agree to the collection and use of information": using a site is not consent, and the Terms already bind users.
3. **2. Information we collect.** Adds what the code stores and the policy left out: the Google name, email and picture link; the school link and its agreement date; support requests; invitation details including the student name a coordinator may enter; the accepted policy versions. Drops "avatar image (optional)": nobody can upload one; a Google sign-in brings a picture link. Adds the 10-minute sign-in link and what Google is asked for (`openid profile email`, seen in the live redirect) and that its tokens are stored (`Account` table). Says what the Google data is used for, because Google's API Services User Data Policy (page read 23 October 2026) requires a privacy policy that "thoroughly disclose[s] the manner in which your application accesses, uses, stores, or shares Google user data" and limits use to the practices disclosed.
4. **2. Collected automatically.** Replaces "Usage Data: pages visited, features used, search queries / Device Information / Log Data" with what actually happens: the hosting provider's short-lived logs, abuse counters keyed by IP address or account, search words sent to Algolia (which keeps its search logs 90 days in France, with our server's address, not the visitor's; Search Analytics is on, per the owner's screenshot) and written to the server log without an account, and **no analytics, advertising or tracking**. Hosting logs last about a day (Vercel Pro, Observability Plus off). There is no analytics code and the Content-Security-Policy allows no third-party script. When 7.5 adds a last-seen date or an analytics tool, this section and the Cookie Policy change first.
5. **2. Payment.** Says what Stripe receives (the school's name and email, and the card details entered at Stripe).
6. **3. How we use your information.** Removes "Improve our matching algorithms", "Analyze usage patterns" and "Provide program analytics and recruitment insights (university agents)": none happens. Adds the emails the service sends and that none is marketing. Adds **legal bases** (new sub-heading, for a lawyer to check: Q4).
7. **4.1 Coordinator access.** Adds how a student links (only by accepting an invitation) and that editing needs a plan with full access (`canEditStudentData` is full access only).
8. **4.2 University agents** becomes "Universities": no university has access to any student data. The agent role has no sign-up, no dashboard and no feature in the code, so the published promises about agent statistics describe nothing (Q5).
9. **5. External sharing.** Points at Section 10 for the list; says nothing goes to advertisers.
10. **6. Cookies and tracking.** Replaces "Remembering your preferences" with what is remembered (cookie choice, theme, shortlist count) and points to the Cookie Policy for the list.
11. **7. Data security.** Adds encryption at rest in the database (Supabase's AES-256), says there are no passwords, and a breach sentence. "Structured logging and monitoring" becomes "Logging to detect errors and abuse".
12. **8. Data retention.** Rewritten from the code: what a student's deletion removes (`lib/account/delete-student.ts`, in one transaction); coordinators and schools are deleted by an administrator on request (the portal's button is a placeholder); **invitation records**: the 90-day deletion does not exist, so the words change (Q6); logs (Vercel one day, Algolia 90 days) and the email provider's 30-day log (Resend Free plan); backups (the Supabase Free project has none, so the draft says so); payment records. Drops "anonymized aggregate data may be retained": the code keeps none.
13. **9. Your rights.** Says where a student does each thing in Settings, what the download contains (account, profile, preferences, saved programs) and that the rest is by request, and "we reply within one month" (the legal limit), to `privacy@ibmatch.com` or a Data & privacy request on the Contact page (`privacy@` forwards to `support@`, decided). Adds the right to complain to a data protection authority. "Withdraw consent for non-essential data processing" becomes "consent you have given" (the consents are the school link and the cookie choice).
14. **10. Roles and sub-processors.** Removes "Platform analytics". Adds **Supabase** (the database and the images: it holds nearly everything) and **Google**. Corrects **Upstash** ("Session data": sessions are JWTs and are not in Redis; it holds abuse counters and 30-minute match results), **Vercel** (not "all platform data": it carries traffic and logs), **Algolia** (also receives search words) and **Resend**. "Contractually bound" is limited to "bound by data processing terms", flagged: Vercel's DPA covers Pro and Enterprise plans only (`providers.md`). Stripe's row notes it also acts for its own fraud and legal duties (its DPA, 28 September 2026). The school-as-controller paragraph is flagged for a lawyer (Q4).
15. **11. International transfers.** Names the mechanisms (SCCs, UK addendum, the DPF where a provider is certified), the United States and Singapore (Supabase's contracting company is Singapore-based, and Resend stores everything in the US), and gives the regions known from the owner's dashboards (database in Frankfurt, search in France), leaving Vercel's and Upstash's open. The DPF is second because its appeal is pending, and two providers (Supabase, Algolia) use the SCCs alone (`providers.md`).
16. **12. Children's privacy.** The age line: 16 and older (decided 23 October 2026, Option A).
17. **13. Changes.** Says what users will see: the notice at sign-in, and a new version and date.
18. **14. Contact.** `privacy@ibmatch.com` is kept (it forwards to `support@`); adds the right to complain, naming Poland's UODO.

## The redline

```diff
--- published
+++ proposed
@@ -2,7 +2,7 @@
 
-**IB Match** ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our university program matching and guidance platform.
-
-This policy applies to all users of IB Match, including **IB Students**, **IB Coordinators**, **University Agents**, and **Platform Administrators**.
-
-By using IB Match, you agree to the collection and use of information in accordance with this policy.
+IB Match ("we," "our," or "us") helps students in the International Baccalaureate (IB) community find university programs, and helps IB schools guide their students. This Privacy Policy explains what personal data we collect, why we collect it, who we share it with, how long we keep it, and the choices you have.
+
+IB Match is run by Pavel Yampolsky, an individual in Poland. It is not a registered company. You can reach it at support@ibmatch.com. [LAWYER: say whether a postal address must also be given.]
+
+This policy applies to everyone who uses IB Match: students, IB coordinators and the administrators who run the platform. Your use of IB Match is also governed by our [Terms of Service](/terms).
 
@@ -14,7 +14,13 @@
 
-- **All Users**: Email address, name (optional), avatar image (optional)
-- **Students**: IB courses, predicted/actual scores, course levels (HL/SL), TOK and Extended Essay grades, field of study preferences, location preferences, saved programs
-- **IB Coordinators**: School association, role within the school
-- **University Agents**: University association, program management activity
-- **Invitation Records**: When users invite others (coordinator-to-student, coordinator-to-coordinator, agent-to-agent), we store the inviter's identity, the invitee's email, invitation status, and timestamp
+- **Everyone**: your email address, and your name if you give one. If you sign in with Google, we receive your name, email address and a link to your Google profile picture.
+- **Students**: your IB subjects, levels (HL or SL), predicted or final grades, TOK and Extended Essay grades, the fields of study and countries you are interested in, and the programs you save to your shortlist. If you link your account to a school, we also store which school, and when you agreed to share your profile with it.
+- **IB Coordinators**: your school, and the invitations you send.
+- **Invitations**: for each invitation, who sent it, the invited email address, the student's name if the coordinator entered one, its status and its dates.
+- **Support requests**: what you write to us, the category you choose, and our reply.
+- **Your agreement to our policies**: which version of the Terms of Service and Privacy Policy you accepted, and when.
+
+### Information We Receive When You Sign In
+
+- **Sign-in link**: when you ask for a sign-in link, we email it to you. It works for 10 minutes.
+- **Google**: we ask Google only for your name, email address and profile picture. We store the sign-in details Google returns (such as tokens) with your account. We use your Google details only to sign you in and to create and show your account. We do not use them to read anything else in your Google account, to advertise to you, or to share them with anyone except the providers listed in Section 10.
 
@@ -22,5 +28,7 @@
 
-- **Usage Data**: Pages visited, features used, search queries
-- **Device Information**: Browser type, device type, operating system
-- **Log Data**: IP address, access times, referring URLs
+- **Technical data**: whenever you use IB Match, our hosting provider receives your IP address, your browser and device type, the page you asked for and the time. It keeps this in logs for about one day. We use it to run the site, fix errors and stop abuse.
+- **Abuse protection**: we count requests from each IP address (before you sign in) or account (after) to stop automated abuse. The counters are kept in a cache.
+- **Search words**: the words you type into program search are sent to our search provider, Algolia, to find results. Algolia keeps its search logs for 90 days, in France, and uses them for search statistics. We send it our server's address, not yours, and nothing that names you. The words are also written to our own server log without your name or account.
+- **No tracking**: IB Match does not use analytics, advertising or tracking tools, and does not follow what you do from page to page. If that changes, we will update this policy first and ask for your consent where the law requires it.
+- **In your browser**: IB Match stores a few small items in your browser. They are listed in our [Cookie Policy](/cookies).
 
@@ -28,3 +36,3 @@
 
-For schools with paid subscriptions, payments are processed by **Stripe**. We do not store credit card numbers or full payment details. We retain only Stripe customer and subscription identifiers to manage your subscription.
+Students never pay. For schools with paid subscriptions, payments are processed by Stripe. Stripe receives the school's name and email address and the payment details entered at Stripe's checkout. We never see card numbers. We keep only Stripe's customer and subscription identifiers and the subscription's status.
 
@@ -34,12 +42,24 @@
 
+- Create your account and sign you in
 - Provide personalized program recommendations (students)
-- Enable student management and university guidance tools (coordinators)
-- Provide program analytics and recruitment insights (university agents)
-- Manage platform operations and user accounts (administrators)
-- Improve our matching algorithms
-- Process subscription payments (Regular schools)
-- Send important service updates and invitation emails
-- Respond to your inquiries
-- Analyze usage patterns to improve the Service
-- Enforce our Terms of Service and prevent misuse
+- Let coordinators guide the students linked to their school, and see their school's statistics
+- Send the emails the service needs: sign-in links, invitations, replies to your support requests, and a confirmation when an account is deleted. We send no marketing email.
+- Respond to your support requests
+- Process school subscription payments
+- Keep IB Match running and secure, fix errors and prevent misuse
+- Improve IB Match, using your feedback and support requests
+- Enforce our Terms of Service and meet our legal obligations
+
+We do not sell your personal data, and we do not use it for advertising.
+
+### Why We May Use It (Legal Bases)
+
+If you are in the European Economic Area or the United Kingdom, we rely on these legal bases:
+
+- **Contract**: to create your account, provide matches, and run school subscriptions.
+- **Consent**: when you agree to share your profile with a school, and for your choice in the cookie banner. You can withdraw the first by unlinking from the school in Settings.
+- **Legitimate interests**: to keep IB Match secure, prevent abuse, fix errors, answer support requests and improve the service.
+- **Legal obligation**: to keep the records the law requires, such as payment records for school subscriptions.
+
+[LAWYER: check this section.]
 
@@ -47,3 +67,3 @@
 
-**We do not sell your personal information.** The following describes how data is shared between different user roles within the platform:
+We do not sell your personal information. The following describes how data is shared between roles on the platform:
 
@@ -51,3 +71,3 @@
 
-IB Coordinators at a school can view and, where appropriate, edit academic data for **students who are linked to their school**. Specifically, coordinators may access:
+IB Coordinators at a school can view the academic data of students who are linked to their school and, where the school's plan allows it, edit it. Specifically, coordinators may access:
 
@@ -58,18 +78,13 @@
 
-**Purpose limitation**: This access is strictly for providing university application guidance within the school context.
-
-**Student control**: Students voluntarily link to a school. A student may unlink from a school at any time, which immediately revokes coordinator access to their data.
-
-**Coordinator editing**: Coordinators may edit student academic data (courses, grades) for guidance purposes, with appropriate consent from the student or as part of the school's educational guidance process.
-
-### 4.2. University Agent Access to Data
-
-University Agents can view **anonymized, aggregate statistics** about students who match with their university's programs. This includes:
-
-- Total match counts per program
-- Field of study distribution of matched students
-- Average predicted IB scores of matched students
-- Geographic interest trends
-
-**University Agents cannot access individual student names, email addresses, or personal data.**
+**How a student links**: a student links to a school only by accepting an invitation. The invitation lists what the school will see, and the student must agree to it.
+
+**Purpose limitation**: this access is strictly for providing university application guidance within the school context.
+
+**Student control**: a student may unlink from a school at any time in Settings, which immediately revokes coordinator access to their data.
+
+**Coordinator editing**: coordinators whose school has full access may edit student academic data (courses, grades) for guidance purposes, with the student's agreement or as part of the school's guidance process.
+
+### 4.2. Universities
+
+No university has access to any student's personal data.
 
@@ -77,3 +92,3 @@
 
-Platform Administrators have access to all platform data for operational, support, and compliance purposes.
+Platform administrators have access to all platform data for operations, support and compliance.
 
@@ -81,7 +96,9 @@
 
-We may share information with third parties only in the following circumstances:
-
-- **Service Providers**: Third parties that help us operate the Service (see Section 10 for a list of sub-processors)
-- **Legal Requirements**: When required by law or to protect our rights
-- **Business Transfers**: In connection with a merger or acquisition
+We share information with third parties only in the following circumstances:
+
+- **Service providers** that help us operate the Service (see Section 10 for the list)
+- **Legal requirements**: when required by law or to protect our rights
+- **Business transfers**: in connection with a merger or acquisition
+
+We do not share personal data with advertisers.
 
@@ -89,9 +106,3 @@
 
-We use essential cookies for:
-
-- Authentication and session management (all user roles)
-- Security (CSRF protection)
-- Remembering your preferences
-
-For details, see our [Cookie Policy](/cookies).
+IB Match sets only the cookies it needs to sign you in and keep your account secure, and remembers your cookie choice, your light or dark setting and your shortlist count in your browser. It sets no analytics, advertising or tracking cookies. For the list and the lifetimes, see our [Cookie Policy](/cookies).
 
@@ -99,9 +110,12 @@
 
-We implement appropriate security measures to protect your information, including:
+We take steps to protect your information, including:
 
 - Encryption of data in transit (HTTPS/TLS)
-- Role-based access controls ensuring users only access data permitted by their role
-- Secure authentication (magic links, OAuth)
-- Regular security reviews
-- Structured logging and monitoring
+- Encryption at rest in the database that holds your account and profile (AES-256, according to our database provider)
+- Role-based access controls, so users only see the data their role allows
+- Sign-in by one-time email link or Google, with no passwords to leak
+- Regular security reviews and dependency updates
+- Logging to detect errors and abuse
+
+No system is perfectly secure. If a breach affects your personal data, we will tell you and the authorities as the law requires.
 
@@ -109,8 +123,11 @@
 
-- **Active accounts**: We retain your data for as long as your account is active or as needed to provide services.
-- **Deleted accounts**: Upon account deletion, personal data is removed. Anonymized aggregate data (e.g., platform-wide statistics) may be retained.
-- **School/university deletion**: When a school or university deletion request is approved by an administrator, all associated data (coordinator profiles, student links, program listings) is removed.
-- **Invitation records**: Expired or declined invitation records are retained for 90 days for security purposes, then deleted.
-
-You may request deletion of your data at any time.
+- **Active accounts**: we keep your data for as long as your account is active or as needed to provide the service.
+- **Students deleting their account**: in Settings, "Delete account" permanently removes your saved programs, grades and profile, your support requests, your sign-in records and sign-in links, and any school invitations sent to your email address, then your account. We send you an email to confirm. It happens in one step: if it fails, nothing is deleted.
+- **Coordinators and schools**: ask us to delete a coordinator account, or your school's data, through a Data & privacy request on the Contact page or at privacy@ibmatch.com. An administrator carries it out.
+- **Support requests**: kept while your account exists, and deleted with it.
+- **Invitation records**: kept while the school's account exists, so a coordinator can see the status of their invitations. Invitations addressed to a student are deleted when that student deletes their account.
+- **Sign-in links**: a link expires after 10 minutes.
+- **Logs and email records**: our hosting provider's logs are kept for about a day, and our search provider's for 90 days (see Section 2). Our email provider keeps a log of the emails it sends, including the recipient's address and the message, for 30 days.
+- **Backups**: we keep no backups of the database at present. If that changes, deleted data could remain in a backup until it expires, and this policy will say for how long.
+- **Payment records**: Stripe keeps payment records for as long as the law requires.
 
@@ -124,11 +141,12 @@
 - **Export** your data in a portable format
-- **Withdraw** consent for non-essential data processing
+- **Withdraw** consent you have given
 - **Object** to processing based on legitimate interests
 - **Restrict** processing under certain circumstances
-
-**For Students**: You may unlink from a school at any time to revoke coordinator access to your data, without deleting your account.
-
-**For Coordinators and Agents**: You may request deletion of your associated school or university data through the platform. Such requests are reviewed by administrators.
-
-To exercise your rights, contact us at privacy@ibmatch.com.
+- **Complain** to your data protection authority
+
+**For students**: in Settings you can download your data (your account, academic profile, preferences and saved programs, as a file), delete your account, and unlink from a school without deleting your account. For anything the download does not include, such as your support requests, write to us.
+
+**For coordinators**: write to us to access, correct, export or delete your data, or your school's.
+
+To exercise your rights, write to privacy@ibmatch.com or send a Data & privacy request from the Contact page. We reply within one month.
 
@@ -142,3 +160,2 @@
 - Operation of the matching algorithm and recommendations
-- Platform analytics and service improvement
 - Direct communications with users
@@ -147,3 +164,3 @@
 
-When coordinators manage student data on behalf of their school, the **school is the data controller** and IB Match acts as a **data processor**. In this context, IB Match processes student data solely on the school's instructions (as expressed through coordinator actions on the platform).
+When coordinators manage student data on behalf of their school, the school is the data controller and IB Match acts as a data processor. In this context, IB Match processes student data solely on the school's instructions (as expressed through coordinator actions on the platform). [LAWYER: check this paragraph. A student creates the account and agrees to the link themselves, so IB Match may also be a controller of that data.]
 
@@ -151,13 +168,15 @@
 
-We use the following third-party service providers to operate the platform:
-
-| Provider | Purpose | Data Processed |
-|----------|---------|---------------|
-| **Vercel** | Hosting and infrastructure | All platform data |
-| **Stripe** | Payment processing | School subscription and billing data |
-| **Resend** | Email delivery | Email addresses, email content |
-| **Algolia** | Program search | Program data (no student personal data) |
-| **Upstash (Redis)** | Caching and rate limiting | Session data, cached match results |
-
-All sub-processors are contractually bound to process data only as instructed and to maintain appropriate security measures.
+We use the following service providers to operate the platform:
+
+| Provider                  | Purpose                                     | Data processed                                                                                                                                    |
+| ------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
+| **Supabase**              | Database and file storage (Frankfurt, Germany) | All account, profile, invitation and support data. Stored files are university images and school logos, with no personal data                  |
+| **Vercel**                | Hosting and delivery                        | All traffic to and from the platform, and short-lived server logs, including IP addresses                                                         |
+| **Upstash (Redis)**       | Caching and abuse protection                | Request counters by IP address or account, and cached match results for 30 minutes                                                                |
+| **Algolia**               | Program search (France)                     | Program data, and the search words visitors type (not linked to an account), for 90 days. No student profile data                                 |
+| **Resend**                | Email delivery                              | Email addresses and the content of the emails we send                                                                                             |
+| **Stripe**                | Payment processing (schools only)           | School name, school email and payment details. Stripe also uses payment data for its own fraud-prevention and legal duties, under its own privacy policy |
+| **Google**                | Sign in with Google (if you choose it)      | Your Google account details. Google is independent of us and has its own privacy policy                                                           |
+
+Each provider publishes its own list of sub-processors. Our providers are bound by data processing terms to process data only as instructed and to keep it secure.
 
@@ -165,3 +184,3 @@
 
-Your information may be transferred to and processed in countries other than your own (including the United States, where our infrastructure providers operate). Where required, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) for transfers outside the EU/EEA.
+Your information may be processed in countries other than your own. Our database is in Frankfurt, Germany, and our search index is in France. Our email provider, Resend, stores all its data in the United States, and our hosting and cache providers process data in the United States [OWNER: confirm the regions of your Vercel functions and Upstash database]. Our database provider's contracting company is in Singapore, with support from the United States. When personal data leaves the EEA or the UK, our providers rely on the Standard Contractual Clauses (and the UK addendum), and, where a provider is certified, on the EU-US Data Privacy Framework. You can ask us for details of these safeguards at privacy@ibmatch.com.
 
@@ -169,3 +188,3 @@
 
-The Service is intended for users **13 years and older**, consistent with the age of IB students. We do not knowingly collect information from children under 13. If we become aware that we have collected data from a child under 13, we will take steps to delete that information.
+IB Match is for students of the IB Diploma Programme, who are usually 16 to 19. You must be at least 16 to use it. We do not knowingly collect information from anyone under 16. If we learn that we have, we will delete it.
 
@@ -173,3 +192,3 @@
 
-We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the Service. The "Last updated" date at the top of this page indicates when the latest revision was made.
+We may update this Privacy Policy from time to time. When we make a significant change, we will ask you to accept the new version the next time you sign in, and the version and date at the top of this page will change.
 
@@ -177,6 +196,6 @@
 
-If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:
-
-- **Email:** [privacy@ibmatch.com](mailto:privacy@ibmatch.com)
-
-For GDPR-specific inquiries, you may also contact the relevant data protection authority in your jurisdiction.
+If you have questions about this Privacy Policy or want to exercise your data rights, please contact us:
+
+- **Email:** [privacy@ibmatch.com](mailto:privacy@ibmatch.com), or a Data & privacy request from the Contact page
+
+You can also complain to the data protection authority in your country. In Poland, where IB Match is run, that is the President of the Personal Data Protection Office (UODO).
```
