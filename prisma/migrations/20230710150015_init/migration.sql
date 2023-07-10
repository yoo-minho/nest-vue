-- DropForeignKey
ALTER TABLE "LinksOnGroups" DROP CONSTRAINT "LinksOnGroups_groupId_fkey";

-- AddForeignKey
ALTER TABLE "LinksOnGroups" ADD CONSTRAINT "LinksOnGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
