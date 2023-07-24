-- CreateTable
CREATE TABLE "FilmStock" (
    "id" SERIAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FilmStock_id_key" ON "FilmStock"("id");
