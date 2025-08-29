import type { FilterStateT } from '@/types/FilterStateT';
import { createSlice } from '@reduxjs/toolkit';

const initialState: FilterStateT = {
  page: 1,
  selectedGenres: [],
  sorting: {
    name: 'По рейтингу (возр.)',
    value: '-rating',
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setResetFilters: (state) => {
      state.page = 1;
      state.selectedGenres = [];
      state.sorting = {
        name: 'По рейтингу (возр.)',
        value: '-rating',
      };
    },
    setPrevPage: (state) => {
      state.page -= 1;
    },
    setNextPage: (state) => {
      state.page += 1;
    },
    setGenres: (state, action) => {
      state.selectedGenres = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
      state.page = 1;
    },
  },
  selectors: {
    selectPage: (state) => state.page,
    selectGenres: (state) => state.selectedGenres,
    selectSorting: (state) => state.sorting,
  },
});

export const { setPrevPage, setNextPage, setGenres, setSorting, setResetFilters } = filtersSlice.actions;
export const { selectPage, selectGenres, selectSorting } = filtersSlice.selectors;
export default filtersSlice.reducer;
