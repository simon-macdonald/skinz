import { configureStore } from '@reduxjs/toolkit';
import displayReducer from '../home/displaySlice';
import whoDidWhatReducer from '../challenges/whoDidWhatSlice';
import championsReducer from '../champions/championSlice';
import skinLinesReducer from '../skins/skinLineSlice';
import skinsReducer from '../skins/skinSlice';
import colorsReducer from '../chromas/colorSlice';
import challengesReducer from '../challenges/challengeSlice';

export const store = configureStore({
  reducer: {
    display: displayReducer,
    whoDidWhat: whoDidWhatReducer,
    champions: championsReducer,
    skinLines: skinLinesReducer,
    skins: skinsReducer,
    colors: colorsReducer,
    challenges: challengesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
