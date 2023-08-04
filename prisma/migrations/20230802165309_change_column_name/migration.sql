/*
  Warnings:

  - You are about to drop the column `size` on the `FilmStock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FilmStock" DROP COLUMN "size",
ADD COLUMN     "format" TEXT NOT NULL DEFAULT '35mm';
