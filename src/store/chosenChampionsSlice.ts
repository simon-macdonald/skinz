import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchEverything from './fetchEverything';
import type { RootState } from './store';

export type filterBy = 'skins' | 'chromas' | 'both';
export type displayState = 'visible' | 'chosen' | 'skinned' | 'hidden';

export interface ChosenChampionsState {
  champions: number[];
  displays: displayState[];
  filterBy: filterBy;
  hoverSkinLine: number;
  loading: 'idle' | 'pending' | 'fulfilled';
}

const initialState: ChosenChampionsState = {
  champions: [],
  displays: [],
  filterBy: 'both',
  hoverSkinLine: 0,
  loading: 'idle',
};

export const chosenChampionsSlice = createSlice({
  name: 'chosenChampions',
  initialState,
  reducers: {
    clickChampion: (state, action: PayloadAction<number>) => {
      if (action.payload === -1) {
        state.champions = [];
        return;
      }

      state.champions = state.champions.includes(action.payload)
        ? state.champions.filter((c) => c !== action.payload)
        : [...state.champions, action.payload];
    },
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
        const max = Math.max(...champions.map(c => c.id));
        state.displays = new Array(max + 1);
        champions.forEach(c => state.displays[c.id] = 'visible');
        state.loading = 'fulfilled';
      });
  },
});

export const { clickChampion, hoverOver, hoverAway } = chosenChampionsSlice.actions;

export const selectChosenChampions = (state: RootState) => state.chosenChampions;

export default chosenChampionsSlice.reducer;
