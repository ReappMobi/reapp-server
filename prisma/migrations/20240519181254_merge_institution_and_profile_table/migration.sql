/*
  Warnings:

  - You are about to drop the `InstitutionProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `display_name` to the `Institution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InstitutionProfile" DROP CONSTRAINT "InstitutionProfile_institutionId_fkey";

-- AlterTable
ALTER TABLE "Institution" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "display_name" TEXT NOT NULL,
ADD COLUMN     "donations" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "followers_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "following_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "uri" TEXT,
ADD COLUMN     "url" TEXT;

-- DropTable
DROP TABLE "InstitutionProfile";
