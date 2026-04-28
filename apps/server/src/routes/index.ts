import { Hono } from "hono";
import { users } from "./users";
import { authRoutes } from "./auth";
import { Env } from "../types";

export const apiRoutes = new Hono<Env>()
  .get("/", (c) => c.text("OK"))
  .route("/auth", authRoutes)
  .route("/users", users);
