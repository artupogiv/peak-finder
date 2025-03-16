import { PrismaClient } from "@prisma/client";
import { sample } from "underscore";
import { islands, provinces, mountains } from "./data";

const prisma = new PrismaClient();

async function main() {
  for (const island of islands) {
    const resultIslands = await prisma.island.upsert({
      where: {
        slug: island.slug,
      },
      update: island,
      create: island,
    });

    console.log(`Island data created`);
  }

  for (const province of provinces) {
    const resultProvinces = await prisma.province.upsert({
      where: {
        slug: province.slug,
      },
      update: province,
      create: province,
    });

    console.log(`Province data created`);
  }

  
  for (const mountain of mountains) {
    await prisma.mountain.create({
      data: {
        ...mountain,
        islandSlug: islands.slug,
        provinceSlug: provinces.slug,
      },
    })
    };

    console.log(`Mountains data created`);
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
