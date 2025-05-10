import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, loading, error, title }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography color="error" variant="subtitle1">{error}</Typography>
      </Box>
    );
  }

  if (movies?.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="subtitle1">No movies found.</Typography>
      </Box>
    );
  }

  return (
    <>
      {title && (
        <Typography variant="h4" component="h2" sx={{ px: 3, pt: 3, pb: 1 }}>
          {title}
        </Typography>
      )}
      <div className="movie-grid">
        {movies?.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MovieGrid;