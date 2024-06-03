/*
  Warnings:

  - You are about to alter the column `amount` on the `Donation` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Donation" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);
