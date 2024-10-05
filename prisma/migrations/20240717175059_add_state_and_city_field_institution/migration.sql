/*
  Warnings:

  - You are about to drop the column `location` on the `Institution` table. All the data in the column will be lost.
  - Added the required column `city` to the `Institution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Institution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "location",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
