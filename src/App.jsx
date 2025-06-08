import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Error404 from "./pages/Error404";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_OMDB_BASE_URL;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [filters, setFilters] = useState({
    genres: [],
    yearStart: "",
    yearEnd: "",
    ratingStart: "",
    ratingEnd: "",
  });

  // Favorites management with localStorage persistence
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");
      return savedFavorites
        ? JSON.parse(savedFavorites).map((fav) => ({
            Title: fav.Title,
            Year: fav.Year,
            imdbID: fav.imdbID,
            Poster: fav.Poster,
            imdbRating: fav.imdbRating,
            Genre: fav.Genre,
          }))
        : [];
    } catch (error) {
      console.error("Error loading favorites:", error);
      return [];
    }
  });

  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite status for a movie
  const handleFavoriteToggle = useCallback((movie) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.imdbID === movie.imdbID);
      const newFavorites = isFavorite
        ? prev.filter((fav) => fav.imdbID !== movie.imdbID)
        : [
            ...prev,
            {
              Title: movie.Title,
              Year: movie.Year,
              imdbID: movie.imdbID,
              Poster: movie.Poster,
              imdbRating: movie.imdbRating,
              Genre: movie.Genre,
            },
          ];
      return newFavorites;
    });
  }, []);

  // Debounce search query to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
      if (searchQuery !== debouncedQuery) {
        setMovies([]);
        setHasMore(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, debouncedQuery]);

  // Load more movies for infinite scroll
  const loadMore = useCallback(() => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore]);

  // Function to fetch movies from OMDB API
  const fetchMovies = useCallback(
    async (query = "", pageNum = 1) => {
      try {
        setLoading(true);
        // Add artificial delay to show skeleton UI
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Initial API call to get movie list
        const response = await axios.get(BASE_URL, {
          params: {
            apikey: API_KEY,
            s: query || "movie",
            page: pageNum,
          },
        });

        if (response.data.Response === "True") {
          const newMovies = response.data.Search.map((movie) => ({
            Title: movie.Title,
            Year: movie.Year,
            imdbID: movie.imdbID,
            Poster: movie.Poster,
            imdbRating: "N/A",
            Genre: "N/A",
          }));
          const total = parseInt(response.data.totalResults);
          setTotalResults(total);

          // Fetch detailed information for each movie
          const detailedMovies = await Promise.all(
            newMovies.map(async (movie) => {
              try {
                const detailResponse = await axios.get(BASE_URL, {
                  params: {
                    apikey: API_KEY,
                    i: movie.imdbID,
                    plot: "short",
                  },
                });
                return detailResponse.data.Response === "True"
                  ? {
                      ...movie,
                      imdbRating: detailResponse.data.imdbRating || "N/A",
                      Genre: detailResponse.data.Genre || "N/A",
                    }
                  : movie;
              } catch (error) {
                console.error("Error fetching movie details:", error);
                return movie;
              }
            })
          );

          // Apply filters to the fetched movies
          let filteredMovies = detailedMovies;

          // Filter by year range
          if (filters.yearStart || filters.yearEnd) {
            filteredMovies = filteredMovies.filter((movie) => {
              const year = parseInt(movie.Year);
              const startYear = filters.yearStart
                ? parseInt(filters.yearStart)
                : 1900;
              const endYear = filters.yearEnd
                ? parseInt(filters.yearEnd)
                : new Date().getFullYear();
              return year >= startYear && year <= endYear;
            });
          }

          // Filter by genres
          if (filters.genres.length > 0) {
            filteredMovies = filteredMovies.filter((movie) => {
              const movieGenres = movie.Genre?.split(", ") || [];
              return filters.genres.some((genre) =>
                movieGenres.includes(genre)
              );
            });
          }

          // Filter by rating range
          if (filters.ratingStart || filters.ratingEnd) {
            filteredMovies = filteredMovies.filter((movie) => {
              const rating =
                movie.imdbRating === "N/A" ? 0 : parseFloat(movie.imdbRating);
              const startRating = filters.ratingStart
                ? parseFloat(filters.ratingStart)
                : 0;
              const endRating = filters.ratingEnd
                ? parseFloat(filters.ratingEnd)
                : 10;
              return rating >= startRating && rating <= endRating;
            });
          }

          // Update movies state based on pagination
          if (pageNum === 1) {
            setMovies(filteredMovies);
          } else {
            setMovies((prev) => {
              const uniqueMovies = [...prev];
              filteredMovies.forEach((newMovie) => {
                if (
                  !uniqueMovies.some(
                    (movie) => movie.imdbID === newMovie.imdbID
                  )
                ) {
                  uniqueMovies.push(newMovie);
                }
              });
              return uniqueMovies;
            });
          }

          // Update pagination state
          const currentTotal =
            pageNum === 1
              ? filteredMovies.length
              : movies.length + filteredMovies.length;
          setHasMore(currentTotal < total);
        } else {
          if (pageNum === 1) setMovies([]);
          setHasMore(false);
          setTotalResults(0);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        if (pageNum === 1) setMovies([]);
        setHasMore(false);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    },
    [filters, movies.length]
  );

  // Fetch movies when search query or page changes
  useEffect(() => {
    fetchMovies(debouncedQuery, page);
  }, [fetchMovies, debouncedQuery, page]);

  // Handle filter changes and reset pagination
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setMovies([]);
    setHasMore(true);
  }, []);

  // Reset all filters to default values
  const handleClearFilters = useCallback(() => {
    setFilters({
      genres: [],
      yearStart: "",
      yearEnd: "",
      ratingStart: "",
      ratingEnd: "",
    });
    setPage(1);
    setMovies([]);
    setHasMore(true);
  }, []);

  return (
    <Router>
      <Layout
        searchQuery={searchQuery}
        onSearch={(e) => setSearchQuery(e.target.value)}
        favoritesCount={favorites.length}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movies={movies}
                loading={loading}
                onFavoriteToggle={handleFavoriteToggle}
                favorites={favorites}
                filters={filters}
                handleFilterChange={handleFilterChange}
                handleClearFilters={handleClearFilters}
                hasMore={hasMore}
                loadMore={loadMore}
                totalResults={totalResults}
                showFilterModal={showFilterModal}
                setShowFilterModal={setShowFilterModal}
                page={page}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                movies={favorites}
                onFavoriteToggle={handleFavoriteToggle}
                favorites={favorites}
              />
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
