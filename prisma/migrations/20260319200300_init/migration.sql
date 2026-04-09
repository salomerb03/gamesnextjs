/*
  Warnings:

  - You are about to drop the column `manufacturer` on the `Console` table. All the data in the column will be lost.
  - You are about to drop the column `consoleId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Game` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `manuFacturer` to the `Console` table without a default value. This is not possible if the table is not empty.
  - Added the required column `console_id` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releasedate` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_consoleId_fkey";

-- AlterTable
ALTER TABLE "Console" DROP COLUMN "manufacturer",
ADD COLUMN     "manuFacturer" TEXT NOT NULL,
ALTER COLUMN "releaseDate" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "consoleId",
DROP COLUMN "releaseDate",
ADD COLUMN     "console_id" INTEGER NOT NULL,
ADD COLUMN     "releasedate" TIMESTAMP(0) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_title_key" ON "Game"("title");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_console_id_fkey" FOREIGN KEY ("console_id") REFERENCES "Console"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
