-- Inactive accounts (MAINT 7.6 Part A): the last day a user was seen signed in, and when the
-- inactivity notice was sent. Generated with `prisma migrate diff --from-config-datasource
-- --to-schema prisma/schema.prisma --script`. Additive and nullable: no row changes until the
-- jwt callback writes the date, or the one-off backfill (scripts/backfill-last-active.ts) runs.

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "inactivityNoticeSentAt" TIMESTAMP(3),
ADD COLUMN     "lastActiveAt" TIMESTAMP(3);
