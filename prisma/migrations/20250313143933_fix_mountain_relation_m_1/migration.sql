/*
  Warnings:

  - You are about to drop the `_IslandToMountain` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MountainToProvince` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IslandToMountain" DROP CONSTRAINT "_IslandToMountain_A_fkey";

-- DropForeignKey
ALTER TABLE "_IslandToMountain" DROP CONSTRAINT "_IslandToMountain_B_fkey";

-- DropForeignKey
ALTER TABLE "_MountainToProvince" DROP CONSTRAINT "_MountainToProvince_A_fkey";

-- DropForeignKey
ALTER TABLE "_MountainToProvince" DROP CONSTRAINT "_MountainToProvince_B_fkey";

-- AlterTable
ALTER TABLE "Mountain" ADD COLUMN     "islandId" TEXT,
ADD COLUMN     "provinceId" TEXT;

-- DropTable
DROP TABLE "_IslandToMountain";

-- DropTable
DROP TABLE "_MountainToProvince";

-- AddForeignKey
ALTER TABLE "Mountain" ADD CONSTRAINT "Mountain_islandId_fkey" FOREIGN KEY ("islandId") REFERENCES "Island"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mountain" ADD CONSTRAINT "Mountain_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE SET NULL ON UPDATE CASCADE;
