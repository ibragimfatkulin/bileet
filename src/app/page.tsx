import { MovieGrid } from "@/components/movie-grid";
import { MOVIES } from "@/data/mock/movies";

export default function HomePage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Сейчас в кино</h1>
      <MovieGrid movies={MOVIES} />
    </div>
  );
}
