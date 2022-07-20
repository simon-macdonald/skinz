import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchEverything from './fetchEverything';
import type { AppDispatch, RootState } from './store';
import _ from 'lodash';

export type FilterBy = 'skins' | 'chromas' | 'both';
export type DisplayState = 'visible' | 'chosen' | 'hidden';

export interface ChosenChampionsState {
  champions: number[];
  themes: number[];
  displays: DisplayState[];
  filterBy: FilterBy;
  hoverSkinLine: number;
  loading: 'idle' | 'pending' | 'fulfilled';
}

const initialState: ChosenChampionsState = {
  champions: [],
  themes: [],
  displays: [],
  filterBy: 'both',
  hoverSkinLine: 0,
  loading: 'idle',
};

export const clickChamp = createAsyncThunk<
// Return type of the payload creator
[RootState, number],
number,
// First argument to the payload creator
{
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: RootState
}
>('clickChamp', async (championId: number, { getState }) => [getState(), championId]);

export const chosenChampionsSlice = createSlice({
  name: 'chosenChampions',
  initialState,
  reducers: {
    hoverOver: (state, action: PayloadAction<number>) => {
      state.hoverSkinLine = action.payload;
    },
    hoverAway: (state) => {
      state.hoverSkinLine = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEverything.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEverything.fulfilled, (state, action) => {
        const { champions } = action.payload;
        const max = Math.max(...champions.map((c) => c.id));
        state.displays = new Array(max + 1);
        champions.forEach((c) => state.displays[c.id] = 'visible');
        state.loading = 'fulfilled';
      })
      .addCase(clickChamp.fulfilled, (state, action) => {
        if (action.payload[1] === -1) {
          state.champions = [];
          state.displays = new Array(state.displays.length);
          action.payload[0].champions.ids.forEach((c) => state.displays[+c] = 'visible');
          state.themes = [];
          return;
        }

        state.champions
          = state.champions.includes(action.payload[1])
            ? state.champions.filter((c) => c !== action.payload[1])
            : [...state.champions, action.payload[1]];
        
        if (state.champions.length === 0) {
          state.displays = new Array(state.displays.length);
          action.payload[0].champions.ids.forEach((c) => state.displays[+c] = 'visible');
          state.themes = [];
          return;
        }
        
        state.displays = new Array(state.displays.length);
        state.champions.forEach((c) => state.displays[c] = 'chosen');
        
        const skinLinesPerChamp = state.champions.map(id => action.payload[0].champions.entities[id]!.skinLines);
        state.themes = _.intersection(...skinLinesPerChamp);
        const commonSkinLines = state.themes.map((skinLineId) => action.payload[0].skinLines.entities[skinLineId]!);
        const visibleChampions = commonSkinLines.flatMap((skinLine) => skinLine.champions);
        action.payload[0].champions.ids.forEach((c) => {
          if (state.displays[+c] !== 'chosen') {
            state.displays[+c] = visibleChampions.includes(+c) ? 'visible' : 'hidden';
          }
        });
      });
  },
});

export const { hoverOver, hoverAway } = chosenChampionsSlice.actions;

export const selectChosenChampions = (state: RootState) => state.chosenChampions;

export default chosenChampionsSlice.reducer;
