/*
  Warnings:

  - You are about to drop the column `category` on the `Institution` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Institution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CategoryInstitution" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CategoryInstitution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Institution" ADD CONSTRAINT "Institution_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryInstitution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
