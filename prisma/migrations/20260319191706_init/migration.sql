/*
  Warnings:

  - Added the required column `releaseDate` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL;
