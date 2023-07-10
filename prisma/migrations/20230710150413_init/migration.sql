-- DropForeignKey
ALTER TABLE "Views" DROP CONSTRAINT "Views_groupDomain_fkey";

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_groupDomain_fkey" FOREIGN KEY ("groupDomain") REFERENCES "Group"("domain") ON DELETE CASCADE ON UPDATE CASCADE;
