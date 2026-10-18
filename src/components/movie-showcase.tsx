"use client";

import type { Movie } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { MoviePoster } from "./movie-poster";
import { YoutubeTrailer } from "./youtube-trailer";

export function MovieShowcase({ movie }: { movie: Movie }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const trailer = movie.trailerYoutubeId;

  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-900">
        {showTrailer && trailer ? (
          <>
            <YoutubeTrailer
              videoId={trailer}
              title={movie.title}
              posterSrc={movie.posterPath}
              aspect="poster"
              startActive
            />
            <div className="absolute left-2 top-2 z-20 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowTrailer(false)}
                className="rounded bg-black/75 px-2 py-1 text-xs text-white hover:bg-black"
              >
                ← Постер
              </button>
              <Link
                href={`/movies/${movie.id}`}
                className="rounded bg-accent px-2 py-1 text-xs text-white hover:opacity-90"
              >
                Выбрать сеанс
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link
              href={`/movies/${movie.id}`}
              className="absolute inset-0 z-0 block"
              aria-label={`${movie.title} — выбрать сеанс`}
            >
              <MoviePoster
                src={movie.posterPath}
                alt={movie.title}
                trailerYoutubeId={trailer}
              />
            </Link>
            {trailer && (
              <button
                type="button"
                onClick={() => setShowTrailer(true)}
                className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-medium text-white shadow-lg transition hover:bg-accent"
                aria-label={`Смотреть трейлер: ${movie.title}`}
              >
                <span aria-hidden>▶</span>
                Трейлер YouTube
              </button>
            )}
          </>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold leading-tight">
          <Link href={`/movies/${movie.id}`} className="hover:text-accent">
            {movie.title}
          </Link>
        </h2>
        <p className="mt-1 text-sm text-muted">
          {movie.genre} · {movie.durationMin} мин · {movie.ageRating}
        </p>
        {trailer && !showTrailer && (
          <button
            type="button"
            onClick={() => setShowTrailer(true)}
            className="mt-2 text-sm text-accent underline"
          >
            Смотреть трейлер
          </button>
        )}
        <Link
          href={`/movies/${movie.id}`}
          className="mt-3 inline-block rounded bg-accent px-4 py-2 text-sm text-white hover:opacity-90"
        >
          Выбрать сеанс
        </Link>
      </div>
    </article>
  );
}
