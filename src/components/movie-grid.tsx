import type { Movie } from "@/types";
import { MovieShowcase } from "./movie-showcase";

export function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {movies.map((m) => (
        <MovieShowcase key={m.id} movie={m} />
      ))}
    </div>
  );
}
