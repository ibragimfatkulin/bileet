import { createClient } from "@libsql/client";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

function loadEnvLocal() {
  const path = join(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN");
  process.exit(1);
}

const db = createClient({ url, authToken });

await db.executeMultiple(`
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
`);

console.log("Turso schema ready");
