import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

let _db: Db | null = null;

/** Client Drizzle initialisé à la première requête (évite d'échouer au build sans DATABASE_URL). */
export function getDb(): Db {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL manquant — voir .env.example");
    // prepare:false → compatible avec le pooler Neon (pgBouncer) sur Vercel.
    const client = postgres(url, { prepare: false });
    _db = drizzle(client, { schema });
  }
  return _db;
}
