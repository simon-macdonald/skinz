import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import displayReducer from '../home/displaySlice';
import whoDidWhatReducer from '../challenges/whoDidWhatSlice';
import championsReducer from '../champions/championSlice';
import skinLinesReducer from '../skins/skinLineSlice';
import skinsReducer from '../skins/skinSlice';
import colorsReducer from '../chromas/colorSlice';
import challengesReducer from '../challenges/challengeSlice';

const reducers = combineReducers({
  display: displayReducer,
  whoDidWhat: whoDidWhatReducer,
  champions: championsReducer,
  skinLines: skinLinesReducer,
  skins: skinsReducer,
  colors: colorsReducer,
  challenges: challengesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['whoDidWhat'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
