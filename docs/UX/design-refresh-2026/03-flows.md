# 03 · Student flows: as they are, where they leak, what to change

Interaction counts are clicks or taps by a student who knows what they want. They are a proxy
for effort, not a measurement; there is no analytics to measure real drop-off (audit §8).

**Verdict:** keep the IA (four destinations) and the order of onboarding. Change five things:
**the first-run screens** (compact pickers and inline subject entry), **when sign-in happens**,
**how matches explain themselves** (with none hidden), **what the shortlist is for**, and **where
profile and settings live on a phone**.

---

## F1 · New student: from the home page to a first list of matches

**Today**

```
Home (no header) ─ "Find My Match" ─▶ Sign in ─ Google, or magic link (leave for email, come back)
  ─▶ /student ─ redirect ─▶ Onboarding
       1 Study interests   pick 1–5 fields           ~3 + Continue
       2 Locations         pick countries            ~3 + Continue
       3 Academic profile  6 × [Add subject dialog: group → subject → level → grade → Add] = 36
                           TOK, EE                   2
                           Complete Profile          1
  ─▶ /student/matches (client fetch, skeleton) ─▶ 10 large cards
```

About **50 interactions plus an email round-trip**, and sign-in comes before the student has seen anything.

**Where it leaks**

- **Sign-in first.** The magic-link path leaves the site entirely.
- **Nothing is saved until the very last button.** Steps 1 and 2 live in React state only
  (`FieldSelectorClient.tsx`), so closing the tab or following a link mid-way loses everything.
- **Subject dialog:** six steps per subject, with no editing. A wrong grade means remove and re-add.
- The page says "Update Your Profile" to someone who has never made one.
- Field and country pickers do not work from the keyboard (audit 6.3).
- **(From the screenshots)** Steps 1 and 2 are walls of tall cards. Countries take 6 rows on desktop and
  11 on a phone, with Continue only after the last row. On a phone the tab bar stays on screen
  throughout onboarding, inviting the student to leave mid-flow.
- Field descriptions overlap (Economics appears under two fields, Computer Science under two), so
  the first question is harder than it looks and can quietly narrow the matches (audit §9).

**Proposed (canvas: "Phone · First run, step 1 / 2 / 3", "Academic profile")**

- **Step 1:** twelve compact rows (icon, name, one line of examples, checkbox), about 56px each,
  with a sticky footer: "2 of 5 chosen · Continue".
- **Step 2:** an "Open to anywhere" switch, a filter box, then the 22 countries as a two-column
  checkbox grid that fits on about one phone screen. Sticky footer: "3 selected · Continue".
- **Step 3:** one row per IB group (below).
- **Focus mode:** no tab bar during first run, just the logo, "Save and exit" and "Back to …". The
  tab bar appears once the student has matches. "Save and exit" saves the step in progress and goes
  to Home (9 October 2026).

```
Home ─ "Get my matches" ─▶ Sign in (unchanged) ─▶ 1 Interests ─▶ 2 Countries
  ─▶ 3 Six subjects (one row per IB group)
     each row: type-ahead subject · SL/HL · grade 1–7   = 3 per subject, 18 in all
     TOK, EE                                             2
     live total and diploma checks, "See my matches"     1
  ─▶ Matches in three status groups, with reasons
```

About **30 interactions after sign-in**, down from about 50.

- **Sign-in stays first** (decision 7, 2026-10-06). Save each step as a draft as soon as it is
  completed, so leaving mid-way loses nothing. "Save and exit" in the header makes that visible.
  It writes only the student's own profile row, the same data that is saved today at the end.
