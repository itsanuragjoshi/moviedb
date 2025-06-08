import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

function MovieList({ movies, onFavoriteToggle, favorites, totalResults, loading, page }) {
  const renderEmptyState = () => (
    <div className="py-12">
      <p className="text-gray-500 text-lg">No movies found</p>
    </div>
  );

  const renderMovieList = () => (
    <>
      <div className="space-y-4">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
            type="list"
          />
        ))}
        {loading && page > 1 && Array.from({ length: 10 }).map((_, index) => (
          <MovieCardSkeleton key={`skeleton-${index}`} type="list" />
        ))}
      </div>
    </>
  );

  if (loading && page === 1) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <MovieCardSkeleton key={index} type="list" />
        ))}
      </div>
    );
  }

  return totalResults === 0 ? renderEmptyState() : renderMovieList();
}

export default MovieList;
