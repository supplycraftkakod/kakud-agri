/*
  Warnings:

  - Added the required column `paragraph` to the `Banner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "paragraph" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
