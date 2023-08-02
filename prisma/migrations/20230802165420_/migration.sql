/*
  Warnings:

  - A unique constraint covering the columns `[name,ISO,format]` on the table `FilmStock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FilmStock_name_ISO_format_key" ON "FilmStock"("name", "ISO", "format");
