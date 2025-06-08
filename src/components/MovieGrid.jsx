import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

function MovieGrid({ movies, onFavoriteToggle, favorites, totalResults, loading, page }) {
  const renderEmptyState = () => (
    <div className="py-12">
      <p className="text-gray-500 text-lg">No movies found</p>
    </div>
  );

  const renderMovieGrid = () => (
    <>
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
        {loading && page > 1 && Array.from({ length: 10 }).map((_, index) => (
          <MovieCardSkeleton key={`skeleton-${index}`} type="grid" />
        ))}
      </div>
    </>
  );

  if (loading && page === 1) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <MovieCardSkeleton key={index} type="grid" />
        ))}
      </div>
    );
  }

  return totalResults === 0 ? renderEmptyState() : renderMovieGrid();
}

export default MovieGrid;
