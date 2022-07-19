/*
  Warnings:

  - A unique constraint covering the columns `[groupId]` on the table `Count` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupId` to the `Count` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_counterId_fkey";

-- AlterTable
ALTER TABLE "Count" ADD COLUMN     "groupId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Count_groupId_key" ON "Count"("groupId");

-- AddForeignKey
ALTER TABLE "Count" ADD CONSTRAINT "Count_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
