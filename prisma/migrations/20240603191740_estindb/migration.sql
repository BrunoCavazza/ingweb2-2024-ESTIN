/*
  Warnings:

  - You are about to drop the `Pictures` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mainPicture` to the `Games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pictures" DROP CONSTRAINT "Pictures_game_id_fkey";

-- AlterTable
ALTER TABLE "Games" ADD COLUMN     "mainPicture" TEXT NOT NULL,
ADD COLUMN     "pictures" TEXT[];

-- AlterTable
CREATE SEQUENCE users_wallet_id_seq;
ALTER TABLE "Users" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "wallet_id" SET DEFAULT nextval('users_wallet_id_seq');
ALTER SEQUENCE users_wallet_id_seq OWNED BY "Users"."wallet_id";

-- DropTable
DROP TABLE "Pictures";
