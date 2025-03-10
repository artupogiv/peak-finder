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
  const mountains = await prisma.mountain.findMany();

  return c.json(mountains);
});

// GET /mountains/:id
app.get("/mountains/:id", (c) => {
  const id = Number(c.req.param("id"));

  const mountain = null;

  if (!mountain) {
    return c.json({ message: "Mountain not found" }, 404);
  }

  return c.json(mountain);
});

// POST /mountains
app.post("/mountains", async (c) => {
  const body = await c.req.json();

  const newMountain = null;

  return c.json({
    message: "Mountain added",
    data: newMountain,
  });
});

// DELETE all mountains
app.delete("/mountains", (c) => {
  // TODO: Delete via Prisma

  return c.json({
    message: "Mountains deleted",
  });
});

// DELETE a mountain by id
app.delete("/mountains/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const foundMountain = null;

  if (!foundMountain) {
    return c.json({ message: "Mountain not found" }, 404);
  }

  return c.json({ message: "Mountain deleted" });
});

// PATCH update a mountain by id
app.patch("/mountains/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const foundMountain = null;

  if (!foundMountain) {
    return c.json({ message: "Mountain not found" }, 404);
  }

  return c.json({ message: "Mountains udpated" });
});

export default app;
