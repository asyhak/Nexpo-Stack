import { env } from "@repo/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { apiRoutes } from "./routes";
import { Env } from "./types";

const app = new Hono<Env>();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: env.CORS_ORIGIN,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

const routes = app.route("/api", apiRoutes);

export { app };
export type AppType = typeof routes;
