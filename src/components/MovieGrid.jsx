import { Suspense } from "react";
import MovieCard from "./MovieCard";
import MovieGridSkeleton from "./MovieGridSkeleton";

function MovieGrid({ movies, onFavoriteToggle, favorites }) {
  if (movies.length === 0) {
    return (
      <div className="py-12">
        <p className="text-gray-500 text-lg">No movies found</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<MovieGridSkeleton />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
            type="grid"
          />
        ))}
      </div>
    </Suspense>
  );
}

export default MovieGrid;
