import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { mountainRoutes } from "./routes/mountain";

const app = new OpenAPIHono();

app.use(cors());

app.route("/mountains", mountainRoutes);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Peak Finder API",
    description: "⛰️ A simple API for peak finder",
  },
});

app.get(
  "/",
  Scalar({
    pageTitle: "Peak Finder API",
    theme: "saturn",
    spec: { url: "/openapi.json" },
  })
);

export default app;
