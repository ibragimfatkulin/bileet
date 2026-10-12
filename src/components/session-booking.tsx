"use client";

import { MAX_SEATS_PER_ORDER } from "@/data/mock/halls";
import { useCart } from "@/context/cart-context";
import type { CartSeat, Seat } from "@/types";
import { useMemo, useState } from "react";
import { HallMap } from "./hall-map";
import { SeatSidebar } from "./seat-sidebar";

interface SessionMeta {
  sessionId: string;
  movieId: string;
  movieTitle: string;
  cinemaName: string;
  date: string;
  time: string;
}

export function SessionBooking({ meta, seats }: { meta: SessionMeta; seats: Seat[] }) {
  const { addOrReplaceLine, isSeatInCart, getLineForSession } = useCart();
  const existing = getLineForSession(meta.sessionId);
  const [selected, setSelected] = useState<string[]>(
    () => existing?.seats.map((s) => s.id) ?? []
  );
  const [addedFlash, setAddedFlash] = useState(false);

  const inCart = useMemo(() => {
    const set = new Set<string>();
    seats.forEach((s) => {
      if (isSeatInCart(meta.sessionId, s.id)) set.add(s.id);
    });
    return set;
  }, [seats, meta.sessionId, isSeatInCart]);

  const selectedSeats: CartSeat[] = useMemo(
    () =>
      selected
        .map((id) => seats.find((s) => s.id === id))
        .filter(Boolean)
        .map((s) => ({
          id: s!.id,
          row: s!.row,
          number: s!.number,
          zone: s!.zone,
          price: s!.price,
        })),
    [selected, seats]
  );

  function toggle(id: string) {
    if (inCart.has(id)) return;
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_SEATS_PER_ORDER) return prev;
      return [...prev, id];
    });
    setAddedFlash(false);
  }

  function addToCart() {
    if (!selectedSeats.length) return;
    addOrReplaceLine({
      sessionId: meta.sessionId,
      movieId: meta.movieId,
      movieTitle: meta.movieTitle,
      cinemaName: meta.cinemaName,
      date: meta.date,
      time: meta.time,
      seats: selectedSeats,
    });
    setAddedFlash(true);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <HallMap seats={seats} selected={selected} inCart={inCart} onToggle={toggle} />
      <SeatSidebar selectedSeats={selectedSeats} onAddToCart={addToCart} added={addedFlash} />
    </div>
  );
}
