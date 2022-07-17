import { configureStore } from '@reduxjs/toolkit';
import { championApi } from './champions/champions';
import championReducer from './champions/championSlice';
import chosenChampionsReducer from './champions/chosenChampionsSlice';
import selectSkinLineHoverReducer from './champions/skinLineHoverSlice';
import championsReducer from './store/championSlice'
import skinLinesReducer from './store/skinLineSlice'
import skinsReducer from './store/skinSlice'

export const store = configureStore({
  reducer: {
    [championApi.reducerPath]: championApi.reducer,
    champion: championReducer,
    chosenChampions: chosenChampionsReducer,
    skinLineHover: selectSkinLineHoverReducer,
    champions: championsReducer,
    skinLines: skinLinesReducer,
    skins: skinsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(championApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
