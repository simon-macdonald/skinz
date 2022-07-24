import { configureStore } from '@reduxjs/toolkit';
import chosenChampionsReducer from '../home/chosenChampionsSlice';
import championsReducer from '../champions/championSlice';
import skinLinesReducer from '../skins/skinLineSlice';
import skinsReducer from '../skins/skinSlice';
import colorsReducer from '../chromas/colorSlice';

export const store = configureStore({
  reducer: {
    chosenChampions: chosenChampionsReducer,
    champions: championsReducer,
    skinLines: skinLinesReducer,
    skins: skinsReducer,
    colors: colorsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
