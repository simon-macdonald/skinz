import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createMigrate, FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
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
  transients: ['register'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using/62610422#62610422
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
