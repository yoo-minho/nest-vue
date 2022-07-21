-- DropIndex
DROP INDEX "Count_date_key";

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3);
