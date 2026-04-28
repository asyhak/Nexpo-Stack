import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { Env } from "../types";

export const users = new Hono<Env>()
  .use("*", authMiddleware)
  .get("/", (c) => {
    return c.json([
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
      },
    ]);
  })
  .get("/me", (c) => {
    const user = c.get("user");
    return c.json(user);
  })
  .post("/", async (c) => {
    const body = await c.req.json();
    return c.json({ ...body, id: 999 });
  });
