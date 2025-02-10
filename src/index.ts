import { Hono } from "hono";

const app = new Hono();

type Mount = {
  id: number;
  name: string;
  island: string;
  province: string;
  elevation: number;
  status?: string; // active or not active
};

let mounts: Mount[] = [
  {
    id: 1,
    name: "Gunung Kerinci",
    island: "Sumatera",
    province: "Sumatera Barat",
    elevation: 3805,
  },
  {
    id: 2,
    name: "Gunung Sibayak",
    island: "Sumatera",
    province: "Sumatera Utara",
    elevation: 2212,
  },
  {
    id: 3,
    name: "Gunung Dempo",
    island: "Sumatera",
    province: "Sumatera Selatan",
    elevation: 3159,
  },
  {
    id: 4,
    name: "Gunung Leuser",
    island: "Sumatera",
    province: "Aceh",
    elevation: 3404,
  },
  {
    id: 5,
    name: "Gunung Slamet",
    island: "Jawa",
    province: "Jawa Tengah",
    elevation: 3428,
  },
  {
    id: 6,
    name: "Gunung Semeru",
    island: "Jawa",
    province: "Jawa Timur",
    elevation: 3676,
  },
  {
    id: 7,
    name: "Gunung Gede",
    island: "Jawa",
    province: "Jawa Barat",
    elevation: 2958,
  },
];

app.get("/", (c) => {
  return c.json({
    message: "Hello World!",
  });
});

// GET /mounts
app.get("/mounts", (c) => {
  return c.json(mounts);
});

// GET /mounts/:id
app.get("/mounts/:id", (c) => {
  const id = Number(c.req.param("id"));

  const mount = mounts.find((mount) => {
    return mount.id === id;
  });

  if (!mount) {
    return c.json({ message: "Mount not found" }, 404);
  }

  return c.json(mount);
});

// POST /mounts
app.post("/mounts", async (c) => {
  const body = await c.req.json();

  const newMount = [
    ...mounts,
    { ...body, id: mounts[mounts.length - 1].id + 1 },
  ];

  mounts = newMount;
});

export default app;
