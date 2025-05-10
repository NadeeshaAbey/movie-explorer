# Movie Explorer

A modern web application for exploring movies, built with React and Material-UI. This application allows users to discover, search, and save their favorite movies using the TMDb API.

## Features

- 🎬 Browse movies by different categories (All Movies, Trending)
- 🔍 Search functionality with persistent search history
- ⭐ Save favorite movies
- 🎯 Filter movies by:
  - Genres
  - Release year
  - Rating
  - Sort options (popularity, rating, release date, title)
- 🌓 Dark/Light mode toggle
- 📱 Responsive design for all devices
- 🔐 User authentication (signup/login)
- 💾 Persistent data storage using localStorage

## Technologies Used

- React.js
- Material-UI (MUI)
- React Router
- Context API for state management
- TMDb API
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDb API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movie-explorer.git
cd movie-explorer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your TMDb API key:
```
REACT_APP_TMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## Usage

### Browsing Movies
- Use the "All Movies" tab to browse all available movies
- Switch to "Trending" tab to see currently trending movies
- Use the filter options to narrow down your search

### Searching
- Use the search bar in the header to find specific movies
- Your last search will be remembered and displayed in the search bar
- Search results can be filtered by genre

### User Features
- Create an account or log in to access additional features
- Add movies to your favorites
- Your favorites will persist across sessions
- Toggle between dark and light mode using the theme switch

### Filtering Options
- Filter by multiple genres
- Select specific release years
- Set minimum rating
- Sort by:
  - Most Popular
  - Highest Rated
  - Newest First
  - Oldest First
  - Title (A-Z)
  - Title (Z-A)

## Project Structure

```
src/
├── components/
│   ├── common/
│   ├── layout/
│   └── movies/
├── context/
├── pages/
├── services/
└── utils/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TMDb](https://www.themoviedb.org/) for providing the movie data API
- [Material-UI](https://mui.com/) for the UI components
- [React](https://reactjs.org/) for the frontend framework