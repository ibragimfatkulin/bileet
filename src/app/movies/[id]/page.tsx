import { MoviePoster } from "@/components/movie-poster";
import { SessionPicker } from "@/components/session-picker";
import { YoutubeTrailer } from "@/components/youtube-trailer";
import { getMovieById } from "@/data/mock/movies";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = getMovieById(id);
  if (!movie) notFound();

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <div className="relative mx-auto aspect-[2/3] w-full max-w-[240px] overflow-hidden rounded-lg border border-border">
        <MoviePoster
          src={movie.posterPath}
          alt={movie.title}
          trailerYoutubeId={movie.trailerYoutubeId}
          priority
        />
      </div>
      <div>
        <Link href="/" className="text-sm text-muted hover:text-accent">
          ← На афишу
        </Link>
        <h1 className="mt-2 text-3xl font-bold">{movie.title}</h1>
        <p className="mt-2 text-muted">
          {movie.genre} · {movie.durationMin} мин · {movie.ageRating}
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed">{movie.description}</p>
        {movie.trailerYoutubeId && (
          <div className="mt-6 max-w-2xl overflow-hidden rounded-lg border border-border">
            <p className="border-b border-border bg-card px-3 py-2 text-sm font-bold">
              Официальный трейлер (YouTube)
            </p>
            <YoutubeTrailer
              videoId={movie.trailerYoutubeId}
              title={movie.title}
              posterSrc={movie.posterPath}
            />
          </div>
        )}
        <h2 className="mb-4 mt-8 text-xl font-bold">Сеансы</h2>
        <SessionPicker sessions={movie.sessions} />
      </div>
    </div>
  );
}
