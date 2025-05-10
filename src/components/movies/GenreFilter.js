import React, { useState, useEffect } from 'react';
import { Box, Chip, Typography, CircularProgress } from '@mui/material';
import { getGenres } from '../../services/api';

const GenreFilter = ({ selectedGenres, onGenreSelect }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const genreList = await getGenres();
        setGenres(genreList);
        setError(null);
      } catch (err) {
        setError('Failed to fetch genres');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    onGenreSelect(genreId);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ my: 2 }}>
        <Typography color="error" variant="caption">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 2, overflowX: 'auto' }}>
      {genres.map((genre) => (
        <Chip
          key={genre.id}
          label={genre.name}
          clickable
          onClick={() => handleGenreClick(genre.id)}
          color={selectedGenres.includes(genre.id) ? 'primary' : 'default'}
          variant={selectedGenres.includes(genre.id) ? 'filled' : 'outlined'}
          sx={{ m: 0.5 }}
        />
      ))}
    </Box>
  );
};

export default GenreFilter;