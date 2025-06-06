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
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState({
    genres: [],
    yearStart: "",
    yearEnd: "",
    ratingStart: "",
    ratingEnd: "",
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        // Ensure we only have the required fields
        return parsedFavorites.map(fav => ({
          Title: fav.Title,
          Year: fav.Year,
          imdbID: fav.imdbID,
          Poster: fav.Poster,
          imdbRating: fav.imdbRating,
          Genre: fav.Genre
        }));
      }
      return [];
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
      return [];
    }
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  const handleFavoriteToggle = useCallback((movie) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.imdbID === movie.imdbID);
      const newFavorites = isFavorite
        ? prev.filter((fav) => fav.imdbID !== movie.imdbID)
        : [...prev, {
            Title: movie.Title,
            Year: movie.Year,
            imdbID: movie.imdbID,
            Poster: movie.Poster,
            imdbRating: movie.imdbRating,
            Genre: movie.Genre
          }];

      // Save to localStorage immediately
      try {
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      } catch (error) {
        console.error("Error saving favorites to localStorage:", error);
      }

      return newFavorites;
    });
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1); // Reset page when search query changes
      // Only reset movies if search query actually changed
      if (searchQuery !== debouncedQuery) {
        setMovies([]); // Clear existing movies
        setHasMore(true); // Reset hasMore state
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, debouncedQuery]);

  const fetchMovies = useCallback(
    async (query = "", pageNum = 1) => {
      try {
        setLoading(true);
        const params = {
          apikey: API_KEY,
          s: query || "movie",
          page: pageNum,
        };

        const response = await axios.get(BASE_URL, { params });

        if (response.data.Response === "True") {
          let newMovies = response.data.Search.map(movie => ({
            Title: movie.Title,
            Year: movie.Year,
            imdbID: movie.imdbID,
            Poster: movie.Poster,
            imdbRating: "N/A",
            Genre: "N/A"
          }));
          const total = parseInt(response.data.totalResults);
          setTotalResults(total);

          // Fetch additional details for each movie to apply genre and rating filters
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
                if (detailResponse.data.Response === "True") {
                  return {
                    ...movie,
                    imdbRating: detailResponse.data.imdbRating || "N/A",
                    Genre: detailResponse.data.Genre || "N/A"
                  };
                }
                return movie;
              } catch (error) {
                console.error("Error fetching movie details:", error);
                return movie;
              }
            })
          );

          // Apply filters
          let filteredMovies = detailedMovies;
          
          // Apply year filter
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

          // Apply genre filter
          if (filters.genres.length > 0) {
            filteredMovies = filteredMovies.filter((movie) => {
              const movieGenres = movie.Genre?.split(", ") || [];
              return filters.genres.some((genre) =>
                movieGenres.includes(genre)
              );
            });
          }

          // Apply rating filter
          if (filters.ratingStart || filters.ratingEnd) {
            filteredMovies = filteredMovies.filter((movie) => {
              const rating = movie.imdbRating === "N/A" ? 0 : parseFloat(movie.imdbRating);
              const startRating = filters.ratingStart
                ? parseFloat(filters.ratingStart)
                : 0;
              const endRating = filters.ratingEnd
                ? parseFloat(filters.ratingEnd)
                : 10;
              return rating >= startRating && rating <= endRating;
            });
          }

          // Update movies state based on page number
          if (pageNum === 1) {
            setMovies(filteredMovies);
          } else {
            setMovies(prev => {
              // Filter out any duplicates based on imdbID
              const uniqueMovies = [...prev];
              filteredMovies.forEach(newMovie => {
                if (!uniqueMovies.some(movie => movie.imdbID === newMovie.imdbID)) {
                  uniqueMovies.push(newMovie);
                }
              });
              return uniqueMovies;
            });
          }

          // Check if we have more results
          const currentTotal = pageNum === 1 ? filteredMovies.length : movies.length + filteredMovies.length;
          setHasMore(currentTotal < total);
        } else {
          if (pageNum === 1) {
            setMovies([]);
          }
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        if (pageNum === 1) {
          setMovies([]);
        }
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    fetchMovies(debouncedQuery, page);
  }, [fetchMovies, debouncedQuery, page]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset page when filters change
    setMovies([]); // Clear existing movies
    setHasMore(true); // Reset hasMore state
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      genres: [],
      yearStart: "",
      yearEnd: "",
      ratingStart: "",
      ratingEnd: "",
    });
    setPage(1); // Reset page when filters are cleared
    setMovies([]); // Clear existing movies
    setHasMore(true); // Reset hasMore state
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  return (
    <Router>
      <Layout
        searchQuery={searchQuery}
        onSearch={handleSearch}
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
                showFilterModal={showFilterModal}
                setShowFilterModal={setShowFilterModal}
                filters={filters}
                handleFilterChange={handleFilterChange}
                handleClearFilters={handleClearFilters}
                hasMore={hasMore}
                loadMore={loadMore}
                totalResults={totalResults}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                movies={favorites}
                loading={false}
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
