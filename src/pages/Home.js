import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  CircularProgress,
} from "@mui/material";
import MovieGrid from "../components/movies/MovieGrid";
import { MovieContext } from "../context/MovieContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import FilterOptions from "../components/movies/FilterOptions";

const Home = () => {
  const {
    movies,
    loading,
    error,
    page,
    totalPages,
    currentTab,
    loadMovies,
    filters,
    handleFilterChange,
  } = useContext(MovieContext);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 1) {
      // If trending tab is selected, load trending movies
      loadMovies("trending", 1, true);
    } else {
      // For other tabs, load all movies
      loadMovies("all", 1, true);
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      loadMovies(currentTab, page + 1);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Discover Your Favorite Films
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Explore movies, find detailed information, and save your favorites
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile>
          <Tab label="All Movies" />
          <Tab label="Trending" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <FilterOptions
          selectedFilters={filters}
          onFilterChange={handleFilterChange}
        />
      )}

      {loading && page === 1 ? (
        <LoadingSpinner message="Loading movies..." />
      ) : (
        <>
          <MovieGrid movies={movies} loading={false} error={error} />

          {loading && page > 1 && (
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
    </Container>
  );
};

export default Home;
