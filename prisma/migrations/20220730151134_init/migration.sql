/*
  Warnings:

  - You are about to drop the `Count` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Count" DROP CONSTRAINT "Count_groupDomain_fkey";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "totalViews" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Count";

-- CreateTable
CREATE TABLE "Views" (
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "groupDomain" TEXT NOT NULL,

    CONSTRAINT "Views_pkey" PRIMARY KEY ("groupDomain","date")
);

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_groupDomain_fkey" FOREIGN KEY ("groupDomain") REFERENCES "Group"("domain") ON DELETE RESTRICT ON UPDATE CASCADE;
