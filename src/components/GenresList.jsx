import React from 'react';
import Genre from './Genre';

const GenresList = ({ genres, onGenreChange }) => {
  return genres ? (
    <div className="genres-list" data-testid="divGenresList">
      {genres.map((genre) => {
        return (
          <Genre
            key={genre.id}
            id={genre.id}
            name={genre.name}
            checked={genre.checked}
            onChange={onGenreChange}
          />
        );
      })}
    </div>
  ) : (
    'Loading Genres'
  );
};

export default GenresList;
