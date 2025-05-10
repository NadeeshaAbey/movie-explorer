import React, { useContext } from 'react';
import { Container, Typography, Box } from '@mui/material';
import MovieGrid from '../components/movies/MovieGrid';
import { MovieContext } from '../context/MovieContext';

const Favorites = () => {
  const { favorites } = useContext(MovieContext);

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Favorite Movies
        </Typography>
        
        {favorites.length > 0 ? (
          <MovieGrid movies={favorites} loading={false} error={null} />
        ) : (
          <Box sx={{ textAlign: 'center', my: 6 }}>
            <Typography variant="h6" gutterBottom>
              You haven't added any favorites yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Browse movies and click the heart icon to add them to your favorites
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Favorites;