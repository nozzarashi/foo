import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { headerStyles } from './headerStyles';
import PersonIcon from '@mui/icons-material/Person';

import LightModeIcon from '@mui/icons-material/LightMode';
import { Logo } from '@/components/ui/logo/Logo';
import { NavLink } from 'react-router-dom';

function Header({ onclick }) {
  return (
    <Box component="header" sx={headerStyles.header}>
      <Logo />
      <Box component="div">
        <List sx={headerStyles.headerNav}>
          <NavLink to={'/'}>
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton sx={{ pt: 0, pb: 0 }}>
                  <ListItemIcon sx={{ minWidth: 38 }}>
                    <HomeIcon sx={{ color: isActive ? 'selectedColors.main' : 'secondaryColors.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Главная"
                    slotProps={{
                      primary: {
                        sx: {
                          color: isActive ? 'selectedColors.main' : 'secondaryColors.main',
                          fontWeight: isActive ? '500' : 'none',
                          textShadow: isActive ? '0 0 12px rgba(124, 59, 237, 0.4)' : 'none',
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
          <NavLink to={'/catalog'}>
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton sx={{ pt: 0, pb: 0 }}>
                  <ListItemIcon sx={{ minWidth: 38 }}>
                    <SearchIcon sx={{ color: isActive ? 'selectedColors.main' : 'secondaryColors.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Каталог"
                    slotProps={{
                      primary: {
                        sx: {
                          color: isActive ? 'selectedColors.main' : 'secondaryColors.main',
                          fontWeight: isActive ? '500' : 'none',
                          textShadow: isActive ? '0 0 12px rgba(124, 59, 237, 0.4)' : 'none',
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
          <NavLink to={'/collection'}>
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton sx={{ pt: 0, pb: 0 }}>
                  <ListItemIcon sx={{ minWidth: 38 }}>
                    <SportsEsportsIcon sx={{ color: isActive ? 'selectedColors.main' : 'secondaryColors.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Мои игры"
                    slotProps={{
                      primary: {
                        sx: {
                          color: isActive ? 'selectedColors.main' : 'secondaryColors.main',
                          fontWeight: isActive ? '500' : 'none',
                          textShadow: isActive ? '0 0 12px rgba(124, 59, 237, 0.4)' : 'none',
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        </List>
      </Box>
      <Box component="div">
        <IconButton onClick={onclick}>
          <LightModeIcon sx={{ color: 'secondaryColors.main' }} />
        </IconButton>
        <IconButton>
          <PersonIcon sx={{ color: 'secondaryColors.main' }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export { Header };
