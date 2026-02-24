# Onboarding Completion UX Improvements

> **Problem:** Students who skip onboarding (3-step academic profile setup) encounter confusing, generic error states across the app. The current messages ("Unable to Load Recommendations", "Student profile not found. Please complete onboarding first.", CTA: "Try Again") do not guide users back to onboarding. The goal is to maximize completed academic profiles by making incomplete onboarding clearly visible and easy to resolve across all relevant surfaces.

> **Scope:** Only affects students who have NOT completed all 3 onboarding steps (Study Interests → Location Preferences → Academic Profile). Students with completed profiles should see zero changes.

---

## 2026 UX Best Practices Applied

Research into current (2026) UI/UX patterns for SaaS onboarding, empty states, and nudge indicators confirms and refines our approach:

### Empty States (Tasks 1 & 2)
- **Value-first messaging:** Explain the benefit of completing the action, not just the error. "Complete your profile to get matches" > "Profile not found"
- **Actionable CTAs:** Every empty state must have a clear, primary CTA that drives the user toward completion. Secondary options (e.g., "Browse Programs") prevent dead ends
- **Brand personality:** Use friendly illustrations/icons and benefit-driven microcopy to transform dead-end screens into engagement opportunities
- **Never show raw technical errors** to end users (e.g., "Student profile not found")

