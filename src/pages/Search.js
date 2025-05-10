import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MovieGrid from "../components/movies/MovieGrid";
import { MovieContext } from "../context/MovieContext";
import GenreFilter from "../components/movies/GenreFilter";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query");

  const {
    movies,
    loading,
    error,
    page,
    totalPages,
    lastSearchedMovie,
    handleSearch,
    loadMovies,
  } = useContext(MovieContext);

  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    if (query) {
      handleSearch(query, 1);
    } else if (lastSearchedMovie) {
      // If no query but we have a last searched movie, redirect to that search
      navigate(`/search?query=${encodeURIComponent(lastSearchedMovie)}`);
    }
  }, [query, lastSearchedMovie, handleSearch, navigate]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      handleSearch(query, page + 1);
    }
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      }
      return [...prev, genreId];
    });
  };

  const filteredMovies =
    selectedGenres.length > 0
      ? movies.filter(
          (movie) =>
            movie.genre_ids &&
            movie.genre_ids.some((genreId) => selectedGenres.includes(genreId))
        )
      : movies;

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {query ? `Search Results for "${query}"` : "Search Movies"}
        </Typography>

        {query && (
          <>
            <GenreFilter
              selectedGenres={selectedGenres}
              onGenreSelect={handleGenreSelect}
            />

            <MovieGrid movies={filteredMovies} loading={false} error={error} />

            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <CircularProgress />
              </Box>
            )}

            {!loading && page < totalPages && (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <Button
                  variant="contained"
                  onClick={handleLoadMore}
                  disabled={loading}>
                  Load More
                </Button>
              </Box>
            )}

            {!loading && movies.length > 0 && page >= totalPages && (
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ my: 4 }}>
                No more results to load
              </Typography>
            )}
          </>
        )}

        {!query && !lastSearchedMovie && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Use the search bar above to find movies.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Search;
