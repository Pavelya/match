# Cookie Policy: redline

Baseline: `FALLBACK_CONTENT` in `app/cookies/page.tsx` (no Cookie Policy has been published in the admin, so this is what `/cookies` shows), dated 26 December 2025.
Proposed: [`cookie-policy.proposed.md`](./cookie-policy.proposed.md). Text in `[OWNER Qn: …]` brackets is a question for the owner (see
[`README.md`](./README.md)); none may remain when it is published.
Lines starting with `-` are the published words, `+` the proposed ones. Blank lines are collapsed before comparing.

## What changed, and why

1. **The cookie names.** The published policy names `next-auth.session-token`, `next-auth.csrf-token` and `next-auth.callback-url`, which are Auth.js v4's. The live site sets `__Host-authjs.csrf-token`, `__Secure-authjs.callback-url` and, when Google sign-in starts, `__Secure-authjs.pkce.code_verifier` (15 minutes), and after sign-in `__Secure-authjs.session-token` (30 days). A list now gives each name, what it does and how long it lasts.
2. **When they are set.** The csrf and callback cookies are set on a visitor's first page, before any sign-in (seen in the live `Set-Cookie` headers on `/`). The old text implied login.
3. **What the policy left out.** The `cookie-consent` choice (a cookie, one year, and the same name in `localStorage`) and the new design's `ibm-theme` and `shortlist-count` in `localStorage`. The Privacy Policy says "remembering your preferences" and this is what it means.
4. **"Customize: choose which categories to enable".** Not true of either banner: today's Customize shows four static rows ("Not currently used") and has no switches (`components/shared/CookieConsentBanner.tsx`), and the new one's only informs (approved on rebranding D4.1). The new text says what the three buttons do and that both choices leave the same cookies today.
5. **The three optional categories** (analytics, preference, marketing: each "Currently not used") become one paragraph that promises to list any such cookie here first and ask before setting it.
6. **Other companies.** New: no third-party scripts or fonts load (CSP; the live pages); Google's pages and picture, Stripe's checkout, and the Ko-fi and Calendly links have their own policies.
7. **"You can change your preferences at any time by clearing your browser cookies."** Now: clear this site's cookies and stored data (the choice also lives in `localStorage`).
8. **Contact.** The email address is `privacy@ibmatch.com` (it forwards to `support@`).
9. **Date and version.** Publish with the Terms and the Privacy Policy on release day. The Cookie Policy does not trigger the update banner: `ReconsentChecker` reads the Terms and the Privacy Policy only. Keep one h1 (5.23); the draft has none because the page supplies it.

**Headings (24 October 2026):** in sentence case, the new design's content style, so the legal pages read like the rest of the site. The section links do not change (they are made from the lowercased words). The diff below shows the headings as first drafted; only their case differs.

**Cookies as lists (24 October 2026):** the two cookie tables are now lists, each name in bold. Rendered in the new design's legal template at 390px, the template keeps a code name whole, so `authjs.pkce.code_verifier` took most of the width and the third column (how long each cookie lasts) sat off-screen with nothing to show it was there. The `__Secure-` and `__Host-` prefixes are now said once, above the list. The facts are the same.

## The redline

