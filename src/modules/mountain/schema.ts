import { z } from "@hono/zod-openapi";

export const MountainSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  elevation: z.number(),
  routes: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MountainsSchema = z.array(MountainSchema);
