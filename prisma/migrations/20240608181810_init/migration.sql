/*
  Warnings:

  - The `meaning` column on the `WordOfTheDay` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "WordOfTheDay" DROP COLUMN "meaning",
ADD COLUMN     "meaning" TEXT[];
