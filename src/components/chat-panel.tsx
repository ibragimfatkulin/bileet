"use client";

import { FAQ_ITEMS } from "@/data/mock/chat-faq";
import { useState } from "react";

interface Msg {
  role: "user" | "bot";
  text: string;
}

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Здравствуйте! Я помощник bileet. Выберите тему или задайте вопрос." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = (await res.json()) as { reply: string };
      setMessages((m) => [...m, { role: "bot", text: data.reply }]);
    } catch {
      setMessages((m) => [...m, { role: "bot", text: "Не удалось получить ответ. Попробуйте позже." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-80 w-80 flex-col rounded-lg border border-border bg-card shadow-xl">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-bold">Помощник</span>
        <button type="button" onClick={onClose} className="text-muted hover:text-foreground">
          ✕
        </button>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
        {messages.map((m, i) => (
          <p
            key={i}
            className={`rounded px-2 py-1 ${m.role === "user" ? "ml-6 bg-accent/15" : "mr-6 bg-background"}`}
          >
            {m.text}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap gap-1 border-t border-border p-2">
        {FAQ_ITEMS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => send(f.label)}
            className="rounded-full border border-border px-2 py-0.5 text-[11px] hover:border-accent"
          >
            {f.label}
          </button>
        ))}
      </div>
      <form
        className="flex gap-1 border-t border-border p-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ваш вопрос…"
          className="min-w-0 flex-1 rounded border border-border bg-background px-2 py-1 text-sm"
        />
        <button type="submit" disabled={loading} className="rounded bg-accent px-2 text-white text-sm">
          →
        </button>
      </form>
    </div>
  );
}
