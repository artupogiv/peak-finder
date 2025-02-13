import { Hono } from "hono";

const app = new Hono();

type Mountain = {
  id: number;
  name: string;
  island: string;
  province: string;
  elevation: number;
  status?: string; // active or not active
};

let mountains: Mountain[] = [
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
    message: "Peak Finder API",
  });
});

// GET /mountains
app.get("/mountains", (c) => {
  return c.json(mountains);
});

// GET /mountains/:id
app.get("/mountains/:id", (c) => {
  const id = Number(c.req.param("id"));

  const mountain = mountains.find((mountain) => {
    return mountain.id === id;
  });

  if (!mountain) {
    return c.json({ message: "Mountain not found" }, 404);
  }

  return c.json(mountain);
});

// POST /mountains
app.post("/mountains", async (c) => {
  const body = await c.req.json();

  const newMountain = {
    id: mountains[mountains.length - 1].id + 1,
    ...body,
  };

  mountains = [...mountains, newMountain];

  return c.json({
    message: "Mountain added",
    data: newMountain,
  });
});

// DELETE all mountains
app.delete("/mountains", (c) => {
  mountains = [];

  return c.json({
    message: "Mountains deleted",
  });
});

// DELETE a mountain by id
app.delete("/mountains/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const foundMountain = mountains.find((mountain) => mountain.id === id);

  if (!foundMountain) {
    return c.json({ message: "Mountain not found" }, 404);
  }

  const updatedMountains = mountains.filter((m) => m.id !== id);

  mountains = updatedMountains;

  return c.json({ message: "Mountain deleted" });
});

// PATCH update a mountain by id
app.patch("/mountains/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const foundMountain = mountains.find((mountain) => mountain.id === id);

  if (!foundMountain) {
    return c.json({ message: "Mountain not found" }, 404);
  }

  const body = await c.req.json();

  const updatedMountain = { ...foundMountain, ...body };

  const updatedMountains = mountains.map((mountain) =>
    mountain.id === id ? updatedMountain : mountain
  );

  mountains = updatedMountains;

  return c.json({ message: "Mountains udpated", data: updatedMountains });
});

export default app;
