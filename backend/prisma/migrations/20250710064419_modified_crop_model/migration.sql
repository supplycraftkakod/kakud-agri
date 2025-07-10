/*
  Warnings:

  - You are about to drop the column `name` on the `Crop` table. All the data in the column will be lost.
  - You are about to drop the `_ProductCrops` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[content]` on the table `Crop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Crop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cropId` to the `Crop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductCrops" DROP CONSTRAINT "_ProductCrops_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductCrops" DROP CONSTRAINT "_ProductCrops_B_fkey";

-- DropIndex
DROP INDEX "Crop_name_key";

-- AlterTable
ALTER TABLE "Crop" DROP COLUMN "name",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "cropId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ProductCrops";

-- CreateIndex
CREATE UNIQUE INDEX "Crop_content_key" ON "Crop"("content");

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
