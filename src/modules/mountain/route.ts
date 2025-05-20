import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import { MountainsSchema } from "./schema";
import { ParamIdSchema, ParamSlugSchema } from "../shared/schema";

export const mountainsRoute = new OpenAPIHono();

const tags = ["Mountains"];

// Get all mountains
mountainsRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags,
    summary: "Get all mountains",
    description: "Each mountain include province and island",
    responses: {
      200: {
        content: { "application/json": { schema: MountainsSchema } },
        description: "Success",
      },
      400: {
        description: "Mountains not found",
      },
    },
  }),
  async (c) => {
    try {
      const mountains = await prisma.mountain.findMany({
        include: {
          province: true,
          island: true,
        },
      });

      return c.json(mountains);
    } catch (error) {
      console.error("Error fetching mountains", error);

      return c.json({ message: "Failed to fetch mountains" }, 500);
    }
  }
);

// Get a mountain by id
mountainsRoute.openapi(
  createRoute({
    method: "get",
    path: "/id/{id}",
    tags,
    summary: "Get a mountain by id",
    description: "A mountain include province and island",
    request: { params: ParamIdSchema },
    responses: {
      200: {
        content: { "application/json": { schema: MountainsSchema } },
        description: "Success get a mountain by id",
      },
      400: {
        description: "Mountains not found",
      },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");
    const mountains = await prisma.mountain.findUnique({
      where: { id },
      include: {
        province: true,
        island: true,
      },
    });

    if (!mountains) {
      return c.json({ message: "Mountain not found" }, 404);
    }

    return c.json(mountains);
  }
);

// Get a mountain by slug
mountainsRoute.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
    tags,
    summary: "Get a mountain by slug",
    description: "Get a mountain by slug",
    request: { params: ParamSlugSchema },
    responses: {
      200: {
        content: { "application/json": { schema: MountainsSchema } },
        description: "Success get a mountain by slug",
      },
      400: {
        description: "Mountain not found",
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");
    const mountain = await prisma.mountain.findUnique({
      where: { slug },
      include: {
        province: true,
        island: true,
      },
    });

    if (!mountain) {
      return c.json({ message: "Mountain not found" }, 404);
    }

    return c.json(mountain);
  }
);

// // POST /mountains
// mountainRoutes.post("/mountains", async (c) => {
//   const body = await c.req.json();

//   const newMountain = await prisma.mountain.create({
//     data: {
//       name: body.name,
//       elevation: body.elevation,
//       peak: body.peak,
//       island: {
//         connect: {
//           id: body.islandId,
//           slug: body.islandSlug ?? undefined,
//         },
//       },
//     },
//     include: {
//       province: true,
//       island: true,
//     },
//   });

//   return c.json({
//     message: "Mountain added",
//     data: newMountain,
//   });
// });

// // DELETE all mountains
// mountainRoutes.delete("/mountains", async (c) => {
//   const result = await prisma.mountain.deleteMany();

//   return c.json({
//     data: result,
//     message: "Mountains deleted",
//   });
// });

// // DELETE a mountain by id
// mountainRoutes.delete("/mountains/:id", async (c) => {
//   try {
//     const id = c.req.param("id");

//     const foundMountain = await prisma.mountain.delete({
//       where: { id },
//     });

//     return c.json({ message: "Mountain deleted", data: foundMountain }, 200);
//   } catch (error) {
//     return c.json({ message: "Mountain not found" }, 404);
//   }
// });

// // PATCH update a mountain by id
// mountainRoutes.patch("/mountains/:id", async (c) => {
//   // const id = Number(c.req.param("id"));
//   // const foundMountain = null;
//   // if (!foundMountain) {
//   //   return c.json({ message: "Mountain not found" }, 404);
//   // }
//   // return c.json({ message: "Mountains udpated" });
// });
