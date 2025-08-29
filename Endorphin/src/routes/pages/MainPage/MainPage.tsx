import { Box, Typography, IconButton, List, ListItem, ListItemText, Icon, Button } from '@mui/material';
import { mainPageStyles } from './mainPageStyles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { GameCard } from '@/components/ui/gameCard/GameCard';
import { useDispatch, useSelector } from 'react-redux';
import { useGetGamesQuery } from '@/redux/store/gamesApi';
import { selectSorting } from '@/redux/slices/filtersSlice';
import type { GameInfoFromApiT } from '@/types/GameInfoFromApiT';

import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { globalStyles } from '@/app/globalStyles';

function MainPage() {
  const dispatch = useDispatch();

  const currentSorting = useSelector(selectSorting);

  const gamesListResponse = useGetGamesQuery({
    sorting: currentSorting.value,
  });

  const gamesListData = gamesListResponse.data;

  if (!gamesListData) {
    return;
  }

  const gamesList = gamesListData.results;

  return (
    <>
      <Box component="section" sx={mainPageStyles.hero}>
        <Box component="div">
          <IconButton disableRipple>
            <svg width="240" height="50" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="a" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <text x="20" y="50" fontFamily="Montserrat, Arial, sans-serif" fontSize="42" fontWeight="600" fill="#FFF">
                <tspan fill="#9370DB" filter="url(#a)">
                  E
                </tspan>

                <tspan fill="#282735ff">ndorphine</tspan>

                <tspan fill="#FF1493">.</tspan>
              </text>
            </svg>
          </IconButton>
          <Box sx={{ display: 'block', color: 'primaryColors.light' }} component="span">
            Твой персональный игровой бэклог трекер.
          </Box>
          <Box sx={{ display: 'block', color: 'primaryColors.light' }} component="span">
            Почувствуй эндорфин.
          </Box>
        </Box>
      </Box>
      <Box component="section">
        <List sx={mainPageStyles.countersList}>
          <ListItem sx={mainPageStyles.countersItem} disablePadding>
            <ListItemText primary="0" secondary="Пройдено"></ListItemText>
          </ListItem>
          <ListItem sx={mainPageStyles.countersItem} disablePadding>
            <ListItemText primary="0" secondary="Играю"></ListItemText>
          </ListItem>
          <ListItem sx={mainPageStyles.countersItem} disablePadding>
            <ListItemText primary="0" secondary="В планах"></ListItemText>
          </ListItem>
          <ListItem sx={mainPageStyles.countersItem} disablePadding>
            <ListItemText primary="0" secondary="Брошено"></ListItemText>
          </ListItem>
        </List>
      </Box>
      <Box component="section">
        <Typography sx={{ mb: '36px' }} fontWeight="600" fontSize="28px" variant="h2">
          <IconButton>
            <TrendingUpIcon />
          </IconButton>
          Популярные игры
        </Typography>

        <Box component="div" sx={globalStyles.gameList}>
          {gamesList.map((game: GameInfoFromApiT) => {
            const released = new Date(game.released).getFullYear();
            return (
              <GameCard
                key={game.id}
                name={game.name}
                imgUrl={game.background_image}
                releaseYear={released}
                rating={game.rating}
              />
            );
          })}
        </Box>
        <Box component="div" sx={mainPageStyles.viewMoreButtonContainer}>
          <Link to={'/catalog'}>
            <Button
              endIcon={<NavigateNextIcon />}
              sx={{
                color: 'primaryColors.light',
                backgroundColor: 'secondaryBgColors.main',
                borderColor: 'secondaryBgColors.main',
                textTransform: 'none',
                width: '100%',
                borderRadius: '100px',
              }}
              variant="outlined"
            >
              Просмотреть весь список
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export { MainPage };
