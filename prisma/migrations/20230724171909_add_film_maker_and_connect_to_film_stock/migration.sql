/*
  Warnings:

  - You are about to drop the column `maker` on the `FilmStock` table. All the data in the column will be lost.
  - Added the required column `filmMakerId` to the `FilmStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FilmStock" DROP COLUMN "maker",
ADD COLUMN     "filmMakerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "FilmMaker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FilmMaker_id_key" ON "FilmMaker"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FilmMaker_name_key" ON "FilmMaker"("name");

-- AddForeignKey
ALTER TABLE "FilmStock" ADD CONSTRAINT "FilmStock_filmMakerId_fkey" FOREIGN KEY ("filmMakerId") REFERENCES "FilmMaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
