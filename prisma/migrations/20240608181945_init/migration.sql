/*
  Warnings:

  - You are about to drop the column `meaning` on the `WordOfTheDay` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WordOfTheDay" DROP COLUMN "meaning",
ADD COLUMN     "meanings" TEXT[];
