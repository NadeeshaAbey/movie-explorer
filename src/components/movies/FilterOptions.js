import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Chip,
} from "@mui/material";
import { getGenres } from "../../services/api";

const FilterOptions = ({ onFilterChange, selectedFilters }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get current year for year range
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const genreList = await getGenres();
        setGenres(genreList);
        setError(null);
      } catch (err) {
        setError("Failed to fetch genres");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreChange = useCallback(
    (event) => {
      onFilterChange({ ...selectedFilters, genres: event.target.value });
    },
    [onFilterChange, selectedFilters]
  );

  const handleYearChange = useCallback(
    (event) => {
      onFilterChange({ ...selectedFilters, year: event.target.value });
    },
    [onFilterChange, selectedFilters]
  );

  const handleRatingChange = useCallback(
    (event, newValue) => {
      onFilterChange({ ...selectedFilters, rating: newValue });
    },
    [onFilterChange, selectedFilters]
  );

  const handleSortChange = useCallback(
    (event) => {
      onFilterChange({ ...selectedFilters, sortBy: event.target.value });
    },
    [onFilterChange, selectedFilters]
  );

  const handleClearFilters = useCallback(() => {
    onFilterChange({
      genres: [],
      year: "",
      rating: 0,
      sortBy: "popularity.desc",
    });
  }, [onFilterChange]);

  if (loading) {
    return (
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography>Loading filter options...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Typography variant="h6">Filter Movies</Typography>
        <Button variant="outlined" size="small" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Genre Filter */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Genres</InputLabel>
            <Select
              multiple
              value={selectedFilters.genres}
              onChange={handleGenreChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={genres.find((g) => g.id === value)?.name}
                      size="small"
                    />
                  ))}
                </Box>
              )}>
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Year Filter */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedFilters.year}
              onChange={handleYearChange}
              label="Year">
              <MenuItem value="">Any Year</MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Rating Filter */}
        <Grid item xs={12}>
          <Typography gutterBottom>
            Minimum Rating: {selectedFilters.rating}
          </Typography>
          <Slider
            value={selectedFilters.rating}
            onChange={handleRatingChange}
            min={0}
            max={10}
            step={0.5}
            marks={[
              { value: 0, label: "0" },
              { value: 5, label: "5" },
              { value: 10, label: "10" },
            ]}
          />
        </Grid>

        {/* Sort Options */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={selectedFilters.sortBy}
              onChange={handleSortChange}
              label="Sort By">
              <MenuItem value="popularity.desc">Most Popular</MenuItem>
              <MenuItem value="vote_average.desc">Highest Rated</MenuItem>
              <MenuItem value="release_date.desc">Newest First</MenuItem>
              <MenuItem value="release_date.asc">Oldest First</MenuItem>
              <MenuItem value="title.asc">Title (A-Z)</MenuItem>
              <MenuItem value="title.desc">Title (Z-A)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterOptions;
