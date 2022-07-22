/*
  Warnings:

  - You are about to drop the column `name` on the `Link` table. All the data in the column will be lost.
  - Added the required column `title` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "name",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "imagePath" TEXT,
ADD COLUMN     "rssUrl" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LinksOnGroups" ALTER COLUMN "assignedAt" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "TagsOnGroups" ALTER COLUMN "assignedAt" SET DATA TYPE TIMESTAMPTZ(3);
