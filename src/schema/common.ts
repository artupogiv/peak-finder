import { z } from "@hono/zod-openapi";

export const ParamIdSchema = z.object({
  id: z.string().describe("The id of mountain"),
});
