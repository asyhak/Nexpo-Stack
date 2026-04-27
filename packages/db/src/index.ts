import { env } from "@repo/env/server";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema/index";

export function createDb() {
  const sqlite = new Database(env.DATABASE_URL.replace("file:", ""));
  return drizzle({ client: sqlite, schema });
}

export const db = createDb();
