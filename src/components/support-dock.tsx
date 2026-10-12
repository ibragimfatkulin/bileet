"use client";

import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { useState } from "react";
import { ChatPanel } from "./chat-panel";

export function SupportDock() {
  const { seatCount } = useCart();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {chatOpen && (
        <div className="mb-1">
          <ChatPanel onClose={() => setChatOpen(false)} />
        </div>
      )}
      <div className="flex items-center gap-[0.5cm]">
        <Link
          href="/cart"
          className="relative rounded-full border border-border bg-card px-4 py-2 text-sm shadow-lg hover:border-accent"
        >
          Корзина
          {seatCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs text-white">
              {seatCount}
            </span>
          )}
        </Link>
        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          className="rounded-full border border-border bg-card px-4 py-2 text-sm shadow-lg hover:border-accent"
        >
          Помощник
        </button>
      </div>
    </div>
  );
}
