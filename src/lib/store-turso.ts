import { buildHallSeats } from "@/data/mock/halls";
import { getSessionById } from "@/data/mock/movies";
import { ensureSchema, getDb } from "@/lib/db";
import type { BookingResult, CartSeat, Seat } from "@/types";

async function occupiedSetForSession(sessionId: string): Promise<Set<string>> {
  const db = getDb();
  if (!db) return new Set();
  await ensureSchema();
  const result = await db.execute({
    sql: `SELECT seat_id FROM session_occupancy WHERE session_id = ?`,
    args: [sessionId],
  });
  const keys = new Set<string>();
  for (const row of result.rows) {
    const seatId = String(row.seat_id ?? row[0]);
    keys.add(`${sessionId}:${seatId}`);
  }
  return keys;
}

export async function getSeatsForSessionTurso(sessionId: string): Promise<Seat[]> {
  const occupied = await occupiedSetForSession(sessionId);
  return buildHallSeats(sessionId, occupied);
}

function seatsToCart(seats: Seat[], seatIds: string[]): CartSeat[] {
  return seatIds.map((id) => {
    const s = seats.find((x) => x.id === id);
    if (!s) throw new Error(`Seat ${id} not found`);
    return { id: s.id, row: s.row, number: s.number, zone: s.zone, price: s.price };
  });
}

async function nextOrderId(): Promise<number> {
  const db = getDb();
  if (!db) throw new Error("Database unavailable");
  await ensureSchema();
  const result = await db.execute(
    `UPDATE order_counter SET value = value + 1 WHERE id = 1 RETURNING value`
  );
  const raw = result.rows[0]?.value ?? result.rows[0]?.[0];
  return Number(raw);
}

async function reserveSeatsTurso(sessionId: string, seatIds: string[]) {
  const db = getDb();
  if (!db) throw new Error("Database unavailable");
  await ensureSchema();

  const seats = await getSeatsForSessionTurso(sessionId);
  for (const seatId of seatIds) {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat || seat.occupied) {
      throw new Error(`Seat ${seatId} is not available`);
    }
  }

  const tx = await db.transaction("write");
  try {
    for (const seatId of seatIds) {
      const check = await tx.execute({
        sql: `SELECT 1 FROM session_occupancy WHERE session_id = ? AND seat_id = ?`,
        args: [sessionId, seatId],
      });
      if (check.rows.length > 0) {
        throw new Error(`Seat ${seatId} is not available`);
      }
      await tx.execute({
        sql: `INSERT INTO session_occupancy (session_id, seat_id) VALUES (?, ?)`,
        args: [sessionId, seatId],
      });
    }
    await tx.commit();
  } catch (e) {
    await tx.rollback();
    throw e;
  }
}

async function persistBooking(result: BookingResult) {
  const db = getDb();
  if (!db) throw new Error("Database unavailable");
  await db.execute({
    sql: `INSERT INTO bookings (order_id, name, email, total, lines_json, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
    args: [
      result.orderId,
      result.name,
      result.email,
      result.total,
      JSON.stringify(result.lines),
      result.createdAt,
    ],
  });
}

export async function createBookingTurso(
  name: string,
  email: string,
  sessionId: string,
  seatIds: string[]
): Promise<BookingResult> {
  const ctx = getSessionById(sessionId);
  if (!ctx) throw new Error("Session not found");
  const seats = await getSeatsForSessionTurso(sessionId);
  await reserveSeatsTurso(sessionId, seatIds);
  const cartSeats = seatsToCart(seats, seatIds);
  const subtotal = cartSeats.reduce((a, s) => a + s.price, 0);
  const orderNum = await nextOrderId();
  const result: BookingResult = {
    orderId: `BL-${orderNum}`,
    name,
    email,
    total: subtotal,
    lines: [
      {
        sessionId,
        movieTitle: ctx.movie.title,
        cinemaName: ctx.cinemaName,
        date: ctx.date,
        time: ctx.time,
        seats: cartSeats,
        subtotal,
      },
    ],
    createdAt: new Date().toISOString(),
  };
  await persistBooking(result);
  return result;
}

export async function createBatchBookingTurso(
  name: string,
  email: string,
  items: { sessionId: string; seatIds: string[] }[]
): Promise<BookingResult> {
  if (!items.length) throw new Error("Cart is empty");
  const lines: BookingResult["lines"] = [];
  let total = 0;

  for (const item of items) {
    const ctx = getSessionById(item.sessionId);
    if (!ctx) throw new Error(`Session ${item.sessionId} not found`);
    const seats = await getSeatsForSessionTurso(item.sessionId);
    await reserveSeatsTurso(item.sessionId, item.seatIds);
    const cartSeats = seatsToCart(seats, item.seatIds);
    const subtotal = cartSeats.reduce((a, s) => a + s.price, 0);
    total += subtotal;
    lines.push({
      sessionId: item.sessionId,
      movieTitle: ctx.movie.title,
      cinemaName: ctx.cinemaName,
      date: ctx.date,
      time: ctx.time,
      seats: cartSeats,
      subtotal,
    });
  }

  const orderNum = await nextOrderId();
  const result: BookingResult = {
    orderId: `BL-${orderNum}`,
    name,
    email,
    total,
    lines,
    createdAt: new Date().toISOString(),
  };
  await persistBooking(result);
  return result;
}
