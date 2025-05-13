import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { mountainRoutes } from "./routes/mountain";
import { islandRoutes } from "./routes/island";
import { provinceRoutes } from "./routes/province";

const app = new OpenAPIHono();

app.use(cors());

app.route("/mountains", mountainRoutes);
app.route("/islands", islandRoutes);
app.route("/provinces", provinceRoutes);

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
