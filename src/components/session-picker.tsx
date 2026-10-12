"use client";

import { formatSessionDate } from "@/lib/format";
import type { Session } from "@/types";
import Link from "next/link";
import { useMemo, useState } from "react";

export function SessionPicker({ sessions }: { sessions: Session[] }) {
  const dates = useMemo(
    () => [...new Set(sessions.map((s) => s.date))].sort(),
    [sessions]
  );
  const [date, setDate] = useState(dates[0] ?? "");

  const filtered = sessions.filter((s) => s.date === date);
  const byCinema = useMemo(() => {
    const map = new Map<string, Session[]>();
    filtered.forEach((s) => {
      const arr = map.get(s.cinemaName) ?? [];
      arr.push(s);
      map.set(s.cinemaName, arr);
    });
    return [...map.entries()];
  }, [filtered]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {dates.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDate(d)}
            className={`rounded-full border px-3 py-1 text-sm ${
              d === date ? "border-accent bg-accent text-white" : "border-border"
            }`}
          >
            {formatSessionDate(d)}
          </button>
        ))}
      </div>
      <div className="space-y-6">
        {byCinema.map(([cinema, list]) => (
          <div key={cinema}>
            <h3 className="mb-2 font-bold">{cinema}</h3>
            <div className="flex flex-wrap gap-2">
              {list.map((s) => (
                <Link
                  key={s.id}
                  href={`/sessions/${s.id}`}
                  className="rounded border border-border bg-card px-4 py-2 text-sm hover:border-accent"
                >
                  {s.time} · {s.hallLabel}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
