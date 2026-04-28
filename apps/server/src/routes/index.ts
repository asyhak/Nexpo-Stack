import { Hono } from "hono";
import { users } from "./users";

export const apiRoutes = new Hono()
  .get("/", (c) => c.text("OK"))
  .route("/users", users);
