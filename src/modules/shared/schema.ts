import { z } from "@hono/zod-openapi";

export const ParamIdSchema = z.object({
  id: z.string(),
});

export const ParamSlugSchema = z.object({
  slug: z.string(),
});
