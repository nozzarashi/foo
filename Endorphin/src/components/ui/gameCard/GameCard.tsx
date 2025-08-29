import { deleteGameFromFirebase, selectGamesList } from '@/redux/slices/gamesListSlice';
import { setGameId, setOpenModal } from '@/redux/slices/modalSlice';
import type { GameCardPropsT } from '@/types/GameCardPropsT';
import { Star } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function GameCard({
  name,
  releaseYear,
  rating,
  imgUrl,
  gameId,
  comment,
  isCollectionCard,
  userRating,
  addedGameIds = new Set(),
  fbDocId,
}: GameCardPropsT) {
  const dispatch = useDispatch();

  const isCurrentGameAdded = addedGameIds.has(gameId!);

  const handleButtonClick = useCallback(() => {
    if (!isCollectionCard) {
      dispatch(setOpenModal());
      dispatch(setGameId(gameId));
    }
  }, [dispatch, gameId, isCollectionCard]);

  const handleDeleteButtonClick = useCallback(() => {
    dispatch(deleteGameFromFirebase(fbDocId));
  }, [dispatch, fbDocId]);

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '365px',
        backgroundColor: 'primaryBgColors.main',
        border: '1px solid',
        borderColor: 'primaryBgColors.light',
      }}
    >
      <Link to={`/game/${gameId}`}>
        <CardMedia component="img" alt="карточка игры" sx={{ height: '185px', flexShrink: 0 }} image={imgUrl} />
      </Link>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Link to={`/game/${gameId}`}>
          <Typography sx={{ mb: '12px' }} gutterBottom fontWeight={600} component="div">
            {name}
          </Typography>
        </Link>

        <Box component="div" sx={{ display: 'flex', gap: '6px', alignItems: 'center', mb: '12px' }}>
          <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
            {releaseYear}
          </Typography>
          {userRating ? (
            <>
              <IconButton sx={{ padding: 0 }}>
                <Star sx={{ width: '17px', height: '17px', color: '#FFD600' }} />
              </IconButton>
              <Typography variant="body2" component="span">
                {userRating}/10
              </Typography>
            </>
          ) : (
            <>
              <IconButton sx={{ padding: 0 }}>
                <Star sx={{ width: '17px', height: '17px' }} />
              </IconButton>
              <Typography
                variant="body2"
                component="span"
                sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: '2px' }}
              >
                {rating}
              </Typography>
            </>
          )}
        </Box>
        {comment && (
          <Box component="div">
            <Typography
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
              variant="body2"
            >
              {comment}
            </Typography>
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', pb: '18px' }}>
        {isCollectionCard ? (
          <Button
            onClick={handleDeleteButtonClick}
            sx={{
              color: 'primaryColors.light',
              backgroundColor: 'error.main',
              textTransform: 'none',
              width: '80%',
              borderRadius: '100px',
            }}
          >
            Удалить
          </Button>
        ) : isCurrentGameAdded ? (
          // Если игра уже в коллекции - показываем надпись
          <Button
            disableRipple
            sx={{
              cursor: 'auto',
              color: '#fff',
              backgroundColor: 'success.light',
              textTransform: 'none',
              width: '80%',
              borderRadius: '100px',
            }}
          >
            Уже в коллекции
          </Button>
        ) : (
          <Button
            onClick={handleButtonClick}
            sx={{
              color: 'primaryColors.light',
              backgroundColor: 'secondaryBgColors.main',
              textTransform: 'none',
              width: '80%',
              borderRadius: '100px',
            }}
          >
            Добавить
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export { GameCard };
