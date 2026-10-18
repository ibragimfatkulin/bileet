import { createClient, type Client } from "@libsql/client";

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS session_occupancy (
  session_id TEXT NOT NULL,
  seat_id TEXT NOT NULL,
  booked_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (session_id, seat_id)
);

CREATE TABLE IF NOT EXISTS bookings (
  order_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  total INTEGER NOT NULL,
  lines_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS order_counter (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  value INTEGER NOT NULL DEFAULT 1000
);

INSERT OR IGNORE INTO order_counter (id, value) VALUES (1, 1000);
`;

let client: Client | null | undefined;
let schemaPromise: Promise<void> | null = null;

export function isTursoConfigured(): boolean {
  return Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN);
}

export function getDb(): Client | null {
  if (!isTursoConfigured()) return null;
  if (client === undefined) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });
  }
  return client;
}

export async function ensureSchema(): Promise<void> {
  const db = getDb();
  if (!db) return;
  if (!schemaPromise) {
    schemaPromise = db.executeMultiple(SCHEMA_SQL).then(() => undefined);
  }
  await schemaPromise;
}
