import { getSessionById } from "@/data/mock/movies";
import { getSeatsForSession } from "@/lib/store";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = getSessionById(id);
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
  return NextResponse.json({
    session: {
      id: session.id,
      movieId: session.movieId,
      movieTitle: session.movie.title,
      cinemaName: session.cinemaName,
      date: session.date,
      time: session.time,
      hallLabel: session.hallLabel,
    },
    seats: await getSeatsForSession(id),
  });
}
