import { buildHallSeats } from "@/data/mock/halls";
import { getSessionById } from "@/data/mock/movies";
import type { BookingResult, CartSeat, Seat } from "@/types";

const occupiedKeys = new Set<string>();
const bookings: BookingResult[] = [];
let orderCounter = 1000;

function seatKey(sessionId: string, seatId: string) {
  return `${sessionId}:${seatId}`;
}

export function getSeatsForSessionMemory(sessionId: string): Seat[] {
  return buildHallSeats(sessionId, occupiedKeys);
}

function isSeatAvailableMemory(sessionId: string, seatId: string): boolean {
  const seats = getSeatsForSessionMemory(sessionId);
  const seat = seats.find((s) => s.id === seatId);
  return Boolean(seat && !seat.occupied);
}

function seatsToCart(seats: Seat[], seatIds: string[]): CartSeat[] {
  return seatIds.map((id) => {
    const s = seats.find((x) => x.id === id);
    if (!s) throw new Error(`Seat ${id} not found`);
    return { id: s.id, row: s.row, number: s.number, zone: s.zone, price: s.price };
  });
}

function reserveSeatsMemory(sessionId: string, seatIds: string[]) {
  for (const id of seatIds) {
    if (!isSeatAvailableMemory(sessionId, id)) {
      throw new Error(`Seat ${id} is not available`);
    }
  }
  seatIds.forEach((id) => occupiedKeys.add(seatKey(sessionId, id)));
}

export function createBookingMemory(
  name: string,
  email: string,
  sessionId: string,
  seatIds: string[]
): BookingResult {
  const ctx = getSessionById(sessionId);
  if (!ctx) throw new Error("Session not found");
  const seats = getSeatsForSessionMemory(sessionId);
  reserveSeatsMemory(sessionId, seatIds);
  const cartSeats = seatsToCart(seats, seatIds);
  const subtotal = cartSeats.reduce((a, s) => a + s.price, 0);
  orderCounter += 1;
  const result: BookingResult = {
    orderId: `BL-${orderCounter}`,
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
  bookings.push(result);
  return result;
}

export function createBatchBookingMemory(
  name: string,
  email: string,
  items: { sessionId: string; seatIds: string[] }[]
): BookingResult {
  if (!items.length) throw new Error("Cart is empty");
  const lines: BookingResult["lines"] = [];
  let total = 0;

  for (const item of items) {
    const ctx = getSessionById(item.sessionId);
    if (!ctx) throw new Error(`Session ${item.sessionId} not found`);
    const seats = getSeatsForSessionMemory(item.sessionId);
    reserveSeatsMemory(item.sessionId, item.seatIds);
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

  orderCounter += 1;
  const result: BookingResult = {
    orderId: `BL-${orderCounter}`,
    name,
    email,
    total,
    lines,
    createdAt: new Date().toISOString(),
  };
  bookings.push(result);
  return result;
}
