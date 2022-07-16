import { configureStore } from '@reduxjs/toolkit';
import { championApi } from './champions/champions';
import championReducer from './champions/championSlice';
import chosenChampionsReducer from './champions/chosenChampionsSlice';
import selectSkinLineHoverReducer from './champions/skinLineHoverSlice';
import championsReducer from './championSlice'

export const store = configureStore({
  reducer: {
    [championApi.reducerPath]: championApi.reducer,
    champion: championReducer,
    chosenChampions: chosenChampionsReducer,
    skinLineHover: selectSkinLineHoverReducer,
    champions: championsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(championApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
