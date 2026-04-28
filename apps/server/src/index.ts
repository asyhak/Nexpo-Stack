import { serve } from "@hono/node-server";
import { app } from "./app";
import { apiRoutes } from "./routes";

const port = 3001;

// Export type for Hono RPC
const routes = app.route("/api", apiRoutes);
export type AppType = typeof routes;

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
