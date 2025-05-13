import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../lib/prisma";
import { IslandsSchema } from "../schema/island";

export const islandRoutes = new OpenAPIHono();

const tags = ["Islands"];

//Get all islands
islandRoutes.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags,
    summary: "Get all islands",
    description: "Each islands include mountains",
    responses: {
      200: {
        content: { "application/json": { schema: IslandsSchema } },
        description: "Success get all islands",
      },
      400: {
        description: "Islands not found",
      },
    },
  }),
  async (c) => {
    try {
      const islands = await prisma.island.findMany({
        include: {
          mountains: true,
        },
      });

      return c.json(islands);
    } catch (error) {
      console.error("Error fetching islands", error);

      return c.json({ message: "Islands not found" }, 404);
    }
  }
);
