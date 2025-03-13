import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type DataSeedMountain = {
  name: string;
  elevation: number;
  peak: string;
  routes: string[];
};

let dataSeedMountains: DataSeedMountain[] = [
  {
    name: "Gunung Kerinci",
    elevation: 3805,
    peak: "Puncak Indrapura",
    routes: ["Kersik Tuo", "Solok Selatan"],
  },
  {
    name: "Gunung Sibayak",
    // island: "Sumatera",
    // province: "Sumatera Utara",
    elevation: 2212,
    peak: "Puncak Deleng Pintau",
    routes: ["Desa Raja Berneh", "Desa Jaranguda", "Jalur 54"],
  },
  {
    name: "Gunung Dempo",
    // island: "Sumatera",
    // province: "Sumatera Selatan",
    elevation: 3159,
    peak: "Puncak Pagar Alam",
    routes: ["Kampung IV", "Tugu Rimau", "Jara"],
  },
  {
    name: "Gunung Leuser",
    // island: "Sumatera",
    // province: "Aceh",
    elevation: 3404,
    peak: "Puncak Leuser",
    routes: ["Kedah", "Agusan", "Meukek"],
  },
  {
    name: "Gunung Slamet",
    // island: "Jawa",
    // province: "Jawa Tengah",
    elevation: 3428,
    peak: "Puncak Surono",
    routes: ["Bambangan", "Baturraden", "Kaliwadas", "Guci"],
  },
  {
    name: "Gunung Semeru",
    // island: "Jawa",
    // province: "Jawa Timur",
    elevation: 3676,
    peak: "Puncak Mahameru",
    routes: ["Ranu Pane", "Watu Rejeng"],
  },
  {
    name: "Gunung Gede",
    // island: "Jawa",
    // province: "Jawa Barat",
    elevation: 2958,
    peak: "Puncak Mandalawangi",
    routes: ["Cibodas", "Gunung Putri", "Selabintana"],
  },
  {
    name: "Gunung Agung",
    // island: "Bali",
    // province: "Bali",
    elevation: 3141,
    peak: "Puncak Agung",
    routes: ["Pura Pasar Agung", "Pura Besakih", "Sebudi"],
  },
  {
    name: "Gunung Rinjani",
    // island: "Nusa Tenggara",
    // province: "Nusa Tenggara Barat",
    peak: "Puncak Dewi Anjani",
    elevation: 3726,
    routes: [
      "Sembalun",
      "Senaru",
      "Torean",
      "Timbanuh",
      "Tetebatu",
      "Aik Berik",
    ],
  },
  {
    name: "Gunung Nangi",
    // island: "Nusa Tenggara",
    // province: "Nusa Tenggara Barat",
    elevation: 2330,
    peak: "Puncak Nangi",
    routes: ["Wae Rebo"],
  },
  {
    name: "Gunung Bukit Raya",
    // island: "Kalimantan",
    // province: "Kalimantan Tengah",
    elevation: 2278,
    peak: "Puncak Bukit Raya",
    routes: ["Desa Tumbang Habanoi", "Desa Rantau Malam"],
  },
  {
    name: "Gunung Latimojong",
    // island: "Sulawesi",
    // province: "Sulawesi Selatan",
    elevation: 3478,
    peak: "Puncak Rantemario",
    routes: ["Karangan"],
  },
  {
    name: "Gunung Binaya",
    // island: "Maluku",
    // province: "Maluku",
    elevation: 3027,
    peak: "Puncak Binaya",
    routes: ["Jalur utara (Desa Piliana)", "Jalur selatan (Desa Moso)"],
  },
  {
    name: "Gunung Jaya Wijaya",
    // island: "Papua",
    // province: "Papua Tengah",
    elevation: 4884,
    peak: "Puncak Carstensz",
    routes: ["PT Freeeport Indonesia", "Sugapa", "Ilaga"],
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
