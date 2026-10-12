"use client";

import { MAX_SEATS_PER_ORDER, ZONE_LABELS } from "@/data/mock/halls";
import { formatUzPrice } from "@/lib/format";
import type { Seat, SeatZone } from "@/types";

const ZONE_CLASS: Record<SeatZone, string> = {
  standard: "bg-emerald-600/80",
  comfort: "bg-amber-500/90",
  vip: "bg-violet-600/90",
};

interface HallMapProps {
  seats: Seat[];
  selected: string[];
  inCart: Set<string>;
  onToggle: (seatId: string) => void;
}

export function HallMap({ seats, selected, inCart, onToggle }: HallMapProps) {
  const rows = [...new Set(seats.map((s) => s.row))];
  return (
    <div className="space-y-4">
      <div className="mx-auto max-w-md rounded-t-full border border-border bg-muted/20 py-2 text-center text-xs uppercase tracking-widest text-muted">
        Экран
      </div>
      <div className="space-y-2">
        {rows.map((row) => {
          const rowSeats = seats.filter((s) => s.row === row);
          const left = rowSeats.filter((s) => s.number <= 6);
          const right = rowSeats.filter((s) => s.number > 6);
          return (
            <div key={row} className="flex items-center justify-center gap-2">
              <span className="w-6 text-center text-xs text-muted">{row}</span>
              <div className="flex gap-1">{left.map((s) => renderSeat(s))}</div>
              <div className="w-4" aria-hidden />
              <div className="flex gap-1">{right.map((s) => renderSeat(s))}</div>
            </div>
          );

          function renderSeat(s: Seat) {
            const sel = selected.includes(s.id);
            const cart = inCart.has(s.id);
            const disabled = s.occupied || cart;
            return (
              <button
                key={s.id}
                type="button"
                disabled={disabled}
                title={`${s.row}-${s.number} · ${ZONE_LABELS[s.zone]} · ${formatUzPrice(s.price)}`}
                onClick={() => onToggle(s.id)}
                className={`h-7 w-7 rounded text-[10px] text-white transition ${
                  s.occupied
                    ? "cursor-not-allowed bg-neutral-500/50"
                    : cart
                      ? "cursor-not-allowed bg-neutral-400/60 ring-2 ring-accent"
                      : sel
                        ? "ring-2 ring-white " + ZONE_CLASS[s.zone]
                        : ZONE_CLASS[s.zone] + " hover:opacity-90"
                }`}
              >
                {cart ? "✓" : s.number}
              </button>
            );
          }
        })}
      </div>
      <Legend />
      <p className="text-center text-xs text-muted">
        Максимум {MAX_SEATS_PER_ORDER} мест за раз · серые — заняты · с галочкой — в корзине
      </p>
    </div>
  );
}

function Legend() {
  const items: SeatZone[] = ["standard", "comfort", "vip"];
  return (
    <div className="flex flex-wrap justify-center gap-4 text-sm">
      {items.map((z) => (
        <span key={z} className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded ${ZONE_CLASS[z]}`} />
          {ZONE_LABELS[z]}
        </span>
      ))}
    </div>
  );
}
