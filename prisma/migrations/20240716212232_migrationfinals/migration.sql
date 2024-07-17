/*
  Warnings:

  - You are about to drop the column `categories` on the `Games` table. All the data in the column will be lost.
  - You are about to drop the `GamesOnLibrary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Libraries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnGames" DROP CONSTRAINT "CategoriesOnGames_category_id_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnGames" DROP CONSTRAINT "CategoriesOnGames_game_id_fkey";

-- DropForeignKey
ALTER TABLE "GamesOnLibrary" DROP CONSTRAINT "GamesOnLibrary_game_id_fkey";

-- DropForeignKey
ALTER TABLE "GamesOnLibrary" DROP CONSTRAINT "GamesOnLibrary_library_id_fkey";

-- DropForeignKey
ALTER TABLE "Libraries" DROP CONSTRAINT "Libraries_user_id_fkey";

-- AlterTable
ALTER TABLE "CategoriesOnGames" ALTER COLUMN "game_id" DROP NOT NULL,
ALTER COLUMN "category_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Games" DROP COLUMN "categories";

-- DropTable
DROP TABLE "GamesOnLibrary";

-- DropTable
DROP TABLE "Libraries";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "game_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_user_id_key" ON "Transaction"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_game_id_key" ON "Transaction"("game_id");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Games"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnGames" ADD CONSTRAINT "CategoriesOnGames_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Games"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnGames" ADD CONSTRAINT "CategoriesOnGames_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
