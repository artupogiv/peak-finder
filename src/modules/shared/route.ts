import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { SearchSchema } from "./schema";
import { where } from "underscore";
import { prisma } from "../../lib/prisma";

export const searchRoute = new OpenAPIHono();

const tags = ["Search"];

// Search all
searchRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags,
    summary: "Search all",
    description: "Search all mountains, provinces, islands",
    request: { query: z.object({ q: z.string().min(1) }) },
    responses: {
      200: {
        content: { "application/json": { schema: SearchSchema } },
        description: "Search result",
      },
      400: {
        description: "Search not found",
      },
    },
  }),
  async (c) => {
    const q = c.req.query("q");

    try {
      const mountains = await prisma.mountain.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
          ],
        },
        include: {
          province: true,
          island: true,
        },
      });

      const provinces = await prisma.province.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
          ],
        },
      });

      const islands = await prisma.island.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
          ],
        },
      });

      return c.json({ mountains, provinces, islands }, 200);
    } catch (error) {
      return c.json({ message: "Search not found" }, 404);
    }
  }
);
