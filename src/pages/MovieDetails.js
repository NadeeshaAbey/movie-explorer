import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Chip,
  Grid,
  Paper,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Star,
  CalendarToday,
  AccessTime,
  Language,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getImageUrl } from "../services/api";
import { MovieContext } from "../context/MovieContext";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useContext(MovieContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch movie details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteClick = () => {
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

  if (loading) {
    return <LoadingSpinner message="Loading movie details..." />;
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography
          color="error"
          variant="h6"
          sx={{ my: 4, textAlign: "center" }}>
          {error}
        </Typography>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ my: 4, textAlign: "center" }}>
          Movie not found
        </Typography>
      </Container>
    );
  }

  // Find trailer if available
  const trailerVideo = movie.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div className="movie-details">
      {/* Backdrop */}
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, "w1280")})`,
        }}>
        <div className="backdrop-gradient">
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: "white", fontWeight: "bold" }}>
            {movie.title}
          </Typography>
        </div>

        <div className="movie-actions">
          <Tooltip
            title={
              isFavorite(movie.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }>
            <IconButton
              onClick={handleFavoriteClick}
              sx={{
                bgcolor: "rgba(0, 0, 0, 0.6)",
                color: (theme) =>
                  isFavorite(movie.id) ? theme.palette.secondary.main : "white",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.8)",
                },
              }}>
              {isFavorite(movie.id) ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Main Info */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: "100%",
            }}>
            <Box
              component="img"
              src={getImageUrl(movie.poster_path, "w500")}
              alt={movie.title}
              sx={{
                width: "100%",
                display: "block",
                objectFit: "cover",
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {movie.title}
            {movie.release_date && (
              <Typography component="span" variant="h5" color="text.secondary">
                {` (${new Date(movie.release_date).getFullYear()})`}
              </Typography>
            )}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              flexWrap: "wrap",
              gap: 2,
            }}>
            {movie.vote_average > 0 && (
              <Chip
                icon={<Star />}
                label={`${movie.vote_average.toFixed(1)}/10`}
                color="primary"
              />
            )}

            {movie.release_date && (
              <Chip
                icon={<CalendarToday />}
                label={new Date(movie.release_date).toLocaleDateString()}
                variant="outlined"
              />
            )}

            {movie.runtime > 0 && (
              <Chip
                icon={<AccessTime />}
                label={`${movie.runtime} min`}
                variant="outlined"
              />
            )}

            {movie.homepage && (
              <Tooltip title="Visit official website">
                <Chip
                  icon={<Language />}
                  label="Website"
                  component="a"
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  clickable
                  variant="outlined"
                />
              </Tooltip>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            {movie.genres?.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                variant="outlined"
                className="genre-chip"
              />
            ))}
          </Box>

          <Typography variant="h6" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1" paragraph>
            {movie.overview || "No overview available."}
          </Typography>

          {/* Additional details */}
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              {movie.production_companies?.length > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Production
                  </Typography>
                  <Typography variant="body2">
                    {movie.production_companies
                      .map((company) => company.name)
                      .join(", ")}
                  </Typography>
                </Grid>
              )}

              {movie.spoken_languages?.length > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Languages
                  </Typography>
                  <Typography variant="body2">
                    {movie.spoken_languages
                      .map((lang) => lang.english_name)
                      .join(", ")}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Trailer */}
      {trailerVideo && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" component="h2" className="section-title">
            Trailer
          </Typography>
          <div className="trailer-container">
            <iframe
              src={`https://www.youtube.com/embed/${trailerVideo.key}`}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Box>
      )}

      {/* Cast */}
      {movie.credits?.cast?.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" component="h2" className="section-title">
            Cast
          </Typography>
          <div className="cast-list">
            {movie.credits.cast.slice(0, 10).map((person) => (
              <div key={person.id} className="cast-item">
                <Avatar
                  src={
                    person.profile_path
                      ? getImageUrl(person.profile_path, "w185")
                      : ""
                  }
                  alt={person.name}
                  className="cast-avatar"
                  sx={{ width: 80, height: 80, mx: "auto" }}
                />
                <Typography variant="subtitle2" noWrap>
                  {person.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {person.character}
                </Typography>
              </div>
            ))}
          </div>
        </Box>
      )}
    </div>
  );
};

export default MovieDetails;
