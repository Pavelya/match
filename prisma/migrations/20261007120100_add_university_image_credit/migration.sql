-- An image's credit, shown as a caption under the image (content task 8.3). The credits were the
-- last line of University.description, so the About text ended with a licence and a URL.
-- Generated with `prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script`.
-- Additive and nullable: scripts/move-image-credits.ts moves each credit out of its description.

-- AlterTable
ALTER TABLE "University" ADD COLUMN     "imageCredit" TEXT;
