import MetaTags from "../components/MetaTags";
import MovieGrid from "../components/MovieGrid";
import MovieList from "../components/MovieList";

function Favorites({ movies, loading, onFavoriteToggle, favorites }) {
  const renderMovieGrid = () => (
    <div className="hidden lg:block">
      <MovieGrid
        movies={movies}
        loading={loading}
        onFavoriteToggle={onFavoriteToggle}
        favorites={favorites}
      />
    </div>
  );

  const renderMovieList = () => (
    <div className="lg:hidden">
      <MovieList
        movies={movies}
        onFavoriteToggle={onFavoriteToggle}
        favorites={favorites}
      />
    </div>
  );

  return (
    <>
      <MetaTags
        title="My Favorite Movies - Movie Browser"
        description="View and manage your collection of favorite movies. Access your saved films anytime and keep track of what you love."
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
        </div>
        {renderMovieGrid()}
        {renderMovieList()}
      </main>
    </>
  );
}

export default Favorites;
