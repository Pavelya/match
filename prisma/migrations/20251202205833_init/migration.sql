-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'COORDINATOR', 'UNIVERSITY_AGENT', 'PLATFORM_ADMIN');

-- CreateEnum
CREATE TYPE "CourseLevel" AS ENUM ('HL', 'SL');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('VIP', 'REGULAR');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "UniversityType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "schoolId" TEXT,
    "totalIBPoints" INTEGER,
    "tokGrade" TEXT,
    "eeGrade" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentCourse" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "ibCourseId" TEXT NOT NULL,
    "level" "CourseLevel" NOT NULL,
    "grade" INTEGER NOT NULL,

    CONSTRAINT "StudentCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IBCourse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "group" INTEGER NOT NULL,

    CONSTRAINT "IBCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IBSchool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "subscriptionTier" "SubscriptionTier" NOT NULL DEFAULT 'REGULAR',
    "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "studentCount" INTEGER,
    "logo" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IBSchool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoordinatorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoordinatorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviatedName" TEXT,
    "description" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "classification" "UniversityType" NOT NULL,
    "studentPopulation" INTEGER,
    "logo" TEXT,
    "image" TEXT,
    "websiteUrl" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicProgram" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "fieldOfStudyId" TEXT NOT NULL,
    "degreeType" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "minIBPoints" INTEGER,
    "programUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramCourseRequirement" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "orGroupId" TEXT,
    "ibCourseId" TEXT NOT NULL,
    "requiredLevel" "CourseLevel" NOT NULL,
    "minGrade" INTEGER NOT NULL,
    "isCritical" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProgramCourseRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversityAgentProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UniversityAgentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldOfStudy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconName" TEXT,

    CONSTRAINT "FieldOfStudy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "flagEmoji" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedProgram" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FieldOfStudyToStudentProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FieldOfStudyToStudentProfile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CountryToStudentProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CountryToStudentProfile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "StudentProfile"("userId");

-- CreateIndex
CREATE INDEX "StudentProfile_schoolId_idx" ON "StudentProfile"("schoolId");

-- CreateIndex
CREATE INDEX "StudentProfile_totalIBPoints_idx" ON "StudentProfile"("totalIBPoints");

-- CreateIndex
CREATE INDEX "StudentCourse_studentProfileId_idx" ON "StudentCourse"("studentProfileId");

-- CreateIndex
CREATE INDEX "StudentCourse_ibCourseId_idx" ON "StudentCourse"("ibCourseId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentCourse_studentProfileId_ibCourseId_key" ON "StudentCourse"("studentProfileId", "ibCourseId");

-- CreateIndex
CREATE UNIQUE INDEX "IBCourse_code_key" ON "IBCourse"("code");

-- CreateIndex
CREATE INDEX "IBCourse_group_idx" ON "IBCourse"("group");

-- CreateIndex
CREATE UNIQUE INDEX "IBSchool_stripeCustomerId_key" ON "IBSchool"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "IBSchool_stripeSubscriptionId_key" ON "IBSchool"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "IBSchool_countryId_idx" ON "IBSchool"("countryId");

-- CreateIndex
CREATE INDEX "IBSchool_subscriptionTier_idx" ON "IBSchool"("subscriptionTier");

-- CreateIndex
CREATE UNIQUE INDEX "CoordinatorProfile_userId_key" ON "CoordinatorProfile"("userId");

-- CreateIndex
CREATE INDEX "CoordinatorProfile_schoolId_idx" ON "CoordinatorProfile"("schoolId");

-- CreateIndex
CREATE INDEX "University_countryId_idx" ON "University"("countryId");

-- CreateIndex
CREATE INDEX "University_name_idx" ON "University"("name");

-- CreateIndex
CREATE INDEX "AcademicProgram_fieldOfStudyId_idx" ON "AcademicProgram"("fieldOfStudyId");

-- CreateIndex
CREATE INDEX "AcademicProgram_universityId_idx" ON "AcademicProgram"("universityId");

-- CreateIndex
CREATE INDEX "AcademicProgram_minIBPoints_idx" ON "AcademicProgram"("minIBPoints");

-- CreateIndex
CREATE INDEX "AcademicProgram_name_idx" ON "AcademicProgram"("name");

-- CreateIndex
CREATE INDEX "ProgramCourseRequirement_programId_idx" ON "ProgramCourseRequirement"("programId");

-- CreateIndex
CREATE INDEX "ProgramCourseRequirement_ibCourseId_idx" ON "ProgramCourseRequirement"("ibCourseId");

-- CreateIndex
CREATE INDEX "ProgramCourseRequirement_orGroupId_idx" ON "ProgramCourseRequirement"("orGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "UniversityAgentProfile_userId_key" ON "UniversityAgentProfile"("userId");

-- CreateIndex
CREATE INDEX "UniversityAgentProfile_universityId_idx" ON "UniversityAgentProfile"("universityId");

-- CreateIndex
CREATE UNIQUE INDEX "FieldOfStudy_name_key" ON "FieldOfStudy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE INDEX "Country_code_idx" ON "Country"("code");

-- CreateIndex
CREATE INDEX "SavedProgram_studentProfileId_idx" ON "SavedProgram"("studentProfileId");

-- CreateIndex
CREATE INDEX "SavedProgram_programId_idx" ON "SavedProgram"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedProgram_studentProfileId_programId_key" ON "SavedProgram"("studentProfileId", "programId");

-- CreateIndex
CREATE INDEX "_FieldOfStudyToStudentProfile_B_index" ON "_FieldOfStudyToStudentProfile"("B");

-- CreateIndex
CREATE INDEX "_CountryToStudentProfile_B_index" ON "_CountryToStudentProfile"("B");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "IBSchool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_ibCourseId_fkey" FOREIGN KEY ("ibCourseId") REFERENCES "IBCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IBSchool" ADD CONSTRAINT "IBSchool_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordinatorProfile" ADD CONSTRAINT "CoordinatorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordinatorProfile" ADD CONSTRAINT "CoordinatorProfile_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "IBSchool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicProgram" ADD CONSTRAINT "AcademicProgram_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicProgram" ADD CONSTRAINT "AcademicProgram_fieldOfStudyId_fkey" FOREIGN KEY ("fieldOfStudyId") REFERENCES "FieldOfStudy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramCourseRequirement" ADD CONSTRAINT "ProgramCourseRequirement_programId_fkey" FOREIGN KEY ("programId") REFERENCES "AcademicProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramCourseRequirement" ADD CONSTRAINT "ProgramCourseRequirement_ibCourseId_fkey" FOREIGN KEY ("ibCourseId") REFERENCES "IBCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityAgentProfile" ADD CONSTRAINT "UniversityAgentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityAgentProfile" ADD CONSTRAINT "UniversityAgentProfile_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedProgram" ADD CONSTRAINT "SavedProgram_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedProgram" ADD CONSTRAINT "SavedProgram_programId_fkey" FOREIGN KEY ("programId") REFERENCES "AcademicProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FieldOfStudyToStudentProfile" ADD CONSTRAINT "_FieldOfStudyToStudentProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "FieldOfStudy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FieldOfStudyToStudentProfile" ADD CONSTRAINT "_FieldOfStudyToStudentProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToStudentProfile" ADD CONSTRAINT "_CountryToStudentProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToStudentProfile" ADD CONSTRAINT "_CountryToStudentProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
