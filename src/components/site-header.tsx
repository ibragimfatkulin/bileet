"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-accent">
          bileet
        </Link>
        <button
          type="button"
          onClick={() => setTheme(dark ? "light" : "dark")}
          className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-background"
          aria-label="Переключить тему"
        >
          {mounted ? (dark ? "☀ Светлая" : "☾ Тёмная") : "…"}
        </button>
      </div>
    </header>
  );
}
