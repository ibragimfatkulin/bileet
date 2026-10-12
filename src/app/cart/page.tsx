"use client";

import { useCart } from "@/context/cart-context";
import { formatSessionDate, formatUzPrice } from "@/lib/format";
import type { BookingResult } from "@/types";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { lines, removeLine, clearCart, hydrated } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<BookingResult | null>(null);

  const total = lines.reduce(
    (a, l) => a + l.seats.reduce((s, seat) => s + seat.price, 0),
    0
  );

  async function checkout(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/bookings/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          items: lines.map((l) => ({
            sessionId: l.sessionId,
            seatIds: l.seats.map((s) => s.id),
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Ошибка оплаты");
      setResult(data as BookingResult);
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  if (!hydrated) {
    return <p className="text-muted">Загрузка корзины…</p>;
  }

  if (result) {
    return (
      <div className="mx-auto max-w-lg rounded-lg border border-border bg-card p-6 text-center">
        <h1 className="text-2xl font-bold text-accent">Оплата прошла</h1>
        <p className="mt-2">Номер заказа: <strong>{result.orderId}</strong></p>
        <p className="mt-1 text-sm text-muted">Письмо на {result.email} (демо не отправляется)</p>
        <Link href="/" className="mt-6 inline-block text-accent underline">
          На афишу
        </Link>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Корзина пуста</h1>
        <Link href="/" className="mt-4 inline-block text-accent underline">
          Выбрать фильм
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Корзина</h1>
      <ul className="space-y-4">
        {lines.map((line) => {
          const sub = line.seats.reduce((a, s) => a + s.price, 0);
          return (
            <li key={line.lineId} className="rounded-lg border border-border bg-card p-4">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="font-bold">{line.movieTitle}</p>
                  <p className="text-sm text-muted">
                    {line.cinemaName} · {formatSessionDate(line.date)} · {line.time}
                  </p>
                  <p className="mt-2 text-sm">
                    Места:{" "}
                    {line.seats.map((s) => `${s.row}${s.number}`).join(", ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatUzPrice(sub)}</p>
                  <button
                    type="button"
                    onClick={() => removeLine(line.lineId)}
                    className="mt-2 text-sm text-accent underline"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-right text-xl font-bold">Итого: {formatUzPrice(total)}</p>
      <form onSubmit={checkout} className="mt-6 space-y-3 rounded-lg border border-border bg-card p-4">
        <h2 className="font-bold">Оформить все билеты</h2>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя"
          className="w-full rounded border border-border bg-background px-3 py-2"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded border border-border bg-background px-3 py-2"
        />
        {error && <p className="text-sm text-accent">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-accent py-2 text-white disabled:opacity-50"
        >
          {loading ? "Оплата…" : "Оплатить"}
        </button>
      </form>
    </div>
  );
}
