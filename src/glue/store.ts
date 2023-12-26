import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createMigrate, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import displayReducer from '../home/displaySlice';
import whoDidWhatReducer from '../challenges/whoDidWhatSlice';
import championsReducer from '../champions/championSlice';
import championsReducer2 from '../champions/championSlice2';
import skinLinesReducer from '../skins/skinLineSlice';
import skinsReducer from '../skins/skinSlice';
import colorsReducer from '../chromas/colorSlice';
import challengesReducer from '../challenges/challengeSlice';

const reducers = combineReducers({
  display: displayReducer,
  whoDidWhat: whoDidWhatReducer,
  champions: championsReducer,
  champions2: championsReducer2,
  skinLines: skinLinesReducer,
  skins: skinsReducer,
  colors: colorsReducer,
  challenges: challengesReducer,
});

const migrations = {
  0: (state: any) => ({
    ...state,
    whoDidWhat: {
      ...state.whoDidWhat,
      'Well-Rounded Traveller': [],
      'Rekindle the Old Furnace': [],
    },
  }),
};

const persistConfig = {
  key: 'root',
  storage,
  version: 0,
  whitelist: ['whoDidWhat'],
  migrate: createMigrate(migrations, { debug: true }),
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
