import type { GenresListT } from '@/types/FilterStateT';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiKey = '393af8754d6a43609e968ad0c2301f2e';

export function buildGetGamesUrl({ page = 1, genres = [], search = '', sorting }) {
  const slugs = genres.map((genre: GenresListT) => {
    return genre.slug;
  });
  const genresParamString = slugs.join(',');

  const genresParam = genres.length === 0 ? '' : `&genres=${genresParamString}`;
  const searchParam = search ? `&search=${search}` : '';

  const dateNow = new Date().toISOString().slice(0, 10);
  const datesParam = `&dates=1970-01-01,${dateNow}`;

  return `/games?key=${apiKey}&page=${page}${genresParam}${searchParam}&ordering=${sorting}${datesParam}`;
}

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.rawg.io/api' }),
  endpoints: (builder) => {
    return {
      getGames: builder.query({
        query: buildGetGamesUrl,
      }),
      getGenres: builder.query({
        query: () => {
          return `/genres?key=${apiKey}`;
        },
      }),
      getGameById: builder.query({
        query: (id) => {
          return `/games/${id}?key=${apiKey}`;
        },
      }),
      getGameScreenShots: builder.query({
        query: (id) => {
          return `/games/${id}/screenshots?key=${apiKey}`;
        },
      }),
    };
  },
});

export const {
  useGetGamesQuery,
  useGetGenresQuery,
  useGetGameByIdQuery,
  useLazyGetGameByIdQuery,
  useGetGameScreenShotsQuery,
} = gamesApi;
