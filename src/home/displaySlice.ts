import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import fetchEverything from './fetchEverything';
import type { AppDispatch, RootState } from '../glue/store';

export type FilterBy = 'skins' | 'chromas';
export type DisplayState = 'visible' | 'chosen' | 'hidden';

export interface ChosenChampionsState {
  champions: number[];
  filterBy: FilterBy;
  hoverSkinLine: number;
  loading: 'idle' | 'pending' | 'fulfilled';
}

const initialState: ChosenChampionsState = {
  champions: [],
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

export const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    hoverOver: (state, action: PayloadAction<number>) => {
      state.hoverSkinLine = action.payload;
    },
    hoverAway: (state) => {
      state.hoverSkinLine = 0;
    },
    doSkins: (state) => {
      state.filterBy = 'skins';
    },
    doChromas: (state) => {
      state.filterBy = 'chromas';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEverything.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEverything.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
      })
      .addCase(clickChamp.fulfilled, (state, action) => {
        const champClicked = action.payload[1];
        const unclickedOnlyChosenChampion
            = state.champions.length === 1
              && champClicked === state.champions[0];
        if (champClicked === -1 || unclickedOnlyChosenChampion) {
          state.champions = [];
          return;
        }

        state.champions
          = state.champions.includes(champClicked)
            ? state.champions.filter((c) => c !== champClicked)
            : [...state.champions, champClicked];

        if (state.champions.length === 6) {
          state.champions = state.champions.slice(1);
        }
      });
  },
});

export const {
  hoverOver, hoverAway, doSkins, doChromas,
} = displaySlice.actions;

export const selectDisplay = (state: RootState) => state.display;

export default displaySlice.reducer;
