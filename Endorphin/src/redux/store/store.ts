import { configureStore } from '@reduxjs/toolkit';
import { gamesApi } from './gamesApi';

import filtersSlice from '@/redux/slices/filtersSlice';
import modalSlice from '@/redux/slices/modalSlice';
import gamesListSlice from '@/redux/slices/gamesListSlice';

export const store = configureStore({
  reducer: {
    filters: filtersSlice,
    modal: modalSlice,
    gamesListFirebase: gamesListSlice,
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  // getDefaultMiddleware() — получаем стандартные middleware от Redux Toolkit
  // .concat(gamesApi.middleware) — добавляем специальный middleware RTK Query, чтобы он мог перехватывать и обрабатывать API-запросы
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gamesApi.middleware),
  // В итоге, в store будут и стандартные middleware, и RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
