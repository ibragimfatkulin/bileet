"use client";

import { readCartFromStorage, writeCartToStorage } from "@/lib/cart-storage";
import type { CartLine, CartSeat } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface AddLineInput {
  sessionId: string;
  movieId: string;
  movieTitle: string;
  cinemaName: string;
  date: string;
  time: string;
  seats: CartSeat[];
}

interface CartContextValue {
  lines: CartLine[];
  hydrated: boolean;
  seatCount: number;
  addOrReplaceLine: (input: AddLineInput) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;
  isSeatInCart: (sessionId: string, seatId: string) => boolean;
  getLineForSession: (sessionId: string) => CartLine | undefined;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(readCartFromStorage());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: CartLine[]) => {
    setLines(next);
    writeCartToStorage(next);
  }, []);

  const addOrReplaceLine = useCallback(
    (input: AddLineInput) => {
      const lineId = `line-${input.sessionId}`;
      const next: CartLine = { lineId, ...input };
      setLines((prev) => {
        const filtered = prev.filter((l) => l.sessionId !== input.sessionId);
        const merged = [...filtered, next];
        writeCartToStorage(merged);
        return merged;
      });
    },
    []
  );

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => {
      const merged = prev.filter((l) => l.lineId !== lineId);
      writeCartToStorage(merged);
      return merged;
    });
  }, []);

  const clearCart = useCallback(() => persist([]), [persist]);

  const isSeatInCart = useCallback(
    (sessionId: string, seatId: string) =>
      lines.some(
        (l) => l.sessionId === sessionId && l.seats.some((s) => s.id === seatId)
      ),
    [lines]
  );

  const getLineForSession = useCallback(
    (sessionId: string) => lines.find((l) => l.sessionId === sessionId),
    [lines]
  );

  const seatCount = useMemo(
    () => lines.reduce((a, l) => a + l.seats.length, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      hydrated,
      seatCount,
      addOrReplaceLine,
      removeLine,
      clearCart,
      isSeatInCart,
      getLineForSession,
    }),
    [
      lines,
      hydrated,
      seatCount,
      addOrReplaceLine,
      removeLine,
      clearCart,
      isSeatInCart,
      getLineForSession,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
