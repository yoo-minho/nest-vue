/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Post_title_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "url" TEXT NOT NULL;
