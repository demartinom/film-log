-- CreateTable
CREATE TABLE "Roll" (
    "id" SERIAL NOT NULL,
    "dateStarted" TIMESTAMP(3) NOT NULL,
    "dateFinished" TIMESTAMP(3),
    "filmStockId" INTEGER NOT NULL,
    "filmMakerId" INTEGER NOT NULL,
    "comments" TEXT,
    "user" TEXT NOT NULL,

    CONSTRAINT "Roll_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roll_id_key" ON "Roll"("id");

-- AddForeignKey
ALTER TABLE "Roll" ADD CONSTRAINT "Roll_filmStockId_fkey" FOREIGN KEY ("filmStockId") REFERENCES "FilmStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roll" ADD CONSTRAINT "Roll_filmMakerId_fkey" FOREIGN KEY ("filmMakerId") REFERENCES "FilmMaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
