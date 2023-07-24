-- DropIndex
DROP INDEX "FilmStock_name_key";

-- AlterTable
ALTER TABLE "FilmStock" ADD COLUMN     "size" TEXT NOT NULL DEFAULT '35mm';
