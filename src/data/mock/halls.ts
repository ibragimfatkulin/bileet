import type { Seat, SeatZone } from "@/types";

const ZONE_PRICES: Record<SeatZone, number> = {
  standard: 45_000,
  comfort: 65_000,
  vip: 95_000,
};

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const LEFT_NUMBERS = [1, 2, 3, 4, 5, 6];
const RIGHT_NUMBERS = [7, 8, 9, 10, 11, 12];

function zoneForRow(rowIndex: number): SeatZone {
  if (rowIndex <= 2) return "standard";
  if (rowIndex <= 6) return "comfort";
  return "vip";
}

/** Pre-mark some seats as sold in mock (before server bookings). */
const PREOCCUPIED: Record<string, string[]> = {
  default: ["C-3", "C-4", "F-8", "H-10", "J-1"],
};

export function buildHallSeats(
  sessionId: string,
  extraOccupied: Set<string> = new Set()
): Seat[] {
  const pre = new Set(PREOCCUPIED.default);
  const seats: Seat[] = [];

  ROWS.forEach((row, rowIndex) => {
    const zone = zoneForRow(rowIndex);
    const price = ZONE_PRICES[zone];
    const numbers = [...LEFT_NUMBERS, ...RIGHT_NUMBERS];

    numbers.forEach((num) => {
      const id = `${row}-${num}`;
      seats.push({
        id,
        row,
        number: num,
        zone,
        price,
        occupied: pre.has(id) || extraOccupied.has(`${sessionId}:${id}`),
      });
    });
  });

  return seats;
}

export const ZONE_LABELS: Record<SeatZone, string> = {
  standard: "Standard",
  comfort: "Comfort",
  vip: "VIP",
};

export const MAX_SEATS_PER_ORDER = 8;
