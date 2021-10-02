import react from 'react';
import Movie from './Movie';

const MoviesList = ({ movies }) => {
  return (
    <div>
      {movies.map((movie) => {
         return <Movie movie={movie} key={movie.id} />;
      })}
    </div>
  );
};

export default MoviesList;