- One row per IB group matches how students think about their diploma ("my Group 4 is
  Physics HL") and lets the form check the rules: one subject per group, Group 6 replaceable,
  **3 or 4 at HL** (not checked today, audit 5.3).

## F2 · Returning student checks matches

**Today:** sign in → `/student` redirect → matches. A list of 10, each about 700px tall, no
grouping, a "Refresh Recommendations" button. **The list is cut at 10** ("We found 14 … Showing
top 10"), and the rest cannot be reached. Requirement tiles say "met" without the student's grade.

**Proposed (canvas: "Matches", "Phone · Matches")**

- Three groups by status (canvas: "Match card: every state"):
  **Meets all requirements**; **Within reach** (every subject at the right level, up to 3 points
  or one grade short); and **Missing a requirement** (a subject not taken, SL where HL is
  required, or further off), which starts collapsed. Three jump links under the summary lead to
  the groups; each shows five cards, then "Show 20 more" (decided on "D4.6 Matches", 10 October
  2026, in place of the segmented filter first proposed here).
- Each card is about 180px and still shows **every requirement at once**, as a small chip with its own
  status: "✓ 38 / 37 points", "– Maths HL 7 · you 6", "× Biology HL 5 · not taken". Problems
  come first. More than four chips collapse to "+2 met". That keeps today's "see everything" at
  a quarter of the height.
- **"Why this match"** opens in place, **on desktop and on a phone** (canvas: "Phone · Why this
  match, opened"). The same disclosure component is used on both; the phone version stacks.
  Inside: each requirement with needed and actual values, a one-line "to close it" note for
  within-reach programs (or why grades alone can't close it), field and country, then the
  **fit score** with its three weighted parts. This is where the percentage lives now. Built in
  rebranding 2.2 from the logic of the old `MatchBreakdown.tsx` (`lib/matching/match-why.ts`), which
  was then deleted.
- **Why the status leads, not the percentage.** Running the production algorithm on real programs
  for the mockup student:
  - A program that needs a language at HL, which she has at SL, scores **90%**.
  - A program where she is 1 point short scores **88%**.
  - One 3 points short also scores **88%**.
  - Six programs tie at **100%**.

  The score can't separate "fixable with one more point" from "needs a subject level you don't
  have". The status groups can. Within each group, cards are sorted by score.
- A profile summary sits beside the list (predicted total, subjects, interests) with **Edit**, so
  a student sees what the matches are based on.
- Drop "Refresh". Sort: best fit, lowest points needed, country.
- **No hidden matches.** Show every program that meets the requirements or is within reach, plus
  the collapsed "Missing a requirement" group, all within the student's fields and countries. Close
  the list with a line pointing to Explore for everything else. The matching
  already scores the full candidate set before `slice(0, 10)`, so returning a few more small rows
  costs almost nothing. Keep a generous upper bound (for example 50) as a guard. **Changed on
  "D4.6 Matches" (10 October 2026):** a bound of 50 taken before grouping hid every "Within reach"
  program from students with 50 or more at 100%, so the list is grouped first and each group pages
  by itself.

## F3 · Logged-out visitor from Google lands on a country guide or a program page

**Today:** a country guide has no header. Its only internal links are near the bottom: How it
works, Sign in, and "Search UK programs" (`UKContent.tsx:676-708`). A program page has a header,
but "Back to results" calls `history.back()` and leaves the site, and the requirements block can
render empty (audit 4.2).

**Proposed**

- The **same header and footer on every public page** (one layout for the public route group):
  Explore programs · Country guides · How it works · For schools · Sign in · **Get my matches**.
- **Real breadcrumbs** on programs and universities (Explore / Canada / University of Toronto)
  instead of history-based back links.
- On a program page the requirements are **always** listed. Logged out, the "Your fit" panel
  becomes "Sign in and add your grades to check these: about 2 minutes", which leads into F1
  and lands back on this program.
- Each country guide links to Explore filtered to that country near the top as well as at the
  bottom.

## F4 · Explore → program → save → decide

**Today:** a filter toggle reveals every facet at once. Results are big cards, 50 per page.
Logged out, Save shows "Saved" when nothing was saved. The Saved page reuses the big card
**without** match information (`SavedProgramsClient.tsx:229`), so the list a student is
deciding from is the one place their fit is not shown.

**Proposed (canvas: "Explore programs", "Phone · Explore", "Phone · Filters sheet", "Shortlist and compare")**

- **Toolbar chips** (Field · Country · IB points · Length) that open small menus on desktop and a
  bottom sheet on phones, with the result count on the apply button. A switch, **"Only ones I
  qualify for"**, appears once a profile exists. Applied filters show as removable chips.
- **Rows instead of cards**: thumbnail, program, university and city, country, length, minimum points
  (large, aligned), your fit, save. 20 per page with "Show 20 more". The URL keeps all of this.
- **Save while logged out** opens sign-in, remembers the program, and saves it on return. No
  false confirmation.
- **Shortlist** (renamed from "Saved") with a **Compare** view: fit, minimum points against yours,
  named subjects, country, degree and length, the year the requirements were checked, official
  link. All of this data already exists.

## F5 · Student updates a grade (new predictions arrive)

**Today:** Academic Profile → the wizard reopens at step 1. Steps can be clicked if the profile
is complete. At step 3, remove the subject, re-add it through the six-step dialog, then
"Complete Profile" → redirect to matches. No indication of what changed.

**Proposed (canvas: "Academic profile")**

- Profile page with tabs: Subjects and grades · Interests · Countries · Account.
- Change the grade in place; the total and diploma checks update live; "Save and update matches".
- After saving, matches show a one-line summary of what moved, for example "2 programs now meet
  all requirements". This needs only a comparison of before and after lists, not new data.

## F6 · Logged in, profile incomplete

**Today:** a full-page "Complete Your Academic Profile" call to action on matches and saved, an inline banner on
program pages, and a looping amber dot in the navigation.

**Keep** the calls to action, which are well written. **Drop** the looping animation. Show "Profile 2 of 3"
as text on the Academic tab instead.

**Approved 10 October 2026** ("D2.11 Empty and error states", "D4.6 Matches"): on Matches and Shortlist
the call to action is the empty-state panel, "Complete your academic profile", listing the three steps
with the ones already saved ticked, and "Add subjects and grades".

## F7 · Sign-in

**Today:** a centred card with Google first, then a magic link. It is fine. **Restyle only**: put the
logo outside the card, use the new tokens, and add one line of context ("We'll save your matches
and shortlist to your account"). Keep Google's button within Google's branding rules.

## F8 · Profile and settings (phone tab bar)

**Today:** the phone tab bar is Matches (heart) · Saved · Academic · Search. "Academic" reopens
the onboarding wizard. Settings (name, school connection, sign out, export, delete) is reachable
only through the header avatar, and there is no appearance setting.

**Decided 9 October 2026 (owner; canvas "D2.12 Header", "D2.14 Phone tab bar", "D1.4 Account menu")**

- Tab bar: **Matches · Explore · Shortlist · Academic**. Matches gets Lucide's List checks instead
  of a heart, so the bar no longer has two "favourite" icons, and it doesn't change with the logo.
- **Academic** opens the academic profile at `/student/onboarding`, the page that serves new and
  existing students: the predicted total with "Edit subjects and grades", then Interests and
  Countries (each opens the same compact step screens used in first run). The desktop nav has it
  too, between Shortlist and Guides.
- **The avatar opens the account menu**, in the header on desktop and phone: Settings (name, school
  connection, your data: download, delete), FAQs, Contact, Appearance (System / Light / Dark) and
  Sign out. Everything in today's Settings page is kept.
- On a phone the header has Menu only when signed out, and Guides with the avatar when signed in, so
  the two menus never sit side by side.
- The tab bar hides on scroll down and comes back on scroll up, as it does today.
- An earlier proposal made the fourth tab a Profile hub holding all of this; it left no clear way
  to edit the academic profile, and it repeated the avatar.

## What stays exactly as is

- Four destinations: Matches, Explore (renamed from "Program Search"), Shortlist (renamed from
  "Saved"), Academic.
- Onboarding order: interests → countries → grades.
- The honesty notes about which entry year requirements were checked for.
- School invitation flows: same flow, new look.
