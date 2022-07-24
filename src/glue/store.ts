import { configureStore } from '@reduxjs/toolkit';
import displayReducer from '../home/displaySlice';
import championsReducer from '../champions/championSlice';
import skinLinesReducer from '../skins/skinLineSlice';
import skinsReducer from '../skins/skinSlice';
import colorsReducer from '../chromas/colorSlice';

export const store = configureStore({
  reducer: {
    display: displayReducer,
    champions: championsReducer,
    skinLines: skinLinesReducer,
    skins: skinsReducer,
    colors: colorsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
