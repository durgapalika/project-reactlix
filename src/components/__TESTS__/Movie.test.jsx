import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Movie from '../Movie';
import '@testing-library/jest-dom/extend-expect';

const movie = {
  adult: false,
  backdrop_path: '/srYya1ZlI97Au4jUYAktDe3avyA.jpg',
  genre_ids: [14, 28, 12],
  id: 464052,
  original_language: 'en',
  original_title: 'Wonder Woman 1984',
  overview:
    'Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah.',
  popularity: 2407.318,
  poster_path: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
  release_date: '2020-12-16',
  title: 'Wonder Woman 1984',
  video: false,
  vote_average: 7,
  vote_count: 3437,
  movie_genres: 'Adventure, Fantasy and Action',
};

const renderComponent = (ui) => {
  return render(ui);
};

describe('Movies', () => {
  beforeEach(async () => {
    await act(async () => {
      renderComponent(<Movie movie={movie} />);
    });
  });

  it('Renders the movie correctly', async () => {
    expect(screen.queryAllByTestId('divMovieCard')).toHaveLength(1);
    expect(await screen.findByTestId('divMovieImage')).toBeVisible();
    expect(await screen.findByTestId('imgMovieImage')).toBeVisible();
    expect(await screen.findByTestId('divmovieDetails')).toBeVisible();
    expect(await screen.findByTestId('spanMovieTitle')).toBeVisible();
    expect(await screen.findByTestId('spanMovieOverview')).toBeVisible();
    expect(await screen.findByTestId('spanMovieRating')).toBeVisible();
    expect(await screen.findByTestId('spanMoviePopularity')).toBeVisible();
    expect(await screen.findByTestId('spanMovieGenre')).toBeVisible();
  });

  it('Renders the text correctly', async () => {
    expect((await screen.findByTestId('spanMovieTitle')).textContent).toBe(
      'Wonder Woman 1984'
    );
    expect((await screen.findByTestId('spanMovieOverview')).textContent).toBe(
      'Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah.'
    );
    expect((await screen.findByTestId('spanMovieRating')).textContent).toBe(
      'Rating: 7/10'
    );
    expect((await screen.findByTestId('spanMoviePopularity')).textContent).toBe(
      'Popularity: 2407.318'
    );
    expect((await screen.findByTestId('spanMovieGenre')).textContent).toBe(
      'Genres: Adventure, Fantasy and Action'
    );
  });
});
