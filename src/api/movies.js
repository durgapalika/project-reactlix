
const fetchMovies = async () => {
  return await fetch('./movies.json')
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export const fetchMoviesWithGenreNames = async (genres) => {
  const movies = await fetchMovies();
  return movies.map((movie) => {
    movie.image = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
    const movieGenres = genres
      .filter((genre) => movie.genre_ids?.includes(genre.id))
      .map((genre) => genre.name);

    movie.movie_genres = movieGenres.reduce(
      (previousGenre, currentGenre, index) =>
        [previousGenre, currentGenre].join(
          index === movieGenres.length - 1 ? ' and ' : ', '
        )
    );
    return movie;
  }).sort(
    (a, b) => parseFloat(a.popularity) > parseFloat(b.popularity)
  );;
};

export const filterMoviesBySelectedGenres = (
  movies,
  selectedGenreIds,
  selectedRating
) => {
  return movies.filter(
    (movie) =>
      selectedGenreIds.every((value) => movie.genre_ids.includes(value)) &&
      movie.vote_average >= selectedRating
  );
};
