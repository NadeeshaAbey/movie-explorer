import axios from "axios";

// Get API key from environment variable
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

// Get trending movies
export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await api.get("/trending/movie/day", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

// Search movies by query
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get("/search/movie", {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

// Get movie details by ID
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        append_to_response: "credits,videos",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// Get movie cast
export const getMovieCast = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};

// Get movie videos (trailers)
export const getMovieVideos = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};

// Get movie recommendations
export const getMovieRecommendations = async (movieId, page = 1) => {
  try {
    const response = await api.get(`/movie/${movieId}/recommendations`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);
    throw error;
  }
};

// Helper function to get full image URL
export const getImageUrl = (path, size = "original") => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Get movie genres list
export const getGenres = async () => {
  try {
    const response = await api.get("/genre/movie/list");
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

// Get movies by genre
export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await api.get("/discover/movie", {
      params: {
        with_genres: genreId,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

// Filter movies by year, rating, etc.
export const filterMovies = async (params, page = 1) => {
  try {
    const response = await api.get("/discover/movie", {
      params: {
        ...params,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error filtering movies:", error);
    throw error;
  }
};

// Get top rated movies
export const fetchTopRatedMovies = async (page = 1) => {
  try {
    const response = await api.get("/movie/top_rated", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};

// Get now playing movies
export const fetchNowPlayingMovies = async (page = 1) => {
  try {
    const response = await api.get("/movie/now_playing", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

// Get upcoming movies
export const fetchUpcomingMovies = async (page = 1) => {
  try {
    const response = await api.get("/movie/upcoming", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};
