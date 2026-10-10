-- How selective admission is, for universities that set no IB minimum (content 6, US): the share of
-- first-year applicants admitted, from the Common Data Set (C1), shown as a chip on the new match card.
-- Generated with `prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script`.
-- Additive and nullable: matching never reads these; scripts/programs/set-admit-rates.ts fills them.

-- AlterTable
ALTER TABLE "University" ADD COLUMN     "admitRate" DOUBLE PRECISION,
ADD COLUMN     "admitRateYear" INTEGER,
ADD COLUMN     "internationalAdmitRate" DOUBLE PRECISION;
