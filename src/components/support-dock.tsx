"use client";

import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { useState } from "react";
import { ChatPanel } from "./chat-panel";

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6h15l-1.5 9H7.5L6 6Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M6 6 5 3H2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="9" cy="20" r="1.25" fill="currentColor" />
      <circle cx="18" cy="20" r="1.25" fill="currentColor" />
    </svg>
  );
}

function AssistantIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3a7 7 0 0 0-4 12.7V19a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.3A7 7 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M9.5 21h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="10" cy="11" r="1" fill="currentColor" />
      <circle cx="14" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

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
          className="relative flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-lg hover:border-accent"
        >
          <CartIcon />
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
          className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-lg hover:border-accent"
        >
          <AssistantIcon />
          Помощник
        </button>
      </div>
    </div>
  );
}
