-- One IBCourse per name (content task 3.5). Seven subjects existed twice under different
-- codes, which split students from the requirements written against the other code.
-- Generated with `prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script`.
--
-- Apply only after scripts/merge-ib-courses.ts --apply and after the seven retired courses
-- are deleted on /admin/reference-data. While a duplicate name remains, this fails:
--   SELECT lower(trim(name)), count(*) FROM "IBCourse" GROUP BY 1 HAVING count(*) > 1;

-- CreateIndex
CREATE UNIQUE INDEX "IBCourse_name_key" ON "IBCourse"("name");
