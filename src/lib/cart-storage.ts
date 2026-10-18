import type { CartLine, CartSeat } from "@/types";

export const CART_STORAGE_KEY = "bileet-cart-v1";

function isCartSeat(x: unknown): x is CartSeat {
  if (!x || typeof x !== "object") return false;
  const s = x as CartSeat;
  return (
    typeof s.id === "string" &&
    typeof s.row === "string" &&
    typeof s.number === "number" &&
    typeof s.price === "number"
  );
}

export function sanitizeCartLines(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  const out: CartLine[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const l = item as CartLine;
    if (typeof l.lineId !== "string" || typeof l.sessionId !== "string") continue;
    const seats = Array.isArray(l.seats) ? l.seats.filter(isCartSeat) : [];
    if (!seats.length) continue;
    out.push({
      lineId: l.lineId,
      sessionId: l.sessionId,
      movieId: typeof l.movieId === "string" ? l.movieId : "",
      movieTitle: typeof l.movieTitle === "string" ? l.movieTitle : "Фильм",
      cinemaName: typeof l.cinemaName === "string" ? l.cinemaName : "",
      date: typeof l.date === "string" ? l.date : "",
      time: typeof l.time === "string" ? l.time : "",
      seats,
    });
  }
  return out;
}

export function readCartFromStorage(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    const lines = sanitizeCartLines(parsed);
    if (JSON.stringify(lines) !== JSON.stringify(parsed)) {
      writeCartToStorage(lines);
    }
    return lines;
  } catch {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    return [];
  }
}

export function writeCartToStorage(lines: CartLine[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(sanitizeCartLines(lines)));
}
