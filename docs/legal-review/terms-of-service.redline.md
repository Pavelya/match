# Terms of Service: redline

Baseline: `docs/templates/legal/terms-of-service.md`, which is the markdown published on 23 February 2026 (label `2026-03-23`); the live page differs from it only in how links and the "Important" quote render.
Proposed: [`terms-of-service.proposed.md`](./terms-of-service.proposed.md). Text in `[OWNER Qn: …]` brackets is a question for the owner (see
[`README.md`](./README.md)); none may remain when it is published.
Lines starting with `-` are the published words, `+` the proposed ones. Blank lines are collapsed before comparing.

## What changed, and why

1. **Version and date.** As for the Privacy Policy: label and effective date are the day it is published.
2. **1. Agreement.** Says who runs the Service: Pavel Yampolsky, an individual in Poland, not a registered company, at `support@ibmatch.com` (a contract needs a named party).
3. **2. Description.** Removes "For University Agents": program listing management, anonymised match analytics and recruitment insights. None of that exists (`product-today.md` §1). Keeps the "Important" disclaimer.
4. **3. Eligibility.** Age 16 (decided), as in the Privacy Policy.
5. **4.1 Account creation.** Says how coordinators really arrive (IB Match invites a school's first coordinator; coordinators at a school with full access invite the rest), that students can also join by a school's invitation, and that administrators are IB Match staff. The agent line goes (no invitation route exists for agents).
6. **4.3 (new) Deleting your account.** The published Terms say how we may end your access but not how you leave.
7. **5.1 Students.** Linking "by accepting its invitation": there is no other way.
8. **5.2 Coordinators.** Editing student data "where the school's access level allows" (it is full access only); inviting other coordinators "where the school's access level allows". Deleting data is a request, as in the portal's placeholder.
9. **5.3 University Agents** becomes "Universities": no accounts that see students; IB Match staff maintain program information (Q5).
10. **6.1 Free access.** Removes "University Agents: core features are free": there are none. "Always free" becomes "free for students" (decided: "we have no plans to charge them" instead of "forever").
11. **6.2 School access levels.** Adds the number (10 students on a free plan) and names editing students' data as a premium feature, as the portal does. "Bulk export" becomes "export": it exports the student list, once.
12. **6.5 (new) Donations.** The Support us page links to Ko-fi; this says donations are voluntary gifts to IB Match, that Ko-fi provides the page and "is not a party to any Donation" (its terms, 13 July 2026), that they buy no access, and that donations are not tax-deductible because IB Match is not a registered charity.
13. **9. User content.** Drops "program listings" (the agents' content).
14. **13. Changes.** Says what users will see when a version changes.
15. **14. Termination.** Drops University Agents.
16. **15. Governing law.** "The laws of the applicable jurisdiction" names no law: the draft says the laws and courts of Poland, the operator's country, flagged for the lawyer. **6.4 and 16.** Refunds and the contact address keep `legal@` (it forwards to `support@`).
17. **12. Limitation of liability.** Unchanged, and flagged for a lawyer (Q4).

**Headings (24 October 2026):** in sentence case, the new design's content style, so the legal pages read like the rest of the site. The section links do not change (they are made from the lowercased words). The diff below shows the headings as first drafted; only their case differs.

## The redline

```diff
--- published
+++ proposed
@@ -5,2 +5,4 @@
 These Terms apply to all visitors, users, and others who access or use the Service, regardless of their role on the platform.
+
+IB Match is run by Pavel Yampolsky, an individual in Poland. It is not a registered company. You can reach it at support@ibmatch.com. [LAWYER: say whether a postal address must also be given.]
 
@@ -12,3 +14,2 @@
 - **For IB Coordinators**: School-level student management tools, analytics dashboards, student progress tracking, and university guidance support for IB schools.
-- **For University Agents**: Program listing management, anonymized student match analytics, and recruitment insight tools.
 - **For Platform Administrators**: Platform-wide management, user administration, content oversight, and system configuration.
@@ -21,3 +22,3 @@
 
-- You are at least **13 years of age**
+- You are at least 16 years of age
 - You are capable of forming a binding contract
@@ -30,4 +31,5 @@
 
-- **Students** may create accounts by self-registration using email (magic link) or Google login.
-- **IB Coordinators**, **University Agents**, and **Platform Administrators** can only create accounts through a secure **invitation process**. These roles cannot self-register.
+- **Students** may create accounts by self-registration using email (a sign-in link) or Google login, or by accepting an invitation from their school.
+- **IB Coordinators** can only create accounts through a secure **invitation process**: IB Match invites the first coordinator of a school, and coordinators at a school with full access can invite others. They cannot self-register.
+- **Platform Administrators** are IB Match staff, and their accounts are created by IB Match.
 
@@ -42,2 +44,6 @@
 We reserve the right to suspend or terminate accounts that violate these Terms.
+
+### 4.3. Deleting Your Account
+
+You may stop using the Service at any time. Students can delete their account in Settings. Coordinators can ask us to delete theirs. What deletion removes is described in our [Privacy Policy](/privacy).
 
@@ -56,3 +62,3 @@
 - Save programs for later review
-- Optionally link to an IB school on the platform, which grants their school's coordinators access to their academic profile for guidance purposes
+- Optionally link to an IB school on the platform by accepting its invitation, which grants the school's coordinators access to their academic profile for guidance purposes
 
@@ -63,17 +69,11 @@
 - **Authority**: By accepting a coordinator invitation, you represent and warrant that you are authorized by your IB school to act in this capacity on the platform.
-- **Student Data Access**: Coordinators may view and, where appropriate, edit academic data (courses, grades, match results) for students linked to their school. This access is granted solely for the purpose of providing university application guidance.
+- **Student Data Access**: Coordinators may view and, where the school's access level allows, edit academic data (courses, grades, match results) for students linked to their school. This access is granted solely for the purpose of providing university application guidance.
 - **Consent**: Coordinators acknowledge that students voluntarily link to a school, and students may unlink at any time, which revokes coordinator access to their data.
 - **Responsible Use**: Coordinators must ensure the accuracy of any student data they edit and must not use the platform or student data for any purpose beyond university guidance.
-- **Invitation Rights**: Coordinators may invite other coordinators and students to their school's workspace, subject to any limits determined by the school's access level.
-- **Data Deletion**: Coordinators may submit a request for deletion of their school's data from the platform. Such requests are subject to review by Platform Administrators.
+- **Invitation Rights**: Coordinators may invite students to their school's workspace, and, where the school's access level allows, other coordinators, subject to any limits determined by the school's access level.
+- **Data Deletion**: Coordinators may ask for deletion of their school's data from the platform. Such requests are subject to review by Platform Administrators.
 
-### 5.3. University Agents
+### 5.3. Universities
 
-University Agents are representatives who manage their institution's program listings. Agents are subject to the following terms:
-
-- **Authority**: By accepting an agent invitation, you represent and warrant that you are authorized by your university to manage its presence on the platform.
-- **Program Accuracy**: Agents are responsible for ensuring that all program information (requirements, descriptions, links) is accurate and kept up to date.
-- **Data Access**: Agents may view only **anonymized, aggregate statistics** about student matches with their programs. Agents do not have access to individual student identities or personal data.
-- **Invitation Rights**: Agents may invite other agents to their university's workspace.
-- **Data Deletion**: Agents may submit a request for deletion of their university and its programs from the platform. Such requests are subject to review by Platform Administrators.
+Universities do not have accounts that can see students or their data. Program information comes from universities' published pages, and IB Match staff maintain it.
 
@@ -87,4 +87,3 @@
 
-- **IB Students**: The Service is always free for students.
-- **University Agents**: Core features are free for university agents.
+- **IB Students**: The Service is free for students.
 
@@ -95,3 +94,3 @@
 - **VIP Schools**: Schools admitted to our early adopter program receive full, unrestricted access to all coordinator features at no cost. All coordinators at a VIP school inherit this full access.
-- **Regular Schools**: A freemium model applies. Coordinators at Regular schools can see and use basic features for free. Premium features (unlimited student invitations, advanced analytics, bulk export, additional coordinator invitations) are visible but locked behind a paid subscription upgrade.
+- **Regular Schools**: A freemium model applies. Coordinators at Regular schools can see and use basic features for free, including linking up to 10 students. Premium features (linking more than 10 students, editing students' academic data, advanced analytics, export, additional coordinator invitations) are visible but locked behind a paid subscription upgrade.
 
@@ -107,2 +106,6 @@
 Refund requests are handled on a case-by-case basis. Please contact us at legal@ibmatch.com for refund inquiries.
+
+### 6.5. Donations
+
+The Support us page links to Ko-fi, where anyone can give to IB Match. Donations are voluntary gifts to IB Match. Ko-fi provides the payment page under its own terms and privacy policy and is not a party to the donation. A donation does not buy any feature or access. IB Match is not a registered charity, so donations are not tax-deductible.
 
@@ -127,3 +130,3 @@
 
-By submitting content to the Service (such as academic profiles, program listings, school information, or any other data), you grant us a **non-exclusive, worldwide, royalty-free license** to use, store, and process that content solely for the purpose of providing the Service.
+By submitting content to the Service (such as academic profiles, school information, or any other data), you grant us a non-exclusive, worldwide, royalty-free license to use, store, and process that content solely for the purpose of providing the Service.
 
@@ -152,5 +155,7 @@
 
+[LAWYER: this section is unchanged from the published Terms. A lawyer should say whether it holds in the places you serve; in many countries a limit like this cannot cover consumers or some kinds of loss.]
+
 ## 13. Changes to Terms
 
-We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
+We reserve the right to modify these Terms at any time. When we make a significant change, we will ask you to accept the new version the next time you sign in, and the version and date at the top of this page will change. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
 
@@ -160,3 +165,3 @@
 
-For IB Coordinators and University Agents, termination of access does not automatically delete the associated school or university data. Data deletion must be requested separately and is subject to review.
+For IB Coordinators, termination of access does not automatically delete the associated school data. Data deletion must be requested separately and is subject to review.
 
@@ -164,3 +169,3 @@
 
-These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law provisions.
+These Terms are governed by the laws of Poland and the courts of Poland have jurisdiction, without limiting any rights you have under the mandatory consumer law of the country where you live. [LAWYER: the published text said "the laws of the applicable jurisdiction", which names no law; confirm the choice and the wording.]
 
```
