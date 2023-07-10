-- DropForeignKey
ALTER TABLE "TagsOnGroups" DROP CONSTRAINT "TagsOnGroups_groupId_fkey";

-- AddForeignKey
ALTER TABLE "TagsOnGroups" ADD CONSTRAINT "TagsOnGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
