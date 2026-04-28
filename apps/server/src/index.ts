import { serve } from "@hono/node-server";
import { app, type AppType } from "./app";

export type { AppType };

const port = 3001;

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
