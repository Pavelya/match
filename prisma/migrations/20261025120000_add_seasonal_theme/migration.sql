-- When each seasonal decoration shows (rebranding 6.1, board "D1.7 Seasonal themes"): one row per
-- season built in code, plus "all-off", the switch that turns every season off.
-- Generated with `prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script`.
-- Additive: a new, empty table. Only /admin/seasonal-themes writes it, and the root layout reads it
-- for the new design alone, through a cache that fills after a save.

-- CreateTable
CREATE TABLE "SeasonalTheme" (
    "key" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "startsOn" DATE,
    "endsOn" DATE,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeasonalTheme_pkey" PRIMARY KEY ("key")
);
