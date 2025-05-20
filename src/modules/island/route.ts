import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";

import { ParamSlugSchema } from "../shared/schema";
import { IslandsSchema } from "./schema";

export const islandsRoute = new OpenAPIHono();

const tags = ["Islands"];

//Get all islands
islandsRoute.openapi(
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

//Get an island by slug
islandsRoute.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
    tags,
    summary: "Get an island by slug",
    description: "An island include mountains",
    request: { params: ParamSlugSchema },
    responses: {
      200: {
        content: { "application/json": { schema: IslandsSchema } },
        description: "Success get an island by slug",
      },
      400: {
        description: "Island not found",
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");
    const island = await prisma.island.findUnique({
      where: { slug },
      include: {
        mountains: true,
      },
    });

    if (!island) {
      return c.json({ message: "Island not found" }, 404);
    }

    return c.json(island);
  }
);
