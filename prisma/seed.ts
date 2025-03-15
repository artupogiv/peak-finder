import { PrismaClient } from "@prisma/client";
import { sample} from "underscore";
import { islands, provinces, mountains } from "./data";

const prisma = new PrismaClient();

async function main() {
  const resultIslands = await prisma.island.createManyAndReturn({
    data: islands,
    select: {
      id: true,
    },
  });
  console.log("Island data created");

  const resultProvinces = await prisma.province.createManyAndReturn({
    data: provinces,
    select: {
      id: true,
    },
  });
  console.log("Province data created");

  for (const mountain of mountains) {
    await prisma.mountain.create({
      data: {
        ...mountain,
        islands: {
          connect: sample(resultIslands, 1),
        },
        provinces: {
          connect: sample(resultProvinces, 1),
      },
    }
    });

    console.log(`Mountains data created`);
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
