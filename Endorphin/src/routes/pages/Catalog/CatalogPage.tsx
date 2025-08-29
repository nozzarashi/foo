import { Autocomplete, Box, Button, Checkbox, InputAdornment, TextField, Typography } from '@mui/material';
import { catalogPageStyles } from './catalogPageStyles';
import { GameCard } from '@/components/ui/gameCard/GameCard';

import TuneIcon from '@mui/icons-material/Tune';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useGetGamesQuery, useGetGenresQuery } from '@/redux/store/gamesApi';
import type { GameInfoFromApiT } from '@/types/GameInfoFromApiT';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectGenres,
  selectPage,
  selectSorting,
  setGenres,
  setNextPage,
  setPrevPage,
  setResetFilters,
  setSorting,
} from '@/redux/slices/filtersSlice';
import { useState } from 'react';
import type { GenresListT, SortingT } from '@/types/FilterStateT';
import SearchIcon from '@mui/icons-material/Search';
import { GameCardModal } from '@/components/ui/gameCardModal/GameCardModal';
import { selectIsModalOpen } from '@/redux/slices/modalSlice';
import { globalStyles } from '@/app/globalStyles';
import { selectGameIdsInCollection } from '@/redux/slices/gamesListSlice';

const filters = {
  sorting: [
    { name: 'По рейтингу (убыв.)', value: 'rating' },
    {
      name: 'По рейтингу (возр.)',
      value: '-rating',
    },
    {
      name: 'По новизне (убыв)',
      value: '-released',
    },
    {
      name: 'По новизне (возр)',
      value: 'released',
    },
    {
      name: 'По Metacritic',
      value: '-metacritic',
    },
  ],
};

function CatalogPage() {
  const [isHidden, setIsHidden] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();
  const currentPage = useSelector(selectPage);
  const currentGenres = useSelector(selectGenres);
  const currentSorting = useSelector(selectSorting);
  const isModalOpened = useSelector(selectIsModalOpen);

  const gameIdsInCollection = useSelector(selectGameIdsInCollection);

  const gamesListResponse = useGetGamesQuery({
    page: currentPage,
    genres: currentGenres,
    search: searchValue,
    sorting: currentSorting.value,
  });

  const gamesListData = gamesListResponse.data;

  const genresResponse = useGetGenresQuery('');
  const genresData = genresResponse.data;

  const isShowResetBtn = currentGenres.length > 0 || searchValue.length > 0 || currentSorting.value !== '-rating';

  if (!gamesListData || !genresData) {
    return;
  }

  const gamesList = gamesListData.results;
  const genresList = genresData.results;

  function handleResetFilters() {
    dispatch(setResetFilters());
  }

  function handleButtonPrevPage() {
    dispatch(setPrevPage());
  }

  function handleButtonNextPage() {
    dispatch(setNextPage());
  }

  function handleAutocompleteGenres(_event: React.SyntheticEvent, newValue: GenresListT[]) {
    dispatch(setGenres(newValue));
  }

  function handleAutocompleteSorting(_event: React.SyntheticEvent, newValue: SortingT | null) {
    dispatch(setSorting(newValue));
  }

  function handleSearchGames(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <>
      {isModalOpened && <GameCardModal />}
      <Box component="div">
        <TextField
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          value={searchValue}
          onChange={handleSearchGames}
          sx={catalogPageStyles.searchInput}
          color="info"
          label="Поиск игр"
          variant="outlined"
          fullWidth
        />

        <Box component="div" sx={catalogPageStyles.filterButtonsContainer}>
          <Button
            onClick={() => {
              setIsHidden(!isHidden);
            }}
            sx={catalogPageStyles.filterButton}
            startIcon={<TuneIcon />}
            variant="outlined"
          >
            Фильтры
          </Button>

          {isShowResetBtn && (
            <Button onClick={handleResetFilters} sx={catalogPageStyles.filterResetButton} variant="text">
              Сбросить фильтры
            </Button>
          )}
        </Box>

        {isHidden && (
          <Box sx={catalogPageStyles.filterWrapper} component="div">
            <Autocomplete
              value={currentGenres}
              onChange={handleAutocompleteGenres}
              fullWidth
              options={genresList.map((genre: GenresListT) => {
                return { name: genre.name, slug: genre.slug };
              })}
              multiple
              limitTags={4}
              disableCloseOnSelect
              isOptionEqualToValue={(option: GenresListT, value: GenresListT) => option.slug === value.slug}
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li style={{ color: 'defaultColors.main' }} key={key} {...optionProps}>
                    <Checkbox style={{ marginRight: 'none' }} checked={selected} />
                    {option.name}
                  </li>
                );
              }}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField color="info" {...params} label="Жанры" />}
            />

            <Autocomplete
              value={currentSorting}
              onChange={handleAutocompleteSorting}
              fullWidth
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li style={{ color: 'defaultColors.main' }} key={key} {...optionProps}>
                    <Checkbox style={{ marginRight: 'none' }} checked={selected} />
                    {option.name}
                  </li>
                );
              }}
              getOptionLabel={(option) => {
                return option.name;
              }}
              options={filters.sorting}
              renderInput={(params) => <TextField color="info" {...params} label="Сортировка" />}
            />
          </Box>
        )}

        <Box component="div" sx={globalStyles.gameList}>
          {gamesList.map((game: GameInfoFromApiT) => {
            const released = new Date(game.released).getFullYear();
            return (
              <GameCard
                gameId={game.id}
                key={game.id}
                name={game.name}
                imgUrl={game.background_image}
                releaseYear={released}
                rating={game.rating}
                isCollectionCard={false}
                addedGameIds={gameIdsInCollection}
              />
            );
          })}
        </Box>

        <Box sx={catalogPageStyles.buttonsContainer} component="div">
          <Button
            disabled={currentPage == 1}
            onClick={handleButtonPrevPage}
            sx={{
              border: '1px solid',
              textTransform: 'none',
              minWidth: '120px',
            }}
            variant="outlined"
            startIcon={<NavigateBeforeIcon />}
          >
            Назад
          </Button>
          <Typography component="span">Страница {currentPage}</Typography>
          <Button
            onClick={handleButtonNextPage}
            sx={{
              border: '1px solid',
              textTransform: 'none',
              minWidth: '120px',
            }}
            variant="outlined"
            endIcon={<NavigateNextIcon />}
          >
            Вперед
          </Button>
        </Box>
      </Box>
    </>
  );
}

export { CatalogPage };
