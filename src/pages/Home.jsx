import { Suspense } from "react";
import { Filter, X } from "lucide-react";
import MovieGrid from "../components/MovieGrid";
import MovieGridSkeleton from "../components/MovieGridSkeleton";
import MovieList from "../components/MovieList";
import MetaTags from "../components/MetaTags";
import Filters from "../components/Filters";
import InfiniteScroll from "../components/InfiniteScroll";

function Home({
  movies,
  loading,
  onFavoriteToggle,
  favorites,
  showFilterModal,
  setShowFilterModal,
  filters,
  handleFilterChange,
  handleClearFilters,
  hasMore,
  loadMore,
  totalResults,
}) {
  const activeFiltersCount = [
    filters.genres.length,
    filters.yearStart ? 1 : 0,
    filters.yearEnd ? 1 : 0,
    filters.ratingStart ? 1 : 0,
    filters.ratingEnd ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <>
      <MetaTags
        title="MovieDB - Discover Your Next Favorite Film"
        description="Browse through our extensive collection of movies. Search, filter, and find your next favorite film. Save your favorites for later viewing."
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Movies</h1>
            {totalResults > 0 && (
              <p className="text-gray-500 mt-1">
                Found {totalResults} {totalResults === 1 ? "movie" : "movies"}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            {activeFiltersCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all border-2 border-black hover:shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
                aria-label="Clear All Filters"
                title="Clear All Filters"
              >
                Clear Filters
              </button>
            )}
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all border-2 border-black hover:shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 relative cursor-pointer"
              aria-label="Filters"
              title="Filters"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter By</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="hidden md:block">
          <MovieGrid
            movies={movies}
            onFavoriteToggle={onFavoriteToggle}
            favorites={favorites}
          />
        </div>
        <div className="md:hidden">
          <MovieList
            movies={movies}
            onFavoriteToggle={onFavoriteToggle}
            favorites={favorites}
          />
        </div>

        {hasMore && movies.length > 0 && (
          <InfiniteScroll
            onLoadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
          />
        )}

        {!hasMore && movies.length > 0 && (
          <div className="text-center text-gray-500 mt-8">
            {movies.length >= totalResults ? (
              <p>No more movies to load</p>
            ) : (
              <p>
                Showing {movies.length} of {totalResults} movies
              </p>
            )}
          </div>
        )}

        {/* Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-[rgba(255,255,255,0.6)] z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border-2 border-black shadow-[0px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="sticky top-0 bg-white p-6 border-b-2 border-black z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    <h2 className="text-xl font-bold">Filter By</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClearFilters}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all border-2 border-black hover:shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 cursor-pointer"
                      aria-label="Clear All Filters"
                      title="Clear All Filters"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowFilterModal(false)}
                      className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition-all border-2 border-black hover:shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 cursor-pointer"
                      aria-label="Close filters"
                      title="Close filters"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
              <Filters
                selectedGenres={filters.genres}
                selectedYears={`${filters.yearStart} - ${filters.yearEnd}`}
                selectedRatings={`${filters.ratingStart} - ${filters.ratingEnd}`}
                onGenreChange={(newGenres) =>
                  handleFilterChange({ ...filters, genres: newGenres })
                }
                onYearChange={(newYears) => {
                  const [startYear, endYear] = newYears.split(" - ");
                  handleFilterChange({
                    ...filters,
                    yearStart: startYear,
                    yearEnd: endYear,
                  });
                }}
                onRatingChange={(newRatings) => {
                  const [startRating, endRating] = newRatings.split(" - ");
                  handleFilterChange({
                    ...filters,
                    ratingStart: startRating,
                    ratingEnd: endRating,
                  });
                }}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
