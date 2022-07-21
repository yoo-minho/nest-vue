/*
  Warnings:

  - You are about to drop the `TagOnGroups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagOnGroups" DROP CONSTRAINT "TagOnGroups_groupId_fkey";

-- DropForeignKey
ALTER TABLE "TagOnGroups" DROP CONSTRAINT "TagOnGroups_tagId_fkey";

-- DropTable
DROP TABLE "TagOnGroups";

-- CreateTable
CREATE TABLE "TagsOnGroups" (
    "groupId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnGroups_pkey" PRIMARY KEY ("groupId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagsOnGroups_groupId_key" ON "TagsOnGroups"("groupId");

-- AddForeignKey
ALTER TABLE "TagsOnGroups" ADD CONSTRAINT "TagsOnGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnGroups" ADD CONSTRAINT "TagsOnGroups_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
