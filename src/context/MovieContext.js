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
    rating: 0,
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

  const transformFilters = useCallback((filters) => {
    const transformedFilters = {
      sort_by: filters.sortBy,
    };

    if (filters.genres.length > 0) {
      transformedFilters.with_genres = filters.genres.join(",");
    }

    if (filters.year) {
      transformedFilters.primary_release_year = filters.year;
    }

    if (filters.rating > 0) {
      transformedFilters["vote_average.gte"] = filters.rating;
    }

    return transformedFilters;
  }, []);

  const loadMovies = useCallback(
    async (type = "all", filters = {}, pageNum = 1) => {
      try {
        setLoading(true);
        setError(null);
        let response;

        switch (type) {
          case "trending":
            response = await fetchTrendingMovies(pageNum);
            break;
          case "top_rated":
            response = await fetchTopRatedMovies(pageNum);
            break;
          case "now_playing":
            response = await fetchNowPlayingMovies(pageNum);
            break;
          case "upcoming":
            response = await fetchUpcomingMovies(pageNum);
            break;
          default:
            response = await filterMovies(transformFilters(filters), pageNum);
        }

        if (response) {
          setMovies((prevMovies) =>
            pageNum === 1
              ? response.results
              : [...prevMovies, ...response.results]
          );
          setPage(pageNum);
          setTotalPages(response.total_pages);
          setCurrentTab(type);
        }
      } catch (err) {
        setError("Failed to load movies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSearch = useCallback(async (query, pageNum = 1) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await searchMovies(query, pageNum);

      if (response) {
        setMovies((prevMovies) =>
          pageNum === 1
            ? response.results
            : [...prevMovies, ...response.results]
        );
        setTotalPages(response.total_pages);
        setPage(pageNum);
        setCurrentTab("search");
        setLastSearchedMovie(query);
      }
    } catch (err) {
      setError("Failed to search movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilterChange = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      setPage(1);
      loadMovies(currentTab, newFilters, 1);
    },
    [loadMovies, currentTab]
  );

  // Load movies when tab changes
  useEffect(() => {
    if (currentTab === "all") {
      loadMovies("all", filters, 1);
    } else if (currentTab === "trending") {
      loadMovies("trending", {}, 1);
    } else if (currentTab === "top_rated") {
      loadMovies("top_rated", {}, 1);
    } else if (currentTab === "now_playing") {
      loadMovies("now_playing", {}, 1);
    } else if (currentTab === "upcoming") {
      loadMovies("upcoming", {}, 1);
    }
  }, [currentTab, loadMovies, filters]);

  // Initial load
  useEffect(() => {
    loadMovies("all", filters, 1);
  }, [loadMovies, filters]);

  const handleTabChange = useCallback((newTab) => {
    setCurrentTab(newTab);
    setPage(1);
  }, []);

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
        handleTabChange,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}>
      {children}
    </MovieContext.Provider>
  );
};
