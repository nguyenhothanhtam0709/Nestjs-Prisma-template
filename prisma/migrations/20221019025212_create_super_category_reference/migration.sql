-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "superCategoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_superCategoryId_fkey" FOREIGN KEY ("superCategoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
