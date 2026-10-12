import { SessionBooking } from "@/components/session-booking";
import { getSessionById } from "@/data/mock/movies";
import { getSeatsForSession } from "@/lib/store";
import { formatSessionDate } from "@/lib/format";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ctx = getSessionById(id);
  if (!ctx) notFound();
  const seats = getSeatsForSession(id);

  return (
    <div>
      <Link href={`/movies/${ctx.movie.id}`} className="text-sm text-muted hover:text-accent">
        ← {ctx.movie.title}
      </Link>
      <h1 className="mt-2 text-2xl font-bold">{ctx.movie.title}</h1>
      <p className="text-muted">
        {ctx.cinemaName} · {formatSessionDate(ctx.date)} · {ctx.time} · {ctx.hallLabel}
      </p>
      <div className="mt-8">
        <SessionBooking
          meta={{
            sessionId: ctx.id,
            movieId: ctx.movie.id,
            movieTitle: ctx.movie.title,
            cinemaName: ctx.cinemaName,
            date: ctx.date,
            time: ctx.time,
          }}
          seats={seats}
        />
      </div>
    </div>
  );
}
