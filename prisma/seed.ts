import { PrismaClient } from "@prisma/client";
import { islands, provinces, mountains } from "./data";

const prisma = new PrismaClient();

async function main() {
  for (const island of islands) {
    const resultIsland = await prisma.island.upsert({
      where: {
        slug: island.slug,
      },
      update: island,
      create: island,
    });

    console.log(`🏝️ Island: ${resultIsland.name}`);
  }

  for (const province of provinces) {
    const resultProvince = await prisma.province.upsert({
      where: {
        slug: province.slug,
      },
      update: province,
      create: province,
    });

    console.log(`📜 Province: ${resultProvince.name}`);
  }

  for (const mountain of mountains) {
    const { islandSlug, provinceSlug, ...mountainData } = mountain;

    const mountainInput = {
      ...mountainData,
      island: { connect: { slug: islandSlug } },
      province: { connect: { slug: provinceSlug } },
    };

    const resultMountain = await prisma.mountain.upsert({
      where: { name: mountainData.name },
      create: mountainInput,
      update: mountainInput,
    });

    console.log(`⛰️ Mountain: ${resultMountain.name}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
