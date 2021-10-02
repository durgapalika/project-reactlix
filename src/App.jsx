import React, { useState, useEffect, useCallback } from 'react';
import {
  fetchGenres,
  fetchMoviesWithGenreNames,
  filterMoviesBySelectedGenres,
} from './api'; // you may add functionality to these functions, but please use them
import Filters from './components/Filters';
import MoviesList from './components/MoviesList';
import './styles.css'; // have a look at this file and feel free to use the classes

export default function App() {
  const [genres, setGenres] = useState();
  const [movies, setMovies] = useState();
  const [displayMovies, setDisplayMovies] = useState();
  const [selectedRating, setSelectedRatting] = useState(3);

  // This hook will run once on component load to get master data
  useEffect(() => {
    const fetchAllData = async () => {
      const gens = await fetchGenres();
      setGenres(gens);

      const movs = await fetchMoviesWithGenreNames(gens);
      setMovies(movs);
      setDisplayMovies(movs);
    };
    fetchAllData();
  }, []);

  // This hook will run when one of the filters arer updated to filterr moviies
  useEffect(() => {
    if (movies) {
      filterMovies();
    }
  }, [selectedRating, genres, movies]);

  //callback hook for rating chnage
  const handleRatingChange = useCallback((rating) => {
    setSelectedRatting(rating);
  }, []);

  // Callback hook on genre click
  const handleGenreChange = (genreId) => {
    const selectedGenre = genres.find((g) => g.id === genreId);
    if (selectedGenre) {
      selectedGenre.checked = !selectedGenre.checked;
    }
    setGenres([...genres]);
  };

  

  // Filter movies based on selected genres and rating
  const filterMovies = () => {
    const filteredMovies = filterMoviesBySelectedGenres(
      movies,
      genres.filter((genre) => genre.checked).map((genre) => genre.id),
      selectedRating
    ).sort((a, b) => parseFloat(a.popularity) > parseFloat(b.popularity));

    setDisplayMovies([...filteredMovies]);
  };

  // Reset filters on reset button click
  const handleResetFilters = async () => {
    setDisplayMovies([...movies]);
    genres.forEach((genre) => (genre.checked = false));
    setGenres([...genres]);
    setSelectedRatting(3);
  };

  return (
    <div className="container">
      {genres && (
        <Filters
          genres={genres}
          onGenreChange={handleGenreChange}
          onRatingChange={handleRatingChange}
          selectedRating={selectedRating}
          handleResetFilters={handleResetFilters}
        />
      )}
      {displayMovies && <MoviesList movies={displayMovies} />}
    </div>
  );
}
