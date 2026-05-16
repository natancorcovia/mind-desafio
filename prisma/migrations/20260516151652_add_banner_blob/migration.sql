/*
  Warnings:

  - You are about to drop the column `bannerUrl` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "bannerUrl",
ADD COLUMN     "bannerData" BYTEA,
ADD COLUMN     "bannerMimeType" TEXT;
