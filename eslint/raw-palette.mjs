/*
 * The guard against raw palette classes (rebranding 4.4; audit 2.2). Today's public pages were
 * styled with Tailwind's palette (text-blue-600, bg-gray-50: 4,260 of them in the country guides)
 * while the app used the theme's tokens, so a re-theme reached half the site. The new design uses
 * tokens only (text-primary, bg-muted, text-ok…), and this rule keeps it so: it fails on a string
 * holding a palette colour with a shade, in a class list or anywhere else. A code-quality rule,
 * not a formatting one, so it never fights Prettier.
 *
 * Staff pages keep today's design, so they are outside it. So are today's student-facing files
 * listed below: cleanup (R.2) deletes them, and this list with them. Every other file is checked,
 * so a new file, or an old one rebuilt, can't bring the palette back.
 */

const PROPERTIES =
  'bg|text|border(?:-[trblxyse])?|ring(?:-offset)?|outline|fill|stroke|from|via|to|divide|placeholder|caret|accent|decoration|shadow'
const COLOURS =
  'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose'

/** "text-blue-600", "hover:bg-gray-50", "border-t-red-200": a colour, then a shade */
export const RAW_PALETTE = `\\b(?:${PROPERTIES})-(?:${COLOURS})-\\d{2,3}\\b`

const message =
  'A raw palette class. Use the design tokens (text-primary, bg-muted, text-ok…), so the two styling systems can’t drift apart again (rebranding 4.4).'

export const rawPaletteRule = {
  'no-restricted-syntax': [
    'error',
    { selector: `Literal[value=/${RAW_PALETTE}/]`, message },
    { selector: `TemplateElement[value.raw=/${RAW_PALETTE}/]`, message }
  ]
}

/** Staff areas, which keep today's design, and tests, which aren't shown to anyone */
export const NOT_STUDENT_FACING = [
  'app/admin/**',
  'app/coordinator/**',
  'components/admin/**',
  'components/coordinator/**',
  '**/*.test.{ts,tsx}',
  '**/*.verify.ts'
]

/** Today's design, deleted at cleanup (R.2). Nothing is added to this list. */
export const TODAYS_DESIGN = [
  'app/auth/accept-student-invite/[[]token]/AcceptStudentInviteForm.tsx',
  'app/auth/coordinator/CoordinatorSignIn.tsx',
  'app/auth/signin/SignIn.tsx',
  'app/contact/_components/**',
  'app/contact/page.tsx',
  'app/faqs/_components/**',
  'app/faqs/page.tsx',
  // For schools until session 21 rebuilds it (D4.17)
  'app/for-coordinators/_components/**',
  'app/how-it-works/_components/**',
  'app/ib-university-requirements/RequirementsContent.tsx',
  'app/landing/**',
  'app/student/invitations/PendingInvitationsClient.tsx',
  'app/student/settings/AccountSettingsClient.tsx',
  'app/study-in-*/*Content.tsx',
  'app/support-us/_components/**',
  'components/auth/AcceptInviteForm.tsx',
  'components/layout/MobileBottomNav.tsx',
  'components/layout/StudentHeader.tsx',
  'components/shared/MarkdownContent.tsx',
  // The policy update banner, until 4.6 builds it (D2.16)
  'components/shared/ReconsentBanner.tsx',
  'components/student/ProgramCard.tsx',
  'components/ui/toast.tsx'
]
