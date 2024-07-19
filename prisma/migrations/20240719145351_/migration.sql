/*
  Warnings:

  - You are about to drop the `CategoriesOnGames` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnGames" DROP CONSTRAINT "CategoriesOnGames_category_id_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnGames" DROP CONSTRAINT "CategoriesOnGames_game_id_fkey";

-- DropTable
DROP TABLE "CategoriesOnGames";

-- CreateTable
CREATE TABLE "_CategoriesToGames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesToGames_AB_unique" ON "_CategoriesToGames"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesToGames_B_index" ON "_CategoriesToGames"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "_CategoriesToGames" ADD CONSTRAINT "_CategoriesToGames_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToGames" ADD CONSTRAINT "_CategoriesToGames_B_fkey" FOREIGN KEY ("B") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