```diff
--- published
+++ proposed
@@ -2,27 +2,44 @@
 
-Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and provide a better experience.
+Cookies are small text files stored on your device when you visit a website. They help websites remember who you are and what you chose. Websites can also keep small items in your browser's local storage, which works much like a cookie, and this policy covers those too.
 
-This Cookie Policy applies to all users of IB Match, including IB Students, IB Coordinators, University Agents, and Platform Administrators. The same cookies are used regardless of your role on the platform.
+This Cookie Policy applies to all users of IB Match, including IB Students, IB Coordinators and Platform Administrators. The same cookies are used regardless of your role on the platform.
 
-## How We Use Cookies
+## What IB Match Stores in Your Browser
 
-### Essential Cookies (Always Active)
+IB Match sets only what it needs to sign you in and keep your account secure, and a few things that remember your choices. It sets no analytics, advertising or tracking cookies.
 
-These cookies are necessary for the website to function and cannot be disabled:
+### Essential Cookies
 
-- **Session Cookies** (`next-auth.session-token`): Keep you logged in while using the app
-- **CSRF Protection** (`next-auth.csrf-token`): Protect against cross-site request forgery attacks
-- **Callback URL** (`next-auth.callback-url`): Remember where to redirect you after login
+These are needed for the site to work and cannot be turned off. On the site's secure address, the `authjs` cookies' names start with `__Secure-`, except `authjs.csrf-token`, which starts with `__Host-`.
 
-### Analytics Cookies (Optional)
+- **`authjs.session-token`**: keeps you signed in. Set only after you sign in; lasts 30 days.
+- **`authjs.csrf-token`**: protects sign-in and sign-out against forged requests. Lasts until you close your browser.
+- **`authjs.callback-url`**: remembers the page to return to after you sign in. Lasts until you close your browser.
+- **`authjs.pkce.code_verifier`**: completes "Continue with Google" safely. Set only when you start a Google sign-in; lasts 15 minutes.
+- **`cookie-consent`**: remembers your choice in the cookie banner, so it asks only once. Lasts 1 year.
 
-Currently, we do not use analytics cookies. If we add them in the future, they would help us understand how visitors use our site to improve the experience.
+The `cookie-consent` choice is also kept in your browser's local storage, under the same name.
 
-### Preference Cookies (Optional)
+### Choices Stored in Local Storage
 
-Currently not used. These would remember your settings and preferences across visits.
+These stay on your device and are never sent to us. They have no expiry.
 
-### Marketing Cookies (Optional)
+- **`ibm-theme`**: remembers your light or dark choice, only if you pick one yourself. Otherwise the site follows your device.
+- **`shortlist-count`**: the number beside Shortlist in the menu, for the signed-in student it belongs to. It is removed when you delete your account.
 
-Currently not used. These would be used for advertising and retargeting purposes.
+### Analytics, Preference and Marketing Cookies
+
+IB Match does not use these. If we ever add one, we will list it here first and ask for your consent before it is set.
+
+## Other Companies' Cookies
+
+IB Match does not load third-party scripts or fonts. Three things can still involve another company:
+
+- If you sign in with Google, Google sets its own cookies on its own pages. Your Google profile picture, if you have one, is loaded from Google's servers.
+- A school subscription is paid on Stripe's pages, which set their own cookies.
+- The links on our Support us and For schools pages lead to Ko-fi and Calendly, which have their own cookie policies.
 
@@ -30,9 +47,8 @@
 
-When you first visit IB Match, you'll see a cookie banner where you can:
+When you first visit IB Match, a banner offers three buttons:
 
-- **Accept All**: Enable all cookie categories
-- **Essential Only**: Use only the cookies required for the app to work
-- **Customize**: Choose which categories to enable
+- **Accept all** and **Essential only** store your choice. Because IB Match sets only essential cookies today, both choices leave the same cookies on your device.
+- **Customize** shows each kind of cookie and says which are used. There is nothing to switch on or off, because the site sets no optional cookies.
 
-You can change your preferences at any time by clearing your browser cookies and visiting the site again.
+To see the banner again, clear this site's cookies and stored data in your browser.
 
@@ -47,3 +63,3 @@
 
-Check your browser's help documentation for specific instructions.
+If you block the essential cookies above, you will not be able to sign in. Check your browser's help documentation for specific instructions.
 
@@ -52,3 +68,4 @@
 If you have questions about our use of cookies, please contact us at:
-- Email: privacy@ibmatch.com
+
+- **Email:** [privacy@ibmatch.com](mailto:privacy@ibmatch.com)
 
@@ -56,2 +73,2 @@
 
-We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated effective date.
+We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated date and version.
```
