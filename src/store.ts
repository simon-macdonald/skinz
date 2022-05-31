import { configureStore } from '@reduxjs/toolkit';
import { championApi } from './champions/champions';
import championReducer from './champions/championSlice';

export const store = configureStore({
  reducer: {
    [championApi.reducerPath]: championApi.reducer,
    champion: championReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(championApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
