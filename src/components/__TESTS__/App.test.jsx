import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../../App';
import fetchMock from 'jest-fetch-mock';
import genres from '../../../public/genres.json';
import movies from '../../../public/movies.json';

fetchMock.enableMocks();

describe('Main App', () => {
  beforeEach(async () => {
    await act(async () => {
      fetchMock.doMock();
      fetchMock.mockResponse((reques) => {
        return reques.url === './genres.json'
          ? Promise.resolve(JSON.stringify(genres))
          : Promise.resolve(JSON.stringify(movies));
      });
    });
  });

  it('Renders the genres correctly', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByTestId('divGenresList')).toBeVisible();
   

    // TODO: Repeat this for all the Genres
    expect(screen.getByTestId('genreItem-12')).toBeVisible();
    expect(screen.getByTestId('genreLabel-12')).toBeVisible();
    expect(screen.getByTestId('genreCheckbox-12')).toBeVisible();
    expect(screen.getByTestId('genreLabel-12')).toHaveTextContent('Adventure');
    expect(screen.getByTestId('genreCheckbox-12')).not.toHaveAttribute(
      'checked'
    );
  });

  it('Displays all movies by default', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.queryAllByTestId('divMovieCard')).toHaveLength(20);
  });

  it('Filters movies correctly on genre selection', async () => {
    await act(async () => {
      render(<App />);
    });

    const adventureCheckBox = screen.getByTestId('genreCheckbox-12');
    fireEvent.click(adventureCheckBox);

    // 5 movies should be displayed on Adventure Genre
    await waitFor(() => {
      expect(screen.queryAllByTestId('divMovieCard')).toHaveLength(5);
    });

    const horrorCheckBox = screen.getByTestId('genreCheckbox-28');
    fireEvent.click(horrorCheckBox);
    // 3 movies should be displayed on Adventure and Horror Genre
    await waitFor(() => {
      expect(screen.queryAllByTestId('divMovieCard')).toHaveLength(3);
    });

    const selectRatingList = screen.getByTestId('selectRating');
    fireEvent.change(selectRatingList, { target: { value: 7 } });
    await waitFor(() => {
      expect(screen.queryAllByTestId('divMovieCard')).toHaveLength(2);
    });

    fireEvent.change(selectRatingList, { target: { value: 7.5 } });
    await waitFor(() => {
      expect(screen.queryAllByTestId('divMovieCard')).toHaveLength(1);
    });

    fireEvent.change(selectRatingList, { target: { value: 9 } });
    await waitFor(() => {
      expect(screen.queryAllByTestId('divMovieCard')).toHaveLength(0);
    });
  });
});
