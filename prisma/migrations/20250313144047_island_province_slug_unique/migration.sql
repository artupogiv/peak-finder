/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Island` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Province` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Island` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Province` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Island" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Province" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Island_slug_key" ON "Island"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Province_slug_key" ON "Province"("slug");
