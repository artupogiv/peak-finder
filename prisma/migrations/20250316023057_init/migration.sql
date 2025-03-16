-- CreateTable
CREATE TABLE "Mountain" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "elevation" INTEGER NOT NULL,
    "peak" VARCHAR(255) NOT NULL,
    "routes" TEXT[],
    "islandId" TEXT,
    "provinceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mountain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Island" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Island_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mountain_name_key" ON "Mountain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Mountain_peak_key" ON "Mountain"("peak");

-- CreateIndex
CREATE UNIQUE INDEX "Island_slug_key" ON "Island"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Province_slug_key" ON "Province"("slug");

-- AddForeignKey
ALTER TABLE "Mountain" ADD CONSTRAINT "Mountain_islandId_fkey" FOREIGN KEY ("islandId") REFERENCES "Island"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mountain" ADD CONSTRAINT "Mountain_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE SET NULL ON UPDATE CASCADE;
