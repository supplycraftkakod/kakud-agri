/*
  Warnings:

  - Added the required column `blogId` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "blogId" TEXT NOT NULL;
