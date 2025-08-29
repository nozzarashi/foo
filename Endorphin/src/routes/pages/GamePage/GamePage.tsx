import { useGetGameByIdQuery, useGetGameScreenShotsQuery } from '@/redux/store/gamesApi';
import { Box, CardMedia, CircularProgress, IconButton, Skeleton, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { gamePageStyles } from './gamePageStyles';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

function GamePage() {
  const { gameId } = useParams();

  const { data: gameData, isLoading } = useGetGameByIdQuery(gameId);
  const { data: gameScreenshots } = useGetGameScreenShotsQuery(gameId);

  if (isLoading || !gameData || !gameScreenshots) {
    return (
      <Box component="div">
        <Skeleton width="100%" height="500px" />
        <Skeleton width="100%" height="500px" />
      </Box>
    );
  }

  return (
    <Box sx={gamePageStyles.container} component="div">
      <Box sx={gamePageStyles.body} component="div">
        <CardMedia sx={gamePageStyles.mainImage} component="img" image={gameData.background_image} />

        <Box component="div">
          <Typography sx={gamePageStyles.gameTitle} component="h1">
            {gameData.name}
          </Typography>
          <Box sx={gamePageStyles.genresContainer} component="div">
            {gameData.genres.map((genre: { id: number; name: string }) => (
              <Typography sx={gamePageStyles.genre} key={genre.id} component="span">
                {genre.name}
              </Typography>
            ))}
          </Box>

          <Typography component="span">Описание</Typography>
          <Typography variant="body2">{gameData.description_raw}</Typography>

          <Box component="div">
            <Typography component="span">Скриншоты</Typography>
            <Box sx={gamePageStyles.screenshotsContainer} component="div">
              {gameScreenshots.results.map((gameScreen: { image: string }) => {
                return <CardMedia sx={gamePageStyles.mainImage} component="img" image={gameScreen.image} />;
              })}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* //////////////////// */}
      <Box sx={gamePageStyles.info} component="div">
        <Box component="div">
          <Typography component="h3">Информация</Typography>
          <Box component="div">
            <Box component="div">
              <CalendarMonthIcon />
              <Typography component="span">{gameData.released}</Typography>
            </Box>

            <Box component="div">
              <PeopleOutlineIcon />
              <Typography component="span">{gameData.developers.map((dev) => dev.name).join(',')}</Typography>
            </Box>
          </Box>
          <Box component="div">
            <Typography component="h4">Моя коллекция.....</Typography>
          </Box>
        </Box>
        <Box component="div"></Box>
      </Box>
    </Box>
  );
}

// получить скриншот и стилизовать нормально, можно даже начать с цветами дрочиться

export { GamePage };
