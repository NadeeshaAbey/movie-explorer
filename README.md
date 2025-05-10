# Movie Explorer App

## Overview
Movie Explorer is a web application that allows users to search for movies, view details, and discover trending films. The app fetches real-time data from the TMDb (The Movie Database) API to display information about movies.

## Features
- User authentication with login/signup functionality
- Search for movies with dynamic results
- View movie details including cast, ratings, and trailers
- Discover trending movies
- Save favorite movies to a personal list
- Filter movies by genre
- Light/dark mode toggle

## Technologies Used
- React
- Material-UI (MUI) for styling
- Axios for API requests
- React Router for navigation
- Local Storage for data persistence

## Setup Instructions

1. Clone the repository:
```
git clone https://github.com/yourusername/movie-explorer.git
cd movie-explorer
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory and add your TMDb API key:
```
REACT_APP_TMDB_API_KEY=your_api_key_here
```

4. Update the API key in `src/services/api.js`:
```
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
```

5. Start the development server:
```
npm start
```

6. Open http://localhost:3000 to view it in the browser.

## Demo Credentials
- Username: demo
- Password: password

## API Integration
The app uses The Movie Database (TMDb) API to fetch movie data. You need to sign up for an API key at [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api).

## Folder Structure
- `/src/components` - Reusable UI components
- `/src/contexts` - React Context providers for state management
- `/src/pages` - Main application pages
- `/src/services` - API integration services