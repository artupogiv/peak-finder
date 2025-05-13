import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ProvincesSchema } from "../schema/province";
import { prisma } from "../lib/prisma";

export const provinceRoutes = new OpenAPIHono();

const tags = ["Provinces"];

// Get all provinces
provinceRoutes.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags,
    summary: "Get all provinces",
    responses: {
      200: {
        content: { "application/json": { schema: ProvincesSchema } },
        description: "Success",
      },
      400: {
        description: "Provinces not found",
      },
    },
  }),
  async (c) => {
    try {
      const provinces = await prisma.province.findMany();

      return c.json(provinces);
    } catch (error) {
      console.error("Error fetching povinces", error);

      return c.json({ message: "Provinces not found" }, 404);
    }
  }
);
