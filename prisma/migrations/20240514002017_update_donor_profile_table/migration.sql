/*
  Warnings:

  - You are about to drop the `DonnorProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DonnorProfile" DROP CONSTRAINT "DonnorProfile_userId_fkey";

-- AlterTable
ALTER TABLE "Donnor" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "following_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "uri" TEXT,
ADD COLUMN     "url" TEXT;

-- DropTable
DROP TABLE "DonnorProfile";
