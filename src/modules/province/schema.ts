import { z } from "@hono/zod-openapi";

export const ProvinceSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ProvincesSchema = z.array(ProvinceSchema);
