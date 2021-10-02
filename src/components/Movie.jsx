import React from 'react';

const Movie = ({movie}) => {
  return (
    <div className="movie" data-testid="divMovieCard">
      <div className=".movie-image" data-testid="divMovieImage">
        <img src={movie.image} data-testid="imgMovieImage" />
      </div>
      <div className="movieDetails" data-testid="divmovieDetails">
        <span className="movie-title" data-testid="spanMovieTitle">
          {movie.original_title}
        </span>
        <span className="movie-content" data-testid="spanMovieOverview">
          {movie.overview}
        </span>
        <span className="movie-meta" data-testid="spanMovieRating">
          {`Rating: ${movie.vote_average}`}/10
        </span>
        <span
          className="movie-meta"
          data-testid="spanMoviePopularity"
        >{`Popularity: ${movie.popularity}`}</span>
        <span
          className="movie-meta"
          data-testid="spanMovieGenre"
        >{`Genres: ${movie.movie_genres}`}</span>
      </div>
    </div>
  );
};

export default Movie;
