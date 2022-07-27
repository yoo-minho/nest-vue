/*
  Warnings:

  - The primary key for the `Count` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Count` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Count" DROP CONSTRAINT "Count_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Count_pkey" PRIMARY KEY ("groupId", "date");
