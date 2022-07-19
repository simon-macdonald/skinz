import { configureStore } from '@reduxjs/toolkit';
import chosenChampionsReducer from './chosenChampionsSlice';
import championsReducer from './championSlice';
import skinLinesReducer from './skinLineSlice';
import skinsReducer from './skinSlice';

export const store = configureStore({
  reducer: {
    chosenChampions: chosenChampionsReducer,
    champions: championsReducer,
    skinLines: skinLinesReducer,
    skins: skinsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
