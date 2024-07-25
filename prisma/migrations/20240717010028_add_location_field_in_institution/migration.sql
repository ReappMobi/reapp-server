/*
  Warnings:

  - Added the required column `location` to the `Institution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Institution" ADD COLUMN     "location" TEXT NOT NULL;
