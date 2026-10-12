"use client";

import { MAX_SEATS_PER_ORDER } from "@/data/mock/halls";
import { formatUzPrice } from "@/lib/format";
import type { CartSeat } from "@/types";
import Link from "next/link";

interface SeatSidebarProps {
  selectedSeats: CartSeat[];
  onAddToCart: () => void;
  added: boolean;
}

export function SeatSidebar({ selectedSeats, onAddToCart, added }: SeatSidebarProps) {
  const total = selectedSeats.reduce((a, s) => a + s.price, 0);
  const overLimit = selectedSeats.length > MAX_SEATS_PER_ORDER;

  return (
    <aside className="rounded-lg border border-border bg-card p-4 lg:sticky lg:top-24">
      <h2 className="text-lg font-bold">Ваш выбор</h2>
      {selectedSeats.length === 0 ? (
        <p className="mt-2 text-sm text-muted">Выберите места на схеме</p>
      ) : (
        <ul className="mt-3 space-y-1 text-sm">
          {selectedSeats.map((s) => (
            <li key={s.id}>
              Ряд {s.row}, место {s.number} — {formatUzPrice(s.price)}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-xl font-bold">{formatUzPrice(total)}</p>
      {overLimit && (
        <p className="mt-2 text-sm text-accent">Не более {MAX_SEATS_PER_ORDER} мест</p>
      )}
      <button
        type="button"
        disabled={!selectedSeats.length || overLimit}
        onClick={onAddToCart}
        className="mt-4 w-full rounded bg-accent py-2 text-white disabled:opacity-40"
      >
        {added ? "Обновлено в корзине" : "В корзину"}
      </button>
      <Link href="/cart" className="mt-2 block text-center text-sm text-accent underline">
        Перейти в корзину
      </Link>
    </aside>
  );
}
