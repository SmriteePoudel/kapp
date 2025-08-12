/*
  Warnings:

  - You are about to drop the column `year` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Education` table. All the data in the column will be lost.
  - The `career` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `skills` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `languages` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `hobbies` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `achievements` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `personality` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "year",
ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "organizationName" TEXT,
ADD COLUMN     "position" TEXT;

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "year",
ADD COLUMN     "activities" TEXT,
ADD COLUMN     "degree" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "endYear" INTEGER,
ADD COLUMN     "faculty" TEXT,
ADD COLUMN     "fieldOfStudy" TEXT,
ADD COLUMN     "schoolName" TEXT,
ADD COLUMN     "skills" TEXT,
ADD COLUMN     "startYear" INTEGER,
ADD COLUMN     "uniName" TEXT;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "achievements" JSONB NOT NULL,
ADD COLUMN     "ancestorsHierarchy" TEXT[],
ADD COLUMN     "citizenshipNo" TEXT,
ADD COLUMN     "contactInfo" JSONB,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "children" SET DATA TYPE TEXT,
DROP COLUMN "career",
ADD COLUMN     "career" JSONB,
DROP COLUMN "skills",
ADD COLUMN     "skills" JSONB,
DROP COLUMN "languages",
ADD COLUMN     "languages" JSONB,
DROP COLUMN "hobbies",
ADD COLUMN     "hobbies" JSONB,
DROP COLUMN "personality",
ADD COLUMN     "personality" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT[],
    "phone" TEXT[],
    "addressId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "careerJourney" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "memberId" INTEGER NOT NULL,
    "positionIncompany" TEXT,
    "skills" TEXT[],
    "careerType" TEXT NOT NULL,
    "location" TEXT,
    "locationType" JSONB,

    CONSTRAINT "careerJourney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyDetails" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT[],
    "description" TEXT,

    CONSTRAINT "FamilyDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "permanent" TEXT NOT NULL,
    "temporary" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_userId_key" ON "Member"("userId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
