import React from 'react';
import GenresList from './GenresList';
import RatingSelection from './RatingSelection';

const Filters = ({ genres, onGenreChange, onRatingChange, selectedRating,handleResetFilters }) => {
  return (
    <div className="filters">
      <GenresList genres={genres} onGenreChange={onGenreChange} />
      <RatingSelection
        onRatingChange={onRatingChange}
        selectedRating={selectedRating}
      />
      <button onClick={handleResetFilters} className="reset-button">
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
