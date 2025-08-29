import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { darkTheme, lightTheme } from '@/theme/theme';
import { Header } from '@/components/layout/header/Header';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { getAllGames } from '@/redux/slices/gamesListSlice';

function App() {
  const dispatch = useAppDispatch();

  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? lightTheme : darkTheme;

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        onclick={() => {
          setIsDark(!isDark);
        }}
      />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
