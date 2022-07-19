import { configureStore } from '@reduxjs/toolkit';
import chosenChampionsReducer from '../champions/chosenChampionsSlice';
import selectSkinLineHoverReducer from '../champions/skinLineHoverSlice';
import championsReducer from './championSlice';
import skinLinesReducer from './skinLineSlice';
import skinsReducer from './skinSlice';

export const store = configureStore({
  reducer: {
    chosenChampions: chosenChampionsReducer,
    skinLineHover: selectSkinLineHoverReducer,
    champions: championsReducer,
    skinLines: skinLinesReducer,
    skins: skinsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
