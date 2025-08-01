import { z } from "@hono/zod-openapi";
import { MountainSchema } from "../mountain/schema";
import { ProvinceSchema } from "../province/schema";
import { IslandSchema } from "../island/schema";

export const ParamIdSchema = z.object({
  id: z.string(),
});

export const ParamSlugSchema = z.object({
  slug: z.string(),
});

export const SearchSchema = z.object({
  mountains: z.array(MountainSchema),
  provinces: z.array(ProvinceSchema),
  islands: z.array(IslandSchema),
});
