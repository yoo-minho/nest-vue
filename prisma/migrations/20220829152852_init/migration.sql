-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "scrapAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;