import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ProvincesSchema } from "../schema/province";
import { prisma } from "../lib/prisma";
import { ParamSlugSchema } from "../schema/common";

export const provinceRoutes = new OpenAPIHono();

const tags = ["Provinces"];

// Get all provinces
provinceRoutes.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags,
    description: "Each provinces include mountains",
    responses: {
      200: {
        content: { "application/json": { schema: ProvincesSchema } },
        description: "Success get all provinces include mountains",
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

//Get a province by slug
provinceRoutes.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
    tags,
    summary: "Get a province by slug",
    description: "A province include mountains",
    request: { params: ParamSlugSchema },
    responses: {
      200: {
        content: { "application/json": { schema: ProvincesSchema } },
        description: "Success get a province by slug",
      },
      400: {
        description: "Province not found",
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");
    const province = await prisma.province.findUnique({
      where: { slug },
    });

    if (!province) {
      return c.json({ message: "Province not found" }, 404);
    }

    return c.json(province);
  }
);
