-- DropForeignKey
ALTER TABLE "AboutPoint" DROP CONSTRAINT "AboutPoint_productId_fkey";

-- DropForeignKey
ALTER TABLE "ActiveIngredient" DROP CONSTRAINT "ActiveIngredient_productId_fkey";

-- DropForeignKey
ALTER TABLE "BenefitPoint" DROP CONSTRAINT "BenefitPoint_productId_fkey";

-- DropForeignKey
ALTER TABLE "Crop" DROP CONSTRAINT "Crop_cropId_fkey";

-- DropForeignKey
ALTER TABLE "FormulationType" DROP CONSTRAINT "FormulationType_productId_fkey";

-- AddForeignKey
ALTER TABLE "AboutPoint" ADD CONSTRAINT "AboutPoint_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BenefitPoint" ADD CONSTRAINT "BenefitPoint_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveIngredient" ADD CONSTRAINT "ActiveIngredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormulationType" ADD CONSTRAINT "FormulationType_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
