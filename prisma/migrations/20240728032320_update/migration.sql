/*
  Warnings:

  - You are about to drop the column `userId` on the `FavoriteProject` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[donorId,projectId]` on the table `FavoriteProject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `donorId` to the `FavoriteProject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FavoriteProject" DROP CONSTRAINT "FavoriteProject_userId_fkey";

-- DropIndex
DROP INDEX "FavoriteProject_userId_projectId_key";

-- AlterTable
ALTER TABLE "FavoriteProject" DROP COLUMN "userId",
ADD COLUMN     "donorId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteProject_donorId_projectId_key" ON "FavoriteProject"("donorId", "projectId");

-- AddForeignKey
ALTER TABLE "FavoriteProject" ADD CONSTRAINT "FavoriteProject_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donnor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
