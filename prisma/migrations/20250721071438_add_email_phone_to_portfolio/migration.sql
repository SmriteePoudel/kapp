/*
  Warnings:

  - Added the required column `name` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;
