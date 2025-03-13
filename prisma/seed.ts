import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type DataSeedMountain = {
  name: string;
  elevation: number;
};

let dataSeedMountains: DataSeedMountain[] = [
  {
    name: "Gunung Kerinci",
    elevation: 3805,
  },
  {
    name: "Gunung Sibayak",
    // island: "Sumatera",
    // province: "Sumatera Utara",
    elevation: 2212,
  },
  {
    name: "Gunung Dempo",
    // island: "Sumatera",
    // province: "Sumatera Selatan",
    elevation: 3159,
  },
  {
    name: "Gunung Leuser",
    // island: "Sumatera",
    // province: "Aceh",
    elevation: 3404,
  },
  {
    name: "Gunung Slamet",
    // island: "Jawa",
    // province: "Jawa Tengah",
    elevation: 3428,
  },
  {
    name: "Gunung Semeru",
    // island: "Jawa",
    // province: "Jawa Timur",
    elevation: 3676,
  },
  {
    name: "Gunung Gede",
    // island: "Jawa",
    // province: "Jawa Barat",
    elevation: 2958,
  },
];

async function seedMountains() {
  for (const dataSeedMountain of dataSeedMountains) {
    const mountain = await prisma.mountain.create({
      data: dataSeedMountain,
    });

    console.log(`Mountain: ${mountain.name}`);
  }
}

async function main() {
  await seedMountains();
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
