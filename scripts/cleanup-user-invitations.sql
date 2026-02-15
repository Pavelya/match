-- ============================================
-- Cleanup invitations sent by a specific user
-- ============================================
-- SET THE EMAIL BELOW before running:
-- ============================================

-- Step 1: Preview what will be deleted (run this first!)
SELECT
  i.id,
  i.email AS "invited_email",
  i.role,
  i.status,
  i."createdAt",
  u.email AS "invited_by_email"
FROM "Invitation" i
JOIN "User" u ON i."invitedById" = u.id
WHERE u.email = 'email';

Step 2: Delete the invitations (uncomment when ready)
DELETE FROM "Invitation"
WHERE "invitedById" = (
  SELECT id FROM "User" WHERE email = 'email'
);

-- Step 3: Verify the user can now be deleted (optional preview)
-- SELECT id, email, role FROM "User" WHERE email = 'email';
