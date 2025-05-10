import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import {
  filterMovies,
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  searchMovies,
} from "../services/api";
import { AuthContext } from "./AuthContext";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentTab, setCurrentTab] = useState("all");
  const [lastSearchedMovie, setLastSearchedMovie] = useState("");
  const [filters, setFilters] = useState({
    genres: [],
    year: "",
    rating: "",
    sortBy: "popularity.desc",
  });
  const { user } = useContext(AuthContext);

  // Load favorites and last searched movie from localStorage when component mounts
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }

      const storedLastSearched = localStorage.getItem("lastSearchedMovie");
      if (storedLastSearched) {
        setLastSearchedMovie(storedLastSearched);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }, [favorites]);

  // Save last searched movie to localStorage whenever it changes
  useEffect(() => {
    if (lastSearchedMovie) {
      try {
        localStorage.setItem("lastSearchedMovie", lastSearchedMovie);
      } catch (error) {
        console.error("Error saving last searched movie:", error);
      }
    }
  }, [lastSearchedMovie]);

  const loadMovies = useCallback(
    async (type = "all", pageNum = 1) => {
      setLoading(true);
      setError(null);
      try {
        let response;
        switch (type) {
          case "trending":
            response = await fetchTrendingMovies(pageNum);
            break;
          case "topRated":
            response = await fetchTopRatedMovies(pageNum);
            break;
          case "nowPlaying":
            response = await fetchNowPlayingMovies(pageNum);
            break;
          case "upcoming":
            response = await fetchUpcomingMovies(pageNum);
            break;
          default:
            response = await filterMovies(filters, pageNum);
        }
        setMovies(response.results);
        setTotalPages(response.total_pages);
        setPage(pageNum);
        setCurrentTab(type);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  const handleSearch = useCallback(async (query, pageNum = 1) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await searchMovies(query, pageNum);
      setMovies(response.results);
      setTotalPages(response.total_pages);
      setPage(pageNum);
      setCurrentTab("search");
      setLastSearchedMovie(query);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilterChange = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      setPage(1);
      loadMovies("all", 1);
    },
    [loadMovies]
  );

  useEffect(() => {
    // Load all movies by default
    loadMovies("all", 1);
  }, [loadMovies]);

  const addToFavorites = useCallback((movie) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, movie];
      try {
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      } catch (error) {
        console.error("Error saving favorites:", error);
      }
      return newFavorites;
    });
  }, []);

  const removeFromFavorites = useCallback((movieId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter(
        (movie) => movie.id !== movieId
      );
      try {
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      } catch (error) {
        console.error("Error saving favorites:", error);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (movieId) => {
      return favorites.some((movie) => movie.id === movieId);
    },
    [favorites]
  );

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        error,
        favorites,
        page,
        totalPages,
        currentTab,
        filters,
        lastSearchedMovie,
        loadMovies,
        handleFilterChange,
        handleSearch,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}>
      {children}
    </MovieContext.Provider>
  );
};
