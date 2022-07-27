/*
  Warnings:

  - The primary key for the `Count` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `groupId` on the `Count` table. All the data in the column will be lost.
  - Added the required column `groupDomain` to the `Count` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Count" DROP CONSTRAINT "Count_groupId_fkey";

-- AlterTable
ALTER TABLE "Count" DROP CONSTRAINT "Count_pkey",
DROP COLUMN "groupId",
ADD COLUMN     "groupDomain" TEXT NOT NULL,
ADD CONSTRAINT "Count_pkey" PRIMARY KEY ("groupDomain", "date");

-- AddForeignKey
ALTER TABLE "Count" ADD CONSTRAINT "Count_groupDomain_fkey" FOREIGN KEY ("groupDomain") REFERENCES "Group"("domain") ON DELETE RESTRICT ON UPDATE CASCADE;
