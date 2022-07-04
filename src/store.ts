import { configureStore } from '@reduxjs/toolkit';
import { championApi } from './champions/champions';
import championReducer from './champions/championSlice';
import chosenChampionsReducer from './champions/chosenChampionsSlice';

export const store = configureStore({
  reducer: {
    [championApi.reducerPath]: championApi.reducer,
    champion: championReducer,
    chosenChampions: chosenChampionsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(championApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
