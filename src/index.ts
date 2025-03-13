import { Hono } from "hono";
import { prisma } from "./lib/prisma";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Peak Finder API",
    description: "A simple API for peak finder",
  });
});

// GET /mountains
app.get("/mountains", async (c) => {
  // const mountains = await prisma.mountain.findMany();

  // return c.json(mountains);

  try {
    const mountains = await prisma.mountain.findMany();

    return c.json(mountains);
  } catch (error) {
    return c.json({ message: "Failed to fetch mountains" }, 500);
  }
});

// GET /mountains/:id
app.get("/mountains/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const mountain = await prisma.mountain.findUnique({
    where: { id },
  });

  if (!mountain) {
    return c.json({ message: "Mountain not found" }, 404);
  }

  return c.json(mountain);
});

// POST /mountains
app.post("/mountains", async (c) => {
  const body = await c.req.json();

  const newMountain = await prisma.mountain.create({
    data: {
      name: body.name,
      elevation: body.elevation,
    },
  });

  return c.json({
    message: "Mountain added",
    data: newMountain,
  });
});

// DELETE all mountains
app.delete("/mountains", async (c) => {
  const result = await prisma.mountain.deleteMany();

  return c.json({
    data: result,
    message: "Mountains deleted",
  });
});

// DELETE a mountain by id
app.delete("/mountains/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));

    const foundMountain = await prisma.mountain.delete({
      where: { id: id },
    });

    return c.json({ message: "Mountain deleted", data: foundMountain }, 200);
  } catch (error) {
    return c.json({ message: "Mountain not found" }, 404);
  }
});

// PATCH update a mountain by id
app.patch("/mountains/:id", async (c) => {
  // const id = Number(c.req.param("id"));
  // const foundMountain = null;
  // if (!foundMountain) {
  //   return c.json({ message: "Mountain not found" }, 404);
  // }
  // return c.json({ message: "Mountains udpated" });
});

export default app;