### Navigation Indicators (Tasks 3 & 4)
- **Red dot badges:** Industry-standard pattern (LinkedIn, Duolingo) — small 6–8px dot at top-right of icon. Leverages the Zeigarnik Effect (brain's desire to complete incomplete tasks)
- **Caution against overuse:** Use sparingly and only for important, actionable items. Overuse causes "red dot blindness." We use it for exactly one item (Academic Profile) so this is safe
- **Consistent placement:** Top-right of the icon, consistent across desktop nav and mobile bottom nav
- **Consider amber/orange instead of red:** Red implies urgency/error; amber/orange communicates "action needed" without anxiety — better fit for a non-blocking profile completion nudge

### Contextual Inline Banners (Task 5)
- **Contextual timing:** Show the nudge exactly when the user would benefit — on a program detail page where they'd see a match score if onboarded
- **Benefit-led copy:** Frame as value unlocked ("See how you match") not requirement ("You must complete")
- **Non-disruptive placement:** Inline within the content flow (where match score would appear), not modal or blocking
- **Dismissible:** Users should be able to dismiss if they actively choose not to complete onboarding now

### Profile Completion Psychology
- **Completion bias:** Users are more motivated when they can see progress. Our 3-step indicator in onboarding already uses this
- **Endowed progress effect:** Showing that a user has already "started" increases completion likelihood. If a user has completed steps 1-2 but skipped step 3, messaging should acknowledge that
- **Trust signals:** "Takes 2 minutes • Free" reduces friction and sets expectations

---

## Task 1: Redesign error state on `/student/matches` for incomplete profiles

**Goal:** Replace the generic "Unable to Load Recommendations" + "Try Again" error with a clear, friendly, and actionable empty state that explains WHY there are no matches and guides users to complete onboarding.

**Current behavior:** `RecommendationsClient.tsx` shows `AlertCircle` icon, "Unable to Load Recommendations" heading, the raw API error string ("Student profile not found. Please complete onboarding first."), and a "Try Again" button that just re-fetches the same failing API.

**Required changes:**
- Detect the specific 404 "profile not found" error from `/api/students/matches` (vs. other errors like 500s)
- Show a dedicated "Complete Your Academic Profile" state with:
  - A friendly icon (e.g. `GraduationCap` or `Sparkles`)
  - Heading: "Complete Your Academic Profile"
  - Body: "Set up your IB subjects and grades to get personalized program recommendations. It only takes 2 minutes."
  - Primary CTA button: "Complete Profile Setup" → links to `/student/onboarding`
  - Secondary option: "Browse Programs" → links to `/programs/search`
- Keep the generic error state for actual server errors (500, network failures, etc.)

**Files:** `app/student/matches/RecommendationsClient.tsx`

---

## Task 2: Redesign error state on `/student/saved` for incomplete profiles

**Goal:** Replace the generic error state on the Saved Programs page with a clear message when profile is incomplete.

**Current behavior:** `SavedProgramsClient.tsx` shows a generic `AlertCircle` + "Unable to Load Saved Programs" + raw error string + "Try Again" button when the API returns 404 for missing profile.

**Required changes:**
- Same approach as Task 1: detect 404 "profile not found" separately from other errors
- Show a dedicated state with:
  - Heading: "Complete Your Academic Profile"
  - Body: "Set up your IB profile to save and compare programs. It only takes 2 minutes."
  - Primary CTA: "Complete Profile Setup" → `/student/onboarding`
  - Secondary: "Browse Programs" → `/programs/search`
- Keep the generic error state for actual server errors

**Files:** `app/student/saved/SavedProgramsClient.tsx`

---

## Task 3: Add onboarding completion indicator to desktop header (`StudentHeader`)

**Goal:** Show a subtle but clear visual indicator in the desktop navigation header when onboarding is incomplete, nudging the user to complete their profile.

**Recommended approach:**
- Add a small red dot / badge indicator on the "Academic Profile" nav link in the header
- Alternatively: a compact inline banner below the header (dismissible, persists via localStorage)
- The indicator must be **non-disruptive** — no modals, no blocking banners, no aggressive popups
- Only visible to students with incomplete profiles

**Implementation notes:**
- `student/layout.tsx` already fetches the session; it needs to additionally check `studentProfile` completeness (same logic as `student/page.tsx`: check for profile existence, `preferredFields.length > 0`, and `totalIBPoints !== null`)
- Pass an `isOnboardingComplete` boolean prop to `StudentHeader`
- In `StudentHeader`, render a small red dot/badge next to the "Academic Profile" nav item when `isOnboardingComplete === false`

**Files:** `app/student/layout.tsx`, `components/layout/StudentHeader.tsx`

---

## Task 4: Add onboarding completion indicator to mobile bottom navigation (`MobileBottomNav`)

**Goal:** Since the header is hidden on mobile, the mobile bottom nav needs the same visual indicator for incomplete onboarding.

**Recommended approach:**
- Add a small red dot/badge on the "Academic" (`GraduationCap`) nav item in the bottom nav
- Same subtle style: a 6–8px red circle positioned at the top-right of the icon
- Only visible when onboarding is not complete

**Implementation notes:**
- Pass `isOnboardingComplete` prop from `student/layout.tsx` to `MobileBottomNav`
- In `MobileBottomNav`, render red dot on the "Academic" item when incomplete
- The red dot should be visible even when the nav bar is in its default visible state

**Files:** `app/student/layout.tsx`, `components/layout/MobileBottomNav.tsx`

---

## Task 5: Add subtle onboarding CTA on `/programs/[id]` for logged-in students without profiles

**Goal:** When a logged-in student views a program detail page but hasn't completed onboarding, show a subtle, non-disruptive banner encouraging them to complete their profile to see their match score.

**Current behavior:** The page silently skips the matching calculation and shows no match score section. There is no indication that the student could see a match score if they completed their profile.

**Recommended approach:**
- When `isLoggedIn === true` AND `studentProfile === null`, show a compact banner (similar in style to `SignUpCTA` but more subtle) in place of the match score section:
  - Icon: `Sparkles` or `GraduationCap`
  - Text: "Complete your academic profile to see how you match with this program"
  - CTA: "Complete Profile" → `/student/onboarding`
  - Trust signals: "Takes 2 minutes • Free"
- Must NOT show for logged-out users (they see `SignUpCTA`) or for users with completed profiles (they see match score)

**Files:** `app/programs/[id]/page.tsx`, `app/programs/[id]/ProgramDetailClient.tsx`, possibly a new `components/student/CompleteProfileCTA.tsx`

---

## Task 6: Create a reusable `CompleteProfileCTA` component

**Goal:** Extract the "complete your profile" messaging into a shared component that can be reused across Tasks 1, 2, and 5 for consistent UX.

**Recommended approach:**
- Create `components/student/CompleteProfileCTA.tsx`
- Props: `variant` ('full-page' | 'inline' | 'banner'), `heading`, `description`, optional `secondaryCTA`
- `full-page` variant: used in matches/saved pages (Tasks 1 & 2) — large centered layout
- `inline` variant: used in program detail page (Task 5) — compact horizontal banner
- Consistent styling: primary gradient background (similar to `SignUpCTA`), trust signals, clear CTA to `/student/onboarding`

**Files:** `components/student/CompleteProfileCTA.tsx` (new)

---

## Task 7: Improve API error responses for clearer client-side handling

**Goal:** Make the API responses for "profile not found" more structured so the client can reliably distinguish between "no profile" and actual server errors without parsing error message strings.

**Recommended approach:**
- In `/api/students/matches/route.ts` and `/api/students/saved-programs/route.ts`, add a `code` field to the error response:
  ```json
  { "error": "Student profile not found", "code": "PROFILE_NOT_FOUND" }
  ```
- Client components can then check `data.code === 'PROFILE_NOT_FOUND'` instead of matching error message strings

**Files:** `app/api/students/matches/route.ts`, `app/api/students/saved-programs/route.ts`
