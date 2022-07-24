import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import fetchEverything from './fetchEverything';
import type { AppDispatch, RootState } from './store';

export type FilterBy = 'skins' | 'chromas' | 'both';
export type DisplayState = 'visible' | 'chosen' | 'hidden';

export interface ChosenChampionsState {
  champions: number[];
  skinLines: number[];
  colors: string[];
  displays: DisplayState[];
  filterBy: FilterBy;
  hoverSkinLine: number;
  loading: 'idle' | 'pending' | 'fulfilled';
}

const initialState: ChosenChampionsState = {
  champions: [],
  skinLines: [],
  colors: [],
  displays: [],
  filterBy: 'skins',
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
    clickTab: (state, action: PayloadAction<number>) => {
      state.filterBy
        = action.payload === 0
          ? 'skins'
          : 'chromas';
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
        const rootState = action.payload[0];
        const champClicked = action.payload[1];
        const unclickedOnlyChosenChampion
            = state.champions.length === 1
              && champClicked === state.champions[0];
        if (champClicked === -1 || unclickedOnlyChosenChampion) {
          state.champions = [];
          state.displays = new Array(state.displays.length);
          rootState.champions.ids.forEach((c) => state.displays[+c] = 'visible');
          state.skinLines = [];
          state.colors = [];
          return;
        }

        state.champions
          = state.champions.includes(champClicked)
            ? state.champions.filter((c) => c !== champClicked)
            : [...state.champions, champClicked];

        state.displays = new Array(state.displays.length);
        state.champions.forEach((c) => state.displays[c] = 'chosen');

        if (state.filterBy === 'skins') {
          const skinLinesPerChamp = state.champions.map((id) => rootState.champions.entities[id]!.skinLines);
          state.skinLines = _.intersection(...skinLinesPerChamp);
          const commonSkinLines = state.skinLines.map((skinLineId) => rootState.skinLines.entities[skinLineId]!);
          const visibleChampions = commonSkinLines.flatMap((skinLine) => Object.keys(skinLine.skins)).map((id) => +id);
          rootState.champions.ids.forEach((c) => {
            if (state.displays[+c] !== 'chosen') {
              state.displays[+c] = visibleChampions.includes(+c) ? 'visible' : 'hidden';
            }
          });
        }

        if (state.filterBy === 'chromas') {
          const colorsPerChamp = state.champions.map((id) => Object.keys(rootState.champions.entities[id]!.colors));
          state.colors = _.intersection(...colorsPerChamp);
          const commonColors = state.colors.map((colorId) => rootState.colors.entities[colorId]!);
          const visibleChampions = commonColors.flatMap((color) => Object.keys(color.chromas)).map((id) => +id);
          rootState.champions.ids.forEach((c) => {
            if (state.displays[+c] !== 'chosen') {
              state.displays[+c] = visibleChampions.includes(+c) ? 'visible' : 'hidden';
            }
          });
        }
      });
  },
});

export const { hoverOver, hoverAway, clickTab } = chosenChampionsSlice.actions;

export const selectChosenChampions = (state: RootState) => state.chosenChampions;

export default chosenChampionsSlice.reducer;
