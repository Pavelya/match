# Copy Program Feature — Task List

> **Goal:** Allow admins to duplicate an existing program so that shared IB requirements, courses, and metadata don't have to be re-entered manually.

## Architecture Context (Investigation Summary)

### How Programs Are Stored
- **Prisma model:** `AcademicProgram` (fields: name, description, universityId, fieldOfStudyId, degreeType, duration, minIBPoints, programUrl, selectivityTier, requirementsVerified)
- **Course requirements:** `ProgramCourseRequirement` — linked via `programId`, supports AND/OR logic via `orGroupId`
- **Relations:** university → country, fieldOfStudy

### How Programs Are Created
1. Admin fills `ProgramForm` component at `admin/programs/new`
2. Form POSTs to `POST /api/admin/programs` (route: `app/api/admin/programs/route.ts`)
3. API creates `AcademicProgram` + nested `ProgramCourseRequirement` rows in Prisma
4. **Algolia auto-sync** happens via Prisma client extension (`lib/algolia/middleware.ts`) — no manual sync call needed on create

### How Programs Are Edited
1. `ProgramEditForm` at `admin/programs/[id]/edit` — pre-populated from DB
2. Form PATCHes to `/api/admin/programs/[id]` — deletes old requirements, creates new ones, updates program, invalidates matching caches, syncs Algolia

### Key Files
| File | Role |
|------|------|
| `app/admin/programs/[id]/page.tsx` | Program detail page (where "Copy" CTA will live) |
| `app/admin/programs/new/page.tsx` | New program page (server component, fetches reference data) |
| `components/admin/programs/ProgramForm.tsx` | Create form (client component, stateful) |
| `components/admin/programs/ProgramEditForm.tsx` | Edit form (client component, pre-populated) |
| `app/api/admin/programs/route.ts` | POST handler — creates program |
| `app/api/admin/programs/[id]/route.ts` | GET/PATCH/DELETE handlers |
| `lib/algolia/middleware.ts` | Prisma extension — auto-syncs to Algolia on create/update/delete |
| `lib/algolia/sync.ts` | Transform + sync functions |
| `prisma/schema.prisma` | AcademicProgram, ProgramCourseRequirement models |

---

## Chosen Approach

**Flow B — Server-side copy (recommended)**

When the admin clicks **[Copy Program]**, a new API endpoint creates the program directly in the DB with the name `COPY_<original name>`, then redirects the admin to `admin/programs/<newId>` (the detail page of the copy). From there the admin can click **Edit** to rename and adjust.

### Why Flow B over Flow A (pre-fill form via query params)

1. The `ProgramForm` component currently has no support for initial data — adding it would require significant refactoring to match `ProgramEditForm`'s interface
2. Query-param-based pre-filling is brittle for complex nested data (course requirements with OR-groups)
3. Server-side copy is **simpler, faster, and more reliable** — one API call, guaranteed data integrity
4. Algolia sync happens automatically via the Prisma extension on `create` — zero extra work
5. Admin can immediately see the copy and edit as needed

---

## Task List

### Task 1 — Create the Copy Program API endpoint
- **Goal:** Add a `POST /api/admin/programs/[id]/copy` route that duplicates a program with all its course requirements
- **Expected outcome:**
  - New file: `app/api/admin/programs/[id]/copy/route.ts`
  - Endpoint fetches the original program with all course requirements
  - Creates a new `AcademicProgram` with name = `COPY_<original name>`, same universityId, fieldOfStudyId, degreeType, duration, minIBPoints, programUrl, description
  - Creates all `ProgramCourseRequirement` rows (same ibCourseId, requiredLevel, minGrade, isCritical, orGroupId — orGroupIds must be **regenerated** as new UUIDs to avoid collisions, preserving group membership)
  - Does NOT copy `selectivityTier`, `requirementsVerified`, `requirementsUpdatedAt` — these should be reset (null/false/null)
  - Returns `{ id: newProgram.id }` so the client can redirect
  - Algolia sync happens automatically via the Prisma extension (no extra code)
  - Requires PLATFORM_ADMIN role (same auth as other program endpoints)

---

### Task 2 — Add "Copy Program" CTA to the program detail page
- **Goal:** Add a visible button on `admin/programs/[id]` that triggers the copy
- **Expected outcome:**
  - New button "Copy Program" in the `PageHeader` actions array (next to "Edit"), using the `Copy` icon from lucide-react
  - Since the action requires a POST (not a simple navigation), this needs a client component — create `ProgramCopyButton` (similar pattern to existing `ProgramDeleteButton`)
  - `ProgramCopyButton` shows a confirmation dialog: "This will create a copy of [program name] with all its requirements. Continue?"
  - On confirm: calls `POST /api/admin/programs/[id]/copy`
  - On success: redirects to `admin/programs/<newId>` (the copied program's detail page)
  - On error: shows toast/error message
  - Loading state while copying

---

### Task 3 — Add the CopyButton to the detail page layout
- **Goal:** Wire `ProgramCopyButton` into `app/admin/programs/[id]/page.tsx`
- **Expected outcome:**
  - Import and render `ProgramCopyButton` in the sidebar, in a logical location (e.g., above the "Danger Zone" card, or as a new action in the header alongside Edit)
  - Pass `programId` and `programName` as props
  - No layout/design regression on the existing page

---

### Task 4 — Handle duplicate name conflicts
- **Goal:** Ensure the copy doesn't fail if `COPY_<name>` already exists at the same university
- **Expected outcome:**
  - The API endpoint checks for existing programs with the same name at the same university
  - If `COPY_<name>` exists, append a counter: `COPY_2_<name>`, `COPY_3_<name>`, etc.
  - This prevents the 409 conflict error from the existing duplicate-name validation in the POST handler

---

### Task 5 — Invalidate caches after copy
- **Goal:** Ensure matching caches and country-program caches are updated after creating a copy
- **Expected outcome:**
  - After creating the copy, call `revalidateTag('countries-with-programs')` (same pattern as existing POST handler)
  - Algolia sync is already handled by the Prisma extension — no additional work
  - Matching cache doesn't need explicit invalidation for a new program (it's additive, not mutating)

---

### Task 6 — Manual verification
- **Goal:** End-to-end verification that the copy feature works correctly
- **Expected outcome:**
  1. Navigate to `admin/programs/[id]` for any existing program
  2. Click "Copy Program" → confirm dialog
  3. Verify redirect to the new program's detail page
  4. Verify the copy has name `COPY_<original>`, same university, field of study, degree type, duration, min IB points, program URL, description
  5. Verify all course requirements are copied with correct OR-group relationships
  6. Verify the copy appears in Algolia search results
  7. Verify the copy appears in `admin/programs` list
  8. Verify clicking "Edit" on the copy works and data is pre-populated correctly
  9. Test copying a copy (should produce `COPY_2_<name>` or similar)
  10. Test that `requirementsVerified` is `false` on the copy (admin must re-verify)
