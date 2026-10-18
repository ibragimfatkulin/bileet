import { isTursoConfigured } from "@/lib/db";
import {
  createBatchBookingMemory,
  createBookingMemory,
  getSeatsForSessionMemory,
} from "@/lib/store-memory";
import {
  createBatchBookingTurso,
  createBookingTurso,
  getSeatsForSessionTurso,
} from "@/lib/store-turso";
import type { BookingResult, Seat } from "@/types";

export function getBookingStorageMode(): "turso" | "memory" {
  return isTursoConfigured() ? "turso" : "memory";
}

export async function getSeatsForSession(sessionId: string): Promise<Seat[]> {
  if (getBookingStorageMode() === "turso") {
    return getSeatsForSessionTurso(sessionId);
  }
  return getSeatsForSessionMemory(sessionId);
}

export async function createBooking(
  name: string,
  email: string,
  sessionId: string,
  seatIds: string[]
): Promise<BookingResult> {
  if (getBookingStorageMode() === "turso") {
    return createBookingTurso(name, email, sessionId, seatIds);
  }
  return createBookingMemory(name, email, sessionId, seatIds);
}

export async function createBatchBooking(
  name: string,
  email: string,
  items: { sessionId: string; seatIds: string[] }[]
): Promise<BookingResult> {
  if (getBookingStorageMode() === "turso") {
    return createBatchBookingTurso(name, email, items);
  }
  return createBatchBookingMemory(name, email, items);
}
