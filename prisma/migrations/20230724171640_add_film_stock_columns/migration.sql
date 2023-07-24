/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `FilmStock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ISO` to the `FilmStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `FilmStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maker` to the `FilmStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `FilmStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FilmStock" ADD COLUMN     "ISO" INTEGER NOT NULL,
ADD COLUMN     "color" BOOLEAN NOT NULL,
ADD COLUMN     "maker" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FilmStock_name_key" ON "FilmStock"("name");
