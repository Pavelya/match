-- Where a program is taught, when that is not its university's city (content task 8.2):
-- UBC's Okanagan programs are in Kelowna, not Vancouver.
-- Generated with `prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script`.
-- Additive and nullable: null means the university's city, so every program shows what it did
-- until the refresh tool fills the column.

-- AlterTable
ALTER TABLE "AcademicProgram" ADD COLUMN     "campusCity" TEXT;
