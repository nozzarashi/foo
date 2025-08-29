import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './routes/App.tsx';

import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import ErrorPage from './routes/ErrorPage.tsx';
import { CatalogPage } from './routes/pages/Catalog/CatalogPage.tsx';
import { MainPage } from './routes/pages/MainPage/MainPage.tsx';
import { Collection } from './routes/pages/Collection/Collection.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.ts';
import { GamePage } from './routes/pages/GamePage/GamePage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/catalog', element: <CatalogPage /> },
      { path: '/game/:gameId', element: <GamePage /> },
      { path: '/collection', element: <Collection /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
