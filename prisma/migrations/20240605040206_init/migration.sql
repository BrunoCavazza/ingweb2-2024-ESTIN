/*
  Warnings:

  - You are about to drop the column `buy_timestamp` on the `Libraries` table. All the data in the column will be lost.
  - Added the required column `tmp_game_id` to the `Libraries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Libraries" DROP COLUMN "buy_timestamp",
ADD COLUMN     "tmp_game_id" INTEGER NOT NULL;
