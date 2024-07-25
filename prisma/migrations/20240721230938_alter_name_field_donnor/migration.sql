/*
  Warnings:

  - You are about to drop the column `telephone` on the `Donnor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Donnor" DROP COLUMN "telephone",
ADD COLUMN     "phone" TEXT;
