-- The intake a program's requirements were checked for (content task 3.1).
-- Generated with `prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script`.
-- Additive and nullable: existing rows read null ("never checked") until the backfill,
-- scripts/programs/backfill-entry-year.ts, stamps them.

-- AlterTable
ALTER TABLE "AcademicProgram" ADD COLUMN     "requirementsEntryYear" INTEGER;
