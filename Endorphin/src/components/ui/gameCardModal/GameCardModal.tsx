import { Autocomplete, Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { gameCardModalStyles } from './gameCardModalStyles';

import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGameId, setCloseModal } from '@/redux/slices/modalSlice';
import { useLazyGetGameByIdQuery } from '@/redux/store/gamesApi';
import type { SortingT } from '@/types/FilterStateT';
import { addGameToFirebase, selectFetchStatus } from '@/redux/slices/gamesListSlice';
import { useAppDispatch } from '@/redux/hooks';
import { statuses } from '@/constants/statuses';

function GameCardModal() {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const dispatch = useAppDispatch();

  const fetchStatus = useSelector(selectFetchStatus);
  const currentGameId = useSelector(selectGameId);

  const [status, setStatus] = useState<SortingT | null>({
    name: 'Хочу поиграть',
    value: 'in planning',
  });

  const [triggerGetGameById, { data, isLoading, isSuccess, isError }] = useLazyGetGameByIdQuery();

  function handleEbanniyKeyDaun(e: React.KeyboardEvent<HTMLInputElement>) {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault();
    }
  }

  function handleRatingField(e: React.ChangeEvent<HTMLInputElement>) {
    setRating(e.target.value);

    const numValue = Number(e.target.value);

    if (numValue > 10) {
      setRating('');
    }
  }

  function handleCloseModal(event: React.MouseEvent<HTMLElement>) {
    const target = event.target as HTMLElement;
    if (target.id === 'game-modal-overlay' || target.closest('#game-modal-close-button')) {
      dispatch(setCloseModal());
    }
  }

  async function handleAddToCollection(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const gameData = await triggerGetGameById(String(currentGameId)).unwrap();

      const { id, name, background_image, released, description_raw, developers, genres } = gameData;

      const gameInfoToSave = {
        name,
        id,
        background_image,
        released,
        description_raw,
        developers: developers.map((dev) => dev.name).join(', '),
        status: status!.value,
        rating,
        comment: comment ? comment : null,
      };

      await dispatch(addGameToFirebase(gameInfoToSave));
      dispatch(setCloseModal());
    } catch (error) {
      console.error('Ошибка:', error.message);
    }
  }

  function handleAutocompleteSorting(_event: React.SyntheticEvent, newValue: SortingT | null) {
    setStatus(newValue);
  }

  function handleCommentChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setComment(e.target.value);
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Box onClick={handleCloseModal} id="game-modal-overlay" component="div" sx={gameCardModalStyles.overlay}>
      <Box component="div" sx={gameCardModalStyles.wrapper}>
        <Box component="div" sx={gameCardModalStyles.content}>
          <Box component="div" sx={gameCardModalStyles.modalHeader}>
            <Typography component="h3">Добавить игру </Typography>
            <IconButton id="game-modal-close-button">
              <CloseIcon />
            </IconButton>
          </Box>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} onSubmit={handleAddToCollection}>
            <Autocomplete<SortingT>
              size="small"
              value={status}
              onChange={handleAutocompleteSorting}
              options={statuses}
              fullWidth
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <li style={{ color: 'defaultColors.main' }} key={key} {...optionProps}>
                    {option.name}
                  </li>
                );
              }}
              getOptionLabel={(option) => {
                return option.name;
              }}
              renderInput={(params) => <TextField required color="info" {...params} label="Сортировка" />}
            />
            <TextField
              required
              label="Оцените игру (1-10)"
              value={rating}
              onKeyDown={handleEbanniyKeyDaun}
              onChange={handleRatingField}
              type="number"
              size="small"
              fullWidth
              variant="outlined"
            />

            <TextField
              minRows={4}
              multiline
              label="Комментарий об игре"
              value={comment}
              onChange={handleCommentChange}
              size="small"
              fullWidth
              variant="outlined"
            />

            <Button disabled={fetchStatus === 'loading'} type="submit" fullWidth>
              Добавить в коллекцию
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export { GameCardModal };
