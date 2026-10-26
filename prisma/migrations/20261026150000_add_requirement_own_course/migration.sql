-- A requirement that needs a course of its own (MAINT 5.18): within a program, the requirements
-- that have it are each met by a different course, as in "two of Biology, Chemistry or Physics".
-- Generated with `prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script`.
-- Additive, false by default, so every program matches as before until one is set.

-- AlterTable
ALTER TABLE "ProgramCourseRequirement" ADD COLUMN     "ownCourse" BOOLEAN NOT NULL DEFAULT false;
