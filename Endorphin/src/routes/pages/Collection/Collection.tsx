import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { collectionStyles } from './collectionStyles';
import { useState } from 'react';
import { statuses } from '@/constants/statuses';
import { selectGameIdsInCollection, selectGamesList } from '@/redux/slices/gamesListSlice';
import { useSelector } from 'react-redux';
import { globalStyles } from '@/app/globalStyles';
import { GameCard } from '@/components/ui/gameCard/GameCard';

function Collection() {
  const [gamesSortingBy, setGamesSortingBy] = useState('all');
  const gamesList = useSelector(selectGamesList);
  const gameIdsInCollection = useSelector(selectGameIdsInCollection);

  return (
    <>
      <Typography sx={collectionStyles.title} variant="h1">
        Моя коллекция
      </Typography>

      <Box component="div" sx={collectionStyles.buttonsWrapper}>
        <ButtonGroup fullWidth variant="contained">
          {statuses.map((button) => {
            return (
              <Button
                sx={{
                  fontWeight: '600',
                  backgroundColor: gamesSortingBy === button.value ? 'selectedColors.main' : 'navColors.main',
                  color: gamesSortingBy === button.value ? '#fff' : 'defaultColors.main',
                  textTransform: 'none',
                }}
                onClick={() => setGamesSortingBy(button.value)}
              >
                {button.name}
              </Button>
            );
          })}
        </ButtonGroup>
      </Box>

      <Box component="div" sx={globalStyles.gameList}>
        {gamesList.map((game) => {
          if (gamesSortingBy !== 'all' && game.status !== gamesSortingBy) return null;

          const released = new Date(game.released).getFullYear();
          return (
            <GameCard
              gameId={game.id}
              key={game.id}
              name={game.name}
              imgUrl={game.background_image}
              releaseYear={released}
              userRating={game.rating}
              isCollectionCard={true}
              comment={game.comment ? game.comment : ''}
              addedGameIds={gameIdsInCollection}
              fbDocId={game.fbDocId}
            />
          );
        })}
      </Box>
    </>
  );
}

export { Collection };
