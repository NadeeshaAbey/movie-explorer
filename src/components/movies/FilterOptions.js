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
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { getGenres } from "../../services/api";

const FilterOptions = ({ onFilterChange, selectedFilters }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      onFilterChange({ ...selectedFilters, rating: Number(newValue) });
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

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const filterContent = (
    <Box sx={{ p: 2 }}>
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

      <Grid container spacing={2}>
        {/* Genre Filter */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Genres</InputLabel>
            <Select
              label="Genres"
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
        <Grid item xs={12}>
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
            Minimum Rating: {selectedFilters.rating.toFixed(1)}
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
    </Box>
  );

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

  if (isMobile) {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<FilterIcon />}
            onClick={toggleDrawer(true)}>
            Filters
          </Button>
        </Box>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: "85%",
              maxWidth: 320,
            },
          }}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Typography variant="h6">Filter Movies</Typography>
            <IconButton onClick={toggleDrawer(false)} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </Box>

            <Grid container spacing={2}>
              {/* Genre Filter */}
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Genres</InputLabel>
                  <Select
                    label="Genres"
                    multiple
                    size="small"
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
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Year</InputLabel>
                  <Select
                    size="small"
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
                <Typography variant="body2" gutterBottom>
                  Min Rating: {selectedFilters.rating.toFixed(1)}
                </Typography>
                <Slider
                  size="small"
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
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    size="small"
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
          </Box>
        </Drawer>
      </>
    );
  }

  return <Paper sx={{ p: 2, mb: 3 }}>{filterContent}</Paper>;
};

export default FilterOptions;
