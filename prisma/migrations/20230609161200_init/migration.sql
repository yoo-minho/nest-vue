/*
  Warnings:

  - The primary key for the `Access` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createrId` on the `Access` table. All the data in the column will be lost.
  - You are about to drop the column `id2` on the `Access` table. All the data in the column will be lost.
  - Added the required column `userAgent` to the `Access` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Access` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Access" DROP CONSTRAINT "Access_createrId_fkey";

-- AlterTable
ALTER TABLE "Access" DROP CONSTRAINT "Access_pkey",
DROP COLUMN "createrId",
DROP COLUMN "id2",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "userAgent" TEXT NOT NULL,
ADD COLUMN     "userId" VARCHAR(100) NOT NULL,
ADD CONSTRAINT "Access_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
