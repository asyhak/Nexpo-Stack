import { auth } from "@repo/auth";
import { Hono } from "hono";
import { Env } from "../types";

export const authRoutes = new Hono<Env>()
  .on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));
