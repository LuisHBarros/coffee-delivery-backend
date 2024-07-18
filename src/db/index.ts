import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database(":memory:"); // Ou o caminho do seu arquivo SQLite
export const db = drizzle(sqlite, { schema });
