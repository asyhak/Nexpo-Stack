import { Hono } from "hono";

export const users = new Hono()
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
  .post("/", async (c) => {
    const body = await c.req.json();
    return c.json({ ...body, id: 999 });
  });
