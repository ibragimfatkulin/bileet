import type { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";

export function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {movies.map((m) => (
        <article
          key={m.id}
          className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-md"
        >
          <div className="relative aspect-[2/3] w-full bg-border/30">
            <Image
              src={m.posterPath}
              alt={m.title}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width:768px) 100vw, 33vw"
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold leading-tight">{m.title}</h2>
            <p className="mt-1 text-sm text-muted">
              {m.genre} · {m.durationMin} мин · {m.ageRating}
            </p>
            <Link
              href={`/movies/${m.id}`}
              className="mt-3 inline-block rounded bg-accent px-4 py-2 text-sm text-white hover:opacity-90"
            >
              Выбрать сеанс
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
