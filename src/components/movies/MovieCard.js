import React, { useContext } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../services/api";
import { MovieContext } from "../../context/MovieContext";
import { AuthContext } from "../../context/AuthContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useContext(MovieContext);
  const { isAuthenticated } = useContext(AuthContext);

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  // Format release date to year only
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";

  return (
    <Card className="movie-card" elevation={2}>
      <CardActionArea onClick={handleCardClick}>
        <Box className="movie-poster" sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={
              movie.poster_path
                ? getImageUrl(movie.poster_path, "w500")
                : "/placeholder-poster.jpg"
            }
            alt={movie.title}
          />
          {movie.vote_average > 0 && (
            <Chip
              label={movie.vote_average.toFixed(1)}
              className="rating-chip"
              size="small"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: (theme) => {
                  const rating = movie.vote_average;
                  if (rating >= 7) return theme.palette.success.main;
                  if (rating >= 5) return theme.palette.warning.main;
                  return theme.palette.error.main;
                },
                color: "white",
                fontWeight: "bold",
              }}
            />
          )}
          <IconButton
            size="small"
            onClick={handleFavoriteClick}
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              bgcolor: "rgba(0, 0, 0, 0.5)",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.7)",
              },
              color: (theme) =>
                isFavorite(movie.id) ? theme.palette.secondary.main : "white",
            }}>
            {isFavorite(movie.id) ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>
        <CardContent>
          <Typography
            variant="subtitle1"
            component="h3"
            className="movie-title"
            noWrap>
            {movie.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}>
            <Typography variant="body2" color="text.secondary">
              {releaseYear}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
