import { Mountain } from "@prisma/client";

type DataMountain = Omit<Mountain, "createdAt" | "updatedAt">;

let dataMountains: DataMountain[] = [
  {
    id: 1,
    name: "Gunung Kerinci",
    elevation: 3805,
  },
  {
    id: 2,
    name: "Gunung Sibayak",
    // island: "Sumatera",
    // province: "Sumatera Utara",
    elevation: 2212,
  },
  {
    id: 3,
    name: "Gunung Dempo",
    // island: "Sumatera",
    // province: "Sumatera Selatan",
    elevation: 3159,
  },
  {
    id: 4,
    name: "Gunung Leuser",
    // island: "Sumatera",
    // province: "Aceh",
    elevation: 3404,
  },
  {
    id: 5,
    name: "Gunung Slamet",
    // island: "Jawa",
    // province: "Jawa Tengah",
    elevation: 3428,
  },
  {
    id: 6,
    name: "Gunung Semeru",
    // island: "Jawa",
    // province: "Jawa Timur",
    elevation: 3676,
  },
  {
    id: 7,
    name: "Gunung Gede",
    // island: "Jawa",
    // province: "Jawa Barat",
    elevation: 2958,
  },
];
