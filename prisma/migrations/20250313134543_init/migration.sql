-- CreateTable
CREATE TABLE "Mountain" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "elevation" INTEGER NOT NULL,
    "peak" VARCHAR(255) NOT NULL,
    "routes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mountain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Island" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Island_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MountainToProvince" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MountainToProvince_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_IslandToMountain" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_IslandToMountain_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mountain_name_key" ON "Mountain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Mountain_peak_key" ON "Mountain"("peak");

-- CreateIndex
CREATE INDEX "_MountainToProvince_B_index" ON "_MountainToProvince"("B");

-- CreateIndex
CREATE INDEX "_IslandToMountain_B_index" ON "_IslandToMountain"("B");

-- AddForeignKey
ALTER TABLE "_MountainToProvince" ADD CONSTRAINT "_MountainToProvince_A_fkey" FOREIGN KEY ("A") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MountainToProvince" ADD CONSTRAINT "_MountainToProvince_B_fkey" FOREIGN KEY ("B") REFERENCES "Province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IslandToMountain" ADD CONSTRAINT "_IslandToMountain_A_fkey" FOREIGN KEY ("A") REFERENCES "Island"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IslandToMountain" ADD CONSTRAINT "_IslandToMountain_B_fkey" FOREIGN KEY ("B") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
