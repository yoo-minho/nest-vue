/*
  Warnings:

  - You are about to drop the column `counterId` on the `Group` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Group_counterId_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "counterId";
